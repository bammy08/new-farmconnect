import { UseFormRegister, FieldErrors } from 'react-hook-form';

interface TextInputProps {
  label: string;
  name: string;
  register: UseFormRegister<any>; // Use the appropriate type for your form's data
  errors: FieldErrors;
  isRequired?: boolean;
  type?: string;
  className?: string;
  defaultValue?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  register,
  errors,
  isRequired = true,
  type = 'text',
  className = 'sm:col-span-2',
  defaultValue = '',
}) => {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="block text-[18px] font-medium leading-6 text-gray-900 mb-2 dark:text-slate-50"
      >
        {label}
      </label>
      <div className="mt-3">
        <input
          {...register(name, { required: isRequired })}
          type={type}
          name={name}
          id={name}
          defaultValue={defaultValue}
          autoComplete={name}
          className="block w-full dark:bg-transparent dark:text-slate-50 rounded-md border-0 py-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-[18px] sm:leading-6"
          placeholder={`Type the ${label.toLowerCase()}`}
        />
        {errors[name] && (
          <span className="text-sm text-red-600 ">{label} is required</span>
        )}
      </div>
    </div>
  );
};

export default TextInput;
