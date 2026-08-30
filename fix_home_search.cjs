const fs = require('fs');
let content = fs.readFileSync('src/pages/home/Home.tsx', 'utf8');

// Add imports
content = content.replace(
  "import { Sparkles, PlayCircle, BookHeart, Star } from 'lucide-react';",
  "import { useState } from 'react';\nimport { Sparkles, PlayCircle, BookHeart, Star, Search } from 'lucide-react';"
);

// Add search state and logic
content = content.replace(
  "const { books } = useData();",
  `const { books } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  
  const searchResults = books.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );`
);

// Add search bar inside Hero
const buttonsHtml = `<div className="flex flex-wrap gap-4">
              <Link 
                to="/books" 
                className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl shadow-lg shadow-blue-600/30 transition-transform hover:-translate-y-1 active:translate-y-0 flex items-center gap-2"
              >
                Đọc Sách Ngay 🚀
              </Link>
              <Link 
                to="/news"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl backdrop-blur-md flex items-center gap-2 transition-colors border border-white/20"
              >
                <BookHeart className="w-6 h-6" />
                Hoạt Động Thư Viện
              </Link>
            </div>`;

const searchBarHtml = `
            <div className="mt-8 max-w-xl relative">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm nhanh tên sách, tác giả..." 
                className="w-full pl-14 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white placeholder-slate-300 shadow-sm rounded-2xl focus:outline-none focus:border-white focus:bg-white/20 transition-all font-medium text-lg"
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white w-6 h-6" />
            </div>`;

content = content.replace(buttonsHtml, buttonsHtml + "\n" + searchBarHtml);

// Add conditional rendering for sections
const sectionsHtml = `{/* Featured Sections */}
      <section className="space-y-12">`;

const newSectionsHtml = `{/* Featured Sections */}
      <section className="space-y-12">
        {searchQuery ? (
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
            <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
              <span className="bg-blue-100 text-blue-600 p-2 rounded-xl"><Search className="w-6 h-6" /></span>
              Kết quả tìm kiếm cho: "{searchQuery}"
            </h2>
            {searchResults.length > 0 ? (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {searchResults.map(book => (
                  <BookCard key={\`search-\${book.id}\`} book={book} />
                ))}
              </div>
            ) : (
              <p className="text-slate-500 font-medium text-center py-8">Không tìm thấy sách nào phù hợp. Hãy thử lại với từ khóa khác.</p>
            )}
          </div>
        ) : (
          <>`;

content = content.replace(sectionsHtml, newSectionsHtml);

// Close the conditional rendering block
content = content.replace(
  "        </div>\n      </section>",
  "        </div>\n          </>\n        )}\n      </section>"
);

fs.writeFileSync('src/pages/home/Home.tsx', content);
