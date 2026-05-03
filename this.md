<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>My Projects</title>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --bg: #0a0a0a;
    --bg-card: #111111;
    --bg-card-hover: #161616;
    --text-primary: #f0ede8;
    --text-secondary: #888680;
    --text-muted: #444240;
    --accent: #e8d5b0;
    --accent-dim: #6b5f45;
    --border: rgba(240, 237, 232, 0.06);
    --border-hover: rgba(240, 237, 232, 0.15);
    --tag-bg: rgba(232, 213, 176, 0.07);
    --tag-text: #a89870;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text-primary);
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* Noise overlay */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
    opacity: 0.5;
  }

  section {
    position: relative;
    z-index: 1;
    max-width: 1100px;
    margin: 0 auto;
    padding: 120px 40px;
  }

  /* Header */
  .section-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 80px;
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }

  .section-header.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .header-left { max-width: 520px; }

  .eyebrow {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
  }

  .eyebrow-line {
    width: 32px;
    height: 1px;
    background: var(--accent-dim);
  }

  .eyebrow span {
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--accent-dim);
    font-weight: 500;
  }

  h2 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(42px, 5.5vw, 68px);
    font-weight: 800;
    line-height: 0.95;
    letter-spacing: -0.03em;
    color: var(--text-primary);
  }

  h2 em {
    font-style: italic;
    font-weight: 400;
    color: var(--accent);
  }

  .project-count {
    font-family: 'Syne', sans-serif;
    font-size: 80px;
    font-weight: 800;
    color: var(--text-muted);
    line-height: 1;
    letter-spacing: -0.04em;
    user-select: none;
  }

  /* Filter tabs */
  .filters {
    display: flex;
    gap: 8px;
    margin-bottom: 48px;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s;
  }

  .filters.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .filter-btn {
    padding: 8px 18px;
    border-radius: 100px;
    border: 1px solid var(--border);
    background: transparent;
    color: var(--text-secondary);
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 400;
    cursor: pointer;
    transition: all 0.25s ease;
    letter-spacing: 0.01em;
  }

  .filter-btn:hover {
    border-color: var(--border-hover);
    color: var(--text-primary);
  }

  .filter-btn.active {
    background: var(--accent);
    border-color: var(--accent);
    color: #1a1510;
    font-weight: 500;
  }

  /* Grid */
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 16px;
  }

  /* Card base */
  .project-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 20px;
    overflow: hidden;
    cursor: pointer;
    position: relative;
    opacity: 0;
    transform: translateY(40px);
    transition:
      opacity 0.7s ease,
      transform 0.7s ease,
      border-color 0.3s ease,
      background 0.3s ease,
      filter 0.4s ease;
  }

  .project-card.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .project-card:hover {
    border-color: var(--border-hover);
    background: var(--bg-card-hover);
  }

  .project-card.faded {
    filter: opacity(0.3) saturate(0.3);
  }

  /* Card sizes */
  .card-large  { grid-column: span 7; }
  .card-medium { grid-column: span 5; }
  .card-small  { grid-column: span 4; }
  .card-wide   { grid-column: span 8; }

  @media (max-width: 768px) {
    .card-large, .card-medium, .card-small, .card-wide {
      grid-column: span 12;
    }
    .projects-grid { gap: 12px; }
    section { padding: 80px 24px; }
    .section-header { flex-direction: column; align-items: flex-start; gap: 16px; }
    .project-count { font-size: 48px; }
  }

  /* Card inner */
  .card-inner {
    padding: 28px 28px 24px;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .card-large .card-inner,
  .card-wide .card-inner {
    min-height: 340px;
  }

  .card-medium .card-inner,
  .card-small .card-inner {
    min-height: 280px;
  }

  /* Visual area */
  .card-visual {
    flex: 1;
    border-radius: 12px;
    margin-bottom: 20px;
    overflow: hidden;
    position: relative;
  }

  .visual-bg {
    width: 100%;
    height: 100%;
    min-height: 160px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    transition: transform 0.5s ease;
  }

  .project-card:hover .visual-bg {
    transform: scale(1.02);
  }

  /* Unique visual per card */
  .v1 { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%); }
  .v2 { background: linear-gradient(135deg, #1a1200 0%, #2d1f00 50%, #3d2d00 100%); }
  .v3 { background: linear-gradient(135deg, #0d1a0d 0%, #162816 50%, #1e3320 100%); }
  .v4 { background: linear-gradient(135deg, #1a0d0d 0%, #2d1414 50%, #3d2020 100%); }
  .v5 { background: linear-gradient(135deg, #0d0d1a 0%, #14142d 50%, #1e1e3d 100%); }

  /* SVG illustrations inside visuals */
  .card-visual svg {
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
  }

  /* Card content */
  .card-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .card-number {
    font-family: 'Syne', sans-serif;
    font-size: 11px;
    color: var(--text-muted);
    letter-spacing: 0.1em;
  }

  .card-status {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    color: var(--text-muted);
  }

  .status-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #4ade80;
    box-shadow: 0 0 6px #4ade8066;
    animation: pulse-dot 2.5s ease infinite;
  }

  @keyframes pulse-dot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.85); }
  }

  .card-title {
    font-family: 'Syne', sans-serif;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--text-primary);
    margin-bottom: 6px;
    line-height: 1.2;
  }

  .card-desc {
    font-size: 13px;
    line-height: 1.6;
    color: var(--text-secondary);
    margin-bottom: 16px;
    flex: 1;
  }

  .card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .tag {
    font-size: 11px;
    padding: 4px 10px;
    border-radius: 100px;
    background: var(--tag-bg);
    color: var(--tag-text);
    letter-spacing: 0.02em;
    border: 1px solid rgba(232, 213, 176, 0.08);
    white-space: nowrap;
  }

  /* Arrow button */
  .arrow-btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1px solid var(--border);
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    cursor: pointer;
    transition: all 0.25s ease;
  }

  .project-card:hover .arrow-btn {
    background: var(--accent);
    border-color: var(--accent);
    transform: rotate(45deg);
  }

  .arrow-btn svg {
    width: 14px;
    height: 14px;
    stroke: var(--text-secondary);
    transition: stroke 0.25s ease;
  }

  .project-card:hover .arrow-btn svg {
    stroke: #1a1510;
  }

  /* Custom cursor blob */
  .cursor-blob {
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(232,213,176,0.06) 0%, transparent 70%);
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: opacity 0.4s ease;
    opacity: 0;
  }

  /* Horizontal rule */
  .section-rule {
    width: 100%;
    height: 1px;
    background: var(--border);
    margin-bottom: 32px;
    opacity: 0;
    transition: opacity 0.8s ease 0.1s;
  }

  .section-rule.visible { opacity: 1; }

  /* Card shimmer on load */
  @keyframes card-in {
    from { opacity: 0; transform: translateY(40px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Stagger delays */
  .project-card:nth-child(1) { transition-delay: 0.05s; }
  .project-card:nth-child(2) { transition-delay: 0.15s; }
  .project-card:nth-child(3) { transition-delay: 0.25s; }
  .project-card:nth-child(4) { transition-delay: 0.1s; }
  .project-card:nth-child(5) { transition-delay: 0.2s; }
  .project-card:nth-child(6) { transition-delay: 0.3s; }

  /* Spotlight effect on card hover */
  .card-spotlight {
    position: absolute;
    inset: 0;
    border-radius: 20px;
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
    background: radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
      rgba(232,213,176,0.04), transparent 60%);
  }

  .project-card:hover .card-spotlight { opacity: 1; }

  /* Animated grid lines background */
  .grid-bg {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    background-image:
      linear-gradient(rgba(240,237,232,0.015) 1px, transparent 1px),
      linear-gradient(90deg, rgba(240,237,232,0.015) 1px, transparent 1px);
    background-size: 80px 80px;
    mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 100%);
  }
</style>
</head>
<body>

<div class="grid-bg"></div>
<div class="cursor-blob" id="cursorBlob"></div>

<section>
  <div class="section-header" id="sectionHeader">
    <div class="header-left">
      <div class="eyebrow">
        <div class="eyebrow-line"></div>
        <span>Selected work</span>
      </div>
      <h2>My<br><em>Projects</em></h2>
    </div>
    <div class="project-count" id="countDisplay">06</div>
  </div>

  <div class="section-rule" id="sectionRule"></div>

  <div class="filters" id="filtersRow">
    <button class="filter-btn active" data-filter="all">All</button>
    <button class="filter-btn" data-filter="web">Web</button>
    <button class="filter-btn" data-filter="mobile">Mobile</button>
    <button class="filter-btn" data-filter="design">Design</button>
    <button class="filter-btn" data-filter="ai">AI / ML</button>
  </div>

  <div class="projects-grid" id="projectsGrid">

    <!-- Card 1 — large -->
    <article class="project-card card-large" data-category="web ai">
      <div class="card-spotlight"></div>
      <div class="card-inner">
        <div class="card-visual">
          <div class="visual-bg v1">
            <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
              <defs>
                <radialGradient id="g1" cx="50%" cy="50%" r="60%">
                  <stop offset="0%" stop-color="#3d6bb0" stop-opacity="0.4"/>
                  <stop offset="100%" stop-color="#0f3460" stop-opacity="0"/>
                </radialGradient>
              </defs>
              <rect width="400" height="200" fill="url(#g1)"/>
              <!-- Neural net nodes -->
              <g opacity="0.6">
                <circle cx="60" cy="60" r="5" fill="#5a9ae0" class="nn1"/>
                <circle cx="60" cy="100" r="5" fill="#5a9ae0"/>
                <circle cx="60" cy="140" r="5" fill="#5a9ae0"/>
                <circle cx="160" cy="50" r="5" fill="#7ab0e8"/>
                <circle cx="160" cy="80" r="5" fill="#7ab0e8"/>
                <circle cx="160" cy="110" r="5" fill="#7ab0e8"/>
                <circle cx="160" cy="140" r="5" fill="#7ab0e8"/>
                <circle cx="160" cy="170" r="5" fill="#7ab0e8"/>
                <circle cx="260" cy="70" r="5" fill="#9ac5f0"/>
                <circle cx="260" cy="100" r="5" fill="#9ac5f0"/>
                <circle cx="260" cy="130" r="5" fill="#9ac5f0"/>
                <circle cx="340" cy="100" r="7" fill="#bcd8f8"/>
                <!-- connections layer 1→2 -->
                <line x1="65" y1="60"  x2="155" y2="50"  stroke="#3d6bb0" stroke-width="0.8" opacity="0.5"/>
                <line x1="65" y1="60"  x2="155" y2="80"  stroke="#3d6bb0" stroke-width="0.8" opacity="0.5"/>
                <line x1="65" y1="60"  x2="155" y2="110" stroke="#3d6bb0" stroke-width="0.8" opacity="0.3"/>
                <line x1="65" y1="100" x2="155" y2="80"  stroke="#3d6bb0" stroke-width="0.8" opacity="0.5"/>
                <line x1="65" y1="100" x2="155" y2="110" stroke="#3d6bb0" stroke-width="0.8" opacity="0.5"/>
                <line x1="65" y1="100" x2="155" y2="140" stroke="#3d6bb0" stroke-width="0.8" opacity="0.3"/>
                <line x1="65" y1="140" x2="155" y2="110" stroke="#3d6bb0" stroke-width="0.8" opacity="0.3"/>
                <line x1="65" y1="140" x2="155" y2="140" stroke="#3d6bb0" stroke-width="0.8" opacity="0.5"/>
                <line x1="65" y1="140" x2="155" y2="170" stroke="#3d6bb0" stroke-width="0.8" opacity="0.5"/>
                <!-- connections layer 2→3 -->
                <line x1="165" y1="50"  x2="255" y2="70"  stroke="#5a80c0" stroke-width="0.8" opacity="0.5"/>
                <line x1="165" y1="80"  x2="255" y2="70"  stroke="#5a80c0" stroke-width="0.8" opacity="0.5"/>
                <line x1="165" y1="110" x2="255" y2="100" stroke="#5a80c0" stroke-width="0.8" opacity="0.5"/>
                <line x1="165" y1="140" x2="255" y2="130" stroke="#5a80c0" stroke-width="0.8" opacity="0.5"/>
                <line x1="165" y1="170" x2="255" y2="130" stroke="#5a80c0" stroke-width="0.8" opacity="0.4"/>
                <!-- connections layer 3→4 -->
                <line x1="265" y1="70"  x2="333" y2="100" stroke="#7aa0d8" stroke-width="1" opacity="0.6"/>
                <line x1="265" y1="100" x2="333" y2="100" stroke="#7aa0d8" stroke-width="1" opacity="0.6"/>
                <line x1="265" y1="130" x2="333" y2="100" stroke="#7aa0d8" stroke-width="1" opacity="0.6"/>
              </g>
              <!-- Animated pulse -->
              <circle cx="340" cy="100" r="14" fill="none" stroke="#bcd8f8" stroke-width="1" opacity="0.3">
                <animate attributeName="r" values="7;22;7" dur="3s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.4;0;0.4" dur="3s" repeatCount="indefinite"/>
              </circle>
            </svg>
          </div>
        </div>
        <div class="card-meta">
          <span class="card-number">01</span>
          <div class="card-status"><div class="status-dot"></div>Live</div>
        </div>
        <div class="card-title">NeuralDash</div>
        <div class="card-desc">A real-time ML model monitoring platform. Visualize training runs, compare experiments, and deploy with confidence.</div>
        <div class="card-footer">
          <div class="card-tags">
            <span class="tag">React</span>
            <span class="tag">Python</span>
            <span class="tag">AI / ML</span>
          </div>
          <button class="arrow-btn" aria-label="View project">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
          </button>
        </div>
      </div>
    </article>

    <!-- Card 2 — medium -->
    <article class="project-card card-medium" data-category="design web">
      <div class="card-spotlight"></div>
      <div class="card-inner">
        <div class="card-visual">
          <div class="visual-bg v2">
            <svg viewBox="0 0 280 160" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
              <defs>
                <radialGradient id="g2" cx="40%" cy="60%" r="60%">
                  <stop offset="0%" stop-color="#d4a017" stop-opacity="0.35"/>
                  <stop offset="100%" stop-color="#1a1200" stop-opacity="0"/>
                </radialGradient>
              </defs>
              <rect width="280" height="160" fill="url(#g2)"/>
              <!-- Geometric shapes -->
              <rect x="30" y="30" width="60" height="60" rx="8" fill="none" stroke="#c8921e" stroke-width="1" opacity="0.5"/>
              <rect x="42" y="42" width="36" height="36" rx="4" fill="#c8921e" opacity="0.15"/>
              <circle cx="190" cy="85" r="40" fill="none" stroke="#d4a017" stroke-width="1" opacity="0.3"/>
              <circle cx="190" cy="85" r="25" fill="none" stroke="#d4a017" stroke-width="1" opacity="0.4"/>
              <circle cx="190" cy="85" r="10" fill="#d4a017" opacity="0.25"/>
              <line x1="90" y1="60" x2="150" y2="85" stroke="#b08020" stroke-width="0.8" opacity="0.5" stroke-dasharray="4 3"/>
              <line x1="90" y1="60" x2="150" y2="60" stroke="#b08020" stroke-width="0.8" opacity="0.4"/>
              <!-- Grid overlay -->
              <g opacity="0.12" stroke="#d4a017" stroke-width="0.5">
                <line x1="0" y1="80" x2="280" y2="80"/>
                <line x1="140" y1="0" x2="140" y2="160"/>
              </g>
              <!-- Animated ring -->
              <circle cx="190" cy="85" r="48" fill="none" stroke="#d4a017" stroke-width="0.8" opacity="0.2" stroke-dasharray="8 6">
                <animateTransform attributeName="transform" type="rotate" from="0 190 85" to="360 190 85" dur="12s" repeatCount="indefinite"/>
              </circle>
            </svg>
          </div>
        </div>
        <div class="card-meta">
          <span class="card-number">02</span>
          <div class="card-status"><div class="status-dot"></div>Live</div>
        </div>
        <div class="card-title">Aura Design System</div>
        <div class="card-desc">A comprehensive component library and design token system built for scalable product teams.</div>
        <div class="card-footer">
          <div class="card-tags">
            <span class="tag">Figma</span>
            <span class="tag">Storybook</span>
          </div>
          <button class="arrow-btn" aria-label="View project">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
          </button>
        </div>
      </div>
    </article>

    <!-- Card 3 — small -->
    <article class="project-card card-small" data-category="mobile">
      <div class="card-spotlight"></div>
      <div class="card-inner">
        <div class="card-visual">
          <div class="visual-bg v3" style="min-height:130px">
            <svg viewBox="0 0 220 130" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
              <defs>
                <radialGradient id="g3" cx="50%" cy="40%" r="55%">
                  <stop offset="0%" stop-color="#22c55e" stop-opacity="0.3"/>
                  <stop offset="100%" stop-color="#0d1a0d" stop-opacity="0"/>
                </radialGradient>
              </defs>
              <rect width="220" height="130" fill="url(#g3)"/>
              <!-- Phone outline -->
              <rect x="75" y="10" width="70" height="110" rx="12" fill="none" stroke="#22c55e" stroke-width="1.2" opacity="0.5"/>
              <rect x="80" y="20" width="60" height="85" rx="6" fill="#22c55e" opacity="0.06"/>
              <circle cx="110" cy="115" r="4" fill="none" stroke="#22c55e" stroke-width="1" opacity="0.5"/>
              <rect x="97" y="13" width="26" height="3" rx="1.5" fill="#22c55e" opacity="0.3"/>
              <!-- Screen content lines -->
              <rect x="86" y="28" width="48" height="3" rx="1.5" fill="#22c55e" opacity="0.35"/>
              <rect x="86" y="36" width="36" height="2" rx="1" fill="#22c55e" opacity="0.2"/>
              <rect x="86" y="46" width="48" height="22" rx="4" fill="#22c55e" opacity="0.08"/>
              <rect x="91" y="51" width="16" height="2" rx="1" fill="#22c55e" opacity="0.4"/>
              <rect x="86" y="74" width="20" height="2" rx="1" fill="#22c55e" opacity="0.2"/>
              <rect x="86" y="80" width="48" height="2" rx="1" fill="#22c55e" opacity="0.15"/>
            </svg>
          </div>
        </div>
        <div class="card-meta">
          <span class="card-number">03</span>
        </div>
        <div class="card-title">Habitual</div>
        <div class="card-desc">Habit tracking app for iOS with a focus on gentle, non-judgmental UX.</div>
        <div class="card-footer">
          <div class="card-tags"><span class="tag">Swift</span><span class="tag">iOS</span></div>
          <button class="arrow-btn" aria-label="View project">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
          </button>
        </div>
      </div>
    </article>

    <!-- Card 4 — medium -->
    <article class="project-card card-medium" data-category="web design">
      <div class="card-spotlight"></div>
      <div class="card-inner">
        <div class="card-visual">
          <div class="visual-bg v4" style="min-height:130px">
            <svg viewBox="0 0 260 140" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
              <defs>
                <radialGradient id="g4" cx="55%" cy="50%" r="55%">
                  <stop offset="0%" stop-color="#e85555" stop-opacity="0.35"/>
                  <stop offset="100%" stop-color="#1a0d0d" stop-opacity="0"/>
                </radialGradient>
              </defs>
              <rect width="260" height="140" fill="url(#g4)"/>
              <!-- Wave chart -->
              <polyline points="20,110 50,80 80,90 110,50 140,65 170,35 200,55 230,30 260,45" fill="none" stroke="#e85555" stroke-width="1.5" opacity="0.6"/>
              <polyline points="20,110 50,80 80,90 110,50 140,65 170,35 200,55 230,30 260,45 260,140 20,140" fill="#e85555" opacity="0.04"/>
              <!-- Dots -->
              <circle cx="110" cy="50" r="3.5" fill="#e85555" opacity="0.8"/>
              <circle cx="170" cy="35" r="3.5" fill="#e85555" opacity="0.8"/>
              <circle cx="230" cy="30" r="3.5" fill="#e85555" opacity="0.8"/>
              <!-- Tooltip -->
              <rect x="145" y="12" width="70" height="24" rx="5" fill="#3d1414" stroke="#e85555" stroke-width="0.8" opacity="0.8"/>
              <text x="180" y="27" text-anchor="middle" fill="#e85555" font-size="10" opacity="0.9" font-family="monospace">+42.8%</text>
              <line x1="180" y1="36" x2="170" y2="35" stroke="#e85555" stroke-width="0.8" opacity="0.6" stroke-dasharray="3 2"/>
              <!-- Grid lines -->
              <g stroke="#e85555" stroke-width="0.4" opacity="0.1">
                <line x1="0" y1="35" x2="260" y2="35"/>
                <line x1="0" y1="70" x2="260" y2="70"/>
                <line x1="0" y1="105" x2="260" y2="105"/>
              </g>
            </svg>
          </div>
        </div>
        <div class="card-meta">
          <span class="card-number">04</span>
          <div class="card-status"><div class="status-dot"></div>Live</div>
        </div>
        <div class="card-title">Pulse Analytics</div>
        <div class="card-desc">A clean, minimal dashboard for tracking SaaS metrics and customer lifecycle data.</div>
        <div class="card-footer">
          <div class="card-tags"><span class="tag">Next.js</span><span class="tag">D3</span></div>
          <button class="arrow-btn" aria-label="View project">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
          </button>
        </div>
      </div>
    </article>

    <!-- Card 5 — small -->
    <article class="project-card card-small" data-category="ai web">
      <div class="card-spotlight"></div>
      <div class="card-inner">
        <div class="card-visual">
          <div class="visual-bg v5" style="min-height:130px">
            <svg viewBox="0 0 220 130" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
              <defs>
                <radialGradient id="g5" cx="50%" cy="50%" r="55%">
                  <stop offset="0%" stop-color="#a78bfa" stop-opacity="0.3"/>
                  <stop offset="100%" stop-color="#0d0d1a" stop-opacity="0"/>
                </radialGradient>
              </defs>
              <rect width="220" height="130" fill="url(#g5)"/>
              <!-- Chat bubbles -->
              <rect x="16" y="20" width="100" height="22" rx="11" fill="#a78bfa" opacity="0.15" stroke="#a78bfa" stroke-width="0.8" stroke-opacity="0.4"/>
              <rect x="20" y="27" width="60" height="7" rx="3.5" fill="#a78bfa" opacity="0.3"/>
              <rect x="104" y="52" width="100" height="22" rx="11" fill="#a78bfa" opacity="0.08" stroke="#a78bfa" stroke-width="0.8" stroke-opacity="0.3"/>
              <rect x="108" y="59" width="80" height="7" rx="3.5" fill="#a78bfa" opacity="0.2"/>
              <rect x="16" y="84" width="120" height="22" rx="11" fill="#a78bfa" opacity="0.12" stroke="#a78bfa" stroke-width="0.8" stroke-opacity="0.35"/>
              <rect x="20" y="91" width="85" height="7" rx="3.5" fill="#a78bfa" opacity="0.25"/>
              <!-- Typing indicator -->
              <rect x="104" y="112" width="56" height="15" rx="7.5" fill="#a78bfa" opacity="0.1" stroke="#a78bfa" stroke-width="0.6" stroke-opacity="0.3"/>
              <circle cx="118" cy="119.5" r="2.5" fill="#a78bfa" opacity="0.5">
                <animate attributeName="opacity" values="0.5;1;0.5" dur="1.2s" repeatCount="indefinite" begin="0s"/>
              </circle>
              <circle cx="128" cy="119.5" r="2.5" fill="#a78bfa" opacity="0.5">
                <animate attributeName="opacity" values="0.5;1;0.5" dur="1.2s" repeatCount="indefinite" begin="0.3s"/>
              </circle>
              <circle cx="138" cy="119.5" r="2.5" fill="#a78bfa" opacity="0.5">
                <animate attributeName="opacity" values="0.5;1;0.5" dur="1.2s" repeatCount="indefinite" begin="0.6s"/>
              </circle>
            </svg>
          </div>
        </div>
        <div class="card-meta">
          <span class="card-number">05</span>
        </div>
        <div class="card-title">Whisper UI</div>
        <div class="card-desc">Open-source chat interface layer for LLM APIs. Plug in any model.</div>
        <div class="card-footer">
          <div class="card-tags"><span class="tag">TypeScript</span><span class="tag">AI</span></div>
          <button class="arrow-btn" aria-label="View project">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
          </button>
        </div>
      </div>
    </article>

    <!-- Card 6 — wide -->
    <article class="project-card card-wide" data-category="web design">
      <div class="card-spotlight"></div>
      <div class="card-inner" style="flex-direction:row; gap:24px; align-items:center; min-height:160px">
        <div class="card-visual" style="flex:0 0 220px; min-height:130px; margin-bottom:0;">
          <div class="visual-bg v1" style="background: linear-gradient(135deg,#0a1a10 0%,#0d2a18 50%,#10382a 100%); min-height:130px">
            <svg viewBox="0 0 220 130" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
              <defs>
                <radialGradient id="g6" cx="50%" cy="50%" r="60%">
                  <stop offset="0%" stop-color="#10b981" stop-opacity="0.35"/>
                  <stop offset="100%" stop-color="#0a1a10" stop-opacity="0"/>
                </radialGradient>
              </defs>
              <rect width="220" height="130" fill="url(#g6)"/>
              <!-- Code brackets -->
              <text x="30" y="75" font-family="monospace" font-size="52" fill="#10b981" opacity="0.2">{</text>
              <text x="150" y="75" font-family="monospace" font-size="52" fill="#10b981" opacity="0.2">}</text>
              <!-- Code lines -->
              <rect x="60" y="35" width="45" height="4" rx="2" fill="#10b981" opacity="0.4"/>
              <rect x="70" y="46" width="70" height="3" rx="1.5" fill="#10b981" opacity="0.25"/>
              <rect x="70" y="56" width="55" height="3" rx="1.5" fill="#34d399" opacity="0.2"/>
              <rect x="60" y="67" width="75" height="3" rx="1.5" fill="#10b981" opacity="0.25"/>
              <rect x="70" y="77" width="60" height="3" rx="1.5" fill="#10b981" opacity="0.2"/>
              <rect x="70" y="87" width="40" height="3" rx="1.5" fill="#34d399" opacity="0.3"/>
              <rect x="60" y="98" width="45" height="4" rx="2" fill="#10b981" opacity="0.35"/>
              <!-- Animated cursor -->
              <rect x="105" y="87" width="2" height="10" rx="1" fill="#10b981" opacity="0.8">
                <animate attributeName="opacity" values="0.8;0;0.8" dur="1.1s" repeatCount="indefinite"/>
              </rect>
            </svg>
          </div>
        </div>
        <div style="flex:1; display:flex; flex-direction:column; justify-content:space-between; padding: 4px 0;">
          <div>
            <div class="card-meta" style="margin-bottom:8px">
              <span class="card-number">06</span>
              <div class="card-status"><div class="status-dot"></div>In Progress</div>
            </div>
            <div class="card-title">DevKit CLI</div>
            <div class="card-desc" style="margin-bottom:0">A powerful command-line toolkit for scaffolding full-stack projects with opinionated defaults, Git hooks, and CI templates baked in.</div>
          </div>
          <div class="card-footer" style="margin-top:16px">
            <div class="card-tags">
              <span class="tag">Node.js</span>
              <span class="tag">CLI</span>
              <span class="tag">Open Source</span>
            </div>
            <button class="arrow-btn" aria-label="View project">
              <svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
            </button>
          </div>
        </div>
      </div>
    </article>

  </div>
</section>

<script>
  // Cursor blob
  const blob = document.getElementById('cursorBlob');
  let blobX = 0, blobY = 0, mouseX = 0, mouseY = 0, blobVisible = false;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!blobVisible) {
      blob.style.opacity = '1';
      blobVisible = true;
    }
  });

  document.addEventListener('mouseleave', () => {
    blob.style.opacity = '0';
    blobVisible = false;
  });

  function animateBlob() {
    blobX += (mouseX - blobX) * 0.08;
    blobY += (mouseY - blobY) * 0.08;
    blob.style.left = blobX + 'px';
    blob.style.top  = blobY + 'px';
    requestAnimationFrame(animateBlob);
  }
  animateBlob();

  // Spotlight per card
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1) + '%';
      const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1) + '%';
      card.style.setProperty('--mouse-x', x);
      card.style.setProperty('--mouse-y', y);
    });
  });

  // Intersection observer for scroll reveal
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.project-card, .section-header, .filters, .section-rule')
    .forEach(el => observer.observe(el));

  // Filter logic
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');
  const countEl = document.getElementById('countDisplay');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      let visible = 0;

      cards.forEach(card => {
        const cats = card.dataset.category || '';
        const match = filter === 'all' || cats.split(' ').includes(filter);
        card.classList.toggle('faded', !match);
        if (match) visible++;
      });

      const n = String(visible).padStart(2, '0');
      countEl.style.transition = 'opacity 0.2s';
      countEl.style.opacity = '0';
      setTimeout(() => {
        countEl.textContent = n;
        countEl.style.opacity = '1';
      }, 200);
    });
  });

  // Trigger header/rule immediately
  setTimeout(() => {
    document.getElementById('sectionHeader').classList.add('visible');
    document.getElementById('sectionRule').classList.add('visible');
    document.getElementById('filtersRow').classList.add('visible');
  }, 80);
</script>
</body>
</html>