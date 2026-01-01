# TASK 03: Dashboard — Command Center

**Priority:** 3 (After Wizard + Profile)  
**Est. Days:** 7 days  
**Route:** /app/dashboard  
**Type:** Dashboard  
**Dependencies:** Wizard, Startup Profile (data sources)  

---

## SUMMARY MATRIX

| Screen | Features | Agents | Gemini Model | Status | Progress |
|--------|----------|--------|--------------|--------|----------|
| Dashboard | 4 Advanced | 4 | Pro + Flash | 🔴 Not Started | 0% |

### Features Breakdown

| Feature | Type | Agent | Model | Approval Gate |
|---------|------|-------|-------|---------------|
| Next Best Action | Advanced | Planner | Pro | Controller + 3sec preview |
| Health Score | Advanced | Scorer + Analyst | Pro | Controller validates |
| AI Insights | Advanced | Analyst | Pro | Controller validates |
| Activity Feed | Advanced | Ops Automation | Flash | Auto-approved |

### Implementation Progress

| Step | Task | Est. Hours | Status | Dependencies |
|------|------|------------|--------|--------------|
| 1 | Design 3-panel layout | 12h | ⬜ | None |
| 2 | Build KPI cards | 8h | ⬜ | Step 1 |
| 3 | Implement Next Best Action | 10h | ⬜ | Step 1 |
| 4 | Build Health Score calculator | 8h | ⬜ | Step 2 |
| 5 | Create AI Insights panel | 10h | ⬜ | Steps 2-3 |
| 6 | Add Activity Feed | 6h | ⬜ | Step 1 |
| 7 | Real-time updates (WebSocket) | 6h | ⬜ | Step 6 |
| 8 | Testing + QA | 8h | ⬜ | All above |
| **Total** | **8 tasks** | **68h** | **0/8** | — |

---

## DESCRIPTION

Daily command center showing startup health, next actions, key metrics, and AI-generated insights. Primary landing page after login.

---

## PURPOSE

Give founders a clear snapshot of their startup in <10 seconds. Surface most important action to take today. Track progress toward goals.

---

## GOALS

1. **Clarity:** Users understand status in <10 seconds
2. **Action:** 70%+ take Next Best Action within 24 hours
3. **Engagement:** 80%+ visit dashboard daily
4. **Value:** AI insights actionable (80%+ approval)
5. **Performance:** Dashboard loads <2 seconds

---

## 3-PANEL LAYOUT LOGIC

### Core Model: **Context + Work + Intelligence**

**Left Panel = Context (240px)**
- Navigation menu
- Workspace switcher (if multi-startup)
- Quick actions

**Main Panel = Work (900px)**
- Next Best Action banner (full-width)
- 4 KPI cards (2×2 grid)
- Active Projects (3 most urgent)
- Activity Feed

**Right Panel = Intelligence (360px)**
- AI Insights (2-4 recommendations)
- Expand for details
- Take action buttons

**Layout:**
```
┌────────┬──────────────────────────────────┬──────────┐
│ Nav    │ Next Best Action                 │ AI       │
│        │ [Follow up with Sequoia...]      │ Insights │
│ • Home │──────────────────────────────────│          │
│ • Proj │ ┌───────┐ ┌───────┐ ┌───────┐   │ 💡 MRR   │
│ • Pipe │ │ MRR   │ │ Users │ │ Runway│   │ growing  │
│ • Cont │ │$12.5K │ │  847  │ │8 mo  │   │ 15% MoM  │
│ • GTM  │ └───────┘ └───────┘ └───────┘   │ [Expand] │
│ • Disc │ ┌───────┐                        │          │
│        │ │Health │ Active Projects (3)    │ ⚠️ Runway│
│ Quick  │ │ 73%   │ • Series A Fundraise   │ <3 mo    │
│ Action │ └───────┘ • Product Launch       │ [Action] │
│ + New  │           • Hiring Plan          │          │
│   Deal │ Activity Feed                    │ 🎯 Next  │
│ + Add  │ • Deal moved (2h ago)            │ milestone│
│   Task │ • Contact added (5h ago)         │ in sight │
└────────┴──────────────────────────────────┴──────────┘
```

