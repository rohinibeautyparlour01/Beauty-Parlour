const mongoose = require('mongoose');

// Cached connection so it survives serverless invocations on Vercel
let cached = global._mongoose;
if (!cached) cached = global._mongoose = { conn: null, promise: null };

module.exports = async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is not set');
  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 8000 });
  }
  cached.conn = await cached.promise;
  return cached.conn;
};
