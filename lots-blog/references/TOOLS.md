# LotsBlog launch tools

Use the live connection schema as the authority for fields and current availability.

- Blogs: `list_blogs`, `get_blog`, `create_blog`, `update_blog`. The private Markdown `blog_guide` is returned by get and editable through update; omit unchanged fields.
- Articles: `list_blog_posts`, `get_blog_post`, `create_blog_post`, `update_blog_post`, `delete_blog_post`. Create drafts by default; read back saved content. Set topic_ids from list_topics; omission preserves membership and [] clears it. Article writes return preview_url; drafts require authenticated access.
- Publication: `publish_post`, `schedule_post`, `unpublish_post`. Use only on the user's instruction. Scheduling requires a valid timestamp at least five minutes ahead and publishes on the next 15-minute check; returning to draft cancels the schedule.
- Topics: `list_topics`, `get_topic`, `create_topic`, `update_topic`, `delete_topic`.
- Images: `upload_blog_image` accepts a URL or small base64 image. For local files use `create_image_upload` → PUT bytes → `complete_image_upload`. `list_media` lists images and `delete_media` removes unused images on request.
- Domains: `connect_domain` returns required CNAME/optional TXT records. The user sets them; `check_domain` reports verification and HTTPS status. Both require blog-owner access.
- Article quality check: `run_post_quality_check`, a separate token-billed model task with explicit charge authorization.
- Results: `get_blog_analytics`, `get_post_analytics` report supported measurements, not rankings or conversions.

Appearance and team configuration remain available in the dashboard. Refresh/reconnect if your client has cached an older tool manifest without topic_ids or blog_guide. Do not invent missing tools. Keyword research, strategy, ideas, briefs and autonomous runtime are retained but outside launch discovery. Plans and purchased credits use the central billing catalogue; consult current pricing, never old example rates.