**Desktop:** 1440px (240 + 900 + 360)  
**Tablet:** Collapse right panel to floating button  
**Mobile:** Bottom nav, full-width main, floating AI button  

---

## CONTENT & DATA

### Next Best Action Data
```
NextAction:
  title: text (e.g., "Follow up with Sequoia Capital")
  reasoning: text (e.g., "No response in 7 days. Send follow-up email.")
  action_type: text (send_email, update_deck, schedule_meeting)
  cta_text: text (e.g., "Draft Email")
  cta_link: text (e.g., /app/pipeline/deals/123)
  confidence: decimal (0-1, e.g., 0.87)
```

### KPI Cards Data
```
KPIs:
  mrr:
    value: decimal (e.g., 12500)
    change: decimal (e.g., +15% vs last month)
    trend: text (up/down/flat)
  
  active_users:
    value: integer (e.g., 847)
    change: decimal (e.g., +22%)
    trend: text
  
  runway:
    value: decimal (e.g., 8.2 months)
    alert: boolean (true if <3 months)
    trend: text
  
  health_score:
    value: decimal (0-100, e.g., 73)
    breakdown:
      - profile: 20% (weighted)
      - traction: 30%
      - financial: 30%
      - fundraising: 20%
```

### AI Insights Data
```
Insights:
  - id: uuid
    type: text (positive, warning, recommendation)
    title: text (e.g., "MRR growing above average")
    description: text (full explanation)
    action_cta: text (e.g., "Update investors")
    action_link: text (e.g., /app/contacts?filter=investors)
```

---

## USE CASES (3 REAL-WORLD EXAMPLES)

### Use Case 1: Morning Check-in

**Persona:** Sarah, CEO, checks dashboard every morning at 9am

**Scenario:**
- Logs in, dashboard loads (1.2 seconds)
- Sees Next Best Action: "Follow up with Sequoia Capital - No response in 7 days"
- Clicks "Draft Email" → AI generates follow-up → She edits, sends (3 minutes)
- Reviews KPI cards: MRR $12.5K (+15% 🟢), Users 847 (+22% 🟢), Runway 8.2 mo (stable), Health 73/100
- Sees AI Insight: "MRR growing 15% MoM, above industry average (10%). You're in top 25% for growth. Update investors with this milestone."
- Clicks "Update Investors" → Opens Contacts filtered to investors → Drafts update email
- Checks Activity Feed: Mike added 3 new contacts, Lisa moved Acme deal to "Meeting" stage
- Feels informed and motivated, closes dashboard (total time: 5 minutes)

**Time:** 5 minutes  
**Value:** Knows status, took most important action, motivated

---

### Use Case 2: Critical Runway Alert

**Persona:** Mike, CTO, burns through cash faster than expected

**Scenario:**
- Opens dashboard, sees red banner: "🚨 Critical: Runway 2.8 months. Take action now."
- Health Score dropped from 73 to 45 (red)
- Next Best Action: "Update burn rate projection and notify investors immediately"
- Clicks "View Details" on Runway card → See

s breakdown:
  - Cash: $294K
  - Monthly burn: $105K
  - Runway: 2.8 months
  - Alert threshold: <3 months
- AI Insight (warning): "Reduce burn by $30K/mo OR close $500K in next 45 days to reach 6-month runway safety."
- Clicks "Create Action Plan" → AI suggests:
  1. Defer 2 hires (saves $20K/mo)
  2. Negotiate vendor discounts (saves $5K/mo)
  3. Accelerate 3 top pipeline deals
- He approves plan, assigns tasks to team
- Sends urgent investor update
- Dashboard updates: Health Score 52 (yellow), Next Action: "Close Stripe deal this week"

**Time:** 20 minutes  
**Value:** Prevented crisis, took urgent action, team aligned

---

### Use Case 3: Milestone Celebration

**Persona:** TechFlow team, just hit $10K MRR milestone

