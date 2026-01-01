# Dashboard & Wizard Changes — AI Integration & Implementation Plan

**Version:** 1.0  
**Last Updated:** December 31, 2025  
**Document Type:** Implementation Roadmap & Enhancement Specification  
**Purpose:** List all suggested changes, features, and multi-step design prompts for each screen  

---

## 📊 IMPLEMENTATION PROGRESS TRACKER

### Summary Metrics

| Metric | Current | Target | Status |
|--------|---------|--------|--------|
| **Screens Designed** | 0/13 | 13/13 | 🔴 Not Started |
| **AI Agents Integrated** | 0/10 | 10/10 | 🔴 Not Started |
| **Features Implemented** | 0/40 | 40/40 | 🔴 Not Started |
| **Workflows Automated** | 0/15 | 15/15 | 🔴 Not Started |
| **Approval Gates** | 0/14 | 14/14 | 🔴 Not Started |

---

### Implementation Order & Status

| Priority | Screen | Type | Features | Agents | Est. Days | Status | Dependencies |
|----------|--------|------|----------|--------|-----------|--------|--------------|
| **1** | Wizard | Wizard | 4 | 4 | 10 | 🔴 Not Started | None (foundation) |
| **2** | Startup Profile | Dashboard | 3 | 3 | 5 | 🔴 Not Started | Wizard data |
| **3** | Dashboard | Dashboard | 4 | 4 | 7 | 🔴 Not Started | Profile data |
| **4** | User Profile | Dashboard | 0 | 0 | 2 | 🔴 Not Started | None (manual) |
| **5** | Contacts | Dashboard | 3 | 3 | 6 | 🔴 Not Started | Profile data |
| **6** | Pipeline | Dashboard | 3 | 3 | 8 | 🔴 Not Started | Contacts data |
| **7** | Company Profile | Dashboard | 3 | 3 | 5 | 🔴 Not Started | Contacts/Pipeline |
| **8** | Projects | Dashboard | 3 | 3 | 6 | 🔴 Not Started | Profile data |
| **9** | Event Wizard | Wizard | 3 | 3 | 5 | 🔴 Not Started | Projects data |
| **10** | Discovery | Chatbot | 3 | 3 | 7 | 🔴 Not Started | Profile data |
| **11** | GTM | Dashboard | 3 | 3 | 6 | 🔴 Not Started | Discovery data |
| **12** | Lean Canvas | Wizard | 3 | 3 | 5 | 🔴 Not Started | Profile data |
| **13** | AI Chat | Chatbot | 3 | 3 | 4 | 🔴 Not Started | All screens (universal) |
| **Total** | — | — | **40** | **10** | **76 days** | **0% Complete** | — |

---

### Feature Categories

| Category | Features | Core | Advanced | Screens |
|----------|----------|------|----------|---------|
| **Enrichment** | LinkedIn scraping, auto-fill | 0 | 8 | Wizard, Contacts, Profile |
| **Scoring** | Health, Fit, Lead scores | 0 | 7 | Dashboard, Pipeline, Contacts |
| **Generation** | Decks, timelines, plans | 0 | 8 | Wizard, Event Wizard, GTM |
| **Analysis** | Insights, trends, risks | 0 | 9 | Dashboard, Projects, Lean Canvas |
| **Automation** | Tasks, alerts, reminders | 0 | 5 | Pipeline, Projects, Events |
| **Research** | TAM, competitors, investors | 0 | 3 | Discovery, GTM |
| **Validation** | Input checks, warnings | 0 | 3 | Wizard, Profile, Lean Canvas |

---

## 🎯 SCREEN-BY-SCREEN CHANGES & DESIGN PROMPTS

---

### SCREEN 1: WIZARD (Startup Profile Onboarding)

**Route:** /app/wizard/startup-profile  
**Type:** Wizard (6 steps)  
**Priority:** 1 (Build First)  
**Est. Days:** 10 days  

#### Current State
- Brief overview in 06-wizard.md
- Missing: Detailed UI layouts, step-by-step screens, validation rules

#### Suggested Changes

**1. Add Step-by-Step Screen Designs**
- Step 1: Business Basics (problem, solution, one-liner)
- Step 2: Market Context (industry, target customer, competitors)
- Step 3: Team (founders with LinkedIn enrichment)
- Step 4: Traction (users, MRR, customers)
- Step 5: Fundraising (goal, stage, timeline)
- Step 6: Review & Generate (preview + pitch deck generation)

**2. Add LinkedIn Enrichment Flow**
- Paste URL → Scrape → Preview → Approve → Auto-fill
- Visual preview modal with edit capabilities
- Progress indicator during scraping

**3. Add TAM/SAM/SOM Calculator**
- Industry dropdown → Target market → Pricing
- AI calculates market size with sources
- Display calculation breakdown + citations

**4. Add Real-time Validation**
- Character limits with counters
- Clarity suggestions (e.g., "Make one-liner more specific")
- Required field indicators

**5. Add Progress Saving**
- Auto-save every 30 seconds
- "Save & Continue Later" button
- Resume wizard from any step

#### Features: Core vs Advanced

**Core Features (Manual Input):**
- 6-step form with text fields
- Character counters
- Required field validation
- Save draft functionality
- Navigate between steps

**Advanced Features (AI-Assisted):**
- LinkedIn enrichment (Retriever + Extractor)
- TAM/SAM/SOM calculation (Analyst + Retriever)
- Input validation suggestions (Extractor)
- Auto-generate pitch deck (Orchestrator + Content/Comms)

#### Use Cases (3 Real-World Examples)

**Use Case 1: Solo Founder with LinkedIn**
Sarah, a solo founder, signs up. She pastes her LinkedIn URL in Step 3. AI scrapes her profile, extracts name, title, education, experience. She reviews, clicks "Looks good," and continues. Saves 5 minutes of manual entry.

**Use Case 2: Team of 3 Co-founders**
TechFlow team completes wizard together. They paste 3 LinkedIn URLs for co-founders. AI enriches all 3, extracts roles. In Step 2, AI calculates TAM ($28B) by searching "project management market size." Team reviews sources, approves. Completes wizard in 12 minutes instead of 45.

**Use Case 3: Non-technical Founder**
Mike doesn't have exact market size data. In Step 2, he selects industry "B2B SaaS" and describes target "remote startups 10-50 employees." AI calculates TAM/SAM/SOM based on industry reports. Mike reviews, learns about market opportunity, proceeds confidently.

#### Workflows & User Journey

**User Journey:**
Sign up → Email verification → Wizard Step 1 → Complete 6 steps (10-15 min) → Review screen → Approve → Profile created + Deck generated → Dashboard

**Workflow: LinkedIn Enrichment**
User pastes URL → Retriever scrapes LinkedIn → Extractor parses data → Controller validates → Display preview modal → Human approves → Auto-fill fields

**Workflow: TAM Calculation**
User selects industry → Analyst queries market data → Retriever searches reports → Calculate TAM/SAM/SOM → Controller validates sources → Display with citations → Human reviews → Save to profile

#### AI Agents & Automations

**Agents Used:**
- Orchestrator (coordinate 6-step flow)
- Retriever (LinkedIn scraping, market data)
- Extractor (parse structured data from text)
- Analyst (calculate TAM/SAM/SOM)
- Controller (validate all AI outputs)

**Automations:**
- Auto-save draft every 30 seconds
- Generate pitch deck on wizard completion
- Send welcome email with dashboard link
- Calculate profile completeness score

#### Gemini 3 Features & Tools

**Models:**
- Flash (LinkedIn enrichment, extraction)
- Pro (TAM calculation, deck generation)

**Tools:**
- URL Context tool (scrape LinkedIn)
- Structured outputs (enforce data schema)
- Grounding with Google Search (market data)
- Text generation (deck slides)
- Function calling (orchestrate steps)

#### Multi-Step Design Prompt

**Prompt 1: Overall Wizard Structure**
Design a 6-step onboarding wizard for a startup operating system. Each step should be a full-screen form with: (1) Progress bar at top showing 1/6, 2/6, etc. (2) Step title and description. (3) Form fields with labels and placeholders. (4) Back and Continue buttons at bottom. (5) Save Draft link. Use clean, minimal design with pastel accents (blue, purple, pink). Mobile-responsive with single-column layout on mobile, two-column on desktop.

**Prompt 2: Step 3 - LinkedIn Enrichment**
Design the Team step with LinkedIn enrichment. Show: (1) "Add Co-founder" button that opens modal. (2) Modal with two tabs: "LinkedIn URL" and "Manual Entry." (3) LinkedIn tab has input field "Paste LinkedIn URL" with Enrich button. (4) After clicking Enrich, show loading spinner for 2 seconds. (5) Display preview card with avatar, name, title, company, education. (6) Edit and Approve buttons. (7) On approve, close modal and add founder card to main screen. Use glassmorphism for modal background.

**Prompt 3: Step 6 - Review & Generate**
Design the final review screen showing: (1) All entered data in expandable sections (Business, Market, Team, Traction, Fundraising). (2) Edit button for each section that jumps back to that step. (3) Large "Generate Pitch Deck" button at bottom. (4) After clicking, show progress modal with animated checkmarks: "Analyzing profile... ✓ Generating slides... ✓ Adding charts... ✓ Complete!" (5) Display "View Deck" and "Go to Dashboard" buttons. Use celebration confetti animation on completion.

