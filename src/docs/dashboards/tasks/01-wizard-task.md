# TASK 01: Wizard — Startup Profile Onboarding

**Priority:** 1 (Build First)  
**Est. Days:** 10 days  
**Route:** /app/wizard/startup-profile  
**Type:** Wizard (6-step flow)  
**Dependencies:** None (foundation)  

---

## SUMMARY MATRIX

| Screen | Features | Agents | Gemini Model | Status | Progress |
|--------|----------|--------|--------------|--------|----------|
| Wizard | 4 Advanced | 4 | Flash + Pro | 🔴 Not Started | 0% |

### Features Breakdown

| Feature | Type | Agent | Model | Approval Gate |
|---------|------|-------|-------|---------------|
| LinkedIn Enrichment | Advanced | Retriever + Extractor | Flash | Controller + Human |
| TAM/SAM/SOM Calculator | Advanced | Analyst + Retriever | Pro | Controller + Human |
| Input Validation | Advanced | Extractor | Flash | Auto-approved |
| Pitch Deck Generation | Advanced | Orchestrator + Content | Pro | Controller + Human |

### Implementation Progress

| Step | Task | Est. Hours | Status | Dependencies |
|------|------|------------|--------|--------------|
| 1 | Design 6-step wizard UI | 16h | ⬜ | None |
| 2 | Build form components | 12h | ⬜ | Step 1 |
| 3 | Integrate LinkedIn enrichment | 8h | ⬜ | Step 2 |
| 4 | Build TAM calculator | 10h | ⬜ | Step 2 |
| 5 | Add validation logic | 6h | ⬜ | Step 2 |
| 6 | Integrate deck generator | 12h | ⬜ | Steps 2-5 |
| 7 | Add auto-save | 4h | ⬜ | Step 2 |
| 8 | Testing + QA | 12h | ⬜ | All above |
| **Total** | **8 tasks** | **80h** | **0/8** | — |

---

## DESCRIPTION

A 6-step onboarding wizard that captures startup fundamentals and transforms unstructured founder knowledge into a structured profile. Uses AI to enrich LinkedIn profiles, calculate market size, validate inputs, and auto-generate a pitch deck.

---

## PURPOSE

Transform new user signup into production-ready startup profile in 10-15 minutes instead of 45+ minutes of manual entry. Reduce onboarding friction while maximizing data quality and completeness.

---

## GOALS

1. **Speed:** Complete wizard in 10-15 minutes (vs 45 manual)
2. **Accuracy:** 90%+ LinkedIn enrichment accuracy
3. **Completion:** 90%+ users complete all 6 steps
4. **Quality:** 70%+ profile completeness after wizard
5. **Value:** Auto-generate pitch deck (7.6 hours saved)

---

## 3-PANEL LAYOUT LOGIC

### Core Model: Single-Panel (Wizard Flow)

**Wizard uses full-screen single panel:**
- No left sidebar (linear flow, no navigation needed)
- No right panel (focus on completion)
- Full-width main content (reduce cognitive load)

**Layout:**
```
┌─────────────────────────────────────────────────────────┐
│ [Progress Bar: Step 1/6]                     [Save Draft]│
├─────────────────────────────────────────────────────────┤
│                                                          │
│                     STEP 1: BUSINESS BASICS              │
│                                                          │
│   What problem are you solving?                         │
│   [____________________________________]                │
│                                                          │
│   What's your solution?                                  │
│   [____________________________________]                │
│                                                          │
│   One-liner (elevator pitch):                            │
│   [____________________________________]                │
│                                                          │
│                                                          │
│                                                          │
│                          [Back]  [Continue →]           │
└─────────────────────────────────────────────────────────┘
```

**Desktop:** 800px centered container, ample whitespace  
**Mobile:** Full-width, single column, larger touch targets  

---

## SCREENS & ROUTES

