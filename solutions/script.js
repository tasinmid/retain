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

// ===== HERO STAT COUNTERS =====
(function() {
    var heroStats = document.querySelectorAll('.hero-stat-val[data-count]');
    if (!heroStats.length) return;
    var observer = new IntersectionObserver(function(entries) {
        if (entries[0].isIntersecting) {
            heroStats.forEach(function(el) {
                var target = parseFloat(el.getAttribute('data-count'));
                var isDecimal = el.hasAttribute('data-decimal');
                var duration = 1500;
                var startTime = performance.now();
                function update(now) {
                    var elapsed = now - startTime;
                    var progress = Math.min(elapsed / duration, 1);
                    var eased = 1 - Math.pow(1 - progress, 4);
                    var current = eased * target;
                    el.textContent = isDecimal ? current.toFixed(1) : Math.round(current);
                    if (progress < 1) requestAnimationFrame(update);
                }
                requestAnimationFrame(update);
            });
            observer.disconnect();
        }
    }, { threshold: 0.3 });
    observer.observe(document.querySelector('.hero-stats-row'));
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

/* ── Rotating hero word (letter-by-letter) ── */
(function(){
    const words = document.querySelectorAll('.rotating-word');
    if(!words.length) return;
    const wrap = document.querySelector('.rotating-word-wrap');
    const delay = 30;

    // Split each word into letter spans
    words.forEach(w => {
        const text = w.textContent;
        w.innerHTML = '';
        text.split('').forEach((ch, i) => {
            const span = document.createElement('span');
            span.className = 'rw-letter';
            span.textContent = ch === ' ' ? '\u00A0' : ch;
            w.appendChild(span);
        });
    });

    // Measure a word's width using a hidden clone inside the same parent for correct font inheritance
    function measureWord(word) {
        const clone = word.cloneNode(true);
        clone.style.position = 'absolute';
        clone.style.visibility = 'hidden';
        clone.style.display = 'inline-block';
        clone.style.whiteSpace = 'nowrap';
        clone.classList.add('active');
        clone.classList.remove('out');
        clone.querySelectorAll('.rw-letter').forEach(l => { 
            l.style.opacity = '1'; 
            l.style.transform = 'none'; 
            l.style.animation = 'none'; 
        });
        wrap.appendChild(clone);
        const w = clone.offsetWidth;
        wrap.removeChild(clone);
        return w;
    }

    function activateWord(word) {
        word.querySelectorAll('.rw-letter').forEach((l, i) => {
            l.style.animation = 'none';
            l.offsetHeight; // force reflow
            l.style.animation = '';
            l.style.animationDelay = (i * delay) + 'ms';
        });
    }

    // Set initial width
    wrap.style.width = measureWord(words[0]) + 'px';
    activateWord(words[0]);

    let current = 0;
    setInterval(() => {
        const outWord = words[current];
        // Animate out
        outWord.classList.remove('active');
        outWord.classList.add('out');
        outWord.querySelectorAll('.rw-letter').forEach((l, i) => {
            l.style.transitionDelay = (i * delay) + 'ms';
        });

        current = (current + 1) % words.length;
        const inWord = words[current];

        // Update box width
        wrap.style.width = measureWord(inWord) + 'px';

        // Animate in after short pause
        setTimeout(() => {
            outWord.classList.remove('out');
            inWord.classList.add('active');
            activateWord(inWord);
        }, 150);
    }, 2800);
})();

// ===== EMAIL INBOX FUNCTIONALITY =====
(function() {
    const emailData = {
        inbox: [
            {
                id: 1,
                name: 'Sarah M.',
                avatar: '#6366f1',
                subject: 'We picked these just for you ✨',
                preview: 'Based on your recent browsing, we think you\'ll love these...',
                time: '2m',
                email: 'sarah@example.com',
                ai: true,
                greeting: 'Hi Sarah,',
                text: 'Based on your recent browsing, we think you\'ll love these handpicked items:',
                products: [
                    { name: 'Premium Plan', price: '$79/mo' },
                    { name: 'Analytics Pro', price: '$49/mo' },
                    { name: 'AI Bundle', price: '$99/mo' }
                ],
                cta: 'Shop Your Picks →'
            },
            {
                id: 2,
                name: 'David L.',
                avatar: '#f59e0b',
                subject: 'Your order is on its way! 📦',
                preview: 'Track your package — estimated delivery tomorrow...',
                time: '12m',
                email: 'david@example.com',
                ai: true,
                greeting: 'Hi David,',
                text: 'Great news! Your order has shipped and will arrive by tomorrow. Track your delivery:',
                products: [
                    { name: 'Order #2847', price: 'In Transit' },
                    { name: 'Delivery Date', price: 'Tomorrow' },
                    { name: 'Carrier', price: 'Express' }
                ],
                cta: 'Track Package →'
            },
            {
                id: 3,
                name: 'Emma W.',
                avatar: '#0ea5e9',
                subject: 'Your weekly report is ready 📊',
                preview: 'Here\'s your performance summary for the week...',
                time: '45m',
                email: 'emma@example.com',
                ai: true,
                greeting: 'Hello Emma,',
                text: 'Your weekly performance report is ready. Here are your highlights:',
                products: [
                    { name: 'Revenue', price: '+23%' },
                    { name: 'New Users', price: '482' },
                    { name: 'Retention', price: '94%' }
                ],
                cta: 'View Report →'
            }
        ],
        sent: [
            {
                id: 4,
                name: 'Mike Wilson',
                avatar: '#3b82f6',
                subject: 'Your product demo is confirmed',
                preview: 'Thursday at 2:00 PM · See you there!',
                time: '2h',
                email: 'mike@company.com',
                ai: true,
                greeting: 'Hi Mike,',
                text: 'Your product demo is confirmed for Thursday at 2:00 PM. See you there!',
                products: [],
                cta: 'Add to Calendar →'
            },
            {
                id: 5,
                name: 'Tech Corp',
                avatar: '#f59e0b',
                subject: 'Proposal attached',
                preview: 'Here\'s our proposal for your retention project...',
                time: '4h',
                email: 'hello@techcorp.com',
                ai: false,
                greeting: 'Hello Team,',
                text: 'Please find attached our proposal for your customer retention project. Let us know if you have any questions.',
                products: [],
                cta: 'View Proposal →'
            }
        ],
        analytics: null
    };

    let currentTab = 'inbox';
    let currentEmail = emailData.inbox[0];

    function initEmailInbox() {
        const tabs = document.querySelectorAll('.em-tab');
        const emailList = document.querySelector('.em-sidebar-list');
        const previewSubject = document.querySelector('.em-preview-subject');
        const previewMeta = document.querySelector('.em-preview-meta');
        const previewGreeting = document.querySelector('.em-preview-greeting');
        const previewText = document.querySelector('.em-preview-text');
        const productGrid = document.querySelector('.em-product-grid');
        const ctaButton = document.querySelector('.em-cta-button');

        if (!tabs.length || !emailList) return;

        // Tab switching
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabName = this.textContent.trim().toLowerCase();
                if (tabName.includes('inbox')) currentTab = 'inbox';
                else if (tabName.includes('sent')) currentTab = 'sent';
                else if (tabName.includes('analytics')) return;

                tabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');

                renderEmailList();
                if (emailData[currentTab].length > 0) {
                    selectEmail(emailData[currentTab][0]);
                }
            });
        });

        // Initial render
        renderEmailList();
        selectEmail(currentEmail);

        function renderEmailList() {
            emailList.innerHTML = '';
            const emails = emailData[currentTab];
            if (!emails) return;

            emails.forEach(email => {
                const item = document.createElement('div');
                item.className = 'em-list-item' + (email.id === currentEmail.id ? ' active' : '');
                item.innerHTML = `
                    <div class="em-list-avatar" style="background:${email.avatar}">${email.name.charAt(0)}</div>
                    <div class="em-list-info">
                        <strong>${email.name}</strong>
                        <span>${email.subject}</span>
                    </div>
                    <span class="em-list-time">${email.time}</span>
                `;
                item.addEventListener('click', () => selectEmail(email));
                emailList.appendChild(item);
            });
        }

        function selectEmail(email) {
            currentEmail = email;
            renderEmailList();

            previewSubject.textContent = email.subject;
            previewMeta.innerHTML = `To: ${email.email} · ${email.ai ? '<span class="em-ai-badge"><i class="fas fa-robot"></i> AI Generated</span>' : ''}`;
            previewGreeting.textContent = email.greeting;
            previewText.textContent = email.text;

            productGrid.innerHTML = '';
            if (email.products.length > 0) {
                email.products.forEach(prod => {
                    const card = document.createElement('div');
                    card.className = 'em-product-card';
                    card.innerHTML = `
                        <div class="em-prod-img"></div>
                        <span class="em-prod-name">${prod.name}</span>
                        <span class="em-prod-price">${prod.price}</span>
                    `;
                    productGrid.appendChild(card);
                });
                ctaButton.textContent = email.cta;
                ctaButton.style.display = 'block';
            } else {
                ctaButton.style.display = 'block';
                ctaButton.textContent = email.cta;
            }
        }
    }

    initEmailInbox();
})();

// ===== SPECIAL OCCASION AUTOMATION =====
(function() {
    const occasions = {
        birthday: {
            title: 'Happy Birthday! 🎂',
            message: 'Hi Sarah! Wishing you an amazing birthday filled with joy! Here\'s a special 25% discount just for you: <strong>BIRTHDAY25</strong>',
            icon: 'fa-birthday-cake',
            color: '#ec4899'
        },
        anniversary: {
            title: 'Back in Stock! 💙',
            message: 'Hi Sarah! Remember that blue handbag you wanted 5 months ago? It was out of stock, but great news — a last piece just arrived from our latest collection. Should we book it for you before it\'s gone again? 💫',
            icon: 'fa-shopping-bag',
            color: '#3b82f6'
        },
        holiday: {
            title: 'Eid Mubarak! 🌙',
            message: 'Eid Mubarak! We wish you and your family joy, peace, and prosperity. Enjoy free shipping on all orders this week with code: <strong>EIDFREE</strong>',
            icon: 'fa-gift',
            color: '#22c55e'
        },
        milestone: {
            title: 'Congratulations! 🏆',
            message: 'You just hit 10 orders! Welcome to the Gold tier — you\'ve unlocked 5x points, free shipping, and VIP support! Keep up the amazing shopping.',
            icon: 'fa-star',
            color: '#eab308'
        }
    };

    function initOccasions() {
        const timelineItems = document.querySelectorAll('.occ-timeline-item');
        const iconElement = document.getElementById('occ-icon');
        const titleElement = document.getElementById('occ-title');
        const messageElement = document.getElementById('occ-message');

        if (!timelineItems.length) return;

        timelineItems.forEach(item => {
            item.addEventListener('click', function() {
                const occasionKey = this.getAttribute('data-occasion');
                const occasion = occasions[occasionKey];

                if (!occasion) return;

                // Update active state
                timelineItems.forEach(t => t.classList.remove('active'));
                this.classList.add('active');

                // Animate icon transition
                iconElement.style.opacity = '0';
                iconElement.style.transform = 'scale(0.5) rotate(-10deg)';

                setTimeout(() => {
                    iconElement.className = 'fas ' + occasion.icon;
                    iconElement.style.color = occasion.color;
                    iconElement.style.opacity = '1';
                    iconElement.style.transform = 'scale(1) rotate(0deg)';
                }, 300);

                // Update text with animation
                titleElement.style.opacity = '0';
                titleElement.style.transform = 'translateY(-10px)';
                
                setTimeout(() => {
                    titleElement.textContent = occasion.title;
                    messageElement.innerHTML = occasion.message;

                    titleElement.style.opacity = '1';
                    titleElement.style.transform = 'translateY(0)';
                }, 200);
            });
        });
    }

    initOccasions();
})();

// ===== GRID MOUSE HIGHLIGHT EFFECT =====
(function() {
    const schedulingSection = document.querySelector('.sec-scheduling-leads');
    const mouseHighlight = document.querySelector('.sl-mouse-highlight');

    if (!schedulingSection || !mouseHighlight) return;

    schedulingSection.addEventListener('mousemove', function(e) {
        const rect = schedulingSection.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate which grid cell the mouse is over
        const gridSize = 40;
        const cellX = Math.floor(x / gridSize) * gridSize;
        const cellY = Math.floor(y / gridSize) * gridSize;

        // Show the highlight using transform
        mouseHighlight.style.opacity = '1';
        mouseHighlight.style.transform = `translate(${cellX}px, ${cellY}px)`;
    });

    schedulingSection.addEventListener('mouseleave', function() {
        mouseHighlight.style.opacity = '0';
    });
})();

