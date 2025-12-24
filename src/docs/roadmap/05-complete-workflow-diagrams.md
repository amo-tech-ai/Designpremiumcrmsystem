# 05 - Complete Workflow Diagrams

**Date:** December 22, 2025  
**Status:** Visual Documentation  
**Focus:** End-to-end workflow visualization

---

## 🎯 Complete System Overview

```mermaid
graph TB
    subgraph "User Interfaces"
        WebApp[Web Application<br/>React + Tailwind]
        Mobile[Mobile Responsive<br/>PWA Ready]
    end
    
    subgraph "Frontend Services"
        Router[React Router<br/>35 Routes]
        StateManager[State Management<br/>React Hooks]
        AgentService[AI Agent Service]
        CRMService[CRM Service]
        DeckService[Deck Service]
    end
    
    subgraph "Supabase Infrastructure"
        Auth[Auth Service<br/>JWT + RLS]
        Database[(PostgreSQL<br/>40 Tables + pgvector)]
        Realtime[Realtime Service<br/>WebSocket]
        Storage[File Storage<br/>S3-compatible]
        EdgeFunctions[Edge Functions<br/>Deno Runtime]
    end
    
    subgraph "AI Agent Layer"
        BaseAgent[Base Agent<br/>Retry + Error Handling]
        
        subgraph "Fast Agents (2.0 Flash)"
            LeadScorer[Lead Scorer<br/>2-3s]
            EmailWriter[Email Writer<br/>3-5s]
            DeckAnalyzer[Deck Analyzer<br/>5-7s]
        end
        
        subgraph "Deep Agents (1.5 Pro)"
            DeckGenerator[Deck Generator<br/>30-60s]
            ResearchAgent[Research Agent<br/>15-30s]
            StrategyAdvisor[Strategy Advisor<br/>15-20s]
        end
    end
    
    subgraph "Google AI Platform"
        Gemini2Flash[Gemini 2.0 Flash<br/>Fast & Cheap]
        Gemini15Pro[Gemini 1.5 Pro<br/>Deep Reasoning]
        GoogleSearch[Google Search<br/>Grounding]
        TextEmbedding[Text Embedding<br/>RAG]
    end
    
    WebApp --> Router
    Mobile --> Router
    Router --> StateManager
    StateManager --> AgentService
    StateManager --> CRMService
    StateManager --> DeckService
    
    AgentService --> EdgeFunctions
    CRMService --> Database
    DeckService --> Database
    
    EdgeFunctions --> Auth
    EdgeFunctions --> BaseAgent
    
    BaseAgent --> LeadScorer
    BaseAgent --> EmailWriter
    BaseAgent --> DeckAnalyzer
    BaseAgent --> DeckGenerator
    BaseAgent --> ResearchAgent
    BaseAgent --> StrategyAdvisor
    
    LeadScorer --> Gemini2Flash
    EmailWriter --> Gemini2Flash
    DeckAnalyzer --> Gemini2Flash
    
    DeckGenerator --> Gemini15Pro
    ResearchAgent --> Gemini15Pro
    StrategyAdvisor --> Gemini15Pro
    
    ResearchAgent --> GoogleSearch
    DeckGenerator --> TextEmbedding
    
    Database --> Realtime
    Realtime --> StateManager
    
    DeckGenerator --> Storage
    
    style WebApp fill:#e1f5ff
    style Gemini2Flash fill:#fff4e1
    style Gemini15Pro fill:#f0e1ff
    style Database fill:#e8f5e9
```

---

## 🚀 Pitch Deck Creation - Complete Flow

