"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { GoDotFill } from "react-icons/go";

export default function TeamMemberStatusBadge({ status }) {
  switch (status) {
    case "Active":
      return (
        <Badge className="font-geist flex items-center gap-1 rounded-full bg-teal-100 text-teal-700">
          <GoDotFill className="text-teal-500" />
          Active
        </Badge>
      );
    case "Inactive":
      return (
        <Badge className="font-geist flex items-center gap-1 rounded-full bg-red-100 text-red-700">
          <GoDotFill className="text-red-700" />
          Inactive
        </Badge>
      );

     
    default:
      return (
        <Badge variant="secondary" className="font-geist rounded-full">
          {status}
        </Badge>
      );
  }
}
