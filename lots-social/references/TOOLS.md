# Tool guidance

Discover current tool schemas from the connected LotsSocial MCP server. This file
is a guide, not a complete or frozen inventory.

Accounts and access: list_workspaces, list_brands, list_connected_accounts,
get_account_details, get_connect_link, disconnect_account. Use returned IDs and
hosted connection links. get_account_details reports connection health; reconnect
through get_connect_link. Disconnect only on the user's request.
Billing: get_billing_status and get_credits_link. Only the payer consents to charges.
Posts: list_social_posts, get_social_post, create_social_post,
bulk_create_social_posts, update_social_post, cancel_scheduled_post,
delete_social_post. Validation and account permissions remain enforced. Only
drafts and scheduled posts can be deleted; for a published post the refusal
returns each network's live link so the user can delete it there.
Media: list_media, get_media_details, upload_media, create_media_upload,
complete_media_upload, update_media_metadata, delete_media. upload_media takes an
image or video link (url), or an image as base64. Files on your computer:
create_media_upload, PUT the bytes to upload_url with the returned headers, then
complete_media_upload.
Results: get_post_analytics, get_aggregate_analytics and get_brand_winning_posts.
Guidance: get_platform_playbook when a platform's rules matter to the request.

Some older web-app workflows remain available internally for compatibility. Do not
ask for goal, campaign, paid research, review or rewrite tools to publish a post.
