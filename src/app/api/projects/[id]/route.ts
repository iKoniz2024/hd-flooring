import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getProjectGalleryCollection } from '@/lib/db/mongodb';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const projectsCollection = await getProjectGalleryCollection();

    let project = null;

    if (ObjectId.isValid(id)) {
      project = await projectsCollection.findOne({ _id: new ObjectId(id) });
    }

    if (!project) {
      project = await projectsCollection.findOne({ slug: id });
    }

    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: project,
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Failed to fetch project';
    console.error('GET /api/projects/[id] error:', error);
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
        { success: false, error: 'Invalid project ID' },
        { status: 400 }
      );
    }

    const projectObjectId = new ObjectId(id);
    const body = await request.json();
    const {
      title,
      category,
      propertyType,
      location,
      coverImage,
      galleryImages,
      challenge,
      solution,
      result,
    } = body;

    const projectsCollection = await getProjectGalleryCollection();
    const existing = await projectsCollection.findOne({ _id: projectObjectId });

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    const updateDoc: Record<string, unknown> = {
      updatedAt: new Date(),
    };

    if (title && typeof title === 'string') {
      updateDoc.title = title.trim();
      updateDoc.slug = title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    if (category) updateDoc.category = String(category).trim();
    if (propertyType) updateDoc.propertyType = propertyType === 'Commercial' ? 'Commercial' : 'Residential';
    if (location) updateDoc.location = String(location).trim();
    if (coverImage) updateDoc.coverImage = String(coverImage).trim();
    if (Array.isArray(galleryImages)) updateDoc.galleryImages = galleryImages;
    if (challenge !== undefined) updateDoc.challenge = String(challenge).trim();
    if (solution !== undefined) updateDoc.solution = String(solution).trim();
    if (result !== undefined) updateDoc.result = String(result).trim();

    await projectsCollection.updateOne({ _id: projectObjectId }, { $set: updateDoc });

    return NextResponse.json({
      success: true,
      message: 'Project gallery item updated successfully.',
      data: {
        _id: id,
        ...updateDoc,
      },
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Failed to update project';
    console.error('PUT /api/projects/[id] error:', error);
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
        { success: false, error: 'Invalid project ID' },
        { status: 400 }
      );
    }

    const projectObjectId = new ObjectId(id);
    const projectsCollection = await getProjectGalleryCollection();

    const existing = await projectsCollection.findOne({ _id: projectObjectId });
    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    await projectsCollection.deleteOne({ _id: projectObjectId });

    return NextResponse.json({
      success: true,
      message: 'Project gallery item deleted successfully.',
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Failed to delete project';
    console.error('DELETE /api/projects/[id] error:', error);
    return NextResponse.json(
      { success: false, error: errMessage },
      { status: 500 }
    );
  }
}
