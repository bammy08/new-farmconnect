import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex items-center justify-center flex-col min-h-screen  font-[family-name:var(--font-geist-sans)]">
      <h2>Welcome to Farmers Connect</h2>
      <Link className="my-4 underline" href={'/seller'}>
        Become a Seller
      </Link>
    </div>
  );
}
