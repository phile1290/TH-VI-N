const fs = require('fs');
let content = fs.readFileSync('src/pages/admin/AdminLayout.tsx', 'utf8');

content = content.replace(
  "import { BookCopy, FileText, LogOut, LayoutDashboard, Home, ShieldCheck, Sparkles } from 'lucide-react';",
  "import { BookCopy, FileText, LogOut, LayoutDashboard, Home, ShieldCheck, Sparkles, Trophy } from 'lucide-react';"
);

content = content.replace(
  /\{ path: '\/admin\/news', icon: <FileText className="w-5 h-5" \/>, label: 'Quản Lý Tin Tức' \},/,
  `{ path: '/admin/news', icon: <FileText className="w-5 h-5" />, label: 'Quản Lý Tin Tức' },
    { path: '/admin/leaderboard', icon: <Trophy className="w-5 h-5" />, label: 'Quản Lý Bảng Vàng' },`
);

fs.writeFileSync('src/pages/admin/AdminLayout.tsx', content);
