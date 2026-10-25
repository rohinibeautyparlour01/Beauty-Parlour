
const express = require('express');
const Booking = require('../models/Booking');

const router = express.Router();

const clean = (value, max = 200) =>
  String(value ?? '').trim().slice(0, max);

// Create a booking
router.post('/', async (req, res) => {
  try {
    const data = {
      name: clean(req.body.name, 80),
      phone: clean(req.body.phone, 20),
      email: clean(req.body.email, 120),
      service: clean(req.body.service, 80),
      preferredDate: clean(req.body.preferredDate, 20),
      preferredTime: clean(req.body.preferredTime, 10),
      message: clean(req.body.message, 500),
    };

    const digits = data.phone.replace(/\D/g, '');

    if (!data.name || !data.service) {
      return res.status(400).json({
        success: false,
        message: 'Name and service are required.',
      });
    }

    if (digits.length < 10 || digits.length > 13) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid phone number.',
      });
    }

    if (data.email && !/^\S+@\S+\.\S+$/.test(data.email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email.',
      });
    }

    const booking = await Booking.create(data);

    return res.status(201).json({
      success: true,
      id: booking._id,
      message: 'Booking request submitted successfully.',
    });
  } catch (err) {
    console.error('[Booking] Error:', err.message);

    return res.status(500).json({
      success: false,
      message:
        'Something went wrong. Please try again or message us on WhatsApp.',
    });
  }
});

// Owner-only booking list
// Send the ADMIN_KEY in the x-admin-key request header.
router.get('/', async (req, res) => {
  if (
    !process.env.ADMIN_KEY ||
    req.header('x-admin-key') !== process.env.ADMIN_KEY
  ) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized',
    });
  }

  try {
    const bookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(200);

    return res.json({
      success: true,
      bookings,
    });
  } catch (err) {
    console.error('[Booking] Fetch error:', err.message);

    return res.status(500).json({
      success: false,
      message: 'Unable to fetch bookings.',
    });
  }
});

module.exports = router;
