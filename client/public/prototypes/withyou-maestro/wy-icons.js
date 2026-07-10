/* WithYou icon library — custom 1.8-stroke set, no emoji.
 * Usage:  <wy-icon name="heart" size="20"></wy-icon>
 * Renders into a shadow root so it never collides with React's DOM
 * reconciliation. Inherits the parent's text color via currentColor,
 * so it themes automatically in light + dark.
 */
(function () {
  var I = {
    home:'<path d="M3 11l9-7 9 7v9a2 2 0 0 1-2 2h-4v-7H9v7H5a2 2 0 0 1-2-2v-9z"/>',
    heart:'<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
    check:'<path d="M5 12l5 5L20 7"/>',
    chart:'<path d="M3 21h18M6 17V9M11 17V5M16 17v-6M21 17v-9"/>',
    user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17" cy="9" r="3"/><path d="M14.5 20.5a5 5 0 0 1 7-4.6"/>',
    sparkle:'<path d="M12 3v6M12 15v6M3 12h6M15 12h6M5.5 5.5l4 4M14.5 14.5l4 4M18.5 5.5l-4 4M9.5 14.5l-4 4"/>',
    sparkles:'<path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3z"/><path d="M19 15l.8 2 2 .8-2 .8L19 21l-.8-2-2-.8 2-.8L19 15z"/>',
    message:'<path d="M21 15a2 2 0 0 1-2 2H8l-5 4V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9z"/>',
    chat:'<path d="M21 11.5a8.4 8.4 0 0 1-8.5 8 9.4 9.4 0 0 1-3-.5L4 21l1-3.5A8 8 0 0 1 12.5 3.5a8.3 8.3 0 0 1 8.5 8z"/>',
    lock:'<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    unlock:'<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 7.5-2"/>',
    eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    shield:'<path d="M12 3l8 3v6c0 5-3.5 8.4-8 9-4.5-.6-8-4-8-9V6l8-3z"/>',
    'chevron-left':'<path d="M15 6l-6 6 6 6"/>',
    'chevron-right':'<path d="M9 6l6 6-6 6"/>',
    'chevron-down':'<path d="M6 9l6 6 6-6"/>',
    'arrow-left':'<path d="M19 12H5M12 19l-7-7 7-7"/>',
    'arrow-right':'<path d="M5 12h14M12 5l7 7-7 7"/>',
    plus:'<path d="M12 5v14M5 12h14"/>',
    close:'<path d="M6 6l12 12M18 6L6 18"/>',
    edit:'<path d="M4 20h4l10-10-4-4L4 16v4z"/><path d="M14 6l4 4"/>',
    pencil:'<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>',
    send:'<path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>',
    image:'<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.8"/><path d="M21 16l-5-5L6 20"/>',
    smile:'<circle cx="12" cy="12" r="9"/><path d="M8 14a4.5 4.5 0 0 0 8 0"/><path d="M9 9.5h.01M15 9.5h.01"/>',
    refresh:'<path d="M21 12a9 9 0 1 1-2.6-6.4M21 4v5h-5"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    cal:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0"/>',
    help:'<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 2.5-3 4.5"/><path d="M12 18h.01"/>',
    info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 8h.01"/>',
    alert:'<path d="M10.3 3.8 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.8a2 2 0 0 0-3.4 0z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    flag:'<path d="M5 21V4M5 4h13l-3 4 3 4H5"/>',
    pin:'<path d="M12 22s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
    star:'<path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"/>',
    leaf:'<path d="M11 20A7 7 0 0 1 4 13C4 9 7 5 14 4c2 6-1 13-6 16zM2 22l9-9"/>',
    sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon:'<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
    coffee:'<path d="M3 8h14v6a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8zM17 9h2a3 3 0 0 1 0 6h-2M5 3v2M9 3v2M13 3v2"/>',
    gift:'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9h14v-9M12 8v13M12 8s-3-5-5.5-3.5C5 5.5 5.5 8 8 8h4M12 8s3-5 5.5-3.5C19 5.5 18.5 8 16 8h-4"/>',
    'pause-circle':'<circle cx="12" cy="12" r="9"/><path d="M10 9v6M14 9v6"/>',
    archive:'<rect x="3" y="4" width="18" height="4" rx="1"/><path d="M5 8v11a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8M10 12h4"/>',
    link:'<path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1"/><path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1"/>',
    mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
    handshake:'<path d="M8 13l2.5 2.5a1.5 1.5 0 0 0 2.1 0l.4-.4 2 2a1.4 1.4 0 0 0 2-2l.5.5a1.4 1.4 0 0 0 2-2L17 9l-2-4H9L7 7H3M21 7h-2"/>',
    'door-exit':'<path d="M14 3h5a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5M10 17l5-5-5-5M15 12H3"/>',
    wifi:'<path d="M2 8.5a14 14 0 0 1 20 0M5 12a10 10 0 0 1 14 0M8.5 15.5a5 5 0 0 1 7 0"/><circle cx="12" cy="19" r="1" fill="currentColor"/>',
  };

  var Filled = { star: true };

  function svgFor(name, size, sw) {
    var p = I[name]; if (p == null) p = I['sparkle'];
    var fill = Filled[name] ? 'currentColor' : 'none';
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="' + fill +
      '" stroke="currentColor" stroke-width="' + sw + '" stroke-linecap="round" stroke-linejoin="round" style="display:block">' + p + '</svg>';
  }

  try {
    if (!customElements.get('wy-icon')) {
      customElements.define('wy-icon', class extends HTMLElement {
        static get observedAttributes() { return ['name', 'size', 'sw']; }
        constructor() { super(); this.attachShadow({ mode: 'open' }); }
        connectedCallback() { this._render(); }
        attributeChangedCallback() { if (this.shadowRoot) this._render(); }
        _render() {
          var size = this.getAttribute('size') || '20';
          this.style.display = 'inline-flex';
          this.style.alignItems = 'center';
          this.style.justifyContent = 'center';
          this.style.lineHeight = '0';
          this.style.width = size + 'px';
          this.style.height = size + 'px';
          this.shadowRoot.innerHTML = svgFor(this.getAttribute('name') || '', size, this.getAttribute('sw') || '1.8');
        }
      });
    }
  } catch (e) {
    console.error('wy-icon define failed', e);
  }

  if (typeof window !== 'undefined') window.WY_ICONS = I;
})();
