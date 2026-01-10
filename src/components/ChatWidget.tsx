import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import './ChatWidget.css'; // Ensure you have this CSS file

// Helper to render text with Bold formatting and Line Breaks
const FormatMessage = ({ text }: { text: string }) => {
  if (!text) return null;

  const lines = text.split('\n');

  return (
    <div className="text-[15px] leading-relaxed tracking-wide font-sans text-inherit">
      {lines.map((line, i) => {
        const parts = line.split(/(\*\*.*?\*\*)/g);

        return (
          <p key={i} className="min-h-[1em] mb-1 last:mb-0">
            {parts.map((part, j) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={j} className="font-semibold">{part.slice(2, -2)}</strong>;
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
    { text: "Hi! I'm Labubu AI. Ask me about our menu, calories, or for a recommendation!", isUser: false }
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
    const currentHistory = [...messages, { text: userMsg, isUser: true }];
    setMessages(prev => [...prev, { text: userMsg, isUser: true }]);
    setInput('');
    setIsLoading(true);

    try {
      const contextHistory = currentHistory.slice(-6).map(m => ({
        role: m.isUser ? 'user' : 'model',
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

      const data: ApiResponse = await response.json();

      let botResponse = "I didn't catch that.";

      if (data.action === 'navigate' && data.parameters?.route) {
        botResponse = `Taking you to the ${data.parameters.route.replace('/', '')} page...`;
        setTimeout(() => { window.location.href = data.parameters?.route || '/'; }, 1500);
      } else if (data.action === 'respond' && data.parameters?.message) {
        botResponse = data.parameters.message;
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
    <div className="chat-widget-container" style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999 }}>

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="chat-widget-button flex items-center justify-center gap-2 px-5 py-2.5 rounded-full shadow-lg transition-transform hover:scale-105"
          style={{ backgroundColor: '#2C1810', height: '48px', width: 'auto' }}
        >
          <MessageCircle className="text-[#F3E5AB]" size={22} />
          <span className="text-[#F3E5AB] font-bold text-base whitespace-nowrap">Labubu AI</span>
        </button>
      )}

      {isOpen && (
        <div className={`chat-window bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ${isMinimized ? 'h-[60px]' : 'h-[500px]'}`}
          style={{ width: '350px', border: '1px solid #2C1810' }}>

          <div className="chat-header p-4 flex justify-between items-center text-[#F3E5AB]" style={{ backgroundColor: '#2C1810' }}>
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setIsMinimized(!isMinimized)}>
              <Coffee size={20} />
              <div className="flex flex-col">
                <span className="font-bold leading-tight">Labubu</span>
                <span className="text-[10px] font-normal opacity-80">AI Assistant</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          {!isMinimized && (
            <>
              <div className="chat-messages flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-[#FAF9F6]">
                {messages.map((msg, index) => (
                  <div key={index}
                    className={`message p-3 rounded-lg max-w-[85%] text-sm ${msg.isUser ? 'self-end' : 'self-start'}`}
                    style={{
                      whiteSpace: 'pre-wrap', // Essential for lists!
                      backgroundColor: msg.isUser ? '#2C1810' : '#EFEBE9',
                      color: msg.isUser ? '#F3E5AB' : '#2C1810',
                      border: msg.isUser ? 'none' : '1px solid #D7CCC8',
                      borderRadius: '8px'
                    }}>
                    {msg.text}
                  </div>
                ))}

                {isLoading && (
                  <div className="bg-[#EFEBE9] p-3 rounded-lg flex items-center gap-2 text-[#2C1810] text-sm w-fit border border-[#D7CCC8]">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Brewing answer...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="chat-input-area p-3 border-t border-gray-200 bg-white flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about menu, calories..."
                  disabled={isLoading}
                  className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#2C1810] text-sm"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="p-2 rounded-md disabled:opacity-50"
                  style={{ backgroundColor: '#2C1810', color: '#F3E5AB' }}
                >
                  <FormatMessage text={msg.text} />
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-[#F3F0EB] p-3 rounded-2xl rounded-tl-none border border-[#E7E5E4] flex items-center gap-2 text-xs text-[#8B5E3C] font-medium tracking-wide">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  BREWING...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-[#E7E5E4]">
            <div className="flex gap-2 items-center bg-transparent">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about menu, calories..."
                className="flex-1 bg-white border border-[#E7E5E4] rounded-lg px-4 py-3 text-[#44403C] placeholder:text-[#A8A29E] focus:outline-none focus:border-[#8B5E3C] transition-colors"
                autoFocus
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="bg-[#A08875] hover:bg-[#8B5E3C] text-white p-3 rounded-lg shadow-md transition-all disabled:opacity-50 disabled:shadow-none active:scale-95"
              >
                <Send className="w-5 h-5 -ml-0.5 mt-0.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}