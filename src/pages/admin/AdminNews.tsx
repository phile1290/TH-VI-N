import { useState, FormEvent } from 'react';
import { FileText, Search, Plus, Edit3, Trash2, CheckCircle, X, Save } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import RichTextEditor from '../../components/ui/RichTextEditor';
import { Article } from '../../types';

export default function AdminNews() {
  const { articles, addArticle, updateArticle, deleteArticle } = useData();

  // Search & Filters
  const [articleSearch, setArticleSearch] = useState('');

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  // Notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Form State
  const [form, setForm] = useState<Partial<Article>>({
    title: '',
    author: 'Admin',
    category: 'Hoạt động Thư viện',
    thumbnail: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
    summary: '',
    content: '',
    readTime: '3 phút đọc',
    date: new Date().toLocaleDateString('vi-VN')
  });

  // Open Modal (New or Edit)
  const handleOpenModal = (article?: Article) => {
    if (article) {
      setEditingArticle(article);
      setForm(article);
    } else {
      setEditingArticle(null);
      setForm({
        title: '',
        author: 'Admin',
        category: 'Hoạt động Thư viện',
        thumbnail: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
        summary: '',
        content: '',
        readTime: '3 phút đọc',
        date: new Date().toLocaleDateString('vi-VN')
      });
    }
    setIsModalOpen(true);
  };

  // Save Article
  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.summary) {
      alert('Vui lòng nhập đầy đủ tiêu đề và tóm tắt!');
      return;
    }

    if (editingArticle) {
      updateArticle(editingArticle.id, form);
      showToast(`Đã cập nhật bài viết "${form.title}"!`);
    } else {
      const newArticle: Article = {
        id: `article-${Date.now()}`,
        title: form.title || 'Tin tức mới',
        author: form.author || 'Admin',
        category: form.category || 'Hoạt động Thư viện',
        thumbnail: form.thumbnail || 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
        summary: form.summary || '',
        content: form.content || form.summary || '',
        readTime: form.readTime || '3 phút đọc',
        date: new Date().toLocaleDateString('vi-VN')
      };
      addArticle(newArticle);
      showToast(`Đã đăng bài viết "${newArticle.title}"!`);
    }

    setIsModalOpen(false);
  };

  // Delete Article
  const handleDelete = (id: string, title: string) => {
    deleteArticle(id);
    showToast(`Đã xóa bài viết "${title}".`);
  };

  // Filtered articles
  const filteredArticles = articles.filter(art => 
    art.title.toLowerCase().includes(articleSearch.toLowerCase()) ||
    art.author.toLowerCase().includes(articleSearch.toLowerCase())
  );

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
            <span className="bg-amber-100 text-amber-600 p-2 rounded-2xl">
              <FileText className="w-7 h-7" />
            </span>
            Quản Lý Tin Tức
          </h1>
          <p className="text-slate-500 font-medium text-sm md:text-base mt-1">
            Quản lý các bài viết, thông báo và hoạt động thư viện
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Action Bar */}
        <div className="bg-white p-4 md:p-6 rounded-3xl border border-slate-100 shadow-xs flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          <div className="flex flex-1 flex-col sm:flex-row gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm tiêu đề hoặc tác giả..."
                value={articleSearch}
                onChange={(e) => setArticleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-sm rounded-xl shadow-md shadow-blue-500/20 transition-transform active:scale-95"
          >
            <Plus className="w-4 h-4" />
            Đăng Bài Mới
          </button>
        </div>

        {/* Articles List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredArticles.length === 0 ? (
            <div className="col-span-full py-12 text-center text-slate-400 font-medium bg-white rounded-3xl border border-slate-100">
              Không tìm thấy bài viết nào.
            </div>
          ) : (
            filteredArticles.map(article => (
              <div key={article.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-xs flex flex-col sm:flex-row gap-5 items-start group hover:border-slate-300 transition-colors">
                <div className="w-full sm:w-1/3 aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100">
                  <img src={article.thumbnail} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1.5">{article.category}</div>
                  <h4 className="font-black text-slate-800 text-lg leading-tight mb-2 line-clamp-2">{article.title}</h4>
                  <p className="text-slate-500 text-sm mb-4 line-clamp-2">{article.summary}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs font-bold text-slate-400">{article.date}</span>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleOpenModal(article)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(article.id, article.title)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-600" />
                {editingArticle ? 'Chỉnh Sửa Bài Viết' : 'Đăng Bài Mới'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
              <form id="articleForm" onSubmit={handleSave} className="space-y-5">
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
              </form>
            </div>
            
            <div className="p-6 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50/50">
              <button 
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 font-bold text-sm text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Hủy
              </button>
              <button 
                type="submit"
                form="articleForm"
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
