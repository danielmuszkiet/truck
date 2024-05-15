// JavaScript, um das Modal zu öffnen und zu schließen
var buttons = document.querySelectorAll(".button");
var spans = document.querySelectorAll(".close");
const submitBtn = document.getElementById("submit-btn");

submitBtn.addEventListener("click", () => {
  alert("Klick mich härter!!!!! ");
});

// Öffnen des Modals bei Klick auf den Button
buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    var modalId = this.getAttribute("data-modal-id");
    var modal = document.getElementById(modalId);
    modal.style.display = "block";
  });
});

// Schließen des Modals bei Klick auf das Schließen-Symbol
spans.forEach(function (span) {
  span.addEventListener("click", function () {
    var modal = this.parentNode.parentNode;
    modal.style.display = "none";
  });
});

// Schließen des Modals bei Klick auf den Hintergrund
window.onclick = function (event) {
  if (event.target.classList.contains("modal")) {
    event.target.style.display = "none";
  }
};
