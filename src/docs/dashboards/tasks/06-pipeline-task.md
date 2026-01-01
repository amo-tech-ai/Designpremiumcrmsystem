# TASK 06: Pipeline — Deal Execution Kanban

**Priority:** 6 (After Contacts)  
**Est. Days:** 8 days  
**Route:** /app/pipeline  
**Type:** Dashboard (Kanban)  
**Dependencies:** Contacts (deal data source)  

---

## SUMMARY MATRIX

| Screen | Features | Agents | Gemini Model | Status | Progress |
|--------|----------|--------|--------------|--------|----------|
| Pipeline | 3 Advanced | 3 | Pro + Flash | 🔴 Not Started | 0% |

### Features Breakdown

| Feature | Type | Agent | Model | Approval Gate |
|---------|------|-------|-------|---------------|
| Fit Scoring | Advanced | Scorer | Pro | Controller validates |
| Task Auto-Generation | Advanced | Planner + Ops | Flash | Controller + Human |
| Stagnation Alerts | Advanced | Ops + Analyst | Flash | Controller validates |

### Implementation Progress

| Step | Task | Est. Hours | Status | Dependencies |
|------|------|------------|--------|--------------|
| 1 | Design kanban layout | 12h | ⬜ | None |
| 2 | Build drag-and-drop | 10h | ⬜ | Step 1 |
| 3 | Create deal cards | 8h | ⬜ | Step 1 |
| 4 | Implement fit scoring | 8h | ⬜ | Steps 2-3 |
| 5 | Build task generation | 10h | ⬜ | Steps 2-3 |
| 6 | Add stagnation detection | 6h | ⬜ | Step 3 |
| 7 | Deal detail page | 10h | ⬜ | Steps 2-4 |
| 8 | Testing + QA | 10h | ⬜ | All above |
| **Total** | **8 tasks** | **74h** | **0/8** | — |

---

## DESCRIPTION

Visual kanban board for tracking investor conversations through 7 stages. AI generates tasks per stage and alerts when deals stall.

---

## PURPOSE

Maintain clear visibility of fundraising pipeline. Automate next actions per stage. Prevent deals from falling through cracks.

---

## GOALS

1. **Conversion:** Research → Meeting: 20%+
2. **Win Rate:** Meeting → Committed: 15%+
3. **Velocity:** Average Research → Committed: <90 days
4. **Task Completion:** 80%+ of AI-generated tasks completed
5. **Stagnation:** <10% deals stalled >14 days

---

## 3-PANEL LAYOUT LOGIC

### Core Model: **Work Only (Full-Width Kanban)**

**Left Panel = Hidden** (kanban needs full width)

**Main Panel = Work (Full-width 1440px)**
- 7-column kanban board
- Horizontal scroll on smaller screens

**Right Panel = Hidden** (context in cards)

**Layout:**
```
┌──────────────────────────────────────────────────────────────────┐
│ Pipeline                         [+ Add Deal] [⚙ Settings]       │
├──────────────────────────────────────────────────────────────────┤
│ Research│Outreach│Meeting│Follow-up│Due Dil│Committed│Closed    │
│  (12)   │  (8)   │  (5)  │   (3)   │ (2)   │   (1)   │  (4)     │
│─────────┼────────┼───────┼─────────┼───────┼─────────┼──────────│
│         │        │       │         │       │         │          │
│┌───────┐│┌──────┐│┌─────┐│┌───────┐│       │┌───────┐│┌────────┐│
││Sequoia│││Acme  │││First│││Bench- ││       ││Paradigm│││Index   ││
││Capital│││VC    │││Round│││mark   ││       ││        │││Ventures││
││       │││      │││     │││       ││       ││$500K   │││$750K   ││
││Score:87│││Sarah││Mike ││Partner ││       ││        │││        ││
││       │││Score:│││Jan15│││2 days ││       ││        │││        ││
│└───────┘│└──────┘│└─────┘│└───────┘│       │└───────┘│└────────┘│
│         │        │       │         │       │         │          │
│[+]      │[+]     │[+]    │[+]      │[+]    │[+]      │[+]       │
└──────────────────────────────────────────────────────────────────┘
```

**Desktop:** Full-width, 7 columns visible  
**Tablet:** Horizontal scroll, 4 columns visible  
**Mobile:** Single column view with stage tabs  

---

## CONTENT & DATA

### Deal Schema
```
Deal:
  company_id: uuid (ref companies)
  contact_id: uuid (ref contacts)
  
  stage: text (research, outreach, meeting, follow_up, due_diligence, committed, closed_won, closed_lost)
  fit_score: decimal (0-100)
  amount: decimal (commitment amount)
  
  stage_history: jsonb[] (log of all stage changes)
  last_activity: timestamp
  days_in_stage: integer (calculated)
  
  tasks_pending: integer
  tasks_complete: integer
  
  notes: text
  created_at: timestamp
```

