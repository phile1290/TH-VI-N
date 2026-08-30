const fs = require('fs');

let content = fs.readFileSync('src/pages/news/NewsDetail.tsx', 'utf8');

const regex = /\{\/\* Main Content Body \*\/\}\s*<div className="prose prose-slate max-w-none text-slate-700 text-base md:text-lg leading-relaxed space-y-6 pt-4">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<div className="md:col-span-1">/g;

content = content.replace(regex, `{/* Main Content Body */}
        <div 
          className="editor-content prose prose-slate max-w-none text-slate-700 text-base md:text-lg leading-relaxed space-y-6 pt-4"
          dangerouslySetInnerHTML={{ __html: article.content || '<p className="text-center text-slate-500 italic">Đang cập nhật nội dung...</p>' }}
        />
      </div>
    </div>
    
    <div className="md:col-span-1">`);

fs.writeFileSync('src/pages/news/NewsDetail.tsx', content);
