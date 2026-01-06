"use client";
import { CalendarIcon } from "@/components/shared/svgs";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { differenceInMonths, format } from "date-fns";
import { useFormContext, useWatch } from "react-hook-form";
import { GoArrowRight } from "react-icons/go";

export default function PolicyPeriod({ onNext }) {
  const form = useFormContext();
  const startDate = useWatch({ control: form.control, name: "startDate" });
  const endDate = useWatch({ control: form.control, name: "endDate" });

  const totalMonths =
    startDate && endDate ? differenceInMonths(endDate, startDate) : 0;
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const durationText =
    startDate && endDate
      ? years && months
        ? `${years} year${years > 1 ? "s" : ""} ${months} month${months > 1 ? "s" : ""}`
        : years
          ? `${years} year${years > 1 ? "s" : ""}`
          : `${months} month${months > 1 ? "s" : ""}`
      : "—";

  return (
    <>
      <div className="mb-12 max-w-4xl">
        <h1 className="mb-2 text-2xl font-semibold text-neutral-900">
          Policy Period
        </h1>
        <p className="text-sm text-neutral-500">
          Duration and validity of the policy.
        </p>
      </div>

      <div className="-mt-3 space-y-1" style={{ maxWidth: "800px" }}>
        <div className="mb-4 grid grid-cols-1 items-start gap-2 md:grid-cols-[1fr_auto_1fr]">
          <div>
            <Label
              htmlFor="start-date"
              className="mb-2 block text-sm font-semibold text-neutral-900"
            >
              Start Date
            </Label>
            <FormField
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-95 justify-between border border-neutral-300 px-4 py-5 text-left text-sm font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value
                            ? format(field.value, "dd MMM yyyy")
                            : "Pick a date"}
                          <CalendarIcon className="h-5 w-5 text-neutral-500" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full border-none bg-white p-0">
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

          <div className="hidden items-center justify-center pt-10 md:flex">
            <GoArrowRight className="h-6 w-6 text-neutral-500" />
          </div>

          <div>
            <Label
              htmlFor="end-date"
              className="mb-2 block text-sm font-semibold text-neutral-900"
            >
              End Date
            </Label>
            <FormField
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-95 justify-between border border-neutral-300 px-4 py-5 text-left text-sm font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value
                            ? format(field.value, "dd MMM yyyy")
                            : "Pick a date"}
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

        <div className="h-19 rounded-md bg-neutral-50 p-4">
          <div className="-mt-1 text-[18px] font-medium text-neutral-900">
            {durationText}
          </div>
          <div className="text-sm text-neutral-500">Total duration</div>
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
