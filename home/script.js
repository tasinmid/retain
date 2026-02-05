document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded fired!'); // Global Debug Log
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
            cursorEl.style.animation = 'blink 1s infinite step-end';

            if (!isDeleting) {
                textEl.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;

                if (charIndex === currentWord.length) {
                    cursorEl.style.animation = 'none';
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
            cursorEl.style.animation = '';
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
        }, { threshold: 0.5 }); // Start when 50% of the element is visible

        observer.observe(heroContent);
    }

    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Cursor glow & Parallax for solutions section
    const solutionsContainer = document.getElementById('solutions-container');
    if (solutionsContainer) {
        // Cursor glow
        const cursorGlow = document.getElementById('cursor-glow');
        solutionsContainer.addEventListener('mousemove', (e) => {
            const rect = solutionsContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            cursorGlow.style.left = `${x}px`;
            cursorGlow.style.top = `${y}px`;
        });

                    // Parallax
                    const parallaxElements = [
                                        { id: 'solutions-container', strength: 240 },
                                        { id: 'sheen-border-container', strength: 160 },
                                        { id: 'new-sphere-section', strength: 160 }                            ];
        
                    const parallaxContainers = parallaxElements.map(p => ({ ...p, el: document.getElementById(p.id) })).filter(p => p.el);
        
                    if (parallaxContainers.length > 0) {
                        window.addEventListener('scroll', () => {
                            const viewportHeight = window.innerHeight;
                            parallaxContainers.forEach(({ el, strength }) => {
                                const rect = el.getBoundingClientRect();
                                if (rect.top < viewportHeight && rect.bottom > 0) {
                                    const progress = (rect.top + rect.height / 2 - viewportHeight / 2) / (viewportHeight / 2);
                                    let translateY = progress * (strength / 2);

                                    if (el.id === 'solutions-container') {
                                        translateY -= 40; // Apply vertical offset
                                    }

                                    el.style.transform = `translateY(${translateY}px)`;
                                }
                            });

                            // Dynamic centering for the text block
                            const soundFamiliarSection = document.getElementById('sound-familiar-section');
                            const sheenBorderContainer = document.getElementById('sheen-border-container');
                            const dynamicText = document.getElementById('dynamic-center-text');

                            if (soundFamiliarSection && sheenBorderContainer && dynamicText) {
                                const topRect = soundFamiliarSection.getBoundingClientRect();
                                const bottomRect = sheenBorderContainer.getBoundingClientRect();
                                const parentRect = dynamicText.offsetParent.getBoundingClientRect();

                                const topBoundary = topRect.bottom - parentRect.top;
                                const bottomBoundary = bottomRect.top - parentRect.top;
                                
                                const textHeight = dynamicText.offsetHeight;
                                
                                const middle = topBoundary + ((bottomBoundary - topBoundary) * 0.4) - (textHeight / 2);
                                
                                dynamicText.style.top = `${middle}px`;
                            }
                        }, { passive: true });
                    }            }

    // Scroll animation for "Sound familiar?" section
    const soundFamiliarSection = document.getElementById('sound-familiar-section');
    if (soundFamiliarSection) {
        const chatBubbles = [
            { el: document.getElementById('chat-bubble-1'), startX: -40, startY: -20, endX: 0, endY: 0 },
            { el: document.getElementById('chat-bubble-2'), startX: 40, startY: -20, endX: 0, endY: 0 },
            { el: document.getElementById('chat-bubble-3'), startX: -40, startY: 0, endX: 0, endY: 0 },
            { el: document.getElementById('chat-bubble-4'), startX: 40, startY: 0, endX: 0, endY: 0 },
            { el: document.getElementById('chat-bubble-5'), startX: -40, startY: 20, endX: 0, endY: 0 }
        ];

        let targetProgress = 0;
        let currentProgress = 0;
        const lerpFactor = 0.15;

        // Function to set bubbles to final state (for mobile)
        function setBubblesToFinalState() {
            chatBubbles.forEach(bubble => {
                if (bubble.el) {
                    bubble.el.style.transform = `translateX(0) translateY(0)`;
                    bubble.el.style.opacity = 1;
                }
            });
        }

        let isMobileView = window.innerWidth < 768; // Tailwind's 'md' breakpoint

        if (isMobileView) {
            setBubblesToFinalState();
        } else {
            // Animation logic for desktop/tablet
            function update() {
                currentProgress += (targetProgress - currentProgress) * lerpFactor;
                
                chatBubbles.forEach(bubble => {
                    if (bubble.el) {
                        const currentX = bubble.startX * (1 - currentProgress);
                        const currentY = bubble.startY * (1 - currentProgress);
                        bubble.el.style.transform = `translateX(${currentX}%) translateY(${currentY}%)`;
                        bubble.el.style.opacity = currentProgress;
                    }
                });

                requestAnimationFrame(update);
            }

            function onScroll() {
                const sectionTop = soundFamiliarSection.offsetTop;
                const sectionHeight = soundFamiliarSection.offsetHeight;
                const scrollY = window.scrollY;
                const windowHeight = window.innerHeight;

                let progress = (scrollY - sectionTop + windowHeight / 2) / (sectionHeight / 2);
                targetProgress = Math.max(0, Math.min(1, progress));
            }

            window.addEventListener('scroll', onScroll);
            
            // Initial call to set the state
            onScroll();
            // Start the animation loop
            update();
        }

        // Add a listener to reset state on resize if switching between mobile/desktop views
        window.addEventListener('resize', () => {
            const newIsMobileView = window.innerWidth < 768;
            if (isMobileView !== newIsMobileView) {
                location.reload(); // Simple reload to re-evaluate animation logic
            }
        });
    }

    // Carousel for New Sphere Section
    console.log('Carousel script loaded.'); // Debug Log
    const reviewCarousel = document.getElementById('review-carousel');
    const prevReviewBtn = document.getElementById('prev-review');
    const nextReviewBtn = document.getElementById('next-review');
    const reviewItems = reviewCarousel ? reviewCarousel.querySelectorAll(':scope > div') : []; // Select direct children divs

    if (reviewCarousel && prevReviewBtn && nextReviewBtn && reviewItems.length > 0) {
        console.log('Carousel elements found. reviewCarousel:', reviewCarousel, 'prevReviewBtn:', prevReviewBtn, 'nextReviewBtn:', nextReviewBtn, 'reviewItems.length:', reviewItems.length); // Debug Log
        let currentIndex = 0;
        const autoAdvanceInterval = 5000; // 5 seconds
        let autoAdvanceTimer;

        function showReview(index) {
            console.log('showReview() called with index:', index); // Log
            if (index < 0) {
                currentIndex = reviewItems.length - 1;
                console.log('Wrapping to end, new currentIndex:', currentIndex);
            } else if (index >= reviewItems.length) {
                currentIndex = 0;
                console.log('Wrapping to beginning, new currentIndex:', currentIndex);
            } else {
                currentIndex = index;
                console.log('Setting currentIndex:', currentIndex);
            }
            reviewCarousel.style.transform = `translateX(-${currentIndex * 100}%)`;
            console.log('Transform applied:', reviewCarousel.style.transform);
        }

        function nextReview() {
            console.log('nextReview() called!'); // Log
            showReview(currentIndex + 1);
        }

        function prevReview() {
            console.log('prevReview() called!'); // Log
            showReview(currentIndex - 1);
        }

        function startAutoAdvance() {
            console.log('startAutoAdvance() called!'); // Log
            stopAutoAdvance(); // Clear any existing timer
            autoAdvanceTimer = setInterval(nextReview, autoAdvanceInterval);
        }

        function stopAutoAdvance() {
            console.log('stopAutoAdvance() called!'); // Log
            clearInterval(autoAdvanceTimer);
        }

        // Event Listeners
        nextReviewBtn.addEventListener('click', () => {
            console.log('Next button clicked!'); // Log
            nextReview();
        });
        prevReviewBtn.addEventListener('click', () => {
            console.log('Prev button clicked!'); // Log
            prevReview();
        });

        // Start auto-advance initially
        startAutoAdvance();

        // Optional: Pause auto-advance on hover over the carousel container
        const newSphereSection = document.getElementById('new-sphere-section');
        if (newSphereSection) {
            newSphereSection.addEventListener('mouseenter', stopAutoAdvance);
            newSphereSection.addEventListener('mouseleave', startAutoAdvance);
        }
    }
    
    // Tab functionality for "From Insights to Action" section
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    const tabVisualizations = document.querySelectorAll('.tab-viz');
    const tabSection = document.querySelector('.py-16.sm\\:py-24.px-6.lg\\:px-8.bg-gradient-to-br.from-lightPurple.to-white');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Remove active class from all buttons
            tabButtons.forEach(btn => {
                btn.classList.remove('tab-active');
                const btnTabId = btn.getAttribute('data-tab');
                if (btnTabId === 'profile') {
                    btn.classList.remove('bg-gradient-to-r', 'from-purple-50', 'to-indigo-50', 'border-purple-200');
                    btn.classList.add('bg-white', 'border-gray-200');
                } else if (btnTabId === 'reply') {
                    btn.classList.remove('bg-blue-50', 'border-blue-200');
                    btn.classList.add('bg-white', 'border-gray-200');
                } else if (btnTabId === 'reach') {
                    btn.classList.remove('bg-green-50', 'border-green-200');
                    btn.classList.add('bg-white', 'border-gray-200');
                } else if (btnTabId === 'upsell') {
                    btn.classList.remove('bg-yellow-50', 'border-yellow-200');
                    btn.classList.add('bg-white', 'border-gray-200');
                }

            });
            
            // Add active class to clicked button
            button.classList.add('tab-active');
            if (tabId === 'profile') {
                button.classList.remove('bg-white', 'border-gray-200');
                button.classList.add('bg-gradient-to-r', 'from-purple-50', 'to-indigo-50', 'border-purple-200');
            } else if (tabId === 'reply') {
                button.classList.remove('bg-white', 'border-gray-200');
                button.classList.add('bg-blue-50', 'border-blue-200');
            } else if (tabId === 'reach') {
                button.classList.remove('bg-white', 'border-gray-200');
                button.classList.add('bg-green-50', 'border-green-200');
            } else if (tabId === 'upsell') {
                button.classList.remove('bg-white', 'border-gray-200');
                button.classList.add('bg-yellow-50', 'border-yellow-200');
            }
            
            // Hide all content sections
            tabContents.forEach(content => {
                content.classList.remove('active');
                content.classList.add('hidden');
            });
            
            // Show corresponding content
            document.getElementById(`${tabId}-content`).classList.remove('hidden');
            document.getElementById(`${tabId}-content`).classList.add('active');
            
            // Hide all visualization sections
            tabVisualizations.forEach(viz => {
                viz.classList.remove('active');
                viz.classList.add('hidden');
            });
            
            // Show corresponding visualization
            document.getElementById(`${tabId}-viz`).classList.remove('hidden');
            document.getElementById(`${tabId}-viz`).classList.add('active');
        });
    });
    
    // Split heading animation for integration section
    const splitHeadingTop = document.getElementById('split-heading-top');
    const splitHeadingBottom = document.getElementById('split-heading-bottom');
    
    if (splitHeadingTop && splitHeadingBottom) {
        const headingObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    window.addEventListener('scroll', handleSplitHeadingAnimation, { passive: true });
                } else {
                    window.removeEventListener('scroll', handleSplitHeadingAnimation);
                }
            });
        }, { threshold: 0.5 }); // Trigger when 50% of section is visible
        
        headingObserver.observe(splitHeadingTop.parentElement.parentElement); // Observe the section
        
        function handleSplitHeadingAnimation() {
            const rect = splitHeadingTop.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const scrollPosition = window.scrollY + windowHeight / 2;
            const elementPosition = rect.top + window.scrollY + rect.height / 2;
            const distanceFromCenter = scrollPosition - elementPosition;
            const maxDistance = windowHeight / 2;
            const scrollPercentage = Math.max(-1, Math.min(1, distanceFromCenter / maxDistance));
            
            // Move first line left to right, second line right to left
            const offset = scrollPercentage * 50; // Max 50px movement, maintaining direction
            splitHeadingTop.style.transform = `translateX(${offset}px)`;
            splitHeadingBottom.style.transform = `translateX(${-offset}px)`;
            
            // Add slight fade effect for depth
            const opacity = 1 - Math.abs(scrollPercentage) * 0.3;
            splitHeadingTop.style.opacity = opacity;
            splitHeadingBottom.style.opacity = opacity;
        }
    }
    
    // Scroll-based tab switching functionality
    if (tabSection) {
        const tabIds = ['profile', 'reply', 'reach', 'upsell'];
        
        // Observer to detect when section is in view
        const tabObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add scroll event listener when section comes into view
                    window.addEventListener('scroll', handleScroll, { passive: true });
                } else {
                    // Remove scroll event listener when section goes out of view
                    window.removeEventListener('scroll', handleScroll);
                }
            });
        }, { threshold: 0.5 }); // Trigger when 50% of section is visible
        
        tabObserver.observe(tabSection);
        
        function handleScroll() {
            // Calculate the scroll position relative to the section
            const rect = tabSection.getBoundingClientRect();
            const sectionTop = rect.top + window.scrollY;
            const sectionHeight = rect.height;
            const scrollPosition = window.scrollY + window.innerHeight / 2;
            
            // Calculate the percentage of the section scrolled through
            const scrollPercentage = Math.max(0, Math.min(1, (scrollPosition - sectionTop) / sectionHeight));
            
            // Determine which tab should be active based on scroll position
            const tabIndex = Math.floor(scrollPercentage * tabIds.length);
            const activeTabIndex = Math.min(tabIndex, tabIds.length - 1);
            const activeTabId = tabIds[activeTabIndex];
            
            // Switch to the calculated tab
            switchToTab(activeTabId);
        }
        
        function switchToTab(tabId) {
            // Find the button for this tab
            const targetButton = document.querySelector(`.tab-button[data-tab="${tabId}"]`);
            
            if (targetButton && !targetButton.classList.contains('tab-active')) {
                // Simulate a click on the target button to activate it
                targetButton.click();
            }
        }
    }
});

