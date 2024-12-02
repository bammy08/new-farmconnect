import HeroSection from '@/components/frontend/HeroSection';
import ProductCard from '@/components/frontend/ProductCard';
import Link from 'next/link';

export default function Home() {
  const products = [
    {
      title: 'Nike Air MX Super 2500 - Red',
      imageUrl:
        'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
      discount: 39,
      price: 449,
      originalPrice: 699,
      rating: 4.8,
    },
    {
      title: 'Adidas Sneakers Pro 3000 - Blue',
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
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-4 mb-5">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
}
