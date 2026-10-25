import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Navigation, Loader2, CheckCircle2, MapPinned } from 'lucide-react';
import { API_URL, PHONE, PHONE_DISPLAY, EMAIL, ADDRESS, HOURS, WHATSAPP_NUMBER, MAP_EMBED_URL, MAP_QUERY, waLink } from '../config';
import { SERVICES } from '../data';
import { WhatsAppIcon } from './Icons';
import Reveal from './Reveal';

const today = () => new Date().toISOString().split('T')[0];
const empty = { name: '', phone: '', email: '', service: '', preferredDate: '', preferredTime: '10:00', message: '' };

export default function Contact() {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState({ type: 'idle', msg: '' });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', msg: '' });
    try {
      const res = await fetch(`${API_URL}/api/bookings`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || 'Could not send your request.');
      const text = `Hi Rohini Beauty Parlour! I'd like to book *${form.service}*.\nName: ${form.name}\nPhone: ${form.phone}` +
        `${form.preferredDate ? `\nDate: ${form.preferredDate}` : ''}${form.preferredTime ? `\nTime: ${form.preferredTime}` : ''}` +
        `${form.message ? `\nNote: ${form.message}` : ''}`;
      setStatus({ type: 'success', msg: 'Request sent! We have also sent you a WhatsApp confirmation — opening WhatsApp now.' });
      setForm(empty);
      window.open(waLink(text), '_blank', 'noopener');
    } catch (err) {
      setStatus({ type: 'error', msg: err.message });
    }
  };

  const info = [
    [Phone, 'Phone', PHONE_DISPLAY], [WhatsAppIcon, 'WhatsApp', `+${WHATSAPP_NUMBER}`],
    [Mail, 'Email', EMAIL], [MapPin, 'Address', ADDRESS], [Clock, 'Hours', HOURS],
  ];

  return (
    <section id="contact" className="section">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Get in Touch</span>
          <h2>Book Your Appointment</h2>
          <p>Call or message Rohini Beauty Parlour to know service availability and pricing.</p>
        </Reveal>

        <div className="contact-grid">
          <Reveal variant="left">
            <h3 className="contact-title">Contact Information</h3>
            <div className="info-list">
              {info.map(([I, label, value]) => (
                <div className="info" key={label}>
                  <span className="icon-box sm"><I size={18} /></span>
                  <div><small>{label}</small><p>{value}</p></div>
                </div>
              ))}
            </div>
            <hr />
            <a className="btn btn-gold btn-block" href={waLink()} target="_blank" rel="noreferrer"><WhatsAppIcon size={18} /> Book on WhatsApp</a>
            <a className="btn btn-outline btn-block" href={`tel:${PHONE}`}><Phone size={18} /> Call Now</a>
            <a className="btn btn-outline btn-block" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`} target="_blank" rel="noreferrer"><Navigation size={18} /> Get Directions</a>
          </Reveal>

          <Reveal variant="right">
            <form className="form-card" onSubmit={submit}>
              <h3>Send a Booking Request</h3>
              <div className="form-grid">
                <input required placeholder="Your Name *" value={form.name} onChange={set('name')} maxLength={80} />
                <input required type="tel" placeholder="Phone Number *" value={form.phone} onChange={set('phone')} pattern="[0-9+\s\-]{10,16}" title="Enter a valid phone number" />
                <input type="email" placeholder="Email Address (optional)" value={form.email} onChange={set('email')} />
                <select required value={form.service} onChange={set('service')}>
                  <option value="" disabled>Select Service *</option>
                  {SERVICES.map((s) => <option key={s.title}>{s.title}</option>)}
                  <option>Hair Styling</option><option>Cleanup / Skin Care</option><option>Engagement / Party Makeup</option>
                </select>
                <label className="field"><span>Preferred Date</span><input type="date" min={today()} value={form.preferredDate} onChange={set('preferredDate')} /></label>
                <label className="field"><span>Preferred Time</span><input type="time" value={form.preferredTime} onChange={set('preferredTime')} /></label>
              </div>
              <textarea rows="4" placeholder="Message (optional)" value={form.message} onChange={set('message')} maxLength={500} />
              <button className="btn btn-gold btn-block" disabled={status.type === 'loading'}>
                {status.type === 'loading' ? <><Loader2 size={18} className="spin" /> Sending…</> : <><WhatsAppIcon size={18} /> Send Booking Request</>}
              </button>
              <p className="form-hint">Your request will open WhatsApp — we'll confirm your appointment personally.</p>
              {status.type === 'success' && <p className="alert ok"><CheckCircle2 size={18} /> {status.msg}</p>}
              {status.type === 'error' && <p className="alert err">{status.msg}</p>}
            </form>
          </Reveal>
        </div>

        <Reveal>
          <div className="map">
            {MAP_EMBED_URL
              ? <iframe title="Rohini Beauty Parlour location" src={MAP_EMBED_URL} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              : <div className="map-empty"><MapPinned size={34} /><p>Map will appear here</p></div>}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
