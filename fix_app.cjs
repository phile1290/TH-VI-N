const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  "import AdminNews from './pages/admin/AdminNews';",
  "import AdminNews from './pages/admin/AdminNews';\nimport AdminLeaderboard from './pages/admin/AdminLeaderboard';"
);

content = content.replace(
  /<Route path="news" element=\{<AdminNews \/>\} \/>/,
  `<Route path="news" element={<AdminNews />} />
              <Route path="leaderboard" element={<AdminLeaderboard />} />`
);

fs.writeFileSync('src/App.tsx', content);
