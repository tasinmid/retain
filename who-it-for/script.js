document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    var mobileMenuButton = document.getElementById('mobile-menu-button');
    var mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', function () {
        mobileMenu.classList.toggle('open');
    });
});

// Chat Widget
(function () {
    // Session ID
    var session_id = sessionStorage.getItem('chatwidget_session_id');
    if (!session_id) {
        session_id = crypto.randomUUID();
        sessionStorage.setItem('chatwidget_session_id', session_id);
    }

    // Inject HTML
    var container = document.createElement('div');
    container.id = 'chatbot-container';
    container.className = 'chat-container';
    container.innerHTML =
        '<div id="chatbot-window">' +
            '<div class="chat-header">' +
                '<div class="chat-header-bar"></div>' +
                '<div class="chat-header-info">' +
                    '<div class="chat-avatar-wrap">' +
                        '<img src="https://ui-avatars.com/api/?name=AI&background=10b981&color=fff" class="chat-avatar" alt="AI">' +
                        '<span class="chat-status-dot"></span>' +
                    '</div>' +
                    '<div>' +
                        '<h4 class="chat-name">Aria</h4>' +
                        '<span class="chat-role">AI Strategist</span>' +
                    '</div>' +
                '</div>' +
                '<button id="chatbot-close" class="chat-close-btn"><i class="fas fa-times chat-icon-sm"></i></button>' +
            '</div>' +
            '<div id="chatbot-messages" class="chat-messages">' +
                '<div class="chat-timestamp">Today • Online</div>' +
            '</div>' +
            '<div class="chat-input-area">' +
                '<form id="chatbot-form" class="chat-form">' +
                    '<input type="text" id="chatbot-input" placeholder="Type a message..." class="chat-input" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">' +
                    '<button type="submit" class="chat-send-btn"><i class="fas fa-paper-plane"></i></button>' +
                '</form>' +
            '</div>' +
        '</div>' +
        '<button id="chatbot-toggle" class="chat-toggle ripple-active">' +
            '<i id="icon-msg" class="fas fa-comment-dots icon-transition chat-icon-lg"></i>' +
            '<i id="icon-close" class="fas fa-chevron-down icon-transition icon-hidden-reverse chat-icon-lg"></i>' +
        '</button>';
    document.body.appendChild(container);

    // Toggle logic
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
            btn.classList.remove('chatbot-toggle-active');
            btn.classList.add('ripple-active');
        } else {
            win.classList.add('is-active');
            iconMsg.classList.add('icon-hidden');
            iconClose.classList.remove('icon-hidden-reverse');
            btn.classList.add('chatbot-toggle-active');
            btn.classList.remove('ripple-active');
        }
    }

    btn.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', toggleChat);

    // Message sending
    var form = document.getElementById('chatbot-form');
    var input = document.getElementById('chatbot-input');
    var messages = document.getElementById('chatbot-messages');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var text = input.value.trim();
        if (!text) return;

        // User bubble
        var userMsg = document.createElement('div');
        userMsg.className = 'chat-message chat-message-user';
        userMsg.innerText = text;
        messages.appendChild(userMsg);
        requestAnimationFrame(function () { userMsg.classList.add('show'); });
        messages.scrollTo({ top: messages.scrollHeight, behavior: 'smooth' });
        input.value = '';

        // Typing bubble
        var typingBubble = document.createElement('div');
        typingBubble.className = 'chat-message chat-message-bot';
        typingBubble.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
        messages.appendChild(typingBubble);
        requestAnimationFrame(function () { typingBubble.classList.add('show'); });
        messages.scrollTo({ top: messages.scrollHeight, behavior: 'smooth' });

        input.disabled = true;
        fetch('https://tahmidn8n.solven.app/webhook-test/retain-chatwidget', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_msg: text, session_id: session_id })
        })
        .then(function (res) { return res.json(); })
        .then(function (data) {
            typingBubble.innerHTML = data.reply || '';
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
