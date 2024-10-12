import { UploadDropzone } from '@/lib/uploadthing';
import { Pencil } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import toast from 'react-hot-toast';

interface ImageInputProps {
  label: string;
  imageUrl?: string;
  setImageUrl: (url: string) => void;
  className?: string;
  endpoint?: 'imageUploader'; // Set this explicitly as "imageUploader"
}

const ImageInput: React.FC<ImageInputProps> = ({
  label,
  imageUrl = '',
  setImageUrl,
  className = 'col-span-full',
  endpoint = 'imageUploader', // Default to "imageUploader"
}) => {
  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-4">
        <label
          htmlFor="course-image"
          className="block text-[18px] font-medium leading-6 text-gray-700 dark:text-slate-50"
        >
          {label}
        </label>
        {imageUrl && (
          <button
            onClick={() => setImageUrl('')}
            type="button"
            className="flex space-x-2 bg-slate-900 rounded-md shadow text-slate-50 py-2 px-4"
          >
            <Pencil className="w-5 h-5" />
            <span>Change Image</span>
          </button>
        )}
      </div>
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="Item image"
          width={1000}
          height={667}
          className="w-full h-64 object-cover rounded-md"
        />
      ) : (
        <UploadDropzone
          className="bg-transparent dark:border-gray-400 ut-button:ut-uploading:bg-orange-500/50 dark:bg-transparent dark:ut-label:text-slate-50 ut-label:text-[18px] dark:ut-allowed-content:text-slate-50 ut-button:bg-orange-400 ut-button:ut-readying:bg-red-500/50 ut-allowed-content:ut-uploading:text-green-500"
          endpoint={endpoint}
          onClientUploadComplete={(res) => {
            setImageUrl(res[0].url);
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
