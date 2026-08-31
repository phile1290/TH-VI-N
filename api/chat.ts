import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

const SYSTEM_INSTRUCTION = `Bạn là 'Cú Mèo Thông Thái' 🦉 - linh vật thủ thư kiêm người bạn thân thiết của các em học sinh tại Thư viện Trường Tiểu học Mỹ An.
Nhiệm vụ của bạn là:
1. Trò chuyện vui tươi, ấm áp, hóm hỉnh.
2. Giới thiệu sách. QUAN TRỌNG: Bạn CHỈ ĐƯỢC gợi ý và xác nhận những cuốn sách có trong [DỮ LIỆU TỦ SÁCH] được cung cấp trong prompt. Nếu học sinh hỏi tìm sách KHÔNG CÓ trong danh sách này, bạn PHẢI trả lời là thư viện chưa có và gợi ý những cuốn sách khác có trong danh sách. Không được bịa ra sách không có thật.
3. Hướng dẫn các em cách mượn sách.
Phong cách trả lời: Xưng "Cú Mèo" hoặc "Tớ" và gọi học sinh là "bạn nhỏ", "các em". Trả lời ngắn gọn, trong sáng.`;

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, history, context } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    let contents = [];
    if (history && Array.isArray(history)) {
      contents = history.map((msg: any) => ({
        role: msg.role === 'bot' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));
    }
    
    const contextPrompt = context ? `\n\n[DỮ LIỆU TỦ SÁCH CỦA THƯ VIỆN ĐỂ CÚ MÈO THAM KHẢO]:\n${context}` : '';
    
    contents.push({ 
      role: 'user', 
      parts: [{ text: message + contextPrompt }]
    });

    const modelName = process.env.GEMINI_MODEL || "gemini-3.1-flash-lite";

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
    } catch (error) {
      console.warn("Primary model error, trying fallback:", error);
      const fallbackResponse = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        }
      });
      responseText = fallbackResponse.text || "";
    }

    res.status(200).json({ reply: responseText });
  } catch (error) {
    console.error("Vercel API Error:", error);
    res.status(500).json({ 
      reply: "Ui da! Cú Mèo đang mải phân loại sách mới trên giá rồi. Bé chờ Cú Mèo một xíu và hỏi lại nhé! 🦉📚" 
    });
  }
}
