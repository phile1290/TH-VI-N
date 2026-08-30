const fs = require('fs');

let bookContent = fs.readFileSync('src/pages/books/BookDetail.tsx', 'utf8');
bookContent = bookContent.replace(
  /className="editor-content text-lg leading-relaxed text-slate-700 font-medium font-serif prose prose-slate max-w-none"/g,
  'className="editor-content text-base md:text-[15px] leading-relaxed text-slate-700 font-medium font-serif prose prose-slate max-w-none"'
);
fs.writeFileSync('src/pages/books/BookDetail.tsx', bookContent);

let newsContent = fs.readFileSync('src/pages/news/NewsDetail.tsx', 'utf8');
newsContent = newsContent.replace(
  /className="editor-content prose prose-slate max-w-none text-slate-700 text-base md:text-lg leading-relaxed pt-4"/g,
  'className="editor-content prose prose-slate max-w-none text-slate-700 text-base md:text-[15px] leading-relaxed pt-4"'
);
fs.writeFileSync('src/pages/news/NewsDetail.tsx', newsContent);
