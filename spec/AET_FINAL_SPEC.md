# AMBER'S ESSENTIAL TOUCH — FINALIZED SPEC & DESIGN SYSTEM

**Version 1.0.0 · 2026-08-26 · supersedes all prior specs**

This replaces `01_PLAN` → `07_VOICE_GUIDE` (Drive), the Claude Design project brief, and `AET_DESIGN_SYSTEM_PLAN.md`. Where any of those disagree with this document, **this document wins**.

---

## 1. Authority hierarchy

Five sources described this brand and they did not agree. Ranked, highest first:

| Rank | Source | Authority over |
|---|---|---|
| **1** | **Amber's own flyer + Instagram** (`@ambersessential`) | Every business fact, service list, tagline, credential |
| **2** | **Visual Language System board** (2026) | Palette, typography roles, component look, brand essence |
| **3** | **Asset metadata register** (`amber_cultural_intelligence_full_reference_metadata.xlsx`) | Asset provenance, canonical-path ruling, risk flags |
| **4** | **Claude Design project** (`69d0ee60…`) | Page order, section copy, interaction spec |
| **5** | **Drive build-out bundle** (`01`–`07`) | Stack decisions, phase triggers, pricing |

**Rule:** a lower rank may fill a gap, never overwrite a higher rank.

---

## 2. Corrections — facts that were wrong and are now fixed

Amber's own marketing is the ground truth. Several things circulating in the specs were invented.

| Item | What the specs said | **Correct** | Source |
|---|---|---|---|
| Tagline | "Where Skin Care Becomes Ritual" | **"Where Skin Meets Soul"** | Amber's flyer |
| Support line | "You'll FEEL the difference." | **"You'll feel the difference."** | Flyer + VLS board |
| Years licensed | 18 years | **19 years licensed · 16 years owner** | Flyer |
| Business type | "studio" / "the practice" | **Private spa · home business** | Flyer, IG hashtag `#homebusinesses` |
| Domain | `ambersessentialtouch.com` | **`ambersessentialtouch.net`** | Flyer + IG |
| Instagram | not recorded | **`@ambersessential`** | IG |
| Phone | (510) 228-6657 | **(510) 228-6657** ✓ confirmed | Flyer |
| Address | 123 Serenity Lane, Oakland CA 94611 | **FABRICATED — never publish** | VLS board placeholder |
| Phone (board) | (510) 228-4437 | **FABRICATED — never publish** | VLS board placeholder |
| Email (board) | hello@amberessentialtouch.com | **FABRICATED — never publish** | VLS board placeholder |
| Testimonial | "Cinthia Z. — Amber transformed my skin…" | **Unverified — treat as placeholder** | VLS board |
| Hours | Tue–Fri 10–7, Sat 10–5, Sun closed | **Unverified — see Decision D-4** | VLS board vs Drive conflict |
| Manicures | listed as a service | **Not a current service — remove** | Absent from Amber's list |

> The Visual Language System board's *Visit* panel is design filler. Three of its four contact details are wrong. Anyone building from that board will publish a fake address for a woman running a business out of her home. Do not.

---

## 3. Verified business facts

Everything below traces to Amber's own materials. Nothing here is inferred.

**Identity**
- Amber's Essential Touch
- *Where Skin Meets Soul* · *You'll feel the difference.*
- Skin and Soul Healer
- Premium botanical skincare · private spa experience
- Pinole, California · Bay Area
- Black/Woman-owned · home business
- 19 years licensed · 16 years business owner

**Proposition**
> More than a treatment, it's an experience. Science. Energy. Results. Customized for YOU.

> Skincare is not a luxury, it is a wellness.

**Services — the canonical five**

