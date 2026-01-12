# Task 06: Contact Detail

**Status:** ⬜ Not Started  
**Priority:** P1 (High)  
**Screens:** 1 (Contact Detail)  
**Prompts:** 3  
**Agents:** LinkedIn Agent, Email Agent, Scorer Agent  

---

## 📋 OVERVIEW

Detailed contact view with profile information, activity timeline, email sequences, and AI-powered insights.

---

## 🎯 PROMPTS

### ⬜ Prompt 6.1 — Contact Profile Header

**Description:** Top section with avatar, name, contact info, score, and quick action buttons.

**Key Points:**
- Large avatar (120px) with status indicator
- Full name with LinkedIn badge if connected
- Title, company, location
- Email, phone with click-to-copy
- Lead score with explanation tooltip
- Stage badge with dropdown to change
- Tags with add/remove
- Quick actions: Email, Meeting, Call, Note
- Edit profile button
- "Enrich from LinkedIn" option
- Last contacted timestamp
- Assigned to user dropdown

**Agents Used:** LinkedIn Agent, Scorer Agent

---

### ⬜ Prompt 6.2 — Activity Timeline & Notes

**Description:** Chronological timeline of all interactions with inline note-taking.

**Key Points:**
- Vertical timeline layout
- Activity types: Email sent/received, Meeting, Call, Note, Status change
- Each item shows icon, timestamp, description
- Expandable details (email body, meeting notes)
- Add note button (sticky)
- Rich text editor for notes
- Filter by activity type
- Load more pagination
- Real-time updates
- "No activity yet" empty state

**Agents Used:** None

---

### ⬜ Prompt 6.3 — AI Insights & Recommendations

**Description:** Right panel showing AI analysis, next best actions, and email suggestions.

**Key Points:**
- Insights panel (320px right side)
- Lead score breakdown with factors
- Engagement score (email opens, replies)
- Recommended next action with CTA
- Email templates suggestion
- Similar contacts section
- Deal probability percentage
- Time to close estimate
- Risk factors alert
- "Generate email" AI button
- Refresh insights option

**Agents Used:** Scorer Agent, Email Agent, Strategy Agent

---

## 📊 TASK SUMMARY

**Prompts:** 3  
**Agents:** 4  
**Estimated Time:** 3.5 hours  

---

**END OF TASK 06**
