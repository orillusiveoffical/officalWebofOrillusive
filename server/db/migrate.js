import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import User from '../models/User.js';
import Booking from '../models/Booking.js';
import Newsletter from '../models/Newsletter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });
if (!process.env.MONGODB_URI) {
  dotenv.config({ path: path.join(__dirname, '..', '..', '.env.local') });
}

async function runCodeFirstMigration() {
  console.log('🚀 Starting Code-First Database Migration for Orillusive Engine...');

  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error('❌ Error: MONGODB_URI environment variable is missing.');
    process.exit(1);
  }

  try {
    console.log('📡 Connecting to MongoDB Atlas...');
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000
    });

    console.log(`✅ Connected to MongoDB Atlas: Host=${conn.connection.host}, Database=${conn.connection.name}`);

    // Step 1: Code-First Model Index Synchronization
    console.log('\n🛠️ Step 1: Synchronizing Model Schemas & Indexes (Code-First)...');
    
    await User.init();
    await User.syncIndexes();
    console.log('  ✔ User schema & indexes synced (email unique index ensured).');

    await Booking.init();
    await Booking.syncIndexes();
    console.log('  ✔ Booking schema & indexes synced.');

    await Newsletter.init();
    await Newsletter.syncIndexes();
    console.log('  ✔ Newsletter schema & indexes synced (email unique index ensured).');

    // Step 2: Legacy Data Migration (JSON persistence to MongoDB Atlas)
    console.log('\n📦 Step 2: Checking Legacy Local Data Migration...');
    const dataDir = path.join(__dirname, '..', 'data');
    const inquiriesFile = path.join(dataDir, 'inquiries.json');

    if (fs.existsSync(inquiriesFile)) {
      const rawData = fs.readFileSync(inquiriesFile, 'utf-8');
      try {
        const inquiries = JSON.parse(rawData);
        let migratedCount = 0;
        for (const item of inquiries) {
          const exists = await Booking.findOne({ email: item.email.toLowerCase(), message: item.message });
          if (!exists) {
            await Booking.create({
              name: item.name || 'Anonymous Client',
              email: item.email.toLowerCase(),
              service: item.scope || 'General Software Consultation',
              message: item.message || 'Legacy inquiry submission',
              createdAt: item.createdAt ? new Date(item.createdAt) : new Date()
            });
            migratedCount++;
          }
        }
        console.log(`  ✔ Migrated ${migratedCount} legacy inquiry records to MongoDB Atlas.`);
      } catch (err) {
        console.warn('  ⚠️ Could not parse legacy inquiries.json:', err.message);
      }
    }

    // Step 3: Default Admin Account Provisioning
    console.log('\n🔑 Step 3: Verifying Studio Admin Account...');
    const adminEmail = 'admin@orillusive.com';
    let existingAdmin = await User.findOne({ email: adminEmail });

    if (!existingAdmin) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('OrillusiveAdmin2026!', salt);
      existingAdmin = await User.create({
        name: 'Orillusive Studio Administrator',
        email: adminEmail,
        password: hashedPassword,
        role: 'SUPER_ADMIN',
        status: 'active'
      });
      console.log(`  ✔ Default Studio Admin created (${adminEmail}).`);
    } else {
      existingAdmin.role = 'SUPER_ADMIN';
      existingAdmin.status = 'active';
      await existingAdmin.save();
      console.log(`  ✔ Studio Admin account verified & set to SUPER_ADMIN (${adminEmail}).`);
    }

    // Step 4: Final Telemetry Stats
    console.log('\n📊 Step 4: Final Database Status Report:');
    const userCount = await User.countDocuments();
    const bookingCount = await Booking.countDocuments();
    const newsletterCount = await Newsletter.countDocuments();

    console.log(`  • Users Collection: ${userCount} document(s)`);
    console.log(`  • Bookings Collection: ${bookingCount} document(s)`);
    console.log(`  • Newsletters Collection: ${newsletterCount} document(s)`);

    console.log('\n🎉 Code-First Database Migration Completed Successfully!');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('❌ Migration Error:', err);
    process.exit(1);
  }
}

runCodeFirstMigration();
