import { fetchData, createPlaceCard } from "./utils.js";

const placesContainer = document.getElementById("places");

async function displayPlaces() {
  const places = await fetchData("data/places.json");
  places.forEach((place) => {
    const card = createPlaceCard(place);
    placesContainer.appendChild(card);
  });
}

function displayVisitorMessage() {
  const visitorMessageContainer = document.getElementById("visitor-message");
  if (!visitorMessageContainer) return;

  const lastVisit = localStorage.getItem("lastVisit");
  const currentDate = Date.now();
  let message = "";

  if (!lastVisit) {
    // First visit
    message = "Welcome! Let us know if you have any questions.";
  } else {
    const lastVisitDate = parseInt(lastVisit);
    const timeDifference = currentDate - lastVisitDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (daysDifference < 1) {
      // Less than a day
      message = "Back so soon! Awesome!";
    } else if (daysDifference === 1) {
      // Exactly 1 day
      message = "You last visited 1 day ago.";
    } else {
      // More than 1 day
      message = `You last visited ${daysDifference} days ago.`;
    }
  }

  // Display the message
  visitorMessageContainer.textContent = message;

  // Store the current visit date
  localStorage.setItem("lastVisit", currentDate.toString());
}

function setupCloseButton() {
  const closeButton = document.getElementById("close-visitor-message");
  const messageWrapper = document.querySelector(".visitor-message-wrapper");

  if (closeButton && messageWrapper) {
    closeButton.addEventListener("click", () => {
      messageWrapper.classList.add("hidden");
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  displayPlaces();
  displayVisitorMessage();
  setupCloseButton();
});