### Stage Definitions
```
Stages:
  1. Research:
     - Learning about investor
     - Calculating fit score
     - Identifying warm intro paths
  
  2. Outreach:
     - Initial email sent
     - Requesting intro
     - Following up
  
  3. Meeting:
     - Pitch scheduled
     - Pitch delivered
     - Deck shared
  
  4. Follow-up:
     - Post-meeting follow-up
     - Sharing additional materials
     - Scheduling next touchpoint
  
  5. Due Diligence:
     - Data room access
     - Reference calls
     - Term sheet negotiation
  
  6. Committed:
     - Term sheet signed
     - Waiting for wire
     - Celebrating 🎉
  
  7. Closed (Won/Lost):
     - Won: Funds received
     - Lost: Passed or ghosted
```

---

## USE CASES (3 REAL-WORLD EXAMPLES)

### Use Case 1: Moving Deal to Meeting Stage

**Persona:** Sarah, just scheduled pitch with Sequoia

**Scenario:**
- Opens Pipeline, sees Sequoia deal in "Outreach" column
- Drags card to "Meeting" column
- Card flies smoothly with animation
- Modal appears: "Deal moved to Meeting stage"
- AI suggests 4 tasks:
  1. Prepare pitch deck (due: 2 days before meeting)
  2. Schedule meeting in calendar (due: today)
  3. Research attendees (Sarah Johnson profile)
  4. Draft meeting agenda (due: 1 day before)
- She reviews, edits task 3: "Research Sarah Johnson AND partners attending"
- Clicks "Approve All"
- Tasks created, assigned to Sarah
- Deal card updates: "4 pending tasks"
- Stage counter updates: Outreach (7), Meeting (6)

**Time:** 1 minute  
**Value:** Next actions clear, nothing forgotten

---

### Use Case 2: Stagnation Alert

**Persona:** Mike, hasn't updated Acme Ventures deal in 16 days

**Scenario:**
- Opens Pipeline, sees Acme deal with red "Stalled" badge
- Deal card shows: "No activity in 16 days"
- Dashboard shows notification: "Deal with Acme Ventures stalled. Send follow-up?"
- He clicks notification → Opens deal detail
- Sees timeline: Last activity "Nov 15: Sent email, no response"
- AI suggests: "Send follow-up email. Mention new milestone (hit $10K MRR)."
- Clicks "Draft Email"
- AI generates: "Hi John, following up on my email from Nov 15. Quick update: we just hit $10K MRR..."
- He edits, adds personal touch, sends
- Deal updates: Last activity "Dec 1: Follow-up sent"
- Card turns yellow (activity <7 days)
- 2 days later: Investor responds, schedules call
- Mike moves deal to "Meeting"

**Time:** 5 minutes  
**Value:** Prevented lost deal, re-engaged investor

---

### Use Case 3: Pipeline Velocity Analysis

**Persona:** TechFlow team, reviewing fundraising progress

**Scenario:**
- Opens Pipeline, clicks "⚙ Settings" → "Analytics"
- Sees pipeline dashboard:
  - Total deals: 35
  - Active deals: 30
  - Conversion rate Research → Meeting: 25% (above 20% target ✓)
  - Conversion rate Meeting → Committed: 12% (below 15% target ✗)
  - Average time Research → Committed: 76 days (below 90 day target ✓)
- AI Insight: "Your Meeting → Committed rate is below target. Analysis: 8 deals stalled at Follow-up stage. Common pattern: Not sharing follow-up materials fast enough."
- Recommendation: "Create template doc with: pitch deck, one-pager, financial model. Share within 24 hours of meeting."
- Team creates template, adds to workflow
- Next month: Conversion improves to 18%

**Time:** 10 minutes  
**Value:** Data-driven optimization

---

## WORKFLOWS & USER JOURNEYS

### Main User Journey
```
Open Pipeline → View 7-stage kanban → Drag deal to new stage → Review AI tasks → Approve → Tasks created → Deal detail view → Add notes
```

