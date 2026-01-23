# StartupAI Dashboard Style Guide

**Version:** 2.0  
**Last Updated:** January 23, 2026  
**Scope:** Application dashboards (`/app/*` routes)

---

## Design Philosophy

StartupAI dashboards embody a **luxury, modern SaaS aesthetic** that communicates intelligence, calm, and execution clarity. The design prioritizes generous negative space, strong visual hierarchy, and architectural precision over decorative flourishes.

---

## Color System

### Light Backgrounds
- **Primary background**: Off-white (#fafaf8)
- **Secondary background**: Soft grey (#f5f5f3)
- **Card backgrounds**: White (#ffffff)
- **Borders**: Light grey (#e5e5e5), minimal and intentional

### Dashboard Specific Backgrounds
- **Dashboard chrome**: White (#ffffff) with subtle borders
- **Content area**: Off-white (#fafaf8) or soft grey (#f5f5f3)
- **Cards & panels**: White with hairline borders (#e5e7eb)
- **Hover states**: Very light grey (#f9fafb)

### Dark Backgrounds (Strategic Use Only)
- **Dark sections**: Deep charcoal (#1a1a1a)
- **Text on dark**: Off-white (#fafaf8)
- **Borders on dark**: Dark grey (#333)

### Accent Colors — Emerald Green System

**PRIMARY RULE:** Green is the ONLY accent color. No purple, blue, or indigo.

- **Primary accent**: Deep emerald green (#0d5f4e)
- **Secondary accent**: Sage green (#6b9d89)
- **Success states**: Emerald (#10b981)
- **Hover states**: Lighter emerald (#059669)

### Green Usage Guidelines

The emerald green accent system is used exclusively for:

1. **Primary CTAs**: "Add Contact", "Generate", "Save" buttons
2. **AI indicators**: Sparkles icon, AI badges, enrichment markers
3. **Active states**: Selected navigation items, active tabs
4. **Progress indicators**: Score meters, completion bars
5. **Interactive highlights**: Hover states, focus rings
6. **Status markers**: Online dots, active badges
7. **Strategic emphasis**: High-value insights, important metrics

### Color Replacements

**DEPRECATED** (Remove from all components):
- ❌ `indigo-*` (purple-blue) → ✅ `emerald-*` or `stone-*`
- ❌ `purple-*` → ✅ `emerald-*` or `stone-*`
- ❌ `violet-*` → ✅ `emerald-*` or `stone-*`
- ❌ `blue-*` (except for info states) → ✅ `emerald-*`

**APPROVED** neutral colors:
- ✅ `slate-*` for grey scales
- ✅ `stone-*` for warm greys  
- ✅ `zinc-*` for cool greys
- ✅ `red-*` for errors/alerts only
- ✅ `amber-*` for warnings only
- ✅ `emerald-*` for primary accent

---

## Typography

### Dashboard Type Hierarchy
- **Page titles (H1)**: `text-2xl font-bold text-slate-900`
- **Section headers (H2)**: `text-xl font-semibold text-slate-800`
- **Card titles (H3)**: `text-lg font-semibold text-slate-800`
- **Labels**: `text-sm font-medium text-slate-700`
- **Body text**: `text-sm text-slate-600`
- **Helper text**: `text-xs text-slate-500`

### Font Stack
- **Headlines**: Default sans-serif (system font)
- **Body & UI**: Default sans-serif (system font)
- **Monospace** (for code/data): `font-mono`

### Typography Principles
- Strong vertical rhythm throughout dashboards
- Generous line-height for readability (`leading-relaxed`)
- Clear size distinction between hierarchy levels
- Avoid dense text blocks—prioritize white space

---

## Layout System

### Dashboard Grid Structure
- **Sidebar**: 240px fixed width on desktop, collapsible on mobile
- **Main content**: Flex-grow with max-width constraints
- **Content padding**: `px-8 py-6` on desktop, `px-4 py-4` on mobile
- **Card spacing**: `gap-6` between cards in grids

### Three-Panel Layout (Standard)
```
┌──────────┬────────────────────────┬─────────────┐
│          │                        │             │
│ Sidebar  │   Main Content Area    │  AI Panel   │
│ (240px)  │   (flex-grow)          │  (320px)    │
│          │                        │  (optional) │
└──────────┴────────────────────────┴─────────────┘
```

### Spacing Scale
- **Section padding**: `py-6` or `py-8`
- **Card padding**: `p-6`
- **Component gaps**: `gap-4` (standard), `gap-6` (generous)
- **List items**: `py-3` or `py-4`

### Responsive Behavior
- **Desktop (1280px+)**: Full three-panel layout
- **Tablet (768px-1279px)**: Collapsible sidebar, no AI panel
- **Mobile (<768px)**: Single column, hamburger menu

---

## Component Patterns

### Dashboard Cards

**Standard Card:**
```tsx
<div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
  {/* Card content */}
</div>
```

**Card with Header:**
```tsx
<div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
  <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
    <h3 className="text-lg font-semibold text-slate-800">Card Title</h3>
  </div>
  <div className="p-6">
    {/* Card content */}
  </div>
</div>
```

**Interactive Card (Hover):**
```tsx
<div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer">
  {/* Card content */}
</div>
```

### Buttons

**Primary CTA (Emerald Green):**
```tsx
<Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm">
  Add Contact
</Button>
```

**Secondary Action:**
```tsx
<Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50">
  Cancel
</Button>
```

**Ghost/Tertiary:**
```tsx
<Button variant="ghost" className="text-slate-600 hover:text-emerald-600 hover:bg-emerald-50">
  Learn More
</Button>
```

**Icon Button:**
```tsx
<Button variant="ghost" size="icon" className="text-slate-400 hover:text-emerald-600">
  <MoreHorizontal className="w-4 h-4" />
</Button>
```

### AI Indicators

**AI Badge:**
```tsx
<div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200">
  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
  <span className="text-xs font-medium text-emerald-700">AI Enriched</span>
</div>
```

**AI Insight Box:**
```tsx
<div className="bg-white rounded-xl border border-emerald-100 shadow-sm overflow-hidden">
  <div className="bg-gradient-to-r from-emerald-50 to-green-50 px-4 py-2 border-b border-emerald-100 flex items-center gap-2">
    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
    <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">AI Analysis</span>
  </div>
  <div className="p-4">
    {/* AI content */}
  </div>
</div>
```

### Status Indicators

**Online/Active Dot:**
```tsx
<div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
```

**Score Meter:**
```tsx
<div className="space-y-2">
  <div className="flex justify-between text-xs">
    <span className="text-slate-600">Match Score</span>
    <span className="font-semibold text-emerald-700">85%</span>
  </div>
  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
    <div className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full" style={{width: '85%'}}></div>
  </div>
</div>
```

**Priority Badge:**
```tsx
<span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 border border-emerald-200">
  High Priority
</span>
```

### Navigation

**Sidebar Item (Active):**
```tsx
<button className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-emerald-50 text-emerald-700 font-medium">
  <Icon className="w-5 h-5" />
  <span>Contacts</span>
</button>
```

**Sidebar Item (Inactive):**
```tsx
<button className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900">
  <Icon className="w-5 h-5" />
  <span>Dashboard</span>
</button>
```

**Tab Navigation:**
```tsx
<div className="border-b border-slate-200">
  <nav className="flex gap-6">
    <button className="pb-3 border-b-2 border-emerald-600 text-emerald-700 font-medium">
      All
    </button>
    <button className="pb-3 border-b-2 border-transparent text-slate-600 hover:text-slate-900">
      Sales
    </button>
  </nav>
</div>
```

### Form Elements

**Input Field:**
```tsx
<Input 
  className="bg-white border-slate-300 focus:border-emerald-500 focus:ring-emerald-100" 
  placeholder="Search contacts..."
/>
```

**Select Dropdown:**
```tsx
<Select className="bg-white border-slate-300 focus:border-emerald-500 focus:ring-emerald-100">
  <option>Select option</option>
</Select>
```

**Checkbox (Checked):**
```tsx
<input type="checkbox" className="accent-emerald-600 border-slate-300" />
```

### Loading States

**Spinner:**
```tsx
<Loader2 className="w-5 h-5 animate-spin text-emerald-600" />
```

**Skeleton Card:**
```tsx
<div className="bg-white rounded-xl border border-slate-200 p-6 animate-pulse">
  <div className="h-4 bg-slate-200 rounded w-3/4 mb-4"></div>
  <div className="h-3 bg-slate-200 rounded w-1/2"></div>
</div>
```

### Empty States

**No Data:**
```tsx
<div className="flex flex-col items-center justify-center py-12 text-center">
  <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
    <Icon className="w-8 h-8 text-emerald-600" />
  </div>
  <h3 className="text-lg font-semibold text-slate-800 mb-2">No contacts yet</h3>
  <p className="text-sm text-slate-500 mb-6">Add your first contact to get started</p>
  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
    Add Contact
  </Button>
</div>
```

---

## Visual Principles

### Hierarchy
- Size, weight, and color establish clear information order
- One primary action per screen/section
- Supporting actions are understated
- White space guides the eye

### Contrast
- High contrast for primary text (slate-900 on white)
- Medium contrast for supporting text (slate-600)
- Low contrast for disabled states (slate-400)
- Emerald green creates strategic emphasis

### Borders & Shadows
- **Borders**: Hairline, subtle (`border-slate-200` or `border-slate-300`)
- **Shadows**: Soft and minimal (`shadow-sm` standard, `shadow-md` on hover/elevation)
- **No**: Heavy drop shadows, glows, or 3D effects

### Motion & Interaction
- **Transitions**: Smooth and fast (`transition-all duration-200`)
- **Hover states**: Subtle color shift + optional border change
- **Active states**: Emerald green background or border
- **Animations**: Purposeful, not decorative

---

## Dashboard-Specific Patterns

### Contact Cards

**Grid Layout Card:**
```tsx
<div className="bg-white rounded-xl border border-slate-200 p-5 hover:border-emerald-300 hover:shadow-md transition-all">
  {/* Avatar + Status Dot */}
  <div className="relative w-12 h-12 mb-4">
    <img className="w-12 h-12 rounded-full" />
    <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
  </div>
  
  {/* Name & Company */}
  <h3 className="font-semibold text-slate-900">Contact Name</h3>
  <p className="text-sm text-slate-600">Company Name</p>
  
  {/* AI Badge */}
  <div className="mt-3 flex items-start gap-1.5 p-2 rounded-lg bg-emerald-50/50 border border-emerald-100">
    <Sparkles className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
    <p className="text-xs text-emerald-700 leading-relaxed">High AI Match Score</p>
  </div>
  
  {/* Metadata */}
  <div className="mt-4 text-xs text-slate-500">Last activity: 1/20/2026</div>
</div>
```

### Dashboard Header

**Standard Header:**
```tsx
<div className="px-8 py-6 bg-white border-b border-slate-200 shadow-sm">
  <div className="flex justify-between items-center">
    <div>
      <h1 className="text-2xl font-bold text-slate-900">Contacts</h1>
      <p className="text-sm text-slate-500 mt-1">Manage relationships with AI-powered insights</p>
    </div>
    <div className="flex gap-3">
      <Button variant="outline">
        <Filter className="w-4 h-4 mr-2" /> Filter
      </Button>
      <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
        <Plus className="w-4 h-4 mr-2" /> Add Contact
      </Button>
    </div>
  </div>
</div>
```

### AI Insights Panel (Right Sidebar)

```tsx
<div className="w-80 bg-white border-l border-slate-200 p-6 overflow-y-auto">
  <div className="flex items-center gap-2 mb-6">
    <Sparkles className="w-5 h-5 text-emerald-600" />
    <h2 className="text-lg font-semibold text-slate-800">AI Insights</h2>
  </div>
  
  {/* Insight Card */}
  <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-100">
    <div className="text-sm text-slate-700 leading-relaxed">
      Insight content here
    </div>
  </div>
</div>
```

---

## Content Strategy

### Dashboard Copy Tone
- **Clear over clever**: "Add Contact" not "Expand Your Network"
- **Action-oriented**: Use verbs (Edit, Create, Analyze)
- **Concise labels**: 2-4 words maximum
- **No jargon**: Founder-friendly language

### Placeholder Text
- **Inputs**: Descriptive but brief ("Search contacts...")
- **Empty states**: Encouraging ("Add your first contact to get started")
- **Tooltips**: Helpful context, not redundant

---

## Accessibility

### Color Contrast
- **Text on white**: Minimum 4.5:1 (WCAG AA)
- **Emerald on white**: Passes for UI elements
- **Interactive states**: Clear focus indicators

### Keyboard Navigation
- All interactive elements keyboard accessible
- Visible focus rings (`ring-emerald-500`)
- Logical tab order

### Screen Readers
- Semantic HTML (`<button>`, `<nav>`, `<main>`)
- ARIA labels where needed
- Icon-only buttons have `aria-label`

---

## Implementation Checklist

When creating or updating dashboard screens:

- [ ] Replace all `indigo-*`, `purple-*`, `violet-*` with `emerald-*` or `slate-*`
- [ ] Primary CTAs use `bg-emerald-600 hover:bg-emerald-700`
- [ ] AI indicators use emerald green (`text-emerald-600`, `bg-emerald-50`)
- [ ] Cards have subtle borders (`border-slate-200`) and minimal shadows
- [ ] Typography follows hierarchy (2xl/xl/lg for headers)
- [ ] Spacing uses consistent scale (p-6, gap-4, gap-6)
- [ ] Hover states are subtle (border color change, slight shadow increase)
- [ ] Active navigation items use `bg-emerald-50 text-emerald-700`
- [ ] Form inputs have `focus:border-emerald-500 focus:ring-emerald-100`
- [ ] Loading states use `text-emerald-600` spinners
- [ ] Empty states have emerald accent in icon backgrounds

---

## Quality Standards

### Visual Consistency
- All dashboard screens feel like one cohesive product
- Component patterns repeat across features
- Color usage is intentional and strategic
- No visual clutter or competing focal points

### Performance
- Smooth transitions (<200ms)
- No layout shifts on load
- Optimized images (WebP, lazy loading)
- Efficient re-renders (React.memo where needed)

---

## Examples & References

### ✅ Good Examples
- **Contacts Dashboard**: Grid layout, emerald accents, AI badges
- **Dashboard Home**: KPI cards, clean hierarchy, emerald progress bars
- **User Profile**: Form layouts, consistent spacing

### ❌ Anti-Patterns to Avoid
- Multiple accent colors on one screen
- Heavy gradients on buttons or backgrounds
- Dense information without breathing room
- Decorative animations that don't serve a purpose

---

**Last Updated:** January 23, 2026  
**Maintained By:** Design System Team  
**Next Review:** February 1, 2026

---

**END OF DASHBOARD STYLE GUIDE**
