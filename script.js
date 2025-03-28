document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Mobile navigation toggle
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () => {
        // Toggle nav
        navLinks.classList.toggle('active');
        
        // Animate burger
        burger.classList.toggle('toggle');
        
        // Animate nav items
        navItems.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                burger.classList.remove('toggle');
                navItems.forEach(link => {
                    link.style.animation = '';
                });
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animate skill bars on scroll
    const skillsSection = document.querySelector('.skills');
    const skillBars = document.querySelectorAll('.skill-level');
    
    function animateSkillBars() {
        const skillsPosition = skillsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (skillsPosition < screenPosition) {
            skillBars.forEach(bar => {
                const level = bar.parentElement.parentElement.getAttribute('data-level');
                bar.style.width = level + '%';
            });
        }
    }
    
    window.addEventListener('scroll', animateSkillBars);
    
    // Form submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For this example, we'll just log it and show an alert
            console.log({ name, email, message });
            
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Scroll reveal animation
    const sr = ScrollReveal({
        origin: 'top',
        distance: '30px',
        duration: 1000,
        reset: true
    });
    
    sr.reveal('.hero-content, .hero-image, .about-text, .about-image, .skill-category, .project-card, .contact-form, .contact-info', {
        interval: 200
    });
});

// Simple polyfill for ScrollReveal if not included
if (typeof ScrollReveal !== 'function') {
    window.ScrollReveal = function() {
        return {
            reveal: function() {}
        };
    };
}