// Smooth scrolling for navigation links
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

// Header background opacity on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const scrolled = window.pageYOffset;
    
    if (scrolled > 100) {
        header.style.background = 'var(--header-bg-scrolled)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'var(--header-bg)';
        header.style.boxShadow = 'none';
    }
});

// Pricing button handling
document.querySelectorAll('.pricing-button').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        const originalText = this.textContent;
        this.textContent = 'Processing...';
        this.disabled = true;
        
        setTimeout(() => {
            this.textContent = 'Redirecting to Checkout...';
            
            setTimeout(() => {
                // Here you would integrate with your payment processor
                alert('Payment integration would be implemented here');
                this.textContent = originalText;
                this.disabled = false;
            }, 1500);
        }, 1000);
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add fade-in animation to sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.what-we-do, .why-choose-us, .sample-content');
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
    
    // Animate service items and feature cards with stagger
    const animateItems = (selector, delay = 100) => {
        const items = document.querySelectorAll(selector);
        items.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = `opacity 0.6s ease ${index * delay}ms, transform 0.6s ease ${index * delay}ms`;
            
            setTimeout(() => {
                const itemObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }
                    });
                }, observerOptions);
                
                itemObserver.observe(item);
            }, 100);
        });
    };
    
    animateItems('.service-item', 150);
    animateItems('.feature-card', 200);
    animateItems('.report-preview', 300);
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    const originalText = heroTitle.textContent;
    
    setTimeout(() => {
        typeWriter(heroTitle, originalText, 30);
    }, 500);
});

// Add subtle parallax effect to hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Mobile menu toggle (if needed for smaller screens)
function toggleMobileMenu() {
    const nav = document.querySelector('.nav');
    nav.classList.toggle('mobile-active');
}

// Add click handlers for CTA buttons
document.querySelectorAll('.cta-button, .primary-button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelector('#subscribe').scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add hover effects for report previews
document.querySelectorAll('.report-preview').forEach(report => {
    report.addEventListener('mouseenter', () => {
        report.style.transform = 'translateY(-5px)';
        report.style.boxShadow = '0 10px 30px var(--card-shadow-hover)';
    });
    
    report.addEventListener('mouseleave', () => {
        report.style.transform = 'translateY(0)';
        report.style.boxShadow = 'none';
    });
});

// Dark/Light mode detection and system preference handling
function updateThemeBasedOnSystem() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateThemeBasedOnSystem);

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', () => {
    updateThemeBasedOnSystem();
});

// Enhanced responsive behavior
function handleResize() {
    const width = window.innerWidth;
    const body = document.body;
    
    // Add responsive classes
    body.classList.toggle('mobile', width < 768);
    body.classList.toggle('tablet', width >= 768 && width < 1024);
    body.classList.toggle('desktop', width >= 1024);
    
    // Adjust hero height on mobile
    const hero = document.querySelector('.hero');
    if (width < 768) {
        hero.style.minHeight = '80vh';
    } else {
        hero.style.minHeight = '100vh';
    }
}

// Initialize responsive behavior
window.addEventListener('resize', handleResize);
window.addEventListener('load', handleResize);

// Enhanced form validation and UX
document.querySelectorAll('.pricing-button').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Add loading state
        const originalText = this.textContent;
        const originalBg = this.style.backgroundColor;
        
        this.textContent = 'Processing...';
        this.disabled = true;
        this.style.cursor = 'not-allowed';
        
        // Simulate processing
        setTimeout(() => {
            this.textContent = 'Redirecting...';
            
            setTimeout(() => {
                // Here you would integrate with Stripe or your payment processor
                this.textContent = 'Opening Checkout...';
                
                setTimeout(() => {
                    // Reset button state
                    this.textContent = originalText;
                    this.disabled = false;
                    this.style.cursor = 'pointer';
                    
                    // Show success message or redirect
                    alert('Payment integration would be implemented here.\nThis would redirect to Stripe Checkout.');
                }, 1000);
            }, 1000);
        }, 800);
    });
});

// Improved accessibility features
document.addEventListener('keydown', (e) => {
    // Escape key to close any modals or overlays
    if (e.key === 'Escape') {
        // Close any open modals or overlays
        document.querySelectorAll('.modal, .overlay').forEach(el => {
            el.style.display = 'none';
        });
    }
    
    // Tab navigation enhancement
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

// Remove keyboard navigation class on mouse use
document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Performance optimization: Lazy load animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const performanceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            performanceObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Enhanced scroll performance
let ticking = false;

function updateOnScroll() {
    const scrolled = window.pageYOffset;
    const header = document.querySelector('.header');
    const heroBackground = document.querySelector('.hero-background');
    
    // Header background update
    if (scrolled > 100) {
        header.style.background = 'var(--header-bg-scrolled)';
        header.style.boxShadow = '0 2px 20px var(--card-shadow-hover)';
    } else {
        header.style.background = 'var(--header-bg)';
        header.style.boxShadow = 'none';
    }
    
    // Parallax effect (only on desktop for performance)
    if (window.innerWidth > 768 && heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
    
    ticking = false;
}

function requestScrollUpdate() {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
}

// Replace the existing scroll listeners with the optimized version
window.removeEventListener('scroll', () => {}); // Remove old listeners
window.addEventListener('scroll', requestScrollUpdate, { passive: true });

// Error handling for failed resources
window.addEventListener('error', (e) => {
    console.warn('Resource failed to load:', e.target.src || e.target.href);
    
    // Fallback for failed font loading
    if (e.target.tagName === 'LINK' && e.target.href.includes('fonts')) {
        document.body.style.fontFamily = 'system-ui, -apple-system, sans-serif';
    }
});

// Service Worker registration for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when you have a service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });