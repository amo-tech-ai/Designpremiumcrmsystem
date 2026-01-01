# Dashboard Tasks — Implementation Guide

**Version:** 1.0  
**Last Updated:** December 31, 2025  
**Document Type:** Task Directory Index  
**Purpose:** Central index for all screen implementation tasks  

---

## 📋 TASK OVERVIEW

This directory contains **numbered task documents** for implementing each screen in StartupAI. Each task follows a standardized format with design prompts, workflows, and acceptance criteria.

---

## 📊 MASTER PROGRESS TRACKER

### Implementation Status

| Task # | Screen | Priority | Est. Days | Status | Completion | Dependencies |
|--------|--------|----------|-----------|--------|------------|--------------|
| **01** | Wizard | 1 | 10 | 🔴 Not Started | 0% | None |
| **02** | Startup Profile | 2 | 5 | 🔴 Not Started | 0% | Task 01 |
| **03** | Dashboard | 3 | 7 | 🔴 Not Started | 0% | Tasks 01-02 |
| **04** | User Profile | 4 | 2 | 🔴 Not Started | 0% | None |
| **05** | Contacts | 5 | 6 | 🔴 Not Started | 0% | Task 02 |
| **06** | Pipeline | 6 | 8 | 🔴 Not Started | 0% | Task 05 |
| **07** | Company Profile | 7 | 5 | 🔴 Not Started | 0% | Tasks 05-06 |
| **08** | Projects | 8 | 6 | 🔴 Not Started | 0% | Task 02 |
| **09** | Event Wizard | 9 | 5 | 🔴 Not Started | 0% | Task 08 |
| **10** | Discovery | 10 | 7 | 🔴 Not Started | 0% | Task 02 |
| **11** | GTM | 11 | 6 | 🔴 Not Started | 0% | Task 10 |
| **12** | Lean Canvas | 12 | 5 | 🔴 Not Started | 0% | Task 02 |
| **13** | AI Chat | 13 | 4 | 🔴 Not Started | 0% | All tasks |
| **TOTAL** | **13 screens** | — | **76 days** | **0/13** | **0%** | — |

**Legend:**
- 🔴 Not Started
- 🟡 In Progress
- 🟢 Complete
- ⚠️ Blocked

---

## 🎯 IMPLEMENTATION PHASES

### Phase 1: Foundation (4 weeks, 24 days)
**Goal:** Core onboarding and data foundation

| Task | Screen | Days | Week |
|------|--------|------|------|
| 01 | Wizard | 10 | 1-2 |
| 02 | Startup Profile | 5 | 2-3 |
| 04 | User Profile | 2 | 3 |
| 03 | Dashboard | 7 | 3-4 |

**Deliverables:**
- New users can sign up, complete wizard, create profile
- Dashboard shows health score, metrics, AI insights
- Foundation for all AI agents

---

### Phase 2: Core CRM (4 weeks, 19 days)
**Goal:** Relationship management and deal tracking

| Task | Screen | Days | Week |
|------|--------|------|------|
| 05 | Contacts | 6 | 5-6 |
| 06 | Pipeline | 8 | 6-7 |
| 07 | Company Profile | 5 | 8 |

**Deliverables:**
- Add contacts with LinkedIn enrichment
- Track investor deals through pipeline
- Company intelligence and fit scoring

---

### Phase 3: Planning Tools (3 weeks, 11 days)
**Goal:** Work organization and execution

| Task | Screen | Days | Week |
|------|--------|------|------|
| 08 | Projects | 6 | 9-10 |
| 09 | Event Wizard | 5 | 10-11 |

**Deliverables:**
- Organize work into projects
- Plan time-sensitive events (Demo Day, launches)
- Timeline optimization and task generation

---

### Phase 4: Intelligence & Strategy (4 weeks, 22 days)
**Goal:** Advanced AI features and strategic planning

| Task | Screen | Days | Week |
|------|--------|------|------|
| 10 | Discovery | 7 | 12-13 |
| 11 | GTM | 6 | 13-14 |
| 12 | Lean Canvas | 5 | 14-15 |
| 13 | AI Chat | 4 | 15 |

