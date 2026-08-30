const fs = require('fs');
let content = fs.readFileSync('src/pages/admin/AdminBooks.tsx', 'utf8');

const formRegex = /<form id="bookForm" onSubmit=\{handleSave\} className="space-y-5">[\s\S]*?<\/form>/g;
content = content.replace(formRegex, `<form id="bookForm" onSubmit={handleSave} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tên sách *</label>
                  <input 
                    type="text" 
                    required
                    value={bookForm.title || ''}
                    onChange={e => setBookForm({...bookForm, title: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-blue-500 select-auto"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tác giả *</label>
                    <input 
                      type="text" 
                      required
                      value={bookForm.author || ''}
                      onChange={e => setBookForm({...bookForm, author: e.target.value})}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-blue-500 select-auto"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Link ảnh bìa sách (URL)</label>
                    <input 
                      type="url" 
                      value={bookForm.coverImage || ''}
                      onChange={e => setBookForm({...bookForm, coverImage: e.target.value})}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-blue-500 select-auto"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Thể loại</label>
                    <select 
                      value={bookForm.category || 'Truyện thiếu nhi'}
                      onChange={e => setBookForm({...bookForm, category: e.target.value})}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-blue-500 select-auto"
                    >
                      <option value="Truyện thiếu nhi">Truyện thiếu nhi</option>
                      <option value="Truyện cổ tích">Truyện cổ tích</option>
                      <option value="Khám phá khoa học">Khám phá khoa học</option>
                      <option value="Kỹ năng sống">Kỹ năng sống</option>
                      <option value="Lịch sử">Lịch sử</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Khối lớp phù hợp</label>
                    <select 
                      value={bookForm.ageGroup || 'Lớp 3'}
                      onChange={e => setBookForm({...bookForm, ageGroup: e.target.value})}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-blue-500 select-auto"
                    >
                      <option value="Mầm non">Mầm non</option>
                      <option value="Lớp 1">Lớp 1</option>
                      <option value="Lớp 2">Lớp 2</option>
                      <option value="Lớp 3">Lớp 3</option>
                      <option value="Lớp 4">Lớp 4</option>
                      <option value="Lớp 5">Lớp 5</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Hiển thị sách ở</label>
                  <select 
                    value={bookForm.isNew ? 'new' : bookForm.isPopular ? 'popular' : 'all'}
                    onChange={e => {
                      const val = e.target.value;
                      setBookForm({
                        ...bookForm, 
                        isNew: val === 'new',
                        isPopular: val === 'popular'
                      });
                    }}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-blue-500 select-auto"
                  >
                    <option value="new">Sách Mới (Giáo viên chọn)</option>
                    <option value="popular">Sách Yêu Thích</option>
                    <option value="all">Chỉ trong Tủ Sách</option>
                  </select>
                </div>

                <div className="space-y-1.5">
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
                  <RichTextEditor 
                    value={bookForm.content || ''} 
                    onChange={(val) => setBookForm({...bookForm, content: val})} 
                    placeholder="Nhập hoặc dán toàn bộ nội dung (bao gồm hình ảnh) cuốn sách vào đây..." 
                  />
                </div>
              </form>`);

fs.writeFileSync('src/pages/admin/AdminBooks.tsx', content);
