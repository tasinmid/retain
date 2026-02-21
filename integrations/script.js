(function() {
// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
});

// Chat widget
let session_id = sessionStorage.getItem('chatwidget_session_id');
if (!session_id) {
    session_id = crypto.randomUUID();
    sessionStorage.setItem('chatwidget_session_id', session_id);
}

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

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    const userMsg = document.createElement('div');
    userMsg.className = 'chat-message-user chat-message';
    userMsg.innerText = text;
    messages.appendChild(userMsg);
    requestAnimationFrame(() => userMsg.classList.add('show'));
    messages.scrollTo({ top: messages.scrollHeight, behavior: 'smooth' });
    input.value = '';

    const typingBubble = document.createElement('div');
    typingBubble.className = 'chat-message-ai chat-message';
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

// Render integrations (loaded from integrations-data.js)
function renderIntegrations() {
    const grid = document.getElementById('integrations-grid');
    if (typeof integrations === 'undefined') return;

    integrations.forEach(integration => {
        const card = document.createElement('div');
        card.className = 'integration-card';

        let iconHtml;
        if (integration.iconType === 'svg') {
            if (integration.svgInnerHtml) {
                iconHtml = `<svg class="w-8 h-8" viewBox="${integration.svgViewBox}" xmlns="http://www.w3.org/2000/svg">${integration.svgInnerHtml}</svg>`;
            } else {
                iconHtml = `<svg class="w-8 h-8 ${integration.iconColor}" fill="currentColor" viewBox="${integration.svgViewBox}" xmlns="http://www.w3.org/2000/svg"><path d="${integration.svgPath}" /></svg>`;
            }
        } else {
            iconHtml = `<i class="${integration.iconClass} ${integration.iconColor} text-2xl"></i>`;
        }

        let tagsHtml;
        if (integration.tags && integration.tags.length > 0) {
            tagsHtml = `<div class="flex flex-wrap justify-center gap-1">${integration.tags.map(tag =>
                `<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${tag.backgroundColor} ${tag.textColor} mb-1">${tag.text}</span>`
            ).join('')}</div>`;
        } else {
            tagsHtml = `<div class="flex justify-center"><span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${integration.tagBackgroundColor} ${integration.tagTextColor}">${integration.tag}</span></div>`;
        }

        card.innerHTML = `
            <div class="w-16 h-16 ${integration.backgroundColor} rounded-xl flex items-center justify-center mx-auto mb-4">
                ${iconHtml}
            </div>
            <h3 class="text-xl font-bold mb-2">${integration.name}</h3>
            <p class="card-subtitle">${integration.subtitle}</p>
            ${tagsHtml}
        `;
        grid.appendChild(card);
    });
}

// Initialize
renderIntegrations();
})();
