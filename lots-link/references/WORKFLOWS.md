# LotsLink Common Workflows

Practical workflow examples for AI agents working on lots.link.

---

## 1. Session Start: Orienting Yourself

Always do this at the start of a session:

```
1. lotslink_list_workspaces
   → Get workspace_id and your role

2. lotslink_list_projects(workspace_id)
   → Know available projects for link organization

3. lotslink_get_workspace(workspace_id)
   → Check workspace details and your role; links are free and unlimited (up to 1,000 new links per person in any 24 hours)
```

---

## 2. Create Campaign Links with UTM Tracking

**Scenario:** Create tracked short links for a marketing campaign.

```
1. lotslink_list_projects(workspace_id)
   → Find or create the project for this campaign

2. [If no matching project:]
   lotslink_create_project(workspace_id, name="Spring Launch 2026", color="#22c55e")
   → Get project_id

3. For each destination URL in the campaign:
   lotslink_create_link(
     workspace_id,
     original_url="https://lots.team/pricing",
     custom_slug="spring-launch-pricing",    // optional, memorable slug
     project_id,
     utm_source="newsletter",
     utm_medium="email",
     utm_campaign="spring_launch_2026",
     utm_content="pricing_cta"              // for A/B variant tracking
   )
   → Get link_id and short URL

4. Repeat for each URL (homepage, blog post, product page, etc.)

5. lotslink_list_links(workspace_id, project_id)
   → Confirm all campaign links are created
```

---

## 2a. QR Code for an Event or Print Campaign

**Scenario:** The user wants a QR code for a flyer, poster or event page.

```
1. lotslink_create_link(workspace_id, original_url="https://example.com/event", utm_medium="qr", utm_source="poster")
   → Get link_id and short_url

2. lotslink_create_qr_code(workspace_id, link_id, size=1024)
   → Get qr_code_url (PNG). Optional foreground_color / background_color in hex; keep strong contrast.

3. Give the user qr_code_url and the short URL. Scans open the short URL, so they appear in
   lotslink_get_link_analytics for that link. Changing the link's slug later breaks printed codes.
```

## 2b. Point a Printed QR Code Somewhere New

**Scenario:** The flyer is printed, and the page it should open has changed.

```
1. lotslink_list_links(workspace_id, search="event")
   → Find the link behind the printed code (link_id, current original_url)

2. Confirm the new page with the user, then:
   lotslink_update_link(workspace_id, link_id, original_url="https://example.com/event-2027")
   → Same slug, short URL and QR code; within a minute every scan opens the new page

3. lotslink_get_link(workspace_id, link_id)
   → destination_changes shows when it changed; clicks before and after stay on the link
```

---

## 3. Analytics Report for a Campaign

**Scenario:** Report on link performance for a campaign project.

```
1. lotslink_list_links(workspace_id, project_id="<campaign_project_id>")
   → Get all link_ids for this campaign

2. For each link:
   lotslink_get_link_analytics(workspace_id, link_id, days=30)
   → Get: recorded clicks, geo breakdown, device breakdown, referrers, daily timeline

3. lotslink_get_workspace_analytics(workspace_id, days=30)
   → Get top-performing links overall

4. Summarize:
   - Total campaign clicks
   - Best performing link + percentage of total
   - Top countries
   - Mobile vs desktop split
   - Day-over-day trend
   - Recommendations for next campaign

5. [Optionally export raw data:]
   lotslink_export_analytics(workspace_id, link_id=null, format="csv")
   → Full click data export for all workspace links
```

---

## 4. Bulk Link Management

**Scenario:** A campaign has ended; deactivate all its links.

```
1. lotslink_list_links(workspace_id, project_id="<campaign_project_id>", status="active")
   → Get all active links for the project

2. Extract link_ids from the response

3. lotslink_bulk_deactivate_links(workspace_id, link_ids=["<id1>", "<id2>", ...])
   → Deactivate all at once (Owner/Admin any link; members only their own, the rest come back in `failed`)

4. lotslink_list_links(workspace_id, project_id, status="inactive")
   → Verify all links are now inactive

5. [Optionally archive the project:]
   lotslink_archive_project(workspace_id, project_id)
   → Hide from active project list while preserving data
```

---

## 5. Custom Domain Setup

**Scenario:** Add and verify a custom domain for branded short links.

```
1. lotslink_add_custom_domain(workspace_id, domain="go.yourcompany.com")
   → Get domain_id; status is "pending"

2. lotslink_get_custom_domain(workspace_id, domain_id)
   → Get required DNS records (CNAME or A record to configure at registrar)

3. [Configure DNS records at your domain registrar]
   [Wait for DNS propagation, typically 5-30 minutes]

4. lotslink_verify_custom_domain(workspace_id, domain_id)
   → Trigger verification check
   → If DNS is correct: status → "verified", SSL provisioning begins
   → If DNS not ready: retry after a few minutes

5. lotslink_list_custom_domains(workspace_id)
   → Confirm domain is verified and active

6. [Now use domain when creating links:]
   lotslink_create_link(workspace_id, original_url="...", domain_id="<custom_domain_id>")
```

---

## 6. Link Health Audit

**Scenario:** Review workspace links and clean up expired or inactive ones.

```
1. lotslink_list_links(workspace_id, status="expired")
   → Find links past their expiration date

2. For each expired link:
   lotslink_get_link_analytics(workspace_id, link_id, days=90)
   → Check if it still gets traffic (someone may have bookmarked it)

3a. If no recent traffic:
    lotslink_delete_link(workspace_id, link_id)
    → Clean up

3b. If still getting traffic:
    lotslink_update_link(workspace_id, link_id, expires_at=null)
    → Remove expiration to keep it alive

4. lotslink_list_links(workspace_id, status="inactive")
   → Review deliberately deactivated links for cleanup

5. lotslink_get_workspace_analytics(workspace_id, days=90)
   → Final health overview
```

---

## 7. A/B Test Tracking with UTM Content

**Scenario:** Track two versions of a CTA to the same destination.

```
1. lotslink_create_link(
     workspace_id,
     original_url="https://lots.team/pricing",
     custom_slug="cta-variant-one",
     utm_source="homepage",
     utm_medium="cta_button",
     utm_campaign="conversion_test",
     utm_content="variant_a_green"
   )

2. lotslink_create_link(
     workspace_id,
     original_url="https://lots.team/pricing",
     custom_slug="cta-variant-two",
     utm_source="homepage",
     utm_medium="cta_button",
     utm_campaign="conversion_test",
     utm_content="variant_b_blue"
   )

3. [After running for sufficient time:]
   lotslink_get_link_analytics(workspace_id, link_id_v1, days=14)
   lotslink_get_link_analytics(workspace_id, link_id_v2, days=14)
   → Compare recorded clicks over the same time period. Use your campaign exposure data separately to calculate rates.

4. Report the observed difference without claiming unique people, conversion rates or statistical significance from clicks alone
```
