# Orillusive — Official Website Master Specification

> **Version:** 2.0  
> **Studio:** Orillusive  
> **Document Type:** Website Design & Development Specification  
> **Status:** Active — Updated with Full Technical Build Spec

---

## Table of Contents

1. [Brand Overview](#1-brand-overview)
2. [Design Philosophy](#2-design-philosophy)
3. [Color Palette](#3-color-palette)
4. [Typography](#4-typography)
5. [Tech Stack](#5-tech-stack)
6. [Folder Structure](#6-folder-structure)
7. [Loader / Splash Screen](#7-loader--splash-screen)
8. [Navigation Bar](#8-navigation-bar)
9. [Hero Section](#9-hero-section)
10. [Trust Stats Bar](#10-trust-stats-bar)
11. [About Section](#11-about-section)
12. [Services Grid](#12-services-grid)
13. [Development Process](#13-development-process)
14. [Selected Work / Projects](#14-selected-work--projects)
15. [Comparison Table](#15-comparison-table)
16. [Tech Marquee](#16-tech-marquee)
17. [Testimonial](#17-testimonial)
18. [Pricing / Engagements](#18-pricing--engagements)
19. [Contact / CTA Section](#19-contact--cta-section)
20. [Footer](#20-footer)
21. [Featured Products](#21-featured-products)
22. [Backend API Specification](#22-backend-api-specification)
23. [Animations & Motion](#23-animations--motion)
24. [Technical Requirements & Standards](#24-technical-requirements--standards)
25. [Important Rules](#25-important-rules)
26. [Reference Inspirations](#26-reference-inspirations)
27. [Section Checklist](#27-section-checklist)

---

## 1. Brand Overview

| Field | Value |
|---|---|
| **Company Name** | Orillusive |
| **Tagline** | Engineering Digital Products That Matter. |
| **Alt Tagline** | AI software development |
| **Position** | Premium Software Engineering Studio |
| **Core Mission** | Design and build modern software that solves real business problems |
| **Focus** | Long-term digital products — not short-term solutions |

### Brand Personality

- **Confident** — speaks through quality, not hype
- **Precise** — every design decision is intentional
- **Trustworthy** — reliability communicated through consistency
- **Premium** — commands respect without being flashy
- **Engineering-first** — function drives form

> The website should make visitors immediately think: *"This company builds serious software."*

---

## 2. Design Philosophy

### Overall Aesthetic

| Attribute | Description |
|---|---|
| Dark | Black background, high-contrast text |
| Minimal | Remove everything unnecessary |
| Editorial / Luxury Tech | Think: Linear, Vercel, Stripe — but darker |
| Generous Whitespace | Every section breathes |
| High Contrast | Pure black `#000` / `#111` with near-white text |
| Subtle Motion | Reveals on scroll, nothing overwhelming |
| Thin Borders | Low-opacity white/gray borders |
| Muted Accent | Single steel-blue accent `#4F6B85` |

### What to Avoid

- ❌ Startup clichés or generic agency templates
- ❌ Flashy neon gradients or oversaturated colors
- ❌ Colorful illustrations or cartoonish art
- ❌ Oversized emojis
- ❌ Fake statistics, fake clients, fake testimonials, fake awards
- ❌ Presenting Orillusive as an AI company
- ❌ Using buzzwords without substance

### Comparable Quality Standard

The final website must feel comparable to:

- **Stripe** — trust, authority, precision
- **Linear** — engineering aesthetic, dark mode done right
- **Vercel** — developer confidence, minimal design
- **Apple** — storytelling, spacing, simplicity
- **Notion** — readability, breathing room
- **Framer** — motion quality, interaction design

---

## 3. Color Palette

| Token | Hex / Value | Usage |
|---|---|---|
| `--color-bg` | `#0D0D0D` / `#111111` | Primary dark background |
| `--color-surface` | `#161616` / `#1A1A1A` | Elevated surfaces, cards |
| `--color-night` | `#111111` | Deepest dark sections, footer |
| `--color-text-primary` | `#F9F9F7` / near-white | Primary body and heading text |
| `--color-text-muted` | `rgba(249,249,247,0.55)` | Secondary/supporting text |
| `--color-accent` | `#4F6B85` | Buttons, highlights, links |
| `--color-accent-secondary` | `#3B2F2F` (dark brown) | Secondary accent details |
| `--color-border` | `rgba(255,255,255,0.10)` | Subtle section/card borders |
| `--color-glass` | `rgba(13,13,13,0.75)` | Glass morphism navbar/cards |

### Gradient Style

- Soft radial light spreads — not vibrant, atmospheric
- Inspired by Google Antigravity's premium lighting
- No harsh or bright gradients — light, not color

---

## 4. Typography

### Font Selection

- **Display / Headlines:** Clean bold sans-serif — `Outfit`, `Geist`, or `Inter Display`
- **Body:** Modern readable sans — `Plus Jakarta Sans` or `Inter`
- **Mono (optional):** `JetBrains Mono` — used sparingly for code/labels

### Typographic Hierarchy

| Level | Size Range | Weight | Usage |
|---|---|---|---|
| Display | 72–120px | 700–800 | Hero headline |
| H1 | 48–72px | 600–700 | Section headlines |
| H2 | 36–48px | 600 | Sub-section heads |
| H3 | 24–30px | 500–600 | Card titles |
| Body | 16–18px | 400 | Paragraphs |
| Caption / Label | 10–13px | 600–700 | Uppercase labels, tags |

### Typography Rules

- Large display headlines — let them dominate
- Minimal paragraph copy — say more with less
- Generous line-height: `1.6–1.8` body, `0.95–1.15` display
- Every section must breathe — no cramped layouts

---

## 5. Tech Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| **React** | 18 | UI framework |
| **Vite** | 5+ | Build tool & dev server |
| **React Router** | v6 | Client-side routing (future pages) |
| **Tailwind CSS** | v3 | Utility-first styling |
| **Framer Motion** | 11+ | Scroll/reveal animations |
| **Lucide React** | Latest | Icon library |
| **TypeScript** | 5+ | Type safety |

### Backend

| Technology | Purpose |
|---|---|
| **Node.js** | Runtime |
| **Express.js** | HTTP server / API |
| **Nodemailer** | Contact form email sending |
| **Resend API** | Alternative email provider (optional) |
| **CORS** | Cross-origin request handling |
| **dotenv** | Environment variable management |
| **express-rate-limit** | Basic API rate limiting |
| **MongoDB** (optional) | Lead/contact form storage |

### Architecture

- **Single Page App** (SPA) with smooth scroll navigation
- Separate `/client` (React+Vite) and `/server` (Express) folders
- Root `package.json` runs both concurrently via `concurrently` package
- No Next.js used

---

## 6. Folder Structure

```
orillusive/
│
├── client/                              # Frontend — React + Vite
│   ├── public/
│   │   ├── assets/
│   │   │   ├── orillusive-hero.jpg      # Hero dashboard image
│   │   │   ├── project-northstar.jpg
│   │   │   ├── project-aurelia.jpg
│   │   │   └── project-vanta.jpg
│   │   └── favicon.ico
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── atoms/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Badge.tsx
│   │   │   │   ├── Icon.tsx
│   │   │   │   └── Tag.tsx
│   │   │   ├── molecules/
│   │   │   │   ├── ServiceCard.tsx
│   │   │   │   ├── ProjectCard.tsx
│   │   │   │   ├── PricingCard.tsx
│   │   │   │   ├── ProcessStep.tsx
│   │   │   │   └── StatCounter.tsx
│   │   │   └── organisms/
│   │   │       ├── Navbar.tsx
│   │   │       ├── SplashLoader.tsx
│   │   │       ├── HeroSection.tsx
│   │   │       ├── StatsBar.tsx
│   │   │       ├── AboutSection.tsx
│   │   │       ├── ServicesGrid.tsx
│   │   │       ├── ProcessSection.tsx
│   │   │       ├── ProjectsSection.tsx
│   │   │       ├── ComparisonTable.tsx
│   │   │       ├── TechMarquee.tsx
│   │   │       ├── TestimonialSection.tsx
│   │   │       ├── PricingSection.tsx
│   │   │       ├── ContactSection.tsx
│   │   │       └── Footer.tsx
│   │   │
│   │   ├── pages/
│   │   │   ├── HomePage.tsx             # All sections assembled
│   │   │   ├── ServicesPage.tsx
│   │   │   ├── ProjectsPage.tsx
│   │   │   ├── AboutPage.tsx
│   │   │   ├── ProcessPage.tsx
│   │   │   ├── PricingPage.tsx
│   │   │   └── ContactPage.tsx
│   │   │
│   │   ├── hooks/
│   │   │   ├── useScrollAnimation.ts
│   │   │   ├── useLoaderAnimation.ts
│   │   │   ├── useMouseParallax.ts
│   │   │   └── useCounterAnimation.ts
│   │   │
│   │   ├── data/
│   │   │   ├── services.ts
│   │   │   ├── projects.ts
│   │   │   ├── process.ts
│   │   │   ├── technologies.ts
│   │   │   ├── pricing.ts
│   │   │   └── stats.ts
│   │   │
│   │   ├── types/
│   │   │   └── index.ts
│   │   │
│   │   ├── lib/
│   │   │   └── gsap.ts
│   │   │
│   │   ├── styles/
│   │   │   ├── index.css
│   │   │   └── animations.css
│   │   │
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── package.json
│
├── server/                              # Backend — Node.js + Express
│   ├── src/
│   │   ├── routes/
│   │   │   ├── contact.ts               # POST /api/contact
│   │   │   └── subscribe.ts             # POST /api/subscribe
│   │   ├── middleware/
│   │   │   ├── cors.ts
│   │   │   ├── rateLimit.ts
│   │   │   └── validate.ts
│   │   ├── services/
│   │   │   └── mailer.ts               # Nodemailer / Resend setup
│   │   ├── db/
│   │   │   └── persistence.ts          # MongoDB or file-based storage
│   │   └── server.ts                   # Express app entry point
│   │
│   ├── .env.example
│   ├── tsconfig.json
│   └── package.json
│
├── package.json                         # Root — concurrently runner
├── .gitignore
└── Orillusive_Website_Master_Specification.md
```

---

## 7. Loader / Splash Screen

**Inspiration:** Ferrari loading experience

### Behaviour

- Full dark screen (`#111111`)
- Animated **Orillusive.** logo centered — scale + opacity reveal
- Thin animated loading line below the logo
- Smooth full-screen fade out into hero
- Duration: **2–3 seconds total**

### Animation Sequence

```
0.0s  → Screen is black
0.2s  → Logo scales in: scale(0.9→1.0) + opacity(0→1), 0.8s ease-out
1.0s  → Loading line animates scaleX(0→1) from left, 0.8s
1.8s  → Brief hold
2.4s  → Full screen fades out: opacity(1→0), 0.5s ease-in-out
2.9s  → Hero section visible
```

### Component

```tsx
// organisms/SplashLoader.tsx
// Uses Framer Motion AnimatePresence for mount/unmount
// useLoaderAnimation() hook controls timing + state
```

---

## 8. Navigation Bar

**Inspiration:** Lamborghini — floating, glass, minimal

### Links

```
Orillusive.  |  Services  Products  About  Process  Pricing  Contact  |  [ Book a Call ]
```

### Scroll States

| State | Style |
|---|---|
| Top of page | Fully transparent, no background |
| Scrolled (> 40px) | Glass: `background: rgba(13,13,13,0.80)`, `backdrop-filter: blur(20px)`, thin border-bottom |
| Mobile | Hamburger → smooth slide-down drawer |

### CTA Button

- **Label:** `Book a Call`
- Style: Solid `#4F6B85`, white text, rounded, hover scale `1.02`

### Glass Morphism Spec

```css
background: rgba(13, 13, 13, 0.80);
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);
border-bottom: 1px solid rgba(255, 255, 255, 0.08);
```

---

## 9. Hero Section

**Inspiration:** Bugatti — cinematic fullscreen, luxury motion

### Layout

- Fullscreen (`100dvh`), content centered/left-aligned
- Left: copy + CTAs
- Right: floating hero dashboard image (drifting animation)

### Exact Content

```
Label:     AI software development

Headline:  Building software that
           moves business forward.

Body:      We design and engineer intelligent products for businesses
           ready to lead their next chapter.

CTA 1:     [ Book Discovery Call ]       ← primary, filled
CTA 2:     [ View Our Work ]             ← secondary, outlined

Badge:     • System status: Intelligence, operational.   ← appears on the hero image card
```

### Hero Image / Mockup

- Hero dashboard image floating with slow `drift` animation
- Card overlay at bottom of image: system status badge
- Mouse-parallax subtle movement (GSAP)

### Background

- Dark `#0D0D0D`
- Soft radial glow upper-right (steel blue, very low opacity)
- Subtle particle layer (optional, very restrained)

---

## 10. Trust Stats Bar

**Type:** 6 animated counter cards with scroll-triggered count-up animation

### Stats

| Metric | Value |
|---|---|
| Projects delivered | `120+` |
| Industries served | `30+` |
| Client satisfaction | `99%` |
| Countries | `10+` |
| Global support | `24/7` |
| Years of impact | `5+` |

### Animation

- Numbers count up from `0` on scroll into view
- `useCounterAnimation()` hook using Framer Motion `useInView`
- Light border top/bottom, grid layout

---

## 11. About Section

**Inspiration:** Notion — spacing, readability, intentional layout

### Content

```
Headline:  Technology should not merely support a business.
           It should change what the business can become.

3-Column Feature Cards:

  01  See clearly
      We uncover the highest-leverage opportunity.

  02  Build precisely
      We turn complexity into calm, useful products.

  03  Move decisively
      We ship, learn, and compound the advantage.
```

### Layout

- Left: label + supporting text
- Right: large headline spanning 2/3 width
- Below: 3 equal feature columns with dividers

---

## 12. Services Grid

**Type:** 8-card grid (4 columns desktop, 2 tablet, 1 mobile)

### Services

| # | Icon | Title | Description |
|---|---|---|---|
| 1 | `Bot` | AI Solutions | Intelligent systems grounded in your data, workflows, and competitive edge. |
| 2 | `Globe` | Web Applications | Fast, resilient platforms engineered for complexity and effortless use. |
| 3 | `Smartphone` | Mobile Apps | Native-quality product experiences for iOS, Android, and every screen between. |
| 4 | `Layers` | SaaS Development | From product architecture to scale — subscription products built to endure. |
| 5 | `Zap` | Automation | Connected workflows that remove friction, accelerate teams, and compound output. |
| 6 | `Sparkles` | UI / UX | Calm, clear interfaces that make sophisticated software feel instinctive. |
| 7 | `Cloud` | Cloud Systems | Secure infrastructure shaped for availability, performance, and global growth. |
| 8 | `Code` | Maintenance | Continuous optimization, observability, and expert support after launch. |

### Card Design

- Dark bg `#161616`, thin border `rgba(255,255,255,0.10)`
- Icon in accent color `#4F6B85`
- Icon at top, title below, short desc at bottom
- Hover: subtle bg lighten `rgba(255,255,255,0.06)`, icon scale up

---

## 13. Development Process

**Layout:** Horizontal timeline (desktop) / vertical stack (mobile)

### Steps

| # | Title |
|---|---|
| `01` | Discovery |
| `02` | Strategy |
| `03` | Design |
| `04` | Development |
| `05` | Launch |
| `06` | Growth |

### Visual Spec

- Numbered circles in accent color
- Animated connection line (scaleX from 0→1 on scroll)
- Step reveal: stagger left-to-right as user scrolls in

---

## 14. Selected Work / Projects

**Type:** 3 large project showcase cards

### Projects

#### Northstar — Enterprise Intelligence

```
Category:   Enterprise Intelligence
Headline:   Northstar
Metric:     42% faster decisions
Tags:       Strategy · Product Design · Engineering
CTA:        Explore the result →
Image:      project-northstar.jpg
```

#### Aurelia — AI Financial Platform

```
Category:   AI Financial Platform
Headline:   Aurelia
Metric:     $18M analyzed daily
Tags:       Strategy · Product Design · Engineering
CTA:        Explore the result →
Image:      project-aurelia.jpg
```

#### Vanta Health — Mobile Automation

```
Category:   Mobile Automation
Headline:   Vanta Health
Metric:     3.2× user growth
Tags:       Strategy · Product Design · Engineering
CTA:        Explore the result →
Image:      project-vanta.jpg
```

### Card Layout

- Left: image (7/5 aspect, hover scale `1.025`, `overflow-hidden`)
- Right: category tag, headline, metric, tags, CTA link
- Alternating image-left / image-right layout per card

---

## 15. Comparison Table

**Type:** Two-column side-by-side comparison

| Traditional Agency | Orillusive |
|---|---|
| Layers of account management | Senior experts, directly involved |
| Fixed, opaque processes | Adaptive execution with total clarity |
| Technology follows the brief | Technology shapes the opportunity |
| Launch marks the finish | Launch begins the growth cycle |

### Visual Spec

- Left column: low opacity `0.50`, muted × icons
- Right column: full opacity, accent ✓ icons in `#4F6B85`
- Dark section background for contrast
- Thin divider between columns

---

## 16. Tech Marquee

**Type:** Infinite auto-scrolling horizontal strip

### Technologies (in order)

```
React · Node.js · Flutter · PostgreSQL · AWS · OpenAI · Claude · Gemini
(duplicated for seamless infinite loop)
```

> Note: OpenAI, Claude, Gemini appear **only here** in the tech marquee — never in any other section.

### Spec

- Speed: 25s linear infinite
- Pause on hover (`animation-play-state: paused`)
- Text only (icon optional), muted color, separated by dots or spaces
- Overflow hidden container, `marquee-track` pattern

---

## 17. Testimonial

**Type:** Single quote block — centered, large display typography

### Content

```
Icon:      speech bubble icon (Lucide)

Quote:     "Orillusive did not just ship our platform.
            They changed how our company thinks about software."

Author:    Maya Ellison
Role:      COO, Northstar Logistics
```

### Navigation

- Dot indicators (3 total) — future expansion ready
- Prev / Next arrow buttons
- Auto-rotate every 5 seconds (pause on hover)

---

## 18. Pricing / Engagements

**Type:** 3-tier engagement cards

### Tiers

| Tier | Title | Price | Description |
|---|---|---|---|
| 1 | Product Sprint | From $12k | Define and validate the opportunity |
| 2 | End-to-End Build | From $35k | Design and engineer the full product |
| 3 | Dedicated Product Team | Monthly | Continuous delivery and growth |

### CTA per Tier

- `Book a Call` → `#contact`
- `Get Started` → `#contact`
- `Learn More` → `#contact`

### Layout

- Light surface background (`--steel-soft` or near-white variant)
- Cards stacked vertically (accordion-list style) or horizontal grid
- Price displayed in accent color
- Hover: opacity shift, subtle lift

---

## 19. Contact / CTA Section

**Type:** Full-width dark CTA + working contact form

### Display Content

```
Dark background: #111111

Label:     Start a conversation

Headline:  Let's build something
           extraordinary.

CTA:       [ Book Strategy Call ]  → mailto or booking link
```

### Contact Form (connected to backend)

```html
Fields:
  - Name         (required, text)
  - Email        (required, email)
  - Message      (required, textarea)

Submit:    [ Send Message ]

POST → http://localhost:5000/api/contact
```

### Success / Error States

- Success: inline confirmation message
- Error: inline error with retry option
- Loading: button spinner while submitting

---

## 20. Footer

**Type:** Dark, minimal, 4-column grid

### Layout

```
Column 1:   Orillusive.
            Intelligent software for ambitious businesses.

Column 2:   Navigate
            Services · Projects · About · Process · Pricing

Column 3:   Contact
            hello@orillusive.com
            Working worldwide

Column 4:   Field notes (newsletter)
            [email input] [ → ]
            POST → /api/subscribe
```

### Bottom Bar

```
© 2026 Orillusive. All rights reserved.     LinkedIn · X · Privacy
```

### Spec

- Background: `#111111`
- Text: white at various low opacities
- All social icons: monochrome
- Border-top: `rgba(255,255,255,0.12)`

---

## 21. Featured Products

> Real products currently under development by Orillusive.

### Product 1 — Hotel Management System

```
Title:   Hotel Management System
Status:  Currently Under Development

Features:
  - Reservation Management
  - Guest Management
  - Room Management
  - Booking Calendar
  - Revenue Dashboard
  - Staff Management
  - OTA Integrations
  - Multi-property Support
```

### Card Design

- Premium showcase cards — dark surface, soft shadow
- Large product screenshot/mockup area
- Status badge: `Under Development`
- Feature list: icon + text rows
- Hover: subtle card lift + shadow deepen
- No fake download counts, ratings, or revenue numbers

---

## 22. Backend API Specification

### Base URL

```
Development:   http://localhost:5000
Production:    https://api.orillusive.com
```

### Endpoints

---

#### `POST /api/contact`

Accepts contact form submission, validates input, sends email via Nodemailer.

**Request Body**

```json
{
  "name": "string (required, min 2 chars)",
  "email": "string (required, valid email)",
  "message": "string (required, min 10 chars)"
}
```

**Success Response — `200 OK`**

```json
{
  "success": true,
  "message": "Your message has been sent. We'll be in touch shortly."
}
```

**Error Response — `400 Bad Request`**

```json
{
  "success": false,
  "error": "Please provide a valid email address."
}
```

**Rate Limit:** 5 requests / 15 minutes per IP

---

#### `POST /api/subscribe`

Accepts newsletter subscription email. Stores to MongoDB (or JSON file) and optionally forwards.

**Request Body**

```json
{
  "email": "string (required, valid email)"
}
```

**Success Response — `200 OK`**

```json
{
  "success": true,
  "message": "Subscribed to Field Notes successfully."
}
```

**Rate Limit:** 3 requests / hour per IP

---

#### `GET /api/health`

Returns server status.

**Response — `200 OK`**

```json
{
  "status": "ok",
  "uptime": 3612.4
}
```

---

### Nodemailer Configuration (`.env.example`)

```env
# Server
PORT=5000
NODE_ENV=development

# SMTP (Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=hello@orillusive.com
SMTP_PASS=your_app_password

# Resend (alternative)
RESEND_API_KEY=re_xxxxxxxxxxxx

# Email targets
EMAIL_TO=hello@orillusive.com
EMAIL_FROM="Orillusive Website <noreply@orillusive.com>"

# MongoDB (optional)
MONGODB_URI=mongodb://localhost:27017/orillusive
```

---

### CORS Configuration

```ts
// server/middleware/cors.ts
const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'https://orillusive.com',
  'https://www.orillusive.com'
];
```

---

### Rate Limiting

```ts
// 5 requests per 15 minutes per IP for /api/contact
// 3 requests per hour per IP for /api/subscribe
// Uses express-rate-limit package
```

---

## 23. Animations & Motion

**Inspiration:** Bugatti cinematic experience

### Motion Principles

| Principle | Description |
|---|---|
| **Purposeful** | Every animation serves a reason |
| **Smooth** | No jarring or aggressive transitions |
| **Expensive** | Feels like premium interaction |
| **Restrained** | Quality over quantity |

### Animation Types

| Type | Usage | Library |
|---|---|---|
| Fade + Slide Up | Section reveals on scroll | Framer Motion |
| Scale reveal | Cards, buttons, badges | Framer Motion |
| Parallax | Hero background | GSAP ScrollTrigger |
| Mouse tracking | Hero mockup drift | GSAP + custom hook |
| Stagger reveal | Service cards, feature lists | Framer Motion |
| Text reveal | Large headlines | Framer Motion |
| Count-up | Stats bar numbers | Framer Motion + custom |
| Infinite scroll | Tech marquee | CSS animation |
| Micro-interactions | Buttons, links, nav | CSS + Framer Motion |
| Floating drift | Hero product image | Framer Motion `animate` |

### Easing Curves

```ts
// Premium easing
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];        // Fast out — luxury feel
const EASE_IN_OUT  = [0.25, 0.46, 0.45, 0.94];  // Smooth ease-in-out

// Durations
const FAST   = 0.4; // micro-interactions
const NORMAL = 0.6; // reveals
const SLOW   = 1.0; // hero, large sections
```

### Framer Motion — Section Reveal Pattern

```tsx
const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

// Usage:
<motion.section
  variants={sectionVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.08 }}
>
```

---

## 24. Technical Requirements & Standards

### Performance

| Metric | Target |
|---|---|
| Lighthouse Performance | ≥ 90 |
| LCP | < 2.5s |
| CLS | < 0.1 |
| FID / INP | < 100ms |
| JS Bundle | Code-split per page |

### SEO

- Proper `<title>` and `<meta description>` on every page
- Open Graph + Twitter Card meta tags
- JSON-LD structured data (Organization schema)
- Semantic HTML5 throughout (`<main>`, `<section>`, `<nav>`, `<footer>`)
- `sitemap.xml` and `robots.txt`

### Accessibility

- WCAG 2.1 AA compliance
- `aria-label` on all icon-only buttons
- All images have meaningful `alt` text
- Keyboard navigable throughout
- Visible focus indicators (`focus-visible`)
- Color contrast ratio ≥ 4.5:1

### Responsive Breakpoints

| Name | Width | Layout |
|---|---|---|
| Mobile | `< 640px` | Single column |
| Tablet | `640px – 1024px` | 2 columns |
| Desktop | `1024px – 1440px` | Full layout |
| Large | `> 1440px` | Max-width constrained |

### Root `package.json` — Concurrent Runner

```json
{
  "name": "orillusive-monorepo",
  "version": "1.0.0",
  "scripts": {
    "dev": "concurrently \"npm run dev --prefix client\" \"npm run dev --prefix server\"",
    "build": "npm run build --prefix client",
    "start": "npm run start --prefix server"
  },
  "devDependencies": {
    "concurrently": "^8.0.0"
  }
}
```

---

## 25. Important Rules

### Content Rules — Non-Negotiable

- ❌ Never create fake clients
- ❌ Never create fake testimonials
- ❌ Never create fake awards or badges
- ❌ Never create fake statistics
- ❌ Never mention OpenAI, ChatGPT, Claude, Gemini outside the tech marquee
- ❌ Never present Orillusive as an AI company
- ❌ Never use buzzwords without substance

### Design Rules

- ✅ Every decision must communicate trust, craftsmanship, and long-term quality
- ✅ Use only real products currently in development
- ✅ Keep copy minimal and intentional
- ✅ Every pixel must earn its place
- ✅ Design must feel handcrafted — never templated

### Engineering Rules

- ✅ One component per section (`organisms/`)
- ✅ All data in `/data/*.ts` — no hardcoded strings in components
- ✅ All TypeScript strict mode
- ✅ `.env.example` committed, `.env` in `.gitignore`
- ✅ All API endpoints validated and rate-limited
- ✅ `aria-*` attributes on all interactive elements

---

## 26. Reference Inspirations

> Use as visual/conceptual reference only. Never copy. Create an original identity.

| Reference | What to Study |
|---|---|
| **Google Antigravity** | Color palette, premium gradients, lighting, glass effects, futuristic atmosphere |
| **Notion** | Clean layouts, spacing, typography hierarchy, readability |
| **Bugatti** | Cinematic fullscreen hero, smooth animations, luxury transitions |
| **Ferrari** | Splash screen, loading experience |
| **Lamborghini** | Premium navbar, floating menu, spacing, interaction design |
| **Ibex** | Industries/capabilities section structure |
| **Stripe** | Trust, technical authority, premium SaaS feel |
| **Linear** | Precision, engineering aesthetic, dark mode |
| **Vercel** | Developer confidence, minimal design |
| **Apple** | Storytelling, product presentation, simplicity |
| **Framer** | Motion design, interaction quality |

---

## 27. Section Checklist

| # | Section | Priority | Component File | Status |
|---|---|---|---|---|
| 1 | Splash / Loader | Critical | `SplashLoader.tsx` | ⬜ |
| 2 | Navbar | Critical | `Navbar.tsx` | ⬜ |
| 3 | Hero | Critical | `HeroSection.tsx` | ⬜ |
| 4 | Trust Stats Bar | High | `StatsBar.tsx` | ⬜ |
| 5 | About | High | `AboutSection.tsx` | ⬜ |
| 6 | Services Grid | High | `ServicesGrid.tsx` | ⬜ |
| 7 | Process | Medium | `ProcessSection.tsx` | ⬜ |
| 8 | Selected Work | High | `ProjectsSection.tsx` | ⬜ |
| 9 | Comparison Table | High | `ComparisonTable.tsx` | ⬜ |
| 10 | Tech Marquee | Medium | `TechMarquee.tsx` | ⬜ |
| 11 | Testimonial | Medium | `TestimonialSection.tsx` | ⬜ |
| 12 | Pricing | High | `PricingSection.tsx` | ⬜ |
| 13 | Contact / CTA | Critical | `ContactSection.tsx` | ⬜ |
| 14 | Footer | Critical | `Footer.tsx` | ⬜ |
| 15 | Featured Products | Medium | `FeaturedProducts.tsx` | ⬜ |
| — | POST /api/contact | Critical | `routes/contact.ts` | ⬜ |
| — | POST /api/subscribe | High | `routes/subscribe.ts` | ⬜ |
| — | GET /api/health | Medium | `routes/health.ts` | ⬜ |

---

*This document is the single source of truth for the Orillusive website.  
All design and engineering decisions must align with the principles defined here.*

---

**Orillusive. Engineering Digital Products That Matter.**
