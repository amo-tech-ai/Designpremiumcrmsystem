# TASK 02: Startup Profile — Source of Truth

**Priority:** 2 (After Wizard)  
**Est. Days:** 5 days  
**Route:** /app/profile  
**Type:** Dashboard  
**Dependencies:** Wizard (data source)  

---

## SUMMARY MATRIX

| Screen | Features | Agents | Gemini Model | Status | Progress |
|--------|----------|--------|--------------|--------|----------|
| Startup Profile | 3 Advanced | 3 | Flash + Pro | 🔴 Not Started | 0% |

### Features Breakdown

| Feature | Type | Agent | Model | Approval Gate |
|---------|------|-------|-------|---------------|
| Completeness Scoring | Advanced | Scorer | Flash | Auto-approved |
| Data Enrichment | Advanced | Retriever + Analyst | Pro | Controller + Human |
| Validation Warnings | Advanced | Analyst | Pro | Auto-approved |

### Implementation Progress

| Step | Task | Est. Hours | Status | Dependencies |
|------|------|------------|--------|--------------|
| 1 | Design profile layout | 8h | ⬜ | None |
| 2 | Build completeness tracker | 6h | ⬜ | Step 1 |
| 3 | Create inline edit components | 10h | ⬜ | Step 1 |
| 4 | Integrate enrichment | 8h | ⬜ | Steps 2-3 |
| 5 | Add validation logic | 6h | ⬜ | Step 3 |
| 6 | Build version history | 4h | ⬜ | Step 3 |
| 7 | Testing + QA | 6h | ⬜ | All above |
| **Total** | **7 tasks** | **48h** | **0/7** | — |

---

## DESCRIPTION

Central dashboard displaying all startup data. Acts as single source of truth for AI agents and team members. Visualizes completeness score and surfaces missing critical fields.

---

## PURPOSE

Maintain accurate, up-to-date startup data. Guide users to complete profile for better AI recommendations. Enable quick edits without separate edit mode.

---

## GOALS

1. **Completeness:** 80%+ users reach 70%+ profile completion
2. **Accuracy:** <5% data inconsistencies flagged
3. **Speed:** Inline editing saves 50% time vs separate edit pages
4. **Engagement:** 60%+ users update profile monthly
5. **AI Quality:** Complete profiles get 40% better AI recommendations

---

## 3-PANEL LAYOUT LOGIC

### Core Model: **Context + Work**

**Left Panel = Context (Navigation)**
- Main nav menu
- Profile sections quick jump
- Completeness score widget

**Main Panel = Work (Profile Data)**
- Profile content (5 sections)
- Inline editing
- Enrichment suggestions

**Right Panel = Intelligence (Hidden on this screen)**
- Not needed (data display, not analysis)
- Could add AI suggestions in future

**Layout:**
```
┌──────────┬─────────────────────────────────────────┐
│          │ Startup Profile          [Share] [Edit]│
│ Left Nav │─────────────────────────────────────────│
│          │ [Progress: 73% Complete] [Complete Now]│
│ - Home   │                                         │
│ - Profile│ ━━━ Business Overview ━━━               │
│ - Projects│                                        │
│ - Pipeline│ Problem:                               │
│ - Contacts│ Remote teams waste 10+ hours/week...  │
│ - ...    │ [Click to edit]                        │
│          │                                         │
│ Quick Jump│ Solution:                              │
│ • Business│ AI-powered project management...       │
│ • Market  │                                        │
│ • Team    │ ━━━ Market & Traction ━━━              │
│ • Model   │ ...                                    │
│ • Funding │                                        │
│          │                                         │
│ 73% ●●●○ │                                        │
└──────────┴─────────────────────────────────────────┘
```

---

## SCREENS & ROUTES

### Main Profile View
**Route:** /app/profile  
**Sections:** Business, Market, Team, Model, Fundraising  
**Mode:** View with inline editing

### Edit Mode (Optional)
**Route:** /app/profile/edit  
**Sections:** Same, but all in edit state  
**Save:** Bulk save all changes

