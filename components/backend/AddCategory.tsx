// components/backend/AddCategory.tsx

'use client';

import { CloudUpload, X } from 'lucide-react';
import TextInput from './forms/TextInput';
import { useForm } from 'react-hook-form';
import SubmitButton from './forms/SubmitButton';
import TextareaInput from './forms/TextAreaInput';
import { generateSlug } from '@/lib/generateSlug';

interface AddCategoryFormData {
  title: string;
  description: string;
  slug?: string;
}

interface AddCategoryProps {
  onClose: () => void;
}

export default function AddCategory({ onClose }: AddCategoryProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddCategoryFormData>();

  async function onSubmit(data: AddCategoryFormData) {
    const slug = generateSlug(data.title);
    data.slug = slug;
    console.log(data);
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
        </div>
        <SubmitButton isLoading={false} title="Add Category" />
      </form>
    </section>
  );
}
