# TASK 04: User Profile — Personal Settings

**Priority:** 4 (Early Foundation)  
**Est. Days:** 2 days  
**Route:** /app/settings/account  
**Type:** Dashboard  
**Dependencies:** None (standalone)  

---

## SUMMARY MATRIX

| Screen | Features | Agents | Gemini Model | Status | Progress |
|--------|----------|--------|--------------|--------|----------|
| User Profile | 0 Advanced | 1 | Flash | 🔴 Not Started | 0% |

### Features Breakdown

| Feature | Type | Agent | Model | Approval Gate |
|---------|------|-------|-------|---------------|
| Security Anomaly Detection | Advanced | Analyst | Flash | Auto-approved |

### Implementation Progress

| Step | Task | Est. Hours | Status | Dependencies |
|------|------|------------|--------|--------------|
| 1 | Design settings layout | 4h | ⬜ | None |
| 2 | Build profile form | 4h | ⬜ | Step 1 |
| 3 | Implement OAuth integrations | 6h | ⬜ | Step 2 |
| 4 | Add security features | 4h | ⬜ | Step 2 |
| 5 | Build API key management | 4h | ⬜ | Step 2 |
| 6 | Testing + QA | 4h | ⬜ | All above |
| **Total** | **6 tasks** | **26h** | **0/6** | — |

---

## DESCRIPTION

Personal account settings for individual users. Manages profile info, security, integrations, notifications, and API keys.

---

## PURPOSE

Allow users to manage personal settings, connect external accounts, and configure preferences. Separate from startup profile.

---

## GOALS

1. **Setup Speed:** Complete initial setup in <5 minutes
2. **Integration:** 60%+ connect at least 1 integration
3. **Security:** Zero breaches, <1% password reset requests
4. **API Usage:** 20%+ developers generate API keys
5. **Notifications:** 75%+ customize preferences

---

## 3-PANEL LAYOUT LOGIC

### Core Model: **Context + Work**

**Left Panel = Context (240px)**
- Settings navigation tabs
- Profile completion indicator
- Quick links

**Main Panel = Work (960px)**
- Settings forms
- Integration cards
- Security options

**Right Panel = Intelligence (Hidden)**
- Not needed (settings are manual)

**Layout:**
```
┌──────────┬─────────────────────────────────────────┐
│          │ Account Settings                        │
│ Settings │─────────────────────────────────────────│
│ Nav      │                                         │
│          │ Profile                                 │
│ • Account│ [Avatar Upload]  Change Photo           │
│ • Security│                                        │
│ • Integr.│ Full Name:  [Sarah Chen__________]     │
│ • Notif. │ Email:      [sarah@techflow.com__]     │
│ • API    │ Role:       [CEO & Co-founder____]     │
│ • Privacy│ LinkedIn:   [linkedin.com/in/____]     │
│          │                                         │
│ Active:  │ Timezone:   [PST (UTC-8)_________] ▼   │
│ Account  │ Language:   [English_____________] ▼   │
│          │                                         │
│          │                    [Save Changes]       │
└──────────┴─────────────────────────────────────────┘
```

---

## SCREENS & ROUTES

### Account Tab
**Route:** /app/settings/account  
**Fields:** Name, email, avatar, role, LinkedIn, timezone, language

### Security Tab
**Route:** /app/settings/security  
**Features:** Password change, 2FA, active sessions

### Integrations Tab
**Route:** /app/settings/integrations  
**Platforms:** LinkedIn, Google, Stripe, Notion, Slack

### Notifications Tab
**Route:** /app/settings/notifications  
**Options:** Email frequency, push preferences, alert types

### API Keys Tab
**Route:** /app/settings/api  
**Features:** Generate keys, view usage, manage webhooks

---

## FEATURES: CORE VS ADVANCED

### Core Features (Manual)

| Feature | Description | User Action |
|---------|-------------|-------------|
| Profile update | Edit name, email, avatar | Fill form, save |
| Password change | Update password | Enter old + new |
| OAuth connect | Link external accounts | Click Connect, authorize |
| Notification prefs | Customize alerts | Toggle switches |
| API key gen | Create API keys | Click Generate, copy |

### Advanced Features (AI-Powered)

| Feature | Agent | Model | Input | Output | Approval |
|---------|-------|-------|-------|--------|----------|
| **Security Anomaly** | Analyst | Flash | Login patterns | Alert if unusual | Auto-approved |

---

## CONTENT & DATA

### Account Data
```
User:
  full_name: text
  email: text (unique)
  avatar_url: text
  role: text
  linkedin_url: text
  timezone: text (default: UTC)
  language: text (default: en)
```

