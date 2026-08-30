import { Heart, BookOpen } from 'lucide-react';
import { Book } from '../../types';
import { Link } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import React, { useState } from 'react';

interface BookCardProps {
  key?: string | number;
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const { likeBook } = useData();
  const [hasLiked, setHasLiked] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to book detail
    if (!hasLiked) {
      likeBook(book.id);
      setHasLiked(true);
    }
  };

  return (
    <Link 
      to={`/books/${book.id}`}
      className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all group flex flex-col h-full cursor-pointer"
    >
      <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-4 bg-slate-100">
        <img 
          src={book.coverImage} 
          alt={book.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            // Xử lý khi ảnh lỗi, thay bằng ảnh mặc định
            e.currentTarget.src = 'https://placehold.co/400x600?text=Sách+Mỹ+An';
          }}
        />
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {book.isNew && (
            <span className="px-2 py-1 bg-rose-500 text-white text-xs font-bold rounded-lg shadow-sm">
              MỚI
            </span>
          )}
          {book.isPopular && (
            <span className="px-2 py-1 bg-amber-400 text-amber-950 text-xs font-bold rounded-lg shadow-sm">
              HOT
            </span>
          )}
        </div>
        <button 
          className={`absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full transition-colors ${hasLiked ? 'text-rose-500' : 'text-slate-400 hover:text-rose-500 hover:bg-white'}`}
          onClick={handleLike}
        >
          <Heart className={`w-4 h-4 ${hasLiked ? 'fill-rose-500' : ''}`} />
        </button>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-lg truncate max-w-full">
            {book.category}
          </span>
          <span className="text-xs font-bold text-slate-400">
            Lớp {book.grade}
          </span>
        </div>
        
        <h3 className="text-lg font-black text-slate-800 leading-tight mb-1 line-clamp-2">
          {book.title}
        </h3>
        <p className="text-sm font-medium text-slate-500 mb-4 line-clamp-1">
          {book.author}
        </p>
        
        <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
          <span className="flex items-center gap-1 text-sm font-bold text-slate-400">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            {book.likes}
          </span>
          <span className="flex items-center gap-1 text-sm font-bold text-blue-600 group-hover:text-blue-700">
            <BookOpen className="w-4 h-4" />
            Xem chi tiết
          </span>
        </div>
      </div>
    </Link>
  );
}
