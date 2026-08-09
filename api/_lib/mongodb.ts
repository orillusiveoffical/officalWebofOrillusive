import mongoose from 'mongoose';

let cachedConn: typeof mongoose | null = null;
let cachedPromise: Promise<typeof mongoose> | null = null;

export async function connectToDatabase() {
  if (cachedConn) {
    return cachedConn;
  }

  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri || mongoUri === 'mongodb+srv://your_atlas_connection_string') {
    console.warn('[ORILLUSIVE VERCEL MONGO] MONGODB_URI is unconfigured in Vercel environment variables.');
    return null;
  }

  if (!cachedPromise) {
    cachedPromise = mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      bufferCommands: false,
    }).then((m) => {
      console.log('[ORILLUSIVE VERCEL MONGO ATLAS] Connected to MongoDB Atlas');
      return m;
    });
  }

  try {
    cachedConn = await cachedPromise;
    return cachedConn;
  } catch (err: any) {
    console.error('[ORILLUSIVE VERCEL MONGO ERROR]', err?.message || err);
    cachedPromise = null;
    return null;
  }
}
