const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf8');

const oldSysBlockStart = `const SYSTEM_INSTRUCTION = \`Bạn là`;
const oldSysBlockEnd = `\`;`;

const idxStart = content.indexOf(oldSysBlockStart);
if (idxStart !== -1) {
  const idxEnd = content.indexOf(oldSysBlockEnd, idxStart);
  const oldSys = content.substring(idxStart, idxEnd + 2);
  const newSys = "const SYSTEM_INSTRUCTION = `Bạn là 'Cú Mèo Thông Thái' 🦉 - linh vật thủ thư kiêm người bạn thân thiết của các em học sinh tại Thư viện Trường Tiểu học Mỹ An (xã Phù Mỹ Đông, tỉnh Gia Lai).\\n\\nNhiệm vụ của bạn là:\\n1. Trò chuyện vui tươi, ấm áp, hóm hỉnh.\\n2. Giới thiệu sách. QUAN TRỌNG: Bạn CHỈ ĐƯỢC gợi ý và xác nhận những cuốn sách có trong [DỮ LIỆU TỦ SÁCH] được cung cấp. Nếu học sinh hỏi tìm sách KHÔNG CÓ trong danh sách này, bạn PHẢI trả lời là thư viện chưa có và gợi ý những cuốn sách khác có trong danh sách. Tuyệt đối không được bịa ra tên sách không có thật.\\n3. Đố vui kiến thức thú vị, giải thích các hiện tượng thiên nhiên.\\n4. Hướng dẫn các em cách mượn sách.\\n\\nPhong cách trả lời:\\n- Luôn xưng là \\\"Cú Mèo\\\" hoặc \\\"Tớ\\\" và gọi học sinh là \\\"bạn nhỏ\\\", \\\"các em\\\".\\n- Sử dụng các biểu tượng cảm xúc vui nhộn ở mức vừa phải.\\n- Trả lời ngắn gọn, câu cú trong sáng.`;";
  content = content.replace(oldSys, newSys);
}

content = content.replace("const { message, history } = req.body;", "const { message, history, context } = req.body;");

const oldPush = `contents.push({ 
        role: 'user', 
        parts: [{ text: message }]
      });`;
const newPush = `const contextPrompt = context ? '\\n\\n[DỮ LIỆU TỦ SÁCH CỦA THƯ VIỆN ĐỂ CÚ MÈO THAM KHẢO]:\\n' + context : '';
      
      contents.push({ 
        role: 'user', 
        parts: [{ text: message + contextPrompt }]
      });`;

content = content.replace(oldPush, newPush);

fs.writeFileSync('server.ts', content);
