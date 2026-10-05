# LotsTeam workflows

Start every session with `list_organizations`, then `list_projects`.

## Turn a post into work

1. `list_posts` for the project.
2. `get_post` for the one the person means.
3. `create_task` with a title that says what will change, and `assignee_id` only when they named someone from `list_organization_members`.
4. `link_post_to_task` with that task and `post_id`.
5. `update_post` when the status should change, for example once the work is tracked.

## Move a task

1. `get_task`.
2. `update_task` with the new status or assignee.
3. `create_task_comment` to say what changed, in plain language the team can read.

Status values are `todo`, `in-progress`, and `done`.

## Answer support

1. `list_contact_messages`.
2. `get_contact_thread` before writing.
3. Draft the reply and show it to the person when they asked to review it.
4. `reply_to_contact_message` when they want it sent. The reply is stored on the thread and emailed.

## Publish a changelog

1. Read the tasks or posts that shipped.
2. `create_changelog` as a draft.
3. Read it back with `get_changelog`.
4. `publish_changelog` only after the person asks you to publish.

## What stays in the dashboard

Projects, invites, roles, domains, branding, the widget, and billing are changed by a person in LotsTeam. If they ask for one of those, say it is done from the dashboard and continue with the posts, tasks, support, or changelog work they also asked for.
