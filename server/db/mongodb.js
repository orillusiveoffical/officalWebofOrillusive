import mongoose from 'mongoose';

// Serverless-optimized connection caching on global scope
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const DEFAULT_MONGODB_URI =
  'mongodb+srv://orillusiveoffical_db_user:Minhajkhan12@orillusivewebdata.n6qw5tw.mongodb.net/orillusive?retryWrites=true&w=majority';

export async function connectToDatabase() {
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  let mongoUri =
    process.env.MONGODB_URI ||
    process.env.DATABASE_URL ||
    process.env.MONGODB_URL ||
    process.env.DIRECT_URL;

  if (
    !mongoUri ||
    mongoUri === 'mongodb+srv://your_atlas_connection_string' ||
    mongoUri.includes('<db_username>') ||
    mongoUri.includes('<db_password>')
  ) {
    mongoUri = DEFAULT_MONGODB_URI;
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

