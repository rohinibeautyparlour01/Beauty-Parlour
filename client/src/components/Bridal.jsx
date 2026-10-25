import { CheckCircle2 } from 'lucide-react';
import { waLink } from '../config';
import { WhatsAppIcon } from './Icons';
import Reveal from './Reveal';
import SmartImg from './SmartImg';

const points = [
  'Bridal makeup consultation included',
  'Hairstyling support for the big day',
  'Long-lasting wedding day finish',
  'Looks for engagement, haldi, reception & wedding',
];

export default function Bridal() {
  return (
    <section id="bridal" className="section sand">
      <div className="container bridal-grid">
        <Reveal variant="left">
          <div className="arch">
           <img
  src="/images/bridal-feature.webp"
  alt="Bridal makeup by Rohini Beauty Parlour"
  className="bridal-photo"
/>
            <span className="arch-badge">✦ REAL CLIENT LOOK</span>
          </div>
        </Reveal>
        <Reveal variant="right">
          <span className="eyebrow dim">Bridal Beauty</span>
          <h2 className="left">Bridal Makeup for Your <em>Most Special Day</em></h2>
          <p className="lead">
            Every bride deserves to feel confident, graceful, and radiant. Rohini Beauty Parlour creates bridal looks that match your outfit, jewellery, skin tone, and personal style — crafted with care for the most important day of your life.
          </p>
          <ul className="checks">
            {points.map((p) => <li key={p}><CheckCircle2 size={20} />{p}</li>)}
          </ul>
          <div className="btn-row">
            <a className="btn btn-gold" href={waLink('Hi, I would like to book a bridal consultation.')} target="_blank" rel="noreferrer">Book Bridal Consultation</a>
            <a className="btn btn-outline" href={waLink()} target="_blank" rel="noreferrer"><WhatsAppIcon size={16} /> Message on WhatsApp</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
