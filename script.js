// JavaScript, um das Modal zu öffnen und zu schließen
var buttons = document.querySelectorAll(".buttonCall");
var spans = document.querySelectorAll(".close");
const form = document.getElementById("my-form");
const heroFormBtn = document.getElementById("hero-contact-btn");

const t1 = document.getElementById("from-date1");
t1.min = new Date().toISOString().split("T")[0];
const t2 = document.getElementById("to-date1");
// Get tomorrow's date
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

t1.addEventListener("input", function () {
  // Get the value of t1 and convert it to a Date object
  const fromDate = new Date(t1.value);

  // If t1 has a valid value
  if (!isNaN(fromDate.getTime())) {
    // Clone the fromDate object to avoid modifying the original one
    const toDate = new Date(fromDate);

    // Add one day to toDate
    toDate.setDate(toDate.getDate() + 1);

    // Format toDate as YYYY-MM-DD
    const formattedDate = toDate.toISOString().split("T")[0];

    // Set the min attribute of t2 to be t1 + 1 day
    t2.min = formattedDate;
  }
});

// Format tomorrow's date as YYYY-MM-DD
const formattedTomorrow = tomorrow.toISOString().split("T")[0];

// Set the min attribute of the input element to tomorrow's date
t2.min = formattedTomorrow;

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
  const email = formData.get("email");
  const msg = formData.get("msg");
  const tel = formData.get("tel");
  const jeepType = formData.get("jeep-select");
  const exp = formData.get("offroad-exp");
  const yesno = formData.get("yesno");
  console.log(pickUpDate, returnDate, email, msg, tel, jeepType, exp, yesno);

  form.style.display = "none";
  document.getElementById("spinner").style.display = "flex";

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
    document.getElementById("spinner").style.display = "none";
    const al = document.getElementById("confirm-alert");
    al.style.display = "";
    setTimeout(function () {
      al.style.display = "none";
      form.style.display = "";
      form.reset();
      const modalId = document.getElementById("modalRubicon");
      modalId.style.display = "none";
    }, 5000);
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
