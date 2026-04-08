const yearNode = document.getElementById("current-year");
const projectsGrid = document.getElementById("projects-grid");
const projectsStatus = document.getElementById("projects-status");
const photoTrackPrimary = document.getElementById("photo-track-primary");
const photoTrackSecondary = document.getElementById("photo-track-secondary");
const githubUser = "Sanssssssssssssssss";
const websiteRepo = `${githubUser}.github.io`.toLowerCase();
const photoManifestUrl = "assets/photos/manifest.json";
const supportedPhotoExtensions = new Set([".png", ".jpg", ".jpeg", ".heic", ".svg"]);
const featuredProjectCopy = {
  "keysight-automation-studio": {
    repo: "KeySight-Oscilloscope-Automation-Software",
    summary:
      "面向 Keysight 示波器自动化的 Windows 桌面客户端，把设备连接、波形采集、预设管理、脚本批处理和结果导出放进同一个 Qt 工作流。",
    imageUrl: "https://raw.githubusercontent.com/Sanssssssssssssssss/KeySight-Oscilloscope-Automation-Software/main/docs/images/ui-home.png",
    placeholderLabel: "QT",
    placeholderHint: "桌面自动化"
  },
  "udp-image-receiver-display": {
    repo: "UDP-High-Speed-Image-Receiver-Display-System",
    summary:
      "一个高性能 UDP 图像接收与显示系统，可处理每秒 24,000 个、每包 1300 字节的数据包，并完成实时重建与显示。",
    imageUrl: "https://github.com/user-attachments/assets/b0fc7950-9bdb-48c0-bc12-6f7179a92130",
    placeholderLabel: "UDP",
    placeholderHint: "24,000 packets/s"
  },
  ragclaw: {
    repo: "Ragclaw",
    summary:
      "本地优先的 RAG / Agent workbench，用于迭代研究、可检查的检索流程，以及可编辑的长期上下文。",
    placeholderLabel: "RAG",
    placeholderHint: "本地优先"
  },
  "ov6946-fpga-image-preprocess-accel-pipeline": {
    repo: "ov6946-fpga-image-preprocess-accel-pipeline",
    summary:
      "基于 OV6946 的 FPGA 图像预处理加速链路，包含 DDR3 帧缓存、双边滤波、拉普拉斯锐化、HDMI 输出，以及可选的以太网传输模块。",
    placeholderLabel: "FPGA",
    placeholderHint: "图像预处理"
  }
};
const featuredRepos = new Set(
  Object.values(featuredProjectCopy).map((entry) => entry.repo.toLowerCase())
);
const fallbackProjects = [
  {
    name: "ecg_sqi_fusion",
    description: "Project ecg_sqi_fusion for PhysioNet Challenge 2011.",
    language: "Python",
    html_url: "https://github.com/Sanssssssssssssssss/ecg_sqi_fusion",
    stargazers_count: 2,
    pushed_at: "2026-03-28T00:00:00Z"
  },
  {
    name: "C2_Coursework",
    description: "Temporal repository for C2 high performance computing coursework.",
    language: "C++",
    html_url: "https://github.com/Sanssssssssssssssss/C2_Coursework",
    stargazers_count: 1,
    pushed_at: "2026-04-01T00:00:00Z"
  },
  {
    name: "RL_For_Auto_Multi_Game_Agent",
    description: "RL experiments for automated multi-game agents.",
    language: "Mixed",
    html_url: "https://github.com/Sanssssssssssssssss/RL_For_Auto_Multi_Game_Agent",
    stargazers_count: 1,
    pushed_at: "2025-10-29T00:00:00Z"
  },
  {
    name: "endoscopic-image-acquisition-system",
    description: "FPGA-based low-latency endoscopic image acquisition system.",
    language: "Mixed",
    html_url: "https://github.com/Sanssssssssssssssss/endoscopic-image-acquisition-system",
    stargazers_count: 1,
    pushed_at: "2025-02-15T00:00:00Z"
  },
  {
    name: "Software_for_Gemini_Ultra",
    description: "Application software experiments and tooling around Gemini Ultra.",
    language: "Python",
    html_url: "https://github.com/Sanssssssssssssssss/Software_for_Gemini_Ultra",
    stargazers_count: 0,
    pushed_at: "2025-01-20T00:00:00Z"
  },
  {
    name: "cc-mini-kimi",
    description: "Lightweight AI tooling experiments.",
    language: "Python",
    html_url: "https://github.com/Sanssssssssssssssss/cc-mini-kimi",
    stargazers_count: 0,
    pushed_at: "2025-01-18T00:00:00Z"
  },
  {
    name: "langgraph-personal-agent",
    description: "Personal agent workflows built with LangGraph.",
    language: "Python",
    html_url: "https://github.com/Sanssssssssssssssss/langgraph-personal-agent",
    stargazers_count: 0,
    pushed_at: "2025-01-12T00:00:00Z"
  },
  {
    name: "Yolov8n-for-paperseed",
    description: "YOLOv8n experiments for paper seed detection tasks.",
    language: "Python",
    html_url: "https://github.com/Sanssssssssssssssss/Yolov8n-for-paperseed",
    stargazers_count: 0,
    pushed_at: "2025-01-08T00:00:00Z"
  }
];
const fallbackProjectMap = Object.fromEntries(
  fallbackProjects.map((project) => [project.name.toLowerCase(), project])
);

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

