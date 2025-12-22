# UI/UX Style Guide: Product Modules Section (Home V2)

This document details the design specifications, layout, and interaction models for the **Product Modules** section of the Landing Page V2. This section showcases the core functionality of the platform using a grid of interactive cards.

**Reference Asset:**
`import exampleImage from 'figma:asset/c9c0e1c6e3ef41d9e064cb20af0a9abbf63df8a7.png';`

## 1. Layout & Grid

The section uses a **responsive grid layout** to present multiple entry points in a clean, organized manner.

-   **Section Background:** `#FAFAFA` (Gray-50) to contrast with the white cards.
-   **Padding:** `py-24` (96px).
-   **Max Width:** `max-w-[1200px]`, centered `mx-auto`.
-   **Grid Structure:**
    -   **Mobile:** 1 Column (`grid-cols-1`).
    -   **Tablet:** 2 Columns (`grid-cols-2`).
    -   **Desktop:** 3 Columns (`grid-cols-3`).
    -   **Gap:** `gap-6` (24px).

## 2. Header Area

The header uses a **Flexbox** layout to separate the title from the "View All" link on larger screens.

-   **Alignment:** `flex-col md:flex-row`, `justify-between`, `items-end`.
-   **Title:**
    -   "Product Modules"
    -   `text-3xl md:text-4xl`, `font-bold`, `#111827`.
-   **Subtitle:**
    -   `text-[#6B7280]`, `max-w-xl`.
-   **Action Link:**
    -   "View all features" + Arrow Icon.
    -   **Text Color:** Brand Orange (`#FF6A3D`).
    -   **Hover:** `#E55A2D` + Background tint `#FF6A3D/5`.

## 3. UI Component: Feature Card

Standard active module cards designed for clarity and clickability.

### 3.1. Container Specs
-   **Background:** `bg-white`.
-   **Border:** `border border-[#E5E7EB]` (Gray-200).
-   **Radius:** `rounded-2xl`.
-   **Padding:** `p-8` (32px).
-   **Shadow:** `shadow-sm`.

### 3.2. Internal Elements
1.  **Icon Container:**
    -   Size: `w-12 h-12` (48px).
    -   Radius: `rounded-xl`.
    -   Background: `bg-gray-50`.
    -   Icon Color: `#111827` (Dark Gray).
    -   **Interaction:** On group hover, background becomes `#FF6A3D/10` and icon becomes `#FF6A3D`.
2.  **Title:**
    -   `text-xl`, `font-bold`, `#111827`.
    -   Spacing: `mb-2`.
3.  **Description:**
    -   `text-[#6B7280]`, `text-base`.
    -   Min-height applied (`min-h-[48px]`) to align buttons across cards with varying text lengths.
4.  **Action Footer:**
    -   "Open module >"
    -   `text-sm`, `font-medium`, `#111827`.
    -   **Interaction:** On group hover, text changes to `#FF6A3D`.

### 3.3. Hover States (Group Interaction)
The entire card is clickable and acts as a single trigger mechanism (`group`).
-   **Translation:** `translate-y-[-5px]` (Lift up).
-   **Shadow:** Increases to `hover:shadow-md`.
-   **Border:** Changes to `#FF6A3D/30` (Subtle orange tint).

## 4. UI Component: "Coming Soon" Card

A placeholder card for future features, visually distinct to indicate non-interactivity.

-   **Background:** `#F5F5F5` (Gray-100).
-   **Border:** `border border-dashed border-gray-300`.
-   **Opacity:** `opacity-70`.
-   **Layout:** Centered content (`flex-col`, `items-center`, `text-center`).
-   **Typography:**
    -   Title: `text-gray-500`.
    -   Subtitle: `text-gray-400`.

## 5. Animation Details

-   **Library:** `framer-motion`.
-   **Hover Effect:** `whileHover={{ y: -5 }}`.
-   **Transition:** Smooth spring animation (default).

## 6. Color Palette Reference

| Role | Hex | Usage |
|------|-----|-------|
| **Background** | `#FAFAFA` | Section Background |
| **Card Bg** | `#FFFFFF` | Card Surface |
| **Accent Orange** | `#FF6A3D` | Links, Hover Borders, Active Icons |
| **Text Main** | `#111827` | Headings, Card Titles |
| **Text Muted** | `#6B7280` | Descriptions |
| **Border** | `#E5E7EB` | Card Borders |

---
*Document generated on Dec 13, 2025*
