# WSE KDD Backend Implementation Summary

## Overview

This document summarizes the complete backend implementation for the Kindergarten Demo Day (KDD) system at Wellspring School. The system manages kindergarten visit events, collects parent/student information, and generates participation certificates.

## What Was Implemented

### Phase 1: Core DocType Business Logic

#### 1. WSE KDD Visit Event (`wse_kdd_visit_event.py`)
**Location:** `ws_event_page/wellspring_event_page/doctype/wse_kdd_visit_event/wse_kdd_visit_event.py`

**Implemented Features:**
- ✅ `autoname()`: Auto-generates event name with format `KDD_EVENT_{date}_{title}`
- ✅ `before_save()`: Auto-generates registration link
- ✅ `validate()`: Validates group photo is uploaded when registration is open
- ✅ `generate_registration_link()`: Creates URL for parent registration
- ✅ `get_registered_students()`: Returns list of registered students
- ✅ `get_registration_count()`: Returns count of registrations

**Registration Link Format:**
```
{base_url}/events/kindergarten-demo-day?event={event_name}
```

#### 2. WSE KDD Student Registration (`wse_kdd_student_registration.py`)
**Location:** `ws_event_page/wellspring_event_page/doctype/wse_kdd_student_registration/wse_kdd_student_registration.py`

**Implemented Features:**
- ✅ `before_insert()`: Generates certificate token and URL
- ✅ `validate()`: Validates student data and event status
- ✅ `generate_certificate_token()`: Creates secure token using `secrets.token_urlsafe(32)`
- ✅ `generate_certificate_url()`: Builds certificate access URL
- ✅ `check_and_generate_certificate()`: Checks if group photo exists
- ✅ `validate_student_data()`: Validates name and DOB
- ✅ `validate_event_registration_open()`: Ensures registration is open
- ✅ `get_or_create_registration()`: Static method to find existing registration
- ✅ `add_parent_submission()`: Adds parent to child table
- ✅ `get_certificate_data()`: Returns certificate rendering data

**Security Features:**
- Cryptographically strong token generation
- Student name normalization
- DOB validation (not in future, reasonable age)
- Event registration status checking

#### 3. WSE KDD Certificate Registration (`wse_kdd_certificate_registration.py`)
**Location:** `ws_event_page/wellspring_event_page/doctype/wse_kdd_certificate_registration/wse_kdd_certificate_registration.py`

**Implemented Features:**
- ✅ `before_insert()`: Auto-sets registration datetime
- ✅ `validate()`: Validates parent information
- ✅ `validate_email()`: Email format validation with regex
- ✅ `validate_phone_number()`: Phone number validation (min 10 digits)
- ✅ `validate_parent_name()`: Parent name validation and normalization

### Phase 2: API Endpoints

**Base Path:** `ws_event_page/api/kindergarten_demo_day/`

#### 1. Visit Event API (`visit_event.py`)

**Endpoint 1: Get List of Events**
```python
@frappe.whitelist(allow_guest=True)
def get_list_of_events(kindergarten=None, registration_open=None)
```

**API Path:**
```
/api/method/ws_event_page.api.kindergarten_demo_day.visit_event.get_list_of_events
```

**Parameters:**
- `kindergarten` (optional): Filter by kindergarten name
- `registration_open` (optional): "1" or "0" to filter by status

**Returns:**
```json
{
  "success": true,
  "data": [
    {
      "name": "KDD_EVENT_20250117_Demo_Day",
      "title": "Demo Day",
      "event_datetime": "2025-01-17 09:00:00",
      "kindergarten": "KG-001",
      "kindergarten_title": "ABC Kindergarten",
      "kindergarten_logo": "/files/logo.png",
      "registration_open": 1,
      "registration_link": "https://example.com/events/kindergarten-demo-day?event=...",
      "registration_count": 15
    }
  ],
  "message": "Events retrieved successfully"
}
```

**Endpoint 2: Get Event Details**
```python
@frappe.whitelist(allow_guest=True)
def get_event_details(event_name)
```

**API Path:**
```
/api/method/ws_event_page.api.kindergarten_demo_day.visit_event.get_event_details
```

**Parameters:**
- `event_name` (required): Name of the visit event

**Returns:**
```json
{
  "success": true,
  "data": {
    "name": "KDD_EVENT_20250117_Demo_Day",
    "title": "Demo Day",
    "event_datetime": "2025-01-17 09:00:00",
    "kindergarten": "KG-001",
    "kindergarten_data": {
      "name": "KG-001",
      "title": "ABC Kindergarten",
      "logo": "/files/logo.png",
      "contact_person": "John Doe",
      "contact_email": "john@abc.com",
      "contact_phone": "0123456789"
    },
    "registration_open": 1,
    "registration_link": "https://...",
    "group_photo": "/files/group.jpg",
    "registration_count": 15,
    "registered_students": [...]
  }
}
```

#### 2. Registration API (`registration.py`)

