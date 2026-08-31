import { useState, useRef, useEffect } from 'react';
import { Send, Bot, X, MessageCircle, Sparkles, RefreshCw, BookOpen, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useData } from '../../contexts/DataContext';

interface Message {
  id: string;
  role: 'user' | 'bot';
  content: string;
}

const QUICK_SUGGESTIONS = [
  '📖 Gợi ý sách hay cho lớp 3',
  '🌟 Đố vui về truyện Dế Mèn',
  '🚀 Sách khám phá vũ trụ',
  '⏰ Giờ mở cửa thư viện'
];

export default function FloatingChatWidget() {
  const { books } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      role: 'bot',
      content: 'Chào bạn nhỏ! 🦉 Tớ là Cú Mèo Thông Thái, thủ thư nhí tại Thư viện Tiểu học Mỹ An đây. Bạn muốn tìm sách hay hay đố vui cùng tớ nào? ✨',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isLoading]);

  const handleSend = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage = textToSend.trim();
    if (!customText) {
      setInput('');
    }

    const newMsgList: Message[] = [
      ...messages,
      { id: `user-${Date.now()}`, role: 'user', content: userMessage },
    ];
    setMessages(newMsgList);
    setIsLoading(true);

    try {
      // Send message along with history to server
      const historyPayload = messages.map(m => ({
        role: m.role,
        content: m.content
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: userMessage,
          history: historyPayload,
          context: books.map((b) => `- ${b.title} (Tác giả: ${b.author}, Phân loại: ${b.category})`).join('\n')
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch reply from AI');
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { 
          id: `bot-${Date.now()}`, 
          role: 'bot', 
          content: data.reply || 'Cú Mèo đang lắng nghe bạn đây! Hãy hỏi tớ thêm về sách nhé! 🦉' 
        },
      ]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          role: 'bot',
          content: 'Ui da! Cú Mèo vừa bay đi lấy sách một lát, bạn thử hỏi lại tớ nhé! 🦉📚',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'bot',
        content: 'Cú Mèo đã sẵn sàng cho cuộc trò chuyện mới rồi! Bạn muốn hỏi gì nào? 🦉✨',
      },
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="absolute bottom-20 right-0 w-[90vw] max-w-[400px] h-[540px] bg-white rounded-[2rem] shadow-2xl border border-blue-100 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 p-4 px-5 flex items-center justify-between text-white shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl shadow-inner border border-white/30">
                  🦉
                </div>
                <div>
                  <h3 className="font-black text-base md:text-lg leading-tight flex items-center gap-1.5">
                    Cú Mèo Thông Thái
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  </h3>
                  <p className="text-blue-100 text-xs font-semibold">Trợ lý AI Thư Viện Mỹ An</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleClearChat}
                  title="Bắt đầu lại cuộc trò chuyện"
                  className="p-2 hover:bg-white/20 rounded-xl transition-colors text-blue-100 hover:text-white"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-xl transition-colors text-blue-100 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/80">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'bot' && (
                    <div className="w-7 h-7 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0 text-sm shadow-xs mt-1">
                      🦉
                    </div>
                  )}
                  <div
                    className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 font-bold rounded-tr-xs shadow-sm'
                        : 'bg-white border border-slate-100 text-slate-700 font-medium rounded-tl-xs shadow-xs'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-2.5 justify-start items-center">
                  <div className="w-7 h-7 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0 text-sm mt-1">
                    🦉
                  </div>
                  <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-xs px-4 py-3 flex items-center gap-1.5 shadow-xs">
                    <span className="text-xs font-bold text-slate-400 mr-1">Cú Mèo đang suy nghĩ</span>
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></span>
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions Chips */}
            <div className="px-3 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {QUICK_SUGGESTIONS.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(item)}
                  disabled={isLoading}
                  className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-full whitespace-nowrap transition-colors flex-shrink-0 disabled:opacity-50"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <div className="p-3.5 bg-white border-t border-slate-100">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }} 
                className="flex gap-2 relative"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Hỏi Cú Mèo về sách, truyện..."
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-12 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm font-medium text-slate-800"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-40 transition-colors shadow-xs"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Mascot Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 transition-all relative border-2 border-white cursor-pointer"
        aria-label="Mở Trợ lý AI Cú Mèo"
      >
        {isOpen ? (
          <X className="w-7 h-7" />
        ) : (
          <>
            <span className="text-3xl select-none">🦉</span>
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-400 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-black text-amber-950">
              AI
            </span>
          </>
        )}
      </motion.button>
    </div>
  );
}
