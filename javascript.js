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
                } else {
                    nav.classList.remove('scrolled');
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
                } else {
                    nav.classList.remove('scrolled');
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

            // Navbar scroll animation
            const nav = document.querySelector('nav');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 10) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }
            });

            // Popup on send for new contact section
            const sendBtn = document.getElementById('send-message');
            const messageBox = document.getElementById('message-box');
            if (sendBtn && messageBox) {
                sendBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    // Show popup
                    let popup = document.createElement('div');
                    popup.className = 'message-popup';
                    popup.innerHTML = '<span class="popup-icon">✔️</span>Message sent!<br>Thank you for reaching out.';
                    document.body.appendChild(popup);
                    setTimeout(() => {
                        popup.style.opacity = '0';
                        popup.style.transform = 'translateX(-50%) scale(0.9)';
                        setTimeout(() => popup.remove(), 400);
                    }, 3000);
                    messageBox.value = '';
                });
            }
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
            
        
        // Three.js animated background for header
        function initThreeHeroBackground() {
            const canvas = document.getElementById('three-bg-canvas');
            if (!canvas) return;
            const header = document.getElementById('header');
            function resizeCanvas() {
                // Only resize if the window size changes, not on scroll
                canvas.width = header.offsetWidth;
                canvas.height = header.offsetHeight;
                renderer.setSize(canvas.width, canvas.height, false);
                camera.aspect = canvas.width / canvas.height;
                camera.updateProjectionMatrix();
            }

            // Three.js setup
            const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
            renderer.setClearColor(0x000000, 0);
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(60, header.offsetWidth / header.offsetHeight, 0.1, 1000);
            camera.position.z = 13;
            camera.position.y = 2;
            renderer.setSize(header.offsetWidth, header.offsetHeight, false);

            // Network Nodes
            const nodeCount = 18;
            const nodes = [];
            const nodeGeometry = new THREE.SphereGeometry(0.18, 24, 24);
            const nodeMaterial = new THREE.MeshStandardMaterial({ color: 0xff004f, emissive: 0x4a90e2, emissiveIntensity: 0.5 });
            for (let i = 0; i < nodeCount; i++) {
                const mesh = new THREE.Mesh(nodeGeometry, nodeMaterial.clone());
                mesh.position.set(
                    (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 5,
                    (Math.random() - 0.5) * 6
                );
                mesh.userData = {
                    base: mesh.position.clone(),
                    phase: Math.random() * Math.PI * 2,
                    speed: 0.5 + Math.random() * 0.7
                };
                scene.add(mesh);
                nodes.push(mesh);
            }

            // Network Lines
            const lines = [];
            for (let i = 0; i < nodeCount; i++) {
                for (let j = i + 1; j < nodeCount; j++) {
                    if (Math.random() < 0.22) { // sparse connections
                        const geometry = new THREE.BufferGeometry().setFromPoints([
                            nodes[i].position,
                            nodes[j].position
                        ]);
                        const material = new THREE.LineBasicMaterial({ color: 0x4a90e2, transparent: true, opacity: 0.5 });
                        const line = new THREE.Line(geometry, material);
                        scene.add(line);
                        lines.push({ line, i, j });
                    }
                }
            }

            // Floating Code Cards
            const cardGeometry = new THREE.BoxGeometry(1.8, 1, 0.08);
            const cardMaterial = new THREE.MeshStandardMaterial({ color: 0x181828, emissive: 0x4a90e2, emissiveIntensity: 0.12, metalness: 0.3, roughness: 0.7 });
            const cards = [];
            const cardSymbols = ['< />', '{ }', 'JS', 'AI'];
            for (let i = 0; i < 3; i++) {
                const mesh = new THREE.Mesh(cardGeometry, cardMaterial.clone());
                mesh.position.set(
                    (Math.random() - 0.5) * 8,
                    2 + Math.random() * 2,
                    (Math.random() - 0.5) * 5
                );
                mesh.userData = {
                    rotSpeed: 0.003 + Math.random() * 0.004,
                    symbol: cardSymbols[i % cardSymbols.length]
                };
                scene.add(mesh);
                cards.push(mesh);
            }

            // Add 2D symbols to cards using canvas textures
            cards.forEach((card, idx) => {
                const canvas = document.createElement('canvas');
                canvas.width = 256; canvas.height = 128;
                const ctx = canvas.getContext('2d');
                ctx.fillStyle = '#181828';
                ctx.fillRect(0, 0, 256, 128);
                ctx.font = 'bold 56px Poppins, Arial, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = '#ff004f';
                ctx.fillText(cardSymbols[idx % cardSymbols.length], 128, 64);
                const texture = new THREE.CanvasTexture(canvas);
                card.material.map = texture;
                card.material.needsUpdate = true;
            });

            // Lighting
            const ambient = new THREE.AmbientLight(0xffffff, 0.7);
            scene.add(ambient);
            const point1 = new THREE.PointLight(0xff004f, 0.7, 30);
            point1.position.set(-6, 8, 8);
            scene.add(point1);
            const point2 = new THREE.PointLight(0x4a90e2, 0.7, 30);
            point2.position.set(6, 8, 8);
            scene.add(point2);

            // Animation loop
            function animate(time) {
                requestAnimationFrame(animate);
                // Animate nodes
                nodes.forEach((node, i) => {
                    node.position.x = node.userData.base.x + Math.sin(time * 0.0006 + node.userData.phase) * 0.5;
                    node.position.y = node.userData.base.y + Math.cos(time * 0.0007 + node.userData.phase) * 0.4;
                    node.position.z = node.userData.base.z + Math.sin(time * 0.0005 + node.userData.phase) * 0.3;
                });
                // Animate lines
                lines.forEach(({ line, i, j }) => {
                    line.geometry.setFromPoints([
                        nodes[i].position,
                        nodes[j].position
                    ]);
                    line.geometry.attributes.position.needsUpdate = true;
                });
                // Animate cards
                cards.forEach((card, i) => {
                    card.rotation.y += card.userData.rotSpeed;
                    card.position.y += Math.sin(time * 0.001 + i) * 0.003;
                });
                renderer.render(scene, camera);
            }
            animate();
        }

        // Typewriter animation for header
        function initTypewriter() {
            const texts = [
                "Muneeb",
                "Software Engineering Student",
                "Web Developer",
                "Web3 Enthusiast"
            ];
            let textIndex = 0;
            let charIndex = 0;
            const typewriterElement = document.getElementById("typewriter");
            const cursorElement = document.getElementById("cursor");
            const typingSpeed = 100;
            const deleteSpeed = 50;
            const delayBetweenTexts = 1800;

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

        document.addEventListener('DOMContentLoaded', function() {
            initNavigation();
            handleScrollToTop();
            initScrollAnimations();
            initLoadingAnimation();
            if (window.particlesJS) {
                particlesJS('particles-js', {
                    particles: {
                        number: { value: 60, density: { enable: true, value_area: 900 } },
                        color: { value: ['#ff004f', '#4a90e2', '#ffffff'] },
                        shape: { type: 'circle' },
                        opacity: { value: 0.7, random: true },
                        size: { value: 4, random: true },
                        line_linked: {
                            enable: true,
                            distance: 140,
                            color: '#ffffff',
                            opacity: 0.25,
                            width: 1.2
                        },
                        move: {
                            enable: true,
                            speed: 2,
                            direction: 'none',
                            random: true,
                            straight: false,
                            out_mode: 'out',
                            bounce: false
                        }
                    },
                    interactivity: {
                        detect_on: 'canvas',
                        events: {
                            onhover: { enable: true, mode: 'grab' },
                            onclick: { enable: true, mode: 'push' },
                            resize: true
                        },
                        modes: {
                            grab: { distance: 180, line_linked: { opacity: 0.45 } },
                            push: { particles_nb: 4 }
                        }
                    },
                    retina_detect: true
                });
            }
            
            // Add input focus effects
            document.querySelectorAll('input, textarea').forEach(input => {
                input.addEventListener('focus', () => {
                    input.parentElement.classList.add('focused');
                });
                input.addEventListener('blur', () => {
                    input.parentElement.classList.remove('focused');
                });
            });
            initTypewriter();
        });
            
        
// --- Three.js Animated Background ---
let threeRenderer, threeScene, threeCamera, threeMesh, threeAnimationId;

function initThreeBg(isLight) {
  const canvas = document.getElementById('three-bg-canvas');
  if (!canvas) return;
  // Dispose previous scene if any
  if (threeRenderer) {
    cancelAnimationFrame(threeAnimationId);
    threeRenderer.dispose && threeRenderer.dispose();
    canvas.width = canvas.width; // clear
  }
  // Setup
  threeRenderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  threeRenderer.setSize(window.innerWidth, window.innerHeight);
  threeRenderer.setClearColor(isLight ? 0xf5f6fa : 0x0a0a23, 1);
  threeScene = new THREE.Scene();
  threeCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  threeCamera.position.z = 5;
  // Create animated wave mesh
  const geometry = new THREE.PlaneGeometry(10, 10, 32, 32);
  const material = new THREE.MeshPhongMaterial({
    color: isLight ? 0x4a90e2 : 0xff004f,
    shininess: 80,
    transparent: true,
    opacity: 0.18,
    side: THREE.DoubleSide
  });
  threeMesh = new THREE.Mesh(geometry, material);
  threeScene.add(threeMesh);
  // Lighting
  const light = new THREE.PointLight(isLight ? 0x4a90e2 : 0xff004f, 1, 100);
  light.position.set(0, 0, 10);
  threeScene.add(light);
  // Animate
  function animate() {
    for (let i = 0; i < geometry.vertices.length; i++) {
      const v = geometry.vertices[i];
      v.z = Math.sin(i + Date.now() * 0.001) * (isLight ? 0.08 : 0.18);
    }
    geometry.verticesNeedUpdate = true;
    threeMesh.rotation.z += 0.0005;
    threeRenderer.render(threeScene, threeCamera);
    threeAnimationId = requestAnimationFrame(animate);
  }
  animate();
  window.addEventListener('resize', () => {
    threeRenderer.setSize(window.innerWidth, window.innerHeight);
    threeCamera.aspect = window.innerWidth / window.innerHeight;
    threeCamera.updateProjectionMatrix();
  });
}

// --- particles.js Animated Background ---
function loadParticlesConfig(isLight) {
  particlesJS('particles-js', isLight ? {
    particles: {
      number: { value: 60 },
      color: { value: "#4a90e2" },
      shape: { type: "circle" },
      opacity: { value: 0.3 },
      size: { value: 4 },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#4a90e2",
        opacity: 0.2,
        width: 1
      },
      move: { enable: true, speed: 2 }
    },
    interactivity: {
      detect_on: "canvas",
      events: { onhover: { enable: true, mode: "repulse" } }
    },
    retina_detect: true
  } : {
    particles: {
      number: { value: 80 },
      color: { value: "#ff004f" },
      shape: { type: "circle" },
      opacity: { value: 0.5 },
      size: { value: 3 },
      line_linked: {
        enable: true,
        distance: 120,
        color: "#ff004f",
        opacity: 0.3,
        width: 1
      },
      move: { enable: true, speed: 3 }
    },
    interactivity: {
      detect_on: "canvas",
      events: { onhover: { enable: true, mode: "grab" } }
    },
    retina_detect: true
  });
}

// --- Theme Switch Logic ---
function updateBackgrounds() {
  const isLight = document.body.classList.contains('light-mode');
  // Remove old particles canvas
  const oldCanvas = document.querySelector('#particles-js canvas');
  if (oldCanvas) oldCanvas.remove();
  loadParticlesConfig(isLight);
  initThreeBg(isLight);
}

document.addEventListener('DOMContentLoaded', function() {
  updateBackgrounds();
  const themeToggle = document.querySelector('.theme-toggle');
  themeToggle.addEventListener('click', () => {
    setTimeout(updateBackgrounds, 300); // Wait for theme class to apply
  });
});
            
        