#!/usr/bin/env python3
"""Render social/calendar.json into social/instagram-30-day-calendar.md.

calendar.json is the single source of truth: post-card.html reads it to
prefill cards and captions, and this script turns it into a readable
markdown calendar. Edit the JSON, then run:

    python3 social/build-calendar.py
"""
import json
import pathlib

HERE = pathlib.Path(__file__).parent
data = json.loads((HERE / "calendar.json").read_text(encoding="utf-8"))

out = []
out.append("# Instagram 30-day calendar\n")
out.append(
    "Generated from `calendar.json`. Days are numbered, not dated, so you can "
    "start any Monday. Each entry has the post format, what the image should "
    "say (use `post-card.html` to make it), a caption ready to paste, and a "
    "hashtag set.\n"
)
out.append("## Weekly rhythm\n")
out.append("| Day | Pillar |\n| --- | --- |")
for day, pillar in data["pillars"].items():
    out.append(f"| {day} | {pillar} |")
out.append("")
out.append(f"Disclaimer to keep in your bio and on health posts: *{data['brand']['disclaimer']}*\n")

week = 0
for p in data["posts"]:
    if p["weekday"] == "Mon":
        week += 1
        out.append(f"\n## Week {week}\n")
    c = p["card"]
    out.append(f"### Day {p['day']} · {p['weekday']} · {p['pillar']}\n")
    out.append(f"**Format:** {p['format']}  ")
    out.append(f"**Goal / CTA:** {p['cta']}\n")
    out.append(f"**Image (template: {c['template']}, {c['theme']}):**\n")
    if c.get("eyebrow"):
        out.append(f"- Eyebrow: {c['eyebrow']}")
    out.append(f"- Headline: {c['headline']}")
    if c.get("body"):
        out.append(f"- Body: {c['body']}")
    if c.get("footnote"):
        out.append(f"- Footnote: {c['footnote']}")
    out.append("\n**Caption:**\n")
    out.append("```text")
    out.append(p["caption"])
    out.append("")
    out.append(" ".join(p["hashtags"]))
    out.append("```\n")

(HERE / "instagram-30-day-calendar.md").write_text("\n".join(out) + "\n", encoding="utf-8")
print(f"Wrote instagram-30-day-calendar.md with {len(data['posts'])} posts")