### Notification Preferences
```
Notifications:
  email_frequency: text (real-time, daily, weekly, never)
  notify_deal_changes: boolean
  notify_task_assignments: boolean
  notify_mentions: boolean
  notify_marketing: boolean
  push_enabled: boolean
  push_urgent_alerts: boolean
  push_meeting_reminders: boolean
```

### Integrations
```
Integration:
  provider: text (linkedin, google, stripe, notion, slack)
  access_token: text (encrypted)
  refresh_token: text (encrypted)
  expires_at: timestamp
  status: text (active, expired, failed)
  last_synced: timestamp
```

### API Keys
```
APIKey:
  key_prefix: text (sk_live_, sk_test_)
  key_hash: text (bcrypt)
  environment: text (production, test)
  scopes: text[] (read_contacts, write_deals, etc.)
  last_used: timestamp
  created_at: timestamp
```

---

## USE CASES (3 REAL-WORLD EXAMPLES)

### Use Case 1: OAuth Integration Setup

**Persona:** Sarah, wants to enable LinkedIn enrichment

**Scenario:**
- Opens Settings → Integrations tab
- Sees LinkedIn card: "Not Connected"
- Clicks "Connect LinkedIn"
- Redirected to LinkedIn OAuth page
- Approves access (read profile, connections)
- Returns to app, sees "Connected" with green checkmark
- "Last synced: Just now"
- System test: Scrapes her profile → Success
- Goes to Contacts, pastes LinkedIn URL → Auto-enriches (faster now)

**Time:** 30 seconds  
**Value:** Enabled auto-enrichment feature

---

### Use Case 2: Security Alert from Anomaly

**Persona:** Mike, logs in from London (usually in SF)

**Scenario:**
- Mike travels to London for conference
- Logs in from hotel WiFi (new device, new location)
- AI detects anomaly: Device "Chrome/Windows" + Location "London, UK" + Time "3am SF time"
- System sends email: "New login detected. Was this you?"
- Mike opens email, clicks "Yes, that was me"
- Device added to trusted list
- Next login from London → No alert (recognized)
- Returns to SF, logs in → No alert (home location)

**Time:** 1 minute to confirm  
**Value:** Security without friction

---

### Use Case 3: API Key for Zapier Integration

**Persona:** TechFlow, wants to auto-add contacts from webinar signups

**Scenario:**
- Mike opens Settings → API Keys
- Clicks "Generate New Key"
- Modal: Select environment (Production), select scopes (write_contacts)
- Clicks "Generate" → Key shown once: sk_live_abc123xyz789
- Copies key, pastes into Zapier
- Tests: Webinar signup → Creates contact in StartupAI → Success
- Returns to API Keys tab
- Sees usage: "47 API calls this month"
- Rate limit: "3,953 remaining (4,000 total)"

**Time:** 3 minutes  
**Value:** Automated contact import from webinars

---

## WORKFLOWS & USER JOURNEYS

### Main User Journey
```
Any screen → Click avatar → Settings → Select tab → Update settings → Save → Return to app
```

### Workflow 1: OAuth Integration
```
User clicks "Connect LinkedIn"
  ↓
Generate OAuth URL with callback
  ↓
Redirect to LinkedIn authorization page
  ↓
User approves access (scopes: r_liteprofile, r_emailaddress)
  ↓
LinkedIn redirects back with authorization code
  ↓
Exchange code for access token
  ↓
Store encrypted token in database
  ↓
Test connection: Fetch user profile
  ↓
If success: Display "Connected" + enable features
If fail: Show error, allow retry
  ↓
Auto-refresh token before expiry (7 days before)
```

**Approval Gate:** None (user authorizes on LinkedIn)

---

### Workflow 2: Security Anomaly Detection
```
User attempts login
  ↓
Analyst: Analyze login context
  - Device fingerprint (browser, OS)
  - IP address + location (GeoIP lookup)
  - Time of day (user's typical hours)
  - Previous login patterns (last 30 days)
  ↓
Calculate anomaly score:
  anomaly = (
    new_device × 0.4 +
    new_location × 0.3 +
    unusual_time × 0.2 +
    rapid_succession × 0.1
  )
  ↓
If anomaly >0.7:
  - Send verification email
  - Require email confirmation before full access
  - Log security event
  ↓
If user confirms:
  - Add device to trusted list
  - Allow login
  ↓
If user denies:
  - Log out all sessions
  - Require password reset
  - Alert security team
```

**Approval Gate:** Auto-approved (user confirms via email)

---

## AI AGENTS & AUTOMATIONS

