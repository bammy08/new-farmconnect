'use client';

import ActionToolbar from '@/components/backend/ActionToolbar';
import AddFarmer from '@/components/backend/AddFarmer';
import CustomSheet from '@/components/backend/CustomSheet';
import Heading from '@/components/backend/Heading';
import React, { useState } from 'react';

const Farmers = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false); // State to control the Sheet visibility

  const handleExport = () => {
    console.log('Export clicked');
  };

  const handleImport = () => {
    console.log('Import clicked');
  };

  const handleBulkAction = () => {
    console.log('Bulk Action clicked');
  };

  const handleDelete = () => {
    console.log('Delete clicked');
  };

  const handleAddFarmer = () => {
    setIsSheetOpen(true); // Open the sheet when the button is clicked
  };

  return (
    <div className="px-4">
      <Heading title="Farmers" />
      <div className="mt-4">
        <ActionToolbar
          onExport={handleExport}
          onImport={handleImport}
          onBulkAction={handleBulkAction}
          onDelete={handleDelete}
          onAdd={handleAddFarmer} // Trigger sheet on click
          title="Add Farmer "
        />
      </div>

      {/* Custom Sheet for Add Category */}
      <CustomSheet open={isSheetOpen} onClose={() => setIsSheetOpen(false)}>
        <AddFarmer onClose={() => setIsSheetOpen(false)} />
      </CustomSheet>
    </div>
  );
};

export default Farmers;
