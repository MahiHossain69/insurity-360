import { usePathname } from "next/navigation";
import { useState } from "react";

export const useSidebar = () => {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState(null);

  // Check if a navigation item is active
  const isItemActive = (item) => {
    if (item.href === "/" && pathname === "/") {
      return true;
    }
    if (item.href !== "/" && pathname.startsWith(item.href)) {
      return true;
    }
    return false;
  };

  // Check if any child item is active (for dropdown parents)
  const isParentActive = (item) => {
    if (item.hasDropdown && item.children) {
      return item.children.some((child) => pathname.startsWith(child.href));
    }
    return false;
  };

  // Determine if dropdown should be open
  const shouldDropdownBeOpen = (item) => {
    return openDropdown === item.name || isParentActive(item);
  };

  // Toggle dropdown - only one can be open at a time
  const toggleDropdown = (itemName) => {
    setOpenDropdown((prev) => (prev === itemName ? null : itemName));
  };

  // Close all dropdowns
  const closeAllDropdowns = () => {
    setOpenDropdown(null);
  };

  // Handle navigation item click
  const handleItemClick = (itemName, hasDropdown = false, closeSidebar) => {
    if (hasDropdown) {
      toggleDropdown(itemName);
    } else {
      // Close all dropdowns when clicking single items
      closeAllDropdowns();

      // Close sidebar on mobile
      if (window.innerWidth < 1280 && closeSidebar) {
        closeSidebar();
      }
    }
  };

  return {
    openDropdown,
    isItemActive,
    isParentActive,
    shouldDropdownBeOpen,
    toggleDropdown,
    closeAllDropdowns,
    handleItemClick,
  };
};
