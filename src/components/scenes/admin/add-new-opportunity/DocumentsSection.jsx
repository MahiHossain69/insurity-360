"use client";
import { DropInfoIcon } from "@/components/shared/svgs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Pencil, Trash2, X } from "lucide-react";
import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { GoArrowRight } from "react-icons/go";
import { PiFolderFill, PiUploadSimple } from "react-icons/pi";

export default function DocumentsSection({ onNext }) {
  const form = useFormContext();
  const fileInputRef = useRef(null);
  const [editingFileId, setEditingFileId] = useState(null);
  const [editedName, setEditedName] = useState("");

  const uploadedFiles = form.getValues("uploadedFiles") || [];
  const documentName = form.getValues("documentName") || "";

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const newFile = {
      id: Date.now(),
      name: documentName || file.name,
      size: (file.size / 1024).toFixed(1) + " KB",
      type: file.type.split("/")[1]?.toUpperCase() || "FILE",
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      uploader: "Faiz Ahmed Jiad",
      authorAvatar: "/images/users/user.png",
    };
    form.setValue("uploadedFiles", [...uploadedFiles, newFile], {
      shouldDirty: true,
    });
    form.setValue("documentName", "", { shouldDirty: true });
    event.target.value = "";
  };

  const handleSaveEdit = (fileId) => {
    const next = uploadedFiles.map((f) =>
      f.id === fileId ? { ...f, name: editedName } : f,
    );
    form.setValue("uploadedFiles", next, { shouldDirty: true });
    setEditingFileId(null);
    setEditedName("");
  };

  const handleRemoveFile = (fileId) => {
    const next = uploadedFiles.filter((f) => f.id !== fileId);
    form.setValue("uploadedFiles", next, { shouldDirty: true });
  };

  return (
    <>
      <div className="mb-12 max-w-4xl">
        <h1 className="mb-1 text-2xl font-semibold text-neutral-900">
          Documents
        </h1>
        <p className="text-sm text-neutral-500">
          Upload necessary documents related to the policy and holder.
        </p>
      </div>

      <div className="space-y-1" style={{ maxWidth: "800px" }}>
        <section>
          <div className="-mt-5 mb-7 space-y-4 rounded-md bg-neutral-50 p-4">
            <div>
              <Label
                htmlFor="document-name"
                className="text-sm font-medium text-neutral-900"
              >
                File Name{" "}
                <span className="font-gest -mt-2 text-[10px] font-semibold text-neutral-400 uppercase">
                  Optional
                </span>
              </Label>
              <FormField
                name="documentName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="document-name"
                        className="mt-1.5 border-neutral-300 bg-white focus:border-neutral-300"
                        placeholder=""
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div>
              <Label
                htmlFor="upload-file"
                className="text-sm font-medium text-neutral-900"
              >
                Upload File
              </Label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="mt-1.5 cursor-pointer rounded-lg border-2 border-dashed border-neutral-300 bg-white p-8 text-center transition-colors hover:bg-neutral-100 sm:h-9"
              >
                <PiUploadSimple className="mx-auto mb-1 h-6 w-6 text-neutral-500 sm:-mt-6" />
                <p className="text-sm text-neutral-500">
                  Drag your file here or click to upload
                </p>
                <Input
                  ref={fileInputRef}
                  id="upload-file"
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </div>
            </div>

            <Button
              variant="outline"
              className="h-9 w-23 border-neutral-300 bg-transparent hover:bg-neutral-200"
            >
              Save File
            </Button>
          </div>

          {uploadedFiles.length > 0 && (
            <div className="mt-2 grid grid-cols-1 gap-2 border border-r-0 border-b-0 border-l-0 border-t-neutral-200 pt-7 md:grid-cols-2">
              {uploadedFiles.map((file) => (
                <Card
                  key={file.id}
                  className="rounded-lg border-none bg-neutral-50 p-2 shadow-none sm:w-99"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-24 w-24 items-center justify-center rounded bg-[#dbeafe]">
                      <PiFolderFill className="h-19 w-19 text-blue-300" />
                    </div>
                    <div className="mt-2 min-w-0 flex-1">
                      <div className="mb-1 flex items-start justify-between gap-2">
                        {editingFileId === file.id ? (
                          <div className="flex w-full items-center gap-2">
                            <Input
                              className="h-7 border-neutral-300 text-sm"
                              value={editedName}
                              onChange={(e) => setEditedName(e.target.value)}
                            />
                            <Button
                              size="sm"
                              variant="ghost"
                              className="p-1 text-green-600 hover:bg-green-50"
                              onClick={() => handleSaveEdit(file.id)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="p-1 text-red-500 hover:bg-red-50"
                              onClick={() => setEditingFileId(null)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <>
                            <h4 className="truncate text-sm font-semibold text-neutral-900">
                              {file.name}
                            </h4>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button className="-mt-2 bg-transparent text-neutral-500 shadow-none hover:bg-transparent hover:text-neutral-500">
                                  <DropInfoIcon className="h-4 w-4 text-neutral-900" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent
                                align="end"
                                className="border-neutral-50 bg-white"
                              >
                                <DropdownMenuItem
                                  className="flex cursor-pointer items-center gap-2 text-sm"
                                  onClick={() => {
                                    setEditingFileId(file.id);
                                    setEditedName(file.name);
                                  }}
                                >
                                  <Pencil className="h-4 w-4" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="flex cursor-pointer items-center gap-2 text-sm text-red-600 focus:text-red-600"
                                  onClick={() => handleRemoveFile(file.id)}
                                >
                                  <Trash2 className="h-4 w-4" /> Remove
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </>
                        )}
                      </div>

                      <p className="-mt-2 mb-2 text-xs text-neutral-400">
                        {file.size} • {file.type} • {file.date}
                      </p>

                      <div className="mt-6.5 flex items-center gap-2">
                        <Avatar className="h-5 w-5">
                          <AvatarImage
                            src={file.authorAvatar || "/placeholder.svg"}
                            alt={file.uploader || "Unknown"}
                          />
                          <AvatarFallback className="bg-[#dbeafe] text-xs text-neutral-900">
                            {file.uploader?.[0] || "?"}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-neutral-500">
                          {file.uploader}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>

        <div className="my-7 h-[1px] w-full bg-neutral-200"></div>

        <div className="flex items-center gap-4">
          <Button
            onClick={onNext}
            className="flex h-9 w-23 items-center gap-2 rounded-lg bg-blue-500 text-sm font-semibold text-white hover:bg-blue-600"
          >
            Next <GoArrowRight className="h-5 w-5 text-white" />
          </Button>
          <button className="text-sm font-semibold text-neutral-900 transition-colors hover:text-neutral-500">
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
