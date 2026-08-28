/* ==========================================================================
   BIKRAM BIR KESHARI - ARCHITECTURAL MONOLITH JS ENGINE
   UNIVERSAL 3D TILT & RICH HOVER MICRO-INTERACTIONS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Horizontal Vault Shutter Intro Logic
    const vaultShutter = document.getElementById('vault-shutter');
    let isVaultOpen = false;

    function openVault() {
        if (isVaultOpen || !vaultShutter) return;
        isVaultOpen = true;
        vaultShutter.classList.add('shutter-open');
        document.body.classList.remove('vault-locked');
    }

    if (vaultShutter) {
        vaultShutter.addEventListener('click', openVault);
        window.addEventListener('wheel', openVault, { passive: true });
        window.addEventListener('touchmove', openVault, { passive: true });
        window.addEventListener('keydown', openVault);

        // Auto open fallback after 2.2 seconds
        setTimeout(() => {
            openVault();
        }, 2200);
    }

    // 2. Custom Cursor Dynamics & Magnetic Hover
    const cursorDot = document.querySelector('.custom-cursor-dot');
    const cursorRing = document.querySelector('.custom-cursor-ring');

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (cursorDot) {
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        }
    });

    function renderCursor() {
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;

        if (cursorRing) {
            cursorRing.style.left = `${ringX}px`;
            cursorRing.style.top = `${ringY}px`;
        }

        requestAnimationFrame(renderCursor);
    }
    renderCursor();

    const interactiveElements = document.querySelectorAll('a, button, .matrix-item, .section-portrait-card, .code-ticker-row, .ladder-step, .ecom-strip-card, .editorial-card, .touch-stack-row, .gamedev-pillar-card, .skill-cat-btn, .chrono-item, .vault-inspiration-item, .journey-pill, .make-worlds-banner-monolith');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    // 3. UNIVERSAL 3D TILT ENGINE & SPOTLIGHT GLARE SYSTEM
    const tiltElements = document.querySelectorAll(
        '.matrix-item, .section-portrait-card, .code-ticker-row, .ladder-step, .ladder-content, .ecom-strip-card, .editorial-card, .touch-stack-row, .gamedev-pillar-card, .chrono-item, .vault-inspiration-item, .dark-inspiration-item, .terminal-inspector-box, .make-worlds-banner-monolith, .hero-coords-box, .skill-cat-btn, .chrono-banner, .journey-pill, .email-copy-trigger, .final-statement-banner, .vault-shutter-content'
    );

    tiltElements.forEach(elem => {
        elem.classList.add('tilt-3d-card');

        // Inject spotlight glare overlay if missing
        if (!elem.querySelector('.tilt-glare')) {
            const glare = document.createElement('div');
            glare.className = 'tilt-glare';
            elem.appendChild(glare);
        }

        elem.addEventListener('mouseenter', () => {
            elem.style.transition = 'none';
        });

        elem.addEventListener('mousemove', (e) => {
            const rect = elem.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Set mouse position percentage for surface glare light
            const mousePercentX = (x / rect.width) * 100;
            const mousePercentY = (y / rect.height) * 100;
            elem.style.setProperty('--mouse-x', `${mousePercentX}%`);
            elem.style.setProperty('--mouse-y', `${mousePercentY}%`);

            // Calculate responsive 3D tilt angles (-8deg to +8deg)
            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;

            elem.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        });

        elem.addEventListener('mouseleave', () => {
            elem.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease, border-color 0.3s ease';
            elem.style.transform = '';
        });
    });

    // 3B. MAGNETIC HOVER PHYSICS FOR BUTTONS & BADGES
    const magneticElements = document.querySelectorAll(
        '.nav-contact-btn, .slide-nav-btn, .journey-pill, .email-copy-trigger, .pipeline-step, .vault-action-prompt, .nav-brand'
    );

    magneticElements.forEach(elem => {
        elem.addEventListener('mousemove', (e) => {
            const rect = elem.getBoundingClientRect();
            const elemCenterX = rect.left + rect.width / 2;
            const elemCenterY = rect.top + rect.height / 2;

            // Calculate magnetic pull offset (-8px to +8px)
            const moveX = (e.clientX - elemCenterX) * 0.25;
            const moveY = (e.clientY - elemCenterY) * 0.25;

            elem.style.transform = `translate3d(${moveX}px, ${moveY}px, 0px) scale(1.06)`;
        });

        elem.addEventListener('mouseleave', () => {
            elem.style.transform = `translate3d(0px, 0px, 0px) scale(1)`;
        });
    });

    // 4. FULL-AREA BACKGROUND PORTRAIT SLIDESHOW ENGINE
    const bgSlides = document.querySelectorAll('.hero-bg-slide');
    const slideBtns = document.querySelectorAll('.slide-nav-btn');
    const slideCurrentNum = document.getElementById('slide-current-num');
    let currentSlideIndex = 0;
    let autoSlideInterval = null;

    function goToSlide(index) {
        if (!bgSlides.length) return;
        currentSlideIndex = (index + bgSlides.length) % bgSlides.length;

        bgSlides.forEach((slide, idx) => {
            slide.classList.toggle('active', idx === currentSlideIndex);
        });

        slideBtns.forEach((btn, idx) => {
            btn.classList.toggle('active', idx === currentSlideIndex);
        });

        if (slideCurrentNum) {
            slideCurrentNum.textContent = `0${currentSlideIndex + 1}`;
        }
    }

    function startAutoSlideshow() {
        stopAutoSlideshow();
        autoSlideInterval = setInterval(() => {
            goToSlide(currentSlideIndex + 1);
        }, 4500);
    }

    function stopAutoSlideshow() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
    }

    slideBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.getAttribute('data-index'), 10);
            if (!isNaN(index)) {
                goToSlide(index);
                startAutoSlideshow(); // Reset auto cycle timer on manual click
            }
        });
    });

    // Start auto changing background images on page load
    if (bgSlides.length > 0) {
        startAutoSlideshow();
    }

    // 5. Interactive Live Terminal Skill Inspector
    const skillCatBtns = document.querySelectorAll('.skill-cat-btn');
    const terminalBody = document.getElementById('terminal-body');

    const skillData = {
        programming: `
<div class="terminal-line"><span class="t-comment">// Branch 01: Core Languages & Logic</span></div>
<div class="terminal-line"><span class="t-keyword">const</span> <span class="t-var">languages</span> = [</div>
<div class="terminal-line">&nbsp;&nbsp;<span class="t-string">"Python"</span>, <span class="t-comment">// General-purpose & Scripting</span></div>
<div class="terminal-line">&nbsp;&nbsp;<span class="t-string">"C++"</span>,    <span class="t-comment">// High-performance & Algorithmic</span></div>
<div class="terminal-line">&nbsp;&nbsp;<span class="t-string">"HTML"</span>,   <span class="t-comment">// Structural Web Markup</span></div>
<div class="terminal-line">&nbsp;&nbsp;<span class="t-string">"CSS"</span>     <span class="t-comment">// Architectural Styling</span></div>
<div class="terminal-line">];</div>
<div class="terminal-line"><span class="t-keyword">status</span>: <span class="t-accent">"ACTIVE LEARNING & EXPERIMENTATION"</span>;</div>
        `,
        build: `
<div class="terminal-line"><span class="t-comment">// Branch 02: Systems & Systems Engineering</span></div>
<div class="terminal-line"><span class="t-keyword">const</span> <span class="t-var">buildFocus</span> = {</div>
<div class="terminal-line">&nbsp;&nbsp;<span class="t-var">webDev</span>: <span class="t-string">"Interactive Web Applications"</span>,</div>
<div class="terminal-line">&nbsp;&nbsp;<span class="t-var">automation</span>: <span class="t-string">"Workflow Scripting & Automation"</span>,</div>
<div class="terminal-line">&nbsp;&nbsp;<span class="t-var">ai</span>: <span class="t-string">"Artificial Intelligence Integration"</span></div>
<div class="terminal-line">};</div>
<div class="terminal-line"><span class="t-keyword">mission</span>: <span class="t-accent">"TRANSFORM IDEAS INTO DIGITAL REALITY"</span>;</div>
        `,
        explore: `
<div class="terminal-line"><span class="t-comment">// Branch 03: Future Horizons & Game Engineering</span></div>
<div class="terminal-line"><span class="t-keyword">const</span> <span class="t-var">explorationPaths</span> = [</div>
<div class="terminal-line">&nbsp;&nbsp;<span class="t-string">"Game Development"</span>, <span class="t-comment">// Creating interactive worlds</span></div>
<div class="terminal-line">&nbsp;&nbsp;<span class="t-string">"Computer Systems"</span>,  <span class="t-comment">// Hardware & OS concepts</span></div>
<div class="terminal-line">&nbsp;&nbsp;<span class="t-string">"Emerging Tech"</span>     <span class="t-comment">// Next-gen innovation</span></div>
<div class="terminal-line">];</div>
<div class="terminal-line"><span class="t-keyword">motto</span>: <span class="t-accent">"MAKE WORLDS"</span>;</div>
        `,
        security: `
<div class="terminal-line"><span class="t-comment">// Branch 04: Security & Systems Research</span></div>
<div class="terminal-line"><span class="t-keyword">const</span> <span class="t-var">securityInterest</span> = {</div>
<div class="terminal-line">&nbsp;&nbsp;<span class="t-var">field</span>: <span class="t-string">"Cybersecurity"</span>,</div>
<div class="terminal-line">&nbsp;&nbsp;<span class="t-var">orientation</span>: <span class="t-string">"Learning & Educational Research"</span></div>
<div class="terminal-line">};</div>
<div class="terminal-line"><span class="t-keyword">note</span>: <span class="t-accent">"CURIOSITY & SYSTEM UNDERSTANDING ONLY"</span>;</div>
        `
    };

    skillCatBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-cat');
            skillCatBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            if (terminalBody && skillData[category]) {
                terminalBody.style.opacity = '0';
                setTimeout(() => {
                    terminalBody.innerHTML = skillData[category];
                    terminalBody.style.opacity = '1';
                }, 150);
            }
        });
    });

    // 6. Email Action: Redirect to Gmail Compose & Copy to Clipboard
    const emailCopyTrigger = document.getElementById('email-copy-trigger');
    const toast = document.getElementById('toast');
    const emailAddress = 'birpurveer@gmail.com';
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}`;

    if (emailCopyTrigger) {
        emailCopyTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 1. Copy email address to clipboard
            if (navigator.clipboard) {
                navigator.clipboard.writeText(emailAddress).catch(() => {});
            }

            // 2. Show toast notification
            showToast(`OPENING GMAIL (${emailAddress})`);

            // 3. Open Gmail web composer window in a new tab
            setTimeout(() => {
                window.open(gmailUrl, '_blank', 'noopener,noreferrer');
            }, 300);
        });
    }

    function showToast(msg) {
        if (!toast) return;
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // 7. SMOOTH SCROLL NAVIGATION & INTERACTIVE CONTROLS
    const navLinks = document.querySelectorAll('.nav-link, .nav-contact-btn');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // 8. Mobile Navigation Drawer Toggle Engine
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNavDrawer = document.getElementById('mobile-nav-drawer');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileMenuBtn && mobileNavDrawer) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            mobileNavDrawer.classList.toggle('active');
            document.body.classList.toggle('mobile-menu-open');
        });

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                mobileMenuBtn.classList.remove('active');
                mobileNavDrawer.classList.remove('active');
                document.body.classList.remove('mobile-menu-open');

                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
    }

    // 9. AUTOMATIC SCROLL REVEAL INTERSECTION OBSERVER ENGINE
    const autoRevealGroups = [
        { selector: '.section-title-large, .section-sub-tag, .hero-title-giant, .hero-subhead', class: 'reveal-up' },
        { selector: '.matrix-item, .code-ticker-row, .ladder-step, .vault-inspiration-item, .editorial-card', class: 'reveal-up' },
        { selector: '.make-worlds-banner-monolith, .final-statement-banner, .email-copy-trigger', class: 'reveal-scale' }
    ];

    autoRevealGroups.forEach(group => {
        document.querySelectorAll(group.selector).forEach(el => {
            if (!el.classList.contains('reveal-up') && !el.classList.contains('reveal-scale') && !el.classList.contains('reveal-left') && !el.classList.contains('reveal-right')) {
                el.classList.add(group.class);
            }
            if (el.parentElement && (el.parentElement.classList.contains('inspirations-list') || el.parentElement.classList.contains('code-ticker-list') || el.parentElement.classList.contains('tactical-ladder-flow') || el.parentElement.classList.contains('identity-matrix-list'))) {
                const childIndex = Array.from(el.parentElement.children).indexOf(el);
                if (childIndex > 0) {
                    el.classList.add(`delay-${Math.min(childIndex, 5)}`);
                }
            }
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-text, .reveal-up, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
        scrollObserver.observe(el);
    });

    // 10. REAL-TIME SCROLL PROGRESS TRACKER & DOT MATRIX INTERACTION
    const progressFill = document.getElementById('scroll-progress-fill');
    const scrollDots = document.querySelectorAll('.scroll-dot-indicator');
    const sections = document.querySelectorAll('#hero, #programming, #cold-calling, #ecommerce, #website-selling, #app-dev, #game-dev');

    function updateScrollTracker() {
        const scrollTop = window.scrollY || window.pageYOffset;
        const docHeight = Math.max(
            document.body.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.clientHeight,
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight
        ) - window.innerHeight;

        if (progressFill && docHeight > 0) {
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressFill.style.height = `${Math.min(100, Math.max(0, scrollPercent))}%`;
        }

        let currentSectionId = '#hero';
        sections.forEach(sec => {
            const top = sec.offsetTop - 220;
            const height = sec.offsetHeight;
            if (scrollTop >= top && scrollTop < top + height) {
                currentSectionId = `#${sec.getAttribute('id')}`;
            }
        });

        scrollDots.forEach(dot => {
            if (dot.getAttribute('data-target') === currentSectionId) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', updateScrollTracker, { passive: true });
    updateScrollTracker();

    scrollDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const targetId = dot.getAttribute('data-target');
            if (targetId) {
                const targetSec = document.querySelector(targetId);
                if (targetSec) {
                    targetSec.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});
