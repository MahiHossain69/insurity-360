"use client";

import React, { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

export default function ClaimsDateRangePicker() {
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);

  return (
    <div className="flex items-center gap-2">
     
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[160px] justify-start text-sm font-geist text-neutral-700"
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-neutral-500" />
            {from ? format(from, "dd MMM yyyy") : "From Date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Calendar mode="single" selected={from} onSelect={setFrom} />
        </PopoverContent>
      </Popover>

      <span className="text-neutral-400">→</span>

     
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[160px] justify-start text-sm font-geist text-neutral-700"
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-neutral-500" />
            {to ? format(to, "dd MMM yyyy") : "To Date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Calendar mode="single" selected={to} onSelect={setTo} />
        </PopoverContent>
      </Popover>
    </div>
  );
}
