'use client';

import { useState, useEffect, useRef } from 'react';
import { LogOutIcon, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FiSearch,
  FiHelpCircle,
  FiMail,
  FiPhone,
  FiMessageCircle,
} from 'react-icons/fi';
import { MdMenu, MdOutlinePerson4 } from 'react-icons/md';
import { ModeToggle } from '../ModeToggle';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { makeGetRequest } from '@/lib/apiRequest';
import { getData } from '@/lib/getData';
import { signOut, useSession } from 'next-auth/react';
import Loading from '@/app/loading';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { DashboardIcon } from '@radix-ui/react-icons';
import { FaRegUser } from 'react-icons/fa';

export default function Navbar() {
  const { data: session, status } = useSession();
  if (status === 'loading') {
    <Loading />;
  }

  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const helpRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState<{ id: string; title: string }[]>(
    []
  ); // State to hold categories

  const toggleHelpMenu = () => {
    setIsHelpOpen((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (helpRef.current && !helpRef.current.contains(event.target as Node)) {
        setIsHelpOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Fetch categories using getData
  useEffect(() => {
    async function fetchCategories() {
      setLoading(true); // Start loading
      try {
        const data =
          await getData<{ id: string; title: string }[]>('categories'); // Use your getData function
        setCategories(data || []); // Set categories or an empty array
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false); // Stop loading
      }
    }

    fetchCategories(); // Fetch categories on mount
  }, []);

  return (
    <header className="z-[60] sticky top-0 bg-white dark:bg-slate-700 shadow-lg text-slate-800 dark:text-slate-50">
      {/* Mobile View */}
      <div className="lg:hidden px-4 py-2 flex items-center justify-between">
        <Link href="/">
          <Image src="/images/logo.png" width={150} height={150} alt="logo" />
        </Link>
        <div className="flex items-center justify-center gap-2">
          <button onClick={toggleMobileMenu}>
            <MdMenu size={24} />
          </button>
          <button className="bg-yellow-500 px-4 py-2 rounded text-sm font-semibold flex items-center">
            <ShoppingCart />
            (0)
          </button>
        </div>
      </div>
      <div className=" lg:hidden flex items-center mb-4 px-4 py-2">
        <form className="relative w-full">
          <input
            type="text"
            placeholder="Search for products, brands..."
            className="w-full rounded-md px-4 py-2 text-gray-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            type="submit"
            className="absolute right-0 top-0 h-full bg-yellow-500 text-white px-4 py-2 rounded-md flex items-center justify-center"
          >
            <FiSearch size={20} />
          </button>
        </form>
      </div>
      {isMobileMenuOpen && (
        <div className="bg-gray-100 dark:bg-slate-700 px-4 py-4 space-y-4">
          {/* Seller and Login Buttons */}
          {status === 'authenticated' ? (
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Image
                    width={100}
                    height={100}
                    src="/images/profile.jpg"
                    alt="User Avatar"
                    className="h-8 w-8 rounded-full object-cover"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white text-black shadow-lg mr-8 rounded-md">
                  <DropdownMenuItem>
                    <Link
                      className="flex items-center justify-center"
                      href="/profile"
                    >
                      <DashboardIcon className="mr-2" />
                      <span> Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Link
                      className="flex items-center justify-center"
                      href="/profile"
                    >
                      <FaRegUser className="mr-2" />
                      <span> Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <hr />
                  <DropdownMenuItem className="cursor-pointer">
                    <LogOutIcon className="mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex justify-between items-center gap-4">
              <button className="bg-yellow-500 text-white px-4 py-2 rounded-md text-sm font-semibold w-full">
                Become a Seller
              </button>
              <button className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-semibold w-full">
                Login
              </button>
            </div>
          )}

          {/* Links with Icons */}
          <nav className="grid grid-cols-2 gap-4">
            <Link
              href="/faqs"
              className="flex items-center space-x-2 hover:underline"
            >
              <FiHelpCircle size={20} />
              <span>FAQs</span>
            </Link>
            <Link
              href="/order-tracking"
              className="flex items-center space-x-2 hover:underline"
            >
              <FiSearch size={20} />
              <span>Order Tracking</span>
            </Link>
            <Link
              href="/returns"
              className="flex items-center space-x-2 hover:underline"
            >
              <FiHelpCircle size={20} />
              <span>Returns & Refunds</span>
            </Link>
            <Link
              href="/contact-support"
              className="flex items-center space-x-2 hover:underline"
            >
              <FiHelpCircle size={20} />
              <span>Contact Support</span>
            </Link>
          </nav>

          {/* Categories Section */}
          <div className="mt-6">
            <h3 className="text-sm font-bold text-gray-800 dark:text-slate-50 mb-4">
              Categories
            </h3>
            <hr />
            {loading ? (
              <p className="text-sm text-gray-600 dark:text-slate-300">
                Loading...
              </p>
            ) : (
              <ul className="space-y-2">
                {categories.map((category, index) => (
                  <li
                    key={index}
                    className="text-base text-gray-700 dark:text-slate-300"
                  >
                    {category.title}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Contact Us Section */}

          <div className="mt-6 border-t pt-4">
            <h3 className="text-sm font-bold text-gray-800 dark:text-slate-50 mb-4">
              Contact Us
            </h3>
            <hr />
            <ul className="space-y-4">
              {/* Email Support */}
              <li className="flex items-start space-x-3">
                <FiMail size={20} className="text-gray-500 mt-1" />
                <div>
                  <p className="font-medium text-gray-800 dark:text-slate-50">
                    EMAIL SUPPORT
                  </p>
                  <a
                    href="mailto:info@bamsysit.com"
                    className="text-sm text-gray-700 dark:text-slate-300 hover:underline"
                  >
                    info@bamsysit.com
                  </a>
                </div>
              </li>
              {/* Phone Support */}
              <li className="flex items-start space-x-3">
                <FiPhone size={20} className="text-gray-500 mt-1" />
                <div>
                  <p className="font-medium text-gray-800 dark:text-slate-50">
                    PHONE SUPPORT
                  </p>
                  <p className="text-sm text-gray-700 dark:text-slate-300">
                    08035812488, 0201883435
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Larger Screen View */}
      <div className="hidden lg:block">
        <div className="max-w-[1440px] mx-auto px-4 py-2 flex items-center justify-between">
          <Link href="/">
            <Image src="/images/logo.png" width={150} height={150} alt="logo" />
          </Link>

          <div className="w-1/2 mx-4">
            <form className="relative">
              <input
                type="text"
                placeholder="Search for products, brands, and categories..."
                className="w-full rounded-md px-4 py-2 text-gray-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 h-full bg-yellow-500 text-white px-4 py-2 rounded-md flex items-center justify-center"
              >
                <FiSearch size={20} />
              </button>
            </form>
          </div>

          <div className="flex items-center space-x-6">
            {status === 'authenticated' && session?.user ? (
              <div className="">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="h-8 w-8 flex items-center justify-center bg-yellow-500 text-white rounded-full font-bold cursor-pointer">
                      {/* Safely extract initials if user name is available */}
                      {
                        session.user.name
                          ? session.user.name
                              .split(' ')
                              .map((word) => word[0])
                              .join('')
                              .toUpperCase()
                          : 'NA' /* Fallback if name is not available */
                      }
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white text-black shadow-lg mr-8 rounded-md z-[3333]">
                    <DropdownMenuItem>
                      <Link
                        className="flex items-center justify-center"
                        href="/dashboard"
                      >
                        <DashboardIcon className="mr-2" />
                        <span> Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Link
                        className="flex items-center justify-center"
                        href="/profile"
                      >
                        <FaRegUser className="mr-2" />
                        <span> Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <hr />
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => signOut()}
                    >
                      <LogOutIcon className="mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex justify-between items-center gap-4">
                <Link
                  href="/seller"
                  className="text-lg font-semibold hover:underline"
                >
                  Become a Seller
                </Link>
                <Link
                  href="/login"
                  className="text-lg font-semibold hover:underline"
                >
                  <span className="flex justify-center items-center gap-1">
                    <MdOutlinePerson4 />
                    <span>Login</span>
                  </span>
                </Link>
              </div>
            )}

            <div className="relative" ref={helpRef}>
              <button
                onClick={toggleHelpMenu}
                className="flex items-center space-x-1 text-lg font-semibold hover:underline focus:outline-none"
              >
                <FiHelpCircle size={20} />
                <span>Help</span>
              </button>
              {isHelpOpen && (
                <div className="absolute right-0 mt-2 bg-white dark:bg-slate-800 shadow-lg rounded-md py-2 z-50 w-48">
                  <Link href="/faqs">
                    <div className="px-4 py-2 hover:bg-green-100 dark:hover:bg-slate-600">
                      FAQs
                    </div>
                  </Link>
                  <Link href="/order-tracking">
                    <div className="px-4 py-2 hover:bg-green-100 dark:hover:bg-slate-600">
                      Order Tracking
                    </div>
                  </Link>
                  <Link href="/returns">
                    <div className="px-4 py-2 hover:bg-green-100 dark:hover:bg-slate-600">
                      Returns & Refunds
                    </div>
                  </Link>
                  <Link href="/contact-support">
                    <div className="px-4 py-2 hover:bg-green-100 dark:hover:bg-slate-600">
                      Contact Support
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <button className="bg-yellow-500 px-4 py-2 rounded text-sm font-semibold flex items-center">
              <ShoppingCart />
              (0)
            </button>
            <ModeToggle />
          </div>
        </div>

        <div className="dark:bg-slate-500 shadow-lg bg-gray-100 text-slate-800 dark:text-slate-50 w-full">
          <div className="max-w-[1440px] mx-auto px-4 py-2 flex items-center space-x-6 overflow-x-auto relative">
            <Sheet>
              <SheetTrigger asChild>
                <button className="flex items-center space-x-1 text-lg font-semibold focus:outline-none">
                  <MdMenu size={24} />
                  <span>All Categories</span>
                </button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-64 bg-gray-100 dark:bg-slate-700 text-slate-800 dark:text-slate-50 z-[1000]"
              >
                <h2 className="text-xl font-semibold px-4 py-2 border-b dark:border-slate-600 border-gray-300">
                  Categories
                </h2>
                {loading ? (
                  <p className="text-sm text-gray-600 dark:text-slate-300">
                    Loading...
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {categories.map((category, index) => (
                      <li
                        key={index}
                        className="text-base text-gray-700 dark:text-slate-300"
                      >
                        {category.title}
                      </li>
                    ))}
                  </ul>
                )}
              </SheetContent>
            </Sheet>

            <Link
              href="/computers"
              className="text-lg font-semibold hover:underline"
            >
              Grains
            </Link>
            <Link
              href="/phones"
              className="text-lg font-semibold hover:underline"
            >
              Fruits
            </Link>
            <Link
              href="/electronics"
              className="text-lg font-semibold hover:underline"
            >
              Vegetables
            </Link>
            <Link
              href="/fashion"
              className="text-lg font-semibold hover:underline"
            >
              Poultry
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
