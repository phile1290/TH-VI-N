const fs = require('fs');

let content = fs.readFileSync('src/lib/mockData.ts', 'utf8');
content = content.replace("  }\n  {\n    id: 'sgk-1',", "  },\n  {\n    id: 'sgk-1',");
fs.writeFileSync('src/lib/mockData.ts', content);