### Workflow 1: Drag Deal to New Stage
```
User drags deal card from "Outreach" to "Meeting"
  ↓
UI: Card lifts (z-index increase, shadow)
  ↓
UI: Drop zone highlights (blue border)
  ↓
User drops card in "Meeting" column
  ↓
Ops Automation: Detect stage change
  - Old stage: outreach
  - New stage: meeting
  - Timestamp: now
  ↓
Planner: Generate stage-specific tasks
  - Load "Meeting" stage template
  - Tasks:
    1. Prepare pitch deck
    2. Schedule meeting
    3. Research attendees
    4. Draft agenda
  - Assign due dates (relative to meeting date)
  ↓
Controller: Validate task list
  - Check task count (3-5 is good)
  - Verify due dates logical
  - Ensure assignable to user
  ↓
Display task modal:
  - Title: "Deal moved to Meeting stage"
  - Task checklist (all pre-checked)
  - Edit button per task
  - Approve All / Edit Tasks / Skip buttons
  ↓
Human clicks "Approve All"
  ↓
Create tasks in database:
  - Link to deal_id
  - Assign to current user
  - Set status: pending
  ↓
Update deal:
  - stage = "meeting"
  - last_activity = now
  - days_in_stage = 0
  - stage_history.append({stage: "meeting", date: now})
  ↓
Log activity:
  - Type: stage_change
  - Description: "Moved from Outreach to Meeting"
  - User: current_user
  ↓
UI: Card moves to new column with animation
  ↓
UI: Stage counters update (Outreach -1, Meeting +1)
  ↓
UI: Deal card shows "4 pending tasks"
```

**Approval Gate:** Controller validates tasks, Human approves creation

---

### Workflow 2: Stagnation Detection
```
Daily cron job (runs at midnight)
  ↓
Ops Automation: Scan all active deals
  ↓
Query:
  SELECT * FROM deals
  WHERE stage NOT IN ('closed_won', 'closed_lost')
  AND last_activity < NOW() - INTERVAL '14 days'
  ↓
For each stalled deal:
  ↓
  Analyst: Generate context
    - Deal name: "Acme Ventures"
    - Last activity: "Nov 15: Sent email"
    - Days stalled: 16
    - Stage: "Outreach"
    - Fit score: 82/100 (high)
    ↓
  Analyst: Analyze why stalled
    - Pattern: No response to outreach email
    - Possible reasons: Email got lost, not interesting, timing
    - Suggestion: Send follow-up with new milestone
    ↓
  Controller: Validate alert
    - Check days calculation correct
    - Verify deal truly has no activity
    - Approve notification
    ↓
  Ops Automation: Send notification
    - Email: "Deal with Acme Ventures stalled (16 days)"
    - In-app: Red badge on deal card
    - Dashboard: Alert in activity feed
    ↓
  Update deal:
    - Add flag: stagnation_alert = true
    - Alert_sent_at = now
    ↓
User clicks notification:
  ↓
  Navigate to deal detail
  ↓
  Show alert banner: "This deal has been inactive for 16 days. Send follow-up?"
  ↓
  CTA button: "Draft Follow-up Email"
  ↓
  User clicks → AI generates email → User edits, sends
  ↓
  Deal updates: last_activity = now, stagnation_alert = false
  ↓
  Card turns yellow (active again)
```

**Approval Gate:** Controller validates alert, User takes action

---

## AI AGENTS & AUTOMATIONS

### Agents Used

| Agent | Role | Model | Tools |
|-------|------|-------|-------|
| **Scorer** | Calculate investor fit scores | Pro | Gemini Thinking |
| **Planner** | Generate stage-specific tasks | Flash | Structured outputs, Text generation |
| **Ops Automation** | Detect stagnation, send alerts | Flash | Function calling, Interactions API |
| **Analyst** | Analyze pipeline metrics | Pro | Code execution, Gemini Thinking |
| **Controller** | Approval gate | Pro | Function calling |

### Automations

| Trigger | Action | Frequency |
|---------|--------|-----------|
| Deal moved to new stage | Generate tasks | Real-time |
| Deal stalled 14+ days | Send alert | Daily cron |
| Deal reaches Committed | Celebrate animation + email | Real-time |
| Weekly | Pipeline velocity report | Weekly (Monday 8am) |
| Deal created | Calculate fit score | Real-time |

---

## GEMINI 3 FEATURES & TOOLS

### Model Selection

**Pro (2 use cases):**
- Fit scoring (complex calculation)
- Pipeline analytics (deep analysis)

**Flash (2 use cases):**
- Task generation (quick creation)
- Stagnation alerts (lightweight detection)

### Tools Used

| Tool | Use Case |
|------|----------|
| **Gemini Thinking** | Calculate fit scores, analyze patterns |
| **Structured Outputs** | Format task lists |
| **Function Calling** | Trigger automations |
| **Interactions API** | Send notifications |
| **Code Execution** | Calculate pipeline metrics |

---

## MULTI-STEP DESIGN PROMPTS

