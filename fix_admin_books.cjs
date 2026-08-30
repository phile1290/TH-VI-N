const fs = require('fs');
let content = fs.readFileSync('src/pages/admin/AdminBooks.tsx', 'utf8');

// Remove bookCategory state
content = content.replace("const [bookCategory, setBookCategory] = useState('all');", "");

// Replace the Category Filter dropdown
const filterHtmlRegex = /\{\/\* Category Filter \*\/\}[^]+?<\/select>/;
content = content.replace(filterHtmlRegex, "");

// Remove the filter logic
const matchesCategoryRegex = /const matchesCategory = bookCategory === 'all' \|\| book\.category === bookCategory;\n\s*/;
content = content.replace(matchesCategoryRegex, "");

const returnMatchesRegex = /return matchesCategory && matchesSearch;/;
content = content.replace(returnMatchesRegex, "return matchesSearch;");

fs.writeFileSync('src/pages/admin/AdminBooks.tsx', content);
