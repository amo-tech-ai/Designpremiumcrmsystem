# STARTUPAI — PROJECT OVERVIEW

**Version:** 1.0  
**Last Updated:** December 24, 2025  
**Status:** Active Development  
**Document Type:** Project Summary  

---

## What is StartupAI?

**StartupAI** is an AI-native operating system designed specifically for early-stage founders who are raising capital. It consolidates the entire fundraising journey—from building your pitch deck to managing investor relationships—into one intelligent platform.

Instead of juggling scattered tools, spreadsheets, and manual workflows, founders get a unified workspace where AI handles the heavy lifting: generating investor-ready pitch decks in minutes, enriching contact data from LinkedIn, scoring leads automatically, and orchestrating follow-up tasks.

---

## The Problem We Solve

Early-stage founders waste **60+ hours per funding round** on repetitive, manual tasks:
- Building pitch decks from scratch using generic templates
- Manually researching and organizing investor contacts
- Tracking conversations across email, LinkedIn, and spreadsheets
- Creating follow-up tasks and remembering next steps
- Generating one-pagers, updates, and term sheets

This fragmentation leads to:
- **Lost opportunities** from poor follow-up
- **Inconsistent messaging** across investor touchpoints
- **Burned time** on admin work instead of building product
- **Decision paralysis** from lack of clear pipeline visibility

---

## Our Solution

StartupAI provides **8 specialized dashboards** and **5 AI agents** that work together as a cohesive operating system:

### Core Features

**AI Pitch Deck Generation**  
Answer 6 questions about your startup. AI generates a 12-slide investor deck with market research, competitive analysis, and financial projections in 10 minutes.

**LinkedIn Profile Enrichment**  
Paste a LinkedIn URL. AI extracts name, title, firm, investment thesis, portfolio companies, and contact information into your CRM automatically.

**Intelligent Lead Scoring**  
AI scores every contact 0-100 based on fit criteria: stage focus, check size, industry expertise, portfolio overlap, and engagement level.

**Visual Pipeline Management**  
Kanban-style board tracking investor conversations from Research → Outreach → Meeting → Follow-up → Committed. Drag-and-drop simplicity with automated task generation.

**Smart Task Automation**  
When a deal moves to "Meeting Scheduled," AI auto-generates tasks: send deck, prepare questions, research partner background, schedule follow-up.

**Document Template Library**  
One-click generation of one-pagers, investor updates, term sheet summaries, and data room checklists. AI pre-fills with your startup data.

**Market Research & TAM Calculation**  
AI calculates Total Addressable Market, Serviceable Addressable Market, and Serviceable Obtainable Market with cited sources and validation methodology.

**Real-Time Collaboration**  
Team workspace where co-founders see live updates, comment on deals, assign tasks, and share insights without switching tools.

---

## Technology Stack

**Frontend:** React 18, TypeScript 5, Vite 5, React Router 7, Tailwind CSS 4  
**Backend:** Supabase (PostgreSQL, Auth, Edge Functions, Storage)  
**AI Integration:** OpenAI GPT-4 via Supabase Edge Functions  
**Deployment:** Figma Make (frontend), Supabase (backend)  
**Design System:** Custom components with pastel color palette, glassmorphism, luxury micro-interactions

---

## User Journey

**Step 1 — Complete Your Profile (5 minutes)**  
Answer questions about your startup: name, industry, stage, problem, solution, business model, traction. AI uses this as context for all future generation.

**Step 2 — Generate Your Deck (10 minutes)**  
AI creates investor-ready pitch deck with market research, competitive landscape, go-to-market strategy, team slides, and financial projections.

**Step 3 — Build Your Pipeline (15 minutes)**  
Add target investors manually or enrich from LinkedIn URLs. AI scores each contact and suggests prioritization.

**Step 4 — Execute Outreach (Ongoing)**  
Move contacts through pipeline stages. AI generates personalized email templates, follow-up reminders, and next-step tasks automatically.

**Step 5 — Close Your Round (60-90 days)**  
Track commitments, manage term sheets, coordinate due diligence, and share updates—all in one place.

---

## Target Users

**Primary:** Pre-seed and Seed stage founders raising $500K-$3M  
**Secondary:** Solo founders without dedicated fundraising support  
**Tertiary:** Accelerator cohorts needing standardized fundraising workflow

