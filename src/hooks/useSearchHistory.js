import { useState, useEffect } from 'react';

export const useSearchHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('book-finder-search-history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to parse search history from localStorage:', error);
      }
    }
  }, []);

  const addToHistory = (query, searchType) => {
    const item = {
      query,
      searchType,
      timestamp: Date.now()
    };
    
    const updated = [item, ...history.filter(h => h.query !== query)].slice(0, 10);
    setHistory(updated);
    localStorage.setItem('book-finder-search-history', JSON.stringify(updated));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('book-finder-search-history');
  };

  return {
    history,
    addToHistory,
    clearHistory
  };
};