### Version History
**Route:** /app/profile/history  
**Display:** Timeline of all changes  
**Actions:** Restore previous version

### Share Profile
**Route:** /app/profile/share/:token  
**Display:** Public view (investor-facing)  
**Privacy:** Customizable field visibility

---

## FEATURES: CORE VS ADVANCED

### Core Features (Manual)

| Feature | Description | User Action |
|---------|-------------|-------------|
| View profile | Display all data | Scroll sections |
| Inline edit | Click field to edit | Edit, save |
| Section nav | Jump to section | Click sidebar link |
| Export PDF | Download profile | Click export button |
| Share link | Generate public URL | Click share, copy link |

### Advanced Features (AI-Powered)

| Feature | Agent | Model | Input | Output | Approval |
|---------|-------|-------|-------|--------|----------|
| **Completeness Score** | Scorer | Flash | All profile fields | Percentage 0-100% | Auto-approved |
| **Data Enrichment** | Retriever + Analyst | Pro | Company name, industry | TAM, competitors, trends | Controller + Human |
| **Validation Warnings** | Analyst | Pro | All metrics | Inconsistency alerts | Auto-approved |

---

## CONTENT & DATA

### Business Overview Section
```
Business:
  problem: text (500 chars)
  solution: text (500 chars)
  one_liner: text (150 chars)
  uvp: text (unique value prop, 300 chars)
  business_model: text (SaaS, Marketplace, etc.)
```

### Market & Traction Section
```
Market:
  industry: text
  target_customer: text (300 chars)
  competitors: text[] (list)
  tam: decimal
  sam: decimal
  som: decimal
  
Traction:
  active_users: integer
  mrr: decimal
  customers: integer
  growth_rate: decimal
  launched_date: date
```

### Team Section
```
Team:
  founders: founder[]
    - full_name: text
    - role: text
    - linkedin_url: text
    - bio: text (500 chars)
  team_size: integer
  key_hires: text[]
```

### Business Model Section
```
Model:
  revenue_streams: text (300 chars)
  pricing: text (e.g., "$49/user/month")
  unit_economics:
    - arpu: decimal
    - ltv: decimal
    - cac: decimal
    - gross_margin: decimal
```

### Fundraising Section
```
Fundraising:
  goal: decimal
  stage: text (Seed, Series A, etc.)
  timeline: text
  use_of_funds: text (500 chars)
  previous_rounds: round[]
    - amount: decimal
    - date: date
    - lead: text
```

---

## USE CASES (3 REAL-WORLD EXAMPLES)

### Use Case 1: Incomplete Profile Completion

**Persona:** Sarah, completed wizard yesterday, profile 45% complete

**Scenario:**
- Logs into dashboard, sees banner: "Your profile is 45% complete. Complete now for better AI recommendations."
- Clicks "Complete Now" → Redirects to /app/profile
- Sees progress bar: 45% with breakdown tooltip (Business 100%, Market 60%, Team 30%, Model 20%, Fundraising 40%)
- Orange "AI can help" badges on missing fields: TAM, Competitors, Team bios
- Clicks "AI can help" on TAM → Modal opens
- AI calculates TAM $28B, SAM $3.2B, SOM $120M with 10 sources
- She reviews sources (Gartner, CB Insights), clicks "Add to Profile"
- TAM/SAM/SOM saved, progress jumps to 58%
- Clicks "AI can help" on Competitors → AI suggests: Asana, Monday.com, Notion, Linear
- She reviews, adds Motion manually, saves
- Fills team bios manually (5 minutes)
- Profile reaches 73% complete
- Sees green checkmark: "Great! Your profile is complete enough for AI features."

**Time:** 15 minutes  
**Value:** Profile complete, AI recommendations unlocked

---

### Use Case 2: Validation Warning

**Persona:** Mike, updating metrics after good month

**Scenario:**
- Opens profile to update traction
- Changes MRR from $10K to $15K (+50%)
- Changes customers from 50 to 52 (+4%)
- Clicks "Save"
- AI validation detects inconsistency
- Warning appears: "MRR increased 50% but customers only 4%. Did ARPU jump from $200 to $288? Confirm this is correct."
- Mike realizes error: MRR should be $12K (not $15K)
- Clicks "Fix" → Corrects MRR to $12K
- Saves again → No warning, data consistent

