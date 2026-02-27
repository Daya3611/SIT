/**
 * AgriPayChain — main.js
 * Perf detection · Lenis smooth scroll · GSAP ScrollTrigger · Shared Navbar
 */

/* ─── CDN Libs loaded via <script> in each HTML file:
   - gsap + ScrollTrigger: https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js
   - lenis: https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1/bundled/lenis.min.js
─── */

// ── 1. Performance Detection ──────────────────────────────
const isLowEnd =
    navigator.hardwareConcurrency <= 4 ||
    (navigator.deviceMemory !== undefined && navigator.deviceMemory <= 2) ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.documentElement.classList.add(isLowEnd ? 'low-perf' : 'high-perf');

// ── 2. Smooth Scroll (Lenis) ──────────────────────────────
let lenis;
if (!isLowEnd && typeof Lenis !== 'undefined') {
    lenis = new Lenis({ lerp: 0.08, smooth: true });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);

    // Sync Lenis with GSAP ScrollTrigger
    if (typeof ScrollTrigger !== 'undefined') {
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add(time => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);
    }
}

// ── 3. GSAP ScrollTrigger Reveal ─────────────────────────
function initReveal() {
    if (typeof gsap === 'undefined' || isLowEnd) return;
    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll('[data-reveal]').forEach(el => {
        gsap.to(el, {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 88%',
                toggleActions: 'play none none none',
            },
        });
    });

    // Stagger grid children
    document.querySelectorAll('[data-stagger]').forEach(parent => {
        gsap.to(parent.children, {
            opacity: 1, y: 0,
            duration: 0.7, ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: { trigger: parent, start: 'top 85%' },
        });
    });
}

// ── 4. Animated Stats Counter ─────────────────────────────
function initCounters() {
    document.querySelectorAll('[data-count]').forEach(el => {
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const obj = { val: 0 };

        const run = () => gsap.to(obj, {
            val: target, duration: 2, ease: 'power2.out',
            onUpdate: () => { el.textContent = Math.floor(obj.val).toLocaleString('en-IN') + suffix; }
        });

        if (isLowEnd) { el.textContent = target.toLocaleString('en-IN') + suffix; return; }
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: run });
        } else { run(); }
    });
}

// ── 5. Navbar Scroll State ────────────────────────────────
function initNavbar() {
    const nav = document.querySelector('.navbar');
    if (!nav) return;

    const toggle = () => nav.classList.toggle('scrolled', window.scrollY > 60);
    window.addEventListener('scroll', toggle, { passive: true });
    toggle();

    // Mobile hamburger
    const ham = nav.querySelector('.navbar__hamburger');
    const links = nav.querySelector('.navbar__links');
    if (ham && links) {
        ham.addEventListener('click', () => links.classList.toggle('mobile-open'));
    }

    // Active link highlight
    const current = location.pathname.split('/').pop() || 'index.html';
    nav.querySelectorAll('.navbar__links a').forEach(a => {
        if (a.getAttribute('href') === current) a.classList.add('active');
    });
}

// ── 6. Modal Utility ──────────────────────────────────────
window.openModal = id => {
    const overlay = document.getElementById(id);
    if (overlay) overlay.classList.add('active');
};
window.closeModal = id => {
    const overlay = document.getElementById(id);
    if (overlay) overlay.classList.remove('active');
};
document.addEventListener('click', e => {
    if (e.target.classList.contains('modal-overlay')) e.target.classList.remove('active');
});

// ── 7. Tabs Utility ───────────────────────────────────────
window.initTabs = (tabsSelector, panelSelector) => {
    const tabs = document.querySelectorAll(tabsSelector);
    const panels = document.querySelectorAll(panelSelector);
    tabs.forEach((tab, i) => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.hidden = true);
            tab.classList.add('active');
            if (panels[i]) panels[i].hidden = false;
        });
    });
};

// ── 8. Ring Meter Renderer ────────────────────────────────
window.renderRing = (id, value, max = 100) => {
    const el = document.getElementById(id);
    if (!el) return;
    const r = 52, cx = 60, cy = 60;
    const circ = 2 * Math.PI * r;
    const pct = Math.min(value / max, 1);
    const offset = circ * (1 - pct);
    const color = value > 70 ? '#ef4444' : value > 40 ? '#f59e0b' : '#22c55e';
    el.innerHTML = `
    <svg viewBox="0 0 120 120" width="120" height="120">
      <circle class="ring-meter__track" cx="${cx}" cy="${cy}" r="${r}" />
      <circle class="ring-meter__fill" cx="${cx}" cy="${cy}" r="${r}"
        stroke="${color}" stroke-dasharray="${circ}" stroke-dashoffset="${circ}"
        style="stroke-dashoffset:${offset};transition:stroke-dashoffset 1.2s ease" />
    </svg>
    <div class="ring-meter__label">
      <span class="ring-meter__value" style="color:${color}">${value}</span>
      <span class="ring-meter__sub">/ ${max}</span>
    </div>`;
};

// ── Boot ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initReveal();
    initCounters();
    document.body.classList.add('page-enter');
});