```mermaid
flowchart TD
    Start([User Login]) --> Dashboard{Choose Action}
    
    Dashboard -->|New Deck| Templates[Browse Templates]
    Dashboard -->|AI Wizard| Wizard[Start AI Wizard]
    
    Templates --> SelectTemplate[Select Template]
    SelectTemplate --> Wizard
    
    Wizard --> Step1[Step 1: Business Context<br/>- Company name<br/>- Description<br/>- Industry]
    
    Step1 --> Validate1{Valid?}
    Validate1 -->|No| Step1
    Validate1 -->|Yes| Step2[Step 2: Aesthetic<br/>- Color scheme<br/>- Template style<br/>- Brand assets]
    
    Step2 --> Validate2{Valid?}
    Validate2 -->|No| Step2
    Validate2 -->|Yes| Step3[Step 3: Details<br/>- Business type<br/>- Stage<br/>- Target market]
    
    Step3 --> Validate3{Valid?}
    Validate3 -->|No| Step3
    Validate3 -->|Yes| Step4[Step 4: Financials<br/>- Revenue model<br/>- Projections<br/>- Funding ask]
    
    Step4 --> Validate4{Valid?}
    Validate4 -->|No| Step4
    Validate4 -->|Yes| Review[Review Summary]
    
    Review --> GenerateButton[Click Generate]
    
    GenerateButton --> CreateRecord[Create DB Record<br/>status: draft]
    CreateRecord --> UpdateStatus[Update status: generating]
    UpdateStatus --> CallAI[Call Edge Function<br/>/generate-deck]
    
    CallAI --> AIProcess[AI Processing<br/>Gemini 1.5 Pro]
    
    AIProcess --> BuildPrompt[Build Comprehensive Prompt<br/>- Business context<br/>- Industry best practices<br/>- Template guidelines]
    
    BuildPrompt --> RAGRetrieval{Use RAG?}
    RAGRetrieval -->|Yes| VectorSearch[Search Similar Decks<br/>pgvector]
    VectorSearch --> AddContext[Add Context to Prompt]
    AddContext --> CallGemini[Call Gemini API]
    RAGRetrieval -->|No| CallGemini
    
    CallGemini --> GeminiGenerate[Generate 10-12 Slides<br/>Structured JSON Output]
    
    GeminiGenerate --> ParseResponse[Parse JSON Response]
    ParseResponse --> ValidateSlides{Valid?}
    
    ValidateSlides -->|No| RetryCount{Retries < 3?}
    RetryCount -->|Yes| CallGemini
    RetryCount -->|No| ErrorState[Set status: error]
    
    ValidateSlides -->|Yes| SaveSlides[Save Slides to DB<br/>Batch Insert]
    SaveSlides --> UpdateComplete[Update status: complete]
    UpdateComplete --> LogAIRun[Log AI Run<br/>- Tokens used<br/>- Cost<br/>- Duration]
    
    LogAIRun --> NotifyUser[Notify User<br/>via Realtime]
    
    par Polling from Frontend
        Review --> PollStart[Start Polling<br/>Every 2 seconds]
        PollStart --> CheckStatus{Status?}
        CheckStatus -->|generating| PollStart
        CheckStatus -->|complete| RedirectEditor[Redirect to Editor]
        CheckStatus -->|error| ShowError[Show Error + Retry]
    end
    
    NotifyUser --> RedirectEditor
    
    RedirectEditor --> LoadEditor[Load Deck Editor]
    LoadEditor --> FetchDeck[Fetch Deck + Slides]
    FetchDeck --> RenderSlides[Render Slides]
    
    RenderSlides --> EditMode{User Action}
    
    EditMode -->|Edit Text| EditSlide[Edit Slide Content<br/>Auto-save]
    EditMode -->|AI Rewrite| SlideAI[Call Slide AI<br/>Gemini 2.0 Flash]
    EditMode -->|Add Image| ImageSearch[Search Unsplash]
    EditMode -->|Analyze| AnalyzeDeck[Call Deck Analyzer<br/>Gemini 2.0 Flash]
    EditMode -->|Export| ExportChoice{Format?}
    
    EditSlide --> SaveChange[Save to DB]
    SaveChange --> RealtimeUpdate[Realtime Update]
    RealtimeUpdate --> EditMode
    
    SlideAI --> AIRewrite[Generate Improved Version]
    AIRewrite --> SaveChange
    
    ImageSearch --> DisplayImages[Display Image Options]
    DisplayImages --> SelectImage[User Selects]
    SelectImage --> SaveChange
    
    AnalyzeDeck --> ShowAnalysis[Show Analysis Panel<br/>- Score<br/>- Recommendations<br/>- Missing slides]
    ShowAnalysis --> EditMode
    
    ExportChoice -->|PDF| GeneratePDF[Generate PDF<br/>jsPDF]
    ExportChoice -->|PPTX| GeneratePPTX[Generate PPTX<br/>pptxgen]
    
    GeneratePDF --> UploadStorage[Upload to Storage]
    GeneratePPTX --> UploadStorage
    
    UploadStorage --> SignedURL[Create Signed URL]
    SignedURL --> Download[Download File]
    
    Download --> Share[Share with Investors]
    Share --> End([Complete])
    
    ShowError --> Retry{User Retry?}
    Retry -->|Yes| CallAI
    Retry -->|No| End
    
    ErrorState --> End
```