### Step 1: Business Basics
**Route:** /app/wizard/startup-profile?step=1  
**Fields:** Problem, Solution, One-liner  
**AI:** Input validation suggestions (Extractor)

### Step 2: Market Context
**Route:** /app/wizard/startup-profile?step=2  
**Fields:** Industry, Target customer, Competitors  
**AI:** TAM/SAM/SOM calculation (Analyst + Retriever)

### Step 3: Team
**Route:** /app/wizard/startup-profile?step=3  
**Fields:** Co-founders (name, role, LinkedIn)  
**AI:** LinkedIn enrichment (Retriever + Extractor)

### Step 4: Traction
**Route:** /app/wizard/startup-profile?step=4  
**Fields:** Users, MRR, Customers, Growth rate  
**AI:** Validation warnings for inconsistencies (Analyst)

### Step 5: Fundraising
**Route:** /app/wizard/startup-profile?step=5  
**Fields:** Goal, Stage, Timeline, Use of funds  
**AI:** Validation (realistic goals)

### Step 6: Review & Generate
**Route:** /app/wizard/startup-profile?step=6  
**Display:** All entered data, editable  
**AI:** Generate pitch deck (Orchestrator + Content)

---

## FEATURES: CORE VS ADVANCED

### Core Features (Manual, No AI)

| Feature | Description | User Action |
|---------|-------------|-------------|
| 6-step form | Linear wizard flow | Fill out fields |
| Progress indicator | Shows 1/6, 2/6, etc. | Visual feedback |
| Field validation | Required fields, character limits | See errors |
| Save draft | Auto-save every 30 seconds | Resume later |
| Navigate steps | Back/Continue buttons | Move between steps |

### Advanced Features (AI-Powered)

| Feature | Agent | Model | Input | Output | Approval |
|---------|-------|-------|-------|--------|----------|
| **LinkedIn Enrichment** | Retriever + Extractor | Flash | LinkedIn URL | Name, title, bio, education | Controller + Human |
| **TAM Calculation** | Analyst + Retriever | Pro | Industry, target, pricing | TAM/SAM/SOM + sources | Controller + Human |
| **Input Validation** | Extractor | Flash | Free-text input | Clarity suggestions | Auto-approved |
| **Deck Generation** | Orchestrator + Content | Pro | All wizard data | 12-slide pitch deck | Controller + Human |

---

## CONTENT & DATA

### Step 1 Data Schema
```
Business Basics:
  problem: text (500 chars max)
  solution: text (500 chars max)
  one_liner: text (150 chars max)
```

### Step 2 Data Schema
```
Market Context:
  industry: dropdown (B2B SaaS, FinTech, etc.)
  target_customer: text (300 chars)
  competitors: text[] (list of names)
  tam: decimal (AI-calculated)
  sam: decimal (AI-calculated)
  som: decimal (AI-calculated)
  market_sources: citation[] (AI-provided)
```

### Step 3 Data Schema
```
Team:
  founders: founder[]
    - id: uuid
    - full_name: text
    - role: text
    - linkedin_url: text
    - avatar_url: text (AI-scraped)
    - bio: text (AI-scraped)
    - education: text[] (AI-scraped)
    - experience: experience[] (AI-scraped)
```

### Step 4 Data Schema
```
Traction:
  active_users: integer
  mrr: decimal
  customers: integer
  growth_rate: decimal (percent)
  launched_date: date
```

### Step 5 Data Schema
```
Fundraising:
  goal: decimal (e.g., 3000000 for $3M)
  stage: text (Seed, Series A, etc.)
  timeline: text (e.g., "Next 3 months")
  use_of_funds: text (500 chars)
```

---

## USE CASES (3 REAL-WORLD EXAMPLES)

### Use Case 1: Solo Founder with LinkedIn

**Persona:** Sarah, solo founder, technical background, first-time entrepreneur

