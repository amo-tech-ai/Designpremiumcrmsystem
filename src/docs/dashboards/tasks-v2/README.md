# 📚 Tasks V2 Documentation System

**Version:** 2.0  
**Created:** December 31, 2025  
**Purpose:** Streamlined task documentation without code  

---

## 🎯 WHAT IS THIS?

A clean, concise documentation system for all 13 dashboard screens in StartupAI. Each task is broken into 1-3 design prompts with clear deliverables.

**Philosophy:**
- Design specs only (no code)
- Clear, actionable prompts
- Agent-to-task mapping
- Progress tracking
- Easy to scan

---

## 📂 FILE STRUCTURE

```
/docs/dashboards/tasks-v2/
├── README.md              ← You are here
├── 00-index.md           ← Master index with matrix
├── 01-onboarding.md      ✅ Complete
├── 02-startup-profile.md ✅ Complete
├── 03-dashboard-home.md  ⬜ Next
├── 04-user-profile.md
├── 05-contacts-list.md
├── 06-contact-detail.md
└── 07-12-remaining.md    (condensed)
```

---

## 🗺️ QUICK REFERENCE

### Status Legend
- ✅ Complete — Implementation done, tested
- 🔄 In Progress — Currently being built
- ⬜ Not Started — Waiting in queue
- 🚫 Blocked — Waiting on dependencies

### Priority Levels
- **P0 (Critical)** — Must have for MVP
- **P1 (High)** — Important for usability
- **P2 (Medium)** — Nice to have
- **P3 (Low)** — Future enhancement

---

## 📊 CURRENT PROGRESS

**Completed:** 6/39 prompts (15%)

**Tasks:**
1. ✅ Onboarding Wizard (3 prompts)
2. ✅ Startup Profile (3 prompts)
3. ⬜ Dashboard Home (3 prompts)
4. ⬜ User Profile (2 prompts)
5. ⬜ Contacts List (3 prompts)
6. ⬜ Contact Detail (3 prompts)
7. ⬜ Pipeline Board (3 prompts)
8. ⬜ Discovery (3 prompts)
9. ⬜ GTM Strategy (3 prompts)
10. ⬜ Lean Canvas (2 prompts)
11. ⬜ Projects Dashboard (3 prompts)
12. ⬜ AI Agents Hub (3 prompts)
13. ⬜ Company Profile (2 prompts)

---

## 🤖 AGENT MAPPING

Each task specifies which AI agents are used:

**Agents:**
1. LinkedIn Agent — Profile scraping
2. Market Agent — TAM/competitor data
3. Scorer Agent — Lead scoring
4. Strategy Agent — GTM recommendations
5. Deck Agent — Pitch generation
6. Email Agent — Sequences, templates
7. Analyst Agent — Validation, insights
8. Researcher Agent — Market research
9. Outreach Agent — Cold email
10. Calendar Agent — Meeting scheduling

---

## 📋 TASK TEMPLATE

Each task file follows this structure:

```
# Task XX: [Name]

**Status:** ⬜ Not Started
**Priority:** P1 (High)
**Screens:** 1
**Prompts:** 3
**Agents:** Agent A, Agent B

## 📋 OVERVIEW
[Brief description of purpose and user journey]

## 🎯 PROMPTS

### Prompt X.1 — [Name]
**Description:** [What this builds]
**Key Points:**
- Bullet list of features
- No code, just design specs
**Deliverables:**
- Components to create
**Acceptance Criteria:**
- What success looks like
**Agents Used:** [Which agents]
**Status:** ⬜ Not Started

[Repeat for each prompt]

## 📊 TASK SUMMARY
[Stats and overview]
```

---

## 🔍 HOW TO USE

### For Developers:
1. Read the task overview
2. Review all prompts for that task
3. Implement one prompt at a time
4. Check off acceptance criteria
5. Mark prompt as complete
6. Move to next prompt

### For AI Assistants:
1. Load the task file
2. Parse the prompt specs
3. Generate components based on key points
4. Validate against acceptance criteria
5. Update status in index
6. Document completion

### For Project Managers:
1. Check 00-index.md for progress
2. Review screen-agent matrix
3. Identify blockers
4. Assign tasks to team
5. Track completion

---

## ✅ QUALITY STANDARDS

