"use client";

import { DropInfoIcon } from "@/components/shared/svgs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { GoDotFill } from "react-icons/go";

function ClaimStatusBadge({ status }) {
  const base =
    "font-geist text-xs font-medium px-3 py-1 rounded-full border-none";
  switch (status) {
    case "Approved":
      return (
        <Badge
          className={`${base} flex gap-1 bg-teal-100 text-xs text-teal-700`}
        >
          <GoDotFill className="h-8 w-8 text-teal-500" />
          {status}
        </Badge>
      );
    case "Under Review":
      return (
        <Badge
          className={`${base} flex gap-1 bg-yellow-100 text-xs text-yellow-600`}
        >
          <GoDotFill className="h-8 w-8 text-yellow-300" />
          {status}
        </Badge>
      );
    case "Filed":
      return (
        <Badge
          className={`${base} flex gap-1 bg-neutral-100 text-xs text-neutral-500`}
        >
          <GoDotFill className="h-8 w-8 text-neutral-400" />
          {status}
        </Badge>
      );
    case "Paid":
      return (
        <Badge
          className={`${base} flex gap-1 bg-blue-100 text-xs text-blue-700`}
        >
          <GoDotFill className="h-8 w-8 text-blue-500" />
          {status}
        </Badge>
      );
    default:
      return (
        <Badge className={`${base} flex-1 bg-gray-100 text-gray-700`}>
          <GoDotFill className="h-8 w-8 text-teal-500" />
          {status}
        </Badge>
      );
  }
}

export default function ClaimsTable({ currentData }) {
  return (
    <div className="scrollbarHidden overflow-x-auto rounded-b-sm border border-t-0 border-neutral-200">
      <table className="w-max 2xl:min-w-full">
        <thead>
          <tr className="border-t-0 bg-neutral-50 text-sm font-semibold text-neutral-900">
            {[
              "Claim ID",
              "Policy Title",
              "Client",
              "Claim Type",
              "Claim Amount",
              "Filed Date",
              "Date of Occurrence",
              "Last Updated",
              "Assigned Agent",
              "Status",
            ].map((head, i) => (
              <th
                key={i}
                className="font-geist px-4 py-3 text-left text-sm font-medium"
              >
                {head}
              </th>
            ))}
            <th className="w-10 sm:w-12"></th>
          </tr>
        </thead>

        <tbody>
          {currentData.map((claim, index) => (
            <tr
              key={claim.claimId}
              className="border-b border-neutral-100 transition-colors hover:bg-neutral-500/4"
            >
              <td className="px-4 py-3 text-sm text-neutral-500">
                {claim.claimId}
              </td>
              <td className="px-4 py-3 text-sm font-medium text-neutral-900">
                {claim.policyTitle}
              </td>

              <td className="flex items-center gap-3 px-4 py-3">
                <Avatar className="h-7 w-7">
                  <AvatarImage src={claim.clientImage} alt={claim.clientName} />
                  <AvatarFallback>{claim.clientName[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-medium text-neutral-900">
                    {claim.clientName}
                  </div>
                  <div className="text-xs text-neutral-500">
                    {claim.clientType}
                  </div>
                </div>
              </td>

              <td className="px-4 py-3 text-sm text-neutral-500">
                {claim.claimType}
              </td>
              <td className="px-4 py-3 text-sm font-medium text-neutral-900">
                {claim.claimAmount}
              </td>
              <td className="px-4 py-3 text-sm text-neutral-500">
                {claim.filedDate}
              </td>
              <td className="px-4 py-3 text-sm text-neutral-500">
                {claim.dateOfOccurrence}
              </td>
              <td className="px-4 py-3 text-sm text-neutral-500">
                {claim.lastUpdated}
              </td>
              <td className="px-4 py-3 text-sm text-neutral-500">
                {claim.assignedAgent}
              </td>

              <td className="px-4 py-3">
                <ClaimStatusBadge status={claim.status} />
              </td>
              <td className="rotate-90 p-2 sm:p-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 rounded-md bg-transparent text-neutral-900 transition-all duration-300 ease-out hover:bg-neutral-500/16 focus:ring-0 focus-visible:ring-0"
                    >
                      <MoreHorizontal />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="space-y-0.5 border-neutral-100 bg-white **:not-[&_hr]:cursor-pointer"
                  >
                    <DropdownMenuItem className="rounded-sm p-2 text-sm leading-none text-neutral-900 duration-300 hover:bg-neutral-500/8">
                      View Details
                    </DropdownMenuItem>

                    <DropdownMenuItem className="rounded-sm p-2 text-sm leading-none text-neutral-900 duration-300 hover:bg-neutral-500/8">
                      Edit
                    </DropdownMenuItem>

                    <hr className="border-neutral-100" />
                    <DropdownMenuItem
                      disabled={claim.status.toLowerCase() !== "approved"}
                      className="rounded-sm p-2 leading-none text-red-700 duration-300 hover:bg-red-100 disabled:opacity-[32]"
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
