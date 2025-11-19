# Overview

A system to manage kindergarten visit events at Wellspring School, collect parent/student information, and generate participation certificates.

## Core Features

- Event Management: Track kindergarten visits and demo lessons
- Registration Management: Collect and validate parent/student information
- Certificate Generation: Auto-generate certificates with student names and group photos

## Doctypes

- WSE KDD Kindergarten: Manage kindergarten details and contact information
- WSE KDD Visit Event: Manage event details and logistics
- WSE KDD Student Registration: Collect and validate registration information, certificate url generation
- WSE KDD Certificate Registration: Childtable to manage multiple certificate submissions per student registration

## Usage

### Administrators:

1. Create list of kindergartens in "WSE KDD Kindergarten".
2. Schedule events in "WSE KDD Visit Event".
3. Import student registrations via "WSE KDD Student Registration".

### Parents:

1. Click on the registration link provided by the school (managed via "WSE KDD Visit Event").
2. Fill out the student full name and DOB for verification, also fill out parent contact details.
3. Submit the registration form and see the certificate with a group photo (managed via WSE KDD Visit Event).
4. Receive the certificate url via email for later access.

Multiple parents can submit registrations for the same student, and all submissions will see the same certificate with the group photo (one certificate per student).

## API Endpoints

- `/api/method/wellspring_event_page.api.kindergarten_demo_day.visit_event.get_list_of_events`: Get list of upcoming visit events
- `/api/method/wellspring_event_page.api.kindergarten_demo_day.visit_event.get_event_details`: Get details of a specific visit event including list of registered students
- `/api/method/wellspring_event_page.api.kindergarten_demo_day.registration.submit_registration`: Parent submits student registration for event certificate.
- `/api/method/wellspring_event_page.api.kindergarten_demo_day.certificate.get_certificate`: Retrieve the certificate information of a registered student

## Frontend URLs

- Kindergarten Demo Day Event: `/kindergarten-demo-day?event=VISIT_EVENT_NAME`
- Kindergarten Demo Day Registration: `/kindergarten-demo-day?event=VISIT_EVENT_NAME&action=register`
- Kindergarten Demo Day Certificate: `/kindergarten-demo-day?event=VISIT_EVENT_NAME&action=certificate&certificate_token=CERTIFICATE_TOKEN`
