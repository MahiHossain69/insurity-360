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
import { Minus, Plus, Upload, X } from "lucide-react";

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

export function FamilyForm() {
  const [autoFillMailing, setAutoFillMailing] = useState(false);
  const dropdownRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState("Business ID");
  const [clientImage, setClientImage] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [cardImage, setCardImage] = useState(null);

  const options = ["Business ID", "National ID", "Passport"];

  const [memberCount, setMemberCount] = useState(2);
  const [members, setMembers] = useState([
    { id: 1, name: "", dateOfBirth: null, relation: "" },
    { id: 2, name: "", dateOfBirth: null, relation: "" },
  ]);

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
      if (type === "cardImage") {
        setCardImage(file);
      } else if (type === "clientImage") {
        setClientImage(file);
      }
    }
  };

  const removeFile = (type) => {
    if (type === "cardImage") {
      setCardImage(null);
    } else if (type === "clientImage") {
      setClientImage(null);
    }
  };

  const updateMemberCount = (newCount) => {
    if (newCount < 1) return;

    setMemberCount(newCount);

    if (newCount > members.length) {
      const newMembers = [...members];
      for (let i = members.length; i < newCount; i++) {
        newMembers.push({
          id: i + 1,
          name: "",
          dateOfBirth: null,
          relation: "",
        });
      }
      setMembers(newMembers);
    } else {
      setMembers(members.slice(0, newCount));
    }
  };

  const updateMember = (id, field, value) => {
    setMembers(
      members.map((member) =>
        member.id === id ? { ...member, [field]: value } : member,
      ),
    );
  };

  return (
    <div style={{ maxWidth: "800px" }}>
      <div className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label
              htmlFor="clientName"
              className="font-geist text-sm font-medium text-neutral-900"
            >
              Family Representative Name
            </Label>
            <Input id="clientName" className="mt-1 border-neutral-300" />
          </div>

          <div>
            <div>
              <Label
                htmlFor="gender"
                className="font-geist text-sm font-medium text-neutral-900"
              >
                Relationship to Family Members
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

        <div className="mt-8 mb-8 h-[1px] w-full bg-neutral-200"></div>

        <div className="space-y-4">
          <div className="flex">
            <div className="w-full">
              <Label htmlFor="idCard" className="font-medium text-gray-900">
                ID Card No.
              </Label>
              <div className="relative mt-2" ref={dropdownRef}>
                <Input
                  id="idCard"
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
          </div>

          <div>
            <Label className="font-geist text-sm font-medium text-neutral-900">
              Upload ID Card Image
            </Label>
            {cardImage ? (
              <div className="mt-1 flex items-center justify-between rounded-lg border-none bg-neutral-50 p-3">
                <div className="flex items-center">
                  <UploadedImageIcon className="h-10 w-10" />
                  <div className="ml-3">
                    <p className="font-geist text-sm font-medium text-neutral-900">
                      {cardImage.name}
                    </p>
                    <p className="font-geist text-xs text-neutral-500">
                      {(cardImage.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                <X
                  className="h-6 w-6 cursor-pointer text-neutral-900"
                  onClick={() => removeFile("cardImage")}
                />
              </div>
            ) : (
              <div
                className="mt-1 h-18 cursor-pointer rounded-lg border-2 border-dashed border-neutral-300 p-8 text-center transition-colors"
                onClick={() => document.getElementById("cardImage")?.click()}
              >
                <PiUploadSimple className="mx-auto -mt-5 mb-2 h-5 w-5 text-neutral-500" />
                <p className="font-geist text-sm text-neutral-500">
                  Drag your file here or click to upload
                </p>
              </div>
            )}
            <Input
              id="cardImage"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileChange(e, "cardImage")}
            />
          </div>
        </div>

        <div className="mt-8 mb-8 h-[1px] w-full bg-neutral-200"></div>

        <div className="space-y-4 bg-neutral-50 p-4">
          <div className="space-y-1">
            <h1 className="text-lg font-medium text-neutral-900">Members</h1>
            <p className="font-geist text-sm text-neutral-500">
              To set up group coverage, enter the number and details for each
              included person.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-medium text-neutral-900">
              Number of Members
            </h2>
            <div className="flex items-center gap-0">
              <Input
                type="number"
                value={memberCount}
                onChange={(e) =>
                  updateMemberCount(Number.parseInt(e.target.value) || 1)
                }
                className="h-9 w-32 rounded-r-none border-r-0 border-neutral-300 bg-white text-lg font-medium"
                min="1"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateMemberCount(memberCount - 1)}
                className="h-9 w-9 cursor-pointer rounded-none border-r-0 border-neutral-300 bg-neutral-50"
              >
                <Minus className="h-4 w-4 text-black" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateMemberCount(memberCount + 1)}
                className="h-9 w-9 cursor-pointer rounded-l-none border-neutral-300 bg-neutral-50"
              >
                <Plus className="h-4 w-4 text-black" />
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex w-full items-center justify-center">
              <div className="flex-grow border-t-2 border-dashed border-neutral-200"></div>
              <h3 className="mx-4 text-[11px] font-medium text-neutral-400 uppercase">
                Enter Members Details
              </h3>
              <div className="flex-grow border-t-2 border-dashed border-neutral-200"></div>
            </div>

            <div className="space-y-4">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="flex flex-col justify-between gap-4 sm:flex-row sm:gap-2"
                >
                  <div className="flex flex-col gap-3">
                    <div>
                      <Label className="text-sm font-medium text-neutral-900">
                        Name
                      </Label>
                    </div>
                    <Input
                      placeholder=""
                      value={member.name}
                      onChange={(e) =>
                        updateMember(member.id, "name", e.target.value)
                      }
                      className="h-9 border-neutral-300 bg-white sm:w-95"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <div>
                      <Label className="text-sm font-medium text-neutral-900">
                        Date of Birth
                      </Label>
                    </div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={`h-9 cursor-pointer justify-start border-neutral-300 bg-white text-left font-normal sm:w-47 ${!member.dateOfBirth && "text-muted-foreground"}`}
                        >
                          {member.dateOfBirth ? (
                            format(member.dateOfBirth, "dd MMM yyyy")
                          ) : (
                            <span className="text-neutral-400">
                              DD MMM YYYY
                            </span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto border-none bg-white p-0"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={member.dateOfBirth}
                          onSelect={(date) =>
                            updateMember(member.id, "dateOfBirth", date)
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div>
                      <Label className="text-sm font-medium text-neutral-900">
                        Relation
                      </Label>
                    </div>
                    <Select
                      value={member.relation}
                      onValueChange={(value) =>
                        updateMember(member.id, "relation", value)
                      }
                    >
                      <SelectTrigger className="!h-9 w-full border-neutral-300 bg-white text-neutral-500 sm:w-47">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="spouse">Spouse</SelectItem>
                        <SelectItem value="child">Child</SelectItem>
                        <SelectItem value="parent">Parent</SelectItem>
                        <SelectItem value="sibling">Sibling</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 h-[1px] w-full bg-neutral-200"></div>

        <div className="grid grid-cols-1 gap-4 sm:max-w-99">
          <div>
            <Label
              htmlFor="phoneNumber"
              className="font-geist text-sm font-medium text-neutral-900"
            >
              Phone Number
            </Label>
            <Input id="phoneNumber" className="mt-1 border-neutral-300" />
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
            />
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

        <div className="mt-8 h-[1px] w-full bg-neutral-200"></div>

        <div>
          <Label className="font-geist text-sm font-medium text-neutral-900">
            Representative’s Image
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
                onClick={() => removeFile("clientImage")}
              />
            </div>
          ) : (
            <div
              className="mt-1 h-18 cursor-pointer rounded-lg border-2 border-dashed border-neutral-300 p-8 text-center transition-colors"
              onClick={() =>
                document.getElementById("clientImageUpload")?.click()
              }
            >
              <PiUploadSimple className="mx-auto -mt-5 mb-2 h-5 w-5 text-[#94a3b8]" />
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

        <div className="flex gap-4">
          <Button className="w-23 cursor-pointer bg-blue-500 text-white hover:bg-blue-400">
            <CheckIcon className="h-4 w-4 text-white" />
            Save
          </Button>
          <Button
            variant="outline"
            className="cursor-pointer border-none bg-transparent px-8 text-neutral-900 shadow-none"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
