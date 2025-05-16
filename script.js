document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation (unchanged)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Sticky Navigation (unchanged)
    const navbar = document.querySelector('.navbar');
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        if (window.scrollY > 500) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    // Smooth scrolling (unchanged)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Enhanced Animation System
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add section entrance animation
                if (element.classList.contains('section')) {
                    element.classList.add('section-entering');
                }
                
                // Handle different animation types
                if (element.classList.contains('animate-slide-in')) {
                    element.style.animation = 'slideIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards';
                    element.style.animationDelay = element.dataset.delay || '0s';
                } 
                else if (element.classList.contains('animate-fade-in')) {
                    element.style.animation = 'fadeIn 1s ease-out forwards';
                    element.style.animationDelay = element.dataset.delay || '0s';
                }
                else if (element.classList.contains('animate-progress')) {
                    const progress = element.querySelector('.progress');
                    const width = element.dataset.width;
                    progress.style.width = width;
                    progress.style.animation = 'progressBar 1.5s cubic-bezier(0.65, 0, 0.35, 1) forwards';
                    
                }
                else if (element.classList.contains('animate-bounce')) {
                    element.style.animation = 'bounceIn 0.8s cubic-bezier(0.68, -0.6, 0.32, 1.6) forwards';
                }
                else if (element.classList.contains('animate-float')) {
                    element.style.animation = 'float 4s ease-in-out infinite';
                }
                
                // Don't observe anymore if it's not a repeating animation
                if (!element.classList.contains('repeat-animation')) {
                    animationObserver.unobserve(element);
                }
            } 
            else if (element.classList.contains('repeat-animation')) {
                // Reset animation for elements that should repeat
                if (element.classList.contains('animate-slide-in')) {
                    element.style.animation = 'none';
                    element.style.opacity = '0';
                    element.style.transform = 'translateX(-50px)';
                } 
                else if (element.classList.contains('animate-fade-in')) {
                    element.style.animation = 'none';
                    element.style.opacity = '0';
                }
                else if (element.classList.contains('animate-progress')) {
                    const progress = element.querySelector('.progress');
                    progress.style.animation = 'none';
                    progress.style.width = '0';
                }
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observe all animated elements
    document.querySelectorAll('.animate-slide-in, .animate-fade-in, .animate-progress, .section').forEach(el => {
        animationObserver.observe(el);
    });
    
    // Add hover animations to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    });
    
    // Form submission (unchanged)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
});

// Ambil semua link dan section yang sesuai
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";

    // Cek posisi scroll untuk tentukan section aktif
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    // Tambah dan hapus class 'active' sesuai section aktif
    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});
