'use client';

import React from 'react';
import { FiUpload, FiDownload, FiEdit, FiTrash, FiPlus } from 'react-icons/fi';

interface ActionToolbarProps {
  onExport: () => void;
  onImport: () => void;
  onBulkAction: () => void;
  onDelete: () => void;
  onAddCategory: () => void;
}

const ActionToolbar: React.FC<ActionToolbarProps> = ({
  onExport,
  onImport,
  onBulkAction,
  onDelete,
  onAddCategory,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-4 md:p-6 bg-white shadow-md dark:bg-slate-800 rounded-lg space-y-4 md:space-y-0 md:space-x-4">
      {/* Left section - Export & Import */}
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto">
        <button
          onClick={onExport}
          className="flex items-center justify-center md:justify-start border border-slate-400 text-slate-600 dark:text-slate-50 px-3 py-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition w-full md:w-auto"
        >
          <FiUpload className="w-4 h-4 mr-1" />
          Export
        </button>

        <button
          onClick={onImport}
          className="flex items-center justify-center md:justify-start border border-slate-400 text-slate-600 dark:text-slate-50 px-3 py-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition w-full md:w-auto"
        >
          <FiDownload className="w-4 h-4 mr-1" />
          Import
        </button>
      </div>

      {/* Middle section - Bulk Action & Delete */}
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto">
        <button
          onClick={onBulkAction}
          className="flex items-center justify-center md:justify-start bg-gray-500 text-white px-3 py-2 rounded-md hover:bg-gray-600 transition w-full md:w-auto"
        >
          <FiEdit className="w-4 h-4 mr-1" />
          Bulk Action
        </button>

        <button
          onClick={onDelete}
          className="flex items-center justify-center md:justify-start bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition w-full md:w-auto"
        >
          <FiTrash className="w-4 h-4 mr-1" />
          Delete
        </button>
        <button
          onClick={onAddCategory}
          className="flex items-center justify-center md:justify-start bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600 transition w-full md:w-auto"
        >
          <FiPlus className="w-4 h-4 mr-1" />
          Add Category
        </button>
      </div>

      {/* Right section - Add Category */}
      {/* <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 w-full md:w-auto">
        
      </div> */}
    </div>
  );
};

export default ActionToolbar;
