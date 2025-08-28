# Book Finder

A simple, user-friendly web application for searching books using the [Open Library Search API](https://openlibrary.org/dev/docs/api/search).  
Built with React and Tailwind CSS.

## Features

- **Search books** by title, author, subject, or ISBN
- **Sort results** by relevance, newest, oldest, or rating
- **View book details** in a modal (cover, authors, publisher, year, language, rating, subjects, editions, pages)
- **Add/remove favorites** and view your favorite books
- **Recent search history** for quick repeat searches
- **Popular search suggestions** for convenience
- **Responsive design** for desktop and mobile
- **Graceful error handling** and loading indicators

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Start the development server:**
   ```sh
   npm run dev
   ```

3. **Open your browser:**  
   Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

## Project Structure

- `src/App.tsx` - Main application logic and state
- `src/components/` - UI components (BookCard, BookDetails, SearchForm, etc.)
- `src/hooks/` - Custom hooks for favorites and search history
- `src/services/api.ts` - API calls to Open Library

## Deployment
deployed link:- https://smart-search-psi.vercel.app/
