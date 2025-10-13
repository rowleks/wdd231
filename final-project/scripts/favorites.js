// Favorites page script
import { getFavorites, removeFromFavorites, clearAllFavorites, getFavoritesCount } from './storage.js';
import { renderBooks, showNotification } from './ui.js';
import { setupMobileNav, updateFooter } from './utils.js';

// Initialize the favorites page
document.addEventListener('DOMContentLoaded', () => {
  setupMobileNav();
  updateFooter();
  loadFavorites();
  setupEventListeners();
});

// Load and display favorite books
function loadFavorites() {
  const container = document.getElementById('favorites-container');
  const emptyState = document.getElementById('empty-favorites');
  const countElement = document.getElementById('favorites-count');
  const clearAllBtn = document.getElementById('clear-all');

  if (!container) return;

  const favorites = getFavorites();
  const count = favorites.length;

  // Update count
  if (countElement) {
    countElement.textContent = count;
  }

  // Enable/disable clear all button
  if (clearAllBtn) {
    clearAllBtn.disabled = count === 0;
  }

  if (count === 0) {
    // Show empty state
    container.style.display = 'none';
    if (emptyState) {
      emptyState.style.display = 'block';
    }
  } else {
    // Show favorites
    container.style.display = 'grid';
    if (emptyState) {
      emptyState.style.display = 'none';
    }

    renderBooks(favorites, container, {
      showFavoriteButton: false,
      showDetailsButton: false,
      showRemoveButton: true
    });
  }
}

// Set up event listeners
function setupEventListeners() {
  const container = document.getElementById('favorites-container');
  const clearAllBtn = document.getElementById('clear-all');

  // Handle remove favorite clicks
  if (container) {
    container.addEventListener('click', handleBookInteraction);
  }

  // Handle clear all favorites
  if (clearAllBtn) {
    clearAllBtn.addEventListener('click', handleClearAll);
  }
}

// Handle book interactions
function handleBookInteraction(e) {
  if (e.target.classList.contains('remove-favorite-btn')) {
    e.preventDefault();
    handleRemoveFavorite(e.target);
  }
}

// Handle remove favorite
function handleRemoveFavorite(button) {
  const bookId = button.dataset.bookId;
  const bookCard = button.closest('.book-card');

  if (!bookId || !bookCard) return;

  // Add removing animation
  bookCard.classList.add('removing');

  setTimeout(() => {
    const success = removeFromFavorites(bookId);
    if (success) {
      showNotification('Book removed from favorites', 'info');
      loadFavorites(); // Reload the favorites
    } else {
      bookCard.classList.remove('removing');
      showNotification('Failed to remove book', 'error');
    }
  }, 500);
}

// Handle clear all favorites
function handleClearAll() {
  const count = getFavoritesCount();

  if (count === 0) return;

  // Create confirmation dialog
  const dialog = document.createElement('dialog');
  dialog.innerHTML = `
        <div class="confirm-dialog">
            <h3>Clear All Favorites?</h3>
            <p>This will remove all ${count} books from your favorites. This action cannot be undone.</p>
            <div class="dialog-actions">
                <button class="cancel-btn">Cancel</button>
                <button class="confirm-btn">Clear All</button>
            </div>
        </div>
    `;

  document.body.appendChild(dialog);
  dialog.showModal();

  // Handle dialog buttons
  const cancelBtn = dialog.querySelector('.cancel-btn');
  const confirmBtn = dialog.querySelector('.confirm-btn');

  cancelBtn.addEventListener('click', () => {
    dialog.close();
    document.body.removeChild(dialog);
  });

  confirmBtn.addEventListener('click', () => {
    const success = clearAllFavorites();
    if (success) {
      showNotification('All favorites cleared', 'info');
      loadFavorites();
    } else {
      showNotification('Failed to clear favorites', 'error');
    }

    dialog.close();
    document.body.removeChild(dialog);
  });

  // Close on backdrop click
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) {
      dialog.close();
      document.body.removeChild(dialog);
    }
  });
}

// Export favorites functionality (bonus feature)
function exportFavorites() {
  const favorites = getFavorites();
  if (favorites.length === 0) {
    showNotification('No favorites to export', 'info');
    return;
  }

  const dataStr = JSON.stringify(favorites, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'bookhive-favorites.json';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
  showNotification('Favorites exported successfully', 'success');
}

// Make export function available globally for potential future use
window.exportFavorites = exportFavorites;