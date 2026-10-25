import { Heart } from 'lucide-react';
import { VALUES, TESTIMONIALS } from '../data';
import { Icon } from './Icons';
import Reveal from './Reveal';

// No photos in this section by design.
export default function About() {
  return (
    <section id="about">
      <div className="section">
        <div className="container about-grid">
          <Reveal variant="left">
            <div className="arch-card">
              <span className="heart-ring"><Heart size={30} fill="currentColor" /></span>
              <h3>Beauty with a <em>Personal Touch</em></h3>
              <small>ROHINI BEAUTY PARLOUR</small>
            </div>
          </Reveal>
          <Reveal variant="right">
            <span className="eyebrow dim">Our Story</span>
            <h2 className="left">Beauty Care with a <em>Personal Touch</em></h2>
            <p className="lead">Rohini Beauty Parlour is a local beauty space created for women who want simple grooming, graceful makeup, and special occasion beauty care in a comfortable environment.</p>
            <p className="lead">From regular threading and facials to bridal makeup, every service is handled with attention, patience, and care. Led by Rohini, the parlour brings personal beauty care, bridal artistry, and everyday grooming together in one warm local space.</p>
            <div className="values">
              {VALUES.map((v) => (
                <div key={v.title} className="value">
                  <h5><Icon name={v.icon} size={16} /> {v.title}</h5>
                  <p>{v.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <div className="section dark-section">
        <div className="container">
          <Reveal className="section-head light">
            <span className="eyebrow">Client Love</span>
            <h2>Loved by Local Clients</h2>
            <p>Words from clients who trust Rohini Beauty Parlour for their beauty needs.</p>
          </Reveal>
          <div className="grid-3">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 110}>
                <figure className="testi">
                  <Icon name="Quote" size={30} className="q" />
                  <blockquote>"{t.text}"</blockquote>
                  <figcaption>
                    <span className="avatar" style={{ background: t.color }}>{t.initials}</span>
                    <span><strong>{t.name}</strong><small>{t.tag}</small></span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
