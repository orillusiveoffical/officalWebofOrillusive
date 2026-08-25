export function errorHandler(err, req, res, next) {
  console.error('[ORILLUSIVE ENGINE ERROR]', err?.stack || err?.message || err);
  const status = typeof err?.status === 'number' ? err.status : (typeof err?.statusCode === 'number' ? err.statusCode : 500);
  
  if (res.headersSent) {
    return next(err);
  }

  res.setHeader('Content-Type', 'application/json');
  return res.status(status).json({
    success: false,
    message: err?.message || 'Internal Server Error',
    error: err?.message || 'Internal Server Error'
  });
}
