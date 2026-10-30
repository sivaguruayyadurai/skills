# Quality gate

Every item passes before the owner sees a preview link. These are technical and honesty checks; none of them prescribes a style.

## Editing

- [ ] Every visible text, picture, link and repeated card in custom sections, header and footer carries a field mark (`get_site_content` outline lists each section's fields; compare with the screenshots).
- [ ] List items share one structure and field names; the layout still works with one item and with double the items.
- [ ] Phone, WhatsApp, email and address are live markers; hours, services, photos, questions and reviews come from the record, not typed copies.
- [ ] A test edit works: `set_field` on one text, preview, then put it back (or `undo_edits` if this draft came from an import or AI build and nothing else changed).

## Speed

- [ ] Within the budgets in [performance-accessibility.md](performance-accessibility.md): first screen under 500 KB, pictures under 300 KB each, fonts at most 4 files, little or no script.
- [ ] Every picture has width and height (or aspect-ratio); pictures below the first screen are lazy; the first-screen picture is not.
- [ ] Fonts self-hosted with `font-display: swap`.
- [ ] No `IMAGE_HEAVY`, `PAGE_HEAVY` or `SCRIPT_HEAVY` warnings left without a reason.

## Accessibility

- [ ] Text contrast 4.5:1 (3:1 large), including text over pictures; visible focus everywhere.
- [ ] One h1 a page, headings in order, landmarks, a skip link in a custom header.
- [ ] Alt text right on every picture; decorative ones `alt=""`.
- [ ] Phone screenshots: no horizontal scroll at 390 px, nothing clipped, tap targets 44 px.
- [ ] Reduced motion shows everything still; nothing flashes.
- [ ] `settings.language` and every page's `language` are right.

## Works without JavaScript

- [ ] All content and links are in the HTML; script only enhances.
- [ ] Nothing is hidden by CSS unless a class set by your script allows it.
- [ ] Menus have a way to open without script, or the links are visible on small screens.

## Forms and links

- [ ] Forms post to `/_lb/contact` with `name`, `message` and `email` or `phone`, all labelled; or are WhatsApp forms by the business's choice.
- [ ] `preview_site_content` shows no errors: no broken links, no missing pages, no blocked hosts.
- [ ] The primary action works on every page (call, WhatsApp, booking link, form).

## SEO basics

- [ ] Every page: a specific title (under 60 characters, the business and what the page offers) and description (under 155 characters).
- [ ] Headings say what the page is about in the words customers search.
- [ ] Structured data fits the business: the engine adds the business block from the record; pages add only real FAQPage, Service, Course, Menu or BreadcrumbList data.
- [ ] A useful 404 page.
- [ ] Pages in a second language have `language` set and their own titles and descriptions.

## White-label

- [ ] No LotsTech or Lots product names in the copy, code comments, file names, alt text or titles of a client's site. The "Made with LotsBusiness" badge is the owner's choice in `update_site_settings` (`badge`); agencies usually turn it off.

## Honest copy

- [ ] Every number, year, price, rating, award, certification, licence, team member and client name is in the fact sheet with its source. Reviews come only from `<lb-reviews>` (real published reviews).
- [ ] No placeholder text, no instructions to the owner, no lorem ipsum.
- [ ] No em dashes anywhere in the copy.
- [ ] Stock or generated pictures are never presented as the business's own premises, people or work.

## Design

- [ ] The critique rounds in [critique.md](critique.md) found nothing that matters.
- [ ] The anti-sameness check passed: it resembles neither your earlier builds in this account nor the competitors.
- [ ] The brief's one feeling and primary action are the first things a phone visitor gets.

When all pass: share the preview link, explain the concept in two sentences and what the owner can edit, and wait for their yes before `publish_site_content`.
