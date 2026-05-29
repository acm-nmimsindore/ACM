// ===== PAGE LOADER =====
window.addEventListener('load', function() {
    const loader = document.getElementById('pageLoader');
    if (loader) {
        if (sessionStorage.getItem('hasVisited')) {
            loader.style.display = 'none';
            initEntranceAnimations();
        } else {
            const loadingBar = document.getElementById('loadingBar');
            let progress = 0;
            const progressInterval = setInterval(() => {
                progress += Math.random() * 15 + 5;
                if (progress > 100) progress = 100;
                if (loadingBar) loadingBar.style.width = progress + '%';
                if (progress >= 100) {
                    clearInterval(progressInterval);
                    setTimeout(() => {
                        loader.style.opacity = '0';
                        setTimeout(() => {
                            loader.style.display = 'none';
                            initEntranceAnimations();
                            sessionStorage.setItem('hasVisited', 'true');
                        }, 500);
                    }, 800);
                }
            }, 100);
        }
    }
});

// ===== SCROLL PROGRESS BAR =====
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    const bar = document.getElementById('progressBar');
    if (bar) bar.style.width = scrollPercent + '%';
});

// ===== PARTICLES =====
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    const particleCount = 50;
    const particleTypes = ['large', 'medium', 'small'];
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const type = particleTypes[Math.floor(Math.random() * particleTypes.length)];
        particle.className = `particle ${type}`;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particle.style.transform = `rotate(${Math.random() * 360}deg)`;
        particlesContainer.appendChild(particle);
    }
}

// ===== CODE RAIN =====
function createCodeRain() {
    const codeRainContainer = document.getElementById('codeRain');
    if (!codeRainContainer) return;
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz<>{}[]()*/+-=&|^%$#@!';
    const columnCount = Math.floor(window.innerWidth / 25);
    codeRainContainer.innerHTML = '';
    for (let i = 0; i < columnCount; i++) {
        const column = document.createElement('div');
        column.style.position = 'absolute';
        column.style.left = (i * 25) + 'px';
        column.style.animationDelay = Math.random() * 10 + 's';
        for (let j = 0; j < 25; j++) {
            const char = document.createElement('div');
            char.className = 'code-char';
            char.textContent = characters[Math.floor(Math.random() * characters.length)];
            char.style.top = (j * 25 - 600) + 'px';
            char.style.animationDelay = Math.random() * 10 + 's';
            char.style.opacity = Math.random() * 0.8 + 0.2;
            const colors = ['rgba(139, 92, 246, 0.3)', 'rgba(6, 182, 212, 0.3)', 'rgba(16, 185, 129, 0.3)'];
            char.style.color = colors[Math.floor(Math.random() * colors.length)];
            column.appendChild(char);
        }
        codeRainContainer.appendChild(column);
    }
}

// ===== NAVBAR EFFECTS =====
function initNavbarEffects() {
    const navbar = document.getElementById('mainNavbar');
    if (!navbar) return;
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        navbar.style.background = scrollY > 100 ? 'rgba(15, 23, 42, 0.95)' : 'rgba(15, 23, 42, 0.8)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.transform = (scrollY > lastScrollY && scrollY > 100) ? 'translateY(-100%)' : 'translateY(0)';
        lastScrollY = scrollY;
    });
}

// ===== ACTIVE NAV LINK =====
function setActiveNavLink() {
    // Get all non-empty path segments, e.g. '/about/' → ['about']
    const segments = window.location.pathname.split('/').filter(Boolean);
    // Last meaningful segment; empty means root (home)
    const lastSegment = segments[segments.length - 1];
    // If last segment is 'index.html' or empty, use the folder name before it
    let currentPage;
    if (!lastSegment || lastSegment === 'index.html') {
        currentPage = segments[segments.length - 2] || 'home';
    } else {
        currentPage = lastSegment;
    }

    document.querySelectorAll('.nav-link[data-page]').forEach(link => {
        if (link.getAttribute('data-page') === currentPage) {
            link.classList.add('active');
        }
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.animationDelay = '0s';
                    entry.target.style.animation = 'slideInUp 0.8s ease-out forwards';
                }, index * 100);
            }
        });
    }, observerOptions);
    document.querySelectorAll('.feature-card, .section-title').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        observer.observe(el);
    });
}

