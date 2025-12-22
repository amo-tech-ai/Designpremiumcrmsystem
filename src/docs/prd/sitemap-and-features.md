# StartupAI - Sitemap & Feature Map

**Last Updated:** December 8, 2024  
**Version:** 1.0

---

## Complete Sitemap

### Public Website

```
https://startupai.app/
│
├── / (Landing Page V2)
│   ├── Hero Section (CTA: Start Free / Watch Demo)
│   ├── Features Grid (4 core features)
│   ├── Social Proof (logos, testimonials)
│   ├── How It Works (3 steps)
│   ├── Pricing (3 tiers)
│   └── Footer (links, socials)
│
├── /how-it-works
│   ├── Interactive Demo
│   ├── Video Tutorials (3-5 min each)
│   └── Feature Deep-Dives
│
├── /pricing
│   ├── Free Plan (1 deck, 50 contacts)
│   ├── Pro Plan ($49/mo)
│   ├── Team Plan ($199/mo)
│   └── Feature Comparison Matrix
│
├── /about
│   ├── Mission Statement
│   ├── Founder Story
│   ├── Team Photos
│   └── Press Mentions
│
├── /blog
│   ├── Fundraising Tips
│   ├── Pitch Deck Guides
│   └── CRM Best Practices
│
├── /help
│   ├── Getting Started Guide
│   ├── Video Tutorials
│   ├── FAQ Sections
│   └── Search Functionality
│
├── /careers
│   └── Open Positions
│
├── /legal
│   ├── Privacy Policy
│   ├── Terms of Service
│   └── Cookie Policy
│
├── /contact
│   └── Contact Form
│
└── /community
    └── Founder Forum
```

---

### Authenticated Application

```
https://startupai.app/app/
│
├── /dashboard (Founder Command Center)
│   ├── Profile Card (logo, name, tagline, strength %)
│   ├── Metrics Row (MRR, Growth %, Users, Runway)
│   ├── Active Deals Widget (pipeline summary)
│   ├── Quick Actions (6 buttons)
│   ├── AI Insights Widget (recommendations, alerts)
│   └── Recent Activity Feed
│
├── /startup-profile (Profile Wizard)
│   ├── Step 1: Business Basics
│   ├── Step 2: Context & Problem
│   ├── Step 3: Team & Founders
│   ├── Step 4: Traction & Metrics
│   ├── Step 5: Fundraising
│   └── Step 6: Summary & Review
│
├── /company-profile (Edit Company)
│   └── Full Form (all startup fields)
│
├── /profile (User Profile)
│   ├── Personal Info (name, email, photo)
│   └── Account Settings Link
│
├── /wizard (Pitch Deck Generator)
│   ├── Step 1: Context Input
│   ├── Step 2: Details & Metrics
│   ├── Step 3: Financials
│   ├── Step 4: Aesthetic & Style
│   └── Generation Screen (loading animation)
│
├── /editor/{deckId} (Pitch Deck Editor)
│   ├── Left Sidebar (slide navigator)
│   ├── Center Canvas (active slide)
│   ├── Right Sidebar (design tools)
│   └── Bottom Panel (AI chat)
│
├── /templates (Deck Template Library)
│   ├── Default Template
│   ├── YC Template
│   ├── Sequoia Template
│   └── [Future: Industry-Specific Templates]
│
├── /pipeline (Deals Dashboard)
│   ├── Mode Toggle (Investor vs Sales)
│   ├── Kanban Board (6 columns by stage)
│   ├── Filters (stage, owner, amount, AI score)
│   ├── Metrics Bar (total value, avg probability)
│   └── Deal Detail Panel (click card)
│       ├── Info Tab (editable fields)
│       ├── Enrichment Tab (AI research)
│       ├── Activity Tab (timeline)
│       ├── Contacts Tab (related people)
│       └── Tasks Tab (action items)
│
├── /contacts (Contacts Dashboard)
│   ├── Table View (name, email, company, role)
│   ├── Stats Row (total, added this week)
│   ├── Search & Filters
│   └── Contact Detail Panel
│       ├── Full Profile
│       ├── Activity Log
│       ├── Associated Deals
│       └── Notes Section
│
├── /discovery (AI Contact Finder)
│   ├── Search Form (job title, industry, location)
│   ├── Results Table (name, title, fit score)
│   └── Batch Actions (add to CRM)
│
├── /tasks (Tasks Dashboard)
│   ├── View Tabs (List / Calendar / Kanban)
│   ├── List View (sortable table)
│   ├── Kanban View (To Do / In Progress / Done)
│   ├── Filters (overdue, today, this week)
│   └── Stats (overdue count, completed count)
│
├── /activities (Activity Feed)
│   ├── Unified Log (all actions)
│   ├── Filter by Type (deal, contact, task, doc)
│   └── Filter by Date Range
│
├── /insights (AI Insights)
│   ├── Overall Score Card (fundraising readiness)
│   ├── Top 5 Recommendations
│   ├── Risk Alerts (red flags)
│   └── Opportunity Highlights
│
├── /gtm (GTM Strategy Generator)
│   ├── Input Form (product, market, budget)
│   └── Output Document
│       ├── ICP Section
│       ├── Channel Strategy
│       ├── Messaging Framework
│       ├── 90-Day Roadmap
│       └── Export as PDF
│
├── /lean-canvas (Lean Canvas Builder)
│   ├── 9 Canvas Sections (drag-and-drop)
│   ├── AI Suggestions per Section
│   └── Export as Image/PDF
│
├── /documents (Document Workspace)
│   ├── Folder Tree (by type)
│   ├── File Grid (cards with preview)
│   └── Search & Filters
│
└── /settings
    ├── /settings-account (name, email, password)
    ├── /settings-billing (plan, usage, payment)
    └── /settings-workspaces (team members, roles)
```

