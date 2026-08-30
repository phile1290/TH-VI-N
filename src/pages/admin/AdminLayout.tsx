import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { BookCopy, FileText, LogOut, LayoutDashboard, Home, ShieldCheck, Sparkles, Trophy } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function AdminLayout() {
  const location = useLocation();
  const { isAdmin, logout } = useAuth();

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  const navItems = [
    { path: '/admin', icon: <LayoutDashboard className="w-5 h-5" />, label: 'Bảng Điều Khiển' },
    { path: '/admin/books', icon: <BookCopy className="w-5 h-5" />, label: 'Quản Lý Sách' },
    { path: '/admin/news', icon: <FileText className="w-5 h-5" />, label: 'Quản Lý Tin Tức' },
    { path: '/admin/leaderboard', icon: <Trophy className="w-5 h-5" />, label: 'Quản Lý Bảng Vàng' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar Desktop */}
      <aside className="w-72 bg-white border-r border-slate-200 flex-col hidden md:flex flex-shrink-0 min-h-screen">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-2.5 rounded-2xl text-white shadow-md shadow-blue-500/20">
            <LayoutDashboard className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-black text-slate-800 text-lg leading-tight">Admin Quản Trị</h2>
            <p className="text-xs font-bold text-blue-600 flex items-center gap-1 mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5" /> Thư Viện Mỹ An
            </p>
          </div>
        </div>

        {/* User Card */}
        <div className="m-4 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-black text-sm flex items-center justify-center shadow-xs">
            PT
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-slate-800 text-sm truncate">Phan Thị Việt</h4>
            <p className="text-xs font-medium text-slate-500">Quản trị viên hệ thống</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm transition-all ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}

          <div className="pt-4 border-t border-slate-100">
            <p className="px-4 text-xs font-black text-slate-400 uppercase tracking-wider mb-2">
              Lối tắt Website
            </p>
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <Home className="w-5 h-5 text-emerald-600" />
              Xem Trang Chủ Học Sinh
            </Link>
          </div>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button
            onClick={() => {
              logout();
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-bold text-sm text-rose-600 hover:bg-rose-50 border border-rose-100 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Đăng xuất & Trở về
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-xl text-white">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <span className="font-black text-slate-800 text-base">Admin Thư Viện</span>
          </div>
          <div className="flex items-center gap-2">
            <Link 
              to="/" 
              className="px-3 py-1.5 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1"
            >
              <Home className="w-3.5 h-3.5" /> Trang chủ
            </Link>
          </div>
        </header>

        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}