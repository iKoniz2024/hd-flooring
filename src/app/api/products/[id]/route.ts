import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDb, getProductsCollection, getCategoriesCollection } from '@/lib/db/mongodb';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    const productId = new ObjectId(id);
    const db = await getDb();

    const result = await db
      .collection('products')
      .aggregate([
        { $match: { _id: productId } },
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
      ])
      .toArray();

    if (!result || result.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    const item = result[0];
    const formatted = {
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
    };

    return NextResponse.json({
      success: true,
      data: formatted,
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Failed to fetch product';
    console.error('GET /api/products/[id] error:', error);
    return NextResponse.json(
      { success: false, error: errMessage },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid product ID' },
        { status: 400 }
      );
    }

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

    const additionalImages: string[] = Array.isArray(images)
      ? images.filter((img): img is string => typeof img === 'string' && Boolean(img.trim())).map((img) => img.trim())
      : [];

    const productId = new ObjectId(id);
    const categoryObjectId = new ObjectId(category);

    const categoriesCollection = await getCategoriesCollection();
    const categoryExists = await categoriesCollection.findOne({ _id: categoryObjectId });
    if (!categoryExists) {
      return NextResponse.json(
        { success: false, error: 'Selected category does not exist' },
        { status: 400 }
      );
    }

    const productsCollection = await getProductsCollection();
    const productExists = await productsCollection.findOne({ _id: productId });
    if (!productExists) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    const updatedAt = new Date();
    await productsCollection.updateOne(
      { _id: productId },
      {
        $set: {
          title: title.trim(),
          description: description.trim(),
          category: categoryObjectId,
          price: numericPrice,
          image: image.trim(),
          images: additionalImages,
          updatedAt: updatedAt,
        },
      }
    );

    return NextResponse.json({
      success: true,
      message: 'Product updated successfully.',
      data: {
        _id: id,
        title: title.trim(),
        description: description.trim(),
        category: categoryObjectId,
        price: numericPrice,
        image: image.trim(),
        images: additionalImages,
        updatedAt: updatedAt,
      },
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Failed to update product';
    console.error('PUT /api/products/[id] error:', error);
    return NextResponse.json(
      { success: false, error: errMessage },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    const productId = new ObjectId(id);
    const productsCollection = await getProductsCollection();

    const product = await productsCollection.findOne({ _id: productId });
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    await productsCollection.deleteOne({ _id: productId });

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully.',
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Failed to delete product';
    console.error('DELETE /api/products/[id] error:', error);
    return NextResponse.json(
      { success: false, error: errMessage },
      { status: 500 }
    );
  }
}