---

## Feature Map by Category

### 🏠 Core Platform

| Feature | Screen | Status | Description |
|---------|--------|--------|-------------|
| Founder Dashboard | `/dashboard` | ✅ Live | Command center with metrics, quick actions, AI insights |
| Startup Profile Wizard | `/startup-profile` | ✅ Live | 6-step onboarding to capture all business context |
| User Profile | `/profile` | ✅ Live | Personal settings, photo, contact info |
| Company Editor | `/company-profile` | ✅ Live | Edit all startup profile fields |

---

### 📊 Pitch Deck Features

| Feature | Screen | Status | Description |
|---------|--------|--------|-------------|
| AI Deck Generator | `/wizard` | ✅ Live | Generate 12-slide deck in 5 minutes with Gemini |
| Visual Deck Editor | `/editor/{id}` | ✅ Live | WYSIWYG editor with AI chat assistant |
| Slide Templates | `/editor` | ✅ Live | Title, Problem, Solution, Market, Team, etc. |
| Chart Builder | `/editor` | ✅ Live | Bar, line, pie charts with data input |
| PDF Export | `/editor` | ✅ Live | Download deck as PDF |
| Share Links | `/editor` | ✅ Live | Password-protected public links |
| Template Library | `/templates` | ✅ Live | Default, YC, Sequoia templates |

---

### 🤝 CRM Features

