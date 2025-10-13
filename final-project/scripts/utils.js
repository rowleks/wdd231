// Utility functions module

// Debounce function to limit function calls
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Set up mobile navigation toggle
export function setupMobileNav() {
  const menuButton = document.getElementById('menu');
  const nav = document.getElementById('nav');

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      nav.classList.toggle('active');
      menuButton.classList.toggle('show');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!menuButton.contains(e.target) && !nav.contains(e.target)) {
        nav.classList.remove('active');
        menuButton.classList.remove('show');
      }
    });

    // Close menu when clicking on nav links
    nav.addEventListener('click', (e) => {
      if (e.target.classList.contains('nav-link')) {
        nav.classList.remove('active');
        menuButton.classList.remove('show');
      }
    });
  }
}

// Update footer with current year and last modified date
export function updateFooter() {
  const currentYearElement = document.getElementById('currentyear');
  const lastModifiedElement = document.getElementById('lastModified');

  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }

  if (lastModifiedElement) {
    lastModifiedElement.textContent = `Last modified: ${document.lastModified}`;
  }
}

// Smooth scroll to element
export function scrollToElement(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Format date string
export function formatDate(dateString) {
  if (!dateString) return 'Unknown';

  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    return dateString;
  }
}

// Validate email format
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Sanitize HTML string
export function sanitizeHTML(str) {
  const temp = document.createElement('div');
  temp.textContent = str;
  return temp.innerHTML;
}

// Get query parameter from URL
export function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Set query parameter in URL
export function setQueryParam(param, value) {
  const url = new URL(window.location);
  url.searchParams.set(param, value);
  window.history.replaceState({}, '', url);
}

// Remove query parameter from URL
export function removeQueryParam(param) {
  const url = new URL(window.location);
  url.searchParams.delete(param);
  window.history.replaceState({}, '', url);
}

// Check if user prefers reduced motion
export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Generate unique ID
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

// Copy text to clipboard
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}