document.addEventListener('DOMContentLoaded', () => {

    // --- Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- Navbar Glass Effect on Scroll ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 12, 0.8)';
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.03)';
            navbar.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.37)';
        }
    });

    // --- Horizontal Scroll for Menu Carousel ---
    const carousel = document.getElementById('menu-carousel');
    const btnLeft = document.getElementById('scroll-left');
    const btnRight = document.getElementById('scroll-right');

    const scrollAmount = 350; // Amount to scroll per click

    if (btnLeft && btnRight && carousel) {
        btnLeft.addEventListener('click', () => {
            carousel.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        btnRight.addEventListener('click', () => {
            carousel.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
    }

    // --- Intersection Observer for Scroll Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const fadeInElements = document.querySelectorAll('.fade-in');

    // Initially pause animations by resetting the animation property
    fadeInElements.forEach(el => {
        el.style.animationPlayState = 'paused';
    });

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Resume animation when in view
                entry.target.style.animationPlayState = 'running';

                // Add tiny delay for child elements if they are cards (staggering effect)
                if (entry.target.classList.contains('menu-section')) {
                    const cards = entry.target.querySelectorAll('.pizza-card');
                    cards.forEach((card, index) => {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(30px)';
                        setTimeout(() => {
                            card.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 150 * (index + 1));
                    });
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeInElements.forEach(el => {
        observer.observe(el);
    });

    // --- Promo Badge Text Cycling ---
    const promoBadge = document.getElementById('promo-badge');
    if (promoBadge) {
        const messages = [
            'Deals Open Now',
            'Deals Open Now',
            'LIMITED TIME OFFERS'
        ];
        let currentMsgIndex = 0;

        setInterval(() => {
            promoBadge.style.opacity = '0';
            promoBadge.style.transform = 'translateY(-10px)';

            setTimeout(() => {
                currentMsgIndex = (currentMsgIndex + 1) % messages.length;
                promoBadge.textContent = messages[currentMsgIndex];
                promoBadge.style.opacity = '1';
                promoBadge.style.transform = 'translateY(0)';
            }, 500);
        }, 4000);
    }
});
