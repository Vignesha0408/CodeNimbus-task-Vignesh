// ===== Mobile Menu Toggle =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 70;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Active Navigation on Scroll =====
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink.classList.add('active');
        } else {
            navLink.classList.remove('active');
        }
    });
});

// ===== Template Filtering =====
const filterBtns = document.querySelectorAll('.filter-btn');
const templateCards = document.querySelectorAll('.template-card');

if (filterBtns.length > 0 && templateCards.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            templateCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (filterValue === 'all' || filterValue === cardCategory) {
                    card.style.display = 'block';
                    // Add animation
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ===== Custom Invitation Editor & Live Preview =====
const invitationForm = document.getElementById('invitationForm');
const previewCard = document.getElementById('previewCard');

// Form elements
const eventTitle = document.getElementById('eventTitle');
const hostName = document.getElementById('hostName');
const eventDate = document.getElementById('eventDate');
const eventTime = document.getElementById('eventTime');
const venue = document.getElementById('venue');
const message = document.getElementById('message');
const theme = document.getElementById('theme');
const font = document.getElementById('font');
const alignment = document.getElementById('alignment');
const background = document.getElementById('background');

// Preview elements
const previewTitle = document.getElementById('previewTitle');
const previewHost = document.getElementById('previewHost');
const previewDate = document.getElementById('previewDate');
const previewTime = document.getElementById('previewTime');
const previewVenue = document.getElementById('previewVenue');
const previewMessage = document.getElementById('previewMessage');

// Function to format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Function to format time
function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
}

// Initialize form elements if they exist
if (eventDate && previewDate) {
    // Set default date
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    eventDate.value = formattedDate;
    previewDate.textContent = formatDate(formattedDate);
}

// Live preview updates - only if elements exist
if (eventTitle && previewTitle) {
    eventTitle.addEventListener('input', () => {
        previewTitle.textContent = eventTitle.value || 'You\'re Invited';
    });
}

if (hostName && previewHost) {
    hostName.addEventListener('input', () => {
        previewHost.textContent = hostName.value || 'The Smith Family';
    });
}

if (eventDate && previewDate) {
    eventDate.addEventListener('input', () => {
        previewDate.textContent = formatDate(eventDate.value);
    });
}

if (eventTime && previewTime) {
    eventTime.addEventListener('input', () => {
        previewTime.textContent = formatTime(eventTime.value);
    });
}

if (venue && previewVenue) {
    venue.addEventListener('input', () => {
        previewVenue.textContent = venue.value || 'The Grand Ballroom';
    });
}

if (message && previewMessage) {
    message.addEventListener('input', () => {
        previewMessage.textContent = message.value || 'We cordially invite you to celebrate this special occasion with us.';
    });
}

// Theme selection
if (theme && previewCard) {
    theme.addEventListener('change', () => {
        previewCard.classList.remove('elegant', 'modern', 'romantic', 'festive', 'minimal');
        previewCard.classList.add(theme.value);
    });
}

// Font selection
if (font && previewCard) {
    font.addEventListener('change', () => {
        previewCard.classList.remove('font-playfair', 'font-poppins', 'font-serif', 'font-sans-serif');
        previewCard.classList.add(`font-${font.value}`);
    });
}

// Text alignment
if (alignment && previewCard) {
    alignment.addEventListener('change', () => {
        previewCard.classList.remove('align-center', 'align-left', 'align-right');
        previewCard.classList.add(`align-${alignment.value}`);
    });
}

// Background selection
if (background && previewCard) {
    background.addEventListener('change', () => {
        previewCard.classList.remove('bg-gradient1', 'bg-gradient2', 'bg-gradient3', 'bg-solid1', 'bg-pattern1');
        previewCard.classList.add(`bg-${background.value}`);
    });
}

// Form submission
if (invitationForm) {
    invitationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Invitation generated successfully!');
    });
}

