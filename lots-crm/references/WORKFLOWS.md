# LotsCRM Common Workflows

## 1. Start of a session

```
1. list_workspaces                      -> choose the workspace the user means
2. get_crm_briefing(workspace_id)       -> role, pipeline, priorities, business context
3. Tell the user what needs attention (overdue follow-ups, stalled deals) before doing new work
```

## 2. Add a lead from a conversation

```
1. search_crm(workspace_id, q=email or company name)   -> avoid duplicates
2. create_company(..., idempotency_key="company:example.com")   if it is new
3. create_contact(..., company_id, source, consent, idempotency_key="contact:jane@example.com")
4. record_activity(workspace_id, activity_type="meeting", subject, body, contact_id, idempotency_key)
5. create_follow_up(workspace_id, subject, due_at, contact_id, idempotency_key)
```

## 3. Import a prospect list

```
1. Split the list into batches of up to 100 rows, each row with email, name, company_name, source_url and tags
2. bulk_upsert_prospects(workspace_id, source, prospects=[...], idempotency_key="import:<file>:<batch number>")
3. Report created, updated and failed rows; fix and resend only the failed rows with a new key
```

## 4. Move a deal after a call

```
1. get_deal(workspace_id, deal_id)                         -> note version and current stage
2. record_activity(... deal_id, activity_type="call", ...)
3. move_deal(workspace_id, deal_id, stage_id, expected_version)   (lost stages need lost_reason)
4. On a version conflict: get_deal again, show the user what changed, then retry with the new version
```

## 5. Draft a follow-up email

```
1. prepare_follow_up(workspace_id, deal_id)
2. If can_contact is false: stop and tell the user the record is opted out or do not contact
3. Draft from the CRM history and the public business facts only; never quote private guidance
4. The user sends it with their own email tool; then record_activity(activity_type="email", ...)
```

## 6. Weekly pipeline report

```
1. get_pipeline_summary(workspace_id)   -> per stage and currency; never add currencies together
2. get_sales_brief(workspace_id)        -> priorities
3. list_follow_ups(workspace_id)        -> overdue and due this week
4. Report facts from these results only; no forecasts the data does not support
```

## 7. Billing questions

```
1. get_billing                         -> plan, coverage, balance, exact rates
2. To change plan or add credits: create_checkout, give the user the link
3. After they pay: get_billing again; a return to the site is not proof of payment
```
