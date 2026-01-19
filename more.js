/*================ toggle icon navbar =============== */
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x-circle');
    navbar.classList.toggle('active');
};

/*================ theme toggle =============== */
var themeIcon = document.getElementById('theme-toggle');

// Apply saved theme on page load
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add("light-theme");
    themeIcon.classList.remove('bx-moon');
    themeIcon.classList.add('bx-sun');
}

// Toggle theme on click
themeIcon.onclick = function () {
    document.body.classList.toggle("light-theme");

    if (document.body.classList.contains("light-theme")) {
        themeIcon.classList.remove('bx-moon');
        themeIcon.classList.add('bx-sun');
        localStorage.setItem('theme', 'light'); // Save theme
    } else {
        themeIcon.classList.remove('bx-sun');
        themeIcon.classList.add('bx-moon');
        localStorage.setItem('theme', 'dark'); // Save theme
    }
};




/*================ scroll sections active link =============== */
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });
    /*================ sticky navbar =============== */
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    /*======= remove toggle icon and navbar when click navbar link ========= */
    menuIcon.classList.remove('bx-x-circle');
    navbar.classList.remove('active');
};


/* ================== Birthday wish ===================== */
const allowedUID = "mVdBmZqIfoTfL4EaMHRGcqyupKt1"; // replace with the actual UID

firebase.auth().onAuthStateChanged((user) => {
    if (user && user.uid === allowedUID) {
        document.getElementById("bday-secret").style.display = "block";
    } else {
        document.getElementById("bday-secret").style.display = "none";
    }
});


/* ================== scroll animations ================= */

AOS.init();

// You can also pass an optional settings object
// below listed default settings
AOS.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
  initClassName: 'aos-init', // class applied after initialization
  animatedClassName: 'aos-animate', // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: true, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
  

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 80, // offset (in px) from the original trigger point
  delay: 200, // values from 0 to 3000, with step 50ms
  duration: 2000, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: true, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});


// Auto-update footer year
document.getElementById("year").textContent = new Date().getFullYear();