import anime from "animejs";

const navbar = document.getElementById("navbar");
const sectionWho = document.getElementById("who");

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
            navbar.classList.add("bg-white","shadow-md");
            navbar.classList.remove("bg-transparent");
          } else {
            navbar.classList.add("bg-transparent");
            navbar.classList.remove("bg-white","shadow-md");
        }
    });
}

let navObsOptions = {
    rootMargin: '0px',
    threshold: 0.9
};

const navObs = new IntersectionObserver(navObsCallback, navObsOptions);
navObs.observe(sectionWho);

// animate where icons
const whereIcons = document.querySelector('.where-icon');

// const svgText = anime({
//   targets: svgPath,
//   loop: true,
//   direction: 'alternate',
//   strokeDashoffset: [anime.setDashoffset, 0],
//   easing: 'easeInOutSine',
//   duration: 700,
//   delay: (el, i) => { return i * 500 }
// });
// const icon = () => {
//   anime({
//     targets: whereIcons,
//     strokeDashoffset: [anime.setDashoffset, 0],
//     easing: 'easeInOutSine',
//     duration: 1500,
//     direction: 'alternate',
//     loop: true
//   });
// }
// if (whereIcons == null) {
//   console.log('bad')
// }

const lineDrawing = anime({
  targets: '.where-icon',
  direction: "normal",
  strokeDashoffset: [anime.setDashoffset,0],
  easing: 'easeInOutSine',
  duration: 2000
});

// var buttonEl = document.querySelector('button');

// function animateButton(scale, duration, elasticity) {
//   anime.remove(buttonEl);
//   anime({
//     targets: buttonEl,
//     scale: scale,
//     duration: duration,
//     elasticity: elasticity
//   });
// }

// function enterButton() { animateButton(1.2, 800, 400) };
// function leaveButton() { animateButton(1.0, 600, 300) };

// buttonEl.addEventListener('mouseenter', enterButton, false);
// buttonEl.addEventListener('mouseleave', leaveButton, false);

// document.querySelector('.where-icon').onclick = lineDrawing.restart;
// begin: function(anim) {
//   document.querySelector('path').setAttribute("stroke", "black");
//   document.querySelector('path').setAttribute("fill", "none");
// },
// complete: function(anim) {
//   document.querySelector('path').setAttribute("fill", "yellow");
// },
// autoplay: false