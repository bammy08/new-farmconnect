'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Link from 'next/link';
import SubmitButton from '../backend/forms/SubmitButton';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import TextInput from '../backend/forms/TextInput';
import { signIn } from 'next-auth/react';

// Validation schema using Zod
const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
});

// Form input types
type FormInputs = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: FormInputs) {
    console.log(data);
    try {
      setLoading(true);
      console.log('Attempting to sign in with credentials:', data);
      const loginData = await signIn('credentials', {
        ...data,
        redirect: false,
      });
      console.log('SignIn response:', loginData);
      if (loginData?.error) {
        setLoading(false);
        toast.error('Sign-in error: Check your credentials');
      } else {
        // Sign-in was successful
        toast.success('Login Successful');
        reset();
        router.push('/');
      }
    } catch (error) {
      setLoading(false);
      console.error('Network Error:', error);
      toast.error('It seems something is wrong with your Network');
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-[18px] font-medium leading-6 text-gray-900 mb-2 dark:text-slate-50"
        >
          Email
        </label>

        <input
          id="email"
          type="email"
          {...register('email')}
          placeholder="Enter your email"
          className="block w-full dark:bg-transparent dark:text-slate-50 rounded-md border-0 py-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-[18px] sm:leading-6"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-[18px] font-medium leading-6 text-gray-900 mb-2 dark:text-slate-50"
        >
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            {...register('password')}
            placeholder="Enter your password"
            className="block w-full dark:bg-transparent dark:text-slate-50 rounded-md border-0 py-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-[18px] sm:leading-6"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center px-2 text-green-700"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <SubmitButton isLoading={loading} title="Login" />
      <div className="flex  gap-2 mt-3">
        <p>New Here?</p>
        <Link className="text-green-300 font-bold" href={'/register'}>
          Register
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
