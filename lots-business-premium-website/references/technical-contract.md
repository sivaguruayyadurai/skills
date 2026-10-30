# The technical contract

How a premium design becomes a LotsBusiness site that stays fast, honest and editable by the owner. The connected server's tool schemas and `list_site_section_types` are the source of truth; this page explains how the parts fit.

## The model

A site is **content**: settings, an optional custom header and footer, pages, and each page an ordered list of sections. LotsBusiness renders it to static pages (one HTML file per page, `styles.css`, `scripts.js` when needed, `404.html`) and the site engine fills the live facts on every request.

For a premium build use:

- `settings.design.id: "blank"`: no LotsBusiness stylesheet, no standard header or footer; your CSS is the whole look; page titles and descriptions are used as written. `colors.primary` and `colors.accent` are still required (they become the browser theme colour).
- **custom sections** (`type: "custom"`): your own markup, CSS and script, with marked fields.
- **custom header and footer** (`header`, `footer`: `{type: "custom", name, html, css, css_scope, js}`), shown on every page; a page can leave them out with `hide_header` / `hide_footer`.
- `code`: `css` (site-wide CSS, written first: put your design tokens here), `js` (site-wide script), `head` (`<meta>` and `<link>` for every page).
- `assets`: the files your markup and CSS use (`[{path, sha256, size}]`), uploaded first.

Fixed section types (hero, services, gallery, contact, hours, map, testimonials, faq, pricing, reels and others) still work inside a blank design, but render plain markup with no styling of their own. Style them in `code.css` by their classes (look at the rendered HTML with `preview_site_content` and `include_html: true`), or build that part as a custom section with live markers instead. The live parts of fixed sections are also available as markers (below), which is usually the cleaner choice.

Older paths: `create_site_version` (plain files, not editable section by section) and kits (`from_kit`) remain for simple sites. A premium build should use sections so the owner can edit it.

## A minimal skeleton

```json
{
  "schema": 1,
  "settings": { "language": "en", "design": { "id": "blank", "colors": { "primary": "#1f3a5f", "accent": "#c8553d" } } },
  "code": {
    "css": ":root{--ink:#1b1b1b;--paper:#fbfaf7;--accent:#c8553d}\n@font-face{font-family:Display;src:url(/fonts/display.woff2) format('woff2');font-display:swap}\nbody{margin:0;background:var(--paper);color:var(--ink)}",
    "head": "<link rel=\"preload\" href=\"/fonts/display.woff2\" as=\"font\" type=\"font/woff2\" crossorigin>"
  },
  "assets": [ { "path": "fonts/display.woff2", "sha256": "<from the upload>", "size": 23456 } ],
  "header": {
    "type": "custom", "name": "Header",
    "html": "<header class=\"top\"><a class=\"skip\" href=\"#main\">Skip to content</a><a href=\"/\" class=\"brand\" data-lb=\"name\"></a><nav><a href=\"/\" data-lb-nav data-lb-current-class=\"is-here\">Home</a><a href=\"/visit\" data-lb-nav data-lb-current-class=\"is-here\">Visit</a></nav><a class=\"call\" data-lb=\"phone\" data-lb-text=\"keep\" data-lb-if=\"phone\">Call us</a></header>",
    "css": ".top{display:flex;gap:1rem;align-items:center;padding:1rem}"
  },
  "pages": [
    {
      "id": "home", "slug": "", "title": "Home", "main_id": "main",
      "seo": { "title": "<specific title, under 60 characters>", "description": "<specific description, under 155 characters>" },
      "sections": [
        {
          "id": "opening", "type": "custom", "name": "Opening",
          "html": "<section class=\"opening\"><h1 data-lb-field=\"title\">...</h1><p data-lb-field=\"lead\">...</p><a class=\"act\" href=\"/visit\" data-lb-link=\"action\">Plan a visit</a><img data-lb-image=\"photo\" src=\"/assets/counter.webp\" alt=\"...\" width=\"1200\" height=\"800\"></section>",
          "css": ".opening{display:grid;gap:1.5rem;padding:clamp(2rem,6vw,6rem) 1rem}"
        }
      ]
    }
  ],
  "footer": { "type": "custom", "name": "Footer", "html": "<footer class=\"foot\"><p><span data-lb=\"name\"></span>, <span data-lb=\"address\" data-lb-if=\"address\"></span></p><lb-social></lb-social></footer>" }
}
```

