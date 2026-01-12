# 📋 StartupAI V2 Task System — Master Index

**Created:** December 31, 2025  
**Version:** 2.0  
**Total Tasks:** 13 screens  
**Total Prompts:** 39  
**Completion:** 9/39 prompts (23%)  

---

## 🎯 OVERVIEW

This V2 task system organizes all remaining dashboard implementations into discrete, actionable prompts. Each task represents one screen or feature with 1-3 design prompts.

**Philosophy:**
- One prompt = One focused implementation
- No code in documentation (design specs only)
- Clear deliverables and acceptance criteria
- Agent-to-task mapping for AI automation

---

## 📊 PROGRESS TRACKER

### Overall Progress
```
Completed:   ███████████░░░░░░░░░░░░░░░░░░░░░░░░░  9/39  (23%)
In Progress: ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  0/39  (0%)
Not Started: ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  30/39 (77%)
```

### By Phase
| Phase | Name | Prompts | Complete | Progress |
|-------|------|---------|----------|----------|
| Phase 1 | Foundation | 9 | 9 | 100% ██████████ |
| Phase 2 | Core Features | 12 | 0 | 0% ░░░░░░░░░░ |
| Phase 3 | Advanced | 10 | 0 | 0% ░░░░░░░░░░ |
| Phase 4 | Polish | 8 | 0 | 0% ░░░░░░░░░░ |

### By Priority
| Priority | Prompts | Complete | Remaining |
|----------|---------|----------|-----------|
| P0 (Critical) | 12 | 9 | 3 |
| P1 (High) | 15 | 0 | 15 |
| P2 (Medium) | 8 | 0 | 8 |
| P3 (Low) | 4 | 0 | 4 |

---

## 🗺️ SCREEN-AGENT-TASK MATRIX

| Screen ID | Screen Name | Agent(s) | Tasks | Prompts | Status | Priority |
|-----------|-------------|----------|-------|---------|--------|----------|
| **01** | Onboarding Wizard | LinkedIn Agent, Market Agent, Deck Agent | 3 | 3 | ✅ Done | P0 |
| **02** | Startup Profile | Analyst Agent, Market Agent | 3 | 3 | ✅ Done | P0 |
| **03** | Dashboard Home | All Agents | 4 | 3 | ✅ Done | P0 |
| **04** | User Profile | LinkedIn Agent | 2 | 2 | ⬜ Todo | P1 |
| **05** | Contacts List | LinkedIn Agent, Email Agent | 3 | 3 | ⬜ Todo | P1 |
| **06** | Contact Detail | LinkedIn Agent, Email Agent, Scorer Agent | 4 | 3 | ⬜ Todo | P1 |
| **07** | Pipeline Board | Scorer Agent, Strategy Agent | 3 | 3 | ⬜ Todo | P0 |
| **08** | Discovery (Lead Gen) | LinkedIn Agent, Market Agent | 3 | 3 | ⬜ Todo | P1 |
| **09** | GTM Strategy | Strategy Agent, Market Agent | 2 | 3 | ⬜ Todo | P2 |
| **10** | Lean Canvas | Strategy Agent | 1 | 2 | ⬜ Todo | P2 |
| **11** | Projects Dashboard | All Agents | 3 | 3 | ⬜ Todo | P2 |
| **12** | AI Agents Hub | All Agents | 2 | 3 | ⬜ Todo | P1 |
| **13** | Company Profile | Analyst Agent | 1 | 2 | ⬜ Todo | P3 |

**Total:** 13 screens, 30 tasks, 39 prompts

---

## 🤖 AGENT COVERAGE MAP

| Agent | Screens | Prompts | Primary Role |
|-------|---------|---------|--------------|
| **LinkedIn Agent** | 6 | 12 | Profile enrichment, contact data |
| **Market Agent** | 5 | 10 | TAM/SAM/SOM, competitor analysis |
| **Scorer Agent** | 3 | 6 | Lead scoring, opportunity ranking |
| **Strategy Agent** | 4 | 8 | GTM planning, positioning |
| **Deck Agent** | 2 | 4 | Pitch deck generation |
| **Email Agent** | 2 | 4 | Email sequences, outreach |
| **Analyst Agent** | 4 | 8 | Profile validation, insights |

---

## 📅 IMPLEMENTATION TIMELINE

### Week 1-2: Foundation (Phase 1)
- ✅ Task 01: Onboarding Wizard (3 prompts) — DONE
- ✅ Task 02: Startup Profile (3 prompts) — DONE
- ✅ Task 03: Dashboard Home (3 prompts) — DONE

