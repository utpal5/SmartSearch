import React from 'react';
import { Book as BookIcon, User, Calendar, Star, Heart } from 'lucide-react';
import { Book } from '../types/Book';
import { getCoverUrl } from '../services/api';

interface BookCardProps {
  book: Book;
  onBookClick: (book: Book) => void;
  isFavorite: boolean;
  onToggleFavorite: (book: Book) => void;
}

const BookCard: React.FC<BookCardProps> = ({ 
  book, 
  onBookClick, 
  isFavorite, 
  onToggleFavorite 
}) => {
  const coverUrl = book.cover_i ? getCoverUrl(book.cover_i, 'M') : null;
  const authors = book.author_name?.slice(0, 2).join(', ') || 'Unknown Author';
  const publishYear = book.first_publish_year || book.publish_year?.[0];
  
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden group cursor-pointer">
      <div onClick={() => onBookClick(book)}>
        <div className="aspect-[3/4] bg-gray-100 relative overflow-hidden">
          {coverUrl ? (
            <img
              src={coverUrl}
              alt={book.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          <div className={`${coverUrl ? 'hidden' : ''} absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600`}>
            <BookIcon className="text-white" size={48} />
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(book);
            }}
            className="absolute top-2 right-2 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
          >
            <Heart
              size={16}
              className={`${
                isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
              } transition-colors`}
            />
          </button>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
            {book.title}
          </h3>
          
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <User size={14} />
              <span className="truncate">{authors}</span>
            </div>
            
            {publishYear && (
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>{publishYear}</span>
              </div>
            )}
            
            {book.ratings_average && (
              <div className="flex items-center gap-1">
                <Star size={14} className="fill-yellow-400 text-yellow-400" />
                <span>{book.ratings_average.toFixed(1)}</span>
                {book.ratings_count && (
                  <span className="text-gray-400">({book.ratings_count})</span>
                )}
              </div>
            )}
          </div>

          {book.subject && book.subject.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {book.subject.slice(0, 2).map((subject, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                >
                  {subject}
                </span>
              ))}
              {book.subject.length > 2 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  +{book.subject.length - 2} more
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;