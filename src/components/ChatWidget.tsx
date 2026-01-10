import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import './ChatWidget.css'; // Ensure you have this CSS file

// Helper to render text with Bold formatting and Line Breaks
const FormatMessage = ({ text }: { text: string }) => {
  if (!text) return null;

  const lines = text.split('\n');

  return (
    <div className="text-sm leading-relaxed tracking-wide">
      {lines.map((line, i) => {
        const parts = line.split(/(\*\*.*?\*\*)/g);

        return (
          <p key={i} className="min-h-[1em] mb-1 last:mb-0">
            {parts.map((part, j) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={j} className="font-bold">{part.slice(2, -2)}</strong>;
              }
              return <span key={j}>{part}</span>;
            })}
          </p>
        );
      })}
    </div>
  );
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Hi. I'm the Rabuste Barista. How can I help?", isUser: false }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen, isLoading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    // Capture state before update for history, including the new user message
    const currentHistory = [...messages, { text: userMsg, isUser: true }];

    setMessages(prev => [...prev, { text: userMsg, isUser: true }]);
    setInput('');
    setIsLoading(true);

    try {
      // Send last 6 messages as context (enough for "previous prompt")
      const contextHistory = currentHistory.slice(-6).map(m => ({
        role: m.isUser ? 'user' : 'model', // Gemini expects 'user'/'model' roles mostly, but I'll parse it in backend
        text: m.text
      }));

      const res = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          context: { history: contextHistory }
        })
      });
      const data = await res.json();

      let botReply = "I'm not sure how to respond to that.";

      if (data.action === 'navigate') {
        botReply = `Navigating you to ${data.parameters.route}...`;
        window.location.href = data.parameters.route;
      } else if (data.parameters && data.parameters.message) {
        botReply = data.parameters.message;
      } else if (data.reply) {
        botReply = data.reply;
      }

      setMessages(prev => [...prev, { text: botReply, isUser: false }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { text: "Connection error.", isUser: false }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform z-50 shadow-lg"
      >
        {isOpen ? <X size={20} /> : <MessageCircle size={20} />}
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-6 w-[350px] h-[500px] bg-white rounded-lg shadow-xl border border-zinc-100 flex flex-col z-50 overflow-hidden font-sans">

          {/* Header - Minimalist */}
          <div className="bg-white p-4 flex items-center gap-3 border-b border-zinc-100">
            <h3 className="font-medium text-sm tracking-wider uppercase">Rabuste AI</h3>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-white">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 text-sm ${msg.isUser
                      ? 'bg-zinc-100 text-black rounded-lg rounded-tr-none'
                      : 'text-black rounded-lg p-0'
                    }`}
                >
                  <FormatMessage text={msg.text} />
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="text-zinc-400 text-xs flex items-center gap-2">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  ...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white flex gap-3 items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-300"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="text-black disabled:opacity-30"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}