# NEW PROJECT SETUP PROMPT

**Version:** 1.0  
**Last Updated:** December 23, 2025  
**Status:** Production-Ready Setup Prompt  
**Document Type:** Copy-Paste Setup Command  
**Purpose:** Single prompt to scaffold a complete production-ready project

---

## Document Purpose

This document provides a **single, copy-paste ready prompt** that creates a complete production-ready web application following all StartupAI best practices.

**Use this when:**
- Starting a brand new project from scratch
- Creating a proof-of-concept with proper foundation
- Setting up a client project with best practices
- Teaching project structure to new developers

**Timeline:** 5-10 minutes  
**Output:** Fully configured, running application with routing, styling, and documentation

---

## THE PROMPT

Copy the text below and paste it into your AI assistant or use it as a setup checklist:

---

### 📋 PROJECT SETUP PROMPT (COPY THIS)

```
Create a new production-ready React + TypeScript web application with the following specifications:

PROJECT INITIALIZATION:
1. Use Vite with React + TypeScript template
2. Project name: "startup-ai"
3. Install these core dependencies:
   - react-router-dom (routing)
   - @supabase/supabase-js (backend)
   - lucide-react (icons)
   - sonner (toast notifications)
   - tailwindcss@next and @tailwindcss/vite (styling)
   - clsx and tailwind-merge (utility classes)

CONFIGURATION FILES:
1. tsconfig.json:
   - Enable strict mode
   - Add path alias: "@/*" maps to "./*"
   - Include baseUrl: "."
   
2. vite.config.ts:
   - Enable React plugin
   - Enable Tailwind CSS plugin
   - Configure path alias resolution
   - Set dev server to port 5173
   
3. Create .figmaignore file with:
   - Exclude: supabase/, docs/, node_modules/, .env files
   - This prevents deployment errors

DIRECTORY STRUCTURE:
Create these folders:
- /components/auth (authentication components)
- /components/crm (CRM domain components)
- /components/editor (editor domain components)
- /components/landing (marketing pages)
- /components/layout (sidebar, navbar, footer)
- /components/settings (settings pages)
- /components/ui (design system components)
- /components/wizard (multi-step flows)
- /utils/supabase (Supabase client and helpers)
- /services (API service layer)
- /styles (global CSS)
- /src/types (TypeScript type definitions)
- /docs/plan (planning documentation)

CORE COMPONENTS TO CREATE:
1. components/LoadingFallback.tsx
   - Centered spinner with "Loading..." text
   - Uses Lucide Loader2 icon with spin animation

2. components/ErrorBoundary.tsx
   - Catches errors and shows fallback UI
   - Includes reload button

3. components/landing/LandingPage.tsx
   - Hero section with gradient background
   - Project title, tagline, description
   - Two CTA buttons: "Get Started" and "Learn More"

4. components/auth/AuthPage.tsx
   - Login/signup toggle
   - Email and password inputs
   - Form submission handler (stub for now)

5. components/crm/ContactsDashboard.tsx
   - Simple dashboard with header
   - Placeholder for future content

6. App.tsx (root component):
   - BrowserRouter setup
   - Routes for: / (landing), /login (auth), /app/contacts (dashboard)
   - Lazy loading for heavy components
   - Suspense with LoadingFallback
   - ErrorBoundary wrapper
   - Protected routes that redirect to /login if not authenticated
   - DEV_MODE flag set to true for initial setup

STYLING (styles/globals.css):
Create design tokens with:
- Color palette: primary (orange), secondary (blue), success (green), warning (amber), danger (red), purple
- Neutral colors: slate scale (50-900)
- Typography defaults for body, h1-h4, p
- Custom scrollbar styles
- Focus states for accessibility
- Box-sizing and margin reset

HTML TEMPLATE (index.html):
- Project title and meta description
- Google Fonts link for Inter font
- Root div and script tag for App.tsx

PACKAGE.JSON SCRIPTS:
- "dev": "vite"
- "build": "tsc && vite build"
- "preview": "vite preview"
- "typecheck": "tsc --noEmit"

DOCUMENTATION:
Create README.md with:
- Project name and description
- Tech stack list
- Development commands
- Project structure overview
- Current status checklist

VALIDATION:
After setup, ensure:
- npm install completes without errors
- npm run dev starts server on localhost:5173
- Landing page loads at /
- Auth page loads at /login
- Dashboard loads at /app/contacts
- TypeScript compiles without errors (npm run typecheck)
- Production build succeeds (npm run build)

FOLLOW THESE BEST PRACTICES:
- Domain-based component organization (not type-based)
- PascalCase for components, camelCase for utilities
- Path aliases instead of relative imports
- Lazy loading for route components
- Error boundaries around route sections
- No inline styles, only Tailwind classes
- Responsive design from mobile-first
- Accessibility attributes on interactive elements

OUTPUT:
Provide the complete file structure and all code files ready to run.
```

