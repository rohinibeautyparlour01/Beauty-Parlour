const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true, default: '' },
    service: { type: String, required: true, trim: true },
    preferredDate: { type: String, default: '' },
    preferredTime: { type: String, default: '' },
    message: { type: String, trim: true, maxlength: 500, default: '' },
    status: { type: String, enum: ['new', 'confirmed', 'completed', 'cancelled'], default: 'new' },
    whatsappSent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);
