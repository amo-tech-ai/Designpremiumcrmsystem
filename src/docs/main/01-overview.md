# StartupAI - Complete Technical Overview

**Version:** 2.0  
**Last Updated:** December 22, 2025  
**Status:** Production Ready  
**Document Type:** Master Technical Reference  

---

## Table of Contents

1. [Tech Stack & Versions](#tech-stack--versions)
2. [Directory Structure](#directory-structure)
3. [Routing Architecture](#routing-architecture)
4. [Import Paths & Conventions](#import-paths--conventions)
5. [Frontend Framework & Libraries](#frontend-framework--libraries)
6. [Backend Architecture](#backend-architecture)
7. [Database Schema Overview](#database-schema-overview)
8. [Sitemap - Frontend Routes](#sitemap---frontend-routes)
9. [Sitemap - Backend API Routes](#sitemap---backend-api-routes)
10. [User Journeys](#user-journeys)
11. [Workflows](#workflows)
12. [Marketing Pages](#marketing-pages)
13. [Dashboard System](#dashboard-system)
14. [Wizard Systems](#wizard-systems)
15. [UI Component Library](#ui-component-library)
16. [Additional Technical Details](#additional-technical-details)

---

## Tech Stack & Versions

### Frontend Core

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | Latest (18.x) | Core UI framework |
| **TypeScript** | Latest | Type safety |
| **Tailwind CSS** | 4.0 | Styling framework |
| **Motion (Framer Motion)** | Latest | Animation library |
| **Vite** | Latest | Build tool & dev server |

### UI & Component Libraries

| Library | Version | Purpose |
|---------|---------|---------|
| **Lucide React** | Latest | Icon library |
| **shadcn/ui** | Latest | Base UI components |
| **Recharts** | Latest | Data visualization |
| **Sonner** | 2.0.3 | Toast notifications |
| **React Hook Form** | 7.55.0 | Form management |
| **React Slick** | Latest | Carousels |
| **React DnD** | Latest | Drag & drop |
| **React Responsive Masonry** | Latest | Masonry layouts |
| **Re-resizable** | Latest | Resizable components |

### Backend & Infrastructure

| Technology | Version | Purpose |
|------------|---------|---------|
| **Supabase** | 2.49.8 | Backend-as-a-Service |
| **Deno** | Latest | Edge function runtime |
| **Hono** | Latest | Web server framework |
| **PostgreSQL** | 15+ | Relational database |
| **Google Gemini** | 3.0 Pro | AI/LLM integration |

### Authentication & Storage

| Service | Purpose |
|---------|---------|
| **Supabase Auth** | User authentication (email, OAuth) |
| **Supabase Storage** | File/image storage |
| **Supabase Realtime** | Live data subscriptions |
| **Supabase Edge Functions** | Serverless API endpoints |

---

## Directory Structure

```
/
├── App.tsx                          # Main application entry point
├── components/                      # React components
│   ├── auth/                       # Authentication pages
│   │   └── AuthPage.tsx           # Login/signup UI
│   ├── company-profile/           # Company profile editor
│   │   └── CompanyProfileEditor.tsx
│   ├── crm/                       # CRM system components
│   │   ├── ContactsDashboard.tsx  # Main contacts view
│   │   ├── ContactDetailPage.tsx  # Single contact view
│   │   ├── PipelineDashboard.tsx  # Kanban pipeline
│   │   ├── FounderDashboard.tsx   # Main founder dashboard
│   │   ├── TasksDashboard.tsx     # Task management
│   │   ├── ActivityFeed.tsx       # Activity timeline
│   │   ├── AIInsights.tsx         # AI recommendations
│   │   ├── GTMStrategy.tsx        # Go-to-market planner
│   │   ├── ContactDiscovery.tsx   # Lead discovery
│   │   ├── DeckTemplateSystem.tsx # Template gallery
│   │   ├── PitchDeckEditor.tsx    # Deck editor
│   │   ├── PitchDeckWizard.tsx    # Deck generation wizard
│   │   ├── DocumentWorkspace.tsx  # Document manager
│   │   ├── LeanCanvasBuilder.tsx  # Lean canvas tool
│   │   ├── hooks.ts               # React hooks for data
│   │   ├── types.ts               # TypeScript types
│   │   ├── actions.ts             # API actions
│   │   ├── sampleContacts.ts      # Demo data
│   │   ├── seed.ts                # Database seeding
│   │   └── data.ts                # Static data
│   ├── editor/                    # Pitch deck editor
│   │   ├── EditorCanvas.tsx       # Main canvas
│   │   ├── EditorSidebarLeft.tsx  # Slide navigation
│   │   ├── EditorSidebarRight.tsx # Properties panel
│   │   ├── AIChatPanel.tsx        # AI assistant
│   │   ├── SlideRenderer.tsx      # Slide renderer
│   │   └── types.ts               # Editor types
│   ├── event-wizard/              # Event creation wizard
│   │   ├── EventWizard.tsx
│   │   ├── EventWizardStep1.tsx
│   │   ├── EventWizardStep2.tsx
│   │   └── types.ts
│   ├── landing/                   # Marketing pages
│   │   ├── LandingPageV2.tsx      # Main landing (Firecrawl aesthetic)
│   │   ├── LandingPage.tsx        # Legacy landing
│   │   ├── HowItWorksPage.tsx     # Feature showcase
│   │   ├── BusinessModelPage.tsx  # Business model page
│   │   ├── StandardPage.tsx       # Generic template
│   │   └── Footer.tsx             # Shared footer
│   ├── layout/                    # Layout components
│   │   ├── Sidebar.tsx            # App navigation
│   │   └── TopNavbar.tsx          # Top header
│   ├── modals/                    # Dialog overlays
│   │   ├── ImageGenerationModal.tsx
│   │   └── LogoutModal.tsx
│   ├── pitch-wizard/              # Pitch deck wizard
│   │   ├── PitchDeckGenerationScreen.tsx
│   │   ├── LoadingAnimation.tsx
│   │   └── steps/
│   │       ├── StepContext.tsx
│   │       ├── StepDetails.tsx
│   │       ├── StepFinancials.tsx
│   │       └── StepAesthetic.tsx
│   ├── projects/                  # Project management
│   │   ├── ProjectsDashboard.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectDetailSheet.tsx
│   │   ├── GanttTimeline.tsx
│   │   ├── KPICards.tsx
│   │   ├── ActivityFeed.tsx
│   │   └── dashboard/             # Dashboard widgets
│   ├── settings/                  # User settings
│   │   ├── AccountSettings.tsx
│   │   ├── BillingSettings.tsx
│   │   └── WorkspaceSettings.tsx
│   ├── style-guide/               # Design system
│   │   └── StyleGuidePage.tsx
│   ├── support/                   # Help & support
│   │   └── HelpCenter.tsx
│   ├── ui/                        # shadcn/ui components
│   │   ├── accordion.tsx
│   │   ├── alert-dialog.tsx
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── checkbox.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── popover.tsx
│   │   ├── select.tsx
│   │   ├── separator.tsx
│   │   ├── sheet.tsx
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   ├── textarea.tsx
│   │   ├── toast.tsx
│   │   ├── tooltip.tsx
│   │   └── utils.ts              # cn() utility
│   ├── user-profile/             # User profile
│   │   └── UserProfile.tsx
│   ├── wizard/                   # Startup profile wizard
│   │   ├── StartupProfileWizard.tsx
│   │   ├── StartupProfileContext.tsx
│   │   ├── WizardSteps.tsx
│   │   ├── WizardFooter.tsx
│   │   └── steps/
│   │       ├── StepBusiness.tsx
│   │       ├── StepContext.tsx
│   │       ├── StepTeam.tsx
│   │       ├── StepTraction.tsx
│   │       ├── StepFunding.tsx
│   │       ├── StepSummary.tsx
│   │       └── StepAISummary.tsx
│   ├── workflow/                 # Workflow diagrams
│   │   └── WorkflowDiagram.tsx
│   ├── ErrorBoundary.tsx         # Error handling
│   └── ProfileDropdown.tsx       # User menu
├── docs/                         # Documentation
│   ├── main/
│   │   └── 01-overview.md        # This file
│   ├── prd/                      # Product docs
│   │   ├── product-requirements-document.md
│   │   ├── sitemap-and-features.md
│   │   ├── workflows-and-diagrams.md
│   │   └── executive-summary.md
│   ├── schema.md                 # Database schema
│   ├── landing-page-v2-style-guide.md
│   ├── 010-color-palette.md
│   └── troubleshooting.md
├── services/                     # Frontend services
│   ├── deckService.ts           # Deck API client
│   └── edgeFunctions.ts         # Edge function client
├── src/types/                   # TypeScript types
│   └── deck.ts
├── styles/                      # Global styles
│   └── globals.css              # Tailwind + CSS variables
├── supabase/functions/server/   # Backend edge functions
│   ├── index.tsx                # Main server entry
│   ├── crm.ts                   # CRM endpoints
│   ├── generate-deck.ts         # Deck generation
│   ├── slide-ai.ts              # AI slide generation
│   ├── image-ai.ts              # AI image generation
│   ├── research-ai.ts           # AI research
│   └── kv_store.tsx            # Key-value store (protected)
├── utils/                       # Utilities
│   ├── supabase/
│   │   ├── client.ts           # Supabase client
│   │   └── info.tsx            # Project config (protected)
│   ├── logger.ts
│   └── bestPractices.ts
├── guidelines/
│   └── Guidelines.md
└── tsconfig.json               # TypeScript config
```

---

## Routing Architecture

### Route Type System

```typescript
type View = 
  // Marketing Pages
  | 'landing' | 'landing-v2' | 'how-it-works' | 'business-model' 
  | 'about' | 'careers' | 'legal' | 'contact' | 'blog' 
  | 'community' | 'help' | 'pricing'
  
  // App Dashboard & CRM
  | 'dashboard' | 'contacts' | 'contact-detail' | 'pipeline' 
  | 'tasks' | 'activities' | 'insights' | 'discovery' | 'gtm'
  
  // Tools & Wizards
  | 'wizard' | 'event-wizard' | 'startup-profile' 
  | 'lean-canvas' | 'templates' | 'editor'
  
  // Projects & Documents
  | 'projects' | 'documents'
  
  // User & Settings
  | 'profile' | 'company-profile' | 'settings-account' 
  | 'settings-billing' | 'settings-workspaces' | 'support'
  
  // Design System
  | 'style-guide';
```

### Routing Implementation

- **Frontend:** Client-side state-based routing via React useState
- **Navigation:** `onNavigate(view: string)` callback pattern
- **Backend:** RESTful endpoints prefixed with `/make-server-6522a742/`
- **Deep Linking:** URL path detection in useEffect for wizard states
- **Lazy Loading:** All heavy components loaded via `React.lazy()`

---

## Import Paths & Conventions

### Path Resolution

```typescript
// Absolute imports from root
import { Button } from './components/ui/button'
import { supabase } from './utils/supabase/client'
import { toast } from 'sonner@2.0.3'  // Versioned import

// Component-relative imports
import { ContactCard } from './ContactCard'
import { useContacts } from './hooks'
import type { Contact } from './types'

// Motion library (Framer Motion)
import { motion } from 'motion/react'

// Lucide icons
import { ArrowRight, Sparkles } from 'lucide-react'
```

### Special Import Rules

**Versioned Imports:**
- `react-hook-form@7.55.0` - Form library
- `sonner@2.0.3` - Toast notifications

**Protected Modules:**
- `/utils/supabase/info.tsx` - Project credentials (auto-generated)
- `/supabase/functions/server/kv_store.tsx` - KV store utilities
- `/components/figma/ImageWithFallback.tsx` - Image component

**Image Imports:**
```typescript
// Raster images (PNG/JPG)
import img from "figma:asset/abc123.png"  // Virtual module

// SVG vectors
import svgPaths from "./imports/svg-wg56ef214f"  // Relative path
```

---

## Frontend Framework & Libraries

### React Ecosystem

**Core:**
- React 18+ with hooks (useState, useEffect, useCallback, useMemo)
- TypeScript for type safety
- Suspense for code splitting
- Error boundaries for fault isolation

**State Management:**
- Local component state (useState)
- Context API for wizard forms
- Custom hooks for data fetching
- Supabase realtime subscriptions

**Styling:**
- Tailwind CSS 4.0 (utility-first)
- CSS custom properties (design tokens)
- Responsive breakpoints (sm, md, lg, xl)
- Dark mode support via custom variant

**Animation:**
- Motion (Framer Motion) for transitions
- CSS transitions for hover states
- Scroll-triggered animations
- Loading skeleton states

---

## Backend Architecture

### Edge Functions (Deno Runtime)

**Server Framework:** Hono.js  
**Runtime:** Deno (serverless)  
**Base URL:** `https://{projectId}.supabase.co/functions/v1/make-server-6522a742`

### API Architecture

```
┌─────────────────────────────────────────────┐
│          Frontend (React)                    │
│  ┌─────────────────────────────────────┐   │
│  │  fetch() → /make-server-6522a742/*  │   │
│  │  Authorization: Bearer {token}      │   │
│  └─────────────────────────────────────┘   │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│    Supabase Edge Function (Hono Server)     │
│  ┌─────────────────────────────────────┐   │
│  │  CORS + Logger Middleware           │   │
│  │  Auth Middleware (getUser)          │   │
│  └─────────────────────────────────────┘   │
│                                              │
│  Routes:                                     │
│  • POST /generate-deck                      │
│  • POST /slide-ai                           │
│  • POST /image-ai                           │
│  • POST /research-ai                        │
│  • POST /seed-crm                           │
│  • POST /storage/upload-url                 │
│  • GET  /health                             │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│         PostgreSQL (Supabase)               │
│  • 40 tables (decks, slides, contacts...)  │
│  • Row-Level Security (RLS)                │
│  • Full-text search indexes                │
│  • Audit logs & timestamps                 │
└─────────────────────────────────────────────┘
```

### Middleware Stack

1. **Logger:** Logs all requests to console
2. **CORS:** Open CORS for all origins
3. **Auth:** Bearer token validation via Supabase Auth
4. **Error Handling:** Try-catch with detailed error responses

---

## Database Schema Overview

### Core Tables (10)

| Table | Purpose | Key Columns |
|-------|---------|-------------|
| `profiles` | User profiles | id, email, name, avatar_url |
| `orgs` | Organizations | id, name, slug |
| `startups` | Startup profiles | id, name, tagline, stage, metrics |
| `startup_founders` | Founding team | id, startup_id, name, title |
| `startup_metrics_snapshots` | Metrics history | id, startup_id, mrr, users, timestamp |
| `audit_log` | Change tracking | id, table_name, action, user_id |
| `ai_runs` | AI job tracking | id, model, prompt, status |
| `kv_store_6522a742` | Key-value cache | key, value |
| `org_members` | Team membership | org_id, user_id |
| `assets` | File storage refs | id, url, type, size |

### Pitch Deck System (5)

| Table | Purpose | Key Columns |
|-------|---------|-------------|
| `decks` | Deck documents | id, title, template, status, format |
| `slides` | Individual slides | id, deck_id, position, type, content |
| `citations` | Source references | id, slide_id, url, quote |
| `share_links` | Public sharing | id, deck_id, token, view_count |
| `market_sizing_results` | TAM/SAM/SOM | id, deck_id, tam, sam, som |

### CRM System (10)

| Table | Purpose | Key Columns |
|-------|---------|-------------|
| `crm_contacts` | Contact people | id, first_name, email, tags, overall_score |
| `crm_accounts` | Companies | id, name, domain, industry |
| `crm_deals` | Opportunities | id, name, value, stage, sector |
| `crm_tasks` | Follow-ups | id, title, due, status, assigned_to |
| `crm_interactions` | Activity log | id, contact_id, type, summary |
| `crm_lead_scores` | AI scoring | id, contact_id, score, reasoning |
| `crm_lead_enrichment` | AI research | id, contact_id, linkedin_data |
| `crm_deal_enrichment` | Deal research | id, deal_id, market_analysis |
| `crm_deal_stage_history` | Stage changes | id, deal_id, from_stage, to_stage |
| `automation_rules` | Workflows | id, trigger, action, conditions |

### Fundraising & Community (10)

| Table | Purpose |
|-------|---------|
| `investors` | Investor directory |
| `investor_outreach` | Outreach tracking |
| `investor_docs` | One-pagers, memos |
| `accelerators` | Accelerator database |
| `accelerator_applications` | Application tracking |
| `data_room_files` | Due diligence docs |
| `events` | Community events |
| `event_registrations` | Event signups |
| `jobs` | Job postings |
| `job_applications` | Applications |

---

## Sitemap - Frontend Routes

### Public Marketing Pages

```
/landing-v2           → LandingPageV2.tsx (Default home - Firecrawl aesthetic)
/landing              → LandingPage.tsx (Legacy landing)
/how-it-works         → HowItWorksPage.tsx (Feature showcase)
/business-model       → BusinessModelPage.tsx (Business model page)
/pricing              → StandardPage.tsx (currentView='pricing')
/about                → StandardPage.tsx (currentView='about')
/careers              → StandardPage.tsx (currentView='careers')
/legal                → StandardPage.tsx (currentView='legal')
/contact              → StandardPage.tsx (currentView='contact')
/blog                 → StandardPage.tsx (currentView='blog')
/community            → StandardPage.tsx (currentView='community')
/help                 → StandardPage.tsx (currentView='help')
/style-guide          → StyleGuidePage.tsx (Design system documentation)
```

### Authenticated App Routes

```
/dashboard            → FounderDashboard.tsx (Main command center)
/contacts             → ContactsDashboard.tsx (CRM contacts grid)
/contact-detail       → ContactDetailPage.tsx (Single contact view)
/pipeline             → PipelineDashboard.tsx (Kanban deal pipeline)
/tasks                → TasksDashboard.tsx (Task management)
/activities           → ActivityFeed.tsx (Activity timeline)
/insights             → AIInsights.tsx (AI recommendations)
/discovery            → ContactDiscovery.tsx (Lead discovery tool)
/gtm                  → GTMStrategy.tsx (Go-to-market planner)
/projects             → ProjectsDashboard.tsx (Project management)
/documents            → DocumentWorkspace.tsx (Document manager)
/templates            → DeckTemplateSystem.tsx (Template gallery)
/lean-canvas          → LeanCanvasBuilder.tsx (Lean canvas tool)
```

### Wizards & Editors

```
/wizard               → PitchDeckWizard.tsx (Deck generation wizard)
/editor               → PitchDeckEditor.tsx (Deck editor canvas)
/startup-profile      → StartupProfileWizard.tsx (Profile setup wizard)
/event-wizard         → EventWizard.tsx (Event creation wizard)
```

### Settings & Profile

```
/profile              → UserProfile.tsx (User profile page)
/company-profile      → CompanyProfileEditor.tsx (Company profile editor)
/settings-account     → AccountSettings.tsx (Account settings)
/settings-billing     → BillingSettings.tsx (Billing settings)
/settings-workspaces  → WorkspaceSettings.tsx (Workspace settings)
/support              → HelpCenter.tsx (Help center)
```

---

## Sitemap - Backend API Routes

**Base URL:** `https://{projectId}.supabase.co/functions/v1/make-server-6522a742`

### Health & Utilities

```
GET  /health                    → { status: "ok" }
```

### Pitch Deck Generation

```
POST /generate-deck             → Generate full pitch deck
  Body: { startup_id, template, style }
  Response: { deck_id, slides[], status }

POST /slide-ai                  → Generate single slide
  Body: { slide_type, context }
  Response: { content, layout }

POST /image-ai                  → Generate slide image
  Body: { prompt, style }
  Response: { image_url }

POST /research-ai               → Market research
  Body: { topic, depth }
  Response: { insights[], sources[] }
```

### CRM Operations

```
POST /seed-crm                  → Seed demo CRM data
  Response: { success, message }

POST /crm/ai/summarize          → Summarize contact
  Body: { contact_id }
  Response: { summary }

POST /crm/ai/score              → Score lead
  Body: { contact_id }
  Response: { score, reasoning, next_steps[] }

POST /crm/ai/extract-from-url   → Enrich from LinkedIn
  Body: { url }
  Response: { name, title, company, bio }

POST /crm/ai/analyze-deal       → Analyze deal
  Body: { deal }
  Response: { probability, risks[], opportunities[] }
```

### Storage

```
POST /storage/upload-url        → Get signed upload URL
  Body: { filename, content_type }
  Response: { upload_url, public_url }
```

### Company Profile

```
POST /company-profile/ai-analyze  → Analyze profile
  Body: { profile }
  Response: { strengths[], gaps[], recommendations[] }
```

### Startup Profile

```
GET  /startup-profile           → Get current profile
  Response: { startup, founders[], metrics }
```

### CRM Stats

```
GET  /crm/stats                 → Get CRM statistics
  Response: { total_contacts, active_deals, conversion_rate }
```

---

## User Journeys

### Journey 1: New Founder Onboarding

```
1. Land on /landing-v2
2. Click "Sign up" → AuthPage (email signup)
3. Auto-redirect to /startup-profile (wizard)
   → Step 1: Business basics (name, tagline, stage)
   → Step 2: Context (problem, solution, market)
   → Step 3: Team (founders, advisors)
   → Step 4: Traction (metrics, customers)
   → Step 5: Fundraising (ask, use of funds)
   → Step 6: AI Summary & Review
4. Submit → /dashboard (Founder Dashboard)
5. See profile strength (65%), quick actions, empty widgets
```

### Journey 2: Generate Pitch Deck

```
1. From /dashboard → Click "Generate Pitch Deck"
2. Navigate to /wizard (PitchDeckWizard)
   → Step 1: Context Input (paste website, upload files)
   → Step 2: Details & Metrics (revenue, growth, team size)
   → Step 3: Financials (burn rate, runway, ask amount)
   → Step 4: Aesthetic (color scheme, logo upload)
3. Click "Generate" → Loading screen (30-60s)
4. Auto-redirect to /editor (PitchDeckEditor)
5. Edit slides, add notes, export PDF/PPTX
```

### Journey 3: CRM Lead Management

```
1. From /dashboard → Click "Contacts"
2. Navigate to /contacts (ContactsDashboard)
3. See empty state → Click "Add Sample Contacts"
4. Grid populates with 10 demo contacts
5. Click contact card → /contact-detail
6. See profile, activity timeline, AI scoring
7. Click "Enrich from LinkedIn" → Paste URL → AI fills fields
8. Click "AI Insights" → Get next steps recommendation
9. Create task → "Follow up on proposal"
10. Move contact to deal pipeline → /pipeline
```

### Journey 4: Deal Pipeline Management

```
1. From /dashboard → Click "Pipeline"
2. Navigate to /pipeline (PipelineDashboard)
3. Toggle between "Sales" and "Investor" pipelines
4. Drag deal cards between stages (Awareness → Consideration → Decision)
5. Click deal card → Side panel opens
6. See deal details, contact info, stage history
7. Click "AI Analyze" → Get win probability, risks, opportunities
8. Update deal value, close date
9. Mark as "Won" or "Lost"
10. See updated dashboard metrics
```

---

## Workflows

### Workflow 1: Pitch Deck Generation (AI Pipeline)

```
┌─────────────────────────────────────────────────────────┐
│  User Input (Wizard)                                     │
│  • Website URL, PDF uploads, text notes                 │
│  • Metrics (MRR, users, growth rate)                    │
│  • Financials (burn, runway, ask)                       │
│  • Style preferences (colors, logo)                     │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│  Frontend: Call POST /generate-deck                     │
│  • Send startup_id, template, style config              │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│  Backend: generate-deck.ts                              │
│  1. Fetch startup profile from database                 │
│  2. Call Google Gemini API (structured output)          │
│     → Prompt: "Generate investor deck for {startup}"    │
│  3. Parse JSON response (12 slides)                     │
│  4. For each slide:                                     │
│     a. Generate layout via slide-ai.ts                  │
│     b. Generate hero image via image-ai.ts (optional)   │
│     c. Insert into database (slides table)              │
│  5. Create deck record (decks table)                    │
│  6. Return deck_id                                      │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│  Frontend: Redirect to /editor                          │
│  • Load deck by ID                                      │
│  • Render slides in canvas                              │
│  • Enable editing, export                               │
└─────────────────────────────────────────────────────────┘
```

### Workflow 2: Contact Enrichment (LinkedIn → CRM)

```
┌─────────────────────────────────────────────────────────┐
│  User: Paste LinkedIn URL in contact detail page        │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│  Frontend: Call enrichContact(url)                      │
│  • POST /crm/ai/extract-from-url                        │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│  Backend: Gemini API                                    │
│  • Fetch LinkedIn page (or use mock data)               │
│  • Extract: name, title, company, bio, skills           │
│  • Return JSON                                          │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│  Frontend: Auto-populate contact fields                 │
│  • Update crm_contacts table                            │
│  • Show success toast                                   │
└─────────────────────────────────────────────────────────┘
```

### Workflow 3: Realtime CRM Updates

```
┌─────────────────────────────────────────────────────────┐
│  User A: Moves deal from "Awareness" to "Consideration" │
└──────────────────────┬───────────────��──────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│  Frontend: updateDeal(id, { stage: "Consideration" })   │
│  • Supabase .update() on crm_deals                      │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│  Database: Trigger postgres_changes event               │
│  • table: crm_deals, event: UPDATE                      │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│  Supabase Realtime: Broadcast to subscribers            │
│  • Channel: "crm-updates"                               │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│  User B: Receives update via useRealtimeCRM()           │
│  • Re-fetch deals                                       │
│  • UI updates automatically (new stage position)        │
└─────────────────────────────────────────────────────────┘
```

---

## Marketing Pages

### Landing Page V2 (Primary)

**Route:** `/landing-v2`  
**Component:** `LandingPageV2.tsx`  
**Design:** Firecrawl aesthetic (orange #FF6A3D, white, black)  

**Sections:**
1. **Navbar** (sticky glassmorphism)
   - Logo, nav links (Products, Playground, Docs, Pricing, Blog)
   - GitHub stars, Sign up CTA
   - Mobile hamburger menu

2. **Hero Section**
   - Headline: "Turn startup ideas into investor-ready assets"
   - Subheadline: "Power your AI apps with clean web data"
   - Floating input card (island design)
   - Action tabs: Analyze, Deck, Docs, CRM
   - Generate CTA button

3. **How It Works** (3 steps)
   - Add Context → AI Reasoning → Edit & Export
   - Icon cards with hover effects

4. **Workflow Diagram**
   - Animated no-code style diagram
   - Shows AI process flow

5. **Product Modules** (grid of 5 + "Coming Soon")
   - Pitch Deck Engine, Document Factory, Visual CRM, etc.
   - White cards, orange hover effects

6. **AI Capabilities**
   - Code preview window (terminal aesthetic)
   - JSON output example
   - Feature checklist (Structured JSON, Search Grounding, Thinking Mode)

7. **Pricing** (3 tiers)
   - Starter (Free), Pro ($29), Teams ($79)
   - Annual toggle (-20%)
   - Most popular badge on Pro

8. **Footer**
   - 5-column layout (Brand, Product, Company, Legal, + extra)
   - Social links, copyright

### Standard Pages Template

**Route:** `/about`, `/careers`, `/legal`, `/contact`, `/blog`, `/community`, `/help`, `/pricing`  
**Component:** `StandardPage.tsx`  
**Layout:**
- Same navbar & footer as landing
- Dynamic title based on route
- Placeholder content (expandable)

### How It Works Page

**Route:** `/how-it-works`  
**Component:** `HowItWorksPage.tsx`  
**Content:**
- Feature deep-dives
- Video tutorials
- Interactive demos

---

## Dashboard System

### Founder Dashboard (Main Command Center)

**Route:** `/dashboard`  
**Component:** `FounderDashboard.tsx`  

**Layout:**
```
┌────────────────────────────────────────────────────┐
│  Header: "Founder Dashboard"                       │
└────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────┐
│  Profile Card                                       │
│  • Logo (upload)                                   │
│  • Company name, tagline                           │
│  • Profile strength % (progress bar)               │
│  • "Complete Profile" CTA                          │
└────────────────────────────────────────────────────┘
┌───────────┬───────────┬───────────┬───────────────┐
│  KPI 1    │  KPI 2    │  KPI 3    │  KPI 4        │
│  MRR      │  Growth % │  Users    │  Runway       │
│  $12.5k   │  +15.2%   │  1,240    │  18 months    │
└───────────┴───────────┴───────────┴───────────────┘
┌────────────────────────────────────────────────────┐
│  Quick Actions (6 buttons)                         │
│  • Generate Pitch Deck                             │
│  • Add Contact                                     │
│  • Track Deal                                      │
│  • Schedule Meeting                                │
│  • Upload Document                                 │
│  • Run AI Analysis                                 │
└────────────────────────────────────────────────────┘
┌──────────────────────┬─────────────────────────────┐
│  AI Insights Widget  │  Recent Activity Feed       │
│  • Recommendations   │  • Contact added (2h ago)   │
│  • Alerts            │  • Deal moved (5h ago)      │
│  • Next steps        │  • Deck exported (1d ago)   │
└──────────────────────┴─────────────────────────────┘
```

### Other Dashboards

**Projects Dashboard** (`/projects`)
- KPI cards, Gantt timeline, project cards
- AI recommendations panel

**Contacts Dashboard** (`/contacts`)
- Search bar, filters (tags, score)
- Grid of contact cards
- "Add Contact" and "Add Sample Contacts" buttons

**Tasks Dashboard** (`/tasks`)
- Task list with checkboxes
- Due dates, assignees
- Filter by status, priority

**Pipeline Dashboard** (`/pipeline`)
- Kanban board (3-5 stages)
- Drag & drop cards
- Toggle Sales/Investor mode

---

## Wizard Systems

### Startup Profile Wizard

**Route:** `/startup-profile`  
**Component:** `StartupProfileWizard.tsx`  

**Steps:**
1. **Business Basics** (StepBusiness.tsx)
   - Company name, tagline, website
   - Industry, stage (Pre-seed, Seed, Series A)
   - Logo upload

2. **Context** (StepContext.tsx)
   - Problem statement
   - Solution description
   - Target market

3. **Team** (StepTeam.tsx)
   - Founders (name, title, LinkedIn)
   - Add/remove founder modal

4. **Traction** (StepTraction.tsx)
   - Metrics (MRR, users, growth rate)
   - Customer logos
   - Press mentions

5. **Funding** (StepFunding.tsx)
   - Fundraising ask ($)
   - Use of funds breakdown
   - Previous funding rounds

6. **Summary** (StepSummary.tsx)
   - Review all fields
   - Edit any section
   - Submit CTA

7. **AI Summary** (StepAISummary.tsx)
   - AI-generated executive summary
   - Strengths & gaps analysis
   - Recommendations

**State Management:** `StartupProfileContext.tsx` (React Context)

### Pitch Deck Wizard

**Route:** `/wizard`  
**Component:** `PitchDeckWizard.tsx`  

**Steps:**
1. **Context Input** (StepContext.tsx)
   - Website URL input
   - PDF upload (pitch deck, one-pager)
   - Text notes textarea

2. **Details & Metrics** (StepDetails.tsx)
   - Revenue, users, growth rate
   - Team size, burn rate
   - Market size (TAM)

3. **Financials** (StepFinancials.tsx)
   - Monthly burn rate
   - Cash runway
   - Fundraising ask amount
   - Use of funds (pie chart)

4. **Aesthetic** (StepAesthetic.tsx)
   - Color scheme picker (preset palettes)
   - Logo upload
   - Font selection (optional)

5. **Generation Screen** (PitchDeckGenerationScreen.tsx)
   - Loading animation (30-60s)
   - Progress indicators ("Analyzing market...", "Generating slides...")
   - Auto-redirect to editor on completion

### Event Wizard

**Route:** `/event-wizard`  
**Component:** `EventWizard.tsx`  

**Steps:**
1. **Event Details** (EventWizardStep1.tsx)
   - Event name, date, time
   - Location (venue, virtual link)
   - Description

2. **Registration Settings** (EventWizardStep2.tsx)
   - Capacity limit
   - Registration deadline
   - Custom form fields

---

## UI Component Library

### shadcn/ui Components (40+)

**Form Controls:**
- Button, Input, Textarea, Checkbox, Radio, Switch
- Select, Combobox, Date Picker, Slider
- Form (with React Hook Form integration)

**Layout:**
- Card, Separator, Accordion, Tabs, Sheet, Dialog
- Dropdown Menu, Context Menu, Popover, Tooltip
- Sidebar, Navigation Menu, Breadcrumb

**Data Display:**
- Table, Avatar, Badge, Alert, Progress
- Skeleton (loading states)
- Chart (via Recharts)

**Overlays:**
- Alert Dialog, Modal, Toast (Sonner)
- Drawer, Hover Card

**Utilities:**
- ScrollArea, Resizable, Collapsible

### Custom Components

**CRM Components:**
- ContactCard, DealCard, TaskCard
- ContactPanel, DealPanel (side sheets)
- PipelineDashboard (Kanban board)
- ActivityFeed (timeline)

**Editor Components:**
- EditorCanvas, SlideRenderer
- EditorSidebarLeft (slide thumbnails)
- EditorSidebarRight (properties panel)
- AIChatPanel (AI assistant)

**Wizard Components:**
- WizardSteps (progress indicator)
- WizardFooter (navigation buttons)
- TagInput (multi-tag selector)
- UploadCard (drag & drop upload)

**Marketing Components:**
- Navbar (sticky header)
- Footer (5-column layout)
- WorkflowDiagram (animated SVG)
- HeroSection (floating input card)

---

## Additional Technical Details

### Environment Variables

**Protected Secrets (User-provided):**
- `GOOGLE_API_KEY` - Google Gemini API
- `GEMINI_API_KEY` - Alias for Google API
- `GOOGLE_CLIENT_ID` - OAuth
- `GOOGLE_CLIENT_SECRET` - OAuth

**Auto-Generated (System):**
- `SUPABASE_URL` - Project URL
- `SUPABASE_ANON_KEY` - Public anon key
- `SUPABASE_SERVICE_ROLE_KEY` - Admin key (server-side only)
- `SUPABASE_DB_URL` - Postgres connection string

### Build & Deploy

**Development:**
- Vite dev server (HMR, fast refresh)
- TypeScript compiler (strict mode)
- Tailwind JIT compiler

**Production:**
- Vite build (code splitting, tree shaking)
- Minification (Terser)
- Asset optimization (images, fonts)
- Edge deployment (Supabase hosting)

### Performance Optimizations

**Code Splitting:**
- React.lazy() for all heavy components
- Suspense boundaries with loading fallbacks
- Route-based chunks

**Data Loading:**
- Parallel fetch requests
- Supabase realtime subscriptions (reduces polling)
- Pagination on large datasets (contacts, deals)
- Demo data fallback (no database required)

**Rendering:**
- Memoization (useMemo, useCallback)
- Virtual scrolling for long lists
- Debounced search inputs
- Optimistic UI updates

### Error Handling

**Error Boundaries:**
- AppErrorBoundary (global)
- EditorErrorBoundary (editor-specific)
- CRMErrorBoundary (CRM-specific)

**Network Errors:**
- Try-catch on all fetch calls
- Fallback to demo data (contacts, deals)
- Toast notifications for user-facing errors
- Console logs for debugging

**Validation:**
- Zod schemas for form validation (optional)
- React Hook Form error states
- UUID format validation (contacts)

### Security

**Authentication:**
- Supabase Auth (email/password, OAuth)
- JWT tokens (access_token)
- Row-Level Security (RLS) on all tables

**Authorization:**
- Server-side token validation
- User-org membership checks
- Protected routes (auth middleware)

**Data Protection:**
- HTTPS everywhere
- CORS restrictions
- SQL injection protection (Supabase client)
- XSS protection (React escaping)

### Accessibility

**ARIA:**
- Semantic HTML (nav, main, section, article)
- ARIA labels on interactive elements
- Focus management (modals, dropdowns)

**Keyboard Navigation:**
- Tab order
- Escape to close modals
- Arrow keys in menus

**Screen Readers:**
- Alt text on images
- sr-only class for visual-only content
- Descriptive button labels

### Browser Support

**Modern Browsers:**
- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅

**Not Supported:**
- IE11 ❌ (use modern browsers only)

### Mobile Responsiveness

**Breakpoints:**
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px
- Wide: > 1440px

**Responsive Patterns:**
- Hamburger menu on mobile
- Stacked layouts on mobile
- Touch-friendly buttons (min 44px)
- Swipe gestures (carousels)

---

## Conclusion

This document provides a comprehensive overview of the StartupAI technical architecture. For more details, see:

- `/docs/prd/` - Product requirements
- `/docs/schema.md` - Database schema
- `/docs/landing-page-v2-style-guide.md` - Design system
- `/guidelines/Guidelines.md` - Development guidelines

**Last Updated:** December 22, 2025  
**Document Version:** 2.0  
**Lines:** 951
