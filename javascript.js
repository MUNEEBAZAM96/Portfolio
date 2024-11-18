
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
    for (let tablink of tablinks) {
        tablink.classList.remove("bg-crimson", "text-white", "border-b-2", "border-crimson");
    }
    for (let tabcontent of tabcontents) {
        tabcontent.classList.remove("block");
        tabcontent.classList.add("hidden");
    }
    document.getElementById(tabname).classList.remove("hidden");
    document.getElementById(tabname).classList.add("block");
    event.currentTarget.classList.add("bg-crimson", "text-white", "border-b-2", "border-crimson");
}

var sidemeu = document.getElementById("sidemeu");

function openmenu(){
    sidemeu.classList.remove("-right-48");
    sidemeu.classList.add("right-0");
}

function closemenu(){
    sidemeu.classList.remove("right-0");
    sidemeu.classList.add("-right-48");
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
            msg.classList.add("text-green-500", "font-medium");
            msg.innerHTML = "Message sent successfully";
            setTimeout(function(){
                msg.innerHTML = "";
                msg.classList.remove("text-green-500", "font-medium");
            }, 5000)
            form.reset()
        })
        .catch(error => {
            msg.classList.add("text-red-500", "font-medium");
            msg.innerHTML = "Error sending message";
            console.error('Error!', error.message)
        })
})

document.addEventListener('DOMContentLoaded', function() {
    const text = "Muneeb Ur Rehman\nFront End Developer, C++ Game Developer";
    let index = 0;
    const speed = 100;

    function typeWriter() {
        const typewriterElement = document.getElementById("typewriter");
        if (index < text.length) {
            typewriterElement.innerHTML += text.charAt(index);
            typewriterElement.classList.add(
                "font-mono",
                "text-3xl", 
                "font-bold",
                "text-gray-800",
                "leading-relaxed"
            );
            if (text.charAt(index) === '\n') {
                typewriterElement.innerHTML += '<br>';
            }
            index++;
            setTimeout(typeWriter, speed);
        }
    }
    typeWriter();
});
