"use client";

import { ChevronDown, Loader2, Repeat2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const companies = [
  {
    id: 1,
    name: "NRMA Insurance",
    image: "/icons/user-logo.png",
  },
  {
    id: 2,
    name: "Allianz Australia",
    image: "/icons/user-logo.png",
  },
  {
    id: 3,
    name: "QBE Insurance",
    image: "/icons/user-logo.png",
  },
];

const UserDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentCompanyId, setCurrentCompanyId] = useState(1);
  const [switchingCompanyId, setSwitchingCompanyId] = useState(null);
  const dropdownRef = useRef(null);

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

  const handleSwitchCompany = async (companyId) => {
    if (companyId !== currentCompanyId && !switchingCompanyId) {
      setSwitchingCompanyId(companyId);
      // Simulate API call / switching delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      setCurrentCompanyId(companyId);
      setSwitchingCompanyId(null);
      setIsDropdownOpen(false);
    }
  };

  // Sort companies: current company first, then others
  const sortedCompanies = [...companies].sort((a, b) => {
    if (a.id === currentCompanyId) return -1;
    if (b.id === currentCompanyId) return 1;
    return 0;
  });

  const currentCompany = companies.find((c) => c.id === currentCompanyId);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Company Button */}
      <button
        onClick={toggleDropdown}
        className="group flex cursor-pointer items-center space-x-3 rounded-2xl bg-gray-50/80 p-1 transition-all duration-200 focus:outline-none"
        aria-label="Company menu"
      >
        {/* Avatar */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 shadow-md transition-all duration-200 group-hover:shadow-lg">
          <Image
            src={currentCompany?.image || "/icons/user-logo.png"}
            alt={currentCompany?.name || "Company"}
            width={40}
            height={40}
            className="rounded-lg"
          />
        </div>

        {/* Company Info */}
        <div className="hidden text-left sm:block">
          <p className="text-base font-medium text-neutral-900">
            {currentCompany?.name || "Select Company"}
          </p>
        </div>

        {/* Chevron */}
        <ChevronDown
          className={`h-4 w-4 text-gray-400 transition-all duration-200 ${
            isDropdownOpen
              ? "rotate-180 text-blue-500"
              : "group-hover:text-gray-600"
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 z-50 mt-1.5 w-80 rounded-lg border border-gray-200 bg-white shadow-xl">
          <div className="space-y-1 p-2">
            {sortedCompanies.map((company) => {
              const isCurrent = company.id === currentCompanyId;
              const isSwitching = company.id === switchingCompanyId;
              return (
                <div
                  key={company.id}
                  onClick={() => handleSwitchCompany(company.id)}
                  className={`flex items-center justify-between gap-3 rounded-lg p-3 ${
                    isCurrent
                      ? "cursor-default bg-gray-50"
                      : isSwitching
                        ? "cursor-wait bg-blue-50"
                        : "cursor-pointer bg-white hover:bg-gray-50"
                  }`}
                >
                  <div className="inline-flex items-center gap-3">
                    <Image
                      src={company.image}
                      alt={company.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <h3 className="text-sm font-bold">{company.name}</h3>
                  </div>
                  <div className="flex items-center">
                    {isSwitching ? (
                      <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                    ) : (
                      !isCurrent && (
                        <Repeat2 className="h-4 w-4 text-gray-500" />
                      )
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
