# StartupAI - System Architecture & Flow Diagrams

**Version:** 2.0  
**Last Updated:** December 22, 2025  
**Status:** Production Ready  
**Document Type:** System Architecture Reference  

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Three-Tier Architecture](#three-tier-architecture)
3. [Frontend Architecture](#frontend-architecture)
4. [Backend Architecture](#backend-architecture)
5. [Data Flow Diagrams](#data-flow-diagrams)
6. [Authentication Flow](#authentication-flow)
7. [AI Integration Architecture](#ai-integration-architecture)
8. [State Management](#state-management)

---

## System Overview

StartupAI follows a **modern three-tier architecture** with a React frontend, Supabase Edge Functions backend, and PostgreSQL database.

### High-Level Architecture

```mermaid
graph TB
    subgraph Client["Client Layer (Browser)"]
        React[React 18 + TypeScript]
        Motion[Motion/Framer Motion]
        Tailwind[Tailwind CSS 4.0]
        State[React State + Context]
    end
    
    subgraph Edge["Edge Layer (Supabase)"]
        Hono[Hono Web Server]
        Deno[Deno Runtime]
        Auth[Supabase Auth]
        Storage[Supabase Storage]
    end
    
    subgraph Data["Data Layer"]
        Postgres[(PostgreSQL 15+)]
        KV[(KV Store)]
        Realtime[Realtime Subscriptions]
    end
    
    subgraph External["External Services"]
        Gemini[Google Gemini 3 Pro]
        APIs[External APIs]
    end
    
    React -->|HTTPS/REST| Hono
    React -->|Auth Tokens| Auth
    React -->|WebSocket| Realtime
    
    Hono -->|SQL Queries| Postgres
    Hono -->|Read/Write| KV
    Hono -->|AI Requests| Gemini
    Hono -->|File Upload| Storage
    
    Auth -->|User Management| Postgres
    
    style Client fill:#FF6A3D,color:#fff
    style Edge fill:#111827,color:#fff
    style Data fill:#10B981,color:#fff
    style External fill:#8B5CF6,color:#fff
```

---

## Three-Tier Architecture

### Tier 1: Frontend (Client)

```mermaid
graph TD
    subgraph Frontend["Frontend Architecture"]
        Entry[App.tsx Entry Point]
        Router[State-Based Router]
        Lazy[Lazy Loading System]
        
        subgraph Components["Component Tree"]
            Marketing[Marketing Pages]
            Dashboard[Dashboard Views]
            Wizards[Wizard Forms]
            Editors[Rich Editors]
        end
        
        subgraph State["State Management"]
            Local[Local State - useState]
            Context[Context API - Wizards]
            Hooks[Custom Hooks - Data Fetching]
        end
        
        subgraph UI["UI Layer"]
            Shadcn[shadcn/ui Components]
            Icons[Lucide Icons]
            Charts[Recharts]
        end
    end
    
    Entry --> Router
    Router --> Lazy
    Lazy --> Components
    Components --> State
    Components --> UI
    
    style Entry fill:#FF6A3D,color:#fff
    style Router fill:#111827,color:#fff
    style Components fill:#10B981,color:#fff
```

**Technology Stack:**
- **Framework:** React 18 with TypeScript
- **Styling:** Tailwind CSS 4.0 (utility-first)
- **Animation:** Motion (Framer Motion)
- **Routing:** Client-side state routing
- **Forms:** React Hook Form 7.55.0
- **Icons:** Lucide React
- **UI Components:** shadcn/ui

**Key Patterns:**
- Component composition over inheritance
- Lazy loading for code splitting
- Error boundaries for fault isolation
- Suspense for async data loading
- Custom hooks for reusable logic

---

### Tier 2: Backend (Edge Functions)

```mermaid
graph TD
    subgraph Backend["Backend Architecture"]
        Entry[index.tsx Main Server]
        
        subgraph Middleware["Middleware Stack"]
            Logger[Logger Middleware]
            CORS[CORS Handler]
            AuthMW[Auth Middleware]
            Error[Error Handler]
        end
        
        subgraph Routes["API Routes"]
            Deck[Deck Generation]
            CRM[CRM Operations]
            AI[AI Services]
            Storage[File Storage]
            Profile[Profile Services]
        end
        
        subgraph Services["Service Layer"]
            Gemini[Gemini AI Client]
            Supabase[Supabase Client]
            KV[KV Store Utils]
        end
    end
    
    Entry --> Middleware
    Middleware --> Routes
    Routes --> Services
    
    style Entry fill:#111827,color:#fff
    style Middleware fill:#3B82F6,color:#fff
    style Routes fill:#FF6A3D,color:#fff
    style Services fill:#10B981,color:#fff
```

**Technology Stack:**
- **Runtime:** Deno (serverless)
- **Framework:** Hono.js (web server)
- **Language:** TypeScript
- **Auth:** Supabase Auth SDK
- **AI:** Google Gemini API

**Middleware Stack (Order of Execution):**
1. **Logger:** `app.use('*', logger(console.log))`
2. **CORS:** `app.use('*', cors({ origin: '*' }))`
3. **Auth:** Token validation via `getUser()`
4. **Error Handling:** Try-catch with detailed responses

**Route Prefix:** All routes prefixed with `/make-server-6522a742`

---

### Tier 3: Database (PostgreSQL)

```mermaid
graph TD
    subgraph Database["Database Architecture"]
        subgraph Core["Core Tables"]
            Profiles[profiles]
            Orgs[orgs]
            Startups[startups]
            Founders[startup_founders]
        end
        
        subgraph Deck["Pitch Deck System"]
            Decks[decks]
            Slides[slides]
            Citations[citations]
            Shares[share_links]
        end
        
        subgraph CRM["CRM System"]
            Contacts[crm_contacts]
            Accounts[crm_accounts]
            Deals[crm_deals]
            Tasks[crm_tasks]
            Interactions[crm_interactions]
        end
        
        subgraph Features["Feature Tables"]
            Investors[investors]
            Events[events]
            Jobs[jobs]
            Accelerators[accelerators]
        end
    end
    
    Startups -->|1:N| Founders
    Startups -->|1:N| Decks
    Decks -->|1:N| Slides
    Contacts -->|N:1| Accounts
    Deals -->|N:1| Accounts
    Deals -->|N:1| Contacts
    
    style Core fill:#111827,color:#fff
    style Deck fill:#8B5CF6,color:#fff
    style CRM fill:#FF6A3D,color:#fff
    style Features fill:#10B981,color:#fff
```

**Database Features:**
- **Row-Level Security (RLS):** Tenant isolation
- **Full-Text Search:** Indexed search on key columns
- **Audit Logs:** Automatic change tracking
- **Timestamps:** `created_at`, `updated_at` on all tables
- **Foreign Keys:** Referential integrity
- **Indexes:** Optimized query performance

---

## Frontend Architecture

### Component Hierarchy

```mermaid
graph TB
    App[App.tsx - Root Component]
    
    App --> Public[Public Routes]
    App --> Auth[Authenticated Routes]
    
    subgraph Public Routes
        Landing[LandingPageV2]
        Style[StyleGuidePage]
        Marketing[Marketing Pages]
    end
    
    subgraph Auth Routes
        Shell[App Shell]
        
        Shell --> Nav[Sidebar + TopNavbar]
        Shell --> Main[Main Content]
        
        Main --> Dash[Dashboard]
        Main --> CRMViews[CRM Views]
        Main --> Tools[Tools]
        Main --> Wizards[Wizards]
        Main --> Settings[Settings]
    end
    
    Dash --> Metrics[KPI Cards]
    Dash --> Widgets[Dashboard Widgets]
    
    CRMViews --> ContactsGrid[Contacts Dashboard]
    CRMViews --> Pipeline[Pipeline Kanban]
    CRMViews --> ContactDetail[Contact Detail]
    
    Tools --> Projects[Projects Dashboard]
    Tools --> Docs[Document Workspace]
    
    Wizards --> DeckWizard[Pitch Deck Wizard]
    Wizards --> ProfileWizard[Startup Profile Wizard]
    
    style App fill:#111827,color:#fff
    style Shell fill:#FF6A3D,color:#fff
    style CRMViews fill:#10B981,color:#fff
```

### Data Fetching Pattern

```mermaid
sequenceDiagram
    participant Component
    participant Hook as Custom Hook
    participant Supabase
    participant State
    
    Component->>Hook: useContacts()
    Hook->>State: Set loading = true
    Hook->>Supabase: .from('crm_contacts').select('*')
    
    alt Database Available
        Supabase->>Hook: Return data[]
        Hook->>State: Set contacts = data
    else Database Unavailable
        Supabase->>Hook: Error
        Hook->>State: Set contacts = demoData
    end
    
    Hook->>State: Set loading = false
    Hook->>Component: Return { contacts, loading, error }
    Component->>Component: Render UI
```

**Custom Hooks Pattern:**

```typescript
export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getContacts = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('crm_contacts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        // Fallback to demo data
        setContacts(demoData);
      } else {
        setContacts(data || []);
      }
    } catch (err) {
      setContacts(demoData);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getContacts();
  }, [getContacts]);

  return { contacts, loading, error, refresh: getContacts };
};
```

---

## Backend Architecture

### Request Processing Flow

```mermaid
graph LR
    Client[React Client] -->|1. HTTP Request| Entry[Hono Server Entry]
    Entry -->|2. Middleware| Logger[Logger]
    Logger -->|3. CORS Check| CORS[CORS Handler]
    CORS -->|4. Auth Check| Auth[Auth Middleware]
    Auth -->|5. Route Match| Handler[Route Handler]
    
    Handler -->|6. Business Logic| Service[Service Layer]
    Service -->|7a. DB Query| DB[(PostgreSQL)]
    Service -->|7b. AI Call| Gemini[Gemini API]
    Service -->|7c. File Op| Storage[Supabase Storage]
    
    Service -->|8. Process Data| Response[Response Builder]
    Response -->|9. JSON| Client
    
    style Client fill:#FF6A3D,color:#fff
    style Entry fill:#111827,color:#fff
    style Handler fill:#10B981,color:#fff
    style Service fill:#8B5CF6,color:#fff
```

### API Route Structure

```
/make-server-6522a742/
├── health                          GET  - Health check
├── generate-deck                   POST - Generate pitch deck
├── slide-ai                        POST - Generate single slide
├── image-ai                        POST - Generate image
├── research-ai                     POST - Market research
├── seed-crm                        POST - Seed demo data
├── crm/
│   ├── stats                       GET  - CRM statistics
│   └── ai/
│       ├── summarize               POST - Summarize contact
│       ├── score                   POST - Score lead
│       ├── extract-from-url        POST - Enrich from URL
│       └── analyze-deal            POST - Analyze deal
├── storage/
│   └── upload-url                  POST - Get upload URL
├── startup-profile                 GET  - Get profile
└── company-profile/
    └── ai-analyze                  POST - Analyze profile
```

---

## Data Flow Diagrams

### Pitch Deck Generation Flow

```mermaid
sequenceDiagram
    participant User
    participant Wizard as Pitch Deck Wizard
    participant API as Backend API
    participant Gemini as Gemini AI
    participant DB as Database
    participant Editor as Deck Editor
    
    User->>Wizard: Fill 4-step form
    User->>Wizard: Click "Generate"
    Wizard->>API: POST /generate-deck
    
    API->>DB: Fetch startup profile
    DB->>API: Return profile data
    
    API->>Gemini: Generate deck (structured JSON)
    Note over Gemini: ~30-60 seconds
    Gemini->>API: Return 12 slides
    
    loop For each slide
        API->>Gemini: Generate layout
        Gemini->>API: Return layout
        API->>Gemini: Generate hero image (optional)
        Gemini->>API: Return image URL
        API->>DB: Insert slide
    end
    
    API->>DB: Create deck record
    DB->>API: Return deck_id
    
    API->>Wizard: { deck_id, status: 'complete' }
    Wizard->>Editor: Navigate to /editor
    Editor->>DB: Fetch deck by ID
    DB->>Editor: Return deck + slides
    Editor->>User: Show editable canvas
```

### Contact Enrichment Flow

```mermaid
sequenceDiagram
    participant User
    participant Detail as Contact Detail Page
    participant API as Backend API
    participant Gemini as Gemini AI
    participant DB as Database
    
    User->>Detail: Paste LinkedIn URL
    User->>Detail: Click "Enrich"
    Detail->>API: POST /crm/ai/extract-from-url
    
    API->>Gemini: Extract profile data
    Note over Gemini: Scrape + AI extraction
    Gemini->>API: { name, title, company, bio }
    
    API->>Detail: Return enriched data
    Detail->>Detail: Auto-populate fields
    Detail->>DB: Update crm_contacts
    DB->>Detail: Confirm update
    Detail->>User: Show success toast
```

### Realtime CRM Updates

```mermaid
sequenceDiagram
    participant UserA as User A (Browser)
    participant UserB as User B (Browser)
    participant Frontend as React App
    participant Supabase as Supabase Realtime
    participant DB as PostgreSQL
    
    UserA->>Frontend: Update deal stage
    Frontend->>DB: UPDATE crm_deals
    DB->>DB: Trigger postgres_changes
    DB->>Supabase: Broadcast change event
    
    Supabase->>Frontend: Send update to UserA
    Supabase->>UserB: Send update to UserB
    
    Frontend->>Frontend: Refresh local state
    UserB->>UserB: See live update
    
    Note over UserA,UserB: Both see updated pipeline
```

---

## Authentication Flow

### User Signup & Onboarding

```mermaid
sequenceDiagram
    participant User
    participant Landing as Landing Page
    participant Auth as AuthPage
    participant API as Backend /signup
    participant Supabase as Supabase Auth
    participant Wizard as Startup Profile Wizard
    participant Dash as Dashboard
    
    User->>Landing: Click "Sign Up"
    Landing->>Auth: Navigate
    Auth->>User: Show signup form
    
    User->>Auth: Enter email + password
    Auth->>API: POST /signup
    API->>Supabase: admin.createUser()
    
    Note over Supabase: email_confirm: true<br/>(auto-verify)
    
    Supabase->>API: { user, session }
    API->>Auth: { access_token }
    
    Auth->>Wizard: Auto-redirect
    Wizard->>User: Show 6-step wizard
    
    loop 6 steps
        User->>Wizard: Fill step
        Wizard->>Wizard: Validate
    end
    
    User->>Wizard: Submit
    Wizard->>API: Save startup profile
    API->>Wizard: Success
    
    Wizard->>Dash: Navigate to dashboard
    Dash->>User: Welcome screen
```

### Session Management

```mermaid
graph TD
    Start[App Loads] --> Check{Check Session}
    
    Check -->|Session Exists| Valid{Validate Token}
    Check -->|No Session| Public[Show Public Routes]
    
    Valid -->|Valid| App[Load App Shell]
    Valid -->|Invalid| Refresh{Refresh Token}
    
    Refresh -->|Success| App
    Refresh -->|Failure| Public
    
    App --> Protected[Protected Routes]
    Public --> Landing[Landing Page]
    
    style Start fill:#111827,color:#fff
    style App fill:#10B981,color:#fff
    style Public fill:#FF6A3D,color:#fff
```

**Session Storage:**
```typescript
// Check existing session
const { data: { session } } = await supabase.auth.getSession();

// Listen for auth state changes
supabase.auth.onAuthStateChange((_event, session) => {
  setSession(session);
});

// Sign out
await supabase.auth.signOut();
```

---

## AI Integration Architecture

### Gemini API Integration

```mermaid
graph TB
    subgraph Frontend
        UI[User Interface]
    end
    
    subgraph Backend["Backend (Edge Function)"]
        Route[API Route Handler]
        Prompt[Prompt Engineering]
        Client[Gemini API Client]
    end
    
    subgraph Gemini["Google Gemini 3 Pro"]
        Model[Language Model]
        Grounding[Search Grounding]
        Thinking[Thinking Mode]
    end
    
    subgraph Output
        JSON[Structured JSON]
        Text[Raw Text]
        Image[Image Generation]
    end
    
    UI -->|Request| Route
    Route -->|Build Prompt| Prompt
    Prompt -->|API Call| Client
    Client -->|HTTPS| Model
    
    Model -->|Process| Grounding
    Model -->|Complex Task| Thinking
    
    Model -->|Response| JSON
    Model -->|Response| Text
    Model -->|Response| Image
    
    JSON -->|Parse| Route
    Text -->|Process| Route
    Image -->|URL| Route
    
    Route -->|Return| UI
    
    style Backend fill:#111827,color:#fff
    style Gemini fill:#8B5CF6,color:#fff
    style Output fill:#10B981,color:#fff
```

### AI Use Cases

```mermaid
graph LR
    subgraph Deck["Pitch Deck Generation"]
        D1[Market Analysis]
        D2[Competitor Research]
        D3[Slide Content]
        D4[Visual Assets]
    end
    
    subgraph CRM["CRM Intelligence"]
        C1[Contact Summarization]
        C2[Lead Scoring]
        C3[Profile Enrichment]
        C4[Deal Analysis]
    end
    
    subgraph Profile["Profile Analysis"]
        P1[Strength Assessment]
        P2[Gap Identification]
        P3[Recommendations]
    end
    
    Gemini[Gemini AI] --> Deck
    Gemini --> CRM
    Gemini --> Profile
    
    style Gemini fill:#8B5CF6,color:#fff
    style Deck fill:#FF6A3D,color:#fff
    style CRM fill:#10B981,color:#fff
    style Profile fill:#3B82F6,color:#fff
```

**AI Features:**
- **Structured Output:** JSON mode for predictable responses
- **Search Grounding:** Real-time market data verification
- **Thinking Mode:** Multi-step reasoning for complex tasks
- **Context Window:** Up to 128K tokens
- **Caching:** Prompt caching for cost optimization

---

## State Management

### State Architecture

```mermaid
graph TD
    subgraph App["App-Level State"]
        Session[Session State]
        CurrentView[Current View]
        PipelineMode[Pipeline Mode]
    end
    
    subgraph Component["Component-Level State"]
        Local[Local useState]
        Forms[Form State]
        UI[UI State]
    end
    
    subgraph Context["Context API"]
        Wizard[Wizard Context]
        Profile[Profile Context]
    end
    
    subgraph Server["Server State (Hooks)"]
        Contacts[useContacts]
        Deals[useDeals]
        Tasks[useTasks]
        Activities[useActivities]
    end
    
    App --> Component
    Component --> Context
    Component --> Server
    
    Server -->|Supabase| DB[(Database)]
    
    style App fill:#111827,color:#fff
    style Component fill:#FF6A3D,color:#fff
    style Context fill:#10B981,color:#fff
    style Server fill:#8B5CF6,color:#fff
```

### State Patterns

**1. Local State (Simple UI)**
```typescript
const [isOpen, setIsOpen] = useState(false);
const [searchQuery, setSearchQuery] = useState('');
```

**2. Context API (Wizard Forms)**
```typescript
const WizardContext = createContext<WizardState | null>(null);

export const WizardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>(initialData);
  
  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  return (
    <WizardContext.Provider value={{ formData, updateField }}>
      {children}
    </WizardContext.Provider>
  );
};
```

**3. Custom Hooks (Server Data)**
```typescript
const { contacts, loading, refresh } = useContacts();
const { deals, updateDeal } = useDeals('investor');
const { tasks, createTask } = useTasks();
```

**4. Realtime Subscriptions**
```typescript
useRealtimeCRM(() => {
  refreshContacts();
  refreshDeals();
});
```

---

## Error Handling

### Frontend Error Boundaries

```mermaid
graph TD
    App[App.tsx] --> AppEB[AppErrorBoundary]
    
    AppEB --> CRM[CRM Routes]
    AppEB --> Editor[Editor Routes]
    AppEB --> Default[Default Routes]
    
    CRM --> CRMEB[CRMErrorBoundary]
    Editor --> EditorEB[EditorErrorBoundary]
    
    CRMEB --> Safe1[Graceful Fallback UI]
    EditorEB --> Safe2[Graceful Fallback UI]
    Default --> Safe3[Default Error UI]
    
    style AppEB fill:#EF4444,color:#fff
    style CRMEB fill:#F59E0B,color:#fff
    style EditorEB fill:#F59E0B,color:#fff
```

**Error Boundary Implementation:**
```typescript
class CRMErrorBoundary extends React.Component {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('CRM Error:', error, errorInfo);
    toast.error('Something went wrong in the CRM');
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>CRM Error</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
```

---

## Performance Optimization

### Code Splitting Strategy

```mermaid
graph TD
    Main[Main Bundle] --> Core[Core Dependencies]
    Main --> Router[Routing Logic]
    
    Router --> Lazy1[Landing Page Bundle]
    Router --> Lazy2[Dashboard Bundle]
    Router --> Lazy3[Editor Bundle]
    Router --> Lazy4[Wizard Bundle]
    Router --> Lazy5[CRM Bundle]
    
    Lazy3 --> EditorDeps[Editor Dependencies]
    Lazy4 --> WizardDeps[Wizard Dependencies]
    
    style Main fill:#111827,color:#fff
    style Lazy1 fill:#FF6A3D,color:#fff
    style Lazy2 fill:#10B981,color:#fff
    style Lazy3 fill:#8B5CF6,color:#fff
    style Lazy4 fill:#3B82F6,color:#fff
```

**Bundle Sizes (Estimated):**
- Main Bundle: ~80 KB
- Landing Page: ~45 KB
- Dashboard: ~60 KB
- Pitch Deck Editor: ~120 KB
- CRM Views: ~80 KB

---

## End of Document

**Related Documentation:**
- [01-overview.md](./01-overview.md) - Complete technical overview
- [02-sitemap.md](./02-sitemap.md) - Routes and navigation
- [README.md](./README.md) - Documentation index

**Next Steps:**
1. Review error handling strategy
2. Optimize bundle sizes
3. Add performance monitoring
4. Document API rate limits
5. Create deployment architecture diagram
