# UI/UX Style Guide: Hero Section (Home V2)

This document details the design specifications, layout, content, and animation choreography for the **Hero Section** of the Landing Page V2. This section is the first impression of the "Firecrawl" aesthetic revamp.

**Reference Asset:**
`import exampleImage from 'figma:asset/222c204ec5280cfb0487b7b8884a2b0b29096c44.png';`

## 1. Layout & Grid

The Hero section employs a **Centered, Vertical Layout** designed to focus attention immediately on the value proposition and the primary interactive element (the Input Interface).

-   **Container Width:** `max-w-[1200px]` (Standard content width).
-   **Padding:**
    -   Top: `pt-20` (Clearance for navbar).
    -   Bottom: `pb-32` (Space for "Code Hint" element below card).
-   **Alignment:** `text-center`, `flex-col`, `items-center`.
-   **Z-Index:** Content is `relative z-10` to sit above the technical background grid.

## 2. Visual Background System

The background is a complex layered composition designed to look "technical" but clean.

1.  **Base Color:** `#FAFAFA` (Gray-50/Alt White).
2.  **Fine Grid:** Linear gradient grid, `24px` squares, `opacity: 0.05` (very subtle gray).
3.  **Dot/Marker Grid:** Radial gradient dots, `40px` spacing, `opacity: 0.3`.
4.  **Center Glow:** A massive `800px` white radial gradient (`blur-3xl`, `opacity: 60`) centered behind the text to lift the content off the background.
5.  **Decorative Elements:** Floating `Sparkles` icons positioned at `top-1/4 left-1/4` and `top-1/4 right-1/4` in low-opacity Orange.

## 3. Typography & Content

### 3.1. Promotional Badge (Top)
-   **Text:** "2 Months Free — Annually"
-   **Icon:** `ChevronRight` (Small, rounded background).
-   **Style:** `rounded-full`, `bg-white`, `border border-gray-200`.
-   **Interaction:** Hover changes border color to Orange (`#FF6A3D`) and text/icon accent color.

### 3.2. Primary Headline
-   **Font:** Sans-serif, Bold (`font-bold`).
-   **Size:** `text-5xl` (Mobile) to `text-7xl` (Desktop).
-   **Tracking:** Tight (`tracking-tight`).
-   **Leading:** `leading-[1.1]`.
-   **Color:** Dark Gray (`#111827`).
-   **Highlight:** "investor-ready assets" is colored in **Brand Orange** (`#FF6A3D`).

### 3.3. Subheadline
-   **Font:** Sans-serif, Regular.
-   **Size:** `text-lg` to `text-xl`.
-   **Color:** Secondary Gray (`#6B7280`).
-   **Width:** `max-w-2xl` (Constrained for readability).
-   **Content:** "Power your AI apps with clean web data from any website. It's also open source."

## 4. UI Component: Floating Input Interface

This is the centerpiece interaction element, designed to look like a "Floating Island" or "Command Palette".

-   **Container Style:**
    -   `bg-white`
    -   `rounded-2xl`
    -   `border border-gray-200`
    -   `shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)]` (Deep, soft shadow).
    -   `p-3` (Internal padding).

### 4.1. Input Field (Top Row)
-   **Background:** `#FAFAFA` (Gray-50).
-   **Border:** `border-gray-100`.
-   **Icon:** `Globe` (Gray-400).
-   **Placeholder:** "https://example.com"
-   **Focus State:** White background, Orange ring (`ring-[#FF6A3D]/10`), Orange border tint.

### 4.2. Action Toggles (Bottom Row - Left)
A horizontal scrollable list of action types.
-   **Options:** Analyze, Deck, Docs, CRM.
-   **Inactive State:** Text Gray-500, hover bg `gray-200/50`.
-   **Active State:** White background, Text `#111827`, Shadow-sm (Elevated look).
-   **Icons:** Small 12px icons next to labels.

### 4.3. Generate Button (Bottom Row - Right)
-   **Style:** Primary Brand Button.
-   **Color:** `#FF6A3D` (Orange) -> Hover `#E55A2D`.
-   **Content:** "Generate" + `ArrowRight` icon.
-   **Size:** `h-10`, `px-6`.

## 5. Animation Choreography

The section uses `framer-motion` for a sequenced entrance.

1.  **Text Entrance (Headline/Subhead):**
    -   **Type:** Fade Up.
    -   **Props:** `initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}`.
    -   **Duration:** 0.5s.

2.  **Card Entrance (Input Interface):**
    -   **Type:** Scale & Lift.
    -   **Props:** `initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }}`.
    -   **Delay:** `0.1s` (After text).
    -   **Duration:** 0.5s.

## 6. Color Palette Reference

| Role | Hex Code | Tailwind Class |
|------|----------|----------------|
| **Brand Orange** | `#FF6A3D` | `text-[#FF6A3D]`, `bg-[#FF6A3D]` |
| **Headline Black** | `#111827` | `text-[#111827]` |
| **Body Gray** | `#6B7280` | `text-[#6B7280]` |
| **Input Bg** | `#FAFAFA` | `bg-[#FAFAFA]` |
| **Background Grid** | `#80808008` | (Custom opacity) |

---
*Document generated on Dec 13, 2025*