if (typeof window !== "undefined" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.body.classList.add("motion-enabled");
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

  if (Number.isNaN(date.getTime())) {
    return "未知";
  }

  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(date);
}

function createTag(label) {
  return `<span class="tag">${escapeHtml(label)}</span>`;
}

function decodeBase64Utf8(base64Text) {
  const binary = atob(base64Text.replace(/\n/g, ""));
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));

  return new TextDecoder().decode(bytes);
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

function createStatRow(label, value) {
  return `
    <div class="stat-row">
      <span class="stat-key">${escapeHtml(label)}</span>
      <strong class="stat-value">${escapeHtml(value)}</strong>
    </div>
  `;
}

function resolveGithubImageUrl(source, repoName, branchName) {
  const cleanedSource = String(source || "").trim().replace(/^['"]|['"]$/g, "");

  if (!cleanedSource) {
    return "";
  }

  if (/^https?:\/\//i.test(cleanedSource)) {
    return cleanedSource;
  }

  if (cleanedSource.startsWith("//")) {
    return `https:${cleanedSource}`;
  }

  const normalizedPath = cleanedSource.replace(/^\.\//, "").replace(/^\//, "");

  return `https://raw.githubusercontent.com/${githubUser}/${encodeURIComponent(repoName)}/${encodeURIComponent(branchName)}/${normalizedPath}`;
}

function extractFirstImageUrl(markdown, repoName, branchName) {
  const sources = [];
  const markdownImageRegex = /!\[[^\]]*]\(([^)]+)\)/g;
  const htmlImageRegex = /<img[^>]+src=["']([^"']+)["']/gi;

  for (const match of markdown.matchAll(markdownImageRegex)) {
    const source = match[1].trim().split(/\s+/)[0];
    sources.push(source);
  }

  for (const match of markdown.matchAll(htmlImageRegex)) {
    sources.push(match[1].trim());
  }

  const usableSource = sources.find((source) => {
    return !/(shields\.io|badge|badge\.svg|stars\?style|forks\?style)/i.test(source);
  });

  return usableSource ? resolveGithubImageUrl(usableSource, repoName, branchName) : "";
}

function createFeaturedVisual(imageUrl, label, hint) {
  if (imageUrl) {
    return `<img src="${escapeHtml(imageUrl)}" alt="${escapeHtml(label)} 项目预览图" loading="lazy">`;
  }

  return `
    <div class="featured-placeholder">
      <strong>${escapeHtml(label)}</strong>
      <span>${escapeHtml(hint)}</span>
    </div>
  `;
}

function setFeaturedProjectContent(key, payload) {
  const summaryNode = document.querySelector(`[data-featured-summary="${key}"]`);
  const metaNode = document.querySelector(`[data-featured-meta="${key}"]`);
  const visualNode = document.querySelector(`[data-featured-visual="${key}"]`);

  if (summaryNode) {
    summaryNode.textContent = payload.summary;
  }

  if (metaNode) {
    metaNode.textContent = `更新于 ${formatDate(payload.updatedAt)}`;
  }

  if (visualNode) {
    visualNode.innerHTML = createFeaturedVisual(payload.imageUrl, payload.placeholderLabel, payload.placeholderHint);
  }
}

function renderProjects(repos) {
  if (!projectsGrid || !projectsStatus) {
    return;
  }

  if (!repos.length) {
    projectsGrid.innerHTML = "";
    projectsStatus.textContent = "暂时没有更多公开项目。";
    return;
  }

  const cards = repos.map((repo, index) => {
    const description = truncateDescriptionForCard(repo.description || "这个项目暂时没有补充说明。");
    const language = repo.language || "Mixed";
    const updatedAt = formatDate(repo.pushed_at);
    const detailUrl = `project.html?repo=${encodeURIComponent(repo.name)}`;
    return `
      <article
        class="project-card clickable-card"
        tabindex="0"
        role="link"
        data-detail-url="${escapeHtml(detailUrl)}"
        aria-label="打开 ${escapeHtml(repo.name)} 项目详情"
      >
        <div class="project-card-main">
          <p class="project-index">项目 ${String(index + 1).padStart(2, "0")}</p>
          <h3>${escapeHtml(repo.name)}</h3>
          <p class="project-description">${escapeHtml(description)}</p>
        </div>
        <div class="project-card-footer">
          <div class="project-footer-meta">
            <p class="project-meta">更新于 ${escapeHtml(updatedAt)}</p>
            ${createTag(language)}
          </div>
          <a class="project-detail-button" href="${escapeHtml(repo.html_url)}" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </article>
    `;
  });

  projectsGrid.innerHTML = cards.join("");
  projectsStatus.textContent = "按公开信号和最近更新排序。";
  initializeRevealMotion();
}

function enableCardNavigation() {
  document.addEventListener("click", (event) => {
    if (event.target.closest("a, button")) {
      return;
    }

    const card = event.target.closest("[data-detail-url]");

    if (card) {
      window.location.href = card.dataset.detailUrl;
    }
  });

  document.addEventListener("keydown", (event) => {
    const card = event.target.closest("[data-detail-url]");

    if (!card) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      window.location.href = card.dataset.detailUrl;
    }
  });
}

