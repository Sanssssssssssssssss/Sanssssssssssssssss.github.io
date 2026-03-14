# Personal Website

A static personal website and portfolio, designed for simple deployment on GitHub Pages.

## Live Site

- Website: [https://sanssssssssssssssss.github.io/](https://sanssssssssssssssss.github.io/)

## Overview

This repository contains the current implementation of a personal website with:

- a landing page and hero section
- profile and achievements sections
- a project showcase
- a photography gallery
- contact links

The current implementation uses plain HTML, CSS, and JavaScript to keep the project simple, lightweight, and easy to deploy.

## Project Structure

- `index.html`: main landing page
- `project.html`: project detail page
- `styles.css`: layout, theme, and responsive styles
- `script.js`: lightweight client-side interactions
- `assets/`: icons and gallery assets
- `assets/photos/manifest.json`: photo gallery manifest used by the homepage
- `scripts/generate-photo-manifest.ps1`: scans supported photo assets and regenerates the gallery manifest

## Local Preview

Because this is a static site, you can preview it locally with any simple file server.

Example with Python:

```bash
python -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000).

## Photo Gallery Workflow

The `Photo Biome` section now reads from `assets/photos/manifest.json` instead of hardcoded image tags.

Supported photo extensions:

- `.png`
- `.jpg`
- `.jpeg`
- `.heic`
- `.svg`

When you add or remove gallery files in `assets/photos/`, regenerate the manifest with:

```powershell
.\scripts\generate-photo-manifest.ps1
```

Notes:

- Existing `alt` and `caption` values already present in the manifest are preserved.
- `.heic` entries are recognized and included in the manifest, but browser rendering depends on client support. Browsers that cannot decode `.heic` will skip those images without breaking the gallery.

## Deployment

This repository is structured for GitHub Pages deployment.

1. Push the repository to GitHub.
2. Open repository `Settings`.
3. Go to `Pages`.
4. Under `Build and deployment`, choose `Deploy from a branch`.
5. Select the `main` branch and `/ (root)`.
6. Save and wait for GitHub Pages to publish the site.

If the repository remains the user site repository (`<username>.github.io`), the published URL is the root GitHub Pages domain for that account.

## Project Memory

To keep work consistent across sessions, project context is stored in:

- `PROJECT_BRIEF.md`
- `REQUIREMENTS.md`
- `ARCHITECTURE.md`
- `DECISIONS.md`
- `TASKS.md`
- `STATE.md`

## License

This project is released under the MIT License. See [LICENSE](LICENSE) for details.
