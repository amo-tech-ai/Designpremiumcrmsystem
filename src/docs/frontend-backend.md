# Frontend-Backend Architecture Audit

**Date:** Sunday, December 7, 2025
**Status:** Partial Implementation (KV Store Simulation)

## Executive Summary
The system is currently running on a **Serverless Key-Value (KV) Architecture** hosted in Supabase Edge Functions. While the `docs/schema.md` defines a relational PostgreSQL schema, the current runtime environment restricts direct database access. Therefore, the backend simulates the relational schema using Namespaced KV Keys.

## Architecture

### 1. Data Layer (KV Store Simulation)
Instead of SQL tables, we use a hierarchical key pattern to provide RLS (Row Level Security) and data isolation per user.

| Logical Table (schema.md) | KV Key Pattern | Implementation Status |
|---------------------------|----------------|-----------------------|
| `crm_contacts` | `crm_contact:${userId}:${contactId}` | ✅ Implemented |
| `crm_interactions` | `crm_interaction:${userId}:${contactId}:${interactionId}` | ✅ Implemented |
| `crm_accounts` | *(Denormalized into Contact)* | ⚠️ Partial (Denormalized) |
| `crm_deals` | `crm_deal:${userId}:${dealId}` | ❌ Pending |
| `crm_tasks` | `crm_task:${userId}:${taskId}` | ❌ Pending |
| `crm_lead_scores` | *(Merged into Contact object)* | ⚠️ Denormalized |
| `crm_lead_enrichment` | *(Merged into Contact object)* | ⚠️ Denormalized |

### 2. API Layer (Edge Functions)
All traffic is routed through `/supabase/functions/server/index.tsx`.
**Base URL:** `https://${projectId}.supabase.co/functions/v1/make-server-6522a742`

#### Auth & Security
- **Middleware:** Custom `getUser` helper extracts Bearer token from `Authorization` header.
- **RLS:** Enforced in application logic. All keys are prefixed with `${user.id}`.
- **CORS:** Open for development (`*`), supports `GET`, `POST`, `PUT`, `DELETE`.

#### Endpoints
- `GET /crm/contacts`: List all contacts for user.
- `POST /crm/contacts`: Create new contact.
- `GET /crm/contacts/:id`: Get contact details.
- `PUT /crm/contacts/:id`: Update contact.
- `GET /crm/interactions`: Get history for a contact.
- `POST /crm/interactions`: Log new activity.
- `POST /crm/ai/summarize`: Gemini AI summary.
- `POST /crm/ai/score`: Gemini AI lead scoring.
- `POST /crm/ai/extract-from-url`: Gemini AI web scraping simulation.

### 3. Frontend Integration

| Component | Status | Backend Hook/Action | Notes |
|-----------|--------|---------------------|-------|
| `ContactsDashboard` | ✅ Wired | `useContacts` | Fetches live data. |
| `ContactPanel` | ✅ Wired | `useContactDetail` | Supports Read/Write/AI. |
| `ContactDiscovery` | ✅ Wired | `addContact` | Pushes new leads to DB. |
| `AddContactSidebar` | ✅ Wired | `addContact` | Supports enrichment. |
| `PipelineDashboard` | ❌ Mock Data | `N/A` | Uses `data.ts`. Needs wiring. |
| `TasksDashboard` | ❌ Mock Data | `N/A` | Needs wiring. |

## Discrepancies & Risks

1.  **Schema Divergence:** `schema.md` defines rigorous constraints (FKs, CHECKs) which are not enforced by the KV store. Data integrity relies entirely on application logic.
2.  **Performance:** `GET /crm/contacts` fetches *all* keys for a user. Pagination is not implemented server-side.
3.  **Concurrency:** KV `get` -> `set` pattern for updates is not atomic. Race conditions are possible if multiple users edit the same record (though users are isolated by design).

## Recommendations
1.  **Implement Deals:** Create `GET/POST /crm/deals` endpoints to support `PipelineDashboard`.
2.  **Implement Tasks:** Create `GET/POST /crm/tasks` endpoints.
3.  **Refactor Hooks:** Centralize API calls in a service layer rather than scattered across hooks.
