// Shop page script
import { fetchBooks, searchBooks, getBookById } from './api.js';
import { renderBooks, showLoading, showError, createBookDetailsModal, updateFavoriteButton, showNotification } from './ui.js';
import { setupMobileNav, updateFooter, debounce, getQueryParam } from './utils.js';
import { addToFavorites, removeFromFavorites, isInFavorites } from './storage.js';

let currentBooks = [];
let isLoading = false;

// Initialize the shop page
document.addEventListener('DOMContentLoaded', async () => {
  setupMobileNav();
  updateFooter();
  await loadInitialBooks();
  setupEventListeners();
  checkForBookParam();
});

// Load initial books
async function loadInitialBooks() {
  const container = document.getElementById('books-container');
  const loadingElement = document.getElementById('loading');

  if (!container) return;

  isLoading = true;
  if (loadingElement) loadingElement.style.display = 'block';

  try {
    const books = await fetchBooks();
    currentBooks = books;
    renderBooks(books, container, {
      showFavoriteButton: true,
      showDetailsButton: true
    });
  } catch (error) {
    console.error('Error loading books:', error);
    showError(container, 'Failed to load books. Please try again later.');
  } finally {
    isLoading = false;
    if (loadingElement) loadingElement.style.display = 'none';
  }
}

// Set up event listeners
function setupEventListeners() {
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-btn');
  const categoryFilter = document.getElementById('category-filter');
  const booksContainer = document.getElementById('books-container');
  const modal = document.getElementById('book-modal');
  const closeModal = document.getElementById('close-modal');

  // Search functionality
  if (searchInput && searchButton) {
    const debouncedSearch = debounce(handleSearch, 500);

    searchInput.addEventListener('input', debouncedSearch);
    searchButton.addEventListener('click', handleSearch);

    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSearch();
      }
    });
  }

  // Category filter
  if (categoryFilter) {
    categoryFilter.addEventListener('change', handleCategoryFilter);
  }

  // Book interactions
  if (booksContainer) {
    booksContainer.addEventListener('click', handleBookInteraction);
  }

  // Modal controls
  if (closeModal && modal) {
    closeModal.addEventListener('click', () => modal.close());
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.close();
    });
  }
}

// Handle search functionality
async function handleSearch() {
  if (isLoading) return;

  const searchInput = document.getElementById('search-input');
  const categoryFilter = document.getElementById('category-filter');
  const container = document.getElementById('books-container');

  if (!searchInput || !container) return;

  const searchTerm = searchInput.value.trim();
  const category = categoryFilter ? categoryFilter.value : '';

  if (!searchTerm && !category) {
    await loadInitialBooks();
    return;
  }

  isLoading = true;
  showLoading(container, 'Searching books...');

  try {
    const books = await searchBooks(searchTerm || 'books', category);
    currentBooks = books;
    renderBooks(books, container, {
      showFavoriteButton: true,
      showDetailsButton: true
    });
  } catch (error) {
    console.error('Error searching books:', error);
    showError(container, 'Search failed. Please try again.');
  } finally {
    isLoading = false;
  }
}

// Handle category filter change
async function handleCategoryFilter() {
  await handleSearch();
}

// Handle book interactions (favorite, details)
async function handleBookInteraction(e) {
  if (e.target.classList.contains('favorite-btn')) {
    e.preventDefault();
    await handleFavoriteClick(e.target);
  }

  if (e.target.classList.contains('details-btn')) {
    e.preventDefault();
    await handleDetailsClick(e.target);
  }
}

// Handle favorite button click
async function handleFavoriteClick(button) {
  const bookId = button.dataset.bookId;
  const book = currentBooks.find(b => b.id === bookId);

  if (!book) return;

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
async function handleDetailsClick(button) {
  const bookId = button.dataset.bookId;
  const modal = document.getElementById('book-modal');
  const modalContent = document.getElementById('modal-book-details');

  if (!modal || !modalContent) return;

  try {
    modalContent.innerHTML = '<div class="loading">Loading book details...</div>';
    modal.showModal();

    // Try to get book from current books first
    let book = currentBooks.find(b => b.id === bookId);

    // If not found, fetch from API
    if (!book) {
      book = await getBookById(bookId);
    }

    modalContent.innerHTML = createBookDetailsModal(book);

    // Set up modal favorite button
    const modalFavoriteBtn = modalContent.querySelector('.favorite-btn');
    if (modalFavoriteBtn) {
      modalFavoriteBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        await handleFavoriteClick(modalFavoriteBtn);
      });
    }

  } catch (error) {
    console.error('Error loading book details:', error);
    modalContent.innerHTML = '<div class="error-message">Failed to load book details.</div>';
  }
}

// Check for book parameter in URL and show details
async function checkForBookParam() {
  const bookId = getQueryParam('book');
  if (bookId) {
    // Simulate clicking details button
    await handleDetailsClick({ dataset: { bookId } });
  }
}