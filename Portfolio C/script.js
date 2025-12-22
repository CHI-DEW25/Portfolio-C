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

/* =========================
   TOAST NOTIFICATION
========================= */
function showToast(message, title = "Hooray!") {
    const container = document.getElementById("toast-container");

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;

    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fa-solid fa-circle-check"></i>
        </div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <div class="toast-close">&times;</div>
    `;

    container.appendChild(toast);

    // Manual close
    toast.querySelector(".toast-close").addEventListener("click", () => {
        removeToast(toast);
    });

    // Auto dismiss
    setTimeout(() => {
        removeToast(toast);
    }, 3000);
}

function removeToast(toast) {
    toast.classList.add("exit");

    setTimeout(() => {
        toast.remove();
    }, 500);
}

document.getElementById("contact-submit").addEventListener("click", () => {
    showToast("Your message has been sent successfully.");
});
