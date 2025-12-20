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

// Hide/show header on scroll
let lastScrollTop = 0;
let scrollTimeout;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Hide header when scrolling down
    if (scrollTop > lastScrollTop && scrollTop > 150) {
        header.classList.add('hidden');
    } else {
        // Show header when scrolling up
        header.classList.remove('hidden');
    }
    
    // Clear existing timeout
    clearTimeout(scrollTimeout);
    
    // Show header when user stops scrolling
    scrollTimeout = setTimeout(() => {
        header.classList.remove('hidden');
    }, 150);
    
    lastScrollTop = scrollTop;
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
