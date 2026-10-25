import { Heart, Gem, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from './Icons';
import Reveal from './Reveal';

const items = [
  [Heart, 'Personal Beauty Care', 'Every client gets dedicated attention and care'],
  [Gem, 'Bridal & Occasion Makeup', 'Specialized looks for your most special days'],
  [Sparkles, 'Clean & Comfortable', 'Hygienic service in a warm, welcoming space'],
  [WhatsAppIcon, 'Easy WhatsApp Booking', 'Book appointments with a simple message'],
];

export default function Features() {
  return (
    <section className="features">
      <div className="container feature-grid">
        {items.map(([I, t, d], i) => (
          <Reveal key={t} delay={i * 90} className="feature">
            <span className="feature-icon"><I size={20} /></span>
            <h4>{t}</h4>
            <p>{d}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