---

## 👥 CRM Lead Management - Complete Flow

```mermaid
flowchart TD
    Start([Sales Leader Login]) --> CRMDash[Navigate to CRM Dashboard]
    
    CRMDash --> Action{Choose Action}
    
    Action -->|Add Contact| ManualEntry[Manual Entry Form]
    Action -->|Import| ImportCSV[Import CSV/LinkedIn]
    Action -->|View List| ViewContacts[View Contact List]
    
    ManualEntry --> FillForm[Fill Contact Form<br/>- Name<br/>- Email<br/>- Title<br/>- Company]
    ImportCSV --> UploadFile[Upload File]
    
    FillForm --> SubmitForm[Submit Form]
    UploadFile --> ParseCSV[Parse CSV Data]
    ParseCSV --> BatchInsert[Batch Insert Contacts]
    
    SubmitForm --> CreateContact[Insert into crm_contacts]
    BatchInsert --> CreateContact
    
    CreateContact --> TriggerPipeline[Trigger AI Pipeline<br/>Background Process]
    
    TriggerPipeline --> EnrichJob[Enrichment Job]
    TriggerPipeline --> ScoreJob[Scoring Job]
    TriggerPipeline --> TaskJob[Task Generation Job]
    
    EnrichJob --> LinkedInAPI{LinkedIn Data Available?}
    LinkedInAPI -->|Yes| FetchLinkedIn[Fetch LinkedIn Profile<br/>- Bio<br/>- Experience<br/>- Company details]
    LinkedInAPI -->|No| WebScrape[Web Scraping<br/>Company website]
    
    FetchLinkedIn --> AIExtract[AI Extract Key Info<br/>Gemini 2.0 Flash]
    WebScrape --> AIExtract
    
    AIExtract --> SaveEnrichment[Save to crm_lead_enrichment]
    
    ScoreJob --> GetContactData[Get Contact + Enrichment]
    GetContactData --> BuildScoreInput[Build Scoring Input<br/>- Contact details<br/>- Enrichment data<br/>- Target criteria]
    
    BuildScoreInput --> CallScorer[Call Lead Scorer Agent<br/>Gemini 2.0 Flash]
    CallScorer --> CalculateScore[Calculate Score<br/>- Title: 40%<br/>- Company: 30%<br/>- Industry: 20%<br/>- Signals: 10%]
    
    CalculateScore --> DetermineS Priority[Determine Priority<br/>Hot: 80+<br/>Warm: 50-79<br/>Cold: <50]
    DeterminePriority --> SaveScore[Save to crm_lead_scores]
    
    TaskJob --> CheckPriority{Priority?}
    CheckPriority -->|Hot| CreateUrgentTask[Create Task<br/>"Reach out within 24h"<br/>Priority: High<br/>Due: Tomorrow]
    CheckPriority -->|Warm| CreateNormalTask[Create Task<br/>"Research company"<br/>Priority: Medium<br/>Due: 3 days]
    CheckPriority -->|Cold| CreateLowTask[Create Task<br/>"Add to nurture"<br/>Priority: Low<br/>Due: 1 week]
    
    CreateUrgentTask --> SaveTasks[Save to crm_tasks]
    CreateNormalTask --> SaveTasks
    CreateLowTask --> SaveTasks
    
    SaveEnrichment --> UpdateUI[Realtime Update UI]
    SaveScore --> UpdateUI
    SaveTasks --> UpdateUI
    
    UpdateUI --> NotifyUser[Show Notifications<br/>- Enrichment complete<br/>- Score: 85/100 (Hot)<br/>- Task created]
    
    NotifyUser --> ViewContacts
    
    ViewContacts --> ContactList[Display Contact List<br/>- Score badges<br/>- Priority indicators<br/>- Last activity]
    
    ContactList --> SelectContact[Click Contact]
    SelectContact --> ContactDetail[Contact Detail Page]
    
    ContactDetail --> DetailSections{View Section}
    
    DetailSections -->|Info| ShowInfo[Basic Information<br/>- Name, title, company<br/>- Contact details<br/>- Enrichment data]
    DetailSections -->|Score| ShowScore[Lead Score<br/>- Score: 85/100<br/>- Priority: Hot<br/>- Reasoning<br/>- Signals]
    DetailSections -->|Activity| ShowActivity[Activity Timeline<br/>- Emails sent<br/>- Tasks completed<br/>- Notes added]
    DetailSections -->|Tasks| ShowTasks[Related Tasks<br/>- Pending tasks<br/>- Completed tasks]
    
    ContactDetail --> ContactActions{Action?}
    
    ContactActions -->|Email| GenerateEmail[Call Email Writer<br/>Gemini 2.0 Flash]
    ContactActions -->|Research| DeepResearch[Call Research Agent<br/>Gemini 1.5 Pro + Search]
    ContactActions -->|Move Stage| UpdatePipeline[Move in Pipeline]
    ContactActions -->|Add Note| AddNote[Add Activity Note]
    
    GenerateEmail --> EmailInput[Provide Context<br/>- Purpose<br/>- Tone<br/>- Length]
    EmailInput --> AIEmailDraft[Generate Draft Email<br/>- Personalized subject<br/>- Compelling body<br/>- Clear CTA]
    
    AIEmailDraft --> ReviewEmail[Review & Edit]
    ReviewEmail --> SendEmail[Send Email]
    SendEmail --> LogEmail[Log Activity<br/>email_sent]
    
    DeepResearch --> ResearchInput[Research Parameters<br/>- Company name<br/>- Industry<br/>- Competitors]
    ResearchInput --> GoogleSearch[Google Search Grounding]
    GoogleSearch --> AIAnalyze[AI Analyze Results<br/>- Market position<br/>- Recent news<br/>- Funding<br/>- Key people]
    
    AIAnalyze --> ShowResearch[Display Research Panel<br/>- Company overview<br/>- Competitors<br/>- Opportunities<br/>- Citations]
    
    UpdatePipeline --> SelectStage[Select New Stage]
    SelectStage --> CheckAutomation{Automation Rule?}
    
    CheckAutomation -->|Yes| ExecuteActions[Execute Actions<br/>- Create tasks<br/>- Send email<br/>- Update fields]
    CheckAutomation -->|No| SimpleUpdate[Update Stage]
    
    ExecuteActions --> LogActivity[Log Activity]
    SimpleUpdate --> LogActivity
    AddNote --> LogActivity
    LogEmail --> LogActivity
    
    LogActivity --> RefreshView[Refresh Contact View]
    RefreshView --> End([Complete])
```

