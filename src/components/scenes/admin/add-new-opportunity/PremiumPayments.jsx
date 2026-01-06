"use client";
import { CalendarIcon } from "@/components/shared/svgs";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import {
  currencyOptions,
  paymentMethods,
  premiumFrequencies,
} from "@/data/opportunity-options";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { GoArrowRight } from "react-icons/go";
import { IoIosArrowDown, IoMdCheckmark } from "react-icons/io";

export default function PremiumPayments({ onNext }) {
  const form = useFormContext();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  return (
    <>
      <div className="mb-12 max-w-4xl">
        <h1 className="mb-2 text-2xl font-semibold text-neutral-900">
          Premium & Payments
        </h1>
        <p className="text-sm text-neutral-500">
          Financial details about the policy premium and payment structure.
        </p>
      </div>

      <div className="-mt-3 space-y-1" style={{ maxWidth: "800px" }}>
        <div className="mb-4 grid grid-cols-1 items-start gap-2">
          <div ref={dropdownRef} className="relative sm:w-98">
            <Label htmlFor="total-premium">Total Premium</Label>
            <div className="relative">
              <FormField
                name="totalPremium"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="total-premium"
                        type="number"
                        className="mt-1.5 border border-neutral-300 bg-white p-3 pr-28 focus:border-neutral-300 sm:w-99"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <Button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="mt-1.5 flex items-center border-none bg-transparent text-neutral-900 shadow-none hover:bg-transparent"
                >
                  <span className="font-urbanist mr-1">
                    {form.getValues("currency")}
                  </span>
                  <IoIosArrowDown className="h-3 w-3" />
                </Button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 rounded-lg border border-neutral-100 bg-white shadow-md">
                    {currencyOptions.map((option) => (
                      <Button
                        key={option}
                        onClick={() => {
                          form.setValue("currency", option, {
                            shouldValidate: true,
                            shouldDirty: true,
                          });
                          setDropdownOpen(false);
                        }}
                        className={`font-urbanist flex w-full items-center bg-transparent px-4 py-2 text-sm shadow-none hover:bg-neutral-100 ${
                          form.getValues("currency") === option
                            ? "bg-blue-50 font-medium text-blue-600"
                            : "hover:bg-neutral-100"
                        }`}
                      >
                        {form.getValues("currency") === option && (
                          <IoMdCheckmark className="mr-2 h-4 w-4 text-blue-600" />
                        )}
                        {option}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <FormLabel className="text-sm font-medium text-neutral-900">
              Premium Frequency
            </FormLabel>
            <FormField
              name="premiumFrequency"
              render={({ field }) => (
                <FormItem>
                  <Select
                    value={field.value || ""}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="mt-1.5 h-9 w-full border-neutral-300 bg-white text-neutral-900 focus:border-neutral-300 sm:w-99">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {premiumFrequencies.map((o) => (
                        <SelectItem key={o} value={o}>
                          {o}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="mt-7 mb-7 h-[1px] w-full bg-neutral-200"></div>

        <div className="mb-4 grid grid-cols-1 items-start gap-2">
          <div>
            <FormLabel className="text-sm font-medium text-neutral-900">
              Payment Method
            </FormLabel>
            <FormField
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <Select
                    value={field.value || ""}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="mt-1.5 h-9 w-full border-neutral-300 bg-white text-neutral-900 focus:border-neutral-300 sm:w-99">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {paymentMethods.map((o) => (
                        <SelectItem key={o} value={o}>
                          {o}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <Label
              htmlFor="first-payment-date"
              className="mb-2 block text-sm font-medium text-neutral-900"
            >
              First Payment Date
            </Label>
            <FormField
              name="firstPaymentDate"
              render={({ field }) => (
                <FormItem>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "h-9 w-full justify-between border border-neutral-300 px-4 text-left text-sm font-normal sm:w-99",
                          )}
                        >
                          <span
                            className={
                              field.value
                                ? "text-neutral-900"
                                : "text-neutral-400"
                            }
                          >
                            {field.value
                              ? format(field.value, "dd MMM yyyy")
                              : "DD MMM YYYY"}
                          </span>
                          <CalendarIcon className="h-5 w-5 text-neutral-500" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto border-none bg-white p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => date && field.onChange(date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="mt-8 mb-8 h-[1px] w-full bg-neutral-200"></div>

        <div className="flex items-center space-x-3">
          <FormField
            name="autoRenewal"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Label
                    htmlFor="auto-renewal-toggle"
                    className="relative inline-flex cursor-pointer items-center"
                  >
                    <Input
                      type="checkbox"
                      id="auto-renewal-toggle"
                      checked={!!field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="peer sr-only"
                    />
                    <div className="h-5 w-9 rounded-full border border-neutral-300 bg-white transition-colors duration-200 ease-in-out peer-checked:bg-blue-500"></div>
                    <div className="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-neutral-300 shadow-md transition-transform duration-200 ease-in-out peer-checked:translate-x-4 peer-checked:bg-white"></div>
                  </Label>
                </FormControl>
              </FormItem>
            )}
          />
          <Label
            htmlFor="auto-renewal-toggle"
            className="font-geist cursor-pointer text-sm font-medium text-neutral-900"
          >
            Auto Renewal
          </Label>
        </div>

        <div className="mt-8 mb-8 h-[1px] w-full bg-neutral-200"></div>

        <div className="flex items-center gap-4">
          <Button
            onClick={onNext}
            className="font-geist flex h-9 w-23 items-center gap-2 rounded-lg bg-blue-500 text-sm font-semibold text-white hover:bg-blue-600"
          >
            Next <GoArrowRight className="h-5 w-5 text-white" />
          </Button>
          <button className="text-sm font-semibold text-neutral-900 transition-colors hover:text-neutral-500">
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
