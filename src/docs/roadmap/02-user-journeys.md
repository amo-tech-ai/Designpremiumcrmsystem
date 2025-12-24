# 02 - User Journeys & Workflows

**Date:** December 22, 2025  
**Status:** Journey Mapping  
**Focus:** End-to-end user flows with AI touchpoints

---

## 🎯 Core User Journeys

### Journey 1: Pitch Deck Creation (End-to-End)

```mermaid
journey
    title Founder Creates Investor Pitch Deck
    section Discovery
      Browse templates: 5: Founder
      View examples: 4: Founder
    section Input
      Fill wizard (4 steps): 3: Founder
      Add company details: 4: Founder
      Upload logo: 4: Founder
    section AI Generation
      AI generates 12 slides: 5: Founder, AI
      Review generated content: 4: Founder
      Get quality score: 5: Founder, AI
    section Editing
      Customize slides: 5: Founder
      Get AI suggestions: 5: Founder, AI
      Refine messaging: 4: Founder
    section Analysis
      Run deck analyzer: 5: Founder, AI
      Review recommendations: 5: Founder
      Implement changes: 4: Founder
    section Export
      Export to PDF: 5: Founder
      Share with investors: 5: Founder
```

**Detailed Flow:**

```mermaid
flowchart TD
    Start([Founder logs in]) --> Dashboard[View Dashboard]
    Dashboard --> CreateDeck{Choose Action}
    
    CreateDeck -->|New Deck| Template[Select Template]
    CreateDeck -->|Use AI| Wizard[Start Wizard]
    
    Template --> Wizard
    
    Wizard --> Step1[Step 1: Business Context]
    Step1 --> Step2[Step 2: Aesthetic]
    Step2 --> Step3[Step 3: Details]
    Step3 --> Step4[Step 4: Financials]
    
    Step4 --> Generate[Click Generate]
    Generate --> AIGenerate[AI: Generate Deck<br/>Gemini 1.5 Pro]
    
    AIGenerate --> Poll[Poll Status<br/>Every 2 seconds]
    Poll --> Status{Status?}
    
    Status -->|Generating| Poll
    Status -->|Complete| Redirect[Redirect to Editor]
    Status -->|Error| ErrorMsg[Show Error]
    
    Redirect --> Editor[Pitch Deck Editor]
    
    Editor --> EditActions{User Action}
    
    EditActions -->|Edit Slide| ModifySlide[Modify Content]
    EditActions -->|AI Rewrite| SlideAI[AI: Rewrite Slide<br/>Gemini 2.0 Flash]
    EditActions -->|Add Image| ImageGen[AI: Generate Image<br/>Unsplash]
    EditActions -->|Analyze| Analyze[AI: Analyze Deck<br/>Gemini 2.0 Flash]
    
    ModifySlide --> Save[Auto-save]
    SlideAI --> Save
    ImageGen --> Save
    
    Analyze --> ShowScore[Show Score + Tips]
    ShowScore --> Implement[Implement Changes]
    Implement --> Save
    
    Save --> ExportChoice{Export?}
    
    ExportChoice -->|Yes| ExportFormat{Format?}
    ExportChoice -->|Continue| EditActions
    
    ExportFormat -->|PDF| ExportPDF[Generate PDF]
    ExportFormat -->|PPTX| ExportPPTX[Generate PPTX]
    
    ExportPDF --> Download[Download File]
    ExportPPTX --> Download
    
    Download --> Share[Share with Investors]
    Share --> End([Journey Complete])
```

**AI Touchpoints:**
1. **Initial Generation** - Gemini 1.5 Pro (60s)
2. **Slide Rewriting** - Gemini 2.0 Flash (3s)
3. **Deck Analysis** - Gemini 2.0 Flash (5s)
4. **Image Suggestions** - Unsplash API (1s)

**Success Metrics:**
- Time to first deck: <5 minutes
- Deck quality score: >75/100
- User satisfaction: >4.5/5
- Completion rate: >80%

---

### Journey 2: CRM Lead Management with AI Scoring

```mermaid
journey
    title Sales Leader Manages Leads with AI
    section Discovery
      Import LinkedIn contacts: 4: Sales Leader
      View lead list: 5: Sales Leader
    section AI Enrichment
      AI enriches profiles: 5: Sales Leader, AI
      AI scores leads 1-100: 5: Sales Leader, AI
      AI prioritizes hot leads: 5: Sales Leader, AI
    section Outreach
      AI writes personalized emails: 5: Sales Leader, AI
      Review and send: 4: Sales Leader
      Track responses: 5: Sales Leader
    section Pipeline
      Move leads through stages: 4: Sales Leader
      AI creates follow-up tasks: 5: Sales Leader, AI
      AI suggests next actions: 5: Sales Leader, AI
    section Analysis
      View AI insights: 5: Sales Leader, AI
      Get GTM strategy: 5: Sales Leader, AI
      Optimize process: 4: Sales Leader
```

