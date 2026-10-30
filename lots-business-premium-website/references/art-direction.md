# Art direction: a method, with worked reasoning

Art direction turns the brief into a look. The method below works for any business anywhere. The worked examples show the **reasoning**, so you can do the same reasoning for a business that is nothing like them. They are not styles. If you find yourself borrowing an example's fonts, colours or layout for a different business, you have skipped the method.

## The method

### 1. Collect the raw material

From discovery, list concrete, specific things (nouns, not adjectives):

- **The place:** materials, light, street signs, local print traditions, the script, colours that mean something there, the weather.
- **The trade:** its tools, its materials, its documents, its rituals, the marks it leaves (a stitch, a receipt, a blueprint, a stamp).
- **The people:** the owner's story, the customers' situation and mood when they arrive.
- **The market:** the category look everyone shares (from the market sheet) and the gaps.
- **The price level:** what quality signals customers there read as honest.

### 2. Generate two or three different concepts

A concept is an idea that organises every choice, stated in a sentence, with its source. Make the concepts **genuinely different** by changing more than colour: change the governing metaphor, the type voice, the imagery strategy and the layout rhythm. Useful levers:

| Lever | Ask |
|---|---|
| Governing metaphor | What object, document or place could the site behave like? (a menu card, a case file, a dispatch board, a notebook, a shop window, a timetable) |
| Type voice | Who is speaking? An institution, a craftsperson, a neighbour, an expert, a host? Which letterforms sound like that person in that place and script? |
| Colour origin | Where do the colours come from? The material of the trade, the city, the logo, the season, the opposite of the competitors? |
| Imagery strategy | Owner's photos large, photos small and many, illustration, typography only, texture, diagrams, maps? What do the available assets actually support? |
| Layout rhythm | Calm and slow (lots of space, one thing at a time) or dense and quick (scannable, many entry points)? Symmetric and formal, or asymmetric and loose? |
| Density of proof | Is trust earned by restraint (say little, show the space) or by evidence (show everything, numbers, licences)? |

### 3. Choose, with reasons

Score each concept against the brief: does it create **the one feeling**? Does it make the **primary action** obvious? Does it fit the **audience's device and patience**? Does it signal the **true price level**? Is it **different from the market sheet** while still recognisable as the category? Can the **available assets** carry it (a photo-led concept with three blurry phone photos fails)? Is it **buildable and fast** within the budgets? Write the choice and the reasons in three to five lines.

### 4. Write the design system

Specific values, each with a reason (template in [process.md](process.md)). A design system that could be pasted onto another business without changes is not specific enough.

### 5. Typography checklist

- The script(s) the audience reads. A Tamil, Japanese, Arabic or Devanagari page needs a face designed for that script, paired deliberately with the Latin face; sizes and line height differ by script (Tamil and Devanagari need more line height; Japanese reads well at a smaller size with generous tracking and a shorter measure; Arabic runs right to left).
- Self-host the fonts (woff2, subset when possible), at most two families and four files on a page. A good system font stack is a valid, fast choice when the concept is about speed or plainness.
- A modular scale with `clamp()` so the largest heading still fits a 360 px phone without breaking words.

### 6. Colour checklist

- Tokens with roles, not a palette of favourites. Check every text pair for 4.5:1 (3:1 for large text and focus rings).
- Meaning is local: white is mourning in parts of Asia, red is luck in China and danger in many interfaces, green signals Islam in some places and money in others. Check the audience's reading before using a colour as the main signal.
- The accent is for the primary action. If everything is accented, nothing is.

## Worked reasoning

Four invented businesses, chosen to be far apart. Read them for the moves, not the answers.

### A tea house in Yanaka, Tokyo

**Facts:** a six-seat tea counter in an old wooden house in Yanaka, a quiet old district. The owner trained in Uji, serves matcha and seasonal wagashi, closed Tuesdays, reservations for the two daily tea sessions. Visitors: locals, and foreign visitors who found the area through its old streets. Japanese and English. Mid to premium price. Photos: eight good ones by the owner (the counter, a tea bowl, the garden). Competitors: café chains with bright photo grids and "instagrammable" matcha desserts; a few traditional tea rooms with dated sites.

