import Navbar from '@/components/frontend/Navbar';
import React, { ReactNode } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Footer from '@/components/frontend/Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="max-w-[1440px] px-4 mx-auto">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
