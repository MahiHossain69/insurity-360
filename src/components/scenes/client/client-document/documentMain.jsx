"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { PiFolderFill } from "react-icons/pi";
import { Plus } from "lucide-react";
import { DropInfoIcon } from "@/components/shared/svgs";
import ClientDocumentModal from "./clientDocumentModal";

const DocumentMain = () => {
  const [documents, setDocuments] = useState([]);
  const [documentModalOpen, setDocumentModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [editingDocId, setEditingDocId] = useState(null);
  const [editName, setEditName] = useState("");

  const handleAddDocument = (newDoc) => {
    const newDocument = {
      id: Date.now(),
      name: newDoc.name,
      size: newDoc.size,
      type: newDoc.type,
      date: new Date().toLocaleDateString(),
      author: "Faiz Ahmed Jiad",
      authorAvatar: "/images/users/user.png",
      thumbnail: null,
    };
    setDocuments([...documents, newDocument]);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-6 flex items-center justify-end">
        <Button
          variant="ghost"
          className="rounded-md bg-blue-500 text-sm font-semibold text-white hover:bg-blue-700"
          onClick={() => setDocumentModalOpen(true)}
        >
          <Plus className="h-5 w-5" />
          Add Document
        </Button>
      </div>

     
      {documents.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <PiFolderFill className="mb-4 h-16 w-16 text-[#cbd5e1]" />
          <h3 className="mb-2 text-lg font-semibold text-neutral-900">
            No documents yet
          </h3>
          <p className="mb-6 text-sm text-neutral-500">
            Get started by adding your first document
          </p>
        </div>
      ) : (
        <div>
          <h3 className="mb-2 text-sm font-semibold text-neutral-900">
            My Documents
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {documents.map((doc) => (
              <Card
                key={doc.id}
                className="overflow-hidden rounded-2xl border-none bg-[#f8fafc] py-0 shadow-none"
              >
                <div className="p-1">
                  <div className="flex items-start gap-3">
                    <div className="flex h-32 w-32 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#dbeafe]">
                      {doc.thumbnail ? (
                        <Image
                          src={doc.thumbnail}
                          alt={doc.name}
                          className="h-full w-full object-cover"
                          width={128}
                          height={128}
                        />
                      ) : (
                        <PiFolderFill className="h-16 w-16 text-[#93c5fd]" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between">
                        {editingDocId === doc.id ? (
                          <Input
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="mt-4 truncate rounded border border-gray-300 px-2 py-1 text-sm font-semibold text-neutral-900"
                          />
                        ) : (
                          <h3 className="mt-2 truncate text-sm font-semibold text-neutral-900">
                            {doc.name}
                          </h3>
                        )}

                        <div className="relative">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="mt-2.5 h-8 w-8 flex-shrink-0 hover:bg-[#e2e8f0]"
                            onClick={() =>
                              setActiveDropdown(
                                activeDropdown === doc.id ? null : doc.id,
                              )
                            }
                          >
                            <DropInfoIcon className="h-5 w-5 text-neutral-500" />
                          </Button>

                          {activeDropdown === doc.id && (
                            <div className="absolute right-0 z-10 mt-2 w-28 rounded border border-gray-200 bg-white shadow-lg">
                              <Button
                                className="block w-full bg-transparent px-4 py-2 text-left text-sm hover:bg-gray-100"
                                onClick={() => {
                                  setEditingDocId(doc.id);
                                  setEditName(doc.name);
                                  setActiveDropdown(null);
                                }}
                              >
                                Edit
                              </Button>
                              <Button
                                className="block w-full bg-transparent px-4 py-2 text-left text-sm text-red-500 hover:bg-gray-100"
                                onClick={() => {
                                  setDocuments(
                                    documents.filter((d) => d.id !== doc.id),
                                  );
                                  setActiveDropdown(null);
                                }}
                              >
                                Remove
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>

                      {editingDocId === doc.id && (
                        <div className="mb-2 flex gap-2">
                          <Button
                            size="sm"
                            className="bg-blue-500 text-white"
                            onClick={() => {
                              setDocuments(
                                documents.map((d) =>
                                  d.id === doc.id
                                    ? { ...d, name: editName }
                                    : d,
                                ),
                              );
                              setEditingDocId(null);
                            }}
                          >
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-neutral-100"
                            onClick={() => setEditingDocId(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      )}

                      <div className="mb-4 -mt-2.5 flex items-center gap-2 text-xs text-neutral-400">
                        <div>{doc.size}</div>• <div>{doc.type} </div> •
                        <div>{doc.date}</div>
                      </div>

                      <div className="mt-12.5 flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={doc.authorAvatar}
                            alt={doc.author}
                          />
                          <AvatarFallback className="bg-[#dbeafe] text-xs text-neutral-900">
                            {doc.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-neutral-500">
                          {doc.author}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}


      <ClientDocumentModal
        open={documentModalOpen}
        onOpenChange={setDocumentModalOpen}
        onSave={handleAddDocument}
      />
    </div>
  );
};

export default DocumentMain;
