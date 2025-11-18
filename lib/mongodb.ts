import mongoose from 'mongoose'

// Get MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI

// Cache for connection (avoids multiple connections in development)
let cached = global.mongoose || { conn: null, promise: null }

if (!global.mongoose) {
  global.mongoose = cached
}

// Connect to MongoDB
async function connectDB() {
  // Validate that URI is configured
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined. Please add it to your .env.local file')
  }

  // If there's already a connection, return it
  if (cached.conn) {
    return cached.conn
  }

  // If there's no connection promise, create one
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose)
  }

  try {
    // Wait for connection to complete
    cached.conn = await cached.promise
  } catch (e) {
    // If it fails, clear the promise
    cached.promise = null
    throw e
  }

  return cached.conn
}

// Global type for cache
declare global {
  var mongoose: {
    conn: typeof mongoose | null
    promise: Promise<typeof mongoose> | null
  }
}

export default connectDB
