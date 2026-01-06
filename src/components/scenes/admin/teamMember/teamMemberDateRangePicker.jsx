
"use client";

import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

export default function TeamMemberDateRangePicker() {
  const [from, setFrom] = useState<Date | null>(null);
  const [to, setTo] = useState<Date | null>(null);

  return (
    <div className="flex items-center gap-2">
     
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[160px] justify-start text-left bg-white text-neutral-700 font-geist"
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-neutral-500" />
            {from ? format(from, "dd MMM yyyy") : "From Date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 bg-white shadow-md rounded-md border border-neutral-100">
          <Calendar
            mode="single"
            selected={from || undefined}
            onSelect={setFrom}
          />
        </PopoverContent>
      </Popover>

      <span className="text-neutral-500">→</span>

      
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[160px] justify-start text-left bg-white text-neutral-700 font-geist"
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-neutral-500" />
            {to ? format(to, "dd MMM yyyy") : "To Date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 bg-white shadow-md rounded-md border border-neutral-100">
          <Calendar
            mode="single"
            selected={to || undefined}
            onSelect={setTo}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

