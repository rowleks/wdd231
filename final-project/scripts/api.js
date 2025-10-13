// API module for fetching books from Google Books API
const API_BASE_URL = 'https://www.googleapis.com/books/v1/volumes';
const DEFAULT_QUERY = 'subject:fiction';
const MAX_RESULTS = 20;

// Fetch books from Google Books API
export async function fetchBooks(query = DEFAULT_QUERY, maxResults = MAX_RESULTS) {
  try {
    const url = `${API_BASE_URL}?q=${encodeURIComponent(query)}&maxResults=${maxResults}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.items ? data.items.map(formatBookData) : [];
  } catch (error) {
    console.error('Error fetching books:', error);
    throw new Error('Failed to fetch books. Please try again later.');
  }
}

// Search books by specific query
export async function searchBooks(searchTerm, category = '') {
  let query = searchTerm;

  if (category) {
    query = `${searchTerm} subject:${category}`;
  }

  return await fetchBooks(query);
}

// Get featured books (popular fiction)
export async function getFeaturedBooks() {
  const queries = [
    'bestseller fiction',
    'popular science',
    'classic literature'
  ];

  try {
    const promises = queries.map(query => fetchBooks(query, 6));
    const results = await Promise.all(promises);

    // Flatten and shuffle the results
    const allBooks = results.flat();
    return shuffleArray(allBooks).slice(0, 6);
  } catch (error) {
    console.error('Error fetching featured books:', error);
    // Fallback to default query
    return await fetchBooks(DEFAULT_QUERY, 6);
  }
}

// Format book data from Google Books API response
function formatBookData(item) {
  const volumeInfo = item.volumeInfo || {};
  const imageLinks = volumeInfo.imageLinks || {};

  return {
    id: item.id,
    title: volumeInfo.title || 'Unknown Title',
    authors: volumeInfo.authors || ['Unknown Author'],
    description: volumeInfo.description || 'No description available.',
    thumbnail: imageLinks.thumbnail || imageLinks.smallThumbnail || 'https://via.placeholder.com/128x192?text=No+Image',
    publishedDate: volumeInfo.publishedDate || 'Unknown',
    pageCount: volumeInfo.pageCount || 'Unknown',
    categories: volumeInfo.categories || ['General'],
    language: volumeInfo.language || 'en',
    previewLink: volumeInfo.previewLink || '#',
    infoLink: volumeInfo.infoLink || '#'
  };
}

// Shuffle array utility function
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Get book by ID
export async function getBookById(bookId) {
  try {
    const url = `${API_BASE_URL}/${bookId}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return formatBookData(data);
  } catch (error) {
    console.error('Error fetching book by ID:', error);
    throw new Error('Failed to fetch book details.');
  }
}