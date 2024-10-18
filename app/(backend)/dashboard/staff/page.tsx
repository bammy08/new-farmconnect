'use client';

import React, { useState } from 'react';
import ActionToolbar from '@/components/backend/ActionToolbar';
import Heading from '@/components/backend/Heading';
import CustomSheet from '@/components/backend/CustomSheet';
import AddStaff from '@/components/backend/AddStaff';

const Staff = () => {
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

  const handleAddStaff = () => {
    setIsSheetOpen(true); // Open the sheet when the button is clicked
  };

  return (
    <div className="px-4">
      <Heading title="Staffs" />
      <div className="mt-4">
        <ActionToolbar
          onExport={handleExport}
          onImport={handleImport}
          onBulkAction={handleBulkAction}
          onDelete={handleDelete}
          onAdd={handleAddStaff} // Trigger sheet on click
          title="Add Staff "
        />
      </div>

      {/* Custom Sheet for Add Category */}
      <CustomSheet open={isSheetOpen} onClose={() => setIsSheetOpen(false)}>
        <AddStaff onClose={() => setIsSheetOpen(false)} />
      </CustomSheet>
    </div>
  );
};

export default Staff;
