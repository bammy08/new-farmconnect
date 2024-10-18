// app/api/products/route.ts
import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const {
      title,
      stock,
      price,
      discount,
      category,
      description,
      slug,
      imageUrl,
      location,
      city,
      priceRange,
    } = await request.json();

    const newProduct = {
      title,
      stock,
      price,
      discount,
      category,
      description,
      slug,
      imageUrl,
      location,
      city,
      priceRange,
    };

    return NextResponse.json(newProduct, { status: 201 }); // Return status 201 for successful creation
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Failed to create product',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
