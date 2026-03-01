// ===== MOBILE MENU =====
(function() {
    var menuBtn = document.getElementById('mobile-menu-button');
    var mobileMenu = document.getElementById('mobile-menu');
    if (!menuBtn || !mobileMenu) return;
    function toggle() { mobileMenu.classList.toggle('open'); }
    menuBtn.addEventListener('click', toggle);
    menuBtn.addEventListener('touchend', function(e) { e.preventDefault(); toggle(); });
    mobileMenu.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', function() { mobileMenu.classList.remove('open'); });
    });
})();

// ===== SCROLL REVEAL =====
(function() {
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(function(el) { observer.observe(el); });
})();

// ===== FORM SUBMISSION =====
(function() {
    var form = document.getElementById('contact-form');
    var submitBtn = document.getElementById('form-submit-btn');
    var successEl = document.getElementById('form-success');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Disable button and show loading
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';

        // Simulate submission (replace with real endpoint)
        setTimeout(function() {
            // Hide form fields
            var fields = form.querySelectorAll('.form-group, .form-row, .form-submit-btn');
            fields.forEach(function(f) { f.style.display = 'none'; });

            // Show success
            successEl.classList.add('show');
        }, 1500);
    });
})();

// ===== BOOK CALL BUTTON =====
document.addEventListener('DOMContentLoaded', function() {
    var bookBtn = document.getElementById('book-call-btn');
    if (bookBtn) {
        bookBtn.addEventListener('click', function() {
            var win = document.getElementById('chatbot-window');
            if (win && !win.classList.contains('is-active')) {
                document.getElementById('chatbot-toggle').click();
            }
            var input = document.getElementById('chatbot-input');
            if (input) input.focus();
        });
    }
});

// ===== CUSTOM SELECT =====
(function() {
    var wrap = document.getElementById('interest-wrap');
    var trigger = document.getElementById('interest-trigger');
    var dropdown = document.getElementById('interest-dropdown');
    var hidden = document.getElementById('interest');
    var valueEl = document.getElementById('interest-value');
    if (!wrap || !trigger) return;

    trigger.addEventListener('click', function() {
        wrap.classList.toggle('open');
    });

    dropdown.querySelectorAll('.custom-select-option').forEach(function(opt) {
        opt.addEventListener('click', function() {
            var val = this.getAttribute('data-value');
            var text = this.textContent.trim();
            hidden.value = val;
            valueEl.textContent = text;
            valueEl.classList.add('selected');
            dropdown.querySelectorAll('.custom-select-option').forEach(function(o) { o.classList.remove('active'); });
            this.classList.add('active');
            wrap.classList.remove('open');
        });
    });

    document.addEventListener('click', function(e) {
        if (!wrap.contains(e.target)) wrap.classList.remove('open');
    });
})();

// ===== FORM INPUT ANIMATIONS =====
(function() {
    document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(function(input) {
        input.addEventListener('focus', function() {
            this.closest('.form-group').style.transform = 'translateY(-2px)';
            this.closest('.form-group').style.transition = 'transform 0.2s ease';
        });
        input.addEventListener('blur', function() {
            this.closest('.form-group').style.transform = 'translateY(0)';
        });
    });
})();

// ===== CHAT WIDGET =====
(function() {
    var session_id = sessionStorage.getItem('chatwidget_session_id');
    if (!session_id) { session_id = crypto.randomUUID(); sessionStorage.setItem('chatwidget_session_id', session_id); }

    var container = document.createElement('div');
    container.id = 'chatbot-container';
    container.innerHTML = '<div id="chatbot-window">' +
        '<div class="chat-header">' +
            '<div class="chat-header-stripe"></div>' +
            '<div class="chat-header-left">' +
                '<div class="chat-avatar-wrap">' +
                    '<img src="https://ui-avatars.com/api/?name=AI&background=6366f1&color=fff" class="chat-avatar" alt="AI Avatar">' +
                    '<span class="chat-avatar-dot"></span>' +
                '</div>' +
                '<div><h4 class="chat-name">Aria</h4><span class="chat-status">AI Strategist</span></div>' +
            '</div>' +
            '<button id="chatbot-close" class="chat-close-btn"><i class="fas fa-times"></i></button>' +
        '</div>' +
        '<div id="chatbot-messages" class="chat-messages"><div class="chat-messages-date">Today &bull; Online</div></div>' +
        '<div class="chat-input-wrap">' +
            '<form id="chatbot-form" class="chat-input-form">' +
                '<input type="text" id="chatbot-input" placeholder="Type a message..." autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">' +
                '<button type="submit"><i class="fas fa-paper-plane"></i></button>' +
            '</form>' +
        '</div>' +
    '</div>' +
    '<button id="chatbot-toggle" class="chat-toggle-btn ripple-active">' +
        '<i id="icon-msg" class="fas fa-comment-dots"></i>' +
        '<i id="icon-close" class="fas fa-chevron-down icon-hidden"></i>' +
    '</button>';
    document.body.appendChild(container);

    var btn = document.getElementById('chatbot-toggle');
    var win = document.getElementById('chatbot-window');
    var closeBtn = document.getElementById('chatbot-close');

    function toggleChat() {
        var isActive = win.classList.contains('is-active');
        if (isActive) {
            win.classList.remove('is-active');
            document.getElementById('icon-msg').classList.remove('icon-hidden');
            document.getElementById('icon-close').classList.add('icon-hidden');
            btn.classList.remove('chatbot-toggle-active');
            btn.classList.add('ripple-active');
        } else {
            win.classList.add('is-active');
            document.getElementById('icon-msg').classList.add('icon-hidden');
            document.getElementById('icon-close').classList.remove('icon-hidden');
            btn.classList.add('chatbot-toggle-active');
            btn.classList.remove('ripple-active');
        }
    }
    btn.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', toggleChat);

    var chatForm = document.getElementById('chatbot-form');
    var chatInput = document.getElementById('chatbot-input');
    var messages = document.getElementById('chatbot-messages');

    chatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        var text = chatInput.value.trim();
        if (!text) return;
        var userMsg = document.createElement('div');
        userMsg.className = 'chat-msg-user';
        userMsg.innerText = text;
        messages.appendChild(userMsg);
        requestAnimationFrame(function() { userMsg.classList.add('show'); });
        messages.scrollTo({ top: messages.scrollHeight, behavior: 'smooth' });
        chatInput.value = '';

        var typingBubble = document.createElement('div');
        typingBubble.className = 'chat-msg-ai';
        typingBubble.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
        messages.appendChild(typingBubble);
        requestAnimationFrame(function() { typingBubble.classList.add('show'); });
        messages.scrollTo({ top: messages.scrollHeight, behavior: 'smooth' });

        chatInput.disabled = true;
        fetch('https://tahmidn8n.solven.app/webhook-test/retain-chatwidget', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_msg: text, session_id: session_id })
        })
        .then(function(res) { return res.json(); })
        .then(function(data) {
            typingBubble.innerHTML = data.reply || '';
            messages.scrollTo({ top: messages.scrollHeight, behavior: 'smooth' });
            chatInput.disabled = false;
        })
        .catch(function() {
            typingBubble.innerHTML = 'Sorry, something went wrong. Please try again.';
            messages.scrollTo({ top: messages.scrollHeight, behavior: 'smooth' });
            chatInput.disabled = false;
        });
    });
})();