**Time:** 2 minutes  
**Value:** Prevented data error, maintained accuracy

---

### Use Case 3: Investor Sharing

**Persona:** TechFlow team, preparing for investor meeting

**Scenario:**
- Meeting with Sequoia in 2 days
- Opens profile, clicks "Share"
- Modal appears: "Create investor-ready profile link"
- Toggles visibility: Show business, market, team, traction. Hide financials (cash, burn), fundraising details.
- Clicks "Generate Link" → URL created: /app/profile/share/abc123xyz
- Copies link, sends to Sequoia partner
- Partner opens link (no login required)
- Sees clean, professional profile: Logo, one-liner, problem, solution, traction, team
- No sensitive data visible
- Partner impressed by clarity
- After meeting, TechFlow revokes link (security)

**Time:** 3 minutes  
**Value:** Professional impression, controlled data sharing

---

## WORKFLOWS & USER JOURNEYS

### Main User Journey
```
Dashboard → Click "Profile" → View profile → Click field to edit → Save → See completeness update → Continue OR navigate away
```

### Workflow 1: Completeness Scoring
```
User updates any profile field
  ↓
Scorer: Calculate completeness
  - Count filled fields vs total fields
  - Weight critical fields higher (problem, solution, TAM = 2x weight)
  - Calculate percentage: (filled_weighted / total_weighted) × 100
  ↓
Display updated percentage in header
  ↓
If <60%: Show orange banner "Complete your profile"
If 60-80%: Show blue banner "Almost there!"
If >80%: Show green checkmark "Profile complete"
```

**Approval Gate:** Auto-approved (calculation only)

---

### Workflow 2: Data Enrichment
```
User clicks "AI can help" badge on TAM field
  ↓
Retriever: Search market reports (Gartner, CB Insights, Statista)
  ↓
Analyst: Calculate TAM (industry size), SAM (segment), SOM (bottoms-up)
  ↓
Retriever: Find citations for all numbers
  ↓
Controller: Validate source credibility
  ↓
Display modal with results:
  - TAM: $28B (Gartner 2024)
  - SAM: $3.2B (CB Insights)
  - SOM: $120M (calculated)
  - 10 sources with links
  ↓
Human reviews → Clicks "Add to Profile" OR "Cancel"
  ↓
If Add: Save TAM/SAM/SOM to profile, mark as AI-enriched
If Cancel: Dismiss modal, no changes
  ↓
Recalculate completeness score
```

**Approval Gate:** Controller validates sources, Human approves addition

---

### Workflow 3: Validation Warnings
```
User edits metrics (MRR, customers, users)
  ↓
User clicks "Save"
  ↓
Analyst: Validate consistency
  - Check ARPU = MRR / customers (reasonable?)
  - Check growth rate vs absolute numbers (match?)
  - Check CAC vs customer count (realistic?)
  ↓
If inconsistency detected:
  - Controller flags for review
  - Display warning modal with explanation
  - User clicks "Fix" OR "Confirm Correct"
  ↓
If Fix: Keep edit mode open, highlight issue
If Confirm: Add note "User confirmed", save anyway
  ↓
Log validation result for audit
```

**Approval Gate:** Auto-approved (non-blocking warning)

---

## AI AGENTS & AUTOMATIONS

### Agents Used

| Agent | Role | Model | Tools |
|-------|------|-------|-------|
| **Scorer** | Calculate completeness percentage | Flash | Code execution, Structured outputs |
| **Retriever** | Search market data, competitors | Pro | Grounding with Search, RAG |
| **Analyst** | Validate consistency, detect errors | Pro | Gemini Thinking, Code execution |
| **Controller** | Approval gate for enrichment | Pro | Function calling |

### Automations

| Trigger | Action | Frequency |
|---------|--------|-----------|
| Profile updated | Recalculate completeness | Real-time |
| Completeness <60% for 7 days | Send reminder email | Daily check |
| Key metric changes >20% | Suggest updating profile | On change |
| Quarterly | Remind to review profile | Every 90 days |
| New industry report published | Suggest updating TAM | Weekly scan |