**Endpoint: Submit Registration**
```python
@frappe.whitelist(allow_guest=True)
@rate_limit(limit=10, seconds=3600)  # 10 requests per hour per IP
def submit_registration(visit_event, student_full_name, student_dob,
                       parent_full_name, parent_email, parent_phone_number)
```

**API Path:**
```
/api/method/ws_event_page.api.kindergarten_demo_day.registration.submit_registration
```

**Parameters:**
- `visit_event` (required): Name of the visit event
- `student_full_name` (required): Student's full name
- `student_dob` (required): Student's date of birth
- `parent_full_name` (required): Parent's full name
- `parent_email` (required): Parent's email
- `parent_phone_number` (required): Parent's phone number

**Security Features:**
- ✅ Rate limiting using Frappe's `@rate_limit` decorator (10 requests per hour per IP)
- ✅ Input sanitization (XSS, SQL injection prevention)
- ✅ Email format validation
- ✅ Phone number validation
- ✅ Student name validation
- ✅ DOB validation

**Returns:**
```json
{
  "success": true,
  "data": {
    "certificate_url": "https://.../certificate_token=abc123",
    "certificate_token": "abc123...",
    "student_name": "John Doe",
    "event_title": "Demo Day",
    "is_new_registration": true
  },
  "message": "Registration submitted successfully! Certificate URL has been sent to your email."
}
```

**Behavior:**
- If student already registered: Adds new parent submission to existing record
- If new student: Creates new registration with first parent submission
- Sends email to parent with certificate URL
- Returns same certificate URL for all parents of same student

#### 3. Certificate API (`certificate.py`)

**Endpoint 1: Get Certificate**
```python
@frappe.whitelist(allow_guest=True)
def get_certificate(certificate_token)
```

**API Path:**
```
/api/method/ws_event_page.api.kindergarten_demo_day.certificate.get_certificate
```

**Parameters:**
- `certificate_token` (required): Unique certificate token

**Returns:**
```json
{
  "success": true,
  "data": {
    "student_name": "John Doe",
    "student_dob": "2020-01-15",
    "event_title": "Demo Day",
    "event_datetime": "2025-01-17 09:00:00",
    "group_photo": "/files/group.jpg",
    "kindergarten_name": "ABC Kindergarten",
    "kindergarten_logo": "/files/logo.png",
    "certificate_token": "abc123...",
    "certificate_url": "https://...",
    "registration_date": "2025-01-10 14:30:00",
    "parent_submissions": [...],
    "total_parent_submissions": 2
  }
}
```

**Endpoint 2: Resend Certificate Email**
```python
@frappe.whitelist(allow_guest=True)
def resend_certificate_email(certificate_token, parent_email)
```

**API Path:**
```
/api/method/ws_event_page.api.kindergarten_demo_day.certificate.resend_certificate_email
```

**Parameters:**
- `certificate_token` (required): Certificate token
- `parent_email` (required): Parent's email (must match a registered parent)

### Phase 3: Email System

#### 1. Email Template (`kdd_certificate_notification.html`)
**Location:** `ws_event_page/templates/emails/kdd_certificate_notification.html`

**Features:**
- ✅ Bilingual (Vietnamese/English)
- ✅ Wellspring branding and colors
- ✅ Responsive design
- ✅ Certificate access button
- ✅ Registration details table
- ✅ Important notes section
- ✅ Professional formatting

**Template Variables:**
- `parent_name`: Parent's full name
- `parent_email`: Parent's email
- `student_name`: Student's full name
- `event_title`: Event title
- `certificate_url`: URL to access certificate

#### 2. Email Utility (`email.py`)
**Location:** `ws_event_page/api/kindergarten_demo_day/email.py`

**Function 1: Send Certificate Email**
```python
def send_certificate_email(parent_email, student_name, certificate_url,
                          event_title, parent_name)
```

**Features:**
- ✅ Template rendering with context
- ✅ Bilingual subject line
- ✅ Immediate sending
- ✅ Error logging
- ✅ Success logging

**Function 2: Send Bulk Certificate Emails**
```python
def send_bulk_certificate_emails(visit_event)
```

**Features:**
- ✅ Batch sending for all parents in an event
- ✅ Results summary (sent, failed, errors)
- ✅ Individual error tracking
- ✅ Useful for sending emails after uploading group photo

### Phase 4: Validation & Security

#### Security Utility (`validation.py`)
**Location:** `ws_event_page/api/kindergarten_demo_day/validation.py`

**Implemented Functions:**

1. **`validate_and_sanitize_inputs(data)`**
   - Removes XSS attempts (`<script>`, `javascript:`, etc.)
   - Removes SQL injection attempts (`';`, `--`, `/*`, etc.)
   - Normalizes whitespace
   - Strips dangerous characters

2. **`validate_email_format(email)`**
   - Regex pattern validation
   - Standard email format checking

3. **`validate_phone_number(phone)`**
   - Minimum length validation (10 digits)
   - Vietnamese number pattern checking
   - International format support

4. **`validate_student_name(name)`**
   - Minimum length check
   - Number detection (warning)
   - Required field validation

