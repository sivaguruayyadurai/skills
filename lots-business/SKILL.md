---
name: lots-business
description: Run a business's online presence on LotsBusiness through its MCP server - the free directory listing, and for paid businesses a website on its own domain, Google Business Profile creation and posts, local directory listings, business email and website messages. Use when the user wants you to list a business, build or change its website, set up or post to its Google profile, get it into directories, or manage client businesses as an agency.
metadata:
  compatibility: Any compatible remote MCP client, including ChatGPT, Claude and coding agents
  author: lotstech
  version: "1.0"
  platform: lots.business
  mcp_endpoint: https://api.lots.business/mcp
---

# LotsBusiness

You run a business's presence online from one record in LotsBusiness: its listing in the lots.business directory, its website, its Google Business Profile, its local directory listings and its business email. The record is the source of truth. Change a fact once (hours, phone, services) and the website, its schema and its llms.txt follow within a minute. You do the work under the owner's instructions; the owner reviews everything in the dashboard at https://lots.business/dashboard.

## Connect

Use `https://api.lots.business/mcp` as a remote MCP server and sign in with a Lots account. If these tools are not connected, give the user that URL and the steps for their client (setup for common agents: https://lots.business/mcp). An API key from https://www.lotstech.com/api is the alternative for clients that need one; never ask the user to paste a key or password into chat.

For REST, read `https://api.lots.business/docs.md`. Use the connected server's tool schemas over any fixed list. [Tools reference](references/TOOLS.md) and [workflow examples](references/WORKFLOWS.md) are supporting guides.

## Start every session

1. `list_workspaces`. Every account has a personal workspace; an agency has one workspace per team, holding its client businesses. Never carry facts from one business to another.
2. `list_my_businesses`, then `get_my_business` for the one the user means.
3. `get_business_completeness` before building anything. Ask the owner only for what it lists as missing.

## The record comes first

- **Never invent a fact.** No made-up prices, awards, years, reviews, team members, certifications or customer results. A value you cannot source stays empty. If the owner gives you a fact, put it in the record (`update_business`, `set_business_hours`, `set_business_services`, `set_business_links`, `add_business_media`) before you put it on a page.
- **Hours replace the whole week.** `set_business_hours` takes all seven days (an empty list is closed); every special-hours entry says `closed: true` or gives times.
- **Respect the business type.** `physical` (storefront or office) shows a street address. `service_area` (plumber, cleaner) shows a base city and service areas, never a street address. `online` shows no address and is not eligible for map listings. Never ask a service-area or online business for a street address.
- **Reviews are never written by you.** Ratings come only from real signed-in customers. `reply_to_business_review` replies as the owner, after the owner approves the text.

## Free and paid

A listing in the directory is free. Paying for a business (a plan covers 1, 5 or 25 businesses, or credits pay per business) unlocks its website, custom domain, Google Business Profile creation and posts, the directory list and listing pack, business email and website messages. `get_billing` shows the plan, the funding state and the exact prices; do not quote prices from memory. `activate_business` makes a business paid; ask first. `create_checkout` returns a link the owner opens to pay; never ask for card details in chat. A return from checkout does not prove payment: check `get_billing` again. A paid tool on an unpaid business answers with what to do next; pass that on rather than retrying.

## Websites

- Read `get_site_guide` before writing a site. It holds the build loop, the live-fact markers (`data-lb`), editable regions, what blocks publishing and the quality bar.
- Start from a kit (`suggest_site_kit`, `create_site` with `from_kit`) unless the owner wants something custom; kits fill themselves from the record. For custom work, write static files and save them with `create_site_version`.
- Use `data-lb` markers for facts (name, phone, hours, address, services) instead of typing them into the HTML, so the page never goes stale.
- Every version gets `check_site`. Errors block publishing; fix them. Share the `preview_url` with the owner and **publish only after the owner approves** (`publish_site`). `rollback_site` undoes a bad release.
- Small text changes: `get_site_editables` then `edit_site_texts`. Colours, font and sections on kit sites: `update_site_theme`.
- SEO and AI-search basics (schema, sitemap, robots, llms.txt, canonical, Open Graph) are added by LotsBusiness on every page; do not hand-write competing ones.
- A custom domain: `connect_site_domain` returns the one DNS record the owner adds at their registrar; then poll `get_site_domain_status`. Never claim the domain is live before it says `active`.
- `update_site_settings` turns on the WhatsApp button, call bar, search-engine verification codes, analytics (after the visitor consents) and an announcement bar. Only the groups and fields you send change; `redirects` replaces the whole list.

## Google Business Profile

Creation is guided, not guaranteed. `start_google_business_oauth` connects the owner's Google account; `prepare_google_business_profile` builds the exact payload from the record; show it to the owner and create only after they approve (`create_google_business_profile`). Google decides verification: offer the methods `get_google_business_verification_options` returns and never promise an outcome or a date. If the business already has a profile, `link_google_business_location` links it instead of creating a duplicate. Posts (`create_google_business_post`: update, event or offer) need an image or a button for a plain update; show the owner the text before posting.

## Directories

`list_business_directories` gives the audited directories that fit the business (its country and trade) with how to submit to each. `get_listing_pack` gives the same facts worded the same way for every directory; use it exactly, because inconsistent name, phone and address split a business's listings. The owner or agency submits; LotsBusiness does not submit on anyone's behalf, so never say a listing was submitted until it was. Track each one with `record_directory_submission`.

## Email and website messages

Business email (LotsMail) is included with a paid business once its website's own domain is connected: `setup_business_email` returns the DNS records, `verify_business_email` checks them, and mailboxes are managed in LotsMail. Website contact forms deliver to the business email (or up to three confirmed addresses, `add_contact_recipient`) and to `list_contact_messages`. Reply from the owner's own email; LotsBusiness does not send replies.

## Agencies

Create a workspace per agency (`create_workspace`), invite the team (`invite_workspace_member`: admin, manager or viewer), and add each client business to it. Give a client access to one business with `invite_business_member`. `create_approval_link` lets a client review the draft site or details and approve without an account. When the client should own it, `start_business_handover` gives them a link; on acceptance the business, website and domains move to their workspace and their plan pays for it from then on.

## Never

Publish, unpublish, deactivate, delete, post to Google or hand a business over without the owner's go-ahead in this conversation. Contact a business's customers. Put private notes on a public page: everything in a business record is public.
