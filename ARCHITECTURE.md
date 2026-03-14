# ARCHITECTURE

## Current Technical Baseline

- Front-end: Static HTML, CSS, and vanilla JavaScript
- Entry page: `index.html`
- Additional page: `project.html`
- Styling: `styles.css`
- Behavior: `script.js`
- Assets: `assets/`
- Deployment target: Static hosting, likely GitHub Pages

## Architectural Principle

Favor a simple static architecture first. Introduce additional tooling or runtime dependencies only if justified by confirmed requirements.

## Module View

### Content Layer

- `index.html` defines primary site structure and content sections
- `project.html` supports project detail content

### Presentation Layer

- `styles.css` owns layout, theme, responsive behavior, and component styling

### Interaction Layer

- `script.js` owns lightweight client-side enhancements only

### Asset Layer

- `assets/icons/` contains decorative or thematic icons
- `assets/photos/` contains gallery images or placeholders
- `assets/photos/manifest.json` defines the photo gallery source for the homepage

### Tooling Layer

- `scripts/generate-photo-manifest.ps1` scans supported photo extensions and regenerates the gallery manifest for static hosting workflows

## Data Model

Current site data is embedded directly in static markup.

Potential future lightweight model, if needed:

- Profile
- Achievement
- Project
- Gallery item
- Contact link

This should remain in static data form unless dynamic content becomes a confirmed requirement.

## Interface Principles

- Prefer semantic HTML and stable section anchors
- Keep JavaScript optional and progressive where possible
- Avoid introducing backend APIs without explicit requirement
- Keep pages deployable as static files
- Use manifest-driven static data where runtime directory scanning is not possible on GitHub Pages

## Constraints

- Maintain compatibility with the existing repository structure unless there is a documented reason to change it
- Avoid over-engineering for content that is still being clarified

## Open Architectural Questions

- Whether content should stay inline in HTML or move to structured data files
- Whether the project needs a build step for asset optimization or templating
- Whether a second language version is needed
