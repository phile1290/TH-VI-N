import { motion } from 'motion/react';
import { Sparkles, PlayCircle, BookHeart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import BookCard from '../../components/ui/BookCard';
import { useData } from '../../contexts/DataContext';

export default function Home() {
  const { books } = useData();
  const newBooks = books.filter(b => b.isNew).slice(0, 20);
  const popularBooks = books.filter(b => b.isPopular).slice(0, 20);

  return (
    <div className="space-y-16">
      {/* Hero Banner */}
      <section className="relative rounded-[2.5rem] overflow-hidden shadow-2xl min-h-[500px] flex flex-col justify-center group mb-12">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=2000&q=80" 
            alt="Thư viện trường" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
          />
          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/70 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full px-8 md:px-16 py-16 flex flex-col md:w-3/4 lg:w-2/3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/30 text-blue-300 font-bold text-sm backdrop-blur-md mb-6 border border-blue-400/20">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Khám phá tri thức vô tận
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
              Thế Giới Sách <br />
              <span className="text-amber-400">Đang Chờ Đón Bạn!</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-200 font-medium mb-10 max-w-xl leading-relaxed">
              Hàng ngàn cuốn sách bổ ích, truyện cổ tích kỳ thú và những bài học kỹ năng sống đang chờ bạn khám phá tại Thư viện số Trường Tiểu học Mỹ An.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/books" 
                className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl shadow-lg shadow-blue-600/30 transition-transform hover:-translate-y-1 active:translate-y-0 flex items-center gap-2"
              >
                Đọc Sách Ngay 🚀
              </Link>
              <Link 
                to="/news"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl backdrop-blur-md flex items-center gap-2 transition-colors border border-white/20"
              >
                <BookHeart className="w-6 h-6" />
                Hoạt Động Thư Viện
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Sections */}
      <section className="space-y-12">
        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
          <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
            <span className="bg-rose-100 text-rose-500 p-2 rounded-xl"><BookHeart className="w-6 h-6" /></span>
            Sách Mới Về
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {newBooks.map(book => (
              <BookCard key={`new-${book.id}`} book={book} />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
          <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
            <span className="bg-amber-100 text-amber-500 p-2 rounded-xl"><Star className="w-6 h-6" /></span>
            Sách Yêu Thích
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {popularBooks.map(book => (
              <BookCard key={`pop-${book.id}`} book={book} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
