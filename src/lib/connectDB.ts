import mongoose, { Mongoose } from "mongoose";

if (!global.mongoose) {
  global.mongoose = {
    conn: null,
    promise: null,
  };
}

const cached = global.mongoose;

export async function connectDB(): Promise<Mongoose | null> {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    return null;
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
