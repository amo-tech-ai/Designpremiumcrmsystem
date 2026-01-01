# TASK 05: Contacts — CRM with LinkedIn Enrichment

**Priority:** 5 (After Profile)  
**Est. Days:** 6 days  
**Route:** /app/contacts  
**Type:** Dashboard  
**Dependencies:** Startup Profile (fit scoring context)  

---

## SUMMARY MATRIX

| Screen | Features | Agents | Gemini Model | Status | Progress |
|--------|----------|--------|--------------|--------|----------|
| Contacts | 3 Advanced | 3 | Flash + Pro | 🔴 Not Started | 0% |

### Features Breakdown

| Feature | Type | Agent | Model | Approval Gate |
|---------|------|-------|-------|---------------|
| LinkedIn Enrichment | Advanced | Retriever + Extractor | Flash | Controller + Human |
| Lead Scoring | Advanced | Scorer | Pro | Controller validates |
| Duplicate Detection | Advanced | Analyst | Pro | Controller + Human |

### Implementation Progress

| Step | Task | Est. Hours | Status | Dependencies |
|------|------|------------|--------|--------------|
| 1 | Design list/grid views | 10h | ⬜ | None |
| 2 | Build contact forms | 8h | ⬜ | Step 1 |
| 3 | Implement LinkedIn enrichment | 10h | ⬜ | Step 2 |
| 4 | Build lead scoring | 8h | ⬜ | Steps 2-3 |
| 5 | Add duplicate detection | 6h | ⬜ | Step 2 |
| 6 | Bulk import CSV | 6h | ⬜ | Step 2 |
| 7 | Testing + QA | 8h | ⬜ | All above |
| **Total** | **7 tasks** | **56h** | **0/7** | — |

---

## DESCRIPTION

CRM for managing all relationships (investors, customers, advisors, partners). Features one-click LinkedIn enrichment and AI-powered lead scoring.

---

## PURPOSE

Centralize all contacts in one place. Auto-enrich from LinkedIn to save time. Score investor fit to prioritize outreach.

---

## GOALS

1. **Adoption:** 100+ contacts per user within 30 days
2. **Enrichment:** 90%+ LinkedIn enrichment accuracy
3. **Scoring:** 75%+ fit score correlation with closes
4. **Time Savings:** 15 minutes saved per contact vs manual entry
5. **Data Quality:** <2% duplicate contacts

---

## 3-PANEL LAYOUT LOGIC

### Core Model: **Context + Work + Intelligence**

**Left Panel = Context (240px)**
- Main navigation
- Contact filters (All, Investors, Customers, etc.)
- Tags list

**Main Panel = Work (900px)**
- Contacts table/grid
- Search & filters
- Add contact button

**Right Panel = Intelligence (360px)**
- Quick add contact form
- AI suggestions for duplicates
- Relationship insights

**Layout:**
```
┌────────┬────────────────────────────────────┬──────────┐
│ Nav    │ Contacts (127)      [+ Add] [↓CSV]│ Quick Add│
│        │────────────────────────────────────│          │
│ • Home │ [Search...] [Filter▼] [Sort▼] [⚙] │ Paste    │
│ • Cont │────────────────────────────────────│ LinkedIn │
│ • Pipe │ Name     Company   Role    Score   │ URL:     │
│        │────────────────────────────────────│ [______] │
│ Filters│ Sarah J. Sequoia   Partner  87 🟢 │          │
│ ○ All  │ Mike C.  Acme VC   Princip. 82 🟢 │ [Enrich] │
│ ○ Invest│ Jane D. TechCorp   CTO      —     │          │
│ ○ Custom│ Tom W.  StartupXYZ Founder  —     │ OR       │
│        │────────────────────────────────────│          │
│ Tags   │ [View 127 contacts...]             │ Manual   │
│ # vc   │                                    │ Name:    │
│ # b2b  │                                    │ [______] │
└────────┴────────────────────────────────────┴──────────┘
```

---

## CONTENT & DATA

### Contact Schema
```
Contact:
  full_name: text
  email: text
  phone: text
  linkedin_url: text
  
  company_name: text
  company_id: uuid (ref companies)
  role: text
  location: text
  
  type: text (investor, customer, advisor, partner)
  tags: text[]
  
  fit_score: decimal (0-100, for investors only)
  enriched_data: jsonb (full LinkedIn profile)
  mutual_connections: jsonb[]
  
  last_contacted: timestamp
  relationship_strength: text (cold, warm, hot)
  created_at: timestamp
```

