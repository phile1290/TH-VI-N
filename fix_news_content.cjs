const fs = require('fs');

let content = fs.readFileSync('src/pages/news/NewsDetail.tsx', 'utf8');

const newsContentRegex = /<div className="prose prose-slate max-w-none text-slate-700 text-base md:text-lg leading-relaxed space-y-6 pt-4">[\s\S]*?<\/div>\s*<\/div>\s*<div className="md:col-span-1">/g;

// Actually simpler to just replace everything between {/* Main Content Body */} and {/* Sidebar */}
const blockRegex = /\{\/\* Main Content Body \*\/\}([\s\S]*?)\{\/\* Sidebar \*\/\}/g;

content = content.replace(blockRegex, `{/* Main Content Body */}
        <div 
          className="editor-content prose prose-slate max-w-none text-slate-700 text-base md:text-lg leading-relaxed space-y-6 pt-4"
          dangerouslySetInnerHTML={{ __html: article.content || '<p className="text-center text-slate-500 italic">Đang cập nhật nội dung...</p>' }}
        />
      </div>

      {/* Sidebar */}`);

fs.writeFileSync('src/pages/news/NewsDetail.tsx', content);
