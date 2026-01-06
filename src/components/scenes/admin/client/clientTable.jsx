"use client";

import ClientStatusBadge from "@/components/scenes/admin/client/clientStatusBadge";
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

import { generateUsername } from "@/utils/usernameGenerator";

export default function ClientTable({ currentData }) {
  const router = useRouter();

  const handleViewDetails = (client) => {
    const username = generateUsername(client.name, client.id);
    router.push(`/clients/${username}`);
  };

  return (
    <div className="scrollbarHidden overflow-x-auto rounded-b-sm border border-t-0 border-neutral-200">
      <table className="w-max 2xl:min-w-full">
        <thead className="border-b border-neutral-200 bg-neutral-50">
          <tr>
            <th className="font-geist p-3 text-left text-sm font-semibold text-neutral-900 sm:pr-13 sm:pl-5">
              #
            </th>
            <th className="font-geist p-3 text-left text-sm font-semibold text-neutral-900 sm:p-4">
              Client
            </th>
            <th className="font-geist p-3 text-left text-sm font-semibold text-neutral-900 sm:p-4">
              Email
            </th>
            <th className="font-geist p-3 text-left text-sm font-semibold text-neutral-900 sm:p-4">
              Phone Number
            </th>
            <th className="font-geist p-3 text-left text-sm font-semibold text-neutral-900 sm:p-4">
              Total Policies
            </th>
            <th className="font-geist p-3 text-left text-sm font-semibold text-neutral-900 sm:p-4">
              Created On
            </th>
            <th className="font-geist p-3 text-left text-sm font-semibold text-neutral-900 sm:p-4">
              Country
            </th>
            <th className="font-geist p-3 text-left text-sm font-semibold text-neutral-900 sm:p-4">
              Status
            </th>
            <th className="font-geist p-3 text-left text-sm font-semibold text-neutral-900 sm:p-4">
              Agent Name
            </th>
            <th className="w-10 sm:w-12"></th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((client, index) => (
            <tr
              key={index}
              onClick={() => handleViewDetails(client)}
              className="cursor-pointer border-y border-neutral-100 duration-300 hover:bg-neutral-500/4"
            >
              <td className="font-geist p-2 text-sm text-neutral-500 sm:pr-13 sm:pl-5">
                {index + 1}
              </td>

              <td className="p-2 sm:p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={client.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {client.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-geist text-sm font-medium text-neutral-900">
                      {client.name}
                    </div>
                    <div className="font-geist text-xs text-neutral-500">
                      {client.type}
                    </div>
                  </div>
                </div>
              </td>

              <td className="font-geist p-2 text-sm text-neutral-500 sm:p-4">
                {client.email}
              </td>
              <td className="font-geist p-2 text-sm text-neutral-500 sm:p-4">
                {client.phone}
              </td>
              <td className="font-geist p-2 text-sm text-neutral-500 sm:p-4">
                {client.totalPolicies}
              </td>
              <td className="font-geist p-2 text-sm text-neutral-500 sm:p-4">
                {client.createdOn}
              </td>
              <td className="font-geist p-2 text-sm text-neutral-500 sm:p-4">
                {client.country}
              </td>
              <td className="p-2 sm:p-4">
                <ClientStatusBadge status={client.status} />
              </td>
              <td className="font-geist p-2 text-sm text-neutral-500 sm:p-4">
                {client.agentName}
              </td>

              <td className="rotate-90 p-2 sm:p-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 rounded-md bg-transparent text-neutral-900 transition-all duration-300 ease-out hover:bg-neutral-500/16 focus:ring-0 focus-visible:ring-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreHorizontal />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="space-y-0.5 border-neutral-100 bg-white **:not-[&_hr]:cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <DropdownMenuItem
                      onClick={(e) => {
                        handleViewDetails(client);
                      }}
                      className="rounded-sm p-2 text-sm leading-none text-neutral-900 duration-300 hover:bg-neutral-500/8"
                    >
                      View Details
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="rounded-sm p-2 text-sm leading-none text-neutral-900 duration-300 hover:bg-neutral-500/8"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Edit Client
                    </DropdownMenuItem>
                    <hr className="border-neutral-100" />
                    <DropdownMenuItem
                      disabled={client.status.toLowerCase() === "active"}
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
