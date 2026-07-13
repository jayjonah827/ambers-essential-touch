# AMBER'S ESSENTIAL TOUCH — local site

Static build. No Wix. Open `index.html` in any browser. All pages cross-link.

## Pages
- `index.html`    Home
- `about.html`    About Amber
- `services.html` Services + policies
- `shop.html`     Product catalog (inquiry flow, no cart)
- `book.html`     4-step booking flow (request-based)
- `donate.html`   Mission + donation request form
- `rituals.html`  Blog index (10 starter posts)
- `reviews.html`  4.9★ / 25 reviews
- `contact.html`  Form + map + hours + socials

## Files
- `css/styles.css` — single stylesheet, design tokens at top
- `js/main.js` — mobile drawer, CTA rail fade, booking stepper, form intercept
- `img/` — brand assets (portrait, lotus, firefly)

## Brand palette (actual-brand, reconciled from portrait.pdf + card.pdf)
- Crimson primary: #7A1F2B
- Gold accent:     #C9A961
- Forest:          #2C3E2D
- Amber neutrals:  #B87D4B / #F5E8D8
- Cream bg:        #FBF7F0

## Fonts
- Dancing Script  (script wordmark)
- Cormorant Garamond  (display + body serif)
- Inter  (UI / eyebrows / CTAs)

## What's wired
- 9 pages, all cross-linked
- Mobile-first, 375px → 1440px
- Sticky header, mobile drawer, floating CTA rail (3 buttons)
- Hero on every page
- Trust strip on home
- Skin Notes email capture (3 pages)
- Mission band with $25/$50/$100 CTAs
- Booking stepper (4 steps)
- Intake form with age bracket, minors handling, newsletter opt-in
- Donation form with anonymous option
- Contact form with topic routing
- Policies as `<details>` accordions
- Google Map embed on Contact
- WCAG AA color contrast
- Skip-to-content link
- `prefers-reduced-motion` honored

## What is mock / pending real integration
- Forms: show inline confirmation only — no backend yet
- Booking: request-based; calendar sync pending (Phase 2)
- Payments: all inquire-based (Venmo/PayPal by reply); Stripe pending flip trigger
- Reviews: hand-written starter set; Birdeye/Google widget swaps in on deploy
- Blog posts: index only — individual post pages not yet built
- No service sub-pages yet (services/waxing, services/facials, etc.); Phase 1.5

## Local preview
From site folder: `python3 -m http.server 8787` → http://localhost:8787
