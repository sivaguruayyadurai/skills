# LotsLink MCP Tools Reference

All tools available via `https://api.lots.link/mcp`. Tools are called by their **Tool Slug**.
Note: All lots.link tool slugs are prefixed with `lotslink_`.

---

## Workspaces

| Tool Slug | Description | Key Parameters |
|-----------|-------------|----------------|
| `lotslink_list_workspaces` | List all workspaces where user is an active member | none |
| `lotslink_get_workspace` | Get workspace details, settings, user role, member/link counts | `workspace_id` |
| `lotslink_create_workspace` | Create a new workspace | `name` (required), `type?`, `description?` |
| `lotslink_update_workspace` | Update workspace name, description, or settings (Owner/Admin) | `workspace_id`, `name?`, `description?` |
| `lotslink_delete_workspace` | Permanently delete a workspace and all its data (Owner only) | `workspace_id` |

---

## Links

| Tool Slug | Description | Key Parameters |
|-----------|-------------|----------------|
| `lotslink_list_links` | List links with filtering, search, and pagination | `workspace_id` (required), `project_id?`, `status?` (all/active/inactive/expired), `search?`, `sort_by?`, `limit?`, `page?` |
| `lotslink_get_link` | Get link details including metadata, UTM params, click count, `qr_code_url` and `destination_changes` | `workspace_id`, `link_id` |
| `lotslink_create_link` | Create a shortened link (up to 1,000 new links per person in any 24 hours) | See below |
| `lotslink_create_qr_code` | Make a PNG QR code for the link's short URL; returns `qr_code_url` and saves it on the link (Owner/Admin any link, members their own) | `workspace_id`, `link_id`, `size?` (150-1024, default 512), `foreground_color?`, `background_color?` (hex) |
| `lotslink_update_link` | Change the destination (slug, short URL and QR code stay the same), slug, expiry, project or active status (Owner/Admin any link, members their own) | `workspace_id` (required), `link_id` (required), `original_url?`, `custom_slug?`, `is_active?`, `expires_at?`, `project_id?` |
| `lotslink_delete_link` | Permanently delete a link (own links; Owner/Admin for any) | `workspace_id`, `link_id` |
| `lotslink_bulk_activate_links` | Activate up to 100 links at once (Owner/Admin any link, members their own; links you may not change come back in `failed`) | `workspace_id`, `link_ids` (array) |
| `lotslink_bulk_deactivate_links` | Deactivate up to 100 links at once (Owner/Admin any link, members their own; links you may not change come back in `failed`) | `workspace_id`, `link_ids` (array) |
| `lotslink_bulk_delete_links` | Permanently delete up to 100 links (Owner/Admin any link, members their own; links you may not delete come back in `failed`) | `workspace_id`, `link_ids` (array) |

### `lotslink_create_link` Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `workspace_id` | ✅ | Target workspace UUID |
| `original_url` | ✅ | Full URL to shorten (http/https) |
| `custom_domain_id` | No | Active verified domain UUID in this workspace; omit for lots.link |
| `custom_slug` | No | Custom slug (7-40 chars, alphanumeric + `-` + `_`); auto-generated if omitted |
| `project_id` | No | Assign to a project UUID |
| `expires_at` | No | ISO 8601 expiration datetime |
| `utm_source` | No | UTM source (e.g., `newsletter`, `twitter`) |
| `utm_medium` | No | UTM medium (e.g., `email`, `social`, `cpc`) |
| `utm_campaign` | No | UTM campaign name |
| `utm_term` | No | UTM term (paid search keywords) |
| `utm_content` | No | UTM content (A/B variant identifier) |

---

## Projects

