const fs = require('fs');
let content = fs.readFileSync('src/pages/home/Home.tsx', 'utf8');

// 1. Remove the search bar from the Hero Banner
const searchBarInHero = `
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
content = content.replace(searchBarInHero, '');

// 2. Add the search bar to the "Sách Mới Về" and "Kết quả tìm kiếm" headers
const searchBarHtml = `
              <div className="relative w-full md:w-80">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm tên sách, tác giả..." 
                  className="w-full pl-11 pr-4 py-2.5 bg-blue-50 border border-blue-100 text-blue-900 placeholder-blue-400 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium text-sm"
                />
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-500 w-4 h-4" />
              </div>`;

// Replace search results header
const searchResultHeaderOld = `<h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
              <span className="bg-blue-100 text-blue-600 p-2 rounded-xl"><Search className="w-6 h-6" /></span>
              Kết quả tìm kiếm cho: "{searchQuery}"
            </h2>`;
const searchResultHeaderNew = `<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                <span className="bg-blue-100 text-blue-600 p-2 rounded-xl"><Search className="w-6 h-6" /></span>
                Kết quả tìm kiếm
              </h2>
${searchBarHtml}
            </div>`;
content = content.replace(searchResultHeaderOld, searchResultHeaderNew);

// Replace Sách Mới Về header
const newBooksHeaderOld = `<h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
                <span className="bg-rose-100 text-rose-500 p-2 rounded-xl"><BookHeart className="w-6 h-6" /></span>
                Sách Mới Về
              </h2>`;
const newBooksHeaderNew = `<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                  <span className="bg-rose-100 text-rose-500 p-2 rounded-xl"><BookHeart className="w-6 h-6" /></span>
                  Sách Mới Về
                </h2>
${searchBarHtml}
              </div>`;
content = content.replace(newBooksHeaderOld, newBooksHeaderNew);

fs.writeFileSync('src/pages/home/Home.tsx', content);