// Click-only dropdown functionality for the "Join us and deliver the Next Best Touchpoint" section
document.addEventListener("DOMContentLoaded", function() {
    const dropdownButtons = document.querySelectorAll(".ultra-smooth-dropdown-btn");
    let currentOpenIndex = -1;
    let isAnimating = false;
    
    // Only keep click functionality - remove hover functionality
    dropdownButtons.forEach(button => {
        button.addEventListener("click", function(e) {
            const buttonIndex = Array.from(dropdownButtons).indexOf(button);
            const content = this.nextElementSibling;
            const icon = this.querySelector("i");
            const isOpen = !content.classList.contains("max-h-0");
            
            if (isOpen) {
                // User wants to close this one
                const scrollHeight = content.scrollHeight;
                content.style.maxHeight = scrollHeight + "px";
                content.style.opacity = "1";
                
                // Force reflow
                void content.offsetWidth;
                
                content.style.maxHeight = "0px";
                content.style.opacity = "0";
                
                // Remove rotation from icon
                icon.classList.remove("rotate-180");
                
                // Add classes after animation completes
                setTimeout(() => {
                    content.classList.add("max-h-0");
                    content.classList.add("opacity-0");
                    currentOpenIndex = -1;
                }, 120); // Even faster close animation
            } else {
                // User wants to open this one - close others first
                // Close currently open dropdown
                if (currentOpenIndex !== -1 && currentOpenIndex !== buttonIndex) {
                    const currentButton = dropdownButtons[currentOpenIndex];
                    const currentContent = currentButton.nextElementSibling;
                    const currentIcon = currentButton.querySelector("i");
                    
                    const scrollHeight = currentContent.scrollHeight;
                    currentContent.style.maxHeight = scrollHeight + "px";
                    currentContent.style.opacity = "1";
                    
                    // Force reflow
                    void currentContent.offsetWidth;
                    
                    currentContent.style.maxHeight = "0px";
                    currentContent.style.opacity = "0";
                    
                    // Remove rotation from icon
                    currentIcon.classList.remove("rotate-180");
                    
                    // Add classes after animation completes
                    setTimeout(() => {
                        currentContent.classList.add("max-h-0");
                        currentContent.classList.add("opacity-0");
                        
                        // Now open the clicked dropdown
                        setTimeout(() => {
                            content.classList.remove("max-h-0", "opacity-0");
                            content.style.maxHeight = content.scrollHeight + "px";
                            content.style.opacity = "1";
                            icon.classList.add("rotate-180");
                            
                            currentOpenIndex = buttonIndex;
                        }, 8); // Even faster buffer
                    }, 120); // Even faster close animation
                } else {
                    // Open the clicked dropdown directly
                    content.classList.remove("max-h-0", "opacity-0");
                    content.style.maxHeight = content.scrollHeight + "px";
                    content.style.opacity = "1";
                    icon.classList.add("rotate-180");
                    
                    currentOpenIndex = buttonIndex;
                }
            }
        });
    });
});