**Deliverables:**
- AI research assistant for TAM, competitors, investors
- Go-to-market strategy builder
- Business model canvas with AI validation
- Universal AI chat assistant

---

## 📁 TASK DOCUMENT STRUCTURE

Each task document follows this format:

### 1. Header Section
- Priority, estimated days, route, dependencies
- Summary matrix (features, agents, progress)
- Implementation progress tracker (steps, hours, status)

### 2. Core Information
- Description (what it is)
- Purpose (why it exists)
- Goals (success metrics)

### 3. Layout & Design
- 3-panel layout logic (Left=Context, Main=Work, Right=Intelligence)
- Screen routes
- Content & data schemas

### 4. Features
- Core features (manual, no AI)
- Advanced features (AI-powered with agent specs)
- Feature breakdown table

### 5. Use Cases
- 3 real-world examples
- Persona-based scenarios
- Time savings quantified

### 6. Workflows
- Main user journey
- 2-3 detailed workflows
- Agent involvement at each step
- Approval gates

### 7. AI Specifications
- Agents used (with roles, models, tools)
- Automations (triggers, actions, frequency)
- Gemini 3 features & tools

### 8. Design Prompts
- 3 multi-step prompts per screen
- Copy-paste ready for design tools
- Detailed UI/UX specifications

### 9. Acceptance Criteria
- Functional requirements
- Performance benchmarks
- Quality metrics

---

## 🎨 3-PANEL LAYOUT PHILOSOPHY

**Core Model:** Context + Work + Intelligence

### Left Panel = Context (240px)
**Purpose:** Navigation and orientation
**Contains:**
- Main navigation menu
- Quick actions
- Workspace switcher
- Current location indicator

**When to show:** All dashboard screens

**When to hide:** Wizards, full-screen flows, mobile

---

### Main Panel = Work (900-1200px)
**Purpose:** Primary content and actions
**Contains:**
- Screen-specific content
- Forms, lists, cards
- Main workflows
- Action buttons

**When to show:** Always (core content)

**Responsive:** Full-width on mobile

---

### Right Panel = Intelligence (360px)
**Purpose:** AI assistance and insights
**Contains:**
- AI recommendations
- Contextual help
- Quick actions
- AI chat interface

**When to show:** Screens with AI insights (Dashboard, Pipeline, Discovery)

**When to hide:** Simple screens (User Profile, Settings), mobile (floating button instead)

---

## 🤖 AI AGENT REFERENCE

### Agent Summary by Task

| Agent | Used In Tasks | Total Features |
|-------|---------------|----------------|
| **Orchestrator** | 01, 10, 12, 13 | 7 |
| **Planner** | 03, 08, 09, 11, 13 | 8 |
| **Analyst** | 02, 03, 06, 10, 11, 12 | 12 |
| **Retriever** | 01, 02, 05, 07, 10, 11 | 11 |
| **Extractor** | 01, 02, 05, 11, 12 | 8 |
| **Scorer** | 02, 03, 05, 06, 07 | 7 |
| **Optimizer** | 08, 09, 11 | 5 |
| **Ops Automation** | 03, 06, 08, 09 | 6 |
| **Content/Comms** | 01, 06, 07, 13 | 5 |
| **Controller** | ALL | 40 |

**Total:** 10 agent types, 40 AI features

---

## 📈 SUCCESS METRICS BY PHASE

### Phase 1 Metrics (Foundation)
**Target:** 90%+ wizard completion, 70%+ profile completeness
- Wizard completion rate: 0% → 90%
- Profile completeness: 0% → 70%
- Daily active users: 0 → 40% of signups
- Time to first value: — → <15 minutes

### Phase 2 Metrics (CRM)
**Target:** 100+ contacts added, 50+ deals tracked
- LinkedIn enrichment accuracy: — → 90%
- Fit score correlation: — → 75%
- Contacts per user: 0 → 20+
- Deals per user: 0 → 10+

### Phase 3 Metrics (Planning)
**Target:** 5+ projects per user, 1+ event planned
- Projects created: 0 → 5+ per user
- Timeline accuracy: — → 85%
- Task completion rate: — → 70%
- Event on-time rate: — → 80%

