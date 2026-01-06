"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PolicyTrashIcon } from "@/components/shared/svgs";
import { ArrowRight, CalendarIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function ClientFilterDialogs({
  open,
  onOpenChange,
  status,
  setStatus,
  clientType,
  setClientType,
  clientCategory,
  setClientCategory,
  advisor,
  setAdvisor,
  interactionFrequency,
  setInteractionFrequency,
  clientGroup,
  setClientGroup,
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
  vipClient,
  setVipClient,
  documentsAttached,
  setDocumentsAttached,
  handleClearFilter,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`fixed top-0 left-0 right-0 max-w-none w-full h-auto max-h-[99vh] overflow-hidden rounded-none border-0 border-b shadow-lg translate-x-0 translate-y-0 sm:rounded-none transform transition-transform duration-300 ease-in-out
    ${open ? "translate-y-0" : "-translate-y-full"}`}
      >
        <DialogHeader>
          <DialogTitle className="text-lg text-neutral-900 font-geist border-b border-neutral-500/8 pb-4 font-semibold">
            Add Client Filter
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-8 overflow-y-auto max-h-[50vh] px-1 sm:px-2">
          {/* Client Details */}
          <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
            <h3 className="text-sm font-medium text-neutral-500 font-geist mb-4 md:mb-0">
              Policy Details
            </h3>
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status" className="text-sm font-medium text-neutral-900 font-geist">
                  Status
                </Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger id="status" className="h-10 w-full border border-neutral-300 ">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent className="bg-white font-geist">
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="prospect">Prospect</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="client-type" className="text-sm font-medium text-neutral-900 font-geist">
                  Policy Type
                </Label>
                <Select value={clientType} onValueChange={setClientType}>
                  <SelectTrigger id="client-type" className="h-10 w-full border border-neutral-300">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent className="bg-white font-geist">
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="corporate">Corporate</SelectItem>
                    <SelectItem value="family">Family</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="client-category" className="text-sm font-medium text-neutral-900 font-geist">
                  Product Name
                </Label>
                <Select value={clientCategory} onValueChange={setClientCategory}>
                  <SelectTrigger id="client-category" className="h-10 w-full border border-neutral-300">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent className="bg-white font-geist">
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="basic">Basic</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="advisor" className="text-sm font-medium text-neutral-900 font-geist">
                  Agent
                </Label>
                <Select value={advisor} onValueChange={setAdvisor}>
                  <SelectTrigger id="advisor" className="h-10 w-full border border-neutral-300">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent className="bg-white font-geist">
                    <SelectItem value="john">John Smith</SelectItem>
                    <SelectItem value="sarah">Sarah Johnson</SelectItem>
                    <SelectItem value="mike">Mike Davis</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="interaction-frequency" className="text-sm font-medium text-neutral-900 font-geist">
                  Payment Frequency
                </Label>
                <Select value={interactionFrequency} onValueChange={setInteractionFrequency}>
                  <SelectTrigger id="interaction-frequency" className="h-10 w-full border border-neutral-300">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent className="bg-white font-geist">
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="client-group" className="text-sm font-medium text-neutral-900 font-geist">
                 Policy Holder Type
                </Label>
                <Select value={clientGroup} onValueChange={setClientGroup}>
                  <SelectTrigger id="client-group" className="h-10 w-full border border-neutral-300">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent className="bg-white font-geist">
                    <SelectItem value="vip">VIP</SelectItem>
                    <SelectItem value="regular">Regular</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="w-[99%] mx-auto bg-neutral-500/8 h-[1px]"></div>

          {/* Client Dates */}
          <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
            <h3 className="text-sm font-medium text-neutral-500 font-geist mb-4 md:mb-0">Policy Dates</h3>
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4">
              {/* Registration Date */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-neutral-900 font-geist">Start Date</Label>
                <div className="flex items-center gap-2 flex-wrap">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="h-10 w-[160px] cursor-pointer justify-start text-left font-geist text-sm text-neutral-400 font-normal border border-neutral-300"
                      >
                        {startDateFrom ? startDateFrom.toLocaleDateString() : "DD MMM YYYY"}
                        <CalendarIcon className="ml-2 h-4 w-4 text-neutral-500" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-4 border-none bg-white" align="start">
                      <Calendar mode="single" selected={startDateFrom} onSelect={setStartDateFrom} initialFocus />
                    </PopoverContent>
                  </Popover>

                  <ArrowRight className="h-5 w-4 text-neutral-500" />

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="h-10 w-[160px] cursor-pointer justify-start text-left font-geist text-sm text-neutral-400 font-normal border border-neutral-300"
                      >
                        {startDateTo ? startDateTo.toLocaleDateString() : "DD MMM YYYY"}
                        <CalendarIcon className="ml-2 h-4 w-4 text-neutral-500" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-4 border-none bg-white" align="start">
                      <Calendar mode="single" selected={startDateTo} onSelect={setStartDateTo} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Last Interaction Date */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-neutral-900 font-geist">End Date</Label>
                <div className="flex items-center gap-2 flex-wrap">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="h-10 w-[160px] cursor-pointer justify-start text-left text-neutral-400 font-geist text-sm font-normal border border-neutral-300"
                      >
                        {endDateFrom ? endDateFrom.toLocaleDateString() : "DD MMM YYYY"}
                        <CalendarIcon className="ml-2 h-4 w-4 text-neutral-500" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-4 border-none bg-white" align="start">
                      <Calendar mode="single" selected={endDateFrom} onSelect={setEndDateFrom} initialFocus />
                    </PopoverContent>
                  </Popover>

                  <ArrowRight className="h-5 w-4 text-neutral-500" />

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="h-10 w-[160px] cursor-pointer justify-start text-left text-neutral-400 font-geist text-sm font-normal border border-neutral-300"
                      >
                        {endDateTo ? endDateTo.toLocaleDateString() : "DD MMM YYYY"}
                        <CalendarIcon className="ml-2 h-4 w-4 text-neutral-500" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-4 border-none bg-white" align="start">
                      <Calendar mode="single" selected={endDateTo} onSelect={setEndDateTo} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Created Date */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-neutral-900 font-geist">Created Date</Label>
                <div className="flex items-center gap-2 flex-wrap">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="h-10 w-[160px] cursor-pointer justify-start text-left text-neutral-400 font-geist text-sm font-normal border border-neutral-300"
                      >
                        {createdDateFrom ? createdDateFrom.toLocaleDateString() : "DD MMM YYYY"}
                        <CalendarIcon className="ml-2 h-4 w-4 text-neutral-500" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-4 border-none bg-white" align="start">
                      <Calendar mode="single" selected={createdDateFrom} onSelect={setCreatedDateFrom} initialFocus />
                    </PopoverContent>
                  </Popover>

                  <ArrowRight className="h-5 w-4 text-neutral-500" />

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="h-10 w-[160px] cursor-pointer justify-start text-left text-neutral-400 font-normal border font-geist text-sm border-neutral-300"
                      >
                        {createdDateTo ? createdDateTo.toLocaleDateString() : "DD MMM YYYY"}
                        <CalendarIcon className="ml-2 h-4 w-4 text-neutral-500" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-4 border-none bg-white" align="start">
                      <Calendar mode="single" selected={createdDateTo} onSelect={setCreatedDateTo} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[99%] mx-auto bg-neutral-500/8 h-[1px]"></div>

          {/* Additional Options */}
          <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
            <h3 className="text-sm font-medium text-neutral-500 font-geist mb-4">Additional Options</h3>
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="vip-client"
                  className="border text-white border-neutral-300"
                  checked={vipClient}
                  onCheckedChange={setVipClient}
                />
                <Label htmlFor="vip-client" className="text-sm font-medium text-neutral-900 font-geist cursor-pointer">
                  Auto-Renewal Enabled
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="documents-attached"
                  className="border text-white border-neutral-300"
                  checked={documentsAttached}
                  onCheckedChange={setDocumentsAttached}
                />
                <Label htmlFor="documents-attached" className="text-sm font-medium text-neutral-900 font-geist cursor-pointer">
                  Documents Attached
                </Label>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row sm:items-center gap-2 mt-6">
          <Button
            type="button"
            className="flex items-center gap-2 bg-transparent shadow-none hover:bg-neutral-200 ease-in-out duration-500 text-red-700 hover:text-red-600 text-sm font-medium"
            onClick={handleClearFilter}
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
