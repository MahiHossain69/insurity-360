
"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { GoDotFill } from "react-icons/go";

export default function paymentStatusBadge({ status }) {
  switch (status) {
    case "Paid":
      return (
        <Badge className="bg-teal-100 rounded-full flex gap-1 items-center text-teal-700 ">
          <span><GoDotFill className="text-teal-500" /></span>
          Paid
        </Badge>
      );
    case "Overdue":
      return (
        <Badge className="bg-neutral-100 rounded-full text-neutral-500 flex gap-1 items-center font-geist">
          <span><GoDotFill className="text-neutral-400" /></span>
          Overdue
        </Badge>
      );
    case "Failed":
      return (
        <Badge className="bg-red-100 rounded-full text-red-700 flex gap-1 items-center ">
          <span><GoDotFill className="text-red-700" /></span>
          Failed
        </Badge>
      );
    case "Pending":
      return (
        <Badge className="bg-yellow-100 rounded-full text-yellow-600 flex gap-1 items-center ">
          <span><GoDotFill className="text-yellow-300" /></span>
          Pending
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
}