---

### SCREEN 2: DASHBOARD (Command Center)

**Route:** /app/dashboard  
**Type:** Dashboard  
**Priority:** 3 (After Wizard + Profile)  
**Est. Days:** 7 days  

#### Current State
- Good overview in 01-dashboard.md
- Missing: Exact component layouts, responsive breakpoints, empty states

#### Suggested Changes

**1. Add 3-Panel Responsive Layout**
- Desktop: Left sidebar (nav), Main content (3 columns), Right panel (AI chat)
- Tablet: Collapsed sidebar, Main content (2 columns), Hidden right panel
- Mobile: Bottom nav, Main content (1 column), Floating chat button

**2. Add Next Best Action Banner Design**
- Prominent top banner with gradient background
- Action title + reasoning + CTA button
- Dismiss functionality with "Suggest different action"

**3. Add Empty States**
- No traction data: "Add your first metric"
- No deals in pipeline: "Start tracking investors"
- No projects: "Create your first project"

**4. Add Real-time Updates**
- Live activity feed with WebSocket
- Toast notifications for important events
- Pulse animation on new activities

**5. Add AI Insights Panel Refinement**
- 2-4 insights with icons
- Expand/collapse details
- "Take Action" button per insight
- Sources citations in tooltip

#### Features: Core vs Advanced

**Core Features (No AI):**
- Static KPI cards (MRR, Users, Runway, manually calculated)
- Manual project list
- Manual activity log
- Static charts

**Advanced Features (AI-Powered):**
- Next Best Action recommendation (Planner)
- Health Score calculation (Scorer + Analyst)
- AI-generated insights (Analyst)
- Trend detection with predictions (Analyst)

#### Use Cases (3 Real-World Examples)

**Use Case 1: Morning Check-in**
Sarah opens dashboard at 9am. Sees Next Best Action: "Follow up with Sequoia - no response in 7 days." Clicks "Draft Email" → AI generates follow-up → She edits, sends. Health score is 73/100. Insight says "MRR growing 15% MoM, above average." Feels motivated.

**Use Case 2: Runway Alert**
Mike's startup has 2.8 months runway. Dashboard shows red Health Score (45/100). AI Insight: "Critical: Runway <3 months. Reduce burn by $15K/mo OR close $500K in 45 days." Next Best Action: "Update investors with urgency." He clicks, sends update, schedules 5 calls.

**Use Case 3: Milestone Celebration**
TechFlow hits $10K MRR. Dashboard shows confetti animation. Health Score jumps to 81/100. Next Best Action: "Share milestone on LinkedIn to attract investors." Insight: "You're in top 25% of startups for MRR growth." Team celebrates.

#### Workflows & User Journey

**User Journey:**
Login → Dashboard loads → View KPIs → Read Next Action → Expand insights → Click action CTA → Complete task → Return to dashboard

**Workflow: Next Best Action**
Dashboard loads → Planner analyzes state (last activity, incomplete tasks, pipeline) → Generate action → Controller validates → Display banner → User clicks CTA → Navigate to relevant screen

**Workflow: Health Score**
Dashboard loads → Scorer calculates (profile 20% + traction 30% + financial 30% + fundraising 20%) → Analyst validates logic → Controller approves → Display score with breakdown tooltip

#### AI Agents & Automations

**Agents Used:**
- Planner (Next Best Action)
- Scorer (Health Score)
- Analyst (Insights, trends)
- Ops Automation (Activity feed)
- Controller (Validate all AI)

**Automations:**
- Recalculate health score on any profile update
- Generate daily Next Best Action at midnight
- Send weekly dashboard digest email
- Alert when health score drops >10 points

#### Gemini 3 Features & Tools

**Models:**
- Pro (Next Action reasoning, insights)
- Flash (Activity feed formatting)

**Tools:**
- Gemini Thinking (reason about priorities)
- Structured outputs (action format)
- Code execution (health score calculation)
- Grounding with Search (benchmark data)

#### Multi-Step Design Prompt

**Prompt 1: Dashboard Layout**
Design a startup dashboard with 3-panel layout. Left: Sidebar with nav (Dashboard, Projects, Pipeline, Contacts, etc.) and logo at top. Center: Main content area with (1) Next Best Action banner at top, (2) 4 KPI cards in row, (3) Active Projects section, (4) AI Insights panel, (5) Activity feed. Right: AI Chat panel (collapsible). Use white background, pastel accent colors (blue for positive, red for alerts), glassmorphism cards. Desktop 1440px, responsive down to 375px mobile.

**Prompt 2: Next Best Action Banner**
Design a prominent banner for "Next Best Action" recommendation. Show: (1) Gradient background (blue to purple). (2) Icon on left (lightbulb or target). (3) Title in bold: "Follow up with Sequoia Capital." (4) Reasoning text below: "No response in 7 days. AI suggests sending follow-up email." (5) CTA button "Draft Email" on right. (6) Dismiss X button in top-right corner. (7) Hover effect on button. Make it visually striking but not overwhelming.

**Prompt 3: Health Score Card**
Design a KPI card for "Startup Health Score." Show: (1) Large number 73/100 in center. (2) Circular progress bar around number. (3) Label "Health Score" at top. (4) Color: Green if >70, Yellow 50-70, Red <50. (5) Small trend arrow (up/down) showing change from last week. (6) Tooltip on hover showing breakdown: Profile 20%, Traction 30%, Financial 30%, Fundraising 20%. (7) Click opens detail modal with full breakdown.

---

### SCREEN 3: STARTUP PROFILE

**Route:** /app/profile  
**Type:** Dashboard  
**Priority:** 2 (After Wizard)  
**Est. Days:** 5 days  

#### Current State
- Comprehensive in 03-startup-profile.md
- Missing: Edit mode UI, completeness progress visualization

#### Suggested Changes

**1. Add Completeness Progress Tracker**
- Visual progress bar at top (0-100%)
- Section-level progress indicators
- Missing fields highlighted in orange
- "Quick Complete" suggestions

**2. Add Inline Editing**
- Click field to edit (no separate edit mode)
- Auto-save on blur
- Validation feedback inline
- Undo last change option

**3. Add Data Enrichment Suggestions**
- "AI can help" badges on empty fields
- Click badge to trigger enrichment
- Preview before accepting
- Sources shown for enriched data

**4. Add Profile Sharing**
- Generate public profile link
- Customizable visibility (public, investors only, private)
- Embed code for website
- Export to PDF

**5. Add Version History**
- Track changes to key fields
- Compare versions side-by-side
- Restore previous version
- Change log with timestamps

#### Features: Core vs Advanced

**Core Features:**
- Manual data entry
- View-only display
- Static completeness percentage
- Basic validation

**Advanced Features:**
- Completeness scoring with AI recommendations (Scorer)
- Data enrichment from web (Retriever)
- Validation warnings for inconsistencies (Analyst)
- Auto-calculate TAM/SAM/SOM (Analyst)

#### Use Cases (3 Real-World Examples)

**Use Case 1: Incomplete Profile Alert**
Sarah's profile is 45% complete. Dashboard shows "Complete your profile for better AI recommendations." She clicks, sees profile with orange badges on missing fields (TAM, competitors, team bios). She clicks "AI can help" on TAM → AI calculates $28B → She reviews sources → Approves. Completeness jumps to 58%.

**Use Case 2: Investor Preview**
Mike is meeting Sequoia tomorrow. He clicks "Share Profile" → Generates public link → Customizes visibility (hide financials) → Sends link to investor. Sequoia partner views clean, investor-grade profile with traction, team, problem/solution. Impressed by clarity.

**Use Case 3: Pivot Tracking**
TechFlow pivots from B2C to B2B. They update target customer, problem statement, pricing. Profile version changes from v3 to v4. Later, they click "Version History" → Compare v3 vs v4 side-by-side → See target changed from "consumers" to "remote startups." Helps track evolution.

#### Workflows & User Journey

**User Journey:**
Dashboard → Click "Profile" → View profile → Click field to edit → Auto-save → See completeness update → Continue editing OR navigate away

**Workflow: Data Enrichment**
User clicks "AI can help" on TAM field → Retriever searches market reports → Analyst calculates TAM/SAM/SOM → Controller validates sources → Display preview modal with citations → Human reviews → Approves → Save to profile → Completeness recalculated

**Workflow: Validation Warnings**
User enters MRR $50K, customers 2 → Analyst detects inconsistency (high ARPU $25K) → Controller flags → Display warning: "ARPU seems high ($25K). Is this correct?" → User clicks "Yes, enterprise customers" OR "Fix" → Dismiss OR edit

#### AI Agents & Automations

**Agents Used:**
- Scorer (Completeness calculation)
- Retriever (Market data enrichment)
- Analyst (Validation, inconsistency detection)
- Controller (Validate all changes)

**Automations:**
- Recalculate completeness on any field update
- Weekly reminder if completeness <60%
- Alert when key metrics change >20%
- Suggest updating profile after major milestones

#### Gemini 3 Features & Tools

**Models:**
- Flash (Completeness scoring)
- Pro (TAM calculation, validation)

**Tools:**
- Structured outputs (Enforce profile schema)
- Grounding with Search (Market data)
- Gemini Thinking (Detect inconsistencies)

