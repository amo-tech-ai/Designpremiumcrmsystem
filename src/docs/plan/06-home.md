# HOME PAGE DESIGN SYSTEM — LUXURY UI PROMPT

**Version:** 1.0  
**Last Updated:** December 23, 2025  
**Status:** Design Implementation Guide  
**Document Type:** Visual Design Prompt (No Code)  
**Purpose:** Create a luxury, scroll-driven home page with premium UI/UX

---

## Design Philosophy

Transform the landing page into a **luxury, high-end experience** using illustrated visual cards, animated diagrams, scroll-driven storytelling, and micro-interactions. Every section should feel premium, intelligent, and visually engaging.

**Core Principles:**
- Luxury through space, not clutter
- Intelligence through animated data visualization
- Premium through subtle depth and layering
- Engagement through scroll-triggered reveals

---

## SECTION 1 — HERO (Above the Fold)

### Visual Structure

**Layout Pattern: Split Hero with Floating Card**

Left side occupies sixty percent width with the main message. Right side shows a three-dimensional floating dashboard card with glassmorphism effect and subtle shadow. Background uses a gradient from slate fifty to indigo fifty with animated gradient orbs floating gently.

**Content Hierarchy:**

Top line shows a small badge with gradient border containing text "AI-Powered Operating System" with a sparkle icon. Main headline uses extra-large typography at sixty-four pixels, bold weight, with gradient text from indigo six hundred to purple six hundred. Subheadline sits below at twenty-four pixels in slate six hundred explaining the value proposition in one sentence.

Two call-to-action buttons sit horizontally: primary button with indigo background, white text, sixteen pixel rounded corners, and hover lift effect. Secondary button with white background, slate text, and border. Below buttons, show social proof with small avatar cluster and text "Join 10,000+ founders."

**Primary CTA Button Behavior:**
- **For Unauthenticated Users:** "Get Started" button links to /signup (new user registration)
- **For Authenticated Users:** "Get Started" button links to /app/dashboard (main application)
- **Button Text:** Changes to "Go to Dashboard" when user is logged in

**Secondary CTA Button:**
- "Learn More" links to /#how-it-works (scroll to How It Works section)

**Floating Dashboard Card (Right Side):**

Card shows a mini-dashboard preview with real metrics, charts, and AI insights. Uses glassmorphism effect with backdrop blur, subtle white overlay at ten percent opacity, and border with gradient. Inside the card, display three metric cards stacked vertically showing "Deck Generated," "Contacts Enriched," and "Deals Closed" with animated counter numbers. Add micro-interaction: numbers count up on page load.

**Responsive Behavior:**

Desktop: Split layout with fifty-five/forty-five ratio. Tablet: Stack vertically, hero content full width, card below at eighty percent width centered. Mobile: Single column, card becomes horizontal scrollable carousel of metrics.

**Route:** This is the landing page at route slash.

---

## SECTION 2 — PROBLEM STATEMENT (Scroll Reveal)

### Visual Structure

**Layout Pattern: Center-Aligned Narrative with Illustrated Pain Points**

Full-width section with maximum width of twelve hundred pixels centered. Dark background slate nine hundred with subtle grid pattern overlay. Content reveals as user scrolls, using stagger animation where each element fades up sequentially.

**Content Flow:**

Section heading at top: "The Founder's Struggle" in white text, forty-eight pixels. Below, paragraph text in slate three hundred explaining the problem in two sentences at twenty pixels line height.

Three pain point cards arranged horizontally, equal width with gap. Each card features:
- Illustrated icon at top (not flat, has depth and shadow)
- Pain point title in twenty-four pixels
- Description text in slate four hundred
- Red accent line on left border indicating pain

**Illustrated Icons:**

First card: Overwhelmed founder with stacks of papers (illustration style: subtle gradients, soft shadows). Second card: Scattered tools and disconnected systems (isometric view). Third card: Clock showing time waste (animated second hand).

**Scroll Animation:**

Cards start twenty pixels below final position with zero opacity. As section enters viewport, cards fade in and slide up with two hundred millisecond stagger between each. Icons have subtle float animation on loop.

**Responsive:** Desktop three columns, tablet two columns with third below, mobile single column stacked.

---

## SECTION 3 — SOLUTION SHOWCASE (Animated Diagram)

### Visual Structure

**Layout Pattern: Central Flowchart with Connected Modules**

