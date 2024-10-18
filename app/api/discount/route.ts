// app/api/discount/route.ts
import db from '@/lib/db';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { title, code, expiryDate } = await request.json();

    // Convert expiryDate string to a valid Date object
    const expiryDateObject = new Date(expiryDate);

    const newDiscount = await db.discount.create({
      data: {
        title,
        code,
        expiryDate: expiryDateObject, // Pass the Date object instead of the string
      },
    });
    return NextResponse.json(newDiscount, { status: 201 }); // Return status 201 for successful creation
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Failed to create discount',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
