import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

const SYSTEM_INSTRUCTION = `Bạn là 'Cú Mèo Thông Thái' 🦉 - linh vật thủ thư kiêm người bạn thân thiết của các em học sinh tại Thư viện Trường Tiểu học Mỹ An (xã Phù Mỹ Đông, tỉnh Gia Lai).
Nhiệm vụ của bạn là:
1. Trò chuyện vui tươi, ấm áp, hóm hỉnh, khen ngợi tinh thần ham học hỏi của các bạn nhỏ.
2. Giới thiệu những cuốn sách hay, truyện cổ tích, sách khoa học, kỹ năng sống phù hợp với lứa tuổi tiểu học (từ lớp 1 đến lớp 5).
3. Đố vui kiến thức thú vị, giải thích các hiện tượng thiên nhiên một cách đơn giản, dễ hiểu và sinh động.
4. Hướng dẫn các em cách mượn sách, giữ gìn sách và thói quen đọc sách 15 phút mỗi ngày.

Phong cách trả lời:
- Luôn xưng là "Cú Mèo" hoặc "Tớ" và gọi học sinh là "bạn nhỏ", "các em" hoặc "bạn thân mến".
- Sử dụng các biểu tượng cảm xúc vui nhộn (🦉, 📚, ✨, 🌟, 🚀, 🎉, 📖) ở mức vừa phải để câu chuyện sinh động.
- Trả lời ngắn gọn, câu cú trong sáng, tích cực, không dùng từ ngữ phức tạp khó hiểu.`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Góc Chatbot AI Cú Mèo Thông Thái
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: "Tin nhắn không được để trống" });
      }

      // Build contents array with conversation history if available
      const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

      if (Array.isArray(history) && history.length > 0) {
        for (const item of history.slice(-6)) { // keep last 6 turns for context
          if (item.content) {
            contents.push({
              role: item.role === 'bot' || item.role === 'model' ? 'model' : 'user',
              parts: [{ text: item.content }]
            });
          }
        }
      }

      // Add current user message
      contents.push({
        role: "user",
        parts: [{ text: message }]
      });

      const modelName = process.env.GEMINI_MODEL || "gemini-3.7-flash";

      let responseText = "";
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: contents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
          }
        });
        responseText = response.text || "";
      } catch (genError) {
        console.warn(`Primary model ${modelName} encountered error, trying fallback model...`, genError);
        const fallbackResponse = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: contents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
          }
        });
        responseText = fallbackResponse.text || "";
      }

      if (!responseText) {
        responseText = "Cú Mèo đang lắng nghe bạn đây! Bạn có muốn Cú Mèo gợi ý một cuốn sách tranh kỳ thú không?";
      }

      res.json({ reply: responseText });
    } catch (error) {
      console.error("Error calling Gemini API in server.ts:", error);
      res.status(500).json({ 
        reply: "Ui da! Cú Mèo đang mải phân loại sách mới trên giá rồi. Bé chờ Cú Mèo một xíu và hỏi lại nhé! 🦉📚" 
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // Since express is ^4.21.2, we use '*'
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

