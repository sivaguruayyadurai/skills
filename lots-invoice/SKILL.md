---
name: lots-invoice
description: Create, send, track and chase invoices, estimates and credit notes in LotsInvoice through its MCP server. Use when the user wants to bill a client, send a quote, record a payment, see who owes money, send reminders, set up a monthly retainer, change how their invoices look (columns, codes, taxes, templates), or get invoicing reports.
metadata:
  compatibility: Any compatible remote MCP client, including ChatGPT, Claude and coding agents
  author: lotstech
  version: "1.0"
  platform: lotsinvoice.com
  mcp_endpoint: https://api.lotsinvoice.com/mcp
---

# LotsInvoice

LotsInvoice gets the user paid from the agent they already use. You create and send invoices, estimates and credit notes, record payments, chase late invoices and report what is owed. LotsInvoice calculates every total exactly, numbers and locks documents when they are sent, renders the PDF, emails it, runs the client portal and the reminders. The user can do all of it in the dashboard at https://lotsinvoice.com/app too.

## Connect

Use `https://api.lotsinvoice.com/mcp` as a remote MCP server and sign in with a Lots account. An API key from https://www.lotstech.com/api works for clients that need one; never ask for a key or password in chat. REST: `https://api.lotsinvoice.com/docs.md`. Trust the connected server's tool schemas over any list here. [Tools](references/TOOLS.md) · [Workflows](references/WORKFLOWS.md).

## Start every session

1. `list_businesses`. Work in one `business_id` at a time; a user can own several businesses and each invoices separately. If there is none, `create_business` with details the user gives you.
2. `get_summary` shows what needs attention: unpaid and overdue invoices, drafts, open estimates, upcoming recurring invoices.

## Rules that matter

- **Never invent facts.** Ask for missing customer details, addresses, tax IDs (GSTIN, VAT, EIN), tax rates and payment details. Never guess a tax rate; create taxes only from rates the user gives (`create_tax`, or `apply_preset` with `tax_rates`).
- **Show totals and ask before sending.** Drafts are free to change. `send_document` emails the customer and locks the document with its number. Read the totals from the API response (`display.total`) to the user first.
- **Money in, money out.** Give amounts as decimal strings in the document currency (`"1250.00"`). Responses carry integer minor units (cents) and formatted strings in `display`; quote the formatted ones.
- **Sent documents are locked.** Change one with `revise_document` and a reason (it keeps the number and adds a version), void it with a reason, or issue a credit note. Paid invoices are corrected with a credit note.
- **LotsInvoice never moves money.** Customers pay with the business's own options (a pay link such as a Stripe Payment Link or PayPal, bank details, Zelle, check), shown on the invoice and the portal. When money arrives, `record_payment`. A customer pressing "I've sent payment" only notifies the owner.
- Use an `idempotency_key` on create and payment calls you might retry.
- Not tax or legal advice: presets are a starting point; tell the user to check layout and wording with their accountant.

## Make invoices fit the business

Invoices are fully configurable, so match what the user's clients or accountant expect:
- `apply_preset` sets columns, labels, titles and tax groups for a region (`us_freelancer`, `us_sales_tax`, `eu_vat`, `uk_vat`, `india_gst`, `india_export_lut`).
- Lines carry a **code** (SKU, HSN/SAC, GL or account code), unit, quantity up to 4 decimals, line discount, any number of tax components (CGST + SGST, State + County, compound, inclusive) or a treatment (exempt, zero-rated, out of scope, with a reason). Use `heading` and `text` lines for sections and notes.
- `update_settings` controls columns (rename, reorder, hide, custom columns), custom fields, which blocks show (tax summary, amount in words, signature), labels, numbering and titles ("Tax Invoice", "Quote").
- Declarations (`create_declaration`) print fixed statements such as an export or reverse-charge note. `second_currency` shows the total in another currency at a stated rate.
- Nine designs (`set_theme`: classic, modern, studio, executive, ledger, minimal, bold, compact, formal; ledger is the full-page grid Indian tax invoice), a signature and company seal (`upload_image` with `kind` `signature` or `stamp`), or write a template: `get_template_guide`, then `check_template`, `preview_template`, show the user, then `create_template`.

## Get paid

- `send_document`, then `get_document` shows `viewed` when the customer opens the portal link.
- Reminders go out on the business's schedule and stop when paid; `send_reminder` sends one now.
- `create_recurring` from an invoice repeats it (a monthly retainer can say "for {period}").
- Reports: `get_aging_report`, `get_revenue_report`, `get_tax_report`, `get_payments_report`, `get_statement` (add `format: "csv"` for a spreadsheet).

## What you cannot do

Billing for LotsInvoice itself is the owner's: `get_billing` explains it and `create_checkout` returns a link for them to pay in their browser. Do not ask for card details. Confirming the business email happens by a link in the owner's inbox.
