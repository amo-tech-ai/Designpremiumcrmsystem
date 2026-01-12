# 🚀 Wizard V2 + Startup Profile Integration Guide

**Date:** December 31, 2025  
**Status:** Ready for Integration  
**Tasks Complete:** Task 01 (Wizard) + Task 02 (Startup Profile)  

---

## ✅ WHAT'S READY

You have successfully built:

### ✅ **Task 01: Onboarding Wizard (Wizard V2)**
**Location:** `/components/wizard-v2/`
- 6-step wizard for new user onboarding
- LinkedIn enrichment with preview modal
- TAM calculator with mock results
- Review screen with completeness score
- Pitch deck generation with confetti 🎉
- **Status:** ✅ Complete (3/3 prompts)

### ✅ **Task 02: Startup Profile Page**
**Location:** `/components/startup-profile/`
- Profile view with 5 collapsible sections
- Left sidebar with Quick Jump navigation
- Completeness tracker with gradient progress bar
- AI enrichment modal (TAM/SAM/SOM calculator)
- 10 credible sources with star ratings
- **Status:** ✅ Complete (3/3 prompts)

---

## 🔗 HOW THEY WORK TOGETHER

### User Journey Flow:

```
1. New User Signs Up
   ↓
2. Onboarding Wizard (Task 01)
   - Step 1: Business Basics
   - Step 2: Market Context (TAM calculator)
   - Step 3: Team (LinkedIn enrichment) ⭐
   - Step 4: Traction
   - Step 5: Fundraising
   - Step 6: Review & Generate (pitch deck) ⭐
   ↓
3. Clicks "Go to Dashboard" → Redirects to...
   ↓
4. Startup Profile Page (Task 02)
   - Shows data from wizard
   - 73% completeness score
   - Can enrich missing fields with AI
   - Can edit inline
   ↓
5. User completes profile to 100%
   ↓
6. Dashboard (Task 03 - coming next)
```

---

## 📂 FILE STRUCTURE

### Current Implementation:

```
/components/
├── wizard-v2/                        ✅ NEW (Task 01)
│   ├── OnboardingWizard.tsx
│   └── steps/
│       ├── StepBusinessBasics.tsx
│       ├── StepMarketContext.tsx
│       ├── StepTeamEnrichment.tsx    ⭐ LinkedIn enrichment
│       ├── StepTractionMetrics.tsx
│       ├── StepFundraisingGoals.tsx
│       └── StepReviewGenerate.tsx    ⭐ Review & generate
│
├── startup-profile/                  ✅ NEW (Task 02)
│   ├── StartupProfilePage.tsx        ⭐ Main profile
│   ├── CompletenessTracker.tsx       ⭐ Progress bar
│   ├── EnrichmentModal.tsx           ⭐ TAM calculator
│   └── types.ts
│
└── wizard/                           ⚠️ OLD (legacy)
    ├── StartupProfileWizard.tsx      (Keep for reference)
    └── ...
```

---

## 🔧 INTEGRATION STEPS

### Step 1: Add New Wizard V2 to App.tsx

```tsx
// At the top with other lazy imports:
const OnboardingWizard = lazy(() => import('./components/wizard-v2/OnboardingWizard').then(m => ({ default: m.OnboardingWizard })));
const StartupProfilePage = lazy(() => import('./components/startup-profile/StartupProfilePage').then(m => ({ default: m.StartupProfilePage })));
```

### Step 2: Update View Types

```tsx
// Update the View type to include new views:
type View = 
  | 'onboarding'        // NEW - Wizard V2
  | 'startup-profile'   // Already exists (you added it)
  | 'dashboard' 
  | 'contacts' 
  // ... rest of views
```

### Step 3: Add URL Routes

```tsx
// In the viewToPath object around line 125:
const viewToPath: Record<View, string> = {
  'onboarding': '/onboarding',           // NEW
  'startup-profile': '/app/profile',     // Update this
  'dashboard': '/app',
  // ... rest
};
```

### Step 4: Add Render Logic

```tsx
// In the renderContent() function around line 200+:
if (currentView === 'onboarding') {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <OnboardingWizard 
        onComplete={() => setCurrentView('startup-profile')}
        onSaveDraft={async (data) => {
          // TODO: Save to Supabase
          console.log('Saving draft:', data);
        }}
      />
    </Suspense>
  );
}

if (currentView === 'startup-profile') {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <StartupProfilePage 
        profile={mockProfile} // TODO: Load from Supabase
        onUpdate={async (updates) => {
          // TODO: Update Supabase
          console.log('Updating profile:', updates);
        }}
        onShare={() => console.log('Share clicked')}
        onExport={() => console.log('Export clicked')}
      />
    </Suspense>
  );
}
```

### Step 5: Update Sidebar Navigation

```tsx
// In Sidebar.tsx, add navigation items:
{
  icon: <Sparkles className="w-5 h-5" />,
  label: 'Setup Wizard',
  view: 'onboarding',
  badge: 'New',
},
{
  icon: <User className="w-5 h-5" />,
  label: 'Startup Profile',
  view: 'startup-profile',
}
```