White background section with light blue tint. Center shows large flowchart diagram illustrating how StartupAI connects different workflows. Diagram uses animated connector lines that draw on scroll.

**Diagram Elements:**

Center node: Large circular badge with StartupAI logo and gradient background. From this node, six lines branch out to surrounding module cards. Each line uses animated dashed stroke that draws from center outward, taking one second per line with stagger.

Six module cards arranged in circular pattern around center:
- Top: "Profile Wizard" with onboarding icon
- Top-Right: "AI Pitch Deck" with document icon
- Bottom-Right: "Smart CRM" with contacts icon
- Bottom: "Pipeline Tracking" with funnel icon
- Bottom-Left: "Task Automation" with checklist icon
- Top-Left: "Analytics Dashboard" with chart icon

**Module Cards:**

Each card is elevated with shadow, white background, twenty pixel padding. Card contains icon at top (illustrated style with gradient), title in bold, and one-line description. On hover, card lifts higher and line connecting to center glows with gradient.

**Connector Lines:**

Lines are two pixels thick, use gradient from indigo to purple. Animated dash offset creates flowing effect. Small circular nodes at connection points pulse subtly.

**Scroll Trigger:**

When section reaches fifty percent viewport, center node scales in with spring animation. Then lines draw out sequentially clockwise. Finally, module cards fade in with stagger.

**Responsive:** Desktop six cards in circle, tablet four cards in square formation, mobile vertical stack with lines on left connecting cards.

---

## SECTION 4 — FEATURES GRID (Visual Cards)

### Visual Structure

**Layout Pattern: Masonry Grid with Illustrated Feature Cards**

Section uses light gray background slate one hundred. Maximum width twelve hundred pixels. Grid layout with three columns on desktop, items have varying heights creating dynamic masonry effect.

**Feature Card Design:**

Each card uses illustrated visual, not photographs. Card has white background, rounded corners at sixteen pixels, shadow for depth. Card structure from top to bottom:

Header area with gradient background containing illustrated scene relevant to feature. Illustration style is modern, uses soft shadows, subtle gradients, and depth. Below illustration, card content sits on white background with twenty-four pixel padding.

Feature title in twenty-four pixels bold. Description text in slate six hundred at sixteen pixels, three-line maximum. "Learn more" link at bottom with arrow icon and indigo color. On hover, entire card lifts with transform translateY negative four pixels and shadow increases.

**Eight Featured Cards:**

**Card One - AI Pitch Deck Generation:**
Illustration shows stack of slides with sparkle effects and AI brain icon. Describe "Generate investor-ready decks in 10 minutes." Tag "Most Popular" in top-right corner with orange gradient.

**Card Two - LinkedIn Enrichment:**
Illustration shows LinkedIn profile card with data flowing into contact card. Describe "Auto-populate contacts from LinkedIn profiles."

**Card Three - Lead Scoring:**
Illustration shows contact card with score badge and criteria checklist. Describe "AI scores every contact from 0-100."

**Card Four - Pipeline Management:**
Illustration shows kanban board with deals moving between stages. Describe "Track investor conversations visually."

**Card Five - Document Templates:**
Illustration shows template library with various document types. Describe "One-pagers, term sheets, updates."

**Card Six - Market Research:**
Illustration shows map with market data overlays and TAM/SAM/SOM circles. Describe "AI calculates market size with sources."

**Card Seven - Task Automation:**
Illustration shows workflow diagram with checkmarks completing automatically. Describe "Auto-generate tasks from deals."

**Card Eight - Real-time Collaboration:**
Illustration shows multiple user avatars around shared workspace. Describe "Team workspace with live updates."

**Scroll Animation:**

Cards fade in as they enter viewport with stagger. Use intersection observer to trigger animations. Each card starts slightly below and faded, then animates to position.

**Responsive:** Desktop three columns, tablet two columns, mobile single column.

---

## SECTION 5 — HOW IT WORKS (Scroll-Driven Steps)

### Visual Structure

**Layout Pattern: Vertical Timeline with Scroll-Triggered Reveals**

Full-width section with gradient background from white to slate one hundred. Center vertical timeline line runs down the page at two pixels thick with gradient. Timeline has progress indicator that fills as user scrolls.

**Four Step Cards:**

Cards alternate left and right of timeline. Each card connects to timeline with horizontal line and circular node. Node pulses when card becomes active during scroll.

**Step Card Structure:**

