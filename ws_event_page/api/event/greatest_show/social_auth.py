import frappe
from frappe import _
from datetime import datetime
import requests


@frappe.whitelist(allow_guest=True, methods=["POST"])
def verify_google_token(credential):
	"""
	Verify Google ID token and return user information.
	Uses Google's tokeninfo endpoint for verification.

	Args:
		credential: Google JWT credential from Sign-In

	Returns:
		User data (email, name, sub) if valid, raises error if invalid
	"""
	if not credential:
		frappe.throw(_("Google credential is required"))

	try:
		# Verify token with Google's tokeninfo endpoint
		response = requests.get(
			'https://oauth2.googleapis.com/tokeninfo',
			params={'id_token': credential},
			timeout=10
		)

		if response.status_code != 200:
			frappe.throw(_("Invalid Google token"))

		token_info = response.json()

		# Verify token is for our application (optional but recommended)
		# expected_client_id = frappe.conf.get('google_client_id')
		# if token_info.get('aud') != expected_client_id:
		#     frappe.throw(_("Token was not issued for this application"))

		# Verify token is not expired (Google already checks this)
		if 'error' in token_info:
			frappe.throw(_(token_info.get('error_description', 'Invalid token')))

		# Return verified user information
		return {
			'email': token_info.get('email'),
			'name': token_info.get('name'),
			'sub': token_info.get('sub'),  # Google user ID
			'email_verified': token_info.get('email_verified', False),
			'picture': token_info.get('picture')
		}

	except requests.exceptions.RequestException as e:
		frappe.log_error(f"Google token verification failed: {str(e)}")
		frappe.throw(_("Failed to verify Google token. Please try again."))
	except Exception as e:
		frappe.log_error(f"Unexpected error during Google token verification: {str(e)}")
		frappe.throw(_("An error occurred during login. Please try again."))


@frappe.whitelist(allow_guest=True, methods=["POST"])
def save_social_user(email, full_name, provider, provider_id, profile_picture=None):
	"""
	Save or update social login user data.
	Creates a new WSE GS Users record or updates existing one.

	Args:
		email: User's email from social provider
		full_name: User's full name
		provider: 'google', 'facebook', or 'instagram'
		provider_id: Provider's user ID
		profile_picture: Optional profile picture URL

	Returns:
		User data with email as identifier
	"""

	if not email or not provider_id:
		frappe.throw(_("Email and provider ID are required"))

	# Validate email format
	import re
	email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
	if not re.match(email_regex, email):
		frappe.throw(_("Invalid email format"))

	# Check if user already exists
	existing_user = frappe.db.exists("WSE GS Users", email)

	if existing_user:
		# Update existing user
		user_doc = frappe.get_doc("WSE GS Users", email)
		user_doc.full_name = full_name
		# Use facebook_user_id field for all providers (generic social provider ID)
		user_doc.facebook_user_id = provider_id
		user_doc.facebook_profile_picture = profile_picture
		user_doc.last_login = datetime.now()
		user_doc.save(ignore_permissions=True)
	else:
		# Create new user
		user_doc = frappe.get_doc({
			"doctype": "WSE GS Users",
			"email": email,
			"full_name": full_name,
			"facebook_user_id": provider_id,  # Generic social provider ID field
			"facebook_profile_picture": profile_picture,
			"first_login": datetime.now(),
			"last_login": datetime.now(),
			"total_votes": 0
		})
		user_doc.insert(ignore_permissions=True)

	frappe.db.commit()

	return {
		"email": user_doc.email,
		"full_name": user_doc.full_name,
		"provider": provider,
		"provider_id": user_doc.facebook_user_id,
		"profile_picture": user_doc.facebook_profile_picture
	}