---

## 📊 DATA FLOW

### Wizard → Profile Data Mapping:

```typescript
// Wizard V2 collects this data:
interface WizardData {
  // Step 1: Business Basics
  problem: string;
  solution: string;
  oneLiner: string;
  
  // Step 2: Market Context
  industry: string;
  targetCustomer: string;
  competitors: string[];
  tam?: number;
  sam?: number;
  som?: number;
  
  // Step 3: Team
  founders: Founder[];
  
  // Step 4: Traction
  activeUsers?: number;
  mrr?: number;
  customers?: number;
  growthRate?: number;
  
  // Step 5: Fundraising
  fundingGoal?: number;
  stage?: string;
  timeline?: string;
  useOfFunds?: string;
}

// Profile Page uses this data:
interface StartupProfile {
  // Inherits all WizardData fields
  ...WizardData,
  
  // Plus additional fields:
  uvp?: string;
  businessModel?: string;
  revenueStreams?: string;
  pricing?: string;
  arpu?: number;
  ltv?: number;
  cac?: number;
  grossMargin?: number;
}
```

### Supabase Schema (Recommended):

```sql
-- Create startup_profiles table
CREATE TABLE startup_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  
  -- Business
  problem TEXT,
  solution TEXT,
  one_liner TEXT,
  uvp TEXT,
  business_model TEXT,
  
  -- Market
  industry TEXT,
  target_customer TEXT,
  competitors TEXT[], -- Array of strings
  tam BIGINT,         -- $28,000,000,000
  sam BIGINT,         -- $3,200,000,000
  som BIGINT,         -- $120,000,000
  
  -- Traction
  active_users INTEGER,
  mrr NUMERIC(12,2),
  customers INTEGER,
  growth_rate NUMERIC(5,2),
  
  -- Team
  team_size INTEGER,
  
  -- Model
  revenue_streams TEXT,
  pricing TEXT,
  arpu NUMERIC(10,2),
  ltv NUMERIC(10,2),
  cac NUMERIC(10,2),
  gross_margin NUMERIC(5,2),
  
  -- Fundraising
  funding_goal BIGINT,
  stage TEXT,
  timeline TEXT,
  use_of_funds TEXT,
  
  -- Meta
  completeness INTEGER DEFAULT 0, -- 0-100
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create founders table
CREATE TABLE founders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES startup_profiles(id),
  full_name TEXT NOT NULL,
  role TEXT,
  linkedin_url TEXT,
  avatar_url TEXT,
  bio TEXT,
  education TEXT[],
  experience JSONB, -- [{ company, title, duration }]
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create market_sources table (for TAM citations)
CREATE TABLE market_sources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES startup_profiles(id),
  title TEXT,
  url TEXT,
  credibility INTEGER, -- 1-5 stars
  date TEXT,
  publisher TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 🎯 TESTING CHECKLIST

### Wizard V2 (Task 01)
- [ ] Wizard loads at `/onboarding`
- [ ] All 6 steps navigate correctly
- [ ] Progress bar updates (0% → 100%)
- [ ] Step 3: LinkedIn modal opens and enriches
- [ ] Step 6: Completeness calculates correctly
- [ ] Step 6: Deck generation animates
- [ ] Step 6: Confetti fires on complete
- [ ] "Go to Dashboard" redirects to profile
- [ ] Draft saves to localStorage (temporary)

### Startup Profile (Task 02)
- [ ] Profile loads at `/app/profile`
- [ ] Shows data from wizard
- [ ] Completeness tracker displays (73%)
- [ ] Sections expand/collapse
- [ ] "AI can help" badges appear
- [ ] Enrichment modal opens
- [ ] TAM results display correctly
- [ ] 10 sources show with stars
- [ ] "Add to Profile" updates data
- [ ] Auto-save indicator works

### Integration
- [ ] Wizard → Profile transition smooth
- [ ] Data persists between pages
- [ ] Sidebar navigation works
- [ ] URL routes work correctly
- [ ] Back/forward browser buttons work
- [ ] Responsive on mobile
- [ ] No console errors

---

## ⚠️ KNOWN ISSUES & TODOS

### Current Limitations:

1. **Mock Data Only**
   - LinkedIn enrichment shows mock profile (Sarah Chen)
   - TAM calculator shows fixed results ($28B, $3.2B, $120M)
   - No real AI integration yet

2. **No Persistence**
   - Data only lives in component state
   - Refreshing page loses all data
   - Need Supabase integration

3. **No Validation**
   - Can proceed with empty required fields
   - No field-level error messages
   - No consistency checks (e.g., ARPU = MRR / customers)

4. **Missing Features**
   - No share link generation
   - No PDF export
   - No version history
   - No collaborative editing

### Next Steps (Backend Integration):

#### 1. Supabase Setup
```bash
# Create tables
psql $DATABASE_URL < schema.sql

