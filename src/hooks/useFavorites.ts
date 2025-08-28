import { useState, useEffect } from 'react';
import { Book } from '../types/Book';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Book[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('book-finder-favorites');
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to parse favorites from localStorage:', error);
      }
    }
  }, []);

  const addFavorite = (book: Book) => {
    const updated = [...favorites, book];
    setFavorites(updated);
    localStorage.setItem('book-finder-favorites', JSON.stringify(updated));
  };

  const removeFavorite = (bookKey: string) => {
    const updated = favorites.filter(book => book.key !== bookKey);
    setFavorites(updated);
    localStorage.setItem('book-finder-favorites', JSON.stringify(updated));
  };

  const toggleFavorite = (book: Book) => {
    const isFavorite = favorites.some(fav => fav.key === book.key);
    if (isFavorite) {
      removeFavorite(book.key);
    } else {
      addFavorite(book);
    }
  };

  const isFavorite = (bookKey: string) => {
    return favorites.some(fav => fav.key === bookKey);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite
  };
};