| # | Service | Amber's own description |
|---|---|---|
| 1 | Customized Facials | Relax, reset and reveal your glow with a facial made just for your skin. |
| 2 | Chemical Peels | Improve tone, texture and clarity with professional peels for real results. |
| 3 | Full Body Waxing | Smooth, confidence-boosting results. Brazilian specialist. |
| 4 | Individual Wispy Lashes | Enhance your natural beauty with soft, fluffy, custom lash sets. |
| 5 | LED Light Therapy | Heal, calm and rejuvenate your skin with LED technology. |

Also offered: **Radio Frequency Facial**. Currently promoted: **Fan Cluster Lashes, D Curl — $60 intro**.

**Why clients love AET** (verbatim, use as the promise strip)
Licensed 19 Years · Owner 16 Years · Black/Woman Owned Home Business · Private Spa Experience · Science & Energy in Every Treatment · High-Quality Products · Personalized Care · Support Local

**Mission**
Donation-based facials for **teens and seniors**. Affordable regimens.

**Contact**
(510) 228-6657 · www.ambersessentialtouch.net · @ambersessential · facebook.com/aetouch · Pinole, CA

**Social proof**
4.9 ★ · 25 reviews · 135+ five-star visits · 597 Facebook followers *(from Drive `00_START_HERE` source-input list — re-confirm before publishing)*

---

## 4. Brand foundation

**Five essences** (VLS board — use as the promise strip icons)

| Essence | Line |
|---|---|
| Preservation | We protect & nourish your natural brilliance. |
| Expert Hands | Skilled. Intuitive. Results you can trust. |
| Sanctuary | A calm space to heal, reset, and restore. |
| Botanical Luxury | Nature's finest ingredients. Elevated with care. |
| Inclusive Care | For every tone, every age, every skin story. |

**Closing line** — `BE SEEN. BE CARED FOR. BE YOURSELF.`

**Voice**

Keep — ritual, intentional, gentle, aftercare, consultation, regimen, patience, held, carry, memory, protect, preserve, brilliance, seen, soul, energy, science, results, customized.

Drop — luxurious, indulgent, pampering, treat yourself, spa day, affordable *(as a price claim)*, cheap, deal, discount, learn more.

Rules — short declaratives · three-beat comma cadence · italic serif on the emotional word · all-caps eyebrows · CTAs are verbs (BOOK, READ, JOIN, SHOP, VISIT) · no exclamation marks in body copy · first person "I" on About, "Amber's Essential Touch" elsewhere, never "we" · no medical claims (*supports, calms, softens* — never *cures, treats, heals*) · close every page on touch, held, carry, care, or seen.

> **Voice conflict resolved.** The Drive voice guide forbids "luxury" language, but Amber's own copy says *"Skincare is not a luxury, it is a wellness"* and the board says *"Botanical Luxury."* These are compatible: **AET rejects luxury-as-price, embraces luxury-as-quality.** Never call the *service* a luxury. You may call the *ingredients* luxurious.

---

## 5. Design system — tokens

Three layers. Component CSS reads Layer 3 only; Layer 3 reads Layer 2 only; Layer 2 reads Layer 1 only.

### Layer 1 — primitives

**Core five** (VLS board, authoritative)

| Token | Hex | Role |
|---|---|---|
| `amber-brown` | `#B37A5A` | Brand signature. **Decorative only** — see §6. |
| `rose-pink` | `#D89BAA` | Accent, gradient stop. **Decorative only.** |
| `soft-cream` | `#F7F1E8` | Warm section surface |
| `sage-mist` | `#A9B8A6` | Editorial / journal accent surface |
| `lavender-glow` | `#D7C6E6` | Atmospheric gradient, mission surface |

