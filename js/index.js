const navbar = document.getElementById("navbar");
const banner = document.getElementById("banner");

// hide navbar on scroll
let prevScrollPos = window.pageYOffset;
window.onscroll = function() {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollPos > currentScrollPos) {
    navbar.style.top = "0";
  } else {
    navbar.style.top = "-100px";
  }
  prevScrollPos = currentScrollPos;
}

// change navbar background at top
const navObsCallback = function(entries, navbarObs) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            navbar.classList.add("bg-white","shadow");
            navbar.classList.remove("bg-transparent");
          } else {
            navbar.classList.add("bg-transparent");
            navbar.classList.remove("bg-white","shadow");
        }
    });
}

let navObsOptions = {
    rootMargin: '0px',
    threshold: 0.6
};

const navObs = new IntersectionObserver(navObsCallback, navObsOptions);
navObs.observe(banner);
