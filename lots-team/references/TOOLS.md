# LotsTeam tools

The 51 tools the LotsTeam MCP server (`https://api.lots.team/mcp`) offers, checked against its live tool list (`https://api.lots.team/tools.json`) on 2026-10-27. The REST equivalents are in `https://api.lots.team/docs.md`.

The workspace stores posts in the feedback tables, so a handler result uses `id` on the post itself and `post_id` when a task points at a post. Pass `project_id` for project work (from `list_projects`) and `organization_id` from `list_organizations`.

## Account and billing

| Tool | What it does | Arguments |
|------|--------------|-----------|
| `get_profile` | Return the stable profile represented by this connection's authenticated credentials. | none |
| `get_funding_status` | Check subscription coverage, credit funding and live rates. If funding is needed, offer subscription or credits and give the owner the returned settings_url. This tool never enables credit billing. | none |

## Workspace and projects

| Tool | What it does | Arguments |
|------|--------------|-----------|
| `list_organizations` | List the organizations this account belongs to. | optional `limit`, `offset` |
| `list_organization_members` | List people in an organization, including their role. Use a member user id when assigning a task. | `organization_id`; optional `limit`, `offset`, `project_id` |
| `list_projects` | List projects in an organization. Pass organization_id from list_organizations. | `organization_id`; optional `limit`, `offset`, `project_id` |
| `get_project` | Read one project by project_id. | `project_id` |
| `create_project` | Create a project: one product with its own feedback, tasks, support inbox, changelog and public portal. A project is what LotsTeam bills: covered by the owner's plan, otherwise paid from credits per project per month. Confirm with the person before creating one, and check get_funding_status if they may need funding. Send organization_id and name; the portal address is derived from the name unless you pass slug. Pass is_internal true for a project only the team should see (no public portal or widget). | `name`, `organization_id`; optional `slug`, `logo_url`, `description`, `is_internal` |
| `update_project` | Update a project's name, description, logo_url or settings (portal branding and options; keys you send are merged into the existing settings). is_internal true hides the project's public portal and widget; only members see it. Send project_id and only the fields that should change. Custom domains use add_project_domain. | `project_id`; optional `name`, `logo_url`, `settings`, `description`, `is_internal` |
| `add_project_domain` | Connect a custom domain such as support.example.com to a project's public portal. Returns the DNS records the person must add (a DNS-only CNAME); give them the records, then call verify_project_domain once they have added them. Replaces any domain the project already has. | `domain`, `project_id` |
| `verify_project_domain` | Check whether a project's custom domain is live: DNS and certificate status, and the records still needed if not. | `project_id` |

## Team

Team members are unlimited on every plan. Roles are admin, member and viewer; nobody can be made owner by an invite or a role change, and the owner cannot be changed, removed or leave. These tools need the same permissions as the dashboard's Team page (leaving needs none).

| Tool | What it does | Arguments |
|------|--------------|-----------|
| `list_invitations` | List invitations for an organization with their status (pending, claimed, accepted, expired, cancelled). | `organization_id` |
| `invite_member` | Invite someone to an organization by email. They get the invitation email and join when they accept it while signed in with that same email address. Role is admin, member or viewer (owner cannot be given by an invite). A member also needs role_name, custom_permissions and project_access. Team members are unlimited on every plan. Confirm the email and role with the person first. | `organization_id`, `email`, `role` (admin, member, viewer); optional `role_name`, `custom_permissions`, `project_access`, `personal_message` |
| `cancel_invitation` | Cancel a pending invitation so its link stops working. Confirm with the person first. | `organization_id`, `invitation_id` |
| `update_member_role` | Change a member's role (admin, member or viewer), role_name, custom_permissions or project_ids. The owner cannot be changed, and no one can be made owner this way. Needs permission to manage member roles. Confirm the change with the person first. | `organization_id`, `member_id`; optional `role`, `role_name`, `custom_permissions`, `project_ids`, `username` |
| `remove_member` | Remove someone from an organization. The owner cannot be removed, and you cannot remove yourself (use leave_organization). Needs permission to remove members. Confirm with the person first. | `organization_id`, `member_id` |
| `leave_organization` | Leave an organization you belong to. Anyone except the owner can leave; you lose access to its projects at once. Confirm with the person first. | `organization_id` |

## Posts

