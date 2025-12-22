# StartupAI - Product Requirements Documentation

**Last Updated:** December 8, 2024  
**Status:** ✅ Production Ready  
**Version:** 1.0

---

## 📋 Documentation Overview

This directory contains comprehensive product requirements documentation for **StartupAI**, an AI-powered startup operating system combining visual CRM and intelligent pitch deck generation.

---

## 📚 Document Structure

### 1. **[Product Requirements Document (PRD)](./product-requirements-document.md)**
   **Main PRD - 18,000+ words**
   
   **Sections:**
   - Executive Summary
   - Problem Statement
   - Target Users (3 detailed personas)
   - Core Features (10 major features)
   - Advanced AI Features (7 AI-powered features)
   - Use Cases + Real World Examples (3 detailed journeys)
   - User Stories (11 stories)
   - User Journey (step-by-step workflows)
   - Workflows (system + user)
   - Mermaid Diagrams (3 technical diagrams)
   - Website Pages (6 marketing pages)
   - Dashboard Pages (12 app pages)
   - Data Model (40 database tables)
   - AI Functions (5 Gemini integrations)
   - Success Criteria (metrics & KPIs)
   - Risks + Constraints (8 risk categories)
   - Suggested Improvements (13 future features)
   - Implementation Notes (frontend + backend)

---

### 2. **[Sitemap & Features](./sitemap-and-features.md)**
   **Complete navigation map & feature inventory**
   
   **Contents:**
   - Complete Sitemap (public website + authenticated app)
   - Feature Map by Category (50+ features)
   - User Personas & Primary Workflows
   - API Endpoints Reference
   - Database Tables by Feature
   - Navigation Map
   - Key Metrics Dashboard Reference

---

### 3. **[Workflows & Diagrams](./workflows-and-diagrams.md)**
   **Visual workflows & technical diagrams**
   
   **Contents:**
   - 7 Core User Workflows (Mermaid flowcharts)
   - System Architecture Diagrams
   - User Journey Maps (2 detailed journeys)
   - 4 Data Flow Diagrams
   - 7 Technical Workflows
   - 2 User Interaction Flows
   - 2 Error Handling Flows
   - 2 Performance Optimization Workflows
   - 2 Integration Workflows
   - State Management Flows
   - Testing Workflows (future)

---

## 🎯 Quick Links