---

## GEMINI 3 FEATURES & TOOLS

### Model Selection

**Flash (1 use case):**
- Completeness scoring (fast calculation)

**Pro (2 use cases):**
- Data enrichment (deep research)
- Validation warnings (complex logic)

### Tools Used

| Tool | Use Case |
|------|----------|
| **Code Execution** | Calculate completeness %, validate formulas |
| **Grounding with Search** | Find market data, competitors |
| **Gemini Thinking** | Detect inconsistencies in metrics |
| **Structured Outputs** | Enforce profile schema |
| **RAG** | Search internal knowledge base |

---

## MULTI-STEP DESIGN PROMPTS

### Prompt 1: Profile Overview Layout
```
Design a startup profile page with left sidebar navigation and main content area.
Requirements:
- Left sidebar (240px): Nav menu + Quick Jump links + Completeness widget
- Main content (800px): Profile sections as collapsible cards
- Top header: "Startup Profile" title, completeness progress bar, Share and Edit buttons
- 5 section cards: Business Overview, Market & Traction, Team, Business Model, Fundraising
- Each card: Section title, content (view mode), edit icon in top-right
- Orange "AI can help" badge on empty fields
- Click field to inline edit (turns into input)
- Auto-save indicator appears on changes
- Completeness widget: Circular progress (73%), breakdown on hover

Visual style: Clean, organized, data-focused
Color palette: White background, blue accents, orange for incomplete fields
```

### Prompt 2: Completeness Progress Tracker
```
Design a completeness progress tracker for profile page.
Requirements:
- Location: Top of page, below title
- Horizontal progress bar (full-width)
- Gradient fill: Red (0%) → Yellow (50%) → Green (100%)
- Percentage overlaid: "73% Complete"
- Breakdown tooltip on hover: 
  - Business Overview: 100% ✓
  - Market & Traction: 80%
  - Team: 60%
  - Business Model: 70%
  - Fundraising: 40%
- "Complete Now" button on right (if <80%)
- Celebrate with confetti animation at 100%

Visual style: Motivating, clear progress indication
Show example at 73% (yellow-green gradient)
```

### Prompt 3: Data Enrichment Modal
```
Design modal for AI market size enrichment.
Requirements:
- Title: "AI Market Size Calculator"
- Subtitle: "We'll calculate your TAM/SAM/SOM based on industry data"
- Results section:
  - TAM: $28B (total addressable market)
    Source: Gartner Magic Quadrant 2024 [link]
  - SAM: $3.2B (serviceable addressable market)
    Source: CB Insights State of AI Report 2024 [link]
  - SOM: $120M (serviceable obtainable market)
    Calculation: 500K companies × $240 ARPU × 1% market share
- Breakdown expandable section: "How we calculated this"
- Sources section: 10 citations with report names, years, credibility stars (5-star system)
- Buttons: "Add to Profile" (primary), "Cancel" (secondary)

Visual style: Trustworthy, transparent, data-driven
Show credibility indicators for each source
```

---

## ACCEPTANCE CRITERIA

### Functional
- [ ] All sections display correctly
- [ ] Inline editing works on all fields
- [ ] Completeness score calculates accurately
- [ ] AI enrichment returns market data
- [ ] Validation warnings detect inconsistencies
- [ ] Share link generates with custom visibility
- [ ] Export PDF includes all sections
- [ ] Version history tracks changes

### Performance
- [ ] Profile loads <1 second
- [ ] Inline edit saves <500ms
- [ ] Completeness recalculates instantly
- [ ] Enrichment returns data <30 seconds

### Quality
- [ ] 80%+ users reach 70%+ completeness
- [ ] <5% data validation errors
- [ ] 60%+ users update profile monthly
- [ ] Shared links work for all investors

---

**Task Owner:** Design + Engineering Team  
**Review Cadence:** Daily standups  
**Target Completion:** Week 3 of Phase 1  

---

**END OF TASK 02**