| Feature | Screen | Status | Description |
|---------|--------|--------|-------------|
| Deals Pipeline | `/pipeline` | ✅ Live | Kanban board with 6 stages (Lead → Closed Won/Lost) |
| Investor Mode | `/pipeline` | ✅ Live | Track VC/angel investor conversations |
| Sales Mode | `/pipeline` | ✅ Live | B2B customer sales pipeline |
| Deal Cards | `/pipeline` | ✅ Live | Show name, amount, AI score, owner, last contact |
| Drag-and-Drop | `/pipeline` | ✅ Live | Move cards between stages (auto-logs history) |
| Deal Detail Panel | `/pipeline` | ✅ Live | Full info, enrichment, activity, contacts, tasks |
| Pipeline Filters | `/pipeline` | ✅ Live | Filter by stage, owner, amount, AI score |
| Contacts Database | `/contacts` | ✅ Live | Table of all people (investors, customers, partners) |
| Contact Detail | `/contacts` | ✅ Live | Full profile, activity log, deals, notes |
| Contact Discovery | `/discovery` | ✅ Live | AI-powered contact finder with fit scores |
| Tasks Dashboard | `/tasks` | ✅ Live | To-do list with priority, status, assignee |
| Task Views | `/tasks` | ✅ Live | List, Calendar, Kanban views |
| Activity Feed | `/activities` | ✅ Live | Unified log of all actions (deals, contacts, tasks) |

---

### 🤖 AI Features (Gemini-Powered)

| Feature | API Endpoint | Status | Description |
|---------|--------------|--------|-------------|
| AI Deck Generation | `/generate-deck` | ✅ Live | Generate full pitch deck from profile |
| AI Slide Writer | `/slide-ai` | ✅ Live | Generate/improve individual slide content |
| AI Lead Scoring | `/score-lead` | ✅ Live | Multi-factor scoring (0-100) with reasoning |
| Deal Enrichment | `/enrich-deal` | ✅ Live | Web research (news, funding, competitors) |
| GTM Strategy | `/generate-gtm` | ✅ Live | Generate go-to-market playbook |
| Market Sizing | `/market-sizing` | ✅ Live | Calculate TAM/SAM/SOM with sources |
| One-Pager | `/generate-one-pager` | 🚧 Planned | 1-page investor teaser |
| AI Coach Insights | `/ai-insights` | ✅ Live | Strategic recommendations, risk alerts |
| Investor Matching | `/match-investors` | 🚧 Planned | Recommend best-fit VCs from database |

---

### 📄 Document Features

| Feature | Screen | Status | Description |
|---------|--------|--------|-------------|
| Document Workspace | `/documents` | ✅ Live | Centralized library for all docs |
| Folder Organization | `/documents` | ✅ Live | Pitch Decks, One-Pagers, Updates, GTM, etc. |
| Quick Preview | `/documents` | ✅ Live | Inline preview without opening |
| Share Link Management | `/documents` | ✅ Live | Create/revoke shareable links |
| Version Control | `/documents` | 🚧 Planned | Track document versions over time |
| Lean Canvas Builder | `/lean-canvas` | ✅ Live | Visual business model canvas |

---

### ⚙️ Settings & Admin

| Feature | Screen | Status | Description |
|---------|--------|--------|-------------|
| Account Settings | `/settings-account` | ✅ Live | Name, email, password, photo |
| Billing Settings | `/settings-billing` | ✅ Live | Plan, usage, payment method, invoices |
| Workspace Settings | `/settings-workspaces` | ✅ Live | Team members, roles (Admin/Editor/Viewer) |
| Help Center | `/support` | ✅ Live | FAQs, tutorials, contact support |

---

## Data Flow Diagrams

### 1. Pitch Deck Generation Flow

```
User clicks "Generate Deck"
    ↓
Frontend: Collect wizard data (4 steps)
    ↓
POST /generate-deck with { startupId, template }
    ↓
Backend: Fetch startup profile from DB
    ↓
Backend: Build Gemini prompt with context
    ↓
Gemini API: Generate slide content (10-15 slides)
    ↓
Backend: Parse JSON response
    ↓
Backend: Insert into `decks` table
    ↓
Backend: Insert 12 rows into `slides` table
    ↓
Backend: Return { deckId }
    ↓
Frontend: Navigate to /editor/{deckId}
    ↓
User sees generated deck in editor
```

---

### 2. CRM Deal Creation Flow

