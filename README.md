# Ashwini Ravi Nair — Portfolio (corporate edition)

React + TypeScript + Vite. The background sky is a raw WebGL fragment shader (no libraries).

## Run locally
    npm install
    npm run dev

## Build
    npm run build          # standard multi-file build in dist/ (Netlify, Vercel, GitHub Pages…)
    npm run build:single   # one self-contained dist/index.html

## Where to edit
- src/data.ts                       – name, intro text, projects, email and social links
- src/components/ZoomScene.tsx      – scroll timeline (laptop → room → TV)
- src/components/LaptopScreen.tsx   – the three mock websites on the laptop
- src/components/TvScreen.tsx       – the message on the TV
- src/styles.css                    – colour tokens (light + dark) at the top
