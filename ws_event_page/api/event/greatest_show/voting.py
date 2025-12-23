import frappe
from frappe import _
from datetime import datetime


@frappe.whitelist(allow_guest=True, methods=["GET"])
def get_finalists(gs_program=None):
	"""
	Get all active finalists for voting.
	Returns list of finalists with vote counts.

	Args:
		gs_program: Optional GS Program ID. If not provided, uses current program.
	"""
	from ws_event_page.wellspring_event_page.doctype.wse_gs_program.wse_gs_program import WSEGSProgram

	if not gs_program:
		current_program = WSEGSProgram.get_current_gs_program()
		if not current_program:
			frappe.throw(_("No active Greatest Show program found"))
		gs_program = current_program.name

	finalists = frappe.get_all(
		"WSE GS Finalist",
		filters={
			"gs_program": gs_program,
			"is_active": 1
		},
		fields=[
			"name",
			"finalist_name",
			"entry_category",
			"entry_group",
			"thumbnail",
			"video_url",
			"vote_count",
			"display_order"
		],
		order_by="display_order asc, finalist_name asc"
	)

	return finalists


@frappe.whitelist(allow_guest=True, methods=["GET"])
def get_voting_settings():
	"""
	Get voting settings and current voting status.
	"""
	settings = frappe.get_single("WSE GS Voting Settings")

	# Calculate if voting is currently active
	now = datetime.now()
	is_voting_active = False

	if settings.voting_enabled:
		start_time = settings.voting_start_datetime
		end_time = settings.voting_end_datetime

		if start_time and end_time:
			if start_time <= now <= end_time:
				is_voting_active = True
		elif not start_time and not end_time:
			# If no time constraints, voting is active when enabled
			is_voting_active = True

	return {
		"voting_enabled": settings.voting_enabled,
		"voting_start_datetime": settings.voting_start_datetime,
		"voting_end_datetime": settings.voting_end_datetime,
		"require_social_auth": settings.require_social_auth,
		"enable_facebook_login": settings.enable_facebook_login,
		"show_vote_counts": settings.show_vote_counts,
		"votes_per_user": settings.votes_per_user,
		"is_voting_active": is_voting_active
	}


@frappe.whitelist(allow_guest=True, methods=["POST"])
def cast_vote(finalist_id, voter_id=None, voter_email=None, device_fingerprint=None):
	"""
	Cast a vote for a finalist.

	Args:
		finalist_id: The finalist to vote for
		voter_id: Optional voter ID (for authenticated users)
		voter_email: Optional voter email (for email-based voting)
		device_fingerprint: Device fingerprint for fraud prevention

	Returns:
		Success message and updated vote count
	"""
	# Get voting settings
	settings = frappe.get_single("WSE GS Voting Settings")

	# Check if voting is enabled
	if not settings.voting_enabled:
		frappe.throw(_("Voting is not currently enabled"))

	# Check voting period
	now = datetime.now()
	if settings.voting_start_datetime and now < settings.voting_start_datetime:
		frappe.throw(_("Voting has not started yet"))

	if settings.voting_end_datetime and now > settings.voting_end_datetime:
		frappe.throw(_("Voting period has ended"))

	# Get finalist to verify it exists and is active
	finalist = frappe.get_doc("WSE GS Finalist", finalist_id)
	if not finalist.is_active:
		frappe.throw(_("This finalist is not available for voting"))

	# Determine voter
	if not voter_id and not voter_email:
		frappe.throw(_("Voter identification is required"))

	# Check if user has already voted for ANY finalist (only 1 vote allowed per user)
	existing_vote = frappe.db.exists(
		"WSE GS Vote",
		{
			"voter": voter_id if voter_id else voter_email,
			"gs_program": finalist.gs_program,
			"is_valid": 1  # Only count valid votes
		}
	)

	if existing_vote:
		frappe.throw(_("You have already voted. Each user can only vote once."))

	# Calculate fraud score before creating vote
	# Note: We don't block duplicate device fingerprints, just increase fraud score
	from ws_event_page.api.event.greatest_show.fraud_detection import calculate_fraud_score

	fraud_score, fraud_reasons = calculate_fraud_score({
		"finalist_id": finalist_id,
		"voter_email": voter_email or voter_id,
		"device_fingerprint": device_fingerprint,
		"ip_address": frappe.local.request_ip if hasattr(frappe.local, "request_ip") else None,
		"gs_program": finalist.gs_program
	})

	# Get fraud score threshold from settings
	fraud_threshold = settings.fraud_score_threshold if hasattr(settings, 'fraud_score_threshold') else 50
	is_suspicious = 1 if fraud_score >= fraud_threshold else 0
	fraud_reasons_text = "\n".join(fraud_reasons) if fraud_reasons else None

	# Create vote record
	vote = frappe.get_doc({
		"doctype": "WSE GS Vote",
		"gs_program": finalist.gs_program,
		"finalist": finalist_id,
		"voter": voter_id or voter_email,
		"voter_email": voter_email or "",
		"voter_name": frappe.session.user if frappe.session.user != "Guest" else "",
		"voted_at": now,
		"ip_address": frappe.local.request_ip if hasattr(frappe.local, "request_ip") else None,
		"user_agent": frappe.request.headers.get("User-Agent") if frappe.request else None,
		"device_fingerprint": device_fingerprint,
		"fraud_score": fraud_score,
		"is_suspicious": is_suspicious,
		"fraud_reasons": fraud_reasons_text,
		"is_valid": 1  # Default to valid, admin can mark as invalid later
	})
	vote.insert(ignore_permissions=True)

	# Update vote count on finalist
	frappe.db.sql("""
		UPDATE `tabWSE GS Finalist`
		SET vote_count = vote_count + 1
		WHERE name = %s
	""", finalist_id)

	# Get updated vote count
	updated_count = frappe.db.get_value("WSE GS Finalist", finalist_id, "vote_count")

	return {
		"success": True,
		"message": _("Vote cast successfully"),
		"vote_count": updated_count
	}


