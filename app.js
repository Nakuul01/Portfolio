// ===== FLOATING GEOMETRIC SHAPES =====
const shapesData = [
    { type: 'circle', size: 25, opacity: 0.1, color: '#4b7c99', startX: 5, startY: 15, duration: 20 },
    { type: 'triangle', size: 20, opacity: 0.09, color: '#6b5b8a', startX: 10, startY: 30, duration: 25 },
    { type: 'hexagon', size: 30, opacity: 0.1, color: '#5a6370', startX: 85, startY: 20, duration: 22 },
    { type: 'pentagon', size: 28, opacity: 0.08, color: '#4a8a8a', startX: 90, startY: 60, duration: 18 },
    { type: 'circle', size: 22, opacity: 0.1, color: '#4b7c99', startX: 30, startY: 70, duration: 24 },
    { type: 'infinity', size: 35, opacity: 0.09, color: '#6b5b8a', startX: 15, startY: 50, duration: 26 },
    { type: 'triangle', size: 18, opacity: 0.1, color: '#5a6370', startX: 70, startY: 80, duration: 20 },
    { type: 'hexagon', size: 25, opacity: 0.08, color: '#4a8a8a', startX: 50, startY: 40, duration: 23 },
    { type: 'circle', size: 20, opacity: 0.1, color: '#4b7c99', startX: 60, startY: 15, duration: 21 },
    { type: 'pentagon', size: 24, opacity: 0.09, color: '#6b5b8a', startX: 40, startY: 75, duration: 25 },
    { type: 'triangle', size: 22, opacity: 0.1, color: '#5a6370', startX: 25, startY: 55, duration: 19 },
    { type: 'circle', size: 28, opacity: 0.08, color: '#4a8a8a', startX: 75, startY: 45, duration: 27 },
    { type: 'hexagon', size: 20, opacity: 0.1, color: '#4b7c99', startX: 35, startY: 25, duration: 22 },
    { type: 'infinity', size: 30, opacity: 0.09, color: '#6b5b8a', startX: 65, startY: 70, duration: 24 },
    { type: 'pentagon', size: 21, opacity: 0.1, color: '#5a6370', startX: 55, startY: 60, duration: 20 },
    { type: 'circle', size: 26, opacity: 0.08, color: '#4a8a8a', startX: 20, startY: 40, duration: 23 },
    { type: 'triangle', size: 19, opacity: 0.1, color: '#4b7c99', startX: 80, startY: 30, duration: 21 },
    { type: 'hexagon', size: 23, opacity: 0.09, color: '#6b5b8a', startX: 45, startY: 10, duration: 25 },
    { type: 'circle', size: 24, opacity: 0.1, color: '#5a6370', startX: 70, startY: 50, duration: 22 },
    { type: 'infinity', size: 32, opacity: 0.08, color: '#4a8a8a', startX: 10, startY: 65, duration: 26 }
];

function generateShapes() {
    const container = document.getElementById('floatingShapes');
    if (!container) return;
    
    shapesData.forEach((shape, index) => {
        const shapeDiv = document.createElement('div');
        shapeDiv.className = `shape shape-${shape.type}`;
        shapeDiv.style.left = `${shape.startX}%`;
        shapeDiv.style.top = `${shape.startY}%`;
        shapeDiv.style.opacity = shape.opacity;
        shapeDiv.style.color = shape.color;
        shapeDiv.style.animation = `floatUpDown ${shape.duration}s ease-in-out infinite`;
        shapeDiv.style.animationDelay = `${index * 0.3}s`;
        
        // Adjust size based on shape type
        if (shape.type === 'circle') {
            shapeDiv.style.width = `${shape.size}px`;
            shapeDiv.style.height = `${shape.size}px`;
        } else if (shape.type === 'hexagon') {
            shapeDiv.style.width = `${shape.size}px`;
            shapeDiv.style.height = `${shape.size * 0.57}px`;
        } else if (shape.type === 'pentagon') {
            shapeDiv.style.width = `${shape.size}px`;
            shapeDiv.style.height = `${shape.size * 0.96}px`;
        } else if (shape.type === 'infinity') {
            shapeDiv.style.width = `${shape.size}px`;
            shapeDiv.style.height = `${shape.size * 0.51}px`;
        }
        
        container.appendChild(shapeDiv);
    });
}

// Generate shapes on page load
generateShapes();

// ===== ANIMATED BACKGROUND CANVAS =====
const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
let mouseX = 0;
let mouseY = 0;

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = document.documentElement.scrollHeight;
}

resizeCanvas();
window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
});

