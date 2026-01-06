
"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { GoDotFill } from "react-icons/go";

export default function StatusBadge({ status }) {
  switch (status) {
    case "Active":
      return (
        <Badge className="bg-[#c7fff4] rounded-full flex gap-1 items-center text-[#058076] hover:bg-[#c7fff4]">
          <span><GoDotFill /></span>
          Active
        </Badge>
      );
    case "Expired":
      return (
        <Badge className="bg-[#f1f5f9] rounded-full text-neutral-500 flex gap-1 items-center font-geist hover:bg-[#f1f5f9]">
          <span><GoDotFill /></span>
          Expired
        </Badge>
      );
    case "Cancelled":
      return (
        <Badge className="bg-[#ffe4f3] rounded-full text-[#d7005d] flex gap-1 items-center hover:bg-[#ffe4f3]">
          <span><GoDotFill /></span>
          Cancelled
        </Badge>
      );
    case "Pending":
      return (
        <Badge className="bg-[#fff2c6] rounded-full text-[#dd7102] flex gap-1 items-center hover:bg-[#fff2c6]">
          <span><GoDotFill /></span>
          Pending
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
}
