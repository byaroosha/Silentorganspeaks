# Daily Instagram posting kit

A ten-minute-a-day system for promoting Silent Organ Speaks on Instagram, built from the words already on the site.

## What is here

| File | What it is |
| --- | --- |
| `instagram-30-day-calendar.md` | 60 ready-to-post days: format, image text, chart data, caption, hashtags |
| `calendar.json` | The same 60 posts as data. The card maker reads it. Edit here, then rebuild the markdown |
| `build-calendar.py` | Regenerates the markdown from the JSON (`python3 social/build-calendar.py`) |
| `post-card.html` | Brand-styled image maker. Pick a day, download a 1080px PNG, copy the caption. Fourteen color themes and ten templates, including bar, donut and comparison charts and numbered steps |
| `hashtags-and-templates.md` | Bio, hashtag sets, caption formulas, story ideas, reel hooks, DM reply scripts |

## The daily routine

1. Open `post-card.html` (see below), choose today's day number.
2. Download the card. For a recipe or story day, use a real photo instead if you have one; the card is the fallback.
3. Press "Copy caption", paste it into Instagram, and post.
4. Reply to every comment and DM from yesterday. Fifteen minutes of replies beats a second post.
5. Post one story using the daily prompt in `hashtags-and-templates.md`.

Best posting window: when your audience is awake and scrolling, usually 7 to 9am or 7 to 9pm local time. Pick one and stay consistent for a month before changing it.

## Opening the card maker

The card maker draws your logo onto the image, which browsers only allow when the page is served over http. From the repository root:

```bash
python3 -m http.server 8000
# then open http://localhost:8000/social/post-card.html
```

If the site is on GitHub Pages or Netlify, the page is also live at `/social/post-card.html` on your domain.

## After day 60

Repeat the weekly rhythm with new material. The pillars stay the same, only the content rotates:

- Monday: another myth, another term, another "reasons for hope" fact from `mash.html`.
- Tuesday: the next recipe you cook. Photograph it before anyone eats.
- Wednesday: one moment from your story. One per post, never the whole story.
- Thursday: one test from the Living Well page you have not covered yet (GGT, bilirubin, platelets, MRI-PDFF).
- Friday: a question a follower asked in the Friday question box.
- Saturday: what you actually did this week to live well.
- Sunday: the best comment of the week, or a stat.

Add new posts to `calendar.json` with the next day number and run the build script. Chart cards take a `data` field with one row per line, written as `Label | value` (or `value | label`). The card maker picks them up automatically.

## Guardrails

- Every health post carries a disclaimer line. The card maker adds one by default on dark cards.
- Every statistic names its source in the card footnote (journal and year, or the organization). Days 1 to 30 use the figures already on the site; Days 31 to 60 cite published studies and society guidance. Adding a new number means adding its source, and rounding it the way the source does.
- Share your experience as experience ("what worked for me, with my care team"), never as a prescription.
- Never answer a medical question in DMs. Use the reply scripts.
