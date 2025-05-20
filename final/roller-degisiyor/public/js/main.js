// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(18, 18, 18, 0.98)';
    } else {
        navbar.style.background = 'rgba(18, 18, 18, 0.95)';
    }
});

// Mobile menu toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

// Smooth scroll for anchor links
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

// Observe all elements with fade-in class
document.querySelectorAll('.fade-in').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease-out';
    observer.observe(element);
});

// Typing animation for hero text
const heroText = document.querySelector('.animated-text');
if (heroText) {
    const text = heroText.textContent;
    heroText.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            heroText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }

    typeWriter();
}

// Add fade-in class to elements when they come into view
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.feature-card, .hero-subtitle, .cta-button');
    elements.forEach(element => {
        element.classList.add('fade-in');
    });
});

// Ürün kartları için Intersection Observer
const productCards = document.querySelectorAll('.product-card');

const productObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            productObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '50px'
});

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Form verilerini al
            const message = {
                text: document.getElementById('message').value,
                subject: document.getElementById('subject').value,
            };

            try {
                const response = await fetch('/message', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ message })
                });

                const result = await response.json();
                
                if (result.ok) {
                    Swal.fire({
                        title: 'Başarılı!',
                        text: 'Mesajınız gönderildi.',
                        icon: 'success',
                        confirmButtonText: 'Tamam'
                    });
                    
                    // Formu temizle
                    contactForm.reset();
                } else {
                    throw new Error('Mesaj gönderilemedi');
                }
            } catch (error) {
                Swal.fire({
                    title: 'Hata!',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'Tamam'
                });
            }
        });
    }
});