| Tool Slug | Description | Key Parameters |
|-----------|-------------|----------------|
| `lotslink_list_projects` | List all projects with link counts | `workspace_id`, `include_archived?` |
| `lotslink_get_project` | Get project details and link count | `workspace_id`, `project_id` |
| `lotslink_create_project` | Create a project for organizing links (Owner/Admin) | `workspace_id`, `name`, `description?`, `color?`, `client_info?` |
| `lotslink_update_project` | Update project details, or archive/restore with `is_archived` (Owner/Admin) | `workspace_id`, `project_id`, `name?`, `description?`, `color?` |
| `lotslink_archive_project` | Archive a project (soft delete; links remain accessible; Owner/Admin) | `workspace_id`, `project_id` |
| `lotslink_delete_project` | Permanently delete a project (no links allowed; Owner/Admin) | `workspace_id`, `project_id` |

---

## Custom Domains

| Tool Slug | Description | Key Parameters |
|-----------|-------------|----------------|
| `lotslink_list_custom_domains` | List all custom domains for a workspace | `workspace_id`, `status?` |
| `lotslink_get_custom_domain` | Get domain details, DNS records, SSL status, verification status | `workspace_id`, `domain_id` |
| `lotslink_add_custom_domain` | Add a custom domain or *.lots.link subdomain | `workspace_id`, `domain` |
| `lotslink_verify_custom_domain` | Check hostname and TLS certificate readiness | `workspace_id`, `domain_id` |
| `lotslink_update_custom_domain` | Activate or deactivate a custom domain | `workspace_id`, `domain_id`, `is_active` |
| `lotslink_delete_custom_domain` | Deactivate a custom domain after removing all attached links | `workspace_id`, `domain_id` |

> **Domain flow:** Add domain → Configure DNS records (from `get_custom_domain`) → Verify → SSL auto-provisions

---

## Analytics

| Tool Slug | Description | Key Parameters |
|-----------|-------------|----------------|
| `lotslink_get_link_analytics` | Detailed link analytics: geo, devices, referrers, recorded clicks and daily timeline (no unique-visitor count) | `workspace_id` (required), `link_id` (required), `days?` (1-365, default 30), `timezone?` |
| `lotslink_get_workspace_analytics` | Workspace-level overview: total clicks, active links, growth, top performers | `workspace_id`, `days?` |
| `lotslink_get_click_details` | Paginated individual click records with approximate geo, device and referrer | `workspace_id`, `link_id`, `filters?`, `limit?`, `offset?` |
| `lotslink_export_analytics` | Export click data as JSON or CSV (max 10,000 records) | `workspace_id`, `link_id?` (omit for all links), `format?` (json/csv) |

---

## Team

| Tool Slug | Description | Key Parameters |
|-----------|-------------|----------------|
| `lotslink_list_workspace_members` | Active members with role, name and email, plus your `my_role`; owners/admins also get pending invitations with links | `workspace_id` |
| `lotslink_invite_workspace_member` | Invite by email (Owner/Admin). Emails a 7-day invite link and returns `invite_url`; inviting a pending address again sends a new link | `workspace_id`, `email`, `role?` (admin/member/viewer, default member) |
| `lotslink_update_workspace_member_role` | Change a member's role (Owner/Admin; never the owner, admins cannot change other admins) | `workspace_id`, `member_id`, `role` |
| `lotslink_remove_workspace_member` | Remove a member (Owner/Admin; never the owner, admins cannot remove other admins) | `workspace_id`, `member_id` |
| `lotslink_cancel_workspace_invitation` | Cancel a pending invitation (Owner/Admin) | `workspace_id`, `invitation_id` |
| `lotslink_leave_workspace` | Leave a workspace (anyone except the owner) | `workspace_id` |
| `lotslink_list_my_invitations` | Pending invitations sent to your account's email | none |
| `lotslink_accept_workspace_invitation` | Join from an invitation sent to your account's email (case-insensitive); a removed member rejoins | `invitation_id` or `token` |

Teammates are free and unlimited on every plan. The owner role is never given by an invitation or a role change; ask the user before removing someone or leaving a workspace.

## Billing

Use `lotslink_get_billing` for current plan capacity, extra-domain rates, credits and PAYG pricing. Use `lotslink_create_checkout` for a plan or credits checkout link; the user completes payment. Discover the connected schemas for exact arguments.
