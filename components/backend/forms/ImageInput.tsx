import { UploadDropzone } from '@/lib/uploadthing';
import { Pencil } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import toast from 'react-hot-toast';

interface ImageInputProps {
  label: string;
  imageUrls?: string[]; // Store multiple image URLs
  setImageUrls: (urls: string[]) => void; // Setter for multiple image URLs
  className?: string;
  endpoint?: 'imageUploader' | 'productImageUploader';
}

const ImageInput: React.FC<ImageInputProps> = ({
  label,
  imageUrls = [],
  setImageUrls,
  className = 'col-span-full',
  endpoint = 'imageUploader',
}) => {
  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-4">
        <label
          htmlFor="product-images"
          className="block text-[18px] font-medium leading-6 text-gray-700 dark:text-slate-50"
        >
          {label}
        </label>
        {imageUrls.length > 0 && (
          <button
            onClick={() => setImageUrls([])} // Clear all images
            type="button"
            className="flex space-x-2 bg-slate-900 rounded-md shadow text-slate-50 py-2 px-4"
          >
            <Pencil className="w-5 h-5" />
            <span>Change Images</span>
          </button>
        )}
      </div>
      {imageUrls.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {imageUrls.map((url, index) => (
            <Image
              key={index}
              src={url}
              alt={`Uploaded image ${index + 1}`}
              width={500}
              height={367}
              className="w-full h-64 object-cover rounded-md"
            />
          ))}
        </div>
      ) : (
        <UploadDropzone
          className="bg-transparent dark:border-gray-400 ut-button:ut-uploading:bg-orange-500/50 dark:bg-transparent dark:ut-label:text-slate-50 ut-label:text-[18px] dark:ut-allowed-content:text-slate-50 ut-button:bg-orange-400 ut-button:ut-readying:bg-red-500/50 ut-allowed-content:ut-uploading:text-green-500"
          endpoint={endpoint}
          onClientUploadComplete={(res) => {
            const uploadedUrls = res.map((file) => file.url); // Handle multiple files
            setImageUrls([...imageUrls, ...uploadedUrls]); // Append new files to existing images
            toast.success('Image Upload Completed');
            console.log('Files: ', res);
            console.log('Upload Completed');
          }}
          onUploadError={(error) => {
            toast.error('Image Upload Failed');
            console.log(`ERROR! ${error.message}`);
          }}
        />
      )}
    </div>
  );
};

export default ImageInput;