@frappe.whitelist(allow_guest=True, methods=["GET"])
def get_user(voter_email=None, gs_program=None):
	"""
	Verify if user exists in database and check their voting status.
	Used to validate localStorage user data and determine voting eligibility.

	Args:
		voter_email: User email from localStorage
		gs_program: Optional GS Program ID

	Returns:
		Dictionary with:
		- user_exists: bool - Whether user exists in WSE GS Users
		- has_voted: bool - Whether user has voted
		- voted_finalists: list - List of finalist IDs user voted for
		- user_data: dict - User information if exists
	"""
	from ws_event_page.wellspring_event_page.doctype.wse_gs_program.wse_gs_program import WSEGSProgram

	if not voter_email:
		return {
			"user_exists": False,
			"has_voted": False,
			"voted_finalists": [],
			"message": "Email is required"
		}

	# Check if user exists in WSE GS Users
	user_exists = frappe.db.exists("WSE GS Users", {"email": voter_email})

	if not user_exists:
		return {
			"user_exists": False,
			"has_voted": False,
			"voted_finalists": [],
			"message": "User not found in database"
		}

	# Get user data
	user_doc = frappe.get_doc("WSE GS Users", user_exists)

	# Get current program if not provided
	if not gs_program:
		current_program = WSEGSProgram.get_current_gs_program()
		if not current_program:
			return {
				"user_exists": True,
				"has_voted": False,
				"voted_finalists": [],
				"user_data": {
					"email": user_doc.email,
					"full_name": user_doc.full_name,
					"facebook_user_id": user_doc.facebook_user_id if hasattr(user_doc, 'facebook_user_id') else None,
					"facebook_profile_picture": user_doc.facebook_profile_picture if hasattr(user_doc, 'facebook_profile_picture') else None
				},
				"message": "No active GS Program found"
			}
		gs_program = current_program.name

	# Check votes
	votes = frappe.get_all(
		"WSE GS Vote",
		filters={
			"gs_program": gs_program,
			"voter_email": voter_email,
			"is_valid": 1  # Only count valid votes
		},
		fields=["finalist"]
	)

	voted_finalists = [vote.finalist for vote in votes]

	return {
		"user_exists": True,
		"has_voted": len(voted_finalists) > 0,
		"voted_finalists": voted_finalists,
		"user_data": {
			"email": user_doc.email,
			"full_name": user_doc.full_name,
			"facebook_user_id": user_doc.facebook_user_id if hasattr(user_doc, 'facebook_user_id') else None,
			"facebook_profile_picture": user_doc.facebook_profile_picture if hasattr(user_doc, 'facebook_profile_picture') else None
		}
	}

