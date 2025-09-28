document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);

  document.getElementById("firstName").textContent = params.get("firstName");
  document.getElementById("lastName").textContent = params.get("lastName");
  document.getElementById("email").textContent = params.get("email");
  document.getElementById("mobile").textContent = params.get("mobile");
  document.getElementById("businessName").textContent =
    params.get("businessName");

  const timestamp = params.get("timestamp");
  if (timestamp) {
    const date = new Date(parseInt(timestamp));
    document.getElementById("timestamp").textContent = date.toLocaleString();
  }
});
