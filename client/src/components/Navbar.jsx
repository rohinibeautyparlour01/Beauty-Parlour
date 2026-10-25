import { useState } from 'react';
import { Flower2, Menu, X } from 'lucide-react';
import { NAV } from '../data';
import { waLink } from '../config';
import { WhatsAppIcon } from './Icons';

export default function Navbar({ active, scrolled }) {
  const [open, setOpen] = useState(false);
  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-inner">
        <a href="#home" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-logo"><Flower2 size={20} /></span>
          <span><strong>Rohini</strong><small>Beauty Parlour</small></span>
        </a>
        <nav className={`nav-links ${open ? 'open' : ''}`}>
          {NAV.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={active === id ? 'active' : ''} onClick={() => setOpen(false)}>{label}</a>
          ))}
        </nav>
        <a className="btn btn-dark desktop-only" href={waLink()} target="_blank" rel="noreferrer"><WhatsAppIcon size={18} /> Book Now</a>
        <button className="burger" aria-label="Toggle menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
    </header>
  );
}
