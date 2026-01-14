(function() {
    // 1. Inject Styles
    const style = document.createElement('style');
    style.innerHTML = `
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');
        
        #chatbot-window {
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
            transform: scale(0.8) translateY(40px);
            transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.1);
            transform-origin: bottom right;
        }

        #chatbot-window.is-active {
            opacity: 1;
            visibility: visible;
            pointer-events: auto;
            transform: scale(1) translateY(0);
        }

        .glass-header {
            background: rgba(15, 23, 42, 0.9);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
        }

        @keyframes ripple {
            0% { transform: scale(1); opacity: 1; }
            100% { transform: scale(1.6); opacity: 0; }
        }
        
        .ripple-active::after {
            content: "";
            position: absolute;
            inset: 0;
            background: rgba(222, 114, 213, 0.4);
            border-radius: 9999px;
            z-index: -1;
            animation: ripple 2s infinite;
        }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .icon-transition { transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
    `;
    document.head.appendChild(style);

    // 2. Inject HTML Structure
    const container = document.createElement('div');
    container.id = 'chatbot-container';
    container.className = 'fixed bottom-8 right-8 z-[100] flex flex-col items-end font-sans';
    container.innerHTML = `
        <div id="chatbot-window" class="mb-6 w-[400px] max-w-[90vw] h-[600px] bg-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.25)] overflow-hidden flex flex-col border border-slate-100">
            <div class="glass-header p-6 text-white flex justify-between items-center relative overflow-hidden shrink-0">
                <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-cyan-400"></div>
                <div class="flex items-center gap-4">
                    <div class="relative">
                        <img src="https://ui-avatars.com/api/?name=AI&background=10b981&color=fff" class="w-12 h-12 rounded-full border-2 border-emerald-500/30 shadow-lg">
                        <span class="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-slate-900 rounded-full"></span>
                    </div>
                    <div>
                        <h4 class="font-bold text-lg leading-none">Aria</h4>
                        <span class="text-[11px] text-emerald-300 font-medium tracking-wide uppercase">AI Strategist</span>
                    </div>
                </div>
                <button id="chatbot-close" class="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-all text-slate-300"><i class="fas fa-times text-lg"></i></button>
            </div>
            <div id="chatbot-messages" class="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-slate-50 to-white no-scrollbar">
                <div class="text-center"><span class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Today • Online</span></div>
                <div class="flex justify-start items-end gap-2">
                    <div class="bg-white border border-slate-100 p-4 rounded-3xl rounded-bl-none shadow-[0_4px_12px_rgba(0,0,0,0.03)] max-w-[85%] text-sm text-slate-700">Hi! I'm Aria. How can I help you scale today? ✨</div>
                </div>
            </div>
            <div class="p-6 bg-white border-t border-slate-50">
                <div class="flex items-center gap-3 bg-slate-100 rounded-[1.5rem] px-5 py-3">
                    <input type="text" id="chatbot-input" placeholder="Type a message..." style="background:transparent; border:none; outline:none; flex:1; font-size:15px;">
                    <button id="chatbot-send" class="text-emerald-500 transition-transform hover:scale-110"><i class="fas fa-paper-plane text-lg"></i></button>
                </div>
            </div>
        </div>
        <button id="chatbot-toggle" class="ripple-active relative w-16 h-16 bg-slate-900 text-white rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center group z-10 focus:outline-none">
            <i id="icon-msg" class="fas fa-comment-dots text-2xl absolute icon-transition"></i>
            <i id="icon-close" class="fas fa-chevron-down text-2xl absolute icon-transition opacity-0 -rotate-90 scale-50"></i>
        </button>
    `;
    document.body.appendChild(container);

    // 3. Logic
    const btn = document.getElementById('chatbot-toggle');
    const win = document.getElementById('chatbot-window');
    const iconMsg = document.getElementById('icon-msg');
    const iconClose = document.getElementById('icon-close');
    const closeBtn = document.getElementById('chatbot-close');

    function toggleChat() {
        const isActive = win.classList.contains('is-active');
        if (isActive) {
            win.classList.remove('is-active');
            iconMsg.classList.remove('opacity-0', 'rotate-90', 'scale-50');
            iconClose.classList.add('opacity-0', '-rotate-90', 'scale-50');
            btn.style.backgroundColor = '#0f172a'; // slate-900
            btn.style.color = '#ffffff';
            btn.classList.add('ripple-active');
        } else {
            win.classList.add('is-active');
            iconMsg.classList.add('opacity-0', 'rotate-90', 'scale-50');
            iconClose.classList.remove('opacity-0', '-rotate-90', 'scale-50');
            btn.style.backgroundColor = '#ffffff';
            btn.style.color = '#0f172a';
            btn.classList.remove('ripple-active');
        }
    }

    btn.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', toggleChat);
})();
