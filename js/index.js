"use strict";

const loader = document.querySelector(".container");
const main = document.querySelector(".welcome-section");

function removeLoader() {
  setTimeout(() => {
    loader.classList.add("fade-out");
    main.classList.add("scale-in-hor-center");
  }, 1000);
}

removeLoader();
