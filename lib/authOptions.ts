import { AuthOptions } from 'next-auth';
import { Session, User, Account, Profile } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { compare } from 'bcryptjs';
import db from './db';

// Extend User Type
interface ExtendedUser extends User {
  id: string;
  role: string;
  emailVerified?: Date | null;
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET as string,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'jb@gmail.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('No Inputs Found');
        }

        const existingUser = await db.user.findUnique({
          where: { email: credentials.email },
        });

        if (!existingUser) {
          throw new Error('No user found');
        }

        const passwordMatch = await compare(
          credentials.password,
          existingUser.password
        );

        if (!passwordMatch) {
          throw new Error('Password Incorrect');
        }

        return {
          id: existingUser.id,
          name: existingUser.name,
          email: existingUser.email,
          role: existingUser.role,
          // image: existingUser.image,
          emailVerified: existingUser.emailVerified,
        };
      },
    }),
  ],
  callbacks: {
    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }): Promise<Session> {
      if (token) {
        session.user = {
          id: token.id as string,
          name: token.name,
          email: token.email,
          role: token.role as string,
          image: token.picture,
          emailVerified: token.emailVerified as Date | null,
        } as ExtendedUser;
      }
      return session;
    },
    async jwt({
      token,
      user,
      account,
      profile,
    }: {
      token: JWT;
      user?: User | ExtendedUser;
      account?: Account | null;
      profile?: Profile;
    }): Promise<JWT> {
      if (user && 'id' in user && 'role' in user) {
        // Include custom user properties
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.picture = user.image;
        token.emailVerified = user.emailVerified;
      }
      return token;
    },
  },
};