### For Product Managers
- [Executive Summary](./product-requirements-document.md#1-executive-summary)
- [Target Users & Personas](./product-requirements-document.md#3-target-users)
- [Success Criteria](./product-requirements-document.md#15-success-criteria)
- [Feature Roadmap](./product-requirements-document.md#17-suggested-improvements)

### For Designers
- [User Journey Maps](./workflows-and-diagrams.md#user-journey-maps)
- [User Interaction Flows](./workflows-and-diagrams.md#user-interaction-flows)
- [Dashboard Pages](./product-requirements-document.md#12-dashboard-pages-purpose--data-shown)
- [Website Pages](./product-requirements-document.md#11-website-pages-purpose--content)

### For Engineers
- [System Architecture](./workflows-and-diagrams.md#system-architecture-diagrams)
- [Data Model](./product-requirements-document.md#13-data-model-tables-fields-relationships)
- [API Endpoints](./sitemap-and-features.md#api-endpoints-reference)
- [Technical Workflows](./workflows-and-diagrams.md#technical-workflows)
- [Implementation Notes](./product-requirements-document.md#18-implementation-notes-frontend--backend)

### For Stakeholders
- [Problem Statement](./product-requirements-document.md#2-problem-statement)
- [Business Model](./product-requirements-document.md#website-pages)
- [Risks & Constraints](./product-requirements-document.md#16-risks--constraints)
- [Real World Examples](./product-requirements-document.md#6-use-cases--real-world-examples)

---

## 📊 Key Statistics

### Product Metrics
- **Total Features:** 50+ implemented features
- **AI Features:** 7 Gemini-powered capabilities
- **Database Tables:** 40 production tables
- **User Screens:** 25+ unique pages/views
- **API Endpoints:** 12 backend endpoints
- **Supported Workflows:** 15+ end-to-end user flows

### Documentation Metrics
- **Total Pages:** 3 comprehensive documents
- **Word Count:** 25,000+ words
- **Diagrams:** 20+ Mermaid visualizations
- **User Stories:** 11 detailed scenarios
- **Use Cases:** 3 real-world examples

---

## 🚀 Core Features Summary

### 1. **AI Pitch Deck Generation**
Generate investor-ready 12-slide decks in 5 minutes using Gemini AI
- **Screens:** `/wizard`, `/editor`
- **AI Model:** Gemini 1.5 Flash
- **Templates:** Default, YC, Sequoia

### 2. **Visual CRM Pipeline**
Manage investor relations and sales opportunities with AI scoring
- **Screen:** `/pipeline`
- **Modes:** Investor, Sales
- **Stages:** Lead → Qualified → Proposal → Closed Won/Lost
- **AI Scoring:** 0-100 with reasoning

### 3. **Contact Management**
Build and enrich contact database with AI research
- **Screens:** `/contacts`, `/discovery`
- **Features:** Enrichment, activity tracking, deal linking

### 4. **Task Management**
Automated follow-up system with AI suggestions
- **Screen:** `/tasks`
- **Views:** List, Calendar, Kanban
- **Sources:** Manual, AI-suggested, Automation rules

### 5. **Document Workspace**
Centralized repository for all generated materials
- **Screen:** `/documents`
- **Types:** Decks, One-Pagers, GTM Strategies, Market Sizing

### 6. **GTM Strategy Generator**
AI-generated go-to-market playbooks
- **Screen:** `/gtm`
- **Output:** ICP, Channels, Messaging, 90-day Roadmap

### 7. **Lean Canvas Builder**
Visual business model canvas with AI recommendations
- **Screen:** `/lean-canvas`
- **Sections:** 9 business model components

### 8. **Founder Dashboard**
Command center with metrics and AI insights
- **Screen:** `/dashboard`
- **Metrics:** MRR, Growth, Users, Runway, Pipeline Value

### 9. **Startup Profile System**
Comprehensive onboarding wizard
- **Screen:** `/startup-profile`
- **Steps:** 6-step wizard (Business, Context, Team, Traction, Fundraising, Review)

### 10. **AI Insights Engine**
Strategic recommendations and risk alerts
- **Screen:** `/insights`
- **Features:** Readiness score, recommendations, risk flags

---

## 👥 User Personas

### Persona 1: Solo Technical Founder (Pre-Seed)
**Profile:** 28-40 years old, first-time founder  
**Goal:** Raise $500K for MVP  
**Top Features:** AI Deck Generator, Investor Pipeline, Contact Discovery

### Persona 2: Co-Founding Team (Seed Stage)
**Profile:** 2-4 founders, $50K-$500K MRR  
**Goal:** Scale to $1M ARR, raise $1-3M Series A  
**Top Features:** Sales CRM, GTM Strategy, AI Insights, Team Collaboration

### Persona 3: Growth-Stage CEO (Series A+)
**Profile:** 30-50 years old, experienced operator  
**Goal:** Prepare Series B ($20M), manage investor relations  
**Top Features:** Deck Editor, Investor Pipeline, Analytics, Team Workspaces

---

## 🎨 Design System

### Technology Stack
- **Frontend:** React 18, TypeScript, Tailwind CSS v4.0
- **UI Library:** shadcn/ui (50+ components)
- **Animations:** Motion (Framer Motion)
- **Charts:** Recharts
- **Backend:** Supabase (PostgreSQL, Edge Functions, Auth, Storage)
- **AI:** Google Gemini API

### Color Palette
- **Primary:** Indigo (#6366f1)
- **Secondary:** Purple (#8b5cf6)
- **Success:** Green (#10b981)
- **Warning:** Amber (#f59e0b)
- **Error:** Red (#ef4444)
- **Neutral:** Slate (#64748b)

---

## 📈 Success Metrics

### Product KPIs

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Sign-Up → Profile Complete | 70% | 🚧 TBD | Tracking |
| First Deck in 24h | 50% | 🚧 TBD | Tracking |
| DAU/MAU Ratio | 40% | 🚧 TBD | Tracking |
| Free → Paid Conversion | 10% | 🚧 TBD | Tracking |
| NPS Score | >40 | 🚧 TBD | Tracking |
| Deck Generation Time | <60s | ✅ 30-45s | ✅ Met |
| AI Score Accuracy | 80% | 🚧 TBD | Validating |

---

## 🗺️ Product Roadmap

### ✅ Phase 0: MVP (Complete)
- [x] Startup Profile Wizard
- [x] AI Pitch Deck Generation
- [x] Visual Deck Editor
- [x] CRM Pipeline (Investor + Sales modes)
- [x] Contacts Management
- [x] Tasks Dashboard
- [x] AI Lead Scoring
- [x] Deal Enrichment
- [x] GTM Strategy Generator
- [x] Lean Canvas Builder
- [x] Document Workspace

### 🚧 Phase 1: Growth Features (Next 3 Months)
- [ ] Email Integration (Gmail/Outlook)
- [ ] Deck Template Library (10+ industry templates)
- [ ] Mobile App (React Native)
- [ ] Real-Time Collaboration
- [ ] Analytics Dashboard (deck views, conversion funnel)

### 📋 Phase 2: Advanced AI (6-12 Months)
- [ ] AI Pitch Coach (voice practice + scoring)
- [ ] Predictive Deal Scoring (historical analysis)
- [ ] Auto-Generated Video Pitch (AI avatars)
- [ ] Investor Network Effects (warm intro matching)
- [ ] Financial Modeling Tool (3-year projections)

### 🔮 Phase 3: Platform Expansion (12-24 Months)
- [ ] Marketplace (hire designers, consultants)
- [ ] API & Webhooks (Zapier integration)
- [ ] Community Features (forum, pitch competitions)

---

## 🏗️ Architecture Overview

### Frontend Architecture
```
/components
├── /auth (authentication)
├── /crm (pipeline, contacts, tasks)
├── /editor (deck editor)
├── /landing (marketing pages)
├── /layout (sidebar, navbar)
├── /modals (dialogs)
├── /pitch-wizard (deck generation wizard)
├── /settings (account, billing)
├── /ui (shadcn components - 50+ reusable)
└── /wizard (startup profile wizard)
```

### Backend Architecture
```
/supabase/functions/server
├── index.tsx (Hono router)
├── crm.ts (CRM endpoints)
├── generate-deck.ts (AI deck generation)
├── slide-ai.ts (AI slide content)
├── image-ai.ts (AI image generation)
├── research-ai.ts (web research)
└── kv_store.tsx (key-value utilities)
```

### Database Schema
**40 Production Tables:**
- **Core:** profiles, orgs, org_members, startups, audit_log
- **Pitch Deck:** decks, slides, share_links, assets, citations
- **CRM:** crm_deals, crm_contacts, crm_accounts, crm_tasks, crm_activities
- **AI:** crm_lead_scores, crm_deal_enrichment, ai_coach_insights, market_sizing_results
- **Fundraising:** investors, investor_outreach, accelerators, data_room_files

---

## 🔐 Security & Compliance

### Authentication
- Supabase Auth (email/password + OAuth)
- JWT tokens (7-day expiry)
- Row-Level Security (RLS) on all tables

### Data Privacy
- GDPR-compliant privacy policy
- User data export feature
- Account deletion with cascade cleanup
- Encrypted storage (Supabase default)

### Access Control
- **Public:** Landing pages, shared deck links
- **Authenticated:** Dashboard, CRM, Documents
- **Team Plans:** Role-based access (Admin/Editor/Viewer)

---

## 📞 Support Resources

### For Users
- **Help Center:** `/help` (in-app documentation)
- **Video Tutorials:** YouTube channel (planned)
- **Email Support:** support@startupai.app (planned)
- **Community Forum:** `/community` (planned)

### For Developers
- **API Documentation:** Coming in Phase 2
- **Webhook Guide:** Coming in Phase 2
- **SDK (JavaScript):** Coming in Phase 3

---

## 📝 Document Changelog

### Version 1.0 (December 8, 2024)
- ✅ Created comprehensive PRD (18,000+ words)
- ✅ Added sitemap & feature map
- ✅ Created 20+ Mermaid diagrams
- ✅ Documented 40 database tables
- ✅ Listed 50+ features
- ✅ Defined 3 user personas
- ✅ Mapped 15+ user workflows

### Next Updates (Planned)
- [ ] Add user interview findings (Q1 2025)
- [ ] Update with launch metrics (Q1 2025)
- [ ] Add competitive analysis (Q2 2025)
- [ ] Document Phase 1 features (Q2 2025)

---

## 🤝 Contributing

This is a living document. Updates should be made:
- After major feature launches
- When user feedback changes direction
- Quarterly product reviews
- Following user research sessions

**Document Owners:**
- Product Manager: [TBD]
- Technical Lead: [TBD]
- Design Lead: [TBD]

---

## 📧 Contact

For questions about this documentation:
- **Product Questions:** Create issue in project tracker
- **Technical Questions:** Refer to `/docs/QUICK_REFERENCE.md`
- **Business Questions:** Contact product team

---

**Last Review:** December 8, 2024  
**Next Review:** January 8, 2025  
**Status:** ✅ Production Ready  
**Version:** 1.0

---

*This documentation set was generated as part of the StartupAI MVP completion. All features listed as "Live" are implemented and tested in production.*
