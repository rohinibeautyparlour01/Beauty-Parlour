
import { useState, useEffect } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { GALLERY, CONSULTATIONS } from '../data';
import { waLink } from '../config';
import Reveal from './Reveal';

export default function Gallery() {
  const [open, setOpen] = useState(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(null);
      }
    };

    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <section id="gallery">
      <div className="section">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Our Work</span>
            <h2>Real Looks, Real Clients</h2>
            <p>
              A glimpse of makeup, bridal, and beauty work from
              Rohini Beauty Parlour.
            </p>
          </Reveal>

          <div className="gallery-grid">
            {GALLERY.map((g, i) => (
              <Reveal key={g.alt} delay={(i % 3) * 100}>
                <button
                  type="button"
                  className="g-item"
                  onClick={() => setOpen(i)}
                  aria-label={`Open ${g.alt}`}
                >
                  <img
                    src={g.src}
                    alt={g.alt}
                    loading="lazy"
                  />

                  {/* Name and zoom icon appear on hover */}
                  <span className="g-overlay">
                    <span className="g-overlay-content">
                      <ZoomIn size={24} />
                      <h3>{g.alt}</h3>
                    </span>
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div className="section sand">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Explore</span>
            <h2>Services &amp; Consultations</h2>
            <p>
              Every service is personalized. Contact Rohini Beauty Parlour
              to know pricing and availability.
            </p>
          </Reveal>

          <div className="grid-4">
            {CONSULTATIONS.map((c, i) => (
              <Reveal key={c.title} delay={i * 90}>
                <div className={`card consult ${c.dark ? 'dark' : ''}`}>
                  <span className="bar" />
                  <h3>{c.title}</h3>

                  <ul>
                    {c.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>

                  <a
                    className={`btn ${
                      c.dark ? 'btn-gold' : 'btn-outline'
                    } btn-sm`}
                    href={waLink(
                      c.dark
                        ? 'Hi, I would like to book a bridal consultation.'
                        : `Hi, I would like to know pricing for ${c.title} services.`
                    )}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {c.dark
                      ? 'Book Bridal Consultation'
                      : 'Contact to Know Pricing'}
                  </a>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="note">
              Pricing varies based on service details, hair length, and skin
              type. Reach out on WhatsApp or call us to get a personalized
              quote.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Lightbox */}
      {open !== null && GALLERY[open] && (
        <div
          className="lightbox"
          onClick={() => setOpen(null)}
          role="presentation"
        >
          <button
            type="button"
            className="lb-close"
            aria-label="Close image"
            onClick={() => setOpen(null)}
          >
            <X />
          </button>

          <div
            className="lb-body"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={GALLERY[open].src}
              alt={GALLERY[open].alt}
            />
          </div>
        </div>
      )}
    </section>
  );
}
