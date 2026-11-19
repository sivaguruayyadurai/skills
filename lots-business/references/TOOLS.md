# LotsBusiness MCP Tools Reference

All tools are on `https://api.lots.business/mcp`. The live list, with current descriptions, is at https://api.lots.business/tools.json; the connected server's schema is the authority for parameters. Most tools need `business_id`; website tools need `site_id` from `get_site`.

## Workspaces and team

| Tool | Use it to |
|------|-----------|
| `list_workspaces`, `get_workspace` | Your workspaces, roles, members and businesses (paid or not) |
| `create_workspace`, `update_workspace`, `delete_workspace` | Agency workspaces; the personal one cannot be deleted |
| `invite_workspace_member`, `update_workspace_member`, `cancel_workspace_invitation`, `leave_workspace` | Team: admin (team and billing), manager (edits every business), viewer (reads) |
| `move_business_to_workspace` | Move a business between two workspaces with the same owner |
| `list_business_team`, `invite_business_member`, `update_business_member`, `cancel_business_invitation` | Access to one business, for a client |

## Business record (free)

| Tool | Notes |
|------|-------|
| `create_business`, `update_business`, `get_my_business`, `list_my_businesses` | The record; `business_type` is physical, service_area or online |
| `get_business_completeness` | What is missing for a good website, Google profile and directory listings |
| `set_business_hours` | Weekly hours, special hours and timezone |
| `set_business_services`, `list_business_services` | Services in order, with optional prices |
| `set_business_links` | Social profiles, booking link and more |
| `add_business_media`, `list_business_media`, `reorder_business_media`, `delete_business_media` | Photos, gallery, cover, logo and videos from a public https URL |
| `set_business_faqs`, `add_business_update` | FAQs and news on the listing |
| `autofill_business_from_url` | Read the business's own website and return what it states (saves nothing) |
| `claim_business`, `verify_business_claim`, `list_my_business_claims` | Claim a listing that already exists |
| `list_business_reviews` (by slug), `reply_to_business_review`, `answer_business_question` | Reviews and questions on your listing, and your replies (`list_my_business_reviews` lists reviews you wrote elsewhere) |
| `get_business_analytics` | Listing views and contacts |

## Billing

| Tool | Notes |
|------|-------|
| `get_billing` | Plan, credits and prices; `summary` says how many businesses the plan still covers and what the next paid business costs |
| `create_checkout` | Link for a plan (starter, pro, business; annual or monthly) or a credits top-up |
| `activate_business`, `deactivate_business` | Make a business paid, or stop paying; ask first |

## Websites (paid)

| Tool | Notes |
|------|-------|
| `get_site_guide` | Read before writing a site; `topic` returns a part of the premium website skill |
| `list_site_section_types`, `get_site_content`, `update_site_content`, `preview_site_content`, `publish_site_content` | The site as sections: fixed types and custom sections (own markup, CSS, script, marked fields); draft, private preview, publish |
| `import_static_site` | Move an existing static site exactly into a section draft (files by content or `source_url`) |
| `screenshot_site` | Pictures of the draft, a version or the live site at desktop, tablet and phone widths |
| `create_site_upload`, `complete_site_upload` | Big files: by `source_url` (fetched for you), or a direct PUT |
| `list_starter_kits`, `suggest_site_kit` | Industry kits that fill themselves from the record |
| `create_site`, `get_site` | The site and its address `<name>.lotssite.com` |
| `create_site_version`, `upload_site_image`, `get_site_files`, `get_site_file` | Draft versions and files |
| `check_site`, `preview_site` | Quality check and a private preview link |
| `publish_site`, `rollback_site`, `unpublish_site`, `list_site_versions`, `export_site` | Releases and history |
| `get_site_editables`, `edit_site_texts`, `update_site_theme` | Changes without code |
| `update_site_settings` | WhatsApp button, call bar, verification codes, analytics, announcement, contact form |
| `connect_site_domain`, `get_site_domain_status`, `set_primary_site_domain`, `remove_site_domain` | The owner's own domain |
| `get_site_analytics` | Cookieless page views, top pages and referrers |

## Google Business Profile (paid)

