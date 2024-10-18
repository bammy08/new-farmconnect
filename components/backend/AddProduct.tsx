'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import TextInput from './forms/TextInput';
import SubmitButton from './forms/SubmitButton';
import { X } from 'lucide-react';
import { makePostRequest } from '@/lib/apiRequest';
import SelectInput from './forms/SelectInput';
import { farmingCategories, location } from '@/app/data';
import TextareaInput from './forms/TextAreaInput';
import ImageInput from './forms/ImageInput';

interface AddProductProps {
  onClose: () => void;
}

interface AddProductFormData {
  title: string;
  stock: number;
  price: number;
  discount: number;
  category: [];
  description: string;
  slug?: string;
  imageUrl: string;
  location: string;
  city: string;
  priceRange: string; // Add priceRange field
}

const AddProduct = ({ onClose }: AddProductProps) => {
  const [loading, setLoading] = useState(false);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  // Define price range options
  const priceRangeOptions = [
    { id: '1-10', title: '1-10' },
    { id: '10-100', title: '10-100' },
    { id: '100-500', title: '100-500' },
    { id: 'per kg', title: 'Per Kg' },
    { id: 'per basket', title: 'Per Basket' },
  ];

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
  } = useForm<AddProductFormData>();

  async function onSubmit(data: AddProductFormData) {
    try {
      setLoading(true);

      // Make the POST request to the products API
      await makePostRequest(
        setLoading,
        'api/products', // Specify the endpoint for products
        data, // The form data
        'Product', // Resource name for success message
        reset // Pass the reset function to clear the form after submission
      );

      console.log('Product created successfully:', data);
    } catch (error) {
      console.error('Failed to create product:', error);
    } finally {
      setLoading(false); // Ensure loading is set back to false after the request completes
    }
    setImageUrls([]); // Reset image URLs
  }

  return (
    <section className="h-full w-full p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-slate-50">
            Add Product
          </h2>
          <p className="text-gray-500 dark:text-slate-50">
            Add your product and necessary information from here.
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
            label="Product Name"
            name="title"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="No of Stocks"
            name="stock"
            register={register}
            errors={errors}
            className="w-full"
          />
          <SelectInput
            register={register}
            label="Price Range"
            name="priceRange"
            options={priceRangeOptions}
            className="w-full mt-1"
          />
          <TextInput
            label="Price"
            name="price"
            type="number"
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Discount"
            name="discount"
            register={register}
            errors={errors}
            className="w-full"
          />
          <SelectInput
            register={register}
            label="Category"
            name="category"
            options={farmingCategories}
            className="w-full mt-1"
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
          <TextareaInput
            label="Description"
            name="description"
            register={register}
            errors={errors}
          />
          <ImageInput
            label="Product Images"
            imageUrls={imageUrls} // Pass imageUrls as an array
            setImageUrls={setImageUrls} // Set the image URLs array
            endpoint="productImageUploader"
          />
        </div>
        <SubmitButton isLoading={loading} title="Add Product" />
      </form>
    </section>
  );
};

export default AddProduct;
