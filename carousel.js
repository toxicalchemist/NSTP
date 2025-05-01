
// Improved Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize carousel
    const carousel = {
        currentSlide: 0,
        slides: document.querySelectorAll('.carousel .slide'),
        indicators: document.querySelectorAll('.carousel-indicators .indicator'),
        prevButton: document.querySelector('.carousel .prev'),
        nextButton: document.querySelector('.carousel .next'),
        totalSlides: document.querySelectorAll('.carousel .slide').length,
        autoPlayInterval: null,
        
        // Initialize the carousel
        init: function() {
            // Add event listeners
            this.prevButton.addEventListener('click', () => this.moveSlide(-1));
            this.nextButton.addEventListener('click', () => this.moveSlide(1));
            
            // Set up indicator clicks
            this.indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => this.goToSlide(index));
            });
            
            // Start autoplay
            this.startAutoPlay();
            
            // Pause autoplay on hover
            const carouselElement = document.querySelector('.carousel');
            carouselElement.addEventListener('mouseenter', () => this.stopAutoPlay());
            carouselElement.addEventListener('mouseleave', () => this.startAutoPlay());
            
            // Touch events for mobile
            this.setupTouchEvents();
            
            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') this.moveSlide(-1);
                if (e.key === 'ArrowRight') this.moveSlide(1);
            });
        },
        
        // Show a specific slide
        showSlide: function(index) {
            // Remove active class from all slides and indicators
            this.slides.forEach(slide => slide.classList.remove('active'));
            this.indicators.forEach(indicator => indicator.classList.remove('active'));
            
            // Add active class to current slide and indicator
            this.slides[index].classList.add('active');
            this.indicators[index].classList.add('active');
            
            // Update current slide index
            this.currentSlide = index;
        },
        
        // Move to previous or next slide
        moveSlide: function(direction) {
            let newIndex = this.currentSlide + direction;
            
            // Handle wrapping around
            if (newIndex >= this.totalSlides) newIndex = 0;
            if (newIndex < 0) newIndex = this.totalSlides - 1;
            
            this.goToSlide(newIndex);
        },
        
        // Go to a specific slide
        goToSlide: function(index) {
            // Add fade out animation
            this.slides[this.currentSlide].classList.add('fade-out');
            
            // Wait for animation to complete
            setTimeout(() => {
                // Show the new slide
                this.showSlide(index);
                
                // Remove animation class
                this.slides.forEach(slide => slide.classList.remove('fade-out'));
            }, 300);
        },
        
        // Start automatic slideshow
        startAutoPlay: function() {
            this.stopAutoPlay(); // Clear any existing interval
            this.autoPlayInterval = setInterval(() => {
                this.moveSlide(1);
            }, 5000); // Change slide every 5 seconds
        },
        
        // Stop automatic slideshow
        stopAutoPlay: function() {
            if (this.autoPlayInterval) {
                clearInterval(this.autoPlayInterval);
            }
        },
        
        // Set up touch events for mobile
        setupTouchEvents: function() {
            const carouselElement = document.querySelector('.carousel');
            let touchStartX = 0;
            let touchEndX = 0;
            
            carouselElement.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, {passive: true});
            
            carouselElement.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                this.handleSwipe();
            }, {passive: true});
            
            // Handle swipe direction
            this.handleSwipe = function() {
                const swipeThreshold = 50;
                if (touchEndX < touchStartX - swipeThreshold) {
                    // Swipe left - next slide
                    this.moveSlide(1);
                }
                if (touchEndX > touchStartX + swipeThreshold) {
                    // Swipe right - previous slide
                    this.moveSlide(-1);
                }
            };
        }
    };
    
    // Initialize the carousel
    carousel.init();
    
    // Additional CSS for carousel animations
    const style = document.createElement('style');
    style.textContent = `
        .carousel .slide {
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
        }
        
        .carousel .slide.active {
            opacity: 1;
            display: block;
        }
        
        .carousel .slide.fade-out {
            opacity: 0;
        }
        
        .carousel-indicators {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-top: 15px;
        }
        
        .indicator {
            width: 12px;
            height: 12px;
            background-color: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .indicator.active {
            background-color: white;
            transform: scale(1.2);
        }
        
        .indicator:hover {
            background-color: rgba(255, 255, 255, 0.8);
        }
    `;
    document.head.appendChild(style);
});