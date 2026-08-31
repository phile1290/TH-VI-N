const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

const regex = /contents\.push\(\{\s*role:\s*'user',\s*parts:\s*\[\{\s*text:\s*message\s*\}\]\s*\}\);/;
const newPush = `const contextPrompt = context ? '\\n\\n[DỮ LIỆU TỦ SÁCH CỦA THƯ VIỆN ĐỂ CÚ MÈO THAM KHẢO]:\\n' + context : '';
      
      contents.push({ 
        role: 'user', 
        parts: [{ text: message + contextPrompt }]
      });`;

content = content.replace(regex, newPush);
fs.writeFileSync('server.ts', content);
