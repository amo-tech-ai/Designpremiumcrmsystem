# Changelog

## [Unreleased] - 2025-12-07

### Added
-   **Company Profile System**:
    -   **Editor**: Added `CompanyProfileEditor` with comprehensive form sections for Identity, Business Info, Metrics, Team, and Funding.
    -   **Backend**: Added dedicated `GET` and `POST` endpoints (`/company-profile`) in the Supabase Edge Function to persist company data using `kv_store`.
    -   **Navigation**: Added "Edit Company" link to the Sidebar and integrated `company-profile` view into `App.tsx`.
    -   **Image Previews**: Implemented instant local preview for Company Logo and Cover Image uploads.
-   **Startup Profile Wizard Route**: Added a dedicated `startup-profile` view in `App.tsx` to render the `StartupProfileWizard`. This separates it from the Pitch Deck Wizard.
-   **Footer Links**: Added distinct links in the `Footer` component for:
    -   Pitch Deck Wizard (restored)
    -   Startup Profile Wizard
    -   Account Settings

### Changed
-   **App Logic (`App.tsx`)**:
    -   Fixed state management issues causing build errors (`setGeneratedDeckId`).
    -   Expanded `View` type definition to support `'company-profile'`.
-   **Navigation Structure**:
    -   Refactored `currentView` logic to support `wizard` (Pitch Deck), `startup-profile`, and `company-profile`.
-   **Sidebar Navigation (`Sidebar.tsx`)**:
    -   Updated the "Startup Profile" menu item to navigate to the new `startup-profile` view.
    -   Ensured "Pitch Decks" menu item correctly points to the restored `wizard` view.

### Restored
-   **Pitch Deck Wizard**: Restored the `PitchDeckWizard` component import and route in `App.tsx` (mapped to `wizard` view), ensuring the original pitch deck creation flow is available alongside the new startup profile flow.
