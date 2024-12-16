import HeroSection from '@/components/frontend/HeroSection';
import ProductCard from '@/components/frontend/ProductCard';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session?.user);

  const products = [
    {
      title: 'Nike Air MX Super 2500',
      imageUrl:
        'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
      discount: 39,
      price: 449,
      originalPrice: 699,
      rating: 4.8,
    },
    {
      title: 'Nike Air MX Super 2500',
      imageUrl:
        'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
      discount: 39,
      price: 449,
      originalPrice: 699,
      rating: 4.8,
    },
    {
      title: 'Nike Air MX Super 2500',
      imageUrl:
        'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
      discount: 39,
      price: 449,
      originalPrice: 699,
      rating: 4.8,
    },
    {
      title: 'Adidas Sneakers Pro 3000',
      imageUrl:
        'https://images.unsplash.com/photo-1572025446094-3f2f8d1db76d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHNob2VzJTIwc2FsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
      discount: 25,
      price: 350,
      originalPrice: 469,
      rating: 4.6,
    },
    // Add more products as needed
  ];
  return (
    <div className=" min-h-screen font-[family-name:var(--font-geist-sans)]">
      <div className="mt-4">
        <HeroSection />
      </div>
      <div className="flex justify-between items-center dark:bg-slate-500 shadow-lg bg-gray-100 text-slate-800 dark:text-slate-50 rounded-md py-2 px-4 mt-4 ">
        <h1 className="text-xl">Products on Sale</h1>
        <span className="text-xl">View All</span>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-1 mb-5 ">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
}
