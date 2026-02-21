// === Solutions Page Scripts ===
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => { mobileMenu.classList.toggle('open'); });
});

// ---- Chat Widget ----
(function() {
    let session_id = sessionStorage.getItem('chatwidget_session_id');
    if (!session_id) { session_id = crypto.randomUUID(); sessionStorage.setItem('chatwidget_session_id', session_id); }

    const container = document.createElement('div');
    container.id = 'chatbot-container';
    container.innerHTML = `
        <div id="chatbot-window">
            <div class="chat-header">
                <div class="chat-header-stripe"></div>
                <div class="chat-header-left">
                    <div class="chat-avatar-wrap">
                        <img src="https://ui-avatars.com/api/?name=AI&background=10b981&color=fff" class="chat-avatar" alt="AI">
                        <span class="chat-avatar-dot"></span>
                    </div>
                    <div><h4 class="chat-name">Aria</h4><span class="chat-status">AI Strategist</span></div>
                </div>
                <button id="chatbot-close" class="chat-close-btn"><i class="fas fa-times" style="font-size:1.125rem"></i></button>
            </div>
            <div id="chatbot-messages" class="chat-messages"><div class="chat-messages-date">Today &bull; Online</div></div>
            <div class="chat-input-wrap">
                <form id="chatbot-form" class="chat-input-form">
                    <input type="text" id="chatbot-input" placeholder="Type a message..." autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
                    <button type="submit"><i class="fas fa-paper-plane" style="font-size:1.125rem"></i></button>
                </form>
            </div>
        </div>
        <button id="chatbot-toggle" class="chat-toggle-btn ripple-active">
            <i id="icon-msg" class="fas fa-comment-dots"></i>
            <i id="icon-close" class="fas fa-chevron-down icon-hidden"></i>
        </button>`;
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

        fetch('https://tahmidn8n.solven.app/webhook-test/retain-chatwidget', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_msg: text, session_id })
        }).then(r => r.json()).then(data => {
            typingBubble.innerHTML = data.reply || '';
            messages.scrollTo({ top: messages.scrollHeight, behavior: 'smooth' });
        });
    });
})();
