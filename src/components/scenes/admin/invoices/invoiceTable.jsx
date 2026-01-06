"use client";

import StatusBadge from "@/components/scenes/admin/invoices/invoicesStatusBadge";
import { DropInfoIcon } from "@/components/shared/svgs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ClientData from "@/data/client";
import { generateUsername } from "@/utils/usernameGenerator";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

export default function InvoiceTable({ currentData }) {
  const router = useRouter();

  const handleViewClientProfile = (clientName) => {
    const client = ClientData.find((c) => c.name === clientName);
    if (client) {
      const username = generateUsername(client.name, client.id);
      router.push(`/clients/${username}`);
    }
  };

  return (
    <div className="scrollbarHidden overflow-x-auto rounded-b-sm border border-t-0 border-neutral-200 2xl:overflow-hidden">
      <table className="w-max 2xl:min-w-full">
        <thead className="border-b border-neutral-500/8 bg-neutral-50">
          <tr>
            <th className="font-geist p-3 text-left text-sm font-semibold text-neutral-900 sm:p-4">
              Invoice ID
            </th>
            <th className="font-geist p-3 text-left text-sm font-semibold text-neutral-900 sm:p-4">
              Client
            </th>
            <th className="font-geist p-3 text-left text-sm font-semibold text-neutral-900 sm:p-4">
              Policy
            </th>
            <th className="font-geist p-3 text-left text-sm font-semibold text-neutral-900 sm:p-4">
              Invoice Date
            </th>
            <th className="font-geist p-3 text-left text-sm font-semibold text-neutral-900 sm:p-4">
              Due Date
            </th>
            <th className="font-geist p-3 text-left text-sm font-semibold text-neutral-900 sm:p-4">
              Amount
            </th>
            <th className="font-geist p-3 text-left text-sm font-semibold text-neutral-900 sm:p-4">
              Status
            </th>
            <th className="font-geist p-3 text-left text-sm font-semibold text-neutral-900 sm:p-4">
              Issued By
            </th>
            <th className="w-10 sm:w-12"></th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((invoice) => (
            <tr
              key={invoice.invoiceId}
              className="border-b border-neutral-50 bg-white duration-300 ease-out hover:bg-neutral-500/4"
            >
              <td className="p-2 sm:p-4">
                <div className="font-geist text-sm font-normal text-neutral-500">
                  {invoice.invoiceId}
                </div>
              </td>

              <td className="p-2 sm:p-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Avatar className="h-6 w-6 sm:h-8 sm:w-8">
                    <AvatarImage
                      src={invoice.client.avatar || "/placeholder.svg"}
                    />
                    <AvatarFallback>
                      {invoice.client.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-geist text-sm font-medium text-neutral-900">
                      {invoice.client.name}
                    </div>
                    <div className="font-geist text-xs text-neutral-500">
                      {invoice.client.type}
                    </div>
                  </div>
                </div>
              </td>

              <td className="font-geist p-2 text-sm text-neutral-500 sm:p-4">
                {invoice.policy}
              </td>

              <td className="font-geist p-2 text-sm font-medium text-neutral-500 sm:p-4">
                {invoice.invoiceDate}
              </td>

              <td className="font-geist p-2 text-sm font-medium text-neutral-500 sm:p-4">
                {invoice.dueDate}
              </td>

              <td className="font-geist p-2 text-sm font-medium text-neutral-900 sm:p-4">
                {invoice.amount}
              </td>

              <td className="p-2 sm:p-4">
                <StatusBadge status={invoice.status} />
              </td>

              <td className="font-geist p-2 text-sm text-neutral-500 sm:p-4">
                {invoice.issuedBy}
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
                      View Invoice
                    </DropdownMenuItem>

                    <DropdownMenuItem className="rounded-sm p-2 text-sm leading-none text-neutral-900 duration-300 hover:bg-neutral-500/8">
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="rounded-sm p-2 text-sm leading-none text-neutral-900 duration-300 hover:bg-neutral-500/8"
                      onClick={() =>
                        handleViewClientProfile(invoice.client.name)
                      }
                    >
                      Client Profile
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
