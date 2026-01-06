"use client";

import { CalendarIcon, RightIcon } from "@/components/shared/svgs";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { ChevronRight, DollarSign } from "lucide-react";
import { useState } from "react";

export function AddNewRuleModal({ onClose }) {
  const [discountType, setDiscountType] = useState("percentage");
  const [agentValue, setAgentValue] = useState("percentage");
  const [formData, setFormData] = useState({
    policyType: "",
    effectiveDateFrom: "",
    effectiveDateTo: "",
    brokerage: "",
    agent: "",
    producer: "",
    carrier: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    console.log("Saving rule:", formData);
    onClose();
  };

  return (
    <div>
      <div className="w-full overflow-hidden overflow-y-auto px-3">
        <div className="space-y-6 px-4">
          <div>
            <Label className="mb-2 block text-sm font-medium text-neutral-900">
              Carrier
            </Label>

            <div className="relative">
              <Select
                value={formData.carrier ?? ""}
                onValueChange={(value) => handleInputChange("carrier", value)}
              >
                <SelectTrigger className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-neutral-900 hover:border-[#94a3b8] focus:border-neutral-300">
                  <SelectValue placeholder="Select carrier" />
                </SelectTrigger>

                <SelectContent className="rounded-lg border border-neutral-300 bg-white text-neutral-900">
                  <SelectItem value="carrier1">Carrier 1</SelectItem>
                  <SelectItem value="carrier2">Carrier 2</SelectItem>
                  <SelectItem value="carrier3">Carrier 3</SelectItem>
                </SelectContent>
              </Select>

              <ChevronRight className="pointer-events-none absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 rotate-90 text-neutral-400" />
            </div>
          </div>

          <div>
            <Label className="mb-2 block text-sm font-medium text-neutral-900">
              Policy Type
            </Label>
            <div className="relative">
              <Select
                value={formData.policyType}
                onValueChange={(value) =>
                  handleInputChange("policyType", value)
                }
              >
                <SelectTrigger className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-neutral-900 hover:border-[#94a3b8] focus:border-neutral-300">
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent className="rounded-lg border border-neutral-300 bg-white text-neutral-900">
                  <SelectItem value="type1">Policy Type 1</SelectItem>
                  <SelectItem value="type2">Policy Type 2</SelectItem>
                </SelectContent>
              </Select>
              <ChevronRight className="pointer-events-none absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 rotate-90 text-neutral-400" />
            </div>
          </div>

          <div>
            <Label className="mb-2 block text-sm font-medium text-neutral-900">
              Effective Date
            </Label>
            <div className="flex items-center">
              <div className="relative flex-1">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between rounded-lg border border-neutral-300 px-4 py-3 text-neutral-900 hover:border-[#94a3b8] focus:border-transparent focus:ring-2 focus:ring-[#3787ef]"
                    >
                      {formData.effectiveDateFrom ? (
                        format(formData.effectiveDateFrom, "dd MMM yyyy")
                      ) : (
                        <span className="text-neutral-400">DD MMM YYYY</span>
                      )}
                      <CalendarIcon className="h-5 w-5 text-neutral-400" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto rounded-lg border border-neutral-300 bg-white p-0"
                    align="end"
                  >
                    <Calendar
                      mode="single"
                      selected={formData.effectiveDateFrom}
                      onSelect={(date) =>
                        handleInputChange("effectiveDateFrom", date)
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <RightIcon className="h-9 w-9 text-neutral-400" />

              <div className="relative flex-1">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between rounded-lg border border-neutral-300 px-4 py-3 text-neutral-900 hover:border-[#94a3b8] focus:border-transparent focus:ring-2 focus:ring-[#3787ef]"
                    >
                      {formData.effectiveDateTo ? (
                        format(formData.effectiveDateTo, "dd MMM yyyy")
                      ) : (
                        <span className="text-neutral-400">DD MMM YYYY</span>
                      )}
                      <CalendarIcon className="h-5 w-5 text-neutral-400" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto rounded-lg border border-neutral-300 bg-white p-0"
                    align="end"
                  >
                    <Calendar
                      mode="single"
                      selected={formData.effectiveDateTo}
                      onSelect={(date) =>
                        handleInputChange("effectiveDateTo", date)
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          <div className="-mt-2 mb-3 h-[1px] w-full bg-neutral-200"></div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label className="mb-2 block text-sm font-medium text-neutral-900">
                Brokerage
              </Label>
              <div className="relative flex sm:w-96">
                <Input
                  type="number"
                  value={formData.brokerage}
                  onChange={(e) =>
                    handleInputChange("brokerage", e.target.value)
                  }
                  placeholder=""
                  className="bg-background h-9 w-57 rounded-r-none border-r-0 border-neutral-300 text-neutral-900 focus:z-10 focus:border-neutral-300"
                  min="0"
                  max="100"
                  step="0.01"
                />
                <Select value={discountType} onValueChange={setDiscountType}>
                  <SelectTrigger className="font-urbanist h-9 w-15.5 rounded-l-none border-l-0 border-neutral-300 bg-white text-neutral-900 shadow-none focus:border-neutral-300">
                    <SelectValue>
                      {discountType === "percentage" ? "%" : "$"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="font-urbanist bg-white">
                    <SelectItem value="percentage">% Percentage</SelectItem>
                    <SelectItem value="fixed">
                      <DollarSign className="h-4 w-4" /> Fixed Amount
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium text-neutral-900">
                Agent
              </Label>
              <div className="relative flex sm:w-96">
                <Input
                  type="number"
                  value={formData.agent}
                  onChange={(e) => handleInputChange("agent", e.target.value)}
                  placeholder=""
                  className="bg-background h-9 w-57 rounded-r-none border-r-0 border-neutral-300 text-neutral-900 placeholder-[#94a3b8] focus:z-10 focus:border-neutral-300"
                  min="0"
                  max="100"
                  step="0.01"
                />
                <Select value={agentValue} onValueChange={setAgentValue}>
                  <SelectTrigger className="font-urbanist h-9 w-15.5 rounded-l-none border-l-0 border-neutral-300 bg-white text-neutral-900 shadow-none focus:border-neutral-300">
                    <SelectValue>
                      {agentValue === "percentage" ? "%" : "$"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="font-urbanist bg-white">
                    <SelectItem value="percentage">% Percentage</SelectItem>
                    <SelectItem value="fixed">
                      <DollarSign className="h-4 w-4" /> Fixed Amount
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label className="mb-2 block text-sm font-medium text-neutral-900">
                Producer
              </Label>
              <div className="relative flex sm:w-96">
                <Input
                  type="number"
                  value={formData.producerValue || ""}
                  onChange={(e) =>
                    handleInputChange("producerValue", e.target.value)
                  }
                  placeholder=""
                  className="bg-background h-9 w-57 rounded-r-none border-r-0 border-neutral-300 text-neutral-900 placeholder-[#94a3b8] focus:z-10 focus:border-neutral-300"
                  min="0"
                  max="100"
                  step="0.01"
                />
                <Select
                  value={formData.producer || "percentage"}
                  onValueChange={(value) =>
                    handleInputChange("producer", value)
                  }
                >
                  <SelectTrigger className="font-urbanist h-9 w-16 rounded-l-none border-l-0 border-neutral-300 bg-white text-neutral-900 shadow-none focus:border-neutral-300">
                    <SelectValue>
                      {formData.producer === "percentage" ? "%" : "$"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="font-urbanist bg-white">
                    <SelectItem value="percentage">% Percentage</SelectItem>
                    <SelectItem value="fixed">
                      <DollarSign className="h-4 w-4" /> Fixed Amount
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium text-neutral-900">
                Carrier
              </Label>
              <div className="relative flex sm:w-96">
                <Input
                  type="number"
                  value={formData.carrierValue || ""}
                  onChange={(e) =>
                    handleInputChange("carrierValue", e.target.value)
                  }
                  placeholder=""
                  className="bg-background h-9 w-57 rounded-r-none border-r-0 border-neutral-300 text-neutral-900 placeholder-[#94a3b8] focus:z-10 focus:border-neutral-300"
                  min="0"
                  max="100"
                  step="0.01"
                />
                <Select
                  value={formData.carrier || "percentage"}
                  onValueChange={(value) => handleInputChange("carrier", value)}
                >
                  <SelectTrigger className="font-urbanist h-9 w-16 rounded-l-none border-l-0 border-neutral-300 bg-white text-neutral-900 shadow-none focus:border-neutral-300">
                    <SelectValue>
                      {formData.carrier === "percentage" ? "%" : "$"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="font-urbanist bg-white">
                    <SelectItem value="percentage">% Percentage</SelectItem>
                    <SelectItem value="fixed">
                      <DollarSign className="h-4 w-4" /> Fixed Amount
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 mt-4 mb-2 flex h-16.5 w-full items-center justify-end gap-3 bg-neutral-50 px-5">
          <Button
            variant="outline"
            onClick={onClose}
            className="border border-neutral-300 bg-transparent px-6 py-2 text-neutral-900 hover:bg-neutral-50"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-blue-500 px-6 py-2 text-white hover:bg-blue-700"
          >
            Save Rule
          </Button>
        </div>
      </div>
    </div>
  );
}
