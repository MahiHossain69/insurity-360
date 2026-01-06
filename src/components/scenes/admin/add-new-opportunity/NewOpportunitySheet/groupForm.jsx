"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckIcon, UploadedImageIcon } from "@/components/shared/svgs";
import { Upload, X, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IoMdCheckmark } from "react-icons/io";
import { PiUploadSimple } from "react-icons/pi";

export function GroupForm() {
  const [proofFile, setProofFile] = useState(null);
  const [groupFile, setGroupFile] = useState(null);
  const [memberCount, setMemberCount] = useState(2);
  const [members, setMembers] = useState([
    { id: 1, name: "", email: "", relation: "" },
    { id: 2, name: "", email: "", relation: "" },
  ]);

  const handleFileChange = (e, type) => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === "license") setProofFile(file);
      if (type === "groupImage") setGroupFile(file);
    }
  };

  const updateMemberCount = (newCount) => {
    if (newCount < 1) return;
    setMemberCount(newCount);

    if (newCount > members.length) {
      const newMembers = [...members];
      for (let i = members.length; i < newCount; i++) {
        newMembers.push({ id: i + 1, name: "", email: "", relation: "" });
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
    <div className="flex min-w-full flex-col">
      <div className="flex-1 p-6">
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label
                htmlFor="clientName"
                className="font-geist text-sm font-medium text-neutral-900"
              >
                Group Name
              </Label>
              <Input id="clientName" className="mt-1 border-neutral-300" />
            </div>

            <div>
              <div>
                <Label
                  htmlFor="gender"
                  className="font-geist text-sm font-medium text-neutral-900"
                >
                  Group Type
                </Label>
                <Select>
                  <SelectTrigger className="mt-1 w-114 border-neutral-300 sm:!max-w-99">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="male">NGO</SelectItem>
                    <SelectItem value="female">Club</SelectItem>
                    <SelectItem value="other">Sports Team</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div>
            <Label className="font-geist text-sm font-medium text-neutral-900">
              ID or Proof of Group
            </Label>

            {proofFile ? (
              <div className="mt-1 flex items-center justify-between rounded-lg border-none bg-neutral-50 p-3">
                <div className="flex items-center">
                  <UploadedImageIcon className="h-10 w-10" />
                  <div className="ml-3">
                    <p className="font-geist text-sm font-medium text-neutral-900">
                      {proofFile.name}
                    </p>
                    <p className="font-geist text-xs text-neutral-500">
                      {(proofFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                <X
                  className="h-6 w-6 cursor-pointer text-neutral-900"
                  onClick={() => setProofFile(null)}
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
                  hDrag your file here or click to upload
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
          <div className="mt-8 mb-8 h-[1px] w-full bg-neutral-200"></div>

          <div className="w-full space-y-4 rounded-lg bg-neutral-50 p-4">
            <div className="space-y-1">
              <h1 className="text-lg font-medium text-neutral-900">Members</h1>
              <p className="font-geist text-sm text-neutral-500">
                To set up group coverage, enter the number and details for each
                included person.
              </p>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-neutral-900">
                Number of Members
              </Label>
              <div className="flex items-center gap-0">
                <Input
                  type="number"
                  value={memberCount}
                  onChange={(e) =>
                    updateMemberCount(Number.parseInt(e.target.value) || 1)
                  }
                  className="h-9 w-54 rounded-r-none border-r-0 border-neutral-300 bg-white text-lg font-medium"
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

            <div className="flex w-full items-center justify-center">
              <div className="flex-grow border-t-2 border-dashed border-neutral-200"></div>
              <h3 className="mx-4 text-[11px] font-medium text-neutral-400 uppercase">
                Enter Members Details
              </h3>
              <div className="flex-grow border-t-2 border-dashed border-neutral-200"></div>
            </div>

            <div className="hidden w-full flex-row gap-3 sm:flex">
              <Label className="w-[33%] text-sm font-medium text-neutral-900">
                Name
              </Label>
              <Label className="w-[33%] text-sm font-medium text-neutral-900">
                Email
              </Label>
              <Label className="w-[33%] text-sm font-medium text-neutral-900">
                Relation
              </Label>
            </div>

            <div className="hidden space-y-4 sm:block">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="flex w-full flex-row gap-3 sm:gap-2"
                >
                  <div className="w-[33%]">
                    <Input
                      value={member.name}
                      onChange={(e) =>
                        updateMember(member.id, "name", e.target.value)
                      }
                      className="h-9 border-neutral-300 bg-white"
                    />
                  </div>
                  <div className="w-[33%]">
                    <Input
                      value={member.email}
                      onChange={(e) =>
                        updateMember(member.id, "email", e.target.value)
                      }
                      className="h-9 border-neutral-300 bg-white"
                    />
                  </div>
                  <div className="w-[33%]">
                    <Input
                      value={member.relation}
                      onChange={(e) =>
                        updateMember(member.id, "relation", e.target.value)
                      }
                      className="h-9 border-neutral-300 bg-white"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 sm:hidden">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-6"
                >
                  <div className="flex flex-col">
                    <Label className="text-sm font-medium text-neutral-900 sm:hidden">
                      Name
                    </Label>
                    <Input
                      value={member.name}
                      onChange={(e) =>
                        updateMember(member.id, "name", e.target.value)
                      }
                      className="h-9 border-neutral-300 bg-white sm:w-[580px]"
                    />
                  </div>

                  <div className="flex flex-col">
                    <Label className="text-sm font-medium text-neutral-900 sm:hidden">
                      Email
                    </Label>
                    <Input
                      value={member.email}
                      onChange={(e) =>
                        updateMember(member.id, "email", e.target.value)
                      }
                      className="h-9 border-neutral-300 bg-white sm:w-[286px]"
                    />
                  </div>

                  <div className="flex flex-col">
                    <Label className="text-sm font-medium text-neutral-900 sm:hidden">
                      Relation
                    </Label>
                    <Input
                      value={member.relation}
                      onChange={(e) =>
                        updateMember(member.id, "relation", e.target.value)
                      }
                      className="h-9 border-neutral-300 bg-white sm:flex-1"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 mb-8 h-[1px] w-full bg-neutral-200"></div>
          <div className="space-y-3">
            <div className="space-y-2">
              <Label className="font-geist text-sm font-medium text-neutral-900">
                Representative Name
              </Label>
              <Input id="clientName" className="mt-1 border-neutral-300" />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:max-w-99">
              <div>
                <Label
                  htmlFor="phoneNumber"
                  className="font-geist text-sm font-medium text-neutral-900"
                >
                  Representatives Phone Number
                </Label>
                <Input
                  id="phoneNumber"
                  type="number"
                  className="mt-1 border-neutral-300"
                />
              </div>
              <div>
                <Label
                  htmlFor="emailAddress"
                  className="font-geist text-sm font-medium text-neutral-900"
                >
                  Representatives Phone Number
                </Label>
                <Input
                  id="emailAddress"
                  type="email"
                  className="mt-1 border-neutral-300"
                />
              </div>
            </div>
          </div>
          <div className="mt-8 mb-8 h-[1px] w-full bg-neutral-200"></div>

          <div className="space-y-4 bg-neutral-50 p-4">
            <h3 className="font-geist text-lg font-medium text-neutral-900">
              Office Address
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
          <div className="mt-8 mb-8 h-[1px] w-full bg-neutral-200"></div>

          <div>
            <Label className="font-geist text-sm font-medium text-neutral-900">
              Group’s Logo
              <span className="font-geist -mt-2 text-[10px] font-semibold text-neutral-400">
                OPTIONAL
              </span>
            </Label>

            {groupFile ? (
              <div className="mt-1 flex items-center justify-between rounded-lg border-none bg-neutral-50 p-3">
                <div className="flex items-center">
                  <UploadedImageIcon className="h-10 w-10" />
                  <div className="ml-3">
                    <p className="font-geist text-sm font-medium text-neutral-900">
                      {groupFile.name}
                    </p>
                    <p className="font-geist text-xs text-neutral-500">
                      {(groupFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                <X
                  className="h-6 w-6 cursor-pointer text-neutral-900"
                  onClick={() => setGroupFile(null)}
                />
              </div>
            ) : (
              <div
                className="mt-1 h-18 cursor-pointer rounded-lg border-2 border-dashed border-neutral-300 p-8 text-center transition-colors"
                onClick={() =>
                  document.getElementById("groupImageUpload")?.click()
                }
              >
                <PiUploadSimple className="mx-auto -mt-5 mb-2 h-5 w-5 text-neutral-500" />
                <p className="font-geist text-sm text-neutral-500">
                  Drag your file here or click to upload
                </p>
              </div>
            )}

            <Input
              id="groupImageUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileChange(e, "groupImage")}
            />
          </div>

          <div className="mt-8 mb-8 h-[1px] w-full bg-neutral-200"></div>
        </div>
      </div>
      <div className="sticky bottom-0 flex w-full justify-end gap-4 border-t border-neutral-500/4 bg-neutral-50 px-6 py-4">
        <Button className="rounded-md border border-neutral-300 bg-transparent px-4 py-2.5 font-semibold hover:bg-transparent">
          Cancel
        </Button>
        <Button
          variant="outline"
          className="bg-blue-500 px-4 py-2.5 text-white hover:bg-blue-400"
        >
          <CheckIcon className="h-5 w-5 text-neutral-900" />
          Save & Select
        </Button>
      </div>
    </div>
  );
}
