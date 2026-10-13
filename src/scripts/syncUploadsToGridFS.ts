import dotenv from 'dotenv';
dotenv.config();

import dns from 'dns';
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {}

import fs from 'fs';
import path from 'path';
import { connectDB, uploadToGridFS, getMimeTypeFromExt } from '../lib/db/mongodb';

const syncFiles = async () => {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await connectDB();
    console.log('Connected!');

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      console.log('No public/uploads directory found.');
      process.exit(0);
    }

    const files = fs.readdirSync(uploadsDir);
    console.log(`Found ${files.length} files in public/uploads. Syncing to MongoDB Atlas GridFS...`);

    let count = 0;
    for (const file of files) {
      const filePath = path.join(uploadsDir, file);
      const stat = fs.statSync(filePath);
      if (stat.isFile()) {
        const buffer = fs.readFileSync(filePath);
        const mimeType = getMimeTypeFromExt(file);
        await uploadToGridFS(file, buffer, mimeType);
        count++;
        console.log(`[${count}/${files.length}] Uploaded: ${file}`);
      }
    }

    console.log(`Successfully synced ${count} files to MongoDB Atlas GridFS!`);
    process.exit(0);
  } catch (error) {
    console.error('Sync failed:', error);
    process.exit(1);
  }
};

syncFiles();
