import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, BookOpen, User, Star, BookKey } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useState } from 'react';

export default function BookDetail() {
  // Lấy ID sách từ URL
  const { id } = useParams();
  
  // Trạng thái bật/tắt khu vực Đọc sách trực tuyến
  const [isReading, setIsReading] = useState(false);
  
  // Tìm sách tương ứng trong mockData
  const { books, likeBook } = useData();
  const book = books.find(b => b.id === id);

  if (!book) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-black text-slate-700 mb-4">Không tìm thấy sách!</h2>
        <Link to="/books" className="text-blue-600 font-bold hover:underline">
          Quay lại Tủ Sách
        </Link>
      </div>
    );
  }

  const handleRead = () => {
    setIsReading(true);
    // Tự động cuộn xuống khu vực đọc sách sau một chút delay để UI kịp render
    setTimeout(() => {
      document.getElementById('reader-view')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Back Button */}
      <Link to="/books" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold transition-colors">
        <ArrowLeft className="w-5 h-5" />
        Quay lại Tủ Sách
      </Link>

      <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-sm border border-slate-100">
        <div className="grid md:grid-cols-12 gap-10">
          
          {/* Cột trái: Ảnh bìa */}
          <div className="md:col-span-4 lg:col-span-5 relative">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border border-slate-100 bg-slate-50">
              <img 
                src={book.coverImage} 
                alt={book.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://placehold.co/600x800?text=Sách+Mỹ+An';
                }}
              />
            </div>
          </div>

          {/* Cột phải: Thông tin chi tiết */}
          <div className="md:col-span-8 lg:col-span-7 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-blue-50 text-blue-600 text-sm font-black rounded-lg">
                {book.category}
              </span>
              <span className="px-3 py-1 bg-amber-50 text-amber-600 text-sm font-black rounded-lg">
                Lớp {book.grade}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-slate-800 leading-tight mb-4">
              {book.title}
            </h1>

            <div className="flex items-center gap-6 mb-8 border-b border-slate-100 pb-8">
              <div className="flex items-center gap-2 text-slate-600 font-semibold text-lg">
                <User className="w-5 h-5 text-slate-400" />
                {book.author}
              </div>
              <button 
                onClick={() => likeBook(book.id)}
                className="flex items-center gap-2 text-rose-500 font-bold text-lg hover:bg-rose-50 px-3 py-1.5 rounded-xl transition-colors"
              >
                <Heart className="w-5 h-5 fill-rose-500" />
                {book.likes} yêu thích
              </button>
            </div>

            <div className="space-y-4 mb-8 flex-1">
              <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
                <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
                Tóm tắt nội dung
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed font-medium">
                {book.description}
              </p>
            </div>

            {/* Nút Đọc Sách Ngay */}
            <div className="flex gap-4 mt-auto">
              {!isReading ? (
                <button 
                  onClick={handleRead}
                  className="flex-1 flex justify-center items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-black rounded-2xl shadow-lg shadow-blue-600/30 transition-transform hover:-translate-y-1 active:translate-y-0"
                >
                  <BookOpen className="w-6 h-6" />
                  Đọc Sách Ngay
                </button>
              ) : (
                <button 
                  onClick={() => setIsReading(false)}
                  className="flex-1 flex justify-center items-center gap-2 px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 text-lg font-black rounded-2xl transition-colors"
                >
                  Đóng Sách Lại
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Reader View: Chỉ hiện ra khi isReading = true */}
        {isReading && (
          <div id="reader-view" className="mt-12 pt-12 border-t border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="max-w-3xl mx-auto bg-amber-50/50 p-8 md:p-12 rounded-3xl border border-amber-100/50 shadow-inner">
              <h2 className="text-3xl font-black text-slate-800 mb-8 text-center flex items-center justify-center gap-3">
                <BookKey className="w-8 h-8 text-amber-500" />
                Nội dung cuốn sách
              </h2>
              
              <div className="prose prose-lg prose-slate max-w-none">
                {/* Render nội dung sách, sử dụng CSS white-space để giữ nguyên định dạng xuống dòng */}
                {book.content ? (
                  <div 
                    className="editor-content text-base md:text-[15px] leading-relaxed text-slate-700 font-medium font-serif prose prose-slate max-w-none"
                    dangerouslySetInnerHTML={{ __html: book.content }}
                  />
                ) : (
                  <p className="text-center text-slate-500 italic">Đang cập nhật nội dung cho cuốn sách này...</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
