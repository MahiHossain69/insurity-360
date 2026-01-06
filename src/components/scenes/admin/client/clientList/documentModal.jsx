"use client";

import { useState } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function DocumentModal({ open, onOpenChange, onSave }) {
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  if (!open) return null;

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
    if (selectedFile && onSave) {
      const fileSizeKB = (selectedFile.size / 1024).toFixed(0);
      const fileType = selectedFile.type.split("/")[1]?.toUpperCase() || "FILE";

      onSave({
        name: fileName || selectedFile.name,
        file: selectedFile,
        size: `${fileSizeKB} KB`,
        type: fileType,
      });

      setFileName("");
      setSelectedFile(null);
      onOpenChange(false);
    }
  };

  const handleCancel = () => {
    setFileName("");
    setSelectedFile(null);
    onOpenChange(false);
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
        onClick={handleCancel}
      />

      <div className="fixed top-1/2 left-1/2 z-50 h-full max-h-[90vh] w-[95%] max-w-[640px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl bg-white p-5 shadow-lg sm:p-8 lg:h-[1080px]">
        <div className="mb-5 flex items-center justify-between border-b border-neutral-100 pb-4">
          <h2 className="text-xl font-semibold text-neutral-900">
            Add New Document
          </h2>
          <Button
            onClick={handleCancel}
            className="bg-transparent text-neutral-900 shadow-none hover:bg-transparent hover:text-neutral-500"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="mb-6">
          <Label className="mb-2 flex items-center text-sm font-medium text-neutral-900">
            File Name
            <span className="-mt-2 text-[10px] text-neutral-400 uppercase">
              Optional
            </span>
          </Label>
          <Input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder=""
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-[#3787ef] focus:outline-none sm:text-base"
          />
        </div>

        <div className="mb-8">
          <Label className="mb-2 block text-sm font-medium text-neutral-900 sm:text-base">
            Upload File
          </Label>
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`h-17 cursor-pointer rounded-xl border-2 border-dashed text-center transition-colors ${
              isDragging
                ? "border-neutral-300 bg-[#f0f9ff]"
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
            <Label htmlFor="file-upload" className="mt-2 block cursor-pointer">
              <div className="flex flex-col items-center gap-2">
                <Upload className="h-4.5 w-4.5 text-neutral-500" />
                <p className="text-sm text-neutral-500">
                  {selectedFile
                    ? `Selected: ${selectedFile.name}`
                    : "Drag your file here or click to upload"}
                </p>
              </div>
            </Label>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 z-50 flex w-full flex-col items-center justify-end gap-3 bg-neutral-50 p-4 sm:flex-row sm:gap-2 sm:p-6">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="w-full border-neutral-300 px-5 py-2 text-sm text-neutral-900 hover:bg-[#f8fafc] sm:w-auto sm:text-base"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!selectedFile}
            className="w-full bg-[#3787ef] px-5 py-2 text-sm text-white hover:bg-[#2563eb] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:text-base"
          >
            Save
          </Button>
        </div>
      </div>
    </>
  );
}
