'use client';

import Navbar from '@/components/backend/Navbar';
import Sidebar from '@/components/backend/Sidebar';
import React, { ReactNode, useState } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div className="flex">
      <div>
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      </div>
      <div className="w-full">
        <Navbar setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
        <main className="p-5 min-h-screen bg-slate-50  dark:bg-slate-700 text-white">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