### Week 3-4: Core CRM (Phase 2)
- ⬜ Task 04: User Profile (2 prompts)
- ⬜ Task 05: Contacts List (3 prompts)
- ⬜ Task 06: Contact Detail (3 prompts)
- ⬜ Task 07: Pipeline Board (3 prompts)

### Week 5-6: Lead Gen & Strategy (Phase 2)
- ⬜ Task 08: Discovery (3 prompts)
- ⬜ Task 09: GTM Strategy (3 prompts)
- ⬜ Task 10: Lean Canvas (2 prompts)

### Week 7-8: Advanced Features (Phase 3)
- ⬜ Task 11: Projects Dashboard (3 prompts)
- ⬜ Task 12: AI Agents Hub (3 prompts)
- ⬜ Task 13: Company Profile (2 prompts)

---

## 📁 TASK FILE STRUCTURE

```
/docs/dashboards/tasks-v2/
├── 00-index.md                    ← You are here
├── 01-onboarding.md              ✅ Done
├── 02-startup-profile.md         ✅ Done
├── 03-dashboard-home.md          ⬜ Next
├── 04-user-profile.md
├── 05-contacts-list.md
├── 06-contact-detail.md
├── 07-pipeline-board.md
├── 08-discovery.md
├── 09-gtm-strategy.md
├── 10-lean-canvas.md
├── 11-projects-dashboard.md
├── 12-ai-agents-hub.md
└── 13-company-profile.md
```

---

## 🎨 DESIGN SYSTEM REFERENCE

All tasks follow these principles:

**Colors:**
- Primary: Indigo (600) to Purple (600) gradients
- Success: Green (500) to Emerald (500)
- Warning: Orange (500) to Yellow (500)
- Error: Red (500) to Pink (500)

**Layout:**
- Max width: 1440px (desktop)
- Container: 800px (centered content)
- Sidebar: 240px (left navigation)
- Panel: 320px (right insights)

**Typography:**
- Headings: Bold, tight tracking
- Body: Base size, light weight
- Helper: Small, gray-600

**Spacing:**
- Base unit: 4px
- Standard gap: 16px (gap-4)
- Section spacing: 32px (space-y-8)

**Components:**
- Cards: White background, border, rounded-xl
- Buttons: Gradient primary, ghost secondary
- Modals: Max-w-4xl, glassmorphism backdrop
- Progress: Gradient bars with percentage

---

## 📋 TASK NAMING CONVENTION

Each task follows this format:

```
{ID}-{name}.md

Example: 03-dashboard-home.md
```

Each prompt follows this format:

```
Prompt {Task}.{Number} — {Name}

Example: Prompt 3.1 — Dashboard Layout
```

---

## 🎯 NEXT STEPS

### Immediate (This Week)
1. Review Task 03 (Dashboard Home)
2. Implement Prompt 3.1
3. Implement Prompt 3.2
4. Implement Prompt 3.3

### Short-term (Next 2 Weeks)
1. Complete Phase 1 (Tasks 1-3)
2. Begin Phase 2 (Tasks 4-7)
3. Set up Supabase persistence
4. Integrate Gemini API

### Long-term (Next 4 Weeks)
1. Complete all 13 screens
2. Full AI agent integration
3. Production deployment
4. User testing

---

## 📚 RELATED DOCUMENTATION

**Legacy System:**
- `/docs/dashboards/tasks/` — Original task system (deprecated)
- Kept for reference, use tasks-v2 going forward

**Implementation:**
- `/components/wizard-v2/` — Onboarding wizard (Task 01)
- `/components/startup-profile/` — Profile page (Task 02)
- `/components/dashboard-v2/` — Dashboard home (Task 03, coming)

**Guides:**
- `/INTEGRATION-GUIDE.md` — How to add components to App.tsx
- `/WIZARD-V2-IMPLEMENTATION.md` — Wizard reference
- `/WIZARD-SETUP-STATUS.md` — Current status

---

## ✅ QUALITY CHECKLIST

Every task must meet these criteria:

### Documentation
- [ ] Clear prompt name and description
- [ ] Key points listed (no code)
- [ ] Deliverables specified
- [ ] Acceptance criteria defined
- [ ] Agent mapping identified

### Implementation
- [ ] TypeScript 100% type-safe
- [ ] Responsive (mobile, tablet, desktop)
- [ ] Accessible (ARIA, keyboard nav)
- [ ] Smooth animations (Motion/React)
- [ ] Loading states implemented
- [ ] Error handling included

### Testing
- [ ] Visual QA passed
- [ ] Functional testing complete
- [ ] Performance optimized (<1s load)
- [ ] No console errors
- [ ] Mobile tested

---

**Last Updated:** December 31, 2025  
**Next Review:** January 7, 2026  
**Maintained By:** AI Implementation Team

---

**END OF INDEX**