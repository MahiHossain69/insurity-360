"use client";

import StatusBadge from "@/components/scenes/admin/teamMember/teamMemberStatusBadge";
import { DropInfoIcon } from "@/components/shared/svgs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import teamMemberData from "@/data/team-member";
import { MoreHorizontal } from "lucide-react";

export default function TeamMemberTable() {
  return (
    <div className="scrollbarHidden overflow-x-auto rounded-b-sm border border-t-0 border-neutral-200 2xl:overflow-hidden">
      <table className="w-max lg:min-w-full">
        <thead className="border-b border-neutral-500/8 bg-neutral-50">
          <tr>
            <th className="font-geist p-3 text-left text-sm font-semibold text-neutral-900 sm:w-40 sm:pr-12 sm:pl-5">
              #
            </th>
            <th className="font-geist p-3 text-left text-sm font-semibold text-neutral-900 sm:p-4">
              Name
            </th>
            <th className="font-geist p-3 text-left text-sm font-semibold text-neutral-900 sm:p-4">
              Role
            </th>
            <th className="font-geist p-3 text-left text-sm font-semibold text-neutral-900 sm:p-4">
              Monthly Premium
            </th>
            <th className="font-geist p-3 text-left text-sm font-semibold text-neutral-900 sm:p-4">
              Status
            </th>
            <th className="font-geist p-3 text-left text-sm font-semibold text-neutral-900 sm:p-4">
              Last Login
            </th>
            <th className="w-10 sm:w-12"></th>
          </tr>
        </thead>
        <tbody>
          {teamMemberData.map((member) => (
            <tr
              key={member.id}
              className="border-b border-neutral-100 bg-white hover:bg-neutral-500/4"
            >
              <td className="font-geist p-2 text-sm text-neutral-500 sm:p-4">
                {member.id}
              </td>
              <td className="p-2 sm:p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-geist text-sm font-medium text-neutral-900">
                      {member.name}
                    </div>
                    <div className="font-geist text-xs text-neutral-500">
                      {member.email}
                    </div>
                  </div>
                </div>
              </td>
              <td className="font-geist p-2 text-sm text-neutral-700 sm:p-4">
                {member.role}
              </td>
              <td className="font-geist p-2 text-sm font-medium text-neutral-900 sm:p-4">
                {member.monthlyPremium} $
              </td>
              <td className="p-2 sm:p-4">
                <StatusBadge status={member.status} />
              </td>
              <td className="font-geist p-2 text-sm text-neutral-500 sm:p-4">
                {member.lastLogin}
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
                      View Activity
                    </DropdownMenuItem>

                    <DropdownMenuItem className="rounded-sm p-2 text-sm leading-none text-neutral-900 duration-300 hover:bg-neutral-500/8">
                      Edit
                    </DropdownMenuItem>

                    <hr className="border-neutral-100" />
                    <DropdownMenuItem className="rounded-sm p-2 leading-none text-red-700 duration-300 hover:bg-red-100 disabled:opacity-[32]">
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