@frappe.whitelist(methods=["GET"])
def get_fraud_statistics(gs_program=None):
	"""
	Get fraud detection statistics for a GS Program.
	Admin only endpoint.

	Args:
		gs_program: Optional GS Program ID

	Returns:
		Fraud statistics dictionary
	"""
	# Check if user has admin role
	if not frappe.has_permission("WSE GS Vote", "report"):
		frappe.throw(_("Insufficient permissions"), frappe.PermissionError)

	from ws_event_page.api.event.greatest_show.fraud_detection import get_fraud_statistics

	return get_fraud_statistics(gs_program)


@frappe.whitelist(methods=["POST"])
def flag_suspicious_votes(gs_program=None, threshold=None):
	"""
	Automatically flag suspicious votes based on fraud score threshold.
	Admin only endpoint.

	Args:
		gs_program: Optional GS Program ID
		threshold: Fraud score threshold (optional, reads from settings if not provided)

	Returns:
		Statistics about flagged votes
	"""
	# Check if user has admin role
	if not frappe.has_permission("WSE GS Vote", "write"):
		frappe.throw(_("Insufficient permissions"), frappe.PermissionError)

	from ws_event_page.api.event.greatest_show.fraud_detection import auto_flag_suspicious_votes

	# Convert threshold to int if provided
	threshold_int = int(threshold) if threshold is not None else None
	return auto_flag_suspicious_votes(gs_program, threshold_int)


@frappe.whitelist(methods=["POST"])
def mark_vote_invalid(vote_id, reason=None):
	"""
	Mark a vote as invalid (admin action).

	Args:
		vote_id: Vote ID to mark as invalid
		reason: Optional reason for marking invalid

	Returns:
		Success message
	"""
	# Check if user has admin role
	if not frappe.has_permission("WSE GS Vote", "write"):
		frappe.throw(_("Insufficient permissions"), frappe.PermissionError)

	vote = frappe.get_doc("WSE GS Vote", vote_id)

	# Mark as invalid
	vote.is_valid = 0
	if reason:
		existing_reasons = vote.fraud_reasons or ""
		vote.fraud_reasons = f"{existing_reasons}\n[ADMIN] {reason}".strip()

	vote.reviewed_by = frappe.session.user
	vote.reviewed_at = frappe.utils.now_datetime()
	vote.save(ignore_permissions=True)

	# Decrement vote count on finalist
	frappe.db.sql("""
		UPDATE `tabWSE GS Finalist`
		SET vote_count = GREATEST(0, vote_count - 1)
		WHERE name = %s
	""", vote.finalist)

	frappe.db.commit()

	return {
		"success": True,
		"message": _("Vote marked as invalid"),
		"vote_id": vote_id
	}


@frappe.whitelist(methods=["POST"])
def mark_vote_valid(vote_id):
	"""
	Mark a vote as valid again (admin action).

	Args:
		vote_id: Vote ID to mark as valid

	Returns:
		Success message
	"""
	# Check if user has admin role
	if not frappe.has_permission("WSE GS Vote", "write"):
		frappe.throw(_("Insufficient permissions"), frappe.PermissionError)

	vote = frappe.get_doc("WSE GS Vote", vote_id)

	was_invalid = vote.is_valid == 0

	# Mark as valid
	vote.is_valid = 1
	vote.is_suspicious = 0
	vote.reviewed_by = frappe.session.user
	vote.reviewed_at = frappe.utils.now_datetime()
	vote.save(ignore_permissions=True)

	# Increment vote count on finalist if it was previously invalid
	if was_invalid:
		frappe.db.sql("""
			UPDATE `tabWSE GS Finalist`
			SET vote_count = vote_count + 1
			WHERE name = %s
		""", vote.finalist)

	frappe.db.commit()

	return {
		"success": True,
		"message": _("Vote marked as valid"),
		"vote_id": vote_id
	}