#### Multi-Step Design Prompt

**Prompt 1: Profile Overview**
Design a startup profile page with sections: (1) Top banner with completeness progress bar "73% Complete" and "Complete Now" button. (2) Sections: Business Overview, Market & Traction, Team, Business Model, Fundraising. (3) Each section is collapsible card. (4) Fields show view mode by default, click to edit. (5) Orange "AI can help" badge on empty fields. (6) Auto-save indicator "Saving..." appears on edit. (7) Right sidebar shows "Quick Actions" (Export PDF, Share Profile, View History). Clean, organized layout.

**Prompt 2: Completeness Progress Tracker**
Design a progress tracker at top of profile showing completeness. Include: (1) Progress bar 0-100% with gradient (red to yellow to green). (2) Percentage number overlaid. (3) Breakdown tooltip on hover: Business 100%, Market 80%, Team 60%, Model 70%, Fundraising 40%. (4) "Missing 12 fields" text below. (5) "Quick Complete" button that opens modal with all missing fields in checklist format. (6) Celebrate with animation when reaching 100%.

**Prompt 3: Data Enrichment Modal**
Design modal for AI data enrichment. Show: (1) Title "AI Market Size Calculator." (2) Inputs: Industry dropdown, Target market description, Pricing. (3) "Calculate" button. (4) Loading state with progress: "Searching reports... Calculating TAM... Done!" (5) Results: TAM $28B, SAM $3.2B, SOM $120M with calculation breakdown. (6) Sources section with 5-10 citations (report name, year, link). (7) "Add to Profile" and "Cancel" buttons. Modern, trustworthy design.

---

### SCREEN 4: PIPELINE (Deal Tracking)

**Route:** /app/pipeline  
**Type:** Dashboard (Kanban)  
**Priority:** 6 (After Contacts)  
**Est. Days:** 8 days  

#### Current State
- Detailed in 08-pipeline.md
- Missing: Drag-and-drop interactions, stage transition animations

#### Suggested Changes

**1. Add Smooth Drag-and-Drop**
- Visual lift effect when dragging
- Drop zone highlights
- Snap-to-grid alignment
- Undo drag action

**2. Add Stage Transition Animations**
- Card flies to new column
- Stage counter updates with animation
- Confetti when deal reaches "Committed"
- Task generation modal appears

**3. Add Bulk Actions**
- Select multiple deals (checkboxes)
- Bulk move to stage
- Bulk tag/label
- Bulk export to CSV

**4. Add Filter & Search**
- Filter by score range (80-100, 60-80, etc.)
- Filter by last activity date
- Search by investor name
- Save custom filters

**5. Add Deal Health Indicators**
- Green: Active (activity <7 days)
- Yellow: Stale (7-14 days)
- Red: Stalled (14+ days)
- Visual indicator on card

#### Features: Core vs Advanced

**Core Features:**
- Manual kanban board
- Drag-and-drop deals
- Basic deal cards
- Manual task creation

**Advanced Features:**
- Fit scoring (Scorer)
- Stage-based task generation (Planner)
- Stagnation detection (Analyst + Ops Automation)
- Pipeline velocity metrics (Analyst)

#### Use Cases (3 Real-World Examples)

**Use Case 1: Moving Deal to Meeting**
Sarah drags Sequoia deal from "Outreach" to "Meeting." Card flies smoothly to new column. Modal appears: "AI suggests 4 tasks for Meeting stage: (1) Prepare pitch deck, (2) Schedule meeting, (3) Research attendees, (4) Draft agenda." She clicks "Approve All" → Tasks created and assigned to her. Deal card shows "4 pending tasks."

**Use Case 2: Stagnation Alert**
Mike hasn't updated Acme Ventures deal in 16 days. Card turns red with "Stalled" badge. Dashboard shows notification: "Deal with Acme Ventures stalled. Send follow-up?" He clicks "Draft Email" → AI generates follow-up → He edits, sends. Card activity updates, turns green.

**Use Case 3: Bulk Tagging**
TechFlow has 12 deals in "Research" stage. They select all 12 → Bulk action "Add Tag: West Coast VCs" → All tagged. Later, they filter by tag to prioritize West Coast investors for upcoming SF trip.

#### Workflows & User Journey

**User Journey:**
Open Pipeline → View 7-stage kanban → Drag deal to new stage → Review AI-generated tasks → Approve → Tasks created → Deal detail view → Add notes → Return to pipeline

**Workflow: Drag Deal to New Stage**
User drags card → Drop in new column → Ops Automation detects stage change → Planner generates tasks → Controller validates → Display task modal → Human approves → Create tasks → Update deal → Log activity

**Workflow: Stagnation Detection**
Daily cron job → Ops Automation scans deals → Detect last_activity >14 days → Analyst generates context → Controller validates → Send notification → User clicks "Send Follow-up" → Content/Comms drafts email → Human approves → Send

#### AI Agents & Automations

**Agents Used:**
- Scorer (Fit scoring)
- Planner (Task generation)
- Ops Automation (Stagnation alerts)
- Analyst (Pipeline velocity)
- Controller (Validate all actions)

**Automations:**
- Generate tasks on stage change
- Alert when deal stalled 14+ days
- Weekly pipeline velocity report
- Suggest prioritization based on fit scores

#### Gemini 3 Features & Tools

**Models:**
- Pro (Fit scoring)
- Flash (Task generation, alerts)

**Tools:**
- Gemini Thinking (Calculate fit scores)
- Function calling (Trigger automations)
- Structured outputs (Task lists)
- Interactions API (Send notifications)

#### Multi-Step Design Prompt

**Prompt 1: Kanban Board Layout**
Design a 7-column kanban board for deal pipeline. Columns: Research, Outreach, Meeting, Follow-up, Due Diligence, Committed, Closed. Each column has: (1) Header with stage name and count (e.g., "Meeting (5)"). (2) Scrollable area with deal cards. (3) Add deal button at bottom. (4) Deal cards show: Company logo, name, contact name, fit score badge, last activity timestamp. (5) Drag handles on cards. (6) Drop zones highlighted on drag. Desktop 1440px, horizontal scroll on tablet/mobile.

**Prompt 2: Deal Card Design**
Design a deal card for kanban board. Show: (1) Company logo (48px avatar) on left. (2) Company name in bold. (3) Contact name and role below in smaller text. (4) Fit score badge in top-right corner (87/100 with green background). (5) Last activity timestamp at bottom ("2 days ago"). (6) Health indicator dot (green/yellow/red) in bottom-left. (7) Hover effect shows shadow and "View Details" button. Card size 280px wide, auto height.

**Prompt 3: Task Generation Modal**
Design modal that appears after moving deal to new stage. Show: (1) Title "Deal moved to Meeting stage." (2) Subtitle "AI suggests 4 tasks." (3) Checklist of tasks with checkboxes (pre-checked): "Prepare pitch deck," "Schedule meeting," etc. (4) Each task has edit icon. (5) Buttons: "Approve All," "Edit Tasks," "Skip." (6) On approve, show success animation with checkmarks appearing one by one. Modern, clean modal design.

---

### SCREEN 5: CONTACTS (CRM)

**Route:** /app/contacts  
**Type:** Dashboard (Table/Grid)  
**Priority:** 5 (After Profile)  
**Est. Days:** 6 days  

#### Current State
- Detailed in 09-contacts.md
- Missing: Bulk import UI, contact merge functionality

#### Suggested Changes

**1. Add Bulk Import from CSV**
- Upload CSV file
- Map columns to fields
- Preview before import
- Duplicate detection

**2. Add Contact Merge**
- Detect duplicate contacts
- Show side-by-side comparison
- Select which fields to keep
- Merge history log

**3. Add Quick Add from Browser**
- Browser extension or bookmarklet
- Add contact from any LinkedIn page
- One-click save to CRM
- Background enrichment

**4. Add Contact Segmentation**
- Create custom lists (e.g., "West Coast VCs")
- Bulk actions per segment
- Export segments to CSV
- Segment-based email campaigns

**5. Add Relationship Strength Score**
- Calculate based on interaction frequency
- Visualization (cold, warm, hot)
- Suggest who to re-engage
- Track relationship over time

#### Features: Core vs Advanced

**Core Features:**
- Manual contact entry
- Table/grid view toggle
- Search by name
- Basic tags

**Advanced Features:**
- LinkedIn enrichment (Retriever + Extractor)
- Lead scoring for investors (Scorer)
- Mutual connection finder (Retriever)
- Duplicate detection (Analyst)

#### Use Cases (3 Real-World Examples)

**Use Case 1: LinkedIn Bulk Import**
Sarah has 20 LinkedIn URLs from a conference. She opens Contacts → Click "Add Contact" → Switches to "Bulk Import" tab → Pastes 20 URLs → AI enriches all 20 in parallel (30 seconds) → Shows preview grid with all 20 contacts → She clicks "Import All" → All 20 saved with fit scores calculated.

**Use Case 2: Duplicate Detection**
Mike manually adds "Sarah Johnson, Sequoia Capital." System detects existing contact "S. Johnson, Sequoia" → Modal appears: "Possible duplicate found. Merge or keep separate?" → Shows side-by-side comparison → He selects "Merge" → Keeps newer data, preserves activity history → One clean contact remains.

