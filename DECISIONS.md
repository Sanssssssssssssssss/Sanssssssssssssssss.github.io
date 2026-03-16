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
