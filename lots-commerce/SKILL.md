---
name: lots-commerce
description: Run a LotsStore online store (products, stock, orders, customers, discounts, payments and domains) through its MCP server. Use when the user wants you to add or update products, check stock, handle orders, set up payments or report on sales for their store.
metadata:
  compatibility: Any compatible remote MCP client, including ChatGPT, Claude and coding agents
  author: lotstech
  version: "1.0"
  platform: lotsstore.app
  mcp_endpoint: https://api.lotsstore.app/mcp
---

# LotsStore

You run the user's online store in LotsStore: the catalog, stock, orders, customers, discount codes, payment methods and domain. LotsStore is the store and the record. You do the work under the user's instructions, and the user sees every change in the LotsStore dashboard.

## Connect

Use `https://api.lotsstore.app/mcp` as a remote MCP server and sign in with a Lots account. If these tools are not connected, give the user that URL and the steps for their client (setup for common agents: https://lotsstore.app/mcp). An API key from https://www.lotstech.com/api is the alternative for clients that need one; never ask the user to paste a key or password into chat.

For REST, read `https://api.lotsstore.app/docs.md`. Use the connected server's tool schemas over any fixed list. [Tools reference](references/TOOLS.md) and [workflow examples](references/WORKFLOWS.md) are supporting guides.

## Start every session

1. `list_stores`, then pick the store the user means. Each store is separate (an agency runs one per client); never carry products, customers or assumptions from one store to another.
2. `get_store` for that store: its address, status (draft, active, archived), country and currency, and your role.
3. Work within your role. Owner and admin: everything, including appearance, payments, domains and team. Manager and staff: catalog, stock and orders. Viewer: read only.

## Operate

- **Prices are in minor units of the store currency** (for example 2400 is $24.00 in a USD store, ₹24.00 in an INR store). The store currency follows its country and never changes; do not convert currencies.
- **Never invent facts.** Prices, stock, sizes, materials, shipping times and policies come from the user. Ask when you do not know.
- **Products start as drafts** unless you set `status: published`. A store is live only after `publish_store`; show the user the address before publishing.
- **Stock is per variant.** Read `list_inventory` (in stock, reserved by open orders, incoming, available) and set stock with `update_inventory`.
- **Orders need the seller.** New orders arrive as order requests (`list_checkout_orders`). Show the user the order, then `update_checkout_order` with `accept` or `reject` (and a `reason`). Rejecting an order paid online queues its refund.
- **UPI payments are claims.** The customer reports a UPI transaction reference; use `verify_payment` only after the user confirms the money arrived in their own bank or UPI app, or `payment_not_found` if it did not.
- **Fulfilment:** `operate_checkout_order` with `start_processing`, `fulfill`, `ship` (courier, tracking number and URL), `deliver`, `cancel`, or `manual_refund` (with a `reference`).
- **Every order action takes an `idempotency_key`.** Reuse the same key when retrying the same action.
- **Delete is for mistakes.** Deleting a product or category cannot be undone; archive a whole store with `archive_store` instead (restorable for 30 days). Confirm with the person first.

## Payments and money

LotsStore never holds money and takes 0% of sales. Customers pay the merchant directly: online through the merchant's own Stripe account (in the countries Stripe supports) or Razorpay account (for businesses registered in India), by UPI to the merchant's UPI ID, or by placing the order on WhatsApp. Razorpay: `start_payment_oauth` returns a Razorpay sign-in link for the owner to open. Stripe: the owner creates one restricted key (steps at https://lotsstore.app/help/connect-stripe) and pastes it on the store's Payments page; `connect_stripe` returns that page. Configure methods with `update_payment_settings`. Never ask for card details, bank passwords or payment keys in chat, and never accept a Stripe key pasted into chat: send the owner to the Payments page.

## Reports

`get_store_analytics` gives revenue, orders, average order value and the conversion funnel for a date range, compared with the previous period. `list_orders`, `list_customers` and `list_product_reviews` give the detail.

## Billing

Each store is capacity. A plan covers a number of stores; stores beyond it are paid from the owner's LotsTech Credits automatically, charged daily at the plan's rate, or at the pay-as-you-go rate without a plan. New accounts get free credits to start. Use `get_billing` for the current plan, coverage, balance and rates; do not quote prices from memory. `create_store` needs room on a plan or credits; check `get_billing` first. When a store is not funded, its storefront stays readable, new checkouts pause, and changes return `FUNDING_REQUIRED` with a billing link; accepting, fulfilling and refunding existing orders still works and nothing is deleted. `create_checkout` returns a link the user opens to pay or add credits in their browser; a return to the site does not prove payment, so check `get_billing` again. The user's AI provider bills its own AI usage.