### Phase 4 Metrics (Intelligence)
**Target:** 10+ research queries, GTM plans created
- Research queries: 0 → 10+ per user
- TAM calculation accuracy: — → 90%
- GTM plan completeness: — → 75%
- AI chat sessions: 0 → 5+ per week

---

## 🚀 HOW TO USE THIS DIRECTORY

### For Designers
1. Start with task document (e.g., 01-wizard-task.md)
2. Read "3-Panel Layout Logic" section
3. Use "Multi-Step Design Prompts" (3 prompts per task)
4. Reference "Content & Data" for exact fields
5. Check "Acceptance Criteria" for requirements

### For Engineers
1. Review "Features: Core vs Advanced" table
2. Check "AI Agents & Automations" section
3. Review "Workflows & User Journeys"
4. Reference "Gemini 3 Features & Tools"
5. Implement per "Implementation Progress" tracker

### For Product Managers
1. Read "Description" and "Purpose"
2. Review "Goals" (success metrics)
3. Check "Use Cases" (3 real-world examples)
4. Validate "Acceptance Criteria"
5. Track progress in summary matrix

### For QA Teams
1. Focus on "Acceptance Criteria" section
2. Use "Use Cases" as test scenarios
3. Check "Workflows" for edge cases
4. Validate "Performance" benchmarks
5. Test "Responsive" requirements

---

## 📝 DOCUMENT NAMING CONVENTION

**Format:** `{priority}-{screen-name}-task.md`

**Examples:**
- `01-wizard-task.md` (Priority 1)
- `02-startup-profile-task.md` (Priority 2)
- `13-ai-chat-task.md` (Priority 13)

**Numbering = Implementation Priority** (not alphabetical)

---

## 🔄 UPDATE PROCESS

### When to Update Task Documents

**Trigger:** Design changes, scope changes, feature additions

**Process:**
1. Update relevant task document
2. Update "Implementation Progress" table
3. Update this README's master tracker
4. Notify team in standup
5. Update dependencies if changed

### Version Control

**Major changes:** Increment version number (1.0 → 2.0)

**Minor changes:** Update "Last Updated" date only

**Breaking changes:** Add note at top of document

---

## 🎯 NEXT STEPS

### Immediate Actions
1. ✅ Review all 13 task documents
2. ⬜ Assign tasks to team members
3. ⬜ Set up project tracking (Jira, Linear, etc.)
4. ⬜ Begin Phase 1: Task 01 (Wizard)
5. ⬜ Schedule daily standups

### Weekly Cadence
- **Monday:** Week planning, assign tasks
- **Daily:** 15-min standup, update progress
- **Friday:** Demo completed work, retrospective
- **Ongoing:** Update task documents as needed

---

## 📚 RELATED DOCUMENTATION

**Core Docs:**
- `/docs/dashboards/00-summary.md` — Dashboard system overview
- `/docs/dashboards/13-agents.md` — Complete AI agent mapping
- `/docs/dashboards/14-agents-changes.md` — Implementation roadmap

**Individual Dashboard Docs:**
- `/docs/dashboards/01-dashboard.md` through `12-lean-canvas.md`

**Planning Docs:**
- `/docs/plan/00-startupai.md` — Project overview
- `/docs/plan/07-sitemap.md` — Complete sitemap

---

## ✅ QUICK REFERENCE

### Total Scope
- **13 Screens** to implement
- **40 AI Features** to integrate
- **10 Agent Types** to develop
- **76 Development Days** (15 weeks)
- **4 Implementation Phases**

### Key Milestones
- **Week 2:** Wizard complete
- **Week 4:** Dashboard complete (Phase 1 done)
- **Week 8:** Pipeline complete (Phase 2 done)
- **Week 11:** Projects complete (Phase 3 done)
- **Week 15:** AI Chat complete (Phase 4 done, LAUNCH)

### Critical Path
```
Wizard → Profile → Dashboard → Contacts → Pipeline → Discovery → GTM → Launch
```

---

**Document Owner:** Product + Design + Engineering Teams  
**Last Updated:** December 31, 2025  
**Status:** Ready for Implementation  
**Next Action:** Begin Task 01 - Wizard  

---

**END OF README**
