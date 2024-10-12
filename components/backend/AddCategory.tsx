'use client';

import { CloudUpload, X } from 'lucide-react';
import TextInput from './forms/TextInput';
import { useForm } from 'react-hook-form';
import SubmitButton from './forms/SubmitButton';
import TextareaInput from './forms/TextAreaInput';
import { generateSlug } from '@/lib/generateSlug';
import ImageInput from './forms/ImageInput';
import { useState } from 'react';
import { makePostRequest } from '@/lib/apiRequest';
import toast from 'react-hot-toast';

interface AddCategoryFormData {
  title: string;
  description: string;
  slug?: string;
  imageUrl: string;
}

interface AddCategoryProps {
  onClose: () => void;
}

export default function AddCategory({ onClose }: AddCategoryProps) {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false); // Define loading state

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddCategoryFormData>();

  async function onSubmit(data: AddCategoryFormData) {
    const slug = generateSlug(data.title);
    data.slug = slug;
    data.imageUrl = imageUrl; // Add imageUrl to form data

    console.log(data);

    await makePostRequest(
      setLoading, // Pass the loading state setter
      'api/categories', // Specify the endpoint
      data, // The form data
      'Category', // Resource name for the success message
      reset // Pass the reset function to clear the form after submission
    );
    setImageUrl('');
  }

  return (
    <section className="h-full w-full p-6 overflow-y-auto">
      {/* Title Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-slate-50">
            Add Category
          </h2>
          <p className="text-gray-500 dark:text-slate-50">
            Add your product category and necessary information from here.
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
            label="Category Title"
            name="title"
            register={register}
            errors={errors}
          />
          <TextareaInput
            label="Category Description"
            name="description"
            register={register}
            errors={errors}
          />
          <ImageInput
            label="Category Image"
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            endpoint="imageUploader"
          />
        </div>
        <SubmitButton isLoading={loading} title="Add Category" />{' '}
        {/* Use loading state */}
      </form>
    </section>
  );
}
