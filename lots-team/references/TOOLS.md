# LotsTeam tools

Agents call these names. The workspace still stores posts in the feedback tables, so a handler result uses `id` on the post itself and `post_id` when a task points at a post.

Pass `project_id` for project work. Get it from `list_projects`. Get `organization_id` from `list_organizations`.

## Workspace

| Tool | Purpose | Arguments |
|------|---------|-----------|
| `list_organizations` | Organizations this account belongs to | — |
| `list_projects` | Projects in an organization | `organization_id` |
| `get_project` | One project | `project_id` |

## Posts

| Tool | Purpose | Arguments |
|------|---------|-----------|
| `list_posts` | Posts from the widget and portal | `project_id` or `organization_id`, optional `status` |
| `get_post` | One post | `post_id` |
| `create_post` | Log a request heard elsewhere (a sales call, an email) | `project_id`, `title` (5+ chars), `description` (10+ chars), `category` (`feature`, `bug`, `improvement`, `question`, `other`), optional `email`, `user_name`, `priority` |
| `update_post` | Change title, description, or status | `post_id`, fields to change |
| `list_post_comments` | Comments on a post | `post_id` |
| `create_post_comment` | Add a comment | `post_id`, `content` |

## Tasks

| Tool | Purpose | Arguments |
|------|---------|-----------|
| `list_tasks` | Tasks on a project | `project_id`, optional `status`, `assignee_id`, `priority` |
| `get_task` | One task | `task_id` |
| `create_task` | Add a task | `project_id`, `title`, optional `description`, `status` (`todo`, `in-progress`, `done`), `priority`, `assignee_id` |
| `update_task` | Change a task | `task_id`, fields to change |
| `list_task_comments` | Comments on a task | `task_id` |
| `create_task_comment` | Add a comment | `task_id`, `content` |

## Links

| Tool | Purpose | Arguments |
|------|---------|-----------|
| `link_post_to_task` | Connect a post to the task that tracks it | `task_id`, `post_id` |
| `list_linked_posts` | Posts linked to a task | `task_id` |

## Changelog

| Tool | Purpose | Arguments |
|------|---------|-----------|
| `list_changelog` | Changelog entries | `project_id` or `organization_id` |
| `get_changelog` | One entry | `changelog_id` |
| `create_changelog` | Draft an entry | `project_id`, `title`, `content` |
| `update_changelog` | Edit a draft | `changelog_id`, fields to change |
| `publish_changelog` | Show it on the public portal | `changelog_id` |

## Support

| Tool | Purpose | Arguments |
|------|---------|-----------|
| `list_contact_messages` | Support inbox | `project_id`, optional `status` |
| `get_contact_thread` | The message and every reply | `contact_message_id` |
| `reply_to_contact_message` | Reply and email the sender | `contact_message_id`, `reply_message` |

## Team

| Tool | Purpose | Arguments |
|------|---------|-----------|
| `list_organization_members` | People and roles | `organization_id` |

Use a member's user id as `assignee_id`. Do not invent a teammate.
