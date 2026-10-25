import { useEffect, useRef, useState } from 'react';
import { MessageCircle, X, Send, Flower2 } from 'lucide-react';
import { API_URL, PHONE_DISPLAY, waLink } from '../config';

const CHIPS = ['Services', 'Bridal makeup', 'Pricing', 'Timings', 'Book appointment'];
const WELCOME = "Hello! 👋 Welcome to Rohini Beauty Parlour. I can help with services, bridal makeup, pricing, timings and bookings. What would you like to know?";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState('');
  const [chips, setChips] = useState(CHIPS);
  const [msgs, setMsgs] = useState([{ from: 'bot', text: WELCOME }]);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs, typing, open]);

  const send = async (text) => {
    const t = text.trim();
    if (!t || typing) return;
    setMsgs((m) => [...m, { from: 'user', text: t }]);
    setInput(''); setTyping(true);
    try {
      const res = await fetch(`${API_URL}/api/chat`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: t }) });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setTimeout(() => { setMsgs((m) => [...m, { from: 'bot', text: data.reply }]); setChips(data.suggestions || CHIPS); setTyping(false); }, 500);
    } catch {
      setMsgs((m) => [...m, { from: 'bot', text: `I'm having trouble connecting right now. Please WhatsApp or call us on ${PHONE_DISPLAY} and we'll help you personally.`, wa: true }]);
      setTyping(false);
    }
  };

  return (
    <>
      <button className={`chat-launcher ${open ? 'hide' : ''}`} onClick={() => setOpen(true)} aria-label="Open chat support">
        <MessageCircle size={26} /><span className="ping" />
      </button>

      <div className={`chat-window ${open ? 'open' : ''}`} role="dialog" aria-label="Customer support chat">
        <div className="chat-head">
          <span className="brand-logo filled"><Flower2 size={18} /></span>
          <div><strong>Rohini Support</strong><small><i /> Online · replies instantly</small></div>
          <button onClick={() => setOpen(false)} aria-label="Close chat"><X size={20} /></button>
        </div>
        <div className="chat-body">
          {msgs.map((m, i) => (
            <div key={i} className={`bubble ${m.from}`}>
              {m.text.split('\n').map((l, j) => <span key={j}>{l}<br /></span>)}
              {m.wa && <a href={waLink()} target="_blank" rel="noreferrer">Open WhatsApp</a>}
            </div>
          ))}
          {typing && <div className="bubble bot typing"><i /><i /><i /></div>}
          <div ref={endRef} />
        </div>
        <div className="chat-chips">
          {chips.map((c) => <button key={c} onClick={() => send(c)}>{c}</button>)}
        </div>
        <form className="chat-input" onSubmit={(e) => { e.preventDefault(); send(input); }}>
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your question…" maxLength={300} />
          <button aria-label="Send"><Send size={18} /></button>
        </form>
      </div>
    </>
  );
}
