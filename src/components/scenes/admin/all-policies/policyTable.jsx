"use client";

import StatusBadge from "@/components/scenes/admin/all-policies/statusBadge";
import { DropInfoIcon } from "@/components/shared/svgs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

import { useRouter } from "next/navigation";

export default function PolicyTable({ currentData }) {
  const router = useRouter();
  return (
    <div className="scrollbarHidden overflow-x-auto rounded-b-sm border border-t-0 border-neutral-200 bg-neutral-500/4">
      <table className="w-max 2xl:min-w-full">
        <thead className="border-b border-neutral-500/8 bg-neutral-50">
          <tr>
            <th className="font-geist p-3 text-left text-sm font-semibold text-neutral-900 sm:p-4">
              Policy #
            </th>
            <th className="font-geist p-3 text-left text-sm font-semibold text-neutral-900 sm:p-4">
              Client
            </th>
            <th className="font-geist p-3 text-left text-sm font-semibold text-neutral-900 sm:p-4">
              Type
            </th>
            <th className="font-geist p-3 text-left text-sm font-semibold text-neutral-900 sm:p-4">
              Product Plan
            </th>
            <th className="font-geist p-3 text-left text-sm font-semibold text-neutral-900 sm:p-4">
              Duration
            </th>
            <th className="font-geist p-3 text-left text-sm font-semibold text-neutral-900 sm:p-4">
              Coverage
            </th>
            <th className="font-geist p-3 text-left text-sm font-semibold text-neutral-900 sm:p-4">
              Premium
            </th>
            <th className="font-geist p-3 text-left text-sm font-semibold text-neutral-900 sm:p-4">
              Status
            </th>
            <th className="font-geist p-3 text-left text-sm font-semibold text-neutral-900 sm:p-4">
              Agent Name
            </th>
            <th className="font-geist p-3 text-left text-sm font-semibold text-neutral-900 sm:p-4">
              Producer
            </th>
            <th className="w-10 sm:w-12"></th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((policy) => (
            <tr
              key={policy.policyNumber}
              className="border-b border-neutral-50 bg-white hover:bg-neutral-50"
            >
              <td className="p-2 sm:p-4">
                <div>
                  <div className="font-geist text-sm font-medium text-neutral-900">
                    {policy.policyNumber}
                  </div>
                  <div className="font-geist text-xs font-normal text-neutral-500">
                    {policy.policyType}
                  </div>
                </div>
              </td>

              <td className="p-2 sm:p-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Avatar className="h-6 w-6 sm:h-8 sm:w-8">
                    <AvatarImage
                      src={policy.client.avatar || "/placeholder.svg"}
                    />
                    <AvatarFallback>
                      {policy.client.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-geist text-sm font-medium text-neutral-900">
                      {policy.client.name}
                    </div>
                    <div className="font-geist text-xs text-neutral-500">
                      {policy.client.type}
                    </div>
                  </div>
                </div>
              </td>

              <td className="font-geist p-2 text-sm text-neutral-500 sm:p-4">
                {policy.type}
              </td>
              <td className="font-geist p-2 text-sm text-neutral-500 sm:p-4">
                {policy.productPlan}
              </td>
              <td className="p-2 sm:p-4">
                <div>
                  <div className="font-geist text-sm font-medium text-neutral-900">
                    {policy.duration}
                  </div>
                  <div className="font-geist text-xs text-neutral-500">
                    {policy.dateRange}
                  </div>
                </div>
              </td>
              <td className="font-geist p-2 text-sm font-medium text-neutral-900 sm:p-4">
                {policy.coverage}
              </td>
              <td className="p-2 text-sm font-medium text-neutral-900 sm:p-4">
                {policy.premium}
              </td>
              <td className="p-2 sm:p-4">
                <StatusBadge status={policy.status} />
              </td>
              <td className="font-geist p-2 text-sm text-neutral-500 sm:p-4">
                {policy.agentName}
              </td>
              <td className="font-geist p-2 text-sm text-neutral-500 sm:p-4">
                {policy.producer}
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
                    <DropdownMenuItem
                      onClick={() =>
                        router.push(`/policies/${policy.policyNumber}`)
                      }
                      className="rounded-sm p-2 text-sm leading-none text-neutral-900 duration-300 hover:bg-neutral-500/8"
                    >
                      View Details
                    </DropdownMenuItem>

                    <DropdownMenuItem className="rounded-sm p-2 text-sm leading-none text-neutral-900 duration-300 hover:bg-neutral-500/8">
                      Edit
                    </DropdownMenuItem>
                    <hr className="border-neutral-100" />
                    <DropdownMenuItem
                      disabled={policy.status.toLowerCase() !== "cancelled"}
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
