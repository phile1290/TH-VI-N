const fs = require('fs');
let content = fs.readFileSync('src/pages/books/Books.tsx', 'utf8');

content = content.replace(
  "import { Search, Filter, BookX } from 'lucide-react';",
  "import { Search, BookX } from 'lucide-react';"
);

const filterButton = `<button className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl transition-colors shrink-0">
              <Filter className="w-6 h-6" />
            </button>`;
content = content.replace(filterButton, "");

fs.writeFileSync('src/pages/books/Books.tsx', content);
