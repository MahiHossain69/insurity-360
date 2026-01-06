"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CalendarIcon, PolicyTrashIcon, RightIcon } from "@/components/shared/svgs";
import { ArrowRight } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function InvoicesFilterDialog({ open, onOpenChange }) {
 
  const [invoiceStatus, setInvoiceStatus] = useState("");
  const [invoiceMethod, setInvoiceMethod] = useState("");
  const [invoiceFrequency, setInvoiceFrequency] = useState("");
  const [amountRange, setAmountRange] = useState("");

  const [startDateFrom, setStartDateFrom] = useState(null);
  const [startDateTo, setStartDateTo] = useState(null);
  const [endDateFrom, setEndDateFrom] = useState(null);
  const [endDateTo, setEndDateTo] = useState(null);
  const [createdDateFrom, setCreatedDateFrom] = useState(null);
  const [createdDateTo, setCreatedDateTo] = useState(null);

  const [autoDebit, setAutoDebit] = useState(false);
  const [receiptAttached, setReceiptAttached] = useState(false);

  const handleClearFilter = () => {
    setInvoiceStatus("");
    setInvoiceMethod("");
    setInvoiceFrequency("");
    setAmountRange("");
    setStartDateFrom(null);
    setStartDateTo(null);
    setEndDateFrom(null);
    setEndDateTo(null);
    setCreatedDateFrom(null);
    setCreatedDateTo(null);
    setAutoDebit(false);
    setReceiptAttached(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`fixed top-0 left-0 right-0 max-w-none w-full h-auto max-h-[99vh] overflow-hidden rounded-none border-0 border-b shadow-lg translate-x-0 translate-y-0 sm:rounded-none transform transition-transform duration-300 ease-in-out
          ${open ? "translate-y-0" : "-translate-y-full"}`}
      >
        <DialogHeader>
          <DialogTitle className="text-lg text-neutral-900 font-geist border-b border-neutral-500/8 pb-4 font-semibold">
            Add  Filter
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-8 overflow-y-auto max-h-[50vh] px-1 sm:px-2">
          
          <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
            <h3 className="text-sm font-medium text-neutral-500 font-geist mb-4 md:mb-0">Policy Details</h3>
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            
              <div className="space-y-2">
                <Label htmlFor="invoice-status" className="text-sm font-medium text-neutral-900 font-geist"> Status</Label>
                <Select value={invoiceStatus} onValueChange={setInvoiceStatus}>
                  <SelectTrigger id="invoice-status" className="h-10 w-full border border-neutral-300">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent className="bg-white font-geist">
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="unpaid">Unpaid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>

            
              <div className="space-y-2">
                <Label htmlFor="invoice-method" className="text-sm font-medium text-neutral-900 font-geist">Policy Type</Label>
                <Select value={invoiceMethod} onValueChange={setInvoiceMethod}>
                  <SelectTrigger id="invoice-method" className="h-10 w-full border border-neutral-300">
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
                <Label htmlFor="invoice-frequency" className="text-sm font-medium text-neutral-900 font-geist">Product Name</Label>
                <Select value={invoiceFrequency} onValueChange={setInvoiceFrequency}>
                  <SelectTrigger id="invoice-frequency" className="h-10 w-full border border-neutral-300">
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
                <Label htmlFor="amount-range" className="text-sm font-medium text-neutral-900 font-geist">Agent</Label>
                <Select value={amountRange} onValueChange={setAmountRange}>
                  <SelectTrigger id="amount-range" className="h-10 w-full border border-neutral-300">
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
                <Label htmlFor="amount-range" className="text-sm font-medium text-neutral-900 font-geist">Policy Holder Type</Label>
                <Select value={amountRange} onValueChange={setAmountRange}>
                  <SelectTrigger id="amount-range" className="h-10 w-full border border-neutral-300">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent className="bg-white font-geist">
                    <SelectItem value="policyHolder1">Policy Holder Type 1</SelectItem>
                    <SelectItem value="policyHolder2">Policy Holder Type 2</SelectItem>
                    <SelectItem value="policyHolder3">Policy Holder Type 3</SelectItem>
                    <SelectItem value="policyHolder4">Policy Holder Type 4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount-range" className="text-sm font-medium text-neutral-900 font-geist">Payment Frequency</Label>
                <Select value={amountRange} onValueChange={setAmountRange}>
                  <SelectTrigger id="amount-range" className="h-10 w-full border border-neutral-300">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent className="bg-white font-geist">
                    <SelectItem value="paymentFrequency1">Payment Frequency 1</SelectItem>
                    <SelectItem value="paymentFrequency2">Payment Frequency 2</SelectItem>
                    <SelectItem value="paymentFrequency3">Payment Frequency 3</SelectItem>
                    <SelectItem value="paymentFrequency4">Payment Frequency 4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="w-[99%] mx-auto bg-neutral-500/8 h-[1px]"></div>

          
          <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
            <h3 className="text-sm font-medium text-neutral-500 font-geist mb-4 md:mb-0">Policy Dates</h3>
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4">
              <DateRangePicker label="Start Date" from={startDateFrom} to={startDateTo} setFrom={setStartDateFrom} setTo={setStartDateTo} />
              <DateRangePicker label="End Date" from={endDateFrom} to={endDateTo} setFrom={setEndDateFrom} setTo={setEndDateTo} />
              <DateRangePicker label="Created Date" from={createdDateFrom} to={createdDateTo} setFrom={setCreatedDateFrom} setTo={setCreatedDateTo} />
            </div>
          </div>

          <div className="w-[99%] mx-auto bg-neutral-500/8 h-[1px]"></div>

          
          <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
            <h3 className="text-sm font-medium text-neutral-500 font-geist mb-4">Additional Options</h3>
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex items-center space-x-2">
                <Checkbox id="auto-debit" checked={autoDebit} onCheckedChange={setAutoDebit} className="border text-white border-neutral-300" />
                <Label htmlFor="auto-debit" className="text-sm font-medium text-neutral-900 font-geist cursor-pointer">Auto-Renewal Enabledd</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="receipt-attached" checked={receiptAttached} onCheckedChange={setReceiptAttached} className="border text-white border-neutral-300" />
                <Label htmlFor="receipt-attached" className="text-sm font-medium text-neutral-900 font-geist cursor-pointer">Documents Attached	</Label>
              </div>
            </div>
          </div>
        </div>

        
        <DialogFooter className="flex flex-col sm:flex-row sm:items-center gap-2 mt-6">
          <Button type="button" onClick={handleClearFilter} className="flex items-center gap-2 bg-transparent shadow-none hover:bg-neutral-200 ease-in-out duration-500 text-red-700 hover:text-red-600 text-sm font-medium">
            <PolicyTrashIcon className="w-4 h-4" />
            Clear Filter
          </Button>

          <span className="hidden sm:inline text-neutral-300">|</span>

          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1 sm:flex-none text-sm border border-neutral-300 font-geist font-semibold text-neutral-900">
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


function DateRangePicker({ label, from, to, setFrom, setTo }) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-neutral-900 font-geist">{label}</Label>
      <div className="flex items-center  flex-wrap">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="h-10 w-[160px] cursor-pointer justify-start text-left font-geist text-sm text-neutral-400 font-normal border border-neutral-300">
              {from ? from.toLocaleDateString() : "DD MMM YYYY"}
              <CalendarIcon className="ml-2 h-4 w-4 text-neutral-500" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-4 border-none bg-white" align="start">
            <Calendar mode="single" selected={from} onSelect={setFrom} initialFocus />
          </PopoverContent>
        </Popover>

        <RightIcon className="h-9 w-9 text-neutral-500" />

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="h-10 w-[160px] cursor-pointer justify-start text-left font-geist text-sm text-neutral-400 font-normal border border-neutral-300">
              {to ? to.toLocaleDateString() : "DD MMM YYYY"}
              <CalendarIcon className="ml-2 h-4 w-4 text-neutral-500" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-4 border-none bg-white" align="start">
            <Calendar mode="single" selected={to} onSelect={setTo} initialFocus />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
