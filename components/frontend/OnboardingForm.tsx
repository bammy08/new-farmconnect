'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { location } from '@/app/data'; // Only use the location data, as categories come from the database

import { makePostRequest } from '@/lib/apiRequest';
import TextInput from '../backend/forms/TextInput';
import SelectInput from '../backend/forms/SelectInput';
import ImageInput from '../backend/forms/ImageInput';
import SubmitButton from '../backend/forms/SubmitButton';

type AddFarmerFormData = {
  id?: string;
  name: string;
  email: string;
  phone: number;
  profileImageUrl: string;
  location: string;
  city: string;
};

interface OnboardingFormProps {
  user?: AddFarmerFormData; // Accept the user data as `User | null`
}

const OnboardingForm: React.FC<OnboardingFormProps> = ({ user }) => {
  const [profileImageUrl, setProfileImageUrl] = useState<string[]>([]); // Array of image URLs
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Initialize the router
  const [selectedState, setSelectedState] = useState<string | null>(null);

  // Default values for the form (prefilled with user data)
  const defaultValues = user
    ? {
        name: user.name,
        email: user.email,
        phone: user.phone || '', // Use empty string or a fallback value if undefined
        profileImageUrl: '', // Add default logic for profileImageUrl if available
        location: user.location || '', // Prefill with location data if available
        city: user.city || '', // Prefill with city if available
      }
    : {
        name: '',
        email: '',
        phone: '',
        profileImageUrl: '',
        location: '',
        city: '',
      };

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
    setValue, // Use setValue to programmatically set form values
    formState: { errors },
  } = useForm<AddFarmerFormData>();

  // Prefill form values if user data is available
  useEffect(() => {
    if (user) {
      // Prefill each field with the user data
      setValue('name', user.name);
      setValue('email', user.email);
      setValue('phone', user.phone);
      setValue('location', user.location);
      setValue('city', user.city);

      // Prefill the profile image URL
      // setProfileImageUrl([user.profileImageUrl]);

      // Set the selected state for location
      setSelectedState(user.location);
    }
  }, [user, setValue]);

  async function onSubmit(data: AddFarmerFormData) {
    try {
      setLoading(true);
      data.profileImageUrl = profileImageUrl[0]; // Use the first uploaded image URL

      const payload = {
        ...data,
        userId: user?.id, // Attach the user ID to the payload
      };

      if (!payload.userId) {
        throw new Error('User ID is missing.');
      }

      // Make the POST request to the farmers API
      await makePostRequest(
        setLoading,
        'api/farmers', // Specify the endpoint for farmers
        payload, // The form data
        'Farmers', // Resource name for success message
        reset // Pass the reset function to clear the form after submission
      );

      console.log('Account created successfully:', data);
      router.push('/dashboard/farmers');
    } catch (error) {
      console.error('Failed to create account:', error);
    } finally {
      setLoading(false); // Ensure loading is set back to false after the request completes
    }
    setProfileImageUrl([]); // Reset image URLs
  }

  return (
    <section className="h-full w-full p-6 overflow-y-auto">
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
            type="tel"
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
            className="w-full mt-1"
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

export default OnboardingForm;
