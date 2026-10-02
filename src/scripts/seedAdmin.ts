import dotenv from 'dotenv';
dotenv.config();

import dns from 'dns';
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {}

import bcrypt from 'bcryptjs';
import { connectDB, getDB } from '../lib/db/mongodb';

const seedAdmin = async (): Promise<void> => {
  try {
    await connectDB();

    const db = getDB();
    if (!db) {
      console.error('Database connection failed');
      process.exit(1);
    }

    const usersCollection = db.collection('users');

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@hdflooringca.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    const existingAdmin = await usersCollection.findOne({
      email: adminEmail,
    });

    if (existingAdmin) {
      console.log('Admin already exists.');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await usersCollection.insertOne({
      name: 'Admin',
      email: adminEmail,
      password: hashedPassword,
      profilePhoto: '',
      phone: '',
      address: '',
      role: 'admin',
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log('Admin created successfully.');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedAdmin();
