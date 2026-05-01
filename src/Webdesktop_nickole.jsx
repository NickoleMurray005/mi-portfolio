import { useState, useEffect, useRef, useCallback } from "react";

// ============================================================
// DATA REAL — Nickole Murray
// ============================================================
const MOCK_DATA = {
  profile: {
    name: "Nickole Murray",
    title: "Tec. en Ingeniería · Desarrollo de Software",
    location: "Panamá",
    email: "nickolemurray32@gmail.com",
    phone: "6902-3927",
    whatsapp: "50769023927",
    linkedin: "linkedin.com/in/nickole-murray-2265891b4/",
    github: "github.com/nickole",
    website: "nickolemurray.dev",
    bio: "Desarrolladora de software apasionada por la tecnología y el aprendizaje constante. Me gusta asumir retos que me impulsen a crecer personal y profesionalmente. Actualmente desarrollo mi tesis enfocada en soluciones innovadoras.",
    avatar: "NM",
  },
  cv: {
    experience: [
      {
        role: "Analista de Datos Junior | Business Intelligence",
        company: "CSC Caballero",
        period: "2025 – Presente",
        location: "Panamá",
        bullets: [
          "Organización y análisis de información de ventas con Zoho Analytics y Power BI",
          "Extracción de data desde APIs mediante Python y manejo de bases de datos",
          "Implementación de factura electrónica",
          "Creación de reportes y dashboards para toma de decisiones comerciales",
        ],
      },
      {
        role: "Encargada de Delivery",
        company: "Farmacias Arrocha",
        period: "Anterior",
        location: "Panamá",
        bullets: [
          "Atención al cliente, Delivery, vendedora y cajera",
          "Uso de sistemas PDT, SAP y Shopify",
          "Manejo de clientes, redes sociales, agenda y organización de registros",
        ],
      },
    ],
    education: [
      {
        degree: "Lic. en Desarrollo de Software",
        school: "Universidad Tecnológica de Panamá",
        period: "En curso",
        note: "Finalizando — Tesis en soluciones innovadoras",
      },
      {
        degree: "Téc. en Ingeniería — Desarrollo de Software",
        school: "Universidad Tecnológica de Panamá",
        period: "Completado",
        note: "Estudiante Sigma Lambda · Capítulo de Honor UTP",
      },
    ],
    skills: {
      Backend:        ["Python", "Odoo ERP", "Customización", "Lógica de negocio"],
      Frontend:       ["HTML/CSS", "JavaScript", "Interfaces dinámicas"],
      Automatización: ["n8n", "APIs", "Webhooks", "LLMs", "IA Flows"],
      Datos:          ["SQL", "Power BI", "Zoho Analytics", "BI"],
      Multimedia:     ["Adobe Premiere", "CapCut", "Canva", "Office 365"],
    },
    languages: [
      { lang: "Español", level: "Nativo" },
      { lang: "Inglés",  level: "C1 – Avanzado" },
    ],
  },
  projects: [
    {
      id: 1,
      name: "Tesis — Solución Innovadora",
      description: "Proyecto de tesis en desarrollo enfocado en soluciones tecnológicas innovadoras para la industria.",
      tech: ["Python", "React", "SQL"],
      status: "En desarrollo",
      color: "#c084fc",
      icon: "🎓",
      links: { demo: "#", github: "#" },
      year: "2024",
    },
    {
      id: 2,
      name: "Dashboard BI — CSC Caballero",
      description: "Reportes y dashboards para análisis de ventas y seguimiento comercial con Zoho Analytics y Power BI.",
      tech: ["Power BI", "Zoho Analytics", "Python", "SQL"],
      status: "Producción",
      color: "#f9a8d4",
      icon: "📊",
      links: { demo: "#", github: "#" },
      year: "2023",
    },
    {
      id: 3,
      name: "Automatización con n8n",
      description: "Flujos avanzados de automatización con integración de APIs, Webhooks y tareas con inteligencia artificial.",
      tech: ["n8n", "APIs", "Webhooks", "LLMs"],
      status: "Producción",
      color: "#fda4af",
      icon: "⚡",
      links: { demo: "#", github: "#" },
      year: "2024",
    },
    {
      id: 4,
      name: "Factura Electrónica",
      description: "Implementación del sistema de facturación electrónica para cumplimiento normativo en empresa de consultoría.",
      tech: ["Python", "API DGI", "SQL"],
      status: "Producción",
      color: "#fbcfe8",
      icon: "🧾",
      links: { demo: "#", github: "#" },
      year: "2023",
    },
  ],
  fileSystem: [
    {
      name: "Proyectos",
      type: "folder",
      icon: "📁",
      children: [
        { name: "tesis-innovacion",    type: "folder", icon: "📁", children: [] },
        { name: "dashboard-bi",        type: "folder", icon: "📁", children: [] },
        { name: "automatizacion-n8n",  type: "folder", icon: "📁", children: [] },
        { name: "factura-electronica", type: "folder", icon: "📁", children: [] },
      ],
    },
    { name: "NickoleMurray______(CV).pdf", type: "file", icon: "📄" },
    {
      name: "Contacto",
      type: "folder",
      icon: "📁",
      children: [
        { name: "email.txt",    type: "file", icon: "📧" },
        { name: "linkedin.txt", type: "file", icon: "🔗" },
      ],
    },
    { name: "README.md", type: "file", icon: "📝" },
  ],
};

