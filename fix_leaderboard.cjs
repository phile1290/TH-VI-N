const fs = require('fs');
let content = fs.readFileSync('src/pages/leaderboard/Leaderboard.tsx', 'utf8');

content = content.replace(
  "import { mockLeaderboard } from '../../lib/mockData';",
  "import { useData } from '../../contexts/DataContext';"
);

content = content.replace(
  "export default function Leaderboard() {",
  `export default function Leaderboard() {
  const { leaderboard } = useData();`
);

content = content.replace(
  /\{mockLeaderboard\.map\(\(student, index\) => \{/g,
  "{leaderboard.map((student, index) => {"
);

fs.writeFileSync('src/pages/leaderboard/Leaderboard.tsx', content);
