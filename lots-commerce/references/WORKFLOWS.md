# LotsCommerce workflows

## Open a store
1. `get_billing`. If there is no plan slot and too few credits, offer `create_checkout` and wait until the user has paid.
2. Ask for the store name and the country it sells from (it sets the currency for good).
3. `create_store`, then share the address it returns. It is a draft.
4. Add products (below), then `update_storefront_settings` for logo, colours and policies the user gives you.
5. Show the user the address and ask before `publish_store`.

## Add products from a list
1. Ask for what you do not have: price, sizes or colours, stock, photos, category.
2. One product: `add_product` with its variants and prices in minor units. Many: `bulk_add_products` in batches of up to 100.
3. Report what you added and what is still a draft. Publish only the ones the user confirms.

## Handle today's orders
1. `list_checkout_orders` with `acceptance_status: awaiting_confirmation`.
2. For each: show the items, total, payment method and payment state.
3. Online payment verified: ask, then `update_checkout_order` `accept`.
4. UPI claimed: ask the user to check their bank or UPI app for the reference; then `verify_payment` and `accept`, or `payment_not_found`.
5. WhatsApp order: the user settles with the customer directly; record it with `record_offline_payment` if paid, then `accept` or `reject`.
6. When packed: `operate_checkout_order` `fulfill`, then `ship` with courier and tracking, then `deliver`.

## Out of stock
1. `list_inventory`, find the variant, `update_inventory` to 0.
2. If the user wants, `list_checkout_orders` to see open orders that include it, and help them contact those customers with their own tools.

## Run a discount
1. Ask for the code, percentage or fixed amount, and any usage limit or end date.
2. `create_promotion` as `draft`, show it to the user, then `update_promotion` to `active`.

## Connect a domain
1. `add_custom_domain` and give the user the CNAME record (name and value) to add at their DNS provider.
2. Later, `verify_custom_domain`: it says whether DNS is in place, the certificate is being issued, or the store is live on the domain.
