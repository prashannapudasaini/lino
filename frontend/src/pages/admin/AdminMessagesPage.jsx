import React, { useState, useEffect } from 'react';
import { MessageSquare, Mail, Phone, Clock, CheckCircle2, RefreshCw } from 'lucide-react';
import Button from '../../components/common/Button';
import { getContactMessages, markMessageRead } from '../../services/api';

const AdminMessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMessages = async () => {
    setLoading(true);
    try {
      const data = await getContactMessages();
      setMessages(data);
    } catch (err) {
      console.error("Failed to load messages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleMarkRead = async (id) => {
    try {
      const updated = await markMessageRead(id);
      setMessages(prev => prev.map(m => m.id === id ? updated : m));
    } catch (err) {
      console.error("Failed to mark message read:", err);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-luxury-border">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold block mb-1">
            Inbound Communications
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-normal text-luxury-textPrimary">
            Client Messages & Inquiries
          </h1>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={loadMessages}
          loading={loading}
          className="text-xs"
        >
          <RefreshCw className="w-3.5 h-3.5 mr-1.5" /> Refresh Inbox
        </Button>
      </div>

      {messages.length === 0 ? (
        <div className="bg-luxury-surface border border-luxury-border rounded-2xl p-12 text-center text-xs text-luxury-textMuted shadow-luxury">
          No contact messages received yet.
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-5 rounded-2xl border shadow-luxury transition-colors ${
                msg.is_read
                  ? 'bg-luxury-surface/80 border-luxury-border'
                  : 'bg-luxury-surface border-luxury-gold/50 shadow-luxury-glow'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-luxury-border/60">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-luxury-textPrimary">
                    {msg.name}
                  </span>
                  {!msg.is_read && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-luxury-gold text-luxury-bg font-bold uppercase">
                      New
                    </span>
                  )}
                </div>

                <div className="text-[11px] text-luxury-textMuted flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{new Date(msg.created_at).toLocaleString()}</span>
                </div>
              </div>

              <div className="py-3 text-xs space-y-1">
                <div className="flex flex-wrap gap-4 text-luxury-textSecondary">
                  <a href={`mailto:${msg.email}`} className="flex items-center gap-1.5 hover:text-luxury-gold">
                    <Mail className="w-3.5 h-3.5 text-luxury-gold" />
                    <span>{msg.email}</span>
                  </a>
                  {msg.phone && (
                    <a href={`tel:${msg.phone}`} className="flex items-center gap-1.5 hover:text-luxury-gold">
                      <Phone className="w-3.5 h-3.5 text-luxury-gold" />
                      <span>{msg.phone}</span>
                    </a>
                  )}
                </div>

                {msg.subject && (
                  <div className="text-luxury-gold font-medium pt-1">
                    Subject: {msg.subject}
                  </div>
                )}

                <p className="text-luxury-textPrimary bg-luxury-card p-3 rounded-xl mt-2 leading-relaxed">
                  {msg.message}
                </p>
              </div>

              {!msg.is_read && (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => handleMarkRead(msg.id)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-luxury-card border border-luxury-border text-xs text-luxury-gold hover:bg-luxury-elevated transition-colors font-medium"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mark as Handled</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMessagesPage;
