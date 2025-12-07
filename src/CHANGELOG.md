# Changelog

## [Unreleased] - 2025-12-07

### Added
-   **Startup Profile Wizard Route**: Added a dedicated `startup-profile` view in `App.tsx` to render the `StartupProfileWizard`. This separates it from the Pitch Deck Wizard.
-   **Footer Links**: Added distinct links in the `Footer` component for:
    -   Pitch Deck Wizard (restored)
    -   Startup Profile Wizard
    -   Account Settings

### Changed
-   **Navigation Structure (`App.tsx`)**:
    -   Refactored `currentView` logic to support both `wizard` (Pitch Deck) and `startup-profile` (Startup Profile).
    -   Updated `View` type definition to include `startup-profile`.
-   **Sidebar Navigation (`Sidebar.tsx`)**:
    -   Updated the "Startup Profile" menu item to navigate to the new `startup-profile` view.
    -   Ensured "Pitch Decks" menu item correctly points to the restored `wizard` view.
-   **Footer Navigation (`Footer.tsx`)**:
    -   Renamed and retargeted links to clearly differentiate between the two wizards and personal account settings.

### Restored
-   **Pitch Deck Wizard**: Restored the `PitchDeckWizard` component import and route in `App.tsx` (mapped to `wizard` view), ensuring the original pitch deck creation flow is available alongside the new startup profile flow.