// ============================================================
// TERMINAL COMMANDS
// ============================================================
const TERMINAL_COMMANDS = {
  help: () => [
    { type: "info",    text: "Comandos disponibles:" },
    { type: "cmd",     text: "  help          → muestra esta ayuda" },
    { type: "cmd",     text: "  open cv        → abre el CV" },
    { type: "cmd",     text: "  open projects → abre proyectos" },
    { type: "cmd",     text: "  open contact  → abre contacto" },
    { type: "cmd",     text: "  open paint    → abre dibujo libre" },
    { type: "cmd",     text: "  open game      → abre el juego 🐱" },
    { type: "cmd",     text: "  whoami         → info de la desarrolladora" },
    { type: "cmd",     text: "  clear          → limpia la terminal" },
    { type: "cmd",     text: "  ls             → lista apps del escritorio" },
  ],
  whoami: () => [
    { type: "success", text: `${MOCK_DATA.profile.name} — ${MOCK_DATA.profile.title}` },
    { type: "info",    text: `📍 ${MOCK_DATA.profile.location}` },
    { type: "info",    text: `✉️  ${MOCK_DATA.profile.email}` },
    { type: "text",    text: MOCK_DATA.profile.bio },
  ],
  skills: () => {
    const lines = [{ type: "info", text: "Stack tecnológico:" }];
    Object.entries(MOCK_DATA.cv.skills).forEach(([cat, items]) => {
      lines.push({ type: "cmd", text: `  ${cat}: ${items.join(", ")}` });
    });
    return lines;
  },
  date: () => [{ type: "success", text: new Date().toLocaleString("es-PA", { dateStyle: "full", timeStyle: "medium" }) }],
  ls: () => [
    { type: "info", text: "Escritorio/" },
    { type: "cmd",  text: "  📄 CV.app" },
    { type: "cmd",  text: "  💼 Proyectos.app" },
    { type: "cmd",  text: "  📁 Archivos.app" },
    { type: "cmd",  text: "  💬 Contacto.app" },
    { type: "cmd",  text: "  🎨 Paint.app" },
    { type: "cmd",  text: "  🐱 CatJump.app" },
    { type: "cmd",  text: "  🖥️  Terminal.app" },
  ],
};

// ============================================================
// WINDOW CONFIG
// ============================================================
const WINDOW_DEFAULTS = {
  cv:       { title: "CV — Nickole Murray", icon: "📄", w: 700, h: 540, x: 80,  y: 60  },
  projects: { title: "Proyectos",            icon: "💼", w: 820, h: 560, x: 140, y: 80  },
  files:    { title: "Explorador",           icon: "📁", w: 580, h: 440, x: 200, y: 100 },
  contact:  { title: "Mensajería Directa",   icon: "📩", w: 480, h: 500, x: 260, y: 120 },
  terminal: { title: "Terminal",             icon: "🖥️", w: 620, h: 420, x: 320, y: 140 },
  paint:    { title: "Paint",                icon: "🎨", w: 600, h: 500, x: 100, y: 100 },
  game:     { title: "Cat Jump 🐱",          icon: "🐱", w: 560, h: 360, x: 150, y: 80  },
};

