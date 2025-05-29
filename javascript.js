var tablinks = document.getElementsByClassName("tab-links");
        var tabcontents = document.getElementsByClassName("tab-contents");

        function opentab(tabname) {
            for (let tablink of tablinks) {
                tablink.classList.remove("active-link");
            }
            for (let tabcontent of tabcontents) {
                tabcontent.classList.remove("active-tab");
            }
            document.getElementById(tabname).classList.add("active-tab");
            event.currentTarget.classList.add("active-link");
        }
    
        var sidemeu = document.getElementById("sidemeu");

        function openmenu(){
            sidemeu.style.right = "0";
        }

        function closemenu(){
            sidemeu.style.right = "-200px";
        }


        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                const headerOffset = 80; // Adjust based on your header height
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            });
        });

        // Initialize EmailJS
        (function() {
            // Replace these with your actual EmailJS user ID and template ID
            emailjs.init("YOUR_USER_ID");
        })();

        // Enhanced form validation and submission
        document.getElementById('contact-form').addEventListener('submit', function(event) {
            event.preventDefault();
            
            const msg = document.getElementById('msg');
            const submitBtn = this.querySelector('button[type="submit"]');
            const formInputs = this.querySelectorAll('input, textarea');
            
            // Form validation
            let isValid = true;
            formInputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                    showError(input, 'This field is required');
                } else {
                    input.classList.remove('error');
                    clearError(input);
                }
                
                // Email validation
                if (input.type === 'email' && input.value.trim()) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value.trim())) {
                        isValid = false;
                        input.classList.add('error');
                        showError(input, 'Please enter a valid email address');
                    }
                }
            });
            
            if (!isValid) {
                msg.innerHTML = "Please fill all required fields correctly";
                msg.style.color = "#ff004f";
                return;
            }
            
            // Disable the submit button and show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="loading-spinner"></span> Sending...';
            
            // Get form data
            const formData = {
                name: this.querySelector('input[name="name"]').value.trim(),
                email: this.querySelector('input[name="email"]').value.trim(),
                message: this.querySelector('textarea[name="message"]').value.trim(),
                to_email: 'muneebazam96@gmail.com'
            };

            // Send the email using EmailJS with timeout
            const timeoutPromise = new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Request timeout')), 10000)
            );

            Promise.race([
                emailjs.send('default_service', 'YOUR_TEMPLATE_ID', formData),
                timeoutPromise
            ])
                .then(function() {
                    msg.innerHTML = "Message sent successfully! I'll get back to you soon.";
                    msg.style.color = "#61b752";
                    event.target.reset();
                    
                    // Add success animation
                    msg.classList.add('success-animation');
                    setTimeout(() => msg.classList.remove('success-animation'), 2000);
                    
                    // Clear success message after 5 seconds
                    setTimeout(function() {
                        msg.innerHTML = "";
                    }, 5000);
                })
                .catch(function(error) {
                    console.error('Email error:', error);
                    msg.innerHTML = error.message === 'Request timeout' 
                        ? "Request timed out. Please try again."
                        : "Failed to send message. Please try again.";
                    msg.style.color = "#ff004f";
                    
                    // Add error animation
                    msg.classList.add('error-animation');
                    setTimeout(() => msg.classList.remove('error-animation'), 2000);
                })
                .finally(function() {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'Send Message';
                });
        });

        // Enhanced typewriter effect with professional text
        function initTypewriter() {
            const texts = [
                "Muneeb Ur Rehman",
                "Software Engineering Student",
                "Web Developer",
                "Game Developer",
                "AI Enthusiast"
            ];
            let textIndex = 0;
            let charIndex = 0;
            const typewriterElement = document.getElementById("typewriter");
            const cursorElement = document.getElementById("cursor");
            const typingSpeed = 100;
            const deleteSpeed = 50;
            const delayBetweenTexts = 2000;

            function type() {
                if (charIndex < texts[textIndex].length) {
                    if (!cursorElement.classList.contains("typing")) {
                        cursorElement.classList.add("typing");
                    }
                    typewriterElement.textContent += texts[textIndex].charAt(charIndex);
                    charIndex++;
                    setTimeout(type, typingSpeed);
                } else {
                    cursorElement.classList.remove("typing");
                    setTimeout(erase, delayBetweenTexts);
                }
            }

            function erase() {
                if (charIndex > 0) {
                    if (!cursorElement.classList.contains("typing")) {
                        cursorElement.classList.add("typing");
                    }
                    typewriterElement.textContent = texts[textIndex].substring(0, charIndex - 1);
                    charIndex--;
                    setTimeout(erase, deleteSpeed);
                } else {
                    cursorElement.classList.remove("typing");
                    textIndex++;
                    if (textIndex >= texts.length) {
                        textIndex = 0;
                    }
                    setTimeout(type, typingSpeed);
                }
            }

            type();
        }

        function handleScrollToTop() {
            const scrollBtn = document.querySelector('.scroll-to-top');
            
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    scrollBtn.classList.add('visible');
                } else {
                    scrollBtn.classList.remove('visible');
                }
            });

            scrollBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }

        // Add intersection observer for scroll animations
        function initScrollAnimations() {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            // Observe all sections and elements with animation classes
            document.querySelectorAll('.section, .animate-on-scroll').forEach(el => {
                observer.observe(el);
            });
        }

        // Enhanced header scroll with smooth transition
        function handleHeaderScroll() {
            const nav = document.querySelector('nav');
            const scrollThreshold = 100;
            let lastScroll = 0;

            window.addEventListener('scroll', () => {
                const currentScroll = window.scrollY;
                
                if (currentScroll > scrollThreshold) {
                    nav.classList.add('scrolled');
                    if (currentScroll > lastScroll) {
                        nav.classList.add('nav-hidden');
                    } else {
                        nav.classList.remove('nav-hidden');
                    }
                } else {
                    nav.classList.remove('scrolled', 'nav-hidden');
                }
                
                lastScroll = currentScroll;
            });
        }

        // Add loading animation
        function initLoadingAnimation() {
            const loader = document.querySelector('.loader');
            if (loader) {
                window.addEventListener('load', () => {
                    loader.classList.add('fade-out');
                    setTimeout(() => {
                        loader.style.display = 'none';
                    }, 500);
                });
            }
        }

        // Enhanced Navigation and Scrolling
        function initNavigation() {
            const nav = document.querySelector('nav');
            const menuToggle = document.querySelector('.menu-toggle');
            const navLinks = document.querySelectorAll('.nav-link');
            const navIndicator = document.querySelector('.nav-indicator');
            const scrollProgress = document.createElement('div');
            scrollProgress.className = 'scroll-progress';
            document.body.appendChild(scrollProgress);

            // Menu Toggle
            menuToggle.addEventListener('click', () => {
                menuToggle.classList.toggle('active');
                document.querySelector('#sidemenu').classList.toggle('show');
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('nav')) {
                    menuToggle.classList.remove('active');
                    document.querySelector('#sidemenu').classList.remove('show');
                }
            });

            // Active link indicator
            function updateActiveLink() {
                const sections = document.querySelectorAll('section, #header');
                const scrollPosition = window.scrollY + 100;

                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;
                    const sectionId = section.getAttribute('id');
                    
                    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                        navLinks.forEach(link => {
                            link.classList.remove('active');
                            if (link.getAttribute('href') === `#${sectionId}`) {
                                link.classList.add('active');
                                // Update indicator position
                                const activeLink = link;
                                navIndicator.style.width = `${activeLink.offsetWidth}px`;
                                navIndicator.style.left = `${activeLink.offsetLeft}px`;
                            }
                        });
                    }
                });
            }

            // Scroll progress bar
            function updateScrollProgress() {
                const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
                const progress = (window.scrollY / windowHeight) * 100;
                scrollProgress.style.transform = `scaleX(${progress / 100})`;
            }

            // Navbar scroll behavior
            let lastScroll = 0;
            function handleNavScroll() {
                const currentScroll = window.scrollY;
                
                if (currentScroll > 100) {
                    nav.classList.add('scrolled');
                    if (currentScroll > lastScroll) {
                        nav.style.transform = 'translateY(-100%)';
                    } else {
                        nav.style.transform = 'translateY(0)';
                    }
                } else {
                    nav.classList.remove('scrolled');
                    nav.style.transform = 'translateY(0)';
                }
                
                lastScroll = currentScroll;
            }

            // Smooth scroll for navigation links
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('href');
                    const targetSection = document.querySelector(targetId);
                    const navHeight = nav.offsetHeight;
                    
                    window.scrollTo({
                        top: targetSection.offsetTop - navHeight,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    menuToggle.classList.remove('active');
                    document.querySelector('#sidemenu').classList.remove('show');
                });
            });

            // Event listeners
            window.addEventListener('scroll', () => {
                updateActiveLink();
                updateScrollProgress();
                handleNavScroll();
            });

            window.addEventListener('resize', updateActiveLink);
            
            // Initial call
            updateActiveLink();
            updateScrollProgress();
        }

        // Initialize all features
        document.addEventListener('DOMContentLoaded', function() {
            initTypewriter();
            initNavigation();
            handleScrollToTop();
            initScrollAnimations();
            initLoadingAnimation();
            
            // Add input focus effects
            document.querySelectorAll('input, textarea').forEach(input => {
                input.addEventListener('focus', () => {
                    input.parentElement.classList.add('focused');
                });
                input.addEventListener('blur', () => {
                    input.parentElement.classList.remove('focused');
                });
            });
        });

        // Utility functions for form validation
        function showError(input, message) {
            const errorDiv = input.parentElement.querySelector('.error-message') || 
                document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = message;
            if (!input.parentElement.querySelector('.error-message')) {
                input.parentElement.appendChild(errorDiv);
            }
        }

        function clearError(input) {
            const errorDiv = input.parentElement.querySelector('.error-message');
            if (errorDiv) {
                errorDiv.remove();
            }
        }
            
        