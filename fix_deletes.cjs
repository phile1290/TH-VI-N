const fs = require('fs');

// Fix AdminBooks
let adminBooks = fs.readFileSync('src/pages/admin/AdminBooks.tsx', 'utf8');
adminBooks = adminBooks.replace(
  /if \(window\.confirm\([\s\S]*?\)\) \{\n\s*deleteBook\(id\);\n\s*showToast\([\s\S]*?\);\n\s*\}/g,
  `deleteBook(id);\n    showToast(\`Đã xóa sách "\${title}".\`);`
);
fs.writeFileSync('src/pages/admin/AdminBooks.tsx', adminBooks);

// Fix AdminNews
let adminNews = fs.readFileSync('src/pages/admin/AdminNews.tsx', 'utf8');
adminNews = adminNews.replace(
  /if \(window\.confirm\([\s\S]*?\)\) \{\n\s*deleteArticle\(id\);\n\s*showToast\([\s\S]*?\);\n\s*\}/g,
  `deleteArticle(id);\n    showToast(\`Đã xóa bài viết "\${title}".\`);`
);
fs.writeFileSync('src/pages/admin/AdminNews.tsx', adminNews);

// Fix AdminLeaderboard
let adminLeaderboard = fs.readFileSync('src/pages/admin/AdminLeaderboard.tsx', 'utf8');
adminLeaderboard = adminLeaderboard.replace(
  /if \(window\.confirm\([\s\S]*?\)\) \{\n\s*deleteLeaderboardStudent\(id\);\n\s*\}/g,
  `deleteLeaderboardStudent(id);`
);
fs.writeFileSync('src/pages/admin/AdminLeaderboard.tsx', adminLeaderboard);
