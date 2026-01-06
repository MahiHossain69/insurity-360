"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

export default function RulesAndPermissionsTable({ currentData }) {
  return (
    <div className="scrollbarHidden overflow-x-auto rounded-b-sm border border-t-0 border-neutral-200 2xl:overflow-hidden">
      <table className="w-full 2xl:min-w-full">
        <thead className="border-b border-neutral-500/8 bg-neutral-50">
          <tr className="justify-between border border-t-0 border-b-0 border-neutral-100">
            <th className="font-geist w-1/3 p-3 text-left text-sm font-semibold text-neutral-900 sm:p-4">
              #
            </th>
            <th className="font-geist w-1/3 p-3 text-left text-sm font-semibold text-neutral-900 sm:p-4">
              Role
            </th>
            <th className="font-geist w-1/3 p-3 text-left text-sm font-semibold text-neutral-900 sm:p-4">
              Assigned Users
            </th>
            <th className="w-10 sm:w-12"></th>
          </tr>
        </thead>
        <tbody className="rounded-b-lg border border-neutral-100">
          {currentData.map((role, index) => (
            <tr
              key={role.id}
              className="border-b border-neutral-100 bg-white hover:bg-neutral-500/4"
            >
              <td className="p-2 sm:p-4">
                <div className="font-geist text-sm font-normal text-neutral-500">
                  {index + 1}
                </div>
              </td>
              <td className="p-2 sm:p-4">
                <div className="font-geist text-sm font-medium text-neutral-900">
                  {role.role}
                </div>
              </td>
              <td className="p-2 sm:p-4">
                <div className="font-geist text-sm font-medium text-neutral-500">
                  {role.assignedUsers}
                </div>
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
                      Edit Role
                    </DropdownMenuItem>

                    <hr className="border-neutral-100" />
                    <DropdownMenuItem className="rounded-sm p-2 leading-none text-red-700 duration-300 hover:bg-red-100 disabled:opacity-[32]">
                      Remove
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
