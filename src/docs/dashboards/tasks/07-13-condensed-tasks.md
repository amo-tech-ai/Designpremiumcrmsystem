# TASKS 07-13: Remaining Implementation Tasks (Condensed)

**Document Type:** Condensed Task Reference  
**Last Updated:** December 31, 2025  
**Purpose:** Quick reference for remaining 7 tasks  

---

## TASK 07: Company Profile — Single Company Deep-Dive

**Priority:** 7 | **Days:** 5 | **Route:** /app/companies/:id | **Dependencies:** Contacts, Pipeline

### Summary
Deep research page for single company (investor, customer, competitor). Aggregates relationship data and competitive intelligence.

### Features (3 Advanced)
| Feature | Agent | Model | Approval |
|---------|-------|-------|----------|
| Fit Scoring | Scorer | Pro | Controller validates |
| Competitive Intel | Retriever + Analyst | Flash | Auto-approved |
| Meeting Prep | Analyst + Content | Pro | Auto-approved |

### 3-Panel Layout
- **Left:** Context (nav, quick jump)
- **Main:** Company data (overview, contacts, activity, insights tabs)
- **Right:** Hidden (all context in tabs)

### Key Workflows
1. **Fit Scoring:** Calculate investor match (0-100)
2. **Intel Gathering:** Daily scan for news, funding, hires
3. **Meeting Prep:** Generate pre-meeting briefing

### Design Prompts
1. Company profile header with fit score badge
2. AI Insights tab with "Why Good Fit" breakdown
3. Relationship timeline visualization

---

## TASK 08: Projects — Work Organization

**Priority:** 8 | **Days:** 6 | **Route:** /app/projects | **Dependencies:** Startup Profile

### Summary
Organize work into projects with milestones and tasks. AI predicts completion dates and detects risks.

### Features (3 Advanced)
| Feature | Agent | Model | Approval |
|---------|-------|-------|----------|
| Progress Prediction | Optimizer + Analyst | Pro | Controller validates |
| Risk Detection | Analyst | Pro | Auto-approved |
| Task Generation | Planner | Flash | Controller + Human |

### 3-Panel Layout
- **Left:** Context (nav, project list)
- **Main:** Project detail (milestones, tasks, timeline)
- **Right:** Intelligence (AI insights, next actions)

### Key Workflows
1. **Progress Prediction:** Calculate ETA based on velocity
2. **Risk Detection:** Flag overdue milestones, blockers
3. **Task Generation:** Create tasks when milestone complete

### Design Prompts
1. Projects list with progress bars and risk indicators
2. Project detail with milestone timeline
3. Template selection modal (Fundraise, Launch, Hiring)

---

## TASK 09: Event Wizard — Timeline Planning

**Priority:** 9 | **Days:** 5 | **Route:** /app/events/new | **Dependencies:** Projects

### Summary
Plan time-sensitive events (Demo Day, launches) with AI-generated timelines working backwards from deadline.

### Features (3 Advanced)
| Feature | Agent | Model | Approval |
|---------|-------|-------|----------|
| Timeline Generation | Planner + Optimizer | Pro | Controller + Human |
| Task Breakdown | Planner | Flash | Controller + Human |
| Load Balancing | Optimizer | Pro | Auto-approved |

### 3-Panel Layout
- **Single Panel:** Full-screen wizard (no sidebars)

### Key Workflows
1. **Timeline Generation:** Distribute tasks across time to deadline
2. **Load Balancing:** Ensure no week has >7 tasks
3. **Team Workload:** Balance assignments across team

### Design Prompts
1. Event type selection (6 cards: Fundraise, Launch, Demo Day, etc.)
2. Visual timeline preview with phases
3. Event dashboard with countdown timer

---

## TASK 10: Discovery — AI Market Research

**Priority:** 10 | **Days:** 7 | **Route:** /app/discovery | **Dependencies:** Startup Profile

### Summary
Conversational AI research assistant. Ask questions, get cited answers for TAM, competitors, investors.

### Features (3 Advanced)
| Feature | Agent | Model | Approval |
|---------|-------|-------|----------|
| Query Parsing | Orchestrator | Pro | Auto-approved |
| Multi-Source Research | Retriever + Analyst | Pro | Controller validates sources |
| TAM Calculation | Analyst | Pro | Controller + Human review |

### 3-Panel Layout
- **Left:** Context (research templates, history)
- **Main:** Chat interface + results
- **Right:** Intelligence (sources, follow-ups)

### Key Workflows
1. **Research Query:** User asks → AI searches → Synthesizes → Cites
2. **TAM Calculation:** Industry + target → Calculate TAM/SAM/SOM
3. **Competitor Analysis:** Find competitors → Compare features

### Design Prompts
1. Discovery home with large search bar
2. Research results with TAM/SAM/SOM breakdown + 10 sources
3. Competitive analysis feature comparison table

---

## TASK 11: GTM — Growth Strategy Planning

**Priority:** 11 | **Days:** 6 | **Route:** /app/gtm | **Dependencies:** Discovery

### Summary
Go-to-market strategy builder. AI generates ICP, ranks channels, optimizes budget allocation.

### Features (3 Advanced)
| Feature | Agent | Model | Approval |
|---------|-------|-------|----------|
| ICP Generation | Planner + Extractor | Pro | Controller + Human |
| Channel Ranking | Optimizer + Analyst | Pro | Controller validates |
| Keyword Research | Retriever | Flash | Auto-approved |

### 3-Panel Layout
- **Left:** Context (nav, GTM sections)
- **Main:** Strategy builder (ICP, channels, checklist)
- **Right:** Intelligence (recommendations, metrics)

