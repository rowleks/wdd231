// Local Storage management module
const FAVORITES_KEY = 'bookhive_favorites';

// Get all favorites from localStorage
export function getFavorites() {
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error getting favorites from localStorage:', error);
    return [];
  }
}

// Save favorites to localStorage
export function saveFavorites(favorites) {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites to localStorage:', error);
    throw new Error('Failed to save favorites. Storage might be full.');
  }
}

// Add a book to favorites
export function addToFavorites(book) {
  try {
    const favorites = getFavorites();

    // Check if book is already in favorites
    if (favorites.some(fav => fav.id === book.id)) {
      return false; // Already exists
    }

    favorites.push({
      ...book,
      dateAdded: new Date().toISOString()
    });

    saveFavorites(favorites);
    return true;
  } catch (error) {
    console.error('Error adding to favorites:', error);
    return false;
  }
}

// Remove a book from favorites
export function removeFromFavorites(bookId) {
  try {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter(book => book.id !== bookId);

    saveFavorites(updatedFavorites);
    return true;
  } catch (error) {
    console.error('Error removing from favorites:', error);
    return false;
  }
}
// Check if a book is in favorites

export function isInFavorites(bookId) {
  const favorites = getFavorites();
  return favorites.some(book => book.id === bookId);
}

// Clear all favorites
export function clearAllFavorites() {
  try {
    localStorage.removeItem(FAVORITES_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing favorites:', error);
    return false;
  }
}

// Get favorites count
export function getFavoritesCount() {
  return getFavorites().length;
}

// Export favorites as JSON
export function exportFavorites() {
  const favorites = getFavorites();
  return JSON.stringify(favorites, null, 2);
}

// Import favorites from JSON
export function importFavorites(jsonString) {
  try {
    const favorites = JSON.parse(jsonString);
    if (Array.isArray(favorites)) {
      saveFavorites(favorites);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error importing favorites:', error);
    return false;
  }
}