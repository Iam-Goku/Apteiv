// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Testimonial Slider
const testimonials = document.querySelectorAll('.testimonial');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonials.forEach(testimonial => {
        testimonial.classList.remove('active');
    });
    testimonials[index].classList.add('active');
}

prevBtn.addEventListener('click', () => {
    currentTestimonial--;
    if (currentTestimonial < 0) {
        currentTestimonial = testimonials.length - 1;
    }
    showTestimonial(currentTestimonial);
});

nextBtn.addEventListener('click', () => {
    currentTestimonial++;
    if (currentTestimonial >= testimonials.length) {
        currentTestimonial = 0;
    }
    showTestimonial(currentTestimonial);
});

// Portfolio Filtering
const filterButtons = document.querySelectorAll('.filter-buttons button');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter items
        const filter = button.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
            } else {
                item.style.display =