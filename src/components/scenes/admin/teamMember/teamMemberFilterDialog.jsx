"use client";

import React from "react";
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
import { CalendarIcon, PolicyTrashIcon, RightIcon } from "@/components/shared/svgs";

import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function TeamMemberFilterDialog({
  open,
  onOpenChange,
  role,
  setRole,
  status,
  setStatus,
  startDateFrom,
  setStartDateFrom,
  startDateTo,
  setStartDateTo,
  endDateFrom,
  setEndDateFrom,
  endDateTo,
  setEndDateTo,
  createdDateFrom,
  setCreatedDateFrom,
  createdDateTo,
  setCreatedDateTo,
  setLastLoginFrom,

  setLastLoginTo,
  includeInactive,
  setIncludeInactive,
  handleClearFilter,
}) {
  const clearFilters = () => {
    setRole?.("");
    setStatus?.("");
    setLastLoginFrom?.(null);
    setLastLoginTo?.(null);
    setIncludeInactive?.(false);

    if (handleClearFilter) handleClearFilter();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`fixed top-0 right-0 left-0 h-auto max-h-[99vh] w-full max-w-none translate-x-0 translate-y-0 transform overflow-hidden rounded-none border-0 border-b shadow-lg transition-transform duration-300 ease-in-out sm:rounded-none ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        
        <DialogHeader>
          <DialogTitle className="font-geist border-b border-neutral-500/8 pb-4 text-lg font-semibold text-neutral-900">
            Add  Filter
          </DialogTitle>
        </DialogHeader>

        
        <div className="max-h-[50vh] space-y-8 overflow-y-auto px-1 sm:px-2">
         
          <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
                               <h3 className="text-sm font-medium text-neutral-500 font-geist mb-4 md:mb-0">
                                 Policy Details
                               </h3>
                               <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                 
                                 <div className="space-y-2">
                                   <Label htmlFor="claim-status" className="text-sm font-medium text-neutral-900 font-geist">
                                    Status
                                   </Label>
                                   <Select >
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
                                   <Select>
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
                                     Product Name
                                   </Label>
                                   <Select>
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
                                   <Select>
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
                                 <div className="space-y-2">
                                   <Label htmlFor="claimant-name" className="text-sm font-medium text-neutral-900 font-geist">
                                     Payment Frequency
                                   </Label>
                                   <Select>
                                     <SelectTrigger id="claimant-name" className="h-10 w-full border border-neutral-300">
                                       <SelectValue placeholder="" />
                                     </SelectTrigger>
                                     <SelectContent className="bg-white font-geist">
                                       <SelectItem value="paymentFrequency1">Payment Frequency 1</SelectItem>
                                       <SelectItem value="paymentFrequency2">Payment Frequency 2</SelectItem>
                                       <SelectItem value="paymentFrequency3">Payment Frequency 3</SelectItem>
                                     </SelectContent>
                                   </Select>
                                 </div>
                                 <div className="space-y-2">
                                   <Label htmlFor="claimant-name" className="text-sm font-medium text-neutral-900 font-geist">
                                     Policy Holder Type
                                   </Label>
                                   <Select>
                                     <SelectTrigger id="claimant-name" className="h-10 w-full border border-neutral-300">
                                       <SelectValue placeholder="" />
                                     </SelectTrigger>
                                     <SelectContent className="bg-white font-geist">
                                       <SelectItem value="policyHolder1">Policy Holder 1</SelectItem>
                                       <SelectItem value="policyHolder2">Policy Holder 2</SelectItem>
                                       <SelectItem value="policyHolder3">Policy Holder 3</SelectItem>
                                     </SelectContent>
                                   </Select>
                                 </div>
                               </div>
                             </div>

          <Divider />

          
          <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
            <h3 className="font-geist mb-4 text-sm font-medium text-neutral-500 md:mb-0">
               Dates
            </h3>
            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <DatePicker
                label="Start Date"
                dateFrom={startDateFrom}
                setDateFrom={setStartDateFrom}
                dateTo={startDateTo}
                setDateTo={setStartDateTo}
              />
              <DatePicker
                label="End Date"
                dateFrom={endDateFrom}
                setDateFrom={setEndDateFrom}
                dateTo={endDateTo}
                setDateTo={setEndDateTo}
              />
              <DatePicker
                label="Created Date"
                dateFrom={createdDateFrom}
                setDateFrom={setCreatedDateFrom}
                dateTo={createdDateTo}
                setDateTo={setCreatedDateTo}
              />
            </div>
          </div>

          <Divider />

         
          <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
            <h3 className="font-geist mb-4 text-sm font-medium text-neutral-500">
              Additional Options
            </h3>
             <div className="flex flex-col sm:flex-row gap-6">
              <CheckboxField
                id="auto-renewal"
                label="Auto-Renewal Enabled"
               
              />
              <CheckboxField
                id="include-inactive"
                label="Include Inactive Roles"
               
              />
            </div>
          </div>
        </div>

        
        <DialogFooter className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center">
          <Button
            type="button"
            className="flex items-center gap-2 bg-transparent text-sm font-medium text-red-700 shadow-none duration-500 ease-in-out hover:bg-neutral-200 hover:text-red-600"
            onClick={clearFilters}
          >
            <PolicyTrashIcon className="h-4 w-4" />
            Clear Filter
          </Button>

          <span className="hidden text-neutral-300 sm:inline">|</span>

          <div className="flex w-full gap-2 sm:w-auto">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="font-geist flex-1 border border-neutral-300 text-sm font-semibold text-neutral-900 sm:flex-none"
            >
              Cancel
            </Button>
            <Button className="font-geist flex-1 bg-blue-500 text-sm font-semibold text-white hover:bg-blue-700 sm:flex-none">
              Save Filter
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


function SelectField({ label, value, onChange, options }) {
  return (
    <div className="space-y-2">
      <Label className="font-geist text-sm font-medium text-neutral-900">
        {label}
      </Label>
      <Select value={value || ""} onValueChange={(val) => onChange?.(val)}>
        <SelectTrigger className="h-10 w-full border border-neutral-300">
          <SelectValue placeholder="" />
        </SelectTrigger>
        <SelectContent className="font-geist bg-white">
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}


function CheckboxField({ id, label, checked, onChange }) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={id}
        className="border border-neutral-300 text-white"
        checked={checked}
        onCheckedChange={(val) => onChange?.(val)}
      />
      <Label
        htmlFor={id}
        className="font-geist cursor-pointer text-sm font-medium text-neutral-900"
      >
        {label}
      </Label>
    </div>
  );
}


function Divider() {
  return <div className="mx-auto h-[1px] w-[99%] bg-neutral-200" />;
}


function DatePicker({ label, dateFrom, setDateFrom, dateTo, setDateTo }) {
  const [openFrom, setOpenFrom] = React.useState(false);
  const [openTo, setOpenTo] = React.useState(false);

  return (
    <div className="space-y-2">
      <Label className="font-geist text-sm font-medium text-neutral-900">
        {label}
      </Label>
      <div className="flex flex-wrap items-center ">
       
        <Popover open={openFrom} onOpenChange={setOpenFrom}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="font-geist h-10 w-[160px] cursor-pointer justify-start border border-neutral-300 text-left text-sm font-normal text-neutral-400"
            >
              {dateFrom ? dateFrom.toLocaleDateString() : "DD MMM YYYY"}
              <CalendarIcon className="ml-2 h-4 w-4 text-neutral-500" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="border-none bg-white p-4" align="start">
            <Calendar
              mode="single"
              selected={dateFrom}
              onSelect={(day) => {
                if (typeof setDateFrom === "function") setDateFrom(day);
                setOpenFrom(false);
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <RightIcon className="h-9 w-9 text-neutral-500" />

        
        <Popover open={openTo} onOpenChange={setOpenTo}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="font-geist h-10 w-[160px] cursor-pointer justify-start border border-neutral-300 text-left text-sm font-normal text-neutral-400"
            >
              {dateTo ? dateTo.toLocaleDateString() : "DD MMM YYYY"}
              <CalendarIcon className="ml-2 h-4 w-4 text-neutral-500" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="border-none bg-white p-4" align="start">
            <Calendar
              mode="single"
              selected={dateTo}
              onSelect={(day) => {
                if (typeof setDateTo === "function") setDateTo(day);
                setOpenTo(false);
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
