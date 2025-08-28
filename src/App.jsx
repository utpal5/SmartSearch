import React, { useState } from 'react';
import { BookOpen, Heart, History, Search as SearchIcon } from 'lucide-react';
import { searchBooks } from './services/api';
import SearchForm from './components/SearchForm';
import BookCard from './components/BookCard';
import BookDetails from './components/BookDetails';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { useFavorites } from './hooks/useFavorites';
import { useSearchHistory } from './hooks/useSearchHistory';

const App = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentView, setCurrentView] = useState('search');
  const [searchResults, setSearchResults] = useState(null);

  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { history, addToHistory } = useSearchHistory();

  const handleSearch = async (params) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await searchBooks(params);
      setBooks(response.docs);
      setSearchResults({
        total: response.numFound,
        currentQuery: params.query
      });
      addToHistory(params.query, params.searchType);
      setCurrentView('search');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while searching');
      setBooks([]);
      setSearchResults(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    if (searchResults) {
      // Retry the last search
      window.location.reload();
    }
  };

  const displayBooks = currentView === 'favorites' ? favorites : books;
  const showEmptyState = !isLoading && displayBooks.length === 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="text-blue-600" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">BookFinder</h1>
                <p className="text-sm text-gray-600">Discover your next great read</p>
              </div>
            </div>
            
            <nav className="flex items-center gap-4">
              <button
                onClick={() => setCurrentView('search')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentView === 'search'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <SearchIcon size={16} />
                Search
              </button>
              <button
                onClick={() => setCurrentView('favorites')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors relative ${
                  currentView === 'favorites'
                    ? 'bg-red-100 text-red-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Heart size={16} />
                Favorites
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'search' && (
          <>
            <SearchForm onSearch={handleSearch} isLoading={isLoading} />
            
            {/* Search History */}
            {history.length > 0 && !searchResults && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <History className="text-gray-600" size={20} />
                  <h3 className="font-semibold text-gray-800">Recent Searches</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {history.slice(0, 5).map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch({
                        query: item.query,
                        searchType: item.searchType,
                        sortBy: 'relevance',
                        limit: 20
                      })}
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                    >
                      {item.query} ({item.searchType})
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Results Header */}
        {searchResults && currentView === 'search' && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Search Results for "{searchResults.currentQuery}"
            </h2>
            <p className="text-gray-600">
              Found {searchResults.total.toLocaleString()} books
            </p>
          </div>
        )}

        {currentView === 'favorites' && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Your Favorite Books</h2>
            <p className="text-gray-600">
              {favorites.length} book{favorites.length !== 1 ? 's' : ''} saved
            </p>
          </div>
        )}

        {/* Content */}
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} onRetry={handleRetry} />
        ) : showEmptyState ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              {currentView === 'favorites' ? (
                <Heart className="text-gray-600" size={32} />
              ) : (
                <SearchIcon className="text-gray-600" size={32} />
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {currentView === 'favorites' ? 'No favorites yet' : 'Ready to search'}
            </h3>
            <p className="text-gray-600">
              {currentView === 'favorites'
                ? 'Start exploring and add books to your favorites!'
                : 'Enter a search term above to discover amazing books'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {displayBooks.map((book) => (
              <BookCard
                key={book.key}
                book={book}
                onBookClick={setSelectedBook}
                isFavorite={isFavorite(book.key)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}

        {/* Book Details Modal */}
        {selectedBook && (
          <BookDetails
            book={selectedBook}
            onClose={() => setSelectedBook(null)}
            isFavorite={isFavorite(selectedBook.key)}
            onToggleFavorite={toggleFavorite}
          />
        )}
      </main>
    </div>
  );
};

export default App;