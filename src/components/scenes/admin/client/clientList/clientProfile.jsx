"use client";

import LinkProfileModal from "@/components/shared/linkProfileModal";
import {
  ArrowUpRightIcon,
  ClientCheck,
  DropdownIcon,
  LikeProfile,
  ProfileEditPencil,
} from "@/components/shared/svgs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, X } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

function TagsModal({ isOpen, onClose }) {
  const [selectedTags, setSelectedTags] = useState([
    "VIP",
    "Health Insurance",
    "Long-Term",
  ]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const allTags = [
    "VIP",
    "High-Value Client",
    "Health Insurance",
    "Long-Term",
    "Renewal Due",
    "Pending Claim",
    "Life Coverage",
    "Corporate Account",
    "Follow-up Required",
  ];

  const handleRemoveTag = (tag) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  const handleToggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      handleRemoveTag(tag);
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSave = () => {
    onClose();
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isDropdownOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-150 rounded-lg bg-white shadow-lg">
        <div className="flex items-center justify-between p-6">
          <div>
            <h2 className="text-lg font-medium text-neutral-900">Tags</h2>
            <p className="mt-1 text-sm text-neutral-500">
              Add relevant tags to organize or filter.
            </p>
          </div>
          <Button
            onClick={onClose}
            className="bg-transparent text-neutral-900 shadow-none transition-colors hover:bg-transparent hover:text-neutral-600"
          >
            <X size={36} />
          </Button>
        </div>

        <div className="space-y-6 p-6">
          <div>
            <h3 className="mb-2 text-sm font-medium text-neutral-900">
              Select Tags
            </h3>

            <div className="relative" ref={dropdownRef}>
              <Button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex h-9 w-full items-center justify-between rounded-lg border border-neutral-300 bg-white px-4 text-left transition-colors hover:bg-transparent"
              >
                <span className="text-sm text-neutral-900">
                  {selectedTags.length} Selected
                </span>
                <DropdownIcon className="text-neutral-500" />
              </Button>

              {isDropdownOpen && (
                <div className="scrollbarHidden absolute top-full right-0 left-0 z-10 mt-2 max-h-64 overflow-y-auto rounded-lg border-none bg-white px-1 shadow-lg">
                  {allTags.map((tag) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <Button
                        key={tag}
                        onClick={() => handleToggleTag(tag)}
                        className={`flex w-full items-center justify-start gap-3 bg-transparent px-4 py-3 text-left shadow-none transition-colors hover:bg-transparent ${
                          isSelected ? "bg-blue-50" : "hover:bg-gray-50"
                        }`}
                      >
                        <div
                          className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border-2 transition-colors ${
                            isSelected
                              ? "border-blue-600 bg-blue-600"
                              : "border-neutral-300 bg-white"
                          }`}
                        >
                          {isSelected && (
                            <ClientCheck size={8} className="px-1 text-white" />
                          )}
                        </div>
                        <span className="text-foreground font-medium">
                          {tag}
                        </span>
                      </Button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {selectedTags.length > 0 && (
            <>
              <div className="flex items-center gap-4">
                <div className="flex-1 border-t border-dashed border-neutral-200" />
                <span className="text-xs text-neutral-400">SELECTED</span>
                <div className="flex-1 border-t border-dashed border-neutral-200" />
              </div>

              <div className="flex flex-wrap gap-4">
                {selectedTags.map((tag) => (
                  <div
                    key={tag}
                    className="flex h-6.5 items-center gap-2 rounded-lg bg-gray-50 px-3"
                  >
                    <span className="text-sm text-neutral-900">{tag}</span>
                    <Button
                      onClick={() => handleRemoveTag(tag)}
                      className="h-5.5 w-5.5 rounded-full bg-neutral-500/4 text-neutral-500 shadow-none transition-colors hover:bg-transparent hover:text-gray-600"
                    >
                      <X size={14} />
                    </Button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 border-none bg-neutral-50 p-4">
          <Button
            onClick={onClose}
            className="rounded-lg border border-neutral-300 bg-transparent px-6 py-2 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-100"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="rounded-lg bg-blue-500 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Save Tags
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function ClientProfile({
  hideLinkProfileOption,
  clientData = null,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isTagsModalOpen, setIsTagsModalOpen] = useState(false);
  const [isLinkProfileModalOpen, setIsLinkProfileModalOpen] = useState(false);

  // Drag to scroll state
  const linkedProfilesRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    if (!linkedProfilesRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - linkedProfilesRef.current.offsetLeft);
    setScrollLeft(linkedProfilesRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !linkedProfilesRef.current) return;
    e.preventDefault();
    const x = e.pageX - linkedProfilesRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Adjust scroll speed
    linkedProfilesRef.current.scrollLeft = scrollLeft - walk;
  };

  const name = clientData?.name || searchParams.get("name");
  const email = clientData?.email || searchParams.get("email");
  const phone = clientData?.phone || searchParams.get("phone");
  const country = clientData?.country || searchParams.get("country");
  const status = clientData?.status || searchParams.get("status");
  const type = clientData?.type || searchParams.get("type");
  const avatar = clientData?.avatar || searchParams.get("avatar");
  const dob = clientData?.dob || searchParams.get("dob");
  const address = clientData?.address || searchParams.get("address");
  const gender = clientData?.gender || searchParams.get("gender");
  const occupation = clientData?.occupation || searchParams.get("occupation");
  const initialLinkedAccounts = clientData?.linkedAccounts || [];
  const [linkedAccounts, setLinkedAccounts] = useState(initialLinkedAccounts);

  useEffect(() => {
    if (clientData?.linkedAccounts) {
      setLinkedAccounts(clientData.linkedAccounts);
    }
  }, [clientData]);

  const handleLinkProfile = (newProfile) => {
    setLinkedAccounts((prev) => [newProfile, ...prev]);
    setIsLinkProfileModalOpen(false);
  };

  const addressParts = address
    ? address.split(",").map((part) => part.trim())
    : [];

  const statusColor =
    status === "Active"
      ? "bg-[#c7fff4] text-[#058076]"
      : "bg-[#ffe1e1] text-[#b91c1c]";
  const dotColor = status === "Active" ? "bg-[#04c8b2]" : "bg-[#dc2626]";

  return (
    <div className="h-full min-h-fit w-full space-y-6 border-neutral-200 2xl:max-w-[512px] 2xl:border-r 2xl:border-b-0 2xl:p-4">
      <div>
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              onClick={() => router.push("/clients")}
              className="group h-fit gap-2 bg-transparent !px-0 py-0 text-sm leading-none font-semibold text-neutral-900 shadow-none hover:bg-transparent"
            >
              <ArrowLeft className="size-4" />
              <span className="relative">
                Client List
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-neutral-900 duration-300 group-hover:w-full" />
              </span>
            </Button>
          </div>
          <Button
            variant="outline"
            className="w-22 gap-2 border-neutral-300 bg-white text-sm font-semibold text-neutral-900"
          >
            <ProfileEditPencil className="h-4 w-4" />
            Edit
          </Button>
        </div>

        <div className="mb-6">
          <div className="mb-8 flex flex-col items-start gap-6">
            <Image
              src={avatar || "/placeholder.svg"}
              alt={name || "Client"}
              width={128}
              height={128}
              className="rounded-lg object-cover"
            />
            <div className="flex-1">
              <h2 className="font-urbanist mb-3 text-2xl font-bold text-neutral-900">
                {name || "N/A"}
              </h2>
              <div className="flex items-center gap-3">
                <span className="font-urbanist text-sm font-medium text-neutral-500">
                  {type || "Individual"}
                </span>
                <div
                  className={`flex h-5 items-center gap-2 rounded-full px-3 py-1 ${statusColor}`}
                >
                  <div className={`h-2 w-2 rounded-full ${dotColor}`}></div>
                  <span className="text-xs">{status}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="grid grid-cols-[200px_1fr] gap-4">
              <span className="font-urbanist text-sm font-medium text-neutral-500">
                Email
              </span>
              <span className="font-urbanist text-sm font-medium text-neutral-900">
                {email || "N/A"}
              </span>
            </div>

            <div className="grid grid-cols-[200px_1fr] gap-4">
              <span className="font-urbanist text-sm font-medium text-neutral-500">
                Phone Number
              </span>
              <span className="font-urbanist text-sm font-medium text-neutral-900">
                {phone || "N/A"}
              </span>
            </div>

            <div className="grid grid-cols-[200px_1fr] gap-4">
              <span className="font-urbanist text-sm font-medium text-neutral-500">
                Country
              </span>
              <span className="font-urbanist text-sm font-medium text-neutral-900">
                {country || "N/A"}
              </span>
            </div>

            <div className="grid grid-cols-[200px_1fr] gap-4">
              <span className="font-urbanist text-sm font-medium text-neutral-500">
                Physical Address
              </span>
              <div className="font-urbanist text-sm font-medium text-neutral-900">
                {addressParts.length > 0 ? (
                  addressParts.map((part, index) => (
                    <div key={index}>{part}</div>
                  ))
                ) : (
                  <div>N/A</div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-[200px_1fr] gap-4">
              <span className="font-urbanist text-sm font-medium text-neutral-500">
                Mailing Address
              </span>
              <div className="font-urbanist text-sm font-medium text-neutral-900">
                {addressParts.length > 0 ? (
                  addressParts.map((part, index) => (
                    <div key={index}>{part}</div>
                  ))
                ) : (
                  <div>N/A</div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-[200px_1fr] gap-4">
              <span className="font-urbanist text-sm font-medium text-neutral-500">
                Date of Birth
              </span>
              <span className="font-urbanist text-sm font-medium text-neutral-900">
                {dob || "N/A"}
              </span>
            </div>

            <div className="grid grid-cols-[200px_1fr] gap-4">
              <span className="font-urbanist text-sm font-medium text-neutral-500">
                Gender
              </span>
              <span className="font-urbanist text-sm font-medium text-neutral-900">
                {gender || "N/A"}
              </span>
            </div>

            <div className="grid grid-cols-[200px_1fr] gap-4">
              <span className="font-urbanist text-sm font-medium text-neutral-500">
                Occupation
              </span>
              <span className="font-urbanist text-sm font-medium text-neutral-900">
                {occupation || "N/A"}
              </span>
            </div>
          </div>
        </div>

        <div className="mb-7">
          <div className="mb-4 flex items-center gap-1">
            <h3 className="font-geist text-sm font-semibold text-neutral-900">
              Tags
            </h3>
            <Button
              onClick={() => setIsTagsModalOpen(true)}
              className="h-5 w-5 bg-transparent shadow-none transition-opacity hover:bg-transparent hover:opacity-70"
            >
              <ProfileEditPencil className="h-4 w-4 text-neutral-900" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 rounded-full bg-blue-500/4 px-4 py-2">
              <span className="text-sm text-neutral-900">VIP</span>
              <Button className="h-5 w-5 rounded-full bg-transparent shadow-none transition-opacity hover:bg-neutral-500/4 hover:opacity-70">
                <X className="h-2 w-2 text-neutral-500" />
              </Button>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-blue-500/4 px-4 py-2">
              <span className="text-sm text-neutral-900">Health Insurance</span>
              <Button className="h-5 w-5 rounded-full bg-transparent shadow-none transition-opacity hover:bg-neutral-500/4 hover:opacity-70">
                <X className="h-2 w-2 text-neutral-500" />
              </Button>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-blue-500/4 px-4 py-2">
              <span className="text-sm text-neutral-900">Long-Term</span>
              <Button className="h-5 w-5 rounded-full bg-transparent shadow-none transition-opacity hover:bg-neutral-500/4 hover:opacity-70">
                <X className="h-2 w-2 text-neutral-500" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-geist mb-2 text-sm font-semibold text-neutral-900">
            Internal Notes
          </h3>
          <Textarea
            className="resize-none rounded-lg border border-neutral-300 p-4 text-neutral-900 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
            placeholder="Add notes here..."
            defaultValue="Prefers email over phone. Sensitive to premium changes."
            rows={4}
          />
        </div>

        {!hideLinkProfileOption && (
          <div className="scrollbar-hide overflow-y-auto">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-geist text-sm font-semibold text-neutral-900">
                Linked Profiles
              </h3>
              <Dialog
                open={isLinkProfileModalOpen}
                onOpenChange={setIsLinkProfileModalOpen}
              >
                <DialogTrigger asChild>
                  <Button className="group h-fit gap-2 bg-transparent !px-0 py-0 text-sm leading-none font-semibold text-neutral-900 shadow-none hover:bg-transparent focus:ring-0 focus-visible:ring-0">
                    <Plus className="size-5" />
                    <span className="relative">
                      Link Profile
                      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-neutral-900 duration-300 group-hover:w-full" />
                    </span>
                  </Button>
                </DialogTrigger>
                <DialogContent
                  overlayClassName="bg-black/25 duration-300 ease-out"
                  className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-100 data-[state=closed]:zoom-out-100 data-[state=open]:slide-in-from-bottom-[48vh] data-[state=closed]:slide-out-to-bottom-[48vh] data- w-auto max-w-fit border-none bg-transparent p-0 shadow-none duration-300 ease-out"
                  showCloseButton={false}
                >
                  <DialogTitle className="sr-only">Link Profile</DialogTitle>
                  <LinkProfileModal
                    onClose={() => setIsLinkProfileModalOpen(false)}
                    onConfirm={handleLinkProfile}
                    currentClientId={clientData?.id}
                  />
                </DialogContent>
              </Dialog>
            </div>
            <div
              ref={linkedProfilesRef}
              className={`scrollbar-hide flex gap-1 overflow-x-auto ${isDragging ? "cursor-grabbing select-none" : "cursor-grab"}`}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
            >
              {linkedAccounts.length > 0 ? (
                linkedAccounts.map((account) => (
                  <div
                    key={account.id}
                    className="group flex h-12 w-fit shrink-0 cursor-pointer items-center gap-3 rounded-full border border-transparent bg-neutral-50 p-2 pr-3.5 transition-colors duration-300 ease-out hover:border-blue-500 hover:bg-blue-500/8"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={account.avatar} />
                      <AvatarFallback>
                        {account.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-geist text-sm font-semibold text-neutral-900 duration-300 ease-out group-hover:text-blue-500">
                        {account.name}
                      </h4>
                      <p className="text-xs text-neutral-500">
                        {account.relation}
                      </p>
                    </div>
                    <ArrowUpRightIcon className="w-5 text-neutral-500 group-hover:text-blue-500" />
                  </div>
                ))
              ) : (
                <p className="p-2 text-sm text-neutral-500">
                  No linked profiles found.
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      <TagsModal
        isOpen={isTagsModalOpen}
        onClose={() => setIsTagsModalOpen(false)}
      />
    </div>
  );
}
