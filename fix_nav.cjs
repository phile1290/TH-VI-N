const fs = require('fs');
let content = fs.readFileSync('src/components/layout/MainLayout.tsx', 'utf8');

const navSectionRegex = /\{\/\* Blocky Navigation Section \*\/\}[\s\S]*?<\/nav>\s*<\/div>/;
const newNavSection = `{/* Refined Navigation Section */}
        <div className="bg-blue-800 w-full shadow-md sticky top-0 z-40 border-b border-blue-900">
          <nav className="flex justify-center flex-wrap gap-2 md:gap-6 max-w-7xl mx-auto px-4 py-2 md:py-3">
            <BlockNavLink to="/" icon={<Home className="w-4 h-4" />} text="Trang chủ" />
            <BlockNavLink to="/books" icon={<BookHeart className="w-4 h-4" />} text="Tủ Sách" />
            <BlockNavLink to="/news" icon={<Newspaper className="w-4 h-4" />} text="Tin Tức" />
            <BlockNavLink to="/leaderboard" icon={<Trophy className="w-4 h-4" />} text="Bảng Vàng" />
          </nav>
        </div>`;

content = content.replace(navSectionRegex, newNavSection);

const navLinkRegex = /function BlockNavLink\(\{ to, icon, text \}: \{ to: string; icon: ReactNode; text: string \}\) \{[\s\S]*?\}/;
const newNavLink = `function BlockNavLink({ to, icon, text }: { to: string; icon: ReactNode; text: string }) {
  return (
    <RouterNavLink 
      to={to} 
      className={({ isActive }) => 
        \`flex items-center justify-center gap-1.5 px-3 py-1.5 md:px-5 md:py-2 text-xs md:text-sm font-bold uppercase tracking-wider rounded-lg transition-all duration-200 \${
          isActive 
            ? 'bg-amber-400 text-blue-950 shadow-md transform scale-105' 
            : 'text-blue-100 hover:bg-blue-700 hover:text-white'
        }\`
      }
    >
      <span className="inline-block">{icon}</span>
      {text}
    </RouterNavLink>
  );
}`;

content = content.replace(navLinkRegex, newNavLink);

fs.writeFileSync('src/components/layout/MainLayout.tsx', content);