**Ideal Customer Profile:**
- Technical founders building B2B SaaS
- First-time fundraisers unfamiliar with VC process
- Teams of 1-3 people wearing multiple hats
- Raising in competitive markets (US, Europe, LatAm)
- Need to move fast with limited resources

---

## Business Model

**Freemium SaaS:**
- **Free Tier:** 1 user, 1 pitch deck, 25 contacts, community support
- **Professional ($49/user/month):** Unlimited decks, 500 contacts, AI enrichment, lead scoring, email support
- **Enterprise (Custom):** Unlimited everything, white-label, custom AI training, dedicated support, API access

**Revenue Streams:**
- Monthly/annual subscriptions
- Upsell to Enterprise for accelerators and funds
- API access for integration partners

**Unit Economics (Projected):**
- CAC: $120 (content marketing + product-led growth)
- LTV: $882 (18-month average retention at $49/month)
- LTV:CAC ratio: 7.35x

---

## Competitive Advantage

**Why StartupAI wins:**

**Vertical Focus:** Built exclusively for fundraising, not generic CRM  
**AI-First Architecture:** Every feature powered by intelligence, not just automation  
**End-to-End Workflow:** Covers entire journey from deck to close  
**Speed to Value:** Generate deck in 10 minutes vs. 20+ hours manually  
**Integrated Experience:** No data export/import between tools  
**Founder-Centric UX:** Designed by founders who've raised, for founders raising

**vs. Generic CRMs (HubSpot, Pipedrive):**  
Not built for fundraising. No pitch deck generation, no investor-specific scoring, no fundraising templates.

**vs. Deck Builders (Pitch, Beautiful.ai):**  
Only solve presentation problem. No CRM, no pipeline tracking, no automation.

**vs. Spreadsheets:**  
Manual, error-prone, no intelligence, poor collaboration, no mobile experience.

---

## Traction & Milestones

**Current Status:** MVP Development (Week 8 of 15)  
**Launch Target:** Q1 2025  
**Beta Users:** 50 founders (target)  
**Pilot Partners:** 3 accelerators (in discussion)

**Completed:**
- Core architecture and documentation ✓
- Design system and component library ✓
- Home page design specifications ✓
- Database schema and API structure ✓

**In Progress:**
- Dashboard implementation (4 of 8 complete)
- AI agent integration (2 of 5 complete)
- Supabase backend deployment

**Next Milestones:**
- Private beta launch (6 weeks)
- Public launch with 3 pricing tiers (10 weeks)
- First paying customer (12 weeks)
- $10K MRR (20 weeks)

---

## Vision & Roadmap

**6-Month Vision:**  
The default operating system for pre-seed and seed fundraising. Every YC founder uses StartupAI to manage their Demo Day outreach.

**12-Month Vision:**  
Expand to Series A fundraising with advanced features: LP introductions, warm intro pathways, investor meeting intelligence, fundraising analytics dashboards.

**24-Month Vision:**  
Full-stack startup OS covering fundraising, hiring, legal, finance, and operations. One platform that scales from founding to IPO.

**Long-Term:**  
Become the "operating system layer" for startups—the single source of truth that integrates with every tool founders use (Notion, Slack, Gmail, LinkedIn, AngelList).

---

## Team & Contact

**Built By:** Founders who have raised venture capital  
**Supported By:** AI/ML engineers, product designers, full-stack developers  
**Backed By:** (Fundraising in progress)

**Documentation Hub:** `/docs/plan/` directory  
**Project Website:** (Coming soon)  
**Demo:** (Available to beta users)

---

## Quick Links to Documentation

- **`/docs/plan/01-startupai.md`** — System architecture and module details
- **`/docs/plan/02-structure.md`** — Directory structure and routing patterns
- **`/docs/plan/03-setup.md`** — Technical setup instructions
- **`/docs/plan/04-workflow.md`** — Development workflow guide
- **`/docs/plan/05-prompt.md`** — Copy-paste setup prompts
- **`/docs/plan/06-home.md`** — Luxury home page design system

---

## Elevator Pitch

"StartupAI is the AI-powered operating system for founders raising capital. Generate investor decks in 10 minutes, enrich contacts from LinkedIn automatically, and manage your entire fundraising pipeline in one intelligent workspace. We help founders close rounds faster by eliminating 60+ hours of manual work per raise."

---

**Document Owner:** StartupAI Core Team  
**Last Updated:** December 24, 2025  
**Next Review:** After Beta Launch

---

**END OF DOCUMENT**
