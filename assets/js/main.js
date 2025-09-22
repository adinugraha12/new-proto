// Menu Show/Hide
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId);
    const nav = document.getElementById(navId);

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show');
            // Toggle ARIA attribute for accessibility
            const isExpanded = nav.classList.contains('show');
            toggle.setAttribute('aria-expanded', isExpanded);
        });
    } else {
        console.warn(`Element with ID ${toggleId} or ${navId} not found.`);
    }
};
showMenu('nav-toggle', 'nav-menu');

// Remove Menu on Mobile Link Click
const navLinks = document.querySelectorAll('.nav__link');
const navMenu = document.getElementById('nav-menu');

const linkAction = () => {
    if (navMenu) {
        navMenu.classList.remove('show');
        const toggle = document.getElementById('nav-toggle');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }
};
navLinks.forEach(link => link.addEventListener('click', linkAction));

// Scroll Sections Active Link
const sections = document.querySelectorAll('section[id]');

// Debounce function to limit scroll event frequency
const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
};

const scrollActive = () => {
    const scrollY = window.scrollY;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 58;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav__menu a[href*="${sectionId}"]`);

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active-link');
            } else {
                navLink.classList.remove('active-link');
            }
        }
    });
};
window.addEventListener('scroll', debounce(scrollActive, 100));

// ScrollReveal Animation
if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({
        origin: 'top',
        distance: '60px',
        duration: 2000,
        delay: 200,
        reset: true // Enable animations on repeated scrolls
    });

    sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text');
    sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img', { delay: 400 });
    sr.reveal('.home__social-icon', { interval: 200 });
    sr.reveal('.skills__data, .work__img, .contact__input', { interval: 200 });
} else {
    console.warn('ScrollReveal library not loaded.');
}

// Contact Form Submission with Formspree
const contactForm = document.querySelector('.contact__form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent default form submission

        const form = e.target;
        const submitButton = form.querySelector('.contact__button');
        submitButton.disabled = true; // Disable button during submission

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                alert('Pesan berhasil dikirim! Terima kasih telah menghubungi.');
                form.reset(); // Clear form fields
            } else {
                alert('Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            alert('Terjadi kesalahan jaringan. Silakan periksa koneksi Anda.');
        } finally {
            submitButton.disabled = false; // Re-enable button
        }
    });
} else {
    console.warn('Contact form not found.');
}
