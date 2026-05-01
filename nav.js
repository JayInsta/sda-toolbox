/* ── SDA Toolbox — Shared Navigation ── */
(function () {

  var TOOLS = [
    { label: 'Offset Calculator',     file: 'index.html',                    icon: '⚙️' },
    { label: 'Domain Checker',        file: 'domain-checker.html',           icon: '🌐' },
    { label: 'Email Generator',       file: 'email-template-generator.html', icon: '✉️' },
    { label: 'Image Resizer',         file: 'image-resizer.html',            icon: '🖼️' },
    { label: 'Splash Previewer',      file: 'splash-preview.html',           icon: '📱' },
  ];

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
      '#sda-nav{position:sticky;top:0;z-index:1000;background:#1a1d27;border-bottom:1px solid rgba(255,255,255,0.08);padding:0 1rem;}',
      '#sda-nav-inner{max-width:820px;margin:0 auto;display:flex;align-items:center;height:52px;gap:4px;}',
      '#sda-logo{font-size:13px;font-weight:700;color:#fff;text-decoration:none;white-space:nowrap;margin-right:8px;flex-shrink:0;display:flex;align-items:center;gap:6px;}',
      '#sda-logo span{background:linear-gradient(135deg,#7c3aed,#2563eb);width:24px;height:24px;border-radius:6px;display:inline-flex;align-items:center;justify-content:center;font-size:12px;}',
      '#sda-links{display:flex;align-items:center;gap:2px;flex:1;overflow-x:auto;scrollbar-width:none;-ms-overflow-style:none;}',
      '#sda-links::-webkit-scrollbar{display:none;}',
      '.sda-link{padding:6px 10px;border-radius:8px;font-size:12px;font-weight:500;color:rgba(255,255,255,0.55);text-decoration:none;white-space:nowrap;transition:all 0.15s;border:1px solid transparent;display:flex;align-items:center;gap:5px;flex-shrink:0;}',
      '.sda-link:hover{color:rgba(255,255,255,0.9);background:rgba(255,255,255,0.07);}',
      '.sda-link.active{color:#fff;background:rgba(255,255,255,0.12);border-color:rgba(255,255,255,0.15);}',
      '.sda-link-icon{font-size:13px;line-height:1;}',
      '#sda-menu-btn{display:none;background:transparent;border:1px solid rgba(255,255,255,0.15);color:rgba(255,255,255,0.7);border-radius:8px;padding:5px 10px;cursor:pointer;font-size:16px;line-height:1;margin-left:auto;}',
      '#sda-mobile-menu{display:none;position:fixed;top:52px;left:0;right:0;background:#1a1d27;border-bottom:1px solid rgba(255,255,255,0.08);padding:8px;z-index:999;}',
      '#sda-mobile-menu.open{display:block;}',
      '.sda-mobile-link{display:flex;align-items:center;gap:8px;padding:10px 12px;border-radius:8px;font-size:13px;font-weight:500;color:rgba(255,255,255,0.6);text-decoration:none;transition:all 0.15s;}',
      '.sda-mobile-link:hover{background:rgba(255,255,255,0.07);color:#fff;}',
      '.sda-mobile-link.active{background:rgba(255,255,255,0.12);color:#fff;}',
      '@media(max-width:640px){',
      '  #sda-links{display:none;}',
      '  #sda-menu-btn{display:block;}',
      '}',
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
        '<button id="sda-menu-btn" onclick="SDANav.toggleMenu()" title="Menu">☰</button>',
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
      'html{scroll-behavior:smooth;}',
    ].join('');
    document.head.appendChild(s);
  }

  /* ── INIT ── */
  function init() {
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
