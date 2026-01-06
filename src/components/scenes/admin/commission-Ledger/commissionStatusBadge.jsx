"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { GoDotFill } from "react-icons/go";

export default function CommissionStatusBadge({ status }) {
  switch (status) {
    case "Active":
      return (
        <Badge className="bg-teal-100 rounded-full flex font-geist text-xs  gap-1 items-center text-teal-700 ">
          <GoDotFill className="w-8 h-8 text-teal-500" />
          Active
        </Badge>
      );
    case "Clawback":
      return (
        <Badge className="bg-blue-100 rounded-full flex gap-1 font-geist text-xs items-center text-blue-700 ">
          <GoDotFill className="w-8 h-8 text-blue-500" />
          Clawback
        </Badge>
      );
    case "Cancelled":
      return (
        <Badge className="bg-red-100 rounded-full flex gap-1 font-geist text-xs items-center text-red-700 ">
          <GoDotFill className="w-8 h-8 text-red-700" />
          Cancelled
        </Badge>
      );
    case "Pending":
      return (
        <Badge className="bg-yellow-100 rounded-full flex gap-1 items-center text-yellow-600 font-geist text-xs">
          <GoDotFill className="w-8 h-8 text-yellow-300" />
          Pending
        </Badge>
      );
    case "Clawed Back":
      return (
        <Badge className="bg-neutral-100 rounded-full flex gap-1 items-center text-neutral-500 font-geist text-xs ">
          <GoDotFill  className="w-8 h-8 text-neutral-400"/>
          Clawed Back
        </Badge>
      );
    default:
      return (
        <Badge className="bg-[#f1f5f9] rounded-full flex gap-1 items-center text-[#64748b] hover:bg-[#f1f5f9]">
          <GoDotFill />
          {status}
        </Badge>
      );
  }
}
