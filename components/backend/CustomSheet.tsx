'use client';

import React, { useEffect } from 'react';

interface CustomSheetProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const CustomSheet: React.FC<CustomSheetProps> = ({
  open,
  onClose,
  children,
}) => {
  useEffect(() => {
    // Disable scrolling on body when the sheet is open
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [open]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/70 z-40 transition-opacity duration-300 ease-in-out ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sheet Content */}
      <div
        className={`fixed right-0 top-0 h-full w-full sm:w-[640px] md:w-[480px] lg:w-[940px] shadow-lg z-50 flex flex-col bg-white dark:bg-slate-700 transition-transform duration-300 ease-in-out transform ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 h-full flex flex-col overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  );
};

export default CustomSheet;
