import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getCategoriesCollection, getProductsCollection } from '@/lib/db/mongodb';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid category ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { name, image, isActive } = body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json(
        { success: false, error: 'Category name is required' },
        { status: 400 }
      );
    }

    if (!image || typeof image !== 'string' || !image.trim()) {
      return NextResponse.json(
        { success: false, error: 'Category cover image is required' },
        { status: 400 }
      );
    }

    const trimmedName = name.trim();
    const categoriesCollection = await getCategoriesCollection();
    const categoryId = new ObjectId(id);

    // Check if category exists
    const currentCategory = await categoriesCollection.findOne({ _id: categoryId });
    if (!currentCategory) {
      return NextResponse.json(
        { success: false, error: 'Category not found' },
        { status: 404 }
      );
    }

    // Check for duplicate name among other categories
    const duplicate = await categoriesCollection.findOne({
      _id: { $ne: categoryId },
      name: { $regex: new RegExp(`^${trimmedName.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}$`, 'i') }
    });

    if (duplicate) {
      return NextResponse.json(
        { success: false, error: 'Category name already exists' },
        { status: 400 }
      );
    }

    const updateData: Record<string, unknown> = {
      name: trimmedName,
      updatedAt: new Date(),
    };

    if (typeof image === 'string') {
      updateData.image = image.trim();
    }

    if (typeof isActive === 'boolean') {
      updateData.isActive = isActive;
    }

    await categoriesCollection.updateOne(
      { _id: categoryId },
      {
        $set: updateData,
      }
    );

    return NextResponse.json({
      success: true,
      message: 'Category updated successfully.',
      data: {
        _id: id,
        name: trimmedName,
        image: updateData.image ?? currentCategory.image,
        updatedAt: updateData.updatedAt,
      },
    });
  } catch (error: unknown) {
    if (typeof error === 'object' && error !== null && 'code' in error && (error as { code?: number }).code === 11000) {
      return NextResponse.json(
        { success: false, error: 'Category name already exists' },
        { status: 400 }
      );
    }

    const errMessage = error instanceof Error ? error.message : 'Failed to update category';
    console.error('PUT /api/categories/[id] error:', error);
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
        { success: false, error: 'Invalid category ID' },
        { status: 400 }
      );
    }

    const categoryId = new ObjectId(id);
    const categoriesCollection = await getCategoriesCollection();

    const category = await categoriesCollection.findOne({ _id: categoryId });
    if (!category) {
      return NextResponse.json(
        { success: false, error: 'Category not found' },
        { status: 404 }
      );
    }

    // Also check if any products reference this category
    const productsCollection = await getProductsCollection();
    const productCount = await productsCollection.countDocuments({ category: categoryId });

    if (productCount > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Cannot delete category: ${productCount} product(s) are using this category. Reassign or delete those products first.`,
        },
        { status: 400 }
      );
    }

    await categoriesCollection.deleteOne({ _id: categoryId });

    return NextResponse.json({
      success: true,
      message: 'Category deleted successfully.',
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Failed to delete category';
    console.error('DELETE /api/categories/[id] error:', error);
    return NextResponse.json(
      { success: false, error: errMessage },
      { status: 500 }
    );
  }
}
