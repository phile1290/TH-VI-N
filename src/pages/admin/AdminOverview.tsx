import { BookOpen, FileText, TrendingUp, Users, Layers } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

export default function AdminOverview() {
  const { books, articles } = useData();

  const totalLikes = books.reduce((acc, book) => acc + (book.likes || 0), 0);
  const popularBooksCount = books.filter(b => b.isPopular).length;

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-xs">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-800 flex items-center gap-3">
            <span className="bg-blue-100 text-blue-600 p-2 rounded-2xl">
              <Layers className="w-7 h-7" />
            </span>
            Bảng Điều Khiển
          </h1>
          <p className="text-slate-500 font-medium text-sm md:text-base mt-1">
            Tổng quan số liệu thống kê thư viện trường Tiểu học Mỹ An
          </p>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-black text-slate-800">{books.length}</div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Đầu sách kho</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-black text-slate-800">{articles.length}</div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Bài viết tin tức</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-black text-slate-800">{totalLikes}</div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Lượt thích sách</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-black text-slate-800">{popularBooksCount}</div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sách Nổi Bật</div>
          </div>
        </div>
      </div>
    </div>
  );
}
