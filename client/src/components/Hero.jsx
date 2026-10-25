
import { Phone, Wand2 } from 'lucide-react';
import { PHONE, waLink } from '../config';
import { WhatsAppIcon } from './Icons';

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container hero-grid">

        {/* Hero text */}
        <div className="hero-copy">
          <span className="pill intro-1">
            <Wand2 size={14} />
            ROHINI BEAUTY PARLOUR
          </span>

          <h1 className="intro-2">
            Beauty care for <em>every day,</em> bridal glow for your{' '}
            <em>special day.</em>
          </h1>

          <p className="lead intro-3">
            Rohini Beauty Parlour offers haircuts, facials, threading,
            waxing, bridal makeup, and occasion-ready beauty services
            with a personal, caring touch.
          </p>

          <ul className="dots intro-3">
            <li>Bridal</li>
            <li>Everyday Beauty</li>
            <li>Appointment Friendly</li>
          </ul>

          <div className="btn-row intro-4">
            <a
              className="btn btn-gold"
              href={waLink()}
              target="_blank"
              rel="noreferrer"
            >
              <WhatsAppIcon size={18} />
              Book on WhatsApp
            </a>

            <a className="btn btn-outline" href={`tel:${PHONE}`}>
              <Phone size={18} />
              Call Now
            </a>
          </div>
        </div>

        {/* Hero image */}
        <div className="hero-visual intro-2">
          <div className="hero-circle">
            <img
              src="/images/hero-main.webp"
              alt="Bridal makeup at Rohini Beauty Parlour"
            />
          </div>

          <span className="float-badge">
            ✦ Bridal Specialist
          </span>
        </div>

      </div>
    </section>
  );
}
