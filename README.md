# Silent Organ Speaks

A warm, editorial website for a **liver health patient advocate** — inspired by the
storytelling and warmth of [savor.it](https://www.savor.it/), reimagined around liver
health. The name plays on the liver being the body's "silent organ."

The site is a fast, dependency-free **static website** (plain HTML, CSS, and a little
JavaScript). No build step, no framework — open it in a browser or drop it on any
static host.

## Pages

| Page | File | Purpose |
| --- | --- | --- |
| **Home** | `index.html` | Hero, the three focus areas, and previews of each section |
| **My Story** | `story.html` | The advocate's personal journey — intro, pull quote, timeline |
| **Understanding MASH** | `mash.html` | Plain-language MASH / MASLD education, risk factors, FAQ, disclaimer |
| **Recipes** | `recipes.html` | Liver-friendly recipe collection with a featured recipe |
| **Speaking** | `speaking.html` | Talk topics, formats, events calendar, testimonials |
| **Contact** | `contact.html` | Contact form + newsletter signup |

## Design system

- **Typography:** [Inter](https://fonts.google.com/specimen/Inter) for bold, confident display + body type, with [Fraunces](https://fonts.google.com/specimen/Fraunces) reserved for expressive serif-italic accent words. Loaded from Google Fonts with system fallbacks.
- **Palette:** a bold, high-contrast system — Rich Mahogany `#2C0000` (text / dark panels), Dust Grey `#E6DED9` and White `#FFFFFF` (backgrounds), with Lime Green `#41CE00` and Inferno Red `#A80505` used **sparingly** as accent pops. All defined as CSS variables at the top of `assets/css/styles.css`.
- **Motion:** buttery scroll-reveal, floating organic "blobs" with scroll parallax, a nav that solidifies on scroll, and a subtle film-grain texture. Respects `prefers-reduced-motion`.

Everything lives in two shared files:

```
assets/css/styles.css   → all styling + design tokens (:root variables)
assets/js/main.js        → nav, mobile menu, scroll reveal, accordion, forms
```

## Make it yours

1. **Add your name & story** — search the files for placeholder copy (e.g. in `story.html`)
   and replace it with your words. Update the email address in `contact.html`.
2. **Add photos** — the tan/green gradient tiles marked `Add a photo` / `Recipe photo`
   are `<div class="ph">` placeholders. Replace one with a real image:
   ```html
   <div class="ph"><img src="assets/img/your-photo.jpg" alt="Describe the photo" /></div>
   ```
   Drop image files into `assets/img/`.
3. **Recolor** — change the color variables in the `:root` block of `styles.css`.
4. **Social links** — replace the `href="#"` values in the footer/contact social icons.

### Wiring up the forms

The contact and newsletter forms are front-end only right now. To receive submissions
without a server, point the form at a form service — e.g. [Formspree](https://formspree.io):

```html
<form class="form" action="https://formspree.io/f/your-id" method="POST">
```

Then remove the `data-demo` attribute so the browser submits normally. [Netlify Forms](https://docs.netlify.com/forms/setup/)
works too — add `netlify` to the `<form>` tag when hosting on Netlify.

## Preview locally

Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy

Any static host works — the site is just files:

- **GitHub Pages:** Settings → Pages → deploy from this branch (root).
- **Netlify / Vercel / Cloudflare Pages:** point at the repo; no build command, publish directory `/`.

## A note on the health content

The MASH and recipe pages are **educational** and reflect a patient's advocacy — they are
not medical or nutritional advice. Each relevant page includes a visible disclaimer
encouraging readers to consult qualified professionals.
