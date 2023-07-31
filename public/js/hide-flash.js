


const alert = document.getElementById('pdAlert');
const dismiss = document.getElementById('dismiss-pd');
dismiss.onclick = function () {
  if (alert.style.display !== "none") {
    alert.style.display = "none";
  } else {
    alert.style.display = "block";
  }
};
