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
import { CalendarIcon, PolicyTrashIcon } from "@/components/shared/svgs";
import { ArrowRight,  } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function CommissionFilterDialog({
  open,
  onOpenChange,
  status,
  setStatus,
  policyType,
  setPolicyType,
  producerName,
  setProducerName,
  agent,
  setAgent,
  brokerName,
  setBrokerName,
  carrier,
  setCarrier,
  premiumType,
  setPremiumType,
  commissionPremiumType,
  setCommissionPremiumType,
  startDateFrom,
  setStartDateFrom,
  startDateTo,
  setStartDateTo,
  autoRenewal,
  setAutoRenewal,
  handleClearFilter,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`fixed top-0  max-w-none w-full h-auto max-h-[99vh] overflow-hidden rounded-none border-0 border-b shadow-lg sm:rounded-none transform transition-transform duration-300 ease-in-out
    ${open ? "translate-y-0" : "-translate-y-full"}`}
      >
        <DialogHeader>
          <DialogTitle className="text-lg text-neutral-900 font-geist border-b border-neutral-500/8 pb-4 font-semibold">
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
                <Label
                  htmlFor="status"
                  className="text-sm font-medium text-neutral-900 font-geist"
                >
                  Status
                </Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger
                    id="status"
                    className="h-10 w-full border border-neutral-300"
                  >
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent className="bg-white font-geist">
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>

             
              <div className="space-y-2">
                <Label
                  htmlFor="policy-type"
                  className="text-sm font-medium text-neutral-900 font-geist"
                >
                  Policy Type
                </Label>
                <Select value={policyType} onValueChange={setPolicyType}>
                  <SelectTrigger
                    id="policy-type"
                    className="h-10 w-full border border-neutral-300"
                  >
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent className="bg-white font-geist">
                    <SelectItem value="life">Life Insurance</SelectItem>
                    <SelectItem value="health">Health Insurance</SelectItem>
                    <SelectItem value="auto">Auto Insurance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              
              <div className="space-y-2">
                <Label
                  htmlFor="producer-name"
                  className="text-sm font-medium text-neutral-900 font-geist"
                >
                  Producer Name
                </Label>
                <Select value={producerName} onValueChange={setProducerName}>
                  <SelectTrigger
                    id="producer-name"
                    className="h-10 w-full border border-neutral-300"
                  >
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent className="bg-white font-geist">
                    <SelectItem value="premium">Premium Plan</SelectItem>
                    <SelectItem value="basic">Basic Plan</SelectItem>
                    <SelectItem value="family">Family Plan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

             
              <div className="space-y-2">
                <Label
                  htmlFor="agent"
                  className="text-sm font-medium text-neutral-900 font-geist"
                >
                  Agent
                </Label>
                <Select value={agent} onValueChange={setAgent}>
                  <SelectTrigger
                    id="agent"
                    className="h-10 w-full border border-neutral-300"
                  >
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
                <Label
                  htmlFor="broker-name"
                  className="text-sm font-medium text-neutral-900 font-geist"
                >
                  Broker Name
                </Label>
                <Select value={brokerName} onValueChange={setBrokerName}>
                  <SelectTrigger
                    id="broker-name"
                    className="h-10 w-full border border-neutral-300"
                  >
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent className="bg-white font-geist">
                    <SelectItem value="alpha">Alpha Brokers</SelectItem>
                    <SelectItem value="beta">Beta Group</SelectItem>
                    <SelectItem value="gamma">Gamma Partners</SelectItem>
                  </SelectContent>
                </Select>
              </div>

             
              <div className="space-y-2">
                <Label
                  htmlFor="carrier"
                  className="text-sm font-medium text-neutral-900 font-geist"
                >
                  Carrier
                </Label>
                <Select value={carrier} onValueChange={setCarrier}>
                  <SelectTrigger
                    id="carrier"
                    className="h-10 w-full border border-neutral-300"
                  >
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent className="bg-white font-geist">
                    <SelectItem value="aetna">Aetna</SelectItem>
                    <SelectItem value="cigna">Cigna</SelectItem>
                    <SelectItem value="united">UnitedHealth</SelectItem>
                  </SelectContent>
                </Select>
              </div>

             
              <div className="space-y-2">
                <Label
                  htmlFor="premium-type"
                  className="text-sm font-medium text-neutral-900 font-geist"
                >
                  Premium Type
                </Label>
                <Select value={premiumType} onValueChange={setPremiumType}>
                  <SelectTrigger
                    id="premium-type"
                    className="h-10 w-full border border-neutral-300"
                  >
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent className="bg-white font-geist">
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="regular">Regular</SelectItem>
                    <SelectItem value="topup">Top-up</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="w-[99%] mx-auto bg-neutral-500/8 h-[1px]"></div>

         
          <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
            <h3 className="text-sm font-medium text-neutral-500 font-geist mb-4 md:mb-0">
              Commission
            </h3>
            <div className="flex flex-col w-full sm:flex-row sm:flex-wrap gap-4">
            
              <div className="space-y-2">
                <Label className="text-sm font-medium text-neutral-900 font-geist">
                  Commission Date
                </Label>
                <div className="flex items-center gap-2 flex-wrap">
                 
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="h-10 w-[160px] cursor-pointer justify-start text-left font-geist text-sm text-neutral-400 font-normal border border-neutral-300"
                      >
                        {startDateFrom
                          ? startDateFrom.toLocaleDateString()
                          : "DD MMM YYYY"}
                        <CalendarIcon className="ml-2 h-4 w-4 text-neutral-500" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-4 border-none bg-white" align="start">
                      <Calendar
                        mode="single"
                        selected={startDateFrom}
                        onSelect={setStartDateFrom}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <ArrowRight className="h-5 w-4 text-neutral-500" />

                
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="h-10 w-[160px] cursor-pointer justify-start text-left font-geist text-sm text-neutral-400 font-normal border border-neutral-300"
                      >
                        {startDateTo
                          ? startDateTo.toLocaleDateString()
                          : "DD MMM YYYY"}
                        <CalendarIcon className="ml-2 h-4 w-4 text-neutral-500" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-4 border-none bg-white" align="start">
                      <Calendar
                        mode="single"
                        selected={startDateTo}
                        onSelect={setStartDateTo}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

             
              <div className="space-y-2 min-w-70">
                <Label
                  htmlFor="commission-premium-type"
                  className="text-sm font-medium text-neutral-900 font-geist"
                >
                  Commission Status 
                </Label>
                <Select
                  value={commissionPremiumType}
                  onValueChange={setCommissionPremiumType}
                >
                  <SelectTrigger
                    id="commission-premium-type"
                    className="h-10 min-w-full border border-neutral-300"
                  >
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent className="bg-white font-geist">
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="regular">Regular</SelectItem>
                    <SelectItem value="topup">Top-up</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="w-[99%] mx-auto bg-neutral-500/8 h-[1px]"></div>

        
          <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
            <h3 className="text-sm font-medium text-neutral-500 font-geist mb-4">
              Additional Options
            </h3>
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="auto-renewal"
                  className="border text-white border-neutral-300"
                  checked={autoRenewal}
                  onCheckedChange={setAutoRenewal}
                />
                <Label
                  htmlFor="auto-renewal"
                  className="text-sm font-medium text-neutral-900 font-geist cursor-pointer"
                >
                  Auto-Renewal Enabled
                </Label>
              </div>
              
            </div>
          </div>
        </div>

        
      <DialogFooter className=" flex flex-col sm:flex-row sm:items-center gap-2 mt-6">
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