| Tool | What it does | Arguments |
|------|--------------|-----------|
| `list_posts` | List posts for a project or organization. A post is a user request, bug, or idea from the widget, the public portal, or the team. Pass project_id or organization_id. | optional `sort` (`recent`, `popular`), `limit`, `offset`, `status` (`open`, `in-progress`, `resolved`, `closed`, `published`), `category` (`feature`, `bug`, `improvement`, `announcement`, `discussion`, `question`, `other`), `priority` (`low`, `medium`, `high`, `urgent`), `is_pinned`, `project_id`, `is_announcement`, `organization_id` |
| `get_post` | Read one post by post_id. | `post_id` |
| `create_post` | Log a post on a project, such as a request heard on a sales call or in an email. Send project_id, title, description, and category (feature, bug, improvement, question, or other). The post is recorded as yours: it shows your name, with a Team badge on the public portal. Pass email and user_name only when you log someone else's request; the post then shows their name, without the Team badge. | `title`, `category` (`feature`, `bug`, `improvement`, `announcement`, `discussion`, `question`, `other`), `project_id`, `description`; optional `tags`, `email`, `priority` (`low`, `medium`, `high`, `urgent`), `is_pinned`, `user_name`, `is_announcement` |
| `update_post` | Update a post. Send post_id and only the fields that should change, such as title, description, or status. | `post_id`; optional `tags`, `title`, `status` (`open`, `in-progress`, `resolved`, `closed`, `published`), `category` (`feature`, `bug`, `improvement`, `announcement`, `discussion`, `question`, `other`), `priority` (`low`, `medium`, `high`, `urgent`), `is_pinned`, `description`, `is_announcement` |
| `merge_posts` | Merge duplicate posts into one. post_id is the post to keep; duplicate_post_ids (up to 20, same project) are closed and point at it. Their votes move to the kept post (a person who voted on both counts once), their comments move too (dates and authors kept, plus a "Merged from <title>" note on the kept post), and every task linked to any of them is linked to all, so everyone who asked is told when it ships. Nothing is deleted. Confirm the duplicates with the person first. | `post_id`, `duplicate_post_ids` |
| `list_post_comments` | List comments on a post. | `post_id`; optional `limit`, `offset` |
| `create_post_comment` | Add a comment to a post. `is_admin` shows the Team badge, only for the organization owner, an admin or an AI agent member (defaults to true for them; ignored for anyone else). `user_name` is a display label for your own comment (an agent always shows its own name). `user_email` is ignored: the comment carries the signed-in account's email. Never use them to post as someone else. | `content`, `post_id`; optional `is_admin`, `user_name`, `user_email` |
| `update_post_comment` | Edit one of your own comments on a post. Send comment_id and the new content. | `content`, `comment_id` |
| `delete_post_comment` | Delete one of your own comments on a post. Ask the person first; it cannot be undone. | `comment_id` |

## Tasks

| Tool | What it does | Arguments |
|------|--------------|-----------|
| `list_tasks` | List tasks for a project. Optional filters include status, assignee_id, and priority. | optional `sort` (`recent`, `priority`), `limit`, `offset`, `search`, `status` (`todo`, `in-progress`, `done`), `priority` (`low`, `medium`, `high`, `urgent`), `mine_only`, `project_id`, `assignee_id`, `organization_id` |
| `get_task` | Read one task by task_id. | `task_id` |
| `create_task` | Create a task on a project. Status is todo, in-progress, or done. | `title`, `project_id`; optional `status` (`todo`, `in-progress`, `done`), `eta_date`, `priority` (`low`, `medium`, `high`, `urgent`), `is_roadmap`, `assignee_id`, `description`, `feedback_id`, `public_summary` |
| `update_task` | Update a task. Send task_id and only the fields that should change. Send project_id to move the task to another project in the same organization; it keeps its id, comments, status and dates. | `task_id`; optional `title`, `status` (`todo`, `in-progress`, `done`), `eta_date`, `priority` (`low`, `medium`, `high`, `urgent`), `is_roadmap`, `project_id`, `assignee_id`, `description`, `public_summary` |
| `list_task_comments` | List comments on a task. | `task_id`; optional `limit`, `offset` |
| `create_task_comment` | Add a comment to a task. Task comments are internal: every member's comment shows the Team badge unless `is_admin` is false. `user_name` is a display label for your own comment (`user_email` is not used); never use them to post as someone else. | `content`, `task_id`; optional `is_admin`, `user_name`, `user_email` |
| `update_task_comment` | Edit one of your own comments on a task. Send comment_id and the new content. | `content`, `comment_id` |
| `delete_task_comment` | Delete one of your own comments on a task. Ask the person first; it cannot be undone. | `comment_id` |

