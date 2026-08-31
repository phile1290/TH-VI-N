const fs = require('fs');

let content = fs.readFileSync('src/lib/mockData.ts', 'utf8');

const newMockBooks = `  {
    id: 'sgk-1',
    title: 'Tiếng Việt 3 - Tập 1',
    author: 'Bộ Giáo dục và Đào tạo',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80',
    category: 'Sách giáo khoa',
    grade: 3,
    description: 'Sách giáo khoa Tiếng Việt lớp 3, tập 1, theo chương trình giáo dục phổ thông mới.',
    likes: 85,
    isPopular: true,
    content: sampleContent
  },
  {
    id: 'sgv-1',
    title: 'Thiết kế bài giảng Toán 3',
    author: 'Nhiều tác giả',
    coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=400&q=80',
    category: 'Sách giáo viên',
    grade: 3,
    description: 'Sách hướng dẫn giáo viên giảng dạy môn Toán lớp 3.',
    likes: 42,
    content: sampleContent
  },
  {
    id: 'stk-1',
    title: 'Bồi dưỡng học sinh giỏi Toán 5',
    author: 'Nguyễn Áng',
    coverImage: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&w=400&q=80',
    category: 'Sách tham khảo',
    grade: 5,
    description: 'Sách tham khảo chuyên sâu bồi dưỡng năng lực học Toán cho học sinh lớp 5.',
    likes: 156,
    isNew: true,
    content: sampleContent
  }
];`;

content = content.replace("];\n\nexport const mockBooks", newMockBooks + "\n\nexport const mockBooks");

fs.writeFileSync('src/lib/mockData.ts', content);
console.log('Mock Data updated!');
