# LotsInvoice tools

Every tool is also a REST endpoint under `https://api.lotsinvoice.com/api/v1/lotsinvoice`. Money inputs are decimal strings; outputs are minor units plus `display` strings.

## Businesses and settings

| Tool | REST | What it does |
|---|---|---|
| `list_businesses` | `GET /businesses` | List the businesses you can invoice from, with your role, settings and whether the sender email is confirmed. |
| `create_business` | `POST /businesses` | Create a business (the entity that sends invoices). |
| `get_business` | `GET /businesses/:business_id` | Get one business with its settings and what is still missing (next_steps). |
| `update_business` | `PATCH /businesses/:business_id` | Update business details. |
| `archive_business` | `POST /businesses/:business_id/archive` | Archive a business: billing for it stops, nothing is deleted, sent links keep working. |
| `restore_business` | `POST /businesses/:business_id/restore` | Restore an archived business (needs plan room or credits). |
| `resend_email_confirmation` | `POST /businesses/:business_id/confirm-email` | Send the business email confirmation link again. |
| `get_settings` | `GET /businesses/:business_id/settings` | Numbering, titles, defaults, payment options, reminders, layout (columns, custom fields, blocks, labels), theme and signature. |
| `update_settings` | `PATCH /businesses/:business_id/settings` | Change settings. |
| `set_payment_options` | `PUT /businesses/:business_id/payment-options` | How customers pay, shown on invoices, emails and the portal: a pay link (Stripe Payment Link, PayPal, Venmo, Cash App, Square), bank details, Zelle, check address, instructions. |
| `set_next_number` | `POST /businesses/:business_id/numbering` | Set the next document number (only forward), e.g. |
| `apply_preset` | `POST /businesses/:business_id/preset` | Set up columns, labels, titles, tax groups and declarations for a region: us_freelancer, us_sales_tax, eu_vat, uk_vat, india_gst, india_export_lut. |
| `set_theme` | `PATCH /businesses/:business_id/theme` | Change the default template and look: template, color, accent, font (inter, plex, serif, mono), density (compact, normal, comfortable), logo_position, logo_size, paper (letter, a4), accent_style (bar, band, none). |
| `upload_image` | `POST /businesses/:business_id/images` | Upload the logo or a signature image (PNG, JPEG, WebP or GIF, 1 MB max, base64) and save it on the business. |

## Team

| Tool | REST | What it does |
|---|---|---|
| `list_members` | `GET /businesses/:business_id/members` | People with access to this business, and pending invitations (owner). |
| `invite_member` | `POST /businesses/:business_id/invitations` | Invite someone (a partner, bookkeeper) as editor or viewer. |
| `accept_invitation` | `POST /invitations/accept` | Accept an invitation with the token from its link (signed in with the invited email). |
| `update_member` | `PATCH /businesses/:business_id/members/:user_id` | Change a member's role or remove them (remove: true). |
| `cancel_invitation` | `DELETE /businesses/:business_id/invitations/:invitation_id` | Cancel a pending invitation. |
| `leave_business` | `POST /businesses/:business_id/leave` | Leave a business you were invited to. |

## Billing

| Tool | REST | What it does |
|---|---|---|
| `get_billing` | `GET /billing` | Your LotsInvoice plan or credits, businesses in use, rates and plans to choose from. |
| `create_checkout` | `POST /billing/checkout` | A checkout link for a plan (starter, pro, business; monthly or annual) or a credits top-up (amount_usd, minimum 10). |

## Customers

| Tool | REST | What it does |
|---|---|---|
| `list_customers` | `GET /businesses/:business_id/customers` | List or search customers (name, contact, email). |
| `create_customer` | `POST /businesses/:business_id/customers` | Add a customer. |
| `get_customer` | `GET /businesses/:business_id/customers/:customer_id` | One customer with open balance, available credit and recent documents. |
| `update_customer` | `PATCH /businesses/:business_id/customers/:customer_id` | Update a customer. |
| `archive_customer` | `POST /businesses/:business_id/customers/:customer_id/archive` | Archive (or restore: true) a customer. |
| `import_customer_from_crm` | `POST /businesses/:business_id/customers/from-crm` | Add a customer from a LotsCRM contact you can read (name, email, phone, primary company). |
| `import_customers` | `POST /businesses/:business_id/customers/import` | Import customers from CSV text (header row first; up to 1,000 rows). |
| `get_portal_link` | `GET /businesses/:business_id/customers/:customer_id/portal-link` | The customer's portal link (view and download documents, pay, accept estimates), optionally to one document. |
| `rotate_portal_link` | `POST /businesses/:business_id/customers/:customer_id/portal-link/rotate` | Revoke every earlier portal link for this customer and make a new one. |
| `get_statement` | `GET /businesses/:business_id/customers/:customer_id/statement` | A customer statement: opening balance, invoices, credit notes, payments and closing balance per currency. |

## Items, taxes, declarations

| Tool | REST | What it does |
|---|---|---|
| `list_items` | `GET /businesses/:business_id/items` | Saved products and services. |
| `create_item` | `POST /businesses/:business_id/items` | Save a product or service with its price, code (SKU, HSN/SAC), unit and default tax. |
| `update_item` | `PATCH /businesses/:business_id/items/:item_id` | Update or archive (archived: true) an item. |
| `import_items` | `POST /businesses/:business_id/items/import` | Import items from CSV (name, description, code/SKU/HSN, unit, price). |
| `list_taxes` | `GET /businesses/:business_id/taxes` | Saved taxes. |
| `create_tax` | `POST /businesses/:business_id/taxes` | Save a tax from rates the owner gives you (never guess a rate): one component (name + rate) or several (components), e.g. |
| `update_tax` | `PATCH /businesses/:business_id/taxes/:tax_id` | Rename, change components, or archive (archived: true). |
| `list_declarations` | `GET /businesses/:business_id/declarations` | Saved declarations (fixed statements printed on documents). |
| `create_declaration` | `POST /businesses/:business_id/declarations` | Save a statement to print on documents, e.g. |
| `update_declaration` | `PATCH /businesses/:business_id/declarations/:declaration_id` | Update or archive a declaration. |

