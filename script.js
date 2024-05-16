// JavaScript, um das Modal zu öffnen und zu schließen
var buttons = document.querySelectorAll(".buttonCall");
var spans = document.querySelectorAll(".close");
const form = document.getElementById("my-form");
const heroFormBtn = document.getElementById("hero-contact-btn");

heroFormBtn.addEventListener("click", () => {
  const from = document.getElementById("from-date1").value;
  const to = document.getElementById("to-date1").value;
  const jeepType1 = document.getElementById("jepp-type1").value;

  const from2 = document.getElementById("from-date2");
  const to2 = document.getElementById("to-date2");
  const jeepType2 = document.getElementById("jepp-type2");
  from2.value = from;
  to2.value = to;
  jeepType2.value = jeepType1;
});

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
  const yesno = formData.get("yesno");
  console.log(pickUpDate, returnDate, email, msg, tel, jeepType, exp, yesno);

  const res = await fetch(
    "https://truck-backend-znw3.onrender.com/send-email",
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
        yesno: yesno,
      }),
    }
  );

  if (res.ok) {
    alert("TODO Bestätigung zeigen");
  } else {
    console.log("Hopala etwas ist falsch gelaufen");
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
