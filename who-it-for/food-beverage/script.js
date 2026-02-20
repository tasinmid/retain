// ========== MOBILE MENU ==========
(function() {
    const menuBtn = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (!menuBtn || !mobileMenu) return;

    menuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('open');
        });
    });
})();

// ========== NAVBAR SHADOW ON SCROLL ==========
(function() {
    var nav = document.querySelector('.main-nav');
    if (!nav) return;
    window.addEventListener('scroll', function() {
        if (window.scrollY > 20) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
})();

// ========== SCROLL REVEAL ==========
(function() {
    var revealObs = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(function(el) {
        revealObs.observe(el);
    });
})();

// ========== COUNTER ANIMATION ==========
(function() {
    var counters = document.querySelectorAll('.fb-counter');
    var counted = false;
    var counterObs = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting && !counted) {
                counted = true;
                counters.forEach(function(el) {
                    var end = parseFloat(el.getAttribute('data-target'));
                    var suffix = el.getAttribute('data-suffix') || '';
                    var isFloat = el.getAttribute('data-target').indexOf('.') !== -1;
                    var duration = 1800;
                    var start = performance.now();
                    function tick(now) {
                        var elapsed = now - start;
                        var progress = Math.min(elapsed / duration, 1);
                        var c1 = 1.70158;
                        var c3 = c1 + 1;
                        var ease = 1 + c3 * Math.pow(progress - 1, 3) + c1 * Math.pow(progress - 1, 2);
                        var current = ease * end;
                        el.textContent = (isFloat ? current.toFixed(1) : Math.round(current)) + suffix;
                        if (progress < 1) requestAnimationFrame(tick);
                    }
                    requestAnimationFrame(tick);
                });
            }
        });
    }, { threshold: 0.3 });
    var statsBanner = document.querySelector('.fb-stats-banner');
    if (statsBanner) counterObs.observe(statsBanner);
})();

// ========== PROCESS TIMELINE ==========
(function() {
    var timeline = document.querySelector('.process-timeline');
    var progressLine = document.querySelector('.process-timeline-progress');
    var steps = document.querySelectorAll('.process-step');
    var slideLeft = document.querySelector('.process-slide-left');
    var slideRight = document.querySelector('.process-slide-right');
    var headlineSection = slideLeft ? slideLeft.closest('.text-center') : null;
    if (!timeline || !progressLine) return;

    var ticking = false;
    function onScroll() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function() {
            ticking = false;
            var wh = window.innerHeight;
            var tRect = timeline.getBoundingClientRect();
            var tTop = tRect.top;
            var tHeight = tRect.height;
            var scrollInto = wh * 0.65 - tTop;
            var progress = Math.max(0, Math.min(1, scrollInto / tHeight));
            var lineHeight = progress * tHeight;
            progressLine.style.height = lineHeight + 'px';

            steps.forEach(function(step) {
                var numberEl = step.querySelector('.process-step-number');
                if (!numberEl) return;
                var numberRect = numberEl.getBoundingClientRect();
                var numberMid = numberRect.top + numberRect.height / 2;
                var numberRelative = numberMid - tRect.top;
                if (lineHeight >= numberRelative - 10) {
                    step.classList.add('step-visible');
                } else {
                    step.classList.remove('step-visible');
                }
            });

            if (headlineSection) {
                var hRect = headlineSection.getBoundingClientRect();
                var rawProgress = (wh - hRect.top) / (wh * 0.5);
                var hp = Math.max(0, rawProgress);
                var alpha = Math.min(1, hp * 1.2);
                var leftX = -80 + hp * 80;
                var rightX = 80 - hp * 80;
                if (slideLeft) { slideLeft.style.opacity = alpha; slideLeft.style.transform = 'translateX(' + leftX.toFixed(1) + 'px)'; }
                if (slideRight) { slideRight.style.opacity = alpha; slideRight.style.transform = 'translateX(' + rightX.toFixed(1) + 'px)'; }
            }
        });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
})();

// ========== SHOWCASE CARD REVEAL ==========
(function() {
    var showcaseObs = new IntersectionObserver(function(entries) {
        entries.forEach(function(e, i) {
            if (e.isIntersecting) {
                setTimeout(function() { e.target.classList.add('visible'); }, i * 150);
                showcaseObs.unobserve(e.target);
            }
        });
    }, { threshold: 0.15 });
    document.querySelectorAll('.showcase-card').forEach(function(el) {
        showcaseObs.observe(el);
    });
})();

