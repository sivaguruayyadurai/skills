# lots.blog — MCP Tools Reference

Launch scope for tools via `https://api.lots.blog/mcp`. Tools are called by their **Tool Slug**.

---

## Blogs

| Tool Slug | Description | Key Parameters |
|-----------|-------------|----------------|
| `list_blogs` | List all blogs where user is an owner or active member | — |
| `get_blog` | Get comprehensive blog details, settings, SSL status, and user role | `blog_id` |
| `create_blog` | Create a new blog instance | `blog_name` (required), `subdomain` (required, unique, 3-63 chars), `privacy?` (public/private) |
| `update_blog` | Update blog settings, theme, subdomain (Owner), or custom domain | `blog_id`, fields to update |

---

## Posts

| Tool Slug | Description | Key Parameters |
|-----------|-------------|----------------|
| `list_blog_posts` | List posts with optional filtering by type, status, topic | `blog_id`, `type?`, `status?`, `topic_id?`, `limit?` |
| `get_blog_post` | Get full post details including type-specific content | `blog_id`, `post_id` |
| `create_blog_post` | Create a new post | See below |
| `update_blog_post` | Update post content, metadata, or status | `blog_id` (required), `post_id` (required), fields to update |
| `publish_post` | Immediately publish a draft or scheduled post (Editor+ only) | `blog_id`, `post_id` |
| `schedule_post` | Schedule a post for automatic publishing | `blog_id`, `post_id`, `scheduled_for` (ISO 8601, 5+ min ahead) |
| `delete_blog_post` | Permanently delete a post (Owner/Admin only) | `blog_id`, `post_id` |

---

## Context, Research, Opportunities and Reviews

| Tool Slug | Description | Key Parameters |
|-----------|-------------|----------------|
| `get_blog_strategy` | Load blog identity, source brief, pillars, keyword clusters, content ideas, briefs, and recent posts | `blog_id` |
| `save_blog_strategy` | Save full strategy/source brief context | `blog_id`, strategy fields |
| `find_keyword_ideas` | Research and save keyword ideas from seed phrases | `blog_id`, `seeds`, `limit?` |
| `list_keywords` | List stored keyword metrics and usage | `blog_id`, filters? |
| `create_content_idea` | Save an idea with status, pillar, keyword, production timing, and reasoning | `blog_id`, `title`, `status?`, `production_status?` |
| `update_content_idea` | Update an idea, approval status, timing, or production state | `blog_id`, `content_idea_id`, fields |
| `list_content_ideas` | List ideas by status or production state | `blog_id`, filters? |
| `create_post_brief` | Create a writing brief for an idea | `blog_id`, `content_idea_id`, brief fields |
| `update_post_brief` | Edit a writing brief | `blog_id`, `brief_id`, fields |
| `save_content_review` | Save AI review score, findings, readiness status, and the dashboard-visible post quality check | `blog_id`, `post_id`, review fields |
| `run_post_quality_check` | Paid independent direct AI review; requires user agreement to token-based charges | `blog_id`, `post_id`, `authorize_charge: true` |
| `get_content_reviews` | Retrieve saved reviews for a post | `blog_id`, `post_id` |

Use the live tool schemas for parameters and availability. Independent review uses `run_post_quality_check` after the user agrees to token-based charges.

### `create_blog_post` Parameters

| Parameter | Required | Description |
|-----------|----------|-------------|
| `blog_id` | ✅ | UUID of the target blog |
| `content_idea_id` | — | Strongly recommended when drafting from a saved content idea or post brief. Links the new post to the idea atomically and prevents duplicate drafts for the same idea. |
| `title` | ✅ | Post title (all types) |
| `post_type` | ✅ | `article`, `list`, `poll`, `video`, or `note` |
| `status` | — | `draft` (default), `scheduled`, `published` |
| `content` | Article only | Markdown content |
| `note` | Note only | Short text (max 1000 chars, markdown) |
| `youtube_link` | Video only | YouTube URL |
| `question` | Poll only | Poll question |
| `option1`, `option2` | Poll only | First two poll options (required); `option3`, `option4` optional |
| `list_items` | List only | Array of `{title, order_index, description?, image_url?}` |
| `scheduled_for` | If status=scheduled | ISO 8601 datetime, 5+ min in future |
| `featured_image` | — | URL to featured image |
| `meta_description` | — | SEO description (max 160 chars) |
| `meta_keywords` | — | Array of SEO keywords |
| `slug` | — | Custom URL slug (auto-generated from title if omitted) |
| `reading_time` | Article only | Estimated reading time in minutes |
| `source_link` | — | Original source URL for attribution |

---

## Topics (Categories)

| Tool Slug | Description | Key Parameters |
|-----------|-------------|----------------|
| `list_topics` | List topics with optional parent filtering and post counts | `blog_id`, `parent_id?`, `include_post_count?` |
| `get_topic` | Get topic details including parent and child topics | `blog_id`, `topic_id` |
| `create_topic` | Create a new topic/category (Editor+ only) | `blog_id`, `name`, `description?`, `parent_id?`, `seo_title?`, `seo_description?` |
| `update_topic` | Update topic details (Editor+ only) | `blog_id`, `topic_id`, fields to update |

---

## Analytics

| Tool Slug | Description | Key Parameters |
|-----------|-------------|----------------|
| `get_blog_analytics` | Blog-level stats: total views, posts, comments, likes. Views by date, top 10 posts | `blog_id`, `date_from?`, `date_to?` (default: last 30 days) |
| `get_post_analytics` | Post engagement: total views, likes, comments, saves | `blog_id`, `post_id` |

---

## Images

| Tool Slug | Description | Key Parameters |
|-----------|-------------|----------------|
| `upload_blog_image` | Store an image and return its public CDN URL | `blog_id`, `image_url` or `image_base64`, optional filename/MIME |

## Brief retrieval and deletion

| Tool Slug | Description | Key Parameters |
|-----------|-------------|----------------|
| `get_post_brief` | Read a saved brief | `blog_id`, selectors from the live schema |
| `delete_post_brief` | Delete a selected brief | `blog_id`, `brief_id` |

## Publication and review boundaries

Keep creation/editing in draft status until the user instructs publication. Use dedicated publish/schedule actions. Current status-writing APIs are not a universal editorial review gate. Independent paid review must use the available dashboard/action contract and its price; agent-submitted reviews are preliminary assessments, not independent reviews. Publishing destinations must be actually supported by the connection.

| Tool Slug | Description | Key Parameters |
|-----------|-------------|----------------|
| `run_post_quality_check` | Independent paid direct AI review | `blog_id`, `post_id`, `authorize_charge=true` after user agreement |
