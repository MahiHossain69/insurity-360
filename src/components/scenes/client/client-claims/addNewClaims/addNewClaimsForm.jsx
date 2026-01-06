"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Upload, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CalendarIcon,
  CheckIcon,
  UploadedImageIcon,
} from "@/components/shared/svgs";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { PiUploadSimple } from "react-icons/pi";

export default function AddNewClaimsForm() {
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [proofFile, setProofFile] = useState(null);
  const [cardImage, setCardImage] = useState(null);

  const form = useForm({
    mode: "onChange",
    defaultValues: {
      policy: "",
      claimType: "",
      incidentDate: "29 Jun 2025",
      incidentSummary: "",
      incidentDescription: "",
      location: "",
      reportedToAuthorities: false,
      reportNumber: "",
      claimedAmount: "",
      currency: "USD",
      additionalNotes: "",
      fullName: "Faiz Ahmed Jiad",
      email: "jiad@mail.com",
      phone: "+880195055105",
      confirmInfo: false,
    },
  });

  const onSubmit = (data) => {
    console.log("Form submitted:", data, uploadedFiles);
  };

  const handleFileUpload = (e, type) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFiles((prev) => ({ ...prev, [type]: file }));
    }
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === "cardImage") {
      setCardImage(file);
    } else if (type === "proof") {
      setProofFile(file);
    }
  };

  const removeFile = (type) => {
    if (type === "cardImage") {
      setCardImage(null);
    } else if (type === "proof") {
      setProofFile(null);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-12 max-w-200 space-y-4"
      >
        <section>
          <h2 className="text-2xl font-semibold text-neutral-900">
            Policy & Claim Type
          </h2>
          <p className="mb-8 text-sm text-neutral-500">
            Helps the system associate the claim with the right policy and
            context.
          </p>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="policy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-neutral-900">
                    Select Policy
                  </FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full border border-neutral-300">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
                      <SelectItem value="policy1">Policy 1</SelectItem>
                      <SelectItem value="policy2">Policy 2</SelectItem>
                      <SelectItem value="policy3">Policy 3</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="claimType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-neutral-900">
                    Claim Type
                  </FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="border- w-full border-neutral-300">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
                      <SelectItem value="medical">Medical</SelectItem>
                      <SelectItem value="property">Property</SelectItem>
                      <SelectItem value="auto">Auto</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="incidentDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-sm font-medium text-neutral-900">
                    Incident Date
                  </FormLabel>

                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-between border border-neutral-300 text-left font-normal sm:w-47",
                            !field.value && "text-neutral-400",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "dd MMM yyyy")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-2 h-4 w-4 text-neutral-500" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>

                    <PopoverContent
                      className="w-auto border-none bg-white p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>

        <div className="my-8 h-px w-full bg-neutral-200"></div>

        <section>
          <h2 className="text-2xl font-semibold text-neutral-900">
            Incident Details
          </h2>
          <p className="mb-8 text-sm text-neutral-500">
            Collects information about what happened.
          </p>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="incidentSummary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-neutral-900">
                    Incident Summary (Title)
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="border border-neutral-300"
                      placeholder=""
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="incidentDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-neutral-900">
                    Incident Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-19 resize-none border border-neutral-300"
                      placeholder=""
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-neutral-900">
                    Location of Incident
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-19 resize-none border border-neutral-300"
                      rows={4}
                      placeholder=""
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 items-center gap-4">
              <FormField
                control={form.control}
                name="reportedToAuthorities"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="text-sm font-medium text-neutral-900">
                      Reported to Authorities?
                    </FormLabel>
                    <div className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          className="border border-neutral-300 text-white"
                          checked={field.value}
                          onCheckedChange={(checked) =>
                            field.onChange(!!checked)
                          }
                        />
                      </FormControl>
                      <FormLabel className="cursor-pointer text-sm font-medium text-neutral-900">
                        Yes
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reportNumber"
                render={({ field }) => {
                  const reported = form.watch("reportedToAuthorities");
                  return (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-neutral-900">
                        Report Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder=""
                          {...field}
                          disabled={!reported}
                          className={cn(
                            "transition-colors",
                            reported
                              ? "cursor-text border border-neutral-300 bg-white"
                              : "cursor-not-allowed border border-neutral-200 bg-neutral-50",
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
          </div>
        </section>

        <div className="my-8 h-px w-full bg-neutral-200"></div>

        <section>
          <h2 className="text-2xl font-semibold text-neutral-900">
            Claim Amount
          </h2>
          <p className="mb-8 text-sm text-neutral-500">
            Estimate of the cost or compensation being claimed.
          </p>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="claimedAmount"
              render={({ field }) => (
                <FormItem className="relative sm:w-98">
                  <FormLabel className="text-sm font-medium text-neutral-900">
                    Claimed Amount
                  </FormLabel>

                  <div className="relative mt-1.5">
                    <FormControl>
                      <Input
                        type="number"
                        placeholder=""
                        {...field}
                        className="h-9 w-full border border-neutral-300 bg-white pr-28 pl-3 text-sm"
                      />
                    </FormControl>

                    <div className="absolute inset-y-0 right-0 flex items-center">
                      <FormField
                        control={form.control}
                        name="currency"
                        render={({ field: currencyField }) => (
                          <Select
                            value={currencyField.value}
                            onValueChange={currencyField.onChange}
                          >
                            <FormControl>
                              <SelectTrigger className="font-urbanist flex h-9 justify-normal border-none bg-transparent font-medium text-neutral-900 shadow-none focus:ring-0 focus:outline-none">
                                <SelectValue placeholder="$ USD" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="font-urbanist rounded-lg border border-neutral-100 bg-white shadow-md">
                              <SelectItem
                                value="USD"
                                className="text-sm hover:bg-gray-100 focus:bg-blue-50"
                              >
                                $ USD
                              </SelectItem>
                              <SelectItem
                                value="EUR"
                                className="text-sm hover:bg-gray-100 focus:bg-blue-50"
                              >
                                € EUR
                              </SelectItem>
                              <SelectItem
                                value="GBP"
                                className="text-sm hover:bg-gray-100 focus:bg-blue-50"
                              >
                                £ GBP
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <div className="mb-2 flex items-center gap-2">
                <FormLabel className="text-sm font-medium text-neutral-900">
                  Upload Bills/Estimates
                </FormLabel>
                <span className="-mt-2 text-[10px] font-semibold text-neutral-400 uppercase">
                  Optional
                </span>
              </div>

              {cardImage ? (
                <div className="flex items-center justify-between rounded-lg border border-neutral-200 bg-neutral-50 p-3">
                  <div className="flex items-center">
                    <UploadedImageIcon className="h-10 w-10" />
                    <div className="ml-3">
                      <p className="font-geist text-sm font-medium text-neutral-900">
                        {cardImage.name}
                      </p>
                      <p className="font-geist text-xs text-neutral-500">
                        {(cardImage.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                  <X
                    className="h-5 w-5 cursor-pointer text-neutral-600 transition hover:text-neutral-900"
                    onClick={() => removeFile("cardImage")}
                  />
                </div>
              ) : (
                <div className="h-17.5 cursor-pointer rounded-lg border-2 border-dashed border-neutral-300 py-2 text-center transition hover:bg-neutral-50">
                  <Label
                    htmlFor="cardImage"
                    className="flex cursor-pointer flex-col items-center gap-2"
                  >
                    <PiUploadSimple className="mx-auto h-5 w-5 text-neutral-500" />
                    <p className="font-geist text-sm text-neutral-500">
                      Drag your file here or click to upload
                    </p>
                  </Label>
                  <Input
                    id="cardImage"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, "cardImage")}
                  />
                </div>
              )}
            </FormItem>
          </div>
        </section>

        <div className="my-8 h-px w-full bg-neutral-200"></div>

        <section>
          <h2 className="text-2xl font-semibold text-neutral-900">
            Supporting Documents
          </h2>
          <p className="mb-8 text-sm text-neutral-500">
            Helps validate your claim with proper proof.
          </p>

          <div className="space-y-4">
            <FormItem>
              <div className="mb-2 flex items-center gap-2">
                <FormLabel className="text-sm font-medium text-neutral-900">
                  Upload Incident Proof
                </FormLabel>
               
              </div>

              {proofFile ? (
                <div className="flex items-center justify-between rounded-lg border border-neutral-200 bg-neutral-50 p-3">
                  <div className="flex items-center">
                    <UploadedImageIcon className="h-10 w-10" />
                    <div className="ml-3">
                      <p className="font-geist text-sm font-medium text-neutral-900">
                        {proofFile.name}
                      </p>
                      <p className="font-geist text-xs text-neutral-500">
                        {(proofFile.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                  <X
                    className="h-5 w-5 cursor-pointer text-neutral-600 transition hover:text-neutral-900"
                    onClick={() => removeFile("proof")}
                  />
                </div>
              ) : (
                <div className="h-17.5 cursor-pointer rounded-lg border-2 border-dashed border-neutral-300 py-2 text-center transition hover:bg-neutral-50">
                  <Label
                    htmlFor="proof-upload"
                    className="flex cursor-pointer flex-col items-center gap-2"
                  >
                    <PiUploadSimple className="mx-auto h-5 w-5 text-neutral-500" />
                    <p className="font-geist text-sm text-neutral-500">
                      Drag your file here or click to upload
                    </p>
                  </Label>
                  <Input
                    id="proof-upload"
                    type="file"
                    accept="image/*,application/pdf"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, "proof")}
                  />
                </div>
              )}
            </FormItem>

            <FormField
              control={form.control}
              name="additionalNotes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-neutral-900">
                    Additional Notes
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-19 resize-none border border-neutral-300"
                      placeholder=""
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>
        <div className="my-8 h-px w-full bg-neutral-200"></div>

        <section>
          <h2 className="text-2xl font-bold text-neutral-900">
            Contact Confirmation
          </h2>
          <p className="text-neutral-500text-sm mb-8">
            Helps validate your claim with proper proof.
          </p>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-neutral-900">
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input className="border border-neutral-300" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-neutral-900">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="border border-neutral-300"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-neutral-900">
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="border border-neutral-300"
                      type="tel"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="my-8 h-px w-full bg-neutral-200"></div>
            <FormField
              control={form.control}
              name="confirmInfo"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-y-0 space-x-1 ">
                  <FormControl>
                    <Checkbox
                      className="border border-neutral-300 text-white"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 text-sm leading-none font-medium text-neutral-900">
                    <FormLabel className="cursor-pointer">
                      I confirm the above information is true and accurate to
                      the best of my knowledge.
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </section>

        <div className="flex gap-1 pt-4">
          <Button
            type="submit"
            className="w-23 cursor-pointer bg-blue-500 text-white hover:bg-blue-400"
            disabled={!form.formState.isDirty || !form.formState.isValid}
          >
            <CheckIcon className="h-4 w-4 text-white" />
            Save
          </Button>
          <Button
            variant="outline"
            className="cursor-pointer font-semibold text-sm border-none bg-transparent px-8 text-neutral-900 shadow-none"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
