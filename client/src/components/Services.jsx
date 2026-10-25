import { SERVICES } from '../data';
import { waLink } from '../config';
import { Icon } from './Icons';
import Reveal from './Reveal';

export default function Services() {
  return (
    <section id="services" className="section">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">What We Offer</span>
          <h2>Services for Every Glow</h2>
          <p>From daily grooming to bridal transformations, explore beauty services designed with care.</p>
        </Reveal>
        <div className="grid-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 100}>
              <article className={`card service ${s.premium ? 'premium' : ''}`}>
                {s.premium && <span className="tag">PREMIUM</span>}
                <span className="icon-box"><Icon name={s.icon} /></span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <a
                  className={`btn ${s.premium ? 'btn-gold' : 'btn-outline'} btn-block`}
                  href={waLink(s.premium ? 'Hi, I would like to book a bridal consultation.' : `Hi, I would like to know the pricing for ${s.title}.`)}
                  target="_blank" rel="noreferrer"
                >
                  {s.premium ? 'Book Bridal Consultation' : 'Ask for Pricing'}
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
