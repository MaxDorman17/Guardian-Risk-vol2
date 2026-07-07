# Guardian Risk Ltd — Website (vol2)

Complete redesign of [guardianrisk.co.uk](https://guardianrisk.co.uk) in the **Dark Authority** brand direction. Static HTML / CSS / JS — no build step, no framework.

## Brand

| Token | Value |
|-------|-------|
| Background | `#0E1116` |
| Panel | `#141922` |
| Deep band | `#0B0E12` |
| Text | `#EDEAE3` |
| Muted | `#9BA1AA` |
| Accent (brass) | `#C6A15B` — CTAs & eyebrow labels only |
| Display type | Fraunces (300) |
| Body / UI type | Archivo (400/500/600) |

Corners are 0px everywhere; borders are 0.5px hairlines. Motion is limited to fade-up on scroll (0.7s, 90ms stagger) and a single slow hero video loop — nothing else is animated. No gradients, no glassmorphism, no emoji.

## Pages

- `index.html` — Home (hero, services, process, commitments, sectors, CTA)
- `services.html` — Eight services in detail
- `about.html` — Approach, process, commitments
- `contact.html` — Consultation form + privacy notice
- `404.html` — Not found

## Media to supply

The hero expects real footage (per brand: real photography/footage only, no AI). Drop in:

- `assets/video/hero.mp4` — slow, dark, cinematic loop (muted, ~10–20s, H.264)
- `assets/img/hero-poster.jpg` — first-frame poster / fallback still

Until these exist the hero shows the dark base treatment — no broken state.

## Contact form

`js/main.js` handles the form client-side only (validation, honeypot, rate-limit) and currently shows a success message without sending. Wire `form.submit` to a backend or form service (e.g. Formspree, a serverless function, or the existing site's endpoint) before launch.

## Local preview

Any static server, e.g.:

```
npx serve .
```

## Deploy

Static host (Cloudflare Pages / Netlify / the existing hosting). See the deploy playbook for Coolify + Cloudflare Tunnel if self-hosting.
