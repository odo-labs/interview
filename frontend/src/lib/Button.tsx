import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex px-sm py-xs items-center justify-center rounded-md font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors px-4 py-2";

  return (
    <button
      className={`
        ${baseStyles}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
