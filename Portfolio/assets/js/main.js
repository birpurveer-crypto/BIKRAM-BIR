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

    const interactiveElements = document.querySelectorAll('a, button, .matrix-item, .skill-cat-btn, .chrono-item, .vault-inspiration-item, .journey-pill, .make-worlds-banner-monolith');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    // 3. UNIVERSAL 3D TILT ENGINE & SPOTLIGHT GLARE SYSTEM
    const tiltElements = document.querySelectorAll(
        '.matrix-item, .chrono-item, .vault-inspiration-item, .terminal-inspector-box, .make-worlds-banner-monolith, .hero-coords-box, .skill-cat-btn, .chrono-banner, .journey-pill, .email-copy-trigger, .final-statement-banner, .vault-shutter-content'
    );

    tiltElements.forEach(elem => {
        elem.classList.add('tilt-3d-card');

        // Inject spotlight glare overlay if missing
        if (!elem.querySelector('.tilt-glare')) {
            const glare = document.createElement('div');
            glare.className = 'tilt-glare';
            elem.appendChild(glare);
        }

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

            // Calculate subtle tilt angles (-10deg to +10deg)
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            elem.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        elem.addEventListener('mouseleave', () => {
            elem.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
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

    // 7. Smooth Scroll Navigation
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
});
