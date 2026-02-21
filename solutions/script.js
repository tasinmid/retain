// ===== MOBILE MENU =====
(function() {
    const menuBtn = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
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
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(function(el) { observer.observe(el); });
})();

// ===== STAT COUNTER =====
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
    statNumbers.forEach(function(el) { observer.observe(el); });

    function animateCounter(el) {
        const target = parseFloat(el.getAttribute('data-target'));
        const isDecimal = target % 1 !== 0;
        const duration = 1800;
        const startTime = performance.now();
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            const current = eased * target;
            el.textContent = isDecimal ? current.toFixed(1) : Math.round(current);
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    }
})();

// ===== STAT BAR FILL =====
(function() {
    const bars = document.querySelectorAll('.stat-bar-fill');
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const fill = entry.target;
                const w = fill.style.width;
                fill.style.width = '0';
                requestAnimationFrame(function() {
                    requestAnimationFrame(function() { fill.style.width = w; });
                });
                observer.unobserve(fill);
            }
        });
    }, { threshold: 0.5 });
    bars.forEach(function(bar) { observer.observe(bar); });
})();

// ===== CHART BAR ANIMATION =====
(function() {
    const chartBars = document.querySelectorAll('.chart-bar[data-h]');
    if (!chartBars.length) return;
    var animated = false;
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting && !animated) {
                animated = true;
                animateDashBars();
                observer.disconnect();
            }
        });
    }, { threshold: 0.3 });
    chartBars.forEach(function(bar) { observer.observe(bar); });
})();

function animateDashBars() {
    document.querySelectorAll('.chart-bar[data-h]').forEach(function(bar, i) {
        bar.style.height = '0';
        setTimeout(function() { bar.style.height = bar.getAttribute('data-h') + '%'; }, i * 80);
    });
}

// ===== DASHBOARD TAB SWITCHING =====
(function() {
    var sidebarItems = document.querySelectorAll('.mockup-sidebar .sidebar-item[data-tab]');
    if (!sidebarItems.length) return;

    sidebarItems.forEach(function(item) {
        item.addEventListener('click', function() {
            var tab = this.getAttribute('data-tab');
            if (!tab) return;

            // Update sidebar
            sidebarItems.forEach(function(si) {
                si.classList.remove('active');
                var indicator = si.querySelector('.sidebar-active-indicator');
                if (indicator) indicator.remove();
            });
            this.classList.add('active');
            if (!this.querySelector('.sidebar-active-indicator')) {
                var ind = document.createElement('div');
                ind.className = 'sidebar-active-indicator';
                this.appendChild(ind);
            }

            // Switch tab content
            document.querySelectorAll('.dash-tab-content').forEach(function(tc) { tc.classList.remove('active'); });
            var target = document.getElementById('tab-' + tab);
            if (target) {
                target.classList.add('active');
                // Animate counters in the new tab
                animateTabCounters(target);
            }
        });
    });

    // Initial counter animation on scroll
    var dashSection = document.getElementById('dashboard');
    if (dashSection) {
        var initObserver = new IntersectionObserver(function(entries) {
            if (entries[0].isIntersecting) {
                var activeTab = document.querySelector('.dash-tab-content.active');
                if (activeTab) animateTabCounters(activeTab);
                initObserver.disconnect();
            }
        }, { threshold: 0.2 });
        initObserver.observe(dashSection);
    }
})();