**Detailed Flow:**

```mermaid
flowchart TD
    Start([Sales Leader logs in]) --> CRM[Navigate to Contacts]
    
    CRM --> AddContact{Add Contact}
    
    AddContact -->|Manual| Form[Fill Form]
    AddContact -->|Import| Import[Import CSV/LinkedIn]
    
    Form --> Save[Save Contact]
    Import --> Save
    
    Save --> TriggerAI[Trigger AI Pipeline]
    
    TriggerAI --> Enrich[AI: Enrich Profile<br/>LinkedIn data]
    Enrich --> Score[AI: Score Lead<br/>Gemini 2.0 Flash]
    Score --> Tasks[AI: Generate Tasks<br/>Based on priority]
    
    Tasks --> UpdateDB[Update Database]
    UpdateDB --> Notify[Notify User]
    
    Notify --> ViewContact[View Contact Detail]
    
    ViewContact --> ContactActions{Action?}
    
    ContactActions -->|Email| GenerateEmail[AI: Write Email<br/>Gemini 2.0 Flash]
    ContactActions -->|Research| Research[AI: Company Research<br/>Gemini 1.5 Pro + Search]
    ContactActions -->|Move Stage| Pipeline[Update Pipeline]
    
    GenerateEmail --> ReviewEmail[Review & Edit]
    ReviewEmail --> SendEmail[Send Email]
    SendEmail --> LogActivity[Log Activity]
    
    Research --> ShowInsights[Show Research]
    ShowInsights --> LogActivity
    
    Pipeline --> CheckAutomation{Automation Trigger?}
    CheckAutomation -->|Yes| ExecuteAutomation[Execute Actions]
    CheckAutomation -->|No| LogActivity
    
    ExecuteAutomation --> CreateTask[Create Follow-up Task]
    CreateTask --> SendNotif[Send Notification]
    SendNotif --> LogActivity
    
    LogActivity --> Dashboard2[Return to Dashboard]
    Dashboard2 --> End([Journey Complete])
```

**AI Touchpoints:**
1. **Profile Enrichment** - LinkedIn API + AI parsing (10s)
2. **Lead Scoring** - Gemini 2.0 Flash (2s)
3. **Task Generation** - Rule-based + AI (1s)
4. **Email Writing** - Gemini 2.0 Flash (3s)
5. **Company Research** - Gemini 1.5 Pro + Google Search (20s)

**Automation Triggers:**
- Contact added → Auto-enrich + score
- Stage changed → Create tasks
- High score detected → Priority notification
- Email sent → Schedule follow-up

---

### Journey 3: GTM Strategy Development

```mermaid
flowchart TD
    Start([Founder seeks GTM advice]) --> Navigate[Navigate to GTM Strategy]
    
    Navigate --> FormInput[Fill Strategy Form]
    
    FormInput --> CompanyInfo[Enter Company Details<br/>Stage, Product, Market]
    CompanyInfo --> GoalsInput[Define Goals<br/>Revenue, Timeline]
    GoalsInput --> ConstraintsInput[Set Constraints<br/>Budget, Team Size]
    
    ConstraintsInput --> Submit[Submit to AI]
    
    Submit --> AIStrategy[AI: Generate Strategy<br/>Gemini 1.5 Pro<br/>15-20 seconds]
    
    AIStrategy --> Loading[Show Progress<br/>"Analyzing market..."<br/>"Evaluating channels..."<br/>"Creating timeline..."]
    
    Loading --> ShowResults[Display Results]
    
    ShowResults --> ResultSections{View Section}
    
    ResultSections -->|Primary Channel| Channel[Channel Strategy<br/>+ Reasoning]
    ResultSections -->|Timeline| Timeline[3-6 Month Plan<br/>Phases + Activities]
    ResultSections -->|Tactics| Tactics[Prioritized Tactics<br/>Effort/Impact Matrix]
    ResultSections -->|Budget| Budget[Budget Allocation<br/>% per category]
    ResultSections -->|Risks| Risks[Risks + Mitigations]
    
    Channel --> Actions{User Action}
    Timeline --> Actions
    Tactics --> Actions
    Budget --> Actions
    Risks --> Actions
    
    Actions -->|Export| ExportPDF[Export as PDF]
    Actions -->|Save| SaveStrategy[Save to Projects]
    Actions -->|Refine| RefineInput[Adjust Inputs]
    
    RefineInput --> Submit
    
    ExportPDF --> End([Strategy Ready])
    SaveStrategy --> End
```

**AI Features:**
- **Market Analysis** - Gemini 1.5 Pro
- **Channel Selection** - Historical data + AI reasoning
- **Timeline Generation** - Structured output
- **Risk Assessment** - Based on stage and market
- **Budget Optimization** - Cost/benefit analysis