function prepareRevealGrid(gridNode) {
  if (!gridNode) {
    return [];
  }

  const cards = Array.from(gridNode.children).filter((node) => {
    return node.classList?.contains("featured-card") || node.classList?.contains("project-card");
  });

  cards.forEach((card, index) => {
    card.classList.add("reveal-card");
    card.style.setProperty("--reveal-delay", `${Math.min(index, 7) * 70}ms`);
  });

  return cards;
}

function initializeRevealMotion() {
  if (!document.body.classList.contains("motion-enabled")) {
    return;
  }

  const cards = [
    ...prepareRevealGrid(document.querySelector(".featured-grid")),
    ...prepareRevealGrid(document.getElementById("projects-grid"))
  ];

  if (!cards.length) {
    return;
  }

  if (!("IntersectionObserver" in window)) {
    cards.forEach((card) => card.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  cards.forEach((card) => observer.observe(card));
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
      .slice(0, 8);

    renderProjects(repos);
  } catch (error) {
    renderProjects(fallbackProjects);
    projectsStatus.textContent = "正在显示缓存的公开项目。";
  }
}

async function loadFeaturedProjects() {
  const entries = Object.entries(featuredProjectCopy);

  if (!entries.length) {
    return;
  }

  await Promise.all(
    entries.map(async ([key, entry]) => {
      try {
        const repoResponse = await fetch(`https://api.github.com/repos/${githubUser}/${encodeURIComponent(entry.repo)}`);

        if (!repoResponse.ok) {
          throw new Error(`GitHub API responded with ${repoResponse.status}`);
        }

        const repo = await repoResponse.json();
        let imageUrl = entry.imageUrl || "";

        if (!imageUrl) {
          try {
            const readmeResponse = await fetch(
              `https://api.github.com/repos/${githubUser}/${encodeURIComponent(entry.repo)}/readme`
            );

            if (readmeResponse.ok) {
              const readmeData = await readmeResponse.json();
              const markdown = readmeData.content ? decodeBase64Utf8(readmeData.content) : "";
              imageUrl = extractFirstImageUrl(markdown, repo.name, repo.default_branch);
            }
          } catch (error) {
            imageUrl = entry.imageUrl || "";
          }
        }

        setFeaturedProjectContent(key, {
          summary: entry.summary || repo.description || "这个项目暂时没有补充说明。",
          stars: repo.stargazers_count,
          updatedAt: repo.pushed_at,
          imageUrl,
          placeholderLabel: entry.placeholderLabel,
          placeholderHint: entry.placeholderHint
        });
      } catch (error) {
        setFeaturedProjectContent(key, {
          summary: entry.summary || "这个项目暂时没有补充说明。",
          stars: 0,
          updatedAt: new Date().toISOString(),
          imageUrl: entry.imageUrl || "",
          placeholderLabel: entry.placeholderLabel,
          placeholderHint: entry.placeholderHint
        });
      }
    })
  );
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
    document.title = "项目未找到 | Chang Xu";
    nameNode.textContent = "项目未找到";
    descriptionNode.textContent = "链接里没有仓库名。";
    readmeNode.textContent = "在地址里加入 ?repo=repository-name 可以打开项目详情页。";
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

    document.title = `${repo.name} | Chang Xu`;
    nameNode.textContent = repo.name;
    descriptionNode.textContent = repo.description || "这个项目暂时没有补充说明。";
    githubLinkNode.href = repo.html_url;

    if (repo.homepage) {
      homeLinkNode.href = repo.homepage;
      homeLinkNode.classList.remove("hidden-link");
    }

    seedNode.textContent = `项目 #${repo.id}`;
    languageNode.textContent = `语言: ${repo.language || "未知"}`;

    statsNode.innerHTML = [
      createStatRow("可见性", repo.private ? "私有" : "公开"),
      createStatRow("语言", repo.language || "未知"),
      createStatRow("更新", formatDate(repo.pushed_at)),
      createStatRow("星标", String(repo.stargazers_count)),
      createStatRow("问题", String(repo.open_issues_count)),
      createStatRow("分支", repo.default_branch)
    ].join("");

    if (readmeData && readmeData.content) {
      readmeNode.textContent = decodeBase64Utf8(readmeData.content).slice(0, 8000);
    } else {
      readmeNode.textContent = "这个项目暂时没有 README。";
    }
  } catch (error) {
    const featuredEntry = Object.values(featuredProjectCopy).find(
      (entry) => entry.repo.toLowerCase() === repoName.toLowerCase()
    );
    const fallbackProject = fallbackProjectMap[repoName.toLowerCase()];

    document.title = `${repoName} | Chang Xu`;
    nameNode.textContent = repoName;
    descriptionNode.textContent =
      featuredEntry?.summary ||
      fallbackProject?.description ||
      "暂时无法载入这个项目。";
    githubLinkNode.href = fallbackProject?.html_url || `https://github.com/${githubUser}/${encodeURIComponent(repoName)}`;
    seedNode.textContent = "项目";
    languageNode.textContent = `语言: ${fallbackProject?.language || "未知"}`;

    statsNode.innerHTML = [
      createStatRow("可见性", "公开"),
      createStatRow("语言", fallbackProject?.language || "未知"),
      createStatRow("更新", fallbackProject ? formatDate(fallbackProject.pushed_at) : "未知"),
      createStatRow("星标", String(fallbackProject?.stargazers_count || 0))
    ].join("");
    readmeNode.textContent = "GitHub 项目信息暂时不可用，当前显示的是缓存说明。";
  }
}

enableCardNavigation();
loadProjects();
loadFeaturedProjects();
loadPhotoGallery();
loadProjectDetail();
initializeRevealMotion();