---

## ALTERNATIVE: MINIMAL PROMPT (QUICK VERSION)

If you need an even shorter version:

```
Create a React + TypeScript + Vite project with:
- Tailwind CSS v4 for styling
- React Router for routing  
- Domain-based folder structure (/components/crm, /components/auth, /components/landing)
- Path aliases (@/* → ./*)
- Landing page at /, Auth page at /login, Dashboard at /app/contacts
- Lazy loading with Suspense and ErrorBoundary
- Design tokens in styles/globals.css (orange primary, blue secondary, slate neutrals)
- .figmaignore to exclude backend files
- Production-ready tsconfig.json with strict mode

Include LoadingFallback, ErrorBoundary, LandingPage, AuthPage, and ContactsDashboard components.
```

---

## PROMPT VARIATIONS FOR DIFFERENT USE CASES

### For AI Code Assistants (Claude, GPT, etc.)

Use this extended prompt when working with AI assistants:

```
I need you to create a complete React web application from scratch. 

CONTEXT:
This is a startup operating system with CRM, pitch deck generation, and AI features. 
We're building the foundation before adding complex features.

REQUIREMENTS:
Follow the architecture documented in /docs/plan/01-startupai.md and directory 
structure from /docs/plan/02-structure.md.

Create a production-ready setup with:
- React 18 + TypeScript 5 + Vite 5
- React Router 7 for navigation
- Tailwind CSS 4 for styling
- Domain-based component organization
- Path aliases for clean imports
- Lazy loading for performance
- Error boundaries for resilience

IMMEDIATE DELIVERABLES:
1. Complete directory structure with all folders
2. Configuration files (tsconfig.json, vite.config.ts, .figmaignore)
3. Five core components: LoadingFallback, ErrorBoundary, LandingPage, AuthPage, ContactsDashboard
4. Root App.tsx with routing setup
5. Global styles with design tokens
6. Package.json with all dependencies

CONSTRAINTS:
- No feature bloat - core foundation only
- Follow domain-based organization strictly
- All code must be type-safe (no 'any' types)
- Must build and run without errors
- Must be accessible and responsive

Provide all files with complete code, not placeholders.
```

---

### For Junior Developers (Learning)

Use this educational prompt:

