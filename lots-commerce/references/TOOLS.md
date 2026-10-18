# LotsCommerce tools

Read the live list and schemas from the connected server (also published without sign-in at https://api.lotscommerce.com/tools.json). This page groups them by job.

## Stores and storefront
- `list_stores`, `get_store`: the stores you can access, with address, status, country, currency and your role.
- `create_store`: a new store (needs a plan slot or credits; country sets the currency).
- `update_store`: name, description, settings; `status: archived` stops billing and takes the storefront offline, `draft` or `active` restores it.
- `publish_store`: put the storefront live.
- `update_storefront_settings`: theme template (minimal, editorial, catalog, boutique, marketplace), content, navigation, policies and SEO; `operation` is `save_draft`, `publish` or `reset_draft`.
- `list_store_activity`: recent changes in the store.

## Products and catalog
- `list_products`, `get_product`, `add_product`, `bulk_add_products` (up to 100), `update_product`, `delete_product`.
- `add_product_variant`, `update_product_variant`, `delete_product_variant`: variants with options, prices (minor units), SKU, barcode, weight and dimensions.
- `list_categories`, `create_category`, `update_category`, `delete_category`: nested categories with display order.
- `list_collections`, `create_collection`, `update_collection`, `delete_collection`.

## Inventory
- `list_inventory`: stock per variant (in stock, reserved, incoming, available).
- `update_inventory`: set a variant's stock.

## Orders
- `list_checkout_orders`, `get_checkout_order`: order requests with payment and acceptance states.
- `update_checkout_order`: `verify_payment`, `payment_not_found`, `record_offline_payment`, `accept`, `reject` (with `reason`).
- `operate_checkout_order`: `start_processing`, `fulfill`, `ship`, `deliver`, `cancel`, `manual_refund`.
- `list_orders`, `get_order`: confirmed orders with items, totals, customer, addresses, payment and fulfilment.

## Customers and reviews
- `list_customers`, `get_customer`.
- `list_product_reviews`, `moderate_product_review`, `reply_product_review`.

## Discounts
- `list_promotions`, `create_promotion` (code, `percentage` or `fixed`, value, optional usage limit), `update_promotion`, `delete_promotion`.

## Payments
- `get_payment_settings`, `update_payment_settings`: checkout on or off, test or live, methods (online payments, UPI, WhatsApp) and automatic acceptance of verified payments.
- `start_payment_oauth`, `start_razorpay_onboarding`, `connect_razorpay`: connect the merchant's own Razorpay account.

## Shipping and taxes
- `get_shipping_settings`, `update_shipping_settings`: origin, zones, pickup and manual delivery rates.
- `get_tax_settings`, `update_tax_settings`.

## Domains
- `list_custom_domains`, `add_custom_domain` (returns one CNAME to customers.lotscommerce.com), `verify_custom_domain`, `delete_custom_domain`.

## Team
- `list_store_members`, `add_store_member`, `update_store_member`, `remove_store_member` (roles: admin, manager, staff, viewer).

## Analytics and billing
- `get_store_analytics`: revenue, orders, average order value, funnel, daily history, compared with the previous period.
- `get_billing`, `create_checkout`: plan, coverage, credits; checkout links for plans and credits.
