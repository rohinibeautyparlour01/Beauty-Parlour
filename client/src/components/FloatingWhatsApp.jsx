import { waLink } from '../config';
import { WhatsAppIcon } from './Icons';

export default function FloatingWhatsApp() {
  return (
    <a className="wa-float" href={waLink()} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
      <WhatsAppIcon size={30} />
    </a>
  );
}
