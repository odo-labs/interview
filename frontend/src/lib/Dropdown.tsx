import React, { useRef, useState, useEffect } from "react";

interface DropdownProps {
  button: React.ReactNode;
  children: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ button, children }) => {
  const [isOpen, setIsOpen] = useState(false);
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

  return (
    <div className="relative inline-block" ref={wrapperRef}>
      <div
        onClick={() => setIsOpen((open) => !open)}
        className="cursor-pointer"
      >
        {button}
      </div>
      {isOpen && (
        <div className="absolute left-0 mt-2 min-w-[180px] bg-white border border-gray-200 rounded-md shadow-lg z-20">
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