Each card is large with white background, shadow, and rounded corners. Card split into two sections: left shows step number in large typography with gradient, right shows content.

Content includes: step title in thirty-two pixels, paragraph description in slate six hundred, and visual element. Visual element is either animated chart, diagram, or illustration showing the step outcome.

**Step One - Complete Profile:**
Large number "01" in gradient on left. Right side shows form illustration with checkmarks filling in. Animated counter shows "6 steps, 5 minutes." Micro-interaction: form fields check off one by one on scroll.

**Step Two - AI Analysis:**
Number "02" in gradient. Right side shows AI brain icon with data flowing in and insights flowing out. Animated particles move from inputs to brain to outputs. Loading bar fills showing "Analyzing your startup..."

**Step Three - Generate Deck:**
Number "03" in gradient. Right side shows deck slides stacking up with animation. Counter shows "12 slides created in 15 seconds." Slides have page-turn animation effect.

**Step Four - Launch Campaign:**
Number "04" in gradient. Right side shows rocket launching with trail effect. Progress chart showing growth trajectory. Confetti particles on completion.

**Timeline Progress:**

Timeline fill percentage based on scroll position within section. Active step node is larger and glows. Completed steps show checkmark in node. Upcoming steps are dimmed.

**Scroll Behavior:**

Each step card starts faded and offset twenty pixels to side. As timeline reaches that step during scroll, card slides into position and fades in. Card becomes "active" when centered in viewport, triggering its internal animations.

**Responsive:** Desktop alternating left-right, tablet all cards on right of timeline, mobile timeline moves to left edge with cards full width.

**Route Link:** "Start Your Profile" button at bottom links to route /app/wizard/startup-profile.

---

## SECTION 6 — SOCIAL PROOF (Animated Testimonials)

### Visual Structure

**Layout Pattern: Carousel with Floating Testimonial Cards**

Light background section with testimonial cards in horizontal scrollable carousel. Cards have depth and shadow, appearing to float above background. Background has subtle animated gradient mesh.

**Testimonial Card Design:**

Card is oversized at four hundred pixels wide, white background, heavy shadow for depth. Top section shows large quote icon in light indigo. Quote text in twenty-four pixels, medium weight, slate eight hundred. Below quote, horizontal rule.

Bottom section shows founder info: circular avatar photo, founder name in bold, startup name in slate five hundred, and raise amount in green tag "Raised $2M."

**Six Testimonials:**

Quotes focus on specific outcomes: "Generated our Series A deck in 30 minutes," "Tracked 50 investor conversations without losing anyone," "The AI scored our leads perfectly," etc. Include diversity of founders, startup types, and outcomes.

**Carousel Behavior:**

Auto-scrolls slowly to the right, pausing on hover. User can drag to scroll or use arrow buttons. Infinite loop, so it cycles seamlessly. Cards that are center-aligned scale slightly larger at one point zero five.

**Scroll Trigger:**

When section enters viewport, cards fade in with stagger from left to right. Auto-scroll begins after all cards visible.

**Responsive:** Desktop shows three cards at once, tablet shows two, mobile shows one with peek of next card.

---

## SECTION 7 — METRICS DASHBOARD (Live Data Visualization)

### Visual Structure

**Layout Pattern: Stats Grid with Animated Counters and Charts**

Dark section with slate nine hundred background. Grid shows platform statistics with animated numbers and charts. Creates trust through transparency of real data.

**Four Metric Blocks:**

Arranged in two-by-two grid on desktop. Each block has large number at top, label below, and small chart or visualization.

**Metric One - Decks Generated:**
Large counter that animates from zero to actual number on scroll. Shows "12,847 Decks Generated" with upward trending sparkline chart below in green.

**Metric Two - Hours Saved:**
Counter shows "98,432 Hours Saved" with calculation note "Avg 7.6 hours per deck." Progress circle chart shows percentage of time saved versus traditional methods.

**Metric Three - Funding Raised:**
Shows "$847M Raised by Users" with bar chart below showing funding by stage (Pre-seed, Seed, Series A). Bars animate fill on scroll.

**Metric Four - Success Rate:**
Shows "73% Close Rate" with comparison chart showing StartupAI users versus average. Line chart shows improvement over time.

**Animation Details:**

Numbers use counting animation from zero to target over one point five seconds with easing. Charts draw or fill based on scroll position. Subtle particle effects around numbers for premium feel.