## Documents

| Tool | REST | What it does |
|---|---|---|
| `list_documents` | `GET /businesses/:business_id/documents` | List invoices, estimates and credit notes. |
| `create_invoice` | `POST /businesses/:business_id/invoices` | Draft an invoice. |
| `create_estimate` | `POST /businesses/:business_id/estimates` | Draft an estimate (quote). |
| `create_credit_note` | `POST /businesses/:business_id/credit-notes` | Draft a credit note. |
| `get_document` | `GET /businesses/:business_id/documents/:document_id` | One document with lines, totals, versions, payments and activity (viewed, reminders, portal notes). |
| `update_document` | `PATCH /businesses/:business_id/documents/:document_id` | Edit a draft (any document field; lines replaces all lines). |
| `delete_draft` | `DELETE /businesses/:business_id/documents/:document_id` | Delete a draft that was never sent. |
| `duplicate_document` | `POST /businesses/:business_id/documents/:document_id/duplicate` | Copy a document into a new draft, optionally for another customer or as another type. |
| `send_document` | `POST /businesses/:business_id/documents/:document_id/send` | Email the document with its PDF and portal link (from LotsInvoice, replies go to the business). |
| `mark_document_sent` | `POST /businesses/:business_id/documents/:document_id/mark-sent` | Issue a draft without emailing it (you delivered it yourself): assigns the number and locks it. |
| `revise_document` | `POST /businesses/:business_id/documents/:document_id/revise` | Change a sent invoice or estimate: a new locked version with a reason (the number stays). |
| `void_document` | `POST /businesses/:business_id/documents/:document_id/void` | Void a sent invoice or credit note (keeps its number). |
| `convert_estimate` | `POST /businesses/:business_id/documents/:document_id/convert` | Turn an estimate into a draft invoice. |
| `get_document_pdf` | `GET /businesses/:business_id/documents/:document_id/pdf` | A download link (valid 1 hour) for the PDF. |
| `get_document_preview` | `GET /businesses/:business_id/documents/:document_id/preview` | A preview link (HTML, valid 1 hour), or the HTML itself with include_html. |
| `send_reminder` | `POST /businesses/:business_id/documents/:document_id/remind` | Email a payment reminder now for a sent, unpaid invoice. |

## Payments

| Tool | REST | What it does |
|---|---|---|
| `record_payment` | `POST /businesses/:business_id/documents/:document_id/payments` | Record money received for an invoice (partial allowed). |
| `delete_payment` | `DELETE /businesses/:business_id/payments/:payment_id` | Remove a recorded payment (kept for history, no longer counted). |
| `apply_credit` | `POST /businesses/:business_id/documents/:document_id/apply-credit` | Apply the customer's available credit (overpayments, credit notes) to an invoice. |
| `list_payments` | `GET /businesses/:business_id/payments` | Recorded payments, newest first. |

## Recurring

| Tool | REST | What it does |
|---|---|---|
| `list_recurring` | `GET /businesses/:business_id/recurring` | Recurring invoices and their next dates. |
| `create_recurring` | `POST /businesses/:business_id/recurring` | Repeat an invoice on a schedule (document_id), e.g. |
| `update_recurring` | `PATCH /businesses/:business_id/recurring/:recurring_id` | Change a recurring invoice (name, mode, end_date, max_count, next_date, template). |
| `pause_recurring` | `POST /businesses/:business_id/recurring/:recurring_id/pause` | Pause a recurring invoice. |
| `resume_recurring` | `POST /businesses/:business_id/recurring/:recurring_id/resume` | Resume a recurring invoice. |

## Templates

| Tool | REST | What it does |
|---|---|---|
| `list_templates` | `GET /businesses/:business_id/templates` | Built-in designs, custom templates and regional presets. |
| `get_template_guide` | `GET /template-guide` | How to write a custom template: the safe template language, every data path, an example view and the built-in layout source to start from. |
| `check_template` | `POST /businesses/:business_id/templates/check` | Check a template (html body + css) without saving: forbidden content, unknown placeholders, missing required data, and warnings. |
| `preview_template` | `POST /businesses/:business_id/templates/preview` | Render a template (template key, or unsaved html/css) with sample data at 1 to 200 lines; returns HTML. |
| `create_template` | `POST /businesses/:business_id/templates` | Save a custom template after it passes check_template. |
| `update_template` | `PATCH /businesses/:business_id/templates/:template_id` | Update (re-checked) or archive a custom template. |

## Reports

| Tool | REST | What it does |
|---|---|---|
| `get_summary` | `GET /businesses/:business_id/summary` | What needs attention: unpaid and overdue invoices, money received this month, drafts, open estimates and upcoming recurring invoices. |
| `get_aging_report` | `GET /businesses/:business_id/reports/aging` | Money owed by age (current, 1-30, 31-60, 61-90, 90+ days), per currency and customer. |
| `get_revenue_report` | `GET /businesses/:business_id/reports/revenue` | Revenue (excluding tax) by month and by customer, per currency. |
| `get_tax_report` | `GET /businesses/:business_id/reports/tax` | Tax charged by tax and rate, per currency (invoices minus credit notes). |
| `get_payments_report` | `GET /businesses/:business_id/reports/payments` | Payments received by method, per currency. |
| `export_business` | `GET /businesses/:business_id/export` | Everything about the business as JSON, with PDF links valid 7 days. |
