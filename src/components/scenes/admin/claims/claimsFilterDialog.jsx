"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CalendarIcon, DropdownIcon, PolicyTrashIcon, RightIcon, RowDownIcon } from "@/components/shared/svgs";
import { ArrowRight } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { FaAngleDown } from "react-icons/fa6";
import { IoMdCheckmark } from "react-icons/io";

export default function ClaimsFilterDialog({
  open,
  onOpenChange,
  claimStatus,
  setClaimStatus,
  claimType,
  setClaimType,
  policyNumber,
  setPolicyNumber,
  claimantName,
  setClaimantName,

  claimDateFrom,
  setClaimDateFrom,
  claimDateTo,
  setClaimDateTo,

  handleClearFilter,
}) {
  const [selectedCurrency, setSelectedCurrency] = useState("$ USD");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [claimAmountFrom, setClaimAmountFrom] = useState("");
  const [claimAmountTo, setClaimAmountTo] = useState("");
  

 
  const [localClaimDateFrom, setLocalClaimDateFrom] = useState(claimDateFrom || null);
  const [localClaimDateTo, setLocalClaimDateTo] = useState(claimDateTo || null);

 
  const [lastUpdatedFrom, setLastUpdatedFrom] = useState(null);
  const [lastUpdatedTo, setLastUpdatedTo] = useState(null);

  useEffect(() => {
    if (setClaimDateFrom) setClaimDateFrom(localClaimDateFrom);
    if (setClaimDateTo) setClaimDateTo(localClaimDateTo);
  }, [localClaimDateFrom, localClaimDateTo]);

  const currencyOptions = ["$ USD", "€ EUR", "£ GBP"];

  const handleCurrencySelect = (option) => {
    setSelectedCurrency(option);
    setDropdownOpen(false);
  };


  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

 
  const handleClear = () => {
    setClaimStatus("");
    setClaimType("");
    setPolicyNumber("");
    setClaimantName("");
    setLocalClaimDateFrom(null);
    setLocalClaimDateTo(null);
    setLastUpdatedFrom(null);
    setLastUpdatedTo(null);
    setClaimAmountFrom("");
    setClaimAmountTo("");
    if (handleClearFilter) handleClearFilter();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`fixed top-0 max-w-none w-full h-auto max-h-[99vh] overflow-hidden rounded-none border-0 border-b shadow-lg sm:rounded-none transform transition-transform duration-300 ease-in-out ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <DialogHeader>
          <DialogTitle className="text-[16px] text-neutral-900 font-geist border-b border-neutral-500/8 pb-4 font-semibold">
           Add Filter
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-8 overflow-y-auto max-h-[50vh] px-1 sm:px-2">
         
          <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
            <h3 className="text-sm font-medium text-neutral-500 font-geist mb-4 md:mb-0">
              Policy Details
            </h3>
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              
              <div className="space-y-2">
                <Label htmlFor="claim-status" className="text-sm font-medium text-neutral-900 font-geist">
                 Status
                </Label>
                <Select value={claimStatus} onValueChange={setClaimStatus}>
                  <SelectTrigger id="claim-status" className="h-10 w-full border border-neutral-300">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent className="bg-white font-geist">
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>

             
              <div className="space-y-2">
                <Label htmlFor="claim-type" className="text-sm font-medium text-neutral-900 font-geist">
                  Policy Type
                </Label>
                <Select value={claimType} onValueChange={setClaimType}>
                  <SelectTrigger id="claim-type" className="h-10 w-full border border-neutral-300">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent className="bg-white font-geist">
                    <SelectItem value="medical">Medical</SelectItem>
                    <SelectItem value="vehicle">Vehicle</SelectItem>
                    <SelectItem value="property">Property</SelectItem>
                  </SelectContent>
                </Select>
              </div>

            
              <div className="space-y-2">
                <Label htmlFor="policy-number" className="text-sm font-medium text-neutral-900 font-geist">
                  Claim Name
                </Label>
                <Select value={policyNumber} onValueChange={setPolicyNumber}>
                  <SelectTrigger id="policy-number" className="h-10 w-full border border-neutral-300">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent className="bg-white font-geist">
                    <SelectItem value="P-1001">P-1001</SelectItem>
                    <SelectItem value="P-2002">P-2002</SelectItem>
                    <SelectItem value="P-3003">P-3003</SelectItem>
                  </SelectContent>
                </Select>
              </div>

             
              <div className="space-y-2">
                <Label htmlFor="claimant-name" className="text-sm font-medium text-neutral-900 font-geist">
                  Agent
                </Label>
                <Select value={claimantName} onValueChange={setClaimantName}>
                  <SelectTrigger id="claimant-name" className="h-10 w-full border border-neutral-300">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent className="bg-white font-geist">
                    <SelectItem value="john">John Doe</SelectItem>
                    <SelectItem value="sarah">Sarah Connor</SelectItem>
                    <SelectItem value="mike">Mike Davis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="w-[99%] mx-auto bg-neutral-500/8 h-[1px]" />

          
          <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
            <h3 className="text-sm font-medium text-neutral-500 font-geist mb-4 md:mb-0">
              Dates
            </h3>
            <div className="flex flex-col lg:ml-11 w-full sm:flex-row sm:flex-wrap gap-4">
             
              <div className="space-y-2">
                <Label className="text-sm font-medium text-neutral-900 font-geist">Filed Date</Label>
                <div className="flex items-center gap-2 flex-wrap">
                 
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="h-10 w-45 cursor-pointer justify-start text-left font-geist text-sm text-neutral-400 font-normal border border-neutral-300"
                      >
                        {localClaimDateFrom ? localClaimDateFrom.toLocaleDateString() : "DD MMM YYYY"}
                        <CalendarIcon className="ml-auto h-4 w-4 text-neutral-500" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-4 border-none bg-white" align="start">
                      <Calendar
                        mode="single"
                        selected={localClaimDateFrom}
                        onSelect={setLocalClaimDateFrom}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <RightIcon className="h-9 w-9 text-neutral-500" />

                 
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="h-10 w-45 cursor-pointer justify-start text-left font-geist text-sm text-neutral-400 font-normal border border-neutral-300"
                      >
                        {localClaimDateTo ? localClaimDateTo.toLocaleDateString() : "DD MMM YYYY"}
                        <CalendarIcon className="ml-auto h-4 w-4 text-neutral-500" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-4 border-none bg-white" align="start">
                      <Calendar
                        mode="single"
                        selected={localClaimDateTo}
                        onSelect={setLocalClaimDateTo}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              
              <div className="space-y-2">
                <Label className="text-sm font-medium text-neutral-900 font-geist">Last Updated</Label>
                <div className="flex items-center gap-2 flex-wrap">
                 
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="h-10 w-45 cursor-pointer justify-start text-left font-geist text-sm text-neutral-400 font-normal border border-neutral-300"
                      >
                        {lastUpdatedFrom ? lastUpdatedFrom.toLocaleDateString() : "DD MMM YYYY"}
                        <CalendarIcon className="ml-auto h-4 w-4 text-neutral-500" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-4 border-none bg-white" align="start">
                      <Calendar
                        mode="single"
                        selected={lastUpdatedFrom}
                        onSelect={setLastUpdatedFrom}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <RightIcon className="h-9 w-9 text-neutral-500" />

                 
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="h-10 w-45 cursor-pointer justify-start text-left font-geist text-sm text-neutral-400 font-normal border border-neutral-300"
                      >
                        {lastUpdatedTo ? lastUpdatedTo.toLocaleDateString() : "DD MMM YYYY"}
                        <CalendarIcon className="ml-auto h-4 w-4 text-neutral-500" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-4 border-none bg-white" align="start">
                      <Calendar
                        mode="single"
                        selected={lastUpdatedTo}
                        onSelect={setLastUpdatedTo}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[99%] mx-auto bg-neutral-500/8 h-[1px]" />

            <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
            <h3 className="text-sm font-medium text-neutral-500 font-geist mb-4 md:mb-0 md:w-32">
              Financial
            </h3>

            <div className="flex-1 lg:-ml-11">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-neutral-900 font-geist">
                  Claim Amount Range
                </Label>

                <div className="flex items-center gap-3 flex-wrap">
                 
                  <div className="relative" ref={dropdownRef}>
                    <Input
                      type="number"
                      value={claimAmountFrom}
                      onChange={(e) => setClaimAmountFrom(e.target.value)}
                      placeholder=""
                      className="w-96 rounded-lg border border-gray-300 bg-white p-3 pr-28 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                      <div className="relative">
                        <Button
                          onClick={() => setDropdownOpen(!dropdownOpen)}
                          className="flex items-center rounded-md border-none bg-transparent px-3 py-2 text-sm font-medium text-neutral-900 font-urbanist shadow-none hover:bg-transparent"
                        >
                          <span className="mr-1">{selectedCurrency}</span>
                          <DropdownIcon className="-mr-1 h-1.5 w-2.5 text-neutral-900" />
                        </Button>

                        {dropdownOpen && (
                          <div className="absolute right-0 z-10 mt-2 w-40 rounded-lg border border-neutral-100 bg-white shadow-md">
                            <div className="px-2 py-1">
                              {currencyOptions.map((option) => (
                                <button
                                  key={option}
                                  onClick={() => handleCurrencySelect(option)}
                                  className={`flex w-full items-center rounded-sm px-4 py-2 text-left text-sm ${
                                    selectedCurrency === option
                                      ? "bg-blue-50 font-medium text-blue-600"
                                      : "text-gray-900 hover:bg-gray-100"
                                  }`}
                                >
                                  {selectedCurrency === option && (
                                    <IoMdCheckmark className="mr-2 h-4 w-4 text-blue-600" />
                                  )}
                                  {option}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <RightIcon className="h-9 w-9 hidden lg:block text-neutral-500 " />

                 
                  <div className="relative">
                    <Input
                      type="number"
                      value={claimAmountTo}
                      onChange={(e) => setClaimAmountTo(e.target.value)}
                      placeholder=""
                      className="w-96 rounded-lg border border-gray-300 bg-white p-3 pr-28 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />

                    <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                      <div className="relative">
                        <Button
                          onClick={() => setDropdownOpen(!dropdownOpen)}
                          className="flex items-center rounded-md border-none bg-transparent font-urbanist px-3 py-2 text-sm font-medium text-neutral-900 shadow-none hover:bg-transparent"
                        >
                          <span className="mr-1">{selectedCurrency}</span>
                          <DropdownIcon className="-mr-1  text-neutral-900" />
                        </Button>

                        {dropdownOpen && (
                          <div className="absolute right-0 z-10 mt-2 w-40 rounded-lg border border-neutral-100 bg-white shadow-md">
                            <div className="px-2 py-1">
                              {currencyOptions.map((option) => (
                                <button
                                  key={option}
                                  onClick={() => handleCurrencySelect(option)}
                                  className={`flex w-full items-center rounded-sm px-4 py-2 text-left text-sm ${
                                    selectedCurrency === option
                                      ? "bg-blue-50 font-medium text-blue-600"
                                      : "text-gray-900 hover:bg-gray-100"
                                  }`}
                                >
                                  {selectedCurrency === option && (
                                    <IoMdCheckmark className="mr-2 h-4 w-4 text-blue-600" />
                                  )}
                                  {option}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

         
          <DialogFooter className="flex flex-col  sm:flex-row sm:items-center gap-2 mt-6">
            <Button
              type="button"
              className="flex items-center gap-2 bg-transparent shadow-none hover:bg-neutral-200 ease-in-out duration-500 text-red-700 hover:text-red-600 text-sm font-medium"
              onClick={handleClear}
            >
              <PolicyTrashIcon className="w-4 h-4" />
              Clear Filter
            </Button>

            <span className="hidden sm:inline text-neutral-300">|</span>

            <div className="flex gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1 sm:flex-none text-sm border border-neutral-300 font-geist font-semibold text-neutral-900"
              >
                Cancel
              </Button>
              <Button className="flex-1 sm:flex-none bg-blue-500 hover:bg-blue-700 text-white font-geist font-semibold text-sm">
                Save Filter
              </Button>
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
