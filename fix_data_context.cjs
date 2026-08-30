const fs = require('fs');
let content = fs.readFileSync('src/contexts/DataContext.tsx', 'utf8');

// Replace the useState lines
content = content.replace(
  /const \[books, setBooks\] = useState<Book\[\]>\(initialBooks\);/g,
  `const [books, setBooks] = useState<Book[]>(() => {
    const saved = localStorage.getItem('library_books');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return initialBooks;
  });`
);

content = content.replace(
  /const \[articles, setArticles\] = useState<Article\[\]>\(initialArticles\);/g,
  `const [articles, setArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem('library_articles');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return initialArticles;
  });`
);

// Add useEffects after setArticles
content = content.replace(
  /const \[articles, setArticles\].*?;\n/s,
  `$&
  useEffect(() => {
    localStorage.setItem('library_books', JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem('library_articles', JSON.stringify(articles));
  }, [articles]);
`
);

fs.writeFileSync('src/contexts/DataContext.tsx', content);
