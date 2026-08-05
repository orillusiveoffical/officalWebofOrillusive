import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '..', 'data');

const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');
const NEWSLETTER_FILE = path.join(DATA_DIR, 'newsletters.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(INQUIRIES_FILE)) {
  fs.writeFileSync(INQUIRIES_FILE, JSON.stringify([]));
}
if (!fs.existsSync(NEWSLETTER_FILE)) {
  fs.writeFileSync(NEWSLETTER_FILE, JSON.stringify([]));
}

export function saveInquiry(data) {
  const raw = fs.readFileSync(INQUIRIES_FILE, 'utf-8');
  const list = JSON.parse(raw);
  const newItem = {
    id: 'INQ-' + Date.now().toString(36).toUpperCase(),
    ...data,
    createdAt: new Date().toISOString()
  };
  list.unshift(newItem);
  fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(list, null, 2));
  return newItem;
}

export function saveSubscriber(email) {
  const raw = fs.readFileSync(NEWSLETTER_FILE, 'utf-8');
  const list = JSON.parse(raw);
  if (list.some(s => s.email === email)) {
    return { email, duplicate: true };
  }
  const newItem = { email, createdAt: new Date().toISOString() };
  list.unshift(newItem);
  fs.writeFileSync(NEWSLETTER_FILE, JSON.stringify(list, null, 2));
  return newItem;
}
