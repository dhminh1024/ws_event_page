# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Wellspring Event Page is a Frappe app that manages landing pages and registration systems for various events at Wellspring (an educational institution). The app consists of multiple event types including Happy Box (Tet Challenge), Happy Run (obstacle race), Nutrition Journey, Placement Test (Admission Check-in), and Greatest Show 25.

## Local Configuration

**IMPORTANT**: Check for a `CLAUDE_LOCAL.md` file in the repository root. This file contains machine-specific configuration including:

- Docker container details and commands
- Local development environment setup
- Specific paths and URLs for the local machine
- Custom development workflow for the specific environment

If `CLAUDE_LOCAL.md` exists, prioritize its instructions over the general commands in this file, especially for running bench commands and development workflows.

## Technology Stack

**Backend:**

- Frappe Framework v15+ (Python-based web framework)
- Python 3.10+
- MariaDB database
- RESTful APIs with whitelisted methods

**Frontend:**

- React 18.3.1 with TypeScript
- Vite 6.0.1 (build tool and dev server)
- React Router DOM for routing
- frappe-react-sdk for Frappe integration
- TailwindCSS + shadcn/ui components + Styled Components
- Yarn for package management

Frappe is a full-stack web application framework that provides a powerful backend with a RESTful API, real-time capabilities using Socket.io, and a flexible frontend architecture. You might find it helpful to refer to:

