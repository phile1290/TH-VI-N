import React, { useState } from 'react';
import { Trophy, Search, Plus, Edit3, Trash2, CheckCircle, X, Save } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { StudentLeaderboard } from '../../types';

export default function AdminLeaderboard() {
  const { leaderboard, addLeaderboardStudent, updateLeaderboardStudent, deleteLeaderboardStudent } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<StudentLeaderboard>>({});

  const filteredLeaderboard = leaderboard.filter(student => 
    student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.className.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => b.booksReadCount - a.booksReadCount);

  const openAddModal = () => {
    setEditingId(null);
    setForm({
      studentName: '',
      className: '',
      booksReadCount: 0,
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + Math.random(),
    });
    setIsModalOpen(true);
  };

  const openEditModal = (student: StudentLeaderboard) => {
    setEditingId(student.id);
    setForm(student);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateLeaderboardStudent(editingId, form as StudentLeaderboard);
    } else {
      addLeaderboardStudent({
        ...form,
        id: 'student_' + Date.now().toString(),
      } as StudentLeaderboard);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    deleteLeaderboardStudent(id);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-500" /> Quản Lý Bảng Vàng
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">Thêm, sửa, xóa học sinh trên Bảng Vàng</p>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" /> Thêm Học Sinh
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Tìm kiếm học sinh hoặc lớp..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-bold border-b border-slate-100">Học Sinh</th>
                <th className="p-4 font-bold border-b border-slate-100 text-center">Lớp</th>
                <th className="p-4 font-bold border-b border-slate-100 text-center">Số Sách Đã Đọc</th>
                <th className="p-4 font-bold border-b border-slate-100 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeaderboard.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={student.avatarUrl} alt="" className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200" />
                      <div>
                        <div className="font-bold text-slate-800">{student.studentName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 text-xs font-bold">
                      {student.className}
                    </span>
                  </td>
                  <td className="p-4 text-center font-bold text-amber-600">
                    {student.booksReadCount}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => openEditModal(student)}
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Chỉnh sửa"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(student.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Xóa"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredLeaderboard.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-500">
                    Không tìm thấy học sinh nào phù hợp.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-black text-slate-800 text-lg flex items-center gap-2">
                <Trophy className="w-5 h-5 text-blue-600" /> 
                {editingId ? 'Chỉnh Sửa Thông Tin' : 'Thêm Học Sinh Mới'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <form id="leaderboardForm" onSubmit={handleSave} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Họ và Tên *</label>
                  <input 
                    type="text" 
                    required
                    value={form.studentName || ''}
                    onChange={e => setForm({...form, studentName: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-blue-500"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Lớp *</label>
                    <input 
                      type="text" 
                      required
                      value={form.className || ''}
                      onChange={e => setForm({...form, className: e.target.value})}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Số Sách *</label>
                    <input 
                      type="number" 
                      required
                      min="0"
                      value={form.booksReadCount || 0}
                      onChange={e => setForm({...form, booksReadCount: Number(e.target.value)})}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Link Avatar (Tuỳ chọn)</label>
                  <input 
                    type="url" 
                    value={form.avatarUrl || ''}
                    onChange={e => setForm({...form, avatarUrl: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-blue-500"
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
                form="leaderboardForm"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-colors flex items-center gap-2 shadow-sm"
              >
                <Save className="w-4 h-4" /> Lưu Thay Đổi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