// Particle class
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }
    
    draw() {
        ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Initialize particles
function initParticles() {
    particles = [];
    const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

initParticles();

// Animation loop
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    // Draw connections
    particles.forEach((particleA, indexA) => {
        particles.slice(indexA + 1).forEach(particleB => {
            const dx = particleA.x - particleB.x;
            const dy = particleA.y - particleB.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 120) {
                ctx.strokeStyle = `rgba(167, 139, 250, ${0.15 * (1 - distance / 120)})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particleA.x, particleA.y);
                ctx.lineTo(particleB.x, particleB.y);
                ctx.stroke();
            }
        });
    });
    
    requestAnimationFrame(animateParticles);
}

animateParticles();

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with data-scroll attribute
const scrollElements = document.querySelectorAll('[data-scroll]');
scrollElements.forEach(el => scrollObserver.observe(el));

// Observe section titles
const sectionTitles = document.querySelectorAll('.section-title');
sectionTitles.forEach(title => scrollObserver.observe(title));

// Observe content containers
const contentElements = document.querySelectorAll('.about-content, .experience-grid, .education-grid, .certificates-grid, .volunteering-grid, .publications-container, .projects-grid, .skills-container, .contact-content');
contentElements.forEach(el => scrollObserver.observe(el));

// ===== PARALLAX EFFECT =====
let scrollY = window.pageYOffset;

function updateParallax() {
    scrollY = window.pageYOffset;
    
    // Hero section parallax
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        const heroContent = document.querySelector('.hero-content');
        
        const heroTop = heroSection.offsetTop;
        const heroHeight = heroSection.offsetHeight;
        const scrollProgress = (scrollY - heroTop) / heroHeight;
        
        if (scrollProgress >= 0 && scrollProgress <= 1) {
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrollProgress * 50}px)`;
                heroContent.style.opacity = 1 - scrollProgress * 1.5;
            }
        }
    }
    
    // Project cards stagger effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (cardTop < windowHeight * 0.85) {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
    
    // Skill categories stagger
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
        const categoryTop = category.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (categoryTop < windowHeight * 0.85) {
            setTimeout(() => {
                category.style.opacity = '1';
                category.style.transform = 'translateY(0)';
            }, index * 150);
        }
    });
    
    // Experience cards stagger
    const experienceCards = document.querySelectorAll('.experience-card');
    experienceCards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (cardTop < windowHeight * 0.85) {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
    
    // Education cards stagger
    const educationCards = document.querySelectorAll('.education-card');
    educationCards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (cardTop < windowHeight * 0.85) {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 150);
        }
    });
    
    // Certificate cards stagger
    const certificateCards = document.querySelectorAll('.certificate-card');
    certificateCards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (cardTop < windowHeight * 0.85) {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 80);
        }
    });
    
    // Volunteering cards stagger
    const volunteeringCards = document.querySelectorAll('.volunteering-card');
    volunteeringCards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (cardTop < windowHeight * 0.85) {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}

// Throttle function for performance
function throttle(func, wait) {
    let timeout;
    let lastRan;
    return function executedFunction(...args) {
        if (!lastRan) {
            func.apply(this, args);
            lastRan = Date.now();
        } else {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                if (Date.now() - lastRan >= wait) {
                    func.apply(this, args);
                    lastRan = Date.now();
                }
            }, wait - (Date.now() - lastRan));
        }
    };
}

// Add scroll event listener
window.addEventListener('scroll', throttle(updateParallax, 16));

// Initial call
updateParallax();

// ===== SMOOTH SCROLL BEHAVIOR =====
// Add smooth easing to scroll-snap
let isScrolling = false;

window.addEventListener('wheel', (e) => {
    if (isScrolling) return;
    
    const sections = document.querySelectorAll('.section');
    let currentSection = null;
    let nextSection = null;
    
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom > 100) {
            currentSection = section;
            if (e.deltaY > 0 && index < sections.length - 1) {
                nextSection = sections[index + 1];
            } else if (e.deltaY < 0 && index > 0) {
                nextSection = sections[index - 1];
            }
        }
    });
}, { passive: true });

// ===== RESIZE HANDLER =====
window.addEventListener('resize', throttle(() => {
    resizeCanvas();
    updateParallax();
}, 250));

// ===== INITIAL SETUP =====
// Set initial opacity for staggered elements
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
});

const skillCategories = document.querySelectorAll('.skill-category');
skillCategories.forEach(category => {
    category.style.opacity = '0';
    category.style.transform = 'translateY(30px)';
    category.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
});

const experienceCards = document.querySelectorAll('.experience-card');
experienceCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
});

const educationCards = document.querySelectorAll('.education-card');
educationCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
});

const certificateCards = document.querySelectorAll('.certificate-card');
certificateCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
});

const volunteeringCards = document.querySelectorAll('.volunteering-card');
volunteeringCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
});

// ===== PERFORMANCE OPTIMIZATION =====
// Reduce animation complexity on mobile
if (window.innerWidth < 768) {
    particles = particles.slice(0, Math.floor(particles.length / 2));
}

// Page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    updateParallax();
});

console.log('🚀 Portfolio loaded with premium animations');

// ===== CANVAS UPDATE ON SCROLL =====
window.addEventListener('scroll', () => {
    canvas.style.transform = `translateY(${window.pageYOffset * 0.5}px)`;
}, { passive: true });