"use client";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

import LocaleSwitcher from "@/components/Common/LocaleSwitcher";
import ThemeToggle from "@/components/Common/ThemeToggle/ThemeToggle";
import ScanButton from "../Header/ScanButton";

const CustomDropDownMenu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop view - always visible */}
      <div className="hidden md:flex items-center gap-2">
        <ScanButton />
        <ThemeToggle />
        <LocaleSwitcher />
      </div>

      {/* Mobile view - dropdown menu */}
      <div className="md:hidden relative">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-md focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {isMobileMenuOpen && (
          <div className="absolute right-0 mt-5 w-48 bg-grayscale-100 dark:bg-gray-800 rounded-md shadow-sm py-1 z-50 border">
            <div className="flex flex-col gap-2 px-2 py-1">
            <ScanButton />
              <ThemeToggle />
              <LocaleSwitcher />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CustomDropDownMenu;