**Use Case 3: Re-engagement Suggestions**
TechFlow opens Contacts, sorted by "Relationship Strength." 15 contacts show "Cold" (no contact in 60+ days). AI suggests: "Re-engage with warm intro email." They select 5 high-fit investors → Bulk action "Draft Re-engagement Email" → AI generates personalized emails for each → They review, edit, send.

#### Workflows & User Journey

**User Journey:**
Open Contacts → Toggle to grid view → Click "Add Contact" → Paste LinkedIn URL → AI enriches → Preview → Edit tags → Save → Contact appears in list with fit score

**Workflow: LinkedIn Enrichment**
User pastes URL → Retriever scrapes LinkedIn → Extractor parses structured data → Scorer calculates fit score → Retriever finds mutual connections → Controller validates all → Display preview modal → Human reviews → Approves → Save contact

**Workflow: Duplicate Detection**
User adds contact → Analyst compares to existing contacts (name similarity, email, LinkedIn URL) → Detects match >80% confidence → Controller flags → Show merge modal → Human selects fields to keep → Merge contacts → Update references

#### AI Agents & Automations

**Agents Used:**
- Retriever (LinkedIn scraping)
- Extractor (Data parsing)
- Scorer (Fit scoring)
- Analyst (Duplicate detection)
- Controller (Validate all)

**Automations:**
- Auto-enrich new contacts from LinkedIn
- Weekly relationship strength update
- Alert when high-fit contact goes cold
- Suggest re-engagement for cold contacts

#### Gemini 3 Features & Tools

**Models:**
- Flash (LinkedIn enrichment, extraction)
- Pro (Fit scoring, duplicate detection)

**Tools:**
- URL Context (Scrape LinkedIn)
- Structured outputs (Contact schema)
- Gemini Thinking (Calculate fit scores)
- Grounding with Search (Mutual connections)

#### Multi-Step Design Prompt

**Prompt 1: Contacts List View**
Design a contacts list page with dual view modes (table and grid). Top bar has: (1) Search box on left, (2) Filter dropdown (All, Investors, Customers, Advisors), (3) Sort dropdown (Name, Score, Updated), (4) View toggle (table/grid icons), (5) "Add Contact" button. Table view shows columns: Avatar, Name, Company, Role, Score (with colored badge), Tags, Last Updated. Grid view shows cards (4 per row desktop, 2 mobile) with same info. Clean, modern design.

**Prompt 2: Add Contact Modal**
Design modal for adding new contact with two tabs: "LinkedIn URL" and "Manual Entry." LinkedIn tab shows: (1) Large input field "Paste LinkedIn URL here." (2) "Enrich" button below. (3) After clicking, loading spinner with text "Scraping profile... Calculating fit score... Finding mutual connections..." (4) Preview card appears with: Avatar, Name, Title @ Company, Fit Score badge, Bio snippet, Education, Mutual connections (2). (5) Edit button to modify any field. (6) "Add to CRM" button at bottom. Modern, trustworthy design.

**Prompt 3: Duplicate Detection Modal**
Design side-by-side comparison modal for duplicate contacts. Show: (1) Title "Duplicate contact detected." (2) Two columns with contact cards. (3) Fields: Name, Email, Company, Role, LinkedIn, Tags, Notes. (4) Radio buttons per field to select which value to keep. (5) "Smart Merge" button that auto-selects most complete data. (6) Buttons: "Merge Contacts" (primary), "Keep Separate" (secondary). Highlight differences in yellow.

---

### SCREEN 6: DISCOVERY (AI Research)

**Route:** /app/discovery  
**Type:** Chatbot  
**Priority:** 10 (Mid-implementation)  
**Est. Days:** 7 days  

#### Current State
- Detailed in 10-discovery.md
- Missing: Conversational UI patterns, source credibility indicators

#### Suggested Changes

**1. Add Conversational Interface**
- Chat-like Q&A flow
- Suggested follow-up questions
- Conversation history sidebar
- Export conversation to PDF

**2. Add Source Credibility Ratings**
- Star rating per source (1-5 stars)
- Credibility labels (High, Medium, Low)
- Publication date badges
- Methodology transparency

**3. Add Research Templates**
- Pre-built queries (TAM, Competitors, Investors)
- Industry-specific templates
- Quick start guide
- Example queries

**4. Add Competitive Intelligence Dashboard**
- Track 5-10 competitors
- Monitor funding rounds, product launches
- News alerts
- Feature comparison table

**5. Add Save & Organize Research**
- Save queries to folders
- Tag research topics
- Share with team
- Attach to pitch deck slides

#### Features: Core vs Advanced

**Core Features:**
- Search bar
- Display results
- Basic citations
- Save results

**Advanced Features:**
- Natural language query parsing (Orchestrator)
- Multi-source research (Retriever)
- TAM/SAM/SOM calculation (Analyst)
- Competitor analysis (Retriever + Analyst)

#### Use Cases (3 Real-World Examples)

**Use Case 1: TAM Research**
Sarah types "What's my TAM for AI project management tools?" → AI searches Gartner, CB Insights, Statista (10 seconds) → Returns: TAM $28B (Gartner 2024), SAM $3.2B (CB Insights), SOM $120M (calculated). Shows 10 sources with credibility ratings. She clicks "Add to Profile" → TAM/SAM/SOM saved. Clicks "Export PDF" → Shares with co-founder.

**Use Case 2: Competitor Research**
Mike asks "Who are my main competitors in project management?" → AI returns: Asana, Monday.com, Notion, Linear, Motion. Shows table comparing features, pricing, funding, user count. Suggests: "Your differentiation: AI-first, meeting elimination." He saves to "Competitor Research" folder.

**Use Case 3: Investor Discovery**
TechFlow asks "Which investors focus on B2B SaaS at Seed stage?" → AI returns ranked list of 20 investors with fit scores: Sequoia (92), Accel (89), First Round (87). Each has: Investment thesis, check size, portfolio. They click "Add to Pipeline" on top 10 → Bulk creates deals in pipeline.

#### Workflows & User Journey

**User Journey:**
Open Discovery → Type question → AI researches (10-30 sec) → Review results with sources → Ask follow-up → Export OR save to profile → Close

**Workflow: Research Query**
User asks question → Orchestrator parses query type (TAM/competitor/investor) → Retriever searches multiple sources → Analyst synthesizes data → Retriever finds citations → Controller validates sources → Display structured answer → Suggest follow-ups

**Workflow: TAM Calculation**
User asks TAM → Retriever searches "project management market size" → Finds reports → Analyst calculates TAM (top-down), SAM (segment), SOM (bottoms-up from pricing × target customers) → Controller validates math → Display with breakdown + sources

#### AI Agents & Automations

**Agents Used:**
- Orchestrator (Parse queries, route)
- Retriever (Multi-source search)
- Analyst (Synthesize, calculate)
- Controller (Validate sources)

**Automations:**
- Suggest research topics based on incomplete profile
- Alert when new industry report published
- Weekly competitive intelligence digest
- Auto-update TAM when new data available

#### Gemini 3 Features & Tools

**Models:**
- Pro (Query parsing, synthesis, TAM calculation)
- Flash (Quick searches)

**Tools:**
- Gemini Thinking (Understand intent)
- Grounding with Google Search (Find sources)
- Deep research (Comprehensive analysis)
- Code execution (TAM calculations)
- RAG (Search internal knowledge base)

#### Multi-Step Design Prompt

**Prompt 1: Discovery Home**
Design a research assistant home page. Top has large search bar with placeholder "Ask anything about your market, competitors, or investors..." Below, show: (1) Quick Research cards (Market Sizing, Competitors, Investors) with icons. (2) Recent Research section with 3 saved queries. (3) Research Templates sidebar with pre-built questions. Clean, search-focused layout. Emphasize the search bar as primary action.

**Prompt 2: Research Results**
Design results page for TAM query. Show: (1) Query at top "What's my TAM for AI project management tools?" (2) Summary box with key findings: TAM $28B, SAM $3.2B, SOM $120M. Each has colored badge. (3) Calculation breakdown in expandable section. (4) Sources section with cards: Report name, publisher, year, credibility rating (5 stars), "View Source" link. (5) Suggested follow-up questions at bottom. (6) Actions: "Add to Profile," "Export PDF," "Save Research." Modern, organized, trustworthy design.

**Prompt 3: Competitive Analysis Table**
Design a competitor comparison table. Columns: Competitor Name (with logo), Founded, Funding, Revenue, Users, Pricing, AI-Native (Yes/No), Key Features. Rows for 5 competitors (Asana, Monday, Notion, Linear, Motion). Your startup at top row highlighted in blue. Checkmarks and X marks for features. Color coding for pricing (green = cheaper, red = expensive). Click row to expand full competitor profile. Export button above table.

---

### SCREEN 7: GTM (Go-to-Market Strategy)

**Route:** /app/gtm  
**Type:** Dashboard  
**Priority:** 11 (After Discovery)  
**Est. Days:** 6 days  

#### Current State
- Detailed in 11-gtm.md
- Missing: Channel performance dashboards, budget allocation visuals

#### Suggested Changes

**1. Add Channel Performance Dashboard**
- Real-time metrics per channel (traffic, conversions, CAC)
- Trend charts (last 30/90 days)
- ROI calculator
- Budget vs actual spend

