---
name: lots-blog
description: Use LotsBlog research, briefs, articles, editorial reviews and publishing tools to manage a blog from your existing AI agent. Use for finding relevant content opportunities, producing evidence-backed articles, reviewing drafts or publishing under the user's instructions.
metadata:
  compatibility: Works with agents that support authenticated HTTP MCP connections
  author: lotstech
  version: "2.0"
  platform: lots.blog
  mcp_endpoint: https://api.lots.blog/mcp
---

# LotsBlog

You handle the user's blogging workflow. LotsBlog gives you research tools, saved business context, opportunities, briefs, drafts, reviews and publishing capabilities. Its dashboard is the user's control room. A blog can remain private; public LotsBlog hosting is optional.

## Connect and select the blog

Use `https://api.lots.blog/mcp`. If it is not connected, guide the user through adding this MCP server for you in the client you are running in. Use the client's current setup requirements; do not assume every client supports the same authentication. API-key setup is available through the blog's Settings → API Keys. Never ask the user to paste credentials into chat.

Call `list_blogs`, then select the intended blog. Ask when more than one fits. Read its context with `get_blog` and `get_blog_strategy`. Establish the intended audience, offer, country/language and publication destination. Ask only for inputs that affect the requested work; an existing draft does not require rebuilding the strategy.

## Choose the starting stage

Follow **opportunity → angle → evidence-backed article → review → publish**, starting at the stage the user needs:

- For topic discovery, research demand and propose opportunities.
- For a supplied topic or brief, validate the angle and missing evidence before drafting.
- For an existing article, inspect and review it without forcing keyword research first.
- For publication, verify the intended article, revision, destination and user instructions.

Use the tools actually exposed by your connection. Do not invent a review, export or external publishing tool. Read [references/TOOLS.md](references/TOOLS.md) for the launch tool scope and [references/WORKFLOWS.md](references/WORKFLOWS.md) for stage-specific procedures.

## Research and choose an angle

Use measured research when claiming search demand. Establish country/language before paid research; limit the request to the agreed scope. Distinguish provider metrics, observed questions/trends and your inference. Missing data is unknown, not zero demand. Historical search volume does not prove a topic is currently trending.

Present a useful shortlist with audience intent, business relevance, evidence and freshness, competition and the proposed contribution. Do not present opportunity scores as ranking or conversion predictions. Emerging topics, release announcements and firsthand insights can be useful without established keyword volume.

Save selected opportunities and briefs. Record the question the article answers, its angle, sources, relevant product facts and missing firsthand input. Avoid duplicate ideas or drafts; reuse existing linked work.

## Write with evidence

You write and revise; a separate chat agent is not required. Retrieve the brief, existing articles and relevant context. Use supported sources for factual claims and ask the user for missing experience, examples or product evidence. Never invent tests, customer stories, numbers, citations or expertise.

Save an editable draft. Article content is Markdown. Match the title and visible opening to the intended question, provide concrete answers, and include relevant sources and internal links. Upload images through supported tools; do not assume assets are confidential just because the blog is private. Do not change visibility or publish as a side effect of writing.

## Review before publication

Recommend an independent LotsBlog AI review rather than treating your own assessment as independent. This is a paid, bounded review action, not an unattended writing runtime. Use `run_post_quality_check` with `authorize_charge=true` only after the user agrees to token-based LotsTech Credit charges. The dashboard also provides the review action. Do not guess the price or claim a review ran when it did not.

You may perform a preliminary review and save it with `save_content_review`, using the documented checklist contract, but label it as your assessment. Do not represent it as an independent paid review. A review is about a specific article revision; edits can make it stale.

Explain substantive findings and fixes. An editorial score does not guarantee factual correctness, rankings or AI citations. A reviewer limited to supplied material cannot independently verify an external claim; retrieve evidence or ask the user when needed. Revise within the agreed scope. Do not repeat paid reviews or rewrite indefinitely to chase a score.

## Publish under the user's instructions

Default creation/editing to drafts. Publish or schedule only when instructed, using a dedicated publishing action. Confirm missing destination, timing/timezone or article choice before taking that action. Review is recommended editorial guidance, not a promise that every API publication is gated by a score.

Keep the private control-room blog private when publishing elsewhere. Advertise or use an external destination only when the connection actually supports it. Return the publication URL/status supplied by the tool. A queued or scheduled response is not proof the article is live; reconcile uncertain outcomes before retrying so you do not create duplicates.

## Costs and results

Research, independent AI review and capacity may incur LotsBlog charges; writing in your own agent uses the user's existing AI service. Read available quotes/billing information rather than inventing rates. Respect the user's agreed spending scope and report failures clearly.

Retrieve supported performance data when asked. Separate observations from recommendations; do not claim search rankings, AI citations or conversions from page-view counts. Use results to improve future topic choices, not to promise traffic growth.