---

## 🤖 AI Agent Integration Patterns

### Pattern 1: Synchronous Request-Response

**Use Cases:** Lead scoring, email generation, quick analysis

```mermaid
sequenceDiagram
    participant User
    participant UI
    participant Service
    participant Agent
    participant Gemini
    
    User->>UI: Click "Score Lead"
    UI->>UI: Show loading spinner
    UI->>Service: scoreContact(contactId)
    Service->>Agent: LeadScorer.scoreContact()
    Agent->>Gemini: Generate score (2.0 Flash)
    Gemini-->>Agent: Return JSON
    Agent-->>Service: Return score
    Service->>DB: Save score
    Service-->>UI: Return result
    UI->>UI: Hide spinner
    UI->>User: Show score + priority
```

**Performance:** 2-5 seconds  
**User Experience:** Inline loading state  
**Error Handling:** Retry 2x, show error message

---

### Pattern 2: Asynchronous Long-Running Task

**Use Cases:** Deck generation, deep research, strategy creation

```mermaid
sequenceDiagram
    participant User
    participant UI
    participant Service
    participant EdgeFunction
    participant Agent
    participant Gemini
    participant DB
    
    User->>UI: Click "Generate Deck"
    UI->>Service: generateDeck(wizardData)
    Service->>EdgeFunction: POST /generate-deck
    EdgeFunction->>DB: Create record (status: generating)
    EdgeFunction-->>Service: Return deckId
    Service-->>UI: Return deckId
    UI->>UI: Navigate to /generating/:id
    UI->>UI: Show progress animation
    
    par Background Processing
        EdgeFunction->>Agent: DeckGenerator.generate()
        Agent->>Gemini: Generate slides (1.5 Pro)
        Gemini-->>Agent: Return slides JSON
        Agent->>DB: Save slides
        Agent->>DB: Update status (complete)
    end
    
    loop Poll every 2 seconds
        UI->>Service: getStatus(deckId)
        Service->>DB: SELECT status
        DB-->>Service: Return status
        Service-->>UI: Return status
        
        alt Status = complete
            UI->>UI: Redirect to editor
        else Status = error
            UI->>UI: Show error
        end
    end
```

**Performance:** 30-60 seconds  
**User Experience:** Progress indicators, status updates  
**Error Handling:** Status tracking, error state, retry option

---

### Pattern 3: Background Automation

**Use Cases:** Auto-enrichment, auto-scoring, task creation

```mermaid
sequenceDiagram
    participant User
    participant UI
    participant Service
    participant DB
    participant Worker
    participant Agent
    participant Gemini
    
    User->>UI: Add contact
    UI->>Service: createContact(data)
    Service->>DB: INSERT contact
    DB-->>Service: Return contact
    Service-->>UI: Success
    UI->>User: Show "Contact added"
    
    Note over Service,Worker: Async processing (no wait)
    
    Service->>Worker: Queue enrichment job
    
    par Background Jobs
        Worker->>Agent: Enrich contact
        Agent->>Gemini: Extract details
        Gemini-->>Agent: Return data
        Agent->>DB: Save enrichment
        
        Worker->>Agent: Score contact
        Agent->>Gemini: Calculate score
        Gemini-->>Agent: Return score
        Agent->>DB: Save score
        
        Worker->>Service: Generate tasks
        Service->>DB: Create tasks
    end
    
    DB->>UI: Realtime update (Supabase)
    UI->>User: Show enriched data
```

**Performance:** 5-15 seconds (background)  
**User Experience:** Immediate success, gradual enhancement  
**Error Handling:** Silent retry, log failures

---

## 📊 Workflow State Machines

### Deck Generation State Machine

```mermaid
stateDiagram-v2
    [*] --> Draft: User creates deck
    
    Draft --> Generating: Click generate
    Generating --> Processing: AI starts work
    
    Processing --> Validating: Slides created
    Processing --> Error: AI error
    
    Validating --> Complete: All slides valid
    Validating --> PartialComplete: Some slides failed
    
    Complete --> Published: User publishes
    Complete --> Editing: User edits
    
    PartialComplete --> Editing: User reviews
    
    Editing --> Complete: Save changes
    Editing --> Draft: Discard changes
    
    Error --> Draft: Retry
    
    Published --> Archived: User archives
    Archived --> [*]
```

**States:**
- `draft` - Initial creation
- `generating` - AI processing
- `processing` - Slides being created
- `validating` - Checking quality
- `complete` - Ready to use
- `partial_complete` - Some slides failed
- `editing` - User modifying
- `published` - Shared with others
- `error` - Generation failed
- `archived` - Removed from active use

---

### Lead Lifecycle State Machine

