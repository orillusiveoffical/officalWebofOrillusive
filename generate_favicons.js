import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputLogo = path.resolve(__dirname, './client/public/logo.jpg');
const publicDir = path.resolve(__dirname, './client/public');

async function generateFavicons() {
  console.log('Generating Google-compliant circular favicons from logo.jpg...');
  
  const createCircularFavicon = async (size, fileName) => {
    const circleMask = Buffer.from(
      `<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#fff"/></svg>`
    );

    return sharp(inputLogo)
      .resize(size, size, { fit: 'cover' })
      .composite([{ input: circleMask, blend: 'dest-in' }])
      .png()
      .toFile(path.join(publicDir, fileName));
  };

  // 32x32 PNG
  await createCircularFavicon(32, 'favicon-32x32.png');
  console.log('Created circular favicon-32x32.png');

  // 48x48 PNG (Google Search Favicon standard)
  await createCircularFavicon(48, 'favicon-48x48.png');
  console.log('Created circular favicon-48x48.png');

  // 96x96 PNG (Google Retina Favicon)
  await createCircularFavicon(96, 'favicon-96x96.png');
  console.log('Created circular favicon-96x96.png');

  // 180x180 PNG (Apple Touch Icon)
  await createCircularFavicon(180, 'apple-touch-icon.png');
  console.log('Created circular apple-touch-icon.png');

  // favicon.ico (using 48x48 PNG circular buffer)
  const circleMask48 = Buffer.from(
    `<svg width="48" height="48"><circle cx="24" cy="24" r="24" fill="#fff"/></svg>`
  );
  await sharp(inputLogo)
    .resize(48, 48, { fit: 'cover' })
    .composite([{ input: circleMask48, blend: 'dest-in' }])
    .png()
    .toFile(path.join(publicDir, 'favicon.ico'));
  console.log('Created circular favicon.ico');

  console.log('All circular favicons generated successfully!');
}

generateFavicons().catch(err => {
  console.error('Error generating favicons:', err);
  process.exit(1);
});
