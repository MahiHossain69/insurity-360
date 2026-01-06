"use client";

import React, { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

export default function CommissionRulesDateRangePicker() {
  const [from, setFrom] = useState<Date | null>(null);
  const [to, setTo] = useState<Date | null>(null);

  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[160px] justify-start">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {from ? format(from, "dd MMM yyyy") : "DD MMM YYYY"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Calendar mode="single" selected={from} onSelect={setFrom} />
        </PopoverContent>
      </Popover>

      <span>→</span>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[160px] justify-start">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {to ? format(to, "dd MMM yyyy") : "DD MMM YYYY"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Calendar mode="single" selected={to} onSelect={setTo} />
        </PopoverContent>
      </Popover>
    </div>
  );
}