```
PROJECT GOAL:
Build a modern web application foundation that's production-ready.

LEARNING OBJECTIVES:
- Understand modern React project structure
- Learn TypeScript configuration
- Practice domain-driven design
- Implement routing and lazy loading
- Set up styling with Tailwind CSS

STEP-BY-STEP SETUP:

Step 1 - Initialize Project:
Run: npm create vite@latest startup-ai -- --template react-ts
Then: cd startup-ai && npm install

Step 2 - Install Dependencies:
npm install react-router-dom @supabase/supabase-js lucide-react sonner
npm install tailwindcss@next @tailwindcss/vite clsx tailwind-merge

Step 3 - Create Directory Structure:
Create folders for components organized by domain:
- components/auth (login, signup)
- components/crm (contacts, deals, tasks)
- components/landing (marketing pages)
- components/layout (navbar, sidebar)
- components/ui (reusable components)

Step 4 - Configure TypeScript:
Update tsconfig.json to enable strict mode and path aliases.
This lets you import like: import { Button } from '@/components/ui/button'
Instead of: import { Button } from '../../../components/ui/button'

Step 5 - Set Up Routing:
Create App.tsx with React Router.
Define routes for landing (/), auth (/login), and dashboard (/app/contacts).
Protect dashboard routes with authentication check.

Step 6 - Create Core Components:
Build five essential components:
- LoadingFallback: Shows while pages load
- ErrorBoundary: Catches and displays errors
- LandingPage: Marketing homepage
- AuthPage: Login/signup form
- ContactsDashboard: Placeholder dashboard

Step 7 - Add Styling:
Create styles/globals.css with Tailwind imports and design tokens.
Define colors, spacing, typography that you'll use throughout the app.

Step 8 - Test Everything:
Run npm run dev and verify:
- Landing page shows at http://localhost:5173
- Navigation works between pages
- No errors in browser console
- TypeScript compiles without errors

COMMON MISTAKES TO AVOID:
- Don't organize components by type (pages/, cards/, forms/)
- Do organize by domain (crm/, auth/, landing/)
- Don't use relative imports (../../../)
- Do use path aliases (@/components/...)
- Don't skip error boundaries
- Do wrap routes with error handling
- Don't ignore TypeScript errors
- Do fix them or add proper types

REFERENCE DOCUMENTATION:
See /docs/plan/02-structure.md for detailed folder organization.
See /docs/plan/03-setup.md for step-by-step configuration.
```

---

### For Client Projects (Professional)

Use this business-focused prompt:

```
CLIENT: [Client Name]
PROJECT: [Project Name]
DEADLINE: [Target Date]

TECHNICAL REQUIREMENTS:
- Modern React application with TypeScript
- Professional-grade architecture and code quality
- Scalable structure for future feature additions
- Production deployment ready

DELIVERABLES:
1. Fully configured development environment
2. Project structure following industry best practices
3. Core navigation and routing setup
4. Landing page with client branding
5. Authentication flow infrastructure
6. Dashboard foundation
7. Complete documentation

TECHNOLOGY STACK:
- Frontend: React 18, TypeScript 5
- Build Tool: Vite 5
- Routing: React Router 7
- Styling: Tailwind CSS 4
- Backend: Supabase (to be integrated)
- Icons: Lucide React
- Notifications: Sonner

QUALITY STANDARDS:
- Zero TypeScript errors
- 100% responsive design
- Accessibility compliant (WCAG 2.1 AA)
- Fast page loads (< 3s initial load)
- Clean, documented code
- Git version control with meaningful commits

PROJECT STRUCTURE:
Follow domain-driven design with clear separation:
- Public routes for marketing content
- Protected routes for application features
- Shared UI component library
- Service layer for API integration
- Utility functions separated from components

BRAND INTEGRATION:
Replace "StartupAI" with client name throughout.
Update color palette in styles/globals.css to match brand colors.
Add client logo and favicon to public/ folder.
Update meta tags in index.html with client information.

DOCUMENTATION REQUIRED:
- README.md with setup instructions
- Architecture overview document
- Component documentation
- API integration guide (when ready)
- Deployment instructions

TIMELINE:
Week 1: Foundation setup and core structure (THIS PROMPT)
Week 2: Feature development begins
Week 3: Integration and testing
Week 4: Polish and deployment

NEXT STEPS AFTER SETUP:
1. Client review of structure and design
2. Finalize brand colors and assets
3. Implement first feature set
4. Set up staging environment
```

---

## VALIDATION CHECKLIST

After running the prompt, verify these items:

### File Structure ✓
- [ ] All component directories exist
- [ ] Configuration files are present
- [ ] .figmaignore exists and is configured
- [ ] Package.json has all dependencies

### Configuration ✓
- [ ] TypeScript compiles without errors
- [ ] Path aliases work (@/components/Button)
- [ ] Vite config has Tailwind plugin
- [ ] Dev server starts on port 5173

### Components ✓
- [ ] LoadingFallback renders with spinner
- [ ] ErrorBoundary catches errors
- [ ] LandingPage shows gradient hero
- [ ] AuthPage has working form
- [ ] ContactsDashboard placeholder works

### Routing ✓
- [ ] Landing page loads at /
- [ ] Auth page loads at /login
- [ ] Dashboard loads at /app/contacts
- [ ] Invalid URLs redirect properly
- [ ] Protected routes redirect to login

