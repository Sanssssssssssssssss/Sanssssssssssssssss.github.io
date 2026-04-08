const yearNode = document.getElementById("current-year");
const projectsGrid = document.getElementById("projects-grid");
const projectsStatus = document.getElementById("projects-status");
const photoTrackPrimary = document.getElementById("photo-track-primary");
const photoTrackSecondary = document.getElementById("photo-track-secondary");
const githubUser = "Sanssssssssssssssss";
const websiteRepo = `${githubUser}.github.io`.toLowerCase();
const photoManifestUrl = "assets/photos/manifest.json";
const supportedPhotoExtensions = new Set([".png", ".jpg", ".jpeg", ".heic", ".svg"]);
const featuredRepos = new Set([
  "KeySight-Oscilloscope-Automation-Software",
  "UDP-High-Speed-Image-Receiver-Display-System",
  "Ragclaw",
  "endoscopic-image-acquisition-system"
].map((name) => name.toLowerCase()));

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatDate(dateString) {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(date);
}

function createTag(label) {
  return `<span class="tag">${escapeHtml(label)}</span>`;
}

function createStatRow(label, value) {
  return `
    <div class="stat-row">
      <span class="stat-key">${escapeHtml(label)}</span>
      <strong class="stat-value">${escapeHtml(value)}</strong>
    </div>
  `;
}

function truncateDescriptionForCard(text, maxLength = 168) {
  const normalizedText = String(text || "").replace(/\s+/g, " ").trim();

  if (!normalizedText || normalizedText.length <= maxLength) {
    return normalizedText;
  }

  const searchWindow = normalizedText.slice(0, maxLength + 1);
  const boundaries = [".", "!", "?", "。", "！", "？"]
    .map((token) => searchWindow.lastIndexOf(token))
    .filter((index) => index >= Math.floor(maxLength * 0.55));

  if (boundaries.length) {
    return normalizedText.slice(0, Math.max(...boundaries) + 1).trim();
  }

  return `${normalizedText.slice(0, maxLength).trimEnd()}...`;
}

function getFileExtension(path) {
  const cleanPath = String(path || "").split("?")[0].split("#")[0];
  const lastDotIndex = cleanPath.lastIndexOf(".");

  return lastDotIndex === -1 ? "" : cleanPath.slice(lastDotIndex).toLowerCase();
}

function prettifyPhotoLabel(src) {
  const fileName = String(src || "").split("/").pop() || "Photo";
  const stem = fileName.replace(/\.[^.]+$/, "");

  return stem
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function createPhotoCard(photo, duplicateLabel = "") {
  const alt = photo.alt || prettifyPhotoLabel(photo.src);
  const caption = photo.caption || prettifyPhotoLabel(photo.src);
  const duplicateSuffix = duplicateLabel ? ` ${duplicateLabel}` : "";

  return `
    <figure class="photo-card" data-photo-ext="${escapeHtml(getFileExtension(photo.src))}">
      <img src="${escapeHtml(photo.src)}" alt="${escapeHtml(`${alt}${duplicateSuffix}`)}" loading="lazy">
      <figcaption>${escapeHtml(caption)}</figcaption>
    </figure>
  `;
}

function hydratePhotoTrack(trackNode) {
  if (!trackNode) {
    return;
  }

  trackNode.querySelectorAll("img").forEach((imageNode) => {
    imageNode.addEventListener("error", () => {
      const cardNode = imageNode.closest(".photo-card");

      if (cardNode) {
        cardNode.classList.add("photo-card-error");
        cardNode.setAttribute("hidden", "");
      }
    });
  });
}

function renderPhotoGallery(photos) {
  if (!photoTrackPrimary || !photoTrackSecondary) {
    return;
  }

  const validPhotos = photos.filter((photo) => {
    if (!photo || !photo.src) {
      return false;
    }

    return supportedPhotoExtensions.has(getFileExtension(photo.src));
  });

  if (!validPhotos.length) {
    photoTrackPrimary.innerHTML = "";
    photoTrackSecondary.innerHTML = "";
    return;
  }

  const duplicatedPrimary = [...validPhotos, ...validPhotos];
  const reversedPhotos = validPhotos.slice().reverse();
  const duplicatedSecondary = [...reversedPhotos, ...reversedPhotos];

  photoTrackPrimary.innerHTML = duplicatedPrimary
    .map((photo, index) => createPhotoCard(photo, index >= validPhotos.length ? "duplicate" : ""))
    .join("");

  photoTrackSecondary.innerHTML = duplicatedSecondary
    .map((photo, index) => createPhotoCard(photo, index >= reversedPhotos.length ? "duplicate" : ""))
    .join("");

  hydratePhotoTrack(photoTrackPrimary);
  hydratePhotoTrack(photoTrackSecondary);
}

function decodeBase64Utf8(base64Text) {
  const binary = atob(base64Text.replace(/\n/g, ""));
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));

  return new TextDecoder().decode(bytes);
}

