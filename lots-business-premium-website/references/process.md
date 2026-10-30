# The process, step by step

Each step ends with something written. Keep the brief, the concept and the design system in the conversation (or in the owner's notes) so every later decision can point back to them. When a decision cannot point back to anything, it is a default, and defaults are how sites start to look alike.

## 1. Discovery

Follow [discovery.md](discovery.md). Output: a **fact sheet** (what is true and sourced), a **market sheet** (competitors and what they all do), and a short list of **open questions** for the owner. Ask the owner only those questions, in one message, in plain words, with your best guess for each so a one-word answer works.

Put new facts into the record first (`update_business`, `set_business_services`, `set_business_hours`, `set_business_faqs`, `set_business_links`, `add_business_media`). The site reads them live from there.

## 2. Strategy and the design brief

Write the brief before any design. Keep it to one screen.

```
Business:        <name>, <what it does>, <where>, <for whom>
Positioning:     <one sentence: who it is for, what it gives them, why this one and not the others>
The one feeling: <one or two words a first-time visitor should feel in five seconds, and why that feeling
                  wins customers here> (e.g. "unhurried", "safe hands", "on our side", "proof of results")
Primary action:  <the single thing most visitors should do> (call, WhatsApp, book a slot, request a quote,
                  visit, enrol) and the secondary one
Audience:        <who they are, what device, what language, what they fear, what they need to see to act>
Their questions, in the order they ask them:
                 1. ... 2. ... 3. ...  (the site answers them in this order)
Proof we have:   <only real proof: published reviews, owner-given numbers, licences the owner can show,
                  photos of real work>. Proof we do NOT have and will not imply: <...>
Difference:      <what competitors all do (market sheet) and what this site will do instead>
Locale:          <languages, script, reading direction, number and date formats, cultural notes that
                  affect design and words>
Price level:     <budget, mid, premium> and how the design signals it honestly
Pages:           <page: purpose, sections in order, the primary action on that page>
Constraints:     <photos available or not, logo quality, brand colours to keep, anything the owner insists on>
```

**Content plan per page.** For each page list its sections by purpose ("answer: is it safe for my child?"), not by component name ("features grid"). A section that answers no question in the brief does not get built. One-page sites are often right for small businesses; more pages are right when each page answers a distinct search (a service, a location, a language) or a distinct visitor.

Write the words in the audience's language and register. Use the owner's own words where they exist (their old site, their posts, how they answer the phone). Plain, specific, short. No filler ("we are passionate about quality"), no claims you cannot source.

Show the owner the brief and ask for corrections before step 3. It costs one message and saves a redesign.

## 3. Art direction

Follow [art-direction.md](art-direction.md). Output: two or three concepts in words, the chosen one with reasons, and the **design system** written out:

```
Concept:      <name and two sentences: the idea, and which brief facts it comes from>
Type:         display face, text face (or one family), why they fit; sizes as a scale with clamp() for
              phone to desktop; line length; any second script and its face
Colour:       5 to 8 tokens with hex values and roles (ink, paper, accent, surface, line, focus, ...), where
              each colour comes from (the place, the trade, the logo, the competitors to avoid); contrast
              pairs checked
Space:        base unit and scale; density (airy or compact) and why
Layout:       the grid or the lack of one; the 2 or 3 layout moves that make this site recognisable
Imagery:      what pictures are used (owner's photos, illustration, type-only, texture), how they are
              cropped, treated and sized; what is never used
Icons:        none, a drawn set, or a type-based device; stroke and size
Shape:        corners, borders, rules, shadows (or none), and why
Voice:        how headings and buttons sound, with 3 example lines
Motion:       from step 4
```

## 4. Motion concept

Follow [motion.md](motion.md). Output: one sentence on what motion says for this brand, the two or three moments that move, how long and with what easing, and what happens with reduced motion.

## 5. Build

Follow [technical-contract.md](technical-contract.md). Build in custom sections on the blank design so the look is entirely yours and every part stays editable. Put the design system into `code.css` as custom properties first, then sections. Mark every text, picture, link and list. Bind every fact. Upload pictures and fonts first, list them in `assets`.

Order that works: tokens and base CSS, header and footer, then the home page top to bottom, then other pages, then the 404 page. Save often with `update_site_content` (whole content or `changes`), keep `base_revision` current.

## 6. Look and critique

Follow [critique.md](critique.md). `screenshot_site` at desktop and phone (and `full_page: true` for the whole page), compare against the brief and the design system, write down what is off, fix, look again. At least two rounds. Then the anti-sameness check.

## 7. Quality gate

Follow [quality-gate.md](quality-gate.md). Every item passes before the owner sees the preview link. Then share `preview_site_content`'s link, ask for a yes, and only then `publish_site_content`.

## After launch

Offer the owner: connecting their own domain (`connect_site_domain`), the badge choice, Search Console verification and analytics in `update_site_settings`. Tell them they can change any text, picture, link or list item in the Website editor at https://lots.business/dashboard, and that facts change from the business details.
