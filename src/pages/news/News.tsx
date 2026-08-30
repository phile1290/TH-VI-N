import { Link } from 'react-router-dom';
import { Calendar, User, Clock, Newspaper, ArrowRight } from 'lucide-react';
import { mockArticles } from '../../lib/mockData';

export default function News() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center bg-gradient-to-r from-blue-500/10 via-amber-500/10 to-emerald-500/10 p-6 md:p-8 rounded-[2.5rem] border border-blue-100">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-black rounded-full mb-3 uppercase tracking-wider">
            <Newspaper className="w-3.5 h-3.5" />
            Bản Tin Trường Học
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-800 mb-2">Tin Tức & Sự Kiện</h1>
          <p className="text-slate-600 font-medium text-base md:text-lg">
            Cập nhật hoạt động đọc sách, phong trào thi đua và thông báo mới nhất từ Thư viện Mỹ An
          </p>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockArticles.map((article) => (
          <Link
            key={article.id} 
            to={`/news/${article.id}`}
            className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col cursor-pointer"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video bg-slate-100 overflow-hidden">
              <img 
                src={article.thumbnail} 
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80';
                }}
              />
              {article.category && (
                <span className="absolute top-4 left-4 px-3 py-1 bg-white/95 backdrop-blur-sm text-blue-700 font-black text-xs rounded-full shadow-sm">
                  {article.category}
                </span>
              )}
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-3">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  {article.date}
                </span>
                {article.readTime && (
                  <span className="flex items-center gap-1 text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    {article.readTime}
                  </span>
                )}
              </div>
              
              <h3 className="text-xl font-black text-slate-800 leading-snug mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                {article.title}
              </h3>
              
              <p className="text-slate-600 font-medium mb-6 line-clamp-3 flex-1 text-sm leading-relaxed">
                {article.summary}
              </p>

              <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-auto">
                <span className="flex items-center gap-2 text-xs font-bold text-slate-500">
                  <User className="w-4 h-4 text-amber-500" />
                  {article.author}
                </span>
                <span className="text-blue-600 font-black text-xs flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Đọc tiếp <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
