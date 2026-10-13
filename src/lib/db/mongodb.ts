import { MongoClient, Db, Collection, ObjectId, ServerApiVersion, GridFSBucket } from 'mongodb';
import { Readable } from 'stream';
import dns from 'dns';

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
  const currentUri = process.env.MONGODB_URI || uri;

  if (!global._mongoClientPromise) {
    client = new MongoClient(currentUri, {
      serverApi: { version: ServerApiVersion.v1, strict: false, deprecationErrors: true },
      maxPoolSize: 10,
      minPoolSize: 1,
      connectTimeoutMS: 5000,
    });
    global._mongoClientPromise = client.connect();
  }
  return global._mongoClientPromise;
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

export function getMimeTypeFromExt(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'webp':
      return 'image/webp';
    case 'svg':
      return 'image/svg+xml';
    case 'gif':
      return 'image/gif';
    case 'avif':
      return 'image/avif';
    case 'ico':
      return 'image/x-icon';
    default:
      return 'application/octet-stream';
  }
}

export async function getGridFSBucket(): Promise<GridFSBucket> {
  const database = await connectDB();
  return new GridFSBucket(database, { bucketName: 'uploads' });
}

export async function uploadToGridFS(
  filename: string,
  buffer: Buffer,
  contentType?: string
): Promise<ObjectId> {
  const cleanFilename = filename.replace(/^(\/|\\)?uploads(\/|\\)/, '').replace(/\\/g, '/');
  const mime = contentType || getMimeTypeFromExt(cleanFilename);
  const bucket = await getGridFSBucket();

  // Clean up any existing file with this clean filename
  try {
    const existing = await bucket.find({ filename: cleanFilename }).toArray();
    for (const item of existing) {
      await bucket.delete(item._id).catch(() => {});
    }
  } catch {
    // Collection might not exist yet, continue
  }

  const uploadStream = bucket.openUploadStream(cleanFilename, {
    metadata: {
      contentType: mime,
      uploadedAt: new Date(),
    },
  });

  await new Promise<void>((resolve, reject) => {
    const readable = Readable.from(buffer);
    readable
      .pipe(uploadStream)
      .on('finish', () => resolve())
      .on('error', (err) => reject(err));
  });

  return uploadStream.id;
}

export async function getFromGridFS(filename: string): Promise<{
  buffer: Buffer;
  contentType: string;
} | null> {
  const cleanFilename = filename.replace(/^(\/|\\)?uploads(\/|\\)/, '').replace(/\\/g, '/');
  const bucket = await getGridFSBucket();

  const files = await bucket
    .find({ filename: cleanFilename })
    .sort({ uploadDate: -1 })
    .limit(1)
    .toArray();

  if (!files || files.length === 0) {
    return null;
  }

  const fileDoc = files[0];
  const meta = fileDoc.metadata as Record<string, unknown> | undefined;
  const contentType =
    (typeof meta?.contentType === 'string' ? meta.contentType : '') ||
    getMimeTypeFromExt(cleanFilename);

  const downloadStream = bucket.openDownloadStream(fileDoc._id);
  const chunks: Buffer[] = [];

  for await (const chunk of downloadStream) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  return {
    buffer: Buffer.concat(chunks),
    contentType,
  };
}

export async function deleteFromGridFS(filename: string): Promise<boolean> {
  try {
    const cleanFilename = filename.replace(/^(\/|\\)?uploads(\/|\\)/, '').replace(/\\/g, '/');
    const bucket = await getGridFSBucket();
    const existing = await bucket.find({ filename: cleanFilename }).toArray();
    for (const item of existing) {
      await bucket.delete(item._id).catch(() => {});
    }
    return true;
  } catch {
    return false;
  }
}

