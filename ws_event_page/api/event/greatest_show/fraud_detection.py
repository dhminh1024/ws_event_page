"""
Fraud Detection Utilities for Greatest Show 25 Voting
Analyze voting patterns to detect suspicious behavior and potential fraud
"""
import frappe
from frappe import _
from typing import Dict, List, Tuple


def calculate_fraud_score(vote_data: Dict) -> Tuple[int, List[str]]:
	"""
	Calculate fraud score for a vote based on multiple factors.

	Args:
		vote_data: Dictionary containing vote information
			- finalist_id: Finalist being voted for
			- voter_email: Email of voter
			- device_fingerprint: Device fingerprint
			- ip_address: IP address
			- gs_program: GS Program ID

	Returns:
		Tuple of (fraud_score, reasons)
		- fraud_score: Integer 0-100 (higher = more suspicious)
		- reasons: List of strings explaining why vote is suspicious
	"""
	score = 0
	reasons = []

	finalist_id = vote_data.get("finalist_id")
	voter_email = vote_data.get("voter_email")
	device_fingerprint = vote_data.get("device_fingerprint")
	ip_address = vote_data.get("ip_address")
	gs_program = vote_data.get("gs_program")

	# 1. Check for multiple votes from same IP address (for same finalist)
	if ip_address:
		ip_vote_count = frappe.db.count(
			"WSE GS Vote",
			filters={
				"ip_address": ip_address,
				"finalist": finalist_id,
				"gs_program": gs_program
			}
		)

		if ip_vote_count >= 5:
			score += 40
			reasons.append(f"Same IP voted {ip_vote_count} times for this finalist")
		elif ip_vote_count >= 3:
			score += 25
			reasons.append(f"Same IP voted {ip_vote_count} times for this finalist")
		elif ip_vote_count >= 1:
			score += 10
			reasons.append(f"Same IP voted {ip_vote_count + 1} times for this finalist")

	# 2. Check for multiple votes from same device fingerprint (for same finalist)
	if device_fingerprint:
		device_vote_count = frappe.db.count(
			"WSE GS Vote",
			filters={
				"device_fingerprint": device_fingerprint,
				"finalist": finalist_id,
				"gs_program": gs_program
			}
		)

		if device_vote_count >= 3:
			score += 35
			reasons.append(f"Same device voted {device_vote_count} times for this finalist")
		elif device_vote_count >= 1:
			score += 15
			reasons.append(f"Same device voted {device_vote_count + 1} times for this finalist")

	# 3. Check for similar email patterns (e.g., user+1@gmail.com, user+2@gmail.com)
	if voter_email and "@" in voter_email:
		base_email = voter_email.split("@")[0].split("+")[0]  # Get base part before +
		domain = voter_email.split("@")[1]

		similar_emails = frappe.db.sql("""
			SELECT COUNT(*) as count
			FROM `tabWSE GS Vote`
			WHERE gs_program = %s
			AND finalist = %s
			AND voter_email LIKE %s
		""", (gs_program, finalist_id, f"{base_email}%@{domain}"), as_dict=True)

		if similar_emails and similar_emails[0].count >= 3:
			score += 30
			reasons.append(f"Similar email pattern detected ({similar_emails[0].count} votes)")

	# 4. Check voting velocity (too many votes in short time from same IP)
	if ip_address:
		recent_votes = frappe.db.sql("""
			SELECT COUNT(*) as count
			FROM `tabWSE GS Vote`
			WHERE gs_program = %s
			AND ip_address = %s
			AND voted_at >= DATE_SUB(NOW(), INTERVAL 5 MINUTE)
		""", (gs_program, ip_address), as_dict=True)

		if recent_votes and recent_votes[0].count >= 5:
			score += 25
			reasons.append(f"Too many votes from same IP in 5 minutes ({recent_votes[0].count} votes)")

	# 5. Check if email domain is temporary/disposable
	if voter_email:
		disposable_domains = [
			"tempmail.com", "guerrillamail.com", "10minutemail.com",
			"mailinator.com", "throwaway.email", "temp-mail.org"
		]
		domain = voter_email.split("@")[1] if "@" in voter_email else ""

		if domain in disposable_domains:
			score += 20
			reasons.append(f"Disposable email domain: {domain}")

	# Cap score at 100
	score = min(score, 100)

	return score, reasons