- [Frappe Documentation](https://docs.frappe.io/framework/user/en/introduction)
- [ERPNext Documentation](https://docs.frappe.io/erpnext/user/manual/en/introduction)
- Frappe app codebase is in the same folder with this project. You can find it in `../frappe`, similar to ERPNext codebase at `../erpnext`.

## Architecture

### Event-Based Organization

Each event has isolated code in both frontend and backend:

- **Happy Box (HB)**: Tet Challenge event
- **Happy Run (HR)**: Obstacle race event
- **Nutrition Journey (NJ)**: Nutrition education program
- **Admission Check-in (AC)**: Placement test system
- **Greatest Show 25 (GS)**: Performance event

Frontend apps are in `frontend/src/app/{event-name}/`, backend DocTypes and APIs use event abbreviations as prefixes (e.g., `wse_hb_*`, `wse_hr_*`).

### Frontend Architecture

**Atomic Design Pattern**: Components are organized hierarchically:

- `core/ui/atoms/`: Basic UI components (buttons, inputs, cards)
- `core/ui/molecules/`: Composite components
- `core/ui/templates/`: Page templates
- `features/`: Shared feature modules
- `app/`: Event-specific applications

**Path Aliases**: TypeScript path mapping for clean imports:

- `@atoms`, `@molecules`, `@templates`: UI components
- `@features`, `@hooks`, `@utils`: Core functionality
- `@api`, `@types`, `@lib`: API and type definitions
- `@app/*`: Event-specific code

**Routing**: React Router with lazy loading for code splitting. Root router in `app/router.tsx`, event-specific routers in each app directory.

**State Management**: Uses React Context API (SettingsProvider, ThemeProvider) and frappe-react-sdk hooks. No Redux or Zustand.

### Backend Architecture (Frappe)

**DocTypes**: All DocTypes prefixed with `WSE` (Wellspring Event). Located in `ws_event_page/wellspring_event_page/doctype/`.

**API Structure**: Server-side methods in `ws_event_page/api/` organized by event type. Methods exposed via `@frappe.whitelist()` decorator.

**Website Routes**: Custom routing configured in `hooks.py` to serve the React SPA at `/events/*` paths while allowing Frappe to handle backend routes.

### Build Process Flow

1. Frontend built with Vite → `ws_event_page/public/frontend/`
2. `index.html` copied to `ws_event_page/www/events.html` (Frappe serves this)
3. CSRF token injected via Jinja2 template in `events.html`
4. React app uses frappe-react-sdk to call Frappe APIs
5. Dynamic content managed via WSE Event DocType with variable substitution

**Frontend Development Principles:**

- Use `frappe-react-sdk` for API integration following best practices of using SWR the library which is integrated into `frappe-react-sdk`.
  - Keep the Frappe API Methods, SWR Keys in `FRAPPE_APIS` in `api.config.ts` file.
  - Always handle errors and loading states in your components.
  - Generate types for Doctypes to ensure type safety in API responses.
- Use Zustand for global state management.
- Always try to reuse UI components and hooks, if they are already available. In case you need to create a new component, try to follow the existing patterns and use Shadcn UI components.

**Clean Code Principles**

- Write code that is easy to maintain, follow coding best practices, like SOLID principles, DRY (Don’t Repeat Yourself), and KISS (Keep It Simple, Stupid).
- Avoid deeply nested logic — break it into smaller functions.
- Write self-documenting code with meaningful variable and function names.
- Always add docstrings to functions and methods.

## Key Conventions

### Naming

- **DocTypes**: `WSE` prefix (e.g., `WSE Event`, `WSE Settings`)
- **Event abbreviations**: HB (Happy Box), HR (Happy Run), NJ (Nutrition Journey), AC (Admission Check-in), GS (Greatest Show)
- **Python**: snake_case for functions and variables
- **React**: PascalCase for components
- **Files**: kebab-case for most files

### Authentication System

Uses custom "WS Code" authentication system. Key components:

- `frontend/src/lib/auth/`: Auth logic and guards
- `ws_event_page/api/auth/`: Backend auth APIs
- Guest and authenticated routes with route guards
- Session managed by Frappe's auth system

### Frappe Integration Patterns

**Critical Requirements:**

- Built frontend assets MUST be in `public/frontend/`
- HTML entry point MUST be in `www/` directory
- Website route rules in `hooks.py` allow SPA routing within Frappe
- CSRF token required for all POST requests (injected in template)

**API Usage:**

- Use frappe-react-sdk hooks: `useFrappeGetDoc`, `useFrappePostCall`, `useFrappeGetCall`
- All API methods must be whitelisted with `@frappe.whitelist()`
- Guest access configured per method with `allow_guest=True`

**Environment Variables:**

- Frontend uses `.env` file with `VITE_` prefix
- Proxy configuration in `frontend/src/proxyOptions.ts`
- Base path for routing configured via environment

### Styling Approach

- TailwindCSS for utility classes
- Styled Components for dynamic/complex styling
- shadcn/ui for pre-built accessible components
- Custom color schemes per event in `tailwind.config.js`
- CSS variables for theming (defined per event)

### Dynamic Content Management

The `WSE Event` DocType supports variable substitution in content:

- Variables defined as key-value pairs in DocType
- Variables can be used in content with `{{variable_name}}` syntax
- Content rendered dynamically in frontend

## Important Patterns

### Adding a New Event

1. Create DocTypes with `wse_{event_abbr}_*` naming
2. Add API endpoints in `ws_event_page/api/event/{event_name}/`
3. Create frontend app in `frontend/src/app/{event-name}/`
4. Define routes in the app's router
5. Add route to root router in `frontend/src/app/router.tsx`
6. Update `tailwind.config.js` with event-specific colors if needed

### Component Development

Follow atomic design:

1. Create atoms for basic UI elements
2. Compose molecules from atoms
3. Build templates using molecules
4. Use templates in event-specific pages

Import using path aliases: `import { Button } from '@atoms/button'`

### API Development

```python
# ws_event_page/api/event/{event_name}/{file}.py
import frappe

@frappe.whitelist(allow_guest=True)  # For public access
def get_event_data(event_id):
    # Implementation
    return {"data": "..."}
```

Consume in frontend:

```typescript
import { useFrappeGetCall } from "frappe-react-sdk";

const { data } = useFrappeGetCall(
  "ws_event_page.api.event.{event_name}.{file}.get_event_data",
  {
    event_id: "EVENT-001",
  }
);
```

### Testing Workflow

When making changes:

1. Modify frontend code
2. Hot reload handles updates in dev mode
3. For backend changes, restart bench or use `bench console` to test
4. Build frontend before deploying: `yarn build`
5. Clear Frappe cache: `bench clear-cache`
6. Run migrations if DocTypes changed: `bench migrate`

## Directory Structure Notes

**Frontend build artifacts (git ignored):**

- `ws_event_page/public/frontend/` - Built assets
- `ws_event_page/www/events.html` - Generated entry point

**Event-specific static assets:**

- `frontend/public/{event-name}/` - Images, fonts, etc. per event
- These are copied to build output during build

**Email templates:**

- Located in `ws_event_page/templates/emails/`
- Use Jinja2 syntax
- Can be sent via Frappe's email system

## Hooks System

`hooks.py` defines:

- App metadata and dependencies
- DocType fixtures for export
- Website route rules for SPA routing
- After install/migrate hooks for setup
- Scheduled tasks (if any)

Key website route rule pattern:

```python
website_route_rules = [
    {"from_route": "/events/<path:app_path>", "to_route": "events"},
]
```

This allows React Router to handle all `/events/*` routes while serving `events.html`.
