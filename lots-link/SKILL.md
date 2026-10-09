---
name: lots-link
description: Manage LotsLink short links, campaign projects, branded domains and click analytics through its MCP server. Use when the user wants you to create, organize or measure their links.
metadata:
  compatibility: Any compatible remote MCP client, including ChatGPT, Claude and coding agents
  author: lotstech
  version: "1.1"
  platform: lots.link
  mcp_endpoint: https://api.lots.link/mcp
---

# LotsLink

You manage the user’s branded short links, campaign organization and click analytics. LotsLink is the URL shortener; you handle planning and suggestions under the user’s instructions. The dashboard provides manual control too.

## Connect

Use `https://api.lots.link/mcp` with the client’s supported remote MCP connection and Lots sign-in. If these tools are not connected, give the user that URL and instructions to connect LotsLink for you in your current client. Adapt instructions to the client and account; do not claim that every client has identical settings. An API key is an alternative when the client needs one; never ask the user to paste credentials into chat.

For REST integration, read `https://api.lots.link/docs.md`. Discover the current tool schemas rather than relying on a fixed tool inventory. [Tools reference](references/TOOLS.md) and [workflow examples](references/WORKFLOWS.md) are supporting guides; the connected server’s schema takes precedence.

## Operate

- List workspaces first and resolve the user’s intended workspace. Active membership applies to personal workspaces too. Owners and admins manage the workspace; members create links and edit their own; viewers are read-only.
- Create a link with its HTTP/HTTPS destination, optional custom slug, project and UTM tags. Slugs are unique on the selected hostname across workspaces. For a verified active branded domain in this workspace, pass `custom_domain_id`; omit it for lots.link. Changing a slug changes the public URL and any printed QR code that uses it.
- QR generation is available in the LotsLink dashboard. Guide the user there when needed; do not invent an MCP QR tool. Use the short URL for tracked QR visits. A QR pointing directly to another site bypasses LotsLink.
- Read analytics as recorded visits. Known bots, previews, prefetches and HEAD requests are excluded. Location is approximate and may be unavailable; new events do not store visitor IP addresses. Do not describe counts as guaranteed unique people or every scan.
- Projects organize campaigns. Preserve workspace boundaries when assigning projects, domains and tags. Confirm scope before destructive changes and follow the user’s actual authorization.
- Native `*.lots.link` subdomains are managed by LotsLink and need no user DNS changes. Each person gets one. Own domains require DNS-only CNAME configuration to `customers.lots.link` and hostname plus certificate verification. Explain the returned DNS instructions; do not claim activation before verification.
- Do not remove a domain while links use it or silently change their hostname. Remove or reassign affected links only with the user’s instruction.

## Billing

Links, clicks, QR codes, workspaces and teammates are unlimited, subject to fair use. Own custom domains need plan coverage or credits charged daily. Extra domains cost the plan’s rate. Use `lotslink_get_billing` and current pricing facts for exact prices, included capacity, rates and eligible signup credits; do not embed stale values in advice.

Capacity belongs to the workspace owner. When funding ends, existing links keep redirecting; new links on an unfunded own domain pause. Free lots.link links remain available. Purchased credits never expire and are usable across Lots products; promotional credits have their disclosed validity and eligibility. Plans grant domain capacity, not model credits. Your AI provider bills its own usage.

Checkout links let the user pay or manage a plan. A return URL alone does not prove payment; recheck billing status. Safety or service outages may temporarily block link creation; explain the error and retry within the user’s instructions without claiming success.
