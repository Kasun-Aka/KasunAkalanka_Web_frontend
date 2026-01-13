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


/*================ scroll reveal =============== */
  ScrollReveal({
      reset: true,
      distance: '80px',
      duration: 2000,
      delay: 200
  });

    ScrollReveal().reveal('.projects-container', { origin: 'bottom' });
    ScrollReveal().reveal('.heading', { origin: 'top' });
    

/*================ extd animations ====================== 

    function revealSlideshow(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) return;

  const slideshow = section.querySelector('.slideshow-container');
  if (!slideshow.classList.contains('revealed')) {

    setTimeout(() => {
      slideshow.classList.add('revealed');
    }, 500);
  }
} */

/*================ slideshow test ====================== */
// This function runs for every slideshow on your page
function initSlideshows() {
    const containers = document.querySelectorAll('.slideshow-container');

    containers.forEach((container) => {
        let currentIndex = 0;
        const slides = container.querySelectorAll('.slideimg');
        const totalSlides = slides.length;

        // Don't start if there are no images
        if (totalSlides === 0) return;

        setInterval(() => {
            // 1. Remove 'active' from the current image
            slides[currentIndex].classList.remove('active');

            // 2. Calculate next index (loops back to 0 automatically)
            currentIndex = (currentIndex + 1) % totalSlides;

            // 3. Add 'active' to the next image
            slides[currentIndex].classList.add('active');
        }, 2000);
    });
}

// Run once the page is loaded
window.addEventListener('DOMContentLoaded', initSlideshows);

