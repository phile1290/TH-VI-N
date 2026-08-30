const fs = require('fs');
let content = fs.readFileSync('src/contexts/DataContext.tsx', 'utf8');

content = content.replace(
  "import { Book, Article } from '../types';",
  "import { Book, Article, StudentLeaderboard } from '../types';"
);

content = content.replace(
  "import { mockBooks as initialBooks, mockArticles as initialArticles } from '../lib/mockData';",
  "import { mockBooks as initialBooks, mockArticles as initialArticles, mockLeaderboard as initialLeaderboard } from '../lib/mockData';"
);

const contextTypeReplaceRegex = /interface DataContextType \{[\s\S]*?deleteArticle: \(id: string\) => void;\n\}/;
content = content.replace(contextTypeReplaceRegex, `interface DataContextType {
  books: Book[];
  articles: Article[];
  leaderboard: StudentLeaderboard[];
  likeBook: (id: string) => void;
  addBook: (book: Book) => void;
  updateBook: (id: string, updatedBook: Partial<Book>) => void;
  deleteBook: (id: string) => void;
  addArticle: (article: Article) => void;
  updateArticle: (id: string, updatedArticle: Partial<Article>) => void;
  deleteArticle: (id: string) => void;
  addLeaderboardStudent: (student: StudentLeaderboard) => void;
  updateLeaderboardStudent: (id: string, updatedStudent: Partial<StudentLeaderboard>) => void;
  deleteLeaderboardStudent: (id: string) => void;
}`);

const dataProviderStart = "export const DataProvider = ({ children }: { children: ReactNode }) => {";
const leaderboardState = `  const [leaderboard, setLeaderboard] = useState<StudentLeaderboard[]>(() => {
    const saved = localStorage.getItem('library_leaderboard');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return initialLeaderboard;
  });`;

content = content.replace(dataProviderStart, dataProviderStart + "\n" + leaderboardState);

const useEffectsRegex = /useEffect\(\(\) => \{\n\s*localStorage\.setItem\('library_articles', JSON\.stringify\(articles\)\);\n\s*\}, \[articles\]\);/;
content = content.replace(useEffectsRegex, `useEffect(() => {
    localStorage.setItem('library_articles', JSON.stringify(articles));
  }, [articles]);
  
  useEffect(() => {
    localStorage.setItem('library_leaderboard', JSON.stringify(leaderboard));
  }, [leaderboard]);`);

const functionsRegex = /const deleteArticle = \(id: string\) => \{\n\s*setArticles\(prev => prev\.filter\(article => article\.id !== id\)\);\n\s*\};/;
content = content.replace(functionsRegex, `const deleteArticle = (id: string) => {
    setArticles(prev => prev.filter(article => article.id !== id));
  };
  
  const addLeaderboardStudent = (student: StudentLeaderboard) => {
    setLeaderboard(prev => [...prev, student].sort((a, b) => b.booksReadCount - a.booksReadCount));
  };
  
  const updateLeaderboardStudent = (id: string, updatedStudent: Partial<StudentLeaderboard>) => {
    setLeaderboard(prev => prev.map(student => 
      student.id === id ? { ...student, ...updatedStudent } : student
    ).sort((a, b) => b.booksReadCount - a.booksReadCount));
  };
  
  const deleteLeaderboardStudent = (id: string) => {
    setLeaderboard(prev => prev.filter(student => student.id !== id));
  };`);

const providerReturnRegex = /<DataContext\.Provider value=\{\{ books, articles, likeBook, addBook, updateBook, deleteBook, addArticle, updateArticle, deleteArticle \}\}>/;
content = content.replace(providerReturnRegex, `<DataContext.Provider value={{ books, articles, leaderboard, likeBook, addBook, updateBook, deleteBook, addArticle, updateArticle, deleteArticle, addLeaderboardStudent, updateLeaderboardStudent, deleteLeaderboardStudent }}>`);

fs.writeFileSync('src/contexts/DataContext.tsx', content);
