import { useState, FormEvent } from 'react';
import { BookCopy, Search, Plus, Edit3, Trash2, CheckCircle, X, Save, Eye, Layers } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import RichTextEditor from '../../components/ui/RichTextEditor';
import { Book } from '../../types';

export default function AdminBooks() {
  const { books, addBook, updateBook, deleteBook } = useData();

  // Search & Filters
  const [bookSearch, setBookSearch] = useState('');
  const [bookCategory, setBookCategory] = useState('all');

  // Modals
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Form State for Book
  const [bookForm, setBookForm] = useState<Partial<Book>>({
    title: '',
    author: '',
    category: 'Truyện thiếu nhi',
    grade: 3,
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    description: '',
    content: '',
    likes: 0,
    isNew: false,
    isPopular: false
  });

  const [bookBadge, setBookBadge] = useState<'none' | 'new' | 'popular'>('none');

  // Open Book Modal (New or Edit)
  const handleOpenBookModal = (book?: Book) => {
    if (book) {
      setEditingBook(book);
      setBookForm(book);
      if (book.isNew) setBookBadge('new');
      else if (book.isPopular) setBookBadge('popular');
      else setBookBadge('none');
    } else {
      setEditingBook(null);
      setBookForm({
        title: '',
        author: '',
        category: 'Truyện thiếu nhi',
        grade: 3,
        coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
        description: '',
        content: '',
        likes: 0,
        isNew: false,
        isPopular: false
      });
      setBookBadge('none');
    }
    setIsBookModalOpen(true);
  };

  // Save Book
  const handleSaveBook = (e: FormEvent) => {
    e.preventDefault();
    if (!bookForm.title || !bookForm.author) {
      alert('Vui lòng nhập đầy đủ tên sách và tác giả!');
      return;
    }

    const bookToSave = {
      ...bookForm,
      isNew: bookBadge === 'new',
      isPopular: bookBadge === 'popular',
    };

    if (editingBook) {
      updateBook(editingBook.id, bookToSave);
      showToast(`Đã cập nhật sách "${bookForm.title}" thành công!`);
    } else {
      const newBook: Book = {
        id: `book-${Date.now()}`,
        title: bookToSave.title || 'Sách mới',
        author: bookToSave.author || 'Tác giả',
        category: bookToSave.category || 'Truyện thiếu nhi',
        grade: Number(bookToSave.grade) || 3,
        coverImage: bookToSave.coverImage || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
        description: bookToSave.description || 'Giới thiệu nội dung sách...',
        content: bookToSave.content || 'Nội dung sách...',
        likes: 0,
        isNew: bookToSave.isNew,
        isPopular: bookToSave.isPopular
      };
      addBook(newBook);
      showToast(`Đã thêm sách "${newBook.title}" vào thư viện!`);
    }

    setIsBookModalOpen(false);
  };

  // Delete Book
  const handleDeleteBook = (id: string, title: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa cuốn sách "${title}" khỏi hệ thống?`)) {
      deleteBook(id);
      showToast(`Đã xóa sách "${title}".`);
    }
  };

  // Filtered books
  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(bookSearch.toLowerCase()) || 
                          book.author.toLowerCase().includes(bookSearch.toLowerCase());
    const matchesCategory = bookCategory === 'all' || book.category === bookCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <span className="font-bold text-sm">{toastMessage}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-xs">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-800 flex items-center gap-3">
            <span className="bg-blue-100 text-blue-600 p-2 rounded-2xl">
              <BookCopy className="w-7 h-7" />
            </span>
            Quản Lý Sách
          </h1>
          <p className="text-slate-500 font-medium text-sm md:text-base mt-1">
            Thêm, sửa, xóa danh mục đầu sách trong thư viện
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Action Bar */}
        <div className="bg-white p-4 md:p-6 rounded-3xl border border-slate-100 shadow-xs flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          <div className="flex flex-1 flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm theo tên sách hoặc tác giả..."
                value={bookSearch}
                onChange={(e) => setBookSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-blue-500 select-auto"
              />
            </div>

            {/* Category Filter */}
            <select
              value={bookCategory}
              onChange={(e) => setBookCategory(e.target.value)}
              className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:border-blue-500 select-auto"
            >
              <option value="all">Tất cả thể loại</option>
              <option value="Truyện thiếu nhi">Truyện thiếu nhi</option>
              <option value="Truyện cổ tích">Truyện cổ tích</option>
              <option value="Khám phá khoa học">Khám phá khoa học</option>
              <option value="Kỹ năng sống">Kỹ năng sống</option>
              <option value="Lịch sử">Lịch sử</option>
            </select>
          </div>

          {/* Add Book Button */}
          <button
            onClick={() => handleOpenBookModal()}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-sm rounded-xl shadow-md shadow-blue-500/20 transition-transform active:scale-95"
          >
            <Plus className="w-4 h-4" />
            Thêm Sách Mới
          </button>
        </div>

        {/* Books Table */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-100 text-slate-400 text-xs font-black uppercase tracking-wider">
                  <th className="py-4 px-6">Bìa sách</th>
                  <th className="py-4 px-6">Tên sách & Tác giả</th>
                  <th className="py-4 px-6">Thể loại</th>
                  <th className="py-4 px-6">Khối lớp</th>
                  <th className="py-4 px-6">Lượt thích</th>
                  <th className="py-4 px-6 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredBooks.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400 font-medium">
                      Không tìm thấy cuốn sách nào phù hợp.
                    </td>
                  </tr>
                ) : (
                  filteredBooks.map((book) => (
                    <tr key={book.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-4 px-6">
                        <div className="w-12 h-16 rounded-lg overflow-hidden bg-slate-100 shadow-xs">
                          <img
                            src={book.coverImage}
                            alt={book.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=200&q=80';
                            }}
                          />
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-black text-slate-800 leading-snug">
                          {book.title}
                          {book.isNew && <span className="ml-2 inline-block px-2 py-0.5 bg-rose-100 text-rose-600 text-[10px] uppercase font-black rounded">Mới</span>}
                          {book.isPopular && <span className="ml-2 inline-block px-2 py-0.5 bg-amber-100 text-amber-600 text-[10px] uppercase font-black rounded">Yêu thích</span>}
                        </div>
                        <div className="text-xs text-slate-500 font-medium mt-0.5">{book.author}</div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 font-bold text-xs rounded-full">
                          {book.category}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-bold text-slate-700">Lớp {book.grade}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1.5 font-bold text-rose-600">
                          {book.likes} <span className="text-rose-500">❤️</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleOpenBookModal(book)}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Chỉnh sửa"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteBook(book.id, book.title)}
                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Xóa sách"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Book Form Modal */}
      {isBookModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsBookModalOpen(false)}></div>
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                <BookCopy className="w-5 h-5 text-blue-600" />
                {editingBook ? 'Chỉnh Sửa Thông Tin Sách' : 'Thêm Sách Mới'}
              </h3>
              <button 
                onClick={() => setIsBookModalOpen(false)}
                className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
              <form id="bookForm" onSubmit={handleSaveBook} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tên sách *</label>
                    <input 
                      type="text" 
                      required
                      value={bookForm.title || ''}
                      onChange={e => setBookForm({...bookForm, title: e.target.value})} onPaste={e => {
                      const text = e.clipboardData?.getData('text/plain');
                      if (text) {
                        e.preventDefault();
                        const target = e.target;
                        const start = target.selectionStart;
                        const end = target.selectionEnd;
                        const currentValue = bookForm.title || '';
                        const newValue = currentValue.substring(0, start) + text + currentValue.substring(end);
                        setBookForm({...bookForm, title: newValue});
                        setTimeout(() => {
                          target.selectionStart = target.selectionEnd = start + text.length;
                        }, 0);
                      }
                    }}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-blue-500 select-auto"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tác giả *</label>
                    <input 
                      type="text" 
                      required
                      value={bookForm.author || ''}
                      onChange={e => setBookForm({...bookForm, author: e.target.value})} onPaste={e => {
                      const text = e.clipboardData?.getData('text/plain');
                      if (text) {
                        e.preventDefault();
                        const target = e.target;
                        const start = target.selectionStart;
                        const end = target.selectionEnd;
                        const currentValue = bookForm.author || '';
                        const newValue = currentValue.substring(0, start) + text + currentValue.substring(end);
                        setBookForm({...bookForm, author: newValue});
                        setTimeout(() => {
                          target.selectionStart = target.selectionEnd = start + text.length;
                        }, 0);
                      }
                    }}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-blue-500 select-auto"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Thể loại</label>
                    <select 
                      value={bookForm.category}
                      onChange={e => setBookForm({...bookForm, category: e.target.value})} onPaste={e => {
                      const text = e.clipboardData?.getData('text/plain');
                      if (text) {
                        e.preventDefault();
                        const target = e.target;
                        const start = target.selectionStart;
                        const end = target.selectionEnd;
                        const currentValue = bookForm.category || '';
                        const newValue = currentValue.substring(0, start) + text + currentValue.substring(end);
                        setBookForm({...bookForm, category: newValue});
                        setTimeout(() => {
                          target.selectionStart = target.selectionEnd = start + text.length;
                        }, 0);
                      }
                    }}
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
                      value={bookForm.grade}
                      onChange={e => setBookForm({...bookForm, grade: Number(e.target.value)})}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-blue-500 select-auto"
                    >
                      {[1,2,3,4,5].map(g => (
                        <option key={g} value={g}>Lớp {g}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Hiển thị sách ở</label>
                    <select 
                      value={bookBadge}
                      onChange={e => setBookBadge(e.target.value as any)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-blue-500 select-auto"
                    >
                      <option value="none">Tủ sách chung</option>
                      <option value="new">Sách Mới (Giáo viên chọn)</option>
                      <option value="popular">Sách Yêu Thích (Giáo viên chọn)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Link Ảnh bìa sách (URL)</label>
                  <input 
                    type="url" 
                    value={bookForm.coverImage || ''}
                    onChange={e => setBookForm({...bookForm, coverImage: e.target.value})} onPaste={e => {
                      const text = e.clipboardData?.getData('text/plain');
                      if (text) {
                        e.preventDefault();
                        const target = e.target;
                        const start = target.selectionStart;
                        const end = target.selectionEnd;
                        const currentValue = bookForm.coverImage || '';
                        const newValue = currentValue.substring(0, start) + text + currentValue.substring(end);
                        setBookForm({...bookForm, coverImage: newValue});
                        setTimeout(() => {
                          target.selectionStart = target.selectionEnd = start + text.length;
                        }, 0);
                      }
                    }}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-blue-500 select-auto"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tóm tắt ngắn</label>
                  <RichTextEditor value={bookForm.content || ''} onChange={(val) => setBookForm({...bookForm, content: val})} placeholder="Nhập hoặc dán toàn bộ nội dung (bao gồm hình ảnh) cuốn sách vào đây..." />
                </div>
              </form>
            </div>
            
            <div className="p-6 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50/50">
              <button 
                type="button"
                onClick={() => setIsBookModalOpen(false)}
                className="px-5 py-2.5 font-bold text-sm text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Hủy
              </button>
              <button 
                type="submit"
                form="bookForm"
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-sm rounded-xl shadow-md shadow-blue-500/20 transition-transform active:scale-95"
              >
                <Save className="w-4 h-4" />
                Lưu Thay Đổi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
