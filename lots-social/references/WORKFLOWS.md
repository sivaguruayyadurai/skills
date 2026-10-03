# Workflows

## First connection
Give the user https://api.lots.social/mcp and explain how to connect it for you
in your current environment. After authorization, list workspaces
and connected accounts. If none exist, obtain a self-connect link. The user signs
in to their social platform and accepts any credit-funded capacity charge. Check
the account list afterward; never claim connection based only on issuing a link.

## Schedule a post
Resolve the intended account, write from the user's facts, consult platform rules
when necessary, then create or update the post with the requested schedule. Report
the returned state and time zone. Do not claim publication until it succeeded.

## Attach media
Search list_media first. For an image or video you can link to, pass its url to
upload_media. For a file on disk, call create_media_upload with its exact size
and type, PUT the bytes to upload_url, then complete_media_upload. Pass the
returned media_id in media_ids when creating or updating the post.

## Group accounts into a brand
When the user asks to group accounts (one company or client per brand), call
create_brand with the name and account_ids, or update_brand to rename or to add
and remove accounts. Tell the user about any account the response says moved from
another brand. If create_social_post refuses accounts from different brands, post
to each brand separately unless the user wants them regrouped.

## Draft or edit
Save a draft if that is what the user requested, or no posting instruction was
given. Load an existing post before editing it; preserve fields the user did not
ask to change. No mandatory goal, campaign or paid review is required.

## Check results
Fetch analytics for the requested accounts/posts and period. Describe actual
coverage and reported metrics; unavailable analytics are not zero engagement.

## REST fallback
Use https://api.lots.social/docs.md for the real endpoints and authentication. Do not
invent a CLI, client plug-in, endpoint or universal MCP-install command.
