// JavaScript, um das Modal zu öffnen und zu schließen
var buttons = document.querySelectorAll(".button");
var spans = document.querySelectorAll(".close");
const form = document.getElementById("my-form");

form.addEventListener("submit", async (event) => {
  console.log("Test");
  event.preventDefault(); // Prevent the default form submission
  const formData = new FormData(form);

  const pickUpDate = formData.get("from");
  const returnDate = formData.get("to");
  const email = formData.get("email");
  const msg = formData.get("msg");

  const res = await fetch(
    "https://truck-backend-kipy.onrender.com/send-email",
    {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        from: pickUpDate,
        to: returnDate,
        email: email,
        msg: msg,
      }),
    }
  );
  console.log(res.json());
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
