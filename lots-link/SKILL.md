---
name: lots-link
description: Manage LotsLink short links, QR codes, campaign projects, branded domains and click analytics through its MCP server. Use when the user wants you to create, organize or measure their links or make QR codes for them.
metadata:
  compatibility: Any compatible remote MCP client, including ChatGPT, Claude and coding agents
  author: lotstech
  version: "1.2"
  platform: lots.link
  mcp_endpoint: https://api.lots.link/mcp
---

# LotsLink

You manage the user’s branded short links, QR codes, campaign organization and click analytics. LotsLink is the URL shortener; you handle planning and suggestions under the user’s instructions. The dashboard provides manual control too.

## Connect

Use `https://api.lots.link/mcp` with the client’s supported remote MCP connection and Lots sign-in. If these tools are not connected, give the user that URL and instructions to connect LotsLink for you in your current client. Adapt instructions to the client and account; do not claim that every client has identical settings. An API key is an alternative when the client needs one; never ask the user to paste credentials into chat.

For REST integration, read `https://api.lots.link/docs.md`. Discover the current tool schemas rather than relying on a fixed tool inventory. [Tools reference](references/TOOLS.md) and [workflow examples](references/WORKFLOWS.md) are supporting guides; the connected server’s schema takes precedence.

## Operate

- List workspaces first and resolve the user’s intended workspace. Active membership applies to personal workspaces too. Owners and admins manage the workspace; members create links and edit their own; viewers are read-only.
- Create a link with its HTTP/HTTPS destination, optional custom slug, project and UTM tags. Slugs are unique on the selected hostname across workspaces. For a verified active branded domain in this workspace, pass `custom_domain_id`; omit it for lots.link. Changing a slug changes the public URL and any printed QR code that uses it.
- Change where a link goes with `lotslink_update_link` and `original_url`. The slug, short URL and QR code stay the same, so printed codes keep working and keep counting scans, and click history stays on the link. The new URL gets the same checks as creation, and UTM tags the link was created with are added again when the new URL does not set them. The change reaches every visitor within a minute. `lotslink_get_link` lists past changes in `destination_changes`. Confirm the new URL with the user before changing a link that is already printed or shared.
- Make a QR code with `lotslink_create_qr_code` (workspace_id and link_id, optional size and colors). It returns `qr_code_url`, a PNG of the short URL, and saves it on the link. Scans open the short URL, so they show up in the link’s analytics. Keep strong contrast between the code and background colors. A QR code pointing directly to another site would bypass LotsLink, so always make it from a LotsLink link.
- Read analytics as recorded visits. Known bots, previews, prefetches and HEAD requests are excluded. Location is approximate and may be unavailable. Visitor IP addresses are not stored, so there is no unique-visitor count: never describe clicks as unique people or as every scan.
- Projects organize campaigns. Preserve workspace boundaries when assigning projects and domains. Confirm scope before destructive changes and follow the user’s actual authorization.
- Native `*.lots.link` subdomains are managed by LotsLink and need no user DNS changes. Each person gets one. Own domains require DNS-only CNAME configuration to `customers.lots.link` and hostname plus certificate verification. Explain the returned DNS instructions; do not claim activation before verification.
- Do not remove a domain while links use it or silently change their hostname. Remove or reassign affected links only with the user’s instruction.

## Billing

Links, clicks, QR codes, workspaces and teammates are free and unlimited. The only limit is on creation: up to 1,000 new links per person in any 24 hours. If you reach it, tell the user and continue the next day. Own custom domains need plan coverage or credits charged daily. Extra domains cost the plan’s rate. Use `lotslink_get_billing` and current pricing facts for exact prices, included capacity, rates and eligible signup credits; do not embed stale values in advice.

Capacity belongs to the workspace owner. When funding ends, existing links keep redirecting; new links on an unfunded own domain pause. Free lots.link links remain available. Purchased credits never expire and are usable across Lots products; promotional credits have their disclosed validity and eligibility. Plans grant domain capacity, not model credits. Your AI provider bills its own usage.

Checkout links let the user pay or manage a plan. A return URL alone does not prove payment; recheck billing status. Safety or service outages may temporarily block link creation; explain the error and retry within the user’s instructions without claiming success.
