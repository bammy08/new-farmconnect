'use client';

import React from 'react';
import Head from 'next/head';
import { MdEmail } from 'react-icons/md'; // Importing an email icon from React Icons
import Link from 'next/link';

const VerifyEmail = () => {
  return (
    <>
      <Head>
        <title>Email Verification</title>
        <meta
          name="description"
          content="Check your email to verify your account."
        />
      </Head>
      <div className="flex items-center justify-center  ">
        <div className="max-w-lg p-6 mb-10 mt-10 dark:bg-slate-500  bg-gray-100 rounded-lg shadow-md">
          <div className="text-center">
            {/* Email Icon */}
            <MdEmail className="w-16 h-16 mx-auto mb-4 text-green-500" />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-slate-50">
              Check Your Email
            </h1>
            <p className="mt-2 text-gray-600  dark:text-slate-50">
              We’ve sent a verification link to your email. Please check your
              inbox (and spam folder) to verify your account.
            </p>
            {/* <p className="mt-4 text-gray-800 dark:text-slate-50">
              Didn’t receive the email?{' '}
              <Link href="/resend" className="text-gree-500 hover:underline">
                Resend verification email
              </Link>
              .
            </p> */}
          </div>
          {/* <button
            onClick={() => window.location.replace('/login')}
            className="w-full px-4 py-2 mt-6 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Go to Login
          </button> */}
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
