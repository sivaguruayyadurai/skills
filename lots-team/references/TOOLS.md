# LotsTeam tools

The 46 tools the LotsTeam MCP server (`https://api.lots.team/mcp`) offers, generated from its live tool list on 2026-10-12 (team tools added 2026-10-17). The REST equivalents are in `https://api.lots.team/docs.md`.

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
| `invite_member` | Invite someone by email. They join when they accept while signed in with that same address. A member also needs `role_name`, `custom_permissions` and `project_access`. Confirm the email and role first. | `organization_id`, `email`, `role` (admin, member, viewer); optional `role_name`, `custom_permissions`, `project_access`, `personal_message` |
| `cancel_invitation` | Cancel a pending invitation so its link stops working. | `organization_id`, `invitation_id` |
| `update_member_role` | Change a member's role, role name, permissions or projects. Changing to member needs `custom_permissions`. | `organization_id`, `member_id`; optional `role`, `role_name`, `custom_permissions`, `project_ids`, `username` |
| `remove_member` | Remove someone from an organization. To remove yourself, use `leave_organization`. | `organization_id`, `member_id` |
| `leave_organization` | Leave an organization you belong to. Anyone except the owner can leave. | `organization_id` |

## Posts

| Tool | What it does | Arguments |
|------|--------------|-----------|
| `list_posts` | List posts for a project or organization. A post is a user request, bug, or idea from the widget, the public portal, or the team. Pass project_id or organization_id. | optional `sort` (`recent`, `popular`), `limit`, `offset`, `status` (`open`, `in-progress`, `resolved`, `closed`, `published`), `category` (`feature`, `bug`, `improvement`, `announcement`, `discussion`, `question`, `other`), `priority` (`low`, `medium`, `high`, `urgent`), `is_pinned`, `project_id`, `is_announcement`, `organization_id` |
| `get_post` | Read one post by post_id. | `post_id` |
| `create_post` | Log a post on a project, such as a request heard on a sales call or in an email. Send project_id, title, description, and category (feature, bug, improvement, question, or other). Add email and user_name when you know who asked. | `title`, `category` (`feature`, `bug`, `improvement`, `announcement`, `discussion`, `question`, `other`), `project_id`, `description`; optional `tags`, `email`, `priority` (`low`, `medium`, `high`, `urgent`), `is_pinned`, `user_name`, `is_announcement` |
| `update_post` | Update a post. Send post_id and only the fields that should change, such as title, description, or status. | `post_id`; optional `tags`, `title`, `status` (`open`, `in-progress`, `resolved`, `closed`, `published`), `category` (`feature`, `bug`, `improvement`, `announcement`, `discussion`, `question`, `other`), `priority` (`low`, `medium`, `high`, `urgent`), `is_pinned`, `description`, `is_announcement` |
| `merge_posts` | Merge duplicate posts into one. post_id is the post to keep; duplicate_post_ids (up to 20, same project) are closed and point at it. Their votes move to the kept post (a person who voted on both counts once), and every task linked to any of them is linked to all, so everyone who asked is told when it ships. Nothing is deleted. Confirm the duplicates with the person first. | `post_id`, `duplicate_post_ids` |
| `list_post_comments` | List comments on a post. | `post_id`; optional `limit`, `offset` |
| `create_post_comment` | Add a comment to a post. | `content`, `post_id`; optional `is_admin`, `user_name`, `user_email` |
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
| `create_task_comment` | Add a comment to a task. | `content`, `task_id`; optional `is_admin`, `user_name`, `user_email` |
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

| Tool | What it does | Arguments |
|------|--------------|-----------|
| `list_contact_messages` | List support messages for a project. | optional `limit`, `offset`, `status` (`new`, `read`, `archived`), `project_id`, `organization_id` |
| `get_contact_thread` | Read a support message and its replies before you draft a response. | `contact_message_id` |
| `update_contact_message` | Mark support messages read, archived, or back to new. Send status and contact_message_id, or contact_message_ids (up to 50) to clear a batch such as vendor spam. Archived messages stay in the inbox history. | `status` (`new`, `read`, `archived`); optional `contact_message_id`, `contact_message_ids` |
| `reply_to_contact_message` | Reply on a support thread. The reply is stored on the conversation and emailed to the person who wrote in. Show the person the draft and send only after they approve it. | `reply_message`, `contact_message_id` |

Deleting a project, inviting people, changing roles, and billing stay in the dashboard.
