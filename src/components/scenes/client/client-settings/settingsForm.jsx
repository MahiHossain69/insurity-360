"use client";

import React, { useState } from "react";
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
import { Toggle } from "@/components/ui/toggle";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function SettingsForm() {
  const [open, setOpen] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const [formData, setFormData] = useState({
    fullName: "Faiz Ahmed Jiad",
    email: "jiad@gmail.com",
    phone: "+1 212 555 4567",
    phoneCountry: "US",
    dateOfBirth: "08 Mar 1996",
    nationalId: "1254 521458 521458",
    gender: "Male",
    streetAddress: "",
    country: "United States",
    state: "New York",
    city: "New York",
    zipCode: "6524",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactor: true,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleChangePassword = () => {
    setOpen(true);
  };

  const handleOtpChange = (index, value) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
  };
  const handleToggle = () => {
    setFormData((prev) => ({ ...prev, twoFactor: !prev.twoFactor }));
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-200 py-8">
       
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900">
            Personal Information
          </h2>
          <p className="mb-8 text-sm text-neutral-500">
            Manage your name, contact, and personal identifiers.
          </p>

          <div className="space-y-4">
        
            <div>
              <Label htmlFor="fullName" className="mb-2 text-sm font-medium">
                Full Name
              </Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                readOnly
                className="border-neutral-200 bg-neutral-50 text-neutral-900 focus:border-neutral-200"
              />
            </div>

           
            <div>
              <Label htmlFor="email" className="mb-2 text-sm font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="border-neutral-300"
              />
            </div>

           
            <div className="relative sm:w-98">
              <Label className="text-sm font-medium text-neutral-900">
                Phone Number
              </Label>
              <div className="relative mt-1.5">
                <Input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="h-9 w-full border border-neutral-300 bg-white pr-24 pl-3 text-sm"
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <Select
                    value={formData.phoneCountry}
                    onValueChange={(value) =>
                      handleSelectChange("phoneCountry", value)
                    }
                  >
                    <SelectTrigger className="font-urbanist flex h-9 justify-normal border-none bg-transparent font-medium text-neutral-900 shadow-none focus:ring-0 focus:outline-none">
                      <SelectValue placeholder="US" />
                    </SelectTrigger>
                    <SelectContent className="font-urbanist rounded-lg border border-neutral-100 bg-white shadow-md">
                      <SelectItem
                        value="US"
                        className="text-sm hover:bg-gray-100 focus:bg-blue-50"
                      >
                        US
                      </SelectItem>
                      <SelectItem
                        value="CA"
                        className="text-sm hover:bg-gray-100 focus:bg-blue-50"
                      >
                        CA
                      </SelectItem>
                      <SelectItem
                        value="UK"
                        className="text-sm hover:bg-gray-100 focus:bg-blue-50"
                      >
                        UK
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            
            <div>
              <Label htmlFor="dateOfBirth" className="mb-2 text-sm font-medium">
                Date of Birth
              </Label>
              <Input
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                readOnly
                className="border-neutral-200 bg-neutral-50 text-neutral-900 focus:border-neutral-200 sm:w-47"
              />
            </div>

            
            <div>
              <Label htmlFor="nationalId" className="mb-2 text-sm font-medium">
                National ID / Passport
              </Label>
              <Input
                id="nationalId"
                name="nationalId"
                value={formData.nationalId}
                readOnly
                className="border-neutral-200 bg-neutral-50 text-neutral-900 focus:border-neutral-200 sm:w-98"
              />
            </div>

           
            <div>
              <Label className="mb-2 text-sm font-medium">Gender</Label>
              <Input
                id="gender"
                name="gender"
                value={formData.gender}
                readOnly
                className="border-neutral-200 bg-neutral-50 text-neutral-900 focus:border-neutral-200 sm:w-47"
              />
            </div>
          </div>
        </section>
        <div className="my-8 h-px w-full bg-neutral-200"></div>
      
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900">
            Address Information
          </h2>
          <p className="mb-8 text-sm text-neutral-500">
            Keep your contact and billing address up to date.
          </p>

          <div className="space-y-4">
           
            <div>
              <Label
                htmlFor="streetAddress"
                className="mb-2 text-sm font-medium"
              >
                Street Address
              </Label>
              <Textarea
                id="streetAddress"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleInputChange}
                className="h-18 resize-none border-neutral-300"
                row={4}
              />
            </div>

           
            <div>
              <Label className="mb-2 text-sm font-medium">Country</Label>
              <Select
                value={formData.country}
                onValueChange={(value) => handleSelectChange("country", value)}
              >
                <SelectTrigger className="w-full border-neutral-300 text-neutral-900 sm:w-98">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white text-neutral-900">
                  <SelectItem value="United States">United States</SelectItem>
                  <SelectItem value="Canada">Canada</SelectItem>
                  <SelectItem value="Mexico">Mexico</SelectItem>
                </SelectContent>
              </Select>
            </div>

           
            <div>
              <Label className="mb-2 text-sm font-medium">State/Province</Label>
              <Select
                value={formData.state}
                onValueChange={(value) => handleSelectChange("state", value)}
              >
                <SelectTrigger className="w-full border-neutral-300 text-neutral-900 sm:w-98">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white text-neutral-900">
                  <SelectItem value="New York">New York</SelectItem>
                  <SelectItem value="California">California</SelectItem>
                  <SelectItem value="Texas">Texas</SelectItem>
                </SelectContent>
              </Select>
            </div>

           
            <div>
              <Label className="mb-2 text-sm font-medium">City</Label>
              <Select
                value={formData.city}
                onValueChange={(value) => handleSelectChange("city", value)}
              >
                <SelectTrigger className="w-full border-neutral-300 text-neutral-900 sm:w-98">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white text-neutral-900">
                  <SelectItem value="New York">New York</SelectItem>
                  <SelectItem value="Los Angeles">Los Angeles</SelectItem>
                  <SelectItem value="Chicago">Chicago</SelectItem>
                </SelectContent>
              </Select>
            </div>

            
            <div>
              <Label htmlFor="zipCode" className="mb-2 text-sm font-medium">
                Zip/Postal Code
              </Label>
              <Input
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                className="border-neutral-300 sm:w-47"
              />
            </div>
          </div>
        </section>
        <div className="my-8 h-px w-full bg-neutral-200"></div>
       
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900">
            Security Settings
          </h2>
          <p className="mb-8 text-sm text-neutral-500">
            Control your login credentials and session activity.
          </p>

          
          <div className="mb-8 max-w-106 rounded-lg bg-neutral-50 px-4 py-4">
            <h3 className="mb-3 text-base font-semibold text-neutral-900">
              Change Password
            </h3>
            <div className="space-y-4">
              <div>
                <Label
                  htmlFor="oldPassword"
                  className="mb-2 text-sm font-medium text-neutral-900"
                >
                  Old Password
                </Label>
                <Input
                  id="oldPassword"
                  type="password"
                  name="oldPassword"
                  value={formData.oldPassword}
                  onChange={handleInputChange}
                  className="border-neutral-300 bg-white"
                />
              </div>

              <div>
                <Label
                  htmlFor="newPassword"
                  className="mb-2 text-sm font-medium text-neutral-900"
                >
                  New Password
                </Label>
                <Input
                  id="newPassword"
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className="border-neutral-300 bg-white"
                />
              </div>

              <div>
                <Label
                  htmlFor="confirmPassword"
                  className="mb-2 text-sm font-medium text-neutral-900"
                >
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="border-neutral-300 bg-white"
                />
              </div>

              <Button
                onClick={handleChangePassword}
                className="rounded-md bg-blue-500 text-sm font-semibold text-white hover:bg-blue-700 sm:w-38"
              >
                Change Password
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Label
              htmlFor="two-factor-toggle"
              className="relative inline-flex cursor-pointer items-center"
            >
              <Input
                type="checkbox"
                id="two-factor-toggle"
                checked={formData.twoFactor}
                onChange={handleToggle}
                className="peer sr-only"
              />
             
              <div className="h-5 w-9 rounded-full border border-neutral-300 bg-white transition-colors duration-200 ease-in-out peer-checked:bg-blue-500"></div>
              
              <div className="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-neutral-300 shadow-md transition-transform duration-200 ease-in-out peer-checked:translate-x-4 peer-checked:bg-white"></div>
            </Label>

            <Label
              htmlFor="two-factor-toggle"
              className="font-geist cursor-pointer text-sm font-medium text-neutral-900"
            >
              Two-Factor Authentication
            </Label>
          </div>
        </section>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-150 rounded-2xl border-none p-6 !pb-0 shadow-lg sm:p-8">
            <DialogHeader>
              <DialogTitle className="text-lg font-medium text-neutral-900">
                Change Password Verification
              </DialogTitle>
              <DialogDescription className="mt-1 text-sm text-neutral-500">
                Enter the OTP sent to
                <span className="px-1 font-medium text-neutral-800">
                  {formData.email}
                </span>
                and
                <span className="px-1 font-medium text-neutral-800">
                  {formData.phone}
                </span>
                to confirm your password change.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-2">
              <Label className="mb-2 text-sm font-medium text-neutral-900">
                Submit OTP
              </Label>
              <div className="mt-2 flex space-x-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    className="h-9 w-12 rounded-lg border border-neutral-300 text-center text-lg font-semibold text-neutral-900 focus:border-neutral-300 focus:ring-0 focus:outline-none"
                  />
                ))}
              </div>
            </div>

            <div className="relative left-[-2rem] w-[calc(100%+4rem)] rounded-b-2xl border-t border-neutral-500/4 bg-neutral-50 px-6 py-4 sm:left-[-2rem]">
              <DialogFooter className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setOpen(false)}
                  className="border-neutral-300 bg-neutral-50 text-neutral-900 hover:bg-white"
                >
                  Cancel
                </Button>
                <Button className="bg-blue-500 text-white hover:bg-blue-600">
                  Change Password
                </Button>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
