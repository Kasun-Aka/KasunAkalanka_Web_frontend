// ---- Wake up backend ----
fetch("https://kasunakalanka-web-backend.onrender.com/api/health")
  .then(() => console.log("Backend awake"))
  .catch(() => console.log("Backend waking up"));

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



/*================ cv button toggle =============== */
var lockIcon = document.getElementById('lock-icon');
const logToken = localStorage.getItem("authToken");

if (logToken) {
  lockIcon.classList.remove('bx-lock-keyhole');
  lockIcon.classList.add('bx-lock-keyhole-open-alt');
}else if (!logToken) {
  lockIcon.classList.remove('bx-lock-keyhole-open-alt');
  lockIcon.classList.add('bx-lock-keyhole');
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
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
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


/*================ typed js =============== */
const typed1 = new Typed('.multiple-text1', {
    strings: [
      'Software Engineering Undergraduate',
      'Backend & Frontend Developer',
      'Problem Solver',
      'Tech Enthusiast'
    ],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

const typed2 = new Typed('.multiple-text2', {
    strings: ['Me', 'Kasun Akalanka'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

const typed3 = new Typed('.multiple-text3', {
    strings: ['Me', 'Kasun Akalanka'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

//-------------- login info -----------

document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("authToken");
  if (!token) return;

  try {
    const res = await fetch("https://kasunakalanka-web-backend.onrender.com/api/users/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) throw new Error("Unauthorized");

    const userInfo = await res.json();

//------------------ Autofill form fields -----------------------
    document.getElementById("name").value = userInfo.name;
    document.getElementById("email").value = userInfo.email;
    document.getElementById("phone").value = userInfo.phone;
  } catch (err) {
    console.log("Autofill failed:", err.message);
    localStorage.removeItem("authToken"); 
    //window.location.href = "login.html"; auto redirecting to the login disabled.
  }
});



//--------------------- message submit ---------------
document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  try {
    const res = await fetch("https://kasunakalanka-web-backend.onrender.com/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        // No auth header — open to all
      },
      body: JSON.stringify({ name, email, phone, subject, message })
    });

    if (!res.ok) throw new Error(await res.text());

    alert("Message sent successfully!");
    console.log("✅ Server responded:", await res.clone().json());
    document.getElementById("contactForm").reset();

  } catch (err) {
    alert("Message failed: " + err.message);
    console.log("❌ Error submitting message:", err.message);
  }
});


//---------------- CV download -------------------
  document.getElementById("downloadCvBtn").addEventListener("click", async () => {
    const idToken = localStorage.getItem("authToken"); 

    if (!idToken) {
      alert("Please login first to download the CV.");
      return;
    }

    try {
      const response = await fetch("https://kasunakalanka-web-backend.onrender.com/api/download-cv/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${idToken}`
        }
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to download CV.");
      }

      // Convert response to Blob and trigger download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Kasun_Akalanka_CV.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Download error:", error);
      alert("Download failed: " + error.message);
    }
  });


// Auto-update footer year
document.getElementById("year").textContent = new Date().getFullYear();