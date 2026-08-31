const fs = require('fs');

// 1. Update Books.tsx
let booksCode = fs.readFileSync('src/pages/books/Books.tsx', 'utf8');
const oldTabs = `const tabs = [
    { id: 'all', label: 'Tất cả' },
    { id: 'Truyện thiếu nhi', label: 'Thiếu nhi' },
    { id: 'Truyện cổ tích', label: 'Cổ tích' },
    { id: 'Khám phá khoa học', label: 'Khoa học' },
    { id: 'Kỹ năng sống', label: 'Kỹ năng' },
    { id: 'Lịch sử', label: 'Lịch sử' },
  ];`;
  
const newTabs = `const tabs = [
    { id: 'all', label: 'Tất cả' },
    { id: 'Truyện thiếu nhi', label: 'Thiếu nhi' },
    { id: 'Truyện cổ tích', label: 'Cổ tích' },
    { id: 'Khám phá khoa học', label: 'Khoa học' },
    { id: 'Kỹ năng sống', label: 'Kỹ năng' },
    { id: 'Lịch sử', label: 'Lịch sử' },
    { id: 'Sách giáo khoa', label: 'Giáo khoa' },
    { id: 'Sách giáo viên', label: 'Giáo viên' },
    { id: 'Sách tham khảo', label: 'Tham khảo' },
  ];`;
  
booksCode = booksCode.replace(oldTabs, newTabs);
fs.writeFileSync('src/pages/books/Books.tsx', booksCode);

// 2. Update AdminBooks.tsx
let adminBooksCode = fs.readFileSync('src/pages/admin/AdminBooks.tsx', 'utf8');
const oldOptions = `<option value="Lịch sử">Lịch sử</option>
                    </select>`;
const newOptions = `<option value="Lịch sử">Lịch sử</option>
                      <option value="Sách giáo khoa">Sách giáo khoa</option>
                      <option value="Sách giáo viên">Sách giáo viên</option>
                      <option value="Sách tham khảo">Sách tham khảo</option>
                    </select>`;
                    
adminBooksCode = adminBooksCode.replace(oldOptions, newOptions);
fs.writeFileSync('src/pages/admin/AdminBooks.tsx', adminBooksCode);

console.log('Categories updated!');
