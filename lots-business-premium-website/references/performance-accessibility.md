# Performance and accessibility budgets

Premium means it feels effortless on a mid-range phone on mobile data. These budgets are fixed for every site, whatever the design.

## Page weight (per page, first load, compressed)

| What | Budget |
|---|---|
| Everything the first screen needs | under 500 KB |
| Whole page, excluding video | under 1.5 MB |
| HTML of a page | under 150 KB (`check_site` warns above) |
| CSS (site plus sections) | under 100 KB |
| JavaScript you write | under 50 KB (the site warns above 200 KB); none is fine |
| Fonts | at most 2 families, 4 files, woff2, under 150 KB together |
| One picture | under 300 KB (warned above), the largest first-screen picture under 200 KB |

## Pictures

- **Right size:** never more than about twice the largest size it is shown at. A picture shown 600 px wide needs a 1200 px file at most.
- **Right format:** WebP or AVIF for photos (JPEG as fallback is not needed for current browsers), SVG for logos, icons and line art, PNG only for small flat graphics.
- **Always** `width` and `height` attributes (or CSS `aspect-ratio`) so the page does not jump while loading.
- **Lazy below the first screen:** `loading="lazy"` and `decoding="async"` on every picture that is not visible when the page opens. Never lazy-load the main first-screen picture; give it `fetchpriority="high"`.
- `srcset` and `sizes` when one picture serves very different widths (upload each size as an asset).
- Compress before uploading. If you can only fetch the owner's original 4 MB photo, upload it, look at how it renders, and ask the owner for a smaller one or accept a smaller crop; do not ship 4 MB pictures.

## Video

Only when the concept needs it. Short (under 20 seconds for a background), compressed (under 5 MB for a background loop), `muted playsinline` if it autoplays, a `poster` picture, and the page must make complete sense without it. Never autoplay with sound. Non-autoplaying videos get `preload="metadata"` from the engine.

## Fonts

- Self-host as assets, `font-display: swap`, preload only the first screen's one or two files.
- Subset to the scripts the page uses when you can.
- Match the fallback font's size to reduce layout shift (`size-adjust` in a fallback `@font-face`) when the display face is very different from the system font.

## Script

- The site must work fully without JavaScript: all words in the HTML, links real `<a href>`, forms real `<form>`.
- No frameworks, no jQuery, no animation libraries. Plain JavaScript in section `js` or `code.js`.
- No third-party scripts except what the policy allows (maps, YouTube, Vimeo, Instagram embeds, booking and payment pages). Analytics go through `update_site_settings`, which also asks visitors for consent.

## Accessibility

- **Contrast:** text 4.5:1 against its background (3:1 for text 24 px and larger, or 19 px bold, and for icons and focus rings). Check every pair in the design system, including text on pictures (add a scrim or move the text).
- **Focus:** a visible focus style on every link, button and field (`:focus-visible`), at least 2 px and 3:1 against its surroundings. Never `outline: none` without a replacement.
- **Structure:** one `<h1>` a page, headings in order, landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`), a skip link in a custom header (`<a class="skip" href="#main">`, with `main_id: "main"` on pages).
- **Text alternatives:** meaningful `alt` on every picture that carries information; `alt=""` on decorative ones. Icons that are links or buttons have an accessible name.
- **Language:** `settings.language` and `page.language` set correctly, so screen readers pronounce the words right.
- **Touch and zoom:** tap targets at least 44 by 44 px with space between them; text at least 16 px for body copy on phones; never disable zoom; layouts work at 360 px wide and at 200% zoom without horizontal scrolling.
- **Forms:** every field has a visible `<label>`, errors are described in text, required fields are marked in words, not only colour.
- **Colour is never the only signal** (open or closed, selected tab, error).
- **Motion:** see [motion.md](motion.md).

## How to check

`preview_site_content` gives the page check (errors and warnings, page sizes). `screenshot_site` at phone width shows tap targets, line lengths and overflow. Read the rendered HTML (`include_html: true`) for headings, alt text, labels and `loading` attributes. Fix and check again.
