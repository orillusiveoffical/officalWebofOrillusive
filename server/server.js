import app from './app.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`⚡ [ORILLUSIVE ENGINE] API Telemetry Server running at http://localhost:${PORT}`);
});
