const fs = require('fs');

const fixFile = (filePath, importStatement) => {
  let content = fs.readFileSync(filePath, 'utf8');

  // Insert import if not exists
  if (!content.includes('RichTextEditor')) {
    content = content.replace(
      "import { useData } from '../../contexts/DataContext';",
      "import { useData } from '../../contexts/DataContext';\nimport RichTextEditor from '../../components/ui/RichTextEditor';"
    );
  }

  // Replace content textarea in AdminBooks and AdminNews
  const bookTextareaRegex = /<textarea[\s\S]*?value=\{bookForm\.content[\s\S]*?placeholder="Nhập toàn bộ nội dung cuốn sách vào đây\.\.\."\s*><\/textarea>/g;
  content = content.replace(bookTextareaRegex, `<RichTextEditor value={bookForm.content || ''} onChange={(val) => setBookForm({...bookForm, content: val})} placeholder="Nhập hoặc dán toàn bộ nội dung (bao gồm hình ảnh) cuốn sách vào đây..." />`);

  const newsTextareaRegex = /<textarea[\s\S]*?value=\{form\.content[\s\S]*?className="w-full px-4 py-2\.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-blue-500 resize-none select-auto"[\s\S]*?><\/textarea>/g;
  content = content.replace(newsTextareaRegex, `<RichTextEditor value={form.content || ''} onChange={(val) => setForm({...form, content: val})} placeholder="Nhập hoặc dán nội dung (bao gồm hình ảnh) vào đây..." />`);

  fs.writeFileSync(filePath, content);
};

fixFile('src/pages/admin/AdminBooks.tsx');
fixFile('src/pages/admin/AdminNews.tsx');
