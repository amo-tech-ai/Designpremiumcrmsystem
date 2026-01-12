# Task 03: Dashboard Home

**Status:** ⬜ Not Started  
**Priority:** P0 (Critical)  
**Screens:** 1 (Main Dashboard)  
**Prompts:** 3  
**Agents:** All Agents (orchestration)  

---

## 📋 OVERVIEW

Main dashboard with 3-panel layout showing KPI cards, activity feed, AI insights, and next best action recommendations.

**User Journey:**
Login/Complete wizard → Dashboard home → View KPIs → Check insights → Take action

**Purpose:** Central command center showing business health and AI recommendations

---

## 🎯 PROMPTS

### ⬜ Prompt 3.1 — Dashboard Layout Structure

**Description:**  
Three-panel responsive layout with left content area, center cards, and right AI insights panel.

**Key Points:**
- Three-column layout on desktop (240px / flex-1 / 320px)
- Left sidebar navigation (shared component)
- Main content area with header and KPI cards
- Right panel for AI insights (sticky)
- Responsive collapse to single column on mobile
- Top banner for "Next Best Action" recommendation
- Quick action buttons in header
- Search bar with filters
- Date range selector
- Refresh button with loading state
- Profile completeness widget (if under 80%)

**Deliverables:**
- Dashboard layout component
- Three-panel grid structure
- Responsive breakpoints
- Header with actions
- Next Best Action banner
- Navigation integration

**Acceptance Criteria:**
- Three panels display correctly on desktop
- Collapses to single column on mobile
- Right panel sticky on scroll
- Banner shows AI recommendation
- Quick actions accessible
- Date range updates data
- Refresh reloads metrics
- Profile widget shows if incomplete

**Agents Used:** All (data aggregation)

**Status:** ⬜ Not Started

---

### ⬜ Prompt 3.2 — KPI Cards & Metrics Grid

**Description:**  
Grid of metric cards showing key business KPIs with trend indicators, charts, and drill-down capability.

**Key Points:**
- Four primary KPI cards in 2x2 grid
- Each card shows:
  - Metric name and icon
  - Large number (primary value)
  - Percentage change (up/down arrow)
  - Trend color (green positive, red negative)
  - Mini sparkline chart (7-day trend)
  - "View details" link
- Secondary metrics row (4-6 smaller cards)
- Hover effect shows tooltip with breakdown
- Click expands to modal with full chart
- Loading skeleton while data fetches
- Empty state if no data available
- Real-time updates (WebSocket optional)

**Primary KPIs:**
- Profile Completeness (percentage)
- Active Contacts (count with +/- change)
- Pipeline Value (dollar amount)
- Next Milestone (days until)

**Secondary Metrics:**
- Email Open Rate
- Meeting Conversion
- Avg Deal Size
- Win Rate
- Response Time
- Active Campaigns

**Deliverables:**
- KPI card component (reusable)
- Metrics grid layout
- Sparkline chart component
- Trend indicator logic
- Modal for detailed view
- Loading skeletons
- Empty states

**Acceptance Criteria:**
- Four primary KPIs display in grid
- Each shows value, trend, and chart
- Colors match positive/negative trends
- Sparklines render correctly
- Hover shows detailed tooltip
- Click opens full chart modal
- Loading shows skeleton
- Empty state handles no data
- Real-time updates work (if enabled)

**Agents Used:** 
- Analyst Agent (calculations)
- Scorer Agent (rankings)

**Status:** ⬜ Not Started

---

### ⬜ Prompt 3.3 — AI Insights Panel

**Description:**  
Right sidebar panel showing AI-generated insights, recommendations, and alerts with priority sorting.

**Key Points:**
- Fixed 320px width panel (sticky)
- Panel header: "AI Insights" with refresh icon
- Three tabs:
  - Recommendations (default)
  - Alerts (red badge if any)
  - Activity (recent changes)
- Recommendation cards show:
  - Priority badge (High/Medium/Low)
  - Action title (clear, actionable)
  - Description (1-2 sentences)
  - CTA button ("Do this now")
  - Dismiss option (X icon)
  - Confidence score (optional)
- Alert cards show:
  - Warning/error icon
  - Issue description
  - Suggested fix
  - "Fix now" or "Dismiss" buttons
- Activity feed shows:
  - Timestamp (relative: "2 hours ago")
  - Action description
  - Avatar/icon
  - Read/unread indicator
- Maximum 5 items per tab (scroll if more)
- Load more button at bottom
- Empty state if no insights

**Recommendation Examples:**
- "Complete your profile (73% done)"
- "Reach out to 3 warm leads today"
- "Update your TAM data (6 months old)"
- "Schedule follow-up with Sarah Chen"