**Supporting five** (Claude Design spec §4 — fills the board's gaps)

| Token | Hex | Role |
|---|---|---|
| `deep-rose` | `#A95870` | **Primary action.** 4.66:1 on ivory. |
| `deep-amber` | `#6F3F2A` | Secondary action, accent text. 8.30:1 — AAA. |
| `warm-ivory` | `#FFF9F3` | Page background |
| `espresso` | `#33231E` | Body text. 14.36:1 — AAA. |
| `warm-gray` | `#71655F` | Muted text. 5.39:1 — AA. |

`border-soft` = `rgba(111,63,42,.18)`

> **Three ambers existed.** Drive `#B87D4B`, Claude Design `#B8734A`, VLS board `#B37A5A`. **The board wins — `#B37A5A`.** The other two are retired. All three fail AA for body text anyway, so the practical impact is nil.

**Gradients** (atmospheric and translucent — never neon)
1. `amber → rose → cream`
2. `cream → pale sage`
3. `cream → lavender glow`
4. `rose → lavender`
5. `deep-rose → deep-amber` — footer and booking band

**Dimension** — 8pt grid `4 8 12 16 24 32 48 64 96 128` · radius `card 22 · pill 999 · sm 2` · tap-min `44` · container `1440` · measure `68ch`

**Motion** — `80 / 150 / 250 / 350ms`, `cubic-bezier(.22,.61,.36,1)`. No parallax, no scroll hijack, no autoplay.

### Layer 2 — semantics

```
text.primary      → espresso        text.muted     → warm-gray
text.accent       → deep-amber      text.on-fill   → warm-ivory
surface.page      → warm-ivory      surface.warm   → soft-cream
surface.raised    → #FFFFFF         surface.deep   → deep-rose
action.primary.bg → deep-rose       action.primary.fg → warm-ivory
action.secondary  → deep-amber outline
border.focus      → deep-rose
```

---

## 6. The contrast law

Non-negotiable. Every pairing below was measured, not estimated.

| Foreground | on `warm-ivory` | Verdict |
|---|---|---|
| `espresso` | **14.36** | AAA — body text |
| `deep-amber` | **8.30** | AAA — accent text, eyebrows |
| `warm-gray` | **5.39** | AA — muted text |
| `deep-rose` | **4.66** | AA — links, primary fill |
| `amber-brown` | **3.44** | large text ≥24px only |
| `rose-pink` | **2.19** | **never text** |
| `sage-mist` | **1.99** | **never text** |
| `lavender-glow` | **1.53** | **never text** |

**Button fills, cream label:**

| Fill | Ratio | |
|---|---|---|
| `deep-rose #A95870` | **4.66** | ✅ primary — matches the board |
| `deep-amber #6F3F2A` | **8.30** | ✅ secondary / high-contrast contexts |
| `amber-brown #B37A5A` | 3.44 | ❌ large text only |
| `rose-pink #D89BAA` | 2.19 | ❌ never |

**Three standing rules**

1. `rose-pink`, `sage-mist`, `lavender-glow`, `amber-brown` are **surfaces, borders, gradients, and icons ≥24px**. Never behind body text.
2. **`deep-rose` clears AA by 0.16.** Do not lighten it, do not tint it, do not put it at any opacity below 100% behind a label.
3. Focus rings are 2px `deep-rose`, 2px offset, on every interactive element, always.

---

## 7. Typography

| Role | Family | Sizes | Use |
|---|---|---|---|
| Display serif | **Cormorant Garamond** 300/400/500 | `clamp(2.6rem, 6.2vw, 5.6rem)` H1 · `clamp(2rem, 4vw, 3.4rem)` H2 | Headlines, card titles, pull quotes |
| Display italic | Cormorant Garamond Italic | same | The one emotional word inside a headline, in `deep-rose` |
| Script accent | **Parisienne** | 2.3–3.9rem | *Essential, like water. Preserved, like diamonds.* — max **two** uses per page |
| Body / UI | **Manrope** 400/500/600/700 | 17px body · 14px buttons · 11.5px eyebrows @ .18em | Everything else |

Eyebrows, buttons, nav, and stat labels are uppercase. Nothing else is.

**Script is banned** from: navigation, buttons, forms, service descriptions, prices, policies, and anything a screen reader or a hurried person must parse.

---

## 8. Components

**Button** — primary (`deep-rose` fill) · secondary (`deep-amber` outline) · ghost-on-dark · text-link with arrow. Sizes 36/44/52. States: default, hover, focus-visible, active, disabled, loading. Pill radius.

**Navigation pills** (board) — Services · About · Results · Journal · Shop · Visit. Active = `deep-rose` fill, cream text. Inactive = cream fill, `border-soft`, `espresso` text.

**Service card** — icon in a rose circle · serif title · outcome description · duration + price when verified · `LEARN MORE →`.

**Testimonial card** — 5 stars in `amber-brown` · italic serif quote · small-caps attribution.

**Others** — product card, post card, section header (eyebrow + H2 + italic accent), header (sticky, opaque on scroll), mobile sheet (focus trap + Escape), footer, email capture, floating rail, sticky mobile Book bar.

**Icon style** (board) — monoline, ~1.1px stroke, `deep-amber`. Vocabulary: lotus, bottle, leaf, sparkle, heart, person, flower, droplet.

---

## 9. Photography & art direction

**Five words** — Warm · Intentional · Botanical · Inclusive · Translucent

**Two branches, one canonical.** Per the asset register's ruling:

> *Use the light system as the operational identity; retain the dark baroque branch as an editorial campaign or seasonal layer.*

- **Light system — the website.** Warm ivory, blush, dusty rose, botanical green. Amber's real portraits. Lotus + amber glass + pomegranate + stone still lifes on cream. Naturally lit, calm, intimate.
- **Dark baroque — campaign only.** Black, oxblood, plum, reflective metals. Powerful, but it is a seasonal layer. Do not let it govern the site.

**Founder imagery is governed.** From the asset register: any regeneration *must preserve Amber's real face, natural proportions, and loc color and style.* Never substitute an AI person for Amber.

**Avoid** — anonymous stock models, sterile white medical rooms, beige spa clichés, excessive candles, faux spirituality, oversaturated pink, clinical before/after sensationalism, airbrushed skin.

**Rights** — the asset register flags `ref.png` and all Firefly/Gemini output as needing commercial-rights confirmation before external publication. See Decision D-6.

---

## 10. Logo system — the open tension

The asset register names this directly:

> *The original illustrative/script logo and newer simplified lotus/A mark are not yet a single locked production system.*

| | Original (AET-010/011) | Simplified (AET-008) |
|---|---|---|
| Form | Oval frame, lotus/A monogram, **illustrated hand**, script wordmark | Monoline lotus enclosing **A** with loop and droplet |
| Tagline | YOU'LL FEEL THE DIFFERENCE | stacked wordmark |
| Reads at 40px | No | Yes |
| Carries "touch" | Yes — the hand | No |

**Recommendation:** simplified mark for digital (header, favicon, social), original retained for print and signage where the hand can be seen. Grammar to preserve either way: **lotus · A monogram · crystal · waterdrop · hand**. Balance. Beauty. Brilliance.

This is Decision **D-1** and it is Amber's to make.

---

## 11. Page specs

**Homepage — 15 sections, in order**
1. Hero — *Where your skin is **understood**, not just treated.*
2. Promise strip — the five essences
3. Preservation statement — *Essential, like water. Preserved, like diamonds.*
4. Featured services — the canonical five
5. Treatment finder — *What brings you in?*
6. How care begins — Consult · Treat · Preserve
7. About Amber
8. Results
9. Testimonials
10. Journal
11. Shop
12. Booking CTA
13. Visit & contact
14. Email capture
15. Footer

**Routes** — `/` `/services` `/services/[slug]` `/skin-concerns` `/about` `/results` `/journal` `/journal/[slug]` `/shop` `/shop/[slug]` `/book` `/visit` `/contact` `/policies`

**Service detail template** — name · plain-language summary · who it suits · who it doesn't · what the appointment includes · preparation · aftercare · duration · price · contraindications · related treatments · book CTA.

**Responsive** — mobile-first. Test 320 / 375 / 430 / 768 / 1024 / 1280 / 1440 / 1728. Single column under 640. Hero copy before portrait on mobile. Sticky Book bar.

**Accessibility** — WCAG 2.2 AA. Semantic heading order, visible focus, alt text on every image, 44px targets, skip link, labelled fields, `prefers-reduced-motion`, accessible mobile sheet, no critical text baked into images.

---

## 12. Content model

Centralize. No hard-coded copy in components.

`site.ts` · `services.ts` · `concerns.ts` · `testimonials.ts` · `journal.ts` · `products.ts` · `credentials.ts` · `policies.ts`

Every unverified field carries `verified: false` and renders as a visible labelled placeholder — never as invented text.

---

## 13. Open decisions

| # | Decision | Owner | Blocks |
|---|---|---|---|
| **D-1** | Which logo is the production mark? | Amber | Header, favicon, print |
| **D-2** | Publish a street address, or "Pinole, CA — address on booking"? *It is a home business.* | Amber | Visit page, LocalBusiness schema |
| **D-3** | Confirm 19 years licensed / 16 years owner; supply license number | Amber | About page |
| **D-4** | Confirm real hours — board and Drive conflict | Amber | Visit page, booking |
| **D-5** | Approve 3 testimonials with names, or pull from Google with permission | Amber | Testimonials |
| **D-6** | Commercial rights for Firefly/Gemini imagery | Jonah | Any public launch |
| **D-7** | Prices for peels, lashes, LED, RF facial | Amber | Services |
| **D-8** | Booking provider — Square, Calendly, Acuity, or Wix | Jonah | `/book` |
| **D-9** | Is **æve** a sub-line of AET or a separate brand? | Amber + Jonah | Shop architecture |
| **D-10** | Before/after images + written client consent | Amber | Results |

### On æve

The two Gemini moodboards describe **æve** — a skincare line with aluminium jars, Tiffany-glass bottles, European-Spanish labels (*Manteca Corporal*, *Suero Facial*, *Aceite Prísmico*), deep bronzes and oxidized tones, **explicitly no pastels**.

That is a different visual system from Amber's Essential Touch, which is built on cream, blush, and lavender. They cannot share one design system without one of them losing.

**Recommendation:** treat æve as a distinct product brand with its own token set, sold *through* AET's shop but never blended into AET's identity. Do not merge the palettes.

---

## 14. Build sequence

| # | Step | Status |
|---|---|---|
| 1 | Finalize spec (this document) | ✅ done |
| 2 | Emit `tokens.css` / `tokens.json` | ✅ shipped |
| 3 | Homepage from locked tokens | ✅ shipped — `index.html` |
| 4 | Resolve D-1 through D-10 | ⬜ Amber + Jonah |
| 5 | Real photography into `images/` | ⬜ |
| 6 | Services index + detail template | ⬜ |
| 7 | `/book` with provider adapter | ⬜ |
| 8 | About, Results, Journal, Shop, Visit | ⬜ |
| 9 | Mailing provider on the capture form | ⬜ |
| 10 | Accessibility + content audit, then launch | ⬜ |

**Launch gate:** no page ships while it still contains a fabricated fact. The placeholders are deliberate — they are cheaper than a correction.

---

*Sources: Amber's flyer and Instagram `@ambersessential`; Visual Language System board; `amber_cultural_intelligence_full_reference_metadata.xlsx`; `amber image references.zip`; `Essential, like water. Preserved, like diamonds..zip`; æve moodboards; Claude Design project `69d0ee60-7498-49af-8860-2132fb484601`; Drive [ambers essential touch, the build out](https://drive.google.com/drive/folders/1EPrwlcJKTvey3uP2iKYQIWCIYuV5q_tU).*
