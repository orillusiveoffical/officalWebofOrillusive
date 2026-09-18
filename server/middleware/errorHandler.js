export function errorHandler(err, req, res, next) {
  console.error('[ORILLUSIVE ENGINE ERROR]', err?.stack || err?.message || err);
  const status = typeof err?.status === 'number' ? err.status : (typeof err?.statusCode === 'number' ? err.statusCode : 500);
  
  if (res.headersSent) {
    return next(err);
  }

  const isProduction = process.env.NODE_ENV === 'production';
  const clientMessage = (status >= 500 && isProduction)
    ? 'An unexpected error occurred. Please try again later.'
    : (err?.message || 'Internal Server Error');

  res.setHeader('Content-Type', 'application/json');
  return res.status(status).json({
    success: false,
    message: clientMessage,
    error: clientMessage
  });
}