function animateTabCounters(container) {
    container.querySelectorAll('.pers-val[data-count], .outcome-val[data-count]').forEach(function(el) {
        var target = parseFloat(el.getAttribute('data-count'));
        var duration = 1200;
        var startTime = performance.now();
        el.textContent = '0';
        function update(currentTime) {
            var elapsed = currentTime - startTime;
            var progress = Math.min(elapsed / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 4);
            var current = eased * target;
            el.textContent = target >= 1000 ? Math.round(current).toLocaleString() : Math.round(current);
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    });
    container.querySelectorAll('.mockup-stat-val[data-count]').forEach(function(el) {
        var target = parseFloat(el.getAttribute('data-count'));
        var isDecimal = el.hasAttribute('data-decimal');
        var duration = 1200;
        var startTime = performance.now();
        el.textContent = '0';

        function update(currentTime) {
            var elapsed = currentTime - startTime;
            var progress = Math.min(elapsed / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 4);
            var current = eased * target;
            if (isDecimal) {
                el.textContent = current.toFixed(1);
            } else if (target >= 1000) {
                el.textContent = Math.round(current).toLocaleString();
            } else {
                el.textContent = Math.round(current);
            }
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    });
}

// ===== INTEGRATION ORBIT — KEEP ICONS UPRIGHT =====
(function() {
    var ring1 = document.querySelector('.int-ring-1');
    var ring2 = document.querySelector('.int-ring-2');
    if (!ring1 && !ring2) return;

    function keepUpright() {
        [
            { ring: ring1, speed: 360 / 40, dir: 1 },
            { ring: ring2, speed: 360 / 60, dir: -1 }
        ].forEach(function(cfg) {
            if (!cfg.ring) return;
            // Read actual ring rotation from computed transform
            var st = getComputedStyle(cfg.ring);
            var m = st.transform;
            var ringAngle = 0;
            if (m && m !== 'none') {
                var v = m.match(/matrix\((.+)\)/);
                if (v) {
                    var parts = v[1].split(',');
                    ringAngle = Math.atan2(parseFloat(parts[1]), parseFloat(parts[0]));
                }
            }
            // Convert to degrees and counter-rotate each icon
            var ringDeg = ringAngle * (180 / Math.PI);
            cfg.ring.querySelectorAll('.int-node').forEach(function(node) {
                var nodeAngle = parseFloat(node.style.getPropertyValue('--angle')) || 0;
                var icon = node.querySelector('.int-icon');
                if (icon) icon.style.transform = 'rotate(' + (-ringDeg - nodeAngle) + 'deg)';
            });
        });
        requestAnimationFrame(keepUpright);
    }
    requestAnimationFrame(keepUpright);
})();

// ===== DASHBOARD CURSOR TILT =====
(function() {
    var wrap = document.querySelector('.dashboard-mockup-wrap');
    var mockup = document.querySelector('.dashboard-mockup');
    if (!wrap || !mockup) return;

    var maxTilt = 3; // degrees — subtle, not extreme
    var ticking = false;

    wrap.addEventListener('mousemove', function(e) {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function() {
            var rect = wrap.getBoundingClientRect();
            var x = (e.clientX - rect.left) / rect.width;  // 0 to 1
            var y = (e.clientY - rect.top) / rect.height;   // 0 to 1
            var rotateY = (x - 0.5) * maxTilt * 2;  // -maxTilt to +maxTilt
            var rotateX = (0.5 - y) * maxTilt * 2;  // -maxTilt to +maxTilt
            mockup.style.transform = 'rotateX(' + rotateX.toFixed(2) + 'deg) rotateY(' + rotateY.toFixed(2) + 'deg)';
            ticking = false;
        });
    });

    wrap.addEventListener('mouseleave', function() {
        mockup.style.transform = 'rotateX(2deg) rotateY(0deg)';
    });
})();

// ===== PARALLAX ORBS =====
(function() {
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                const scrollY = window.scrollY;
                document.querySelectorAll('.hero-orb').forEach(function(orb, i) {
                    orb.style.transform = 'translateY(' + (scrollY * (0.05 + i * 0.02)) + 'px)';
                });
                ticking = false;
            });
            ticking = true;
        }
    });
})();

// ===== CALL DURATION TIMER =====
(function() {
    const durationEl = document.querySelector('.call-duration');
    if (!durationEl) return;
    let seconds = 154; // 2:34
    setInterval(function() {
        seconds++;
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        durationEl.textContent = (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
    }, 1000);
})();

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
                        <img src="https://ui-avatars.com/api/?name=AI&background=6366f1&color=fff" class="chat-avatar" alt="AI Avatar">
                        <span class="chat-avatar-dot"></span>
                    </div>
                    <div><h4 class="chat-name">Aria</h4><span class="chat-status">AI Strategist</span></div>
                </div>
                <button id="chatbot-close" class="chat-close-btn"><i class="fas fa-times"></i></button>
            </div>
            <div id="chatbot-messages" class="chat-messages"><div class="chat-messages-date">Today &bull; Online</div></div>
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
    const closeBtn = document.getElementById('chatbot-close');

    function toggleChat() {
        const isActive = win.classList.contains('is-active');
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
            typingBubble.innerHTML = data.reply || '';
            messages.scrollTo({ top: messages.scrollHeight, behavior: 'smooth' });
            input.disabled = false;
        })
        .catch(function() {
            typingBubble.innerHTML = 'Sorry, something went wrong. Please try again.';
            messages.scrollTo({ top: messages.scrollHeight, behavior: 'smooth' });
            input.disabled = false;
        });
    });
})();
