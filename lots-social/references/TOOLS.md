# Tool guidance

Discover current tool schemas from the connected LotsSocial MCP server. This file
is a guide, not a complete or frozen inventory.

Accounts and access: list_workspaces, list_brands, list_connected_accounts,
get_account_details, get_connect_link. Use returned IDs and hosted connection links.
Billing: get_billing_status and get_credits_link. Only the payer consents to charges.
Posts: list_social_posts, get_social_post, create_social_post,
bulk_create_social_posts, update_social_post, cancel_scheduled_post,
delete_social_post. Validation and account permissions remain enforced.
Media: list_media, get_media_details, upload_media, update_media_metadata,
delete_media. Follow the schema's actual upload protocol and supported formats.
Results: get_post_analytics and get_aggregate_analytics.
Guidance: get_platform_playbook when a platform's rules matter to the request.

Some older web-app workflows remain available internally for compatibility. Do not
ask for goal, campaign, paid research, review or rewrite tools to publish a post.