// ===== Contact Form Validation =====
const contactForm = document.getElementById('contactForm');
const contactName = document.getElementById('contactName');
const contactEmail = document.getElementById('contactEmail');
const contactMessage = document.getElementById('contactMessage');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Basic validation
        let isValid = true;

        // Name validation
        if (contactName && contactName.value.trim() === '') {
            showError(contactName, 'Please enter your name');
            isValid = false;
        } else if (contactName) {
            clearError(contactName);
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (contactEmail && contactEmail.value.trim() === '') {
            showError(contactEmail, 'Please enter your email');
            isValid = false;
        } else if (contactEmail && !emailRegex.test(contactEmail.value)) {
            showError(contactEmail, 'Please enter a valid email');
            isValid = false;
        } else if (contactEmail) {
            clearError(contactEmail);
        }

        // Message validation
        if (contactMessage && contactMessage.value.trim() === '') {
            showError(contactMessage, 'Please enter your message');
            isValid = false;
        } else if (contactMessage) {
            clearError(contactMessage);
        }

        if (isValid) {
            // Show success notification
            showNotification('Message sent successfully!');
            // Reset form
            contactForm.reset();
        }
    });
}

function showError(input, message) {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector('.error-message') || document.createElement('span');
    error.className = 'error-message';
    error.style.color = '#e91e63';
    error.style.fontSize = '0.85rem';
    error.style.marginTop = '0.3rem';
    error.textContent = message;

    if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(error);
    }

    input.style.borderColor = '#e91e63';
}

function clearError(input) {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector('.error-message');
    if (error) {
        error.remove();
    }
    input.style.borderColor = '#e0e0e0';
}

// ===== Notification System =====
function showNotification(message) {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');

    if (notification && notificationText) {
        notificationText.textContent = message;
        notification.classList.add('show');

        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    } else {
        // Fallback to alert if notification elements don't exist
        alert(message);
    }
}

// ===== Scroll Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for scroll animation
document.querySelectorAll('.section-header, .template-card, .feature-card, .step, .about-text, .contact-item').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// ===== Template "Use Template" Buttons =====
const templateButtons = document.querySelectorAll('.btn-template');

if (templateButtons.length > 0) {
    templateButtons.forEach(button => {
        button.addEventListener('click', function() {
            const templateCard = this.closest('.template-card');
            const category = templateCard.getAttribute('data-category');
            const customSection = document.querySelector('#custom');

            // Scroll to custom section
            if (customSection) {
                customSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }

            // Set theme based on category if elements exist
            if (theme && previewCard) {
                let themeValue = 'elegant';
                switch(category) {
                    case 'wedding':
                        themeValue = 'elegant';
                        break;
                    case 'birthday':
                        themeValue = 'festive';
                        break;
                    case 'engagement':
                        themeValue = 'romantic';
                        break;
                    case 'baby-shower':
                        themeValue = 'festive';
                        break;
                    case 'anniversary':
                        themeValue = 'romantic';
                        break;
                    case 'party':
                        themeValue = 'modern';
                        break;
                }

                theme.value = themeValue;
                previewCard.classList.remove('elegant', 'modern', 'romantic', 'festive', 'minimal');
                previewCard.classList.add(themeValue);
            }

            showNotification('Template loaded! Customize your invitation.');
        });
    });
}

// ===== Header Background on Scroll =====
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    }
});

// ===== Open Invite Button Function =====
function scrollToTemplates() {
    document.querySelector('#templates').scrollIntoView({
        behavior: 'smooth'
    });
}

// ===== RSVP Modal Function =====
function openRSVP() {
    showNotification('RSVP feature coming soon! Stay tuned.');
}

// ===== Map Functions =====
function openDirections() {
    const destination = "123 Invitation Street, Design City, DC 12345";
    const encodedDestination = encodeURIComponent(destination);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodedDestination}`, '_blank');
}

function openMapInNewTab() {
    const destination = "123 Invitation Street, Design City, DC 12345";
    const encodedDestination = encodeURIComponent(destination);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedDestination}`, '_blank');
}

// ===== Invitation Card 3D Effect =====
const invitationCard = document.getElementById('invitationCard');
if (invitationCard) {
    invitationCard.addEventListener('mousemove', (e) => {
        const rect = invitationCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        invitationCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    invitationCard.addEventListener('mouseleave', () => {
        invitationCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
}

// ===== Parallax Effect for Hero =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// ===== Initialize on page load =====
document.addEventListener('DOMContentLoaded', () => {
    // Set initial preview values
    previewDate.textContent = formatDate(eventDate.value);
    previewTime.textContent = formatTime(eventTime.value);
    
    // Add entrance animations
    const animatedElements = document.querySelectorAll('.hero-invitation, .hero-text');
    animatedElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.3}s`;
    });
});
