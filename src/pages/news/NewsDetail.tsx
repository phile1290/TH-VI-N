import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, Calendar, User, Clock, Share2, Heart, BookOpen, Check, Newspaper, ChevronRight } from 'lucide-react';
import { mockArticles } from '../../lib/mockData';

export default function NewsDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  const article = mockArticles.find((a) => a.id === id);

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto py-16 px-4 text-center">
        <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Newspaper className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-black text-slate-800 mb-3">Không tìm thấy bài viết!</h2>
        <p className="text-slate-500 font-medium mb-8">
          Bài viết bạn đang tìm có thể đã được gỡ bỏ hoặc đường dẫn không chính xác.
        </p>
        <button
          onClick={() => navigate('/news')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
        >
          <ArrowLeft className="w-4 h-4" /> Quay lại trang Tin Tức
        </button>
      </div>
    );
  }

  const relatedArticles = mockArticles.filter((a) => a.id !== article.id).slice(0, 2);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <article className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/news')}
          className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 font-bold text-sm bg-white px-4 py-2 rounded-xl border border-slate-200 hover:border-blue-300 transition-all shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          Về danh sách Tin Tức
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              isLiked
                ? 'bg-rose-50 text-rose-600 border border-rose-200'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-rose-50 hover:text-rose-500'
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500' : ''}`} />
            {isLiked ? 'Đã thích' : 'Yêu thích'}
          </button>
          
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-4 py-2 bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 rounded-xl text-sm font-bold transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            {copied ? 'Đã sao chép link' : 'Chia sẻ'}
          </button>
        </div>
      </div>

      {/* Article Header Card */}
      <header className="bg-white rounded-3xl p-6 md:p-10 border border-slate-100 shadow-xs space-y-6">
        {/* Category Tag */}
        {article.category && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-black tracking-wide uppercase">
            <BookOpen className="w-3.5 h-3.5" />
            {article.category}
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight">
          {article.title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-sm text-slate-500 italic border-y border-slate-100 py-4">
          <span className="flex items-center gap-2 font-medium not-italic text-slate-700">
            <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-black text-xs">
              <User className="w-4 h-4" />
            </span>
            <span>Tác giả: <strong>{article.author}</strong></span>
          </span>

          <span className="flex items-center gap-1.5 font-medium not-italic">
            <Calendar className="w-4 h-4 text-blue-500" />
            {article.date}
          </span>

          {article.readTime && (
            <span className="flex items-center gap-1.5 font-medium not-italic">
              <Clock className="w-4 h-4 text-emerald-500" />
              {article.readTime}
            </span>
          )}
        </div>

        {/* Featured Image */}
        <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-100 shadow-inner">
          <img
            src={article.thumbnail}
            alt={article.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80';
            }}
          />
        </div>

        {/* Article Summary Lead */}
        <div className="bg-amber-50/70 border-l-4 border-amber-400 p-5 rounded-r-2xl">
          <p className="text-base md:text-lg font-semibold text-amber-950 leading-relaxed italic">
            "{article.summary}"
          </p>
        </div>

        {/* Main Content Body */}
        <div className="prose prose-slate max-w-none text-slate-700 text-base md:text-lg leading-relaxed pt-4">
          {article.content ? (
            <div 
              className="editor-content"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          ) : (
            <p className="text-slate-700 font-medium">{article.summary}</p>
          )}
        </div>
      </header>

      {/* Related News Section */}
      {relatedArticles.length > 0 && (
        <section className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-blue-600" />
              Tin tức liên quan khác
            </h3>
            <Link to="/news" className="text-blue-600 font-bold text-sm hover:underline flex items-center gap-1">
              Xem tất cả <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {relatedArticles.map((item) => (
              <Link
                key={item.id}
                to={`/news/${item.id}`}
                className="group flex gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors border border-slate-100"
              >
                <div className="w-24 h-20 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=300&q=80';
                    }}
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <h4 className="font-bold text-slate-800 text-sm leading-snug group-hover:text-blue-600 line-clamp-2 transition-colors">
                    {item.title}
                  </h4>
                  <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {item.date}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
