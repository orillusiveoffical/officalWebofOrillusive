let cachedApp = null;

export default async function handler(req, res) {
  try {
    if (!cachedApp) {
      const appModule = await import('../server/app.js');
      cachedApp = appModule.default || appModule;
    }
    return cachedApp(req, res);
  } catch (err) {
    console.error('[VERCEL SERVERLESS FATAL ERROR]', err);
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        error: err?.message || 'Serverless Function Execution Error'
      });
    }
  }
}
