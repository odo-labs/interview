import React, { useState, useRef, useEffect } from "react";

interface SelectProps {
  label?: string;
  options: { value: string; label: string }[];
  multiple?: boolean;
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  multiple = false,
  value,
  onChange,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>(
    Array.isArray(value) ? value : value ? [value] : []
  );
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    if (multiple) {
      const newValues = selectedValues.includes(optionValue)
        ? selectedValues.filter((v) => v !== optionValue)
        : [...selectedValues, optionValue];
      setSelectedValues(newValues);
      onChange?.(newValues);
    } else {
      setSelectedValues([optionValue]);
      onChange?.(optionValue);
      setIsOpen(false);
    }
  };

  const baseStyles =
    "px-md py-sm pr-lg w-full rounded-md border border-gray-300 focus:border-blue-500 transition-colors text-sm";

  return (
    <div className="w-full" ref={wrapperRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-sm">
          {label}
        </label>
      )}
      <div className="relative">
        <div
          className={`
            ${baseStyles}
            ${className}
            flex items-center gap-sm cursor-pointer
          `}
          onClick={() => setIsOpen(!isOpen)}
        >
          {multiple ? (
            <div className="flex flex-wrap gap-sm">
              {selectedValues.map((value) => {
                const option = options.find((opt) => opt.value === value);
                return (
                  <span
                    key={value}
                    className="bg-blue-100 text-blue-800 text-xs px-sm py-xs rounded"
                  >
                    {option?.label}
                  </span>
                );
              })}
              {selectedValues.length === 0 && (
                <span className="text-gray-400">Select options</span>
              )}
            </div>
          ) : (
            <span>
              {selectedValues.length > 0
                ? options.find((opt) => opt.value === selectedValues[0])?.label
                : "Select an option"}
            </span>
          )}
          <span className="ml-auto">▼</span>
        </div>
        {isOpen && (
          <div className="absolute z-10 w-full mt-sm bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-auto">
            {options.map((option) => (
              <div
                key={option.value}
                className={`
                  px-md py-sm cursor-pointer hover:bg-blue-50 text-sm
                  ${selectedValues.includes(option.value) ? "bg-blue-50" : ""}
                `}
                onClick={() => handleSelect(option.value)}
              >
                {multiple && (
                  <span className="mr-sm">
                    {selectedValues.includes(option.value) ? "✓" : "○"}
                  </span>
                )}
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Select;
