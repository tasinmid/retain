document.addEventListener('DOMContentLoaded', () => {
    // Typewriter Effect
    const heroContent = document.getElementById('hero-content');
    const typewriterWrapper = document.getElementById('typewriter-wrapper');
    const textEl = document.getElementById('typewriter-text');
    const cursorEl = document.getElementById('typewriter-cursor');
    
    if (heroContent && typewriterWrapper && textEl && cursorEl) {
        const words = ["scratch", "void", "nothing", "Zero"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let timeoutId;

        const typeSpeed = 100;
        const deleteSpeed = 50;
        const pauseDuration = 2000;

        function type() {
            const currentWord = words[wordIndex];
            cursorEl.classList.add('cursor-blinking');

            if (!isDeleting) {
                textEl.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;

                if (charIndex === currentWord.length) {
                    cursorEl.classList.remove('cursor-blinking');
                    timeoutId = setTimeout(() => {
                        isDeleting = true;
                        type();
                    }, pauseDuration);
                    return;
                }
            } else {
                textEl.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;

                if (charIndex === 0) {
                    isDeleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                }
            }

            timeoutId = setTimeout(type, isDeleting ? deleteSpeed : typeSpeed);
        }
        
        function reset() {
            clearTimeout(timeoutId);
            textEl.textContent = '';
            wordIndex = 0;
            charIndex = 0;
            isDeleting = false;
            cursorEl.classList.remove('cursor-blinking');
        }

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!typewriterWrapper.classList.contains('is-typing')) {
                        typewriterWrapper.classList.add('is-typing');
                        reset();
                        type();
                    }
                } else {
                    if (typewriterWrapper.classList.contains('is-typing')) {
                        typewriterWrapper.classList.remove('is-typing');
                        reset();
                    }
                }
            });
        }, { threshold: 0.5 });

        observer.observe(heroContent);
    }

    // Mobile Menu Toggle (uses "open" class instead of "hidden")
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
        });
    }

    // Cache scroll animation elements
    const solutionsContainer = document.getElementById('solutions-container');
    const cursorGlow = document.getElementById('cursor-glow');
    const parallaxElements = [
        { id: 'solutions-container', strength: 120, el: null },
        { id: 'sheen-border-container', strength: 80, el: null }
    ];
    parallaxElements.forEach(p => { p.el = document.getElementById(p.id); });

    const soundFamiliarSection = document.getElementById('sound-familiar-section');
    const chatBubbles = [
        { el: document.getElementById('chat-bubble-1'), startX: -40, startY: -20, endX: 0, endY: 0 },
        { el: document.getElementById('chat-bubble-2'), startX: 40, startY: -20, endX: 0, endY: 0 },
        { el: document.getElementById('chat-bubble-3'), startX: -40, startY: 0, endX: 0, endY: 0 },
        { el: document.getElementById('chat-bubble-4'), startX: 40, startY: 0, endX: 0, endY: 0 },
        { el: document.getElementById('chat-bubble-5'), startX: -40, startY: 20, endX: 0, endY: 0 }
    ];

    const splitHeadingTop = document.getElementById('split-heading-top');
    const splitHeadingBottom = document.getElementById('split-heading-bottom');
    const tabSection = document.getElementById('insights-section');

    // Cursor glow (mousemove - separate because it's not scroll-based)
    if (solutionsContainer && cursorGlow) {
        solutionsContainer.addEventListener('mousemove', (e) => {
            const rect = solutionsContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            cursorGlow.style.left = `${x}px`;
            cursorGlow.style.top = `${y}px`;
        });
    }

    // UNIFIED SCROLL HANDLER - single RAF for all scroll animations
    let unifiedRAF = null;
    let isMobileView = window.innerWidth < 768;
    
    function setBubblesToFinalState() {
        chatBubbles.forEach(bubble => {
            if (bubble.el) {
                bubble.el.style.transform = `translateX(0) translateY(0)`;
                bubble.el.style.opacity = 1;
            }
        });
    }

    function applyProgress(progress) {
        chatBubbles.forEach(bubble => {
            if (bubble.el) {
                const currentX = bubble.startX * (1 - progress);
                const currentY = bubble.startY * (1 - progress);
                bubble.el.style.transform = `translateX(${currentX}%) translateY(${currentY}%)`;
                bubble.el.style.opacity = progress;
            }
        });
    }

    isMobileView = window.innerWidth < 768;
    if (isMobileView) {
        setBubblesToFinalState();
    }

    // Tab functionality for "From Insights to Action" section
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    const tabVisualizations = document.querySelectorAll('.tab-viz');
    const tabIds = ['profile', 'reply', 'reach', 'upsell'];

    // Active style class map for tab buttons
    const tabActiveStyles = {
        profile: 'tab-profile-active',
        reply: 'tab-reply-active',
        reach: 'tab-reach-active',
        upsell: 'tab-upsell-active'
    };
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Only work on desktop (mobile has auto-swap instead)
            if (window.innerWidth <= 768) return;
            
            const tabId = button.getAttribute('data-tab');
            
            // Remove active class from all buttons
            tabButtons.forEach(btn => {
                btn.classList.remove('tab-active');
                const btnTabId = btn.getAttribute('data-tab');
                if (tabActiveStyles[btnTabId]) {
                    btn.classList.remove(tabActiveStyles[btnTabId]);
                }
            });
            
            // Add active class to clicked button
            button.classList.add('tab-active');
            if (tabActiveStyles[tabId]) {
                button.classList.add(tabActiveStyles[tabId]);
            }
            
            // Hide all content sections
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Show corresponding content
            const activeContent = document.getElementById(`${tabId}-content`);
            if (activeContent) activeContent.classList.add('active');
            
            // Hide all visualization sections
            tabVisualizations.forEach(viz => {
                viz.classList.remove('active');
            });
            
            // Show corresponding visualization
            const activeViz = document.getElementById(`${tabId}-viz`);
            if (activeViz) activeViz.classList.add('active');
        });
    });
    
    // Mobile auto-swap functionality for visualization panels
    function setupMobileAutoSwap() {
        const tabVizElements = document.querySelectorAll('.tab-viz');
        if (tabVizElements.length === 0) return;
        
        const tabIds = ['profile', 'reply', 'reach', 'upsell'];
        let currentIndex = 0;
        let autoSwapInterval = null;
        
        function showTab(index) {
            // Get current and next visualization panels
            const currentViz = document.getElementById(`${tabIds[currentIndex]}-viz`);
            const nextViz = document.getElementById(`${tabIds[index]}-viz`);
            
            if (!currentViz || !nextViz) return;
            
            // Position next panel off-screen to the RIGHT
            nextViz.classList.remove('active', 'swipe-out', 'swipe-in');
            nextViz.style.transform = 'translateX(100%)';
            nextViz.style.opacity = '0';
            
            // Force reflow to ensure styles are applied
            nextViz.offsetHeight;
            
            // Start swipe-out animation on current panel (move LEFT)
            currentViz.classList.remove('active');
            currentViz.classList.add('swipe-out');
            
            // After current panel starts moving, start swipe-in animation on next panel
            setTimeout(() => {
                nextViz.classList.add('swipe-in', 'active');
                nextViz.style.transform = '';
                nextViz.style.opacity = '';
            }, 150); // Slightly longer delay for better visibility
            
            // Clean up animation classes after animation completes
            setTimeout(() => {
                currentViz.classList.remove('swipe-out');
                nextViz.classList.remove('swipe-in');
                // Reset transform for next cycle
                currentViz.style.transform = '';
                currentViz.style.opacity = '';
            }, 800);
            
            currentIndex = index;
        }
        
        function startAutoSwap() {
            if (autoSwapInterval) clearInterval(autoSwapInterval);
            
            autoSwapInterval = setInterval(() => {
                const nextIndex = (currentIndex + 1) % tabIds.length;
                showTab(nextIndex);
            }, 2500); // Switch every 2.5 seconds
        }
        
        function stopAutoSwap() {
            if (autoSwapInterval) {
                clearInterval(autoSwapInterval);
                autoSwapInterval = null;
            }
        }
        
        function checkAndSetup() {
            if (window.innerWidth <= 768) {
                // Mobile: start auto-swap
                // Reset all panels to starting position
                tabVizElements.forEach(viz => {
                    viz.classList.remove('active', 'swipe-out', 'swipe-in');
                    // Position all panels off-screen to the RIGHT
                    viz.style.transform = 'translateX(100%)';
                    viz.style.opacity = '0';
                });
                
                // Show first tab (center position)
                const firstViz = document.getElementById(`${tabIds[0]}-viz`);
                if (firstViz) {
                    firstViz.classList.add('active');
                    firstViz.style.transform = '';
                    firstViz.style.opacity = '';
                }
                
                startAutoSwap();
            } else {
                // Desktop: stop auto-swap
                stopAutoSwap();
                // Ensure first tab is shown (desktop tab switching will handle this)
            }
        }
        
        // Initial setup
        checkAndSetup();
        
        // Re-check on resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(checkAndSetup, 250);
        });
    }
    
    // Initialize mobile auto-swap
    setupMobileAutoSwap();

    // UNIFIED SCROLL HANDLER - single RAF for all scroll animations
    let currentTabId = null;
    
    function switchToTab(tabId) {
        if (currentTabId === tabId) return;
        currentTabId = tabId;
        const targetButton = document.querySelector(`.tab-button[data-tab="${tabId}"]`);
        if (targetButton && !targetButton.classList.contains('tab-active')) {
            targetButton.click();
        }
    }
    
    function unifiedScrollHandler() {
        const viewportHeight = window.innerHeight;
        const scrollY = window.scrollY;

        // 1. Parallax for solutions section - DISABLED (removed floating from "How to achieve it?")
        // if (solutionsContainer) {
        //     const rect = solutionsContainer.getBoundingClientRect();
        //     if (rect.top < viewportHeight && rect.bottom > 0) {
        //         const progress = (rect.top + rect.height / 2 - viewportHeight / 2) / (viewportHeight / 2);
        //         let translateY = progress * 60 - 40;
        //         solutionsContainer.style.transform = `translateY(${translateY}px)`;
        //     }
        // }

        // Parallax for sheen-border-container - DISABLED (removed floating from "goal" section)
        // const sheenBorderContainer = document.getElementById('sheen-border-container');
        // if (sheenBorderContainer) {
        //     const rect = sheenBorderContainer.getBoundingClientRect();
        //     if (rect.top < viewportHeight && rect.bottom > 0) {
        //         const progress = (rect.top + rect.height / 2 - viewportHeight / 2) / (viewportHeight / 2);
        //         const translateY = progress * 40;
        //         sheenBorderContainer.style.transform = `translateY(${translateY}px)`;
        //     }
        // }

        // Dynamic centering for text block - DISABLED (connected to floating sections)
        // const dynamicText = document.getElementById('dynamic-center-text');
        // if (soundFamiliarSection && sheenBorderContainer && dynamicText) {
        //     const topRect = soundFamiliarSection.getBoundingClientRect();
        //     const bottomRect = sheenBorderContainer.getBoundingClientRect();
        //     
        //     const topBoundary = topRect.bottom;
        //     const bottomBoundary = bottomRect.top;
        //     const textHeight = dynamicText.offsetHeight;
        //     const middle = (topBoundary + bottomBoundary) * 0.4 - textHeight / 2;
        //     
        //     dynamicText.style.transform = `translateY(${middle}px)`;
        // }

        // 2. Chat bubbles animation for "Sound familiar?" section
        if (soundFamiliarSection && !isMobileView) {
            const rect = soundFamiliarSection.getBoundingClientRect();
            let progress = (viewportHeight - rect.top) / (viewportHeight * 0.6);
            progress = Math.max(0, Math.min(1, progress));
            applyProgress(progress);
        }

        // 3. Split heading animation for integration section
        if (splitHeadingTop && splitHeadingBottom) {
            const rect = splitHeadingTop.getBoundingClientRect();
            const scrollPosition = scrollY + viewportHeight / 2;
            const elementPosition = rect.top + scrollY + rect.height / 2;
            const distanceFromCenter = scrollPosition - elementPosition;
            const maxDistance = viewportHeight / 2;
            const scrollPercentage = Math.max(-1, Math.min(1, distanceFromCenter / maxDistance));
            
            const offset = scrollPercentage * 50;
            splitHeadingTop.style.transform = `translateX(${offset}px)`;
            splitHeadingBottom.style.transform = `translateX(${-offset}px)`;
            splitHeadingTop.style.opacity = 1 - Math.abs(scrollPercentage) * 0.3;
            splitHeadingBottom.style.opacity = 1 - Math.abs(scrollPercentage) * 0.3;
        }

        // 4. Scroll-based tab switching
        if (tabSection && window.innerWidth > 768) {
            const rect = tabSection.getBoundingClientRect();
            const sectionTop = rect.top + scrollY;
            const sectionHeight = rect.height;
            const scrollPosition = scrollY + viewportHeight / 2;
            
            const scrollPercentage = Math.max(0, Math.min(1, (scrollPosition - sectionTop) / sectionHeight));
            const tabIndex = Math.min(Math.floor(scrollPercentage * tabIds.length), tabIds.length - 1);
            switchToTab(tabIds[tabIndex]);
        }

        unifiedRAF = null;
    }

    // Single scroll listener with RAF
    window.addEventListener('scroll', () => {
        if (!unifiedRAF) {
            unifiedRAF = requestAnimationFrame(unifiedScrollHandler);
        }
    }, { passive: true });

    // Initial calls
    unifiedScrollHandler();

    // Handle resize
    window.addEventListener('resize', () => {
        const newIsMobileView = window.innerWidth < 768;
        if (isMobileView !== newIsMobileView) {
            isMobileView = newIsMobileView;
            if (isMobileView) {
                setBubblesToFinalState();
            }
            unifiedScrollHandler();
        }
    });
});