function renderProjects(repos) {
  if (!projectsGrid || !projectsStatus) {
    return;
  }

  if (!repos.length) {
    projectsGrid.innerHTML = "";
    projectsStatus.textContent = "No additional public repositories to show yet.";
    return;
  }

  const cards = repos.map((repo, index) => {
    const description = truncateDescriptionForCard(
      repo.description || "Repository summary not provided yet. Open the detail page to inspect the project directly."
    );
    const language = repo.language || "Mixed stack";
    const updatedAt = formatDate(repo.pushed_at);
    const detailUrl = `project.html?repo=${encodeURIComponent(repo.name)}`;
    const starLabel = `${repo.stargazers_count} star${repo.stargazers_count === 1 ? "" : "s"}`;

    return `
      <article class="project-card">
        <p class="project-index">Archive ${String(index + 1).padStart(2, "0")}</p>
        <a class="project-title-link" href="${detailUrl}">
          <h3>${escapeHtml(repo.name)}</h3>
        </a>
        <p class="project-description">${escapeHtml(description)}</p>
        <p class="project-meta">${escapeHtml(starLabel)} · Updated ${escapeHtml(updatedAt)}</p>
        <div class="project-tag-row">
          ${createTag(language)}
          <a class="project-detail-button" href="${detailUrl}">View details</a>
        </div>
      </article>
    `;
  });

  projectsGrid.innerHTML = cards.join("");
  projectsStatus.textContent = "Additional repositories, sorted by public signal and recent activity.";
}

async function loadProjects() {
  if (!projectsGrid || !projectsStatus) {
    return;
  }

  try {
    const response = await fetch(`https://api.github.com/users/${githubUser}/repos?per_page=100`);

    if (!response.ok) {
      throw new Error(`GitHub API responded with ${response.status}`);
    }

    const data = await response.json();
    const repos = data
      .filter((repo) => !repo.fork)
      .filter((repo) => !repo.archived)
      .filter((repo) => repo.name.toLowerCase() !== websiteRepo)
      .filter((repo) => !featuredRepos.has(repo.name.toLowerCase()))
      .sort((leftRepo, rightRepo) => {
        if (rightRepo.stargazers_count !== leftRepo.stargazers_count) {
          return rightRepo.stargazers_count - leftRepo.stargazers_count;
        }

        return new Date(rightRepo.pushed_at).getTime() - new Date(leftRepo.pushed_at).getTime();
      })
      .slice(0, 6);

    renderProjects(repos);
  } catch (error) {
    projectsStatus.textContent = "Unable to load the repository archive right now.";
  }
}

async function loadPhotoGallery() {
  if (!photoTrackPrimary || !photoTrackSecondary) {
    return;
  }

  try {
    const response = await fetch(photoManifestUrl, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`Gallery manifest responded with ${response.status}`);
    }

    const data = await response.json();
    renderPhotoGallery(Array.isArray(data) ? data : []);
  } catch (error) {
    photoTrackPrimary.innerHTML = "";
    photoTrackSecondary.innerHTML = "";
  }
}

async function loadProjectDetail() {
  const nameNode = document.getElementById("project-name");

  if (!nameNode) {
    return;
  }

  const descriptionNode = document.getElementById("project-description");
  const githubLinkNode = document.getElementById("project-github-link");
  const homeLinkNode = document.getElementById("project-home-link");
  const statsNode = document.getElementById("project-stats");
  const readmeNode = document.getElementById("project-readme");
  const seedNode = document.getElementById("detail-seed");
  const languageNode = document.getElementById("detail-lang");
  const params = new URLSearchParams(window.location.search);
  const repoName = params.get("repo");

  if (!repoName) {
    document.title = "Project not found | Chang (Sans) Xu";
    nameNode.textContent = "Project not found";
    descriptionNode.textContent = "No repository name was provided in the URL.";
    readmeNode.textContent = "Add ?repo=repository-name to the URL to open a repository detail view.";
    return;
  }

  try {
    const repoResponse = await fetch(`https://api.github.com/repos/${githubUser}/${encodeURIComponent(repoName)}`);

    if (!repoResponse.ok) {
      throw new Error(`GitHub API responded with ${repoResponse.status}`);
    }

    const repo = await repoResponse.json();
    const readmeResponse = await fetch(`https://api.github.com/repos/${githubUser}/${encodeURIComponent(repoName)}/readme`);
    const readmeData = readmeResponse.ok ? await readmeResponse.json() : null;

    document.title = `${repo.name} | Chang (Sans) Xu`;
    nameNode.textContent = repo.name;
    descriptionNode.textContent = repo.description || "No repository description yet. Use the README and repository history for deeper context.";
    githubLinkNode.href = repo.html_url;

    if (repo.homepage) {
      homeLinkNode.href = repo.homepage;
      homeLinkNode.classList.remove("hidden-link");
    }

    seedNode.textContent = `Repository #${repo.id}`;
    languageNode.textContent = `Language: ${repo.language || "Unknown"}`;

    statsNode.innerHTML = [
      createStatRow("Visibility", repo.private ? "Private" : "Public"),
      createStatRow("Primary language", repo.language || "Unknown"),
      createStatRow("Last update", formatDate(repo.pushed_at)),
      createStatRow("Stars", String(repo.stargazers_count)),
      createStatRow("Open issues", String(repo.open_issues_count)),
      createStatRow("Default branch", repo.default_branch)
    ].join("");

    if (readmeData && readmeData.content) {
      readmeNode.textContent = decodeBase64Utf8(readmeData.content).slice(0, 8000);
    } else {
      readmeNode.textContent = "No README available for this repository yet.";
    }
  } catch (error) {
    document.title = `${repoName} | Chang (Sans) Xu`;
    nameNode.textContent = repoName;
    descriptionNode.textContent = "Unable to load this repository right now.";
    readmeNode.textContent = "GitHub repository details could not be fetched.";
  }
}

loadProjects();
loadPhotoGallery();
loadProjectDetail();
