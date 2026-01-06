"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Upload, X } from "lucide-react";
import { FaAngleDown } from "react-icons/fa6";
import { IoMdCheckmark } from "react-icons/io";
import { Checkbox } from "@/components/ui/checkbox";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  CalendarIcon,
  CheckIcon,
  DropdownIcon,
  UploadedImageIcon,
} from "@/components/shared/svgs";
import { PiUploadSimple } from "react-icons/pi";

export function IndividualForm({ onSubmit }) {
  const [autoFillMailing, setAutoFillMailing] = useState(false);
  const [licenseFile, setLicenseFile] = useState(null);
  const [clientImage, setClientImage] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Business ID");
  const dropdownRef = useRef(null);
  const [dob, setDob] = useState(null);

  // Form data state
  const [formData, setFormData] = useState({
    clientName: "",
    email: "",
    phone: "",
    type: "Individual",
  });

  const options = ["Business ID", "National ID", "Passport"];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setDropdownOpen(false);
  };
  const handleFileChange = (e, type) => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === "license") {
        setLicenseFile(file);
      } else if (type === "clientImage") {
        setClientImage(file);
      }
    }
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
  return (
    <div className="flex flex-col">
      <div style={{ maxWidth: "900px" }} className="flex-1 p-6">
        <div>
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label
                  htmlFor="clientName"
                  className="font-geist text-sm font-medium text-neutral-900"
                >
                  Client Name
                </Label>
                <Input
                  id="clientName"
                  className="mt-1 border-neutral-300"
                  value={formData.clientName}
                  onChange={(e) =>
                    setFormData({ ...formData, clientName: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
                <div>
                  <Label
                    htmlFor="dateOfBirth"
                    className="font-geist text-sm font-medium text-neutral-900"
                  >
                    Date of Birth
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
                    Gender
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

              <div>
                <Label
                  htmlFor="occupation"
                  className="font-geist text-sm font-medium text-neutral-900"
                >
                  Occupation
                  <span className="font-geist -mt-2 text-[10px] font-semibold text-neutral-400">
                    OPTIONAL
                  </span>
                </Label>
                <Input id="occupation" className="mt-1 border-neutral-300" />
              </div>
            </div>
            <div className="mt-8 mb-8 h-[1px] w-full bg-neutral-200"></div>

            <div className="space-y-4">
              <div className="flex">
                <div className="w-full">
                  <Label
                    htmlFor="drivingLicense"
                    className="font-medium text-gray-900"
                  >
                    Driving License No.
                  </Label>
                  <div className="relative mt-2" ref={dropdownRef}>
                    <Input
                      id="drivingLicense"
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
                          <div className="absolute right-0 z-10 mt-2 w-40 rounded-lg border-neutral-100 bg-white shadow-md">
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
                <div></div>
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
            <div className="mt-8 mb-8 h-[1px] w-full bg-neutral-200"></div>

            <div className="grid grid-cols-1 gap-4 sm:max-w-99">
              <div>
                <Label
                  htmlFor="phoneNumber"
                  className="font-geist text-sm font-medium text-neutral-900"
                >
                  Phone Number
                </Label>
                <Input
                  id="phoneNumber"
                  className="mt-1 border-neutral-300"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
              <div>
                <Label
                  htmlFor="emailAddress"
                  className="font-geist text-sm font-medium text-neutral-900"
                >
                  Email Address
                </Label>
                <Input
                  id="emailAddress"
                  type="email"
                  className="mt-1 border-neutral-300"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div>
                <Label
                  htmlFor="primaryStreet"
                  className="font-geist text-sm font-medium text-neutral-900"
                >
                  Street Address
                </Label>
                <Input
                  id="primaryStreet"
                  className="mt-1 border-neutral-300 bg-white"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label
                    htmlFor="primaryUnit"
                    className="font-geist text-sm font-medium text-neutral-900"
                  >
                    Unit Number
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
                    City
                  </Label>
                  <Input
                    id="primaryCity"
                    className="mt-1 border-neutral-300 bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label
                    htmlFor="primaryState"
                    className="font-geist text-sm font-medium text-neutral-900"
                  >
                    State
                  </Label>
                  <Input
                    id="primaryState"
                    className="mt-1 border-neutral-300 bg-white"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="primaryZip"
                    className="font-geist text-sm font-medium text-neutral-900"
                  >
                    Zip Code
                  </Label>
                  <Input
                    id="primaryZip"
                    className="mt-1 border-neutral-300 bg-white sm:max-w-47"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 bg-neutral-50 p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-geist text-lg font-medium text-neutral-900">
                  Mailing Address
                </h3>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="autoFillMailing"
                    checked={autoFillMailing}
                    onCheckedChange={() => setAutoFillMailing(!autoFillMailing)}
                    className="border-neutral-300 bg-white text-white"
                  />
                  <Label
                    htmlFor="autoFillMailing"
                    className="cursor-pointer text-sm text-neutral-800"
                  >
                    Auto Fill
                  </Label>
                </div>
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
            <div className="h-[1px] w-full bg-neutral-200"></div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label
                    htmlFor="emergencyName"
                    className="font-geist text-sm font-medium text-neutral-900"
                  >
                    Emergency Contact Name
                    <span className="text-red-800">*</span>
                  </Label>
                  <Input
                    id="emergencyName"
                    className="mt-1 border-neutral-300"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="relationship"
                    className="font-geist text-sm font-medium text-neutral-900"
                  >
                    Relationship with Emergency Contact
                  </Label>
                  <Select>
                    <SelectTrigger className="mt-1 w-114 border-neutral-300 sm:max-w-99">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="spouse">Spouse</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="sibling">Sibling</SelectItem>
                      <SelectItem value="child">Child</SelectItem>
                      <SelectItem value="friend">Friend</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4 bg-neutral-50 p-4">
                <h3 className="font-geist text-lg font-medium text-neutral-900">
                  Primary Address
                </h3>

                <div>
                  <Label
                    htmlFor="primaryStreet"
                    className="font-geist text-sm font-medium text-neutral-900"
                  >
                    Street Address
                  </Label>
                  <Input
                    id="primaryStreet"
                    className="mt-1 border-neutral-300 bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <Label
                      htmlFor="primaryUnit"
                      className="font-geist text-sm font-medium text-neutral-900"
                    >
                      Unit Number
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
                      City
                    </Label>
                    <Input
                      id="primaryCity"
                      className="mt-1 border-neutral-300 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <Label
                      htmlFor="primaryState"
                      className="font-geist text-sm font-medium text-neutral-900"
                    >
                      State
                    </Label>
                    <Input
                      id="primaryState"
                      className="mt-1 border-neutral-300 bg-white"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="primaryZip"
                      className="font-geist text-sm font-medium text-neutral-900"
                    >
                      Zip Code
                    </Label>
                    <Input
                      id="primaryZip"
                      className="mt-1 border-neutral-300 bg-white sm:max-w-47"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 bg-neutral-50 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-geist text-lg font-medium text-neutral-900">
                    Mailing Address
                  </h3>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="autoFillMailing"
                      checked={autoFillMailing}
                      onCheckedChange={() =>
                        setAutoFillMailing(!autoFillMailing)
                      }
                      className="border-neutral-300 bg-white text-white"
                    />
                    <Label
                      htmlFor="autoFillMailing"
                      className="cursor-pointer text-sm text-neutral-800"
                    >
                      Auto Fill
                    </Label>
                  </div>
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
              <div className="mt-7 h-[1px] w-full bg-neutral-200"></div>
            </div>

            <div>
              <Label className="font-geist text-sm font-medium text-neutral-900">
                Client's Image
                <span className="font-geist -mt-2 text-[10px] font-semibold text-neutral-400">
                  OPTIONAL
                </span>
              </Label>

              {clientImage ? (
                <div className="mt-1 flex items-center justify-between rounded-lg border-none bg-neutral-50 p-3">
                  <div className="flex items-center">
                    <UploadedImageIcon className="h-10 w-10" />
                    <div className="ml-3">
                      <p className="font-geist text-sm font-medium text-neutral-900">
                        {clientImage.name}
                      </p>
                      <p className="font-geist text-xs text-neutral-500">
                        {(clientImage.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                  <X
                    className="h-6 w-6 cursor-pointer text-neutral-900"
                    onClick={() => setClientImage(null)}
                  />
                </div>
              ) : (
                <div
                  className="mt-1 h-18 cursor-pointer rounded-lg border-2 border-dashed border-neutral-300 p-8 text-center transition-colors"
                  onClick={() =>
                    document.getElementById("clientImageUpload")?.click()
                  }
                >
                  <PiUploadSimple className="mx-auto -mt-5 mb-2 h-5 w-5 text-neutral-500" />
                  <p className="font-geist text-sm text-neutral-500">
                    Drag your file here or click to upload
                  </p>
                </div>
              )}

              <Input
                id="clientImageUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileChange(e, "clientImage")}
              />
            </div>

            <div className="h-[1px] w-full bg-neutral-200"></div>
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
              name: formData.clientName || "New Client",
              email: formData.email,
              phone: formData.phone,
              type: formData.type,
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
