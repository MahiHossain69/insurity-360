"use client";

import { useState, useRef, useEffect } from "react";
import { X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AddAccordModal({ open, onOpenChange, onConfirm }) {
  const [selectedForm, setSelectedForm] = useState("");
  const [stateDropdownOpen, setStateDropdownOpen] = useState(false);
  const [selectedState, setSelectedState] = useState("NY");
  const [showConfirm, setShowConfirm] = useState(false);

  const dropdownRef = useRef(null);

  const formOptions = [
    "Automobile Loss Notice",
    "Auto Accident Information Form",
    "New York Auto Suppliment",
    "Personal Auto Policy Change Request",
  ];

  const stateOptions = ["NY", "CA", "TX", "FL", "NJ", "IL", "OH"];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setStateDropdownOpen(false);
      }
    }
    if (stateDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [stateDropdownOpen]);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />

      <div className="scrollbarHidden fixed top-1/2 left-1/2 z-50 max-h-[90vh] w-[95%] max-w-[640px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl bg-white shadow-lg transition-all duration-300 sm:w-[90%] md:w-full">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-neutral-100 bg-white px-5 py-4 sm:px-8 sm:py-6">
          <h2 className="font-geist text-[16px] font-semibold text-neutral-900">
            Add New Accord
          </h2>
          <Button
            onClick={() => onOpenChange(false)}
            className="bg-transparent text-neutral-900 shadow-none transition-colors hover:bg-transparent hover:text-neutral-500"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="px-5 py-5 sm:px-8 sm:py-6">
          <div className="mb-6">
            <Label className="font-geist mb-3 block text-sm font-medium text-neutral-900">
              Search ACCORD Form
            </Label>
            <div className="relative" ref={dropdownRef}>
              <Input
                type="text"
                value={selectedForm}
                onChange={(e) => {
                  setSelectedForm(e.target.value);
                  setShowConfirm(false);
                }}
                className="h-9 w-full rounded-md border border-neutral-300 px-4 pr-28 text-sm text-neutral-900 focus:outline-none sm:pr-32"
                placeholder=""
              />

              <Button
                type="button"
                onClick={() => setStateDropdownOpen(!stateDropdownOpen)}
                className="font-urbanist absolute top-1/2 right-3 flex h-8 -translate-y-1/2 items-center gap-2 bg-white text-sm font-medium text-neutral-900 shadow-none hover:bg-transparent"
              >
                <span>State: {selectedState}</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    stateDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </Button>

              {stateDropdownOpen && (
                <div className="absolute top-full right-3 z-10 mt-2 w-32 rounded-md border border-neutral-200 bg-white shadow-lg">
                  {stateOptions.map((state) => (
                    <Button
                      key={state}
                      onClick={() => {
                        setSelectedState(state);
                        setStateDropdownOpen(false);
                      }}
                      className={`font-urbanist w-full bg-white px-4 py-2 text-left text-sm hover:bg-neutral-100 ${
                        selectedState === state
                          ? "bg-neutral-100 font-medium"
                          : "text-neutral-800"
                      }`}
                    >
                      {state}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mb-8 space-y-3">
            {formOptions.map((option, index) => (
              <Button
                key={index}
                onClick={() => {
                  setSelectedForm(option);
                  setShowConfirm(true);
                }}
                className={`font-geist flex h-9 w-full justify-start rounded-md text-left text-sm font-semibold text-neutral-900 transition-all ${
                  selectedForm === option
                    ? "border-2 border-neutral-500 bg-neutral-200 hover:bg-neutral-200"
                    : "border-2 border-transparent bg-neutral-500/8 hover:bg-neutral-200/60"
                }`}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>

        <div className="bottom-0 flex flex-col justify-end gap-3 border-t border-neutral-500/4 bg-neutral-50 px-5 py-5 sm:flex-row sm:px-8 sm:py-6">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full border-neutral-300 px-6 py-2.5 text-[15px] font-medium text-neutral-900 hover:bg-neutral-100 sm:w-auto"
          >
            Cancel
          </Button>

          {showConfirm && (
            <Button
              onClick={() => {
                if (onConfirm) {
                  onConfirm(selectedForm, selectedState);
                }
                onOpenChange(false);
              }}
              className="w-full bg-blue-600 px-6 py-2.5 text-[15px] font-medium text-white hover:bg-blue-700 sm:w-auto"
            >
              Confirm
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
