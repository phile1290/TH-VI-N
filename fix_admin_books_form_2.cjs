const fs = require('fs');
let content = fs.readFileSync('src/pages/admin/AdminBooks.tsx', 'utf8');

// We just need to find the "Tóm tắt ngắn" section and the section after it, and insert both if they are missing/wrong.
// Let's replace the single RichTextEditor that currently exists with BOTH textarea and RichTextEditor.

content = content.replace(
  /<div className="space-y-1.5">\s*<label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tóm tắt ngắn<\/label>\s*<RichTextEditor value=\{bookForm\.content/g,
  `<div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tóm tắt ngắn (1-2 câu)</label>
                  <textarea 
                    rows={2}
                    value={bookForm.description || ''}
                    onChange={e => setBookForm({...bookForm, description: e.target.value})}
                    placeholder="Mô tả ngắn gọn về cuốn sách..."
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-blue-500 select-auto resize-none"
                  ></textarea>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nội dung toàn bộ sách (Hiển thị khi đọc sách)</label>
                  <RichTextEditor value={bookForm.content`
);

fs.writeFileSync('src/pages/admin/AdminBooks.tsx', content);
