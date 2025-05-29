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

        // Initialize EmailJS with proper error handling
        (function() {
            try {
                // Replace with your actual EmailJS public key
                emailjs.init("public_key_xxxxxxxxxxxxxxxxxxxxx");
                console.log("EmailJS initialized successfully");
            } catch (error) {
                console.error("Failed to initialize EmailJS:", error);
            }
        })();

        // Email sending functionality with enhanced error handling
        function sendEmail(e) {
            e.preventDefault();
            
            const form = document.getElementById('contact-form');
            const msg = document.getElementById('msg');
            const submitBtn = form.querySelector('button[type="submit"]');
            const btnText = submitBtn.querySelector('.btn-text');
            const originalBtnText = btnText.textContent;

            // Form validation
            const fromName = form.from_name.value.trim();
            const replyTo = form.reply_to.value.trim();
            const message = form.message.value.trim();

            if (!fromName || !replyTo || !message) {
                msg.innerHTML = "Please fill in all fields";
                msg.className = 'message error';
                msg.classList.add('error-animation');
                setTimeout(() => msg.classList.remove('error-animation'), 2000);
                return false;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(replyTo)) {
                msg.innerHTML = "Please enter a valid email address";
                msg.className = 'message error';
                msg.classList.add('error-animation');
                setTimeout(() => msg.classList.remove('error-animation'), 2000);
                return false;
            }

            // Show loading state
            submitBtn.disabled = true;
            btnText.textContent = 'Sending...';
            submitBtn.classList.add('sending');

            // Get form data
            const templateParams = {
                from_name: fromName,
                reply_to: replyTo,
                message: message,
                to_email: 'muneebazam96@gmail.com'
            };

            // Send email using EmailJS with enhanced error handling
            emailjs.send('service_xxxxxxxxxxxxx', 'template_xxxxxxxxxxxxx', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    // Success
                    msg.innerHTML = "Message sent successfully! I'll get back to you soon.";
                    msg.className = 'message success';
                    form.reset();
                    
                    // Add success animation
                    msg.classList.add('success-animation');
                    setTimeout(() => msg.classList.remove('success-animation'), 2000);
                    
                    // Clear success message after 5 seconds
                    setTimeout(() => {
                        msg.innerHTML = '';
                        msg.className = 'message';
                    }, 5000);
                })
                .catch(function(error) {
                    console.error('FAILED...', error);
                    let errorMessage = "Failed to send message. ";
                    
                    // More specific error messages based on the error type
                    if (error.status === 0) {
                        errorMessage += "Network error. Please check your internet connection.";
                    } else if (error.status === 400) {
                        errorMessage += "Invalid request. Please check your input.";
                    } else if (error.status === 401) {
                        errorMessage += "Authentication failed. Please contact the website administrator.";
                    } else if (error.status === 500) {
                        errorMessage += "Server error. Please try again later.";
                    } else {
                        errorMessage += "Please try again or contact me directly at muneebazam96@gmail.com";
                    }
                    
                    msg.innerHTML = errorMessage;
                    msg.className = 'message error';
                    
                    // Add error animation
                    msg.classList.add('error-animation');
                    setTimeout(() => msg.classList.remove('error-animation'), 2000);
                })
                .finally(function() {
                    // Reset button state
                    submitBtn.disabled = false;
                    btnText.textContent = originalBtnText;
                    submitBtn.classList.remove('sending');
                });

            return false;
        }

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
            
        