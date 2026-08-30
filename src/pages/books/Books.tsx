import { useState } from 'react';
import { Search, Filter, BookX } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import BookCard from '../../components/ui/BookCard';

export default function Books() {
  // Quản lý trạng thái từ khóa tìm kiếm và danh mục đang chọn
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const tabs = [
    { id: 'all', label: 'Tất cả' },
    { id: 'Truyện thiếu nhi', label: 'Thiếu nhi' },
    { id: 'Truyện cổ tích', label: 'Cổ tích' },
    { id: 'Khám phá khoa học', label: 'Khoa học' },
    { id: 'Kỹ năng sống', label: 'Kỹ năng' },
    { id: 'Lịch sử', label: 'Lịch sử' },
  ];

  // Hàm filter dữ liệu theo cả Category và Search Query
  const { books } = useData();
  const filteredBooks = books.filter(book => {
    const matchesCategory = activeTab === 'all' || book.category === activeTab;
    const matchesSearch = 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header & Search */}
      <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h2 className="text-3xl font-black text-slate-800 mb-2">Tủ Sách Mỹ An</h2>
            <p className="text-slate-500 font-medium">Cùng tìm những cuốn sách thú vị nhé!</p>
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm tên sách, tác giả..." 
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all font-medium text-slate-700"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            </div>
            <button className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl transition-colors shrink-0">
              <Filter className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Categories / Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-200">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full font-bold text-sm transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Books Grid */}
      {filteredBooks.length > 0 ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredBooks.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        /* Thông báo khi không tìm thấy sách */
        <div className="bg-white rounded-[2rem] p-12 shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
          <div className="bg-slate-100 p-4 rounded-full mb-4">
            <BookX className="w-12 h-12 text-slate-400" />
          </div>
          <h3 className="text-xl font-black text-slate-700 mb-2">Rất tiếc, thư viện chưa có cuốn sách này!</h3>
          <p className="text-slate-500 font-medium">Bạn hãy thử tìm với từ khóa khác hoặc chọn thể loại khác nhé.</p>
        </div>
      )}
    </div>
  );
}