### Prompt 1: 7-Column Kanban Board
```
Design a kanban board with 7 stages for investor pipeline.
Requirements:
- Full-width layout (1440px)
- 7 columns (equal width): Research, Outreach, Meeting, Follow-up, Due Diligence, Committed, Closed
- Each column header:
  - Stage name (bold)
  - Count badge (e.g., "(12)" in gray circle)
  - "+ Add Deal" button at bottom (appears on hover)
- Deal cards (280px wide, auto height):
  - Company logo (48px avatar, top-left)
  - Company name (bold, truncate if long)
  - Contact name + role (smaller, gray)
  - Fit score badge (top-right): "87/100" with color (green >80, yellow 60-80, red <60)
  - Last activity timestamp (bottom): "2 days ago"
  - Health indicator dot (bottom-left): Green = active (<7d), Yellow = stale (7-14d), Red = stalled (14+d)
  - Pending tasks count: "4 tasks" (small badge)
- Drag-and-drop:
  - Card lifts on drag (shadow increases)
  - Drop zones highlight with blue border
  - Smooth animation on drop
- Horizontal scroll on smaller screens
- Empty column state: "No deals in this stage yet"

Visual style: Clean, organized, card-based, clear status indicators
Color coding: Stages have subtle header colors (research = gray, committed = green)
```

### Prompt 2: Deal Card Design
```
Design an investor deal card for kanban board.
Requirements:
- Card size: 280px wide, auto height (min 160px)
- Border: 1px gray, rounded corners (8px)
- Hover effect: Shadow + slight lift
- Layout:
  - Top section:
    - Company logo (48px circle) on left
    - Fit score badge (87/100) on right with colored background (green/yellow/red)
  - Middle section:
    - Company name (18px, bold, black): "Sequoia Capital"
    - Contact (14px, gray): "Sarah Johnson • Partner"
  - Bottom section:
    - Health indicator dot (8px) on left: Green/Yellow/Red
    - Last activity (12px, gray): "2 days ago"
    - Tasks badge (12px, blue): "4 tasks"
- Drag handle: Appears on hover (6 dots, top-center)
- Click: Opens deal detail page
- Status badges:
  - "Stalled" (red, if 14+ days no activity)
  - "Hot" (orange, if 3+ activities in last 7 days)

Visual style: Clean card design, clear hierarchy, at-a-glance status
Show example with "Stalled" badge in red
```

### Prompt 3: Task Generation Modal
```
Design modal that appears after moving deal to new stage.
Requirements:
- Modal: 600px wide, centered, blur background
- Header:
  - Title: "Deal moved to Meeting stage"
  - Subtitle: "AI suggests 4 tasks to help you prepare"
  - Close X button
- Task checklist:
  - Each task: Checkbox (pre-checked), task title, due date, assignee dropdown
  - Tasks:
    1. ☑ Prepare pitch deck (Due: Jan 15, Assigned: Sarah)
    2. ☑ Schedule meeting in calendar (Due: Jan 10, Assigned: Mike)
    3. ☑ Research Sarah Johnson profile (Due: Jan 12, Assigned: Sarah)
    4. ☑ Draft meeting agenda (Due: Jan 14, Assigned: Lisa)
  - Edit icon per task (pencil)
  - Click task to expand inline editor
- AI confidence badge: "Based on 100+ successful Meeting stage transitions"
- Bottom buttons:
  - "Approve All" (primary blue) with checkmark icon
  - "Edit Tasks" (secondary gray)
  - "Skip Tasks" (text link)
- After approve:
  - Success animation (checkmarks appear one by one)
  - Success message: "✓ 4 tasks created and assigned"
  - "View Tasks" and "Close" buttons

Visual style: Clear, actionable, builds trust in AI
Show loading state while tasks generate: "Analyzing stage... Generating tasks..."
```

---

## ACCEPTANCE CRITERIA

### Functional
- [ ] 7-column kanban displays correctly
- [ ] Drag-and-drop works smoothly
- [ ] Fit scores calculate for investor deals
- [ ] Tasks generate on stage change
- [ ] Stagnation alerts trigger at 14 days
- [ ] Deal detail page shows full history
- [ ] Pipeline analytics calculate correctly
- [ ] Mobile view uses tabs instead of columns

### Performance
- [ ] Pipeline loads <2 seconds (50 deals)
- [ ] Drag-and-drop no lag
- [ ] Task generation <3 seconds
- [ ] Stagnation scan completes <1 minute (1000 deals)

### Quality
- [ ] 20%+ Research → Meeting conversion
- [ ] 80%+ task completion rate
- [ ] <10% deals stalled >14 days
- [ ] 90 day average Research → Committed

---

**Task Owner:** Design + Engineering Team  
**Review Cadence:** Daily standups  
**Target Completion:** Week 7 of Phase 2  

---

**END OF TASK 06**
