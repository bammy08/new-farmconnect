'use client';

import { CloudUpload, X } from 'lucide-react';
import TextInput from './forms/TextInput';
import { useForm } from 'react-hook-form';
import SubmitButton from './forms/SubmitButton';
import SelectInput from './forms/SelectInput';
import ImageInput from './forms/ImageInput';
import { useState } from 'react';
import { makePostRequest } from '@/lib/apiRequest';
import toast from 'react-hot-toast';

interface AddStaffFormData {
  email: string;
  name: string;
  password: string;
  phoneNumber: string;
  dateJoining: string;
  imageUrl: string;
  role: string;
}

interface AddStaffProps {
  onClose: () => void;
}

const roleOptions = [
  { id: 'admin', title: 'Admin' },
  { id: 'manager', title: 'Manager' },
  { id: 'staff', title: 'Staff' },
];

export default function AddStaff({ onClose }: AddStaffProps) {
  const [imageUrls, setImageUrls] = useState<string[]>([]); // Array of image URLs
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddStaffFormData>();

  async function onSubmit(data: AddStaffFormData) {
    data.imageUrl = imageUrls[0]; // Use the first uploaded image URL

    console.log(data);

    await makePostRequest(
      setLoading,
      'api/staff', // Update the endpoint for staff members
      data,
      'Staff Member',
      reset
    );
    setImageUrls([]); // Reset image URLs after submission
  }

  return (
    <section className="h-full w-full p-6 overflow-y-auto">
      {/* Title Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-slate-50">
            Add Staff Member
          </h2>
          <p className="text-gray-500 dark:text-slate-50">
            Add staff member details here.
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
            label="Full Name"
            name="name"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Email"
            name="email"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Password"
            name="password"
            type="password"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Phone Number"
            name="phoneNumber"
            type="number"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Date of Joining"
            name="dateJoining"
            type="date"
            register={register}
            errors={errors}
            className="w-full"
          />
          <SelectInput
            register={register}
            label="Role"
            name="role"
            options={roleOptions} // Options for staff roles
            className="w-full mt-1"
          />
          <ImageInput
            label="Profile Image"
            imageUrls={imageUrls} // Use imageUrls array
            setImageUrls={setImageUrls} // Update image URLs
            endpoint="imageUploader"
          />
        </div>
        <SubmitButton isLoading={loading} title="Add Staff Member" />
      </form>
    </section>
  );
}
