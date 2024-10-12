'use client';

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { FiBell, FiMenu, FiX } from 'react-icons/fi';
import { FaRegUser } from 'react-icons/fa';
// import { ModeToggle } from '../ModeToggle';
import { Badge } from '../ui/badge';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '../ui/dropdown-menu';
import { Avatar } from '../ui/avatar'; // Import your Avatar component
import Image from 'next/image';
import { LogOutIcon } from 'lucide-react';
import Link from 'next/link';
import { DashboardIcon } from '@radix-ui/react-icons';
import { ModeToggle } from '../ModeToggle';

interface NavbarProps {
  setShowSidebar: (show: boolean) => void; // Function to toggle the sidebar
  showSidebar: boolean; // Boolean state for showing sidebar
}

const Navbar: React.FC<NavbarProps> = ({ setShowSidebar, showSidebar }) => {
  const [isSignedIn, setIsSignedIn] = useState(true); // Local state for sign-in status
  const count = 5; // Set the count to 5

  const toggleSignIn = () => {
    setIsSignedIn((prev) => !prev); // Toggle sign-in status
  };

  return (
    <div className="flex items-center justify-between sticky top-0 z-40 w-full h-20 px-8 py-4 dark:bg-slate-700 bg-white shadow-lg text-white overflow-hidden">
      {/* Left Menu Icon */}
      <div
        onClick={() => setShowSidebar(!showSidebar)} // Toggle sidebar on click
        className="flex-shrink-0 text-green-400 block md:hidden" // Hide on medium screens and above
      >
        {showSidebar ? (
          <FiX className="h-7 w-7" /> // Close icon when sidebar is open
        ) : (
          <FiMenu className="h-7 w-7" /> // Menu icon when sidebar is closed
        )}
      </div>

      {/* Right Buttons */}
      <div className="flex items-center space-x-4 ml-auto">
        <ModeToggle />
        <div className="relative inline-block">
          {/* Notification Icon */}
          <Button variant="ghost" size="icon" className="relative">
            <FiBell className="h-7 w-7 text-green-400 mr-3" />
          </Button>

          {/* Notification Count Badge */}
          {count > 0 && (
            <Badge
              className="absolute -top-1 -right-1 flex items-center justify-center h-6 w-6 text-xs text-white bg-red-600 rounded-full"
              // variant="secondary"
            >
              {count}
            </Badge>
          )}
        </div>

        {/* User Avatar / Login Dropdown */}
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {isSignedIn ? (
                <Image
                  width={100}
                  height={100}
                  src="/images/profile.jpg"
                  alt="User Avatar"
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <Avatar className="h-8 w-8 rounded-full" />
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="bg-white text-black shadow-lg mr-8 rounded-md"
              style={{ borderRadius: '6px' }}
            >
              {isSignedIn ? (
                <>
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
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={toggleSignIn}
                  >
                    <LogOutIcon className="mr-2" />
                    Logout
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem onClick={toggleSignIn}>
                  <FaRegUser className="mr-2" />
                  Login
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
