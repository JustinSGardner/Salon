"use strict";

const favIdentifier = document.getElementById("favIdentifier");
document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".carousel");
  var instances = M.Carousel.init(elems, {
    duration: 10,
  });
  var elems = document.querySelectorAll(".collapsible");
  var instance1 = M.Collapsible.init(elems);
  var elems = document.querySelectorAll(".materialboxed");
  var instance2 = M.Materialbox.init(elems);
  const formFav = document.getElementById("favorite");
});

const searchDiv = document.querySelector(".search");

searchDiv.addEventListener("click", () => {
  const searchForm = document.querySelector(".search-form");
  searchForm.classList.add("show");
});
const addComment = document.querySelector(".addComment")
addComment.addEventListener("click", () => {
  let commentBox = document.querySelector('.add-comment')
  commentBox.classList.add("show")
})
const seeComment = document.querySelector(".seeComment")
seeComment.addEventListener("click", () => {
  let commentBox = document.querySelector('.see-comment')
  commentBox.classList.add("show")
})