**Alert Examples:**
- "Pipeline stalled: 2 deals inactive 30+ days"
- "Email bounce rate above 5%"
- "Missing founder LinkedIn profiles"

**Deliverables:**
- AI insights panel component
- Three-tab interface
- Recommendation card component
- Alert card component
- Activity feed component
- Empty states per tab
- Load more pagination
- Dismiss functionality

**Acceptance Criteria:**
- Panel sticky on right side
- Tabs switch smoothly
- Recommendations sorted by priority
- Alerts show red badge count
- Activity shows recent actions
- CTA buttons trigger actions
- Dismiss removes items
- Load more fetches next page
- Empty states display correctly
- Panel responsive on mobile (becomes bottom sheet)

**Agents Used:**
- All Agents (generate insights)
- Strategy Agent (recommendations)
- Analyst Agent (alerts)

**Status:** ⬜ Not Started

---

## 📊 TASK SUMMARY

**Total Prompts:** 3  
**Completed:** 0 (0%)  
**Agents Used:** 6 (All agents)  
**Components to Create:** ~8  
**Estimated Time:** 3 hours implementation  

---

## 🔗 IMPLEMENTATION

**Location:** `/components/dashboard-v2/`

**Planned Files:**
- DashboardHome.tsx (main layout)
- KPICard.tsx (metric cards)
- MetricsGrid.tsx (grid layout)
- AIInsightsPanel.tsx (right panel)
- RecommendationCard.tsx
- AlertCard.tsx
- ActivityFeedItem.tsx
- types.ts

**Dependencies:**
- Recharts (for sparklines)
- Motion/React (animations)
- Lucide icons
- Date-fns (date formatting)

---

## 🎨 DESIGN HIGHLIGHTS

**Layout:**
- Desktop: 240px sidebar + flex main + 320px panel
- Tablet: 240px sidebar + flex main (panel below)
- Mobile: Stacked (panel bottom sheet)

**Colors:**
- KPI cards: White with subtle shadow
- Positive trend: Green 500
- Negative trend: Red 500
- Panel background: Gray 50
- Recommendations: Blue accent
- Alerts: Red/Orange accent

**Typography:**
- KPI numbers: 3xl font, bold
- Metric names: sm font, medium
- Trends: xs font with arrow
- Insights: base font, regular

**Spacing:**
- Grid gap: 24px (gap-6)
- Card padding: 24px (p-6)
- Panel padding: 20px (p-5)
- Section spacing: 32px (space-y-8)

---

## 🎯 USER INTERACTIONS

**On Load:**
1. Fetch all KPI data (parallel)
2. Show loading skeletons
3. Populate cards as data arrives
4. Generate AI insights (background)
5. Display insights when ready

**User Actions:**
- Click KPI card → Open detailed modal
- Click "Next Best Action" → Navigate to task
- Click recommendation CTA → Execute action
- Dismiss alert → Remove from list
- Refresh insights → Re-generate from agents
- Change date range → Update all metrics

**Real-time Updates (Optional):**
- WebSocket connection for live data
- Pulse animation on value change
- Toast notification for new alerts

---

## 🔮 FUTURE ENHANCEMENTS

**Analytics:**
- Export dashboard as PDF
- Email daily digest
- Custom KPI selection
- Save dashboard layouts
- Team comparison view

**AI Features:**
- Predictive analytics
- Anomaly detection
- Natural language queries
- Voice commands
- Auto-actions based on thresholds

**Integrations:**
- Slack notifications
- Calendar sync
- Email client integration
- Mobile app sync

---

## 🎯 ACCEPTANCE CRITERIA SUMMARY

**Visual:**
- All panels display correctly
- Responsive on all screen sizes
- Smooth animations
- Loading states work
- Empty states handle no data

**Functional:**
- KPIs show accurate data
- Trends calculate correctly
- Insights refresh properly
- Actions trigger correctly
- Navigation works

**Performance:**
- Page loads under 1 second
- KPIs render under 500ms
- Insights generate under 2 seconds
- Smooth scroll performance
- No layout shift

---

## 🎯 DEPENDENCIES

**Blocked By:**
- Task 01 (need wizard completion data)
- Task 02 (need profile completeness)

**Blocks:**
- Task 04 (profile uses same layout)
- Task 05 (contacts inherit navigation)
- Task 07 (pipeline shows in KPIs)

---

## 🎯 NEXT TASK

**Task 02:** Startup Profile → Complete  
**Task 04:** User Profile → Next in queue

---

**Priority:** P0 (Must have)  
**Estimated Hours:** 3 hours  
**Complexity:** Medium-High  

---

**END OF TASK 03**
