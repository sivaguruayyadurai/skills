# LotsMail workflows

## Morning triage
1. `list_mailboxes`, pick the mailbox.
2. `list_threads` with `unread_only: true`.
3. `get_thread` for each one that needs attention; summarize who wants what, by when.
4. For each reply the user wants, `create_draft` with `reply_to_message_id`. Tell the user how many drafts are waiting.
5. `update_messages` with `mark_read: true` only for threads the user said are handled.

## Reply when the user says "send it"
1. Check `get_agent_access`: if `can_send` is false, ask the user to turn on sending for this mailbox in settings, or leave a draft.
2. `reply_to_thread` with the user's approved text and a new `idempotency_key`.
3. `get_send_status` a little later; report `delivered`, or explain a bounce.

## Find something
`search_mail` with names, words or an address, then `get_thread` on the match. Search covers every folder except Trash and Spam.
