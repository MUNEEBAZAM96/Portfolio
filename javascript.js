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

                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        });

        // Initialize EmailJS
        (function() {
            // Replace these with your actual EmailJS user ID and template ID
            emailjs.init("YOUR_USER_ID");
        })();

        // Update the form submission handler
        document.getElementById('contact-form').addEventListener('submit', function(event) {
            event.preventDefault();
            
            const msg = document.getElementById('msg');
            const submitBtn = this.querySelector('button[type="submit"]');
            
            // Disable the submit button during processing
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            // Get form data
            const formData = {
                name: this.querySelector('input[name="name"]').value,
                email: this.querySelector('input[name="email"]').value,
                message: this.querySelector('textarea[name="message"]').value,
                to_email: 'muneebazam96@gmail.com'
            };

            // Send the email using EmailJS
            emailjs.send('default_service', 'YOUR_TEMPLATE_ID', formData)
                .then(function() {
                    msg.innerHTML = "Message sent successfully!";
                    msg.style.color = "#61b752";
                    event.target.reset(); // Reset the form
                    
                    // Clear success message after 5 seconds
                    setTimeout(function() {
                        msg.innerHTML = "";
                    }, 5000);
                })
                .catch(function(error) {
                    msg.innerHTML = "Failed to send message. Please try again.";
                    msg.style.color = "#ff004f";
                    console.error('Email error:', error);
                })
                .finally(function() {
                    // Re-enable the submit button
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';
                });
        });

        function initTypewriter() {
            const texts = [
                "Muneeb Ur Rehman",
                "Smart Contract Developer",
                "Building Blockchain Solutions"
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

        function handleHeaderScroll() {
            const nav = document.querySelector('nav');
            const scrollThreshold = 100;

            window.addEventListener('scroll', () => {
                if (window.scrollY > scrollThreshold) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }
            });
        }

        document.addEventListener('DOMContentLoaded', function() {
            initTypewriter();
            handleScrollToTop();
            handleHeaderScroll();
        });
            
        