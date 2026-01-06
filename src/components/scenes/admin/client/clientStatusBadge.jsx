
"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { GoDotFill } from "react-icons/go";

export default function clientStatusBadge({ status }) {
  switch (status) {
    case "Active":
      return (
        <Badge className="bg-teal-100 rounded-full flex gap-1 items-center text-teal-700 ">
          <span><GoDotFill className="text-teal-500" /></span>
          Active
        </Badge>
      );
    
      case "Inactive":
        return (
        <Badge className="bg-neutral-100 rounded-full text-neutral-500 flex gap-1 items-center ">
          <span><GoDotFill className="text-neutral-400" /></span>
          Inactive
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
}
