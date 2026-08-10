import mongoose from 'mongoose';

let cachedConn: typeof mongoose | null = null;
let cachedPromise: Promise<typeof mongoose> | null = null;

const DEFAULT_MONGODB_URI =
  'mongodb+srv://orillusiveoffical_db_user:Minhajkhan12@orillusivewebdata.n6qw5tw.mongodb.net/orillusive?retryWrites=true&w=majority';

export async function connectToDatabase() {
  if (cachedConn && mongoose.connection.readyState === 1) {
    return cachedConn;
  }

  let mongoUri = process.env.MONGODB_URI;

  if (
    !mongoUri ||
    mongoUri === 'mongodb+srv://your_atlas_connection_string' ||
    mongoUri.includes('<db_username>') ||
    mongoUri.includes('<db_password>')
  ) {
    mongoUri = DEFAULT_MONGODB_URI;
  }

  if (!cachedPromise) {
    cachedPromise = mongoose
      .connect(mongoUri, {
        serverSelectionTimeoutMS: 8000
      })
      .then((m) => {
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

