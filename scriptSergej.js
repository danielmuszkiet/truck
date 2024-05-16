// JavaScript, um das Modal zu öffnen und zu schließen
const buttons = document.querySelectorAll(".buttonCall");
const spans = document.querySelectorAll(".close");
const form = document.getElementById("my-form");

// Event-Listener für das Formular hinzufügen
form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Verhindert die Standardformularübermittlung
  const formData = new FormData(form);

  // Holen des Abholdatums aus dem Eingabefeld
  const pickUpDateInput = document.getElementById("from");
  const pickUpDate = new Date(pickUpDateInput.value); // Konvertiert den Wert in ein Date-Objekt
  const currentDate = new Date(); // Aktuelles Datum

  // Überprüfen, ob das Abholdatum in der Vergangenheit liegt
  if (pickUpDate < currentDate) {
    alert("Das Abholdatum kann nicht in der Vergangenheit liegen.");
    return; // Stoppt die Ausführung des Codes, wenn das Datum ungültig ist
  }

  // Weitere Formulardaten abrufen
  const returnDate = formData.get("to");
  const email = "danielmuszkiet@icloud.com"; //formData.get("email");
  const msg = "Das ist eine custom Mail"; //formData.get("msg");
  const tel = formData.get("tel");
  const jeepType = formData.get("jeep-select");
  const exp = formData.get("offroad-exp");

  // Senden der Formulardaten an die Backend-URL
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

  // Behandlung der Antwort des Servers
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