```
User clicks "Add Deal"
    ↓
Frontend: Show creation modal
    ↓
User fills: name, amount, stage
    ↓
Frontend: POST to Supabase `crm_deals` table
    ↓
Database: Insert new row
    ↓
Database Trigger: Execute AI scoring function
    ↓
Backend: POST /score-lead with { dealId }
    ↓
Gemini API: Calculate multi-factor score
    ↓
Backend: Insert into `crm_lead_scores` table
    ↓
Backend: Update `crm_deals.ai_score`
    ↓
Frontend: Real-time subscription updates UI
    ↓
User sees deal card with AI score badge
```

---

### 3. AI Enrichment Flow

```
User clicks "Enrich" button on deal
    ↓
Frontend: Show loading state
    ↓
POST /enrich-deal with { dealId, companyName }
    ↓
Backend: Search web for company info
    ↓
Gemini API: Research company (CEO, news, funding)
    ↓
Backend: Parse structured data
    ↓
Backend: Insert into `crm_deal_enrichment` table
    ↓
Frontend: Fetch enrichment data
    ↓
User sees "Enrichment" tab populated
```

---

## User Personas & Primary Workflows

### Persona 1: Solo Technical Founder (Pre-Seed)

**Name:** Sarah, 32, Engineer  
**Goal:** Raise $500K for MVP  
**Tech Savviness:** High (can code, low design skills)

**Primary Workflows:**
1. **Profile Setup:** `/startup-profile` (20 mins)
2. **Deck Generation:** `/wizard` → `/editor` (1 hour)
3. **Investor Discovery:** `/discovery` → find 30 VCs (30 mins)
4. **Pipeline Management:** `/pipeline` → track 30 investors (daily)
5. **Follow-Ups:** `/tasks` → check daily tasks (10 mins/day)

**Key Features Used:**
- AI Deck Generator ⭐
- Investor Pipeline ⭐
- Contact Discovery ⭐
- Tasks Dashboard

---

### Persona 2: Co-Founder Team (Seed Stage)

**Name:** Alex & Maria, 28-35, Co-Founders  
**Goal:** Scale to $100K MRR, raise Series A  
**Team Size:** 2 founders + 3 employees

**Primary Workflows:**
1. **Sales Pipeline:** `/pipeline` (Sales Mode) → track 50 leads
2. **Weekly Updates:** `/dashboard` → review metrics
3. **GTM Planning:** `/gtm` → create strategy (quarterly)
4. **Investor Updates:** `/documents` → monthly reports
5. **Team Collaboration:** `/tasks` → assign tasks to teammates

**Key Features Used:**
- Sales CRM ⭐
- GTM Strategy Generator ⭐
- AI Insights ⭐
- Document Workspace
- Team Settings

---

### Persona 3: Growth-Stage CEO (Series A+)

**Name:** Michael, 40, CEO  
**Goal:** Prepare Series B ($20M), manage 15 investors  
**Team Size:** 30 employees

**Primary Workflows:**
1. **Board Decks:** `/editor` → update quarterly deck
2. **Investor Relations:** `/pipeline` (Investor Mode) → 15 active investors
3. **Series B Prep:** `/discovery` → research 50 growth VCs
4. **Team Management:** `/settings-workspaces` → 5 team members
5. **Analytics Review:** `/insights` → AI recommendations

**Key Features Used:**
- Deck Editor ⭐
- Investor Pipeline ⭐
- AI Investor Matching (planned) ⭐
- Team Workspaces ⭐
- Advanced Analytics (planned)

---

## API Endpoints Reference

