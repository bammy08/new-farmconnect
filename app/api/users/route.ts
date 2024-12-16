import db from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { Resend } from 'resend';
import { v4 as uuidv4 } from 'uuid';
import base64url from 'base64url';
import EmailTemplate from '@/components/email-template';

export async function POST(request: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { name, email, password, role } = await request.json();
    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        {
          data: null,
          message: 'User already exists',
        },
        { status: 409 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    //Generate Token
    // Generate a random UUID (version 4)
    const rawToken = uuidv4();
    console.log(rawToken);
    // Encode the token using Base64 URL-safe format
    const token = base64url.encode(rawToken);
    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        verificationToken: token,
      },
    });
    console.log(newUser);

    // Send email verification only if the role is 'farmer'
    if (role === 'FARMER') {
      const userId = newUser.id;
      const linkText = 'Verify Account';
      const redirectUrl = `onboarding/${userId}?token=${token}`;
      const sendMail = await resend.emails.send({
        from: 'FarmConnect <info@jazzafricaadventures.com>',
        to: email,
        subject: 'Account Verification from FarmConnect',
        react: EmailTemplate({ name, redirectUrl, linkText }),
      });
      console.log(sendMail);
      //Upon Click redirect them to the login

      console.log(token);
      return NextResponse.json(
        {
          data: newUser,
          message: 'User Created Successfully',
        },
        { status: 201 }
      );
    }

    return NextResponse.json(
      {
        data: newUser,
        message: 'User Created Successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error,
        message: 'Something went wrong',
      },
      { status: 500 }
    );
  }
}

// Handle GET requests to users
export async function GET(request: NextRequest) {
  try {
    const users = await db.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    }); // Fetch users from your database
    return NextResponse.json(users, { status: 200 }); // Return users with a 200 status
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Failed to fetch users',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
