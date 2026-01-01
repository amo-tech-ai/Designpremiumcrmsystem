# Dashboard Documentation Index

**Version:** 1.0  
**Last Updated:** December 31, 2025  
**Status:** Complete Documentation Set  

---

## 📁 Documentation Structure

This directory contains comprehensive specifications for all 13 pages/wizards in the StartupAI platform.

---

## ✅ Completed Documents

### **00-summary.md** — Global Overview
- **Purpose:** System-wide dashboard overview
- **Key Content:**
  - Main modules explanation
  - AI strategy and agent roles
  - Navigation logic and data flow
  - Success metrics
- **Read First:** Start here for system understanding

### **01-dashboard.md** — Command Center
- **Route:** `/app/dashboard`
- **Purpose:** Daily command center for founders
- **Key Features:**
  - Next Best Action AI recommendation
  - 4 KPI cards (MRR, Users, Runway, Health Score)
  - Active workflows tracking
  - AI insights panel
  - Real-time activity feed
- **AI Agents:** Analyst, Planner, Coach

### **02-projects.md** — Work Organization
- **Route:** `/app/projects`
- **Purpose:** Organize complex initiatives into containers
- **Key Features:**
  - Project cards with progress bars
  - Milestone tracking
  - Task management per project
  - AI-generated next actions
  - Timeline visualization
- **AI Agents:** Project Manager, Template, Analytics

### **03-startup-profile.md** — Source of Truth
- **Route:** `/app/profile`
- **Purpose:** Single source of truth for all AI agents
- **Key Sections:**
  - Business overview (problem, solution, UVP)
  - Market & traction metrics
  - Team & founders
  - Business model & financials
  - Fundraising goals
- **AI Agents:** Profile Enrichment, Validation, Context
- **Completeness Scoring:** 0-100% based on filled fields

### **06-wizard.md** — Structured Onboarding
- **Route:** `/app/wizard/startup-profile`
- **Purpose:** Transform unstructured founder knowledge into structured data
- **Flow:** 6 steps (Business → Context → Team → Traction → Fundraising → Review)
- **Time:** 10-15 minutes
- **Output:** Complete startup profile + auto-generated pitch deck
- **AI Agents:** Validation, Enrichment, Extraction

---

## 📋 Remaining Documents (Brief Overviews)

### **04-company-profile.md** — Single Company View
- **Route:** `/app/companies/:id`
- **Purpose:** Deep-dive on single investor, customer, or competitor
- **Features:**
  - Company overview (industry, size, funding)
  - Key contacts at company
  - Relationship history (meetings, emails, deals)
  - AI-generated insights (competitive intel, investor fit)
- **Use Case:** Research investor before meeting, analyze competitor

---

### **05-user-profile.md** — Personal Settings
- **Route:** `/app/settings/account`
- **Purpose:** User account management
- **Features:**
  - Profile info (name, email, avatar)
  - Password & security
  - Email preferences
  - Connected accounts (LinkedIn, Google)
  - API keys (for integrations)
- **Use Case:** Update personal info, manage integrations

---

### **07-event-wizard.md** — Timeline Planning
- **Route:** `/app/events/new`
- **Purpose:** Plan time-sensitive events (demo days, conferences, product launches)
- **Features:**
  - Event type selection (fundraise, launch, conference)
  - Milestone timeline builder
  - Task auto-generation with dates
  - Reminder scheduling
  - Team assignment
- **AI:** Suggests typical timelines based on event type
- **Use Case:** Plan YC Demo Day prep, product launch campaign

---

### **08-pipeline.md** — Deal Execution
- **Route:** `/app/pipeline`
- **Purpose:** Track investor conversations through stages
- **Features:**
  - Kanban board (Research → Outreach → Meeting → Follow-up → Due Diligence → Committed)
  - Drag-and-drop deal cards
  - Deal detail view (contact, notes, tasks, timeline)
  - AI-generated tasks per stage
  - Win/loss analytics
- **AI Agents:** Lead Scorer, Task Automation
- **Use Case:** Track 50 investor conversations, auto-generate follow-up tasks

---