```mermaid
stateDiagram-v2
    [*] --> New: Contact added
    
    New --> Enriching: Auto-enrichment starts
    Enriching --> Scored: AI scoring complete
    
    Scored --> Hot: Score > 80
    Scored --> Warm: Score 50-80
    Scored --> Cold: Score < 50
    
    Hot --> Contacted: Outreach sent
    Warm --> Nurturing: Added to sequence
    Cold --> Disqualified: Low priority
    
    Contacted --> Responded: Reply received
    Contacted --> NoResponse: No reply (7 days)
    
    Responded --> Meeting: Meeting scheduled
    Responded --> NotInterested: Declined
    
    Meeting --> Negotiation: Interested
    Meeting --> NoResponse: No show
    
    Negotiation --> Won: Deal closed
    Negotiation --> Lost: Deal lost
    
    NoResponse --> Nurturing: Re-engage later
    NotInterested --> Disqualified
    
    Nurturing --> Warm: Re-score higher
    
    Won --> Customer: Active customer
    Customer --> [*]
    
    Lost --> [*]
    Disqualified --> [*]
```

---

## 🎯 Key User Actions & AI Responses

### Deck Creation Actions

| User Action | AI Response | Model | Time | UI Feedback |
|-------------|-------------|-------|------|-------------|
| Fill wizard | Generate 12 slides | 1.5 Pro | 60s | Progress bar |
| Click "Analyze" | Score + recommendations | 2.0 Flash | 5s | Loading spinner |
| Edit slide | Auto-save | - | <1s | Checkmark |
| Click "Rewrite" | Improved version | 2.0 Flash | 3s | Inline loader |
| Request image | Suggest images | Unsplash | 2s | Thumbnail grid |
| Click "Export" | Generate PDF/PPTX | - | 5s | Download link |

### CRM Actions

| User Action | AI Response | Model | Time | UI Feedback |
|-------------|-------------|-------|------|-------------|
| Add contact | Enrich + score | 2.0 Flash | 10s | Badge update |
| Click "Email" | Draft email | 2.0 Flash | 3s | Modal with draft |
| Move pipeline stage | Create task | - | <1s | Task notification |
| Click "Research" | Company insights | 1.5 Pro | 20s | Loading panel |
| View insights | GTM advice | 1.5 Pro | 15s | Dashboard cards |

---

## 🔄 Realtime Updates

### Supabase Realtime Integration

```mermaid
flowchart LR
    DB[(Database)] --> Channel[Supabase Channel]
    Channel --> Sub1[User 1 Browser]
    Channel --> Sub2[User 2 Browser]
    
    Sub1 -->|Edit slide| Update[Update DB]
    Update --> Channel
    Channel --> Sub2
    Sub2 --> Render[Re-render UI]
```

**Subscriptions:**
```typescript
// Subscribe to deck changes
supabase
  .channel(`deck:${deckId}`)
  .on('postgres_changes', {
    event: '*',
    schema: 'public',
    table: 'slides',
    filter: `deck_id=eq.${deckId}`
  }, (payload) => {
    // Update UI with new slide data
    updateSlide(payload.new);
  })
  .subscribe();

// Subscribe to contact updates
supabase
  .channel(`contact:${contactId}`)
  .on('postgres_changes', {
    event: 'UPDATE',
    schema: 'public',
    table: 'crm_lead_scores',
    filter: `contact_id=eq.${contactId}`
  }, (payload) => {
    // Show new score
    updateScore(payload.new.score);
  })
  .subscribe();
```

---

## 📱 Mobile vs Desktop Journeys

### Mobile Optimizations

**Deck Creation:**
- Simplified wizard (one field per screen)
- Touch-optimized template selection
- Voice input for business description
- Photo upload for logos
- Swipe to navigate slides

**CRM:**
- Card-based contact list
- Quick actions (call, email, note)
- Swipe gestures (archive, prioritize)
- Voice notes for activities
- Mobile-first email composer

**AI Interactions:**
- Conversational interfaces
- Quick reply buttons
- Compact result displays
- Progressive disclosure
- Offline queue (sync later)

---

## 🎯 Success Metrics per Journey

### Deck Creation
- **Time to First Deck:** <5 minutes
- **Completion Rate:** >80%
- **Quality Score:** >75/100
- **Export Rate:** >60%
- **User Satisfaction:** >4.5/5

### CRM Lead Management
- **Contacts Added:** >50/month
- **Auto-Score Coverage:** >95%
- **Email Send Rate:** >40%
- **Pipeline Movement:** >30 leads/week
- **Response Rate:** >20%

### GTM Strategy
- **Strategy Generation:** <30 seconds
- **Export Rate:** >70%
- **Implementation Rate:** >40%
- **User Rating:** >4.8/5

---

**Status:** User Journeys Mapped ✅  
**Next:** Workflow Implementation → `/docs/roadmap/03-ai-workflow-implementation.md`
