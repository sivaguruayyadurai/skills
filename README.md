# LotsTech Skills

Official agent skills for the [LotsTech](https://www.lotstech.com) products. Connect ChatGPT, Claude or any MCP client to a Lots product, and its skill teaches the assistant that product's tools, rules and conventions so it works correctly without step-by-step prompting. Every product also has a full dashboard.

## Install

Every skill lives in this repository (`sivaguruayyadurai/skills`). Install with the [skills CLI](https://github.com/vercel-labs/skills):

```bash
# See every skill in this repository
npx skills add sivaguruayyadurai/skills --list

# Install one skill (repeat --skill for more)
npx skills add sivaguruayyadurai/skills --skill lots-social
npx skills add sivaguruayyadurai/skills --skill lots-blog
npx skills add sivaguruayyadurai/skills --skill lots-team
npx skills add sivaguruayyadurai/skills --skill lots-crm
npx skills add sivaguruayyadurai/skills --skill lots-notes
npx skills add sivaguruayyadurai/skills --skill lots-link
npx skills add sivaguruayyadurai/skills --skill lots-business
npx skills add sivaguruayyadurai/skills --skill lots-business-premium-website
npx skills add sivaguruayyadurai/skills --skill lots-mail
npx skills add sivaguruayyadurai/skills --skill lots-invoice
npx skills add sivaguruayyadurai/skills --skill lots-store

# Install all of them
npx skills add sivaguruayyadurai/skills --skill '*'
```

Add `-a claude-code` (or another agent name) to target one agent, and `-g` to install for your user instead of the current project.

## Available Skills

| Skill | Product | MCP endpoint | What your agent can do |
|-------|---------|--------------|------------------------|
| [lots-social](./lots-social/) | [LotsSocial](https://lots.social) | `https://api.lots.social/mcp` | Connect accounts, schedule and publish posts on 12 networks, manage media, check analytics |
| [lots-blog](./lots-blog/) | [LotsBlog](https://lots.blog) | `https://api.lots.blog/mcp` | Create, schedule and publish articles on your own domain, upload images, manage topics, read analytics |
| [lots-team](./lots-team/) | [LotsTeam](https://lots.team) | `https://api.lots.team/mcp` | User requests, tasks, support messages and changelog updates in one workspace |
| [lots-crm](./lots-crm/) | [LotsCRM](https://lotscrm.com) | `https://api.lotscrm.com/mcp` | Contacts, companies, deals, pipelines, activity history and follow-ups |
| [lots-notes](./lots-notes/) | [LotsNotes](https://lotsnotes.com) | `https://api.lotsnotes.com/mcp` | Shared business context: workspaces, folders, AGENTS.md and notes every agent reads |
| [lots-link](./lots-link/) | [LotsLink](https://lots.link) | `https://api.lots.link/mcp` | Free, unlimited short links, QR codes, campaign projects, your own domains and click analytics |
| [lots-business](./lots-business/) | [LotsBusiness](https://lots.business) | `https://api.lots.business/mcp` | A business's website, Google Business Profile, local directory listings, business email and website messages, for owners and agencies |
| [lots-business-premium-website](./lots-business-premium-website/) | [LotsBusiness](https://lots.business) | `https://api.lots.business/mcp` | A premium, unique website for one business: discovery, brief, art direction, motion, build in editable custom sections, screenshots and critique, quality gate; exact site moves |
| [lots-mail](./lots-mail/) | [LotsMail](https://lotsmail.to) | `https://api.lotsmail.to/mcp` | Business email on your own domain: mailboxes, team access, search, drafts and sending with your approval |
| [lots-invoice](./lots-invoice/) | [LotsInvoice](https://lotsinvoice.com) | `https://api.lotsinvoice.com/mcp` | Invoices, estimates, credit notes, customers, recorded payments and reminders |
| [lots-store](./lots-store/) | [LotsStore](https://lotsstore.app) | `https://api.lotsstore.app/mcp` | Online stores: products, stock, orders, refunds, discounts and payment connections |

LotsDirectory publishes its skill on its own site: [lots.directory/skill.md](https://lots.directory/skill.md) (MCP endpoint `https://api.lots.directory/mcp`).

Every server is also listed in the [official MCP Registry](https://registry.modelcontextprotocol.io) under its product domain (for example `blog.lots/lotsblog` and `com.lotscrm/lotscrm`).

## Connect

1. **Add the MCP endpoint** from the table to your agent (Claude, ChatGPT, Cursor, Claude Code or any MCP client).
2. **Sign in** when your agent opens the product's sign-in page (OAuth). Agents without OAuth can send an API key from the product's dashboard as `Authorization: Bearer <key>`.
3. **Add the skill** with the command above.
4. **Ask for real work**, for example "Schedule this announcement on LinkedIn for Tuesday 9am."

### Example MCP config

```json
{
  "mcpServers": {
    "lots-social": {
      "type": "http",
      "url": "https://api.lots.social/mcp"
    }
  }
}
```

## About LotsTech

LotsTech builds products you run from the AI agent you already use: your agent for speed, the dashboard for control. One account works across every Lots product, and credits are shared between them.

- **Website**: [lotstech.com](https://www.lotstech.com)
- **MCP servers**: [lotstech.com/mcp](https://www.lotstech.com/mcp)
