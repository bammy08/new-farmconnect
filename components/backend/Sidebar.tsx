'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  MdOutlineDashboard,
  MdOutlinePeopleAlt,
  MdOutlineSettings,
  MdOutlineShoppingCart,
} from 'react-icons/md';
import { GrCatalog } from 'react-icons/gr';
import { SiMarketo } from 'react-icons/si';
import { GiFarmer } from 'react-icons/gi';
import { usePathname } from 'next/navigation';
import { LogOutIcon } from 'lucide-react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

interface SidebarProps {
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ showSidebar, setShowSidebar }) => {
  const pathname = usePathname();
  const [isCatalogueOpen, setIsCatalogueOpen] = useState(false); // State to toggle the catalogue menu

  const siderbarLinks = [
    {
      title: 'Catalogue',
      icon: GrCatalog,
      href: '/dashboard/catalogue',
      children: [
        { title: 'Products', href: '/dashboard/products' },
        { title: 'Categories', href: '/dashboard/categories' },
      ],
    },
    {
      title: 'Customers',
      icon: MdOutlinePeopleAlt,
      href: '/dashboard/customers',
    },
    {
      title: 'Markets',
      icon: SiMarketo,
      href: '/dashboard/markets',
    },
    {
      title: 'Farmers',
      icon: GiFarmer,
      href: '/dashboard/farmers',
    },
    {
      title: 'Orders',
      icon: MdOutlineShoppingCart,
      href: '/dashboard/orders',
    },
    {
      title: 'Settings',
      icon: MdOutlineSettings,
      href: '/dashboard/settings',
    },
  ];

  return (
    <div
      className={`${
        showSidebar ? 'block' : 'hidden'
      } md:flex h-screen w-60 z-[60] sticky top-0 flex-col overflow-y-hidden space-y-6 dark:bg-slate-700 shadow-lg bg-white text-slate-800 dark:text-slate-50 p-3`}
    >
      <Link href="/dashboard" onClick={() => setShowSidebar(false)}>
        <Image
          src="/images/logo.png"
          width={150}
          height={150}
          alt="logo"
          className="mx-auto"
        />
      </Link>
      <hr />
      <div className="space-y-6 flex flex-col">
        <Link
          onClick={() => setShowSidebar(false)}
          href="/dashboard"
          className={
            pathname === '/dashboard'
              ? 'flex items-center space-x-3 border-r-[6px] border-green-700 font-medium text-[18px] bg-green-200 rounded-md text-slate-700 dark:text-slate-700 py-3 px-4'
              : 'flex items-center space-x-3 font-medium text-[18px] px-4'
          }
        >
          <MdOutlineDashboard />
          <span>Dashboard</span>
        </Link>

        {/* Render the catalogue with expand/collapse feature */}
        <div>
          <div
            className="flex items-center space-x-3 cursor-pointer px-4"
            onClick={() => setIsCatalogueOpen(!isCatalogueOpen)}
          >
            <GrCatalog />
            <span className="font-medium text-[18px]">Catalogue</span>
            {isCatalogueOpen ? (
              <FiChevronUp size={20} className="mt-2" />
            ) : (
              <FiChevronDown size={20} className="mt-2" />
            )}
          </div>
          {isCatalogueOpen && (
            <div className="ml-12 mt-2 space-y-2">
              {siderbarLinks[0].children?.map((child, index) => (
                <Link
                  onClick={() => setShowSidebar(false)}
                  key={index}
                  href={child.href}
                  className={
                    pathname === child.href
                      ? 'block text-green-700 font-medium dark:text-green-300'
                      : 'block text-slate-600 dark:text-slate-50'
                  }
                >
                  {child.title}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Render the rest of the sidebar links */}
        {siderbarLinks.slice(1).map((item, i) => {
          const Icon = item.icon;
          return (
            <Link
              onClick={() => setShowSidebar(false)}
              className={
                item.href === pathname
                  ? 'flex items-center space-x-3 border-r-[6px] border-green-700 font-medium text-[18px] bg-green-200 rounded-md text-slate-700 dark:text-slate-700 py-3 px-4'
                  : 'flex items-center space-x-3 font-medium text-[18px] px-4'
              }
              key={i}
              href={item.href}
            >
              <Icon />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </div>
      <hr />
      <button
        className="flex items-center space-x-4 bg-red-500 p-4 text-white w-full hover:bg-red-600 font-medium"
        style={{ borderRadius: '6px' }}
      >
        <LogOutIcon className="text-white font-medium" />
        <span className="text-xl font-medium">Log out</span>
      </button>
    </div>
  );
};

export default Sidebar;
