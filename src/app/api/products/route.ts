import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDb, getProductsCollection, getCategoriesCollection } from '@/lib/db/mongodb';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const db = await getDb();
    
    // Aggregation pipeline using MongoDB native $lookup
    const products = await db
      .collection('products')
      .aggregate([
        {
          $lookup: {
            from: 'categories',
            localField: 'category',
            foreignField: '_id',
            as: 'categoryDoc',
          },
        },
        {
          $unwind: {
            path: '$categoryDoc',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $sort: { createdAt: -1 },
        },
      ])
      .toArray();

    // Map result to ensure friendly output
    const formattedProducts = products.map((item) => ({
      _id: item._id,
      title: item.title,
      description: item.description,
      category: item.category,
      categoryName: item.categoryDoc ? item.categoryDoc.name : 'Uncategorized',
      price: item.price,
      image: item.image,
      images: Array.isArray(item.images) ? item.images : [],
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }));

    return NextResponse.json(
      {
        success: true,
        data: formattedProducts,
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        },
      }
    );
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Failed to fetch products';
    console.error('GET /api/products error:', error);
    return NextResponse.json(
      { success: false, error: errMessage },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, category, price, image, images } = body;

    // Validation
    if (!title || typeof title !== 'string' || !title.trim()) {
      return NextResponse.json(
        { success: false, error: 'Product title is required' },
        { status: 400 }
      );
    }

    if (!description || typeof description !== 'string' || !description.trim()) {
      return NextResponse.json(
        { success: false, error: 'Product description is required' },
        { status: 400 }
      );
    }

    if (!category || typeof category !== 'string' || !ObjectId.isValid(category)) {
      return NextResponse.json(
        { success: false, error: 'Valid category selection is required' },
        { status: 400 }
      );
    }

    const numericPrice = Number(price);
    if (isNaN(numericPrice) || numericPrice <= 0) {
      return NextResponse.json(
        { success: false, error: 'Price must be a positive number greater than 0' },
        { status: 400 }
      );
    }

    if (!image || typeof image !== 'string' || !image.trim()) {
      return NextResponse.json(
        { success: false, error: 'Product main image is required' },
        { status: 400 }
      );
    }

    // Process additional images array
    const additionalImages: string[] = Array.isArray(images)
      ? images.filter((img): img is string => typeof img === 'string' && Boolean(img.trim())).map((img) => img.trim())
      : [];

    // Verify category exists
    const categoryObjectId = new ObjectId(category);
    const categoriesCollection = await getCategoriesCollection();
    const categoryExists = await categoriesCollection.findOne({ _id: categoryObjectId });

    if (!categoryExists) {
      return NextResponse.json(
        { success: false, error: 'Selected category does not exist' },
        { status: 400 }
      );
    }

    const now = new Date();
    const productsCollection = await getProductsCollection();
    const result = await productsCollection.insertOne({
      title: title.trim(),
      description: description.trim(),
      category: categoryObjectId,
      price: numericPrice,
      image: image.trim(),
      images: additionalImages,
      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Product added successfully.',
        data: {
          _id: result.insertedId,
          title: title.trim(),
          description: description.trim(),
          category: categoryObjectId,
          price: numericPrice,
          image: image.trim(),
          images: additionalImages,
          createdAt: now,
          updatedAt: now,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Failed to create product';
    console.error('POST /api/products error:', error);
    return NextResponse.json(
      { success: false, error: errMessage },
      { status: 500 }
    );
  }
}
