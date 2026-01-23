# StartupAI Design System - Style Guide v1.0

**Last Updated:** January 13, 2026  
**Status:** Production Ready

---

## 🎯 Design Philosophy

StartupAI is an AI-native startup operating system with clean, technical, investor-grade styling. The design emphasizes professional clarity, systematic organization, and actionable intelligence through a sophisticated pastel color palette with gradient accents.

**Core Principles:**
- Clean layouts with generous whitespace
- Technical confidence through structured grids and borders
- Clear visual hierarchy guiding users to next actions
- Subtle animations that enhance without distraction
- Responsive 1440px desktop layout with mobile optimization

---

## 🎨 Color Palette

### Neutrals
- **Background Main:** Light blue-gray (#F7F9FC) - main app background
- **Surface White:** Pure white (#FFFFFF) - cards, panels, modals
- **Border Light:** Soft gray-blue (#E1E6EE) - dividers, card outlines
- **Text Primary:** Deep navy (#1A1F2C) - headings, primary text
- **Text Secondary:** Medium gray (#6B7280) - body text, descriptions
- **Text Tertiary:** Light gray (#9CA3AF) - placeholders, disabled states

### Brand Colors (Pastel Accents)
- **Indigo Primary:** Soft indigo (#6F7EBC) - primary brand, sidebar gradients
- **Purple Secondary:** Lavender purple (#9B87C7) - secondary brand, gradient accents
- **Slate Blue:** Deep slate (#4A5B78) - dark variant, hover states
- **Sky Light:** Pale blue (#E8EEF5) - navbar background, subtle highlights
- **Lavender Mist:** Soft periwinkle (#C9D7F2) - badge backgrounds

### Gradients
- **Primary Brand:** Indigo to Slate Blue (sidebar active states, logo)
- **Action Gradient:** Indigo-600 to Purple-600 (primary CTAs, wizard buttons)
- **Success Gradient:** Yellow-400 to Green-500 (completeness indicators, progress)

### Semantic Colors
- **Success:** Green (#10B981) - completed states, positive trends
- **Warning:** Amber (#F59E0B) - alerts, dev mode indicators
- **Error:** Red (#EF4444) - errors, destructive actions
- **Info:** Blue (#3B82F6) - informational messages

---

## 📝 Typography

### Font Family
- **Primary:** System UI sans-serif (Inter, SF Pro, Segoe UI)
- **Monospace:** For code and technical data

### Hierarchy
- **Hero H1:** 36-48px, Bold - landing page headlines
- **Page H1:** 28-32px, Bold - dashboard page titles
- **Section H2:** 24px, Bold - major section headers
- **Card H3:** 20px, Semibold - card titles, subsections
- **Body Large:** 18px, Normal - emphasis paragraphs
- **Body Default:** 16px, Normal - standard text
- **Body Small:** 14px, Normal - supporting text
- **Caption:** 12px, Medium - labels, metadata

### Guidelines
- Headings use bold or semibold weight with dark gray
- Body text uses medium gray for better readability
- Labels use medium/semibold weight with uppercase for section headers
- Numbers and metrics use bold weight for emphasis

---

## 🧩 Components

### Buttons
- **Primary:** Indigo-to-purple gradient, white text, shadow, hover darkens
- **Secondary/Outline:** White background, gray border, hover adds light gray fill
- **Ghost:** Transparent, no border, subtle hover background
- **Icon:** 36x36px square, ghost style for toolbars

### Cards
- **Standard:** White background, light border, 12-16px radius, subtle shadow
- **Hover:** Increased shadow and darker border on hover
- **Gradient Featured:** Indigo-to-purple gradient for "Next Best Action" highlights

### Badges
- **Default:** Colored background with matching text, rounded corners
- **AI Badge:** Orange accent with sparkles icon
- **Priority:** Red (high), yellow (medium), gray (low)

### Inputs
- **Text/Textarea:** Light gray border, indigo focus ring, 40px height
- **Search:** Left-aligned icon, same styling as text input

### Progress Indicators
- **Progress Bar:** 8px height, gray background, yellow-to-green gradient fill
- **Completeness Widget:** Gradient pastel background, large percentage, mini progress bar

---

## 🏗️ Layout

### Application Shell
- **Sidebar:** 256px width, white background, gradient active states
- **Top Navbar:** 64-72px height, sky light background, glassmorphism effect
- **Main Content:** Flexible width, light blue-gray background, scrollable

### Content Containers
- **Narrow:** 768px max (forms, single column)
- **Standard:** 1024px max (dashboards, lists)
- **Wide:** 1280px max (data tables, multi-column)
- **Full Width:** 1440px max (workflows, diagrams)

### Spacing Scale
- **Tight:** 8px - icon + text, compact lists
- **Default:** 16px - standard spacing
- **Comfortable:** 24px - cards, sections
- **Generous:** 32px - major sections
- **Spacious:** 48px - page sections

---

## ✨ Visual Effects

### Shadows
- **Subtle:** Cards, inputs
- **Default:** Dropdowns, popovers
- **Medium:** Hover cards, elevated buttons
- **Large:** Modals, featured cards
- **Extra Large:** Sidebar, sticky navbar

### Glassmorphism
- **Navbar:** White with 90% opacity and backdrop blur

### Animation
- **Page Transitions:** 300ms fade and slide
- **Hover States:** 150-200ms color/shadow transitions
- **Micro-interactions:** 100-150ms quick feedback
- **Modals:** 200-250ms open/close

---

## 🎯 Navigation

### Sidebar
- **Logo:** Gradient rounded square with sparkles icon
- **Active State:** Indigo-to-slate gradient background, white text
- **Inactive State:** Gray text, transparent background
- **Hover:** Sky light background

### Top Navbar
- **Background:** Sky light with subtle border
- **Active Tab:** White background with shadow
- **Inactive Tab:** Transparent, gray text
- **Hover:** Semi-transparent white

---

## 📊 Data Visualization

### KPI Cards
- White background with border and shadow
- Large bold number (3xl font)
- Small label above in gray
- Colored icon in rounded square background
- Trend indicator with arrow and percentage

### Chart Colors
- **Primary Series:** Indigo
- **Secondary Series:** Purple
- **Tertiary Series:** Sky blue
- **Success:** Green
- **Warning:** Yellow/Amber

---

## 🔍 Iconography

### Library
Lucide React for all icons

### Sizing
- **XS:** 12px - inline text, badges
- **SM:** 16px - buttons, compact UI
- **MD:** 20px - standard icons
- **LG:** 24px - feature cards, headers
- **XL:** 32px - hero elements

### Colors
- **Default:** Medium gray
- **Active/Accent:** Indigo
- **Success:** Green
- **Warning:** Yellow
- **Error:** Red

---

## 🚨 State Indicators

### Loading
Centered spinner (indigo) with "Loading..." text below

### Empty State
Centered icon in gray circle, headline, description, and CTA button

### Error State
Red-tinted background with alert icon and error message

### Success
Green-tinted background with checkmark icon

---

## 📱 Responsive Design

### Breakpoints
- **Mobile:** < 640px - single column, stacked layout
- **Tablet:** 640-1024px - 2 columns, compact sidebar
- **Desktop:** 1024-1440px - full layout with all features
- **Wide:** > 1440px - max width constraints applied

### Patterns
- Grid layouts collapse to single column on mobile
- Sidebar hidden on mobile, replaced with hamburger menu
- Text sizes scale down on smaller screens
- Touch-friendly targets (44px minimum) on mobile

---

## 💡 Special Components

### Wizard Progress Bar
Sticky header with step indicator, progress bar, and step labels

### AI Insights Panel
360px right sidebar with sparkles icon, recommendations with priority badges, and CTA buttons

### Next Best Action Banner
Full-width gradient card at top of dashboard with lightbulb icon and action button

### Completeness Tracker
Horizontal bar showing overall percentage and breakdown by category

---

## ✅ Best Practices

### Do
- Use consistent 8px spacing increments
- Apply gradients for primary CTAs and featured content
- Include hover states on all interactive elements
- Use semantic colors (green for success, red for errors)
- Add loading states for async operations
- Provide empty states for new users
- Use subtle animations for transitions

### Don't
- Mix color schemes outside the defined palette
- Use arbitrary spacing values
- Skip loading or error states
- Overuse animations
- Forget mobile responsive design
- Neglect keyboard navigation and accessibility
- Use more than 2-3 colors in a single component

---

## 🎨 Component Patterns Summary

### Page Header Pattern
Large bold title (3xl), gray description below, action buttons on right

### Dashboard Grid Pattern
4-column grid on desktop, 2 on tablet, 1 on mobile, consistent card styling

### Form Pattern
Vertical layout, labels above inputs, primary button at bottom right

### List/Table Pattern
White background, alternating row backgrounds, hover highlights

### Modal Pattern
Centered overlay, white card with shadow, close button top-right

### Sidebar Pattern
Fixed left position, logo at top, nav items in middle, user profile at bottom

---

**Design System Owner:** StartupAI Design Team  
**Implementation:** Tailwind CSS v4 + Motion/React  
**Status:** Living Document - Updated as system evolves
