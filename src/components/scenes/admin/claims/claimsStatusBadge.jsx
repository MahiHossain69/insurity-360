"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { GoDotFill } from "react-icons/go";

export default function ClaimsStatusBadge({ status }) {
  switch (status) {
    case "Approved":
      return (
        <Badge className="bg-teal-100 rounded-full flex font-geist text-xs gap-1 items-center text-teal-700">
          <GoDotFill className="w-8 h-8 text-teal-500" />
          Approved
        </Badge>
      );

    case "Pending":
      return (
        <Badge className="bg-yellow-100 rounded-full flex font-geist text-xs gap-1 items-center text-yellow-600">
          <GoDotFill className="w-8 h-8 text-yellow-400" />
          Pending
        </Badge>
      );

    case "Rejected":
      return (
        <Badge className="bg-red-100 rounded-full flex font-geist text-xs gap-1 items-center text-red-700">
          <GoDotFill className="w-8 h-8 text-red-600" />
          Rejected
        </Badge>
      );

    case "Processing":
      return (
        <Badge className="bg-blue-100 rounded-full flex font-geist text-xs gap-1 items-center text-blue-700">
          <GoDotFill className="w-8 h-8 text-blue-500" />
          Processing
        </Badge>
      );

    case "Settled":
      return (
        <Badge className="bg-green-100 rounded-full flex font-geist text-xs gap-1 items-center text-green-700">
          <GoDotFill className="w-8 h-8 text-green-500" />
          Settled
        </Badge>
      );

    default:
      return (
        <Badge className="bg-neutral-100 rounded-full flex font-geist text-xs gap-1 items-center text-neutral-500 hover:bg-neutral-100">
          <GoDotFill className="w-8 h-8 text-neutral-400" />
          {status || "Unknown"}
        </Badge>
      );
  }
}