**Scenario:**
- Sarah signs up, lands on Step 1
- Completes Business Basics in 2 minutes (problem, solution, one-liner)
- Step 2: Selects industry "B2B SaaS", describes target "remote startups"
- AI calculates TAM $28B, SAM $3.2B, SOM $120M with 10 sources
- She reviews sources (Gartner, CB Insights), clicks "Looks good"
- Step 3: Pastes her LinkedIn URL
- AI scrapes profile in 5 seconds, shows preview card
- She reviews: Name, title, bio, education all correct
- Clicks "Approve" → Auto-filled
- Completes Steps 4-5 in 3 minutes
- Step 6: Reviews all data, clicks "Generate Deck"
- 30 seconds later, 12-slide deck appears
- Downloads deck, clicks "Go to Dashboard"

**Time:** 12 minutes total (vs 45 manual)

**Value:** Profile 78% complete, deck ready for investors

---

### Use Case 2: Team of 3 Co-founders

**Persona:** TechFlow team (Sarah CEO, Mike CTO, Lisa COO), experienced

**Scenario:**
- Sarah starts wizard, completes Steps 1-2 (5 minutes)
- Step 3: Adds 3 co-founders
- Pastes LinkedIn URLs for all 3
- AI enriches in parallel (10 seconds total)
- Preview shows all 3 profiles with avatars, bios, education
- Sarah clicks "Approve All" → All 3 auto-filled
- Mike takes over, completes Step 4 (traction: 847 users, $12.5K MRR)
- AI validates: ARPU $14.76 seems reasonable ✓
- Lisa completes Step 5 (fundraising: $3M Seed, 3 months)
- Step 6: Team reviews together, edits one-liner
- Generates deck, exports to Google Slides
- All 3 review deck, make minor edits, ready to pitch

**Time:** 15 minutes total (vs 60+ manual)

**Value:** Complete profile, team aligned, deck ready

---

### Use Case 3: Non-technical Founder, No Market Data

**Persona:** Mike, non-technical founder, creative background, no finance knowledge

**Scenario:**
- Mike completes Step 1 (problem, solution)
- Step 2: Doesn't know TAM/SAM/SOM
- Selects industry "Consumer Social", describes target "Gen Z creators"
- Clicks "Calculate Market Size"
- AI searches reports, calculates: TAM $180B, SAM $12B, SOM $450M
- Shows sources: Statista, McKinsey, eMarketer
- Mike doesn't understand calculation
- Clicks "How is this calculated?" → Help tooltip appears
- Reads: "TAM = total market, SAM = your segment, SOM = what you can capture in 3 years"
- Clicks "Add to Profile" → Saves TAM/SAM/SOM
- Continues to Step 3, doesn't have LinkedIn
- Clicks "Manual Entry" tab → Fills name, role, bio manually
- Completes wizard in 18 minutes
- Deck generated with market size slide showing calculation