**2. Add Budget Allocation Visualizer**
- Pie chart of budget by channel
- Drag-to-adjust allocation
- Projected results per allocation
- Optimize button (AI suggests best allocation)

**3. Add Launch Checklist Progress**
- Visual checklist with progress bar
- Dependencies between tasks
- Critical path highlighting
- Team member assignments

**4. Add ICP Persona Builder**
- Visual persona cards
- Demographics, pain points, goals
- Buyer journey map
- Save multiple personas

**5. Add Competitive Positioning Map**
- 2x2 matrix (e.g., Price vs Features)
- Plot your startup + competitors
- Identify whitespace
- Drag to reposition

#### Features: Core vs Advanced

**Core Features:**
- Manual ICP entry
- Channel list
- Static checklist
- Manual positioning statement

**Advanced Features:**
- ICP generation from profile (Planner + Extractor)
- Channel prioritization (Optimizer + Analyst)
- Keyword research (Retriever)
- Budget optimization (Optimizer)

#### Use Cases (3 Real-World Examples)

**Use Case 1: First-Time GTM Planning**
Sarah opens GTM for first time. AI pre-fills ICP from startup profile: "Remote-first startups, 10-50 employees, VP Operations." Suggests 4 channels ranked by fit: (1) Content Marketing (CAC $180), (2) Product-Led Growth ($50), (3) Partnerships ($120), (4) Paid Ads ($450). She reviews, approves. Launch checklist generated with 15 tasks.

**Use Case 2: Budget Optimization**
Mike has $50K for customer acquisition. Opens budget allocator → Drags sliders: Content 40%, PLG 30%, Partnerships 20%, Paid 10% → AI calculates projected results: 277 customers, $180 blended CAC. He clicks "Optimize" → AI suggests: Content 50%, PLG 35%, Partnerships 15%, Paid 0% → Projected: 312 customers, $160 CAC. He accepts.

**Use Case 3: Channel Performance Review**
TechFlow runs content marketing for 3 months. Opens GTM → Views channel dashboard → Content driving 85% of signups, CAC $120 (below target $180). AI insight: "Content exceeding expectations. Consider increasing budget by $10K." They adjust allocation, publish 5 more posts.

#### Workflows & User Journey

**User Journey:**
Open GTM → AI pre-fills ICP → Review channels → Customize → Approve plan → View launch checklist → Execute → Track performance → Optimize

**Workflow: ICP Generation**
User opens GTM → Planner extracts ICP from profile (industry, target customer, problem) → Extractor structures into template → Controller validates → Display for review → Human edits → Approves → Save

**Workflow: Channel Prioritization**
Optimizer calculates score per channel (ICP fit × CAC efficiency × stage appropriateness × competition × time to ROI) → Rank channels → Analyst validates logic → Controller approves → Display ranked list → Human selects top 3

#### AI Agents & Automations

**Agents Used:**
- Planner (ICP generation, strategy)
- Optimizer (Channel ranking, budget allocation)
- Analyst (Performance metrics)
- Retriever (Keyword research)
- Controller (Validate all)

**Automations:**
- Weekly channel performance report
- Alert when channel underperforms (CAC >2x target)
- Suggest budget reallocation monthly
- Update ICP when target customer changes

#### Gemini 3 Features & Tools

**Models:**
- Pro (ICP generation, optimization)
- Flash (Keyword research)

**Tools:**
- Structured outputs (ICP template)
- Gemini Thinking (Channel prioritization logic)
- Code execution (Budget optimization algorithms)
- Grounding with Search (Keyword data)

#### Multi-Step Design Prompt

**Prompt 1: GTM Dashboard**
Design go-to-market strategy page with sections: (1) ICP card at top showing target customer details. (2) Channel Strategy section with 4 channel cards ranked 1-4. Each card shows: Channel name, estimated CAC, conversion rate, status (Planning/Active/Paused). (3) Launch Checklist with progress bar. (4) Positioning Statement card. (5) Right sidebar with "Channel Performance" metrics. Clean, strategic layout.

**Prompt 2: ICP Builder**
Design ICP builder form. Show: (1) Company Characteristics section with dropdowns: Industry, Size, Revenue, Stage, Work Model. (2) Decision Maker section: Job Title, Seniority, Department. (3) Pain Points section: Primary pain (textarea), Impact, Current solution. (4) Buying Behavior: Budget range, Decision speed, Process. (5) AI suggestion box below each section with lightbulb icon. (6) "Generate from Profile" button at top. (7) Preview card on right showing final ICP. Modern form design.

**Prompt 3: Budget Allocation Visualizer**
Design interactive budget allocator. Show: (1) Pie chart in center with 4 slices (Content, PLG, Partnerships, Paid Ads). (2) Sliders below each slice to adjust percentage. (3) Dollar amounts update as sliders move. (4) Projected results box showing: Total customers, Blended CAC, ROI. (5) "Optimize" button that uses AI to suggest best allocation. (6) Comparison view showing current vs optimized. Interactive, visual, data-driven design.

---

### SCREEN 8: LEAN CANVAS

**Route:** /app/lean-canvas  
**Type:** Wizard/Dashboard hybrid  
**Priority:** 12 (Late implementation)  
**Est. Days:** 5 days  

#### Current State
- Detailed in 12-lean-canvas.md
- Missing: Interactive 9-box UI, version comparison visuals

#### Suggested Changes

**1. Add Interactive 9-Box Grid**
- Click box to expand and edit
- Drag corners to resize boxes
- Color-code by validation status (validated, needs validation, weak)
- Print-friendly view

**2. Add Version Comparison Visualizer**
- Side-by-side canvas versions
- Highlighted changes (green = added, red = removed, yellow = modified)
- Change timeline graph
- Pivot annotations

**3. Add Hypothesis Testing Framework**
- Per-box validation checklist
- Evidence tracker (interviews, metrics, research)
- Confidence score per box
- Test results logging

**4. Add Collaboration Features**
- Multi-user editing (Google Docs style)
- Comment threads per box
- @mention team members
- Approval workflow for changes

**5. Add Export Options**
- PDF with formatting
- PowerPoint slide
- Image (PNG/JPG)
- Markdown for GitHub

#### Features: Core vs Advanced

**Core Features:**
- Manual 9-box canvas
- Text fields for each box
- Basic validation
- Save versions

**Advanced Features:**
- Pre-fill from profile (Extractor + Orchestrator)
- Hypothesis validation (Analyst)
- AI challenges to weak assumptions (Analyst)
- Version comparison (Analyst)

#### Use Cases (3 Real-World Examples)

**Use Case 1: First Canvas Creation**
Sarah opens Lean Canvas. AI pre-fills all 9 boxes from startup profile. Problem box shows "Remote teams waste 10+ hours/week in meetings." Unfair Advantage shows "Proprietary AI model." AI challenges: "What prevents competitors from building similar AI?" She revises to "Exclusive partnerships with Slack, Notion." Saves v1.

**Use Case 2: Pivot Tracking**
TechFlow pivots from B2C to B2B. They update Customer Segments from "Consumers" to "Remote startups 10-50 employees." Update Problem, Solution, Channels. Save as v2. Later, click "Compare Versions" → v1 vs v2 side-by-side → See all changes highlighted → Annotate: "Pivoted based on user feedback." Helps track evolution.

**Use Case 3: Investor Review**
Mike shares canvas with advisor before investor meeting. Advisor leaves comment on Cost Structure: "CAC payback 18 months too long. Target <12 months." Mike adjusts pricing model, recalculates CAC payback to 11 months. Advisor approves. Mike presents to investor with confidence.

#### Workflows & User Journey

**User Journey:**
Open Lean Canvas → AI pre-fills → Review 9 boxes → AI challenges weak boxes → Revise → Save version → Share with team → Collect feedback → Update → Compare versions

**Workflow: Pre-fill Canvas**
User opens canvas → Extractor pulls data from profile → Orchestrator maps to 9 boxes → Controller validates → Display canvas → Analyst validates hypotheses → Flag weak boxes → Human reviews challenges → Revises → Save

**Workflow: Hypothesis Validation**
Analyst scans all 9 boxes → Detects weak hypotheses (e.g., "AI" in Unfair Advantage) → Generate challenge with reasoning → Controller validates → Display warning badge on box → Human reads challenge → Revises OR accepts risk → Log decision

#### AI Agents & Automations

**Agents Used:**
- Orchestrator (Coordinate pre-fill)
- Extractor (Parse profile into canvas)
- Analyst (Validate hypotheses, compare versions)
- Controller (Validate all changes)

**Automations:**
- Quarterly reminder to update canvas
- Alert when key metrics change affecting canvas
- Suggest updating after major pivot
- Generate canvas PDF on demand

#### Gemini 3 Features & Tools

**Models:**
- Pro (Pre-fill, hypothesis validation)
- Flash (Version comparison)

**Tools:**
- Structured outputs (9-box schema)
- Gemini Thinking (Validate hypotheses)
- Text generation (Challenges)
- Grounding with Search (Benchmark data)

#### Multi-Step Design Prompt

**Prompt 1: 9-Box Canvas Grid**
Design a Lean Canvas with 9 boxes in standard layout. Top row (left to right): Problem, Solution, Unique Value Prop, Unfair Advantage, Customer Segments. Bottom row: Key Metrics, Channels, Cost Structure, Revenue Streams. Each box is a card with: (1) Title at top. (2) Content area (text or bullets). (3) Edit icon in top-right. (4) Validation badge (green checkmark OR yellow warning). (5) Click box to expand modal for editing. Use clean, minimal design. Desktop 1440px, responsive to mobile (stacked vertically).

