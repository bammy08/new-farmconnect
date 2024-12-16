'use client';

import React, { useEffect, useState } from 'react';
import ActionToolbar from '@/components/backend/ActionToolbar';
import Heading from '@/components/backend/Heading';
import AddCategory from '@/components/backend/AddCategory'; // Your AddCategory component
import CustomSheet from '@/components/backend/CustomSheet';
import { DataTable } from '@/components/data-table';
import { columns } from '@/app/table/columns';
import { getData } from '@/lib/getData';
import type { Categories as CategoriesType } from '@/app/table/columns'; // Importing type explicitly

const CategoriesPage = () => {
  const [data, setData] = useState<CategoriesType[] | null>(null); // State to store fetched categories
  const [isSheetOpen, setIsSheetOpen] = useState(false); // State to control the Sheet visibility
  const [loading, setLoading] = useState(true); // State to track loading status

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await getData<CategoriesType[]>('categories'); // Replace 'categories' with your actual API endpoint
        setData(categories || []); // Set data or an empty array if undefined
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false); // Set loading to false once data fetching is complete
      }
    };

    fetchData();
  }, []);

  // Handlers for toolbar actions
  const handleExport = () => {
    console.log('Export clicked');
  };

  const handleImport = () => {
    console.log('Import clicked');
  };

  const handleAddCategory = () => {
    setIsSheetOpen(true); // Open the sheet when the button is clicked
  };

  return (
    <div className="px-4">
      <Heading title="Categories" />
      <div className="mt-4">
        <ActionToolbar
          onExport={handleExport}
          onImport={handleImport}
          onAdd={handleAddCategory}
          title="Add Category" // Pass the title prop
        />
      </div>

      {/* Custom Sheet for Add Category */}
      <CustomSheet open={isSheetOpen} onClose={() => setIsSheetOpen(false)}>
        <AddCategory onClose={() => setIsSheetOpen(false)} />
      </CustomSheet>

      <div className="mt-4">
        {/* Show a loading state or the table based on data availability */}
        {loading ? (
          <p>Loading categories...</p>
        ) : data && data.length > 0 ? (
          <DataTable columns={columns} data={data} />
        ) : (
          <p>No categories found.</p>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
