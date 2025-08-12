// DOM Ready Function
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.main-nav');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('open');
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Sticky Header
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            header.classList.toggle('sticky', window.scrollY > 50);
        });
    }

    // Testimonial Slider
    const initTestimonialSlider = () => {
        const slider = document.querySelector('.testimonial-slider');
        if (slider) {
            let currentIndex = 0;
            const testimonials = document.querySelectorAll('.testimonial');
            const totalTestimonials = testimonials.length;
            
            function showTestimonial(index) {
                testimonials.forEach((testimonial, i) => {
                    testimonial.style.display = i === index ? 'block' : 'none';
                });
            }
            
            document.querySelector('.testimonial-next').addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % totalTestimonials;
                showTestimonial(currentIndex);
            });
            
            document.querySelector('.testimonial-prev').addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;
                showTestimonial(currentIndex);
            });
            
            showTestimonial(0);
        }
    };
    initTestimonialSlider();

    // Form Validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
                
                // Email validation
                if (field.type === 'email') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(field.value.trim())) {
                        isValid = false;
                        field.classList.add('error');
                    }
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                this.querySelector('.form-error').style.display = 'block';
            }
        });
    });

    // Animation Triggers
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    };
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
});

// Intersection Observer for Lazy Loading
const initObservers = () => {
    const lazyImages = document.querySelectorAll('img.lazy');
    const lazyObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => {
        lazyObserver.observe(img);
    });

    // Animation Observer
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-me').forEach(el => {
        animationObserver.observe(el);
    });
};

document.addEventListener('DOMContentLoaded', initObservers);

class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        if (!this.form) return;
        
        this.submitBtn = this.form.querySelector('button[type="submit"]');
        this.originalSubmitText = this.submitBtn.textContent;
        
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        // Disable submit button
        this.submitBtn.disabled = true;
        this.submitBtn.textContent = 'Sending...';
        
        try {
            const formData = new FormData(this.form);
            const response = await fetch('https://your-api-endpoint.com/submit', {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                this.showSuccess();
                this.form.reset();
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            this.showError();
            console.error('Error:', error);
        } finally {
            this.submitBtn.disabled = false;
            this.submitBtn.textContent = this.originalSubmitText;
        }
    }
    
    showSuccess() {
        const successDiv = document.createElement('div');
        successDiv.className = 'alert success';
        successDiv.textContent = 'Thank you! Your message has been sent successfully.';
        
        this.form.prepend(successDiv);
        setTimeout(() => successDiv.remove(), 5000);
    }
    
    showError() {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'alert error';
        errorDiv.textContent = 'Oops! Something went wrong. Please try again later.';
        
        this.form.prepend(errorDiv);
        setTimeout(() => errorDiv.remove(), 5000);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ContactForm();
});

class PortfolioFilter {
    constructor() {
        this.container = document.querySelector('.portfolio-grid');
        if (!this.container) return;
        
        this.items = Array.from(this.container.querySelectorAll('.portfolio-item'));
        this.filters = document.querySelectorAll('.portfolio-filter button');
        
        this.initEvents();
    }
    
    initEvents() {
        this.filters.forEach(filter => {
            filter.addEventListener('click', () => {
                // Update active filter
                this.filters.forEach(f => f.classList.remove('active'));
                filter.classList.add('active');
                
                // Filter items
                const category = filter.dataset.filter;
                this.filterItems(category);
            });
        });
    }
    
    filterItems(category) {
        this.items.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioFilter();
});

class PackageToggle {
    constructor() {
        this.toggle = document.getElementById('package-toggle');
        if (!this.toggle) return;
        
        this.monthly = document.getElementById('monthly-packages');
        this.annually = document.getElementById('annually-packages');
        
        this.initEvents();
    }
    
    initEvents() {
        this.toggle.addEventListener('change', () => {
            if (this.toggle.checked) {
                this.monthly.style.display = 'none';
                this.annually.style.display = 'block';
            } else {
                this.monthly.style.display = 'block';
                this.annually.style.display = 'none';
            }
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new PackageToggle();
});

//Pricing tab

document.addEventListener('DOMContentLoaded', function() {
    // Get all tab elements
    const tabButtons = document.querySelectorAll('.pricing-tabs .tab-button');
    const tabContents = document.querySelectorAll('.pricing-section .tab-content');
    
    // Function to switch tabs
    function switchTab(tabId) {
        // Hide all tab contents
        tabContents.forEach(content => {
            content.classList.remove('active');
        });
        
        // Show selected tab content
        const activeContent = document.getElementById(tabId);
        if (activeContent) {
            activeContent.classList.add('active');
        }
        
        // Update active tab button
        tabButtons.forEach(button => {
            button.classList.remove('active');
            if (button.getAttribute('data-tab') === tabId) {
                button.classList.add('active');
            }
        });
    }
    
    // Add click event to each tab button
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            switchTab(tabId);
        });
    });
    
    // Activate the first tab by default
    if (tabButtons.length > 0) {
        const firstTabId = tabButtons[0].getAttribute('data-tab');
        switchTab(firstTabId);
    }
});

//Navbar Hamburger
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  hamburger.addEventListener('click', function() {
    // Toggle active class on hamburger
    this.classList.toggle('active');
    
    // Toggle active class on nav links
    navLinks.classList.toggle('active');
    
    // Toggle body overflow when menu is open
    document.body.style.overflow = this.classList.contains('active') ? 'hidden' : '';
  });

  // Close menu when clicking on a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
});