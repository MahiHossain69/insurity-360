"use client";

import React, { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

export default function ClientDocumentSheet({ open, onOpenChange, onSave }) {
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setSelectedFile(files[0]);
      if (!fileName) setFileName(files[0].name);
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      if (!fileName) setFileName(files[0].name);
    }
  };

  const handleSave = () => {
    if (!selectedFile) return;
    const fileSizeKB = (selectedFile.size / 1024).toFixed(0);
    const fileType = selectedFile.type.split("/")[1]?.toUpperCase() || "FILE";

    const newDocument = {
      name: fileName || selectedFile.name,
      size: `${fileSizeKB} KB`,
      type: fileType,
      file: selectedFile,
    };

    onSave(newDocument);
    setFileName("");
    setSelectedFile(null);
    onOpenChange(false);
  };

  const handleCancel = () => {
    setFileName("");
    setSelectedFile(null);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="
          sm:max-w-lg w-full h-full flex flex-col
          border-l border-neutral-200 bg-white
          px-4 
        "
      >
       
        <SheetHeader className="mt-4 !p-0">
          <SheetTitle className="text-lg font-semibold text-neutral-900">
            Add Document
          </SheetTitle>
          <SheetDescription className="text-sm text-neutral-500">
            Upload a document with an optional custom name.
          </SheetDescription>
        </SheetHeader>

        
        <div className="flex-1 overflow-y-auto mt-6 space-y-5 pr-1">
         
          <div>
            <Label className="text-sm font-medium text-neutral-900">
              File Name
              <span className="text-[10px] -mt-2 uppercase text-neutral-400 ml-1">
                Optional
              </span>
            </Label>
            <Input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder=""
              className="mt-1"
            />
          </div>

          {/* Upload Section */}
          <div>
            <Label className="text-sm font-medium text-neutral-900">
              Upload File
            </Label>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`mt-2 cursor-pointer h-17.5 rounded-xl border-2 border-dashed text-center transition-colors ${
                isDragging
                  ? "border-blue-400 bg-blue-50"
                  : "border-neutral-300"
              }`}
            >
              <Input
                type="file"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
                accept=".pdf,.jpg,.jpeg,.png,.docx"
              />
              <Label htmlFor="file-upload" className="block cursor-pointer py-2">
                <div className="flex flex-col items-center gap-2">
                  <Upload className="h-5 w-5 text-neutral-500" />
                  <p className="text-sm text-neutral-500">
                    {selectedFile
                      ? `Selected: ${selectedFile.name}`
                      : "Drag your file here or click to upload"}
                  </p>
                </div>
              </Label>
            </div>
          </div>
        </div>

       
        <div className="border-t border-neutral-200 pt-4 pb-4 flex justify-end gap-2 bg-white sticky bottom-0">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="border-neutral-300 text-neutral-900"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!selectedFile}
            className="bg-[#3787ef] text-white hover:bg-[#2563eb]"
          >
            Save
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
