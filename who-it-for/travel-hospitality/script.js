// ===== Mobile Menu =====
const menuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
menuBtn.addEventListener('click', () => { mobileMenu.classList.toggle('open'); });
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => { mobileMenu.classList.remove('open'); });
});

// ===== Navbar shadow on scroll =====
window.addEventListener('scroll', () => {
    document.querySelector('.navbar').classList.toggle('shadow-scroll', window.scrollY > 20);
});

// ===== Scroll Reveal =====
(function() {
    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObs.unobserve(entry.target); }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => revealObs.observe(el));

    // Glass pain reveal
    const glassObs = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('th-glass-visible'); glassObs.unobserve(e.target); } });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.th-glass-reveal').forEach(el => glassObs.observe(el));

    // Quote reveal
    document.querySelectorAll('.th-glass-quote').forEach((card) => {
        new IntersectionObserver((entries, obs) => {
            if (entries[0].isIntersecting) { card.classList.add('visible'); obs.disconnect(); }
        }, { threshold: 0.1 }).observe(card);
    });
})();

// ===== Counter Animation =====
(function() {
    const counters = document.querySelectorAll('.th-counter');
    let counted = false;
    const counterObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counted) {
                counted = true;
                counters.forEach(el => {
                    const end = parseFloat(el.getAttribute('data-target'));
                    const suffix = el.getAttribute('data-suffix') || '';
                    const isFloat = el.getAttribute('data-target').includes('.');
                    const duration = 1800;
                    const start = performance.now();
                    function tick(now) {
                        const elapsed = now - start;
                        const progress = Math.min(elapsed / duration, 1);
                        const c1 = 1.70158;
                        const c3 = c1 + 1;
                        const ease = 1 + c3 * Math.pow(progress - 1, 3) + c1 * Math.pow(progress - 1, 2);
                        const current = ease * end;
                        el.textContent = (isFloat ? current.toFixed(1) : Math.round(current)) + suffix;
                        if (progress < 1) requestAnimationFrame(tick);
                    }
                    requestAnimationFrame(tick);
                });
            }
        });
    }, { threshold: 0.3 });
    const statsBanner = document.querySelector('.th-stats-banner');
    if (statsBanner) counterObs.observe(statsBanner);
})();

// ===== Process Timeline =====
(function() {
    const timeline = document.querySelector('.process-timeline');
    const progressLine = document.querySelector('.process-timeline-progress');
    const steps = document.querySelectorAll('.process-step');
    const slideLeft = document.querySelector('.process-slide-left');
    const slideRight = document.querySelector('.process-slide-right');
    const headlineSection = slideLeft ? slideLeft.closest('.text-center') : null;
    if (!timeline || !progressLine) return;

    let ticking = false;
    function onScroll() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            ticking = false;
            const wh = window.innerHeight;
            const tRect = timeline.getBoundingClientRect();
            const tTop = tRect.top;
            const tHeight = tRect.height;
            const scrollInto = wh * 0.65 - tTop;
            const progress = Math.max(0, Math.min(1, scrollInto / tHeight));
            const lineHeight = progress * tHeight;
            progressLine.style.height = lineHeight + 'px';

            steps.forEach(step => {
                const numberEl = step.querySelector('.process-step-number');
                if (!numberEl) return;
                const numberRect = numberEl.getBoundingClientRect();
                const numberMid = numberRect.top + numberRect.height / 2;
                const numberRelative = numberMid - tRect.top;
                if (lineHeight >= numberRelative - 10) {
                    step.classList.add('step-visible');
                } else {
                    step.classList.remove('step-visible');
                }
            });

            if (headlineSection) {
                const hRect = headlineSection.getBoundingClientRect();
                const rawProgress = (wh - hRect.top) / (wh * 0.5);
                const hp = Math.max(0, rawProgress);
                const alpha = Math.min(1, hp * 1.2);
                const leftX = -80 + hp * 80;
                const rightX = 80 - hp * 80;
                if (slideLeft) { slideLeft.style.opacity = alpha; slideLeft.style.transform = 'translateX(' + leftX.toFixed(1) + 'px)'; }
                if (slideRight) { slideRight.style.opacity = alpha; slideRight.style.transform = 'translateX(' + rightX.toFixed(1) + 'px)'; }
            }
        });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
})();

// ===== Showcase Card Reveal =====
const showcaseObs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
        if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add('visible'), i * 150);
            showcaseObs.unobserve(e.target);
        }
    });
}, { threshold: 0.15 });
document.querySelectorAll('.showcase-card').forEach(el => showcaseObs.observe(el));

// ===== Chat Widget =====
(function() {
    let session_id = sessionStorage.getItem('chatwidget_session_id');
    if (!session_id) { session_id = crypto.randomUUID(); sessionStorage.setItem('chatwidget_session_id', session_id); }

    const container = document.getElementById('chatbot-container');
    const btn = document.getElementById('chatbot-toggle');
    const win = document.getElementById('chatbot-window');
    const iconMsg = document.getElementById('icon-msg');
    const iconClose = document.getElementById('icon-close');
    const closeBtn = document.getElementById('chatbot-close');

    function toggleChat() {
        const isActive = win.classList.contains('is-active');
        if (isActive) {
            win.classList.remove('is-active');
            iconMsg.classList.remove('icon-hidden');
            iconMsg.classList.add('icon-visible');
            iconClose.classList.remove('icon-visible');
            iconClose.classList.add('icon-hidden');
            btn.classList.add('ripple-active');
        } else {
            win.classList.add('is-active');
            iconMsg.classList.remove('icon-visible');
            iconMsg.classList.add('icon-hidden');
            iconClose.classList.remove('icon-hidden');
            iconClose.classList.add('icon-visible');
            btn.classList.remove('ripple-active');
        }
    }

    btn.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', toggleChat);

    const form = document.getElementById('chatbot-form');
    const input = document.getElementById('chatbot-input');
    const messages = document.getElementById('chatbot-messages');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        const text = input.value.trim();
        if (!text) return;

        const userMsg = document.createElement('div');
        userMsg.className = 'chat-message user';
        userMsg.style.maxWidth = '80%';
        userMsg.innerText = text;
        messages.appendChild(userMsg);
        requestAnimationFrame(() => userMsg.classList.add('show'));
        messages.scrollTo({ top: messages.scrollHeight, behavior: 'smooth' });
        input.value = '';

        const typingBubble = document.createElement('div');
        typingBubble.className = 'chat-message bot';
        typingBubble.style.maxWidth = '80%';
        typingBubble.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
        messages.appendChild(typingBubble);
        requestAnimationFrame(() => typingBubble.classList.add('show'));
        messages.scrollTo({ top: messages.scrollHeight, behavior: 'smooth' });

        fetch('https://tahmidn8n.solven.app/webhook-test/retain-chatwidget', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_msg: text, session_id })
        })
        .then(res => res.json())
        .then(data => {
            const aiText = data.reply || '';
            typingBubble.innerHTML = aiText;
            messages.scrollTo({ top: messages.scrollHeight, behavior: 'smooth' });
        });
    });
})();