## Links between posts and tasks

| Tool | What it does | Arguments |
|------|--------------|-----------|
| `link_post_to_task` | Link a post to a task so the board shows which request the work came from. A task can carry many posts; linking again is a no-op. Everyone whose post is linked can be emailed when the changelog entry for the task is published. | `post_id`, `task_id` |
| `unlink_post_from_task` | Remove one post from a task. Other linked posts stay. | `post_id`, `task_id` |
| `list_linked_posts` | List the posts linked to a task. | `task_id` |

## Changelog

| Tool | What it does | Arguments |
|------|--------------|-----------|
| `list_changelog` | List changelog entries for a project or organization. | optional `tag` (`new`, `improved`, `fixed`), `limit`, `offset`, `published`, `project_id`, `organization_id` |
| `get_changelog` | Read one changelog entry by changelog_id. | `changelog_id` |
| `create_changelog` | Create a changelog draft in a project. | `tag` (`new`, `improved`, `fixed`), `title`, `project_id`, `description`; optional `task_id`, `is_published`, `notify_requesters` |
| `update_changelog` | Update a changelog draft. Send changelog_id and only the fields that should change. | `changelog_id`; optional `tag` (`new`, `improved`, `fixed`), `title`, `task_id`, `description`, `is_published`, `notify_requesters` |
| `publish_changelog` | Publish a changelog entry so it shows on the public portal. Set notify_requesters to true to also email the people whose posts are linked to its task, once; ask the person first. The result says how many were emailed in requesters_notified. | `changelog_id`; optional `notify_requesters` |
| `delete_changelog` | Delete an unpublished changelog draft by changelog_id. Owners and admins only. A published entry is refused: unpublish it first with update_changelog (is_published false), then delete it. Confirm with the person before deleting; it cannot be undone. | `changelog_id` |

## Support inbox

Support cases come from the widget, the portal, email, MCP, the API and the dashboard. Each has a number, a status (open, waiting_customer, snoozed, resolved, closed), a priority, an assignee and tags. Customers see the status as In progress, Waiting for you or Done.

