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

// Validation schema using Zod
const registrationSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
});

// Form input types
type FormInputs = z.infer<typeof registrationSchema>;

type RegisterFormProps = {
  role: 'USER' | 'FARMER';
};

const RegisterForm: React.FC<RegisterFormProps> = ({ role }) => {
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
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      console.log(data);
      setLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const payload = { ...data, role }; // Include role in the payload
      const response = await fetch(`${baseUrl}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();
      console.log('Response Data:', responseData); // Log the response for debugging

      if (response.ok) {
        setLoading(false);
        toast.success('User Created Successfully');
        reset();

        if (responseData.data && responseData.data.id) {
          // Check role and redirect accordingly
          if (responseData.data.role === 'FARMER') {
            // Redirect to onboarding page with the user id
            router.push('/verify-email');
          } else if (responseData.data.role === 'USER') {
            // Redirect to login page for users
            router.push('/');
          }
        } else {
          toast.error('User ID is missing, please try again.');
        }
      } else {
        setLoading(false);
        if (response.status === 409) {
          toast.error('User with this Email already exists');
        } else {
          console.error('Server Error:', responseData.message);
          toast.error('Oops Something Went wrong');
        }
      }
    } catch (error) {
      setLoading(false);
      console.error('Network Error:', error);
      toast.error('Something Went wrong, Please Try Again');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label
          htmlFor="username"
          className="block text-[18px] font-medium leading-6 text-gray-900 mb-2 dark:text-slate-50"
        >
          Full Name
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          placeholder="Enter your name"
          className="block w-full dark:bg-transparent dark:text-slate-50 rounded-md border-0 py-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-[18px] sm:leading-6"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>
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
      <div className="flex items-center w-full gap-3">
        <input
          className="w-4 h-4 text-green-600 overflow-hidden rounded border-green-700"
          type="checkbox"
          name="checkbox"
          id="checkbox"
        />
        <p>I agree to privacy policy and terms</p>
      </div>

      <SubmitButton isLoading={loading} title="Register" />
      <div className="flex  gap-2 mt-3">
        <p>Already registered?</p>
        <Link className="text-green-300 font-bold" href={'/login'}>
          Login
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
