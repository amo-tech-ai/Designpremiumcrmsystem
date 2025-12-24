# StartupAI - Main Documentation Index

**Version:** 2.0  
**Last Updated:** December 22, 2025  
**Status:** Production Ready  

---

## 📚 Documentation Overview

This directory contains the **master technical documentation** for the StartupAI platform. All documents are kept up-to-date with the production codebase.

---

## 📖 Document Index

### Core Documentation

| # | Document | Description | Last Updated |
|---|----------|-------------|--------------|
| **01** | [**Overview**](./01-overview.md) | Complete technical overview, tech stack, directory structure, routing architecture | Dec 22, 2025 |
| **02** | [**Sitemap**](./02-sitemap.md) | Complete route map, navigation flows, user journeys, mermaid diagrams | Dec 22, 2025 |
| **03** | [**Architecture**](./03-architecture.md) | System architecture, data flows, authentication, AI integration | Dec 22, 2025 |
| **04** | [**Dashboards**](./04-dashboards.md) | Dashboard system, features, AI agents, workflows, user journeys | Dec 22, 2025 |
| **05** | [**AI Features**](./05-ai-features.md) | AI capabilities, agents, automations, proposed features, algorithms | Dec 22, 2025 |
| **06** | [**Features: Pitch Deck Wizard**](./06-features.md) | 4-step wizard, screens, AI generation, data model, user flows | Dec 22, 2025 |
| **09** | [**System Audit Report**](./09-audit.md) | Production readiness assessment, critical issues, fixes applied | Dec 22, 2025 |

---

## 🗺️ Quick Navigation

### By Topic

