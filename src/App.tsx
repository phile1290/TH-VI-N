/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/home/Home';
import Books from './pages/books/Books';
import BookDetail from './pages/books/BookDetail';
import Leaderboard from './pages/leaderboard/Leaderboard';
import News from './pages/news/News';
import NewsDetail from './pages/news/NewsDetail';
import AdminLayout from './pages/admin/AdminLayout';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import AdminBooks from './pages/admin/AdminBooks';
import AdminOverview from './pages/admin/AdminOverview';
import AdminNews from './pages/admin/AdminNews';
import AdminLeaderboard from './pages/admin/AdminLeaderboard';

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="books" element={<Books />} />
              <Route path="books/:id" element={<BookDetail />} />
              <Route path="news" element={<News />} />
              <Route path="news/:id" element={<NewsDetail />} />
              <Route path="leaderboard" element={<Leaderboard />} />
            </Route>
            
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminOverview />} />
              <Route path="books" element={<AdminBooks />} />
              <Route path="news" element={<AdminNews />} />
              <Route path="leaderboard" element={<AdminLeaderboard />} />
            </Route>
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}
