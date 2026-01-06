"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, X } from "lucide-react";

import { IoMdCheckmark } from "react-icons/io";
import {
  CalendarIcon,
  CheckIcon,
  DropdownIcon,
  UploadedImageIcon,
} from "@/components/shared/svgs";
import { PiUploadSimple } from "react-icons/pi";
import { DialogTitle } from "@/components/ui/dialog";

export function CompanyForm({ onSubmit }) {
  const [dob, setDob] = useState(null);
  const dropdownRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState(
    "Business Identity Number",
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [licenseFile, setLicenseFile] = useState(null);
  const [companyImage, setCompanyImage] = useState(null);
  const options = [
    "Business Identity Number",
    "Tax Identification Number",
    "Trade License",
  ];

  // Form data state
  const [company, setCompany] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    type: "",
  });

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFileChange = (e, type) => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === "license") {
        setLicenseFile(file);
      } else if (type === "companyImage") {
        setCompanyImage(file);
      }
    }
  };
  return (
    <div className="flex flex-col">
      <div className="flex-1 p-6">
        <DialogTitle className="sr-only">Company Information Form</DialogTitle>
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label
                htmlFor="clientName"
                className="font-geist text-sm font-medium text-neutral-900"
              >
                Company Name
              </Label>
              <Input
                id="clientName"
                className="mt-1 border-neutral-300"
                value={company.name || ""}
                onChange={(e) =>
                  setCompany((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
              <div>
                <Label
                  htmlFor="dateOfBirth"
                  className="font-geist text-sm font-medium text-neutral-900"
                >
                  Incorporation Date
                  <span className="font-geist -mt-2 text-[10px] font-semibold text-neutral-400">
                    OPTIONAL
                  </span>
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="dateOfBirth"
                      className="mt-1 w-full cursor-pointer justify-start rounded border border-neutral-300 bg-white p-2 text-left font-normal text-neutral-400 hover:bg-transparent sm:max-w-99"
                    >
                      {dob ? format(dob, "dd MMM yyyy") : "DD MMM YYYY"}
                      <CalendarIcon className="ml-auto h-3 w-3 text-neutral-500" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto border-none bg-white p-0">
                    <Calendar
                      mode="single"
                      selected={dob}
                      onSelect={setDob}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label
                  htmlFor="gender"
                  className="font-geist text-sm font-medium text-neutral-900"
                >
                  Business Type
                </Label>
                <Select>
                  <SelectTrigger className="mt-1 w-114 border-neutral-300 sm:!max-w-99">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="h-[1px] w-full bg-neutral-200"></div>

          <div className="space-y-4">
            <div className="flex">
              <div className="w-full">
                <Label
                  htmlFor="businessIdentifier"
                  className="font-medium text-gray-900"
                >
                  Business Identifier No.
                </Label>
                <div className="relative mt-2" ref={dropdownRef}>
                  <Input
                    id="businessIdentifier"
                    type="text"
                    className="w-full rounded-lg border border-gray-300 bg-white p-4 pr-36 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder=""
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <div className="relative">
                      <Button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center rounded-md border-none bg-transparent px-4 py-2 text-sm font-medium text-gray-600 shadow-none hover:bg-transparent"
                      >
                        <span className="font-urbanist mr-1">
                          {selectedOption}
                        </span>
                        <DropdownIcon className="-mr-1 h-5 w-5 text-gray-400" />
                      </Button>
                      {dropdownOpen && (
                        <div className="absolute right-0 z-10 mt-2 w-61 rounded-lg border-neutral-100 bg-white shadow-md">
                          <div className="px-2 py-1">
                            {options.map((option) => (
                              <Button
                                key={option}
                                onClick={() => handleOptionClick(option)}
                                className={`font-urbanist flex w-full items-center rounded-sm bg-transparent px-4 py-2 text-left text-sm shadow-none hover:bg-transparent ${
                                  selectedOption === option
                                    ? "bg-blue-50 font-medium text-blue-600"
                                    : "text-gray-900 hover:bg-gray-100"
                                }`}
                              >
                                {selectedOption === option && (
                                  <IoMdCheckmark className="mr-2 h-4 w-4 text-blue-600" />
                                )}
                                {option}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Label className="font-geist text-sm font-medium text-neutral-900">
                Upload Driving License Image
              </Label>

              {licenseFile ? (
                <div className="mt-1 flex items-center justify-between rounded-lg border-none bg-neutral-50 p-3">
                  <div className="flex items-center">
                    <UploadedImageIcon className="h-10 w-10" />
                    <div className="ml-3">
                      <p className="font-geist text-sm font-medium text-neutral-900">
                        {licenseFile.name}
                      </p>
                      <p className="font-geist text-xs text-neutral-500">
                        {(licenseFile.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                  <X
                    className="h-6 w-6 cursor-pointer text-neutral-900"
                    onClick={() => setLicenseFile(null)}
                  />
                </div>
              ) : (
                <div
                  className="mt-1 h-18 cursor-pointer rounded-lg border-2 border-dashed border-neutral-300 p-8 text-center transition-colors"
                  onClick={() =>
                    document.getElementById("licenseUpload")?.click()
                  }
                >
                  <PiUploadSimple className="mx-auto -mt-5 mb-2 h-5 w-5 text-neutral-500" />
                  <p className="font-geist text-sm text-neutral-500">
                    Drag your file here or click to upload
                  </p>
                </div>
              )}

              <Input
                id="licenseUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileChange(e, "license")}
              />
            </div>
          </div>
          <div className="mt-8 h-[1px] w-full bg-neutral-200"></div>

          <div className="space-y-4">
            <div>
              <Label
                htmlFor="clientName"
                className="font-geist text-sm font-medium text-neutral-900"
              >
                Primary Contact Name
              </Label>
              <Input id="clientName" className="mt-1 border-neutral-300" />
            </div>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              <div>
                <Label
                  htmlFor="primaryUnit"
                  className="font-geist text-sm font-medium text-neutral-900"
                >
                  Primary Contact Designation
                </Label>
                <Input
                  id="primaryUnit"
                  className="mt-1 border-neutral-300 bg-white"
                />
              </div>
              <div>
                <Label
                  htmlFor="primaryCity"
                  className="font-geist text-sm font-medium text-neutral-900"
                >
                  Primary Contact Phone Number
                </Label>
                <Input
                  id="primaryCity"
                  className="mt-1 border-neutral-300 bg-white"
                  value={company.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <div className="mt-8 h-[1px] w-full bg-neutral-200"></div>

          <div className="space-y-4">
            <div>
              <Label
                htmlFor="clientName"
                className="font-geist text-sm font-medium text-neutral-900"
              >
                Company Email
              </Label>
              <Input
                id="clientName"
                className="mt-1 border-neutral-300"
                value={company.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="space-y-4 bg-neutral-50 p-4">
              <div>
                <h3 className="font-geist text-lg font-medium text-neutral-900">
                  Company Address
                </h3>
              </div>

              <div>
                <Label
                  htmlFor="mailingStreet"
                  className="font-geist text-sm font-medium text-neutral-900"
                >
                  Street Address
                </Label>
                <Input
                  id="mailingStreet"
                  className="mt-1 border-neutral-300 bg-white"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label
                    htmlFor="mailingUnit"
                    className="font-geist text-sm font-medium text-neutral-900"
                  >
                    Unit Number
                  </Label>
                  <Input
                    id="mailingUnit"
                    className="mt-1 border-neutral-300 bg-white"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="mailingCity"
                    className="font-geist text-sm font-medium text-neutral-900"
                  >
                    City
                  </Label>
                  <Input
                    id="mailingCity"
                    className="mt-1 border-neutral-300 bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label
                    htmlFor="mailingState"
                    className="font-geist text-sm font-medium text-neutral-900"
                  >
                    State
                  </Label>
                  <Input
                    id="mailingState"
                    className="mt-1 border-neutral-300 bg-white"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="mailingZip"
                    className="font-geist text-sm font-medium text-neutral-900"
                  >
                    Zip Code
                  </Label>
                  <Input
                    id="mailingZip"
                    className="mt-1 border-neutral-300 bg-white sm:max-w-47"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 h-[1px] w-full bg-neutral-200"></div>

          <div>
            <Label className="font-geist text-sm font-medium text-neutral-900">
              Companies Logo
              <span className="font-geist -mt-2 text-[10px] font-semibold text-neutral-400">
                OPTIONAL
              </span>
            </Label>

            {companyImage ? (
              <div className="mt-1 flex items-center justify-between rounded-lg border-none bg-neutral-50 p-3">
                <div className="flex items-center">
                  <UploadedImageIcon className="h-10 w-10" />
                  <div className="ml-3">
                    <p className="font-geist text-sm font-medium text-neutral-900">
                      {companyImage.name}
                    </p>
                    <p className="font-geist text-xs text-neutral-500">
                      {(companyImage.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                <X
                  className="h-6 w-6 cursor-pointer text-neutral-900"
                  onClick={() => setCompanyImage(null)}
                />
              </div>
            ) : (
              <div
                className="mt-1 h-18 cursor-pointer rounded-lg border-2 border-dashed border-neutral-300 p-8 text-center transition-colors"
                onClick={() =>
                  document.getElementById("companyImageUpload")?.click()
                }
              >
                <PiUploadSimple className="mx-auto -mt-5 mb-2 h-5 w-5 text-neutral-500" />
                <p className="font-geist text-sm text-neutral-500">
                  Drag your file here or click to upload
                </p>
              </div>
            )}

            <Input
              id="companyImageUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileChange(e, "companyImage")}
            />
          </div>
        </div>
      </div>
      <div className="sticky bottom-0 flex w-full justify-end gap-4 border-t border-neutral-500/4 bg-neutral-50 px-6 py-4">
        <Button className="rounded-md border border-neutral-300 bg-transparent px-4 py-2.5 font-semibold hover:bg-transparent">
          Cancel
        </Button>
        <Button
          variant="outline"
          className="bg-blue-500 px-4 py-2.5 text-white hover:bg-blue-400"
          onClick={() => {
            const clientData = {
              name: company.name || "New Client",
              email: company.email || "N/A",
              phone: company.phone || "N/A",
              type: company.type || "N/A",
            };
            onSubmit?.(clientData);
          }}
        >
          <CheckIcon className="h-5 w-5 text-neutral-900" />
          Save & Select
        </Button>
      </div>
    </div>
  );
}
