// Smooth scroll for navigation links
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

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
const topBar = document.querySelector('.top-bar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Hide/show navbar and top bar based on scroll direction
    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down
        navbar.classList.add('nav-hidden');
        topBar.classList.add('nav-hidden');
    } else {
        // Scrolling up
        navbar.classList.remove('nav-hidden');
        topBar.classList.remove('nav-hidden');
    }
    
    // Change background on scroll
    if (currentScroll > 100) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.backgroundColor = 'var(--white)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Hero Carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const indicators = document.querySelectorAll('.indicator');
const carousel = document.querySelector('.hero-carousel');
const totalSlides = slides.length;

function showSlide(index) {
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    currentSlide = (index + totalSlides) % totalSlides;
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
    indicators[currentSlide].classList.add('active');
}

// Arrow navigation
document.querySelector('.hero-arrow-left').addEventListener('click', () => {
    showSlide(currentSlide - 1);
});

document.querySelector('.hero-arrow-right').addEventListener('click', () => {
    showSlide(currentSlide + 1);
});

// Indicator navigation
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        showSlide(index);
    });
});

// Auto-play carousel (optional)
let autoplayInterval = setInterval(() => {
    showSlide(currentSlide + 1);
}, 5000);

// Pause autoplay on hover
document.querySelector('.hero').addEventListener('mouseenter', () => {
    clearInterval(autoplayInterval);
});

document.querySelector('.hero').addEventListener('mouseleave', () => {
    autoplayInterval = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
});

// Add intersection observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all range cards
document.querySelectorAll('.range-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Button click handlers
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function(e) {
        if (!this.closest('a')) {
            e.preventDefault();
            
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.animation = 'ripple 0.6s ease-out';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
            
            // Log action (in real implementation, this would handle actual navigation)
            console.log('Button clicked:', this.textContent);
        }
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Image lazy loading enhancement
document.querySelectorAll('img').forEach(img => {
    img.loading = 'lazy';
});

// Add hover effect to range cards
document.querySelectorAll('.range-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.querySelector('img').style.transform = 'scale(1.05)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.querySelector('img').style.transform = 'scale(1)';
    });
});

// Console welcome message
console.log('%cWelcome to SEAT', 'color: #d32027; font-size: 24px; font-weight: bold;');
console.log('%cEnjoy the Drive!', 'color: #1a1a1a; font-size: 16px;');

// Preload images for better performance
window.addEventListener('load', () => {
    const images = [
        'new-seat-leon-2020.avif',
        'seat-ibiza-hatchback-car.avif',
        'seat-arona-style-mini-car.avif',
        'seat-ateca-2025.avif',
        'new-seat-leon-sportstourer-2020.avif'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

// Handle form submissions (if any forms are added later)
document.addEventListener('submit', function(e) {
    if (e.target.tagName === 'FORM') {
        e.preventDefault();
        console.log('Form submitted');
        // Handle form data here
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    const navMenu = document.querySelector('.nav-menu');
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navMenu.style.display = '';
        navMenu.style.flexDirection = '';
        navMenu.style.position = '';
        navMenu.style.top = '';
        navMenu.style.right = '';
        navMenu.style.backgroundColor = '';
        navMenu.style.padding = '';
        navMenu.style.boxShadow = '';
    }
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('Page load time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
    });
}

// Canvas Logo Drawing
const canvas = document.getElementById('logoCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let currentColor = '#d32027';
    
    function drawLogo(color) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        
        // Center and scale the logo
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.scale(3.5, 3.5);
        ctx.translate(-17, -16);
        
        // Call draw function from seat_logo.js with color override
        if (typeof SVGIcons !== 'undefined' && SVGIcons['seat-s-logo.svg']) {
            // Store original fillStyle setter
            const originalFillStyleDescriptor = Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, 'fillStyle');
            
            // Override fillStyle to always use our custom color
            Object.defineProperty(ctx, 'fillStyle', {
                set: function(value) {
                    originalFillStyleDescriptor.set.call(this, color);
                },
                get: function() {
                    return originalFillStyleDescriptor.get.call(this);
                },
                configurable: true
            });
            
            // Draw the logo
            SVGIcons['seat-s-logo.svg'].draw(ctx);
            
            // Restore original fillStyle property
            delete ctx.fillStyle;
        }
        
        ctx.restore();
    }
    
    // Initial draw
    drawLogo(currentColor);
    
    // Color picker event
    const colorPicker = document.getElementById('logoColorPicker');
    if (colorPicker) {
        colorPicker.addEventListener('input', (e) => {
            currentColor = e.target.value;
            drawLogo(currentColor);
        });
    }
}