### Enriched LinkedIn Data
```
EnrichedData:
  avatar_url: text
  bio: text (500 chars)
  headline: text
  experience: experience[]
    - company: text
    - title: text
    - duration: text
    - description: text
  education: education[]
    - school: text
    - degree: text
    - field: text
    - years: text
  skills: text[]
  connections_count: integer
```

---

## USE CASES (3 REAL-WORLD EXAMPLES)

### Use Case 1: LinkedIn Bulk Import

**Persona:** Sarah, met 20 investors at conference

**Scenario:**
- Returns from TechCrunch Disrupt with 20 LinkedIn URLs
- Opens Contacts → Clicks "Add Contact"
- Switches to "Bulk Import" tab
- Pastes 20 URLs (one per line)
- Clicks "Enrich All"
- Loading: "Enriching 20 profiles..." (30 seconds)
- Preview grid shows all 20 contacts:
  - Avatars, names, titles, companies
  - Fit scores calculated (range: 72-92)
- She reviews, unchecks 2 duplicates
- Clicks "Import 18 Contacts"
- Success: All 18 added, sorted by fit score
- Top 5 marked with "High Priority" tag

**Time:** 2 minutes (vs 60+ minutes manual)  
**Value:** Time saved, fit scores for prioritization

---

### Use Case 2: Duplicate Detection & Merge

**Persona:** Mike, accidentally adds same person twice

**Scenario:**
- Adds "Sarah Johnson, Sequoia Capital" manually
- Later, imports CSV with "S. Johnson, Sequoia"
- System detects possible duplicate
- Modal appears: "Possible duplicate found"
- Side-by-side comparison:
  - Left: Sarah Johnson (manual entry, minimal data)
  - Right: S. Johnson (CSV import, has email)
- Confidence: 87% match (name similarity + company match)
- Options: "Merge" or "Keep Separate"
- Mike clicks "Merge"
- Selects which fields to keep (takes email from CSV, name from manual)
- Clicks "Merge Contacts"
- One clean contact remains: "Sarah Johnson, sarah@sequoiacap.com"
- Activity history preserved from both

**Time:** 1 minute  
**Value:** Clean database, no duplicates

---

### Use Case 3: Re-engagement Suggestions

**Persona:** TechFlow, has 15 "cold" contacts (no interaction in 60+ days)

**Scenario:**
- Opens Contacts, sorts by "Relationship Strength"
- Sees 15 contacts with "Cold" badge (red)
- All are high-fit investors (scores 80+)
- AI Insight (right panel): "15 high-fit investors have gone cold. Re-engage with warm intro email?"
- Clicks "View Cold Contacts" → Filter applied
- Selects 5 investors with highest fit scores
- Bulk action: "Draft Re-engagement Email"
- AI generates 5 personalized emails:
  - "Hi Sarah, following up on our conversation from Oct..."
  - References last interaction, adds new milestone
- Team reviews, edits 2 emails
- Sends all 5
- 3 respond within 48 hours
- Relationship strength updates to "Warm" (yellow)

**Time:** 10 minutes  
**Value:** Re-activated dormant relationships

---

## WORKFLOWS & USER JOURNEYS

### Main User Journey
```
Open Contacts → Toggle view (table/grid) → Click "Add Contact" → Paste LinkedIn URL → AI enriches → Preview → Edit tags → Save → Contact appears with fit score
```

### Workflow 1: LinkedIn Enrichment
```
User pastes LinkedIn URL
  ↓
Retriever: Scrape LinkedIn profile
  - Use URL Context tool
  - Extract: Name, title, company, bio, education, experience
  - Timeout: 10 seconds max
  ↓
Extractor: Parse structured data
  - Enforce contact schema
  - Normalize fields (title case names)
  - Validate email format
  ↓
Scorer: Calculate fit score (if investor)
  - Compare to startup profile
  - Industry match × 0.25
  - Stage match × 0.25
  - Check size × 0.20
  - Portfolio overlap × 0.15
  - Geography × 0.10
  - Connections × 0.05
  ↓
Retriever: Find mutual connections
  - Search LinkedIn connections API
  - Filter to 2nd degree
  - Return top 5 mutual contacts
  ↓
Controller: Validate all data
  - Check enrichment completeness (>60% fields filled)
  - Verify fit score calculation
  - Flag for human review
  ↓
Display preview modal:
  - Avatar, name, title, company
  - Fit score badge (87/100 🟢)
  - Bio snippet
  - Education (2 items)
  - Mutual connections (2)
  - Edit button, Approve button
  ↓
Human reviews → Clicks "Approve" OR "Edit"
  ↓
If Approve: Save contact, close modal
If Edit: Show edit form, user modifies, saves
  ↓
Add to contacts list, sorted by fit score
```

