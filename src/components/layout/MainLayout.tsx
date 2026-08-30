import { Outlet, Link, NavLink as RouterNavLink } from 'react-router-dom';
import { BookOpen, Star, Trophy, Newspaper, Home, BookHeart, Settings, Facebook, Youtube, Mail, Phone, Globe, QrCode } from 'lucide-react';
import React, { ReactNode, useState } from 'react';
import FloatingChatWidget from '../chatbot/FloatingChatWidget';
import LoginModal from '../LoginModal';
import { useAuth } from '../../contexts/AuthContext';

export default function MainLayout() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { isAdmin } = useAuth();

  return (
    <div className="min-h-screen bg-sky-50 font-sans text-slate-800 relative flex flex-col">
      {/* Header/Navbar */}
      <header className="flex flex-col z-50">
        {/* Banner Section */}
        <div className="relative h-48 md:h-64 w-full bg-blue-50 overflow-hidden shadow-lg">
          <img 
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=2000&q=80" 
            alt="Library Banner" 
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-blue-900/10 to-blue-50/10 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          
          {/* Top Right Admin Button */}
          <div className="absolute top-4 right-4 z-10">
            {isAdmin ? (
              <Link 
                to="/admin" 
                className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white p-2 md:px-4 md:py-2 rounded-xl flex items-center gap-2 transition-all border border-white/30 shadow-lg"
              >
                <Settings className="w-5 h-5" />
                <span className="hidden md:inline font-bold text-sm">Quản trị</span>
              </Link>
            ) : (
              <button 
                onClick={() => setIsLoginModalOpen(true)}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white/90 p-2 md:px-4 md:py-2 rounded-xl flex items-center gap-2 transition-all border border-white/20 hover:border-white/40"
              >
                <Settings className="w-5 h-5" />
                <span className="hidden md:inline font-bold text-sm">Đăng nhập</span>
              </button>
            )}
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center pointer-events-none">
             <Link to="/" className="flex flex-col items-center gap-4 group pointer-events-auto">
                <div className="bg-amber-400 p-3 rounded-2xl shadow-xl transform group-hover:scale-105 transition-transform duration-300 ring-4 ring-white/50">
                  <BookOpen className="h-10 w-10 text-blue-900" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-5xl font-black text-white tracking-tight drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] uppercase">
                    Thư Viện Trường Tiểu Học Mỹ An
                  </h1>
                </div>
              </Link>
          </div>
        </div>

        {/* Refined Navigation Section */}
        <div className="bg-blue-800 w-full shadow-md sticky top-0 z-40 border-b border-blue-900">
          <nav className="flex justify-center flex-wrap gap-6 md:gap-32 max-w-7xl mx-auto px-4">
            <BlockNavLink to="/" icon={<Home className="w-5 h-5" />} text="Trang chủ" />
            <BlockNavLink to="/books" icon={<BookHeart className="w-5 h-5" />} text="Tủ Sách" />
            <BlockNavLink to="/news" icon={<Newspaper className="w-5 h-5" />} text="Tin Tức" />
            <BlockNavLink to="/leaderboard" icon={<Trophy className="w-5 h-5" />} text="Bảng Vàng" />
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-slate-300 py-8 mt-12 border-t-4 border-amber-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Column 1: Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-xl">
                  <BookOpen className="w-6 h-6 text-blue-900" />
                </div>
                <div>
                  <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider">Thư viện số</h3>
                  <h2 className="font-black text-lg text-white uppercase">Tiểu học Mỹ An</h2>
                </div>
              </div>
              <div className="space-y-2 text-sm font-medium">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span>Email: thuvienmyan@edu.vn</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span>Điện thoại: 0123 456 789</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-slate-400" />
                  <span>Website: thuvientieuhocmyan.vercel.app</span>
                </div>
              </div>
            </div>

            {/* Column 2: Khám phá */}
            <div>
              <h3 className="font-black text-white text-base mb-4 relative inline-block">
                Khám phá
                <span className="absolute -bottom-1.5 left-0 w-1/2 h-1 bg-amber-400 rounded-full"></span>
              </h3>
              <ul className="space-y-2 text-sm font-medium">
                <li><Link to="/books" className="hover:text-white transition-colors">Tủ Sách trực tuyến</Link></li>
                <li><Link to="/leaderboard" className="hover:text-white transition-colors">Bảng Vàng thi đua</Link></li>
                <li><button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="hover:text-white transition-colors">Trang chủ</button></li>
              </ul>
            </div>

            {/* Column 3: Tin tức */}
            <div>
              <h3 className="font-black text-white text-base mb-4 relative inline-block">
                Tin tức & Hoạt động
                <span className="absolute -bottom-1.5 left-0 w-1/2 h-1 bg-amber-400 rounded-full"></span>
              </h3>
              <ul className="space-y-2 text-sm font-medium">
                <li><Link to="/news" className="hover:text-white transition-colors">Hoạt động Thư viện</Link></li>
                <li><Link to="/news" className="hover:text-white transition-colors">Phong trào thi đua</Link></li>
                <li><Link to="/news" className="hover:text-white transition-colors">Góc giới thiệu sách</Link></li>
              </ul>
            </div>

            {/* Column 4: Liên kết */}
            <div>
              <h3 className="font-black text-white text-base mb-4 uppercase tracking-wider">
                Kết nối
              </h3>
              <div className="flex gap-3 mb-6">
                <a href="#" className="w-8 h-8 rounded-full bg-slate-700 hover:bg-blue-600 flex items-center justify-center text-white transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-slate-700 hover:bg-red-600 flex items-center justify-center text-white transition-colors">
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
              <div className="bg-white p-1.5 rounded-lg inline-block">
                 <QrCode className="w-12 h-12 text-slate-800" />
              </div>
            </div>

          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-700 text-xs font-medium text-slate-400 flex flex-col md:flex-row justify-between items-center gap-2">
            <p>Copyright © 2026 Thư Viện Mỹ An. All rights reserved.</p>
            <p>Xã Phù Mỹ Đông, Tỉnh Gia Lai</p>
          </div>
        </div>
      </footer>
      {/* Global AI Chat Widget */}
      <FloatingChatWidget />
      
      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </div>
  );
}

// Custom NavLink component for tabs
function BlockNavLink({ to, icon, text }: { to: string; icon: ReactNode; text: string }) {
  return (
    <RouterNavLink 
      to={to} 
      className={({ isActive }) => 
        `flex items-center justify-center gap-2 px-5 py-3 md:px-8 md:py-4 text-sm md:text-base font-bold uppercase tracking-wider transition-all duration-200 ${
          isActive 
            ? 'bg-amber-400 text-blue-950 shadow-inner' 
            : 'text-blue-100 hover:bg-blue-700 hover:text-white'
        }`
      }
    >
      <span className="inline-block">{icon}</span>
      {text}
    </RouterNavLink>
  );
}
