// Hamburger Menu Toggle
const menuIcon = document.getElementById('menu-icon');
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('nav a');

// Toggle menu when hamburger is clicked
menuIcon.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Close menu when a nav link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !menuIcon.contains(e.target)) {
        nav.classList.remove('active');
    }
});

// Smooth scrolling for navigation links
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

// Active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Handle window resize
let windowWidth = window.innerWidth;

window.addEventListener('resize', () => {
    // Close mobile menu when resizing to desktop
    if (window.innerWidth > 996 && windowWidth <= 996) {
        nav.classList.remove('active');
    }
    windowWidth = window.innerWidth;
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,  // Reduced threshold
    rootMargin: '0px'  // Simplified margin
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate__animated', 'animate__fadeInUp');
            observer.unobserve(entry.target); // Stop observing after animation
        }
    });
}, observerOptions);

// Observe home section elements - IMMEDIATELY on load
const homeContent = document.querySelector('.home-content');
const homeImg = document.querySelector('.home-img');

if (homeContent) {
    observer.observe(homeContent);
    // Force animation if already in view
    setTimeout(() => {
        const rect = homeContent.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            homeContent.classList.add('animate__animated', 'animate__fadeInUp');
        }
    }, 100);
}

if (homeImg) {
    observer.observe(homeImg);
    // Force animation if already in view
    setTimeout(() => {
        const rect = homeImg.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            homeImg.classList.add('animate__animated', 'animate__fadeInUp');
        }
    }, 100);
}
