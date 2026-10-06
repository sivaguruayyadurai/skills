---
name: lots-team
description: Work in a LotsTeam workspace — posts, tasks, support messages, and changelog — from ChatGPT, Claude, or another MCP client. Use this skill when a founder or teammate asks you to handle product-ops work in lots.team.
compatibility: Works with any MCP-compatible client, including ChatGPT and Claude
metadata:
  author: lotstech
  version: "3.1"
  platform: lots.team
  mcp_endpoint: https://api.lots.team/mcp
---

# LotsTeam

LotsTeam is the workspace where a founder and a lean team keep what users ask for, what the team is building, and what just shipped.

You are connected as the person who signed in. You can only do what that person's role allows. A viewer can read. A member can change only their projects.

## Hosting and capacity funding

Use `get_funding_status` for current subscription coverage, credit funding and rates. Subscription coverage is used first; projects beyond it are paid from the owner's credits automatically at the plan's per-project rate ($9 without a plan; plan rates at https://lots.team/pricing), charged daily, with no consent switch: free credits first, then plan credits, then purchased credits. When credits run out, uncovered projects pause until the owner tops up; nothing is deleted. Give the returned `settings_url` when the owner needs to top up or choose a plan. Public pages remain readable when funding ends, but new publishing and paid operations need coverage. Paid AI actions use credits when requested.

## Connect

**MCP endpoint:** `https://api.lots.team/mcp`

Add it as a custom connector (Claude: Customize → Connectors → Add custom connector; ChatGPT: Plugins → Add → Create MCP App, OAuth). The person signs in with the email they use for LotsTeam. No key is pasted into the chat.

Clients that take a config file can use the same URL:

```json
{
  "mcpServers": {
    "lots-team": {
      "type": "http",
      "url": "https://api.lots.team/mcp"
    }
  }
}
```

In Claude Code: `claude mcp add --transport http lots-team https://api.lots.team/mcp`

## What is in the workspace

```
Organization
├── People (roles and project access)
└── Projects
    ├── Posts (requests, bugs, and ideas from the widget and public portal)
    ├── Tasks (the board, with comments)
    ├── Support messages (the inbox, with replies)
    └── Changelog (drafts and published updates)
```

Posts are the user-facing word for what the workspace stores as feedback. Call the post tools. A post's id is `post_id` in tool arguments. A post record's own id is `id`. A task that came from a post carries `post_id`.

The public portal can also show a board of tasks the team chose to share. That board is tasks with the public flag, not a separate planning product.

## What you can do

- Read the organization and its projects.
- List, read, create, and update posts. Comment on a post. Create a post to log a request the person heard outside the widget, such as on a sales call.
- List, create, and update tasks. Comment on a task. Link a post to a task.
- List support threads and reply on one.
- Draft, update, and publish changelog entries.
- List the people in the organization so you can assign a task to a real member.

Creating projects, inviting people, changing roles, branding, domains, the widget, and billing stay in the dashboard. Do not invent tools for those.

## How to work

1. Call `list_organizations`, then `list_projects`, before you write anything.
2. Read the record before you change it.
3. When a person asks you to turn a post into work, create or update the task and call `link_post_to_task`.
4. Before replying to support, call `get_contact_thread`.
5. Show the person a support reply before sending it. `reply_to_contact_message` emails the customer.
6. Publish a changelog only when the person asks you to publish it. If the entry is linked to a task with posts behind it, ask whether to email the people who asked (`notify_requesters`), then say how many were emailed.
7. Assign work only to a user id from `list_organization_members`.
8. If a tool returns a permission error, stop and say which action the account cannot take.

## Reference

- [references/TOOLS.md](references/TOOLS.md) — the 26 tools and their arguments
- [references/WORKFLOWS.md](references/WORKFLOWS.md) — posts, tasks, support, and changelog