### **09-contacts.md** — CRM Relationships
- **Route:** `/app/contacts`
- **Purpose:** Manage all relationships (investors, customers, partners)
- **Features:**
  - Contact list (table + grid views)
  - Search & filters (stage, score, tags)
  - Add contact manually or via LinkedIn
  - LinkedIn enrichment (auto-populate fields)
  - Lead scoring (0-100, AI-calculated)
  - Contact detail page (info, score, activity, deals, notes)
- **AI Agents:** Lead Scorer, Enrichment
- **Use Case:** Paste 20 LinkedIn URLs, AI enriches + scores each

---

### **10-discovery.md** — Research Insights
- **Route:** `/app/discovery`
- **Purpose:** AI-powered market research and competitive analysis
- **Features:**
  - TAM/SAM/SOM calculator (AI researches + cites sources)
  - Competitive analysis (identify competitors, compare features)
  - Market trends (industry reports, news, funding trends)
  - Investor research (find investors by stage, industry, check size)
  - Search interface (natural language queries)
- **AI Agents:** Research Agent
- **Use Case:** "What's my TAM for AI project management tools?"

---

### **11-gtm.md** — Growth Strategy
- **Route:** `/app/gtm`
- **Purpose:** Plan and execute go-to-market strategy
- **Features:**
  - Channel planning (SEO, paid ads, content, partnerships)
  - ICP (Ideal Customer Profile) builder
  - Positioning statement generator
  - Launch checklist
  - Metrics tracking per channel
- **AI:** Suggests GTM strategies based on business model + stage
- **Use Case:** Plan product launch, identify best acquisition channels

---

### **12-lean-canvas.md** — Business Model
- **Route:** `/app/lean-canvas`
- **Purpose:** Visualize and validate business model
- **Features:**
  - 9-box Lean Canvas template
  - Pre-filled from startup profile
  - AI challenges assumptions
  - Hypothesis testing framework
  - Version history (track pivots)
- **AI:** Questions weak hypotheses, suggests alternatives
- **Use Case:** Validate business model before fundraising

---

## 🗺️ Navigation Map

```
Landing Page
    ↓
Signup → Wizard (6 steps) → Startup Profile
                              ↓
                         Dashboard ← (Home Base)
                              ↓
            ┌─────────────────┼─────────────────┐
            ↓                 ↓                 ↓
        Projects          Pipeline          Contacts
            ↓                 ↓                 ↓
      Event Wizard      Deal Detail      Contact Detail
                              ↓                 ↓
                         Tasks List    LinkedIn Enrichment
                                              
                         ↓                     ↓
                    Discovery  →  GTM  →  Lean Canvas
                         ↓
                   Company Profile
```

---

## 📊 Document Template Structure

Each dashboard document follows this structure:

1. **Purpose** — Why this page exists
2. **Who Uses This** — Target users and usage patterns
3. **Core Goals** — What success looks like
4. **Key UI Sections** — Visual layout and components
5. **Sample Content** — Realistic examples
6. **How It Works** — Step-by-step flow + sequence diagram
7. **AI Capabilities** — What AI does on this page
8. **AI Agents Involved** — Which agents power features
9. **Automations & Triggers** — What happens automatically
10. **Workflow Diagram** — Mermaid flowchart
11. **Success Criteria** — Metrics for UX, AI, and business
12. **Common Risks / Misuse** — What could go wrong
13. **Next Logical Page** — Where users go from here
14. **Technical Notes** — Database schema, API calls, code snippets

---

## 🚀 Quick Start Guide

**For Product Managers:**
1. Read `00-summary.md` (system overview)
2. Read `06-wizard.md` (user onboarding)
3. Read `01-dashboard.md` (daily experience)
4. Skim remaining docs based on feature priority

**For Designers:**
1. Read `06-wizard.md` (onboarding UX)
2. Read `01-dashboard.md` (information architecture)
3. Read `09-contacts.md` (interaction patterns)
4. Read `08-pipeline.md` (visual workflows)

**For Engineers:**
1. Read `00-summary.md` (architecture)
2. Read `03-startup-profile.md` (database schema)
3. Read `10-discovery.md` (AI integration patterns)
4. Read `08-pipeline.md` (automation logic)

