/* ============================================
   RETAIN — AGENCIES PAGE
   Plain JS (zero Tailwind)
   ============================================ */

// === CHAT WIDGET ===
(function() {
    let session_id = sessionStorage.getItem('chatwidget_session_id');
    if (!session_id) { session_id = crypto.randomUUID(); sessionStorage.setItem('chatwidget_session_id', session_id); }

    const container = document.createElement('div');
    container.id = 'chatbot-container';
    container.innerHTML = `
        <div id="chatbot-window">
            <div class="chat-header">
                <div class="chat-header-line"></div>
                <div class="chat-header-info">
                    <div class="chat-avatar-wrap">
                        <img src="https://ui-avatars.com/api/?name=AI&background=8b5cf6&color=fff" class="chat-avatar" alt="AI">
                        <span class="chat-status-dot"></span>
                    </div>
                    <div>
                        <h4 class="chat-name">Aria</h4>
                        <span class="chat-role">AI Strategist</span>
                    </div>
                </div>
                <button id="chatbot-close" class="chat-close-btn"><i class="fas fa-times chat-icon-sm"></i></button>
            </div>
            <div id="chatbot-messages">
                <div class="chat-today">Today • Online</div>
            </div>
            <div class="chat-form-bar">
                <form id="chatbot-form">
                    <input type="text" id="chatbot-input" placeholder="Type a message..."
                        autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
                    <button type="submit"><i class="fas fa-paper-plane chat-icon-sm"></i></button>
                </form>
            </div>
        </div>
        <button id="chatbot-toggle" class="ripple-active">
            <i id="icon-msg" class="fas fa-comment-dots icon-transition chat-icon-lg chat-icon-white"></i>
            <i id="icon-close" class="fas fa-chevron-down icon-transition chat-icon-close-violet"></i>
        </button>
    `;
    document.body.appendChild(container);

    const btn = document.getElementById('chatbot-toggle');
    const win = document.getElementById('chatbot-window');
    const iconMsg = document.getElementById('icon-msg');
    const iconClose = document.getElementById('icon-close');
    const closeBtn = document.getElementById('chatbot-close');

    function toggleChat() {
        const isActive = win.classList.contains('is-active');
        if (isActive) {
            win.classList.remove('is-active');
            btn.classList.remove('chatbot-toggle-active');
            btn.classList.add('ripple-active');
        } else {
            win.classList.add('is-active');
            btn.classList.add('chatbot-toggle-active');
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
        userMsg.className = 'chat-user-msg chat-message';
        userMsg.innerText = text;
        messages.appendChild(userMsg);
        requestAnimationFrame(() => userMsg.classList.add('show'));
        messages.scrollTo({ top: messages.scrollHeight, behavior: 'smooth' });
        input.value = '';

        const typingBubble = document.createElement('div');
        typingBubble.className = 'chat-bot-msg chat-message';
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

// === MOBILE MENU ===
(function() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
        mobileMenu.classList.toggle('hidden');
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('open');
        });
    });
})();

// === NAVBAR SCROLL SHADOW ===
window.addEventListener('scroll', () => {
    document.querySelector('.navbar').classList.toggle('scrolled', window.scrollY > 20);
});

// === SCROLL REVEAL ===
(function() {
    const revealObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObs.unobserve(entry.target); }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => revealObs.observe(el));

    // With/Without list items & header icons
    const wrListObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { entry.target.classList.add('visible'); wrListObs.unobserve(entry.target); }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.wr-list-item, .wr-header-icon').forEach(el => wrListObs.observe(el));
})();

// === TAB SWITCHING ===
(function() {
    var tabs = ['tab-marketing', 'tab-dev', 'tab-creative', 'tab-pr'];
    var currentTab = 0;

    function showTab(index) {
        if (index < 0) index = 0;
        if (index >= tabs.length) index = tabs.length - 1;
        currentTab = index;
        document.querySelectorAll('.tab-btn').forEach(function(b, i) {
            b.classList.toggle('active', i === index);
        });
        document.querySelectorAll('.tab-content').forEach(function(c) {
            c.classList.remove('active');
        });
        var target = document.getElementById(tabs[index]);
        if (target) { target.classList.add('active'); }
    }

    document.querySelectorAll('.tab-btn').forEach(function(btn, i) {
        btn.addEventListener('click', function() { showTab(i); });
    });

    // Touch swipe
    var startX = 0, startY = 0, swiping = false;
    var tabSection = document.querySelectorAll('.tab-content')[0];
    if (tabSection) {
        tabSection = tabSection.parentElement;

        tabSection.addEventListener('touchstart', function(e) {
            var t = e.touches[0]; startX = t.clientX; startY = t.clientY; swiping = true;
        }, { passive: true });

        tabSection.addEventListener('touchmove', function(e) {
            if (!swiping) return;
            var t = e.touches[0];
            var dx = t.clientX - startX;
            var dy = t.clientY - startY;
            if (Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy)) e.preventDefault();
        }, { passive: false });

        tabSection.addEventListener('touchend', function(e) {
            if (!swiping) return;
            swiping = false;
            var t = e.changedTouches[0];
            var distX = t.clientX - startX;
            var distY = t.clientY - startY;
            if (Math.abs(distX) > 30 && Math.abs(distX) > Math.abs(distY) * 1.2) {
                if (distX < 0) showTab(currentTab + 1);
                else showTab(currentTab - 1);
            }
        }, { passive: true });

        var origShowTab = showTab;
        showTab = function(index) {
            origShowTab(index);
            var activeBtn = document.querySelector('.tab-btn.active');
            if (activeBtn) activeBtn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        };
    }
})();

// === COUNTER ANIMATION ===
(function() {
    const counters = document.querySelectorAll('.stat-counter');
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
    const statsSection = document.querySelector('.stats-dark');
    if (statsSection) counterObs.observe(statsSection);
})();

// === SVG PROGRESS RING ===
(function() {
    const rings = document.querySelectorAll('.progress-ring-circle[data-target]');
    let animated = false;
    const ringObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                rings.forEach(ring => {
                    const circumference = 339.292;
                    const target = parseFloat(ring.getAttribute('data-target'));
                    const offset = circumference * (1 - target);
                    ring.style.strokeDashoffset = offset;
                });
            }
        });
    }, { threshold: 0.3 });
    const statsSection = document.querySelector('.stats-dark');
    if (statsSection) ringObs.observe(statsSection);
})();

// === PROCESS TIMELINE SCROLL ===
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

// === SHOWCASE CARD REVEAL ===
(function() {
    const showcaseObs = new IntersectionObserver((entries) => {
        entries.forEach((e, i) => {
            if (e.isIntersecting) {
                setTimeout(() => e.target.classList.add('visible'), i * 150);
                showcaseObs.unobserve(e.target);
            }
        });
    }, { threshold: 0.15 });
    document.querySelectorAll('.showcase-card').forEach(el => showcaseObs.observe(el));
})();
