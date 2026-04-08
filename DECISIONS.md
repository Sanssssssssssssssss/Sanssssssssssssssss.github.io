# DECISIONS

## Decision Log

### 2026-03-14 - Use repository documents as persistent project memory

- Status: Accepted
- Reason:
  - Chat history is not a reliable long-term source of truth.
  - The user explicitly requires externalized project memory.
- Impact:
  - Future sessions should read project documents before acting.
  - Project state must be updated as work progresses.

### 2026-03-14 - Treat the current product as a personal website project

- Status: Accepted
- Reason:
  - Existing repository content and README define the current project as a personal website.
- Impact:
  - Initial planning, requirements, and tasks are aligned to a personal website unless changed explicitly.

### 2026-03-14 - Keep the initial architecture as static HTML/CSS/JS

- Status: Accepted
- Reason:
  - The current prototype already uses a static stack.
  - This is the simplest, lowest-risk path to a runnable version.
- Impact:
  - No framework, backend, or build system is introduced by default.
  - Any architectural change later requires explicit justification.

### 2026-03-14 - Treat the current visual theme as provisional

- Status: Accepted
- Reason:
  - The current Minecraft-inspired theme exists in code, but no document confirms it as final.
- Impact:
  - We can refine content and usability without assuming the theme is permanently locked.

### 2026-03-14 - Publish the verified live site URL in the repository README

- Status: Accepted
- Reason:
  - The repository is already connected to a GitHub Pages user-site remote.
  - Visitors to the repository should be able to reach the deployed site directly.
- Impact:
  - `README.md` should expose the production URL prominently.
  - Repository documentation should stay aligned with the deployed entry point.

### 2026-03-14 - Keep repository hygiene lightweight and practical

- Status: Accepted
- Reason:
  - This is a small static site repository.
  - Basic documentation and ignore rules provide value without adding process overhead.
- Impact:
  - Prefer README clarity, explicit license information, and a minimal `.gitignore`.
  - Do not add heavier community files unless there is a clear need.

### 2026-03-14 - Drive the photo gallery from a manifest instead of hardcoded image tags

- Status: Accepted
- Reason:
  - GitHub Pages cannot dynamically enumerate files in `assets/photos/` from the browser.
  - A manifest keeps the site static while allowing controlled support for multiple image extensions.
- Impact:
  - The homepage gallery is now rendered from `assets/photos/manifest.json`.
  - Photo asset changes should be followed by `scripts/generate-photo-manifest.ps1`.

### 2026-03-14 - Treat HEIC as recognized but browser-dependent

- Status: Accepted
- Reason:
  - The user explicitly wants gallery support for Apple HEIC photos.
  - Browser support for HEIC decoding is inconsistent across platforms and engines.
- Impact:
  - HEIC files are included in the manifest and accepted by the gallery pipeline.
  - Browsers that cannot decode HEIC should fail gracefully without breaking the gallery.

### 2026-03-16 - Order GitHub project cards by star count instead of recency

- Status: Accepted
- Reason:
  - The user wants the project showcase to emphasize the strongest public repositories rather than the most recently updated ones.
  - The GitHub user repositories API does not provide star sorting for this endpoint, so client-side sorting is the simplest compatible option.
- Impact:
  - The homepage now fetches a larger repo set and sorts eligible repositories by `stargazers_count` descending.
  - Recent update time is retained only as a tie-breaker and display field.

### 2026-03-21 - Prepare a dedicated branch for Cloudflare static deployment

- Status: Accepted
- Reason:
  - The user wants the same static site to be deployable beyond GitHub Pages.
  - Cloudflare Pages can track a dedicated Git branch without requiring a codebase restructure for this project.
- Impact:
  - A `codex/`-prefixed branch should be created and pushed with the current static site state.
  - Cloudflare deployment can point at the repository root with no build step unless later requirements change.

### 2026-03-21 - Use GitHub Actions to auto-deploy the Direct Upload Pages project

- Status: Accepted
- Reason:
  - The current Cloudflare Pages project was created with Direct Upload, and Cloudflare documents that Direct Upload projects cannot be switched to Git integration later.
  - The user wants Cloudflare to update automatically after GitHub pushes.
- Impact:
  - Automatic deployment is implemented via GitHub Actions plus Wrangler.
  - The workflow prepares a clean static upload directory and deploys it to the existing `chang-xu-portfolio` Pages project.

### 2026-04-08 - Reframe the portfolio toward job-seeking with a warm editorial theme

- Status: Accepted
- Reason:
  - The previous Minecraft-heavy presentation made the site feel playful first and professional second.
  - The user wants to preserve a small amount of pixel-icon personality while shifting the overall site toward a more mature, hiring-friendly tone inspired by Cursor's warm editorial visual language.
- Impact:
  - The homepage and project detail page use a warm cream palette, editorial typography, calmer cards, and product-portfolio information hierarchy.
  - Pixel / red-white-console iconography is kept only as a supporting accent language.
  - Core copy now foregrounds systems engineering, AI work, hardware-software co-design, and hiring relevance.
