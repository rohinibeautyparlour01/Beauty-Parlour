// Rule-based support bot – used by the website chat widget AND the WhatsApp auto-reply.
const phone = () => process.env.BUSINESS_PHONE || '+91 8978452925';
const hours = () => process.env.BUSINESS_HOURS || 'Mon–Sat, 10:00 AM – 8:00 PM';
const address = () => process.env.BUSINESS_ADDRESS || 'Shop 12, Main Road, Your Town, Telangana';

const DEFAULT_CHIPS = ['Services', 'Bridal makeup', 'Pricing', 'Timings', 'Book appointment'];

const intents = [
  {
    name: 'greeting',
    keywords: ['hi', 'hello', 'hey', 'namaste', 'namaskar', 'good morning', 'good evening'],
    reply: () => "Hello! 👋 Welcome to Rohini Beauty Parlour. I can help with services, bridal makeup, pricing, timings and bookings. What would you like to know?",
  },
  {
    name: 'bridal',
    keywords: ['bridal', 'bride', 'wedding', 'engagement', 'haldi', 'reception', 'trial'],
    reply: () => "✨ Our bridal makeup includes a consultation, hairstyling support and a long-lasting finish. We also do looks for engagement, haldi, reception and the wedding day. Please book at least 3–4 weeks ahead (earlier in wedding season). Want to book a bridal consultation?",
    chips: ['Book appointment', 'Pricing'],
  },
  {
    name: 'pricing',
    keywords: ['price', 'pricing', 'cost', 'charge', 'charges', 'rate', 'rates', 'how much', 'fees', 'package'],
    reply: () => `Pricing depends on the service, hair length and skin type, so we share a personal quote. Message us on WhatsApp or call ${phone()} and we'll get back to you quickly.`,
    chips: ['Book appointment', 'Services'],
  },
  {
    name: 'services',
    keywords: ['service', 'services', 'offer', 'menu', 'haircut', 'facial', 'threading', 'waxing', 'makeup', 'hair', 'skin', 'cleanup'],
    reply: () => "We offer:\n• Haircuts, hair styling & hair care\n• Facials, cleanup & skin care\n• Threading, waxing & basic beauty care\n• Normal, party & engagement makeup\n• Bridal makeup 💍\nTell me which one you're interested in!",
    chips: ['Pricing', 'Bridal makeup', 'Book appointment'],
  },
  {
    name: 'hours',
    keywords: ['time', 'timing', 'timings', 'open', 'close', 'hours', 'when', 'sunday', 'working'],
    reply: () => `We're open ${hours()}. Appointments are recommended so we can give you our full attention.`,
    chips: ['Book appointment', 'Location'],
  },
  {
    name: 'location',
    keywords: ['where', 'location', 'address', 'directions', 'map', 'reach', 'located'],
    reply: () => `📍 ${address()}\nTap “Get Directions” in the Contact section of the website to open the map.`,
    chips: ['Timings', 'Book appointment'],
  },
  {
    name: 'booking',
    keywords: ['book', 'booking', 'appointment', 'slot', 'schedule', 'reserve', 'availability', 'available'],
    reply: () => `Booking is easy 😊 Fill in the “Send a Booking Request” form on the website, tap the WhatsApp button, or call ${phone()}. We'll confirm your slot personally.`,
    chips: ['Pricing', 'Timings'],
  },
  {
    name: 'contact',
    keywords: ['phone', 'call', 'number', 'contact', 'whatsapp', 'email', 'talk', 'human', 'person'],
    reply: () => `You can reach us at ${phone()} (call or WhatsApp). We'll be happy to talk to you!`,
    chips: ['Book appointment', 'Timings'],
  },
  {
    name: 'thanks',
    keywords: ['thanks', 'thank', 'thank you', 'thx', 'great'],
    reply: () => "You're most welcome! 💛 Let us know if you need anything else.",
  },
];

const FALLBACK = () => `I'm not sure I understood that 🙈 Please pick a topic below, or WhatsApp / call us on ${phone()} and the team will help you personally.`;

function getReply(message = '') {
  const text = String(message).toLowerCase().trim().slice(0, 300);
  if (!text) return { reply: intents[0].reply(), suggestions: DEFAULT_CHIPS };

  let best = null;
  let bestScore = 0;
  for (const intent of intents) {
    let score = 0;
    for (const k of intent.keywords) {
      const re = new RegExp(`(^|\\W)${k}(\\W|$)`, 'i');
      if (re.test(text)) score += k.includes(' ') ? 2 : 1;
    }
    if (score > bestScore) { best = intent; bestScore = score; }
  }
  if (!best) return { reply: FALLBACK(), suggestions: DEFAULT_CHIPS };
  return { reply: best.reply(), suggestions: best.chips || DEFAULT_CHIPS };
}

module.exports = { getReply, DEFAULT_CHIPS };
