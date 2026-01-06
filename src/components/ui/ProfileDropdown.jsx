import { StackOverFlowIcon } from "@/components/shared/svgs";
import Cookies from "js-cookie";
import { LogOut, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const ProfileDropdown = ({ onLogout, userImage, userName = "User" }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const handleMenuItemClick = () => setIsDropdownOpen(false);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    if (onLogout) {
      onLogout();
    } else {
      // Default logout behavior
      Cookies.remove("token");
      router.push("/auth/login");
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={toggleDropdown}
        className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full duration-300 ease-out hover:ring-2 hover:ring-neutral-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        aria-label="Profile menu"
      >
        {userImage ? (
          <Image
            src={userImage}
            alt={userName}
            width={40}
            height={40}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-200 text-sm font-medium text-gray-600">
            {userName.charAt(0).toUpperCase()}
          </div>
        )}
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 absolute right-0 z-50 mt-2.5 w-56 rounded-lg border border-gray-200 bg-white shadow-xl">
          <div className="p-2">
            <Link
              href="/settings/company-profile"
              className="flex items-center rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:text-gray-900 focus:ring-2 focus:ring-blue-100 focus:outline-none"
              onClick={handleMenuItemClick}
            >
              <User className="mr-3 h-5 w-5 text-gray-400" />
              MY Profile
            </Link>

            <Link
              href="/activity-log"
              className="flex items-center rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:text-gray-900 focus:ring-2 focus:ring-blue-100 focus:outline-none"
              onClick={handleMenuItemClick}
            >
              <StackOverFlowIcon className="mr-3 h-5 w-5 text-gray-400" />
              Activity Log
            </Link>
            <button
              className="flex w-full items-center rounded-xl px-4 py-3 text-left text-sm font-medium text-red-600 transition-all duration-200 hover:bg-red-50 hover:text-red-700 focus:ring-2 focus:ring-red-100 focus:outline-none"
              onClick={handleLogout}
            >
              <LogOut className="mr-3 h-5 w-5 text-red-500" />
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