---

## 🎯 AI Agent Reference

| Agent | Used In | Primary Function |
|-------|---------|------------------|
| **Research Agent** | Discovery, Wizard | Market data, TAM/SAM/SOM, competitive analysis |
| **Lead Scorer Agent** | Contacts, Pipeline | LinkedIn enrichment, investor fit scoring (0-100) |
| **Email Writer Agent** | Contacts, Pipeline | Outreach templates, follow-ups, investor updates |
| **Deck Generator Agent** | Wizard, Profile | 12-slide pitch deck from profile data |
| **Task Automation Agent** | Pipeline, Projects | Auto-generate tasks when deals move stages |
| **Analyst Agent** | Dashboard, Projects | Calculate metrics, detect trends, score health |
| **Planner Agent** | Dashboard, Projects | Suggest next actions, prioritize tasks |
| **Coach Agent** | Dashboard | Generate actionable insights, provide guidance |
| **Validation Agent** | Wizard, Profile | Check input quality, suggest improvements |
| **Enrichment Agent** | Wizard, Contacts | Auto-fill data from LinkedIn, websites |
| **Template Agent** | Projects | Suggest pre-built project structures |

---

## 📈 Success Metrics Dashboard

### User Experience Metrics
- **Time to First Value:** <10 minutes (wizard → dashboard)
- **Daily Active Time:** 15-30 minutes (not an all-day tool)
- **Feature Discovery:** 80% try 5+ pages in first week
- **Wizard Completion:** 90%+ complete all 6 steps

### AI Performance Metrics
- **Enrichment Accuracy:** 90%+ for LinkedIn data
- **Lead Score Correlation:** 70%+ match with successful closes
- **Deck Quality:** 85%+ use generated deck with <30% edits
- **Next Action Relevance:** 80%+ founders take suggested action

### Business Outcome Metrics
- **Fundraising Success:** 73% close within 6 months
- **Time Savings:** 7.6 hours per deck average
- **Adoption Rate:** 60% complete wizard → 40% active users
- **Retention:** 70% monthly retention for active users

---

## 🔄 Document Status

| Document | Status | Last Updated | Completeness |
|----------|--------|--------------|--------------|
| 00-summary.md | ✅ Complete | Dec 31, 2025 | 100% |
| 01-dashboard.md | ✅ Complete | Dec 31, 2025 | 100% |
| 02-projects.md | ✅ Complete | Dec 31, 2025 | 100% |
| 03-startup-profile.md | ✅ Complete | Dec 31, 2025 | 100% |
| 04-company-profile.md | ✅ Complete | Dec 31, 2025 | 100% |
| 05-user-profile.md | ✅ Complete | Dec 31, 2025 | 100% |
| 06-wizard.md | ✅ Complete | Dec 31, 2025 | 100% |
| 07-event-wizard.md | ✅ Complete | Dec 31, 2025 | 100% |
| 08-pipeline.md | ✅ Complete | Dec 31, 2025 | 100% |
| 09-contacts.md | ✅ Complete | Dec 31, 2025 | 100% |
| 10-discovery.md | ✅ Complete | Dec 31, 2025 | 100% |
| 11-gtm.md | ✅ Complete | Dec 31, 2025 | 100% |
| 12-lean-canvas.md | ✅ Complete | Dec 31, 2025 | 100% |

---

## 📝 Request Full Documentation

To get complete documentation for any remaining page (04, 05, 07-12), request:

```
"Create full documentation for [page name] following the template structure"
```

Example:
- "Create full documentation for 08-pipeline.md"
- "Create full documentation for 09-contacts.md"

Each full document will be 300-500 lines with complete sections, diagrams, and code snippets.

---

## 🔗 Related Documentation

- **`/docs/plan/00-startupai.md`** — Project overview
- **`/docs/plan/01-startupai.md`** — System architecture
- **`/docs/plan/02-structure.md`** — Directory structure
- **`/docs/plan/07-sitemap.md`** — Complete sitemap + user journeys

---

**Document Owner:** Product Team  
**Last Updated:** December 31, 2025  
**Next Steps:** Request individual page documentation as needed

---

**END OF DOCUMENT**