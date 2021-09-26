// ==UserScript==
// @name         View Button
// @namespace    view-button
// @version      0.2.1
// @description  Returns back "View Image" button for google images
// @author       0xdv
// @include      /^https://(.*).google.([a-z\.]*)/(imgres|search)(.*)/
// @homepageURL  https://github.com/0xdv/make-view-button-back-again
// @downloadURL  https://raw.githubusercontent.com/0xdv/make-view-button-back-again/master/view-button.user.js
// @updateURL    https://raw.githubusercontent.com/0xdv/make-view-button-back-again/master/view-button.user.js
// @grant        none
// @license      MIT
// ==/UserScript==

(function () {
  "use strict";

  let buttonWrapperClass = "view_button_wrapper";

  let escapeHTMLPolicy = trustedTypes.createPolicy("forceInner", {
    createHTML: (to_escape) => to_escape,
  });

  let imageObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      // console.log(mutation)
      if (mutation.target.src !== "") {
        if (mutation.target.classList.contains("n3VNCb")) {
          let container = mutation.target.closest(".OUZ5W");

          let btn = document.createElement("a");
          btn.className += buttonWrapperClass;
          btn.className += " h04bR";
          btn.target = "_blank";
          btn.href = mutation.target.src;
          btn.rel = "noreferrer";
          btn.title = "View Image";
          btn.innerHTML = escapeHTMLPolicy.createHTML(
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="XeEBj PZsCm J4k9Eb Wath9b vPAYyf"><script xmlns=""/><path d="M0 0h24v24H0z" fill="none"/><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>'
          );

          let div = document.createElement("div");
          div.className += " Jx5U7c SIwKhe";
          div.appendChild(btn);

          let menu = container.querySelector(".fDqwl");
          let existBtn = menu.querySelector("." + buttonWrapperClass);
          if (existBtn) {
            existBtn.parentNode.removeChild(existBtn);
          }

          menu.insertBefore(div, menu.childNodes[0]);
        }
      }
    });
  }).observe(document.body, {
    attributes: true,
    subtree: true,
    attributeFilter: ["src"],
  });
})();
