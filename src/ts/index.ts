const navbar = document.getElementById("navbar")!;
const sectionWho = document.getElementById("who")!;

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
const navObsCallback = function(entries: IntersectionObserverEntry[], navbarObs: IntersectionObserver) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            navbar.classList.add("bg-white","shadow-md");
            navbar.classList.remove("bg-transparent");
          } else {
            navbar.classList.add("bg-transparent");
            navbar.classList.remove("bg-white","shadow-md");
        }
        console.log(entry.isIntersecting);
    });
}

let navObsOptions = {
    rootMargin: '0px',
    threshold: 1
};

const navObs = new IntersectionObserver(navObsCallback, navObsOptions);
navObs.observe(sectionWho);

