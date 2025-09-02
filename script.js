window.addEventListener('load', function() {
            const loader = document.getElementById('pageLoader');
            const loadingBar = document.getElementById('loadingBar');
            let progress = 0;

            const progressInterval = setInterval(() => {
                progress += Math.random() * 15 + 5;
                if (progress > 100) progress = 100;

                loadingBar.style.width = progress + '%';

                if (progress >= 100) {
                    clearInterval(progressInterval);
                    setTimeout(() => {
                        loader.style.opacity = '0';
                        setTimeout(() => {
                            loader.style.display = 'none';
                            initEntranceAnimations();
                        }, 500);
                    }, 800);
                }
            }, 100);
        });

        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            document.getElementById('progressBar').style.width = scrollPercent + '%';
        });

        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 50;
            const particleTypes = ['large', 'medium', 'small'];

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                const type = particleTypes[Math.floor(Math.random() * particleTypes.length)];

                particle.className = `particle ${type}`;
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 15 + 's';
                particle.style.animationDuration = (Math.random() * 10 + 10) + 's';

                const randomRotation = Math.random() * 360;
                particle.style.transform = `rotate(${randomRotation}deg)`;

                particlesContainer.appendChild(particle);
            }
        }

        function createCodeRain() {
            const codeRainContainer = document.getElementById('codeRain');
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

                    // Add color variation
                    const colors = ['rgba(139, 92, 246, 0.3)', 'rgba(6, 182, 212, 0.3)', 'rgba(16, 185, 129, 0.3)'];
                    char.style.color = colors[Math.floor(Math.random() * colors.length)];

                    column.appendChild(char);
                }
                codeRainContainer.appendChild(column);
            }
        }

        function initSmoothScrolling() {
            const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetSection = document.querySelector(targetId);

                    if (targetSection) {
                        const offsetTop = targetSection.offsetTop - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });

                        // Add click animation
                        this.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                            this.style.transform = '';
                        }, 150);
                    }
                });
            });
        }

        function initCTAScrolling() {
            const ctaButton = document.getElementById('ctaButton');
            ctaButton.addEventListener('click', function(e) {
                e.preventDefault();
                const targetSection = document.querySelector('#about');
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                createRipple(e, this);
            });
        }

        function createRipple(event, element) {
            const ripple = document.createElement('span');
            const rect = element.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';

            element.style.position = 'relative';
            element.style.overflow = 'hidden';
            element.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        }

        function initNavbarEffects() {
            const navbar = document.getElementById('mainNavbar');
            let lastScrollY = window.scrollY;

            window.addEventListener('scroll', function() {
                const scrollY = window.scrollY;

                if (scrollY > 100) {
                    navbar.style.background = 'rgba(15, 23, 42, 0.95)';
                    navbar.style.backdropFilter = 'blur(20px)';
                } else {
                    navbar.style.background = 'rgba(15, 23, 42, 0.8)';
                    navbar.style.backdropFilter = 'blur(20px)';
                }

                // Hide/show navbar on scroll
                if (scrollY > lastScrollY && scrollY > 100) {
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    navbar.style.transform = 'translateY(0)';
                }

                lastScrollY = scrollY;
            });
        }

        function initScrollAnimations() {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

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

            const animatedElements = document.querySelectorAll('.feature-card, .section-title');
            animatedElements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(50px)';
                observer.observe(el);
            });
        }

        function initTypingEffect() {
            const heroTitle = document.getElementById('heroTitle');
            const heroSubtitle = document.getElementById('heroSubtitle');
            const titleText = 'ACM NMIMS Indore';
            const subtitleText = 'Advancing Computing as a Science & Profession';

            let titleIndex = 0;
            let subtitleIndex = 0;

            heroTitle.textContent = '';
            heroSubtitle.textContent = '';

            function typeTitle() {
                if (titleIndex < titleText.length) {
                    heroTitle.textContent += titleText.charAt(titleIndex);
                    titleIndex++;
                    setTimeout(typeTitle, 100);
                } else {
                    setTimeout(typeSubtitle, 500);
                }
            }

            function typeSubtitle() {
                if (subtitleIndex < subtitleText.length) {
                    heroSubtitle.textContent += subtitleText.charAt(subtitleIndex);
                    subtitleIndex++;
                    setTimeout(typeSubtitle, 50);
                }
            }

            setTimeout(typeTitle, 2000);
        }

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

        function initSocialLinkEffects() {
            const socialLinks = document.querySelectorAll('.social-links a');

            socialLinks.forEach((link, index) => {
                link.style.animationDelay = `${index * 0.1}s`;

                link.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-10px) scale(1.1)';

                    this.style.animation = 'socialBounce 0.6s ease-in-out';
                });

                link.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                    this.style.animation = '';
                });

                link.addEventListener('click', function(e) {
                    this.style.transform = 'translateY(-10px) scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = 'translateY(-10px) scale(1.1)';
                    }, 150);
                });
            });
        }

        function initCursorTrail() {
            const trail = [];
            const trailLength = 15;

            for (let i = 0; i < trailLength; i++) {
                const dot = document.createElement('div');
                dot.style.position = 'fixed';
                dot.style.width = (6 - i * 0.3) + 'px';
                dot.style.height = (6 - i * 0.3) + 'px';
                dot.style.background = `rgba(139, 92, 246, ${(trailLength - i) / trailLength * 0.7})`;
                dot.style.borderRadius = '50%';
                dot.style.pointerEvents = 'none';
                dot.style.zIndex = '9998';
                dot.style.transition = 'opacity 0.3s ease';
                document.body.appendChild(dot);
                trail.push(dot);
            }

            let mouseX = 0;
            let mouseY = 0;
            let isMoving = false;

            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
                isMoving = true;

                trail.forEach(dot => dot.style.opacity = 1);

                clearTimeout(window.cursorTimeout);
                window.cursorTimeout = setTimeout(() => {
                    isMoving = false;
                    trail.forEach(dot => dot.style.opacity = 0);
                }, 2000);
            });

            function updateTrail() {
                let x = mouseX;
                let y = mouseY;

                trail.forEach((dot, index) => {
                    dot.style.left = x - (6 - index * 0.3) / 2 + 'px';
                    dot.style.top = y - (6 - index * 0.3) / 2 + 'px';

                    const nextDot = trail[index + 1];
                    if (nextDot) {
                        x += (parseFloat(nextDot.style.left) - x) * 0.4;
                        y += (parseFloat(nextDot.style.top) - y) * 0.4;
                    }
                });

                requestAnimationFrame(updateTrail);
            }

            updateTrail();
        }

        function initMagneticEffect() {
            const cards = document.querySelectorAll('.feature-card');

            cards.forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;

                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;

                    const deltaX = (x - centerX) / centerX;
                    const deltaY = (y - centerY) / centerY;

                    card.style.transform = `
                        translateY(-15px)
                        scale(1.02)
                        rotateX(${deltaY * 10}deg)
                        rotateY(${deltaX * 10}deg)
                    `;
                });

                card.addEventListener('mouseleave', () => {
                    card.style.transform = '';
                });
            });
        }

        function initKeyboardNavigation() {
            document.addEventListener('keydown', (e) => {
                switch(e.key) {
                    case 'ArrowDown':
                        if (e.ctrlKey) {
                            e.preventDefault();
                            window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
                        }
                        break;
                    case 'ArrowUp':
                        if (e.ctrlKey) {
                            e.preventDefault();
                            window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
                        }
                        break;
                    case 'Home':
                        if (e.ctrlKey) {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                        break;
                    case 'End':
                        if (e.ctrlKey) {
                            e.preventDefault();
                            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                        }
                        break;
                }
            });
        }

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

        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        document.addEventListener('DOMContentLoaded', function() {
            createParticles();
            createCodeRain();
            initSmoothScrolling();
            initCTAScrolling();
            initNavbarEffects();
            initScrollAnimations();
            initTypingEffect();
            initParallaxEffects();
            initSocialLinkEffects();
            initCursorTrail();
            initMagneticEffect();
            initKeyboardNavigation();
        });

        window.addEventListener('resize', function() {
            const codeRainContainer = document.getElementById('codeRain');
            createCodeRain();
        });

        let ticking = false;
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateAnimations);
                ticking = true;
            }
        }

        function updateAnimations() {
            // Update scroll-based animations here
            ticking = false;
        }

        window.addEventListener('scroll', requestTick);