#### Architecture & System Design
- **Tech Stack:** [01-overview.md > Tech Stack & Versions](./01-overview.md#tech-stack--versions)
- **Directory Structure:** [01-overview.md > Directory Structure](./01-overview.md#directory-structure)
- **Routing Architecture:** [02-sitemap.md > Routing Architecture](./02-sitemap.md#routing-architecture)
- **Backend Architecture:** [01-overview.md > Backend Architecture](./01-overview.md#backend-architecture)

#### Routes & Navigation
- **Complete Route Map:** [02-sitemap.md > Complete Route Map](./02-sitemap.md#complete-route-map)
- **Navigation Flow Diagrams:** [02-sitemap.md > Navigation Flow Diagrams](./02-sitemap.md#navigation-flow-diagrams)
- **User Journey Maps:** [02-sitemap.md > User Journey Maps](./02-sitemap.md#user-journey-maps)
- **Backend API Routes:** [02-sitemap.md > Backend API Routes](./02-sitemap.md#backend-api-routes)

#### Database & Data
- **Database Schema:** [01-overview.md > Database Schema Overview](./01-overview.md#database-schema-overview)
- **CRM Tables:** [01-overview.md > CRM System Tables](./01-overview.md#crm-system-10)
- **Pitch Deck Tables:** [01-overview.md > Pitch Deck System Tables](./01-overview.md#pitch-deck-system-5)

#### Features & Workflows
- **User Journeys:** [01-overview.md > User Journeys](./01-overview.md#user-journeys)
- **Workflows:** [01-overview.md > Workflows](./01-overview.md#workflows)
- **Marketing Pages:** [02-sitemap.md > Marketing & Public Pages](./02-sitemap.md#1-marketing--public-pages-12-routes)
- **Dashboard System:** [02-sitemap.md > Core Dashboard & CRM](./02-sitemap.md#2-core-dashboard--crm-10-routes)

---

## 🔍 Mermaid Diagram Index

### Available Diagrams (in 02-sitemap.md)

1. **Public Pages Navigation Flow**
   - Shows marketing page hierarchy
   - Entry points to authenticated app

2. **Core Dashboard Navigation Hub**
   - Main dashboard sections
   - CRM, Pipeline, Projects, Documents, Wizards

3. **CRM Workflow Flow**
   - Contact detail actions
   - AI enrichment, scoring, deal creation

4. **User Journey: New User Onboarding**
   - Sequence diagram from landing to dashboard
   - Startup profile wizard flow

5. **User Journey: Generate Pitch Deck**
   - Wizard steps and API interaction
   - Editor launch and export

6. **User Journey: CRM Lead Management**
   - Contact discovery to deal conversion
   - AI enrichment and scoring

7. **Backend API Route Map**
   - API endpoint hierarchy
   - Service categorization

### Available Diagrams (in 03-architecture.md)

1. **High-Level System Architecture**
   - Three-tier architecture overview
   - Client, Edge, Data, and External services

2. **Frontend Component Hierarchy**
   - Component tree structure
   - Public vs authenticated routes

3. **Backend Request Processing Flow**
   - Middleware stack execution order
   - Service layer integration

4. **Database Architecture**
   - Table relationships
   - Core, Deck, CRM, and Feature tables

5. **Data Flow: Pitch Deck Generation**
   - Sequence diagram of full generation process
   - Wizard → API → Gemini → Editor

6. **Data Flow: Contact Enrichment**
   - LinkedIn profile extraction
   - Auto-population workflow

7. **Data Flow: Realtime Updates**
   - WebSocket subscription pattern
   - Multi-user synchronization

8. **Authentication Flow**
   - Signup and onboarding journey
   - Session management diagram

9. **AI Integration Architecture**
   - Gemini API integration pattern
   - Use cases: Deck, CRM, Profile analysis

10. **State Management Architecture**
    - App-level, component-level, context, server state
    - Data fetching patterns

### Available Diagrams (in 04-dashboards.md)

1. **Dashboard System Architecture**
   - Overview of 8 specialized dashboards
   - AI agent integration layer
   - Cross-dashboard data flow

2. **Founder Dashboard Structure**
   - Profile strength indicator
   - Metrics dashboard
   - Quick actions and workflows

3. **Contacts Dashboard Structure**
   - Grid view layout
   - Contact detail panel
   - AI enrichment and scoring flows

4. **Pipeline Dashboard Structure**
   - Sales vs Investor pipeline modes
   - Stage definitions (Kanban columns)
   - AI deal analysis components

5. **Tasks Dashboard Structure**
   - 5 workflow categories (Research → Completion)
   - Task card components
   - AI-generated task creation

6. **Projects Dashboard Structure**
   - KPI cards and metrics
   - List vs Gantt view toggle
   - AI project insights

7. **GTM Strategy Structure**
   - 6-step GTM framework
   - Channel selection grid
   - AI strategy generation

8. **Cross-Dashboard Integration Flow**
   - Contact → Deal → Task workflow
   - Document → Task creation
   - AI agent architecture

9. **Contact Enrichment Flow (Sequence)**
   - LinkedIn URL extraction
   - AI processing steps
   - Auto-population workflow

10. **Pipeline Deal Analysis (Sequence)**
    - User initiates AI analysis
    - Gemini API processing
    - Risk/opportunity identification

11. **AI Agent Architecture**
    - 5 AI agents (Enrichment, Scoring, Analysis, Generation, Recommendation)
    - Request routing and processing
    - Data layer integration

12. **User Journey: Daily Dashboard Workflow**
    - Morning review to end of day
    - Cross-dashboard navigation
    - Task completion flow

13. **User Journey: Fundraising Sprint**
    - 4-week journey from prep to close
    - AI-assisted contact research
    - Pipeline tracking

14. **User Journey: Product Launch GTM**
    - Planning to execution
    - Content creation with AI
    - Measurement and optimization

15. **Task Completion Flow (Sequence)**
    - User interaction
    - Database update
    - State refresh

---

## 📊 System Statistics

### Route Counts
- **Marketing Pages:** 13 routes
- **CRM & Dashboard:** 10 routes
- **Productivity Tools:** 3 routes
- **Wizards & Editors:** 4 routes
- **Settings & Profile:** 7 routes
- **Total Frontend Routes:** 37 routes
- **Backend API Endpoints:** 15+ endpoints

### Database Tables
- **Core Tables:** 10
- **Pitch Deck System:** 5
- **CRM System:** 10
- **Fundraising & Community:** 10
- **Total Tables:** 40+ tables

### Component Counts
- **Lazy-Loaded Components:** 30+
- **UI Components (shadcn):** 20+
- **Total React Components:** 150+

### Dashboard System
- **Specialized Dashboards:** 8 dashboards
- **AI Agents:** 5 intelligent agents
- **Integration Points:** 15+ cross-dashboard flows
- **Workflow Categories:** 5 task categories

### AI Features & Capabilities
- **Production AI Features:** 10 active features
- **Proposed AI Features:** 15 roadmap features
- **AI Response Time:** 5-15 seconds average
- **AI Accuracy:** 85-90% validated
- **Token Optimization:** 30% reduction vs baseline
- **Automation Workflows:** 2 active, 5+ planned

---

## 🔗 Related Documentation

### Other Documentation Directories

- **[/docs/prd/](../prd/)** - Product Requirements Documents
  - `product-requirements-document.md`
  - `sitemap-and-features.md`
  - `workflows-and-diagrams.md`
  - `executive-summary.md`

- **[/docs/](../)** - Root Documentation
  - `schema.md` - Detailed database schema
  - `troubleshooting.md` - Common issues and fixes
  - `landing-page-v2-style-guide.md` - Design system guide
  - `010-color-palette.md` - Color palette documentation

---

## 🚀 Quick Start Guide

### For Developers

1. **Understand the Architecture:**
   - Read [01-overview.md](./01-overview.md) for complete tech stack and structure
   - Review [02-sitemap.md](./02-sitemap.md) for routing and navigation

2. **Explore the Codebase:**
   - Check `App.tsx` for main routing logic
   - Review `/components` directory structure
   - Examine `/supabase/functions/server` for backend

3. **Run Locally:**
   ```bash
   npm install
   npm run dev
   # App runs on http://localhost:5173
   ```

4. **Navigate to Key Pages:**
   - Landing: Visit `/` (redirects to Landing V2)
   - Style Guide: Navigate to `/style-guide`
   - Dashboard: Click "Sign up" → explore demo mode

### For Designers

1. **Review Design System:**
   - Visit `/style-guide` route in the app
   - Read `landing-page-v2-style-guide.md`
   - Check `010-color-palette.md`

2. **Understand User Flows:**
   - Review [User Journey Maps](./02-sitemap.md#user-journey-maps)
   - Examine [Navigation Flow Diagrams](./02-sitemap.md#navigation-flow-diagrams)

### For Product Managers

1. **Feature Overview:**
   - Read [/docs/prd/executive-summary.md](../prd/executive-summary.md)
   - Review [User Journeys](./01-overview.md#user-journeys)

2. **Roadmap Planning:**
   - Check existing routes in [02-sitemap.md](./02-sitemap.md)
   - Review [Migration Path](./02-sitemap.md#migration-path-future-enhancement)

---

## ✅ Documentation Standards

### File Naming Convention

```
XX-topic-name.md
├── 01-overview.md          (General overview)
├── 02-sitemap.md           (Routes and navigation)
├── 03-[future].md          (TBD)
└── README.md               (This index file)
```

### Markdown Standards

- Use proper heading hierarchy (H1 → H2 → H3)
- Include table of contents for long documents
- Use code blocks with language specification
- Include mermaid diagrams for visual documentation
- Keep line length under 120 characters
- Include metadata header (version, date, status)

### Update Frequency

- **Real-time:** Update when code changes affect documentation
- **Weekly:** Review for accuracy and completeness
- **Monthly:** Major version updates and refactoring docs

---

## 🤝 Contributing to Documentation

### How to Update

1. **Make code changes first**
2. **Update relevant documentation**
3. **Update "Last Updated" date**
4. **Add entry to changelog** (if major change)

### Documentation Checklist

- [ ] Updated relevant .md file(s)
- [ ] Updated mermaid diagrams (if structure changed)
- [ ] Updated route counts (if routes added/removed)
- [ ] Updated "Last Updated" date
- [ ] Verified all internal links work
- [ ] Spell-checked content

---

## 📞 Support & Questions

- **Technical Questions:** Review [01-overview.md](./01-overview.md) first
- **Routing Issues:** Check [02-sitemap.md](./02-sitemap.md) navigation flows
- **Troubleshooting:** See [/docs/troubleshooting.md](../troubleshooting.md)
- **Design System:** Visit `/style-guide` in the app

---

## 📝 Version History

| Version | Date | Changes |
|---------|------|---------|
| **2.0** | Dec 22, 2025 | Complete documentation overhaul with sitemap and mermaid diagrams |
| **1.0** | Nov 2025 | Initial documentation structure |

---

**Maintained by:** StartupAI Engineering Team  
**Last Review:** December 22, 2025  
**Next Review:** January 2026