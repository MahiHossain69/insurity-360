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

export default function paymentFilterDialog({
  open,
  onOpenChange,
  paymentStatus,
  setPaymentStatus,
  paymentMethod,
  setPaymentMethod,
  paymentFrequency,
  setPaymentFrequency,
  amountRange,
  setAmountRange,
  paymentDateFrom,
  setPaymentDateFrom,
  paymentDateTo,
  setPaymentDateTo,
  createdDateFrom,
  setCreatedDateFrom,
  createdDateTo,
  setCreatedDateTo,
  endDateFrom, // ✅ added missing props
  setEndDateFrom, // ✅ added missing props
  endDateTo, // ✅ added missing props
  setEndDateTo, // ✅ added missing props
  autoDebit,
  setAutoDebit,
  receiptAttached,
  setReceiptAttached,
  handleClearFilter,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`fixed top-0 right-0 left-0 h-auto max-h-[99vh] w-full max-w-none translate-x-0 translate-y-0 transform overflow-hidden rounded-none border-0 border-b shadow-lg transition-transform duration-300 ease-in-out sm:rounded-none ${open ? "translate-y-0" : "-translate-y-full"}`}
      >
        <DialogHeader>
          <DialogTitle className="font-geist border-b border-neutral-500/8 pb-4 text-lg font-semibold text-neutral-900">
            Add Filter
          </DialogTitle>
        </DialogHeader>

        <div className="max-h-[50vh] space-y-8 overflow-y-auto px-1 sm:px-2">
          {/* -------- Policy Details Section -------- */}
          <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
            <h3 className="font-geist mb-4 text-sm font-medium text-neutral-500 md:mb-0">
              Policy Details
            </h3>
            <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
              <div className="space-y-2">
                <Label
                  htmlFor="payment-status"
                  className="font-geist text-sm font-medium text-neutral-900"
                >
                  Status
                </Label>
                <Select value={paymentStatus} onValueChange={setPaymentStatus}>
                  <SelectTrigger
                    id="payment-status"
                    className="h-10 w-full border border-neutral-300"
                  >
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent className="font-geist bg-white">
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="unpaid">Unpaid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="payment-method"
                  className="font-geist text-sm font-medium text-neutral-900"
                >
                  Policy Type
                </Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger
                    id="payment-method"
                    className="h-10 w-full border border-neutral-300"
                  >
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent className="font-geist bg-white">
                    <SelectItem value="credit-card">Credit Card</SelectItem>
                    <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="payment-frequency"
                  className="font-geist text-sm font-medium text-neutral-900"
                >
                  Product Name
                </Label>
                <Select
                  value={paymentFrequency}
                  onValueChange={setPaymentFrequency}
                >
                  <SelectTrigger
                    id="payment-frequency"
                    className="h-10 w-full border border-neutral-300"
                  >
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent className="font-geist bg-white">
                    <SelectItem value="one-time">One-Time</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="amount-range"
                  className="font-geist text-sm font-medium text-neutral-900"
                >
                  Agent
                </Label>
                <Select value={amountRange} onValueChange={setAmountRange}>
                  <SelectTrigger
                    id="amount-range"
                    className="h-10 w-full border border-neutral-300"
                  >
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent className="font-geist bg-white">
                    <SelectItem value="0-100">$0 - $100</SelectItem>
                    <SelectItem value="100-500">$100 - $500</SelectItem>
                    <SelectItem value="500-1000">$500 - $1000</SelectItem>
                    <SelectItem value="1000+">$1000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="amount-range"
                  className="font-geist text-sm font-medium text-neutral-900"
                >
                  Payment Frequency
                </Label>
                <Select value={amountRange} onValueChange={setAmountRange}>
                  <SelectTrigger
                    id="amount-range"
                    className="h-10 w-full border border-neutral-300"
                  >
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent className="font-geist bg-white">
                    <SelectItem value="0-100">$0 - $100</SelectItem>
                    <SelectItem value="100-500">$100 - $500</SelectItem>
                    <SelectItem value="500-1000">$500 - $1000</SelectItem>
                    <SelectItem value="1000+">$1000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="amount-range"
                  className="font-geist text-sm font-medium text-neutral-900"
                >
                  Policy Holder Type
                </Label>
                <Select value={amountRange} onValueChange={setAmountRange}>
                  <SelectTrigger
                    id="amount-range"
                    className="h-10 w-full border border-neutral-300"
                  >
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent className="font-geist bg-white">
                    <SelectItem value="0-100">$0 - $100</SelectItem>
                    <SelectItem value="100-500">$100 - $500</SelectItem>
                    <SelectItem value="500-1000">$500 - $1000</SelectItem>
                    <SelectItem value="1000+">$1000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="mx-auto h-[1px] w-[99%] bg-neutral-500/8" />

        {/* -------- Payment Dates Section -------- */}
<div className="flex flex-col md:flex-row md:items-start md:space-x-6">
  <h3 className="font-geist mb-4 text-sm font-medium text-neutral-500 md:mb-0">
    Payment Dates
  </h3>
  <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
    {/* Start Date */}
    <div className="space-y-2">
      <Label className="font-geist text-sm font-medium text-neutral-900">
        Start Date
      </Label>
      <div className="flex flex-wrap items-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="font-geist h-10 w-[160px] cursor-pointer justify-start border border-neutral-300 text-left text-sm font-normal text-neutral-400"
            >
              {paymentDateFrom
                ? paymentDateFrom.toLocaleDateString()
                : "DD MMM YYYY"}
              <CalendarIcon className="ml-2 h-4 w-4 text-neutral-500" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="border-none bg-white p-4" align="start">
            <Calendar
              mode="single"
              selected={paymentDateFrom}
              onSelect={setPaymentDateFrom}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <RightIcon className="h-9 w-9 text-neutral-500" />

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="font-geist h-10 w-[160px] cursor-pointer justify-start border border-neutral-300 text-left text-sm font-normal text-neutral-400"
            >
              {paymentDateTo
                ? paymentDateTo.toLocaleDateString()
                : "DD MMM YYYY"}
              <CalendarIcon className="ml-2 h-4 w-4 text-neutral-500" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="border-none bg-white p-4" align="start">
            <Calendar
              mode="single"
              selected={paymentDateTo}
              onSelect={setPaymentDateTo}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>

    {/* End Date */}
    <div className="space-y-2">
      <Label className="font-geist text-sm font-medium text-neutral-900">
        End Date
      </Label>
      <div className="flex flex-wrap items-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="font-geist h-10 w-[160px] cursor-pointer justify-start border border-neutral-300 text-left text-sm font-normal text-neutral-400"
            >
              {endDateFrom ? endDateFrom.toLocaleDateString() : "DD MMM YYYY"}
              <CalendarIcon className="ml-2 h-4 w-4 text-neutral-500" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="border-none bg-white p-4" align="start">
            <Calendar
              mode="single"
              selected={endDateFrom}
              onSelect={setEndDateFrom}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <RightIcon className="h-9 w-9 text-neutral-500" />

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="font-geist h-10 w-[160px] cursor-pointer justify-start border border-neutral-300 text-left text-sm font-normal text-neutral-400"
            >
              {endDateTo ? endDateTo.toLocaleDateString() : "DD MMM YYYY"}
              <CalendarIcon className="ml-2 h-4 w-4 text-neutral-500" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="border-none bg-white p-4" align="start">
            <Calendar
              mode="single"
              selected={endDateTo}
              onSelect={setEndDateTo}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>

    {/* Created Date */}
    <div className="space-y-2">
      <Label className="font-geist text-sm font-medium text-neutral-900">
        Created Date
      </Label>
      <div className="flex flex-wrap items-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="font-geist h-10 w-[160px] cursor-pointer justify-start border border-neutral-300 text-left text-sm font-normal text-neutral-400"
            >
              {createdDateFrom
                ? createdDateFrom.toLocaleDateString()
                : "DD MMM YYYY"}
              <CalendarIcon className="ml-2 h-4 w-4 text-neutral-500" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="border-none bg-white p-4" align="start">
            <Calendar
              mode="single"
              selected={createdDateFrom}
              onSelect={setCreatedDateFrom}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <RightIcon className="h-9 w-9 text-neutral-500" />

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="font-geist h-10 w-[160px] cursor-pointer justify-start border border-neutral-300 text-left text-sm font-normal text-neutral-400"
            >
              {createdDateTo
                ? createdDateTo.toLocaleDateString()
                : "DD MMM YYYY"}
              <CalendarIcon className="ml-2 h-4 w-4 text-neutral-500" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="border-none bg-white p-4" align="start">
            <Calendar
              mode="single"
              selected={createdDateTo}
              onSelect={setCreatedDateTo}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  </div>
</div>


          <div className="mx-auto h-[1px] w-[99%] bg-neutral-500/8" />

          {/* -------- Additional Options Section -------- */}
          <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
            <h3 className="font-geist mb-4 text-sm font-medium text-neutral-500">
              Additional Options
            </h3>
            <div className="flex flex-col gap-6 sm:flex-row">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="auto-debit"
                  className="border border-neutral-300 text-white"
                  checked={autoDebit}
                  onCheckedChange={setAutoDebit}
                />
                <Label
                  htmlFor="auto-debit"
                  className="font-geist cursor-pointer text-sm font-medium text-neutral-900"
                >
                  Auto-Debit Enabled
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="receipt-attached"
                  className="border border-neutral-300 text-white"
                  checked={receiptAttached}
                  onCheckedChange={setReceiptAttached}
                />
                <Label
                  htmlFor="receipt-attached"
                  className="font-geist cursor-pointer text-sm font-medium text-neutral-900"
                >
                  Receipt Attached
                </Label>
              </div>
            </div>
          </div>
        </div>

        {/* -------- Footer -------- */}
        <DialogFooter className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center">
          <Button
            type="button"
            className="flex items-center gap-2 bg-transparent text-sm font-medium text-red-700 shadow-none duration-500 ease-in-out hover:bg-neutral-200 hover:text-red-600"
            onClick={handleClearFilter}
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
