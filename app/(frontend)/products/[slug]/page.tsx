'use client';

import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Breadcrumbs from '@/components/frontend/BreadCrumbs';
import {
  AiOutlineCar,
  AiOutlineUndo,
  AiOutlineSafetyCertificate,
} from 'react-icons/ai';
import { BsPersonCircle, BsStarFill } from 'react-icons/bs';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Static product data
const product = {
  title: 'Freshly Harvested Corn',
  price: 99.99,
  images: [
    '/images/1.jpg', // Main product image
    '/images/2.jpg', // Thumbnail 1
    '/images/3.jpg', // Thumbnail 2
    '/images/4.jpg', // Thumbnail 3
    '/images/5.jpg', // Thumbnail 4
  ],
};

export default function ProductDetailsPage() {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  const handleQuantityChange = (value: number) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };

  return (
    <div className="container mx-auto py-4">
      <Breadcrumbs />
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
        {/* Merged Section 1 & 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 dark:bg-slate-500 shadow-lg bg-gray-100 text-slate-800 dark:text-slate-50 p-4 rounded-md">
          {/* Product Images */}
          <div>
            <div className="w-full h-[400px] bg-gray-100 rounded-md overflow-hidden">
              <Image
                src={selectedImage}
                alt="Product Image"
                width={600}
                height={400}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex gap-2 mt-4">
              {product.images.map((image, idx) => (
                <div
                  key={idx}
                  className={`w-20 h-20 bg-gray-100 rounded-md overflow-hidden cursor-pointer ${
                    selectedImage === image ? 'ring-2 ring-yellow-500' : ''
                  }`}
                  onClick={() => setSelectedImage(image)}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${idx + 1}`}
                    width={100}
                    height={100}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="p-4">
            <h1 className="text-4xl font-semibold mb-2">{product.title}</h1>
            <hr />
            <p className="text-xl text-yellow-500 font-semibold mt-2 mb-2">
              NGN {product.price.toFixed(2)}
            </p>
            <hr />

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mt-6">
              <p className="text-slate-800 dark:text-slate-50 font-medium">
                Quantity:
              </p>
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  className="px-4 py-2 text-slate-800 dark:text-slate-50 hover:bg-yellow-500"
                  onClick={() => handleQuantityChange(quantity - 1)}
                >
                  -
                </button>
                <input
                  type="number"
                  className="w-12 text-center border-none focus:outline-none text-slate-800 dark:text-slate-50 dark:bg-slate-500  bg-gray-100"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(Number(e.target.value))}
                />
                <button
                  className="px-4 py-2 text-slate-800 dark:text-slate-50 hover:bg-yellow-500"
                  onClick={() => handleQuantityChange(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button className="mt-6 w-full flex items-center justify-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600">
              <ShoppingCart size={20} />
              Add to Cart
            </button>
          </div>
        </div>

        {/* Section 3: Delivery & Seller Details */}
        <div>
          {/* Delivery & Returns */}
          <div className="dark:bg-slate-500 shadow-lg bg-gray-100 text-slate-800 dark:text-slate-50 border rounded-md p-4 mb-6">
            <h2 className="text-lg font-bold mb-4">Delivery & Returns</h2>
            <div className="mb-4">
              <h3 className="flex items-center font-medium mb-1">
                <AiOutlineCar className="w-5 h-5 text-yellow-500 mr-2" />
                Delivery
              </h3>
              <p className="text-sm">
                Estimated delivery time 1-9 business days. <br />
                <span className="font-medium">Express Delivery Available</span>
              </p>
            </div>
            <div className="mb-4">
              <h3 className="flex items-center font-medium mb-1">
                <AiOutlineUndo className="w-5 h-5 text-red-500 mr-2" />
                Return Policy
              </h3>
              <p className="text-sm">
                Guaranteed 7-Day Return Policy. <br />
                For details, visit{' '}
                <span className="text-blue-500 underline">Return Policy</span>.
              </p>
            </div>
            <div>
              <h3 className="flex items-center font-medium mb-1">
                <AiOutlineSafetyCertificate className="w-5 h-5 text-green-500 mr-2" />
                Warranty
              </h3>
              <p className="text-sm">
                Warranty information unavailable for this item.
              </p>
            </div>
          </div>

          {/* Seller Information */}
          <div className="dark:bg-slate-500 shadow-lg bg-gray-100 text-slate-800 dark:text-slate-50 border rounded-md p-4">
            <h2 className="text-lg font-bold mb-4">Seller Information</h2>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                <BsPersonCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="font-medium">Perfect Living Solutions</p>
                <p className="text-sm">9 years of selling on platform</p>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-sm">
                <span className="font-medium">Number of Sales:</span> 1.74k
              </p>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div>
                <p className="text-sm">Product Quality:</p>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: '88%' }}
                  ></div>
                </div>
              </div>
              <div>
                <p className="text-sm">Delivery Rate:</p>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: '72%' }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <BsStarFill className="text-yellow-500 mr-2" />
              <p className="text-sm">
                <span className="font-medium">Merchant Reviews:</span> 4.4/5 (47
                reviews)
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        {/* Tabs Section */}
        <div className="border dark:bg-slate-500 shadow-lg bg-gray-100 text-slate-800 dark:text-slate-50 p-4 rounded-md">
          <Tabs defaultValue="overview" className="w-full">
            {/* Tabs List */}
            <TabsList className="flex border-b pb-2 justify-start">
              <TabsTrigger
                value="overview"
                className="text-sm font-medium px-4 py-2 rounded-t-md hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="description"
                className="text-sm font-medium px-4 py-2 rounded-t-md hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                Description
              </TabsTrigger>

              <TabsTrigger
                value="reviews"
                className="text-sm font-medium px-4 py-2 rounded-t-md hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                Reviews
              </TabsTrigger>
            </TabsList>

            {/* Tabs Content */}
            <TabsContent
              value="overview"
              className="pt-4 text-slate-800 dark:text-slate-50"
            >
              <p>
                This product is designed with exceptional quality to fit your
                needs. It is lightweight, durable, and comes with a sleek design
                for modern users.
              </p>
            </TabsContent>

            <TabsContent
              value="description"
              className="pt-4 text-slate-800 dark:text-slate-50"
            >
              <ul className="mt-4 list-disc list-inside">
                <li>
                  For Fitbit Sense ONLY - Specifically designed to fit Fitbit
                  Sense or Versa 3 ONLY.
                </li>
                <li>
                  Sense bands with comfortable silicone material, eco-friendly
                  and safe for your skin.
                </li>
                <li>Size: Free adjustable length (Large: 6.7-8.1 inch).</li>
                <li>
                  Silicone fastener ring designed for Fitbit Sense to prevent
                  the clasp from loosening.
                </li>
                <li>NOTE: Fitbit tracker/monitor is not included.</li>
              </ul>
            </TabsContent>

            <TabsContent
              value="reviews"
              className="pt-4 text-slate-800 dark:text-slate-50"
            >
              <p>Customer reviews will appear here when added by users.</p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
