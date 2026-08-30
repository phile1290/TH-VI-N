const fs = require('fs');
let content = fs.readFileSync('src/pages/leaderboard/Leaderboard.tsx', 'utf8');

// Add imports
content = content.replace(
  "import { Trophy, Medal, BookOpen } from 'lucide-react';",
  "import { useState } from 'react';\nimport { Trophy, Medal, BookOpen, Search, UserX } from 'lucide-react';"
);

// Add state and filter logic
content = content.replace(
  "const { leaderboard } = useData();",
  `const { leaderboard } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredLeaderboard = leaderboard.filter(student => 
    student.studentName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    student.className.toLowerCase().includes(searchQuery.toLowerCase())
  );`
);

// Add search bar
const headerSection = `<p className="text-lg text-slate-500 font-medium">
          Vinh danh các bạn học sinh đọc nhiều sách nhất trong tháng này!
        </p>
      </div>`;

const searchBarHtml = `
      <div className="max-w-md mx-auto relative">
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Tìm tên học sinh hoặc lớp..." 
          className="w-full pl-12 pr-4 py-3 bg-white border-2 border-slate-200 shadow-sm rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all font-medium text-slate-700"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
      </div>`;

content = content.replace(headerSection, headerSection + "\n" + searchBarHtml);

// Replace mapping
content = content.replace(
  /\{leaderboard\.map\(\(student, index\) => \{/g,
  "{filteredLeaderboard.map((student, index) => {"
);

// Empty state
content = content.replace(
  /<\/div>\n      <\/div>\n    <\/div>\n  \);\n\}/,
  `        </div>
        
        {filteredLeaderboard.length === 0 && (
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <div className="bg-slate-100 p-4 rounded-full mb-4">
              <UserX className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-black text-slate-700 mb-2">Không tìm thấy học sinh nào!</h3>
            <p className="text-slate-500 font-medium">Thử tìm với tên hoặc lớp khác.</p>
          </div>
        )}
      </div>
    </div>
  );
}`
);

fs.writeFileSync('src/pages/leaderboard/Leaderboard.tsx', content);