---

## 📊 AI Insights Dashboard - Complete Flow

```mermaid
flowchart TD
    Start([User Opens AI Insights]) --> LoadDashboard[Load Dashboard]
    
    LoadDashboard --> FetchData[Fetch Data<br/>- Recent decks<br/>- CRM contacts<br/>- AI runs<br/>- Usage stats]
    
    FetchData --> DisplaySections{Select Section}
    
    DisplaySections -->|Deck Analysis| DeckSection[Deck Analysis Section]
    DisplaySections -->|Lead Insights| LeadSection[Lead Insights Section]
    DisplaySections -->|GTM Strategy| GTMSection[GTM Strategy Section]
    DisplaySections -->|Usage Stats| StatsSection[Usage Statistics]
    
    DeckSection --> SelectDeck[Select Deck to Analyze]
    SelectDeck --> AnalyzeButton[Click Analyze]
    
    AnalyzeButton --> FetchDeckData[Fetch Deck + Slides]
    FetchDeckData --> CallAnalyzer[Call Deck Analyzer<br/>Gemini 2.0 Flash]
    
    CallAnalyzer --> AnalyzeStructure[Analyze Structure<br/>- Slide order<br/>- Missing slides<br/>- Redundancy]
    
    AnalyzeStructure --> AnalyzeContent[Analyze Content<br/>- Clarity<br/>- Data quality<br/>- Storytelling]
    
    AnalyzeContent --> AnalyzeImpact[Analyze Impact<br/>- Per-slide scores<br/>- Critical issues<br/>- Quick wins]
    
    AnalyzeImpact --> GenerateRecs[Generate Recommendations<br/>- Prioritized<br/>- Actionable<br/>- Specific]
    
    GenerateRecs --> DisplayAnalysis[Display Results<br/>- Overall score<br/>- Strengths<br/>- Weaknesses<br/>- Slide-by-slide<br/>- Recommendations]
    
    DisplayAnalysis --> UserAction{User Action?}
    
    UserAction -->|Export Report| ExportPDF[Export as PDF]
    UserAction -->|Implement Recs| GotoEditor[Go to Editor]
    UserAction -->|Share| ShareLink[Generate Share Link]
    
    LeadSection --> ViewLeads[View Lead List]
    ViewLeads --> FilterLeads{Filter}
    
    FilterLeads -->|Hot Leads| ShowHot[Show High-Score Leads<br/>Score > 80]
    FilterLeads -->|Warm Leads| ShowWarm[Show Medium-Score Leads<br/>Score 50-80]
    FilterLeads -->|All| ShowAll[Show All Leads]
    
    ShowHot --> LeadDetail[Click Lead]
    ShowWarm --> LeadDetail
    ShowAll --> LeadDetail
    
    LeadDetail --> ShowLeadInsights[Show Lead Insights<br/>- Score breakdown<br/>- Positive signals<br/>- Negative signals<br/>- Recommended actions<br/>- Similar leads]
    
    ShowLeadInsights --> LeadAction{Action?}
    
    LeadAction -->|Rescope| ManualScore[Manual Score Override]
    LeadAction -->|Email| QuickEmail[Quick Email Draft]
    LeadAction -->|View All| BackToList[Back to List]
    
    GTMSection --> NewStrategy[Create New Strategy]
    GTMSection --> ViewPrevious[View Previous Strategies]
    
    NewStrategy --> GTMForm[Fill Strategy Form<br/>- Company stage<br/>- Goals<br/>- Constraints]
    
    GTMForm --> SubmitGTM[Submit to AI]
    SubmitGTM --> CallAdvisor[Call Strategy Advisor<br/>Gemini 1.5 Pro]
    
    CallAdvisor --> AnalyzeMarket[Analyze Market<br/>- Competitive landscape<br/>- Channel effectiveness<br/>- Stage-appropriate tactics]
    
    AnalyzeMarket --> BuildTimeline[Build Timeline<br/>- 3-6 month phases<br/>- Key milestones<br/>- Expected outcomes]
    
    BuildTimeline --> PrioritizeTactics[Prioritize Tactics<br/>- Effort/Impact matrix<br/>- Quick wins<br/>- Long-term plays]
    
    PrioritizeTactics --> IdentifyRisks[Identify Risks<br/>- Common pitfalls<br/>- Mitigation strategies]
    
    IdentifyRisks --> AllocateBudget[Recommend Budget Allocation<br/>- % per channel<br/>- Rationale]
    
    AllocateBudget --> DisplayStrategy[Display Strategy<br/>- Executive summary<br/>- Timeline<br/>- Tactics<br/>- Risks<br/>- Budget]
    
    DisplayStrategy --> StrategyAction{Action?}
    
    StrategyAction -->|Export| ExportStrategy[Export as PDF/DOCX]
    StrategyAction -->|Save| SaveStrategy[Save to Projects]
    StrategyAction -->|Refine| RefineInputs[Adjust Inputs + Regenerate]
    
    StatsSection --> ShowCharts[Show Usage Charts<br/>- AI calls by agent<br/>- Cost over time<br/>- Success rates<br/>- Token usage]
    
    ShowCharts --> CostBreakdown[Cost Breakdown<br/>- By model<br/>- By feature<br/>- By user<br/>- Projections]
    
    CostBreakdown --> End([Complete])
    
    ExportPDF --> End
    GotoEditor --> End
    ShareLink --> End
    ManualScore --> End
    QuickEmail --> End
    BackToList --> ViewLeads
    ExportStrategy --> End
    SaveStrategy --> End
    RefineInputs --> GTMForm
```

