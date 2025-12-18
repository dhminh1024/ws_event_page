# Kindergarten Demo Day API Documentation

## Overview

This API provides endpoints for managing Kindergarten Demo Day events, including registration, certificate generation, and page visit tracking.

## Base URL

```
https://wisers.wellspringsaigon.edu.vn/api/method/ws_event_page.api.kindergarten_demo_day
```

## Endpoints

### 1. Track Page Visit

**Endpoint:** `/tracking.track_page_visit`

**Method:** `POST`

**Description:** Tracks when a user visits an event page. Automatically called when user lands on the event URL.

**Example URL:**
```
https://wisers.wellspringsaigon.edu.vn/events/kindergarten-demo-day?event=KDD_EVENT_202511329_Kidzone_1
```

**Request Body:**
```json
{
  "event_name": "KDD_EVENT_202511329_Kidzone_1",
  "referrer": "https://example.com/previous-page",
  "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Visit tracked successfully"
}
```

**Usage in Frontend:**
```typescript
import { useTrackPageVisit } from "../api/use-track-page-visit";

const MyComponent = () => {
  const eventName = "KDD_EVENT_202511329_Kidzone_1";

  // Automatically tracks page visit once
  useTrackPageVisit(eventName);

  return <div>...</div>;
};
```

---

### 2. Get Event Statistics

**Endpoint:** `/tracking.get_event_statistics`

**Method:** `POST`

**Description:** Retrieves comprehensive statistics for an event.

**Request Body:**
```json
{
  "event_name": "KDD_EVENT_202511329_Kidzone_1"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "event_name": "KDD_EVENT_202511329_Kidzone_1",
    "event_title": "Kidzone Kindergarten Demo Day",
    "page_visits": 150,
    "total_registrations": 45,
    "certificates_generated": 40,
    "total_parent_submissions": 50,
    "average_rating": 4.5,
    "registration_open": true
  },
  "message": "Statistics retrieved successfully"
}
```

**Usage in Frontend:**
```typescript
import { useEventStatistics } from "../api/use-track-page-visit";

const StatsComponent = () => {
  const eventName = "KDD_EVENT_202511329_Kidzone_1";
  const { statistics, loading, error, fetchStatistics } = useEventStatistics(eventName);

  useEffect(() => {
    fetchStatistics();
  }, []);

  return (
    <div>
      <p>Page Visits: {statistics?.page_visits}</p>
      <p>Registrations: {statistics?.total_registrations}</p>
      <p>Average Rating: {statistics?.average_rating}/5</p>
    </div>
  );
};
```

---

### 3. Submit Registration

**Endpoint:** `/registration.submit_registration`

**Method:** `POST`

**Description:** Submits a parent registration for certificate request. Student must already be registered by admin.

**Rate Limit:** 100 requests per hour per IP

**Request Body:**
```json
{
  "visit_event": "KDD_EVENT_202511329_Kidzone_1",
  "student_full_name": "John Doe",
  "student_dob": "2020-05-15",
  "parent_full_name": "Jane Doe",
  "parent_email": "jane.doe@example.com",
  "parent_phone_number": "0123456789",
  "rating": 5
}
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "certificate_url": "https://wisers.wellspringsaigon.edu.vn/events/kindergarten-demo-day?certificate_token=abc123",
    "certificate_token": "abc123",
    "student_name": "John Doe",
    "event_title": "Kidzone Kindergarten Demo Day",
    "already_registered": false
  },
  "message": "Registration submitted successfully! Certificate URL has been sent to your email."
}
```

**Response (Duplicate):**
```json
{
  "success": true,
  "data": {
    "certificate_url": "https://wisers.wellspringsaigon.edu.vn/events/kindergarten-demo-day?certificate_token=abc123",
    "certificate_token": "abc123",
    "student_name": "John Doe",
    "event_title": "Kidzone Kindergarten Demo Day",
    "already_registered": true
  },
  "message": "You have already submitted a registration for this student. Certificate URL has been resent to your email."
}
```

**Response (Error - Student Not Found):**
```json
{
  "success": false,
  "message": "Student registration not found. Please ensure the student name and date of birth are correct, or contact the school administrator."
}
```

**Response (Error - Registration Closed):**
```json
{
  "success": false,
  "message": "Registration is closed for this event"
}
```

---

### 4. Get Event Details

**Endpoint:** `/visit_event.get_event_details`

**Method:** `POST`

**Description:** Retrieves detailed information about a specific event.

**Request Body:**
```json
{
  "event_name": "KDD_EVENT_202511329_Kidzone_1"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "name": "KDD_EVENT_202511329_Kidzone_1",
    "title": "Kidzone Kindergarten Demo Day",
    "event_datetime": "2025-11-29 09:00:00",
    "kindergarten": "KG_Kidzone",
    "kindergarten_data": {
      "name": "KG_Kidzone",
      "title": "Kidzone Kindergarten",
      "logo": "/files/kidzone-logo.png",
      "kindergarten_code": "KDZ",
      "contact_person": "Ms. Smith",
      "contact_email": "contact@kidzone.edu.vn",
      "contact_phone": "0123456789"
    },
    "registration_open": true,
    "registration_link": "https://forms.gle/example",
    "group_photo": "/files/group-photo.jpg",
    "registration_count": 45,
    "registered_students": [
      {
        "name": "REG-001",
        "student_full_name": "John Doe",
        "student_dob": "2020-05-15",
        "certificate_generated": true,
        "certificate_url": "https://wisers.wellspringsaigon.edu.vn/events/kindergarten-demo-day?certificate_token=abc123"
      }
    ]
  },
  "message": "Event details retrieved successfully"
}
```