**Time:** 18 minutes (vs wouldn't complete manual)

**Value:** Learned market sizing, profile complete, confident

---

## WORKFLOWS & USER JOURNEYS

### Main User Journey
```
Signup → Email Verify → Wizard Step 1 → Step 2 → Step 3 → Step 4 → Step 5 → Step 6 → Review → Generate Deck → Dashboard
```

### Workflow 1: LinkedIn Enrichment
```
User pastes LinkedIn URL
  ↓
Retriever: Scrape LinkedIn profile (5 seconds)
  ↓
Extractor: Parse structured data (name, title, bio, education, experience)
  ↓
Controller: Validate data quality (check completeness)
  ↓
Display preview modal with all fields
  ↓
Human reviews → Clicks "Approve" OR "Edit"
  ↓
If Approve: Auto-fill fields, close modal
If Edit: Show edit form, user modifies, saves
  ↓
Mark founder as complete
```

**Approval Gate:** Controller validates scrape quality, Human approves data

---

### Workflow 2: TAM/SAM/SOM Calculation
```
User selects industry + describes target market
  ↓
Retriever: Search market reports (Gartner, CB Insights, Statista)
  ↓
Analyst: Calculate TAM (top-down from industry size)
  ↓
Analyst: Calculate SAM (segment of TAM matching target)
  ↓
Analyst: Calculate SOM (bottoms-up: target customers × pricing × 3 years)
  ↓
Retriever: Find citations for all numbers
  ↓
Controller: Validate sources (credibility check)
  ↓
Display results with breakdown + 10 sources
  ↓
Human reviews sources → Clicks "Add to Profile"
  ↓
Save TAM/SAM/SOM to profile
```

**Approval Gate:** Controller validates sources, Human reviews calculations

---

### Workflow 3: Pitch Deck Generation
```
User completes 6 steps, clicks "Generate Deck"
  ↓
Orchestrator: Coordinate extraction of all wizard data
  ↓
Extractor: Structure data into deck template format
  ↓
Content/Comms: Generate slide content (titles, bullets, speaker notes)
  ↓
Analyst: Create charts (market size, traction, financials)
  ↓
Controller: Validate deck completeness (all 12 slides present)
  ↓
Display loading animation: "Analyzing profile... ✓ Generating slides... ✓ Adding charts... ✓"
  ↓
Show deck preview (first 3 slides visible)
  ↓
Human reviews → Clicks "View Full Deck" OR "Regenerate"
  ↓
If View: Open deck in new tab
If Regenerate: Adjust settings, regenerate
  ↓
Deck saved to profile, downloadable as PDF/PPTX
```

**Approval Gate:** Controller validates completeness, Human reviews deck

---

## AI AGENTS & AUTOMATIONS

### Agents Used

| Agent | Role | Model | Tools |
|-------|------|-------|-------|
| **Orchestrator** | Coordinate 6-step flow, deck generation | Pro | Function calling, Structured outputs |
| **Retriever** | Scrape LinkedIn, search market data | Flash | URL Context, Grounding with Search |
| **Extractor** | Parse structured data, validate inputs | Flash | Structured outputs, Text generation |
| **Analyst** | Calculate TAM/SAM/SOM, validate consistency | Pro | Code execution, Gemini Thinking |
| **Content/Comms** | Generate deck content, speaker notes | Pro | Text generation |
| **Controller** | Approval gate for all AI actions | Pro | Function calling |

### Automations

| Trigger | Action | Frequency |
|---------|--------|-----------|
| User lands on wizard | Load draft if exists | On page load |
| User types in field | Auto-save to draft | Every 30 seconds |
| User completes step | Save progress | On "Continue" click |
| User pastes LinkedIn URL | Trigger enrichment | On paste + blur |
| User abandons wizard | Send reminder email | 24 hours later |
| User completes wizard | Generate deck + profile | On final "Approve" |
| Profile created | Send welcome email | Immediately |
| Profile created | Calculate completeness score | Immediately |

---

## GEMINI 3 FEATURES & TOOLS

### Model Selection

**Flash (4 use cases):**
- LinkedIn enrichment (fast scraping)
- Input extraction (quick parsing)
- Field validation (lightweight checks)
- Auto-save (background processing)

**Pro (3 use cases):**
- TAM calculation (deep reasoning)
- Deck generation (high-quality content)
- Orchestration (complex coordination)

### Tools Used

| Tool | Use Case | Screen |
|------|----------|--------|
| **URL Context** | Scrape LinkedIn profiles | Step 3 |
| **Grounding with Search** | Find market reports for TAM | Step 2 |
| **Code Execution** | Calculate TAM/SAM/SOM formulas | Step 2 |
| **Structured Outputs** | Enforce data schemas | All steps |
| **Text Generation** | Generate deck content | Step 6 |
| **Gemini Thinking** | Validate input consistency | Steps 4-5 |
| **Function Calling** | Trigger deck generation | Step 6 |

---

## MULTI-STEP DESIGN PROMPTS

### Prompt 1: Overall Wizard Structure
```
Design a 6-step onboarding wizard for a startup operating system. 
Requirements:
- Full-screen layout, 800px centered container on desktop
- Progress bar at top showing "Step 1 of 6" with visual indicator
- Large step title (e.g., "Business Basics")
- Form fields with labels, placeholders, and helper text
- Character counters for text areas (e.g., "245/500")
- Bottom navigation: "Back" (secondary) and "Continue" (primary) buttons
- "Save Draft" link in top-right corner
- Clean, minimal design with pastel accent colors (blue, purple, pink)
- White background, ample whitespace
- Mobile: Full-width, single column, larger touch targets

Visual style: Modern, friendly, approachable, not corporate
Color palette: White background, soft blue (#6366F1) for primary actions, gray text (#6B7280)
```

### Prompt 2: Step 3 - LinkedIn Enrichment
```
Design the Team step (Step 3) with LinkedIn enrichment feature.
Requirements:
- "Add Co-founder" button opens modal
- Modal has two tabs: "LinkedIn URL" (default) and "Manual Entry"
- LinkedIn tab: Large input field with placeholder "Paste LinkedIn URL"
- "Enrich Profile" button below input (primary blue)
- On click, show loading spinner with text "Scraping profile..."
- After 5 seconds, display preview card:
  - Avatar (circle, 80px)
  - Name (large, bold)
  - Title @ Company (medium, gray)
  - Bio snippet (3 lines)
  - Education (2 items)
  - "Edit" and "Approve" buttons
- On approve, card slides into main screen, modal closes
- Main screen shows founder cards in grid (2 per row on desktop)
- Each card: Avatar, name, role, LinkedIn icon, "Remove" button

Visual style: Glassmorphism modal, smooth animations, trustworthy design
Use real example: "Sarah Johnson, Partner @ Sequoia Capital"
```

### Prompt 3: Step 6 - Review & Generate
```
Design the final review screen (Step 6) with deck generation.
Requirements:
- Title "Review Your Profile"
- Expandable sections (accordion style):
  1. Business Basics ✓
  2. Market Context ✓
  3. Team ✓
  4. Traction ✓
  5. Fundraising ✓
- Each section shows summary, "Edit" button jumps back to that step
- Completeness score at top: "Profile: 78% Complete"
- Large "Generate Pitch Deck" button at bottom (gradient blue to purple)
- On click, show progress modal:
  - "Generating your pitch deck..."
  - Animated progress bar
  - Checklist items appearing: "✓ Analyzing profile" → "✓ Creating slides" → "✓ Adding charts" → "✓ Done!"
- Success state: Confetti animation, "View Deck" and "Go to Dashboard" buttons

Visual style: Celebratory, accomplishment, smooth animations
Show estimated time: "This usually takes 30 seconds"
```

---

## ACCEPTANCE CRITERIA

### Functional
- [ ] All 6 steps load without errors
- [ ] Progress bar updates correctly
- [ ] LinkedIn enrichment returns data in <10 seconds
- [ ] TAM calculation returns results with sources
- [ ] Auto-save works (draft persists on refresh)
- [ ] Deck generation creates 12 slides
- [ ] All fields validate properly
- [ ] Back/Continue navigation works
- [ ] Mobile responsive (tested on iPhone, Android)

### Performance
- [ ] Page load <2 seconds
- [ ] LinkedIn scrape <10 seconds
- [ ] TAM calculation <30 seconds
- [ ] Deck generation <60 seconds
- [ ] Auto-save no noticeable lag

### Quality
- [ ] 90%+ users complete wizard
- [ ] 90%+ LinkedIn enrichment accuracy
- [ ] 70%+ profile completeness after wizard
- [ ] <5% users report errors
- [ ] Deck requires <30% edits on average

---

**Task Owner:** Design + Engineering Team  
**Review Cadence:** Daily standups during implementation  
**Target Completion:** Week 2 of Phase 1  

---

**END OF TASK 01**
