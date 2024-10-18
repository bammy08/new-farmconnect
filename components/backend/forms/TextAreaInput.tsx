'use client';

import {
  FieldErrors,
  UseFormRegister,
  FieldValues,
  Path,
} from 'react-hook-form';

interface TextareaInputProps<T extends FieldValues> {
  label: string;
  name: Path<T>; // Ensures compatibility with form field names
  register: UseFormRegister<T>;
  errors: FieldErrors<T>; // Matches the form's field structure
  isRequired?: boolean;
  type?: string;
  className?: string;
}

const TextareaInput = <T extends FieldValues>({
  label,
  name,
  register,
  errors,
  isRequired = true,
  type = 'text',
  className = 'sm:col-span-2',
}: TextareaInputProps<T>) => {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="block text-[18px] font-medium leading-6 text-gray-700 dark:text-slate-50 mb-2"
      >
        {label}
      </label>
      <div className="mt-3">
        <textarea
          {...register(name, { required: isRequired })}
          name={name}
          id={name}
          rows={3}
          className="block w-full dark:bg-transparent dark:text-slate-50 rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-[18px] sm:leading-6"
          defaultValue={''}
          placeholder={`Type the ${label.toLowerCase()}`}
        />
        {errors[name] && (
          <span className="text-sm text-red-600">{label} is required</span>
        )}
      </div>
    </div>
  );
};

export default TextareaInput;
