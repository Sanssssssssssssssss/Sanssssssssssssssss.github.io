$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$photoDir = Join-Path $projectRoot "assets\photos"
$manifestPath = Join-Path $photoDir "manifest.json"
$allowedExtensions = @(".png", ".jpg", ".jpeg", ".heic", ".svg")
$existingEntriesBySrc = @{}

if (-not (Test-Path $photoDir)) {
  throw "Photo directory not found: $photoDir"
}

function Convert-ToTitle {
  param([string]$BaseName)

  $title = $BaseName -replace "[-_]+", " "
  $title = (Get-Culture).TextInfo.ToTitleCase($title.ToLowerInvariant())

  return $title
}

function Get-PhotoFallbackTitle {
  param(
    [string]$BaseName,
    [int]$Index
  )

  if ($BaseName -match "^[0-9a-f]{16,}$") {
    return "Photo {0:D2}" -f ($Index + 1)
  }

  return Convert-ToTitle -BaseName $BaseName
}

if (Test-Path $manifestPath) {
  $existingEntries = Get-Content $manifestPath -Raw | ConvertFrom-Json

  foreach ($entry in $existingEntries) {
    if ($entry.src) {
      $existingEntriesBySrc[$entry.src] = $entry
    }
  }
}

$photos = Get-ChildItem -Path $photoDir -File |
  Where-Object { $allowedExtensions -contains $_.Extension.ToLowerInvariant() } |
  Where-Object { $_.Name -ne "manifest.json" } |
  Sort-Object Name

$manifest = for ($index = 0; $index -lt $photos.Count; $index++) {
  $photo = $photos[$index]
  $relativePath = "assets/photos/$($photo.Name)"
  $title = Get-PhotoFallbackTitle -BaseName $photo.BaseName -Index $index
  $existingEntry = $existingEntriesBySrc[$relativePath]

  [PSCustomObject]@{
    src = $relativePath
    alt = if ($existingEntry.alt) { $existingEntry.alt } else { $title }
    caption = if ($existingEntry.caption) { $existingEntry.caption } else { $title }
  }
}

$manifest | ConvertTo-Json -Depth 3 | Set-Content -Path $manifestPath -Encoding utf8
Write-Output "Generated $manifestPath with $($manifest.Count) photo entries."
