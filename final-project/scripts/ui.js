// UI rendering and manipulation module
import { isInFavorites } from './storage.js';

// Create a book card element
export function createBookCard(book, options = {}) {
  const { showFavoriteButton = true, showDetailsButton = true, showRemoveButton = false } = options;

  const card = document.createElement('div');
  card.className = 'book-card';
  card.dataset.bookId = book.id;

  // Truncate description
  const truncatedDescription = truncateText(book.description, 150);
  const authorsText = Array.isArray(book.authors) ? book.authors.join(', ') : book.authors;

  card.innerHTML = `
        <img src="${book.thumbnail}" alt="${book.title}" loading="lazy">
        <h3>${book.title}</h3>
        <p class="author">by ${authorsText}</p>
        <p class="description">${truncatedDescription}</p>
        <div class="actions">
            ${showFavoriteButton ? createFavoriteButton(book.id) : ''}
            ${showDetailsButton ? `<button class="details-btn" data-book-id="${book.id}">View Details</button>` : ''}
            ${showRemoveButton ? `<button class="remove-favorite-btn" data-book-id="${book.id}">Remove</button>` : ''}
        </div>
    `;

  return card;
}

// Create favorite button HTML
function createFavoriteButton(bookId) {
  const isFavorited = isInFavorites(bookId);
  const buttonClass = isFavorited ? 'favorite-btn favorited' : 'favorite-btn';
  const buttonText = isFavorited ? 'Favorited ❤️' : 'Add to Favorites';

  return `<button class="${buttonClass}" data-book-id="${bookId}">${buttonText}</button>`;
}

// Render books to a container
export function renderBooks(books, container, options = {}) {
  if (!container) {
    console.error('Container element not found');
    return;
  }

  container.innerHTML = '';

  if (books.length === 0) {
    container.innerHTML = `
            <div class="no-results">
                <h3>No books found</h3>
                <p>Try adjusting your search terms or browse different categories.</p>
            </div>
        `;
    return;
  }

  books.forEach(book => {
    const bookCard = createBookCard(book, options);
    container.appendChild(bookCard);
  });
}

// Show loading state
export function showLoading(container, message = 'Loading...') {
  if (container) {
    container.innerHTML = `<div class="loading">${message}</div>`;
  }
}

// Show error message
export function showError(container, message = 'Something went wrong. Please try again.') {
  if (container) {
    container.innerHTML = `
            <div class="error-message">
                <h3>Oops!</h3>
                <p>${message}</p>
                <button onclick="location.reload()" class="btn">Try Again</button>
            </div>
        `;
  }
}

// Create book details modal content
export function createBookDetailsModal(book) {
  const authorsText = Array.isArray(book.authors) ? book.authors.join(', ') : book.authors;
  const categoriesText = Array.isArray(book.categories) ? book.categories.join(', ') : book.categories;

  return `
        <img src="${book.thumbnail}" alt="${book.title}">
        <h2>${book.title}</h2>
        <p class="author">by ${authorsText}</p>
        <div class="book-meta">
            <p><strong>Published:</strong> ${book.publishedDate}</p>
            <p><strong>Pages:</strong> ${book.pageCount}</p>
            <p><strong>Categories:</strong> ${categoriesText}</p>
            <p><strong>Language:</strong> ${book.language.toUpperCase()}</p>
        </div>
        <div class="description">
            <h3>Description</h3>
            <p>${book.description}</p>
        </div>
        <div class="modal-actions">
            ${createFavoriteButton(book.id)}
            ${book.previewLink !== '#' ? `<a href="${book.previewLink}" target="_blank" class="btn">Preview Book</a>` : ''}
        </div>
    `;
}

// Truncate text to specified length
function truncateText(text, maxLength) {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

// Update favorite button state
export function updateFavoriteButton(bookId, isFavorited) {
  const buttons = document.querySelectorAll(`[data-book-id="${bookId}"].favorite-btn`);
  buttons.forEach(button => {
    if (isFavorited) {
      button.classList.add('favorited');
      button.textContent = 'Favorited ❤️';
    } else {
      button.classList.remove('favorited');
      button.textContent = 'Add to Favorites';
    }
  });
}

// Show notification message
export function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;

  // Style the notification
  Object.assign(notification.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '1rem 1.5rem',
    borderRadius: '8px',
    color: 'white',
    fontWeight: '600',
    zIndex: '1000',
    transform: 'translateX(100%)',
    transition: 'transform 0.3s ease'
  });

  // Set background color based on type
  const colors = {
    success: '#38a169',
    error: '#e53e3e',
    info: '#3182ce'
  };
  notification.style.backgroundColor = colors[type] || colors.info;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}