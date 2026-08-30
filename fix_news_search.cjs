const fs = require('fs');
let content = fs.readFileSync('src/pages/news/News.tsx', 'utf8');

// Add imports
content = content.replace(
  "import { Calendar, User, Clock, Newspaper, ArrowRight } from 'lucide-react';",
  "import { useState } from 'react';\nimport { Calendar, User, Clock, Newspaper, ArrowRight, Search, FileX } from 'lucide-react';"
);

// Add state and filter logic
content = content.replace(
  "export default function News() {",
  `export default function News() {
  const [searchQuery, setSearchQuery] = useState('');
  const filteredArticles = mockArticles.filter(article => 
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    article.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );`
);

// Add search bar
const headerSection = `        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-black rounded-full mb-3 uppercase tracking-wider">
            <Newspaper className="w-3.5 h-3.5" />
            Bản Tin Trường Học
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-800 mb-2">Tin Tức & Sự Kiện</h1>
          <p className="text-slate-600 font-medium text-base md:text-lg">
            Cập nhật hoạt động đọc sách, phong trào thi đua và thông báo mới nhất từ Thư viện Mỹ An
          </p>
        </div>`;

const searchBarHtml = `        <div className="flex-1 w-full md:max-w-xs mt-4 md:mt-0">
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
        </div>`;

content = content.replace(headerSection, headerSection + "\n" + searchBarHtml);

// Replace mockArticles.map with filteredArticles.map
content = content.replace(
  /\{mockArticles\.map\(\(article\) => \(/g,
  "{filteredArticles.map((article) => ("
);

// Handle empty state
content = content.replace(
  /<\/div>\n    <\/div>\n  \);\n\}/,
  `      </div>
      
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
}`
);

fs.writeFileSync('src/pages/news/News.tsx', content);
