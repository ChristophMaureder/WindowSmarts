// Add interactive elements and additional animations

// Animate sensor bars on scroll
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerOptions);

// Observe all feature cards, benefit items, and traffic items
document.querySelectorAll('.feature-card, .benefit-item, .traffic-item').forEach(card => {
    observer.observe(card);
});

// Add floating particles effect (optimized for mobile)
let particleInterval = 300;
if (window.innerWidth < 768) {
    particleInterval = 600; // Fewer particles on mobile
}

function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    const size = Math.random() * 4 + 2;
    const duration = Math.random() * 3 + 5;

    particle.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        background: rgba(0, 212, 255, ${Math.random() * 0.6 + 0.2});
        border-radius: 50%;
        left: ${Math.random() * 100}vw;
        top: 100vh;
        pointer-events: none;
        z-index: 0;
        box-shadow: 0 0 ${size * 2}px rgba(0, 212, 255, 0.5);
    `;

    const animation = particle.animate([
        {
            transform: 'translateY(0) translateX(0)',
            opacity: 0.8
        },
        {
            transform: `translateY(-100vh) translateX(${Math.random() * 100 - 50}px)`,
            opacity: 0
        }
    ], {
        duration: duration * 1000,
        easing: 'linear'
    });

    document.body.appendChild(particle);

    animation.onfinish = () => {
        particle.remove();
    };
}

// Create particles periodically
setInterval(createParticle, particleInterval);

// Enhanced hover effects for cards
document.querySelectorAll('.feature-card, .benefit-item').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });

    // Add parallax effect on mouse move (desktop only)
    if (window.innerWidth > 768) {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.03)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    }
});

// Animate stats counter on scroll
const stats = document.querySelectorAll('.stat-value');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            animateValue(entry.target);
        }
    });
}, { threshold: 0.5 });

stats.forEach(stat => statsObserver.observe(stat));

function animateValue(element) {
    const text = element.textContent;

    // Only animate if it's a number
    if (text.includes('%')) {
        const target = parseInt(text);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + '%';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + '%';
            }
        }, 20);
    }
}

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Optimize animations on mobile
if (window.innerWidth < 768) {
    document.querySelectorAll('.icon').forEach(icon => {
        icon.style.animationDuration = '3s'; // Slower animations on mobile
    });
}

// Handle resize events
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        location.reload();
    }, 250);
});
