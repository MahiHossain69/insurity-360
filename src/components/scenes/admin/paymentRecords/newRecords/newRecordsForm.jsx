"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";
import {  Upload, X } from "lucide-react";
import { CalendarIcon, CheckIcon, UploadedImageIcon } from "@/components/shared/svgs";
import { IoMdCheckmark } from "react-icons/io";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { PiUploadSimple } from "react-icons/pi";

export default function NewRecordsForm() {
  const [markAsFinal, setMarkAsFinal] = useState(false);
  const [paymentId, setPaymentId] = useState("CLM-1010");
  const [amountPaid, setAmountPaid] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [referenceNote, setReferenceNote] = useState("");
  const [paymentDate, setPaymentDate] = useState(new Date());
  const [receiptFile, setReceiptFile] = useState(null);

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    if (type === "receipt") {
      setReceiptFile(file);
    }
  };

  return (
    <div className="mt-8 space-y-8" style={{ maxWidth: "800px" }}>
      <div className="space-y-6">
        <div>
          <h2 className="font-geist mb-1 text-2xl font-semibold text-neutral-900">
            General Information
          </h2>
          <p className="font-geist text-sm text-neutral-500 lg:w-150">
            Start by selecting the client and the related policy to ensure the
            payment is correctly associated and trackable.
          </p>
        </div>

        <div className="space-y-3">
          <div className="space-y-2">
            <Label
              htmlFor="payment-id"
              className="font-geist text-sm font-medium text-neutral-900"
            >
              Payment ID
            </Label>
            <Input
              id="payment-id"
              value={paymentId}
              onChange={(e) => setPaymentId(e.target.value)}
              className="w-47 border-neutral-300 bg-[#ffffff] focus:border-neutral-300"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="select-client"
              className="font-geist text-sm font-medium text-neutral-900"
            >
              Select Client
            </Label>
            <Select>
              <SelectTrigger className="w-full border-neutral-300 focus:border-neutral-300">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="client1">Client 1</SelectItem>
                <SelectItem value="client2">Client 2</SelectItem>
                <SelectItem value="client3">Client 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="select-policy"
              className="font-geist text-sm font-medium text-neutral-900"
            >
              Select Policy
            </Label>
            <Select>
              <SelectTrigger className="w-full border-neutral-300 focus:border-neutral-300">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="policy1">Policy 1</SelectItem>
                <SelectItem value="policy2">Policy 2</SelectItem>
                <SelectItem value="policy3">Policy 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

         
          <div className="space-y-2">
            <Label
              htmlFor="payment-date"
              className="text-sm font-medium text-neutral-900"
            >
              Payment Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-47 cursor-pointer justify-between border-neutral-300 text-left focus:border-neutral-300"
                >
                  {paymentDate
                    ? format(paymentDate, "dd MMM yyyy")
                    : "Select date"}
                  <CalendarIcon className="ml-2 h-4 w-4 text-neutral-500" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto cursor-pointer !border-none bg-white p-0">
                <Calendar
                  mode="single"
                  selected={paymentDate}
                  onSelect={setPaymentDate}
                  className="rounded-md border-none"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      <div className="h-[1px] w-full bg-neutral-200"></div>

      <div className="space-y-6">
        <div>
          <h2 className="font-geist mb-1 text-2xl font-semibold text-neutral-900">
            Payment Details
          </h2>
          <p className="font-geist text-sm text-neutral-500">
            Input the payment details to ensure financial tracking is accurate
            and transparent.
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="amount-paid"
              className="text-sm font-medium text-neutral-900"
            >
              Amount Paid
            </Label>
            <div className="flex">
              <Input
                id="amount-paid"
                value={amountPaid}
                onChange={(e) => setAmountPaid(e.target.value)}
                className="rounded-r-none border-r-0 border-neutral-300 bg-[#ffffff] focus:border-neutral-300 sm:w-76"
                placeholder=""
              />
              <Select defaultValue="usd">
                <SelectTrigger className="sm:w-22 rounded-l-none border-l-0 border-neutral-300 font-urbanist bg-white text-neutral-900 shadow-none focus:border-neutral-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white font-urbanist ">
                  <SelectItem value="usd">$ USD</SelectItem>
                  <SelectItem value="eur">€ EUR</SelectItem>
                  <SelectItem value="gbp">£ GBP</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="payment-method"
              className="text-sm font-medium text-neutral-900"
            >
              Payment Method
            </Label>
            <Select>
              <SelectTrigger className="w-full border-neutral-300 text-neutral-900 focus:border-neutral-300 sm:w-98">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="credit-card">Credit Card</SelectItem>
                <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                <SelectItem value="check">Check</SelectItem>
                <SelectItem value="cash">Cash</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="transaction-id"
              className="font-geist text-sm font-medium text-neutral-900"
            >
              Transaction ID{" "}
              <span className="font-geist -mt-2 text-[10px] font-semibold text-neutral-400">
                OPTIONAL
              </span>
            </Label>
            <Input
              id="transaction-id"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className="border-neutral-300 focus:border-neutral-300"
              placeholder=""
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="reference-note"
              className="font-geist text-sm font-medium text-neutral-900"
            >
              Reference Note
              <span className="font-geist -mt-2 text-[10px] font-semibold text-neutral-400">
                OPTIONAL
              </span>
            </Label>
            <Textarea
              id="reference-note"
              value={referenceNote}
              onChange={(e) => setReferenceNote(e.target.value)}
              className="min-h-[72px] resize-none border-neutral-300 bg-[#ffffff] focus:border-neutral-300"
              placeholder=""
            />
          </div>
        </div>
      </div>
      <div className="h-[1px] w-full bg-neutral-200"></div>

      <div className="space-y-6">
        <div>
          <h2 className="font-geist mb-1 text-2xl font-semibold text-neutral-900">
            Payment Status
          </h2>
          <p className="font-geist text-sm text-neutral-500 sm:w-150">
            Choose the current status of the payment and indicate whether it
            completes the policy premium.
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="status"
              className="text-sm font-medium text-neutral-900"
            >
              Status
            </Label>
            <Select>
              <SelectTrigger className="border-[#e2e8f0] text-neutral-900 focus:border-neutral-300 sm:w-98 w-full">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-3">
            <Label
              htmlFor="mark-final"
              className="relative inline-flex cursor-pointer items-center"
            >
              <Input
                type="checkbox"
                id="mark-final"
                checked={markAsFinal}
                onChange={(e) => setMarkAsFinal(e.target.checked)}
                className="peer sr-only"
              />
              <div className="h-5 w-9 rounded-full border border-neutral-300 bg-white transition-colors duration-200 ease-in-out peer-checked:bg-blue-500"></div>
              <div className="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-neutral-300 shadow-md transition-transform duration-200 ease-in-out peer-checked:translate-x-4 peer-checked:bg-white"></div>
            </Label>
            <Label
              htmlFor="mark-final"
              className="font-geist text-sm text-neutral-900"
            >
              Mark as Final Payment
            </Label>
          </div>
        </div>
      </div>
      <div className="h-[1px] w-full bg-neutral-200"></div>

      <div className="space-y-2">
        <div>
          <h2 className="font-geist mb-1 text-2xl font-semibold text-neutral-900">
            Payment Status
          </h2>
          <p className="font-geist text-sm text-neutral-500 sm:w-150">
            Choose the current status of the payment and indicate whether it
            completes the policy premium.
          </p>
        </div>
      </div>

      <div>
        <Label className="font-geist text-sm font-medium text-neutral-900">
          Attach Receipt
        </Label>

        {receiptFile ? (
          <div className="mt-1 flex items-center justify-between rounded-lg border-none bg-neutral-50 p-3">
            <div className="flex items-center">
              <UploadedImageIcon className="h-10 w-10" />
              <div className="ml-3">
                <p className="font-geist text-sm font-medium text-neutral-900">
                  {receiptFile.name}
                </p>
                <p className="font-geist text-xs text-neutral-500">
                  {(receiptFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
            <X
              className="h-6 w-6 cursor-pointer text-neutral-900"
              onClick={() => setReceiptFile(null)}
            />
          </div>
        ) : (
          <div
            className="mt-1 h-18 cursor-pointer rounded-lg border-2 border-dashed border-neutral-300 p-8 text-center transition-colors"
            onClick={() => document.getElementById("receiptUpload")?.click()}
          >
            <PiUploadSimple className="mx-auto -mt-5 mb-2 h-5 w-5 text-neutral-500" />
            <p className="font-geist text-sm text-neutral-500">
              Drag your file here or click to upload
            </p>
          </div>
        )}

        <input
          id="receiptUpload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFileChange(e, "receipt")}
        />
      </div>
      <div className="h-[1px] w-full bg-neutral-200"></div>

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
