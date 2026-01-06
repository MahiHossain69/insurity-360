"use client";

import { DropInfoIcon } from "@/components/shared/svgs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { commissionRulesData } from "@/data/commission-rules";
import { GoDotFill } from "react-icons/go";

function StatusBadge({ status }) {
  const base =
    "font-geist text-xs font-medium px-3 py-1 rounded-full border-none flex gap-1 items-center";

  switch (status) {
    case "Active":
      return (
        <Badge className={`${base} bg-teal-100 text-teal-700`}>
          <GoDotFill className="h-3 w-3 text-teal-500" /> {status}
        </Badge>
      );
    case "Inactive":
      return (
        <Badge className={`${base} bg-red-100 text-red-700`}>
          <GoDotFill className="h-3 w-3 text-red-700" /> {status}
        </Badge>
      );

    default:
      return (
        <Badge className={`${base} bg-neutral-100 text-neutral-700`}>
          <GoDotFill className="h-3 w-3 text-gray-400" /> {status}
        </Badge>
      );
  }
}

export default function CommissionRulesTable() {
  return (
    <div className="scrollbarHidden overflow-x-auto rounded-b-sm border border-t-0 border-neutral-200 bg-white">
      <table className="min-w-max sm:w-full 2xl:min-w-full">
        <thead>
          <tr className="border border-t-0 border-r-0 border-l-0 border-neutral-200 bg-neutral-50 text-sm font-semibold text-neutral-900">
            {[
              "Policy Type",
              "Carrier",
              "Effective Date",
              "Brokerage Share",
              "Agent Share",
              "Producer Share",
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
          {commissionRulesData.map((rule) => (
            <tr
              key={rule.id}
              className="border-b border-neutral-100 transition-colors"
            >
              <td className="px-4 py-4 text-sm font-medium text-neutral-500">
                {rule.policyType}
              </td>
              <td className="px-4 py-4 text-sm text-neutral-900">
                {rule.carrier}
              </td>
              <td className="px-4 py-4 text-sm text-neutral-500">
                {rule.effectiveDate}
              </td>
              <td className="px-4 py-4 text-sm font-medium text-neutral-900">
                {rule.brokerage}
              </td>
              <td className="px-4 py-4 text-sm text-neutral-900">
                {rule.agent}
              </td>
              <td className="px-4 py-4 text-sm text-neutral-900">
                {rule.producer}
              </td>
              <td className="px-4 py-4">
                <StatusBadge status={rule.status} />
              </td>

              <td className="rotate-90 p-2 sm:p-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 cursor-pointer p-0 sm:h-8 sm:w-8"
                    >
                      <DropInfoIcon className="h-5 w-5 rotate-90 text-neutral-900" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="border-neutral-100 bg-white"
                  >
                    <DropdownMenuItem className="font-geist text-sm text-neutral-900">
                      View Rule
                    </DropdownMenuItem>
                    <DropdownMenuItem className="font-geist text-sm text-neutral-900">
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="font-geist border-t border-neutral-100 text-sm text-red-700">
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
