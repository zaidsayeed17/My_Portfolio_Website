# Deployment Guide

This project is built with **Vite + React** and is ready to deploy directly to **Vercel**, **Netlify**, **GitHub Pages**, or any modern static hosting platform.

---

## Pre-Deployment Checklist (`src/data/siteConfig.js`)

Before deploying to production, review the following fields in `src/data/siteConfig.js`:

| Config Field | Default | Description |
|---|---|---|
| `siteUrl` | `""` | Set to your live production domain (e.g. `https://zaidsayeed.vercel.app` or custom domain). When filled, enables canonical tags and absolute social preview URLs. |
| `email` | `"zaidsayeed17@gmail.com"` | Primary contact email address. |
| `phone` | `"9284419270"` | Contact phone number. |
| `showPhone` | `false` | Must stay `false` to keep phone number private. Set to `true` only if you wish to display it publicly. |
| `resumeUrl` | `""` | Direct link to your hosted PDF resume (e.g. Google Drive / GitHub release / `/resume.pdf`). Leave empty until ready. |
| `github` | `"https://github.com/zaidsayeed17"` | Your GitHub profile URL. |
| `linkedin` | `"https://www.linkedin.com/in/mohammad-zaid-sayeed-9b42b42b7/"` | Your LinkedIn profile URL. |

---

## Build Configuration

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node Version**: 18.x or higher (tested on Node v20/v22/v25)

---

## 1. Deploying to Vercel (Recommended)

### Option A: Via Vercel Web Dashboard (Git Integration)
1. Push your repository to GitHub.
2. Go to [Vercel](https://vercel.com) and log in.
3. Click **Add New...** -> **Project**.
4. Import your portfolio GitHub repository.
5. In **Build and Output Settings**:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Click **Deploy**.

> Note: The included `vercel.json` automatically configures SPA routing rewrites so subpages (such as `/projects`) load cleanly without 404s upon refreshing.

### Option B: Via Vercel CLI
```bash
npm install -g vercel
vercel login
vercel --prod
```

---

## 2. Deploying to Netlify

### Option A: Via Netlify Web Dashboard
1. Go to [Netlify](https://app.netlify.com/) and log in.
2. Click **Add new site** -> **Import an existing project**.
3. Connect your GitHub repository.
4. Set build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Click **Deploy site**.

> Note: The included `public/_redirects` file ensures all SPA routes redirect cleanly to `index.html` with HTTP status `200`.

### Option B: Via Netlify CLI
```bash
npm install -g netlify-cli
netlify login
netlify build
netlify deploy --prod --dir=dist
```

---

## 3. Local Production Preview

To test the production build locally before deploying:
```bash
# 1. Generate optimized production bundle
npm run build

# 2. Preview the production build locally
npm run preview
```
Visit the local URL shown in your terminal (usually `http://localhost:4173/`) to verify all assets and routing.
