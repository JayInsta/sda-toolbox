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
      /* Slack-inspired — soft off-white, low contrast, easy on eyes */
      document.documentElement.style.setProperty('--sda-bg',       '#f8f8f8');
      document.documentElement.style.setProperty('--sda-surface',  '#ffffff');
      document.documentElement.style.setProperty('--sda-border',   '#e8e8e8');
      document.documentElement.style.setProperty('--sda-text',     '#1d1c1d');
      document.documentElement.style.setProperty('--sda-muted',    '#616061');
      document.documentElement.style.setProperty('--sda-sub',      '#868686');
      document.documentElement.style.setProperty('--sda-input-bg', '#f8f8f8');
      document.documentElement.style.setProperty('--sda-nav-bg',   '#350d36');
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
      '[data-theme="light"] .card{background:#ffffff!important;border-color:#e8e8e8!important;box-shadow:0 1px 4px rgba(0,0,0,0.06)!important;}',
      '[data-theme="light"] .status-card{background:#f8f8f8!important;border-color:#e8e8e8!important;}',
      '[data-theme="light"] .output-box,[data-theme="light"] .dns-detail{background:#f8f8f8!important;border-color:#e8e8e8!important;color:#1d1c1d!important;}',
      '[data-theme="light"] .section-label{opacity:1;}',
      '[data-theme="light"] .hero h1{color:#1d1c1d!important;}',
      '[data-theme="light"] .hero p{color:#616061!important;}',
      '[data-theme="light"] .formula-strip{background:#f1f1f1!important;color:#616061!important;border-color:#e0e0e0!important;}',
      '[data-theme="light"] .step-line{border-color:#f0f0f0!important;}',
      '[data-theme="light"] .step-line .sl{color:#868686!important;}',
      '[data-theme="light"] .step-line .sv{color:#1d1c1d!important;}',
      '[data-theme="light"] input[type="text"],[data-theme="light"] input[type="number"],[data-theme="light"] textarea{background:#f8f8f8!important;border-color:#e0e0e0!important;color:#1d1c1d!important;}',
      '[data-theme="light"] input[type="text"]:focus,[data-theme="light"] input[type="number"]:focus,[data-theme="light"] textarea:focus{border-color:#350d36!important;box-shadow:0 0 0 2px rgba(53,13,54,0.12)!important;}',
      '[data-theme="light"] .result-tile.rt-ipp{background:#ecf3fc!important;border-color:#c4daf5!important;}',
      '[data-theme="light"] .result-tile.rt-final{background:#ecf7ef!important;border-color:#b8e0c4!important;}',
      '[data-theme="light"] .result-tile.rt-major-ipp{background:#f3ecfc!important;border-color:#d0b8f0!important;}',
      '[data-theme="light"] .result-tile.rt-major-final{background:#ecf7ef!important;border-color:#b8e0c4!important;}',
      '[data-theme="light"] .rt-label{opacity:0.8;}',
      '[data-theme="light"] .rt-val{color:#1d1c1d!important;}',
      '[data-theme="light"] .rt-sub{color:#616061!important;}',
      '[data-theme="light"] .refresh-bar{background:#ffffff!important;border-color:#e8e8e8!important;}',
      '[data-theme="light"] .overall{background:#ffffff!important;border-color:#e8e8e8!important;}',
      '[data-theme="light"] .overall-label{color:#868686!important;}',
      '[data-theme="light"] .overall-status{color:#1d1c1d!important;}',
      '[data-theme="light"] .countdown{color:#350d36!important;}',
      '[data-theme="light"] .prop-row{background:#f8f8f8!important;border-color:#e8e8e8!important;}',
      '[data-theme="light"] .prop-stat{background:#f8f8f8!important;border-color:#e8e8e8!important;}',
      '[data-theme="light"] .prop-stat-num{color:#1d1c1d!important;}',
      '[data-theme="light"] .prop-stat.ps-ok .prop-stat-num{color:#2c7e3e!important;}',
      '[data-theme="light"] .prop-stat.ps-fail .prop-stat-num{color:#c0392b!important;}',
      '[data-theme="light"] .prop-stat.ps-pend .prop-stat-num{color:#c07c00!important;}',
      '[data-theme="light"] .prop-loc-name{color:#1d1c1d!important;}',
      '[data-theme="light"] .prop-loc-region{color:#868686!important;}',
      '[data-theme="light"] .section-divider-line{background:#e8e8e8!important;}',
      '[data-theme="light"] .section-label.sl-blue{background:#ecf3fc!important;color:#1264a3!important;border-color:#c4daf5!important;}',
      '[data-theme="light"] .section-label.sl-green{background:#ecf7ef!important;color:#2c7e3e!important;border-color:#b8e0c4!important;}',
      '[data-theme="light"] .section-label.sl-purple{background:#f3ecfc!important;color:#6b2fa0!important;border-color:#d0b8f0!important;}',
      '[data-theme="light"] .section-label.sl-orange{background:#fef3e2!important;color:#c07c00!important;border-color:#f0d090!important;}',
      '[data-theme="light"] .section-label.sl-teal{background:#e2f5f5!important;color:#1e7e7e!important;border-color:#9ed8d8!important;}',
      '[data-theme="light"] .section-label.sl-red{background:#fde8e8!important;color:#c0392b!important;border-color:#f0b8b8!important;}',
      '[data-theme="light"] .ic-result{background:#ecf3fc!important;border-color:#c4daf5!important;}',
      '[data-theme="light"] .ic-result-label{color:#1264a3!important;}',
      '[data-theme="light"] .ic-result-val{color:#1d1c1d!important;}',
      '[data-theme="light"] .major-result{background:#f3ecfc!important;border-color:#d0b8f0!important;}',
      '[data-theme="light"] .major-result-label{color:#6b2fa0!important;}',
      '[data-theme="light"] .major-result-val{color:#1d1c1d!important;}',
      '[data-theme="light"] .output-block-hint code{background:#f1f1f1!important;color:#616061!important;border:1px solid #e0e0e0!important;}',
      '[data-theme="light"] .derived-tile{background:#f8f8f8!important;border-color:#e8e8e8!important;}',
      '[data-theme="light"] .derived-tile-label{color:#868686!important;}',
      '[data-theme="light"] .derived-tile-value{color:#1d1c1d!important;}',
      '[data-theme="light"] .toggle-btn{background:#f8f8f8!important;border-color:#e0e0e0!important;color:#616061!important;}',
      '[data-theme="light"] .toggle-btn:hover{background:#f0f0f0!important;color:#1d1c1d!important;}',
      '[data-theme="light"] .toggle-btn.active{background:#350d36!important;border-color:#350d36!important;color:#ffffff!important;}',
      '[data-theme="light"] .info-box{background:#ecf7ef!important;border-color:#b8e0c4!important;color:#2c7e3e!important;}',
      '[data-theme="light"] .info-dot{background:#2c7e3e!important;}',
      '[data-theme="light"] .warn-box{background:#fef3e2!important;border-color:#f0d090!important;color:#c07c00!important;}',
      '[data-theme="light"] .warn-dot{background:#c07c00!important;}',
      '[data-theme="light"] .split-warn{background:#fef3e2!important;border-color:#f0d090!important;}',
      '[data-theme="light"] .split-warn-title{color:#c07c00!important;}',
      '[data-theme="light"] .split-warn-body{color:#996000!important;}',
      '[data-theme="light"] .split-warn-body code{background:#fae8c0!important;}',
      '[data-theme="light"] .action-hint.ah-ok{background:#ecf7ef!important;border-color:#b8e0c4!important;color:#2c7e3e!important;}',
      '[data-theme="light"] .action-hint.ah-fail{background:#fde8e8!important;border-color:#f0b8b8!important;color:#c0392b!important;}',
      '[data-theme="light"] .action-hint.ah-pending{background:#fef3e2!important;border-color:#f0d090!important;color:#c07c00!important;}',
      '[data-theme="light"] .dns-btn{background:#f8f8f8!important;border-color:#e0e0e0!important;color:#616061!important;}',
      '[data-theme="light"] .dns-btn.active{background:#350d36!important;border-color:#350d36!important;color:#ffffff!important;}',
      '[data-theme="light"] .rec-btn{background:#f8f8f8!important;border-color:#e0e0e0!important;color:#616061!important;}',
      '[data-theme="light"] .rec-btn.active{background:#ecf7ef!important;border-color:#b8e0c4!important;color:#2c7e3e!important;}',
      '[data-theme="light"] .country-btn{background:#f8f8f8!important;border-color:#e0e0e0!important;color:#616061!important;}',
      '[data-theme="light"] .country-btn.active{background:#350d36!important;border-color:#350d36!important;color:#ffffff!important;}',
      '[data-theme="light"] .diff-box{background:#f8f8f8!important;border-color:#e8e8e8!important;}',
      '[data-theme="light"] .diff-line-num{background:#f1f1f1!important;color:#868686!important;border-color:#e8e8e8!important;}',
      '[data-theme="light"] .diff-line.dl-ok .diff-line-content{color:#868686!important;}',
      '[data-theme="light"] .diff-line.dl-add{background:#ecf7ef!important;}',
      '[data-theme="light"] .diff-line.dl-add .diff-line-content{color:#2c7e3e!important;}',
      '[data-theme="light"] .diff-line.dl-add .diff-line-num{background:#ddf0e4!important;color:#2c7e3e!important;}',
      '[data-theme="light"] .diff-line.dl-del{background:#fde8e8!important;}',
      '[data-theme="light"] .diff-line.dl-del .diff-line-content{color:#c0392b!important;}',
      '[data-theme="light"] .diff-line.dl-del .diff-line-num{background:#f8d0d0!important;color:#c0392b!important;}',
      '[data-theme="light"] .diff-line.dl-chg{background:#fef8e8!important;}',
      '[data-theme="light"] .diff-line.dl-chg .diff-line-content{color:#c07c00!important;}',
      '[data-theme="light"] .diff-line.dl-chg .diff-line-num{background:#faedd8!important;color:#c07c00!important;}',
      '[data-theme="light"] .diff-stat{background:#f8f8f8!important;border-color:#e8e8e8!important;}',
      '[data-theme="light"] .diff-stat.ds-ok .diff-stat-num{color:#2c7e3e!important;}',
      '[data-theme="light"] .diff-stat.ds-diff .diff-stat-num{color:#c0392b!important;}',
      '[data-theme="light"] .diff-stat.ds-miss .diff-stat-num{color:#c07c00!important;}',
      '[data-theme="light"] .match-banner.mb-ok{background:#ecf7ef!important;border-color:#b8e0c4!important;color:#2c7e3e!important;}',
      '[data-theme="light"] .match-banner.mb-diff{background:#fde8e8!important;border-color:#f0b8b8!important;color:#c0392b!important;}',
      '[data-theme="light"] .qa-cols textarea{background:#f8f8f8!important;border-color:#e0e0e0!important;color:#1d1c1d!important;}',
      '[data-theme="light"] .output-box .out-key{color:#1264a3!important;}',
      '[data-theme="light"] .output-box .out-val{color:#2c7e3e!important;}',
      '[data-theme="light"] .output-box .out-indent1{color:#6b2fa0!important;}',
      '[data-theme="light"] .output-box .out-indent2{color:#c07c00!important;}',
      '[data-theme="light"] .output-box .out-plain{color:#350d36!important;font-size:16px!important;}',
      '[data-theme="light"] .btn-add{background:#f8f8f8!important;border-color:#e0e0e0!important;color:#616061!important;}',
      '[data-theme="light"] .btn-add:hover{border-color:#350d36!important;color:#350d36!important;background:#f3ecfc!important;}',
      '[data-theme="light"] .btn-remove{background:#fde8e8!important;border-color:#f0b8b8!important;color:#c0392b!important;}',
      '[data-theme="light"] .btn-stop{background:#fde8e8!important;border-color:#f0b8b8!important;color:#c0392b!important;}',
      '[data-theme="light"] .domain-entry{background:#f8f8f8!important;border-color:#e8e8e8!important;}',
      '[data-theme="light"] .upload-zone{border-color:#e0e0e0!important;background:#f8f8f8!important;}',
      '[data-theme="light"] .upload-zone:hover{background:#f3ecfc!important;border-color:#350d36!important;}',
      '[data-theme="light"] .status-badge.badge-checking{background:#ecf3fc!important;color:#1264a3!important;}',
      '[data-theme="light"] .status-badge.badge-ok{background:#ecf7ef!important;color:#2c7e3e!important;}',
      '[data-theme="light"] .status-badge.badge-fail{background:#fde8e8!important;color:#c0392b!important;}',
      '[data-theme="light"] .status-badge.badge-pending{background:#fef3e2!important;color:#c07c00!important;}',
      '[data-theme="light"] .status-badge.badge-idle{background:#f1f1f1!important;color:#616061!important;}',
      '[data-theme="light"] .status-card.ok{border-color:#b8e0c4!important;}',
      '[data-theme="light"] .status-card.fail{border-color:#f0b8b8!important;}',
      '[data-theme="light"] .status-card.pending{border-color:#f0d090!important;}',
      '[data-theme="light"] .status-card.checking{border-color:#c4daf5!important;}',
      '[data-theme="light"] .status-title{color:#1d1c1d!important;}',
      '[data-theme="light"] .status-desc{color:#616061!important;}',
      '[data-theme="light"] .dk{color:#868686!important;}',
      '[data-theme="light"] .dv{color:#1264a3!important;}',
      '[data-theme="light"] .dok{color:#2c7e3e!important;}',
      '[data-theme="light"] .dno{color:#c0392b!important;}',
      '[data-theme="light"] .next-step-item{border-color:#f0f0f0!important;color:#1d1c1d!important;}',
      '[data-theme="light"] .last-checked{color:#868686!important;}',
      '[data-theme="light"] .footer{color:#868686!important;}',
      '[data-theme="light"] .card-title{color:#1d1c1d!important;opacity:1!important;}',
      '[data-theme="light"] .card-sub{color:#616061!important;opacity:1!important;}',
      /* step badges — force readable text on dark badge bg */
      '[data-theme="light"] .step-badge{opacity:1!important;}',
      '[data-theme="light"] .sm1,.sm2,.sv1,.sv2,.sv3,.sv4,.s1,.s2,.s3,.s4{opacity:1!important;filter:none!important;}',
      /* section labels — force high contrast text */
      '[data-theme="light"] .sl-major{background:#f3ecfc!important;color:#4a1a8a!important;border-color:#c8a8f0!important;opacity:1!important;}',
      '[data-theme="light"] .sl-vc{background:#ecf3fc!important;color:#0d4f8a!important;border-color:#a8c8f0!important;opacity:1!important;}',
      '[data-theme="light"] .sl-purple{background:#f3ecfc!important;color:#4a1a8a!important;border-color:#c8a8f0!important;opacity:1!important;}',
      '[data-theme="light"] .sl-blue{background:#ecf3fc!important;color:#0d4f8a!important;border-color:#a8c8f0!important;opacity:1!important;}',
      '[data-theme="light"] .sl-green{background:#ecf7ef!important;color:#1a5c2a!important;border-color:#a0d0b0!important;opacity:1!important;}',
      '[data-theme="light"] .sl-orange{background:#fef3e2!important;color:#8a5000!important;border-color:#e0c070!important;opacity:1!important;}',
      '[data-theme="light"] .sl-red{background:#fde8e8!important;color:#8a1a1a!important;border-color:#e0a0a0!important;opacity:1!important;}',
      '[data-theme="light"] .sl-teal{background:#e2f5f5!important;color:#0a5c5c!important;border-color:#80c8c8!important;opacity:1!important;}',
      /* formula bar — dark text */
      '[data-theme="light"] .formula-strip{color:#3a3630!important;}',
      '[data-theme="light"] .formula-strip .fval{color:#1264a3!important;}',
      '[data-theme="light"] .formula-strip .fval-purple{color:#4a1a8a!important;}',
      /* toggle buttons — active state must be visible */
      '[data-theme="light"] .toggle-btn{color:#1d1c1d!important;}',
      '[data-theme="light"] .toggle-btn.active{background:#350d36!important;color:#ffffff!important;border-color:#350d36!important;}',
      /* result tiles — text must be dark not washed out */
      '[data-theme="light"] .rt-label{opacity:1!important;}',
      '[data-theme="light"] .rt-ipp .rt-label{color:#0d4f8a!important;}',
      '[data-theme="light"] .rt-final .rt-label{color:#1a5c2a!important;}',
      '[data-theme="light"] .rt-major-ipp .rt-label{color:#4a1a8a!important;}',
      '[data-theme="light"] .rt-major-final .rt-label{color:#1a5c2a!important;}',
      '[data-theme="light"] .rt-val{color:#1d1c1d!important;opacity:1!important;}',
      '[data-theme="light"] .rt-sub{opacity:1!important;}',
      '[data-theme="light"] .rt-ipp .rt-sub{color:#0d4f8a!important;}',
      '[data-theme="light"] .rt-final .rt-sub{color:#1a5c2a!important;}',
      '[data-theme="light"] .badge{opacity:1!important;}',
      '[data-theme="light"] .b-green{background:#d4edda!important;color:#1a5c2a!important;}',
      '[data-theme="light"] .b-blue{background:#d0e8f8!important;color:#0d4f8a!important;}',
      '[data-theme="light"] .b-purple{background:#ede0fa!important;color:#4a1a8a!important;}',
      '[data-theme="light"] .b-amber{background:#fef0cc!important;color:#7a4a00!important;}',
      /* hero code tags */
      '[data-theme="light"] .hero code{background:#f0ecf8!important;color:#4a1a8a!important;border-color:#c8a8f0!important;}',
      /* IC result badge text */
      '[data-theme="light"] .ic-result-label{color:#0d4f8a!important;opacity:1!important;}',
      '[data-theme="light"] .ic-result-val{color:#1d1c1d!important;opacity:1!important;}',
      /* warn/info text */
      '[data-theme="light"] .warn-box{color:#7a4000!important;}',
      '[data-theme="light"] .info-box{color:#1a5c2a!important;}',
      /* step line values */
      '[data-theme="light"] .step-line .sv{color:#1d1c1d!important;opacity:1!important;}',
      '[data-theme="light"] .step-line .sl{color:#616061!important;opacity:1!important;}',
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