Every prompt must have:
- [ ] Clear description
- [ ] 5-10 key points
- [ ] Deliverables list
- [ ] Acceptance criteria
- [ ] Agent mapping
- [ ] No code blocks

Every task must have:
- [ ] Overview section
- [ ] User journey described
- [ ] All prompts specified
- [ ] Summary stats
- [ ] Implementation location

---

## 🎨 DESIGN CONSISTENCY

All tasks follow StartupAI design system:

**Colors:**
- Primary: Indigo-Purple gradients
- Success: Green
- Warning: Orange/Yellow
- Error: Red

**Layout:**
- Max-width: 1440px (desktop)
- Centered: 800px
- Sidebar: 240px
- Panel: 320px

**Spacing:**
- Gap: 16px (gap-4)
- Section: 32px (space-y-8)
- Card padding: 24px (p-6)

**Typography:**
- Use semantic heading levels
- Base font size for body
- No custom font sizes in tasks

---

## 🔗 RELATED DOCS

**Implementation:**
- `/components/wizard-v2/` — Task 01
- `/components/startup-profile/` — Task 02
- `/components/dashboard-v2/` — Task 03 (coming)

**Guides:**
- `/INTEGRATION-GUIDE.md` — How to integrate
- `/WIZARD-V2-IMPLEMENTATION.md` — Wizard reference
- `/WIZARD-SETUP-STATUS.md` — Current status

**Legacy:**
- `/docs/dashboards/tasks/` — Old system (deprecated)

---

## 📅 ROADMAP

### Phase 1 (Weeks 1-2): Foundation
- Task 01: Onboarding ✅
- Task 02: Startup Profile ✅
- Task 03: Dashboard Home ⬜

### Phase 2 (Weeks 3-6): Core CRM
- Task 04: User Profile
- Task 05: Contacts List
- Task 06: Contact Detail
- Task 07: Pipeline Board

### Phase 3 (Weeks 7-10): Strategy Tools
- Task 08: Discovery
- Task 09: GTM Strategy
- Task 10: Lean Canvas

### Phase 4 (Weeks 11-15): Advanced
- Task 11: Projects
- Task 12: AI Agents Hub
- Task 13: Company Profile

---

## 🚀 GETTING STARTED

### Next Task (Task 03):

1. Read `/docs/dashboards/tasks-v2/03-dashboard-home.md`
2. Understand the 3 prompts
3. Start with Prompt 3.1 (layout)
4. Build the components
5. Test against criteria
6. Mark complete in 00-index.md
7. Move to Prompt 3.2

**Estimated Time:** 3 hours for all 3 prompts

---

## 📊 TRACKING PROGRESS

Update these files as you complete prompts:

**00-index.md:**
- Screen-Agent-Task matrix (update status)
- Progress tracker (update percentages)
- Phase completion (update stats)

**Individual Task Files:**
- Change ⬜ to ✅ for each prompt
- Update task status at top
- Add completion date

---

## 💡 TIPS

**For Speed:**
- Focus on one task at a time
- Complete all prompts in a task before moving on
- Use existing components when possible
- Follow the design system strictly

**For Quality:**
- Read acceptance criteria carefully
- Test on mobile and desktop
- Verify agent integration works
- Check for accessibility

**For Collaboration:**
- Update status immediately after completion
- Document any deviations from spec
- Add notes in task file if needed
- Communicate blockers early

---

## ❓ FAQ

**Q: Can I change the prompt specs?**  
A: Yes, but document changes in the task file and update index.

**Q: What if I need more prompts?**  
A: Add sub-prompts (e.g., 3.1a, 3.1b) and update the count.

**Q: Should I update the old tasks/ folder?**  
A: No, tasks-v2 is the new source of truth. Old folder is deprecated.

**Q: Where do I put implementation code?**  
A: In `/components/[feature]-v2/` folders. Not in docs.

**Q: How do I mark a task complete?**  
A: Update 00-index.md matrix and the task file header.

---

## 🎯 SUCCESS METRICS

**For MVP (Phase 1-2):**
- All P0 tasks complete (6 tasks, 18 prompts)
- Core user flow working end-to-end
- Mobile responsive
- No critical bugs

**For Full Launch (Phase 1-4):**
- All 13 tasks complete (39 prompts)
- All agents integrated
- Production ready
- User tested

---

**Last Updated:** December 31, 2025  
**Next Review:** Weekly  
**Maintained By:** Development Team

---

**Happy building! 🚀**