**Prompt 2: Box Edit Modal**
Design modal for editing single canvas box (e.g., Unique Value Prop). Show: (1) Title "Edit: Unique Value Proposition." (2) Template with prompts: "For (target customer)," "Who (need)," "The (product)," etc. (3) Large textarea for each prompt. (4) AI suggestion box below: "Your UVP is clear but generic. Make it specific: 'Eliminates 80% of status meetings in first week.'" (5) Character count. (6) "Save" and "Cancel" buttons. Clean, helpful design.

**Prompt 3: Version Comparison View**
Design side-by-side canvas comparison. Show: (1) Header "Compare Versions: v1 (Oct 2024) vs v2 (Dec 2024)." (2) Two 9-box canvases side-by-side. (3) Changes highlighted: Green background = added text, Red = removed, Yellow = modified. (4) Summary at top: "5 boxes changed, 2 pivots detected." (5) Annotations timeline below showing major changes. (6) "Restore v1" button. Clear, visual comparison.

---

### SCREEN 9: PROJECTS

**Route:** /app/projects  
**Type:** Dashboard  
**Priority:** 8 (After Profile)  
**Est. Days:** 6 days  

#### Current State
- Detailed in 02-projects.md
- Missing: Gantt chart view, resource allocation

#### Suggested Changes

**1. Add Multiple View Modes**
- List view (current)
- Kanban view (projects as columns, tasks as cards)
- Calendar view (timeline)
- Gantt chart view (dependencies)

**2. Add Resource Allocation**
- Assign team members to projects
- Capacity planning (hours per week)
- Workload visualization
- Conflict detection (overallocation)

**3. Add Project Templates**
- Pre-built templates (Fundraise, Product Launch, Hiring)
- Custom template creation
- Template marketplace
- One-click instantiate

**4. Add Dependencies & Critical Path**
- Link tasks with dependencies
- Auto-calculate critical path
- Delay impact prediction
- Reorder suggestions

**5. Add Risk Management**
- Risk register per project
- Probability × impact scoring
- Mitigation plan tracking
- Risk alerts

#### Features: Core vs Advanced

**Core Features:**
- Manual project creation
- Task lists
- Milestone tracking
- Progress bars

**Advanced Features:**
- Progress prediction (Optimizer + Analyst)
- Risk detection (Analyst)
- Task generation (Planner)
- Template suggestions (Orchestrator)

#### Use Cases (3 Real-World Examples)

**Use Case 1: Fundraise Project**
Sarah creates "Series A Fundraise" project. AI suggests template with milestones: (1) Prepare materials, (2) Build pipeline, (3) Outreach, (4) Pitch & negotiate, (5) Close. Each milestone has 5-10 pre-filled tasks. She customizes, sets deadline March 31. AI predicts completion March 28 based on current velocity. On track.

**Use Case 2: Risk Alert**
Mike's "Product Launch" project has milestone "Beta testing" with 8 tasks. 6 are complete, but 1 blocker task "Fix critical bug" is overdue 3 days. AI alerts: "Critical path at risk. Delay will push launch by 1 week." He reassigns task to senior engineer, marks priority urgent. Bug fixed next day.

**Use Case 3: Template Creation**
TechFlow completes Demo Day project successfully. They click "Save as Template" → Reviews all tasks and milestones → Removes specific details → Adds placeholders → Publishes to team. Next batch of founders use "Demo Day Prep" template → Saves 2 hours of planning.

#### Workflows & User Journey

**User Journey:**
Open Projects → Click "New Project" → Select template OR blank → Set deadline → AI generates milestones → Review → Customize → Approve → Project created → Add tasks → Track progress

**Workflow: Progress Prediction**
User views project → Optimizer calculates velocity (tasks completed per week) → Predict completion date → Analyst detects risks (overdue tasks, blockers) → Controller validates → Display prediction + risk alerts

**Workflow: Task Generation**
User completes milestone → Ops Automation detects → Planner loads next milestone template → Generate tasks → Controller validates → Display modal → Human approves → Create tasks

#### AI Agents & Automations

**Agents Used:**
- Planner (Task generation, templates)
- Optimizer (Timeline optimization, predictions)
- Analyst (Risk detection, velocity calculation)
- Ops Automation (Alerts, reminders)
- Controller (Validate all)

**Automations:**
- Generate tasks on milestone complete
- Alert when milestone at risk
- Weekly progress report per project
- Suggest template based on project type

#### Gemini 3 Features & Tools

**Models:**
- Pro (Template suggestions, risk analysis)
- Flash (Task generation, alerts)

**Tools:**
- Structured outputs (Task lists)
- Code execution (Velocity calculations)
- Gemini Thinking (Risk assessment)
- Function calling (Trigger alerts)

#### Multi-Step Design Prompt

**Prompt 1: Projects List**
Design projects dashboard showing active projects. Top has "New Project" button and view toggle (List/Kanban/Calendar/Gantt). List view shows project cards with: (1) Project name and icon. (2) Progress bar with percentage. (3) Milestone count (e.g., "3/5 milestones complete"). (4) Deadline date. (5) Team member avatars. (6) Risk indicator (green/yellow/red dot). (7) Last updated timestamp. (8) Click card to open project detail. Clean, organized layout.

**Prompt 2: Project Detail View**
Design project detail page with sections: (1) Header with project name, deadline countdown, progress bar. (2) Tabs: Overview, Milestones, Tasks, Team, Risks. (3) Overview tab shows: Description, AI insights ("On track to complete March 28"), Next actions (3 upcoming tasks). (4) Milestones tab shows vertical timeline with milestone cards. (5) Tasks tab shows grouped task list by milestone. (6) Right sidebar shows team members and resources. Modern, detailed layout.

**Prompt 3: Template Selection Modal**
Design modal for creating new project. Show: (1) Title "Choose a template or start blank." (2) Grid of template cards (3 per row): "Fundraise Campaign," "Product Launch," "Hiring Plan," "Blank Project." (3) Each card has icon, name, description, "Use Template" button. (4) Preview sidebar on right showing template milestones when hovering. (5) "Browse More Templates" link at bottom. Clean, choice-focused design.

---

### SCREEN 10: EVENT WIZARD

**Route:** /app/events/new  
**Type:** Wizard  
**Priority:** 9 (After Projects)  
**Est. Days:** 5 days  

#### Current State
- Detailed in 07-event-wizard.md
- Missing: Visual timeline builder, team collaboration

#### Suggested Changes

**1. Add Visual Timeline Builder**
- Drag-and-drop phases on timeline
- Resize phase duration
- Color-code by phase type
- Zoom in/out timeline

**2. Add Team Workload Distribution**
- Show team capacity per week
- Auto-balance task assignments
- Conflict warnings (overallocation)
- Request help from team

**3. Add Event Type Library**
- 10+ pre-built event types
- Industry-specific templates
- User-submitted templates
- Template ratings and reviews

**4. Add Progress Tracking Dashboard**
- After event creation, dedicated dashboard
- Countdown timer
- Phase progress indicators
- Team activity feed

**5. Add Post-Event Retrospective**
- After event date, prompt for retrospective
- What went well / what didn't
- Lessons learned capture
- Update template for future

#### Features: Core vs Advanced

**Core Features:**
- Manual event creation
- Manual task entry
- Static timeline
- Basic reminders

**Advanced Features:**
- Timeline generation (Planner + Optimizer)
- Task breakdown (Planner)
- Load balancing (Optimizer)
- Deadline risk prediction (Analyst)

#### Use Cases (3 Real-World Examples)

**Use Case 1: Demo Day Planning**
Sarah creates Demo Day event, deadline March 25 (83 days away). Selects "Demo Day" template. AI generates 6-week timeline with phases: Foundation, Deck Refinement, Practice, Outreach, Final Prep, Event Day. 42 tasks distributed across timeline. She reviews, edits 2 tasks, approves. Event created with auto-reminders.

**Use Case 2: Team Overload Warning**
Mike's Product Launch event has Sarah assigned 15 tasks in Week 5. AI warns: "Sarah overallocated (30 hours, capacity 20 hours). Reassign 5 tasks." He clicks "Auto-balance" → AI suggests moving 5 tasks to Mike and Lisa → He approves → Workload balanced.

**Use Case 3: Deadline Compression**
TechFlow's conference is moved up 2 weeks (from 8 weeks to 6 weeks notice). They open event, click "Adjust Deadline." Enter new date. AI recalculates timeline, compresses phases, flags 8 tasks as "at risk." Suggests: "Outsource booth design to vendor to save time." They accept, update plan.

#### Workflows & User Journey

**User Journey:**
Open Event Wizard → Select event type → Enter deadline → AI generates timeline → Review phases → Customize tasks → Approve → Event created → Track progress dashboard → Complete event → Retrospective

**Workflow: Timeline Generation**
User enters deadline → Planner loads event template → Calculate days available → Optimizer distributes phases across timeline → Planner generates tasks per phase → Controller validates → Display preview → Human reviews → Approves → Create event

