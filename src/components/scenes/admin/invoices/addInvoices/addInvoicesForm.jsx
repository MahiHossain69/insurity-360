"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Checkbox } from "@/components/ui/checkbox";
import {
 
 
  ArrowRightIcon,
  Percent,
  DollarSign,
  X,
  Upload,
} from "lucide-react";
import { CalendarIcon, CheckIcon, UploadedImageIcon } from "@/components/shared/svgs";
import { IoMdCheckmark } from "react-icons/io";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { PiUploadSimple } from "react-icons/pi";

export default function AddInvoicesForm() {
  const [recurringDisabled, setRecurringDisabled] = useState(true);
  const [untilCanceled, setUntilCanceled] = useState(false);
  const [sendAutomatically, setSendAutomatically] = useState(true);
  const [attachmentFile, setAttachmentFile] = useState(null);
  const [autoInvoice, setAutoInvoice] = useState(false)


  const [discountValue, setDiscountValue] = useState("");
  const [discountType, setDiscountType] = useState("percentage"); 

  
  const [taxValue, setTaxValue] = useState("");
  const [taxType, setTaxType] = useState("percentage");

  const handleDiscountChange = (value) =>
    setDiscountValue(parseFloat(value) || "");
  const handleDiscountTypeChange = (type) => setDiscountType(type);

  const handleTaxChange = (value) => setTaxValue(parseFloat(value) || "");
  const handleTaxTypeChange = (type) => setTaxType(type);

  const [invoiceDate, setInvoiceDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <div className="mt-8 max-w-200 space-y-8">
     
      <section className="space-y-6">
        <div>
          <h2 className="mb-1 text-2xl font-semibold text-neutral-900">
            Invoice Details
          </h2>
          <p className="text-sm text-neutral-500">
            Basic metadata about the invoice being created.
          </p>
        </div>

        <div className="flex flex-col -space-y-2 gap-5">
          <div className="space-y-2">
            <Label
              htmlFor="invoice-id"
              className="text-sm font-medium text-neutral-900"
            >
              Invoice ID
            </Label>
            <Input
              id="invoice-id"
              defaultValue="CLM-1010"
              className="border-neutral-300 bg-white sm:w-47"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="invoice-date"
              className="text-sm font-medium text-neutral-900"
            >
              Invoice Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <div className="relative cursor-pointer sm:w-47">
                  <Input
                    readOnly
                    value={format(invoiceDate, "dd MMM yyyy")}
                    className="h-9 cursor-pointer border-neutral-300 bg-white pr-10"
                  />
                  <CalendarIcon className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-neutral-500" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-auto border-none bg-white p-0">
                <Calendar
                  mode="single"
                  selected={invoiceDate}
                  onSelect={setInvoiceDate}
                  className="rounded-md border-none"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="due-date"
              className="text-sm font-medium text-neutral-900"
            >
              Due Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <div className="relative cursor-pointer sm:w-47">
                  <Input
                    readOnly
                    value={format(dueDate, "dd MMM yyyy")}
                    className="h-9 cursor-pointer border-neutral-300 bg-white pr-10"
                  />
                  <CalendarIcon className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-neutral-500" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-auto border-none bg-white p-0">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={setDueDate}
                  className="rounded-md border-none"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="issued-by"
              className="text-sm font-medium text-neutral-900"
            >
              Issued By
            </Label>
            <Select>
              <SelectTrigger className="w-full border-neutral-300 bg-white">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="company">Company</SelectItem>
                <SelectItem value="individual">Individual</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label
              htmlFor="invoice-status"
              className="text-sm font-medium text-neutral-900"
            >
              Invoice Status
            </Label>
            <Select>
              <SelectTrigger className="w-full border-neutral-300 bg-white sm:w-98">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      <div className="h-[1px] mt-8 mb-8 w-full bg-neutral-300"></div>

      
      <section className="space-y-8">
        <div>
          <h2 className="mb-1 text-2xl font-semibold text-neutral-900">
            Client Information
          </h2>
          <p className="text-sm text-neutral-500">
            Choose the client this invoice is for. It links the invoice with a
            policy and person.
          </p>
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="select-client"
            className="text-sm font-medium text-neutral-900"
          >
            Select Client
          </Label>
          <Select>
            <SelectTrigger className="w-full border-neutral-300 bg-white focus:border-neutral-300">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="client1">Client 1</SelectItem>
              <SelectItem value="client2">Client 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>

      <div className="h-[1px] w-full bg-neutral-300"></div>

     
      <section className="space-y-6">
        <div>
          <h2 className="mb-1 text-2xl font-semibold text-neutral-900">
            Policy Information
          </h2>
          <p className="text-sm text-neutral-500">
            Reference the exact policy this invoice relates to.
          </p>
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="select-policy"
            className="text-sm font-medium text-neutral-900"
          >
            Select Policy
          </Label>
          <Select>
            <SelectTrigger className="w-full border-neutral-300 bg-white focus:border-neutral-300">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="policy1">Policy 1</SelectItem>
              <SelectItem value="policy2">Policy 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>

      <div className="h-[1px] mt-8 mb-8 w-full bg-neutral-200"></div>

     
      <div className="space-y-6">
        <div>
          <h2 className="mb-1 text-2xl font-semibold text-neutral-900">
            Billing & Payment
          </h2>
          <p className="text-sm text-neutral-500">
            Define the monetary values and preferred methods of payment.
          </p>
        </div>

        <div className="space-y-3 mt-8">
          <div className="space-y-2">
            <Label
              htmlFor="invoice-amount"
              className="text-sm font-medium text-neutral-900"
            >
              Invoice Amount
            </Label>
            <div className="flex w-full sm:w-98">
              <Input
                id="invoice-amount"
                placeholder=""
                className="rounded-r-none border-r-0 border-neutral-300 bg-white focus:border-neutral-300"
              />
              <Select defaultValue="usd">
                <SelectTrigger className="w-25 rounded-l-none font-urbanist border-l-0 border-neutral-300 bg-white text-neutral-900 shadow-none focus:border-neutral-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white font-urbanist">
                  <SelectItem value="usd"> $ USD</SelectItem>
                  <SelectItem value="eur">€ EUR</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

         
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium text-neutral-900">
                Discounts
              </Label>
              <span className="font-geist uppercase -mt-2 text-[10px] font-semibold text-neutral-400">
                Optional
              </span>
            </div>
            <div className="relative flex sm:w-98">
              <Input
                type="number"
                value={discountValue}
                onChange={(e) => handleDiscountChange(e.target.value)}
                placeholder=""
                className="bg-background h-9 rounded-r-none border-r-0 border-neutral-300 text-base focus:z-10 focus:border-neutral-300"
                min="0"
                max={discountType === "percentage" ? "100" : undefined}
                step="0.01"
              />
              <Select
                value={discountType}
                onValueChange={handleDiscountTypeChange}
              >
                <SelectTrigger className="h-12 w-16 font-urbanist rounded-l-none border-l-0 border-neutral-300 bg-white text-neutral-900 shadow-none focus:border-neutral-300">
                  <SelectValue>
                    {discountType === "percentage" ? "%" : "$"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-white font-urbanist">
                  <SelectItem
                    value="percentage"
                    className="flex items-center gap-2"
                  >
                    <Percent className="h-4 w-4" /> Percentage
                  </SelectItem>
                  <SelectItem value="fixed" className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" /> Fixed Amount
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

          
            <div className="mt-2 flex items-center gap-2">
              <Label className="text-sm font-medium text-neutral-900">
                Tax
              </Label>
              <span className="font-geist uppercase -mt-2 text-[10px] font-semibold text-neutral-400">
                Optional
              </span>
            </div>
            <div className="relative flex sm:w-98">
              <Input
                type="number"
                value={taxValue}
                onChange={(e) => handleTaxChange(e.target.value)}
                placeholder=""
                className="bg-background h-9 rounded-r-none border-r-0 border-neutral-300 text-base focus:z-10 focus:border-neutral-300"
                min="0"
                max={taxType === "percentage" ? "100" : undefined}
                step="0.01"
              />
              <Select value={taxType} onValueChange={handleTaxTypeChange}>
                <SelectTrigger className="h-12 w-16 font-urbanist rounded-l-none border-l-0 border-neutral-300 bg-white text-neutral-900 shadow-none focus:border-neutral-300">
                  <SelectValue>
                    {taxType === "percentage" ? "%" : "$"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-white font-urbanist">
                  <SelectItem
                    value="percentage"
                    className="flex items-center gap-2"
                  >
                    <Percent className="h-4 w-4" /> Percentage
                  </SelectItem>
                  <SelectItem value="fixed" className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" /> Fixed Amount
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="h-12 w-full -mt-5 rounded-lg bg-neutral-50">
        <h1 className="font-geist flex gap-2 p-3.5 text-sm font-medium text-neutral-500">
          Total Payable :<span className="text-neutral-900">0</span>
        </h1>
      </div>

      <div className="flex flex-col -mt-4 gap-4">
        <div className="space-y-2">
          <Label
            htmlFor="payment-method"
            className="text-sm font-medium text-neutral-900"
          >
            Payment Method
          </Label>
          <Select>
            <SelectTrigger className="w-full border-neutral-300 bg-white focus:border-neutral-300 sm:w-98">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="card">Credit Card</SelectItem>
              <SelectItem value="bank">Bank Transfer</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="transaction-id"
            className="text-sm font-medium text-neutral-900"
          >
            Transaction ID
          </Label>
          <Input
            id="transaction-id"
            placeholder=""
            className="border-neutral-300 bg-white focus:border-neutral-300"
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="payment-status"
            className="text-sm font-medium text-neutral-900"
          >
            Payment Status
          </Label>
          <Select>
            <SelectTrigger className="w-full border-neutral-300 bg-white focus:border-neutral-300 sm:w-98">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="h-[1px] mt-8 mb-8 w-full bg-neutral-200"></div>

      
      <div className="space-y-6">
        <div>
          <h2 className="mb-1 text-2xl font-semibold text-neutral-900">
            Notes & Attachments
          </h2>
          <p className="text-sm text-neutral-500">
            Add context or upload files for transparency and records.
          </p>
        </div>

        <div className="space-y-3 mt-4">
          <div className="space-y-2">
            <Label
              htmlFor="additional-notes"
              className="text-sm font-medium text-neutral-900"
            >
              Additional Notes
            </Label>
            <Textarea
              id="additional-notes"
              placeholder=""
              className="h-17 resize-none border-neutral-300 bg-white"
            />
          </div>

          <div className="space-y-2">
            <Label className="font-geist text-sm font-medium text-neutral-900">
              Attachment
            </Label>

            {attachmentFile ? (
              <div className="mt-1 flex items-center justify-between rounded-lg border-none bg-neutral-50 p-3">
                <div className="flex items-center">
                  <UploadedImageIcon className="h-10 w-10" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-neutral-900">
                      {attachmentFile.name}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {(attachmentFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                <X
                  className="h-6 w-6 cursor-pointer text-neutral-900"
                  onClick={() => setAttachmentFile(null)}
                />
              </div>
            ) : (
              <div
                className="mt-1 h-18 cursor-pointer rounded-lg border-2 border-dashed border-neutral-300 p-8 text-center transition-colors"
                onClick={() =>
                  document.getElementById("attachmentUpload")?.click()
                }
              >
                <PiUploadSimple className="mx-auto -mt-5 mb-2 h-5 w-5 text-neutral-500" />
                <p className="text-sm text-neutral-500">
                 Drag your file here or click to upload
                </p>
              </div>
            )}

            <Input
              id="attachmentUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setAttachmentFile(e.target.files?.[0] || null)}
            />
          </div>
        </div>
      </div>

      <div className="w-full h-[1px] bg-neutral-200 mt-8 mb-8"></div>

     
      <div className="space-y-4">
        <div>
          <h2 className="mb-1 text-2xl font-semibold text-neutral-900">
            Recurring Invoice Settings
          </h2>
          <p className="mb-10 text-sm sm:max-w-150 text-neutral-500 sm:w-150">
            Set up auto-generated invoices on a recurring basis to streamline
            billing for ongoing policies or subscriptions.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Label
            htmlFor="recurring-toggle"
            className="relative inline-flex cursor-pointer items-center"
          >
            <Input
              type="checkbox"
              id="recurring-toggle"
              checked={!recurringDisabled}
              onChange={(e) => setRecurringDisabled(!e.target.checked)}
              className="peer sr-only"
            />
            <div className="h-5 w-9 rounded-full border border-neutral-300 bg-white transition-colors duration-200 ease-in-out peer-checked:bg-blue-500"></div>
            <div className="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-neutral-300 shadow-md transition-transform duration-200 ease-in-out peer-checked:translate-x-4 peer-checked:bg-white"></div>
          </Label>
          <Label
            htmlFor="recurring-toggle"
            className="font-geist cursor-pointer text-sm text-neutral-900"
          >
            Recurring Disabled
          </Label>
        </div>

        {!recurringDisabled && (
          <div className="mt-6 space-y-6">
          
            <div className="space-y-2">
              <Label
                htmlFor="recurrence-interval"
                className="text-sm font-medium text-neutral-900"
              >
                Recurrence Interval
              </Label>
              <Select defaultValue="monthly">
                <SelectTrigger className="w-full border-neutral-300 bg-white text-neutral-900 focus:border-neutral-300 sm:w-98">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>

           
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label
                  htmlFor="start-date"
                  className="text-sm font-medium text-neutral-900"
                >
                  Start Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="relative cursor-pointer sm:w-95">
                      <Input
                        readOnly
                        value={format(startDate, "dd MMM yyyy")}
                        className="h-9 cursor-pointer border-neutral-300 bg-white pr-10 focus:border-neutral-300"
                      />
                      <CalendarIcon className="absolute top-1/2 right-6 h-4 w-4 -translate-y-1/2 transform text-neutral-500" />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto border-none bg-white p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      className="rounded-md border-none"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="end-date"
                  className="text-sm font-medium text-neutral-900"
                >
                  End Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <div
                      className={`relative cursor-pointer sm:w-95 ${untilCanceled ? "pointer-events-none opacity-50" : ""}`}
                    >
                      <Input
                        readOnly
                        value={format(endDate, "dd MMM yyyy")}
                        className="h-9 cursor-pointer border-neutral-300 bg-white pr-10 focus:border-neutral-300"
                        disabled={untilCanceled}
                      />
                      <CalendarIcon className="absolute top-1/2 right-6 h-4 w-4 -translate-y-1/2 transform text-neutral-500" />
                      <ArrowRightIcon className="absolute top-1/2 -left-5.5 hidden h-5 w-4 -translate-y-1/2 transform text-neutral-500 sm:block" />
                    </div>
                  </PopoverTrigger>
                  {!untilCanceled && (
                    <PopoverContent className="w-auto border-none bg-white p-0">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        className="rounded-md border-none"
                      />
                    </PopoverContent>
                  )}
                </Popover>

                <div className="mt-2 flex items-center space-x-2">
                  <Checkbox
                    id="until-canceled"
                    className="border-neutral-300 bg-white text-white"
                    checked={untilCanceled}
                    onCheckedChange={setUntilCanceled}
                  />
                  <Label
                    htmlFor="until-canceled"
                    className="text-sm text-neutral-900"
                  >
                    Until Canceled
                  </Label>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6">
             
              <div className="space-x-2">
                <Label className="mb-2 text-sm font-medium text-neutral-900">
                  Generate Before Due
                </Label>
                <div className="flex h-9 items-center sm:w-46 gap-12 rounded-lg border border-neutral-300 bg-white px-3 text-sm text-neutral-900 focus:border-neutral-300">
                  <Input
                    id="generate-before-due"
                    type="text"
                    defaultValue="15"
                    placeholder="Days"
                    className=" border-none"
                  />
                  <span className="font-urbanist text-sm font-medium text-neutral-900">
                    Days
                  </span>
                </div>
              </div>

             
              <div className="mt-6 flex  items-center space-x-2">
      <Checkbox
        id="send-invoice"
        checked={autoInvoice}
        onCheckedChange={setAutoInvoice}
        className="border-neutral-300 bg-white cursor-pointer data-[state=checked]:bg-primary data-[state=checked]:text-white"
      />
      <Label
        htmlFor="send-invoice"
        className="text-sm cursor-pointer text-neutral-900"
      >
        Send Invoice Automatically
      </Label>
    </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="reminder-frequency"
                className="text-sm font-medium text-neutral-900"
              >
                Reminder Frequency
              </Label>
              <Select defaultValue="1-day">
                <SelectTrigger className="w-full border-neutral-300 bg-white text-neutral-900 focus:border-neutral-300 sm:w-98">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="1-day">1 day before</SelectItem>
                  <SelectItem value="3-days">3 days before</SelectItem>
                  <SelectItem value="1-week">1 week before</SelectItem>
                  <SelectItem value="2-weeks">2 weeks before</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="h-[1px] w-full bg-neutral-200"></div>
          </div>
        )}
      </div>

      
      <div className="flex gap-4">
        <Button className="bg-blue-500 w-23 text-white hover:bg-blue-400">
          <CheckIcon className="h-4 w-4 text-white" />
          Save
        </Button>
        <Button
          variant="outline"
          className="border-none bg-transparent px-8 text-neutral-900 shadow-none"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
