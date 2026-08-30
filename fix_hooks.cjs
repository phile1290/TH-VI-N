const fs = require('fs');
let content = fs.readFileSync('src/contexts/DataContext.tsx', 'utf8');

// I will extract the parts and rebuild it correctly
content = content.replace(
  /const \[articles, setArticles\] = useState<Article\[\]>\(\(\) => \{[\s\S]*?return initialArticles;\s*\}\);/,
  `const [articles, setArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem('library_articles');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return initialArticles;
  });

  useEffect(() => {
    localStorage.setItem('library_books', JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem('library_articles', JSON.stringify(articles));
  }, [articles]);`
);

fs.writeFileSync('src/contexts/DataContext.tsx', content);
