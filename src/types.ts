export interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  category: string;
  grade: number; // Lớp 1-5
  description: string;
  likes: number;
  isNew?: boolean;
  isPopular?: boolean;
  content?: string; // Bổ sung trường content cho tính năng Đọc sách
}

export interface StudentLeaderboard {
  id: string;
  studentName: string;
  className: string;
  booksReadCount: number;
  avatarUrl: string;
}

export interface Article {
  id: string;
  title: string;
  thumbnail: string;
  summary: string;
  content?: string;
  category?: string;
  readTime?: string;
  date: string;
  author: string;
}

export interface User {
  uid: string;
  displayName: string;
  photoURL?: string;
  role: 'student' | 'admin';
  booksRead: number;
}

