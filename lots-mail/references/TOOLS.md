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
| `get_billing` | How the user's domains are paid for: plan or credits, balance, plans to choose from | read |
| `create_checkout` | A checkout link for a plan (`plan`, `cycle`) or credits (`amount_usd`) for the person to open | owner |

Bodies: `send_email`, `reply_to_thread`, `create_draft` and `update_draft` take `text`, `html` or both. HTML is cleaned before sending (no scripts, event handlers, frames, forms or unsafe links); when `text` is empty the plain-text part is written from the HTML. On `update_draft`, `html: ""` turns a draft back into plain text.

Recipients are email addresses as strings (`"jane@example.com"` or `"Jane <jane@example.com>"`), up to 50 per message across To, Cc and Bcc.

Billing: give the checkout link to the person to pay in their browser; never ask for card details. An unpaid domain cannot send (`domain_not_funded`); reading, search and drafts keep working, and stored mail is never deleted.