### Public Endpoints (No Auth)

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/make-server-6522a742/health` | Health check |

---

### Authenticated Endpoints (Require Bearer Token)

| Method | Endpoint | Purpose | Request Body | Response |
|--------|----------|---------|--------------|----------|
| POST | `/make-server-6522a742/seed-crm` | Generate demo CRM data | `{ startupId }` | `{ success: true }` |
| POST | `/make-server-6522a742/generate-deck` | AI deck generation | `{ startupId, template, deckPurpose }` | `{ deckId, slideCount }` |
| POST | `/make-server-6522a742/slide-ai` | AI slide content | `{ action, slideType, existingContent, context }` | `{ content, bullets, chartData }` |
| POST | `/make-server-6522a742/image-ai` | AI image generation | `{ prompt, style }` | `{ imageUrl }` |
| POST | `/make-server-6522a742/research-ai` | Web research | `{ query, type }` | `{ findings, sources }` |
| POST | `/make-server-6522a742/storage/upload-url` | Get signed upload URL | `{ filename, contentType }` | `{ uploadUrl, path }` |

---

## Database Tables by Feature

### Pitch Deck Tables
- `decks` (main deck metadata)
- `slides` (individual slide content)
- `share_links` (public sharing)
- `assets` (uploaded images)
- `citations` (source links)

### CRM Tables
- `crm_deals` (sales/investor opportunities)
- `crm_contacts` (people database)
- `crm_accounts` (companies)
- `crm_tasks` (action items)
- `crm_activities` (unified log)
- `crm_interactions` (emails, calls)
- `crm_deal_stage_history` (pipeline changes)
- `crm_deal_enrichment` (AI research)
- `crm_lead_scores` (AI scoring)
- `crm_lead_enrichment` (contact research)
- `automation_rules` (workflow automation)

### Startup Profile Tables
- `startups` (main company profile)
- `startup_founders` (team members)
- `startup_competitors` (competitive landscape)
- `startup_links` (external URLs)
- `startup_metrics_snapshots` (historical metrics)

### Fundraising Tables
- `investors` (VC/angel database)
- `investor_outreach` (outreach tracking)
- `investor_docs` (one-pagers, updates)
- `accelerators` (accelerator directory)
- `accelerator_applications` (application tracking)
- `data_room_files` (due diligence docs)

### AI Tables
- `ai_runs` (AI operation logs)
- `ai_coach_insights` (strategic recommendations)
- `market_sizing_results` (TAM/SAM/SOM)

### Core Tables
- `profiles` (user accounts)
- `orgs` (organizations)
- `org_members` (user-org relationships)
- `audit_log` (change tracking)

---

## Navigation Map (User Flow)

```
Landing Page
    ↓
[Sign Up] → Email Verification
    ↓
Dashboard (Profile Strength: 20%)
    ↓
[Complete Profile] → Startup Profile Wizard
    ↓ (6 steps)
Dashboard (Profile Strength: 100%)
    ↓
[Generate Pitch Deck] → Pitch Wizard
    ↓ (4 steps)
Editor (12 slides generated)
    ↓
[Export PDF] → Download
    ↓
[Add Investors] → Pipeline
    ↓
[Add Deal] → Deal Detail Panel
    ↓
[Enrich] → AI Research Displayed
    ↓
[Create Task] → Tasks Dashboard
    ↓
[Complete Task] → Activity Feed
    ↓
[Generate GTM] → GTM Strategy Page
    ↓
[Export] → Document Workspace
```

---

## Quick Reference: Key Metrics Dashboard

| Metric | Location | Calculation | Source Table |
|--------|----------|-------------|--------------|
| MRR | `/dashboard` | Sum of monthly recurring revenue | `startups.traction_data.mrr` |
| Growth % | `/dashboard` | ((current - previous) / previous) * 100 | `startup_metrics_snapshots` |
| Users | `/dashboard` | Total active users | `startups.traction_data.users` |
| Runway | `/dashboard` | Cash / Monthly Burn | `startups.traction_data` |
| Pipeline Value | `/pipeline` | Sum of all deal amounts | `SUM(crm_deals.amount)` |
| Close Probability | `/pipeline` | Weighted avg by stage | `AVG(crm_deals.probability)` |
| Tasks Overdue | `/tasks` | Count where due < now | `COUNT(crm_tasks WHERE due < now)` |
| Profile Strength | `/dashboard` | % of fields completed | Calculated from `startups` |

---

**Document Version:** 1.0  
**Last Updated:** December 8, 2024  
**Owner:** Product Team
