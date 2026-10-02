import { MongoClient, Db, Collection, ObjectId, ServerApiVersion } from 'mongodb';
import dns from 'dns';

try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {}

export interface CategoryDoc {
  _id?: ObjectId;
  name: string;
  slug?: string;
  description?: string;
  image?: string;
  isActive?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductDoc {
  _id?: ObjectId;
  title: string;
  description: string;
  category: ObjectId;
  price: number;
  image: string;
  images?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserDoc {
  _id?: ObjectId;
  name?: string;
  email: string;
  password?: string;
  role: 'admin' | 'user';
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectGalleryDoc {
  _id?: ObjectId;
  slug: string;
  title: string;
  category: string;
  propertyType: 'Residential' | 'Commercial';
  location: string;
  coverImage: string;
  galleryImages?: string[];
  challenge?: string;
  solution?: string;
  result?: string;
  createdAt: Date;
  updatedAt: Date;
}

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hd-flooring';
const dbName = process.env.MONGODB_DB_NAME || 'hdFlooring';

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;
let db: Db | null = null;
let connectPromise: Promise<Db> | null = null;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

export async function getMongoClient(): Promise<MongoClient> {
  try {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
  } catch {}

  const currentUri = process.env.MONGODB_URI || uri;

  if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
      client = new MongoClient(currentUri, {
        serverApi: { version: ServerApiVersion.v1, strict: false, deprecationErrors: true },
      });
      global._mongoClientPromise = client.connect();
    }
    return global._mongoClientPromise;
  } else {
    if (!clientPromise) {
      client = new MongoClient(currentUri, {
        serverApi: { version: ServerApiVersion.v1, strict: false, deprecationErrors: true },
      });
      clientPromise = client.connect();
    }
    return clientPromise;
  }
}

export async function connectDB(): Promise<Db> {
  if (db) return db;

  if (!connectPromise) {
    connectPromise = (async () => {
      const mongoClient = await getMongoClient();
      db = mongoClient.db(dbName);
      console.log('MongoDB Connected');
      return db;
    })();
  }

  return connectPromise;
}

export async function getDb(): Promise<Db> {
  return connectDB();
}

export function getDB(): Db | null {
  return db;
}

export async function getCategoriesCollection(): Promise<Collection<CategoryDoc>> {
  const database = await connectDB();
  return database.collection<CategoryDoc>('categories');
}

export async function getProductsCollection(): Promise<Collection<ProductDoc>> {
  const database = await connectDB();
  return database.collection<ProductDoc>('products');
}

export async function getUsersCollection(): Promise<Collection<UserDoc>> {
  const database = await connectDB();
  return database.collection<UserDoc>('users');
}

export async function getProjectGalleryCollection(): Promise<Collection<ProjectGalleryDoc>> {
  const database = await connectDB();
  return database.collection<ProjectGalleryDoc>('project_gallery');
}
