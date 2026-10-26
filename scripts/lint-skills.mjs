#!/usr/bin/env node
// Safety lint for the skills in this repository. No dependencies.
//   node scripts/lint-skills.mjs        (tests: node --test scripts/)
// SKILLS_ROOT=<dir> lints another folder (used by the tests).
// Fails when a skill that reads text written by other people has no
// "untrusted" rule under a "Read safely" heading, when SKILL.md, TOOLS.md or
// WORKFLOWS.md calls a delete tool without asking the user first,
// when a key may be pasted into chat, or when a SKILL.md quotes prices or
// another vendor's plan rules as fact.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = process.env.SKILLS_ROOT || join(dirname(fileURLToPath(import.meta.url)), '..');
const skills = readdirSync(root, { withFileTypes: true })
  .filter((d) => d.isDirectory() && existsSync(join(root, d.name, 'SKILL.md')))
  .map((d) => d.name);
const read = (...p) => (existsSync(join(root, ...p)) ? readFileSync(join(root, ...p), 'utf8') : '');
const problems = [];

/** The body of the SKILL.md "## Read safely" section (up to the next heading of the same or higher level). */
function readSafely(md) {
  const m = md.match(/^(#{1,3})\s+Read safely\s*$/im);
  if (!m) return '';
  const rest = md.slice(m.index + m[0].length);
  const next = rest.search(new RegExp(`^#{1,${m[1].length}}\\s`, 'm'));
  return next === -1 ? rest : rest.slice(0, next);
}

// Tools that return text written by customers, visitors or other outsiders.
const outsideText = /\b(list_contact_messages|get_contact_thread|list_posts|list_post_comments|list_business_reviews|autofill_business_from_url|list_product_reviews|list_checkout_orders|bulk_upsert_prospects|get_timeline|get_document|get_thread|search_mail)\b/;

for (const name of skills) {
  const skill = read(name, 'SKILL.md');
  const all = skill + read(name, 'references', 'TOOLS.md') + read(name, 'references', 'WORKFLOWS.md');

  // The rule must be the text of a "## Read safely" section, not the word "untrusted" anywhere (task fbab8863 SK-1).
  if (outsideText.test(all) && !/untrusted/i.test(readSafely(skill))) {
    problems.push(`${name}/SKILL.md: reads outside text (${all.match(outsideText)[1]}) but has no untrusted-content rule under a "Read safely" heading`);
  }

  // Delete calls need the user's go-ahead wherever they are written, not only in WORKFLOWS.md (task fbab8863 SK-1).
  for (const file of ['SKILL.md', 'references/TOOLS.md', 'references/WORKFLOWS.md']) {
    const lines = read(name, ...file.split('/')).split('\n');
    lines.forEach((line, i) => {
      if (/\b\w*delete\w*\(/.test(line)) {
        const before = lines.slice(Math.max(0, i - 3), i + 1).join('\n');
        if (!/\b(ask|asks|confirm|confirms|names)\b/i.test(before)) {
          problems.push(`${name}/${file}:${i + 1}: delete call without asking the user first`);
        }
      }
      if (/lotslink_create_link\(.*\bdomain_id=/.test(line)) {
        problems.push(`${name}/${file}:${i + 1}: lotslink_create_link takes custom_domain_id, not domain_id`);
      }
    });
  }

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
