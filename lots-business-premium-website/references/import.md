# Moving an existing site exactly

When the owner wants their current site on LotsBusiness unchanged (same look, same words, same addresses), import it. No redesign happens in this path; the premium process starts later, if the owner wants it.

The import turns plain HTML pages into a **draft made of custom sections** that looks the same and is editable section by section. Nothing goes live until you publish it with the owner's yes.

## The static contract

`import_static_site` reads a folder of static files:

- **Pages:** `index.html` is the home page; `about.html` or `about/index.html` becomes the page `about`. A page whose `<html lang>` differs from the home page's becomes a page in that language. `404.html` becomes the site's own not-found page.
- **Header and footer:** top-level body elements marked `data-lb-shared="header"` and `data-lb-shared="footer"` become the shared header and footer (taken from the home page; a page whose header differs gets a warning; a page without one hides it).
- **Sections:** the elements of `<main>` (its id and class are kept; without `<main>`, the body's top-level elements) marked `data-section-name="Hero"` become custom sections with that name. Unnamed elements become "Part N" with a warning.
- **Code:** `site.css` becomes the site CSS and `site.js` the site script. Other .css and .js files are left out with a warning: combine them into these two files first.
- **Head:** the title and description become the page's; JSON-LD the page's structured data; other `<meta>` and `<link>` on every page become the site head, the rest the page's head.
- **Other files** (pictures, fonts, videos, PDFs, icons, manifest) are kept at their paths as assets.
- **Facts:** mark the phone, WhatsApp, email and address with `data-lb` markers (and `data-lb-format` to keep the site's own grouping of digits, address parts `address-street` and the others), or publishing is refused for typed phone numbers and emails. The marked text stays exactly as written while it matches the record.
- **Forms:** post to `/_lb/contact`, or keep a WhatsApp form with `data-delivery="whatsapp"`.
- **Addresses ending in "/":** when the site's own links mostly end in a slash, the import keeps that (`settings.trailing_slash`).
- **Editable on the way in:** headings, paragraphs, pictures, links, buttons and repeated cards are marked editable automatically (`mark_fields: false` keeps the markup untouched; your own marks always win).

Only data attributes are added, so the pages render the same.

## Path A: an agent with a shell (Claude Code, Codex, Cursor)

1. Get the site's files exactly: the built output of its repository, or a mirror of the live site (every page, stylesheet, script, picture, font, video). For sites built with a framework, render each page to static HTML and keep the generated CSS and JS.
2. Shape the folder to the contract: combine stylesheets into `site.css` and scripts into `site.js` (keeping their order) and update the links; mark the header, footer and sections; mark the facts; point forms at `/_lb/contact`; remove analytics tags (they go in `update_site_settings`).
3. Upload every non-text file: `create_site_upload` with `path`, `size`, `sha256`, PUT to `upload_url`, then `complete_site_upload`; or `create_site_upload` with `source_url` when the file is online. Keep each returned `blob`.
4. `import_static_site` with `files: [{path, content}]` (the text files) and `blobs: [{path, blob}]`. `replace_draft: true` only with the owner's yes when a draft exists.
5. Compare: `screenshot_site` of the draft at desktop and phone, full page, against the live site at the same widths (your own browser). Fix differences and import again with `replace_draft: true`.

## Path B: a chat agent without a shell (claude.ai, ChatGPT)

LotsBusiness fetches the files for you:

1. Find the pages: the site's `sitemap.xml`, or its menu.
2. `import_static_site` with `files: [{"path": "index.html", "source_url": "https://old-site.example/"}, {"path": "about.html", "source_url": "https://old-site.example/about"}, {"path": "site.css", "source_url": "https://old-site.example/style.css"}]` and `blobs: [{"path": "images/team.jpg", "source_url": "https://old-site.example/images/team.jpg"}]` (up to 100 files by address in one call; each is checked like an upload).
3. `preview_site_content`: broken links in the check name files the pages use that are not in the draft yet. Import again with those added as `blobs` by `source_url` (the old site's address plus the path) and `replace_draft: true`.
4. `get_site_content` shows the imported markup: replace typed phone numbers and emails with `data-lb` markers through `update_site_content`, so publishing is allowed and the site follows the record.
5. `screenshot_site` the draft and compare with the live site.

Path B suits plain static sites (hand-written HTML, one or two stylesheets). Sites built with a framework, with several generated stylesheets or scripts, need Path A, because the files must be combined and the pages rendered first.

## Big files and fonts

Pictures up to 10 MB, PDFs and fonts up to 10 MB, videos up to 50 MB, 600 files and 250 MB a version. Nothing large ever travels as base64 in the conversation: use `source_url` or the PUT upload.

## After the import

- `undo_edits: true` on `update_site_content` returns the draft to the import as it arrived, if later edits go wrong.
- `publish_site_content` only after the owner compares the preview and says yes.
- Connect the domain last (`connect_site_domain`), so the old site keeps serving until the new one is approved.