5. **`validate_date_of_birth(dob)`**
   - Future date prevention
   - Age reasonableness check (0-10 years)
   - Date format validation

6. **`validate_certificate_token(token)`**
   - Length validation
   - URL-safe character checking
   - Format validation

7. **`sanitize_html_content(content)`**
   - HTML escape for XSS prevention

**Note:** Rate limiting is handled by Frappe's built-in `@rate_limit` decorator applied to API endpoints, rather than custom implementation.

## Testing the Implementation

### 1. Create a Kindergarten
```python
# In Frappe console
kindergarten = frappe.get_doc({
    "doctype": "WSE KDD Kindergarten",
    "title": "ABC Kindergarten",
    "kindergarten_code": "ABC-KG-001",
    "contact_person": "John Doe",
    "contact_email": "contact@abc.com",
    "contact_phone": "0123456789"
})
kindergarten.insert()
```

### 2. Create a Visit Event
```python
from frappe.utils import now_datetime

event = frappe.get_doc({
    "doctype": "WSE KDD Visit Event",
    "title": "Demo Day January 2025",
    "kindergarten": "ABC-KG-001",
    "event_datetime": now_datetime(),
    "registration_open": 1
})
event.insert()

# Upload group photo via UI or:
event.group_photo = "/files/group_photo.jpg"
event.save()

print(f"Registration Link: {event.registration_link}")
```

### 3. Test Registration API
```bash
curl -X POST "http://localhost:8000/api/method/ws_event_page.api.kindergarten_demo_day.registration.submit_registration" \
  -H "Content-Type: application/json" \
  -d '{
    "visit_event": "KDD_EVENT_20250117_Demo_Day_January_2025",
    "student_full_name": "Jane Smith",
    "student_dob": "2020-05-15",
    "parent_full_name": "Mary Smith",
    "parent_email": "mary@example.com",
    "parent_phone_number": "0987654321"
  }'
```

### 4. Test Certificate Retrieval
```bash
curl "http://localhost:8000/api/method/ws_event_page.api.kindergarten_demo_day.certificate.get_certificate?certificate_token=YOUR_TOKEN"
```

## Security Summary

### Implemented Security Measures:
- ✅ **Rate Limiting**: Using Frappe's `@rate_limit` decorator (10 requests per hour per IP)
- ✅ **Input Sanitization**: XSS and SQL injection prevention
- ✅ **Secure Tokens**: Cryptographically strong random tokens (32 bytes using `secrets.token_urlsafe`)
- ✅ **Email Validation**: Regex-based format checking
- ✅ **Phone Validation**: Length and format checking
- ✅ **DOB Validation**: Future date prevention, age checks
- ✅ **Event Status Checking**: Registration open validation
- ✅ **Error Handling**: Comprehensive try-catch with rollback
- ✅ **Logging**: All errors logged for monitoring

### Best Practices Applied:
- ✅ Guest access properly whitelisted
- ✅ Transactions with rollback on errors
- ✅ Normalized data (names, emails)
- ✅ Docstring documentation
- ✅ Type hints in auto-generated sections
- ✅ Bilingual messaging (Vietnamese/English)

## File Structure

```
ws_event_page/
├── api/
│   └── kindergarten_demo_day/
│       ├── __init__.py
│       ├── visit_event.py          # Event listing/details APIs
│       ├── registration.py         # Registration submission API (with @rate_limit)
│       ├── certificate.py          # Certificate retrieval APIs
│       ├── email.py                # Email sending utilities
│       └── validation.py           # Input validation & sanitization utilities
├── templates/
│   └── emails/
│       └── kdd_certificate_notification.html  # Email template
└── wellspring_event_page/
    └── doctype/
        ├── wse_kdd_visit_event/
        │   ├── wse_kdd_visit_event.json
        │   ├── wse_kdd_visit_event.py      # Event business logic
        │   ├── README.md                   # Requirements
        │   └── IMPLEMENTATION.md           # This file
        ├── wse_kdd_student_registration/
        │   ├── wse_kdd_student_registration.json
        │   └── wse_kdd_student_registration.py  # Registration logic
        ├── wse_kdd_certificate_registration/
        │   ├── wse_kdd_certificate_registration.json
        │   └── wse_kdd_certificate_registration.py  # Child table logic
        └── wse_kdd_kindergarten/
            ├── wse_kdd_kindergarten.json
            └── wse_kdd_kindergarten.py     # Kindergarten logic
```

## Next Steps (Frontend Implementation)

The backend is now complete and ready for frontend integration. The frontend team should:

1. Create React app at `frontend/src/app/kindergarten-demo-day/`
2. Implement three main routes:
   - Event listing/details page
   - Registration form page
   - Certificate display page
3. Integrate with the API endpoints documented above
4. Use frappe-react-sdk hooks for API calls
5. Handle loading states and errors
6. Implement responsive design matching Wellspring branding

## Support

For questions or issues with this implementation, contact:
- Email: digital.learning@wellspringsaigon.edu.vn
- Check error logs in Frappe Error Log doctype
- Review API responses for detailed error messages
