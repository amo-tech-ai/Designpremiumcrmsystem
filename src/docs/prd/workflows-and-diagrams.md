# StartupAI - Workflows & Visual Diagrams

**Last Updated:** December 8, 2024  
**Version:** 1.0

---

## Table of Contents

1. [Core User Workflows](#core-user-workflows)
2. [System Architecture Diagrams](#system-architecture-diagrams)
3. [User Journey Maps](#user-journey-maps)
4. [Data Flow Diagrams](#data-flow-diagrams)
5. [Technical Workflows](#technical-workflows)

---

## Core User Workflows

### Workflow 1: First-Time User Onboarding

```mermaid
flowchart TD
    A[Visit Landing Page] --> B{Interested?}
    B -->|No| END1[Leave Site]
    B -->|Yes| C[Click "Start Free"]
    C --> D[Sign Up with Email]
    D --> E[Verify Email]
    E --> F[Redirect to Dashboard]
    F --> G{Profile Complete?}
    G -->|No - 20%| H[Show "Complete Profile" Banner]
    H --> I[Open Startup Profile Wizard]
    I --> J[Step 1: Business Basics]
    J --> K[Step 2: Context & Problem]
    K --> L[Step 3: Team & Founders]
    L --> M[Step 4: Traction & Metrics]
    M --> N[Step 5: Fundraising]
    N --> O[Step 6: Review & Confirm]
    O --> P[Save to Database]
    P --> Q[Profile Strength: 100%]
    Q --> R[Dashboard Shows All Features]
    G -->|Yes - 100%| R
    
    style A fill:#6366f1,color:#fff
    style R fill:#10b981,color:#fff
    style END1 fill:#ef4444,color:#fff
```

---

### Workflow 2: Pitch Deck Generation (Full Flow)

```mermaid
sequenceDiagram
    participant User
    participant Dashboard
    participant Wizard
    participant Backend
    participant Gemini
    participant Database
    participant Editor

    User->>Dashboard: Click "Generate Pitch Deck"
    Dashboard->>Wizard: Navigate to /wizard
    Wizard->>User: Show Step 1: Context Input
    User->>Wizard: Confirm business details
    Wizard->>User: Show Step 2: Market Details
    User->>Wizard: Input TAM/SAM/SOM
    Wizard->>User: Show Step 3: Financials
    User->>Wizard: Input projections
    Wizard->>User: Show Step 4: Template Selection
    User->>Wizard: Select "Default" template
    Wizard->>Backend: POST /generate-deck
    
    Note over Backend,Gemini: AI Processing (30-60s)
    
    Backend->>Database: Fetch startup profile
    Database-->>Backend: Return profile data
    Backend->>Gemini: Send generation prompt
    Gemini->>Gemini: Generate 12 slide contents
    Gemini-->>Backend: Return slide array JSON
    Backend->>Database: INSERT INTO decks
    Backend->>Database: INSERT INTO slides (12 rows)
    Database-->>Backend: Return deckId
    Backend-->>Wizard: { deckId, status: "ready" }
    Wizard->>Editor: Navigate to /editor/{deckId}
    Editor->>Database: Fetch deck + slides
    Database-->>Editor: Return full deck data
    Editor->>User: Display 12 slides in editor
    User->>Editor: Edit slides, export PDF
```

---

### Workflow 3: CRM Pipeline Management

```mermaid
flowchart LR
    A[Navigate to /pipeline] --> B[Load Deals from DB]
    B --> C{Filter Applied?}
    C -->|Yes| D[Apply Filters]
    C -->|No| E[Show All Deals]
    D --> E
    E --> F[Display Kanban Board]
    F --> G{User Action?}
    
    G -->|Click Deal| H[Open Detail Panel]
    H --> I[Show Info/Enrichment/Tasks Tabs]
    
    G -->|Drag Card| J[Update Stage]
    J --> K[Log to deal_stage_history]
    K --> L[Trigger Automation?]
    L -->|Yes| M[Create Auto Task]
    L -->|No| N[Refresh UI]
    M --> N
    
    G -->|Add Deal| O[Show Create Modal]
    O --> P[Fill Name, Amount, Stage]
    P --> Q[Insert to crm_deals]
    Q --> R[Trigger AI Scoring]
    R --> S[Show Deal with AI Score]
    
    style F fill:#6366f1,color:#fff
    style S fill:#10b981,color:#fff
```

---

### Workflow 4: AI Lead Scoring Process

```mermaid
flowchart TD
    A[New Deal Created] --> B{Auto-score Enabled?}
    B -->|No| END[Skip Scoring]
    B -->|Yes| C[Fetch Deal + Contact Data]
    C --> D[Fetch Startup ICP Profile]
    D --> E[Build Scoring Prompt]
    E --> F[Call Gemini API]
    
    F --> G{API Success?}
    G -->|No| H[Retry 3x]
    H --> I{Retry Success?}
    I -->|No| J[Set Default Score: 50]
    I -->|Yes| K[Parse JSON Response]
    G -->|Yes| K
    
    K --> L{Valid Score?}
    L -->|No| J
    L -->|Yes| M[Extract Scores]
    
    M --> N[overall_score: 0-100]
    M --> O[industry_fit: 0-100]
    M --> P[budget_fit: 0-100]
    M --> Q[ai_findings: array]
    M --> R[recommended_actions: array]
    
    N --> S[Insert into crm_lead_scores]
    O --> S
    P --> S
    Q --> S
    R --> S
    J --> S
    
    S --> T[Update crm_deals.ai_score]
    T --> U[Display in UI with Badge]
    U --> V{Score >= 80?}
    V -->|Yes| W[Green Badge: HIGH]
    V -->|No| X{Score >= 50?}
    X -->|Yes| Y[Yellow Badge: MEDIUM]
    X -->|No| Z[Red Badge: LOW]
    
    style A fill:#6366f1,color:#fff
    style W fill:#10b981,color:#fff
    style Y fill:#f59e0b,color:#fff
    style Z fill:#ef4444,color:#fff
    style END fill:#94a3b8,color:#fff
```

---

## System Architecture Diagrams

### High-Level System Architecture

```mermaid
graph TB
    subgraph "Frontend Layer"
        A[React App<br/>TypeScript + Tailwind]
        B[shadcn/ui Components]
        C[Motion Animations]
        D[Recharts Visualizations]
    end
    
    subgraph "Backend Layer - Supabase"
        E[Edge Functions<br/>Hono + Deno]
        F[PostgreSQL Database<br/>40 Tables]
        G[Auth Service<br/>JWT Tokens]
        H[Storage Buckets<br/>Private Files]
        I[Realtime Subscriptions]
    end
    
    subgraph "External Services"
        J[Gemini API<br/>Google AI Studio]
        K[Unsplash API<br/>Stock Images]
    end
    
    subgraph "Data Storage"
        L[(Decks & Slides)]
        M[(CRM Data)]
        N[(Startup Profiles)]
        O[(AI Results Cache)]
    end
    
    A --> B
    A --> C
    A --> D
    A --> E
    A --> F
    A --> G
    A --> H
    A --> I
    
    E --> F
    E --> J
    E --> K
    E --> H
    
    F --> L
    F --> M
    F --> N
    F --> O
    
    style A fill:#6366f1,color:#fff
    style E fill:#10b981,color:#fff
    style J fill:#f59e0b,color:#fff
    style F fill:#8b5cf6,color:#fff
```

---

### Database Schema (Entity Relationship Diagram)

```mermaid
erDiagram
    USERS ||--o{ PROFILES : has
    PROFILES ||--o{ ORGS : owns
    ORGS ||--|{ ORG_MEMBERS : contains
    ORG_MEMBERS }o--|| USERS : belongs_to
    
    USERS ||--o{ STARTUPS : creates
    STARTUPS ||--o{ DECKS : generates
    STARTUPS ||--o{ STARTUP_FOUNDERS : has
    STARTUPS ||--o{ CRM_DEALS : manages
    
    DECKS ||--|{ SLIDES : contains
    DECKS ||--o{ SHARE_LINKS : has
    SLIDES ||--o{ ASSETS : includes
    SLIDES ||--o{ CITATIONS : references
    
    STARTUPS ||--o{ CRM_CONTACTS : owns
    CRM_CONTACTS }o--|| CRM_ACCOUNTS : belongs_to
    CRM_ACCOUNTS ||--o{ CRM_DEALS : related_to
    
    CRM_DEALS ||--o{ CRM_TASKS : generates
    CRM_DEALS ||--o| CRM_LEAD_SCORES : has
    CRM_DEALS ||--o| CRM_DEAL_ENRICHMENT : has
    CRM_DEALS ||--o{ CRM_DEAL_STAGE_HISTORY : tracks
    
    CRM_DEALS ||--o{ CRM_ACTIVITIES : logs
    CRM_CONTACTS ||--o{ CRM_ACTIVITIES : logs
    
    INVESTORS ||--o{ INVESTOR_OUTREACH : tracked_in
    STARTUPS ||--o{ INVESTOR_OUTREACH : manages
    
    STARTUPS ||--o{ AI_COACH_INSIGHTS : receives
    STARTUPS ||--o{ MARKET_SIZING_RESULTS : requests
    
    USERS {
        uuid id PK
        text email
        text role
    }
    
    STARTUPS {
        uuid id PK
        text name
        text stage
        jsonb traction_data
        boolean is_raising
    }
    
    DECKS {
        uuid id PK
        uuid startup_id FK
        text template
        text status
        jsonb theme_config
    }
    
    SLIDES {
        uuid id PK
        uuid deck_id FK
        int position
        text type
        jsonb bullets
    }
    
    CRM_DEALS {
        uuid id PK
        text name
        numeric amount
        text stage
        int ai_score
    }
    
    CRM_LEAD_SCORES {
        uuid id PK
        uuid lead_id FK
        int overall_score
        jsonb ai_findings
    }
```

---

## User Journey Maps

### Journey 1: First Pitch Deck Creation

```mermaid
journey
    title First-Time Founder Creates Pitch Deck
    section Discovery
      Visit Landing Page: 5: Founder
      Watch Demo Video (2 min): 4: Founder
      Read Features: 4: Founder
      Click "Start Free": 5: Founder
    section Sign Up
      Enter Email & Password: 3: Founder
      Verify Email: 3: Founder
      First Login: 5: Founder
    section Profile Setup
      See Dashboard (20% complete): 3: Founder
      Click "Complete Profile": 4: Founder
      Fill Business Info (5 min): 3: Founder
      Add Founder Bio: 4: Founder
      Input Traction Metrics: 3: Founder
      Save Profile (100% complete): 5: Founder
    section Deck Generation
      Click "Generate Pitch Deck": 5: Founder
      Input Market Size: 3: Founder
      Add Financials: 3: Founder
      Select Template: 4: Founder
      Wait for AI (30s): 2: Founder
      See Generated Deck: 5: Founder
    section Editing
      Review 12 Slides: 4: Founder
      Edit Problem Slide: 4: Founder
      Adjust Team Slide: 4: Founder
      Preview in Present Mode: 5: Founder
    section Sharing
      Export as PDF: 5: Founder
      Create Share Link: 5: Founder
      Copy Link: 5: Founder
      Email to First Investor: 5: Founder
    section Success
      Investor Opens Deck: 5: Investor, Founder
      Investor Requests Meeting: 5: Founder
```

---

### Journey 2: Managing Investor Pipeline

```mermaid
journey
    title Seed-Stage Founder Manages 30 Investors
    section Research
      Use Investor Discovery: 4: Founder
      Filter by Stage (Seed): 4: Founder
      Filter by Industry (SaaS): 4: Founder
      See 50 Investors Matched: 5: Founder
      Export Top 30 to CRM: 5: Founder
    section Outreach
      Navigate to Pipeline: 5: Founder
      See 30 Deals in "Lead" Stage: 4: Founder
      Click Deal Card (Sequoia): 5: Founder
      View AI Score (85/100): 5: Founder
      Read AI Insights: 4: Founder
      Create Task "Send Email": 4: Founder
    section Follow-Up
      Check Tasks Daily: 3: Founder
      See "Email Sequoia" (Due Today): 4: Founder
      Complete Task: 4: Founder
      Drag Deal to "Contacted": 5: Founder
      Auto-Task Created "Follow up in 3 days": 5: Founder
    section Meetings
      Sequoia Responds (Email): 5: Investor, Founder
      Drag to "Qualified": 5: Founder
      Add Task "Prepare Deck": 4: Founder
      Update Deck with Latest Metrics: 4: Founder
      Send Updated Deck: 5: Founder
      Meeting Scheduled: 5: Founder
      Drag to "Meeting Scheduled": 5: Founder
    section Close
      Meeting Goes Well: 5: Founder
      Move to "Proposal Sent": 5: Founder
      Wait for Term Sheet: 2: Founder
      Receive Term Sheet: 5: Founder
      Move to "Closed Won": 5: Founder
      Update Dashboard (Total Raised): 5: Founder
```

---

## Data Flow Diagrams

### Data Flow 1: User Authentication & Session

```mermaid
flowchart LR
    A[User Enters Email/Password] --> B[Frontend: POST /auth/signup]
    B --> C{Supabase Auth}
    C -->|Success| D[Send Verification Email]
    C -->|Error| E[Show Error Toast]
    D --> F[User Clicks Verification Link]
    F --> G[Supabase: Verify Email]
    G --> H[Redirect to /dashboard]
    H --> I[Frontend: GET Session]
    I --> J{Session Valid?}
    J -->|Yes| K[Fetch User Profile]
    J -->|No| L[Redirect to /auth]
    K --> M[Fetch Startup Profile]
    M --> N[Display Dashboard]
    
    style C fill:#10b981,color:#fff
    style J fill:#f59e0b,color:#fff
    style N fill:#6366f1,color:#fff
```

---

### Data Flow 2: Deck Generation Backend Processing

```mermaid
flowchart TD
    A[Frontend: POST /generate-deck] --> B[Backend: Receive Request]
    B --> C{Auth Token Valid?}
    C -->|No| D[Return 401 Unauthorized]
    C -->|Yes| E[Extract User ID from JWT]
    E --> F[Query startups table]
    F --> G{Startup Found?}
    G -->|No| H[Return 404 Not Found]
    G -->|Yes| I[Build Gemini Prompt]
    
    I --> J[Include Profile Context]
    I --> K[Include Template Style]
    I --> L[Include Deck Purpose]
    
    J --> M[Call Gemini API]
    K --> M
    L --> M
    
    M --> N{API Success?}
    N -->|No| O[Retry 3x]
    O --> P{Retry Success?}
    P -->|No| Q[Return 500 Error]
    P -->|Yes| R[Parse JSON Response]
    N -->|Yes| R
    
    R --> S{Valid Slide Data?}
    S -->|No| Q
    S -->|Yes| T[Start DB Transaction]
    
    T --> U[INSERT INTO decks]
    U --> V[Get Generated deck_id]
    V --> W[Loop: INSERT 12 slides]
    W --> X[Commit Transaction]
    
    X --> Y[Return Success Response]
    Y --> Z[Frontend: Navigate to /editor]
    
    style A fill:#6366f1,color:#fff
    style M fill:#f59e0b,color:#fff
    style T fill:#8b5cf6,color:#fff
    style Y fill:#10b981,color:#fff
    style Q fill:#ef4444,color:#fff
```

---

### Data Flow 3: Real-Time Pipeline Updates

```mermaid
sequenceDiagram
    participant User1
    participant Frontend1
    participant Supabase
    participant Frontend2
    participant User2
    
    Note over User1,User2: Team Plan with 2 Users
    
    User1->>Frontend1: Drag Deal to "Closed Won"
    Frontend1->>Supabase: UPDATE crm_deals SET stage='Closed Won'
    Supabase->>Supabase: Execute Update
    Supabase->>Supabase: Trigger Realtime Event
    
    Supabase-->>Frontend1: Update Confirmation
    Frontend1->>User1: Show Updated UI
    
    Note over Supabase,Frontend2: Realtime Subscription Active
    
    Supabase-->>Frontend2: Broadcast Change Event
    Frontend2->>Frontend2: Update Local State
    Frontend2->>User2: Show Updated Pipeline
    
    User2->>Frontend2: Sees Deal Move in Real-Time
```

---

## Technical Workflows

### Workflow 5: File Upload to Supabase Storage

```mermaid
flowchart TD
    A[User Clicks "Upload Logo"] --> B[Select File from Filesystem]
    B --> C[Frontend: Validate File]
    C --> D{Valid Image?}
    D -->|No| E[Show Error Toast]
    D -->|Yes| F[POST /storage/upload-url]
    F --> G[Backend: Create Signed Upload URL]
    G --> H{Bucket Exists?}
    H -->|No| I[Create Bucket: make-6522a742-uploads]
    H -->|Yes| J[Generate Signed URL]
    I --> J
    J --> K[Return {uploadUrl, path}]
    K --> L[Frontend: Upload File to URL]
    L --> M[Supabase Storage: Store File]
    M --> N[Frontend: Update Profile with path]
    N --> O[Save to startups.logo_url]
    O --> P[Display New Logo in UI]
    
    style A fill:#6366f1,color:#fff
    style M fill:#10b981,color:#fff
    style E fill:#ef4444,color:#fff
```

---

### Workflow 6: AI Enrichment with Caching

```mermaid
flowchart LR
    A[User Clicks "Enrich Deal"] --> B{Cache Exists?}
    B -->|Yes, < 30 days old| C[Load from crm_deal_enrichment]
    B -->|No| D[Show "Researching..." Spinner]
    C --> E[Display Cached Data]
    D --> F[POST /enrich-deal]
    F --> G[Backend: Search Web for Company]
    G --> H[Gemini: Analyze Data]
    H --> I[Parse Results]
    I --> J[INSERT INTO crm_deal_enrichment]
    J --> K[Return Enrichment Data]
    K --> E
    E --> L[Show Enrichment Tab]
    L --> M[Display: CEO, News, Funding]
    
    style C fill:#10b981,color:#fff
    style H fill:#f59e0b,color:#fff
```

---

### Workflow 7: Automation Rule Execution

```mermaid
flowchart TD
    A[Deal Stage Changed Event] --> B[Query automation_rules table]
    B --> C{Active Rules?}
    C -->|No| END[Skip Automation]
    C -->|Yes| D[Loop Through Each Rule]
    
    D --> E{Trigger Matches?}
    E -->|No| F[Next Rule]
    E -->|Yes| G{Filter Conditions Met?}
    G -->|No| F
    G -->|Yes| H[Execute Actions]
    
    H --> I{Action Type?}
    I -->|create_task| J[INSERT INTO crm_tasks]
    I -->|send_email| K[Call Email Service]
    I -->|update_field| L[UPDATE crm_deals]
    I -->|webhook| M[POST to External URL]
    
    J --> N[Increment rule.run_count]
    K --> N
    L --> N
    M --> N
    
    N --> O[Update last_run_at timestamp]
    O --> F
    F --> P{More Rules?}
    P -->|Yes| D
    P -->|No| END
    
    style A fill:#6366f1,color:#fff
    style H fill:#10b981,color:#fff
    style END fill:#94a3b8,color:#fff
```

---

## User Interaction Flows

### Interaction Flow 1: Editing a Slide in Deck Editor

```mermaid
stateDiagram-v2
    [*] --> ViewingDeck: Load /editor/{deckId}
    ViewingDeck --> SlideSelected: Click Slide Thumbnail
    SlideSelected --> EditingTitle: Click Title Field
    EditingTitle --> AutoSaving: Type Text (debounced 2s)
    AutoSaving --> SlideSelected: Save Complete
    
    SlideSelected --> EditingBullets: Click Bullet List
    EditingBullets --> AddingBullet: Click "Add Bullet"
    AddingBullet --> AutoSaving
    
    SlideSelected --> ChangingLayout: Click Layout Dropdown
    ChangingLayout --> ApplyingLayout: Select "2-Column"
    ApplyingLayout --> AutoSaving
    
    SlideSelected --> OpeningAIChat: Click "AI Suggestions"
    OpeningAIChat --> AIProcessing: Send Prompt
    AIProcessing --> DisplayingSuggestions: Gemini Response
    DisplayingSuggestions --> ApplySuggestion: Click "Apply"
    ApplySuggestion --> AutoSaving
    
    SlideSelected --> DeletingSlide: Click "Delete Slide"
    DeletingSlide --> ConfirmDelete: Show Confirmation
    ConfirmDelete --> SlideDeleted: Confirm
    SlideDeleted --> ViewingDeck
    ConfirmDelete --> SlideSelected: Cancel
    
    ViewingDeck --> ExportingPDF: Click "Export PDF"
    ExportingPDF --> PDFReady: Generate PDF
    PDFReady --> [*]: Download Complete
```

---

### Interaction Flow 2: Creating and Managing a Task

```mermaid
stateDiagram-v2
    [*] --> ViewingTasks: Navigate to /tasks
    ViewingTasks --> CreateMode: Click "Add Task"
    CreateMode --> FillingForm: Enter Title, Due Date
    FillingForm --> SelectingPriority: Choose "High"
    SelectingPriority --> LinkingDeal: Select Related Deal
    LinkingDeal --> Saving: Click "Create"
    Saving --> TaskCreated: INSERT INTO crm_tasks
    TaskCreated --> ViewingTasks
    
    ViewingTasks --> TaskSelected: Click Task Row
    TaskSelected --> EditingTask: Click "Edit"
    EditingTask --> UpdatingFields: Change Due Date
    UpdatingFields --> Saving
    
    TaskSelected --> CompletingTask: Click Checkbox
    CompletingTask --> StatusUpdated: status = 'done'
    StatusUpdated --> ActivityLogged: Log to crm_activities
    ActivityLogged --> ViewingTasks
    
    TaskSelected --> DeletingTask: Click "Delete"
    DeletingTask --> ConfirmDelete: Show Confirmation
    ConfirmDelete --> TaskDeleted: Confirm
    TaskDeleted --> ViewingTasks
    ConfirmDelete --> TaskSelected: Cancel
```

---

## Error Handling Flows

### Error Flow 1: API Request Failure

```mermaid
flowchart TD
    A[User Action: Generate Deck] --> B[Frontend: POST /generate-deck]
    B --> C{Network Request}
    C -->|Success| D[Backend Processing]
    C -->|Network Error| E[Retry with Exponential Backoff]
    E --> F{Retry Count < 3?}
    F -->|Yes| C
    F -->|No| G[Show Error Toast]
    G --> H[Log Error to Console]
    H --> I[Show "Try Again" Button]
    
    D --> J{Backend Error?}
    J -->|500 Server Error| K[Show "Server Error" Toast]
    J -->|401 Unauthorized| L[Redirect to Login]
    J -->|400 Bad Request| M[Show Validation Error]
    J -->|200 Success| N[Process Response]
    
    K --> H
    M --> H
    N --> O[Update UI]
    
    style G fill:#ef4444,color:#fff
    style K fill:#ef4444,color:#fff
    style M fill:#f59e0b,color:#fff
    style O fill:#10b981,color:#fff
```

---

### Error Flow 2: Database Transaction Rollback

```mermaid
flowchart LR
    A[Start Transaction] --> B[INSERT INTO decks]
    B --> C{Insert Success?}
    C -->|No| D[ROLLBACK]
    C -->|Yes| E[INSERT INTO slides]
    E --> F{All Slides Inserted?}
    F -->|No| D
    F -->|Yes| G[COMMIT]
    G --> H[Return Success]
    D --> I[Log Error]
    I --> J[Return Error Response]
    
    style A fill:#6366f1,color:#fff
    style G fill:#10b981,color:#fff
    style D fill:#ef4444,color:#fff
```

---

## Performance Optimization Workflows

### Optimization 1: Lazy Loading Components

```mermaid
flowchart TD
    A[App.tsx Loads] --> B[Render Main Shell]
    B --> C[Define Lazy Components]
    C --> D[User Navigates to /pipeline]
    D --> E{PipelineDashboard Loaded?}
    E -->|No| F[Show Loading Skeleton]
    E -->|Yes| G[Display Pipeline]
    F --> H[Fetch Component Bundle]
    H --> I[Load PipelineDashboard.tsx]
    I --> J[Render Component]
    J --> G
    G --> K[Fetch Data from Supabase]
    K --> L[Display Deals]
    
    style F fill:#f59e0b,color:#fff
    style G fill:#10b981,color:#fff
```

---

### Optimization 2: Caching Strategy

```mermaid
flowchart LR
    A[User Requests Startup Profile] --> B{Cache Hit?}
    B -->|Yes| C[Return from React State]
    B -->|No| D[Query Supabase]
    D --> E[Fetch from Database]
    E --> F[Store in React Context]
    F --> G[Return to Component]
    C --> H[Display in UI]
    G --> H
    
    I[User Updates Profile] --> J[Invalidate Cache]
    J --> D
    
    style C fill:#10b981,color:#fff
    style D fill:#f59e0b,color:#fff
```

---

## Integration Workflows

### Integration 1: Gemini API Call Flow

```mermaid
sequenceDiagram
    participant Backend
    participant Gemini
    participant Cache
    
    Backend->>Cache: Check if result cached
    Cache-->>Backend: Cache miss
    Backend->>Gemini: POST /v1/models/gemini-1.5-flash:generateContent
    
    Note over Gemini: Processing prompt<br/>(5-30 seconds)
    
    Gemini-->>Backend: Return JSON response
    Backend->>Backend: Parse response
    Backend->>Backend: Validate schema
    Backend->>Cache: Store result (TTL: 30 days)
    Backend->>Backend: Return to client
    
    Note over Cache: Future requests<br/>use cached data
```

---

### Integration 2: Supabase Realtime Subscription

```mermaid
flowchart TD
    A[Component Mounts] --> B[Setup Realtime Subscription]
    B --> C[supabase.channel 'crm_deals']
    C --> D[Listen for 'postgres_changes']
    D --> E{Event Type?}
    E -->|INSERT| F[Add Deal to State]
    E -->|UPDATE| G[Update Deal in State]
    E -->|DELETE| H[Remove Deal from State]
    F --> I[Re-render UI]
    G --> I
    H --> I
    
    J[Component Unmounts] --> K[Unsubscribe Channel]
    
    style B fill:#6366f1,color:#fff
    style I fill:#10b981,color:#fff
```

---

## State Management Workflows

### State Flow: Global Auth State

```mermaid
stateDiagram-v2
    [*] --> CheckingSession: App Loads
    CheckingSession --> Authenticated: Session Found
    CheckingSession --> Unauthenticated: No Session
    
    Unauthenticated --> LoginPage: Redirect /auth
    LoginPage --> LoggingIn: Submit Credentials
    LoggingIn --> Authenticated: Success
    LoggingIn --> LoginError: Invalid Credentials
    LoginError --> LoginPage
    
    Authenticated --> FetchingProfile: Load User Data
    FetchingProfile --> ProfileLoaded: Data Fetched
    ProfileLoaded --> Dashboard: Render App
    
    Dashboard --> LoggingOut: Click "Logout"
    LoggingOut --> ClearingSession: supabase.auth.signOut()
    ClearingSession --> Unauthenticated
```

---

## Testing Workflows (Future)

### Test Flow: E2E Deck Generation Test

```mermaid
flowchart TD
    A[Start Test] --> B[Mock Gemini API Response]
    B --> C[Login as Test User]
    C --> D[Navigate to /wizard]
    D --> E[Fill Step 1: Context]
    E --> F[Fill Step 2: Market]
    F --> G[Fill Step 3: Financials]
    G --> H[Fill Step 4: Template]
    H --> I[Click "Generate"]
    I --> J[Wait for Redirect]
    J --> K{URL = /editor/*?}
    K -->|Yes| L[Assert 12 Slides Exist]
    K -->|No| M[Test Failed]
    L --> N{All Slides Have Content?}
    N -->|Yes| O[Test Passed]
    N -->|No| M
    
    style O fill:#10b981,color:#fff
    style M fill:#ef4444,color:#fff
```

---

**Document Version:** 1.0  
**Last Updated:** December 8, 2024  
**Owner:** Product & Engineering Teams  
**Next Review:** January 8, 2025
