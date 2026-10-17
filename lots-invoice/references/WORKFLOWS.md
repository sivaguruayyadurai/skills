# LotsInvoice workflows

## First invoice in one message
User: "Invoice Acme for 12 hours of design at $90, net 15."
1. `list_businesses` → pick the business. If none, ask for the business name, address and email, then `create_business`.
2. `list_customers` with `search: "Acme"`. If missing, ask for the billing email and address, then `create_customer`.
3. `create_invoice` with `lines: [{name: "Design", quantity: "12", unit_price: "90.00"}]` and `due_date` 15 days after today (or rely on the customer's terms).
4. Tell the user the total from `document.display.total` and who it goes to. Ask: "Send it?"
5. On yes: `send_document`. Report the number and that the customer got an email with the PDF and a link.

## Who owes me money?
1. `get_summary` → unpaid totals and the overdue list.
2. For detail, `get_aging_report`; for one customer, `get_statement`.
3. Offer to chase: `send_reminder` per invoice the user picks.

## Record a payment
"Acme paid $500 by ACH today": `list_documents` with `customer_id` and `status: "sent,viewed,partially_paid,overdue"`, then `record_payment` with `amount: "500.00"`, `method: "ach"`. Report the new balance.

## Quote, then invoice
1. `create_estimate`, show totals, `send_document` after a yes.
2. When the customer accepts in the portal (status `accepted`) or the user says so: `convert_estimate` → a draft invoice. Show it, then send.

## Monthly retainer
1. Create the first invoice with a line like `Retainer for {period}`.
2. `create_recurring` with `document_id`, `interval_unit: "month"`, `start_date`, `mode: "draft"` (the user reviews each one) or `"send"` (automatic).

## Indian GST tax invoice
1. `apply_preset` `india_gst` with `tax_rates` the owner confirms (for example `[18]`): creates "GST 18% (intra-state)" (CGST 9 + SGST 9) and "GST 18% (inter-state)" (IGST 18), shows HSN/SAC codes and the HSN/SAC summary, and writes amounts in lakh/crore.
2. Business `registration_ids`: GSTIN and PAN. Each customer: GSTIN and `place_of_supply` (for example "Tamil Nadu (33)").
3. Lines with `code` (HSN or SAC) and the intra-state or inter-state tax depending on the place of supply.

## Export of services under LUT (India)
`create_declaration` with the LUT wording and ARN; then `create_invoice` in the client's currency with `treatment: "zero_rated"` lines, `declaration_ids`, `place_of_supply: "Outside India"` and `second_currency: {currency: "INR", rate, date}` from the rate the owner gives.

## Fix a sent invoice
- Not paid yet: `revise_document` with the change and a `reason`, then `send_document` again if the customer should see it.
- Paid or partly paid: `create_credit_note` with `invoice_id`.
- Sent by mistake: `void_document` with a reason (only when no payment is recorded).

## Design an invoice template
1. `get_template_guide`: the language, every data path and the built-in layout source.
2. Write `html` (body only) and `css`; `check_template` until there are no errors.
3. `preview_template` with `lines: 25`; show the user.
4. `create_template`, then `set_theme` with `template: "custom:<id>"` or pass `template` on one invoice.
