# Task 05: Contacts List

**Status:** ⬜ Not Started  
**Priority:** P1 (High)  
**Screens:** 1 (Contacts Dashboard)  
**Prompts:** 3  
**Agents:** LinkedIn Agent, Email Agent, Scorer Agent  

---

## 📋 OVERVIEW

Contacts dashboard with list/grid views, filtering, sorting, bulk actions, and LinkedIn import capabilities.

**User Journey:**
Navigate to Contacts → View list → Filter/search → Select contacts → Take action

**Purpose:** Manage investor and partner relationships

---

## 🎯 PROMPTS

### ⬜ Prompt 5.1 — List View & Filtering

**Description:**  
Sortable table view with advanced filtering, search, and column customization.

**Key Points:**
- Table with sortable columns
- Columns: Avatar, Name, Title, Company, Score, Stage, Last Contact, Actions
- Click row to open detail page
- Hover highlights row
- Multi-select checkboxes
- Bulk action bar appears when selected
- Search bar with fuzzy matching
- Filter panel (sidebar or dropdown):
  - Score range (0-100 slider)
  - Stage (dropdown multi-select)
  - Tags (chip multi-select)
  - Last contacted (date range)
  - Location (autocomplete)
- Column visibility toggle
- Density options (Comfortable/Compact)
- Export to CSV button
- Pagination (25/50/100 per page)
- Total count display

**Deliverables:**
- Contact table component
- Sortable column headers
- Filter panel
- Search functionality
- Multi-select logic
- Bulk action bar
- Export function
- Pagination controls

**Acceptance Criteria:**
- Table displays all contacts
- Sorting works on all columns
- Filters update list instantly
- Search finds partial matches
- Multi-select highlights rows
- Bulk actions work correctly
- Export downloads CSV
- Pagination loads more data

**Agents Used:** Scorer Agent (score calculation)

**Status:** ⬜ Not Started

---

### ⬜ Prompt 5.2 — Grid View & Quick Actions

**Description:**  
Card-based grid view with quick actions, hover effects, and status indicators.

**Key Points:**
- Toggle between List/Grid views
- Grid: 3 columns on desktop, 1 on mobile
- Contact card shows:
  - Large avatar (80px)
  - Full name
  - Title and company
  - Score badge (colored)
  - Stage badge
  - Last contacted (relative time)
  - Quick action buttons (hover)
- Quick actions:
  - Send email icon
  - Schedule meeting icon
  - Add to list icon
  - More menu (3 dots)
- Hover effect: Shadow + scale
- Empty state if no contacts
- Loading skeleton during fetch
- Infinite scroll option
- "Add Contact" floating action button

**Deliverables:**
- Grid view component
- Contact card component
- View toggle
- Quick action buttons
- Hover effects
- Empty state
- Loading skeletons
- FAB button

**Acceptance Criteria:**
- Grid displays in columns
- Cards show all info
- Quick actions appear on hover
- View toggle works
- Infinite scroll loads more
- Empty state displays
- FAB opens add contact modal
- Responsive on all devices

**Agents Used:** None (UI only)

**Status:** ⬜ Not Started

---

### ⬜ Prompt 5.3 — LinkedIn Import Flow

**Description:**  
Multi-step modal for importing contacts from LinkedIn with preview and enrichment.

**Key Points:**
- Modal opened from "Import from LinkedIn" button
- Step 1: Authentication
  - LinkedIn OAuth flow
  - Permission explanation
  - Connect button
- Step 2: Selection
  - Fetch connections list
  - Show count (e.g., "247 connections found")
  - Grid of contacts with checkboxes
  - Select all toggle
  - Filter by mutual connections
  - Search connections
- Step 3: Enrichment preview
  - Shows what data will be imported
  - Email, phone, title, company
  - "Score with AI" option
  - Tag selection
  - List assignment
- Step 4: Import progress
  - Progress bar (0-100%)
  - "Importing contact X of Y"
  - Success count
  - Skipped count (duplicates)
- Step 5: Success summary
  - "Imported 45 contacts"
  - "Skipped 3 duplicates"
  - View imported button
  - Done button

**Deliverables:**
- Import modal component
- LinkedIn OAuth integration
- Connection selection UI
- Enrichment options
- Progress animation
- Success summary
- Duplicate detection

**Acceptance Criteria:**
- Modal opens on import click
- OAuth flow works
- Connections fetch correctly
- Can select individual/all
- Preview shows data accurately
- Progress updates in real-time
- Duplicates detected and skipped
- Success shows correct counts
- Imported contacts appear in list

**Agents Used:** 
- LinkedIn Agent (import)
- Email Agent (enrichment)
- Scorer Agent (scoring)

**Status:** ⬜ Not Started

---

## 📊 TASK SUMMARY

**Total Prompts:** 3  
**Completed:** 0 (0%)  
**Agents Used:** 3  
**Components to Create:** ~10  
**Estimated Time:** 4 hours implementation  

---

## 🔗 IMPLEMENTATION

**Location:** `/components/contacts-v2/`

**Planned Files:**
- ContactsListPage.tsx
- ContactTable.tsx
- ContactGrid.tsx
- ContactCard.tsx
- FilterPanel.tsx
- BulkActionBar.tsx
- LinkedInImportModal.tsx
- types.ts

---

## 🎨 DESIGN HIGHLIGHTS

**List View:**
- Zebra striping (subtle)
- Hover background gray-50
- Selected background indigo-50

**Grid View:**
- Card border on hover
- Box shadow on hover
- Scale 1.02 on hover

**Colors:**
- Score badges: Green (80+), Yellow (60-79), Red (<60)
- Stage badges: Blue (Prospect), Purple (Qualified), Orange (Meeting)

---

**Priority:** P1  
**Estimated Hours:** 4 hours  

---

**END OF TASK 05**
