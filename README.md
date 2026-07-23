# Tokenly-Auth Docs

Vanilla Vite documentation website for Tokenly-Auth, a database-agnostic authentication and session management utility library for Python.

## Features

- Vite-powered static docs app with no MkDocs runtime.
- Responsive navigation for desktop and mobile.
- Client-side search across all docs pages.
- Light and dark theme toggle with local storage persistence.
- Copy buttons for code blocks and the install command.
- On-page table of contents for module pages.
- Footer social links for:
  - https://github.com/err0rgod
  - https://err0rgod.medium.com
  - https://x.com/err0rgod

## Requirements

- Node.js 20 or newer is recommended.
- npm, pnpm, or yarn.

## Development

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Build the production site:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```text
.
├── docs/              # Original Markdown source docs
├── index.html         # Vite app entry
├── src/
│   ├── main.js        # Docs content, routing, search, theme, copy actions
│   └── styles.css     # Responsive site styling
├── package.json       # Vite scripts
└── README.md
```

## Editing Content

The live website content is defined in `src/main.js` as a small docs data array. The Markdown files in `docs/` are retained as source/reference material.

When adding a new docs page:

1. Add a new object to the `docs` array in `src/main.js`.
2. Give it a unique `id`, `section`, `title`, `summary`, and `body`.
3. Link to it with `#your-id`.

## Deployment

`npm run build` outputs static files to `dist/`. Deploy the `dist/` directory to any static host such as GitHub Pages, Netlify, Vercel, Cloudflare Pages, or an S3-backed static website.
