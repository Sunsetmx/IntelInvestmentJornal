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
    const rate = scrolled * -0.5;
    
    if (scrolled > 100) {
        header.style.background = 'rgba(254, 254, 254, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(254, 254, 254, 0.95)';
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
        report.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    });
    
    report.addEventListener('mouseleave', () => {
        report.style.transform = 'translateY(0)';
        report.style.boxShadow = 'none';
    });
});