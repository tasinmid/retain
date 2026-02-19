// ========================================
// Retain E-commerce Page Scripts
// ========================================

// --- Page load fade-in ---
window.addEventListener('DOMContentLoaded', function() {
    requestAnimationFrame(function() {
        document.body.classList.add('loaded');
    });
});

// --- Scroll reveal ---
(function() {
    var revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(e) {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                revealObserver.unobserve(e.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(function(el) {
        revealObserver.observe(el);
    });
})();

// --- KF tile staggered reveal ---
(function() {
    var tiles = document.querySelectorAll('.kf-tile');
    var obs = new IntersectionObserver(function(entries) {
        entries.forEach(function(e) {
            if (e.isIntersecting) {
                var idx = Array.prototype.indexOf.call(tiles, e.target);
                setTimeout(function() { e.target.classList.add('visible'); }, idx * 80);
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.1 });
    tiles.forEach(function(el) { obs.observe(el); });
})();

// --- Counter animation ---
(function() {
    var counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(e) {
            if (!e.isIntersecting) return;
            var el = e.target;
            var target = parseFloat(el.dataset.target);
            var suffix = el.dataset.suffix || '';
            var isDecimal = String(target).includes('.');
            var duration = 2000;
            var start = performance.now();
            var animate = function(now) {
                var p = Math.min((now - start) / duration, 1);
                var c1 = 1.70158, c3 = c1 + 1;
                var ease = 1 + c3 * Math.pow(p - 1, 3) + c1 * Math.pow(p - 1, 2);
                var val = Math.max(0, ease * target);
                el.textContent = (isDecimal ? val.toFixed(1) : Math.round(val)) + suffix;
                if (p < 1) requestAnimationFrame(animate);
                else el.textContent = (isDecimal ? target.toFixed(1) : target) + suffix;
            };
            el.textContent = (isDecimal ? '0.0' : '0') + suffix;
            requestAnimationFrame(animate);
            counterObserver.unobserve(el);
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('.counter').forEach(function(el) {
        counterObserver.observe(el);
    });
})();

// --- Check mark draw animation ---
(function() {
    var checkObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(e) {
            if (e.isIntersecting) {
                e.target.classList.add('drawn');
                checkObserver.unobserve(e.target);
            }
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('.check-draw').forEach(function(el) {
        checkObserver.observe(el);
    });
})();

// --- How It Works timeline scroll animation ---
(function() {
    var section = document.getElementById('howItWorks');
    var timeline = document.getElementById('hiwTimeline');
    if (!section || !timeline) return;

    var fill = document.getElementById('hiwTimelineFill');
    var dots = [document.getElementById('hiwDot1'), document.getElementById('hiwDot2'), document.getElementById('hiwDot3')];
    var cards = timeline.querySelectorAll('.hiw-reveal-left, .hiw-reveal-right');
    var cardThresholds = [0.15, 0.45, 0.7];
    var dotThresholds = [0.05, 0.35, 0.65];

    function onScroll() {
        var rect = section.getBoundingClientRect();
        var winH = window.innerHeight;
        var total = rect.height + winH;
        var scrolled = winH - rect.top;
        var p = Math.max(0, Math.min(1, (scrolled - winH * 0.3) / (rect.height)));

        if (fill) fill.style.height = Math.min(100, p * 100) + '%';

        dots.forEach(function(dot, i) {
            if (!dot) return;
            if (p >= dotThresholds[i]) dot.classList.add('active');
            else dot.classList.remove('active');
        });

        cards.forEach(function(card, i) {
            if (p >= cardThresholds[i]) card.classList.add('visible');
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();
})();

// --- Deep Dive Tabs (scroll-driven) ---
(function() {
    var TAB_IDS = ['tab-omni', 'tab-cart', 'tab-profiles', 'tab-analytics'];
    var TOTAL = TAB_IDS.length;
    var currentIdx = 0;
    var outer = document.getElementById('scrollTabsOuter');
    var progressBar = document.getElementById('tabProgressBar');
    var allBtns = document.querySelectorAll('.tab-btn');
    var section = document.getElementById('scrollTabsSection');

    if (!outer || !section) return;

    var DEAD_TOP = 0.20;
    var DEAD_BOTTOM = 0.05;
    var ACTIVE_RANGE = 1 - DEAD_TOP - DEAD_BOTTOM;

    function adjustStickyTop() {
        var sectionH = section.scrollHeight;
        var viewportH = window.innerHeight;
        if (sectionH > viewportH) {
            section.style.top = -(sectionH - viewportH) + 'px';
        } else {
            section.style.top = '0px';
        }
    }

    function isMobile() { return window.matchMedia('(max-width: 767px)').matches; }

    function setOuterHeight() {
        if (isMobile()) {
            outer.style.height = 'auto';
            return;
        }
        outer.style.height = (TOTAL + 4) * window.innerHeight + 'px';
        adjustStickyTop();
    }
    setOuterHeight();
    window.addEventListener('resize', setOuterHeight);
    window.addEventListener('load', adjustStickyTop);

    function switchToTab(idx, direction) {
        if (idx < 0 || idx >= TOTAL || idx === currentIdx) return false;
        var prevIdx = currentIdx;
        currentIdx = idx;
        var dir = direction || 'down';
        var slideForward = dir === 'down';

        var targetTab = TAB_IDS[idx];
        allBtns.forEach(function(b) {
            var bIdx = TAB_IDS.indexOf(b.dataset.tab);
            var isCurrent = b.dataset.tab === targetTab;
            var isPast = bIdx >= 0 && bIdx < idx;
            var isFilled = isCurrent || isPast;

            if (isCurrent) b.classList.add('active');
            else b.classList.remove('active');

            // Update dots (desktop timeline)
            var dotInner = b.querySelector('.tab-timeline-dot-inner');
            var dotOuter = b.querySelector('.tab-timeline-dot');
            if (dotInner) {
                if (isFilled) dotInner.style.background = '#f59e0b';
                else dotInner.style.background = 'transparent';
            }
            if (dotOuter) {
                if (isFilled) dotOuter.style.borderColor = '#fbbf24';
                else dotOuter.style.borderColor = '#d1d5db';
            }
            var label = b.querySelector('.tab-label');
            if (label) {
                if (isCurrent) {
                    label.style.color = '';
                    label.style.fontWeight = '700';
                } else {
                    label.style.color = '#6b7280';
                    label.style.fontWeight = '';
                }
            }
        });

        // Old content out
        var oldContent = document.getElementById(TAB_IDS[prevIdx]);
        if (oldContent) {
            oldContent.style.transform = slideForward ? 'translateY(-70px)' : 'translateY(70px)';
            oldContent.style.opacity = '0';
            oldContent.style.scale = '0.97';
            setTimeout(function() { oldContent.style.visibility = 'hidden'; }, 550);
        }

        // Old image out
        var oldImgKey = TAB_IDS[prevIdx].replace('tab-', '');
        var oldImg = document.getElementById('tab-img-' + oldImgKey);
        if (oldImg) {
            oldImg.style.transform = slideForward ? 'translateY(-70px)' : 'translateY(70px)';
            oldImg.style.opacity = '0';
            oldImg.style.scale = '0.97';
            setTimeout(function() { oldImg.style.visibility = 'hidden'; }, 550);
        }

        // New content in
        var content = document.getElementById(TAB_IDS[idx]);
        content.style.transition = 'none';
        content.style.transform = slideForward ? 'translateY(70px)' : 'translateY(-70px)';
        content.style.opacity = '0';
        content.style.scale = '0.97';
        content.style.visibility = 'visible';
        requestAnimationFrame(function() {
            requestAnimationFrame(function() {
                content.style.transition = 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1), scale 0.55s cubic-bezier(0.22, 1, 0.36, 1)';
                content.style.transform = 'translateY(0)';
                content.style.opacity = '1';
                content.style.scale = '1';
            });
        });

        // New image in
        var imgKey = TAB_IDS[idx].replace('tab-', '');
        var newImg = document.getElementById('tab-img-' + imgKey);
        if (newImg) {
            newImg.style.transition = 'none';
            newImg.style.transform = slideForward ? 'translateY(70px)' : 'translateY(-70px)';
            newImg.style.opacity = '0';
            newImg.style.scale = '0.97';
            newImg.style.visibility = 'visible';
            requestAnimationFrame(function() {
                requestAnimationFrame(function() {
                    newImg.style.transition = 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1), scale 0.55s cubic-bezier(0.22, 1, 0.36, 1)';
                    newImg.style.transform = 'translateY(0)';
                    newImg.style.opacity = '1';
                    newImg.style.scale = '1';
                });
            });
        }

        if (progressBar) progressBar.style.height = (idx / (TOTAL - 1) * 100) + '%';
        return true;
    }

    // Scroll handler
    function onScroll() {
        if (isMobile()) return;
        var rect = outer.getBoundingClientRect();
        var scrolledInto = -rect.top;
        var maxScroll = outer.offsetHeight - window.innerHeight;
        if (scrolledInto < 0 || scrolledInto > maxScroll) return;

        var rawProgress = scrolledInto / maxScroll;
        var adjustedProgress;
        if (rawProgress <= DEAD_TOP) adjustedProgress = 0;
        else if (rawProgress >= 1 - DEAD_BOTTOM) adjustedProgress = 1;
        else adjustedProgress = (rawProgress - DEAD_TOP) / ACTIVE_RANGE;
        adjustedProgress = Math.max(0, Math.min(1, adjustedProgress));

        var targetIdx = Math.min(TOTAL - 1, Math.floor(adjustedProgress * TOTAL));
        if (targetIdx !== currentIdx) {
            switchToTab(targetIdx, targetIdx > currentIdx ? 'down' : 'up');
        }
        if (progressBar) progressBar.style.height = (currentIdx / (TOTAL - 1) * 100) + '%';
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // Click handlers
    allBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var i = TAB_IDS.indexOf(btn.dataset.tab);
            if (i < 0) return;
            switchToTab(i, i > currentIdx ? 'down' : 'up');
            var outerTop = outer.getBoundingClientRect().top + window.scrollY;
            var maxScroll = outer.offsetHeight - window.innerHeight;
            var adjustedProgress = i / (TOTAL - 1);
            var rawProgress = DEAD_TOP + adjustedProgress * ACTIVE_RANGE;
            var targetScroll = outerTop + rawProgress * maxScroll;
            window.scrollTo({ top: targetScroll, behavior: 'smooth' });
        });
    });

    // Initialize first tab
    var first = document.getElementById(TAB_IDS[0]);
    if (first) { first.style.visibility = 'visible'; first.style.transform = 'translateY(0)'; }
    var firstImg = document.getElementById('tab-img-' + TAB_IDS[0].replace('tab-', ''));
    if (firstImg) { firstImg.style.visibility = 'visible'; firstImg.style.transform = 'translateY(0)'; }
})();

// --- Mobile Swipe Carousel ---
(function() {
    var track = document.getElementById('mobileSwipeTrack');
    var tabsWrap = document.getElementById('mobileSwipeTabs');
    var dotsWrap = document.getElementById('mobileSwipeDots');
    if (!track || !tabsWrap || !dotsWrap) return;

    var slides = track.querySelectorAll('.mobile-swiper-slide');
    var tabs = tabsWrap.querySelectorAll('.mobile-swiper-tab');
    var dots = dotsWrap.querySelectorAll('.mobile-swiper-dot');
    var total = slides.length;
    var current = 0;
    var startX = 0, currentX = 0, isDragging = false, dragDelta = 0;

    function goTo(idx, smooth) {
        if (idx < 0 || idx >= total) return;
        current = idx;
        track.style.transition = smooth !== false ? 'transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)' : 'none';
        track.style.transform = 'translateX(-' + (current * 100) + '%)';
        tabs.forEach(function(t, i) { t.classList.toggle('active', i === current); });
        dots.forEach(function(d, i) { d.classList.toggle('active', i === current); });
        var activeTab = tabs[current];
        if (activeTab) activeTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }

    tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            var i = parseInt(tab.dataset.slide);
            if (!isNaN(i)) goTo(i);
        });
    });

    track.addEventListener('touchstart', function(e) {
        isDragging = true;
        startX = e.touches[0].clientX;
        currentX = startX;
        dragDelta = 0;
        track.style.transition = 'none';
    }, { passive: true });

    track.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
        dragDelta = currentX - startX;
        var base = -(current * 100);
        var trackWidth = track.offsetWidth / total;
        var pctDelta = (dragDelta / (trackWidth || 1)) * 100;
        track.style.transform = 'translateX(' + (base + pctDelta) + '%)';
    }, { passive: true });

    track.addEventListener('touchend', function() {
        if (!isDragging) return;
        isDragging = false;
        var threshold = 50;
        if (dragDelta < -threshold && current < total - 1) goTo(current + 1);
        else if (dragDelta > threshold && current > 0) goTo(current - 1);
        else goTo(current);
    });

    dots.forEach(function(dot, i) {
        dot.addEventListener('click', function() { goTo(i); });
    });
})();

