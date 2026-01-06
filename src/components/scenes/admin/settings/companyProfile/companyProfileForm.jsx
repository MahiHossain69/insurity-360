"use client";

import React, { useState, useEffect } from "react";
import { Edit2, Check } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CompanyProfileEdit, EditPencil } from "@/components/shared/svgs";

export function CompanyProfileForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isSaveEnabled, setIsSaveEnabled] = useState(false);

  useEffect(() => {
    // Enable Save button only if any password field has a value
    if (
      formData.oldPassword.trim() !== "" ||
      formData.newPassword.trim() !== "" ||
      formData.confirmPassword.trim() !== ""
    ) {
      setIsSaveEnabled(true);
    } else {
      setIsSaveEnabled(false);
    }
  }, [formData.oldPassword, formData.newPassword, formData.confirmPassword]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (!isSaveEnabled) return; // Prevent action if disabled
    console.log("Saving profile:", formData);
  };

  const handleCancel = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setIsSaveEnabled(false);
  };

  return (
    <div className="max-w-200 mt-10">
      
      <div className="mb-12">
        <h3 className="text-sm font-medium text-neutral-900 mb-1">
          Edit Profile Image
        </h3>
        <div className="relative w-fit">
          <Image
            width={24}
            height={24}
            src="/icons/user-logo.webp"
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-2 border-neutral-300"
          />
          <Button className="absolute bottom-0 border border-white right-0 bg-blue-500 text-white w-9 h-9 rounded-full shadow-lg hover:bg-blue-600 transition-colors">
            <CompanyProfileEdit size={15} />
          </Button>
        </div>
      </div>

      
      <div className="mb-12 -mt-6">
        <div className="space-y-6">
        
          <div>
            <Label className="block text-sm font-medium text-neutral-900 mb-2">
              Full Name
            </Label>
            <Input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder=""
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:border-neutral-300 "
            />
          </div>

         
          <div>
            <Label className="block text-sm font-medium text-neutral-900 mb-2">
              Email Address
            </Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder=""
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:border-neutral-300 "
            />
          </div>

          
          <div>
            <Label className="block text-sm font-medium text-neutral-900 mb-2">
              Phone Number
            </Label>
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder=""
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:border-neutral-300  sm:w-98"
            />
          </div>
        </div>
      </div>

      
      <div className="mb-12">
        <h2 className="text-xl font-bold text-neutral-900 mb-6">
          Change Password
        </h2>
        <div className="space-y-6">
         
          <div>
            <Label className="block text-sm font-medium text-neutral-900 mb-2">
              Old Password
            </Label>
            <Input
              type="password"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleInputChange}
              placeholder=""
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:border-neutral-300 "
            />
          </div>

         
          <div>
            <Label className="block text-sm font-medium text-neutral-900 mb-2">
              New Password
            </Label>
            <Input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              placeholder=""
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:border-neutral-300 "
            />
          </div>

         
          <div>
            <Label className="block text-sm font-medium text-neutral-900 mb-2">
              Confirm New Password
            </Label>
            <Input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder=""
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:border-neutral-300 "
            />
          </div>

        
          <div className="pt-2">
            <Button className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors">
              Change Password
            </Button>
          </div>
        </div>
      </div>

     
      <div className="flex items-center gap-4 pt-8 border-t border-neutral-300">
        <Button
          onClick={handleSave}
          disabled={!isSaveEnabled}
          className={`flex items-center gap-2 px-6 py-3 font-medium rounded-lg transition-colors ${
            isSaveEnabled
              ? "bg-blue-100 text-white hover:bg-blue-500"
              : "bg-blue-200 text-white cursor-not-allowed"
          }`}
        >
          <Check size={20} />
          Save
        </Button>
        <Button
          onClick={handleCancel}
          className="text-neutral-900 font-medium hover:text-white bg-transparent  transition-colors"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