**Workflow: Load Balancing**
User views timeline → Optimizer analyzes task assignments per team member → Detect overallocation → Suggest redistribution → Controller validates → Display warning modal → Human approves rebalancing → Update assignments

#### AI Agents & Automations

**Agents Used:**
- Planner (Timeline, task generation)
- Optimizer (Load balancing, compression)
- Analyst (Risk prediction)
- Ops Automation (Reminders, countdown)
- Controller (Validate all)

**Automations:**
- Daily countdown reminder (last 7 days)
- Alert when phase at risk
- Weekly team digest
- Post-event retrospective prompt

#### Gemini 3 Features & Tools

**Models:**
- Pro (Timeline optimization)
- Flash (Task generation, reminders)

**Tools:**
- Code execution (Timeline calculations)
- Structured outputs (Task lists)
- Gemini Thinking (Load balancing logic)
- Function calling (Trigger reminders)

#### Multi-Step Design Prompt

**Prompt 1: Event Type Selection**
Design event wizard step 1 showing event type selection. Display grid of event cards (2x3): "Fundraise Deadline," "Product Launch," "Demo Day," "Conference," "Milestone," "Custom." Each card has: (1) Large icon. (2) Event name. (3) Description (2 sentences). (4) Typical duration. (5) Select button. Hovering card shows preview of typical phases. Clean, choice-focused design with clear CTAs.

**Prompt 2: Timeline Preview**
Design timeline preview showing AI-generated event plan. Top shows: (1) Event name, deadline, days remaining. (2) Horizontal timeline with phases as bars (color-coded). (3) Each phase shows: Name, date range, task count. (4) Zoom controls (+/-). (5) Click phase to expand task list. Bottom shows: (1) Total tasks count. (2) Team assignments summary. (3) "Looks good" and "Customize" buttons. Visual, clear timeline representation.

**Prompt 3: Event Dashboard**
Design post-creation event dashboard. Header shows: (1) Event name, countdown timer (large, animated). (2) Progress bar across all phases. (3) Current phase highlighted. Main content has: (1) Upcoming tasks section (next 7 days). (2) Team activity feed (who completed what). (3) Phase cards showing progress. (4) AI insights box ("On track" or "At risk"). Right sidebar shows team workload chart. Clean, focused on progress tracking.

---

### SCREEN 11: COMPANY PROFILE

**Route:** /app/companies/:id  
**Type:** Dashboard  
**Priority:** 7 (After Pipeline)  
**Est. Days:** 5 days  

#### Current State
- Brief overview in 04-company-profile.md
- Missing: Relationship timeline visualization, competitive intelligence

#### Suggested Changes

**1. Add Relationship Timeline**
- Visual timeline of all interactions
- Meetings, emails, calls plotted on timeline
- Filter by interaction type
- Export relationship history

**2. Add Competitive Intelligence**
- Track funding rounds automatically
- Monitor product launches, news mentions
- Hiring activity (LinkedIn scraping)
- Alert on major changes

**3. Add Portfolio Analysis (Investors)**
- List all portfolio companies
- Identify companies similar to yours
- Pattern detection (what they invest in)
- Success rate metrics

**4. Add Network Map**
- Visualize connections (your team ↔ their team)
- Degrees of separation
- Warm intro paths
- Relationship strength indicators

**5. Add Meeting Prep Assistant**
- Pre-meeting briefing (auto-generated)
- Talking points based on research
- Recent activity summary
- Questions to ask

#### Features: Core vs Advanced

**Core Features:**
- Manual company entry
- View company info
- Manual notes
- Basic activity log

**Advanced Features:**
- Fit scoring (Scorer)
- Competitive intelligence (Retriever + Analyst)
- Portfolio analysis (Retriever)
- Meeting prep (Analyst + Content/Comms)

#### Use Cases (3 Real-World Examples)

**Use Case 1: Investor Research**
Sarah opens Sequoia profile before pitch meeting. Sees: (1) Fit score 87/100 (excellent match). (2) Recent activity: "Raised $2.8B fund Nov 2024." (3) Portfolio: Notion, Figma, Linear (similar to TechFlow). (4) AI insight: "Focus on AI infrastructure angle - 3 recent AI investments." (5) Meeting prep: "Ask about timeline, typical DD process." She screenshots, reviews before call.

**Use Case 2: Competitor Tracking**
Mike tracks Asana (competitor). System alerts: "Asana announced AI features launch." He clicks notification → Reads TechCrunch article → AI summarizes: "Asana adding AI summarization (similar to your product). Differentiate on simplicity." He updates competitive positioning in pitch deck.

**Use Case 3: Customer Intelligence**
TechFlow is pitching to Stripe (customer). Opens Stripe profile → Sees org chart scraped from LinkedIn → Identifies 3 decision-makers (VP Ops, CTO, CFO) → AI suggests: "Warm intro via mutual contact Mike Chen (ex-colleague of Stripe CTO)." They request intro, schedule meeting.

#### Workflows & User Journey

**User Journey:**
Pipeline/Contacts → Click company name → View profile → Review fit score → Read AI insights → Click "Add Note" → Add meeting notes → Close

**Workflow: Fit Scoring**
User opens investor profile → Scorer calculates fit (industry × stage × check size × portfolio × geo × connections) → Controller validates → Display score + reasoning breakdown

**Workflow: Competitive Intelligence**
Daily cron job → Retriever searches news for tracked companies → Analyst summarizes changes → Controller validates → Alert user if major change → User views update

#### AI Agents & Automations

**Agents Used:**
- Scorer (Fit scoring)
- Retriever (Intelligence gathering)
- Analyst (Insights, patterns)
- Content/Comms (Meeting prep)
- Controller (Validate all)

**Automations:**
- Daily competitive intelligence scan
- Alert on funding rounds
- Weekly portfolio company updates
- Pre-meeting briefing email (1 day before)

#### Gemini 3 Features & Tools

**Models:**
- Pro (Fit scoring, insights)
- Flash (Intelligence gathering)

**Tools:**
- Gemini Thinking (Calculate fit scores)
- Grounding with Search (News, funding data)
- URL Context (Scrape websites)
- Structured outputs (Company schema)

#### Multi-Step Design Prompt

**Prompt 1: Company Profile Header**
Design company profile header showing: (1) Company logo (large, 120px). (2) Company name and tagline. (3) Industry, location, founded year. (4) Fit score badge (if investor) in top-right corner (87/100 with green background). (5) Tabs below: Overview, Contacts, Activity, AI Insights. (6) Action buttons: "Follow," "Add to Pipeline," "Share." Clean, professional header design.

**Prompt 2: AI Insights Tab**
Design AI insights section for investor profile. Show: (1) Fit score breakdown with visual bars: Industry Match 90%, Stage Match 100%, Check Size 80%, Portfolio 85%, Geography 100%. (2) "Why Good Fit" section with checkmarks: "Your industry matches," "Stage matches," etc. (3) "Considerations" section with warnings. (4) "Recommendations" section with 3 actionable suggestions. (5) Recent activity feed (last 3 months). Clean, insights-focused design.

**Prompt 3: Relationship Timeline**
Design visual timeline of interactions with company. Horizontal timeline from left (oldest) to right (newest). Plot points for: (1) First contact. (2) Emails sent/received. (3) Meetings held. (4) Deal stage changes. Each point is a dot with icon, hover shows details. Color-code by type: Blue = email, Green = meeting, Purple = milestone. Filter buttons above timeline. Clean, visual timeline design.

---

### SCREEN 12: USER PROFILE

**Route:** /app/settings/account  
**Type:** Dashboard  
**Priority:** 4 (Early, foundation)  
**Est. Days:** 2 days  

#### Current State
- Brief overview in 05-user-profile.md
- Missing: Integration OAuth flows, security settings

#### Suggested Changes

**1. Add Visual Integration Status**
- Integration cards with status indicators
- Connection health (active, needs reauth, failed)
- Last synced timestamp
- Usage statistics per integration

**2. Add Security Dashboard**
- Active sessions with device info
- Login history with IP addresses
- 2FA setup wizard
- Security score (0-100)

**3. Add Notification Preferences Grid**
- Matrix view (notification type × channel)
- Toggle switches per cell
- Smart defaults based on role
- Test notification button

**4. Add API Key Management**
- Generate keys with scopes
- Usage analytics per key
- Rate limit monitoring
- Revoke keys

**5. Add Export & Data Privacy**
- Export all data (GDPR compliance)
- Delete account wizard
- Data retention settings
- Privacy policy version history

#### Features: Core vs Advanced

**Core Features:**
- Manual profile update
- Password change
- Basic notification settings
- API key generation

**Advanced Features:**
- (Minimal AI on this screen)
- Security score calculation (Analyst)
- Anomaly detection on logins (Analyst)
- Smart notification defaults (Planner)

#### Use Cases (3 Real-World Examples)

**Use Case 1: OAuth Integration**
Sarah connects LinkedIn account. Clicks "Connect LinkedIn" → Redirected to LinkedIn OAuth → Approves → Returns to app → Integration card shows "Connected" with green checkmark → "Last synced: Just now" → Auto-enrichment enabled. Takes 30 seconds.

**Use Case 2: Security Alert**
Mike logs in from new device in different country. System detects anomaly → Sends email: "New login from London. Was this you?" → He clicks "Yes, that was me" → Device added to trusted list. OR clicks "No" → All sessions logged out, password reset required.