| Tool | Notes |
|------|-------|
| `start_google_business_oauth`, `get_google_business_connection_status` | Connect the owner's Google account |
| `search_google_business_categories`, `prepare_google_business_profile`, `create_google_business_profile` | Guided creation; the owner approves the payload |
| `get_google_business_verification_options`, `start_google_business_verification`, `complete_google_business_verification`, `get_google_business_profile_status` | Verification Google offers |
| `link_google_business_location` | Link a profile that already exists |
| `disconnect_google_business` | Disconnect the person's own Google account (every business they manage; posting pauses until they connect again). `confirm: true` after they agree; then `start_google_business_oauth` to use another account |
| `create_google_business_post`, `list_google_business_posts`, `delete_google_business_post` | Updates, events and offers |

## Directories, email and messages (paid)

| Tool | Notes |
|------|-------|
| `list_business_directories`, `get_listing_pack` | Where to list and exactly what to submit |
| `record_directory_submission`, `list_directory_submissions` | Track progress per directory |
| `setup_business_email`, `get_business_email_status`, `verify_business_email` | LotsMail on the business's own domain |
| `list_contact_messages`, `update_contact_message` | Website form messages |
| `link_crm_workspace` | Also send website messages into a LotsCRM workspace as leads (`unlink: true` stops) |
| `add_contact_recipient`, `remove_contact_recipient` | Who receives them (up to 3, confirmed by link) |

## Agency

| Tool | Notes |
|------|-------|
| `create_approval_link`, `list_approval_links`, `revoke_approval_link` | Client review of the website draft (frozen when asked) and business details, without an account; `days` is how long the link works (1 to 30) |
| `get_client_link`, `create_client_link`, `update_client_link`, `revoke_client_link` | The client page: one standing link per business (90 days, renewable; `rotate: true` replaces it) where the client approves or asks for changes on the linked LotsSocial brand's waiting posts and on open website checks, and can change an answer until you act. `client_email` gets a daily email when something new waits. Answers: `latest_answers` on `get_client_link` |
| `preview_business_handover` | Before a hand-over: what moves with the business and what stays, app by app (LotsMail domain, LotsSocial brand with its accounts, posts and media, LotsBlog blog, LotsCRM workspace, LotsInvoice business), with the reason. Changes nothing |
| `start_business_handover`, `list_business_handovers`, `cancel_business_handover` | Give a business to the client; its linked apps go with it on acceptance (`moves` on each completed hand-over) |
| `finish_business_handover` | After a hand-over: move the linked apps that waited (the client's plan or credits, a social account they already had) |
| `get_business_handover`, `accept_business_handover` | The client's side of a hand-over: what moves to them and what they pay for (`moves`, `billing`) |
| `get_agency_branding`, `set_agency_branding` | The agency's name, logo, colour, reply-to email and website on client pages (shown with LotsTech for Business or a LotsBusiness Pro or Business plan) |
| `get_linked_apps` | Every app linked to a business: LotsCRM, LotsMail domain, LotsBlog, Google profile, LotsSocial brand, LotsInvoice business (`include_options: true` lists what you can link and suggests a brand) |
| `link_social_brand`, `link_invoice_business` | Link the business's LotsSocial brand or LotsInvoice business (`unlink: true` removes); never link a suggested brand without the person's yes |
| `get_client_reports`, `set_client_report_settings` | Client reports of a business in an agency workspace: the monthly report (on by default; counted on the 1st with a preview to the agency, sent to the client's `recipients` on the 3rd unless stopped) and `show_amounts` |
| `create_client_report` | A report now: `period` today, yesterday, last_7_days, last_week, this_month, last_month or custom (`start_date`, `end_date`); its link lasts 90 days; `send_to_client: true` emails it at once, only after the person's yes |
| `preview_client_report`, `update_client_report`, `send_client_report_now` | See a report as the client will (`report_id` or `upcoming`), add a note, stop a monthly report, renew a link (`extend_link`), or send it now (only after the person's yes) |
| `get_ai_visibility`, `set_ai_visibility_settings`, `run_ai_visibility_check` | Found by AI (paid businesses): whether AI names the business for its `service` in its `town`: ChatGPT logged out (8 questions, 6 fixed and 2 rotating weekly), two Google searches from the business's location (AI Overview when shown, map results) and Google AI Mode. Per answer: named or not, place, businesses named instead, own site cited; `rolling` adds up the last 4 weeks. Weekly automatic check (`auto_weekly`; its results come within about an hour, `weekly.waiting` meanwhile) plus up to 4 `run_ai_visibility_check` a month (about a minute each; a failed one is not counted). A finished check shows in client reports of that period |

## Discovery (public)

`search_businesses`, `list_businesses`, `get_business`, `find_businesses_in_city`, `list_business_categories`, `get_business_category`, `list_locations`, `get_location`, `list_business_collections`, `get_business_collection`.
