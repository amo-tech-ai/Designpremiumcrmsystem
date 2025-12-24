# INITIAL SETUP PROMPT — CORE FOUNDATION

**Version:** 1.0  
**Last Updated:** December 23, 2025  
**Status:** Production-Ready Setup Guide  
**Document Type:** Step-by-Step Project Initialization  
**Purpose:** Zero to running application in under 30 minutes

---

## Document Purpose

This document provides the **exact steps** to initialize a production-ready web application from scratch. This is the **first thing you do** before writing any feature code.

**Timeline:** 20-30 minutes  
**Outcome:** A clean, building, routable foundation ready for feature development

---

## Prerequisites

Before starting, ensure you have:

| Requirement | Version | Check Command | Install Command |
|-------------|---------|---------------|-----------------|
| **Node.js** | 18.x or 20.x | `node --version` | [nodejs.org](https://nodejs.org) |
| **npm** | 9.x or 10.x | `npm --version` | Included with Node.js |
| **Git** | 2.x+ | `git --version` | [git-scm.com](https://git-scm.com) |
| **Code Editor** | VS Code recommended | — | [code.visualstudio.com](https://code.visualstudio.com) |

---

## STAGE 0 — PROJECT INITIALIZATION (5 minutes)

### Step 1: Create Project with Vite

```bash
# Create new React + TypeScript project
npm create vite@latest startup-ai -- --template react-ts

# Navigate into project
cd startup-ai

# Install dependencies
npm install
```

**What this does:**
- Creates a new React 18 + TypeScript 5 project
- Sets up Vite as the build tool (fast HMR, optimized builds)
- Installs React, ReactDOM, and TypeScript
- Creates basic `package.json`, `tsconfig.json`, `index.html`

---

### Step 2: Install Core Dependencies

```bash
# Routing
npm install react-router-dom

# Supabase (Backend + Auth)
npm install @supabase/supabase-js

# UI Libraries
npm install lucide-react        # Icons
npm install sonner              # Toast notifications
npm install class-variance-authority clsx tailwind-merge  # Utility classes

# Development dependencies
npm install -D @types/node
```

**Dependency explanations:**

| Package | Purpose | Why Required |
|---------|---------|--------------|
| `react-router-dom` | Client-side routing | Multi-page navigation without server requests |
| `@supabase/supabase-js` | Backend SDK | Database, auth, storage, edge functions |
| `lucide-react` | Icon library | 1000+ icons, tree-shakable, consistent design |
| `sonner` | Toast notifications | User feedback for actions (success, error) |
| `clsx` + `tailwind-merge` | Utility helpers | Merge Tailwind classes without conflicts |

---

### Step 3: Install Tailwind CSS v4

```bash
# Install Tailwind CSS v4
npm install tailwindcss@next @tailwindcss/vite@next

# Install PostCSS (required by Tailwind)
npm install -D postcss autoprefixer
```

---

### Step 4: Verify Installation

```bash
# Check all dependencies installed
npm list --depth=0

# Expected output:
# startup-ai@0.0.0
# ├── @supabase/supabase-js@2.x.x
# ├── react@18.x.x
# ├── react-dom@18.x.x
# ├── react-router-dom@7.x.x
# ├── lucide-react@0.x.x
# ├── tailwindcss@4.x.x
# └── ... (other dependencies)
```

---

## STAGE 1 — CONFIGURATION (10 minutes)

### Step 1: Configure TypeScript (`tsconfig.json`)

Replace the default `tsconfig.json` with this production-ready config:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    /* Path Aliases */
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

**Key settings explained:**
- `"strict": true` — Enables all strict type-checking
- `"baseUrl": "."` — Resolves imports from project root
- `"paths": { "@/*": ["./*"] }` — Enables `@/components/Button` imports
- `"jsx": "react-jsx"` — Uses new JSX transform (no `import React` needed)

---

### Step 2: Configure Vite (`vite.config.ts`)

Create `vite.config.ts` in project root:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  server: {
    port: 5173,
    open: true, // Auto-open browser on dev server start
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
});
```

**What this does:**
- Enables React plugin with Fast Refresh
- Configures Tailwind CSS v4 plugin
- Sets up path alias resolution (`@/` → project root)
- Configures dev server on port 5173
- Optimizes production builds with code splitting

---

### Step 3: Configure Tailwind CSS (`styles/globals.css`)

Create `styles/globals.css`:

```css
/* Tailwind CSS v4 imports */
@import "tailwindcss";

/* Design Tokens */
:root {
  /* Colors - Pastel palette for AI-native feel */
  --color-primary: 255 106 61;        /* Orange - FF6A3D */
  --color-secondary: 59 130 246;      /* Blue - 3B82F6 */
  --color-success: 16 185 129;        /* Green - 10B981 */
  --color-warning: 245 158 11;        /* Amber - F59E0B */
  --color-danger: 239 68 68;          /* Red - EF4444 */
  --color-purple: 139 92 246;         /* Purple - 8B5CF6 */
  
  /* Neutrals */
  --color-slate-50: 248 250 252;
  --color-slate-100: 241 245 249;
  --color-slate-200: 226 232 240;
  --color-slate-300: 203 213 225;
  --color-slate-500: 100 116 139;
  --color-slate-600: 71 85 105;
  --color-slate-700: 51 65 85;
  --color-slate-800: 30 41 59;
  --color-slate-900: 15 23 42;
  
  /* Spacing */
  --spacing-unit: 4px;
  
  /* Border radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
}

/* Typography - Custom defaults per element */
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: rgb(15 23 42); /* slate-900 */
  background-color: rgb(248 250 252); /* slate-50 */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1 {
  font-size: 2.25rem;     /* 36px */
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

h2 {
  font-size: 1.875rem;    /* 30px */
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.01em;
}

h3 {
  font-size: 1.5rem;      /* 24px */
  font-weight: 600;
  line-height: 1.4;
}

h4 {
  font-size: 1.25rem;     /* 20px */
  font-weight: 600;
  line-height: 1.5;
}

p {
  font-size: 1rem;        /* 16px */
  line-height: 1.6;
  margin-bottom: 1rem;
}

/* Reset default margins */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Focus styles for accessibility */
*:focus-visible {
  outline: 2px solid rgb(var(--color-primary));
  outline-offset: 2px;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar (Webkit browsers) */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: rgb(241 245 249); /* slate-100 */
}

::-webkit-scrollbar-thumb {
  background: rgb(203 213 225); /* slate-300 */
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgb(100 116 139); /* slate-500 */
}
```

---

### Step 4: Update `index.html`

Replace the default `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- Primary Meta Tags -->
    <title>StartupAI — AI-Native Startup Operating System</title>
    <meta name="title" content="StartupAI — AI-Native Startup Operating System" />
    <meta name="description" content="Transform months of fundraising and GTM work into hours with AI-powered pitch decks, CRM, and strategic planning tools." />
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    
    <!-- Google Fonts - Inter -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/App.tsx"></script>
  </body>
</html>
```

---

### Step 5: Create `.figmaignore` (CRITICAL)

Create `.figmaignore` in project root:

```
# ⚠️ CRITICAL: Do NOT delete this file!
# This file prevents Figma Make from attempting to deploy backend code
# which causes 403 "cannot deploy Edge Functions" errors.

# Backend and server-side code
supabase/
/supabase/functions/server/**

# Documentation (not needed in production)
docs/
guidelines/
*.md
!README.md

# Config and build artifacts
node_modules/
dist/
build/
.vite/
.next/
.vercel/

# Environment files
.env
.env.local
.env.production
.env.development

# Logs
*.log
npm-debug.log*
yarn-debug.log*
pnpm-debug.log*

# OS files
.DS_Store
Thumbs.db

# IDE files
.vscode/
.idea/
*.swp
*.swo
*~

# Test files
__tests__/
*.test.ts
*.test.tsx
*.spec.ts
*.spec.tsx
coverage/
```

**Why this is critical:**
- Prevents recurring 403 deployment errors
- Figma Make tries to deploy all files unless explicitly ignored
- This file has been automatically deleted 8+ times in the project history
- **NEVER DELETE THIS FILE**

---

## STAGE 2 — DIRECTORY STRUCTURE (5 minutes)

### Step 1: Create Core Directories

```bash
# Create all core directories at once
mkdir -p components/{auth,crm,editor,landing,layout,settings,ui,wizard}
mkdir -p utils/supabase
mkdir -p services
mkdir -p styles
mkdir -p src/types
mkdir -p docs/plan
```

**Directory structure created:**
```
startup-ai/
├── components/
│   ├── auth/
│   ├── crm/
│   ├── editor/
│   ├── landing/
│   ├── layout/
│   ├── settings/
│   ├── ui/
│   └── wizard/
├── utils/
│   └── supabase/
├── services/
├── styles/
├── src/
│   └── types/
└── docs/
    └── plan/
```

---

### Step 2: Create Placeholder Files

Create essential placeholder files to prevent import errors:

```bash
# Create empty component files
touch components/ErrorBoundary.tsx
touch components/layout/Sidebar.tsx
touch components/layout/TopNavbar.tsx
touch components/auth/AuthPage.tsx

# Create utility files
touch utils/supabase/client.ts
touch services/edgeFunctions.ts

# Create type files
touch src/types/common.ts
```

---

## STAGE 3 — MINIMAL WORKING APP (10 minutes)

### Step 1: Create Loading Fallback Component

Create `components/LoadingFallback.tsx`:

```typescript
import { Loader2 } from 'lucide-react';

export function LoadingFallback() {
  return (
    <div className="flex items-center justify-center h-screen bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        <p className="text-slate-500 font-medium">Loading...</p>
      </div>
    </div>
  );
}
```

---

### Step 2: Create Error Boundary Component

Create `components/ErrorBoundary.tsx`:

```typescript
import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('ErrorBoundary caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex items-center justify-center h-screen bg-slate-50">
          <div className="max-w-md p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-red-600 mb-2">
              Something went wrong
            </h2>
            <p className="text-slate-600 mb-4">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
```

---

### Step 3: Create Minimal Landing Page

Create `components/landing/LandingPage.tsx`:

```typescript
export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-4xl text-center">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          StartupAI
        </h1>
        <p className="text-xl text-slate-600 mb-8">
          AI-Native Startup Operating System
        </p>
        <p className="text-lg text-slate-500 mb-8 max-w-2xl mx-auto">
          Transform months of fundraising and GTM work into hours with AI-powered 
          pitch decks, CRM, and strategic planning tools.
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/login"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Get Started
          </a>
          <a
            href="/how-it-works"
            className="px-6 py-3 bg-white text-slate-700 rounded-lg font-medium border border-slate-200 hover:border-slate-300 transition-colors"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
}
```

---

### Step 4: Create Minimal Auth Page

Create `components/auth/AuthPage.tsx`:

```typescript
import { useState } from 'react';

export function AuthPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Auth submitted:', { mode, email, password });
    // TODO: Implement Supabase auth
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          {mode === 'login' ? 'Welcome back' : 'Create account'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition-colors"
          >
            {mode === 'login' ? 'Sign in' : 'Sign up'}
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <button
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            className="text-sm text-indigo-600 hover:text-indigo-700"
          >
            {mode === 'login' 
              ? "Don't have an account? Sign up" 
              : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
}
```

---

### Step 5: Create Minimal Dashboard

Create `components/crm/ContactsDashboard.tsx`:

```typescript
export function ContactsDashboard() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Contacts
        </h1>
        <p className="text-slate-600">
          Manage your investor and customer relationships
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 text-center">
        <p className="text-slate-500">
          Contacts dashboard will be implemented here
        </p>
      </div>
    </div>
  );
}
```

---

### Step 6: Create Root App Component

Create `App.tsx` in project root:

```typescript
import { Suspense, lazy, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LoadingFallback } from './components/LoadingFallback';
import { AuthPage } from './components/auth/AuthPage';
import './styles/globals.css';

// Lazy load pages
const LandingPage = lazy(() => 
  import('./components/landing/LandingPage').then(m => ({ default: m.LandingPage }))
);

const ContactsDashboard = lazy(() => 
  import('./components/crm/ContactsDashboard').then(m => ({ default: m.ContactsDashboard }))
);

export default function App() {
  // DEV MODE: Bypass auth for initial setup
  const DEV_MODE = true;
  const [isAuthenticated] = useState(DEV_MODE);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route 
            path="/" 
            element={
              <Suspense fallback={<LoadingFallback />}>
                <LandingPage />
              </Suspense>
            } 
          />
          
          <Route path="/login" element={<AuthPage />} />
          
          {/* Protected routes */}
          <Route
            path="/app/contacts"
            element={
              isAuthenticated ? (
                <Suspense fallback={<LoadingFallback />}>
                  <ContactsDashboard />
                </Suspense>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          
          {/* Fallback redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
```

---

### Step 7: Update Main Entry Point

Update `main.tsx` (or create if it doesn't exist):

```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

## STAGE 4 — VERIFICATION (5 minutes)

### Step 1: Run Development Server

```bash
npm run dev
```

**Expected output:**
```
  VITE v5.0.0  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

---

### Step 2: Verify Pages Load

Open browser and test these routes:

| Route | Expected Result | Status |
|-------|----------------|--------|
| `http://localhost:5173/` | Landing page with gradient background | [ ] |
| `http://localhost:5173/login` | Auth page with email/password form | [ ] |
| `http://localhost:5173/app/contacts` | Contacts dashboard placeholder | [ ] |
| `http://localhost:5173/invalid-route` | Redirects to `/` | [ ] |

---

### Step 3: Verify No Console Errors

Open browser DevTools (F12) and check:

- [ ] No errors in Console tab
- [ ] No warnings about missing dependencies
- [ ] React DevTools shows component tree
- [ ] Network tab shows all assets loaded (200 status)

---

### Step 4: Verify TypeScript Compilation

```bash
# Run TypeScript type checking
npm run typecheck

# Expected output: "No errors found"
```

---

### Step 5: Verify Build Process

```bash
# Create production build
npm run build

# Expected output:
# vite v5.0.0 building for production...
# ✓ 45 modules transformed.
# dist/index.html                   0.5 kB │ gzip: 0.3 kB
# dist/assets/index-abc123.css      8.2 kB │ gzip: 2.1 kB
# dist/assets/index-xyz789.js      150.0 kB │ gzip: 48.0 kB
# ✓ built in 2.5s
```

---

## STAGE 5 — DOCUMENTATION (5 minutes)

### Step 1: Create README.md

Create `README.md` in project root:

```markdown
# StartupAI

AI-Native Startup Operating System

## Tech Stack

- **Frontend:** React 18 + TypeScript 5
- **Routing:** React Router 7
- **Styling:** Tailwind CSS 4
- **Build Tool:** Vite 5
- **Backend:** Supabase (coming soon)
- **AI:** Google Gemini (coming soon)

## Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Type checking
npm run typecheck

# Build for production
npm run build
```

## Project Structure

```
startup-ai/
├── components/       # React components (domain-organized)
├── utils/           # Pure utility functions
├── services/        # API service layer
├── styles/          # Global CSS and design tokens
├── docs/            # Documentation
└── App.tsx          # Root component
```

## Status

- [x] Project initialized
- [x] Core dependencies installed
- [x] Directory structure created
- [x] Minimal routing working
- [ ] Supabase integration (next)
- [ ] Auth implementation (next)
- [ ] UI components (next)
```

---

### Step 2: Create Initial Documentation

The following documentation files have already been created:
- ✅ `/docs/plan/01-startupai.md` — System architecture
- ✅ `/docs/plan/02-structure.md` — Directory structure
- ✅ `/docs/plan/03-setup.md` — This file

---

## VERIFICATION CHECKLIST

Before moving to feature development, ensure:

### Installation
- [ ] Node.js 18+ installed
- [ ] All dependencies installed (`npm list --depth=0` shows no errors)
- [ ] TypeScript compiles without errors (`npm run typecheck`)
- [ ] Production build succeeds (`npm run build`)

### Configuration
- [ ] `tsconfig.json` has path aliases configured
- [ ] `vite.config.ts` has Tailwind plugin enabled
- [ ] `styles/globals.css` exists with design tokens
- [ ] `.figmaignore` exists and protects backend files

### Directory Structure
- [ ] Core directories created (`/components`, `/utils`, `/services`)
- [ ] Domain-based organization (`/components/crm`, `/components/auth`)
- [ ] Placeholder files prevent import errors

### Routing
- [ ] Landing page loads at `/`
- [ ] Auth page loads at `/login`
- [ ] Dashboard loads at `/app/contacts` (dev mode)
- [ ] Invalid routes redirect to `/`
- [ ] No 404 errors in browser console

### UI/UX
- [ ] Tailwind classes work (gradient background on landing)
- [ ] Icons render (Loader2 in loading spinner)
- [ ] Fonts load (Inter from Google Fonts)
- [ ] No layout shift on page load
- [ ] Mobile responsive (test at 375px, 768px, 1440px)

### Development Experience
- [ ] Dev server starts on `npm run dev`
- [ ] Hot module replacement works (edit component, see changes)
- [ ] TypeScript autocomplete works in IDE
- [ ] Import path aliases work (`@/components/Button`)

---

## COMMON ISSUES & FIXES

### Issue 1: `Cannot find module '@/components/...'`

**Solution:** Ensure both `tsconfig.json` and `vite.config.ts` have path aliases:

```typescript
// vite.config.ts
resolve: {
  alias: {
    '@': path.resolve(__dirname, './'),
  },
}
```

---

### Issue 2: Tailwind classes not working

**Solution:** Verify `styles/globals.css` is imported in `App.tsx`:

```typescript
import './styles/globals.css';
```

---

### Issue 3: `React is not defined`

**Solution:** This is expected with React 18. Remove `import React from 'react'` from components.

---

### Issue 4: Build fails with TypeScript errors

**Solution:** Run `npm run typecheck` to see specific errors. Common fixes:
- Add `"skipLibCheck": true` to `tsconfig.json`
- Ensure all `@types/*` packages are installed

---

### Issue 5: `.figmaignore` keeps getting deleted

**Solution:** This is a known issue. Add to `.gitignore`:

```
# Never ignore .figmaignore
!.figmaignore
```

Then commit `.figmaignore` to Git so it's tracked.

---

## NEXT STEPS

After completing this setup, proceed to:

1. **Supabase Integration**
   - Create Supabase project
   - Configure environment variables
   - Set up database tables
   - Implement authentication

2. **UI Component Library**
   - Install shadcn/ui components
   - Create design system documentation
   - Build reusable components

3. **Feature Development**
   - Implement CRM dashboards
   - Build pitch deck wizard
   - Integrate AI features

---

## APPENDIX: PACKAGE.JSON REFERENCE

Your `package.json` should look like this after setup:

```json
{
  "name": "startup-ai",
  "private": true,
  "version": "0.0.1",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^7.0.0",
    "@supabase/supabase-js": "^2.39.0",
    "lucide-react": "^0.263.1",
    "sonner": "^2.0.3",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.2.0"
  },
  "devDependencies": {
    "@types/node": "^20.10.0",
    "@types/react": "^18.3.1",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.2.0",
    "@tailwindcss/vite": "^4.0.0-alpha.4",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "tailwindcss": "^4.0.0-alpha.4",
    "typescript": "^5.6.2",
    "vite": "^5.0.0"
  }
}
```

---

## APPENDIX: ENVIRONMENT VARIABLES (FUTURE)

When you add Supabase, create `.env.local`:

```bash
# Supabase
VITE_SUPABASE_URL=your-project-url.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# AI Services (future)
VITE_GEMINI_API_KEY=your-api-key
```

**Security notes:**
- Never commit `.env.local` to Git
- Prefix all environment variables with `VITE_` for Vite to expose them
- Use different keys for development vs production

---

**Document Owner:** StartupAI Engineering Team  
**Last Updated:** December 23, 2025  
**Next Review:** After Supabase integration  
**Status:** Core Setup Complete — Ready for Feature Development

---

**END OF DOCUMENT**
