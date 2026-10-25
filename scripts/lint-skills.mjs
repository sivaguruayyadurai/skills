#!/usr/bin/env node
// Safety lint for the skills in this repository. No dependencies.
//   node scripts/lint-skills.mjs
// Fails when a skill that reads text written by other people has no
// "untrusted" rule, when a workflow deletes without asking the user first,
// when a key may be pasted into chat, or when a SKILL.md quotes prices or
// another vendor's plan rules as fact.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const skills = readdirSync(root, { withFileTypes: true })
  .filter((d) => d.isDirectory() && existsSync(join(root, d.name, 'SKILL.md')))
  .map((d) => d.name);
const read = (...p) => (existsSync(join(root, ...p)) ? readFileSync(join(root, ...p), 'utf8') : '');
const problems = [];

// Tools that return text written by customers, visitors or other outsiders.
const outsideText = /\b(list_contact_messages|get_contact_thread|list_posts|list_post_comments|list_business_reviews|autofill_business_from_url|list_product_reviews|list_checkout_orders|bulk_upsert_prospects|get_timeline|get_document|get_thread|search_mail)\b/;

for (const name of skills) {
  const skill = read(name, 'SKILL.md');
  const all = skill + read(name, 'references', 'TOOLS.md') + read(name, 'references', 'WORKFLOWS.md');

  if (outsideText.test(all) && !/untrusted/i.test(skill)) {
    problems.push(`${name}/SKILL.md: reads outside text (${all.match(outsideText)[1]}) but has no untrusted-content rule`);
  }

  const lines = read(name, 'references', 'WORKFLOWS.md').split('\n');
  lines.forEach((line, i) => {
    if (/\b\w*delete\w*\(/.test(line)) {
      const before = lines.slice(Math.max(0, i - 3), i + 1).join('\n');
      if (!/\b(ask|asks|confirm|confirms|names)\b/i.test(before)) {
        problems.push(`${name}/references/WORKFLOWS.md:${i + 1}: delete call without asking the user first`);
      }
    }
    if (/lotslink_create_link\(.*\bdomain_id=/.test(line)) {
      problems.push(`${name}/references/WORKFLOWS.md:${i + 1}: lotslink_create_link takes custom_domain_id, not domain_id`);
    }
  });

  if (/paste a key into chat if/i.test(skill)) {
    problems.push(`${name}/SKILL.md: the never-paste-a-key rule must not have exceptions`);
  }
  // Lines about minor units are currency examples, not prices.
  const priced = skill.split('\n').filter((l) => !/minor units/.test(l)).join('\n');
  const price = priced.match(/[$₹€£]\d[\d,.]*|\b\d[\d,]*\s+(free\s+)?(starter\s+)?credits\b/);
  if (price) problems.push(`${name}/SKILL.md: hard-coded price or allowance "${price[0]}"; point to the billing tool or pricing page`);
  if (/ChatGPT (on )?(Business|Enterprise|Edu|Pro)\b/.test(skill)) {
    problems.push(`${name}/SKILL.md: states ChatGPT plan rules as fact; say to check the current limits`);
  }
}

if (problems.length) {
  console.error(problems.map((p) => `- ${p}`).join('\n'));
  console.error(`\n${problems.length} problem(s) in ${skills.length} skills`);
  process.exit(1);
}
console.log(`${skills.length} skills pass the safety lint`);