// ========== CHAT WIDGET ==========
(function() {
    var session_id = sessionStorage.getItem('chatwidget_session_id');
    if (!session_id) {
        session_id = crypto.randomUUID();
        sessionStorage.setItem('chatwidget_session_id', session_id);
    }

    var container = document.createElement('div');
    container.className = 'chat-container';
    container.innerHTML =
        '<div id="chatbot-window" class="chat-window">' +
            '<div class="chat-header">' +
                '<div class="chat-header-line"></div>' +
                '<div class="chat-header-info">' +
                    '<div class="chat-avatar-wrap">' +
                        '<img src="https://ui-avatars.com/api/?name=AI&background=f43f5e&color=fff" class="chat-avatar" alt="AI">' +
                        '<span class="chat-avatar-dot"></span>' +
                    '</div>' +
                    '<div>' +
                        '<h4 class="chat-header-name">Aria</h4>' +
                        '<span class="chat-header-role">AI Strategist</span>' +
                    '</div>' +
                '</div>' +
                '<button id="chatbot-close" class="chat-close-btn"><i class="fas fa-times" style="font-size:1.125rem;"></i></button>' +
            '</div>' +
            '<div id="chatbot-messages" class="chat-messages">' +
                '<div class="chat-timestamp">Today • Online</div>' +
            '</div>' +
            '<div class="chat-input-area">' +
                '<form id="chatbot-form" class="chat-form">' +
                    '<input type="text" id="chatbot-input" placeholder="Type a message..." class="chat-input" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">' +
                    '<button type="submit" class="chat-send"><i class="fas fa-paper-plane" style="font-size:1.125rem;"></i></button>' +
                '</form>' +
            '</div>' +
        '</div>' +
        '<button id="chatbot-toggle" class="chat-toggle ripple-active">' +
            '<i id="icon-msg" class="fas fa-comment-dots icon-transition" style="font-size:1.5rem;color:#fff;"></i>' +
            '<i id="icon-close" class="fas fa-chevron-down icon-transition icon-hidden-reverse" style="font-size:1.5rem;color:#f43f5e;"></i>' +
        '</button>';
    document.body.appendChild(container);

    var btn = document.getElementById('chatbot-toggle');
    var win = document.getElementById('chatbot-window');
    var iconMsg = document.getElementById('icon-msg');
    var iconClose = document.getElementById('icon-close');
    var closeBtn = document.getElementById('chatbot-close');

    function toggleChat() {
        var isActive = win.classList.contains('is-active');
        if (isActive) {
            win.classList.remove('is-active');
            iconMsg.classList.remove('icon-hidden');
            iconClose.classList.add('icon-hidden-reverse');
            btn.classList.add('ripple-active');
        } else {
            win.classList.add('is-active');
            iconMsg.classList.add('icon-hidden');
            iconClose.classList.remove('icon-hidden-reverse');
            btn.classList.remove('ripple-active');
        }
    }

    btn.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', toggleChat);

    var form = document.getElementById('chatbot-form');
    var input = document.getElementById('chatbot-input');
    var messages = document.getElementById('chatbot-messages');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        var text = input.value.trim();
        if (!text) return;

        var userMsg = document.createElement('div');
        userMsg.className = 'chat-message chat-message-user';
        userMsg.style.maxWidth = '80%';
        userMsg.innerText = text;
        messages.appendChild(userMsg);
        requestAnimationFrame(function() { userMsg.classList.add('show'); });
        messages.scrollTo({ top: messages.scrollHeight, behavior: 'smooth' });
        input.value = '';

        var typingBubble = document.createElement('div');
        typingBubble.className = 'chat-message chat-message-bot';
        typingBubble.style.maxWidth = '80%';
        typingBubble.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
        messages.appendChild(typingBubble);
        requestAnimationFrame(function() { typingBubble.classList.add('show'); });
        messages.scrollTo({ top: messages.scrollHeight, behavior: 'smooth' });

        fetch('https://tahmidn8n.solven.app/webhook-test/retain-chatwidget', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_msg: text, session_id: session_id })
        })
        .then(function(res) { return res.json(); })
        .then(function(data) {
            var aiText = data.reply || '';
            typingBubble.innerHTML = aiText;
            messages.scrollTo({ top: messages.scrollHeight, behavior: 'smooth' });
        });
    });
})();