**Approval Gate:** Controller validates data quality, Human approves addition

---

### Workflow 2: Lead Scoring
```
Contact added (investor type)
  ↓
Scorer: Gather comparison data
  - Startup industry: "B2B SaaS"
  - Startup stage: "Seed"
  - Startup check size target: "$3M"
  - Contact focus: "B2B SaaS, AI/ML"
  - Contact stages: "Seed, Series A"
  - Contact check size: "$500K-$10M"
  ↓
Scorer: Calculate component scores
  industry_match = (investor_focus ∩ startup_industry) / total
    → 100% (perfect match)
  
  stage_match = (investor_stages ∩ startup_stage) / total
    → 100% (Seed in range)
  
  check_size_match = check within range ? 1 : 0
    → 100% ($3M in $500K-$10M range)
  
  portfolio_overlap = similar companies / total portfolio
    → 80% (3 similar out of 20 portfolio)
  
  geography_match = same city ? 1 : 0.5
    → 100% (both San Francisco)
  
  connections_match = mutual_connections > 0 ? 1 : 0
    → 0% (no mutual connections yet)
  ↓
Scorer: Calculate weighted score
  fit_score = (
    industry_match × 0.25 +     → 0.25
    stage_match × 0.25 +        → 0.25
    check_size_match × 0.20 +   → 0.20
    portfolio_overlap × 0.15 +  → 0.12
    geography_match × 0.10 +    → 0.10
    connections_match × 0.05    → 0.00
  ) × 100
  
  = 0.92 × 100 = 92/100
  ↓
Controller: Validate score
  - Check all components sum correctly
  - Verify no division by zero errors
  - Sanity check: Score between 0-100
  ↓
Save fit_score to contact record
  ↓
Display badge: "92/100 🟢 Excellent Match"
```

**Approval Gate:** Controller validates calculation

---

## AI AGENTS & AUTOMATIONS

### Agents Used

| Agent | Role | Model | Tools |
|-------|------|-------|-------|
| **Retriever** | Scrape LinkedIn, find connections | Flash | URL Context, Grounding with Search |
| **Extractor** | Parse structured data | Flash | Structured outputs, Text generation |
| **Scorer** | Calculate fit scores | Pro | Gemini Thinking, Code execution |
| **Analyst** | Duplicate detection | Pro | Gemini Thinking |
| **Controller** | Approval gate | Pro | Function calling |

### Automations

| Trigger | Action | Frequency |
|---------|--------|-----------|
| Contact added | Calculate fit score | Real-time |
| Contact updated | Recalculate score | Real-time |
| Duplicate detected | Show merge modal | Real-time |
| Relationship cold (60+ days) | Suggest re-engagement | Weekly |
| High-fit contact added | Notify team | Real-time |

---

## GEMINI 3 FEATURES & TOOLS

### Model Selection

**Flash (2 use cases):**
- LinkedIn enrichment (fast scraping)
- Data extraction (quick parsing)

**Pro (2 use cases):**
- Fit scoring (complex calculation)
- Duplicate detection (similarity analysis)

### Tools Used

| Tool | Use Case |
|------|----------|
| **URL Context** | Scrape LinkedIn profiles |
| **Structured Outputs** | Enforce contact schema |
| **Gemini Thinking** | Calculate fit scores, detect duplicates |
| **Code Execution** | Run scoring formulas |
| **Grounding with Search** | Find mutual connections |

---

## MULTI-STEP DESIGN PROMPTS

### Prompt 1: Contacts List View
```
Design contacts list page with dual view modes (table and grid).
Requirements:
- Top bar:
  - Title "Contacts (127)" on left
  - Search box (icon + placeholder "Search contacts...")
  - Filter dropdown: "All Contacts" with options (All, Investors, Customers, Advisors, Partners)
  - Sort dropdown: "Sort by Score" with options (Score, Name, Updated, Added)
  - View toggle: Table icon / Grid icon (toggle between views)
  - "+ Add Contact" button (primary blue)
  - "↓ Import CSV" button (secondary)
- Table view (default):
  - Columns: Avatar (40px circle), Name, Company, Role, Score (with colored badge), Tags (pills), Last Updated
  - Rows: 20 per page, hover effect (slight shadow)
  - Click row → Open contact detail page
  - Checkbox for bulk selection (left of avatar)
- Grid view:
  - Cards: 4 per row on desktop, 2 on tablet, 1 on mobile
  - Each card: Avatar (80px), Name (bold), Company + Role (gray), Score badge, Tags
- Empty state: "No contacts yet. Add your first contact to get started."

Visual style: Clean, scannable, data-dense but readable
Color palette: White background, blue for investors, green for customers
```

