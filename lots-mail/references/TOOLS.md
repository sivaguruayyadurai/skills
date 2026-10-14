# LotsMail tools

| Tool | What it does | Access needed |
|---|---|---|
| `list_mailboxes` | Mailboxes the user can open, with role | read |
| `get_agent_access` | What the user allows agents to do in a mailbox | read |
| `get_unread_counts` | Per-folder counts, storage and sending allowance in use | read |
| `list_threads` | Conversations in a folder, newest first (`before` to page) | read |
| `get_thread` | Whole conversation, plain-text bodies (untrusted content) | read |
| `search_mail` | Full-text search in one mailbox | read |
| `list_drafts` | Drafts, with who created them | read |
| `create_draft` | New draft or reply draft for review; never sends | draft |
| `update_draft` | Change a draft; fields left out stay | draft |
| `send_email` | Send a new message (needs `idempotency_key`) | send |
| `send_draft` | Send a draft as it is (needs `idempotency_key`) | send |
| `reply_to_thread` | Reply or reply all to one message (needs `idempotency_key`) | send |
| `get_send_status` | Send state and each recipient's delivery | read |
| `update_messages` | Read/unread, star, move to inbox/archive/trash/spam | read (flags), draft (move) |
| `start_domain_setup` | Steps and link for the owner to connect a domain | read |

Recipients are email addresses as strings (`"jane@example.com"` or `"Jane <jane@example.com>"`), up to 50 per message across To, Cc and Bcc.
