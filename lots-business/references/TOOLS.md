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
| `create_approval_link`, `list_approval_links`, `revoke_approval_link` | Client review without an account |
| `start_business_handover`, `list_business_handovers`, `cancel_business_handover` | Give a business to the client |
| `get_business_handover`, `accept_business_handover` | The client's side of a hand-over |

## Discovery (public)

`search_businesses`, `list_businesses`, `get_business`, `find_businesses_in_city`, `list_business_categories`, `get_business_category`, `list_locations`, `get_location`, `list_business_collections`, `get_business_collection`.