### Prompt 2: Add Contact Modal with LinkedIn Enrichment
```
Design "Add Contact" modal with two tabs: LinkedIn URL and Manual Entry.
Requirements:
- Modal: 600px wide, centered, glassmorphism background blur
- Header: "Add Contact" with close X button
- Tabs: "LinkedIn URL" (default), "Manual Entry"
- LinkedIn tab:
  - Large input field: "Paste LinkedIn URL here"
  - Placeholder: "https://linkedin.com/in/sarahjohnson"
  - "Enrich Profile" button below (primary blue)
  - After click, show loading:
    - Spinner animation
    - Text: "Scraping profile... Calculating fit score... Finding mutual connections..."
    - Progress: 3 steps with checkmarks appearing
  - Preview card appears (400px wide):
    - Avatar (120px circle, top-center)
    - Name (large, bold): "Sarah Johnson"
    - Title @ Company (gray): "Partner @ Sequoia Capital"
    - Fit Score badge (top-right): "87/100 🟢"
    - Bio snippet (3 lines): "Investor focusing on B2B SaaS..."
    - Education: "Stanford MBA" + "MIT EECS"
    - Mutual Connections: "2 mutual contacts: Jane Doe, Mike Chen"
  - Edit button (pencil icon) on each field
  - Bottom buttons: "Cancel" (gray), "Add to CRM" (blue)
- Manual Entry tab:
  - Form fields: Name, Email, Company, Role, LinkedIn URL, Tags
  - Same bottom buttons

Visual style: Modern, trustworthy, smooth animations
Show confidence indicators: "95% confident this is the correct profile"
```

### Prompt 3: Duplicate Detection Modal
```
Design side-by-side comparison modal for duplicate contacts.
Requirements:
- Modal: 800px wide, centered
- Title: "Possible duplicate contact detected"
- Subtitle: "We found a contact that might be the same person. Choose which data to keep."
- Confidence badge: "87% match" (yellow background)
- Two columns (equal width):
  - Left: "Existing Contact" (blue border)
  - Right: "New Contact" (gray border)
- Fields to compare (vertical list):
  - Name: Radio buttons to select which value
  - Email: Radio buttons
  - Company: Radio buttons
  - Role: Radio buttons
  - LinkedIn URL: Radio buttons
  - Tags: Checkboxes (can select from both)
  - Notes: Preserve both in merge
- Highlight differences in yellow background
- "Smart Merge" button: Auto-selects most complete data (AI recommendation)
- Bottom buttons:
  - "Merge Contacts" (primary green)
  - "Keep Separate" (secondary gray)
  - "Cancel" (text link)
- After merge, show success animation: Checkmark + "Contacts merged successfully"

Visual style: Clear comparison, visual diff, safe action flow
Show preview of merged result before finalizing
```

---

## ACCEPTANCE CRITERIA

### Functional
- [ ] Table and grid views display correctly
- [ ] LinkedIn enrichment returns data in <10 seconds
- [ ] Fit scores calculate accurately for investors
- [ ] Duplicate detection triggers on name + company match
- [ ] CSV import handles 100+ contacts
- [ ] Search filters contacts instantly
- [ ] Bulk actions work (tag, delete, export)
- [ ] Contact detail page shows full profile

### Performance
- [ ] Contacts list loads <2 seconds (100 contacts)
- [ ] LinkedIn scrape <10 seconds
- [ ] Fit score calculation <1 second
- [ ] Search results instant (<500ms)

### Quality
- [ ] 90%+ LinkedIn enrichment accuracy
- [ ] 75%+ fit score correlation with closes
- [ ] <2% duplicate contacts
- [ ] 100+ contacts per user in 30 days

---

**Task Owner:** Design + Engineering Team  
**Review Cadence:** Daily standups  
**Target Completion:** Week 6 of Phase 2  

---

**END OF TASK 05**
