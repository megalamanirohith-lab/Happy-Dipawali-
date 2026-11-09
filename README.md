# Happy Deepawali Greeting Website

A responsive, video-inspired Diwali greeting experience with animated diya, fireworks, falling petals, a wish section, and an original browser-generated tone pattern.

## Run locally
Open `index.html` in a modern browser. For best results, use a local server:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000`.

## Deploy to Vercel
1. Create a GitHub repository and upload `index.html`, `style.css`, and `script.js`.
2. Sign in at https://vercel.com and choose **Add New → Project**.
3. Import your GitHub repository.
4. Framework Preset: **Other**. Build Command: leave empty. Output Directory: `.`.
5. Click **Deploy**. Vercel will provide a public URL you can share.

You can also deploy the folder with the Vercel CLI:
```bash
npm i -g vercel
cd happy-deepawali
vercel
```

## Music
The page uses a small original sequence generated with the Web Audio API. Browsers require a visitor interaction before audio can play, so visitors tap **Sound off** to turn it on. No copyrighted song or external audio file is used.

## Customize
- Change the signature in `index.html`.
- Change the colors and layout in `style.css`.
- Adjust the generated notes and timing in `script.js`.