---

### 5. Get Certificate

**Endpoint:** `/certificate.get_certificate`

**Method:** `POST`

**Description:** Retrieves certificate information using a certificate token.

**Request Body:**
```json
{
  "certificate_token": "abc123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "student_name": "John Doe",
    "registration_date": "2025-11-29",
    "group_photo": "/files/group-photo.jpg",
    "kindergarten_logo": "/files/kidzone-logo.png",
    "certificate_token": "abc123"
  },
  "message": "Certificate retrieved successfully"
}
```

---

## Event URL Structure

Event pages follow this URL pattern:

```
https://wisers.wellspringsaigon.edu.vn/events/kindergarten-demo-day?event={EVENT_NAME}
```

**Example:**
```
https://wisers.wellspringsaigon.edu.vn/events/kindergarten-demo-day?event=KDD_EVENT_202511329_Kidzone_1
```

**With Certificate Token:**
```
https://wisers.wellspringsaigon.edu.vn/events/kindergarten-demo-day?event=KDD_EVENT_202511329_Kidzone_1&certificate_token=abc123
```

---

## Validation Rules

### Student Name
- Required
- 2-100 characters
- Letters, spaces, hyphens, and Vietnamese characters allowed

### Date of Birth
- Required
- Format: YYYY-MM-DD
- Must be within valid range (e.g., 2015-2023 for kindergarten)

### Email
- Required
- Valid email format
- RFC 5322 compliant

### Phone Number
- Required
- Vietnamese phone number format
- Accepts: 0123456789, +84123456789, 84123456789

### Rating
- Required
- Integer between 1 and 5

---

## Error Handling

All API endpoints return errors in this format:

```json
{
  "success": false,
  "message": "Error description here"
}
```

Common error codes:
- **400 Bad Request:** Invalid input data
- **404 Not Found:** Event or resource not found
- **429 Too Many Requests:** Rate limit exceeded
- **500 Internal Server Error:** Server error (logged automatically)

---

## Rate Limiting

**Submit Registration:** 100 requests per hour per IP address

When rate limit is exceeded:
```json
{
  "success": false,
  "message": "Rate limit exceeded. Please try again later."
}
```

---

## Security Features

1. **Input Sanitization:** All inputs are sanitized against XSS and SQL injection
2. **Email Verification:** Email format validated before processing
3. **Rate Limiting:** Prevents abuse and spam
4. **Guest Access:** All endpoints allow guest access (no authentication required)
5. **Error Logging:** All errors are logged for debugging

---

## Frontend Integration Example

Complete example of using all APIs in a React component:

```typescript
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useTrackPageVisit, useEventStatistics } from "../api/use-track-page-visit";
import { useEventVisit } from "../api/use-event-visit";
import { useSubmitRegistration } from "../api/use-submit-registration";
import { useGetCertificate } from "../api/use-get-certificate";

const KindergartenEventPage = () => {
  const [searchParams] = useSearchParams();
  const eventName = searchParams.get("event");
  const token = searchParams.get("certificate_token");

  // Track page visit automatically
  useTrackPageVisit(eventName);

  // Get event details
  const { eventVisit } = useEventVisit(eventName);

  // Get statistics (optional)
  const { statistics, fetchStatistics } = useEventStatistics(eventName);

  // Submit registration
  const { submitRegistration, loading } = useSubmitRegistration();

  // Get certificate if token provided
  const { certificate } = useGetCertificate(token);

  const handleSubmit = async (formData) => {
    const result = await submitRegistration({
      visit_event: eventName,
      ...formData
    });

    if (result?.success) {
      // Handle success
    }
  };

  return (
    <div>
      {certificate ? (
        <Certificate data={certificate} />
      ) : (
        <RegistrationForm onSubmit={handleSubmit} />
      )}
    </div>
  );
};
```

---

## Database Schema

### WSE KDD Visit Event
- `name`: Primary key (e.g., KDD_EVENT_202511329_Kidzone_1)
- `title`: Event title
- `event_datetime`: Event date and time
- `kindergarten`: Link to WSE KDD Kindergarten
- `registration_open`: Boolean
- `group_photo`: File attachment
- `page_visit_count`: Integer (tracks visits)

### WSE KDD Student Registration
- `name`: Auto-generated ID
- `visit_event`: Link to WSE KDD Visit Event
- `student_full_name`: Student name
- `student_dob`: Date of birth
- `certificate_generated`: Boolean
- `certificate_token`: Unique token
- `certificate_url`: Full URL to certificate
- `certificate_registration_submission`: Child table with parent submissions

### WSE KDD Certificate Registration Submission (Child Table)
- `parent_full_name`: Parent name
- `parent_email`: Parent email
- `parent_phone_number`: Phone number
- `rating`: Integer (1-5)
- `submission_datetime`: Timestamp
