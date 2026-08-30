import { Outlet, Link, NavLink as RouterNavLink } from 'react-router-dom';
import { BookOpen, Star, Trophy, Newspaper, Home, BookHeart, Settings } from 'lucide-react';
import { ReactNode, useState } from 'react';
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

        {/* Blocky Navigation Section */}
        <div className="bg-blue-800 w-full shadow-md sticky top-0 z-40 border-b-4 border-amber-400">
          <nav className="flex flex-wrap max-w-7xl mx-auto md:px-8">
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
      <footer className="bg-white mt-12 py-8 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-500 font-medium">© 2026 Thư Viện Trường Tiểu học Mỹ An.</p>
          <p className="text-sm text-slate-400 mt-1">Xã Phù Mỹ Đông, Tỉnh Gia Lai</p>
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

// Custom NavLink component for blocky tabs
function BlockNavLink({ to, icon, text }: { to: string; icon: ReactNode; text: string }) {
  return (
    <RouterNavLink 
      to={to} 
      className={({ isActive }) => 
        `flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-4 md:px-8 md:py-5 text-sm md:text-base font-bold uppercase tracking-wider transition-all duration-200 border-r border-blue-700/50 last:border-r-0 ${
          isActive 
            ? 'bg-amber-400 text-blue-950 shadow-inner' 
            : 'text-blue-50 hover:bg-blue-700 hover:text-white'
        }`
      }
    >
      <span className="hidden sm:inline-block">{icon}</span>
      {text}
    </RouterNavLink>
  );
}
