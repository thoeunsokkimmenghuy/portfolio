document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.nav-link-item').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                document.querySelectorAll('.nav-link-item').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link-item');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -40% 0px',
        threshold: 0
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            const link = document.querySelector(`.nav-link-item[href="#${id}"]`);
            if(entry.isIntersecting) {
                navLinks.forEach(l => l.classList.remove('active'));
                if(link) link.classList.add('active');
            }
        });
    }, observerOptions);
    
    sections.forEach(section => sectionObserver.observe(section));

    const animationOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                const skillButtons = entry.target.querySelectorAll('.skill-button');
                const timelineElements = entry.target.querySelectorAll('.timeline-element');
                const paragraphs = entry.target.querySelectorAll('p:not(.timeline-description)');
                const titles = entry.target.querySelectorAll('h2, h3, h4:not(.timeline-subtitle)');
                
                skillButtons.forEach((btn, index) => {
                    btn.style.animationDelay = (index * 0.05) + 's';
                    btn.classList.add('animate-in');
                });
                
                timelineElements.forEach((element, index) => {
                    element.style.animationDelay = (index * 0.2) + 's';
                    element.classList.add('animate-in');
                });
                
                paragraphs.forEach((para, index) => {
                    para.style.animationDelay = (index * 0.1) + 's';
                    para.classList.add('animate-in');
                });
                
                titles.forEach((title, index) => {
                    title.style.animationDelay = (index * 0.1) + 's';
                    title.classList.add('animate-in');
                });
            } else {
                entry.target.classList.remove('animate-in');
                entry.target.querySelectorAll('.skill-button, .timeline-element, p, h2, h3, h4').forEach(el => {
                    el.classList.remove('animate-in');
                });
            }
        });
    }, animationOptions);

    sections.forEach(section => {
        animationObserver.observe(section);
    });
    
    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
});
