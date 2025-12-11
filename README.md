# TxAI Designer — Web/PWA Starter (Textile + Fashion)

This is a lightweight Progressive Web App starter for **TxAI Designer** — a Textile + Fashion design toolset (Pattern Lab, Color Lab, Fabric Analyzer, Moodboard, AI Tutor).

## Features (starter)
- Pattern Lab (prompt + placeholder generation)
- Color Lab (base color -> simple palette)
- Fabric Lab (simple analyzer)
- Moodboard (image uploads)
- AI Tutor (canned responses; connect to backend for full LLM)
- PWA manifest and service worker (installable on mobile & desktop)
- Responsive layout

## How to use
1. Unzip and host the folder on any static host (GitHub Pages, Netlify, Vercel, or a simple web server).
2. Open `index.html` on your phone browser and use "Install" to add to home screen (PWA).
3. To create an Android package (APK) from this PWA, use **PWABuilder** (https://www.pwabuilder.com) — upload the hosted URL and follow the wizard to generate packages for Android and Windows.
4. To connect the AI features, implement API calls in `app.js` to your FastAPI backend (`/api/v1/ask`, `/api/v1/generate-pattern` etc).

## Quick local test
- Use a simple static server. For example, if you have Python installed:
  ```bash
  python3 -m http.server 8000
  # then open http://localhost:8000 in browser
  ```

## Next steps I can help with
- Deploy to GitHub Pages and connect GitHub Pages link automatically to PWABuilder for Android package.
- Integrate with FastAPI backend (I can provide backend starter).
- Create Play Store assets and publish guide.

---
Made for Andrew — TxAI Designer starter
