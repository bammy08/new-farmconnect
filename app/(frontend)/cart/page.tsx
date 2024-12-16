'use client';

import Breadcrumbs from '@/components/frontend/BreadCrumbs';
import Image from 'next/image';
import { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsPlus } from 'react-icons/bs';
import { FiMinus } from 'react-icons/fi';

// Define a type for the product
interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

const CartPage = () => {
  // Dummy products array with images
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Product 1',
      price: 20,
      quantity: 1,
      imageUrl: '/images/2.jpg',
    },
    {
      id: 2,
      name: 'Product 2',
      price: 15,
      quantity: 1,
      imageUrl: '/images/1.jpg',
    },
    {
      id: 3,
      name: 'Product 3',
      price: 30,
      quantity: 1,
      imageUrl: '/images/3.jpg',
    },
  ]);

  // Function to handle increase/decrease of quantity
  const adjustQuantity = (id: number, type: 'increase' | 'decrease') => {
    setProducts(
      products.map((product) =>
        product.id === id
          ? {
              ...product,
              quantity:
                type === 'increase'
                  ? product.quantity + 1
                  : Math.max(1, product.quantity - 1),
            }
          : product
      )
    );
  };

  // Function to delete product
  const deleteProduct = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  // Calculate total price and shipping cost
  const totalPrice = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
  const shippingCost = 5.99; // Example shipping cost
  const grandTotal = totalPrice + shippingCost;

  return (
    <div className="container mx-auto py-8">
      <Breadcrumbs />
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
        {/* Product List Section */}
        <div className="dark:bg-slate-500 shadow-lg text-slate-800 dark:text-slate-50 bg-gray-100 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Cart Items</h2>
          <ul className="space-y-4">
            {products.map((product) => (
              <li
                key={product.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div className="flex items-center">
                  <Image
                    width={200}
                    height={200}
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-md mr-4"
                  />
                  <div>
                    <span className="font-medium">{product.name}</span>
                    <span className="ml-4 text-slate-800 dark:text-slate-50">
                      ${product.price}
                    </span>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => adjustQuantity(product.id, 'decrease')}
                    className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
                  >
                    <FiMinus />
                  </button>
                  <span className="mx-2">{product.quantity}</span>
                  <button
                    onClick={() => adjustQuantity(product.id, 'increase')}
                    className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
                  >
                    <BsPlus />
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="ml-4 text-red-400 hover:text-red-800"
                  >
                    <AiOutlineDelete size={20} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Order Summary Section */}
        <div className="dark:bg-slate-500 text-slate-800 dark:text-slate-50  bg-gray-100 shadow-lg rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <div className="mb-4 flex justify-between">
            <span className="font-medium">Subtotal:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="mb-4 flex justify-between">
            <span className="font-medium">Shipping:</span>
            <span>${shippingCost.toFixed(2)}</span>
          </div>
          <div className="mb-4 flex justify-between">
            <span className="font-medium">Total:</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter coupon code"
              className="text-slate-800 dark:text-slate-50 dark:bg-slate-500 bg-slate-100 border border-gray-300 px-2 py-1 w-full rounded mb-2"
            />
            <button className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Apply Coupon
            </button>
          </div>
          <button className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
