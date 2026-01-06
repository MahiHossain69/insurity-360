
"use client";

import React, { useState } from "react";

import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { ActivityClock } from "@/components/shared/svgs";

export default function DateTimePicker({ date, onDateChange }) {
  const [selectedDate, setSelectedDate] = useState(date);
  const [timeValue, setTimeValue] = useState(
    date ? format(date, "hh:mm a") : "00:00 AM"
  );

  const handleDateSelect = (newDate) => {
    if (!newDate) return;

    const timeParts = timeValue.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (timeParts) {
      let hours = parseInt(timeParts[1]);
      const minutes = parseInt(timeParts[2]);
      const period = timeParts[3].toUpperCase();

      if (period === "PM" && hours !== 12) hours += 12;
      if (period === "AM" && hours === 12) hours = 0;

      newDate.setHours(hours, minutes, 0, 0);
    }

    setSelectedDate(newDate);
    onDateChange?.(newDate);
  };

  const handleTimeChange = (e) => {
    const value = e.target.value;
    setTimeValue(value);

    if (selectedDate) {
      const timeParts = value.match(/(\d+):(\d+)\s*(AM|PM)/i);
      if (timeParts) {
        let hours = parseInt(timeParts[1]);
        const minutes = parseInt(timeParts[2]);
        const period = timeParts[3].toUpperCase();

        if (period === "PM" && hours !== 12) hours += 12;
        if (period === "AM" && hours === 12) hours = 0;

        const newDate = new Date(selectedDate);
        newDate.setHours(hours, minutes, 0, 0);
        setSelectedDate(newDate);
        onDateChange?.(newDate);
      }
    }
  };

  const displayValue = selectedDate
    ? `${format(selectedDate, "dd MM yyyy")}  |  ${timeValue}`
    : "DD MM YYYY  |  00:00 AM";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative w-full sm:w-64 cursor-pointer">
          <Input
            value={displayValue}
            readOnly
            className="w-full border-neutral-300 bg-white pr-10 text-neutral-400 text-sm sm:text-base"
          />
          <ActivityClock className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 sm:h-5 sm:w-5 -translate-y-1/2 text-[#94a3b8]" />
        </div>
      </PopoverTrigger>

      <PopoverContent
        className="w-[90vw] bg-white border-neutral-300 max-w-sm sm:w-auto p-0"
        align="start"
      >
        <div className="flex flex-col">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            initialFocus
          />
          <div className="border-t border-neutral-300 p-3 sm:p-4">
            <label className="mb-2 block text-sm font-medium text-[#0f172a]">
              Time
            </label>
            <Input
              type="text"
              placeholder="00:00 AM"
              value={timeValue}
              onChange={handleTimeChange}
              className="w-full text-sm sm:text-base"
            />
            <p className="mt-1 text-xs text-neutral-400">
              Format: HH:MM AM/PM
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

