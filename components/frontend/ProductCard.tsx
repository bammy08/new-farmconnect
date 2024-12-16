import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { AiFillStar } from 'react-icons/ai';

interface Product {
  title: string;
  imageUrl: string;
  discount?: number;
  price: number;
  originalPrice?: number;
  rating: number;
}

const ProductCard = ({ product }: { product: Product }) => {
  const { title, imageUrl, discount, price, originalPrice, rating } = product;

  return (
    <div className="relative flex w-full max-w-[400px] flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      <Link
        href="#"
        className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
      >
        <Image
          className="object-cover w-full"
          src={imageUrl}
          alt="product image"
          width={300}
          height={300}
        />
        {discount && (
          <span className="absolute top-0 left-0 m-2 rounded-full bg-yellow-500 px-2 text-center text-sm font-medium text-white">
            {discount}% OFF
          </span>
        )}
      </Link>
      <div className="mt-4 px-5 pb-5">
        <Link href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900">
            {title}
          </h5>
        </Link>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold text-gray-900">${price}</span>
            {originalPrice && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                ${originalPrice}
              </span>
            )}
          </p>
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, index) => (
              <AiFillStar
                key={index}
                className={`h-5 w-5 ${
                  index < Math.floor(rating)
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="ml-2 text-xs font-semibold bg-yellow-100 px-2.5 py-0.5 rounded">
              {rating.toFixed(1)}
            </span>
          </div>
        </div>
        <Link
          href="#"
          className="flex items-center justify-center rounded-md bg-green-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-blue-300 gap-2"
        >
          <span>
            <ShoppingCart />
          </span>
          <span>Add to cart</span>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