**Responsive:** Desktop two-by-two grid, tablet two-by-two with smaller spacing, mobile single column stack.

---

## SECTION 8 — PRICING TIERS (Feature Comparison)

### Visual Structure

**Layout Pattern: Three-Column Cards with Feature Matrix**

White background section. Three pricing tier cards arranged horizontally with center card elevated to highlight recommended plan.

**Tier Card Design:**

Cards have rounded corners, border, and shadow. Recommended card (middle) has gradient border and lifts eight pixels higher. Card structure:

Header with tier name, monthly price in large typography, and "per user" subtext. "Most Popular" badge on recommended tier. Primary CTA button below pricing. Then feature list with checkmarks.

**Three Tiers:**

**Starter - Free:** Basic features, one user, community support. Button says "Start Free" in outline style.

**Professional - $49/month:** All AI features, five users, email support, priority AI processing. Button says "Start Free Trial" in solid indigo. Tag "Most Popular" in orange.

**Enterprise - Custom:** Unlimited users, dedicated support, custom AI training, API access. Button says "Contact Sales" in dark style.

**Feature Comparison Matrix:**

Below cards, expandable feature comparison table shows all features across tiers. Uses checkmarks, X marks, and "unlimited" text. Categories: Core Features, AI Capabilities, Integrations, Support, Security.

**Interactive Elements:**

Toggle between monthly and annual pricing with animated switch. Annual shows "Save 20%" badge. Hovering any tier highlights that column in comparison table below.

**Responsive:** Desktop three columns, tablet three columns narrower, mobile single column stack with recommended first.

**Route Link:** Buttons link to /signup with pricing tier pre-selected via URL parameter.

---

## SECTION 9 — FINAL CTA (Conversion Focus)

### Visual Structure

**Layout Pattern: Full-Width Conversion Banner with Visual Emphasis**

Section uses gradient background from indigo six hundred to purple six hundred. White text throughout. Center-aligned content with maximum eight hundred pixel width.

**Content Elements:**

Large headline "Ready to Transform Your Fundraising?" at forty-eight pixels bold white text. Supporting text below explains "Join 10,000+ founders who raised with StartupAI" in white at reduced opacity.

Two buttons horizontally aligned: "Start Free" button in white background with indigo text, and "Book Demo" button in transparent background with white border. Below buttons, show trust indicators.

**Trust Indicators:**

Three small badges arranged horizontally: "No credit card required," "14-day free trial," "Cancel anytime." Each has icon and text in white with reduced opacity.

**Background Visual:**

Subtle illustration of connected nodes and AI symbols in white at very low opacity creates tech feel without overwhelming. Animated gradient orbs float slowly in background.

**Micro-Interaction:**

On hover, primary button scales up one point zero five and shadow increases. Secondary button border glows with animated gradient.

**Responsive:** Desktop horizontal layout, tablet stacks buttons, mobile full-width buttons stacked.

**Route Links:** "Start Free" goes to /signup, "Book Demo" opens calendar modal or goes to /contact.

---

## NAVIGATION & FOOTER

### Navigation Bar

**Structure:** Fixed top navigation with glassmorphism effect. Background uses backdrop blur with white at eighty percent opacity. Shadow appears on scroll.

Left side shows logo and brand name. Center shows navigation links: Product, Features, Pricing, Docs, About. Right side shows "Sign In" link and "Get Started" button with gradient background.

**Interaction:** Navigation links have underline animation on hover. Entire navbar slides down on page load. On scroll down, navbar compacts slightly. On scroll up, navbar expands back.

**Responsive:** Desktop full navbar, tablet hamburger menu, mobile bottom navigation bar with icons.

**Routes:** Product goes to /#features anchor, Features to /#how-it-works anchor, Pricing to /pricing page, Docs to /docs page, About to /about page, Sign In to /login, Get Started to /signup.

**Navigation Button Behavior:**
- **"Sign In" Link:** Always links to /login for authentication
- **"Get Started" Button:**
  - **For Unauthenticated Users:** Links to /signup (new user registration)
  - **For Authenticated Users:** Links to /app/dashboard (main application)
  - **Button Text:** Changes to "Go to Dashboard" when user is logged in

### Footer

**Structure:** Dark footer with slate nine hundred background, divided into four columns on desktop.

**Column One - Brand:** Logo, tagline, social media icons with hover animations.

**Column Two - Product:** Links to Features, Pricing, Changelog, Roadmap.

