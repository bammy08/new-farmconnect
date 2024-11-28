'use client';

import { X } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import TextInput from './forms/TextInput';
import TextareaInput from './forms/TextAreaInput';
import SubmitButton from './forms/SubmitButton';
import { makePostRequest } from '@/lib/apiRequest';
import { useRouter } from 'next/navigation';

interface AddDiscountProps {
  onClose: () => void;
}

interface AddDiscountFormData {
  title: string;
  code: string; // Added the code field here
  expiryDate: string; // Added expiryDate field
}

const AddDiscount = ({ onClose }: AddDiscountProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    setValue, // Added to set the generated code
    formState: { errors },
  } = useForm<AddDiscountFormData>();

  const generateDiscountCode = (length: number): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  useEffect(() => {
    // Generate the discount code when the component mounts
    const generatedCode = generateDiscountCode(8); // Generate an 8-character code
    setValue('code', generatedCode); // Set the generated code in the form
  }, [setValue]);

  async function onSubmit(data: AddDiscountFormData) {
    try {
      setLoading(true);
      await makePostRequest(
        setLoading,
        'api/discount',
        data,
        'Discount',
        reset
      );
      router.push('/dashboard');
      console.log('Discount created successfully:', data);
    } catch (error) {
      console.error('Failed to create discount:', error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <section className="h-full w-full p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-slate-50">
            Add Discount
          </h2>
          <p className="text-gray-500 dark:text-slate-50">
            Add your discount and necessary information from here.
          </p>
        </div>

        <button
          onClick={onClose}
          className="text-gray-500 bg-gray-200 p-3 rounded-full"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-slate-50 border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-800 mx-auto my-3"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label="Discount Title"
            name="title"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Discount Code"
            name="code"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Discount Expiry Date"
            name="expiryDate" // Change this to expiryDate
            type="date"
            register={register}
            errors={errors}
          />
        </div>
        <SubmitButton isLoading={loading} title="Add Discount" />
      </form>
    </section>
  );
};

export default AddDiscount;
