import { useState } from 'react';
import { Plus } from 'lucide-react';
import { FAQS } from '../data';
import Reveal from './Reveal';

export default function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="section">
      <div className="container narrow">
        <Reveal className="section-head">
          <span className="eyebrow">FAQ</span>
          <h2>Questions Before Booking?</h2>
          <p>Everything you need to know before your visit.</p>
        </Reveal>
        <div className="faq-list">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={i * 70}>
              <div className={`faq ${open === i ? 'open' : ''}`}>
                <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                  <span>{f.q}</span><Plus size={22} />
                </button>
                <div className="faq-body"><div><p>{f.a}</p></div></div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