// ============================================================
// STYLES
// ============================================================
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Syne:wght@400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #fce4ec;
    --surface: rgba(255, 240, 245, 0.97);
    --surface2: rgba(255, 245, 248, 0.99);
    --border: rgba(220, 130, 160, 0.2);
    --border-active: rgba(219, 112, 147, 0.6);
    --text: #4a1a2e;
    --text-muted: #9c5a72;
    --text-dim: #c4899f;
    --accent: #db7093;
    --accent2: #f48fb1;
    --green: #81c784;
    --red: #e57373;
    --yellow: #ffb74d;
    --titlebar: rgba(252, 224, 235, 0.98);
    --taskbar: rgba(248, 200, 220, 0.96);
    --font-ui: 'Syne', sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
    --radius: 12px;
    --shadow: 0 20px 60px rgba(180, 80, 120, 0.2), 0 0 0 1px rgba(219,112,147,0.1);
  }

  html, body, #root { width:100%; height:100%; overflow:hidden; font-family:var(--font-ui); background:var(--bg); color:var(--text); }

  /* ── DESKTOP ── */
  .desktop {
    width:100vw; height:100vh;
    /* fondo rosa palo con degradado suave */
    background: linear-gradient(135deg, #fce4ec 0%, #f8bbd0 40%, #fce4ec 70%, #ffd6e7 100%);
    position:relative; overflow:hidden; user-select:none;
  }

  /* Patrón de corazoncitos sutiles en el fondo */
  .desktop-bg-grid {
    position:absolute; inset:0; pointer-events:none;
    background-image: radial-gradient(circle, rgba(219,112,147,0.08) 1px, transparent 1px);
    background-size: 30px 30px;
  }

  .desktop-glow  { position:absolute; width:500px; height:500px; border-radius:50%; background:radial-gradient(circle, rgba(255,182,193,0.35) 0%, transparent 70%); top:-150px; left:-100px; pointer-events:none; }
  .desktop-glow2 { position:absolute; width:350px; height:350px; border-radius:50%; background:radial-gradient(circle, rgba(255,105,180,0.18) 0%, transparent 70%); bottom:80px; right:40px; pointer-events:none; }

/* ── GATITO CAMINANDO Y SALTANDO ── */
.desktop-cat {
  position: absolute;
  bottom: 58px;
  width: 70px; 
  height: 70px;
  z-index: 10;
  pointer-events: none;
  animation: catWalkJump 15s linear infinite;
}

.desktop-cat img { 
  width: 100%; 
  height: 100%; 
  object-fit: contain;
  filter: contrast(1.8) brightness(1.1);
  mix-blend-mode: multiply; 
  image-rendering: smooth;
}

/* ANIMACIÓN AJUSTADA AL DIV WELCOME */
@keyframes catWalkJump {
  0%   { left: 100%; bottom: 58px; }
  
  /* Comienza a subir antes de tocar el div (65% de la pantalla) */
  42%  { left: 65%; bottom: 58px; transform: rotate(0deg); } 
  
  /* PUNTO MÁXIMO: Justo en el centro (50%) sobre Nickole Murray */
  50%  { left: 50%; bottom: 280px; transform: rotate(-15deg); } 
  
  /* CAE después de pasar el div (35% de la pantalla) */
  58%  { left: 35%; bottom: 58px; transform: rotate(0deg); }
  
  100% { left: -100px; bottom: 58px; }
}

  /* ── ICONS ── */
  .desktop-icons { position:absolute; top:24px; left:24px; display:flex; flex-direction:column; gap:8px; }
  .desktop-icon { display:flex; flex-direction:column; align-items:center; gap:6px; padding:10px 12px; border-radius:10px; cursor:pointer; transition:background 0.15s, transform 0.15s; width:90px; }
  .desktop-icon:hover { background:rgba(219,112,147,0.18); transform:translateY(-3px); }
  .desktop-icon:active { transform:scale(0.93); }
  .desktop-icon .icon-emoji { font-size:32px; filter:drop-shadow(0 3px 6px rgba(180,80,120,0.3)); }
  .desktop-icon .icon-label { font-size:11px; font-weight:700; text-align:center; color:var(--text); text-shadow:0 1px 3px rgba(255,255,255,0.8); white-space:nowrap; }

  /* ── TASKBAR ── */
  .taskbar { position:fixed; bottom:0; left:0; right:0; height:52px; background:var(--taskbar); backdrop-filter:blur(20px) saturate(180%); border-top:1px solid rgba(219,112,147,0.25); display:flex; align-items:center; gap:4px; padding:0 12px; z-index:9999; }
  .taskbar-start { display:flex; align-items:center; gap:8px; padding:6px 14px; border-radius:10px; background:rgba(219,112,147,0.2); border:1px solid rgba(219,112,147,0.4); cursor:pointer; transition:background 0.2s; font-size:13px; font-weight:700; color:var(--accent); letter-spacing:0.5px; }
  .taskbar-start:hover { background:rgba(219,112,147,0.35); }
  .taskbar-sep { width:1px; height:30px; background:rgba(219,112,147,0.2); margin:0 4px; }
  .taskbar-apps { display:flex; gap:4px; flex:1; overflow:hidden; }
  .taskbar-app { display:flex; align-items:center; gap:6px; padding:5px 12px; border-radius:8px; background:transparent; border:1px solid transparent; cursor:pointer; font-size:12px; font-weight:600; color:var(--text-muted); transition:all 0.2s; max-width:160px; overflow:hidden; white-space:nowrap; }
  .taskbar-app:hover { background:rgba(219,112,147,0.12); color:var(--text); }
  .taskbar-app.active { background:rgba(219,112,147,0.2); border-color:rgba(219,112,147,0.4); color:var(--text); }
  .taskbar-app.minimized { opacity:0.5; }
  .taskbar-clock { font-family:var(--font-mono); font-size:12px; font-weight:500; color:var(--text-muted); text-align:right; min-width:80px; padding:4px 8px; border-radius:6px; background:rgba(219,112,147,0.08); line-height:1.5; }

  /* ── WINDOW ── */
  .window { position:absolute; display:flex; flex-direction:column; border-radius:var(--radius); overflow:hidden; border:1px solid var(--border); box-shadow:var(--shadow); background:var(--surface2); transition:box-shadow 0.2s, border-color 0.2s; min-width:320px; min-height:200px; }
  .window.focused { border-color:var(--border-active); box-shadow:var(--shadow), 0 0 0 1px rgba(219,112,147,0.25); }
  .window.maximized { border-radius:0 !important; border:none !important; }
  .window.minimized { display:none; }

  .window-titlebar { display:flex; align-items:center; gap:8px; padding:0 12px; height:40px; flex-shrink:0; background:var(--titlebar); border-bottom:1px solid var(--border); cursor:move; }
  .window-controls { display:flex; gap:7px; flex-shrink:0; }
  .win-btn { width:13px; height:13px; border-radius:50%; border:none; cursor:pointer; transition:filter 0.15s, transform 0.1s; }
  .win-btn:hover { filter:brightness(1.2); transform:scale(1.15); }
  .win-btn.close    { background:#ff6b8a; }
  .win-btn.minimize { background:#ffb347; }
  .win-btn.maximize { background:#77dd77; }
  .window-icon  { font-size:14px; }
  .window-title { font-size:12px; font-weight:700; color:var(--text-muted); flex:1; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .window-body  { flex:1; overflow:auto; display:flex; flex-direction:column; }
  .window-body::-webkit-scrollbar { width:6px; }
  .window-body::-webkit-scrollbar-thumb { background:rgba(219,112,147,0.2); border-radius:3px; }
  .resize-handle { position:absolute; bottom:0; right:0; width:16px; height:16px; cursor:se-resize; background:linear-gradient(135deg, transparent 50%, rgba(219,112,147,0.3) 50%); border-radius:0 0 var(--radius) 0; }

  /* ── CONTACT ── */
  .contact-form { padding: 20px; display: flex; flex-direction: column; gap: 12px; }
  .contact-input { background: rgba(255,230,240,0.5); border: 1px solid rgba(219,112,147,0.3); color: var(--text); padding: 10px; border-radius: 8px; font-family: var(--font-mono); outline: none; }
  .contact-input:focus { border-color: var(--accent); background: rgba(255,230,240,0.8); }
  .contact-button { background: linear-gradient(135deg, #db7093, #f48fb1); color: white; border: none; padding: 12px; border-radius: 8px; font-weight: 700; cursor: pointer; transition: opacity 0.2s; font-family: var(--font-ui); }
  .contact-button:hover { opacity: 0.9; }

  /* ── PAINT ── */
  .paint-container { background: #fff9fb; height: 100%; display: flex; flex-direction: column; }
  .paint-toolbar { background: #fce4ec; padding: 8px 12px; display: flex; gap: 10px; align-items: center; border-bottom: 1px solid rgba(219,112,147,0.2); }
  .paint-toolbar button { padding: 4px 12px; border-radius: 6px; border: 1px solid rgba(219,112,147,0.3); background: white; cursor: pointer; font-size: 12px; color: var(--text); }
  .paint-toolbar button:hover { background: #fce4ec; }

  /* ── CV ── */
  .cv-app { padding:28px; }
  .cv-header { display:flex; align-items:center; gap:20px; margin-bottom:28px; padding-bottom:20px; border-bottom:1px solid var(--border); }
  .cv-avatar { width:64px; height:64px; border-radius:50%; background:linear-gradient(135deg, #db7093, #f48fb1); display:flex; align-items:center; justify-content:center; font-size:22px; font-weight:800; color:white; flex-shrink:0; box-shadow:0 4px 14px rgba(219,112,147,0.35); }
  .cv-name  { font-size:22px; font-weight:800; color:var(--text); }
  .cv-title { font-size:13px; color:var(--accent); font-weight:600; margin-top:2px; }
  .cv-meta  { display:flex; gap:16px; margin-top:6px; flex-wrap:wrap; }
  .cv-meta span { font-size:11px; color:var(--text-muted); }
  .cv-section { margin-bottom:24px; }
  .cv-section-title { font-size:11px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:var(--accent); margin-bottom:12px; display:flex; align-items:center; gap:8px; }
  .cv-section-title::after { content:''; flex:1; height:1px; background:var(--border); }
  .cv-job { margin-bottom:16px; padding-left:16px; border-left:2px solid rgba(219,112,147,0.2); transition:border-color 0.2s; }
  .cv-job:hover { border-left-color:var(--accent); }
  .cv-job-header { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:4px; }
  .cv-job-role    { font-size:14px; font-weight:700; color:var(--text); }
  .cv-job-company { font-size:12px; color:var(--accent); font-weight:600; }
  .cv-job-period  { font-size:11px; color:var(--text-muted); font-family:var(--font-mono); white-space:nowrap; }
  .cv-job-bullets { list-style:none; margin-top:6px; }
  .cv-job-bullets li { font-size:12px; color:var(--text-muted); padding:2px 0 2px 12px; position:relative; line-height:1.5; }
  .cv-job-bullets li::before { content:'›'; position:absolute; left:0; color:var(--accent); }
  .cv-skills-grid { display:flex; flex-direction:column; gap:10px; }
  .cv-skill-row   { display:flex; gap:8px; align-items:flex-start; }
  .cv-skill-cat   { font-size:11px; font-weight:700; color:var(--text-muted); min-width:100px; padding-top:3px; }
  .cv-skill-tags  { display:flex; flex-wrap:wrap; gap:5px; }
  .cv-tag { font-size:10px; font-weight:600; padding:2px 8px; border-radius:4px; background:rgba(219,112,147,0.1); border:1px solid rgba(219,112,147,0.25); color:var(--accent); }
  .cv-edu-item   { margin-bottom:12px; }
  .cv-edu-degree { font-size:13px; font-weight:700; color:var(--text); }
  .cv-edu-school { font-size:12px; color:var(--text-muted); }
  .cv-edu-period { font-size:11px; color:var(--text-dim); font-family:var(--font-mono); margin-top:2px; }

  /* ── PROJECTS ── */
  .projects-app     { padding:20px; }
  .projects-header { margin-bottom:20px; }
  .projects-title  { font-size:18px; font-weight:800; color:var(--text); }
  .projects-sub    { font-size:12px; color:var(--text-muted); margin-top:2px; }
  .projects-grid   { display:grid; grid-template-columns:repeat(auto-fill, minmax(240px,1fr)); gap:14px; }
  .project-card { border-radius:10px; padding:18px; background:rgba(255,230,240,0.4); border:1px solid rgba(219,112,147,0.15); cursor:pointer; transition:transform 0.2s, border-color 0.2s, background 0.2s; position:relative; overflow:hidden; }
  .project-card:hover { transform:translateY(-3px); background:rgba(255,230,240,0.7); border-color:rgba(219,112,147,0.35); }
  .project-card-header { display:flex; align-items:center; gap:10px; margin-bottom:10px; }
  .project-emoji { font-size:22px; }
  .project-name  { font-size:13px; font-weight:700; color:var(--text); }
  .project-year  { font-size:10px; color:var(--text-dim); font-family:var(--font-mono); margin-left:auto; }
  .project-desc  { font-size:11.5px; color:var(--text-muted); line-height:1.6; margin-bottom:12px; }
  .project-tech  { display:flex; flex-wrap:wrap; gap:4px; margin-bottom:10px; }
  .project-tech-tag { font-size:10px; padding:2px 7px; border-radius:4px; background:rgba(255,255,255,0.6); border:1px solid rgba(219,112,147,0.2); color:var(--text-muted); font-family:var(--font-mono); }
  .project-status { display:inline-flex; align-items:center; gap:4px; font-size:10px; font-weight:600; padding:2px 8px; border-radius:12px; }
  .status-dot  { width:5px; height:5px; border-radius:50%; }
  .status-prod { background:rgba(129,199,132,0.2); color:#4caf50; }
  .status-beta { background:rgba(255,183,77,0.2);  color:#ff9800; }
  .status-open { background:rgba(244,143,177,0.2); color:#e91e63; }
  .status-arch { background:rgba(189,189,189,0.2); color:#9e9e9e; }
  .status-dev  { background:rgba(229,115,115,0.2); color:#f44336; }

  /* ── FILES ── */
  .files-app { display:flex; height:100%; }
  .files-sidebar { width:160px; flex-shrink:0; padding:12px; border-right:1px solid var(--border); background:rgba(255,220,235,0.3); }
  .files-sidebar-title { font-size:10px; font-weight:700; letter-spacing:1px; text-transform:uppercase; color:var(--text-dim); margin-bottom:10px; }
  .files-sidebar-item { display:flex; align-items:center; gap:7px; padding:6px 8px; border-radius:6px; font-size:12px; color:var(--text-muted); cursor:pointer; transition:background 0.15s; }
  .files-sidebar-item:hover, .files-sidebar-item.active { background:rgba(219,112,147,0.12); color:var(--text); }
  .files-main { flex:1; padding:16px; overflow:auto; }
  .files-path { font-size:11px; font-family:var(--font-mono); color:var(--text-muted); margin-bottom:14px; padding:6px 10px; background:rgba(255,230,240,0.5); border-radius:5px; border:1px solid var(--border); }
  .files-grid { display:flex; flex-wrap:wrap; gap:8px; }
  .file-item { display:flex; flex-direction:column; align-items:center; gap:5px; padding:10px 14px; border-radius:8px; width:90px; cursor:pointer; transition:background 0.15s; }
  .file-item:hover { background:rgba(219,112,147,0.1); }
  .file-item-icon { font-size:28px; }
  .file-item-name { font-size:10px; text-align:center; color:var(--text-muted); word-break:break-word; }

  /* ── TERMINAL ── */
  .terminal-app { flex:1; padding:16px; font-family:var(--font-mono); font-size:13px; background:#2d0a18; overflow-y:auto; display:flex; flex-direction:column; }
  .terminal-app::-webkit-scrollbar { width:5px; }
  .terminal-app::-webkit-scrollbar-thumb { background:rgba(219,112,147,0.3); border-radius:3px; }
  .term-line { line-height:1.8; white-space:pre-wrap; word-break:break-all; }
  .term-line.prompt  { color:#f48fb1; }
  .term-line.info    { color:#f8bbd0; }
  .term-line.cmd     { color:#fce4ec; }
  .term-line.success { color:#81c784; }
  .term-line.error   { color:#ef9a9a; }
  .term-line.text    { color:#e8a0b4; }
  .term-input-row { display:flex; align-items:center; gap:8px; margin-top:8px; flex-shrink:0; }
  .term-prompt { color:#f48fb1; white-space:nowrap; font-weight:700; }
  .term-input  { flex:1; background:transparent; border:none; outline:none; font-family:var(--font-mono); font-size:13px; color:#fce4ec; caret-color:#db7093; }

  /* ── GAME ── */
  .game-container { display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; background:linear-gradient(180deg, #fce4ec 0%, #f8bbd0 60%, #ffd6e7 100%); gap:10px; padding:16px; }
  .game-canvas { border-radius:10px; border:2px solid rgba(219,112,147,0.3); box-shadow:0 4px 20px rgba(219,112,147,0.2); display:block; }
  .game-info { display:flex; gap:20px; font-size:13px; font-weight:700; color:var(--text-muted); }
  .game-msg { font-size:13px; color:var(--accent); font-weight:700; }

  /* ── WELCOME ── */
  .welcome { position:absolute; bottom:80px; left:50%; transform:translateX(-50%); text-align:center; pointer-events:none; white-space:nowrap; }
  .welcome-title { font-size:42px; font-weight:800; color:transparent; background:linear-gradient(135deg, #db7093, #f48fb1, #c2185b); -webkit-background-clip:text; background-clip:text; letter-spacing:-2px; }
  .welcome-sub { font-size:13px; color:rgba(180,80,120,0.5); margin-top:4px; font-weight:600; }

  @media (max-width:768px) {
    .desktop-icons { top:12px; left:8px; }
    .desktop-icon  { width:70px; }
    .welcome-title { font-size:26px; }
    .welcome-sub   { font-size:11px; }
  }
`;

// ============================================================
// CLOCK
// ============================================================
function Clock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);
  const f = (n) => String(n).padStart(2, "0");
  return (
    <div className="taskbar-clock">
      {f(time.getHours())}:{f(time.getMinutes())}<br />
      <span style={{ fontSize: "10px" }}>{time.toLocaleDateString("es-PA", { day: "2-digit", month: "short" })}</span>
    </div>
  );
}

// ============================================================
// APP: GAME — Cat Jump
// ============================================================
function GameApp() {
  const canvasRef = useRef(null);
  const stateRef  = useRef(null);
  const rafRef    = useRef(null);
  const [score, setScore]   = useState(0);
  const [best,  setBest]    = useState(0);
  const [msg,   setMsg]     = useState("Presiona ESPACIO o toca para saltar 🐱");
  const [going, setGoing]   = useState(false);

  const W = 520, H = 220;
  const GROUND = H - 40;
  const GRAVITY = 0.55;
  const JUMP    = -12;

  const initState = () => ({
    cat:      { x: 70, y: GROUND - 48, vy: 0, onGround: true },
    obstacles: [],
    score:    0,
    speed:    3.5,
    frame:    0,
    running:  false,
    dead:     false,
    spawnTimer: 90,
  });

  const jump = useCallback(() => {
    const s = stateRef.current;
    if (!s) return;
    if (!s.running && !s.dead) {
      s.running = true;
      setGoing(true);
      setMsg("");
      loop();
    } else if (s.dead) {
      stateRef.current = initState();
      setScore(0);
      setMsg("");
      setGoing(true);
      stateRef.current.running = true;
      loop();
    } else if (s.cat.onGround) {
      s.cat.vy = JUMP;
      s.cat.onGround = false;
    }
  }, []);

  useEffect(() => {
    stateRef.current = initState();
    const canvas = canvasRef.current;
    drawFrame(stateRef.current);

    const onKey = (e) => { if (e.code === "Space" || e.key === " ") { e.preventDefault(); jump(); } };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); cancelAnimationFrame(rafRef.current); };
  }, []);

  const drawFrame = (s) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, W, H);

    // Sky gradient
    const sky = ctx.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0, "#fce4ec");
    sky.addColorStop(1, "#f8bbd0");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H);

    // Clouds
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    [[60,40,30],[160,55,22],[300,35,28],[420,50,20]].forEach(([cx,cy,r]) => {
      ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(cx+r*0.8,cy+5,r*0.7,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(cx-r*0.7,cy+5,r*0.65,0,Math.PI*2); ctx.fill();
    });

    // Ground
    ctx.fillStyle = "#f48fb1";
    ctx.fillRect(0, GROUND + 4, W, H - GROUND - 4);
    ctx.fillStyle = "#db7093";
    ctx.fillRect(0, GROUND + 2, W, 4);

    // Cat (emoji drawn as text)
    ctx.font = `${s.dead ? 36 : 38}px serif`;
    ctx.textBaseline = "bottom";
    ctx.fillText(s.dead ? "😿" : (s.frame % 20 < 10 ? "🐱" : "😺"), s.cat.x - 20, s.cat.y + 48);

    // Obstacles (cacti → stars)
    s.obstacles.forEach(ob => {
      ctx.font = "32px serif";
      ctx.fillText("🌵", ob.x, GROUND + 2);
    });

    // Score
    ctx.font = "bold 14px 'Syne', sans-serif";
    ctx.fillStyle = "#9c5a72";
    ctx.textAlign = "right";
    ctx.fillText(`Score: ${s.score}`, W - 14, 24);
    ctx.textAlign = "left";
  };

  const loop = () => {
    const s = stateRef.current;
    if (!s || !s.running) return;

    s.frame++;
    s.score++;
    s.speed = 3.5 + s.score / 600;

    // Cat physics
    s.cat.vy += GRAVITY;
    s.cat.y  += s.cat.vy;
    if (s.cat.y >= GROUND - 48) {
      s.cat.y = GROUND - 48;
      s.cat.vy = 0;
      s.cat.onGround = true;
    }

    // Obstacles
    s.spawnTimer--;
    if (s.spawnTimer <= 0) {
      s.obstacles.push({ x: W + 20 });
      s.spawnTimer = 70 + Math.floor(Math.random() * 60);
    }
    s.obstacles = s.obstacles
      .map(o => ({ ...o, x: o.x - s.speed }))
      .filter(o => o.x > -40);

    // Collision (simple AABB)
    s.obstacles.forEach(ob => {
      if (ob.x < s.cat.x + 28 && ob.x + 28 > s.cat.x && s.cat.y + 44 > GROUND - 28) {
        s.running = false;
        s.dead = true;
        setBest(b => Math.max(b, s.score));
        setScore(s.score);
        setMsg("💔 ¡Game Over! Presiona ESPACIO para reintentar");
        setGoing(false);
      }
    });

    setScore(s.score);
    drawFrame(s);
    if (s.running) rafRef.current = requestAnimationFrame(loop);
  };

  return (
    <div className="game-container window-body">
      <div className="game-info">
        <span>🏆 Mejor: {best}</span>
        <span>⭐ Score: {score}</span>
      </div>
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        className="game-canvas"
        onClick={jump}
        style={{ cursor: "pointer", maxWidth: "100%" }}
      />
      {msg && <div className="game-msg">{msg}</div>}
    </div>
  );
}

// ============================================================
// APP: PAINT
// ============================================================
function PaintApp() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#db7093");

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineCap = "round"; ctx.lineWidth = 3;
    ctx.fillStyle = "#fff9fb"; ctx.fillRect(0, 0, 800, 600);
  }, []);

  const startDrawing = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const ctx = canvasRef.current.getContext("2d");
    ctx.strokeStyle = color;
    ctx.beginPath(); ctx.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };
  const draw = (e) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current.getContext("2d");
    const { offsetX, offsetY } = e.nativeEvent;
    ctx.lineTo(offsetX, offsetY); ctx.stroke();
  };
  const stop = () => setIsDrawing(false);
  const clear = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.fillStyle = "#fff9fb"; ctx.fillRect(0, 0, 800, 600);
  };

  return (
    <div className="paint-container window-body">
      <div className="paint-toolbar">
        <span style={{fontSize:"12px", color:"#9c5a72", fontWeight:"700"}}>Color:</span>
        <input type="color" value={color} onChange={e => setColor(e.target.value)} style={{cursor:"pointer"}} />
        {["#db7093","#f48fb1","#c2185b","#ff80ab","#4a1a2e","#ffffff"].map(c => (
          <div key={c} onClick={() => setColor(c)} style={{width:20,height:20,borderRadius:"50%",background:c,cursor:"pointer",border: color===c?"2px solid #4a1a2e":"2px solid transparent"}} />
        ))}
        <button onClick={clear}>🗑️ Limpiar</button>
      </div>
      <canvas ref={canvasRef} width={800} height={600}
        onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stop} onMouseLeave={stop}
        style={{ flex:1, cursor:"crosshair", background:"#fff9fb", maxWidth:"100%" }}
      />
    </div>
  );
}

// ============================================================
// APP: CONTACT
// ============================================================
function ContactApp() {
  const [status, setStatus] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Enviando...");
    const data = new FormData(e.target);
    const response = await fetch("https://formspree.io/f/mqakvjnd", {
      method: "POST", body: data, headers: { 'Accept': 'application/json' }
    });
    if (response.ok) { setStatus("✅ ¡Mensaje enviado!"); e.target.reset(); }
    else setStatus("❌ Hubo un error, intenta de nuevo.");
  };
  return (
    <div className="window-body" style={{overflow:"auto"}}>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div style={{fontSize:"14px", marginBottom:"6px", color:"var(--accent)", fontWeight:"700"}}>✉️ Envíame un mensaje:</div>
        <input className="contact-input" type="text"  name="name"   placeholder="Tu Nombre" required />
        <input className="contact-input" type="email" name="email"  placeholder="Tu Email"  required />
        <textarea className="contact-input" name="message" placeholder="¿En qué puedo ayudarte?" rows="5" required />
        <button className="contact-button" type="submit">Enviar Mensaje 💌</button>
        {status && <div style={{fontSize:"12px", textAlign:"center", marginTop:"8px", color:"var(--accent)"}}>{status}</div>}
      </form>
      <div style={{padding:"16px 20px", borderTop:"1px solid var(--border)"}}>
        <div style={{fontSize:"11px", color:"var(--text-muted)", marginBottom:"10px", fontWeight:"700"}}>REDES SOCIALES:</div>
        <div style={{display:"flex", gap:"12px"}}>
          <a href="https://wa.me/50769023927" target="_blank" rel="noreferrer" style={{color:"var(--accent)", fontSize:"12px", fontWeight:"600"}}>💬 WhatsApp</a>
          <a href="https://linkedin.com/in/nickole-murray-2265891b4/" target="_blank" rel="noreferrer" style={{color:"var(--accent)", fontSize:"12px", fontWeight:"600"}}>💼 LinkedIn</a>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// APP: CV
// ============================================================
function CVApp() {
  const { cv, profile } = MOCK_DATA;
  return (
    <div className="cv-app window-body" style={{ overflow:"auto" }}>
      <div className="cv-header">
        <div className="cv-avatar">{profile.avatar}</div>
        <div>
          <div className="cv-name">{profile.name}</div>
          <div className="cv-title">{profile.title}</div>
          <div className="cv-meta">
            <span>📍 {profile.location}</span>
            <span>✉️ {profile.email}</span>
            <span>📱 {profile.phone}</span>
          </div>
        </div>
      </div>
      <div className="cv-section">
        <div className="cv-section-title">Experiencia</div>
        {cv.experience.map((exp, i) => (
          <div className="cv-job" key={i}>
            <div className="cv-job-header">
              <div>
                <div className="cv-job-role">{exp.role}</div>
                <div className="cv-job-company">{exp.company} · {exp.location}</div>
              </div>
              <div className="cv-job-period">{exp.period}</div>
            </div>
            <ul className="cv-job-bullets">{exp.bullets.map((b,j) => <li key={j}>{b}</li>)}</ul>
          </div>
        ))}
      </div>
      <div className="cv-section">
        <div className="cv-section-title">Habilidades</div>
        <div className="cv-skills-grid">
          {Object.entries(cv.skills).map(([cat, items]) => (
            <div className="cv-skill-row" key={cat}>
              <span className="cv-skill-cat">{cat}</span>
              <div className="cv-skill-tags">{items.map(s => <span className="cv-tag" key={s}>{s}</span>)}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="cv-section">
        <div className="cv-section-title">Educación</div>
        {cv.education.map((edu, i) => (
          <div className="cv-edu-item" key={i}>
            <div className="cv-edu-degree">{edu.degree}</div>
            <div className="cv-edu-school">{edu.school}</div>
            <div className="cv-edu-period">{edu.period} · {edu.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// APP: PROJECTS
// ============================================================
function ProjectsApp() {
  const statusMap      = { Producción:"prod", Beta:"beta", "Open Source":"open", Archivado:"arch", "En desarrollo":"dev" };
  const statusDotColor = { Producción:"#4caf50", Beta:"#ff9800", "Open Source":"#e91e63", Archivado:"#9e9e9e", "En desarrollo":"#f44336" };
  return (
    <div className="projects-app window-body" style={{ overflow:"auto" }}>
      <div className="projects-header">
        <div className="projects-title">Proyectos</div>
        <div className="projects-sub">{MOCK_DATA.projects.length} proyectos destacados</div>
      </div>
      <div className="projects-grid">
        {MOCK_DATA.projects.map(p => {
          const cls = statusMap[p.status] || "arch";
          return (
            <div className="project-card" key={p.id}>
              <div style={{position:"absolute",top:0,left:0,right:0,height:"3px",background:p.color,borderRadius:"10px 10px 0 0"}} />
              <div className="project-card-header">
                <span className="project-emoji">{p.icon}</span>
                <span className="project-name">{p.name}</span>
                <span className="project-year">{p.year}</span>
              </div>
              <div className="project-desc">{p.description}</div>
              <div className="project-tech">{p.tech.map(t => <span className="project-tech-tag" key={t}>{t}</span>)}</div>
              <div className={`project-status status-${cls}`}>
                <div className="status-dot" style={{ background: statusDotColor[p.status] }} />
                {p.status}
              </div>
            </div>
            );
        })}
      </div>
    </div>
  );
}

// ============================================================
// APP: FILES
// ============================================================
function FilesApp() {
  const [path, setPath]   = useState("Escritorio");
  const [items, setItems] = useState(MOCK_DATA.fileSystem);
  const [sel, setSel]     = useState(null);

  const navigate = (item) => {
    // 1. Si es carpeta, entramos
    if (item.type === "folder") {
      setPath(`Escritorio / ${item.name}`);
      setItems(item.children?.length ? item.children : [{ name:"Carpeta vacía", type:"empty", icon:"📭" }]);
      setSel(null);
    } 
    // 2. Si es archivo (no importa el nombre, si es tipo 'file' y es PDF, lo abre)
    else if (item.type === "file") {
      if (item.name.toLowerCase().includes(".pdf")) {
        // Usamos el nombre exacto del archivo que viene de MOCK_DATA
        window.open(`/${item.name}`, "_blank");
      } else if (item.name === "email.txt") {
        window.location.href = "mailto:nickolemurray32@gmail.com";
      }
    }
  };

  return (
    <div className="files-app window-body">
      <div className="files-sidebar">
        <div className="files-sidebar-title">Lugares</div>
        {[{icon:"🖥️",label:"Escritorio"},{icon:"📂",label:"Recientes"},{icon:"⭐",label:"Favoritos"}].map(s => (
          <div className={`files-sidebar-item ${path===s.label?"active":""}`} key={s.label}
            onClick={() => { if(s.label==="Escritorio"){setPath("Escritorio");setItems(MOCK_DATA.fileSystem);}else setPath(s.label); }}>
            {s.icon} {s.label}
          </div>
        ))}
      </div>
      <div className="files-main">
        <div className="files-path">📂 {path}</div>
        <div className="files-grid">
          {items.map((item, i) => (
            <div className="file-item" key={i}
              style={{background: sel===i ? "rgba(219,112,147,0.15)" : ""}}
              onClick={() => setSel(i)} 
              onDoubleClick={() => navigate(item)} /* El doble clic dispara la función */
            >
              <div className="file-item-icon">{item.icon}</div>
              <div className="file-item-name">{item.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// APP: TERMINAL
// ============================================================
function TerminalApp({ openApp }) {
  const [lines, setLines] = useState([
    { type:"info",    text:"Portfolio OS Terminal v1.0.0" },
    { type:"success", text:`Hola! Soy ${MOCK_DATA.profile.name} 👋` },
    { type:"text",    text:'Escribe "help" para ver los comandos disponibles.' },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:"smooth" }); }, [lines]);

  const run = (cmd) => {
    const t = cmd.trim().toLowerCase();
    const next = [...lines, { type:"prompt", text:`nickole@portfolio:~$ ${cmd}` }];
    if (!t) { setLines(next); return; }
    if (t==="clear")          { setLines([]); return; }
    if (t==="open cv")        { openApp("cv");       setLines([...next,{type:"success",text:"Abriendo CV..."}]); return; }
    if (t==="open projects")  { openApp("projects"); setLines([...next,{type:"success",text:"Abriendo Proyectos..."}]); return; }
    if (t==="open contact")   { openApp("contact");  setLines([...next,{type:"success",text:"Abriendo Contacto..."}]); return; }
    if (t==="open paint")     { openApp("paint");    setLines([...next,{type:"success",text:"Abriendo Paint..."}]); return; }
    if (t==="open game")      { openApp("game");     setLines([...next,{type:"success",text:"Abriendo Cat Jump 🐱"}]); return; }
    const fn = TERMINAL_COMMANDS[t];
    if (fn) setLines([...next,...fn()]);
    else    setLines([...next,{type:"error",text:`Comando no encontrado: "${t}". Escribe "help".`}]);
  };

  return (
    <div className="terminal-app">
      {lines.map((l,i) => <div key={i} className={`term-line ${l.type}`}>{l.text}</div>)}
      <div className="term-input-row">
        <span className="term-prompt">nickole@portfolio:~$</span>
        <input className="term-input" value={input} onChange={e=>setInput(e.target.value)}
          onKeyDown={e=>{ if(e.key==="Enter"){ run(input); setInput(""); } }} autoFocus />
      </div>
      <div ref={bottomRef} />
    </div>
  );
}

// ============================================================
// WINDOW SYSTEM
// ============================================================
function AppWindow({ win, onClose, onMinimize, onFocus, openApp }) {
  const cfg = WINDOW_DEFAULTS[win.id];
  const [pos,  setPos]  = useState({ x: win.x, y: win.y });
  const [size, setSize] = useState({ w: cfg.w, h: cfg.h });
  const [maxed, setMaxed] = useState(false);
  const [prev,  setPrev]  = useState(null);

  const toggleMax = () => {
    if (maxed) { setPos(prev.pos); setSize(prev.size); setMaxed(false); }
    else { setPrev({pos:{...pos},size:{...size}}); setPos({x:0,y:0}); setSize({w:window.innerWidth,h:window.innerHeight-52}); setMaxed(true); }
  };

  const onTitleDown = (e) => {
    if (maxed || e.target.classList.contains("win-btn")) return;
    onFocus(win.id);
    const ox=e.clientX-pos.x, oy=e.clientY-pos.y;
    const mv=(me)=>setPos({x:Math.max(0,me.clientX-ox),y:Math.max(0,me.clientY-oy)});
    const up=()=>{document.removeEventListener("mousemove",mv);document.removeEventListener("mouseup",up);};
    document.addEventListener("mousemove",mv); document.addEventListener("mouseup",up);
  };

  const onResizeDown = (e) => {
    e.stopPropagation();
    const sx=e.clientX,sy=e.clientY,sw=size.w,sh=size.h;
    const mv=(me)=>setSize({w:Math.max(320,sw+me.clientX-sx),h:Math.max(200,sh+me.clientY-sy)});
    const up=()=>{document.removeEventListener("mousemove",mv);document.removeEventListener("mouseup",up);};
    document.addEventListener("mousemove",mv); document.addEventListener("mouseup",up);
  };

  const style = maxed
    ? {top:0,left:0,width:size.w,height:size.h,zIndex:win.zIndex}
    : {top:pos.y,left:pos.x,width:size.w,height:size.h,zIndex:win.zIndex};

  const cls = ["window",win.focused?"focused":"",win.minimized?"minimized":"",maxed?"maximized":""].filter(Boolean).join(" ");

  return (
    <div className={cls} style={style} onMouseDown={()=>onFocus(win.id)}>
      <div className="window-titlebar" onMouseDown={onTitleDown} onDoubleClick={toggleMax}>
        <div className="window-controls">
          <button className="win-btn close"    onClick={()=>onClose(win.id)} />
          <button className="win-btn minimize" onClick={()=>onMinimize(win.id)} />
          <button className="win-btn maximize" onClick={toggleMax} />
        </div>
        <span className="window-icon">{cfg.icon}</span>
        <span className="window-title">{cfg.title}</span>
      </div>
      <div className="window-body">
        {win.id==="cv"        && <CVApp />}
        {win.id==="projects" && <ProjectsApp />}
        {win.id==="files"     && <FilesApp />}
        {win.id==="contact"  && <ContactApp />}
        {win.id==="terminal" && <TerminalApp openApp={openApp} />}
        {win.id==="paint"    && <PaintApp />}
        {win.id==="game"     && <GameApp />}
      </div>
      {!maxed && <div className="resize-handle" onMouseDown={onResizeDown} />}
    </div>
  );
}

// ============================================================
// MAIN
// ============================================================
const ICONS = [
  { id:"cv",       icon:"📄", label:"CV" },
  { id:"projects", icon:"💼", label:"Proyectos" },
  { id:"files",    icon:"📁", label:"Archivos" },
  { id:"contact",  icon:"📩", label:"Mensaje" },
  { id:"paint",    icon:"🎨", label:"Paint" },
  { id:"game",     icon:"🐱", label:"Cat Jump" },
  { id:"terminal", icon:"🖥️", label:"Terminal" },
];

let Z = 100;

export default function WebDesktop() {
  const [windows, setWindows] = useState({});

  const openApp = useCallback((id) => {
    setWindows(prev => {
      if (prev[id]) return { ...prev, [id]: { ...prev[id], minimized:false, zIndex:++Z, focused:true } };
      return { ...prev, [id]: { id, minimized:false, zIndex:++Z, focused:true, x:WINDOW_DEFAULTS[id].x, y:WINDOW_DEFAULTS[id].y } };
    });
  }, []);

  const closeApp    = (id) => setWindows(p=>{ const n={...p}; delete n[id]; return n; });
  const minimizeApp = (id) => setWindows(p=>({...p,[id]:{...p[id],minimized:!p[id].minimized}}));
  const focusApp    = (id) => setWindows(p=>({...p,[id]:{...p[id],focused:true,zIndex:++Z}}));

  return (
    <>
      <style>{STYLES}</style>
      <div className="desktop">
        <div className="desktop-bg-grid" />
        <div className="desktop-glow" />
        <div className="desktop-glow2" />

        {/* 🐱 GATITO CAMINANDO */}
        <div className="desktop-cat">
          <img src="/gatito_caminando.gif" alt="gatito" />
        </div>

        <div className="desktop-icons">
          {ICONS.map(ic => (
            <div className="desktop-icon" key={ic.id} onDoubleClick={()=>openApp(ic.id)}>
              <span className="icon-emoji">{ic.icon}</span>
              <span className="icon-label">{ic.label}</span>
            </div>
          ))}
        </div>

        <div className="welcome">
          <div className="welcome-title">Nickole Murray</div>
          <div className="welcome-sub">Doble click en los iconos para explorar 💕</div>
        </div>

        {Object.values(windows).map(win=>(
          <AppWindow key={win.id} win={win} onClose={closeApp} onMinimize={minimizeApp} onFocus={focusApp} openApp={openApp} />
        ))}

        <div className="taskbar">
          <div className="taskbar-start" onClick={()=>openApp("terminal")}>🌸 Inicio</div>
          <div className="taskbar-sep" />
          <div className="taskbar-apps">
            {Object.values(windows).map(win=>(
              <div key={win.id} className={`taskbar-app ${win.focused?"active":""}`} onClick={()=>focusApp(win.id)}>
                <span>{WINDOW_DEFAULTS[win.id].icon}</span>
                <span>{WINDOW_DEFAULTS[win.id].title}</span>
              </div>
            ))}
          </div>
          <Clock />
        </div>
      </div>
    </>
  );
}