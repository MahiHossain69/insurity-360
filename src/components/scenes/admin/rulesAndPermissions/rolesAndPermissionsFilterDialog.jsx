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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function RolesAndPermissionsFilterDialog({
  open,
  onOpenChange,
  roleType,
  setRoleType,
  permissionLevel,
  setPermissionLevel,
  status,
  setStatus,
  paymentFrequency,
  setPaymentFrequency,
  policyHolderType,
  setPolicyHolderType,
  createdDateFrom,
  setCreatedDateFrom,
  createdDateTo,
  setCreatedDateTo,
  startDateFrom,
  setStartDateFrom,
  startDateTo,
  setStartDateTo,
  endDateFrom,
  setEndDateFrom,
  endDateTo,
  setEndDateTo,
  includeInactive,
  setIncludeInactive,
  autoRenewal,
  setAutoRenewal,
  handleClearFilter,
}) {
  const clearFilters = () => {
    setRoleType?.("");
    setPermissionLevel?.("");
    setStatus?.("");
    setPaymentFrequency?.("");
    setPolicyHolderType?.("");
    setCreatedDateFrom?.(null);
    setCreatedDateTo?.(null);
    setStartDateFrom?.(null);
    setStartDateTo?.(null);
    setEndDateFrom?.(null);
    setEndDateTo?.(null);
    setIncludeInactive?.(false);
    setAutoRenewal?.(false);

    if (handleClearFilter) handleClearFilter();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`fixed top-0 left-0 right-0 max-w-none w-full h-auto max-h-[99vh] overflow-hidden rounded-none border-0 border-b shadow-lg translate-x-0 translate-y-0 sm:rounded-none transform transition-transform duration-300 ease-in-out ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
      >
       
        <DialogHeader>
          <DialogTitle className="text-lg text-neutral-900 font-geist border-b border-neutral-500/8 pb-4 font-semibold">
            Add  Filter
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
            <h3 className="text-sm font-medium text-neutral-500 font-geist mb-4 md:mb-0">
              Policy Dates
            </h3>
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4">
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
            <h3 className="text-sm font-medium text-neutral-500 font-geist mb-4">
              Additional Options
            </h3>
            <div className="flex flex-col sm:flex-row gap-6">
              <CheckboxField
                id="auto-renewal"
                label="Auto-Renewal Enabled"
                checked={autoRenewal}
                onChange={setAutoRenewal}
              />
              <CheckboxField
                id="include-inactive"
                label="Include Inactive Roles"
                checked={includeInactive}
                onChange={setIncludeInactive}
              />
            </div>
          </div>
        </div>

        
        <DialogFooter className="flex flex-col sm:flex-row sm:items-center gap-2 mt-6">
          <Button
            type="button"
            className="flex items-center gap-2 bg-transparent shadow-none hover:bg-neutral-200 ease-in-out duration-500 text-red-700 hover:text-red-600 text-sm font-medium"
            onClick={clearFilters}
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
      </DialogContent>
    </Dialog>
  );
}


function SelectField({ label, value, onChange, options }) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-neutral-900 font-geist">{label}</Label>
      <Select value={value || ""} onValueChange={(val) => onChange?.(val)}>
        <SelectTrigger className="h-10 w-full border border-neutral-300">
          <SelectValue placeholder="" />
        </SelectTrigger>
        <SelectContent className="bg-white font-geist">
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
        className="border text-white border-neutral-300"
        checked={checked}
        onCheckedChange={(val) => onChange?.(val)}
      />
      <Label htmlFor={id} className="text-sm font-medium text-neutral-900 font-geist cursor-pointer">
        {label}
      </Label>
    </div>
  );
}


function Divider() {
  return <div className="w-[99%] mx-auto bg-neutral-500/8 h-[1px]" />;
}


function DatePicker({ label, dateFrom, setDateFrom, dateTo, setDateTo }) {
  const [openFrom, setOpenFrom] = React.useState(false);
  const [openTo, setOpenTo] = React.useState(false);

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-neutral-900 font-geist">{label}</Label>
      <div className="flex items-center flex-wrap">
        
        <Popover open={openFrom} onOpenChange={setOpenFrom}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="h-10 w-[160px] cursor-pointer justify-start text-left font-geist text-sm text-neutral-400 font-normal border border-neutral-300"
            >
              {dateFrom ? dateFrom.toLocaleDateString() : "DD MMM YYYY"}
              <CalendarIcon className="ml-2 h-4 w-4 text-neutral-500" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-4 border-none bg-white" align="start">
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
              className="h-10 w-[160px] cursor-pointer justify-start text-left font-geist text-sm text-neutral-400 font-normal border border-neutral-300"
            >
              {dateTo ? dateTo.toLocaleDateString() : "DD MMM YYYY"}
              <CalendarIcon className="ml-2 h-4 w-4 text-neutral-500" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-4 border-none bg-white" align="start">
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
