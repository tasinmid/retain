// === About Page Scripts ===

document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // ---- Mobile Menu Toggle ----
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
        });
    }

    // ---- Scroll Reveal Animation ----
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ---- Core Values Section Animation ----
    const coreValuesSection = document.querySelector('.core-values-section');
    
    if (coreValuesSection) {
        const coreValuesTitle = document.querySelector('.core-values-title');
        const coreValuesWrapper = document.querySelector('.core-values-wrapper');
        const titleHighlightContent = document.querySelector('.title-highlight-content');
        const titleHighlightMark = document.querySelector('.title-highlight-mark');
        
        const isMobile = window.innerWidth <= 767;

        // Pinning timeline - cards scroll up from underneath
        const coreValuesCardsTl = gsap.timeline({
            scrollTrigger: {
                trigger: coreValuesSection,
                scrub: 1,
                pin: true,
                anticipatePin: 1,
                start: 'top top',
                end: "+=" + (coreValuesWrapper.scrollHeight * 1.1) + "px",
                toggleActions: 'play pause pause pause',
            }
        });

        coreValuesCardsTl.fromTo(coreValuesWrapper, 
            { top: '100%' }, 
            { top: "-" + (coreValuesWrapper.scrollHeight * 0.8) + "px" }
        );

        // Title animation - scales up and centers
        gsap.timeline({
            scrollTrigger: {
                trigger: coreValuesSection,
                start: 'top 80%',
                end: 'top 20%',
                scrub: 1,
                toggleActions: 'play pause pause pause',
            }
        })
        .set(titleHighlightMark, { width: '0%' })
        .set(coreValuesTitle, { y: 100 })
        .to(coreValuesTitle, {
            scale: isMobile ? 2 : 3.5,
            y: coreValuesSection.offsetHeight / 2 - (isMobile ? coreValuesTitle.offsetHeight * 1.4 : coreValuesTitle.offsetHeight * 1.2),
            ease: 'power3.inOut'
        })
        .to(titleHighlightMark, { width: '100%', ease: 'power3.inOut', delay: 0.5, rotate: '-2deg' }, "<")
        .to(titleHighlightContent, { color: '#fff', delay: 0.2 }, "<");
    }
});