### Agents Used

| Agent | Role | Model | Tools |
|-------|------|-------|-------|
| **Analyst** | Security anomaly detection | Flash | Gemini Thinking, Code execution |
| (Minimal AI overall) | | | |

### Automations

| Trigger | Action | Frequency |
|---------|--------|-----------|
| OAuth token expires in 7 days | Send reauth reminder | Daily check |
| Failed login attempts >5 | Lock account, send alert | Real-time |
| New device login | Send verification email | Real-time |
| API key usage >80% limit | Send warning email | Daily check |
| Password unchanged 90 days | Suggest password update | Weekly check |

---

## GEMINI 3 FEATURES & TOOLS

### Model Selection

**Flash (1 use case):**
- Security anomaly detection (lightweight pattern matching)

### Tools Used

| Tool | Use Case |
|------|----------|
| **Gemini Thinking** | Analyze login patterns |
| **Code Execution** | Calculate anomaly score |

---

## MULTI-STEP DESIGN PROMPTS

### Prompt 1: Settings Navigation Layout
```
Design settings page with left sidebar navigation and main content area.
Requirements:
- Left sidebar (240px): Vertical tabs (Account, Security, Integrations, Notifications, API, Privacy)
- Active tab highlighted with blue background
- Main content (960px): Forms and content for selected tab
- Account tab layout:
  - Avatar upload section (click to change, drag-and-drop)
  - Form fields: Full Name, Email, Role, LinkedIn URL
  - Dropdowns: Timezone (searchable), Language
  - Save Changes button (bottom-right)
  - Auto-save indicator (top-right): "Saved" with checkmark
- Clean, organized, form-focused design

Visual style: Professional, trustworthy, minimal
Color palette: White background, blue accents, gray text
Show validation states (error, success)
```

### Prompt 2: Integrations Tab
```
Design integrations page showing connected account cards.
Requirements:
- Grid layout: 2 cards per row on desktop, 1 on mobile
- Integration cards (each 400px wide):
  - Service logo (64px, top-left)
  - Service name (bold, large)
  - Status badge: "Connected" (green) or "Not Connected" (gray)
  - Last synced timestamp (if connected)
  - Description: "Used for: Contact enrichment, profile data"
  - Connect/Disconnect button (bottom-right)
  - If connected, show usage stats: "152 contacts enriched"
- Services: LinkedIn, Google Workspace, Stripe, Notion, Slack
- Connection flow:
  - Click "Connect" → Modal with "Authorize on [Service]" button
  - Redirect to OAuth → Return with success animation
  - Card updates to "Connected" with green checkmark

Visual style: Modern cards, clear status indicators, trustworthy
Show health indicators: Green dot = active, Red dot = needs reauth
```

### Prompt 3: Security Tab
```
Design security settings page with multiple sections.
Requirements:
- Sections as cards (vertical stack):
  1. Password section:
     - Current password field
     - New password field (strength meter below)
     - Confirm password field
     - "Update Password" button
     - Last changed: "Dec 1, 2024"
  
  2. Two-Factor Authentication:
     - Toggle switch: Off/On
     - If On, show QR code + backup codes
     - "Reconfigure 2FA" button
  
  3. Active Sessions:
     - List of devices with:
       - Device icon (computer, phone)
       - "Chrome on Mac" (bold)
       - Location: "San Francisco, CA"
       - Last active: "2 hours ago"
       - "Revoke" button (red text)
     - Current session highlighted with blue border
  
  4. Security Score:
     - Large number: 85/100
     - Color-coded: Green
     - Tips to improve: "Enable 2FA for +10 points"

Visual style: Security-focused, clear hierarchy, actionable
Show password strength: Red (weak) → Yellow (medium) → Green (strong)
```

---

## ACCEPTANCE CRITERIA

### Functional
- [ ] All tabs load correctly
- [ ] Profile form saves changes
- [ ] OAuth integrations connect successfully
- [ ] Password change works with validation
- [ ] 2FA setup generates QR code
- [ ] API keys generate and display once
- [ ] Notification preferences save
- [ ] Security anomaly detection alerts

### Performance
- [ ] Settings page loads <1 second
- [ ] OAuth redirect completes <3 seconds
- [ ] Form saves <500ms
- [ ] API key generation instant

### Quality
- [ ] 60%+ connect at least 1 integration
- [ ] Zero security breaches
- [ ] <1% password reset requests
- [ ] 75%+ customize notifications

---

**Task Owner:** Engineering Team  
**Review Cadence:** Weekly check-in  
**Target Completion:** Week 3 of Phase 1  

---

**END OF TASK 04**
