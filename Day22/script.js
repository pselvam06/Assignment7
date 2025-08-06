
document.addEventListener("DOMContentLoaded", function () {
  // Get the button and text elements
const button = document.getElementById("changeBtn");
const title = document.getElementById("title");
const text = document.getElementById("text");

button.addEventListener("click", function () {
  // Change the text of the title and text elements
  title.textContent = "MERN Stack web development";
    title.style.color = "blue"; // Change the color of the title
    title.style.fontSize = "2em"; // Change the font size of the title
    title.style.fontWeight = "bold"; // Change the font weight of the title
    text.style.color = "green"; // Change the color of the text
    text.style.fontSize = "1.5em"; // Change the font size of the text
  text.textContent = "This is the new text content.";

});

});