def auto_flag_suspicious_votes(gs_program: str = None, threshold: int = None) -> Dict:
	"""
	Automatically flag suspicious votes based on fraud score threshold.

	Args:
		gs_program: GS Program ID (optional, uses current if not provided)
		threshold: Fraud score threshold (optional, reads from settings if not provided)

	Returns:
		Dictionary with statistics about flagged votes
	"""
	from ws_event_page.wellspring_event_page.doctype.wse_gs_program.wse_gs_program import WSEGSProgram

	if not gs_program:
		current_program = WSEGSProgram.get_current_gs_program()
		if not current_program:
			return {"error": "No active GS Program found"}
		gs_program = current_program.name

	# Get threshold from settings if not provided
	if threshold is None:
		settings = frappe.get_single("WSE GS Voting Settings")
		threshold = settings.fraud_score_threshold if hasattr(settings, 'fraud_score_threshold') else 50

	# Get all votes with fraud_score >= threshold that are not yet flagged
	votes_to_flag = frappe.get_all(
		"WSE GS Vote",
		filters={
			"gs_program": gs_program,
			"fraud_score": [">=", threshold],
			"is_suspicious": 0
		},
		fields=["name", "fraud_score"]
	)

	flagged_count = 0
	for vote in votes_to_flag:
		frappe.db.set_value("WSE GS Vote", vote.name, "is_suspicious", 1)
		flagged_count += 1

	frappe.db.commit()

	return {
		"success": True,
		"flagged_count": flagged_count,
		"threshold": threshold,
		"gs_program": gs_program
	}


def get_fraud_statistics(gs_program: str = None) -> Dict:
	"""
	Get fraud detection statistics for a GS Program.

	Args:
		gs_program: GS Program ID (optional, uses current if not provided)

	Returns:
		Dictionary with fraud statistics
	"""
	from ws_event_page.wellspring_event_page.doctype.wse_gs_program.wse_gs_program import WSEGSProgram

	if not gs_program:
		current_program = WSEGSProgram.get_current_gs_program()
		if not current_program:
			return {"error": "No active GS Program found"}
		gs_program = current_program.name

	# Total votes
	total_votes = frappe.db.count("WSE GS Vote", {"gs_program": gs_program})

	# Suspicious votes
	suspicious_votes = frappe.db.count(
		"WSE GS Vote",
		{"gs_program": gs_program, "is_suspicious": 1}
	)

	# Invalid votes
	invalid_votes = frappe.db.count(
		"WSE GS Vote",
		{"gs_program": gs_program, "is_valid": 0}
	)

	# Votes by fraud score ranges
	high_risk = frappe.db.count(
		"WSE GS Vote",
		{"gs_program": gs_program, "fraud_score": [">=", 70]}
	)

	medium_risk = frappe.db.count(
		"WSE GS Vote",
		{
			"gs_program": gs_program,
			"fraud_score": ["between", [40, 69]]
		}
	)

	low_risk = frappe.db.count(
		"WSE GS Vote",
		{
			"gs_program": gs_program,
			"fraud_score": ["between", [1, 39]]
		}
	)

	# Top IPs by vote count
	top_ips = frappe.db.sql("""
		SELECT ip_address, COUNT(*) as vote_count
		FROM `tabWSE GS Vote`
		WHERE gs_program = %s AND ip_address IS NOT NULL
		GROUP BY ip_address
		ORDER BY vote_count DESC
		LIMIT 10
	""", (gs_program,), as_dict=True)

	# Top devices by vote count
	top_devices = frappe.db.sql("""
		SELECT device_fingerprint, COUNT(*) as vote_count
		FROM `tabWSE GS Vote`
		WHERE gs_program = %s AND device_fingerprint IS NOT NULL
		GROUP BY device_fingerprint
		ORDER BY vote_count DESC
		LIMIT 10
	""", (gs_program,), as_dict=True)

	return {
		"gs_program": gs_program,
		"total_votes": total_votes,
		"valid_votes": total_votes - invalid_votes,
		"invalid_votes": invalid_votes,
		"suspicious_votes": suspicious_votes,
		"fraud_score_distribution": {
			"high_risk": high_risk,
			"medium_risk": medium_risk,
			"low_risk": low_risk,
			"no_risk": total_votes - high_risk - medium_risk - low_risk
		},
		"top_ips": top_ips,
		"top_devices": top_devices
	}
