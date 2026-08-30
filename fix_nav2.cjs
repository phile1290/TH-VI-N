const fs = require('fs');
let content = fs.readFileSync('src/components/layout/MainLayout.tsx', 'utf8');

const navSectionRegex = /\{\/\* Refined Navigation Section \*\/\}[\s\S]*?<\/nav>\s*<\/div>/;
const newNavSection = `{/* Refined Navigation Section */}
        <div className="bg-blue-800 w-full shadow-md sticky top-0 z-40 border-b border-blue-900">
          <nav className="flex justify-center flex-wrap gap-4 md:gap-12 max-w-7xl mx-auto px-4">
            <BlockNavLink to="/" icon={<Home className="w-5 h-5" />} text="Trang chủ" />
            <BlockNavLink to="/books" icon={<BookHeart className="w-5 h-5" />} text="Tủ Sách" />
            <BlockNavLink to="/news" icon={<Newspaper className="w-5 h-5" />} text="Tin Tức" />
            <BlockNavLink to="/leaderboard" icon={<Trophy className="w-5 h-5" />} text="Bảng Vàng" />
          </nav>
        </div>`;

content = content.replace(navSectionRegex, newNavSection);

const navLinkRegex = /function BlockNavLink\(\{ to, icon, text \}: \{ to: string; icon: ReactNode; text: string \}\) \{[\s\S]*?\}/;
const newNavLink = `function BlockNavLink({ to, icon, text }: { to: string; icon: ReactNode; text: string }) {
  return (
    <RouterNavLink 
      to={to} 
      className={({ isActive }) => 
        \`flex items-center justify-center gap-2 px-5 py-3 md:px-8 md:py-4 text-sm md:text-base font-bold uppercase tracking-wider transition-all duration-200 \${
          isActive 
            ? 'bg-amber-400 text-blue-950 shadow-inner' 
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