// Click-only dropdown functionality
document.addEventListener("DOMContentLoaded", function() {
    const dropdownButtons = document.querySelectorAll(".ultra-smooth-dropdown-btn");
    let currentOpenIndex = -1;
    let touchStartY = 0;
    let touchStartX = 0;
    
    dropdownButtons.forEach(button => {
        // Handle both mouse click and touch
        button.addEventListener("click", function(e) {
            // On mobile, we might get both touch and click events
            // Only process if this seems like a genuine click/tap
            processDropdown(this);
        });
        
        // Add touchstart to capture the initial touch position
        button.addEventListener("touchstart", function(e) {
            touchStartY = e.touches[0].clientY;
            touchStartX = e.touches[0].clientX;
        }, { passive: true });
        
        // Use touchend to handle the tap
        button.addEventListener("touchend", function(e) {
            const touchEndY = e.changedTouches[0].clientY;
            const touchEndX = e.changedTouches[0].clientX;
            
            // Only process if it's a tap (not a scroll)
            // Check if movement is minimal (less than 10px)
            const deltaY = Math.abs(touchEndY - touchStartY);
            const deltaX = Math.abs(touchEndX - touchStartX);
            
            if (deltaY < 10 && deltaX < 10) {
                e.preventDefault();
                processDropdown(this);
            }
        }, { passive: false });
        
        function processDropdown(buttonElement) {
            const buttonIndex = Array.from(dropdownButtons).indexOf(buttonElement);
            const content = buttonElement.nextElementSibling;
            const icon = buttonElement.querySelector(".dropdown-chevron");
            const isOpen = content.classList.contains("dropdown-open");
            
            if (isOpen) {
                content.classList.remove("dropdown-open");
                icon.classList.remove("rotate-180");
                currentOpenIndex = -1;
            } else {
                // Close currently open dropdown
                if (currentOpenIndex !== -1 && currentOpenIndex !== buttonIndex) {
                    const currentButton = dropdownButtons[currentOpenIndex];
                    const currentContent = currentButton.nextElementSibling;
                    const currentIcon = currentButton.querySelector(".dropdown-chevron");
                    
                    currentContent.classList.remove("dropdown-open");
                    currentIcon.classList.remove("rotate-180");
                    
                    setTimeout(() => {
                        content.classList.add("dropdown-open");
                        icon.classList.add("rotate-180");
                        currentOpenIndex = buttonIndex;
                    }, 100);
                } else {
                    content.classList.add("dropdown-open");
                    icon.classList.add("rotate-180");
                    currentOpenIndex = buttonIndex;
                }
            }
        }
    });
});