// Chatbot functionality
(function() {
    // ---- 1. Inject Styles ----
    const style = document.createElement('style');
    style.innerHTML = `
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');
    `;
    document.head.appendChild(style);

    // ---- 2. Session ID ----
    let session_id = sessionStorage.getItem('chatwidget_session_id');
    if (!session_id) {
        session_id = crypto.randomUUID();
        sessionStorage.setItem('chatwidget_session_id', session_id);
    }

    // ---- 3. Inject HTML ----
    const container = document.createElement('div');
    container.id = 'chatbot-container';
    container.className = 'fixed bottom-8 right-8 z-[9999] flex flex-col items-end font-sans';
    container.innerHTML = `
        <div id="chatbot-window" class="mb-6 w-96 max-w-[90vw] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-100" style="height:600px;">
            <div class="glass-header p-6 text-white flex justify-between items-center relative overflow-hidden shrink-0" style="background: rgba(15,23,42,0.9); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);">
                <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-cyan-400"></div>
                <div class="flex items-center gap-4">
                    <div class="relative">
                        <img src="https://ui-avatars.com/api/?name=AI&background=10b981&color=fff" class="w-12 h-12 rounded-full border-2 border-emerald-500/30 shadow-lg">
                        <span class="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-slate-900 rounded-full"></span>
                    </div>
                    <div>
                        <h4 class="font-bold text-lg leading-none">Aria</h4>
                        <span class="text-xs text-emerald-300 font-medium tracking-wide uppercase">AI Strategist</span>
                    </div>
                </div>
                <button id="chatbot-close" class="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-all text-slate-300"><i class="fas fa-times text-lg"></i></button>
            </div>

            <div id="chatbot-messages" class="flex-1 flex flex-col overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-slate-50 to-white no-scrollbar">
                <div class="text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Today • Online</div>
            </div>

            <div class="p-6 bg-white border-t border-slate-50 flex-shrink-0">
                <form id="chatbot-form" class="flex items-center gap-3 bg-slate-100 rounded-2xl px-5 py-3 w-full">
                    <input type="text" id="chatbot-input" placeholder="Type a message..." class="bg-transparent border-none outline-none flex-1 text-sm"
                        autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
                    <button type="submit" class="text-emerald-500 transition-transform hover:scale-110"><i class="fas fa-paper-plane text-lg"></i></button>
                </form>
            </div>
        </div>

        <button id="chatbot-toggle" class="ripple-active relative w-16 h-16 bg-slate-900 text-white rounded-full shadow-2xl flex items-center justify-center z-[10000] focus:outline-none">
            <i id="icon-msg" class="fas fa-comment-dots text-2xl absolute icon-transition"></i>
            <i id="icon-close" class="fas fa-chevron-down text-2xl absolute icon-transition opacity-0 -rotate-90 scale-50"></i>
        </button>
    `;
    document.body.appendChild(container);

    // ---- 4. Toggle Logic ----
    const btn = document.getElementById('chatbot-toggle');
    const win = document.getElementById('chatbot-window');
    const iconMsg = document.getElementById('icon-msg');
    const iconClose = document.getElementById('icon-close');
    const closeBtn = document.getElementById('chatbot-close');

    function toggleChat() {
        const isActive = win.classList.contains('is-active');
        if (isActive) {
            win.classList.remove('is-active');
            iconMsg.classList.remove('opacity-0','rotate-90','scale-50');
            iconClose.classList.add('opacity-0','-rotate-90','scale-50');
            btn.style.backgroundColor = '#0f172a';
            btn.style.color = '#ffffff';
            btn.classList.add('ripple-active');
        } else {
            win.classList.add('is-active');
            iconMsg.classList.add('opacity-0','rotate-90','scale-50');
            iconClose.classList.remove('opacity-0','-rotate-90','scale-50');
            btn.style.backgroundColor = '#ffffff';
            btn.style.color = '#0f172a';
            btn.classList.remove('ripple-active');
        }
    }

    btn.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', toggleChat);

    // ---- 5. Message Sending + Persistent Typing ----
    const form = document.getElementById('chatbot-form');
    const input = document.getElementById('chatbot-input');
    const messages = document.getElementById('chatbot-messages');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        const text = input.value.trim();
        if (!text) return;

        // ---- User bubble ----
        const userMsg = document.createElement('div');
        userMsg.className = 'bg-slate-900 text-white p-4 rounded-3xl rounded-br-none shadow text-sm self-end chat-message';
        userMsg.style.maxWidth = 'fit-content';
        userMsg.style.maxWidth = '80%';
        userMsg.innerText = text;
        messages.appendChild(userMsg);
        requestAnimationFrame(() => userMsg.classList.add('show'));
        messages.scrollTo({ top: messages.scrollHeight, behavior: 'smooth' });
        input.value = '';

        // ---- AI typing bubble ----
        const typingBubble = document.createElement('div');
        typingBubble.className = 'bg-white text-black p-4 rounded-3xl rounded-bl-none shadow text-sm self-start chat-message';
        typingBubble.style.maxWidth = 'fit-content';
        typingBubble.style.maxWidth = '80%';
        typingBubble.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
        messages.appendChild(typingBubble);
        requestAnimationFrame(() => typingBubble.classList.add('show'));
        messages.scrollTo({ top: messages.scrollHeight, behavior: 'smooth' });

        // ---- Send POST request ----
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
        })
        // No catch: typing bubble stays until reply arrives
    });
})();