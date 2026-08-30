import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Calendar, User, Clock, Newspaper, ArrowRight, Search, FileX } from 'lucide-react';
import { mockArticles } from '../../lib/mockData';

export default function News() {
  const [searchQuery, setSearchQuery] = useState('');
  const filteredArticles = mockArticles.filter(article => 
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    article.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );
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
        <div className="flex-1 w-full md:max-w-xs mt-4 md:mt-0">
          <div className="relative">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm tin tức..." 
              className="w-full pl-12 pr-4 py-3 bg-white border-2 border-white/50 shadow-sm rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all font-medium text-slate-700"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArticles.map((article) => (
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
      
      {filteredArticles.length === 0 && (
        <div className="bg-white rounded-[2rem] p-12 shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
          <div className="bg-slate-100 p-4 rounded-full mb-4">
            <FileX className="w-12 h-12 text-slate-400" />
          </div>
          <h3 className="text-xl font-black text-slate-700 mb-2">Không tìm thấy bản tin nào!</h3>
          <p className="text-slate-500 font-medium">Vui lòng thử lại với từ khóa khác.</p>
        </div>
      )}
    </div>
  );
}
