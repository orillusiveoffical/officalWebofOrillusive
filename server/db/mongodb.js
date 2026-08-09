import mongoose from 'mongoose';

let cachedConn = null;
let cachedPromise = null;

export async function connectToDatabase() {
  if (cachedConn) {
    return cachedConn;
  }

  const mongoUri = process.env.MONGODB_URI;

  if (
    !mongoUri ||
    mongoUri === 'mongodb+srv://your_atlas_connection_string' ||
    mongoUri.includes('<db_username>') ||
    mongoUri.includes('<db_password>')
  ) {
    console.warn('⚠️ [ORILLUSIVE MONGO] MONGODB_URI contains unreplaced placeholders (<db_username> / <db_password>).');
    // Try local fallback
    const fallbackUri = 'mongodb://127.0.0.1:27017/orillusive';
    try {
      if (!cachedPromise) {
        cachedPromise = mongoose.connect(fallbackUri, {
          serverSelectionTimeoutMS: 3000
        });
      }
      cachedConn = await cachedPromise;
      console.log('✅ [ORILLUSIVE MONGO] Connected to local MongoDB fallback database.');
      return cachedConn;
    } catch (err) {
      console.warn('ℹ️ [ORILLUSIVE MONGO] Local MongoDB fallback unavailable. Persistence will operate in JSON/memory mode until MONGODB_URI is set.');
      return null;
    }
  }

  if (!cachedPromise) {
    cachedPromise = mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000
    }).then((m) => {
      console.log('⚡ [ORILLUSIVE MONGO ATLAS] Successfully connected to MongoDB Atlas database!');
      return m;
    });
  }

  try {
    cachedConn = await cachedPromise;
    return cachedConn;
  } catch (err) {
    console.error('❌ [ORILLUSIVE MONGO ATLAS ERROR] Failed to connect to MongoDB Atlas:', err.message);
    cachedPromise = null;
    return null;
  }
}