// Chatbot functionality
(function() {
    // Session ID
    let session_id = sessionStorage.getItem('chatwidget_session_id');
    if (!session_id) {
        session_id = crypto.randomUUID();
        sessionStorage.setItem('chatwidget_session_id', session_id);
    }

    // Inject HTML using semantic CSS classes (no Tailwind)
    const container = document.createElement('div');
    container.id = 'chatbot-container';
    container.className = 'chatbot-container';
    container.innerHTML = `
        <div id="chatbot-window">
            <div class="chatbot-header">
                <div class="chatbot-header-bar"></div>
                <div class="chatbot-header-left">
                    <div class="chatbot-avatar-wrapper">
                        <img src="https://ui-avatars.com/api/?name=AI&background=10b981&color=fff" class="chatbot-avatar" alt="AI Avatar">
                        <span class="chatbot-online-dot"></span>
                    </div>
                    <div>
                        <h4 class="chatbot-name">Aria</h4>
                        <span class="chatbot-role">AI Strategist</span>
                    </div>
                </div>
                <button id="chatbot-close" class="chatbot-close"><i class="fas fa-times"></i></button>
            </div>

            <div id="chatbot-messages" class="no-scrollbar">
                <div class="chatbot-timestamp">Today • Online</div>
            </div>

            <div class="chatbot-input-area">
                <form id="chatbot-form">
                    <input type="text" id="chatbot-input" placeholder="Type a message..."
                        autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
                    <button type="submit" class="chatbot-send"><i class="fas fa-paper-plane"></i></button>
                </form>
            </div>
        </div>

        <button id="chatbot-toggle" class="chatbot-toggle ripple-active">
            <i id="icon-msg" class="fas fa-comment-dots icon-transition"></i>
            <i id="icon-close" class="fas fa-chevron-down icon-transition chatbot-icon-close-hidden"></i>
        </button>
    `;
    document.body.appendChild(container);

    // Toggle Logic
    const btn = document.getElementById('chatbot-toggle');
    const win = document.getElementById('chatbot-window');
    const iconMsg = document.getElementById('icon-msg');
    const iconClose = document.getElementById('icon-close');
    const closeBtn = document.getElementById('chatbot-close');

    function toggleChat() {
        const isActive = win.classList.contains('is-active');
        if (isActive) {
            win.classList.remove('is-active');
            iconMsg.classList.remove('chatbot-icon-hidden');
            iconClose.classList.add('chatbot-icon-close-hidden');
            btn.classList.remove('chatbot-toggle-active');
            btn.classList.add('ripple-active');
        } else {
            win.classList.add('is-active');
            iconMsg.classList.add('chatbot-icon-hidden');
            iconClose.classList.remove('chatbot-icon-close-hidden');
            btn.classList.add('chatbot-toggle-active');
            btn.classList.remove('ripple-active');
        }
    }

    btn.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', toggleChat);

    // Message Sending
    const form = document.getElementById('chatbot-form');
    const input = document.getElementById('chatbot-input');
    const messages = document.getElementById('chatbot-messages');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        const text = input.value.trim();
        if (!text) return;

        // User bubble
        const userMsg = document.createElement('div');
        userMsg.className = 'chat-msg-user chat-message';
        userMsg.innerText = text;
        messages.appendChild(userMsg);
        requestAnimationFrame(() => userMsg.classList.add('show'));
        messages.scrollTo({ top: messages.scrollHeight, behavior: 'smooth' });
        input.value = '';

        // AI typing bubble
        const typingBubble = document.createElement('div');
        typingBubble.className = 'chat-msg-bot chat-message';
        typingBubble.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
        messages.appendChild(typingBubble);
        requestAnimationFrame(() => typingBubble.classList.add('show'));
        messages.scrollTo({ top: messages.scrollHeight, behavior: 'smooth' });

        // Send POST request
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