**Use Case 3: API Key Management**
TechFlow wants to integrate with Zapier. Mike generates API key → Selects scopes (read contacts, write deals) → Copy key → Paste into Zapier → Test → Working. Later, views usage: "1,247 API calls this month, 3,753 remaining."

#### Workflows & User Journey

**User Journey:**
Dashboard → Click avatar → Settings → Update profile → Connect integrations → Save → Return to dashboard

**Workflow: OAuth Integration**
User clicks "Connect LinkedIn" → Redirect to LinkedIn OAuth → User authorizes → LinkedIn returns token → System stores encrypted token → Test connection → Display success → Enable auto-features

**Workflow: Security Anomaly**
User logs in → Analyst detects unusual activity (new device, new location) → Controller flags → Send verification email → User confirms OR denies → Log result

#### AI Agents & Automations

**Agents Used:**
- Analyst (Security anomaly detection)
- (Minimal AI overall)

**Automations:**
- Weekly security summary email
- Alert on failed login attempts (>5)
- Reauth reminder for expired OAuth tokens
- API usage approaching limit warning

#### Gemini 3 Features & Tools

**Models:**
- Flash (Anomaly detection)

**Tools:**
- Code execution (Security score calculation)
- Gemini Thinking (Pattern detection)

#### Multi-Step Design Prompt

**Prompt 1: Settings Navigation**
Design settings page with left sidebar navigation. Tabs: Account, Security, Integrations, Notifications, API Keys, Privacy. Main content area shows selected tab content. Account tab has sections: Profile Info (avatar, name, email), Role, Timezone, Language. Each section is a card with edit button. Clean, organized settings layout.

**Prompt 2: Integrations Tab**
Design integrations page showing connected accounts. Display grid of integration cards (2 per row desktop, 1 mobile): LinkedIn, Google, Stripe, Notion, Slack. Each card shows: (1) Service logo and name. (2) Status badge (Connected / Not Connected). (3) Last synced timestamp. (4) "Used for" description. (5) Disconnect/Connect button. (6) Usage stats (e.g., "152 contacts enriched"). Modern, clear status indicators.

**Prompt 3: Security Tab**
Design security settings page with sections: (1) Password section with "Change Password" button and last changed date. (2) Two-Factor Authentication with enable toggle and QR code (if enabled). (3) Active Sessions list showing: Device (Chrome on Mac), Location (San Francisco), Last active (2 hours ago), Revoke button. (4) Security Score card showing 85/100 with tips to improve. Clean, security-focused design.

---

### SCREEN 13: AI CHAT

**Route:** /app/chat (accessible from all screens)  
**Type:** Chatbot (right panel)  
**Priority:** 13 (Last, universal feature)  
**Est. Days:** 4 days  

#### Current State
- Mentioned in 13-agents.md
- Missing: Full conversational patterns, context awareness

#### Suggested Changes

**1. Add Context-Aware Responses**
- Detect current screen user is on
- Tailor suggestions to context
- Surface relevant data from current view
- Suggest screen-specific actions

**2. Add Conversation Memory**
- Remember conversation history (session)
- Reference previous questions
- Multi-turn conversations
- Clear context button

**3. Add Quick Actions**
- Buttons for common tasks (Add Contact, Create Deal, etc.)
- Deep links to relevant screens
- One-click execute actions
- Confirmation before execution

**4. Add Voice Input (Optional)**
- Speech-to-text for questions
- Voice responses (text-to-speech)
- Accessibility compliance
- Language selection

**5. Add Chat History & Search**
- Save past conversations
- Search through chat history
- Favorite responses
- Export conversation to notes

#### Features: Core vs Advanced

**Core Features:**
- Text-based Q&A
- Basic responses
- Static suggestions
- Manual navigation

**Advanced Features:**
- Query routing (Orchestrator)
- Contextual responses (Content/Comms + Retriever)
- Action suggestions (Planner)
- Multi-agent coordination (Orchestrator)

#### Use Cases (3 Real-World Examples)

**Use Case 1: Contextual Help**
Sarah is on Pipeline page, confused about fit scores. Opens chat, types "How is fit score calculated?" → AI knows she's on Pipeline → Responds: "Fit score (0-100) is calculated using: Industry match 25%, Stage 25%, Check size 20%, Portfolio 15%, Geography 10%, Connections 5%. Sequoia scored 87/100 because..." → She clicks "View Calculation" → Opens Sequoia detail with breakdown.

**Use Case 2: Quick Action**
Mike asks chat "Add Sequoia to pipeline." → AI confirms: "Add Sequoia Capital (87 fit score) to pipeline? Stage: Research." → Shows "Confirm" button → He clicks → Deal created → Chat responds: "✓ Sequoia added to Research stage. 3 tasks created." → "View Deal" button appears.

**Use Case 3: Multi-Turn Conversation**
TechFlow asks "What's my MRR?" → AI: "$12.5K." → Follow-up: "How much do I need to raise?" → AI (remembering context): "Your runway is 8 months with $105K/mo burn. To extend to 18 months, raise $1.05M. Your goal is $3M, which gives 28 months runway." → "Add to profile" button.

#### Workflows & User Journey

**User Journey:**
Any screen → Click chat icon → Type question → AI responds → Click suggested action → Execute → Return to screen

**Workflow: Query Routing**
User asks question → Orchestrator detects intent (info, action, research) → Routes to specialist agent (Retriever for info, Planner for action) → Agent responds → Controller validates → Display answer + action buttons

**Workflow: Context-Aware Action**
User on Pipeline → Asks "Add investor" → Orchestrator knows context (Pipeline screen) → Planner generates action: Create deal → Controller validates → Display confirmation → Human clicks → Execute → Feedback

#### AI Agents & Automations

**Agents Used:**
- Orchestrator (Query routing, coordination)
- Content/Comms (Conversational responses)
- Planner (Action suggestions)
- Retriever (Data lookup)
- Controller (Validate actions)

**Automations:**
- Proactive suggestions based on screen
- Onboarding tips for new users
- Feature discovery prompts
- Help article suggestions

#### Gemini 3 Features & Tools

**Models:**
- Flash (Quick responses, routing)
- Pro (Complex queries, multi-agent coordination)

**Tools:**
- Function calling (Execute actions)
- Gemini Thinking (Understand intent)
- RAG (Search help docs)
- Structured outputs (Action proposals)

#### Multi-Step Design Prompt

**Prompt 1: Chat Panel**
Design right sidebar chat panel (400px wide, collapsible). Header shows "AI Assistant" with minimize button. Chat area shows messages: User messages right-aligned (blue bubbles), AI responses left-aligned (gray bubbles). AI responses have action buttons below (e.g., "Add to Pipeline"). Input at bottom with "Ask me anything..." placeholder and send button. Suggested questions above input (context-aware). Clean, modern chat UI.

**Prompt 2: Contextual Suggestions**
Design suggested questions that appear when user opens chat from Pipeline page. Show 3-4 bubble buttons: "How is fit score calculated?", "Add new investor", "Show stalled deals", "Explain pipeline stages." Click suggestion auto-fills input. Suggestions change based on current screen. Visual, helpful prompts.

**Prompt 3: Action Confirmation**
Design confirmation flow when AI suggests action. User asks "Add Sequoia to pipeline" → AI shows confirmation card in chat: "I'll add Sequoia Capital to your pipeline. Stage: Research. Fit Score: 87/100. 3 tasks will be created." → Two buttons: "Confirm" (green) and "Cancel" (gray). After confirm, show success message with checkmark: "✓ Sequoia added. View Deal" (link). Clear, safe action flow.

---

## 📝 IMPLEMENTATION SUMMARY

### Total Scope

- **13 Screens** to design and build
- **40 AI Features** to integrate
- **10 Agent Types** to develop
- **15 Workflows** to automate
- **14 Approval Gates** to enforce
- **76 Development Days** estimated (15 weeks with 1 designer + 2 engineers)

### Recommended Phasing

**Phase 1: Foundation (4 weeks)**
1. Wizard (10 days)
2. Startup Profile (5 days)
3. User Profile (2 days)
4. Dashboard (7 days)

**Phase 2: Core CRM (4 weeks)**
5. Contacts (6 days)
6. Pipeline (8 days)
7. Company Profile (5 days)

**Phase 3: Planning Tools (3 weeks)**
8. Projects (6 days)
9. Event Wizard (5 days)

**Phase 4: Intelligence & Strategy (4 weeks)**
10. Discovery (7 days)
11. GTM (6 days)
12. Lean Canvas (5 days)
13. AI Chat (4 days)

### Success Metrics

**User Activation:**
- 90%+ complete wizard in first session
- 60%+ return within 3 days
- 40%+ become active users (3+ sessions/week)

**AI Performance:**
- 90%+ LinkedIn enrichment accuracy
- 75%+ fit score correlation with closes
- 85%+ users approve AI suggestions

**Business Impact:**
- 73% fundraising success rate
- 7.6 hours saved per deck
- 10x faster research vs manual

---

**Document Owner:** Product + Design + Engineering Teams  
**Last Updated:** December 31, 2025  
**Status:** Implementation Roadmap Ready  
**Next Steps:** Begin Phase 1 - Wizard design & development  

---

**END OF DOCUMENT**
