let cachedApp = null;

export default async function handler(req, res) {
  try {
    if (!cachedApp) {
      const appModule = await import('../server/app.js');
      cachedApp = appModule.default || appModule;
    }
    return cachedApp(req, res);
  } catch (error) {
    console.error('Serverless Entrypoint Error:', error);
    if (!res.headersSent) {
      res.setHeader('Content-Type', 'application/json');
      return res.status(500).json({
        success: false,
        message: error?.message || 'Serverless Entrypoint Error',
        error: error?.message || 'Serverless Entrypoint Error'
      });
    }
  }
}
