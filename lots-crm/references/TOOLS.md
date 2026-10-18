# LotsCRM MCP Tools Reference

All tools are on `https://api.lotscrm.com/mcp`. The live list, with current descriptions, is at https://api.lotscrm.com/tools.json; the connected server's schema is the authority for parameters. Most tools need `workspace_id`.

## Briefings and search

| Tool | Use it to |
|------|-----------|
| `get_crm_briefing` | Start here: workspace, your role, business context (public facts and private guidance, labelled), pipeline setup and sales priorities |
| `get_sales_brief` | Today's sales priorities with the workspace business context |
| `get_deal_brief` | Prepare for a call: deal, stage, company, contacts, recent activity, open follow-ups and contact restrictions |
| `get_pipeline_summary` | Deal counts, value and weighted value per stage and currency |
| `search_crm` | Find contacts, companies and deals in one workspace (`q`) |
| `get_timeline` | Recent activities for a contact, company or deal |
| `prepare_follow_up` | Grounded context and safety rules for drafting a follow-up on a deal (`deal_id`); `can_contact: false` blocks opted-out or do-not-contact contacts |

## Contacts and companies

| Tool | Notes |
|------|-------|
| `list_contacts`, `get_contact` | Filter by lead status, owner and search text |
| `create_contact` | Needs `idempotency_key`; consent, source and optional company |
| `update_contact` | Only sent fields change; `custom_fields` merges |
| `archive_contact` | Recoverable; history stays |
| `bulk_upsert_prospects` | 1 to 100 rows, deduplicated by email, with source, source_url, tags and company_name; needs `idempotency_key` |
| `list_companies`, `get_company` | A company comes with its contacts and active deals |
| `create_company`, `update_company`, `archive_company` | Same rules as contacts |

## Deals and pipelines

| Tool | Notes |
|------|-------|
| `list_deals`, `get_deal` | Filter by pipeline, stage, status, owner or search text; a deal includes its stage history and `version` |
| `create_deal` | Needs `idempotency_key`, a pipeline and a stage |
| `update_deal` | Needs `expected_version`; not for stage changes |
| `move_deal` | Needs `expected_version`; lost stages need `lost_reason` |
| `archive_deal` | Needs `expected_version`; recoverable |
| `list_pipelines`, `create_pipeline` | Pipelines with ordered open, won and lost stages; creating one needs owner or admin |

## Activities and follow-ups

| Tool | Notes |
|------|-------|
| `record_activity` | Log a call, meeting, email, message or note that already happened; never sends |
| `list_follow_ups` | Due, overdue, completed or assigned follow-ups (open work by default) |
| `create_follow_up`, `update_follow_up` | Schedule, reschedule, reassign, complete or reopen; never sends |

## Workspaces and team

| Tool | Notes |
|------|-------|
| `list_workspaces`, `get_workspace` | Workspaces you can access, and your role |
| `create_workspace` | Without `organization_id` it also creates the organization and a default six-stage pipeline; needs `idempotency_key` |
| `update_workspace` | Owner or admin |
| `list_members` | People in the workspace (active and suspended), with email, name and role |
| `invite_member` | Invite anyone by email, with or without a Lots account; they accept from the email link with that email. Owner or admin. Teammates are unlimited |
| `list_invitations`, `resend_invitation`, `cancel_invitation` | Pending invitations; resend sends a fresh 7-day link (wait a minute between sends); cancel stops the link. Owner or admin |
| `accept_invitation` | Accept with the token from the email link, as the invited email |
| `add_member` | Add someone who already has a Lots account at once (no accept step); they get an email saying so. Owner or admin |
| `update_member` | Change a role, or suspend and reactivate. Owner or admin |
| `remove_member` | Take someone out of the workspace; their records stay. Owner or admin |
| `leave_workspace` | Leave a workspace you were invited to |
| `archive_workspace` | Owner only. Archive a workspace you no longer need; it stops counting toward your plan from the next daily charge. Nobody can open it until it is restored; nothing is deleted. `confirm_name` is the workspace name. Confirm with the user first |
| `restore_workspace` | Owner only, within 30 days of archiving. Needs a plan or credits that cover it again. `list_workspaces` with `archived: true` lists archived workspaces and their `restore_until` |

Nobody can be given the owner role by an invitation or a role change, and the owner cannot be removed or leave their own workspace.

## Account and billing

| Tool | Notes |
|------|-------|
| `get_profile` | The signed-in Lots account |
| `get_billing` | Plan, workspace coverage, credit balance and exact rates |
| `create_checkout` | A plan (`plan` and `cycle`) or credits (`amount_usd`, 10 to 1000) checkout link for the user to open |