### Styling ✓
- [ ] Tailwind classes apply correctly
- [ ] Design tokens are defined
- [ ] Typography looks consistent
- [ ] Responsive on mobile/tablet/desktop
- [ ] Colors match design system

### Build & Performance ✓
- [ ] npm run dev starts without errors
- [ ] npm run build completes successfully
- [ ] npm run typecheck shows no errors
- [ ] Bundle size is reasonable (< 500KB)
- [ ] Page loads in under 2 seconds

---

## TROUBLESHOOTING

### Issue: "Cannot find module '@/components/...'"

**Cause:** Path aliases not configured correctly  
**Fix:** Ensure both tsconfig.json and vite.config.ts have matching alias configuration

```typescript
// tsconfig.json
"baseUrl": ".",
"paths": { "@/*": ["./*"] }

// vite.config.ts
resolve: { alias: { '@': path.resolve(__dirname, './') } }
```

---

### Issue: "Tailwind classes not applying"

**Cause:** Tailwind CSS not imported or plugin not configured  
**Fix:** 
1. Verify styles/globals.css imports Tailwind: `@import "tailwindcss";`
2. Verify App.tsx imports globals: `import './styles/globals.css';`
3. Verify vite.config.ts has Tailwind plugin

---

### Issue: "React is not defined"

**Cause:** Using old JSX transform syntax  
**Fix:** This is expected with React 18. Remove `import React from 'react'` from components

---

### Issue: ".figmaignore keeps getting deleted"

**Cause:** IDE or automated process removing it  
**Fix:** Add to .gitignore: `!.figmaignore` (the ! forces tracking)

---

## CUSTOMIZATION OPTIONS

### Change Project Name

Replace "startup-ai" with your project name in:
- package.json: `"name": "your-project-name"`
- index.html: `<title>Your Project Name</title>`
- README.md: Update all references
- Folder name: Rename root directory

---

### Change Color Palette

Update design tokens in styles/globals.css:

```css
:root {
  --color-primary: YOUR_RGB_VALUES;
  --color-secondary: YOUR_RGB_VALUES;
  /* etc */
}
```

Common palettes:
- **Professional:** Blue primary, slate neutrals
- **Playful:** Purple primary, pink secondary
- **Minimal:** Black/white with single accent color
- **Nature:** Green primary, earth tones

---

### Change Port Number

Update vite.config.ts:

```typescript
server: {
  port: 3000, // or any available port
}
```

---

### Add Additional Routes

Extend App.tsx routing:

```typescript
<Route path="/pricing" element={<PricingPage />} />
<Route path="/about" element={<AboutPage />} />
```

Then create corresponding components in appropriate domain folders.

---

## WHAT COMES NEXT

After successful setup, proceed to:

### Week 1: Supabase Integration
- Create Supabase project
- Set up authentication
- Create database schema
- Configure environment variables
- Test data flow

### Week 2: UI Component Library
- Install or build design system components
- Create Button, Card, Input, Dialog, etc.
- Document component API
- Build Storybook (optional)

### Week 3: Feature Development
- Implement first dashboard
- Add data fetching
- Build forms and interactions
- Integrate AI features

### Week 4: Polish & Deploy
- Performance optimization
- Accessibility audit
- Security review
- Deploy to production

---

## REFERENCE DOCUMENTS

This prompt synthesizes these planning documents:

- **01-startupai.md** — System architecture and best practices
- **02-structure.md** — Directory structure and routing patterns
- **03-setup.md** — Detailed step-by-step setup guide
- **04-workflow.md** — Development workflow and collaboration

For deeper understanding, read these documents in order.

---

## SUPPORT

If you encounter issues:

1. **Check validation checklist** above for missing steps
2. **Review troubleshooting section** for common problems
3. **Consult reference docs** for detailed explanations
4. **Ask team members** who have done this before
5. **Search error messages** in documentation and GitHub issues

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Dec 23, 2025 | Initial prompt creation |

---

**Document Owner:** StartupAI Engineering Team  
**Last Updated:** December 23, 2025  
**Next Review:** After 10 project setups (gather feedback)  
**Status:** Ready for Use

---

**END OF DOCUMENT**
