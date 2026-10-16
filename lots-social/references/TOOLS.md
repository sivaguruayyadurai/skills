# Tool guidance

Discover current tool schemas from the connected LotsSocial MCP server. This file
is a guide, not a complete or frozen inventory.

Accounts and access: list_workspaces, list_brands, list_connected_accounts,
get_account_details, get_connect_link, disconnect_account. Use returned IDs and
hosted connection links. get_account_details reports connection health; reconnect
through get_connect_link. Disconnect only on the user's request.
Client connect links: get_connect_link with purpose "client" (label, brand_id,
optional platform, expiry_days 1 to 7, default 7) makes a link for someone outside
the workspace, such as an agency client, who connects their own accounts without
a LotsSocial login; everything they connect is filed under that brand and paid
like any other account. Only owners, admins and managers can create one. The URL
is returned once (keep link_id). list_connect_links (REST GET /connect-links)
shows each link's status (active, expired or revoked) and accounts_connected;
revoke_connect_link (REST DELETE /connect-links/{link_id}) stops a link, and the
accounts already connected through it stay. Whoever opens a client link sees
only the accounts connected through that link, never the rest of the brand.
Brands: create_brand and update_brand group a workspace's accounts (one company
or client each) and move accounts between brands; moves are reported. Pass
brand_id when posting for a brand, or to get_connect_link to connect into it.
Billing: get_billing_status and get_credits_link. Credits pay for accounts beyond plan coverage automatically; only the payer buys credits or a plan.
Posts: list_social_posts, get_social_post, create_social_post,
bulk_create_social_posts, update_social_post, cancel_scheduled_post,
delete_social_post. Validation and account permissions remain enforced.
Publish now: publish_now: true on create_social_post (instead of scheduled_time)
or on update_social_post (an existing draft or scheduled post) publishes to every
selected account right away, with the same network rules and permission as
scheduling (owners, admins and managers). Confirm the text, media and accounts
with the person first; never publish a draft they did not ask to publish now. The
result has accounts[] (status pending, processing, success or failed, with
platform_post_url once live); get_social_post shows the final result, and a
failed attempt is retried automatically. Only
drafts and scheduled posts can be deleted; for a published post the refusal
returns each network's live link so the user can delete it there.
Reddit and Pinterest need network fields to schedule: pass platform_fields
{"reddit": {"subreddit": "name", "title": "..."}} (optional flair_id, flair_text,
nsfw, spoiler) or {"pinterest": {"board_id": "...", "title": "...", "link": "..."}}
to create_social_post, update_social_post, bulk_create_social_posts and
validate_social_post. Key by connected account ID instead of the network to give
one account its own. get_account_details lists a Pinterest account's boards
(posting_fields.boards); with none synced, the person creates a board on
Pinterest and reconnects through get_connect_link with that account_id.
Media: list_media, get_media_details, upload_media, create_media_upload,
complete_media_upload, update_media_metadata, delete_media. upload_media takes an
image or video link (url), or an image as base64. Files on your computer:
create_media_upload, PUT the bytes to upload_url with the returned headers, then
complete_media_upload.
Results: get_post_analytics, get_aggregate_analytics and get_brand_winning_posts.
The aggregate engagement rate counts only posts that reported impressions, views
or reach (summary.engagement_rate_basis says which); quote it with that basis,
and when it is null use total engagement instead.
Follower counts: get_account_details (account.audience) and get_aggregate_analytics
(audience.accounts) return the latest daily count with captured_on and the change
over 7 and 30 days; each change states the days it actually covers. Say "as of"
the captured_on date. Where a network gives no count the field is null with
unavailable_reason: report that reason, never 0 followers.
Guidance: get_platform_playbook when a platform's rules matter to the request.

Some older web-app workflows remain available internally for compatibility. Do not
ask for goal, campaign, paid research, review or rewrite tools to publish a post.
