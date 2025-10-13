# 📘 Project Instruction: Online Book Store Website

## 🧩 Overview

Create a **3-page website** for purchasing and browsing books.
The site should be **user-friendly**, **modular**, and built using **HTML, CSS, and JavaScript only** (no frameworks or libraries).

Go through the chambers folder and copy some of the patterns I used like in the footer

Do not use iframes or icons from external libraries, I will download assets such as logo and favicon

The three main pages are:

1. **Home Page** – Highlights featured books, trending books, and navigation.
2. **Shop Page** – Displays a list of books fetched from a free books API.
3. **Favorites Page (Cart alternative)** – Displays user-favorited books stored in Local Storage.

---

## 🧱 Requirements

### 1. Technologies

- Use **HTML**, **CSS**, and **Vanilla JavaScript** only.
- Structure the JavaScript code in a **modular way**:
  - Separate logic into **modules** and **helper functions**.
  - Use **ES Modules** with `import` and `export`.
  - Example modules:
    - `api.js` – handles fetching from book API
    - `ui.js` – handles rendering UI elements
    - `storage.js` – handles saving and retrieving data from Local Storage
    - `favorites.js` – manages favorite/unfavorite logic
    - `main.js` – entry point

### 2. API Integration

- Fetch books dynamically from a **free books API** such as:
  - **Google Books API:** `https://www.googleapis.com/books/v1/volumes?q=subject:fiction`
  - Or **Open Library API:** `https://openlibrary.org/search.json?q=subject:fiction`
- Extract and display:
  - Book title
  - Author
  - Thumbnail
  - Description (shortened)
  - Link or button to “Favorite”

### 3. Core Features

1. **Home Page**

   - Display a hero section (site intro and call to action).
   - Show featured books or top picks (fetched from the API).
   - Link to “Shop” and “Favorites.”
2. **Shop Page**

   - Fetch and display a grid of books from the chosen API.
   - Each book card should include:
     - Title
     - Author
     - Thumbnail image
     - “Favorite ❤️” button
   - Include a search bar or category filter for discovering books.
3. **Favorites Page**

   - Display books that users have marked as favorites.
   - Favorites should be **persisted using Local Storage**.
   - Allow users to remove a book from favorites.

---

## 💾 Local Storage Behavior

- When a user clicks the “❤️ Favorite” button, the book data (title, author, thumbnail, etc.) is saved to Local Storage.
- When the user visits the “Favorites” page, the app retrieves and displays these saved books.
- Removing a favorite updates Local Storage accordingly.

---

## 🎨 Design Guidelines

### Color Scheme

Use the **Modern & Sleek** palette:

- Primary: `#3e2c24`
- Accent: `#aec785` (Golden Yellow)
- text: `#222222` (Off White)
- Secondary: `#f6f3ee` (Sage Green)
  The same as in the siteplan.css

### Typography

- **Headings:** *Montserrat*
- **Body:** *Open Sans*

### Layout

- Use **CSS Grid** or **Flexbox** for responsive layouts.
- Include consistent **header, navbar, and footer** across pages.
- Mobile-friendly design.
- Use a mobile first approach

---

## 🧠 JavaScript Architecture Example

```
/src
  ├── index.html
  ├── shop.html
  ├── favorites.html
  ├── /css
  │    ├── style.css
  │    ├── home.css
  │    ├── shop.css
  │    └── favorites.css
  └── /js
       ├── api.js
       ├── ui.js
       ├── storage.js
       ├── favorites.js
       └── main.js
```

### Example Module Responsibilities

- **api.js** – Fetch books from API and return book data.
- **ui.js** – Handle DOM manipulation (render book cards, update lists).
- **storage.js** – `saveToLocalStorage()`, `getFromLocalStorage()`, `removeFromLocalStorage()`.
- **favorites.js** – Logic for adding/removing favorites.
- **main.js** – Initialize app, attach event listeners, and import modules.

---

## ⚙️ Functional Flow

1. **On page load** → Fetch book data via `api.js`.
2. **Render books** → Using functions from `ui.js`.
3. **Favorite actions** → Managed by `favorites.js` and persisted via `storage.js`.
4. **Favorites page** → Reads from Local Storage and displays saved books.
5. **Unfavorite** → Updates both Local Storage and displayed list.

---

## 🧩 Extra Features (Optional)

- Add “View Details” modal or popup for book summary using the dialog element.
- Add search or filter functionality on the shop page.
- Display a small notification (“Book added to favorites”).
- Add a form field where users can request for specific books