---

## 🔄 Real-time Collaboration Flow

```mermaid
sequenceDiagram
    participant User1
    participant Browser1
    participant Supabase
    participant Database
    participant RealtimeChannel
    participant Browser2
    participant User2
    
    User1->>Browser1: Open deck editor
    Browser1->>Supabase: Subscribe to deck changes
    Supabase->>RealtimeChannel: Create channel deck:123
    Browser1->>RealtimeChannel: Join channel
    
    User2->>Browser2: Open same deck
    Browser2->>Supabase: Subscribe to deck changes
    Browser2->>RealtimeChannel: Join channel deck:123
    
    RealtimeChannel-->>Browser1: User2 joined
    Browser1->>User1: Show "User2 is viewing"
    
    User1->>Browser1: Edit slide 3 title
    Browser1->>Database: UPDATE slides SET title=...
    Database->>RealtimeChannel: Broadcast UPDATE event
    
    RealtimeChannel->>Browser1: Confirm update
    RealtimeChannel->>Browser2: Broadcast UPDATE
    
    Browser2->>User2: Update slide 3 (real-time)
    User2->>Browser2: Show "User1 edited"
    
    User2->>Browser2: Add comment
    Browser2->>Database: INSERT into comments
    Database->>RealtimeChannel: Broadcast INSERT
    
    RealtimeChannel->>Browser1: New comment event
    Browser1->>User1: Show new comment badge
    
    User1->>Browser1: Close editor
    Browser1->>RealtimeChannel: Leave channel
    RealtimeChannel->>Browser2: User1 left
    Browser2->>User2: Show "User1 left"
```

