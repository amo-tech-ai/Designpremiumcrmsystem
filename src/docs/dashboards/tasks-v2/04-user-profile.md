# Task 04: User Profile

**Status:** ⬜ Not Started  
**Priority:** P1 (High)  
**Screens:** 1 (User Profile)  
**Prompts:** 2  
**Agents:** LinkedIn Agent  

---

## 📋 OVERVIEW

Personal user profile page showing account settings, LinkedIn sync, and professional information with edit capabilities.

**User Journey:**
Click avatar → View profile → Edit info → Sync LinkedIn → Save changes

**Purpose:** Manage personal account and professional identity

---

## 🎯 PROMPTS

### ⬜ Prompt 4.1 — Profile Display & Edit

**Description:**  
Profile view with avatar, bio, contact info, and inline editing with LinkedIn sync option.

**Key Points:**
- Large avatar with upload/change option
- Full name with edit icon
- Job title and company
- Email (read-only if OAuth)
- Phone number (optional)
- LinkedIn profile link
- Twitter/X handle (optional)
- Bio textarea (500 char limit)
- "Sync from LinkedIn" button
- Save/cancel buttons
- Loading state during sync
- Success toast on save
- Two-column layout (info left, preview right)

**Deliverables:**
- Profile display component
- Edit mode toggle
- Avatar upload component
- LinkedIn sync button
- Form validation
- Save functionality

**Acceptance Criteria:**
- Avatar displays correctly
- Click to edit each field
- LinkedIn sync pulls latest data
- Changes save successfully
- Preview updates in real-time
- Validation works
- Toast confirms save

**Agents Used:** LinkedIn Agent (sync)

**Status:** ⬜ Not Started

---

### ⬜ Prompt 4.2 — Account Settings

**Description:**  
Settings panel for notifications, privacy, integrations, and account management.

**Key Points:**
- Tabbed interface (Profile / Settings / Integrations)
- Notification preferences:
  - Email notifications toggle
  - Push notifications toggle
  - Daily digest option
  - Weekly report option
- Privacy settings:
  - Profile visibility (Public/Private/Team)
  - Show email on profile
  - Allow LinkedIn sync
- Connected accounts:
  - LinkedIn status (connected/disconnect)
  - Gmail integration
  - Calendar sync
  - Slack connection
- Danger zone:
  - Change password
  - Delete account (confirmation)
  - Export data

**Deliverables:**
- Settings tabs component
- Notification toggles
- Privacy controls
- Integration status cards
- Danger zone section
- Confirmation modals

**Acceptance Criteria:**
- Tabs switch correctly
- Toggles save on change
- Integrations show status
- Disconnect works safely
- Delete requires confirmation
- Export downloads data

**Agents Used:** None (settings only)

**Status:** ⬜ Not Started

---

## 📊 TASK SUMMARY

**Total Prompts:** 2  
**Completed:** 0 (0%)  
**Agents Used:** 1 (LinkedIn Agent)  
**Components to Create:** ~6  
**Estimated Time:** 2 hours implementation  

---

## 🔗 IMPLEMENTATION

**Location:** `/components/user-profile-v2/`

**Planned Files:**
- UserProfilePage.tsx (main)
- ProfileDisplay.tsx
- ProfileEditor.tsx
- AccountSettings.tsx
- IntegrationCard.tsx
- types.ts

---

## 🎨 DESIGN HIGHLIGHTS

**Layout:**
- Max-width 800px centered
- Two-column on desktop
- Single column on mobile
- Tabs for sections

**Colors:**
- Primary: Indigo 600
- Danger: Red 600
- Success: Green 600
- Cards: White with border

**Components:**
- Avatar: 120px circle
- Fields: Outlined input
- Toggles: Switch component
- Buttons: Primary gradient

---

**Priority:** P1  
**Estimated Hours:** 2 hours  

---

**END OF TASK 04**