Save it with `update_site_content` (`content`, `source: "agent"`), then work in `changes` with the `base_revision` you last read. `get_site_content` returns the draft and its `outline` (pages, sections by name, and each custom section's editable fields).

## Custom sections

`{id, type: "custom", name, html, css, css_scope, js, hidden, nav_label}`

- `name` is required and unique in its page; tools find sections by id or name.
- `html`: one or more top-level elements. No `<script>`, `<html>`, `<head>`, `<body>`, `<meta>`, `<link>`. LotsBusiness adds `data-lb-section` and `data-lb-section-type` to each top-level element; never write those yourself.
- `css`: scoped to the section by default (`@scope`); `css_scope: "site"` makes it global. `@keyframes`, `@font-face` and `@property` are kept outside the scope. No `@import`.
- `js`: plain JavaScript run on pages that show the section, inside its own function with `section` (its first element) and `sections` (all of them). It goes into `/scripts.js`, loaded with `defer`. Never inline handlers (`onclick=`), never `javascript:` links: the site's Content Security Policy blocks them.

### Field marks: what the owner can edit

| Mark | On | The owner edits | Set with `set_field` |
|---|---|---|---|
| `data-lb-field="title"` | any element holding text | its words | a string (newlines become `<br>`) or `{html}` with inline tags only (b, strong, i, em, u, s, br, span, small, sup, sub, mark, a, abbr, time, wbr) |
| `data-lb-image="photo"` | an `<img>` (also inside `<picture>`) | the picture and its alt | `{src, alt}` (an https address or a /path of the site; a new src drops srcset and the picture's sources) |
| `data-lb-link="cta"` | an `<a>` | address and words | `{href, text}` |
| `data-lb-list="plans"` | a container whose repeated children carry `data-lb-item` | add, remove, reorder items | `add_list_item`, `remove_list_item`, `move_list_item`; fields inside by path: `plans.1.title` |

Rules that keep editing working:

- **Mark every visible text, picture, link and repeated card.** If the owner cannot change it in the editor, it is not finished.
- **Names are stable and meaningful** (`title`, `lead`, `hours_note`, `plans`), unique in their scope. Fields inside list items use the same names in every item, so a copied item stays editable.
- **One text field, one element of words.** Put the mark on the element that holds the words. Decoration beside the words (an icon, a dot) is fine: the editor changes only the words. Avoid a field whose words are split across several sibling elements; mark each piece instead.
- **Lists repeat one pattern.** Every item has the same structure; the last item cannot be removed (it is the pattern). Design layouts that still look right with one item and with twice as many.
- Never put field marks inside `<svg>`, `<script>`, `<style>`, `<iframe>`, `<video>` or `<select>`.
- Words drawn as SVG text or baked into a picture cannot be edited and are invisible to search engines and screen readers: use real text.

## Live facts from the record

Never type the phone, WhatsApp, email or street address: publishing is refused. Mark them and the engine fills them on every request, so the site follows the record.

| Write | Shows |
|---|---|
| `<span data-lb="name"></span>` | business name |
| `<a data-lb="phone"></a>` | phone, linked with tel: (`data-lb-text="keep"` keeps your own label, e.g. "Call") |
| `<a data-lb="whatsapp"></a>` | WhatsApp link (`data-lb-message="Hello, I would like..."` prefills the message) |
| `<a data-lb="email"></a>` | email, linked |
| `<span data-lb="address"></span>` | one-line address (storefronts) or areas served |
| `data-lb="address-street"`, `address-locality`, `address-region`, `address-postal-code`, `address-country` | address parts (storefronts only) |
| `data-lb-format="+1 (###) ###-####"` on phone or WhatsApp text | digits grouped the local way |
| `<a data-lb="booking">Book</a>` | the booking link; removed when there is none |
| `<span data-lb="hours-today"></span>`, `<span data-lb="open-badge"></span>` | today's hours, open now or closed now |
| `data-lb="tagline"`, `"description"`, `"short-description"`, `"area-served"`, `"year"` | those texts (`year` is the current year, for the copyright line) |
| `<img data-lb="logo">`, `<img data-lb="cover">` | logo, cover photo |
| `<lb-hours></lb-hours>`, `<lb-services></lb-services>`, `<lb-gallery></lb-gallery>`, `<lb-faq></lb-faq>`, `<lb-map></lb-map>`, `<lb-social></lb-social>`, `<lb-reviews data-max="6"></lb-reviews>` | hours table, services and prices, photos, the owner's questions, map (storefronts), social links, real published reviews |
| `data-lb-if="phone"` (whatsapp, email, address, hours, services, photos, faq, booking, social, map, description, reviews, contact_form) | the element shows only when the record has that fact |

Style the live parts by their classes (`.lb-services`, `.lb-service`, `.lb-service-price`, `.lb-hours`, `.lb-review`); look at the rendered HTML once to see them. Service-area and online businesses never show a street address; maps are for storefronts only.

## Pages

`{id, slug ("" for home, first), title, nav_label, show_in_nav, seo: {title, description, image}, requires, language, sections, hide_header, hide_footer, head, json_ld, body_class, main_id, main_class, no_main}`

- Up to 20 pages and 40 sections a page. `requires: "services"` (photos, faq, description, hours, booking) hides a page until the record has that fact.
- Menus in a custom header: mark links `data-lb-nav` and `data-lb-current-class="your-class"`; the current page's link gets the class and `aria-current="page"`.
- **Second language:** a page with `language: "ta"` (any code) at its own slug (`ta`, `ta-about`). Pages of a language share a menu; write the copy for that audience rather than translating word for word, and pick a face that covers the script.
- `not_found`: your own 404 page, same fields as a page.
- `settings.trailing_slash: true` serves pages at `/about/` (keep it when moving a site whose addresses end in a slash).
- `json_ld`: up to 10 objects a page. The engine already adds the business's own structured data from the live record (name, address or areas, phone, hours, rating); add page-specific types (FAQPage from real questions, Service, Course, Menu, BreadcrumbList), and avoid typing facts into JSON-LD that would go stale.

## Pictures, fonts and other files

1. Upload first:
   - **Image by address:** `upload_site_image` with `image_url` (public https, up to 10 MB) and a `path` such as `assets/counter.webp`.
   - **Small image you hold:** `upload_site_image` with `image_base64` (up to 5 MB).
   - **Big files, fonts, videos, PDFs, from an address:** `create_site_upload` with `path` and `source_url`: LotsBusiness downloads, checks and stores it; the bytes never pass through the chat.
   - **Big files on your machine (agents with a shell):** `create_site_upload` with `path`, `size` and `sha256`, PUT the bytes to `upload_url` with the given headers, then `complete_site_upload`.
   - **Files only the owner has:** ask them to upload in the Website editor at https://lots.business/dashboard (pictures), or to share a public link.
2. Add each to the draft: `changes: [{"op": "add_asset", "path": "assets/counter.webp", "sha256": "<blob>"}]` (or list it in `assets` with its size when you save whole content).
3. Reference it as `/assets/counter.webp` in markup and CSS.

Fixed sections (hero, gallery, team) take only the business's own photos (`list_business_media`, `add_business_media`). Custom markup may use any site asset or https picture you have the right to use.

Fonts: self-host woff2 files as assets and declare them with `@font-face` and `font-display: swap` in `code.css`; preload at most the one or two files the first screen needs in `code.head`. Open-licence fonts can be fetched by `source_url` from their publisher or a font CDN that serves the files (check the licence). Google Fonts stylesheets are allowed by the site's policy, but self-hosting is faster and keeps visitors' addresses away from third parties.

## Forms

- Post to the business: `<form method="post" action="/_lb/contact">` with fields `name`, `message`, and `email` or `phone` (at least one). `preferred_date` and `preferred_time` make it a booking request. Every input has a `<label>`. No password or card fields.
- Messages arrive in `list_contact_messages` and the business email. The engine adds spam protection.
- WhatsApp-only forms: `data-delivery="whatsapp"` on the form, no method or action; your script builds the wa.me message. Use only when that is how the business really works.

## Motion presets

`data-lb-animate` on any element: `fade-up`, `fade-in`, `fade-left`, `fade-right`, `zoom` (`data-lb-delay`, `data-lb-duration` in ms), `stagger` (children in turn; `data-lb-stagger`, `data-lb-effect`), `count-up` (counts to the number written in the element), `parallax` (`data-lb-speed`, default 0.2), `slider` / `carousel` (children of `[data-lb-track]`, optional `[data-lb-prev]`, `[data-lb-next]`, `[data-lb-dots]`, `data-lb-interval`, 0 = no autoplay). The engine loads its small script only on pages that use one, keeps everything still for reduced motion, and shows everything after 3 seconds if the script is blocked. Your own motion goes in section `js` or `code.js`: see [motion.md](motion.md).

## Saving, previewing, publishing

- `update_site_content`: whole `content`, or `changes` (`update_section`, `replace_section`, `add_section`, `remove_section`, `move_section`, `set_field`, list ops, `update_page`, `add_page`, `remove_page`, `move_page`, `update_settings`, `add_asset`), up to 50 a call. Send `base_revision`; a CONFLICT means someone (often the owner in the editor) saved since: read again and redo your change on top.
- Errors name the place ("page 1 (home), section 2 (Plans), html"); fix exactly that.
- `preview_site_content`: a private link and the page check (errors block publishing, warnings are advice). `include_html: true` returns the rendered files.
- `screenshot_site`: pictures at desktop, tablet and phone widths ([critique.md](critique.md)).
- `publish_site_content` only after the owner says yes. `rollback_site` returns to an earlier version; `update_site_content` with `undo_edits: true` returns the draft to the last import or AI build.

## Limits

2 MB a draft; 20 pages; 40 sections a page; 256 KB markup, 256 KB CSS and 128 KB script a custom section; 1.5 MB of custom sections a site; 512 KB site CSS, 256 KB site script, 32 KB head; 600 files and 250 MB a version; files: images 10 MB, PDFs and fonts 10 MB, videos (mp4, webm) 50 MB. The numbers in `list_site_section_types` and the tool descriptions are the current ones. Staying well inside them is a design goal ([performance-accessibility.md](performance-accessibility.md)).
