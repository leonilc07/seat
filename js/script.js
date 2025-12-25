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

// Nav icons functionality
const navIcons = document.querySelectorAll('.nav-icon');
navIcons.forEach((icon, index) => {
    icon.addEventListener('click', () => {
        if (index === 0) {
            // User icon clicked
            console.log('User profile clicked');
            alert('User profile');
        } else {
            // Menu icon clicked
            const navMenu = document.querySelector('.nav-menu');
            navMenu.classList.toggle('active');
            if (navMenu.classList.contains('active')) {
                navMenu.style.display = 'flex';
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '80px';
                navMenu.style.right = '0';
                navMenu.style.backgroundColor = 'var(--white)';
                navMenu.style.padding = '20px';
                navMenu.style.gap = '15px';
                navMenu.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
            } else {
                navMenu.style.display = '';
                navMenu.style.flexDirection = '';
                navMenu.style.position = '';
                navMenu.style.top = '';
                navMenu.style.right = '';
                navMenu.style.backgroundColor = '';
                navMenu.style.padding = '';
                navMenu.style.boxShadow = '';
            }
        }
    });
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

// Hero content toggle with sliding animation
let isHeroEmpty = false;
let isAnimating = false;
const heroSplit = document.querySelector('.hero-split');
const arrowLeft = document.querySelector('.hero-arrow-left');
const arrowRight = document.querySelector('.hero-arrow-right');

function toggleHero(direction) {
    if (isAnimating) return;
    isAnimating = true;
    
    if (isHeroEmpty) {
        // Showing content - slide in from the clicked side and push blue background out
        if (direction === 'left') {
            heroSplit.classList.add('slide-in-left', 'slide-out-right');
        } else {
            heroSplit.classList.add('slide-in-right', 'slide-out-left');
        }
        
        setTimeout(() => {
            heroSplit.classList.remove('hero-empty');
            heroSplit.classList.add('hero-content-active');
            heroSplit.classList.remove('slide-in-left', 'slide-in-right', 'slide-out-left', 'slide-out-right');
            isHeroEmpty = false;
            isAnimating = false;
        }, 600);
    } else {
        // Hiding content - slide out to the opposite side
        if (direction === 'left') {
            heroSplit.classList.add('slide-left');
        } else {
            heroSplit.classList.add('slide-right');
        }
        
        setTimeout(() => {
            heroSplit.classList.remove('hero-content-active');
            heroSplit.classList.add('hero-empty');
            heroSplit.classList.remove('slide-left', 'slide-right');
            isHeroEmpty = true;
            isAnimating = false;
        }, 600);
    }
}

arrowLeft.addEventListener('click', () => toggleHero('left'));
arrowRight.addEventListener('click', () => toggleHero('right'));

// Draw SEAT logo on canvas
const logoCanvas = document.getElementById('hero-logo-canvas');
let logoColor = '#000000';
let logoScale = 8;

function drawLogo() {
    if (logoCanvas && typeof SVGIcons !== 'undefined' && SVGIcons['seat-s-logo.svg']) {
        const ctx = logoCanvas.getContext('2d');
        // Clear canvas
        ctx.clearRect(0, 0, 400, 400);
        // Scale and center the logo
        ctx.save();
        ctx.translate(200, 200); // Center of 400x400 canvas
        ctx.scale(logoScale, logoScale); // Scale up the logo
        ctx.translate(-17, -16); // Center the original logo (34x32)
        
        // Set the color
        ctx.fillStyle = logoColor;
        ctx.strokeStyle = logoColor;
        
        SVGIcons['seat-s-logo.svg'].draw(ctx);
        ctx.restore();
        console.log('SEAT logo drawn on canvas');
    } else {
        console.error('SVGIcons not loaded or canvas not found');
    }
}

// Initial draw
drawLogo();

// Logo color control
const colorPicker = document.getElementById('logo-color');
if (colorPicker) {
    colorPicker.addEventListener('input', (e) => {
        logoColor = e.target.value;
        drawLogo();
    });
}

// Logo scale control
const scaleSlider = document.getElementById('logo-scale');
const scaleValue = document.getElementById('scale-value');
if (scaleSlider && scaleValue) {
    scaleSlider.addEventListener('input', (e) => {
        logoScale = parseFloat(e.target.value);
        scaleValue.textContent = logoScale;
        drawLogo();
    });
}

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
