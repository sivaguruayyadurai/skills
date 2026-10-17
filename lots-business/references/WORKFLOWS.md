# LotsBusiness Common Workflows

## 1. List a business (free)

```
1. search_businesses(q=name, city)                 -> it may already be listed; then claim_business
2. create_business(name, business_type, category, city, country, phone, website_url)
3. autofill_business_from_url(business_id)          -> only what the business's own site states
4. get_business_completeness(business_id)           -> ask the owner only for what is missing
5. set_business_hours / set_business_services / set_business_links / add_business_media
```

## 2. Website from a kit

```
1. get_billing                                       -> is the business paid? if not, explain and create_checkout
2. activate_business(business_id)                    -> after the owner agrees
3. suggest_site_kit(business_id)
4. create_site(business_id, from_kit, theme)         -> first version with a preview_url
5. Send the owner the preview_url; apply changes with edit_site_texts or update_site_theme
6. publish_site(site_id)                             -> only after the owner approves
```

## 3. Custom website written by you

```
1. get_site_guide                                    -> markers, editable regions, quality bar
2. create_site(business_id)
3. upload_site_image(site_id, image_url)             -> blob ids for images
4. create_site_version(site_id, files=[...], message) -> check result and preview_url
5. Fix every check error, save again, share the preview, publish after approval
```

## 4. Own domain and business email

```
1. connect_site_domain(site_id, hostname="www.example.com")   -> the DNS record to add
2. The owner adds it at their registrar
3. get_site_domain_status(site_id)                             -> wait for active
4. setup_business_email(business_id)                           -> TXT, MX, SPF, DKIM, DMARC records
5. verify_business_email(business_id) after the owner adds them; mailboxes are managed in LotsMail
```

## 5. Google Business Profile

```
1. start_google_business_oauth(business_id)          -> the owner connects Google in their browser
2. get_google_business_connection_status             -> an existing profile? link_google_business_location instead
3. prepare_google_business_profile(business_id)      -> show the owner the exact payload
4. create_google_business_profile(...)               -> after approval
5. get_google_business_verification_options          -> offer what Google offers; never promise the result
6. create_google_business_post(business_id, summary, image_url or call_to_action)   -> after the owner approves the text
```

## 6. Local directories

```
1. list_business_directories(business_id)            -> audited directories for its country and trade
2. get_listing_pack(business_id)                     -> the same facts for every directory; fix anything in `missing` first
3. The owner or agency submits on each directory's site
4. record_directory_submission(business_id, directory_id, status, listing_url)
```

## 7. Agency: build for a client, then hand it over

```
1. create_workspace(name="Acme Agency")
2. invite_workspace_member(workspace_id, email, role="manager")   for the team
3. create_business(..., workspace_id) and build its site as in workflow 2 or 3
4. create_approval_link(business_id, scope="all")                 -> the client approves without an account
5. start_business_handover(business_id)                            -> the client accepts into their own workspace and pays from then on
```
