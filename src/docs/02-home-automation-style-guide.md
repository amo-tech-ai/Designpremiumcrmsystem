# UI/UX Style Guide: Workflow Automation Section (Home V2)

This document details the design specifications, layout, and animation choreography for the "Workflow Automation" section of the Landing Page V2.

## 1. Visual Overview

The section is designed to visualize the "invisible" work of AI automation. It uses a **split-screen layout** with a narrative column on the left and an interactive, self-playing diagram on the right.

**Reference Asset:**
`import exampleImage from 'figma:asset/b6bd5f3ae89b4f5824d9b69edc35d3aca88b4da2.png';`

## 2. Layout & Grid

- **Container Width:** `max-w-[1440px]` (Wider than standard text sections to accommodate the diagram).
- **Padding:** `px-6` (Mobile), `px-12` (Desktop).
- **Columns (Desktop):**
  - **Left (Text):** 35% width. Vertical spacing `gap-8`.
  - **Right (Diagram):** 65% width. Relative positioning for overlapping elements.
- **Responsive Behavior:** Stacks vertically on screens smaller than `lg` (1024px).

## 3. Typography & Copy Hierarchy

### Section Header (Left Column)
1.  **Eyebrow Indicator:**
    -   Style: `text-xs font-bold tracking-widest text-gray-500 uppercase`
    -   Decor: 4px wide, 24px tall vertical bar in **Brand Orange** (`#FF6A3D`) to the left.
    -   Content: `[ 01 / 03 ] · AUTOMATION FLOW`
2.  **Headline:**
    -   Style: `text-4xl font-bold text-gray-900 leading-tight`
    -   Highlight: "Workflow Automation" in **Brand Orange**.
3.  **Description:**
    -   Style: `text-lg text-gray-500 leading-relaxed`.

### Diagram Labels (Right Column)
-   **Step Title:** `text-sm font-semibold`.
-   **Step Subtitle:** `text-[10px] font-medium text-gray-400` (Microcopy).
-   **System Status:** `font-mono text-sm text-gray-400` (e.g., "Processing step 5 of 5...").

## 4. Component: Step Card

The visualization consists of 5 cards (`Trigger` -> `AI Analysis` -> `Process` -> `Action` -> `Complete`) connected by a progress line.

### Card Specs
-   **Dimensions:** Fixed width `140px`, height `120px`.
-   **Shape:** `rounded-[14px]` (Smooth corner radius).
-   **Background:** White.

### States

| State | Border | Icon Background | Icon Color | Shadow | Scale | Badge |
|-------|--------|-----------------|------------|--------|-------|-------|
| **Idle** | `border-gray-200` | `bg-gray-50` | `text-gray-400` | None | 1.0 | Hidden |
| **Active** | `border-[#FF6A3D]` | `bg-[#FF6A3D]/10` | `text-[#FF6A3D]` | `shadow-[0_10px_30px_-10px_rgba(255,106,61,0.3)]` | 1.05 | Hidden |
| **Completed** | `border-[#FF6A3D]` | `bg-[#FF6A3D]/10` | `text-[#FF6A3D]` | None | 1.0 | **Visible** (Checkmark) |

### Connector Line
-   **Base:** 1px solid `gray-200`.
-   **Fill:** Animated fill `bg-[#FF6A3D]`.
-   **Logic:** Fills 50% when the *next* step is active, 100% when *next* step is complete.

## 5. Animation Choreography

The diagram runs on an infinite loop to demonstrate ease of use.

-   **Interval:** 1.8 seconds per step.
-   **Transitions:**
    -   **Card Scale:** Spring animation (`stiffness: 300`, `damping: 20`).
    -   **Connector Fill:** Linear `easeInOut` over 0.5s.
-   **Interactivity:** Pauses on hover (`onMouseEnter` / `onMouseLeave`) to allow users to inspect details.

## 6. Color Palette

Specific colors used in this module to match the "Firecrawl" aesthetic.

| Role | Hex | Tailwind Class |
|------|-----|----------------|
| **Primary Brand** | `#FF6A3D` | `text-[#FF6A3D]`, `bg-[#FF6A3D]` |
| **Glow Effect** | `#FF6A3D` (Low Opacity) | `bg-[#FF6A3D]/5` |
| **Success Badge** | `#10B981` | `bg-[#10B981]` (Green-500) |
| **Status Text** | `#9CA3AF` | `text-gray-400` |
| **Canvas** | `#FAFAFA` | `bg-[#FAFAFA]` |

## 7. Buttons

Two distinct call-to-action styles are used:

1.  **Secondary (Ghost/Outline):**
    -   Text: "Explore Triggers"
    -   Icon: Zap (Orange)
    -   Style: White bg, Gray border, Gray text.
2.  **Primary (Solid):**
    -   Text: "Start Automating"
    -   Icon: ArrowRight (White)
    -   Style: **Dark Gray/Black** (`#111827`) background. *Note: Uses black instead of orange for high contrast in this specific section.*

---
*Document generated on Dec 13, 2025*
