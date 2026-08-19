import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";

// Simple AI logic
const getAIResponse = (userMessage) => {
  userMessage = userMessage.toLowerCase();
  if (userMessage.includes("java")) return "💻 We offer professional Java Development training and real projects.";
  if (userMessage.includes("internship")) return "🎓 You can apply for internships in Java, Web, and AI at QEVRIX.";
  if (userMessage.includes("contact")) return "📞 You can reach us at contact@qevrix.com or visit our Contact page.";
  if (userMessage.includes("ai")) return "🤖 Yes! We also provide AI-integrated software solutions and chatbot systems.";
  if (userMessage.includes("training")) return "🧑‍💻 Our training programs cover Java, Spring Boot, Web, and AI basics.";
  return "✨ I'm QEVRIX Assistant — I’ll connect you to our team soon! Meanwhile, explore our services.";
};

// Speak function
const speak = (text) => {
  if ("speechSynthesis" in window) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-IN";
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
  }
};

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "ai", text: "👋 Hi! I'm QEVRIX Assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    const aiReply = { from: "ai", text: getAIResponse(input) };

    setMessages((prev) => [...prev, userMsg, aiReply]);
    speak(aiReply.text); // 🔊 Voice reply
    setInput("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Chat Icon */}
      {!open && (
        <motion.button
          onClick={() => setOpen(true)}
          whileHover={{ scale: 1.1 }}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-full shadow-lg hover:from-blue-400 hover:to-blue-500 transition-all duration-300"
        >
          <MessageCircle className="w-6 h-6" />
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="w-80 h-96 bg-qx-background/95 text-white rounded-2xl shadow-[0_0_20px_rgba(0,102,255,0.3)] flex flex-col overflow-hidden border border-blue-500/40"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold">
              <span>QEVRIX Assistant</span>
              <button
                onClick={() => setOpen(false)}
                className="hover:text-qx-textMuted transition"
              >
                ✖
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto px-3 py-2 space-y-3">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.from === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-3 py-2 rounded-xl max-w-[70%] text-sm ${
                      msg.from === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-qx-surface text-blue-300"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Box */}
            <div className="flex items-center border-t border-blue-500/40 px-3 py-2 bg-qx-background">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-transparent outline-none text-white placeholder-gray-400 text-sm"
              />
              <button
                onClick={sendMessage}
                className="ml-2 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-400 transition text-sm font-semibold"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
