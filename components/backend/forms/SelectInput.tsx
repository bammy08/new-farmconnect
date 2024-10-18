import React from 'react';
import { UseFormRegister, FieldValues, Path } from 'react-hook-form';

interface SelectInputProps<T extends FieldValues> {
  label: string;
  name: Path<T>; // Ensures compatibility with deeply nested fields
  register: UseFormRegister<T>;
  className?: string;
  options?: { id: string | number; title: string }[];
  isMultiSelect?: boolean; // New prop for multiple selection
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void; // Add onChange prop
}

const SelectInput = <T extends FieldValues>({
  label,
  name,
  register,
  className = 'sm:col-span-2',
  options = [],
  isMultiSelect = false, // Default to false
  onChange,
}: SelectInputProps<T>) => {
  return (
    <div className={className}>
      <label
        htmlFor={name} // Path<T> is already a string
        className="block text-[18px] font-medium leading-6 text-gray-900 mb-2 dark:text-slate-50"
      >
        {label}
      </label>
      <div className="mt-2">
        <select
          {...register(name)}
          id={name}
          name={name}
          onChange={onChange}
          multiple={isMultiSelect} // Set multiple attribute based on isMultiSelect
          className="block w-full dark:bg-transparent dark:text-slate-50 rounded-md border-0 py-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-[18px] sm:leading-6"
          style={{
            appearance: 'none',
            WebkitAppearance: 'none', // For Safari
          }}
        >
          {options.map((option) => (
            <option
              className="dark:bg-gray-600 dark:text-slate-50 bg-slate-50 text-gray-600 hover:bg-orange-500"
              key={option.id}
              value={option.id}
            >
              {option.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectInput;
