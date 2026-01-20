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

const navbar = document.querySelector('.navbar');
const topBar = document.querySelector('.top-bar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.classList.add('nav-hidden');
        topBar.classList.add('nav-hidden');
    } else {
        navbar.classList.remove('nav-hidden');
        topBar.classList.remove('nav-hidden');
    }

    if (currentScroll > 100) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.backgroundColor = 'var(--white)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

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

document.querySelectorAll('.range-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function (e) {
        if (!this.closest('a')) {
            e.preventDefault();

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

            console.log('Button clicked:', this.textContent);
        }
    });
});

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

document.querySelectorAll('img').forEach(img => {
    img.loading = 'lazy';
});

document.querySelectorAll('.range-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.querySelector('img').style.transform = 'scale(1.05)';
    });

    card.addEventListener('mouseleave', function () {
        this.querySelector('img').style.transform = 'scale(1)';
    });
});

console.log('%cWelcome to SEAT', 'color: #d32027; font-size: 24px; font-weight: bold;');
console.log('%cEnjoy the Drive!', 'color: #1a1a1a; font-size: 16px;');

// SweetAlert for "Discover more" button
const discoverBtn = document.querySelector('.btn-outline');
if (discoverBtn) {
    discoverBtn.addEventListener('click', function (e) {
        e.preventDefault();

        Swal.fire({
            title: 'Credits',
            html: `
                <div style="text-align: left; padding: 20px;">
                    <p><strong>made by:</strong> Leon Ilc</p>
                    <p><strong>Images:</strong> SEAT Official</p>
                    <hr style="margin: 15px 0;">
                    <p style="font-size: 14px; color: #666;">
                        This is a demo website showcasing SEAT vehicles.
                    </p>
                </div>
            `,
            confirmButtonText: 'Close',
            confirmButtonColor: '#d32027',
            width: '500px'
        });
    });
}

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

document.addEventListener('submit', function (e) {
    if (e.target.tagName === 'FORM') {
        e.preventDefault();
        console.log('Form submitted');
    }
});

document.addEventListener('keydown', function (e) {
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

if ('performance' in window) {
    window.addEventListener('load', () => {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('Page load time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
    });
}

const canvas = document.getElementById('logoCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let currentColor = '#d32027';

    function drawLogo(color) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();

        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.scale(3.5, 3.5);
        ctx.translate(-17, -16);

        if (typeof SVGIcons !== 'undefined' && SVGIcons['seat-s-logo.svg']) {
            const originalFillStyleDescriptor = Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, 'fillStyle');

            Object.defineProperty(ctx, 'fillStyle', {
                set: function (value) {
                    originalFillStyleDescriptor.set.call(this, color);
                },
                get: function () {
                    return originalFillStyleDescriptor.get.call(this);
                },
                configurable: true
            });

            SVGIcons['seat-s-logo.svg'].draw(ctx);

            delete ctx.fillStyle;
        }

        ctx.restore();
    }

    drawLogo(currentColor);


    // SweetAlert for color change button
    const colorChangeBtn = document.querySelector('#colorChange');
    if (colorChangeBtn) {
        colorChangeBtn.addEventListener('click', function (e) {
            e.preventDefault();

            Swal.fire({
                title: 'Change Logo Color',
                html: `
                <div style="text-align: left; padding: 20px;">
                    <p><strong>spremeni barvo:</strong></p>
                    <input type="color" id="swalColorPicker" value="${currentColor}" style="width: 5%; height: 20px; cursor: pointer;">
                    <label for="swalColorPicker">Change color</label>
                </div>
                `,
                confirmButtonText: 'Close',
                confirmButtonColor: '#d32027',
                width: '500px',
                didOpen: () => {
                    const swalColorPicker = document.getElementById('swalColorPicker');
                    if (swalColorPicker) {
                        swalColorPicker.addEventListener('input', (e) => {
                            currentColor = e.target.value;
                            drawLogo(currentColor);
                        });
                    }
                }
            });
        });
    }

}