**Column Three - Resources:** Links to Documentation, Help Center, API Reference, Community.

**Column Four - Company:** Links to About, Careers, Blog, Contact.

**Bottom Bar:** Copyright text, legal links (Privacy Policy, Terms of Service), and language selector.

**Responsive:** Desktop four columns, tablet two columns, mobile single column stack.

---

## MICRO-INTERACTIONS INVENTORY

**Button Hover:** Scale up one point zero five, increase shadow, transform duration two hundred milliseconds.

**Card Hover:** Lift with translateY negative four pixels, increase shadow blur, border glow effect.

**Link Hover:** Underline animates from left to right, color shifts to lighter shade.

**Input Focus:** Border color transitions to primary color, subtle shadow appears, placeholder text fades.

**Image Load:** Fade in from opacity zero, blur reduces from eight pixels to zero.

**Scroll Reveal:** Elements fade in and slide up twenty pixels, stagger of one hundred milliseconds between elements.

**Counter Animation:** Numbers count from zero to target with easing function, duration one point five seconds.

**Chart Draw:** SVG paths animate stroke-dashoffset from full to zero, duration one second.

**Progress Fill:** Width animates from zero to percentage value, color transitions through gradient.

**Particle Effects:** Small dots float upward with random horizontal drift, fade out at top.

**Glow Effect:** Gradient border that rotates around element, animated using conic gradient rotation.

**Pulse Animation:** Scale from one to one point one and back, opacity from one to zero point seven, infinite loop.

---

## RESPONSIVE BREAKPOINTS

**Mobile:** Zero to seven sixty-seven pixels width. Single column layouts, larger touch targets, simplified navigation, stacked cards, full-width buttons.

**Tablet:** Seven sixty-eight to one zero two three pixels. Two-column layouts where appropriate, medium spacing, compact navigation.

**Desktop:** One zero two four to fourteen forty pixels. Full multi-column layouts, optimal spacing, all animations enabled.

**Large Desktop:** Fourteen forty-one pixels and above. Maximum content width constraints, extra spacing, enhanced visuals.

---

## PERFORMANCE OPTIMIZATION

**Image Strategy:** Use WebP format with JPEG fallback. Lazy load all images below fold. Use blur placeholder while loading. Compress to under two hundred KB per image.

**Animation Performance:** Use transform and opacity for animations, avoid layout properties. Use will-change for elements that will animate. Reduce motion for users with prefers-reduced-motion setting.

**Loading Priority:** Critical CSS inline in head. Defer non-critical JavaScript. Preload hero image and critical fonts. Lazy load everything else.

**Code Splitting:** Each section component loads independently. Route-based splitting for different pages. Vendor bundle separate from application code.

---

## ACCESSIBILITY STANDARDS

**Keyboard Navigation:** All interactive elements keyboard accessible. Visible focus indicators. Logical tab order through content.

**Screen Readers:** Semantic HTML structure. ARIA labels on icons and graphics. Alt text on all images. Skip to content link.

**Color Contrast:** All text meets WCAG AA standards. Interactive elements have four point five to one contrast minimum. Focus indicators clearly visible.

**Motion:** Respect prefers-reduced-motion setting. Provide pause controls for auto-playing content. No animations that could trigger seizures.

---

## ROUTES STRUCTURE

**Public Routes:**
- / (Landing page - this design)
- /how-it-works (Detailed feature explanation)
- /pricing (Pricing page with tier details)
- /about (Company information)
- /blog (Blog listing)
- /contact (Contact form)
- /login (Authentication page)
- /signup (Registration with tier selection)

**Protected Routes:**
- /app/dashboard (Main dashboard)
- /app/contacts (CRM contacts)
- /app/pipeline (Deal pipeline)
- /app/wizard/startup-profile (Onboarding wizard)

---

## IMPLEMENTATION NOTES

Build this design system component by component. Start with Section One hero, validate responsive behavior, then proceed to next section. Test scroll animations in isolation before combining. Use Figma for high-fidelity mockups before development. Create component library first, then assemble sections. Prioritize mobile experience equally with desktop.

**Design Handoff Includes:** Figma files with all sections, asset exports in required formats, spacing specifications, typography scale, color palette, animation specifications, interaction documentation.

---

**Document Owner:** Design Team  
**Last Updated:** December 23, 2025  
**Status:** Ready for Design Implementation

---

**END OF DOCUMENT**