'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import ImageInput from './forms/ImageInput';
import SubmitButton from './forms/SubmitButton';
import TextInput from './forms/TextInput';
import { location } from '@/app/data'; // Only use the location data, as categories come from the database

import { X } from 'lucide-react';
import { makePostRequest } from '@/lib/apiRequest';
import SelectInput from './forms/SelectInput';

interface AddFarmerFormData {
  name: string;
  email: string;
  phone: number;
  profileImageUrl: string;
  location: string;
  city: string;
}

interface AddFarmerProps {
  onClose: () => void;
}

const AddFarmer = ({ onClose }: AddFarmerProps) => {
  const [profileImageUrl, setProfileImageUrl] = useState<string[]>([]); // Array of image URLs
  const [loading, setLoading] = useState(false);
  const [selectedState, setSelectedState] = useState<string | null>(null);

  // Transform the `location` object to create state options
  const stateOptions = Object.keys(location).map((state) => ({
    id: state,
    title: state,
  }));

  // Transform the selected state's cities into options
  const cityOptions = selectedState
    ? location[selectedState as keyof typeof location].map((city) => ({
        id: city,
        title: city,
      }))
    : [];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddFarmerFormData>();

  async function onSubmit(data: AddFarmerFormData) {
    try {
      setLoading(true);
      data.profileImageUrl = profileImageUrl[0]; // Use the first uploaded image URL

      // Make the POST request to the products API
      await makePostRequest(
        setLoading,
        'api/farmers', // Specify the endpoint for products
        data, // The form data
        'Farmers', // Resource name for success message
        reset // Pass the reset function to clear the form after submission
      );

      console.log('Product created successfully:', data);
    } catch (error) {
      console.error('Failed to create product:', error);
    } finally {
      setLoading(false); // Ensure loading is set back to false after the request completes
    }
    setProfileImageUrl([]); // Reset image URLs
  }

  return (
    <section className="h-full w-full p-6 overflow-y-auto">
      {/* Title Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-slate-50">
            Add Farmer
          </h2>
          <p className="text-gray-500 dark:text-slate-50">
            Add farmer details here.
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
            label="Phone Number"
            name="phone"
            type="number"
            register={register}
            errors={errors}
            className="w-full"
          />

          <SelectInput
            register={register}
            label="State"
            name="location"
            options={stateOptions}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              const state = e.target.value;
              setSelectedState(state);
            }}
            className="w-full"
          />
          {/* City Dropdown, shown only when a state is selected */}
          {selectedState && (
            <SelectInput
              register={register}
              label="City"
              name="city"
              options={cityOptions}
              className="w-full"
            />
          )}

          <ImageInput
            label="Profile Image"
            imageUrls={profileImageUrl} // Use imageUrls array
            setImageUrls={setProfileImageUrl} // Update image URLs
            endpoint="farmerImageUploader"
          />
        </div>
        <SubmitButton isLoading={loading} title="Add Farmer" />
      </form>
    </section>
  );
};

export default AddFarmer;
