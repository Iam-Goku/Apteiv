// DOM Ready Function
document.addEventListener('DOMContentLoaded', function() {

  // ===============================
  // Mobile Menu Toggle (Modern & Safe)
  // ===============================
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('open');
            mobileMenu.classList.toggle('hidden');
        });
    } else {
        console.error("Could not find menu button or mobile menu elements.");
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });

                // Close mobile menu after clicking a link
                if (!mobileMenu.classList.contains('hidden')) {
                    menuBtn.classList.remove('open');
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
    
  // ===============================
  // Go to Top button functionality
  // ===============================
  const goTopBtn = document.getElementById('goTopBtn');
  if(goTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        goTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        goTopBtn.classList.add('opacity-100');
      } else {
        goTopBtn.classList.add('opacity-0', 'pointer-events-none');
        goTopBtn.classList.remove('opacity-100');
      }
    });
    goTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===============================
  // Contact Form Handler
  // ===============================
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
      this.submitBtn.disabled = true;
      this.submitBtn.textContent = 'Sending...';
      try {
        const formData = new FormData(this.form);
        const response = await fetch('https://your-api-endpoint.com/submit', { method: 'POST', body: formData });
        if (response.ok) {
          this.showSuccess();
          this.form.reset();
        } else throw new Error('Network response was not ok');
      } catch (err) {
        this.showError();
        console.error(err);
      } finally {
        this.submitBtn.disabled = false;
        this.submitBtn.textContent = this.originalSubmitText;
      }
    }
    showSuccess() {
      const div = document.createElement('div');
      div.className = 'alert success';
      div.textContent = 'Thank you! Your message has been sent successfully.';
      this.form.prepend(div);
      setTimeout(() => div.remove(), 5000);
    }
    showError() {
      const div = document.createElement('div');
      div.className = 'alert error';
      div.textContent = 'Oops! Something went wrong. Please try again later.';
      this.form.prepend(div);
      setTimeout(() => div.remove(), 5000);
    }
  }
  new ContactForm();

  // ===============================
  // Portfolio Filter
  // ===============================
  class PortfolioFilter {
    constructor() {
      this.container = document.querySelector('.portfolio-grid');
      if (!this.container) return;
      this.items = Array.from(this.container.querySelectorAll('.portfolio-item'));
      this.filters = document.querySelectorAll('.portfolio-filter button');
      this.initEvents();
    }
    initEvents() {
      this.filters.forEach(f => f.addEventListener('click', () => {
        this.filters.forEach(btn => btn.classList.remove('active'));
        f.classList.add('active');
        this.filterItems(f.dataset.filter);
      }));
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
          setTimeout(() => { item.style.display = 'none'; }, 300);
        }
      });
    }
  }
  new PortfolioFilter();

  // ===============================
  // Package Toggle (Monthly/Annually)
  // ===============================
  class PackageToggle {
    constructor() {
      this.toggle = document.getElementById('package-toggle');
      if (!this.toggle) return;
      this.monthly = document.getElementById('monthly-packages');
      this.annually = document.getElementById('annually-packages');
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
  new PackageToggle();

  // ===============================
  // Pricing Tabs
  // ===============================
  const tabButtons = document.querySelectorAll('.pricing-tabs .tab-button');
  const tabContents = document.querySelectorAll('.pricing-section .tab-content');
  function switchTab(tabId) {
    tabContents.forEach(c => c.classList.remove('active'));
    const activeContent = document.getElementById(tabId);
    if (activeContent) activeContent.classList.add('active');
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabButtons.forEach(btn => {
      if (btn.dataset.tab === tabId) btn.classList.add('active');
    });
  }
  tabButtons.forEach(btn => btn.addEventListener('click', () => switchTab(btn.dataset.tab)));
  if (tabButtons.length) switchTab(tabButtons[0].dataset.tab);

  // ===============================
  // Lottie Animations
  // ===============================
  const lottieAnimations = [
    { id: 'lottie-price', path: 'images/anime-price.json' },
    { id: 'lottie-services', path: 'images/anime-service.json' },
    { id: 'lottie-webdev', path: 'images/anime-webdev.json' },
    { id: 'lottie-maintenance', path: 'images/anime-maintenance.json' },
    { id: 'lottie-contact', path: 'images/anime-contact.json' }
  ];
  lottieAnimations.forEach(a => {
    const container = document.getElementById(a.id);
    if (container) lottie.loadAnimation({ container, renderer: 'svg', loop: true, autoplay: true, path: a.path });
  });

  // ===============================
  // Animate On Scroll
  // ===============================
  const animateOnScroll = () => {
    document.querySelectorAll('.animate, .animate-me').forEach(el => {
      const pos = el.getBoundingClientRect().top;
      if (pos < window.innerHeight / 1.2) el.classList.add('animated', 'animate-in');
    });
  };
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll();

  // ===============================
  // Intersection Observer for Lazy Loading
  // ===============================
  const lazyImages = document.querySelectorAll('img.lazy');
  const lazyObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        obs.unobserve(img);
      }
    });
  });
  lazyImages.forEach(img => lazyObserver.observe(img));

  // ===============================
  // Dark Mode Toggle
  // ===============================
  const darkModeBtn = document.getElementById("darkModeBtn");
  const body = document.body;
  const savedTheme = localStorage.getItem("theme");
  if (darkModeBtn) {
    if (savedTheme === "dark") {
      body.classList.add("dark-mode");
      darkModeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    } else darkModeBtn.innerHTML = '<i class="fas fa-moon"></i>';

    darkModeBtn.addEventListener("click", () => {
      body.classList.toggle("dark-mode");
      if (body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        darkModeBtn.innerHTML = '<i class="fas fa-sun"></i>';
      } else {
        localStorage.setItem("theme", "light");
        darkModeBtn.innerHTML = '<i class="fas fa-moon"></i>';
      }
    });
  }

});
