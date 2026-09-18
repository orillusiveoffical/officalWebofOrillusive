import mongoose from 'mongoose';

// Serverless-optimized connection caching on global scope
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  const mongoUri =
    process.env.MONGODB_URI ||
    process.env.DATABASE_URL ||
    process.env.MONGODB_URL ||
    process.env.DIRECT_URL;

  if (
    !mongoUri ||
    mongoUri.includes('<db_username>') ||
    mongoUri.includes('<db_password>') ||
    mongoUri.includes('<username>')
  ) {
    console.warn('⚠️ [ORILLUSIVE MONGO ATLAS] MONGODB_URI environment variable is not configured.');
    return null;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 8000,
      maxPoolSize: 10
    };

    cached.promise = mongoose
      .connect(mongoUri, opts)
      .then((m) => {
        console.log('⚡ [ORILLUSIVE MONGO ATLAS] Successfully connected to MongoDB Atlas database!');
        return m;
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (err) {
    console.error('❌ [ORILLUSIVE MONGO ATLAS ERROR] Failed to connect to MongoDB Atlas:', err.message);
    cached.promise = null;
    return null;
  }
}