**Raw material:** the wooden lattice of the facade, washi paper, the seasonal calendar (wagashi change with the seasons), the tea bowl's glaze, the slowness of the ritual, six seats, vertical Japanese text on old shop signs.

**Concepts considered:**
1. *Seasonal almanac:* the site is organised by the current season; the home page opens on this month's wagashi and the session times. Colour from the season's sweet.
2. *The counter at eye level:* the site is one long, slow horizontal walk along the counter, photo by photo.
3. *Shop sign typography:* type-led, with a vertical Japanese title and a quiet English translation, almost no images.

**Choice:** 1, with a touch of 3. The one feeling is "unhurried", and the seasonal calendar is the real difference from the café chains (they sell the same dessert all year). It also gives the owner a reason to update the site four times a year by changing one marked section. Concept 2 depends on horizontal scrolling, which fights phones. Concept 3 alone underuses the good photos.

**Design system moves (reasons in brackets):** a Japanese serif (mincho) for headings with an equally quiet Latin serif (the signboard voice); vertical Japanese text for the page title on wide screens only, horizontal on phones (legibility); paper-white background with ink and one seasonal accent token the owner can change per season (the almanac); wide margins and one idea per screen (unhurried); photos cropped square and small like objects on a counter, never full-bleed (six seats, intimate). Primary action: reserve a session, shown with the next two session times from the record. Japanese is the main language with an English page (`language: "en"`), not a bilingual mash on one page.

**Motion:** almost none: a slow fade of the seasonal sweet as it scrolls into view (duration 900 ms, ease out). Motion says "take your time"; anything bouncy would contradict it.

### A commercial law firm in Lagos

**Facts:** a four-partner firm in Victoria Island, Lagos: company formation, contracts, regulatory approvals and disputes for small and growing companies, including diaspora founders investing at home. English. Premium. Partners' names and their admission years are on the record from the owner; no published client list (confidentiality). Competitors: big firms with stock photos of handshakes and skylines, dense navy and gold sites; small firms with free templates.

**Raw material:** the documents of the trade (the engagement letter, the CAC certificate, the court cause list), Lagos energy and speed, the founders' need for clarity, the diaspora reader on a laptop in London or Houston at night, trust built by named people.

**Concepts considered:**
1. *The clear brief:* the site reads like an excellent legal memo: numbered sections, a plain-English answer to each founder question, partners named with what they actually do.
2. *Lagos momentum:* bold, high-contrast, large type that echoes the city's billboards and pace.
3. *Quiet authority:* classic serif, cream and deep green, generous space.

**Choice:** 1. The one feeling is "clarity, and someone on my side". The market sheet shows every firm says "excellence" with stock skylines; nobody explains anything. A founder deciding on a firm wants to see that the firm thinks clearly, and the memo structure proves it without invented claims. Concept 2 suits a consumer brand more than counsel for regulatory work. Concept 3 is pleasant but indistinguishable from the big firms.

**Design system moves:** one strong sans-serif family with a monospaced companion for section numbers and dates (the document voice); a near-white page, near-black ink, one decisive accent drawn from the firm's logo used only for actions and section numbers; a narrow reading column with a margin column for "in short" summaries (memo layout); no stock photos at all; partner portraits only if the owner supplies real ones, otherwise names, roles and practice areas set in type. Primary action: "book a consultation" (booking link or form with a preferred date). Structured data: the engine's business block plus FAQPage only for the owner's real questions.

**Motion:** section numbers count in place as each section enters (a document assembling itself), 300 ms, nothing else. Motion says "orderly".

### An HVAC company in Plano, Texas

