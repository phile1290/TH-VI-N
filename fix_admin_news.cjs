const fs = require('fs');
let content = fs.readFileSync('src/pages/admin/AdminNews.tsx', 'utf8');

const titleDiv = `<div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tiêu đề *</label>
                  <input 
                    type="text" 
                    required
                    value={form.title || ''}
                    onChange={e => setForm({...form, title: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-blue-500 select-auto"
                  />
                </div>`;

const titleAndAuthor = `<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tác giả *</label>
                    <input 
                      type="text" 
                      required
                      value={form.author || ''}
                      onChange={e => setForm({...form, author: e.target.value})}
                      placeholder="VD: Cô Lan - Thủ thư"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-blue-500 select-auto"
                    />
                  </div>
                </div>`;

content = content.replace(titleDiv, titleAndAuthor);

fs.writeFileSync('src/pages/admin/AdminNews.tsx', content);
