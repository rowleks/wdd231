// Main script for home page
import { getFeaturedBooks } from './api.js';
import { renderBooks, showLoading, showError } from './ui.js';
import { setupMobileNav, updateFooter } from './utils.js';
import { addToFavorites, removeFromFavorites, isInFavorites } from './storage.js';
import { updateFavoriteButton, showNotification } from './ui.js';

// Initialize the home page
document.addEventListener('DOMContentLoaded', async () => {
  setupMobileNav();
  updateFooter();
  await loadFeaturedBooks();
  setupEventListeners();
});

// Load and display featured books
async function loadFeaturedBooks() {
  const container = document.getElementById('featured-books-container');
  if (!container) return;

  showLoading(container, 'Loading featured books...');

  try {
    const books = await getFeaturedBooks();
    renderBooks(books, container, {
      showFavoriteButton: true,
      showDetailsButton: true
    });
  } catch (error) {
    console.error('Error loading featured books:', error);
    showError(container, 'Failed to load featured books. Please try again later.');
  }
}

// Set up event listeners
function setupEventListeners() {
  const container = document.getElementById('featured-books-container');
  if (!container) return;

  // Handle favorite button clicks
  container.addEventListener('click', async (e) => {
    if (e.target.classList.contains('favorite-btn')) {
      e.preventDefault();
      await handleFavoriteClick(e.target);
    }

    if (e.target.classList.contains('details-btn')) {
      e.preventDefault();
      handleDetailsClick(e.target);
    }
  });
}

// Handle favorite button click
async function handleFavoriteClick(button) {
  const bookId = button.dataset.bookId;
  const bookCard = button.closest('.book-card');

  if (!bookId || !bookCard) return;

  // Get book data from the card
  const book = extractBookDataFromCard(bookCard);

  try {
    if (isInFavorites(bookId)) {
      const success = removeFromFavorites(bookId);
      if (success) {
        updateFavoriteButton(bookId, false);
        showNotification('Book removed from favorites', 'info');
      }
    } else {
      const success = addToFavorites(book);
      if (success) {
        updateFavoriteButton(bookId, true);
        showNotification('Book added to favorites!', 'success');
      }
    }
  } catch (error) {
    console.error('Error handling favorite:', error);
    showNotification('Failed to update favorites', 'error');
  }
}

// Handle details button click
function handleDetailsClick(button) {
  const bookId = button.dataset.bookId;
  if (bookId) {
    // Redirect to shop page with book details
    window.location.href = `shop.html?book=${bookId}`;
  }
}

// Extract book data from card element
function extractBookDataFromCard(card) {
  const img = card.querySelector('img');
  const title = card.querySelector('h3');
  const author = card.querySelector('.author');
  const description = card.querySelector('.description');

  return {
    id: card.dataset.bookId,
    title: title ? title.textContent : 'Unknown Title',
    authors: author ? [author.textContent.replace('by ', '')] : ['Unknown Author'],
    description: description ? description.textContent : 'No description available.',
    thumbnail: img ? img.src : 'https://via.placeholder.com/128x192?text=No+Image',
    publishedDate: 'Unknown',
    pageCount: 'Unknown',
    categories: ['General'],
    language: 'en',
    previewLink: '#',
    infoLink: '#'
  };
}