**Scenario:**
- Sarah updates MRR from $9.8K to $10.2K
- Dashboard refreshes with confetti animation 🎉
- Banner appears: "Milestone reached: $10K MRR!"
- Health Score jumps from 68 to 81 (green)
- Next Best Action: "Share this milestone on LinkedIn to attract investors"
- AI Insight: "Congratulations! You're now in top 15% of startups for MRR. Key stats to share: $10K MRR, 52 customers, $192 ARPU, 22% MoM growth."
- Clicks "Draft LinkedIn Post" → AI generates post with stats
- Team reviews, edits, Sarah posts
- 15 investors like/comment within 24 hours
- 3 new inbound investor intros

**Time:** 10 minutes  
**Value:** Celebrated win, leveraged for fundraising, motivated team

---

## WORKFLOWS & USER JOURNEYS

### Main User Journey
```
Login → Dashboard loads → Review Next Action → Check KPIs → Read Insights → Click action OR navigate to work screen
```

### Workflow 1: Next Best Action Generation
```
Dashboard loads
  ↓
Planner: Analyze startup state
  - Check last user activity (when last logged in)
  - Check incomplete workflows (wizard, deals, tasks)
  - Check pipeline (stalled deals, urgent follow-ups)
  - Check traction (metrics needing update)
  ↓
Planner: Prioritize actions
  - Urgency score (deadline approaching)
  - Impact score (closes deal, unlocks funding)
  - Ease score (quick win vs long task)
  - Calculate: priority = urgency × impact / ease
  ↓
Planner: Generate top action
  - Title: "Follow up with Sequoia"
  - Reasoning: "No response 7 days, high fit score"
  - CTA: "Draft Email"
  ↓
Controller: Validate action (3-second preview)
  ↓
Display banner at top of dashboard
  ↓
User clicks CTA → Navigate to relevant screen
```

**Approval Gate:** Controller validates logic, 3-second preview (auto-approve if no user action)

---

### Workflow 2: Health Score Calculation
```
Dashboard loads
  ↓
Scorer: Gather data
  - Profile completeness (0-100%)
  - Traction metrics (users, MRR, growth)
  - Financial health (runway, burn, cash)
  - Fundraising progress (pipeline, meetings, commits)
  ↓
Scorer: Calculate weighted score
  health = (
    profile_completeness × 0.20 +
    traction_score × 0.30 +
    financial_score × 0.30 +
    fundraising_score × 0.20
  )
  ↓
Analyst: Validate score (sanity check)
  ↓
Controller: Approve display
  ↓
Display in KPI card with breakdown tooltip
  ↓
Color-code: <50 red, 50-70 yellow, 70+ green
```

**Approval Gate:** Controller validates calculation

---

## AI AGENTS & AUTOMATIONS

### Agents Used

| Agent | Role | Model | Tools |
|-------|------|-------|-------|
| **Planner** | Generate Next Best Action | Pro | Gemini Thinking, Structured outputs |
| **Scorer** | Calculate Health Score | Pro | Code execution |
| **Analyst** | Generate insights, detect trends | Pro | Gemini Thinking, Grounding with Search |
| **Ops Automation** | Real-time activity feed | Flash | Interactions API |
| **Controller** | Approval gate for all AI | Pro | Function calling |

### Automations

| Trigger | Action | Frequency |
|---------|--------|-----------|
| User logs in | Generate Next Best Action | Every login |
| Dashboard loads | Calculate Health Score | Real-time |
| Metric changes | Recalculate KPIs | Real-time |
| Health drops >10 pts | Send alert email | Immediately |
| Daily 8am | Send dashboard digest email | Daily |

---

## GEMINI 3 FEATURES & TOOLS

### Model Selection

**Pro (3 use cases):**
- Next Best Action (deep reasoning)
- Health Score (complex calculation)
- AI Insights (strategic analysis)

**Flash (1 use case):**
- Activity Feed (lightweight updates)

### Tools Used

