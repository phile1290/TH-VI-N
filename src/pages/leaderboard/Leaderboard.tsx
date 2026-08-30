import { Trophy, Medal, BookOpen } from 'lucide-react';
import { mockLeaderboard } from '../../lib/mockData';

export default function Leaderboard() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-block p-4 bg-amber-100 text-amber-500 rounded-3xl rotate-3 mb-2">
          <Trophy className="w-16 h-16" />
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight">
          Bảng Vàng <span className="text-amber-500">Chăm Đọc</span>
        </h2>
        <p className="text-lg text-slate-500 font-medium">
          Vinh danh các bạn học sinh đọc nhiều sách nhất trong tháng này!
        </p>
      </div>

      {/* Leaderboard List */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-sm font-bold text-slate-400 px-8">
          <span>XẾP HẠNG</span>
          <span>SỐ SÁCH ĐÃ ĐỌC</span>
        </div>
        
        <div className="divide-y divide-slate-50">
          {mockLeaderboard.map((student, index) => {
            const isTop3 = index < 3;
            
            return (
              <div 
                key={student.id} 
                className={`flex items-center p-6 px-8 transition-colors hover:bg-slate-50 ${
                  index === 0 ? 'bg-amber-50/50' : ''
                }`}
              >
                {/* Rank Badge */}
                <div className="w-12 flex-shrink-0 flex justify-center">
                  {index === 0 ? <Medal className="w-8 h-8 text-amber-400 fill-amber-400" /> :
                   index === 1 ? <Medal className="w-8 h-8 text-slate-400 fill-slate-300" /> :
                   index === 2 ? <Medal className="w-8 h-8 text-amber-700 fill-amber-600/50" /> :
                   <span className="text-xl font-black text-slate-300">{index + 1}</span>}
                </div>

                {/* Student Info */}
                <div className="flex-1 flex items-center gap-4 ml-4">
                  <div className="relative">
                    <img 
                      src={student.avatarUrl} 
                      alt={student.studentName} 
                      className={`w-14 h-14 rounded-full border-2 ${
                        index === 0 ? 'border-amber-400 bg-amber-100' : 'border-slate-200 bg-slate-100'
                      }`}
                    />
                  </div>
                  <div>
                    <h3 className={`font-black text-lg ${isTop3 ? 'text-slate-800' : 'text-slate-700'}`}>
                      {student.studentName}
                    </h3>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 text-xs font-bold">
                      Lớp {student.className}
                    </span>
                  </div>
                </div>

                {/* Score */}
                <div className="flex items-center gap-2">
                  <span className={`text-2xl font-black ${isTop3 ? 'text-amber-500' : 'text-slate-600'}`}>
                    {student.booksReadCount}
                  </span>
                  <BookOpen className={`w-5 h-5 ${isTop3 ? 'text-amber-400' : 'text-slate-400'}`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

