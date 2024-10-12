// app/api/categories/route.ts
import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { title, slug, imageUrl, description } = await request.json();
    const newCategory = { title, slug, imageUrl, description };
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
