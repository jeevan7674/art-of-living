document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', function() {
        nav.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (nav.classList.contains('active')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      });
    }
  
    // Testimonial Slider
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
  
    function showSlide(n) {
      // Hide all slides
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      
      // Show the selected slide
      slides[n].classList.add('active');
      dots[n].classList.add('active');
      currentSlide = n;
    }
  
    // Dot navigation
    dots.forEach(dot => {
      dot.addEventListener('click', function() {
        const slideIndex = parseInt(this.getAttribute('data-index'));
        showSlide(slideIndex);
      });
    });
  
    // Previous button
    if (prevBtn) {
      prevBtn.addEventListener('click', function() {
        let newSlide = currentSlide - 1;
        if (newSlide < 0) newSlide = slides.length - 1;
        showSlide(newSlide);
      });
    }
  
    // Next button
    if (nextBtn) {
      nextBtn.addEventListener('click', function() {
        let newSlide = currentSlide + 1;
        if (newSlide >= slides.length) newSlide = 0;
        showSlide(newSlide);
      });
    }
  
    // Auto advance slides every 5 seconds
    setInterval(function() {
      let newSlide = currentSlide + 1;
      if (newSlide >= slides.length) newSlide = 0;
      showSlide(newSlide);
    }, 5000);
  
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      
      question.addEventListener('click', function() {
        // Toggle active class on the clicked item
        item.classList.toggle('active');
        
        // Update the toggle icon
        const icon = item.querySelector('.toggle-icon i');
        if (item.classList.contains('active')) {
          icon.classList.remove('fa-plus');
          icon.classList.add('fa-minus');
        } else {
          icon.classList.remove('fa-minus');
          icon.classList.add('fa-plus');
        }
      });
    });
  
    // Modal functionality
    const openModalButtons = document.querySelectorAll('.open-modal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const allModals = document.querySelectorAll('.modal');
  
    // Open modal
    openModalButtons.forEach(button => {
      button.addEventListener('click', function() {
        const modalType = button.getAttribute('data-modal');
        const modal = document.getElementById(`${modalType}-modal`);
        if (modal) {
          modal.style.display = 'flex';
          // Add body scrolling prevention
          document.body.style.overflow = 'hidden';
        }
      });
    });
  
    // Close modal with X button
    closeModalButtons.forEach(button => {
      button.addEventListener('click', function() {
        const modal = button.closest('.modal');
        modal.style.display = 'none';
        // Remove body scrolling prevention
        document.body.style.overflow = 'auto';
      });
    });
  
    // Close modal when clicking outside
    allModals.forEach(modal => {
      modal.addEventListener('click', function(event) {
        if (event.target === modal) {
          modal.style.display = 'none';
          // Remove body scrolling prevention
          document.body.style.overflow = 'auto';
        }
      });
    });
  
    // Form submission
    const trialForm = document.getElementById('trial-form');
    if (trialForm) {
      trialForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Form validation would go here
        const formData = new FormData(trialForm);
        let formIsValid = true;
        
        // Basic validation example
        for (const [key, value] of formData.entries()) {
          const input = document.getElementById(key);
          if (input && input.hasAttribute('required') && !value) {
            formIsValid = false;
            input.classList.add('error');
          } else if (input) {
            input.classList.remove('error');
          }
        }
        
        if (formIsValid) {
          // Submit form - in production, you'd send this data to your server
          // For demo, we'll just show a success message
          const modal = document.getElementById('trial-modal');
          const modalContent = modal.querySelector('.modal-content');
          
          // Replace form with success message
          modalContent.innerHTML = `
            <span class="close-modal">&times;</span>
            <div class="success-message">
              <i class="fas fa-check-circle"></i>
              <h2>Thank You!</h2>
              <p>Your free trial class has been booked successfully. We've sent a confirmation to your email with all the details.</p>
              <button class="primary-btn close-modal">Close</button>
            </div>
          `;
          
          // Re-attach close event to new buttons
          const newCloseButtons = modal.querySelectorAll('.close-modal');
          newCloseButtons.forEach(button => {
            button.addEventListener('click', function() {
              modal.style.display = 'none';
              document.body.style.overflow = 'auto';
            });
          });
        }
      });
    }
  
    // Enrollment buttons
    const enrollButtons = document.querySelectorAll('.enroll-btn');
    enrollButtons.forEach(button => {
      button.addEventListener('click', function() {
        const program = this.getAttribute('data-program');
        // In a real implementation, this could redirect to a checkout page
        // or open a modal with program details
        alert(`Thank you for your interest in our ${program} program! You'll be redirected to the checkout page.`);
      });
    });
  
    // Back to top button
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopButton.style.display = 'block';
      } else {
        backToTopButton.style.display = 'none';
      }
    });
    
    backToTopButton.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#" or non-existent element
        if (href === '#' || !document.querySelector(href)) return;
        
        e.preventDefault();
        
        const offsetTop = document.querySelector(href).offsetTop;
        
        scroll({
          top: offsetTop - 80, // Offset for header
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (nav.classList.contains('active')) {
          nav.classList.remove('active');
          const icon = mobileMenuBtn.querySelector('i');
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      });
    });
  
    // Add animations on scroll
    const animatedElements = document.querySelectorAll('.program-card, .feature, .timeline-item, .teacher-card');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
    
    animatedElements.forEach(element => {
      observer.observe(element);
    });
  });