---
name: lots-commerce
description: Old name of the LotsStore skill, kept so existing install commands keep working. It is now lots-store. Use when the user wants you to run a LotsStore online store (products, stock, orders, discounts, payments) through its MCP server.
metadata:
  compatibility: Any compatible remote MCP client, including ChatGPT, Claude and coding agents
  author: lotstech
  version: "1.0"
  platform: lotsstore.app
  mcp_endpoint: https://api.lotsstore.app/mcp
  renamed_to: lots-store
---

# LotsStore (old skill name: lots-commerce)

This skill was renamed to **lots-store**. This short copy only keeps older install commands (`--skill lots-commerce`) working.

- Install the current skill: `npx skills add sivaguruayyadurai/skills --skill lots-store`. Add `-g` to install it for your user.
- Or read the full skill now at https://lotsstore.app/skill.md and follow it.

## Connect

Use `https://api.lotsstore.app/mcp` as a remote MCP server and sign in with a Lots account. Setup for common agents: https://lotsstore.app/mcp. An API key from https://www.lotstech.com/api is the alternative for clients that need one; never ask the user to paste a key or password into chat.

The MCP URL does not change with the skill name. Use the connected server's tool schemas for what you can do.
