/* ── SDA Toolbox — Shared Navigation (Studio theme) ── */
(function () {

  var TOOLS = [
    { label: 'Offset Calculator', file: 'index.html',                    icon: '⚙\uFE0F' },
    { label: 'Domain Checker',    file: 'domain-checker.html',           icon: '🌐' },
    { label: 'Email Generator',   file: 'email-template-generator.html', icon: '✉\uFE0F' },
    { label: 'Image Resizer',     file: 'image-resizer.html',            icon: '🖼\uFE0F' },
    { label: 'Splash Previewer',  file: 'splash-preview.html',           icon: '📱' },
    { label: 'Tester Emails',     file: 'tester-email-extractor.html',   icon: '📧' },
  ];

  /* ── ACTIVE PAGE DETECTION ── */
  function getActivePage() {
    var path = window.location.pathname;
    return path.split('/').pop() || 'index.html';
  }

  /* ── BUILD NAV ── */
  function buildNav() {
    var active = getActivePage();
    var nav    = document.createElement('nav');
    nav.id     = 'sda-nav';
    nav.innerHTML = [
      '<style>',

      /* Studio tokens are scoped via attribute selector so they don't leak */
      '#sda-nav, #sda-mobile-menu {',
      '  --sda-bg-page:    #0a0a0f;',
      '  --sda-bg-card:    #14141a;',
      '  --sda-bg-muted:   #1a1a22;',
      '  --sda-border:     #26262e;',
      '  --sda-border-hov: #3a3a44;',
      '  --sda-text-1:     #fafafa;',
      '  --sda-text-2:     #d4d4d8;',
      '  --sda-text-3:     #a1a1aa;',
      '  --sda-text-4:     #71717a;',
      '  --sda-accent:     #d4ff3a;',
      '  --sda-accent-bg:  rgba(212,255,58,0.10);',
      '  --sda-accent-bd:  rgba(212,255,58,0.30);',
      '  --sda-on-accent:  #0a0a0f;',
      '  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;',
      '}',

      /* Bar */
      '#sda-nav {',
      '  position: sticky; top: 0; z-index: 1000;',
      '  background: rgba(10,10,15,0.78);',
      '  backdrop-filter: blur(20px) saturate(180%);',
      '  -webkit-backdrop-filter: blur(20px) saturate(180%);',
      '  border-bottom: 1px solid var(--sda-border);',
      '  padding: 0 22px;',
      '  height: 52px;',
      '}',
      '#sda-nav-inner {',
      '  display: flex; align-items: center;',
      '  justify-content: center;',
      '  height: 52px;',
      '  gap: 10px;',
      '  max-width: 1400px;',
      '  margin: 0 auto;',
      '}',

      /* Logo */
      '#sda-logo {',
      '  font-size: 13.5px; font-weight: 600;',
      '  color: var(--sda-text-1);',
      '  text-decoration: none;',
      '  white-space: nowrap;',
      '  margin-right: 8px;',
      '  flex-shrink: 0;',
      '  display: flex; align-items: center; gap: 8px;',
      '  letter-spacing: -0.005em;',
      '}',
      '#sda-logo .sda-logo-mark {',
      '  background: var(--sda-accent);',
      '  width: 28px; height: 28px;',
      '  border-radius: 7px;',
      '  display: inline-flex; align-items: center; justify-content: center;',
      '  color: var(--sda-on-accent);',
      '  font-size: 13px; font-weight: 800;',
      '  letter-spacing: -0.02em;',
      '  box-shadow: 0 0 14px rgba(212,255,58,0.22);',
      '  transition: box-shadow 0.18s;',
      '}',
      '#sda-logo:hover .sda-logo-mark { box-shadow: 0 0 22px rgba(212,255,58,0.40); }',

      /* Link list */
      '#sda-links {',
      '  display: flex; align-items: center; gap: 2px;',
      '  overflow-x: auto;',
      '  scrollbar-width: none;',
      '  -ms-overflow-style: none;',
      '}',
      '#sda-links::-webkit-scrollbar { display: none; }',

      '.sda-link {',
      '  padding: 6px 11px;',
      '  border-radius: 7px;',
      '  font-size: 12.5px; font-weight: 500;',
      '  color: var(--sda-text-3);',
      '  text-decoration: none;',
      '  white-space: nowrap;',
      '  transition: all 0.12s;',
      '  border: 1px solid transparent;',
      '  display: flex; align-items: center; gap: 6px;',
      '  flex-shrink: 0;',
      '  font-family: inherit;',
      '}',
      '.sda-link:hover {',
      '  color: var(--sda-text-1);',
      '  background: var(--sda-bg-muted);',
      '}',
      '.sda-link.active {',
      '  color: var(--sda-accent);',
      '  background: var(--sda-accent-bg);',
      '  border-color: var(--sda-accent-bd);',
      '}',
      '.sda-link-icon { font-size: 13px; line-height: 1; opacity: 0.85; }',
      '.sda-link.active .sda-link-icon { opacity: 1; }',

      /* Mobile menu button */
      '#sda-menu-btn {',
      '  display: none;',
      '  background: var(--sda-bg-card);',
      '  border: 1px solid var(--sda-border);',
      '  color: var(--sda-text-2);',
      '  border-radius: 7px;',
      '  padding: 6px 11px;',
      '  cursor: pointer;',
      '  font-size: 15px; line-height: 1;',
      '  margin-left: auto;',
      '  font-family: inherit;',
      '  transition: all 0.12s;',
      '}',
      '#sda-menu-btn:hover { border-color: var(--sda-border-hov); background: var(--sda-bg-muted); color: var(--sda-text-1); }',

      /* Mobile sheet */
      '#sda-mobile-menu {',
      '  display: none;',
      '  position: fixed; top: 52px; left: 0; right: 0;',
      '  background: rgba(10,10,15,0.95);',
      '  backdrop-filter: blur(20px) saturate(180%);',
      '  -webkit-backdrop-filter: blur(20px) saturate(180%);',
      '  border-bottom: 1px solid var(--sda-border);',
      '  padding: 8px;',
      '  z-index: 999;',
      '}',
      '#sda-mobile-menu.open { display: block; }',
      '.sda-mobile-link {',
      '  display: flex; align-items: center; gap: 11px;',
      '  padding: 11px 13px;',
      '  border-radius: 8px;',
      '  font-size: 13.5px; font-weight: 500;',
      '  color: var(--sda-text-3);',
      '  text-decoration: none;',
      '  transition: all 0.12s;',
      '  border: 1px solid transparent;',
      '}',
      '.sda-mobile-link:hover { background: var(--sda-bg-muted); color: var(--sda-text-1); }',
      '.sda-mobile-link.active {',
      '  background: var(--sda-accent-bg);',
      '  color: var(--sda-accent);',
      '  border-color: var(--sda-accent-bd);',
      '}',
      '.sda-mobile-link span { font-size: 15px; opacity: 0.9; }',

      /* Mobile breakpoint */
      '@media (max-width: 720px) {',
      '  #sda-links { display: none; }',
      '  #sda-menu-btn { display: block; }',
      '}',

      // Coordination with per-page .studio-toolbar (Image Resizer, DNS Checker, Email Generator):
      // - Push studio-toolbar below this nav (top: 52px instead of 0)
      // - Hide its duplicate S logo + "Studio" title since this nav already shows them
      // - Adjust .studio-right sticky pane in split layouts to account for both bars stacked
      '.studio-toolbar { top: 52px !important; }',
      '.studio-toolbar > .studio-logo,',
      '.studio-toolbar > .studio-toolbar-title { display: none !important; }',
      '.studio-right { top: 106px !important; height: calc(100vh - 106px) !important; }',

      '</style>',

      '<div id="sda-nav-inner">',
        '<a id="sda-logo" href="index.html"><span class="sda-logo-mark">S</span>SDA Toolbox</a>',
        '<div id="sda-links">',
          TOOLS.map(function (t) {
            var isActive = (t.file === active || (active === '' && t.file === 'index.html'));
            return '<a class="sda-link' + (isActive ? ' active' : '') + '" href="' + t.file + '">' +
              '<span class="sda-link-icon">' + t.icon + '</span>' + t.label + '</a>';
          }).join(''),
        '</div>',
        '<button id="sda-menu-btn" onclick="SDANav.toggleMenu()" title="Menu" aria-label="Open menu">☰</button>',
      '</div>',
    ].join('');

    /* Mobile menu sheet */
    var mobileMenu = document.createElement('div');
    mobileMenu.id  = 'sda-mobile-menu';
    mobileMenu.innerHTML = TOOLS.map(function (t) {
      var isActive = (t.file === active || (active === '' && t.file === 'index.html'));
      return '<a class="sda-mobile-link' + (isActive ? ' active' : '') + '" href="' + t.file + '">' +
        '<span>' + t.icon + '</span>' + t.label + '</a>';
    }).join('');

    document.body.insertBefore(mobileMenu, document.body.firstChild);
    document.body.insertBefore(nav, mobileMenu);

    /* Close mobile menu on outside click */
    document.addEventListener('click', function (e) {
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

  /* ── MOBILE RESPONSIVE GLOBALS (kept from previous nav.js) ── */
  function injectMobileStyles() {
    var s = document.createElement('style');
    s.id = 'sda-mobile-global';
    s.textContent = [
      '@media (max-width: 540px) {',
      '  .two-col { grid-template-columns: 1fr !important; }',
      '  .input-grid { grid-template-columns: 1fr 1fr !important; }',
      '  .result-grid { grid-template-columns: 1fr !important; }',
      '  .toggle-group { flex-direction: column !important; }',
      '  .derived-grid { grid-template-columns: 1fr !important; }',
      '  .qa-cols { grid-template-columns: 1fr !important; }',
      '  .country-btn { width: 100% !important; justify-content: center !important; }',
      '  .preview-wrap { gap: 16px !important; }',
      '  .android-frame, .ios-frame { width: 140px !important; height: 272px !important; }',
      '  .prop-grid { grid-template-columns: 1fr !important; }',
      '  .redirect-entry-fields { grid-template-columns: 1fr !important; }',
      '  .output-block-header { flex-direction: column !important; align-items: flex-start !important; }',
      '  .hero h1 { font-size: 21px !important; }',
      '  .page { padding-left: 0.75rem !important; padding-right: 0.75rem !important; }',
      '}',
      'html { scroll-behavior: smooth; }',
    ].join('');
    document.head.appendChild(s);
  }

  /* ── FONT LOADER ── */
  /* Load Inter + JetBrains Mono if the page hasn't already (some Studio pages preload these in <head>).
     We check for an existing fonts.googleapis.com Inter link before adding our own to avoid duplicates. */
  function ensureFonts() {
    var has = false;
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if ((links[i].href || '').indexOf('Inter') !== -1) { has = true; break; }
    }
    if (has) return;
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap';
    document.head.appendChild(l);
  }

  /* ── INIT ── */
  function init() {
    ensureFonts();
    injectMobileStyles();
    buildNav();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.SDANav = { toggleMenu: toggleMenu };

})();
