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
    
    // Function to switch tabs programmatically
    window.switchTab = function(tabId) {
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
        
        // Find and activate the target button
        const targetButton = Array.from(tabButtons).find(btn => btn.getAttribute('data-tab') === tabId);
        if (targetButton) {
            targetButton.classList.add('tab-active');
            if (tabId === 'profile') {
                targetButton.classList.remove('bg-white', 'border-gray-200');
                targetButton.classList.add('bg-gradient-to-r', 'from-purple-50', 'to-indigo-50', 'border-purple-200');
            } else if (tabId === 'reply') {
                targetButton.classList.remove('bg-white', 'border-gray-200');
                targetButton.classList.add('bg-blue-50', 'border-blue-200');
            } else if (tabId === 'reach') {
                targetButton.classList.remove('bg-white', 'border-gray-200');
                targetButton.classList.add('bg-green-50', 'border-green-200');
            } else if (tabId === 'upsell') {
                targetButton.classList.remove('bg-white', 'border-gray-200');
                targetButton.classList.add('bg-yellow-50', 'border-yellow-200');
            }
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
    }
    
    // Set the first tab as active by default when the page loads
    // Set the first tab as active by default after ensuring DOM is ready
    function setInitialTab() {
        if (typeof switchTab === 'function') {
            // Small delay to ensure everything is loaded
            setTimeout(() => {
                switchTab('profile'); // Start with the profile tab active
                console.log('Initial tab set to profile');
            }, 200);
        } else {
            // Fallback: ensure at least one tab is active using basic DOM manipulation
            setTimeout(setInitialTab, 100); // Retry
        }
    }
    
    // Call after DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setInitialTab);
    } else {
        setInitialTab();
    }
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            switchTab(tabId);
        });
    });
    
    // Scroll-based tab switching - improved version with accurate calculations
    let ticking = false;
    
    function updateTabsOnScroll() {
        // Ensure switchTab function exists before calling
        if (typeof switchTab !== 'function') {
            console.error('switchTab function is not defined');
            return;
        }
        
        // Find the section by its specific ID
        const sectionContainer = document.getElementById('insights-action-section');
        
        if (!sectionContainer) {
            console.error('Section container not found');
            return;
        }
        
        // Get accurate measurements using a more reliable approach
        const sectionRect = sectionContainer.getBoundingClientRect();
        const sectionTop = window.pageYOffset + sectionRect.top;
        const sectionHeight = sectionContainer.scrollHeight; // Use scrollHeight for full content height
        
        // Calculate viewport center position
        const viewportCenter = window.scrollY + (window.innerHeight / 2);
        
        // Calculate position within the section (0 to 1)
        const positionInSection = (viewportCenter - sectionTop) / sectionHeight;
        
        // Debug logging to help troubleshoot
        // console.log('--- Scroll Debug ---');
        // console.log('Viewport center:', viewportCenter);
        // console.log('Section top:', sectionTop);
        // console.log('Section height:', sectionHeight);
        // console.log('Position in section:', positionInSection);
        // console.log('Section bounds:', sectionTop, 'to', sectionTop + sectionHeight);
        
        // Check if we're within the section vertically
        const isInSection = (viewportCenter >= sectionTop) && (viewportCenter <= (sectionTop + sectionHeight));
        
        if (isInSection) {
            // Normalize position to 0-1 range within the section
            const normalizedPosition = Math.max(0, Math.min(1, positionInSection));
            
            // Switch tabs based on position in section
            if (normalizedPosition >= 0 && normalizedPosition < 0.25) {
                console.log('Switching to profile tab'); // Debug log
                switchTab('profile');
            } else if (normalizedPosition >= 0.25 && normalizedPosition < 0.5) {
                console.log('Switching to reply tab'); // Debug log
                switchTab('reply');
            } else if (normalizedPosition >= 0.5 && normalizedPosition < 0.75) {
                console.log('Switching to reach tab'); // Debug log
                switchTab('reach');
            } else if (normalizedPosition >= 0.75) {
                console.log('Switching to upsell tab'); // Debug log
                switchTab('upsell');
            }
        } else {
            // console.log('Outside section bounds, not switching tabs');
        }
    }
    
    let lastScrollTime = 0;
    const scrollThreshold = 100; // milliseconds - prevents excessive calls
    
    function requestScrollUpdate() {
        const now = performance.now();
        if (now - lastScrollTime >= scrollThreshold) {
            lastScrollTime = now;
            // Direct call instead of using requestAnimationFrame to ensure execution
            setTimeout(updateTabsOnScroll, 0);
        }
    }
    
    // Initialize after DOM is loaded - ensure this runs after everything else
    function initializeScrollHandler() {
        // Verify all required elements exist before initializing
        const sectionContainer = document.getElementById('insights-action-section');
        const tabButtons = document.querySelectorAll('.tab-button');
        
        if (!sectionContainer) {
            console.error('insights-action-section not found, cannot initialize scroll handler');
            return;
        }
        
        if (tabButtons.length === 0) {
            console.error('No tab buttons found, cannot initialize scroll handler');
            return;
        }
        
        console.log(`Initializing scroll handler with ${tabButtons.length} tab buttons`);
        
        // Initial tab setup based on current scroll position
        setTimeout(() => {
            updateTabsOnScroll();
        }, 100);
        
        // Add scroll event listener - use non-passive listener to ensure it works
        window.addEventListener('scroll', requestScrollUpdate, { passive: false });
        console.log("Scroll event listener added");
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(initializeScrollHandler, 100);
        });
    } else {
        // DOM is already loaded
        setTimeout(initializeScrollHandler, 100);
    }
    
    // Fallback initialization
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (typeof updateTabsOnScroll === 'function') {
                updateTabsOnScroll();
            }
        }, 200);
    });
}); // Close the DOMContentLoaded event listener