// --- Mobile menu toggle ---
(function() {
    var btn = document.getElementById('mobile-menu-button');
    var menu = document.getElementById('mobile-menu');
    if (btn && menu) {
        btn.addEventListener('click', function() {
            menu.classList.toggle('open');
        });
    }
})();

// --- Navbar scroll ---
window.addEventListener('scroll', function() {
    var nav = document.querySelector('.navbar');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// --- 3D tilt ---
document.querySelectorAll('.tilt-card').forEach(function(card) {
    card.addEventListener('mousemove', function(e) {
        var rect = card.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width - 0.5;
        var y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = 'translateY(-6px) perspective(600px) rotateX(' + (-y * 6) + 'deg) rotateY(' + (x * 6) + 'deg)';
    });
    card.addEventListener('mouseleave', function() { card.style.transform = ''; });
});

// --- Cursor glow ---
['challenges'].forEach(function(id) {
    var section = document.getElementById(id);
    var glow = document.getElementById(id === 'challenges' ? 'challengeGlow' : 'statsGlow');
    if (!section || !glow) return;
    section.addEventListener('mousemove', function(e) {
        var rect = section.getBoundingClientRect();
        glow.style.left = (e.clientX - rect.left) + 'px';
        glow.style.top = (e.clientY - rect.top) + 'px';
        glow.style.opacity = '1';
    });
    section.addEventListener('mouseleave', function() { glow.style.opacity = '0'; });
});

// --- Rotating text ---
(function() {
    var inner = document.querySelector('.rotating-text-inner');
    if (!inner) return;
    var words = inner.querySelectorAll('.rotating-word');
    var totalOriginal = words.length;
    var clone = words[0].cloneNode(true);
    inner.appendChild(clone);
    var totalWithClone = totalOriginal + 1;
    var current = 0;
    setInterval(function() {
        current++;
        inner.style.transition = 'transform 0.45s cubic-bezier(0.65, 0, 0.35, 1)';
        inner.style.transform = 'translateY(-' + (current * 100 / totalWithClone) + '%)';
        if (current === totalOriginal) {
            setTimeout(function() {
                inner.style.transition = 'none';
                current = 0;
                inner.style.transform = 'translateY(0%)';
            }, 470);
        }
    }, 2500);
})();

// --- WHY RETAIN scroll-triggered animations ---
(function() {
    var section = document.getElementById('whyRetainSection');
    if (!section) return;
    var items = section.querySelectorAll('.wr-list-item');
    var icons = section.querySelectorAll('.wr-icon-circle');
    var headerIcons = section.querySelectorAll('.wr-card-header-icon');
    var xShakes = section.querySelectorAll('.wr-x-shake');
    var animated = false;

    var obs = new IntersectionObserver(function(entries) {
        entries.forEach(function(e) {
            if (e.isIntersecting && !animated) {
                animated = true;
                items.forEach(function(item, i) {
                    var delay = parseFloat(item.style.transitionDelay) * 1000 || i * 120;
                    setTimeout(function() { item.classList.add('visible'); }, delay);
                });
                icons.forEach(function(ic, i) {
                    setTimeout(function() { ic.classList.add('visible'); }, 200 + i * 100);
                });
                headerIcons.forEach(function(hi, i) {
                    setTimeout(function() { hi.classList.add('visible'); }, 100 + i * 200);
                });
                xShakes.forEach(function(x, i) {
                    setTimeout(function() {
                        x.classList.add('animate');
                        setTimeout(function() { x.classList.remove('animate'); }, 600);
                    }, 400 + i * 150);
                });
            }
        });
    }, { threshold: 0.2 });
    obs.observe(section);
})();

// --- Chat Widget ---
(function() {
    var session_id = sessionStorage.getItem('chatwidget_session_id');
    if (!session_id) {
        session_id = crypto.randomUUID();
        sessionStorage.setItem('chatwidget_session_id', session_id);
    }

    var container = document.createElement('div');
    container.className = 'chatbot-container';
    container.innerHTML =
        '<div id="chatbot-window" class="chatbot-window">' +
            '<div class="chat-header">' +
                '<div class="chat-header-line"></div>' +
                '<div class="chat-header-info">' +
                    '<div class="chat-avatar-wrap">' +
                        '<img src="https://ui-avatars.com/api/?name=AI&background=f59e0b&color=fff" class="chat-avatar" alt="AI">' +
                        '<span class="chat-avatar-dot"></span>' +
                    '</div>' +
                    '<div>' +
                        '<h4 class="chat-header-name">Aria</h4>' +
                        '<span class="chat-header-status">AI Strategist</span>' +
                    '</div>' +
                '</div>' +
                '<button id="chatbot-close" class="chat-close"><i class="fas fa-times"></i></button>' +
            '</div>' +
            '<div id="chatbot-messages" class="chat-messages">' +
                '<div class="chat-timestamp">Today • Online</div>' +
            '</div>' +
            '<div class="chat-form-wrap">' +
                '<form id="chatbot-form" class="chat-form">' +
                    '<input type="text" id="chatbot-input" class="chat-input" placeholder="Type a message..." autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">' +
                    '<button type="submit" class="chat-send"><i class="fas fa-paper-plane"></i></button>' +
                '</form>' +
            '</div>' +
        '</div>' +
        '<button id="chatbot-toggle" class="chatbot-toggle ripple-active">' +
            '<i id="icon-msg" class="fas fa-comment-dots icon-transition" style="color:#ffffff"></i>' +
            '<i id="icon-close" class="fas fa-chevron-down icon-transition icon-hidden"></i>' +
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
            iconClose.classList.add('icon-hidden');
            btn.style.background = '#111827';
            btn.classList.add('ripple-active');
        } else {
            win.classList.add('is-active');
            iconMsg.classList.add('icon-hidden');
            iconClose.classList.remove('icon-hidden');
            btn.style.background = '#111827';
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
        userMsg.innerText = text;
        messages.appendChild(userMsg);
        requestAnimationFrame(function() { userMsg.classList.add('show'); });
        messages.scrollTo({ top: messages.scrollHeight, behavior: 'smooth' });
        input.value = '';

        var typingBubble = document.createElement('div');
        typingBubble.className = 'chat-message chat-message-bot';
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
