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

        const scriptURL = 'https://script.google.com/macros/s/AKfycbzIoXfl6r3oo8Izq3vTTYLNrGJJLRu9kf7oEEsbQTMtsVOONYpfEbIJLbO6X2Em0_iR/exec'
        const form = document.forms['submit-to-google-sheet']
        const msg = document.getElementById("msg")
        
        form.addEventListener('submit', e => {
        e.preventDefault()
        fetch(scriptURL, { method: 'POST', body: new FormData(form)})
            .then(response => {
                msg.innerHTML="Message sent successfully"
                setTimeout(function(){
                    msg.innerHTML = ""

                },5000)
                form.reset()
            })
            .catch(error => console.error('Error!', error.message))
        })

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

        document.addEventListener('DOMContentLoaded', function() {
            initTypewriter();
        });
            
        