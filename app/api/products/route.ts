// app/api/products/route.ts
import { NextResponse, NextRequest } from 'next/server';
import db from '@/lib/db'; // Make sure this imports your Prisma client

export async function POST(request: NextRequest) {
  try {
    const {
      title,
      stock,
      price,
      discount,
      categoryId,
      description,
      slug,
      imageUrls,
      location,
      city,
      priceRange,
      userId,
    } = await request.json();

    // Create the new product in the database
    const newProduct = await db.product.create({
      data: {
        title,
        stock: Number(stock), // Ensure the stock is a number
        price: parseFloat(price), // Ensure the price is a float
        discount: parseFloat(discount), // Ensure the discount is a float
        category: { connect: { id: categoryId } },
        description,
        slug,
        imageUrl: imageUrls,
        location,
        city,
        priceRange,
        user: { connect: { id: userId } }, // Connect the user
      },
    });

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

// Handle GET requests to fetch products
export async function GET(request: NextRequest) {
  try {
    const products = await db.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    }); // Fetch products from your database
    return NextResponse.json(products, { status: 200 }); // Return categories with a 200 status
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Failed to fetch products',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
