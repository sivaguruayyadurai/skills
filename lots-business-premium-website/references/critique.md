# Look and critique

You cannot judge a design you have not seen. After every build and every meaningful change, look at it the way visitors will, compare it with the brief, fix, and look again. Two rounds at least; stop when a round finds nothing that matters.

## Look

`screenshot_site` renders the draft (or a version, or the live site) in a real browser:

```
screenshot_site { site_id, devices: ["desktop", "phone"] }                 first screen at 1440 and 390 px
screenshot_site { site_id, devices: ["phone"], full_page: true }           the whole page, top to bottom, in pieces
screenshot_site { site_id, page: "/visit", devices: ["desktop"] }          another page
screenshot_site { site_id, section: "plans", devices: ["phone", "tablet"] } one section (id from the outline)
```

The same picture is reused for 5 minutes, and calls are limited per business per hour, so look with purpose: first screens after each change, full pages once per round. Without the tool (or in an agent that cannot see images), open the `preview_site_content` link in a browser you control at the same widths.

## Critique against the brief

For each screenshot, answer in writing, briefly:

1. **Five-second test:** what does a first-time visitor understand in five seconds? Is it what the business does, where, for whom, and the primary action? Is the one feeling from the brief there?
2. **The primary action:** is it the most visible action on the first screen at both widths? Is there exactly one primary action per screen?
3. **The audience's questions:** are they answered in the brief's order, and can a phone visitor find each in one or two scrolls?
4. **The design system:** are type sizes, colours, spacing and imagery the ones written down? Anything that drifted to a default (a generic card grid, a stock hero, centred everything)?
5. **Hierarchy and rhythm:** does the eye know where to go? Are sections distinct but related? Is there air where the concept wants calm, density where it wants speed?
6. **Phone:** no horizontal scroll, no text smaller than 16 px for reading, no word breaking a heading, tap targets comfortable, nothing important hidden behind a sticky bar, the menu usable.
7. **Words:** specific, in the audience's language and register, no filler, no claims beyond the fact sheet, no em dashes, no placeholder text.
8. **Pictures:** sharp, correctly cropped, consistent treatment, alt text right, nothing that pretends to be the business when it is not.
9. **Details:** focus states, link states, the 404 page, the footer, the empty states (one list item, no reviews yet).

Write the findings as a short numbered list, fix them, and look again.

## Anti-sameness check

The site must belong only to this business. Before you call it done:

- **Against your own earlier builds in this account:** list the other sites in the workspace (`list_my_businesses`, then `get_site_content` for those with sites) and screenshot their home pages. Compare: type families, colour roles, first-screen layout, section order, card shapes, motion. If two or more of these match an earlier build, change the concept, not just the colours.
- **Against the competitors** (market sheet): it should sit in the category (customers recognise what it is) but not look like any one competitor or like the category's template.
- **Against generic templates:** if you could swap in another business's name and photos and it would still work, the art direction is not specific enough. Go back to the raw material in [art-direction.md](art-direction.md) and push the concept further.
- **The default checklist:** big full-width photo with centred white text, three icon cards, a stats band, testimonial carousel, contact form at the bottom, in that order. Any site can have one of these for a reason. A site with all of them by default has no direction.

If the check fails, say so to yourself plainly and rethink before you show the owner.

## Show the owner

When a round finds nothing that matters and the quality gate passes ([quality-gate.md](quality-gate.md)), share the preview link (`preview_site_content`) with a short note: the concept in two sentences, what they can edit in the Website editor, and anything you need from them (better photos, a missing fact). Ask for a yes before `publish_site_content`.
