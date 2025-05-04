import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  className = "",
  ...props
}) => {
  const baseStyles =
    "px-md py-sm w-full rounded-md border border-gray-300 focus:border-blue-500 transition-colors px-4 py-2";

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        className={`
          ${baseStyles}
          ${className}
        `}
        {...props}
      />
    </div>
  );
};

export default Input;
