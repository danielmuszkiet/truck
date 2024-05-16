// JavaScript, um das Modal zu öffnen und zu schließen
var buttons = document.querySelectorAll(".buttonCall");
var spans = document.querySelectorAll(".close");
const form = document.getElementById("my-form");

form.addEventListener("submit", async (event) => {
  console.log("Test");
  event.preventDefault(); // Prevent the default form submission
  const formData = new FormData(form);

  const pickUpDate = formData.get("from");
  const returnDate = formData.get("to");
  const email = "danielmuszkiet@icloud.com"; //formData.get("email");
  const msg = "Das ist eine cumstom Mail"; //formData.get("msg");
  const tel = formData.get("tel");
  const jeepType = formData.get("jeep-select");
  const exp = formData.get("offroad-exp");

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
        tel: tel,
        jeepType: jeepType,
        exp: exp,
      }),
    }
  );

  if (res.ok) {
    alert("Mail versendet! Sie werden nun weitergeleitet....");
    window.location.href = "https://www.youtube.com/watch?v=xvFZjo5PgG0";
  } else {
    console.log("Hopala");
  }
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
