/* ── SDA Toolbox — Shared Navigation ── */
(function () {

  var TOOLS = [
    { label: 'Offset Calculator',    file: 'index.html',                   icon: '⚙️'  },
    { label: 'Domain Checker',       file: 'domain-checker.html',          icon: '🌐'  },
    { label: 'Email Generator',      file: 'email-template-generator.html',icon: '✉️'  },
    { label: 'Image Resizer',        file: 'image-resizer.html',           icon: '🖼️'  },
    { label: 'Splash Previewer',     file: 'splash-preview.html',          icon: '📱'  },
  ];

  /* ── THEME ── */
  var THEME_KEY = 'sda-theme';

  function getTheme() {
    return localStorage.getItem(THEME_KEY) ||
      (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    var btn = document.getElementById('sda-theme-btn');
    if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    /* update CSS vars based on theme */
    if (theme === 'light') {
      document.documentElement.style.setProperty('--sda-bg',       '#f3f4f6');
      document.documentElement.style.setProperty('--sda-surface',  '#ffffff');
      document.documentElement.style.setProperty('--sda-border',   '#e2e8f0');
      document.documentElement.style.setProperty('--sda-text',     '#111827');
      document.documentElement.style.setProperty('--sda-muted',    '#6b7280');
      document.documentElement.style.setProperty('--sda-sub',      '#9ca3af');
      document.documentElement.style.setProperty('--sda-input-bg', '#f9fafb');
      document.documentElement.style.setProperty('--sda-nav-bg',   '#1a1d27');
      document.documentElement.style.setProperty('--sda-nav-text', '#ffffff');
    } else {
      document.documentElement.style.setProperty('--sda-bg',       '#0f1117');
      document.documentElement.style.setProperty('--sda-surface',  '#1a1d27');
      document.documentElement.style.setProperty('--sda-border',   '#2a2d3e');
      document.documentElement.style.setProperty('--sda-text',     '#e2e8f0');
      document.documentElement.style.setProperty('--sda-muted',    '#475569');
      document.documentElement.style.setProperty('--sda-sub',      '#64748b');
      document.documentElement.style.setProperty('--sda-input-bg', '#0f1117');
      document.documentElement.style.setProperty('--sda-nav-bg',   '#1a1d27');
      document.documentElement.style.setProperty('--sda-nav-text', '#ffffff');
    }
    document.body.style.background = 'var(--sda-bg)';
    document.body.style.color      = 'var(--sda-text)';
  }

  function toggleTheme() {
    applyTheme(getTheme() === 'dark' ? 'light' : 'dark');
  }

  /* ── ACTIVE PAGE DETECTION ── */
  function getActivePage() {
    var path = window.location.pathname;
    var file = path.split('/').pop() || 'index.html';
    return file;
  }

  /* ── BUILD NAV ── */
  function buildNav() {
    var active = getActivePage();
    var nav    = document.createElement('nav');
    nav.id     = 'sda-nav';
    nav.innerHTML = [
      '<style>',
      '#sda-nav{position:sticky;top:0;z-index:1000;background:var(--sda-nav-bg,#1a1d27);border-bottom:1px solid rgba(255,255,255,0.08);padding:0 1rem;}',
      '#sda-nav-inner{max-width:820px;margin:0 auto;display:flex;align-items:center;height:52px;gap:4px;}',
      '#sda-logo{font-size:13px;font-weight:700;color:#fff;text-decoration:none;white-space:nowrap;margin-right:8px;flex-shrink:0;display:flex;align-items:center;gap:6px;}',
      '#sda-logo span{background:linear-gradient(135deg,#7c3aed,#2563eb);width:24px;height:24px;border-radius:6px;display:inline-flex;align-items:center;justify-content:center;font-size:12px;}',
      '#sda-links{display:flex;align-items:center;gap:2px;flex:1;overflow-x:auto;scrollbar-width:none;-ms-overflow-style:none;}',
      '#sda-links::-webkit-scrollbar{display:none;}',
      '.sda-link{padding:6px 10px;border-radius:8px;font-size:12px;font-weight:500;color:rgba(255,255,255,0.55);text-decoration:none;white-space:nowrap;transition:all 0.15s;border:1px solid transparent;display:flex;align-items:center;gap:5px;flex-shrink:0;}',
      '.sda-link:hover{color:rgba(255,255,255,0.9);background:rgba(255,255,255,0.07);}',
      '.sda-link.active{color:#fff;background:rgba(255,255,255,0.12);border-color:rgba(255,255,255,0.15);}',
      '.sda-link-icon{font-size:13px;line-height:1;}',
      '#sda-actions{display:flex;align-items:center;gap:6px;margin-left:auto;flex-shrink:0;}',
      '#sda-theme-btn{background:transparent;border:1px solid rgba(255,255,255,0.15);color:rgba(255,255,255,0.7);border-radius:8px;padding:5px 8px;cursor:pointer;font-size:14px;transition:all 0.15s;line-height:1;}',
      '#sda-theme-btn:hover{background:rgba(255,255,255,0.1);color:#fff;}',
      '#sda-menu-btn{display:none;background:transparent;border:1px solid rgba(255,255,255,0.15);color:rgba(255,255,255,0.7);border-radius:8px;padding:5px 8px;cursor:pointer;font-size:16px;line-height:1;}',
      '#sda-mobile-menu{display:none;position:fixed;top:52px;left:0;right:0;background:var(--sda-nav-bg,#1a1d27);border-bottom:1px solid rgba(255,255,255,0.08);padding:8px;z-index:999;}',
      '#sda-mobile-menu.open{display:block;}',
      '.sda-mobile-link{display:flex;align-items:center;gap:8px;padding:10px 12px;border-radius:8px;font-size:13px;font-weight:500;color:rgba(255,255,255,0.6);text-decoration:none;transition:all 0.15s;}',
      '.sda-mobile-link:hover{background:rgba(255,255,255,0.07);color:#fff;}',
      '.sda-mobile-link.active{background:rgba(255,255,255,0.12);color:#fff;}',
      '@media(max-width:640px){',
      '  #sda-links{display:none;}',
      '  #sda-menu-btn{display:block;}',
      '}',
      'body{padding-top:0!important;}',
      '</style>',
      '<div id="sda-nav-inner">',
        '<a id="sda-logo" href="index.html"><span>🛠</span>SDA Toolbox</a>',
        '<div id="sda-links">',
          TOOLS.map(function(t) {
            var isActive = (t.file === active || (active === '' && t.file === 'index.html'));
            return '<a class="sda-link' + (isActive ? ' active' : '') + '" href="' + t.file + '">' +
              '<span class="sda-link-icon">' + t.icon + '</span>' + t.label + '</a>';
          }).join(''),
        '</div>',
        '<div id="sda-actions">',
          '<button id="sda-theme-btn" onclick="SDANav.toggleTheme()" title="Toggle light/dark mode">☀️</button>',
          '<button id="sda-menu-btn" onclick="SDANav.toggleMenu()" title="Menu">☰</button>',
        '</div>',
      '</div>',
    ].join('');

    /* Mobile menu */
    var mobileMenu = document.createElement('div');
    mobileMenu.id  = 'sda-mobile-menu';
    mobileMenu.innerHTML = TOOLS.map(function(t) {
      var isActive = (t.file === active || (active === '' && t.file === 'index.html'));
      return '<a class="sda-mobile-link' + (isActive ? ' active' : '') + '" href="' + t.file + '">' +
        '<span style="font-size:16px">' + t.icon + '</span>' + t.label + '</a>';
    }).join('');

    document.body.insertBefore(mobileMenu, document.body.firstChild);
    document.body.insertBefore(nav, mobileMenu);

    /* Close mobile menu on outside click */
    document.addEventListener('click', function(e) {
      var menu = document.getElementById('sda-mobile-menu');
      var btn  = document.getElementById('sda-menu-btn');
      if (menu && btn && !menu.contains(e.target) && !btn.contains(e.target)) {
        menu.classList.remove('open');
      }
    });
  }

  function toggleMenu() {
    var menu = document.getElementById('sda-mobile-menu');
    if (menu) menu.classList.toggle('open');
  }

  /* ── MOBILE RESPONSIVE GLOBALS ── */
  function injectMobileStyles() {
    var s = document.createElement('style');
    s.id  = 'sda-mobile-global';
    s.textContent = [
      /* two-col grids collapse on mobile */
      '@media(max-width:540px){',
      '  .two-col{grid-template-columns:1fr!important;}',
      '  .input-grid{grid-template-columns:1fr 1fr!important;}',
      '  .result-grid{grid-template-columns:1fr!important;}',
      '  .toggle-group{flex-direction:column!important;}',
      '  .derived-grid{grid-template-columns:1fr!important;}',
      '  .qa-cols{grid-template-columns:1fr!important;}',
      '  .country-btn{width:100%!important;justify-content:center!important;}',
      '  .preview-wrap{gap:16px!important;}',
      '  .android-frame,.ios-frame{width:140px!important;height:272px!important;}',
      '  .prop-grid{grid-template-columns:1fr!important;}',
      '  .redirect-entry-fields{grid-template-columns:1fr!important;}',
      '  .output-block-header{flex-direction:column!important;align-items:flex-start!important;}',
      '  .hero h1{font-size:21px!important;}',
      '  .page{padding-left:0.75rem!important;padding-right:0.75rem!important;}',
      '}',
      /* smooth scrolling everywhere */
      'html{scroll-behavior:smooth;}',
      /* make body use CSS vars */
      'body{background:var(--sda-bg,#0f1117)!important;color:var(--sda-text,#e2e8f0)!important;transition:background 0.2s,color 0.2s;}',
      /* card theming */
      '.card{background:var(--sda-surface,#1a1d27)!important;border-color:var(--sda-border,#2a2d3e)!important;}',
      '.status-card,.domain-entry,.output-box,.dns-detail,.result-tile,.output-block,.derived-tile,.diff-box{transition:background 0.2s,border-color 0.2s;}',
      /* input theming */
      'input[type="text"],input[type="number"],textarea{background:var(--sda-input-bg,#0f1117)!important;border-color:var(--sda-border,#2a2d3e)!important;color:var(--sda-text,#e2e8f0)!important;}',
      /* light mode overrides */
      '[data-theme="light"] .card{background:#ffffff!important;border-color:#e2e8f0!important;box-shadow:0 1px 3px rgba(0,0,0,0.06)!important;}',
      '[data-theme="light"] .status-card,[data-theme="light"] .output-box,[data-theme="light"] .dns-detail{background:#f9fafb!important;border-color:#e2e8f0!important;}',
      '[data-theme="light"] .section-label{opacity:0.9;}',
      '[data-theme="light"] .hero h1{color:#111827!important;}',
      '[data-theme="light"] .hero p{color:#6b7280!important;}',
      '[data-theme="light"] .formula-strip,[data-theme="light"] .output-box{background:#f3f4f6!important;color:#374151!important;}',
      '[data-theme="light"] .step-line{border-color:#f0f0f0!important;}',
      '[data-theme="light"] .result-tile.rt-ipp{background:linear-gradient(135deg,#dbeafe,#eff6ff)!important;border-color:#bfdbfe!important;}',
      '[data-theme="light"] .result-tile.rt-final{background:linear-gradient(135deg,#dcfce7,#f0fdf4)!important;border-color:#bbf7d0!important;}',
      '[data-theme="light"] .rt-val{color:#111827!important;}',
      '[data-theme="light"] .refresh-bar,[data-theme="light"] .overall{background:#ffffff!important;border-color:#e2e8f0!important;}',
      '[data-theme="light"] .prop-row,[data-theme="light"] .prop-stat{background:#f9fafb!important;border-color:#e2e8f0!important;}',
      '[data-theme="light"] .btn-primary{filter:brightness(0.95);}',
      '[data-theme="light"] .section-divider-line{background:#e2e8f0!important;}',
      '[data-theme="light"] .ic-result{background:linear-gradient(135deg,#dbeafe,#eff6ff)!important;}',
      '[data-theme="light"] .output-block-hint code{background:#e5e7eb!important;color:#374151!important;}',
      '[data-theme="light"] .derived-tile{background:#f9fafb!important;border-color:#e2e8f0!important;}',
    ].join('');
    document.head.appendChild(s);
  }

  /* ── INIT ── */
  function init() {
    injectMobileStyles();
    buildNav();
    applyTheme(getTheme());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* expose public API */
  window.SDANav = { toggleTheme: toggleTheme, toggleMenu: toggleMenu };

})();
