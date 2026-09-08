# Nakshatra — Vedic Astrology & Counsel

A beautiful, modern website for Nakshatra Vedic Astrology services. Built with semantic HTML, a custom design system, and minimal dependencies.

**Live:** [Nakshatra Website]([https://nakshatra.example](https://astrology-ief9ebdns-ram-singh1s-projects.vercel.app/))  
**Owner:** Nakshatra (Vedic Astrologer, Ludhiana · Punjab · India)

---

## 🌙 About

Nakshatra is a full-time Vedic astrology practice offering:

- **Birth Chart Readings** — Complete janma-kundali sessions
- **Love & Marriage Timing** — Compatibility and guna-milan guidance
- **Career & Money Direction** — Dasha-led timing for life changes
- **Muhurta** — Auspicious timing for weddings, ventures, and life events
- **Remedies & Rituals** — Grounded upaya (mantra, gemstone, charity)
- **Child & Family Charts** — Naming, temperament, and study insights
- **Annual Forecasts** — Varshaphal (solar-return) year mapping
- **Corporate & Founder Sessions** — Private counsel for teams and leaders

**18+ years** of practice · **12,000+ consultations** · **40 countries served** · **4.9★ average rating**

---

## 🏗️ Project Structure

```
astrology-web/
├── index.html                    # Main page (semantic HTML)
├── css/                          # Design system (modular, organized)
│   ├── variables.css            # Custom properties (colors, spacing, typography)
│   ├── base.css                 # Global styles, reset
│   ├── typography.css           # Font scales, text utilities
│   ├── layout.css               # Grid, sections, spacing utilities
│   ├── components.css           # Buttons, forms, cards, links
│   ├── sections.css             # Page section styles
│   ├── animations.css           # Reveal animations, transitions
│   └── responsive.css           # Mobile/tablet breakpoints
├── js/                          # Lightweight scripts
│   ├── utilities.js             # Helper functions
│   ├── animations.js            # Scroll reveal & parallax
│   ├── youtube.js               # YouTube embed loader
│   └── main.js                  # Form handling, utilities
├── assets/
│   ├── icons/                   # SVG icons (mark, etc.)
│   ├── illustrations/           # SVG illustrations (portrait)
│   └── svg/                     # SVG graphics (zodiac wheel, constellation)
├── Nakshatra-mockup.psd         # Design file (Figma/Photoshop)
└── Nakshatra-mockup-preview.png # Screenshot

```

---

## 🎨 Design System

### Language Composition
- **CSS** — 53.9% (modular design system)
- **HTML** — 33.2% (semantic, accessible structure)
- **JavaScript** — 12.9% (progressive enhancement, no frameworks)

### Key Principles

1. **No framework bloat** — Bootstrap 5 used only for responsive offcanvas navigation
2. **Component-organized CSS** — Each file handles one concern (layout, typography, animations, etc.)
3. **Custom properties (CSS variables)** — Single source of truth for colors, spacing, typography
4. **Semantic HTML** — Proper use of `<section>`, `<header>`, `<article>`, ARIA labels
5. **Progressive enhancement** — JavaScript enhances, doesn't require
6. **Accessibility-first** — WCAG 2.1 compliant, keyboard navigation, screen reader friendly

### Color Palette

Defined in `css/variables.css`:
- **Primary** — Ink (dark charcoal)
- **Accent** — Terracotta (warm, inviting)
- **Secondary** — Rust, saffron, paper (cream), ivory
- **Neutral** — Hairline (borders), muted (text hints)

### Typography

- **Display/Headings** — Fraunces (serif, variable optical size)
- **Body/UI** — Inter (sans-serif, 400–700 weights)
- Loaded from Google Fonts with preconnect for performance

---

## 📱 Page Structure

### 1. **Masthead (Header)**
- Logo & brand identity
- Primary navigation (offcanvas on mobile)
- "Book a reading" CTA button

### 2. **Overture (Hero)**
- Full-height intro section
- Animated medallion (astrologer portrait + zodiac ring)
- Key metrics (years, consultations, countries, satisfaction)
- Parallax background effects

### 3. **Almanac (Services)**
- 8 service offerings in a numbered list
- Astrological symbols (glyphs)
- Responsive card layout
- Reveal animations on scroll

### 4. **Chronicle (About + Why)**
- Personal story (grandmother, Varanasi, journey)
- Timeline of milestones (2007–2024)
- Trust factors (no fear-selling, classical methods, recordings)

### 5. **Summon (CTA Band)**
- Transitional section with invitation to book
- Reinforces main value proposition

### 6. **Reckoning (How It Works + Pricing)**
- 3-step process (birth details → video call → map + recording)
- 3 pricing tiers (First Light ₹2,100 · Full Chart ₹5,400 · Year Ahead ₹18,000)
- Most-chosen tier highlighted with badge

### 7. **Dispatches (YouTube Feed)**
- Dynamic YouTube embed loader
- Skeleton loading state
- Subscribe link
- Lazy-loaded with data attributes

### 8. **Voices (Testimonials)**
- Mosaic layout of 4 customer quotes
- Aggregate rating display (4.9★)
- Avatar initials in circles
- Staggered reveal animations

### 9. **Horizon (Final CTA + Booking)**
- Booking form (name, email, topic)
- Preparation message
- Success confirmation message

### 10. **Colophon (Footer)**
- Brand mark & tagline
- Navigation links (internal)
- Contact info (email, phone, location)
- Social links
- Legal note
- Copyright & back-to-top link
- Decorative constellation SVG

---

## 🖼️ Image & Media Strategy

### Image Optimization
All images use semantic markup without inline CSS:

```html
<!-- ✅ GOOD — Class-based styling -->
<img class="overture__face" 
     src="assets/illustrations/astrologer-portrait.svg"
     alt="Illustrated portrait of the Nakshatra astrologer"
     width="620" height="780" />

<!-- ❌ AVOID — Inline styles -->
<img style="width: 620px; height: 780px;" src="..." />
```

### SVG Assets
- **Zodiac wheel** — Animated background, reused in hero & CTA
- **Constellation** — Decorative in hero & footer
- **Astrological glyphs** — Service icons (☉︎ ♀︎ ☿︎ ☽︎ ♄︎ ♃︎ ♆︎ ☊︎)
- **Mark/Logo** — Favicon & branding

### Image Sizing
- **Width/height attributes included** — Prevents layout shift
- **Lazy loading** — Applied to footer image (`loading="lazy"`)
- **Responsive SVGs** — Scale with viewport
- **Illustrations** — High-quality PNG preview of mockup

---

## 🎬 Animations

### Reveal Animations
- **`.reveal` class** — Scroll-triggered fade-in + slide-up
- **`data-delay` attribute** — Staggered animation timing
- **No-JS fallback** — `<noscript>` ensures content always visible

### Parallax Effects
- **Background parallax** — `data-parallax` attribute on hero elements
- **Smooth scroll behavior** — CSS and JS work together

### Transitions
- **Button hovers** — Color, shadow, arrow translate
- **Link underlines** — Smooth scale animation
- **Form focus** — Glow ring effect
- **Hover lift** — Cards elevate on hover

---

## ⚙️ JavaScript

### Utilities (`js/utilities.js`)
- Helper functions for DOM manipulation
- Event delegation patterns
- Reusable utility methods

### Animations (`js/animations.js`)
- Scroll reveal implementation
- Parallax effect handler
- Intersection Observer API usage

### YouTube Loader (`js/youtube.js`)
- Dynamically loads YouTube embeds from `data-yt-grid`
- Builds iframe elements with video IDs
- Handles errors gracefully

### Main (`js/main.js`)
- Form submission handling (booking form)
- Year auto-update in footer
- Event listeners
- Page initialization

---

## 🚀 Performance & Best Practices

### Performance
- ✅ **Minimal critical CSS** — Design system split logically
- ✅ **Font preconnect** — Google Fonts optimization
- ✅ **Lazy loading** — Images marked where appropriate
- ✅ **No tracking bloat** — No analytics by default
- ✅ **Semantic HTML** — Reduces need for extra markup

### Accessibility
- ✅ **ARIA labels** — Sections, nav, images, form fields
- ✅ **Semantic elements** — `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- ✅ **Keyboard navigation** — Focus management, skip link
- ✅ **Color contrast** — WCAG AA compliant
- ✅ **Alt text** — All decorative images marked `alt=""`
- ✅ **Form labels** — Proper field associations

### SEO
- ✅ **Meta tags** — Description, Open Graph, favicon
- ✅ **Heading hierarchy** — H1 → H2 → H3 proper structure
- ✅ **Semantic markup** — Schema-friendly HTML
- ✅ **Mobile-friendly** — Responsive viewport meta tag

---

## 🔧 Development

### No Build Process Required
This is a **static website** — no build tools, bundlers, or framework compilation needed. Simply open `index.html` in a browser or serve with any web server.

### CSS Architecture
- **Single responsibility** — Each CSS file has one purpose
- **Reusable classes** — Layout utilities, text utilities
- **CSS variables** — All colors, sizes, durations defined once
- **Mobile-first breakpoints** — Responsive design in `responsive.css`

### Customization

#### Colors
Edit `css/variables.css`:
```css
--c-ink: #1a1410;        /* Primary dark */
--c-terracotta: #c85a3a; /* Accent warm */
--c-rust: #a04d32;       /* Hover dark accent */
```

#### Typography
Edit `css/variables.css`:
```css
--font-display: "Fraunces", serif;
--font-text: "Inter", sans-serif;
--fs-h1: 3.2rem;  /* Hero heading */
--fs-h2: 2rem;    /* Section heading */
```

#### Spacing & Sizing
All spacing uses `--space-*` variables; adjust the base multiplier to scale globally.

---

## 📦 Dependencies

### External
- **Google Fonts** — Fraunces + Inter (with preconnect)
- **Bootstrap 5.3.3** — CDN, used only for offcanvas nav
- **No frameworks** — No React, Vue, Angular, etc.

### Internal
- Custom design system (CSS only)
- Lightweight vanilla JavaScript
- SVG illustrations & icons

---

## 🔐 Privacy & Legal

- Astrology offered as **reflection & counsel**, not medical/legal/financial advice
- User retains final word on their own life
- Booking form data should be handled with privacy compliance (GDPR, local law)
- No tracking scripts included; add your own analytics if needed

---

## 📝 License

This website and its design are the intellectual property of Nakshatra (Vedic Astrology). The code is provided as-is for maintenance and development purposes.

---

## 🌐 Deployment

### Static Hosting
Deploy to any static host:
- **Netlify** — Connect GitHub repo, auto-deploy on push
- **Vercel** — Similar setup to Netlify
- **GitHub Pages** — Push to `gh-pages` branch
- **Cloudflare Pages** — Free global CDN
- **Traditional hosting** — FTP/SFTP to any web server

### Form Submission
The booking form (`data-book`) currently logs to console. To enable email delivery:
1. Connect to **Formspree**, **Basin**, or similar service
2. Update `action` attribute on `<form>`
3. Add verification token if required

---

## 📧 Contact

**Nakshatra**  
📍 Ludhiana · Punjab · India  
✉️ hello@nakshatra.example  
📞 +91 00000 00000  
🎥 [YouTube Channel](https://www.youtube.com/@KRSchannel)  

---

**"The stars incline, they do not bind."**

Built with clarity and care. ☾︎

