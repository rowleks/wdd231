# BookHive - Online Bookstore

A modern, responsive online bookstore built with vanilla HTML, CSS, and JavaScript. BookHive allows users to browse books, search by categories, and maintain a personal favorites collection.

## Features

### 🏠 Home Page
- Hero section with call-to-action
- Featured books display
- Responsive design with mobile-first approach

### 🛍️ Shop Page
- Browse books fetched from Google Books API
- Search functionality with real-time results
- Category filtering (Fiction, Science, History, Biography, Technology)
- Book details modal with full descriptions
- Add/remove books from favorites

### ❤️ Favorites Page
- View all favorited books
- Remove individual books from favorites
- Clear all favorites with confirmation
- Persistent storage using localStorage
- Empty state when no favorites exist

## Technical Architecture

### Modular JavaScript Structure
- **api.js** - Handles Google Books API integration
- **storage.js** - Manages localStorage operations for favorites
- **ui.js** - UI rendering and DOM manipulation
- **utils.js** - Utility functions and helpers
- **main.js** - Home page initialization
- **shop.js** - Shop page functionality
- **favorites.js** - Favorites page management

### Design System
- **Colors**: Warm coffee brown (#3e2c24), sage green (#aec785), paper off-white (#f6f3ee)
- **Typography**: Merriweather for headings, Roboto for body text
- **Layout**: CSS Grid and Flexbox for responsive design
- **Mobile-first**: Responsive design starting from mobile screens

## API Integration

Uses Google Books API to fetch book data:
- Base URL: `https://www.googleapis.com/books/v1/volumes`
- Supports search queries and category filtering
- Handles API errors gracefully with fallback content

## Local Storage

Favorites are persisted using browser localStorage:
- Key: `bookhive_favorites`
- Stores complete book objects with metadata
- Includes date added for potential future sorting

## Browser Support

- Modern browsers with ES6+ support
- CSS Grid and Flexbox support required
- localStorage API required for favorites functionality

## Getting Started

1. Open `index.html` in a web browser
2. Browse featured books on the home page
3. Visit the Shop page to search and explore more books
4. Add books to favorites and manage them on the Favorites page

## File Structure

```
final-project/
├── index.html          # Home page
├── shop.html           # Shop/browse page
├── favorites.html      # Favorites page
├── styles/
│   ├── base.css        # Base styles and variables
│   ├── home.css        # Home page specific styles
│   ├── shop.css        # Shop page specific styles
│   └── favorites.css   # Favorites page specific styles
└── scripts/
    ├── main.js         # Home page script
    ├── shop.js         # Shop page script
    ├── favorites.js    # Favorites page script
    ├── api.js          # API integration
    ├── storage.js      # localStorage management
    ├── ui.js           # UI utilities
    └── utils.js        # General utilities
```

## Future Enhancements

- User accounts and cloud sync
- Book reviews and ratings
- Reading progress tracking
- Social sharing features
- Advanced search filters
- Book recommendations

---

Built with ❤️ for WDD231 Final Project