| Tool | What it does | Arguments |
|------|--------------|-----------|
| `list_contact_messages` | List support cases for a project, or for every project of an organization you can see. Filter by view, status, priority, case type, channel, assignee, tag, dates or search (words, an email address or a case number such as #1042). Pages of up to 100. | `project_id` or `organization_id`; optional `view` (`open`, `waiting`, `snoozed`, `resolved`, `unassigned`, `mine`, `unread`, `all`), `status` (`open`, `waiting_customer`, `snoozed`, `resolved`, `closed`; `new`, `read` and `archived` still work; one or a list), `priority` (`low`, `normal`, `high`, `urgent`; one or a list), `case_type` (`support`, `bug`, `feature_request`, `feedback`, `billing`, `other`; one or a list), `channel` (`widget`, `portal`, `email`, `mcp`, `api`, `dashboard`; one or a list), `assignee` (`me`, `unassigned` or a user id), `tag`, `unread`, `search`, `created_from`, `created_to`, `updated_from`, `updated_to`, `sort` (`updated_at`, `created_at`, `priority`), `order` (`asc`, `desc`), `page`, `page_size`, `include_counts`, and the older `limit`, `offset` |
| `get_contact_thread` | Read a support case and its replies before you draft a response. Opening a case marks it read for the team. | `contact_message_id`; optional `mark_read` (false leaves it unread) |
| `reply_to_contact_message` | Reply on a support case. The reply is stored on the conversation and emailed to the person who wrote in. Show the person the draft and send only after they approve it. A public reply sets the case to waiting_customer unless you send another status. | `reply_message`, `contact_message_id`; optional `is_internal` (true: an internal note only the team sees, nobody is emailed), `notify_customer`, `status` (`open`, `waiting_customer`, `resolved`, `closed`), `channel` (`dashboard`, `api`, `mcp`) |
| `update_contact_message` | Change support cases: status (open, waiting_customer, snoozed, resolved, closed; read, archived and new still work), priority, assignee, tags, snooze or subject. Send contact_message_id, or contact_message_ids (up to 100) to update a batch such as vendor spam. Closed cases stay in the inbox history. Track one case as a post: post_id links an existing post of the same project (null unlinks), track_as_post creates a post from the case (title, details, category are prefilled), resolve_when_shipped chooses whether the case moves to resolved when the post ships. When the post is resolved, or its changelog entry is published with notify_requesters, the customer is emailed that it is live. Confirm with the person before creating a post. | optional `contact_message_id` (one case) or `contact_message_ids` (up to 100), `status` (`open`, `waiting_customer`, `snoozed`, `resolved`, `closed`; `new`, `read` and `archived` still work), `priority` (`low`, `normal`, `high`, `urgent`), `assignee_id` (a user id, or null to unassign), `tags` (replaces all, up to 20), `add_tags`, `remove_tags`, `snoozed_until` (a future time, or null to wake the case), `subject`, `case_type` (`support`, `bug`, `feature_request`, `feedback`, `billing`, `other`), `read`, `post_id` (one case at a time; null unlinks), `track_as_post` (true, or `{title, details, category}`), `resolve_when_shipped` |
| `get_support_insights` | Support numbers for a project (project_id) or every project of an organization (organization_id): open, waiting and unassigned cases now; for the last 7 and 30 days the new cases, median first response time and median resolution time in minutes, customer ratings (thumbs up and down, percent up) and cases by channel and type. | `project_id` or `organization_id` |
| `get_support_availability` | Check whether a project's support team shows as online or away right now: the status, why (working hours or a manual override), the reply promise customers see, the next opening time and the weekly working hours. | `project_id` |
| `set_support_availability` | Set a project's support availability by hand: available (shown as Online) or away, optionally until a time (ISO 8601, or "next_opening" for away until the working hours next open), or auto to go back to the working hours. Customers see it at once in the widget and the portal. Confirm with the person first. | `status` (`available`, `away`, `auto`), `project_id`; optional `until` (an ISO 8601 time in the future, at most a year ahead, `next_opening` or `next_change`; ignored for `auto`) |

## Reporting to the team that builds LotsTeam

These two tools are on every LotsTech MCP server. They send a request to the LotsTeam team (not to your own project's inbox) and read the answers.

| Tool | What it does | Arguments |
|------|--------------|-----------|
| `submit_support_request` | Send a bug report, feature request, feedback or support question to the team that builds this product. When one of this server's tools fails, returns something wrong, or cannot do what the person needs, offer to report it. Before sending, show the person the exact title and details you will send, and send only after they say yes. Never include passwords, API keys, tokens or other people's personal data. In details, say what was tried, what happened and what was expected; when a tool failed, add tool_name, error_message and request_id. The request is filed under the email the person signed in with, and the team replies to that email. Returns the request number, its status, when to expect a reply and a link when one is available. The same error from the same tool within 24 hours is added to the person's open request instead of opening a new one. | `type` (`bug`, `feature_request`, `feedback`, `support`), `title` (3 to 120 characters), `details` (10 to 4,000 characters); optional `tool_name`, `error_message`, `request_id` |
| `list_support_requests` | List the support requests the signed-in person has sent to the team that builds this product: number, type, title, status (In progress, Waiting for you, Done), last update, the team's latest reply and a link when one is available. Open requests by default; status all includes finished ones. Pass case_number (for example 1042) to see one request. Use it when the person asks about a problem they reported or whether the team has answered. | optional `status` (`open`, `all`), `limit` (up to 25), `case_number` (for example 1042 or #1042) |

## AI agent members

An owner or admin adds an AI agent to the team in the dashboard (the Team page, "Add an AI agent"). An agent member has its own name and key (`sk_agent_`, shown once), is a Member or a Viewer, reaches only its chosen projects, and shows an Agent badge on what it writes. It cannot sign in to any LotsTeam page. It can never add agents or keys, invite people, change roles, permissions or project access, remove members, leave, or change organization settings, domains, email settings, integrations or billing, and it cannot delete a project or the organization (`AGENT_NOT_ALLOWED`). A paused agent's calls return `AGENT_PAUSED`. There are no tools to add, pause or remove agents: that is dashboard-only.

Deleting a project and billing stay in the dashboard.
