import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputLogo = path.resolve(__dirname, './client/public/logo.jpg');
const publicDir = path.resolve(__dirname, './client/public');

async function generateFavicons() {
  console.log('Generating Google-compliant favicons from logo.jpg...');
  
  // 32x32 PNG
  await sharp(inputLogo)
    .resize(32, 32, { fit: 'cover' })
    .png()
    .toFile(path.join(publicDir, 'favicon-32x32.png'));
  console.log('Created favicon-32x32.png');

  // 48x48 PNG (Google Search Favicon standard)
  await sharp(inputLogo)
    .resize(48, 48, { fit: 'cover' })
    .png()
    .toFile(path.join(publicDir, 'favicon-48x48.png'));
  console.log('Created favicon-48x48.png');

  // 96x96 PNG (Google Retina Favicon)
  await sharp(inputLogo)
    .resize(96, 96, { fit: 'cover' })
    .png()
    .toFile(path.join(publicDir, 'favicon-96x96.png'));
  console.log('Created favicon-96x96.png');

  // 180x180 PNG (Apple Touch Icon)
  await sharp(inputLogo)
    .resize(180, 180, { fit: 'cover' })
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('Created apple-touch-icon.png');

  // favicon.ico (using 48x48 PNG buffer)
  await sharp(inputLogo)
    .resize(48, 48, { fit: 'cover' })
    .toFile(path.join(publicDir, 'favicon.ico'));
  console.log('Created favicon.ico');

  console.log('All favicons generated successfully!');
}

generateFavicons().catch(err => {
  console.error('Error generating favicons:', err);
  process.exit(1);
});
