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
Client approval links: when an agency's client should approve posts before they
go out, save the posts with request_approval: true (create_social_post or
update_social_post; never together with publish_now), then call get_connect_link
with purpose "approval", brand_id (required), a label (the client's name) and
optionally post_ids (up to 100 posts of that brand, put in waiting for approval
at the same time). Without post_ids the link shows every post of the brand that
waits for approval. The client opens the link without a LotsSocial login and
approves or rejects each post with an optional comment. A post waiting for
approval, or rejected, never publishes; an approved post goes out on its
schedule, at once if its time has already passed. Changing the caption, title,
link, accounts or media of an approved or rejected post asks for approval again;
moving only the schedule does not. get_social_post and list_social_posts show
approval_status, client_feedback (decision, comment, reviewer_name) and
awaiting_client (an active link waits on the post). list_connect_links with
purpose approval shows each link's posts, views and decisions; revoke_connect_link
cancels it. You can ask for approval, but you never approve or reject for the
client: no tool does it, and publish_now on a post waiting for the client is
refused.
Client upload links: when an agency's client should send photos and videos for
one brand, call get_connect_link with purpose "upload", brand_id (required), a
label (the client's name), expiry_days (1 to 7, default 7) and optionally
max_files (1 to 50, default 50). The client opens the link on their phone without
a LotsSocial login and adds photos (JPEG, PNG, WebP, HEIC, up to 50 MB each) and
videos (MP4, MOV, up to 1 GB each) in original quality. Each file lands in the
workspace's media library marked as from the client: list_media with source
client_upload lists them, each with uploaded_via_link (link_id, label, brand_id).
The client sees only what they sent through the link, never the rest of the
library. The URL is returned once (keep link_id); list_connect_links with purpose
upload shows files_received; revoke_connect_link stops the link, and files already
received stay. Files count toward the workspace's normal media storage.
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
Pinterest needs network fields to schedule: pass platform_fields
{"pinterest": {"board_id": "...", "title": "...", "link": "..."}}
to create_social_post, update_social_post, bulk_create_social_posts and
validate_social_post. Key by connected account ID instead of the network to give
one account its own. get_account_details lists a Pinterest account's boards
(posting_fields.boards); with none synced, the person creates a board on
Pinterest and reconnects through get_connect_link with that account_id.
Instagram trial reels: pass platform_fields {"instagram": {"trial_reel": "manual"}}
(or "performance") on a post with one video. Instagram shows the Reel to people
who don't follow the account first; with manual the person shares it with their
followers in the Instagram app, with performance Instagram shares it if it
performs well. "off" posts a normal Reel. LotsSocial cannot read when a trial
reel reaches followers, so do not report that it has. Instagram only allows trial reels on accounts that meet its follower requirement and refuses others (nothing is posted).
With no scheduled_time and no type it checks a draft, where every rule is
only a warning: valid is true, so read ready_to_schedule (false when scheduling the
post as it stands would be refused) or pass scheduled_time to see errors.
Media: list_media, get_media_details, upload_media, create_media_upload,
complete_media_upload, update_media_metadata, delete_media. upload_media takes an
image or video link (url), or an image as base64. Files on your computer:
create_media_upload, PUT the bytes to upload_url with the returned headers, then
complete_media_upload. Files from a client upload link have source client_upload.
When the person wants a file itself, give them download_url from get_media_details:
it saves the file with its original name and works for 15 minutes; ask again after that.
To rename a file, call update_media_metadata with filename; the stored file and posts
using it do not change, and list_media search finds it by the new name.
Results: get_post_analytics, get_aggregate_analytics and get_brand_winning_posts.
get_post_analytics reads a post of the last 7 days from its networks first (at most
once an hour), so it answers current numbers; last_updated says when they were read.
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
ask for goal, campaign or paid research tools to publish a post.
