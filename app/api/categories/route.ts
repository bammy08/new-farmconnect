// app/api/categories/route.ts
import db from '@/lib/db';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { title, slug, imageUrl, description } = await request.json();
    const newCategory = await db.category.create({
      data: {
        title,
        slug,
        imageUrl,
      },
    });
    return NextResponse.json(newCategory, { status: 201 }); // Return status 201 for successful creation
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Failed to create category',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Handle GET requests to fetch categories
export async function GET(request: NextRequest) {
  try {
    const categories = await db.category.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    }); // Fetch categories from your database
    return NextResponse.json(categories, { status: 200 }); // Return categories with a 200 status
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Failed to fetch categories',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
