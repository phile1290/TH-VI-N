const fs = require('fs');
let content = fs.readFileSync('src/components/layout/MainLayout.tsx', 'utf8');

const oldFooterStart = `{/* Footer */}`;
const oldFooterEnd = `{/* Global AI Chat Widget */}`;

const oldFooterCode = content.substring(content.indexOf(oldFooterStart), content.indexOf(oldFooterEnd));

const newFooterCode = `{/* Footer */}
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
      `;

content = content.replace(oldFooterCode, newFooterCode);

fs.writeFileSync('src/components/layout/MainLayout.tsx', content);
