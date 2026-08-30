import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Book, Article } from '../types';
import { mockBooks as initialBooks, mockArticles as initialArticles } from '../lib/mockData';

interface DataContextType {
  books: Book[];
  articles: Article[];
  likeBook: (id: string) => void;
  addBook: (book: Book) => void;
  updateBook: (id: string, updatedBook: Partial<Book>) => void;
  deleteBook: (id: string) => void;
  addArticle: (article: Article) => void;
  updateArticle: (id: string, updatedArticle: Partial<Article>) => void;
  deleteArticle: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [books, setBooks] = useState<Book[]>(() => {
    const saved = localStorage.getItem('library_books');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return initialBooks;
  });
  const [articles, setArticles] = useState<Article[]>(() => {
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
  }, [articles]);

  const likeBook = (id: string) => {
    setBooks(prev => prev.map(book => {
      if (book.id === id) {
        return { ...book, likes: book.likes + 1 };
      }
      return book;
    }));
  };

  const addBook = (book: Book) => {
    setBooks(prev => [book, ...prev]);
  };

  const updateBook = (id: string, updatedBook: Partial<Book>) => {
    setBooks(prev => prev.map(book => 
      book.id === id ? { ...book, ...updatedBook } : book
    ));
  };

  const deleteBook = (id: string) => {
    setBooks(prev => prev.filter(book => book.id !== id));
  };

  const addArticle = (article: Article) => {
    setArticles(prev => [article, ...prev]);
  };

  const updateArticle = (id: string, updatedArticle: Partial<Article>) => {
    setArticles(prev => prev.map(article => 
      article.id === id ? { ...article, ...updatedArticle } : article
    ));
  };

  const deleteArticle = (id: string) => {
    setArticles(prev => prev.filter(article => article.id !== id));
  };

  return (
    <DataContext.Provider value={{ books, articles, likeBook, addBook, updateBook, deleteBook, addArticle, updateArticle, deleteArticle }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
