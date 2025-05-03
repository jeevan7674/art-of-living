document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
    
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    const searchDiv = document.querySelector('.search');
    
    header.insertBefore(menuToggle, searchDiv);
    
    menuToggle.addEventListener('click', function() {
      nav.classList.toggle('active');
      if (nav.classList.contains('active')) {
        menuToggle.innerHTML = '<i class="fa-solid fa-xmark"></i>';
      } else {
        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      }
    });
    
    // Shrink header on scroll
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
    
    // Add back to top button
    const backToTopBtn = document.createElement('a');
    backToTopBtn.href = '#';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });
    
    backToTopBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const headerHeight = document.querySelector('header').offsetHeight;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Close mobile menu if open
          if (nav.classList.contains('active')) {
            nav.classList.remove('active');
            menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
          }
        }
      });
    });
    
    // Testimonial carousel functionality
    let currentReviewIndex = 0;
    const reviews = document.querySelectorAll('.reviews');
    const totalReviews = reviews.length;
    
    if (totalReviews > 1) {
      // Create carousel controls
      const carouselControls = document.createElement('div');
      carouselControls.className = 'carousel-controls';
      
      const prevBtn = document.createElement('button');
      prevBtn.className = 'carousel-btn prev';
      prevBtn.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
      
      const nextBtn = document.createElement('button');
      nextBtn.className = 'carousel-btn next';
      nextBtn.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
      
      const dotsContainer = document.createElement('div');
      dotsContainer.className = 'carousel-dots';
      
      for (let i = 0; i < totalReviews; i++) {
        const dot = document.createElement('span');
        dot.className = 'carousel-dot';
        if (i === 0) dot.classList.add('active');
        dot.dataset.index = i;
        dotsContainer.appendChild(dot);
      }
      
      carouselControls.appendChild(prevBtn);
      carouselControls.appendChild(dotsContainer);
      carouselControls.appendChild(nextBtn);
      
      // Add controls after the last review
      reviews[totalReviews - 1].after(carouselControls);
      
      // Add carousel styles
      const carouselStyles = document.createElement('style');
      carouselStyles.textContent = `
        .reviews {
          display: none;
        }
        .reviews.active {
          display: block;
          animation: fadeIn 0.5s ease-in-out;
        }
        .carousel-controls {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 30px;
          padding-bottom: 30px;
        }
        .carousel-btn {
          background: #4a8f3c;
          color: white;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 16px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 15px;
          transition: background-color 0.3s ease;
        }
        .carousel-btn:hover {
          background-color: #3a7c2d;
        }
        .carousel-dots {
          display: flex;
          justify-content: center;
          gap: 10px;
        }
        .carousel-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: #ddd;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .carousel-dot.active {
          background-color: #4a8f3c;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `;
      document.head.appendChild(carouselStyles);
      
      // Show first review and hide others
      reviews.forEach((review, index) => {
        if (index === 0) {
          review.classList.add('active');
        } else {
          review.classList.remove('active');
        }
      });
      
      // Carousel functionality
      function showReview(index) {
        reviews.forEach(review => review.classList.remove('active'));
        reviews[index].classList.add('active');
        
        // Update dots
        document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
          if (i === index) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
        
        currentReviewIndex = index;
      }
      
      prevBtn.addEventListener('click', () => {
        let newIndex = currentReviewIndex - 1;
        if (newIndex < 0) newIndex = totalReviews - 1;
        showReview(newIndex);
      });
      
      nextBtn.addEventListener('click', () => {
        let newIndex = currentReviewIndex + 1;
        if (newIndex >= totalReviews) newIndex = 0;
        showReview(newIndex);
      });
      
      // Dot navigation
      document.querySelectorAll('.carousel-dot').forEach(dot => {
        dot.addEventListener('click', () => {
          const index = parseInt(dot.dataset.index);
          showReview(index);
        });
      });
      
      // Auto rotate testimonials
      setInterval(() => {
        let newIndex = currentReviewIndex + 1;
        if (newIndex >= totalReviews) newIndex = 0;
        showReview(newIndex);
      }, 5000);
    }
    
    // Add animation to program items
    const programItems = document.querySelectorAll('.yoga-item, .medi-item');
    
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        
        const target = entry.target;
        target.style.animation = 'fadeInUp 0.6s ease forwards';
        observer.unobserve(target);
      });
    }, observerOptions);
    
    programItems.forEach(item => {
      item.style.opacity = '0';
      appearOnScroll.observe(item);
    });
    
    // Form validation
    const searchForm = document.querySelector('.search form');
    
    searchForm.addEventListener('submit', function(e) {
      const searchInput = this.querySelector('.search-bar');
      if (!searchInput.value.trim()) {
        e.preventDefault();
        searchInput.style.borderColor = 'red';
        setTimeout(() => {
          searchInput.style.borderColor = '';
        }, 2000);
      }
    });
    
    // Add animation to the comment section
    const commentBox = document.querySelector('.comment-box textarea');
    
    commentBox.addEventListener('focus', function() {
      this.style.height = '150px';
      this.style.transition = 'height 0.3s ease';
    });
    
    commentBox.addEventListener('blur', function() {
      if (!this.value.trim()) {
        this.style.height = '80px';
      }
    });
    
    // Add a submit button for comments
    const submitBtn = document.createElement('button');
    submitBtn.textContent = 'Submit';
    submitBtn.className = 'comment-submit';
    submitBtn.style.cssText = `
      background-color: #4a8f3c;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      margin-top: 10px;
      transition: background-color 0.3s ease;
    `;
    
    commentBox.parentElement.appendChild(submitBtn);
    
    submitBtn.addEventListener('mouseover', function() {
      this.style.backgroundColor = '#3a7c2d';
    });
    
    submitBtn.addEventListener('mouseout', function() {
      this.style.backgroundColor = '#4a8f3c';
    });
    
    submitBtn.addEventListener('click', function() {
      if (!commentBox.value.trim()) {
        alert('Please enter a comment before submitting.');
        return;
      }
      
      alert('Thank you for your comment!');
      commentBox.value = '';
      commentBox.style.height = '80px';
    });
  });