// ===== TYPING EFFECT =====
function initTypingEffect() {
    const heroTitle = document.getElementById('heroTitle');
    const heroSubtitle = document.getElementById('heroSubtitle');
    if (!heroTitle || !heroSubtitle) return;
    const titleText = 'ACM NMIMS Indore';
    const subtitleText = 'Advancing Computing as a Science & Profession';
    let titleIndex = 0;
    let subtitleIndex = 0;
    heroTitle.textContent = '';
    heroSubtitle.textContent = '';
    function typeTitle() {
        if (titleIndex < titleText.length) {
            heroTitle.textContent += titleText.charAt(titleIndex++);
            setTimeout(typeTitle, 100);
        } else {
            setTimeout(typeSubtitle, 500);
        }
    }
    function typeSubtitle() {
        if (subtitleIndex < subtitleText.length) {
            heroSubtitle.textContent += subtitleText.charAt(subtitleIndex++);
            setTimeout(typeSubtitle, 50);
        }
    }
    setTimeout(typeTitle, 2000);
}

// ===== PARALLAX =====
function initParallaxEffects() {
    const orbs = document.querySelectorAll('.bg-orb');
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.15;
            const rotation = scrollY * 0.1;
            orb.style.transform = `translateY(${scrollY * speed}px) rotate(${rotation}deg)`;
        });
    });
}

// ===== SOCIAL LINKS =====
function initSocialLinkEffects() {
    document.querySelectorAll('.social-links a').forEach((link, index) => {
        link.style.animationDelay = `${index * 0.1}s`;
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.1)';
        });
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.animation = '';
        });
    });
}

// ===== MAGNETIC CARD EFFECT =====
function initMagneticEffect() {
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const deltaX = (x - rect.width / 2) / (rect.width / 2);
            const deltaY = (y - rect.height / 2) / (rect.height / 2);
            card.style.transform = `translateY(-15px) scale(1.02) rotateX(${deltaY * 10}deg) rotateY(${deltaX * 10}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// ===== KEYBOARD NAVIGATION =====
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey) {
            switch(e.key) {
                case 'ArrowDown': e.preventDefault(); window.scrollBy({ top: window.innerHeight, behavior: 'smooth' }); break;
                case 'ArrowUp': e.preventDefault(); window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' }); break;
                case 'Home': e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); break;
                case 'End': e.preventDefault(); window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); break;
            }
        }
    });
}

// ===== ENTRANCE ANIMATIONS =====
function initEntranceAnimations() {
    const elements = document.querySelectorAll('.hero-content > *');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        setTimeout(() => {
            el.style.transition = 'all 0.8s ease-out';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// ===== IMAGE MODAL =====
function initModal() {
    const modal = document.getElementById('imageModal');
    if (!modal) return;
    const modalImage = document.getElementById('modalImage');
    document.querySelectorAll('.photo-item').forEach(item => {
        item.addEventListener('click', () => {
            const imageSrc = item.getAttribute('data-src');
            modal.classList.add('show');
            modalImage.src = imageSrc;
        });
    });
    const closeBtn = modal.querySelector('.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => modal.classList.remove('show'));
    }
    window.addEventListener('click', (event) => {
        if (event.target === modal) modal.classList.remove('show');
    });
    // Escape key closes modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') modal.classList.remove('show');
    });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    createCodeRain();
    initNavbarEffects();
    setActiveNavLink();
    initScrollAnimations();
    initTypingEffect();
    initParallaxEffects();
    initSocialLinkEffects();
    initMagneticEffect();
    initKeyboardNavigation();
    initModal();
});

window.addEventListener('resize', function() {
    if (document.getElementById('codeRain')) createCodeRain();
});

// Scroll animation tick
let ticking = false;
window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(() => { ticking = false; });
        ticking = true;
    }
});
