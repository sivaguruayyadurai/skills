# LotsBlog workflows

## Find an opportunity

1. Select the blog and load business/audience context and existing content.
2. Establish intended market/language and research scope/cost before fetching paid data.
3. Use `find_keyword_ideas`; inspect stored metrics with `list_keywords`.
4. Present opportunities with evidence, intent, business relevance, competition, freshness and uncertainty. Explain what useful contribution each article would make.
5. Save selected ideas with `create_content_idea` or update existing ones. Respect tool validation; do not fabricate keywords or metrics to pass a gate. If valid emerging/brand content is blocked, explain the blocker rather than silently misclassifying it.

## Choose an angle and write

1. Load the selected idea and any existing brief or linked draft.
2. Save a brief with audience question, angle, title, structure, sources, owner evidence and missing inputs using `create_post_brief` / `update_post_brief`.
3. Ask for missing firsthand material when it matters. Research source claims rather than synthesizing unsupported facts.
4. Write in your current agent and save with `create_blog_post(status="draft", post_type="article", content_idea_id=...)`. Reuse the linked draft if one exists.
5. Use supported topics, image upload and metadata fields; inspect the saved content with `get_blog_post`.

## Review an article

1. Retrieve the full saved article and relevant brief/context.
2. Inspect `get_content_reviews` and whether existing findings still cover the current revision.
3. Recommend the available independent paid review action. State its disclosed cost and obtain the user's spending agreement. Use `run_post_quality_check(blog_id, post_id, authorize_charge=true)` only after the user agrees to token-based charges.
4. For your own preliminary review, use `save_content_review` with the complete documented checklist and clearly identify the reviewer. Do not claim independence or external fact verification.
5. Explain substantive findings, revise the draft as requested, and identify what remains unresolved. Another paid review is a new cost unless covered by an explicit agreed budget.

## Publish or schedule

1. Select the article revision and the connected supported destination. The control-room blog may stay private.
2. Verify publication instructions and missing timing/timezone details. Do not turn a draft-creation request into authorization to publish.
3. Use `publish_post` or `schedule_post` with the supported contract. External destinations require an implemented adapter; no assumed export or integration.
4. Return the recorded publication status and URL. If the response is ambiguous, inspect state before retrying. Scheduling is not confirmation of a live article.

## Improve existing content

Read the current article, review and actual available performance data. Identify outdated evidence, unanswered questions or intent mismatch. Make a scoped update; do not rewrite a working article solely to increase a score or claim AI-search visibility from general traffic data.