| Tool | Use Case |
|------|----------|
| **Gemini Thinking** | Prioritize actions, analyze health |
| **Code Execution** | Calculate health score formula |
| **Structured Outputs** | Format Next Action, Insights |
| **Grounding with Search** | Benchmark data for insights |
| **Interactions API** | Real-time activity feed |

---

## MULTI-STEP DESIGN PROMPTS

### Prompt 1: 3-Panel Dashboard Layout
```
Design a startup dashboard with 3-panel layout at 1440px width.
Requirements:
- Left sidebar (240px): Nav menu with icons + text, active state highlighted
- Main content (900px): Next Best Action banner (full-width), 4 KPI cards (2×2 grid), Active Projects list, Activity feed
- Right sidebar (360px): AI Insights panel with 2-4 insights, expand/collapse details
- Next Best Action banner: Gradient background (blue to purple), icon, title, reasoning text, CTA button, dismiss X
- KPI cards: Large number, label, trend indicator (+15% with up arrow), small chart
- Health Score card: Circular progress (73%), color-coded (green), tooltip shows breakdown
- Active Projects: 3 cards with progress bars
- Activity Feed: Timeline with avatars, actions, timestamps
- AI Insights: Icon per type (💡 positive, ⚠️ warning, 🎯 recommendation), title, expand arrow

Visual style: Clean, modern, data-driven, white background, pastel accents
Responsive: Tablet collapses right panel, mobile goes single-column with bottom nav
```

### Prompt 2: Next Best Action Banner
```
Design prominent "Next Best Action" banner for top of dashboard.
Requirements:
- Full-width across main content area
- Gradient background: Blue (#6366F1) to purple (#8B5CF6)
- White text for contrast
- Layout: [Icon] [Content] [CTA Button] [Dismiss X]
- Icon: Lightbulb or target (48px, left side)
- Content: 
  - Title (bold, 20px): "Follow up with Sequoia Capital"
  - Reasoning (regular, 14px): "No response in 7 days. AI suggests sending follow-up email."
- CTA Button: "Draft Email" (white background, blue text, hover effect)
- Dismiss X: Top-right corner, shows "Suggest different action" on click
- Subtle pulsing animation to draw attention

Visual style: Striking but not overwhelming, actionable, clear hierarchy
Show confidence score in small text (87% confident)
```

### Prompt 3: Health Score Card
```
Design Health Score KPI card with circular progress visualization.
Requirements:
- Card size: 280px wide, 200px tall
- Circular progress bar: 150px diameter, centered
- Progress fill: Color-coded (Red <50, Yellow 50-70, Green 70+)
- Score number inside circle: Large (48px), bold, with "/100"
- Label above: "Startup Health Score"
- Trend indicator below: Up/down arrow with change (e.g., "+5 vs last week")
- Tooltip on hover: Breakdown of score
  - Profile: 20% (18/20 points)
  - Traction: 30% (25/30 points)
  - Financial: 30% (22/30 points)
  - Fundraising: 20% (8/20 points)
- Click card to open detail modal with full breakdown
- Subtle shadow and hover effect

Visual style: Clean, minimal, trustworthy, data visualization
Show example at 73/100 (green gradient)
```

---

## ACCEPTANCE CRITERIA

### Functional
- [ ] Dashboard loads all components
- [ ] Next Best Action generates correctly
- [ ] Health Score calculates accurately
- [ ] KPI cards display metrics
- [ ] AI Insights show 2-4 recommendations
- [ ] Activity Feed updates real-time
- [ ] All CTAs navigate correctly
- [ ] Responsive on mobile/tablet

### Performance
- [ ] Dashboard loads <2 seconds
- [ ] Health Score calculates <500ms
- [ ] Real-time updates <1 second delay
- [ ] No layout shift during load

### Quality
- [ ] 80%+ users visit daily
- [ ] 70%+ take Next Best Action
- [ ] 85%+ approve AI insights
- [ ] <2% error rate

---

**Task Owner:** Design + Engineering Team  
**Review Cadence:** Daily standups  
**Target Completion:** Week 4 of Phase 1  

---

**END OF TASK 03**
