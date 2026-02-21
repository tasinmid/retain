// ===== MOBILE MENU =====
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

// ===== SCROLL REVEAL =====
(function() {
    const revealElements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(function(el) {
        observer.observe(el);
    });
})();

// ===== STAT COUNTER ANIMATION =====
(function() {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    if (!statNumbers.length) return;

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(function(el) {
        observer.observe(el);
    });

    function animateCounter(el) {
        const target = parseFloat(el.getAttribute('data-target'));
        const isDecimal = target % 1 !== 0;
        const duration = 1500;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic

            const current = eased * target;
            el.textContent = isDecimal ? current.toFixed(1) : Math.round(current);

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }
})();

// ---- Chat Widget ----
(function() {
    let session_id = sessionStorage.getItem('chatwidget_session_id');
    if (!session_id) {
        session_id = crypto.randomUUID();
        sessionStorage.setItem('chatwidget_session_id', session_id);
    }

    const container = document.createElement('div');
    container.id = 'chatbot-container';
    container.innerHTML = `
        <div id="chatbot-window">
            <div class="chat-header">
                <div class="chat-header-stripe"></div>
                <div class="chat-header-left">
                    <div class="chat-avatar-wrap">
                        <img src="https://ui-avatars.com/api/?name=AI&background=10b981&color=fff" class="chat-avatar" alt="AI Avatar">
                        <span class="chat-avatar-dot"></span>
                    </div>
                    <div>
                        <h4 class="chat-name">Aria</h4>
                        <span class="chat-status">AI Strategist</span>
                    </div>
                </div>
                <button id="chatbot-close" class="chat-close-btn"><i class="fas fa-times"></i></button>
            </div>
            <div id="chatbot-messages" class="chat-messages">
                <div class="chat-messages-date">Today &bull; Online</div>
            </div>
            <div class="chat-input-wrap">
                <form id="chatbot-form" class="chat-input-form">
                    <input type="text" id="chatbot-input" placeholder="Type a message..." autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
                    <button type="submit"><i class="fas fa-paper-plane"></i></button>
                </form>
            </div>
        </div>
        <button id="chatbot-toggle" class="chat-toggle-btn ripple-active">
            <i id="icon-msg" class="fas fa-comment-dots"></i>
            <i id="icon-close" class="fas fa-chevron-down icon-hidden"></i>
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
            iconMsg.classList.remove('icon-hidden');
            iconClose.classList.add('icon-hidden');
            btn.classList.remove('chatbot-toggle-active');
            btn.classList.add('ripple-active');
        } else {
            win.classList.add('is-active');
            iconMsg.classList.add('icon-hidden');
            iconClose.classList.remove('icon-hidden');
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
        userMsg.className = 'chat-msg-user';
        userMsg.innerText = text;
        messages.appendChild(userMsg);
        requestAnimationFrame(() => userMsg.classList.add('show'));
        messages.scrollTo({ top: messages.scrollHeight, behavior: 'smooth' });
        input.value = '';

        const typingBubble = document.createElement('div');
        typingBubble.className = 'chat-msg-ai';
        typingBubble.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
        messages.appendChild(typingBubble);
        requestAnimationFrame(() => typingBubble.classList.add('show'));
        messages.scrollTo({ top: messages.scrollHeight, behavior: 'smooth' });

        input.disabled = true;
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
            input.disabled = false;
        })
        .catch(function () {
            typingBubble.innerHTML = 'Sorry, something went wrong. Please try again.';
            messages.scrollTo({ top: messages.scrollHeight, behavior: 'smooth' });
            input.disabled = false;
        });
    });
})();
