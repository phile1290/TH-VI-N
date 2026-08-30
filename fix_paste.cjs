const fs = require('fs');

const filesToFix = ['src/pages/admin/AdminBooks.tsx', 'src/pages/admin/AdminNews.tsx'];

filesToFix.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Replace onPaste if it exists from previous run
  content = content.replace(/ onPaste=\{e => \{ e\.stopPropagation\(\); \}\}/g, '');

  content = content.replace(/onChange=\{e => setBookForm\(\{\.\.\.bookForm, (.*?): e\.target\.value\}\)\}/g, 
    `onChange={e => setBookForm({...bookForm, $1: e.target.value})} onPaste={e => {
                      const text = e.clipboardData?.getData('text/plain');
                      if (text) {
                        e.preventDefault();
                        const target = e.target;
                        const start = target.selectionStart;
                        const end = target.selectionEnd;
                        const currentValue = bookForm.$1 || '';
                        const newValue = currentValue.substring(0, start) + text + currentValue.substring(end);
                        setBookForm({...bookForm, $1: newValue});
                        setTimeout(() => {
                          target.selectionStart = target.selectionEnd = start + text.length;
                        }, 0);
                      }
                    }}`);
                    
  content = content.replace(/onChange=\{e => setForm\(\{\.\.\.form, (.*?): e\.target\.value\}\)\}/g, 
    `onChange={e => setForm({...form, $1: e.target.value})} onPaste={e => {
                      const text = e.clipboardData?.getData('text/plain');
                      if (text) {
                        e.preventDefault();
                        const target = e.target;
                        const start = target.selectionStart;
                        const end = target.selectionEnd;
                        const currentValue = form.$1 || '';
                        const newValue = currentValue.substring(0, start) + text + currentValue.substring(end);
                        setForm({...form, $1: newValue});
                        setTimeout(() => {
                          target.selectionStart = target.selectionEnd = start + text.length;
                        }, 0);
                      }
                    }}`);

  fs.writeFileSync(file, content);
});
