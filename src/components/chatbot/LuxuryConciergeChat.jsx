import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, ArrowRight, Loader2, Minimize2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { chatWithConcierge } from '../../services/api';

const suggestedPrompts = [
  "What airports do you service?",
  "What vehicles are available?",
  "How does quotation work?",
  "Where are your service areas?"
];

const LuxuryConciergeChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Welcome to Everest Executive Limo LLC. I am your Executive AI Concierge. How may I assist you with your luxury travel arrangements, fleet selections, or airport transfers today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestedActions, setSuggestedActions] = useState(["Request a Quote", "Explore Fleet"]);
  const [actionUrl, setActionUrl] = useState("/quote");

  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (messageText = input) => {
    const textToSend = messageText.trim();
    if (!textToSend || loading) return;

    const newHistory = [...messages, { role: 'user', content: textToSend }];
    setMessages(newHistory);
    setInput('');
    setLoading(true);

    try {
      // Pass recent messages to API
      const historyPayload = newHistory.slice(-6);
      const res = await chatWithConcierge(textToSend, historyPayload);
      
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: res.reply }
      ]);
      if (res.suggested_actions) {
        setSuggestedActions(res.suggested_actions);
      }
      if (res.action_url) {
        setActionUrl(res.action_url);
      }
    } catch (err) {
      console.error("Chat error:", err);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'Thank you for reaching out. Our dispatch and concierge team is available at +1 (717) 555-0199 or reservations@everestlimo.com. You can also submit a direct quote enquiry at any time.'
        }
      ]);
      setSuggestedActions(["Request a Quote", "Contact Team"]);
      setActionUrl("/quote");
    } finally {
      setLoading(false);
    }
  };

  const handleActionClick = (action) => {
    if (action.toLowerCase().includes("quote")) {
      navigate('/quote');
      setIsOpen(false);
    } else if (action.toLowerCase().includes("fleet")) {
      navigate('/fleet');
      setIsOpen(false);
    } else if (action.toLowerCase().includes("airport")) {
      navigate('/airport-transportation');
      setIsOpen(false);
    } else if (action.toLowerCase().includes("contact") || action.toLowerCase().includes("call")) {
      navigate('/contact');
      setIsOpen(false);
    } else if (actionUrl) {
      navigate(actionUrl);
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 print:hidden">
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-luxury-surface via-luxury-card to-luxury-surface border border-luxury-gold/50 text-luxury-gold shadow-luxury hover:border-luxury-gold hover:shadow-luxury-glow transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-luxury-gold/50 active:scale-95"
          aria-label="Open Luxury AI Concierge"
        >
          <div className="w-8 h-8 rounded-full bg-luxury-gold/15 flex items-center justify-center text-luxury-gold relative">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-luxury-gold ring-2 ring-luxury-bg"></span>
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-semibold tracking-wider text-luxury-textPrimary group-hover:text-luxury-gold transition-colors">
              AI Concierge
            </span>
            <span className="text-[10px] text-luxury-textSecondary uppercase tracking-wider">
              Everest Dispatch
            </span>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[380px] h-[520px] max-h-[85vh] bg-luxury-surface border border-luxury-border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in backdrop-blur-xl">
          {/* Header */}
          <div className="bg-luxury-bg px-4 py-3.5 border-b border-luxury-border flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-luxury-gold/20 border border-luxury-gold/50 flex items-center justify-center text-luxury-gold">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-semibold tracking-wider uppercase text-luxury-textPrimary">
                  Executive Concierge
                </h3>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Online & Verified
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-luxury-textSecondary hover:text-luxury-gold hover:bg-white/5 transition-colors"
              aria-label="Close chat"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-luxury-gold text-luxury-bg font-medium rounded-tr-none'
                      : 'bg-luxury-card border border-luxury-border text-luxury-textPrimary rounded-tl-none'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-luxury-card border border-luxury-border rounded-2xl rounded-tl-none px-3.5 py-2.5 text-luxury-textSecondary flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-luxury-gold" />
                  <span>Executive Concierge is formulating response...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts & Actions */}
          <div className="px-3 pt-2 pb-1 border-t border-luxury-border/60 bg-luxury-bg/40">
            <div className="flex flex-wrap gap-1.5 mb-2">
              {suggestedActions.map((action, i) => (
                <button
                  key={i}
                  onClick={() => handleActionClick(action)}
                  className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full bg-luxury-gold/10 text-luxury-gold border border-luxury-gold/30 hover:bg-luxury-gold/20 transition-colors font-medium"
                >
                  <span>{action}</span>
                  <ArrowRight className="w-2.5 h-2.5" />
                </button>
              ))}
            </div>

            {messages.length <= 2 && (
              <div className="flex gap-1 overflow-x-auto pb-1 no-scrollbar text-[10px]">
                {suggestedPrompts.slice(0, 3).map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(prompt)}
                    className="whitespace-nowrap px-2 py-1 rounded bg-luxury-card text-luxury-textSecondary hover:text-luxury-textPrimary border border-luxury-border transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-luxury-bg border-t border-luxury-border flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about fleet, airports, or quote..."
              className="flex-1 bg-luxury-card border border-luxury-border rounded-xl px-3 py-2 text-xs text-luxury-textPrimary placeholder-luxury-textMuted focus:outline-none focus:border-luxury-gold/60 focus:ring-1 focus:ring-luxury-gold/50"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-2 rounded-xl bg-luxury-gold text-luxury-bg hover:bg-luxury-goldHover disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Send message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LuxuryConciergeChat;

