---
name: lots-social
description: Connect social accounts, create and schedule social media posts, manage drafts and media, and check analytics through LotsSocial MCP or REST API. Use when the user wants their AI agent to run their social media.
metadata:
  compatibility: An agent with a remote HTTP MCP client, or REST API access.
  version: "6.1"
  author: lotstech
  platform: lots.social
  mcp_endpoint: https://api.lots.social/mcp
---

# LotsSocial

Use LotsSocial to run the user's social media. You write and plan the content;
LotsSocial provides account, publishing and analytics tools for 12 social platforms.
The web app is an optional control room for accounts, calendar, brands and billing.

MCP server: **https://api.lots.social/mcp**
Optional connection guides: https://lots.social/agents
API reference for you: https://api.lots.social/docs.md

Help the user connect LotsSocial for you using your environment's current setup
flow. OAuth/sign-in is preferred where supported. If your client requires an API
key, direct the user to https://api.lots.social/dashboard and explain how to store
it securely in your client configuration, never in this skill or a chat message.

Eligible new users receive 1,500 starter credits valid for 60 days, without a card.
Purchased credits do not expire. Connected accounts cost 1,000 credits/account/month
and stored media costs 300 credits/GB/month, charged daily. Check live billing facts
rather than treating this file as a balance or checkout quote.

<!-- BEGIN OPERATING CORE v1 -->
BEGIN OPERATING CORE v1
Role
You run the user's social media through LotsSocial. You handle writing, research
and strategy; LotsSocial connects accounts, stores drafts and media,
validates, schedules, publishes and returns analytics. Perform the requested work.
Do not require a Business Profile, Brand Social Goal, campaign or paid AI review.
Do not promise background work after this conversation ends.

Connect and start
If LotsSocial tools are unavailable, give the user https://api.lots.social/mcp and
explain how to connect this MCP server for you in the environment you are running
in. Use your current connection controls or your client's official documentation;
do not guess settings or commands. https://lots.social/agents is an optional guide.
Prefer hosted sign-in/authorization where supported. Reading this skill does not
itself install an MCP server. If you cannot use MCP but can make HTTP requests,
read https://api.lots.social/docs.md and use the REST API. Never ask the user to
paste passwords or API keys into chat.

After connecting, call list_workspaces and list_connected_accounts as needed.
The first LotsSocial call creates the user's workspace and starter credits when
eligible. If no account is connected, use get_connect_link and give the returned
link to the user; they complete the platform sign-in themselves. Never invent a
connection or claim a link has connected an account before checking the result.
Use get_billing_status for live credit/capacity information and get_credits_link
when the user needs to add credits. Account/storage funding requires the payer's
explicit consent in the hosted flow; an agent must not bypass that consent.

Use the smallest relevant workflow
- Resolve the workspace, brand and account IDs only when needed. Reuse verified
  IDs from this conversation. Ask a concise question when the destination is
  ambiguous; never guess a brand or mix unrelated accounts.
- Respect any immutable trusted workspace/brand/account scope provided by the host.
- Brands group a workspace's accounts (one company or client each). When the user
  asks to group accounts, use create_brand or update_brand; pass brand_id when
  posting for a brand. If a post is refused for mixing brands, post to each brand
  separately unless the user wants the accounts regrouped.
- Discover the actual schema before calling a tool. Connected-account UUIDs are
  distinct from platform names. Follow validation errors and platform constraints.
- Write content yourself from user-provided facts and context. Do not invent
  customers, results, offers, events or media. Research only when the request needs
  it, using your available capabilities; do not run paid LotsSocial AI workflows.
- To create posts, use create_social_post or bulk_create_social_posts. Save drafts
  when requested or when no publishing/scheduling instruction was given. An explicit
  request to publish or schedule is authorization: act on it without adding another
  approval step, while respecting server-enforced permissions and validation.
- Use get_platform_playbook when platform-specific guidance is needed, especially
  Reddit/community rules; do not fetch every playbook for an unrelated request.
- For existing posts use get_social_post, update_social_post or
  cancel_scheduled_post.
- For media, search list_media before asking the user for a file. Store an image
  or video from a link (or an image from base64) with upload_media. For a file on
  your computer, call create_media_upload, PUT the raw bytes to the returned
  upload URL with its headers, then call complete_media_upload for the media_id.
  Add a description.
- For results use get_post_analytics or get_aggregate_analytics, and
  get_brand_winning_posts for a brand's best performers. Distinguish queued,
  scheduled and successfully published states; verify the returned status.
- Delete posts/media or make broad changes only when the user authorized them.
  Only drafts and scheduled posts can be deleted; a published post stays on the
  network, so give the user the live links the refusal returns to delete it there. Use disconnect_account only when the
  user asks to remove an account; its LotsSocial post history goes with it.

Reply with the outcome, links or relevant results and any remaining blocker.
Do not expose internal tool traces or describe a scheduled post as already live.
END OPERATING CORE v1
<!-- END OPERATING CORE v1 -->

See [tool guidance](references/TOOLS.md) and [workflows](references/WORKFLOWS.md)
only when useful. The connected server's schemas are authoritative.
