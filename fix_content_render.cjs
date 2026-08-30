const fs = require('fs');

const fixFile = (filePath, isBook) => {
  let content = fs.readFileSync(filePath, 'utf8');

  if (isBook) {
    const bookContentRegex = /\{book\.content \? \([\s\S]*?<div className="whitespace-pre-line text-lg leading-relaxed text-slate-700 font-medium font-serif">[\s\S]*?\{book\.content\}[\s\S]*?<\/div>[\s\S]*?\) : \([\s\S]*?<p className="text-center text-slate-500 italic">Đang cập nhật nội dung cho cuốn sách này\.\.\.<\/p>[\s\S]*?\)[\s\S]*?\}/g;
    content = content.replace(bookContentRegex, `{book.content ? (
                  <div 
                    className="editor-content text-lg leading-relaxed text-slate-700 font-medium font-serif prose prose-slate max-w-none"
                    dangerouslySetInnerHTML={{ __html: book.content }}
                  />
                ) : (
                  <p className="text-center text-slate-500 italic">Đang cập nhật nội dung cho cuốn sách này...</p>
                )}`);
  } else {
    // For NewsDetail
    const newsContentRegex = /<div className="whitespace-pre-line text-lg text-slate-700 leading-relaxed font-medium">[\s\S]*?\{article\.content\}[\s\S]*?<\/div>/g;
    content = content.replace(newsContentRegex, `<div 
            className="editor-content text-lg text-slate-700 leading-relaxed font-medium prose prose-slate max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />`);
  }

  fs.writeFileSync(filePath, content);
};

fixFile('src/pages/books/BookDetail.tsx', true);
if (fs.existsSync('src/pages/news/NewsDetail.tsx')) {
  fixFile('src/pages/news/NewsDetail.tsx', false);
}
