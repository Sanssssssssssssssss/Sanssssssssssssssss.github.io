const yearNode = document.getElementById("current-year");
const projectsGrid = document.getElementById("projects-grid");
const projectsStatus = document.getElementById("projects-status");
const githubUser = "Sanssssssssssssssss";
const websiteRepo = `${githubUser}.github.io`.toLowerCase();

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
  return `<span class="project-tag">${escapeHtml(label)}</span>`;
}

function renderProjects(repos) {
  if (!projectsGrid || !projectsStatus) {
    return;
  }

  if (!repos.length) {
    projectsStatus.textContent = "No public repositories available yet.";
    return;
  }

  const cards = repos.map((repo, index) => {
    const description = repo.description || "No description yet. The repository itself is the latest source of truth.";
    const language = repo.language || "Code";
    const updatedAt = formatDate(repo.pushed_at);
    const stars = repo.stargazers_count;

    return `
      <article class="project-card">
        <p class="project-index">${String(index + 1).padStart(2, "0")}</p>
        <a class="project-title-link" href="${repo.html_url}" target="_blank" rel="noreferrer">
          <h3>${escapeHtml(repo.name)}</h3>
        </a>
        <p>${escapeHtml(description)}</p>
        <p class="project-meta">Updated ${escapeHtml(updatedAt)} · ${stars} star${stars === 1 ? "" : "s"}</p>
        <div class="project-tag-row">
          ${createTag(language)}
          ${createTag("Public")}
        </div>
      </article>
    `;
  });

  projectsGrid.innerHTML = cards.join("");
  projectsStatus.textContent = "Projects are synced from GitHub public repositories.";
}

async function loadProjects() {
  if (!projectsGrid || !projectsStatus) {
    return;
  }

  try {
    const response = await fetch(`https://api.github.com/users/${githubUser}/repos?sort=updated&per_page=12`);

    if (!response.ok) {
      throw new Error(`GitHub API responded with ${response.status}`);
    }

    const data = await response.json();
    const repos = data
      .filter((repo) => !repo.fork)
      .filter((repo) => !repo.archived)
      .filter((repo) => repo.name.toLowerCase() !== websiteRepo)
      .slice(0, 3);

    renderProjects(repos);
  } catch (error) {
    projectsStatus.textContent = "Unable to load GitHub repositories right now.";
  }
}

loadProjects();