**Facts:** a family-run heating and air conditioning company serving Plano, Frisco and Allen (service area, no public street address). Repairs, installs, maintenance plans; same-day service when booked before noon (owner's claim, written in the record); licensed (owner gives the licence number). Customers: homeowners in July heat with a broken AC, on a phone, stressed. Mid price. Real photos: the owner's trucks and team. 140 Google reviews (shown live). Competitors: national franchises with coupons, red-and-blue patriotic palettes, giant phone numbers, pop-ups.

**Raw material:** the heat (and the relief of cold air), the truck and the uniform, the service-area map, the dispatch board, the family name on the truck, Texas plainness.

**Concepts considered:**
1. *Dispatch board:* the top of the page is a live-looking status board: today's hours, "booked before noon, seen today", the areas served, one big call button. The rest is fast answers.
2. *Cool relief:* temperature as the visual idea, warm to cool gradient as you scroll.
3. *The family truck:* photography-led, the trucks and the team large, a neighbourly tone.

**Choice:** 1 with the warmth of 3. The one feeling is "help is coming today". The visitor is stressed on a phone: the first screen must answer "can you come, when, how much roughly, call" before anything else. The franchises shout coupons; this site wins by being calm, fast and specific. Concept 2 is clever but slows the answer and gradients cost contrast. The team photos (real) carry trust in the second screen.

**Design system moves:** a sturdy, slightly condensed sans for headings (signage on a truck) and a highly legible text face; colours from the company's truck livery, with a cool accent for actions and a warning-free palette (no red: the visitor is already alarmed); big tap targets, the call button fixed to the bottom on phones (the call bar setting), phone and hours as live markers; dense, scannable layout with short lines; service areas as a simple list from the record, never a street address; the licence number shown as the owner wrote it. Reviews through `<lb-reviews>` only.

**Motion:** none on the first screen (speed is the message); a small "open now" badge from the record. Motion here would cost time and say nothing.

### A coaching institute in Chennai

**Facts:** an institute in Anna Nagar, Chennai preparing students in classes 11 and 12 for engineering and medical entrance exams. Small batches, weekday evening and weekend classes, a library hall for self-study. Tamil and English; parents often prefer Tamil, students English. Mid price. The owner gives real batch timings and fees, and last year's results only as "students placed" numbers he can document (he has the list). Competitors: large chains with hero banners full of student photos and rank numbers, flashing "admissions open" banners, crowded layouts.

**Raw material:** the timetable, the exam countdown, notebooks and ruled paper, the library hall, two audiences (the parent who pays, the student who studies), the two languages, Chennai's afternoon heat (evening classes).

**Concepts considered:**
1. *The timetable:* the site is built around the batch timetable and the months to the exam; every section answers a parent's question in order.
2. *Study notebook:* ruled paper texture, handwritten-style annotations, warm and student-friendly.
3. *Results wall:* lead with documented results in a bold grid like the chains do, but honest.

**Choice:** 1, with the parent's questions as the spine and a Tamil page for parents. The one feeling is "my child will be guided, week by week". Concept 3 competes on the chains' ground with fewer numbers and invites claims the owner cannot document. Concept 2 is charming for students but parents pay; it can live as a detail (ruled lines in the timetable section).

**Design system moves:** a clear Latin sans paired with a Tamil face designed for screens, Tamil line height raised; a calm palette from school things (ink blue, paper, one marker colour for highlights), avoiding the chains' red and yellow; the timetable as a real HTML table that reflows into day cards on phones; batch timings and fees in a marked list the owner updates each term; numbers only as the owner documents them, with what they mean ("students in last year's batch who got a seat") and no ranks or percentages he cannot show; WhatsApp as the primary action (how parents there contact a centre), the visit as the second. A Tamil page (`language: "ta"`) written for parents, not a word-for-word translation.

**Motion:** a quiet count of days to the next exam date the owner gives (a marked field, `count-up` only on that one number), and the timetable rows appearing in sequence once. Motion says "a plan, step by step".

## What the four have in common

Nothing visual. Each started from facts about place, people, trade and market; each considered real alternatives; each chose the concept that best served one feeling and one action; each wrote a system specific enough that it could not be pasted onto the others. That is the method. Apply it fresh every time.
