const fs = require('fs');

let content = fs.readFileSync('src/pages/admin/AdminNews.tsx', 'utf8');

// I'll just re-write the form part
const formRegex = /<form id="articleForm" onSubmit=\{handleSave\} className="space-y-5">[\s\S]*?<\/form>/g;
content = content.replace(formRegex, `<form id="articleForm" onSubmit={handleSave} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tiêu đề *</label>
                  <input 
                    type="text" 
                    required
                    value={form.title || ''}
                    onChange={e => setForm({...form, title: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-blue-500 select-auto"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Danh mục</label>
                    <select 
                      value={form.category || 'Hoạt động Thư viện'}
                      onChange={e => setForm({...form, category: e.target.value})}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-blue-500 select-auto"
                    >
                      <option value="Hoạt động Thư viện">Hoạt động Thư viện</option>
                      <option value="Phong trào thi đua">Phong trào thi đua</option>
                      <option value="Góc giới thiệu sách">Góc giới thiệu sách</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Link ảnh đại diện (URL)</label>
                    <input 
                      type="url" 
                      value={form.thumbnail || ''}
                      onChange={e => setForm({...form, thumbnail: e.target.value})}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-blue-500 select-auto"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tóm tắt ngắn *</label>
                  <textarea 
                    rows={2}
                    required
                    value={form.summary || ''}
                    onChange={e => setForm({...form, summary: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-blue-500 resize-none select-auto"
                  ></textarea>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nội dung bài viết</label>
                  <RichTextEditor 
                    value={form.content || ''} 
                    onChange={(val) => setForm({...form, content: val})} 
                    placeholder="Nhập hoặc dán nội dung (bao gồm hình ảnh) vào đây..." 
                  />
                </div>
              </form>`);

fs.writeFileSync('src/pages/admin/AdminNews.tsx', content);
