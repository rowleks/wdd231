// Import utility functions
import { setupMobileNav, updateFooter } from './utils.js';

document.addEventListener("DOMContentLoaded", () => {
  // Set up mobile navigation and footer
  setupMobileNav();
  updateFooter();

  // Get URL parameters
  const params = new URLSearchParams(window.location.search);

  // Populate the confirmation details
  document.getElementById("requester-name").textContent = params.get("requesterName") || "Not provided";
  document.getElementById("requester-email").textContent = params.get("requesterEmail") || "Not provided";
  document.getElementById("book-title").textContent = params.get("bookTitle") || "Not provided";
  document.getElementById("book-author").textContent = params.get("bookAuthor") || "Not provided";
  document.getElementById("book-isbn").textContent = params.get("bookIsbn") || "Not provided";
  document.getElementById("book-category").textContent = params.get("bookCategory") || "Not specified";
  document.getElementById("additional-info").textContent = params.get("additionalInfo") || "None provided";

  // Format and display timestamp
  const timestamp = params.get("timestamp");
  if (timestamp) {
    const date = new Date(parseInt(timestamp));
    document.getElementById("timestamp").textContent = date.toLocaleString();
  } else {
    document.getElementById("timestamp").textContent = "Not available";
  }

});