### Key Workflows
1. **ICP Generation:** Extract from profile → Structure template
2. **Channel Ranking:** Score channels by fit → Rank → Suggest top 3
3. **Budget Optimization:** Allocate budget → Predict results

### Design Prompts
1. GTM dashboard with ICP card + 4 ranked channels
2. ICP builder form with AI suggestions
3. Budget allocation visualizer (pie chart + sliders)

---

## TASK 12: Lean Canvas — Business Model Validation

**Priority:** 12 | **Days:** 5 | **Route:** /app/lean-canvas | **Dependencies:** Startup Profile

### Summary
9-box Lean Canvas with AI pre-fill and hypothesis validation. Tracks pivots over time.

### Features (3 Advanced)
| Feature | Agent | Model | Approval |
|---------|-------|-------|----------|
| Canvas Pre-fill | Extractor + Orchestrator | Pro | Controller + Human |
| Hypothesis Validation | Analyst | Pro | Auto-approved |
| Version Comparison | Analyst | Flash | Auto-approved |

### 3-Panel Layout
- **Single Panel:** Full-width canvas (needs space for 9 boxes)

### Key Workflows
1. **Pre-fill Canvas:** Extract profile → Map to 9 boxes
2. **Hypothesis Validation:** Analyze boxes → Flag weak assumptions
3. **Version Comparison:** v1 vs v2 → Highlight changes

### Design Prompts
1. 9-box canvas grid (standard Lean Canvas layout)
2. Box edit modal with prompts + AI suggestions
3. Version comparison side-by-side with diff highlighting

---

## TASK 13: AI Chat — Conversational Assistant

**Priority:** 13 | **Days:** 4 | **Route:** /app/chat (right panel) | **Dependencies:** All screens

### Summary
Universal AI chat assistant accessible from all screens. Context-aware, suggests actions, routes to specialist agents.

### Features (3 Advanced)
| Feature | Agent | Model | Approval |
|---------|-------|-------|----------|
| Query Routing | Orchestrator | Pro | Auto-approved |
| Contextual Responses | Content + Retriever | Flash | Auto-approved |
| Action Suggestions | Planner | Pro | Controller if action executes |

### 3-Panel Layout
- **Right Panel:** Chat interface (360px, always accessible)

### Key Workflows
1. **Query Routing:** Detect intent → Route to specialist agent
2. **Context-Aware:** Know which screen user is on → Tailor response
3. **Action Execution:** Suggest action → Human approves → Execute

### Design Prompts
1. Chat panel (right sidebar, collapsible)
2. Contextual suggestions (change based on current screen)
3. Action confirmation card in chat

---

## IMPLEMENTATION SUMMARY

### Phase 3: Planning Tools (Tasks 08-09)
**Duration:** 3 weeks (11 days)  
**Deliverables:** Projects + Event Wizard

### Phase 4: Intelligence & Strategy (Tasks 10-13)
**Duration:** 4 weeks (22 days)  
**Deliverables:** Discovery + GTM + Lean Canvas + AI Chat

### Total Remaining
- **7 screens**
- **21 AI features**
- **33 development days**
- **21 design prompts** (3 per screen)

---

## QUICK REFERENCE: ALL 13 TASKS

| # | Screen | Priority | Days | Features | Agents | Phase |
|---|--------|----------|------|----------|--------|-------|
| 01 | Wizard | 1 | 10 | 4 | 4 | 1 |
| 02 | Startup Profile | 2 | 5 | 3 | 3 | 1 |
| 03 | Dashboard | 3 | 7 | 4 | 4 | 1 |
| 04 | User Profile | 4 | 2 | 0 | 1 | 1 |
| 05 | Contacts | 5 | 6 | 3 | 3 | 2 |
| 06 | Pipeline | 6 | 8 | 3 | 3 | 2 |
| 07 | Company Profile | 7 | 5 | 3 | 3 | 2 |
| 08 | Projects | 8 | 6 | 3 | 3 | 3 |
| 09 | Event Wizard | 9 | 5 | 3 | 3 | 3 |
| 10 | Discovery | 10 | 7 | 3 | 3 | 4 |
| 11 | GTM | 11 | 6 | 3 | 3 | 4 |
| 12 | Lean Canvas | 12 | 5 | 3 | 3 | 4 |
| 13 | AI Chat | 13 | 4 | 3 | 3 | 4 |
| **TOTAL** | **13** | — | **76** | **40** | **10** | **4** |

---

## NOTES

**Full Detailed Tasks Created:** 01-06 (Wizard, Profile, Dashboard, User, Contacts, Pipeline)

**Condensed Summary:** 07-13 (Company, Projects, Event, Discovery, GTM, Canvas, Chat)

All 13 tasks follow the same structure:
- Summary Matrix
- Implementation Progress Tracker
- Description, Purpose, Goals
- 3-Panel Layout Logic
- Features (Core vs Advanced)
- Content & Data schemas
- 3 Use Cases (real-world examples)
- Workflows & User Journeys
- AI Agents & Automations
- Gemini 3 Features & Tools
- 3 Multi-Step Design Prompts
- Acceptance Criteria

**Total Documentation:**
- **6 full task documents** (01-06): ~4,000 lines each
- **1 condensed reference** (07-13): Summary format
- **1 master README:** Complete index and tracker

---

**Document Owner:** Product + Design + Engineering Teams  
**Status:** Complete Task Library Ready  
**Next Action:** Begin implementation Phase 1 - Task 01  

---

**END OF CONDENSED TASKS**