---

## 🎯 Automation Engine Flow

```mermaid
flowchart TD
    Trigger[Event Trigger] --> EventType{Event Type}
    
    EventType -->|Deal Stage Changed| StageChange[Stage Change Event<br/>deal_id, old_stage, new_stage]
    EventType -->|Contact Added| ContactAdded[Contact Added Event<br/>contact_id, source]
    EventType -->|Task Completed| TaskDone[Task Completed Event<br/>task_id, contact_id]
    EventType -->|Email Sent| EmailSent[Email Sent Event<br/>contact_id, email_id]
    
    StageChange --> FetchRules[Fetch Matching Rules<br/>trigger_type = stage_change]
    ContactAdded --> FetchRules
    TaskDone --> FetchRules
    EmailSent --> FetchRules
    
    FetchRules --> CheckConditions{Evaluate Conditions}
    
    CheckConditions -->|All Pass| CheckIdempotency{Already Executed?}
    CheckConditions -->|Fail| Skip[Skip Rule]
    
    CheckIdempotency -->|Yes| Skip
    CheckIdempotency -->|No| ExecuteActions[Execute Actions]
    
    ExecuteActions --> ActionType{Action Type}
    
    ActionType -->|Create Task| CreateTask[Create Task<br/>- Title<br/>- Description<br/>- Due date<br/>- Priority<br/>- Assignee]
    
    ActionType -->|Send Email| SendEmail[Send Email<br/>- Template<br/>- Recipient<br/>- Variables<br/>- Delay]
    
    ActionType -->|Update Field| UpdateField[Update Field<br/>- Table<br/>- Field<br/>- Value]
    
    ActionType -->|Webhook| CallWebhook[Call Webhook<br/>- URL<br/>- Payload<br/>- Headers]
    
    ActionType -->|AI Action| AIAction[Trigger AI<br/>- Score contact<br/>- Generate content<br/>- Research]
    
    CreateTask --> SaveAction[Save to DB]
    SendEmail --> SaveAction
    UpdateField --> SaveAction
    CallWebhook --> SaveAction
    AIAction --> SaveAction
    
    SaveAction --> MarkExecuted[Mark Rule Executed<br/>Save to automation_executions<br/>idempotency_key]
    
    MarkExecuted --> LogExecution[Log Execution<br/>- Rule ID<br/>- Trigger data<br/>- Actions taken<br/>- Timestamp]
    
    LogExecution --> NotifyUser[Notify User<br/>- In-app notification<br/>- Email (if configured)]
    
    NotifyUser --> End([Complete])
    Skip --> End
```

