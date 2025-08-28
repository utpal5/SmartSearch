import React from 'react';
import { X, User, Calendar, BookOpen, Globe, Star, Heart } from 'lucide-react';
import { getCoverUrl } from '../services/api';

const BookDetails = ({ book, onClose, isFavorite, onToggleFavorite }) => {
  const coverUrl = book.cover_i ? getCoverUrl(book.cover_i, 'L') : null;
  const authors = book.author_name?.join(', ') || 'Unknown Author';
  const publishers = book.publisher?.slice(0, 3).join(', ');
  const publishYear = book.first_publish_year || book.publish_year?.[0];
  const languages = book.language?.slice(0, 3).join(', ');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Book Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
                {coverUrl ? (
                  <img
                    src={coverUrl}
                    alt={book.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                ) : null}
                <div className={`${coverUrl ? 'hidden' : ''} absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600`}>
                  <BookOpen className="text-white" size={64} />
                </div>
              </div>
              
              <button
                onClick={() => onToggleFavorite(book)}
                className={`w-full mt-4 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                  isFavorite
                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Heart size={16} className={isFavorite ? 'fill-current' : ''} />
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
            </div>

            <div className="md:col-span-2 space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {book.title}
                </h1>
                
                <div className="space-y-3 text-gray-600">
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span className="font-medium">Author(s):</span>
                    <span>{authors}</span>
                  </div>
                  
                  {publishYear && (
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span className="font-medium">First Published:</span>
                      <span>{publishYear}</span>
                    </div>
                  )}
                  
                  {publishers && (
                    <div className="flex items-center gap-2">
                      <BookOpen size={16} />
                      <span className="font-medium">Publisher(s):</span>
                      <span>{publishers}</span>
                    </div>
                  )}
                  
                  {languages && (
                    <div className="flex items-center gap-2">
                      <Globe size={16} />
                      <span className="font-medium">Language(s):</span>
                      <span>{languages}</span>
                    </div>
                  )}
                  
                  {book.ratings_average && (
                    <div className="flex items-center gap-2">
                      <Star size={16} className="fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">Rating:</span>
                      <span>
                        {book.ratings_average.toFixed(1)}/5
                        {book.ratings_count && (
                          <span className="text-gray-400 ml-1">
                            ({book.ratings_count} ratings)
                          </span>
                        )}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {book.subject && book.subject.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Subjects</h3>
                  <div className="flex flex-wrap gap-2">
                    {book.subject.slice(0, 10).map((subject, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                      >
                        {subject}
                      </span>
                    ))}
                    {book.subject.length > 10 && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                        +{book.subject.length - 10} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                {book.edition_count && (
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {book.edition_count}
                    </div>
                    <div className="text-sm text-gray-600">Editions</div>
                  </div>
                )}
                
                {book.number_of_pages_median && (
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-emerald-600">
                      {book.number_of_pages_median}
                    </div>
                    <div className="text-sm text-gray-600">Pages (median)</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;