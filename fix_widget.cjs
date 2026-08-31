const fs = require('fs');
let content = fs.readFileSync('src/components/chatbot/FloatingChatWidget.tsx', 'utf8');

if (!content.includes('useData')) {
  content = content.replace("import { motion, AnimatePresence } from 'motion/react';", "import { motion, AnimatePresence } from 'motion/react';\nimport { useData } from '../../contexts/DataContext';");
}

if (!content.includes('const { books } = useData();')) {
  content = content.replace("export default function FloatingChatWidget() {", "export default function FloatingChatWidget() {\n  const { books } = useData();");
}

const oldBody = `body: JSON.stringify({ 
          message: userMessage,
          history: historyPayload
        }),`;
        
const newBody = `body: JSON.stringify({ 
          message: userMessage,
          history: historyPayload,
          context: books.map((b) => \`- \${b.title} (Tác giả: \${b.author}, Phân loại: \${b.category})\`).join('\\n')
        }),`;

content = content.replace(oldBody, newBody);

fs.writeFileSync('src/components/chatbot/FloatingChatWidget.tsx', content);