---

## 📈 Cost Tracking & Budget Management

```mermaid
flowchart TD
    AICall[AI Agent Called] --> LogStart[Log Start Time]
    
    LogStart --> ExecuteAgent[Execute Agent<br/>Gemini API Call]
    
    ExecuteAgent --> Success{Success?}
    
    Success -->|Yes| ExtractMetadata[Extract Metadata<br/>- Model used<br/>- Input tokens<br/>- Output tokens<br/>- Duration]
    
    Success -->|No| LogError[Log Error<br/>- Error type<br/>- Retry count]
    
    ExtractMetadata --> CalculateCost[Calculate Cost<br/>Based on model pricing]
    
    CalculateCost --> SaveRun[Save to ai_runs<br/>- user_id<br/>- org_id<br/>- agent<br/>- model<br/>- tokens<br/>- cost]
    
    LogError --> SaveRun
    
    SaveRun --> AggregateUsage[Aggregate Usage<br/>Per org per month]
    
    AggregateUsage --> CheckBudget{Over Budget?}
    
    CheckBudget -->|Yes| BudgetAction{Budget Policy}
    CheckBudget -->|No| AllowNext[Allow Next Call]
    
    BudgetAction -->|Soft Limit| SendAlert[Send Alert<br/>80% budget used]
    BudgetAction -->|Hard Limit| BlockCalls[Block AI Calls<br/>Show upgrade message]
    BudgetAction -->|Downgrade| SwitchModel[Switch to Flash<br/>From Pro]
    
    SendAlert --> AllowNext
    BlockCalls --> End([Complete])
    SwitchModel --> AllowNext
    
    AllowNext --> UpdateDashboard[Update Usage Dashboard<br/>- Real-time charts<br/>- Cost projection<br/>- Model distribution]
    
    UpdateDashboard --> End
```

---

**Status:** Workflow Diagrams Complete ✅  
**Next:** Implementation Roadmap → `/docs/roadmap/06-implementation-roadmap.md`
