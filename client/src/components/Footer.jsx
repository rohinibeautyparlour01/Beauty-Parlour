import { Flower2, Instagram, Facebook } from 'lucide-react';
import { NAV } from '../data';
import { waLink } from '../config';
import { WhatsAppIcon } from './Icons';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <a href="#home" className="brand light"><span className="brand-logo filled"><Flower2 size={20} /></span><span><strong>Rohini</strong><small>Beauty Parlour</small></span></a>
          <p>A warm local beauty space offering haircuts, facials, threading, waxing, everyday makeup, and bridal beauty services — crafted with personal care for every client.</p>
          <div className="socials">
            <a href={waLink()} target="_blank" rel="noreferrer" aria-label="WhatsApp"><WhatsAppIcon size={15} /></a>
            <a href="https://www.instagram.com/beautyparlour_rohini?xtok=MWpjeThxaDZwMTVpaQ==" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={15} /></a>
          </div>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>{NAV.map(([id, l]) => <li key={id}><a href={`#${id}`}>{l}</a></li>)}</ul>
        </div>
        <div>
          <h4>Book an Appointment</h4>
          <p>Reach out on WhatsApp or call us to check availability and book your slot.</p>
          <a className="btn btn-gold" href={waLink()} target="_blank" rel="noreferrer"><WhatsAppIcon size={18} /> Book on WhatsApp</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Rohini Beauty Parlour. All rights reserved.</span>
        <span>BEAUTY, BRIDAL &amp; EVERYDAY GLOW</span>
      </div>
    </footer>
  );
}
