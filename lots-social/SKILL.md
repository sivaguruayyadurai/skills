---
name: lots-social
description: Connect social accounts, create and schedule social media posts, manage drafts and media, and check analytics through LotsSocial MCP or REST API. Use when the user wants their AI agent to run their social media.
metadata:
  compatibility: An agent with a remote HTTP MCP client, or REST API access.
  version: "6.0"
  author: lotstech
  platform: lots.social
  mcp_endpoint: https://api.lots.social/mcp
---

# LotsSocial

Run social media from the AI agent you already use. LotsSocial provides publishing
and account tools for 12 social platforms; your agent supplies writing and strategy.
The web app is an optional control room for accounts, calendar, brands and billing.

MCP server: **https://api.lots.social/mcp**
Connection guides: https://lots.social/agents
API reference: https://api.lots.social/docs

Use the client-specific guide rather than assuming every agent accepts the same
configuration. OAuth/sign-in is preferred where supported. Clients requiring an
API key should use the MCP dashboard's key flow and store the key securely in their
client configuration, never in this skill or a chat message.

Eligible new users receive 1,500 starter credits valid for 60 days, without a card.
Purchased credits do not expire. Connected accounts cost 1,000 credits/account/month
and stored media costs 300 credits/GB/month, charged daily. Check live billing facts
rather than treating this file as a balance or checkout quote.

<!-- BEGIN OPERATING CORE v1 -->
BEGIN OPERATING CORE v1
Role
Help the user run social media through LotsSocial. The user's agent handles writing,
research and strategy; LotsSocial connects accounts, stores drafts and media,
validates, schedules, publishes and returns analytics. Perform the requested work.
Do not require a Business Profile, Brand Social Goal, campaign or paid AI review.
Do not promise background work after this conversation ends.

Connect and start
If LotsSocial tools are unavailable, give the user https://api.lots.social/mcp and
https://lots.social/agents to connect it in their agent's MCP settings. Prefer the
hosted sign-in/authorization flow when supported. Reading this skill does not itself
install an MCP server. If their agent cannot use MCP, use the documented REST API:
https://api.lots.social/docs. Never ask them to paste passwords or API keys into chat.

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
- Discover the actual schema before calling a tool. Connected-account UUIDs are
  distinct from platform names. Follow validation errors and platform constraints.
- Write content yourself from user-provided facts and context. Do not invent
  customers, results, offers, events or media. Research only when the request needs
  it, using the user's agent capabilities; do not run paid LotsSocial AI workflows.
- To create posts, use create_social_post or bulk_create_social_posts. Save drafts
  when requested or when no publishing/scheduling instruction was given. An explicit
  request to publish or schedule is authorization: act on it without adding another
  approval step, while respecting server-enforced permissions and validation.
- Use get_platform_playbook when platform-specific guidance is needed, especially
  Reddit/community rules; do not fetch every playbook for an unrelated request.
- For existing posts use get_social_post, update_social_post or
  cancel_scheduled_post. For assets use list_media, upload_media and the media tools.
- For results use get_post_analytics or get_aggregate_analytics. Distinguish queued,
  scheduled and successfully published states; verify the returned status.
- Delete posts/media or make broad changes only when the user authorized them.

Reply with the outcome, links or relevant results and any remaining blocker.
Do not expose internal tool traces or describe a scheduled post as already live.
END OPERATING CORE v1
<!-- END OPERATING CORE v1 -->

See [tool guidance](references/TOOLS.md) and [workflows](references/WORKFLOWS.md)
only when useful. The connected server's schemas are authoritative.
