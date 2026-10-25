export const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');
export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210';
export const PHONE = import.meta.env.VITE_PHONE || '+91 8978452925';
export const PHONE_DISPLAY = import.meta.env.VITE_PHONE_DISPLAY || '+91 8978452925';
export const EMAIL = 'beautyparlour01@gmail.com';
export const ADDRESS = 'Munji Nilayam, 3-10-26/18c, RTC Colony, Ramanthapur,Hyderabad-500013, Telangana';
export const HOURS = 'Wed–Mon: 12:00 PM – 7:00 PM (Tuesday Holiday)';
export const MAP_EMBED_URL = import.meta.env.VITE_MAP_EMBED_URL || '';
export const MAP_QUERY = import.meta.env.VITE_MAP_QUERY || 'Rohini Beauty Parlour';

export const waLink = (text = 'Hi Rohini Beauty Parlour, I would like to book an appointment.') =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
