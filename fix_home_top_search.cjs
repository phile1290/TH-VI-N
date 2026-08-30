const fs = require('fs');
let content = fs.readFileSync('src/pages/home/Home.tsx', 'utf8');

// Replace the Sách Mới Về block
const newBooksOld = `<div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                  <span className="bg-rose-100 text-rose-500 p-2 rounded-xl"><BookHeart className="w-6 h-6" /></span>
                  Sách Mới Về
                </h2>
              <div className="relative w-full md:w-80">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm tên sách, tác giả..." 
                  className="w-full pl-11 pr-4 py-2.5 bg-blue-50 border border-blue-100 text-blue-900 placeholder-blue-400 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium text-sm"
                />
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-500 w-4 h-4" />
              </div>
              </div>`;

const newBooksNew = `<div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 relative">
              <div className="absolute top-6 right-8 w-64 md:w-80 hidden md:block">
                <div className="relative w-full">
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm tên sách, tác giả..." 
                    className="w-full pl-11 pr-4 py-2.5 bg-blue-50 border border-blue-100 text-blue-900 placeholder-blue-400 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium text-sm shadow-sm"
                  />
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-500 w-4 h-4" />
                </div>
              </div>
              <div className="flex flex-col mb-8 mt-2">
                <div className="md:hidden relative w-full mb-6">
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm tên sách, tác giả..." 
                    className="w-full pl-11 pr-4 py-2.5 bg-blue-50 border border-blue-100 text-blue-900 placeholder-blue-400 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium text-sm"
                  />
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-500 w-4 h-4" />
                </div>
                <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                  <span className="bg-rose-100 text-rose-500 p-2 rounded-xl"><BookHeart className="w-6 h-6" /></span>
                  Sách Mới Về
                </h2>
              </div>`;

content = content.replace(newBooksOld, newBooksNew);


// Replace the Search Results block
const searchResultsOld = `<div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                <span className="bg-blue-100 text-blue-600 p-2 rounded-xl"><Search className="w-6 h-6" /></span>
                Kết quả tìm kiếm
              </h2>
              <div className="relative w-full md:w-80">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm tên sách, tác giả..." 
                  className="w-full pl-11 pr-4 py-2.5 bg-blue-50 border border-blue-100 text-blue-900 placeholder-blue-400 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium text-sm"
                />
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-500 w-4 h-4" />
              </div>
            </div>`;

const searchResultsNew = `<div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 relative">
            <div className="absolute top-6 right-8 w-64 md:w-80 hidden md:block">
              <div className="relative w-full">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm tên sách, tác giả..." 
                  className="w-full pl-11 pr-4 py-2.5 bg-blue-50 border border-blue-100 text-blue-900 placeholder-blue-400 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium text-sm shadow-sm"
                />
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-500 w-4 h-4" />
              </div>
            </div>
            <div className="flex flex-col mb-8 mt-2">
              <div className="md:hidden relative w-full mb-6">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm tên sách, tác giả..." 
                  className="w-full pl-11 pr-4 py-2.5 bg-blue-50 border border-blue-100 text-blue-900 placeholder-blue-400 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium text-sm"
                />
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-500 w-4 h-4" />
              </div>
              <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                <span className="bg-blue-100 text-blue-600 p-2 rounded-xl"><Search className="w-6 h-6" /></span>
                Kết quả tìm kiếm
              </h2>
            </div>`;

content = content.replace(searchResultsOld, searchResultsNew);

fs.writeFileSync('src/pages/home/Home.tsx', content);