# Set up Row Level Security (RLS)
# Only users can see their own profile
```

#### 2. Replace Mock Data with Gemini API
```typescript
// Step 3: LinkedIn Enrichment
const enrichProfile = async (linkedinUrl: string) => {
  const response = await fetch('/api/enrich-linkedin', {
    method: 'POST',
    body: JSON.stringify({ url: linkedinUrl })
  });
  
  // Gemini uses URL Context to scrape LinkedIn
  // Returns: name, bio, education, experience
};

// Step 2: TAM Calculator
const calculateTAM = async (industry: string, target: string) => {
  const response = await fetch('/api/calculate-tam', {
    method: 'POST',
    body: JSON.stringify({ industry, target })
  });
  
  // Gemini uses Grounding with Search
  // Finds market reports, calculates TAM/SAM/SOM
  // Returns citations with credibility scores
};
```

#### 3. Add Validation
```typescript
// Analyst Agent validates profile
const validateProfile = async (profile: StartupProfile) => {
  const warnings = [];
  
  // Check ARPU consistency
  if (profile.mrr && profile.customers) {
    const calculatedArpu = profile.mrr / profile.customers;
    if (Math.abs(calculatedArpu - (profile.arpu || 0)) > 1) {
      warnings.push({
        field: 'arpu',
        message: `ARPU should be ~$${calculatedArpu.toFixed(2)} based on MRR/customers`
      });
    }
  }
  
  // Check unrealistic growth
  if (profile.growthRate > 100) {
    warnings.push({
      field: 'growthRate',
      message: 'Growth >100% month-over-month is extremely rare'
    });
  }
  
  return warnings;
};
```

---

## 🚀 QUICK START

### For Testing (No Backend):

```tsx
// 1. Add imports to App.tsx
import { OnboardingWizard } from './components/wizard-v2/OnboardingWizard';
import { StartupProfilePage } from './components/startup-profile/StartupProfilePage';

// 2. Add mock profile data
const [wizardData, setWizardData] = useState<WizardData | null>(null);

// 3. In renderContent():
if (currentView === 'onboarding') {
  return (
    <OnboardingWizard 
      onComplete={() => setCurrentView('startup-profile')}
      onSaveDraft={async (data) => {
        setWizardData(data);
        localStorage.setItem('wizard_draft', JSON.stringify(data));
      }}
    />
  );
}

if (currentView === 'startup-profile') {
  const profile = wizardData || JSON.parse(localStorage.getItem('wizard_draft') || '{}');
  
  return (
    <StartupProfilePage 
      profile={profile}
      onUpdate={async (updates) => {
        const updated = { ...profile, ...updates };
        setWizardData(updated);
        localStorage.setItem('wizard_draft', JSON.stringify(updated));
      }}
    />
  );
}

// 4. Navigate to /onboarding to test
```

---

## 📚 DOCUMENTATION GENERATED

### Task 01 Docs:
- `/docs/dashboards/tasks/TASK-01-COMPLETE.md` — Full wizard completion report
- `/WIZARD-V2-IMPLEMENTATION.md` — Quick reference guide

### Task 02 Docs:
- `/docs/dashboards/tasks/TASK-02-COMPLETE.md` — Full profile completion report (you created this!)

### Progress Tracking:
- `/docs/dashboards/tasks/00-progress.md` — Master tracker (updated)

---

## 🎯 SUMMARY

### ✅ What You Have:
1. **Wizard V2** — 6-step onboarding flow with LinkedIn + TAM enrichment
2. **Startup Profile** — Profile page with completeness tracker + AI enrichment

### ⚠️ What's Missing:
1. Integration into App.tsx routing
2. Supabase persistence
3. Real AI (Gemini) backend
4. Validation warnings

### 🚀 Next Task:
**Task 03: Dashboard (3-panel layout)**
- Main dashboard with KPI cards
- Next Best Action banner
- AI Insights panel on right
- Activity feed

---

## ❓ YOUR QUESTION ANSWERED

> "is the wizard setup completely"

### Answer: **Almost! Here's the status:**

✅ **UI/UX Complete:**
- Wizard V2 is 100% built and functional
- Startup Profile is 100% built and functional
- All 6 prompts implemented (3 wizard + 3 profile)

⚠️ **Integration Needed:**
- Not yet added to App.tsx routing
- Not yet connected to Supabase
- Not yet using real AI (mock data only)

⏭️ **To Fully Set Up:**
1. Add to App.tsx (see "Integration Steps" above)
2. Test the flow: Onboarding → Profile
3. (Optional) Add Supabase persistence
4. (Later) Replace mocks with Gemini API

### Quick Test Without Integration:
```bash
# Create a test page to see the wizard:
# /test-wizard.tsx

import { OnboardingWizard } from './components/wizard-v2/OnboardingWizard';

export default function TestWizard() {
  return (
    <OnboardingWizard 
      onComplete={() => alert('Complete!')}
      onSaveDraft={async (data) => console.log(data)}
    />
  );
}

# Visit: http://localhost:5173/test-wizard
```

---

**Ready to integrate? Follow the "Integration Steps" section above!** 🚀

