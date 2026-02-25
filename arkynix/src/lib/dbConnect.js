import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGO_URI
 console.log("MONGODB_URI:", MONGODB_URI)
if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local")
}

// Global cache (required for Next.js hot reload)
let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      maxPoolSize: 10, // optional but recommended
    })
  }

  cached.conn = await cached.promise
  return cached.conn
  
}

export default dbConnect
