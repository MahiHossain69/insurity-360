"use client";

import React, { useState } from "react";
import ClaimTop from "@/components/scenes/client/client-claims/claimTop";
import {
  AddNewPlusIcon,
  ClientDashboardLeftSideIcon,
  ClientDashboardRightSideIcon,
  DropInfoIcon,
  PolicySearchIcon,
  RowDownIcon,
} from "@/components/shared/svgs";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { GoDotFill } from "react-icons/go";
import Link from "next/link";

function ClaimStatusBadge({ status }) {
  const base =
    "font-geist text-xs font-medium px-2 py-1 rounded-full border-none";
  switch (status) {
    case "Active":
      return (
        <Badge
          className={`${base} flex gap-1 bg-teal-100 text-xs text-teal-700`}
        >
          <GoDotFill className="h-8 w-8 text-teal-500" />
          {status}
        </Badge>
      );

    case "Expired":
      return (
        <Badge
          className={`${base} flex gap-1 bg-neutral-100 text-xs text-neutral-500`}
        >
          <GoDotFill className="h-8 w-8 text-neutral-400" />
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

const claims = [
  {
    id: "POL-2025-0001",
    policyName: "Auto Policy",
    claimType: "Accident",
    status: "Active",
    amount: "2,400 $",
    filedOn: "15 May 25",
    lastUpdate: "18 May 25",
  },
  {
    id: "POL-2025-0002",
    policyName: "Health Plan",
    claimType: "Hospital",
    status: "Active",
    amount: "1,200 $",
    filedOn: "01 May 25",
    lastUpdate: "05 May 25",
  },
  {
    id: "POL-2025-0003",
    policyName: "Travel Plan",
    claimType: "Luggage",
    status: "Expired",
    amount: "650 $",
    filedOn: "10 Apr 25",
    lastUpdate: "20 Apr 25",
  },
];

const ClaimTable = ({ searchQuery, currentPage, rowsPerPage }) => {
  const filteredClaims = claims.filter(
    (claim) =>
      claim.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.policyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.claimType.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedClaims = filteredClaims.slice(
    startIndex,
    startIndex + rowsPerPage,
  );

  return (
    <div>
      <div className="scrollbarHidden overflow-x-auto rounded-b-sm border border-t-0 border-neutral-200">
        <table className="w-max md:min-w-full">
          <thead className="border-b border-neutral-200 bg-neutral-50">
            <tr>
              <th className="font-geist p-3 text-left text-sm font-semibold text-neutral-900 sm:p-4">
                Claim ID
              </th>
              <th className="font-geist p-3 text-left text-sm font-semibold text-neutral-900 sm:p-4">
                Policy Name
              </th>
              <th className="font-geist p-3 text-left text-sm font-semibold text-neutral-900 sm:p-4">
                Claim Type
              </th>
              <th className="font-geist p-3 text-left text-sm font-semibold text-neutral-900 sm:p-4">
                Status
              </th>
              <th className="font-geist p-3 text-left text-sm font-semibold text-neutral-900 sm:p-4">
                Amount
              </th>
              <th className="font-geist p-3 text-left text-sm font-semibold text-neutral-900 sm:p-4">
                Filed On
              </th>
              <th className="font-geist p-3 text-left text-sm font-semibold text-neutral-900 sm:p-4">
                Last Update
              </th>
              <th className="w-10 sm:w-12"></th>
            </tr>
          </thead>
          <tbody>
            {paginatedClaims.map((claim, index) => (
              <tr key={claim.id} className="border-y border-neutral-100">
                <td className="font-geist p-2 text-sm text-neutral-500 sm:p-4">
                  {claim.id}
                </td>
                <td className="font-geist p-2 text-sm font-medium text-neutral-900 sm:p-4">
                  {claim.policyName}
                </td>
                <td className="font-geist p-2 text-sm text-neutral-500 sm:p-4">
                  {claim.claimType}
                </td>
                <td className="p-2 sm:p-4">
                  <ClaimStatusBadge status={claim.status} />
                </td>
                <td className="font-geist p-2 text-sm font-medium text-neutral-900 sm:p-4">
                  {claim.amount}
                </td>
                <td className="font-geist p-2 text-sm text-neutral-500 sm:p-4">
                  {claim.filedOn}
                </td>
                <td className="font-geist p-2 text-sm text-neutral-500 sm:p-4">
                  {claim.lastUpdate}
                </td>
                <td className="rotate-90 p-2 sm:p-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 sm:h-8 sm:w-8"
                      >
                        <DropInfoIcon className="h-5 w-5 rotate-90 text-neutral-400" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="border-neutral-100 bg-white"
                    >
                      <DropdownMenuItem className="font-geist cursor-pointer text-sm text-neutral-900">
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="font-geist cursor-pointer text-sm text-neutral-900">
                        Edit Claim
                      </DropdownMenuItem>
                      <DropdownMenuItem className="font-geist cursor-pointer rounded-none border-t border-neutral-100 text-sm text-red-700">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
            {paginatedClaims.length === 0 && (
              <tr>
                <td
                  colSpan={9}
                  className="px-6 py-4 text-center text-sm text-neutral-500"
                >
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ClientClaimsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const totalPages = Math.ceil(
    claims.filter(
      (claim) =>
        claim.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        claim.policyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        claim.claimType.toLowerCase().includes(searchQuery.toLowerCase()),
    ).length / rowsPerPage,
  );

  return (
    <div className="space-y-4">
      <ClaimTop />

      <div className="flex items-center justify-between">
        <h1 className="text-sm font-semibold text-neutral-900">Claims</h1>
        <Link href="/client/claims/add-new-claims">
          <Button className="bg-transparent text-sm font-semibold text-neutral-900 shadow-none hover:bg-transparent">
            <AddNewPlusIcon className="h-4 w-4 text-black" />
            Add New Claim
          </Button>
        </Link>
      </div>

      <div className="mb-0 rounded-t-sm border border-neutral-200 bg-neutral-50">
        <div className="mb-4 flex flex-col gap-4 px-3 pt-3 text-left sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:px-4 sm:pt-4">
          <div className="relative w-full sm:w-80">
            <PolicySearchIcon className="absolute top-1/2 left-1 h-6 w-6 -translate-y-1/2 transform text-[#94a3b8]" />
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="placeholder:font-geist font-geist w-full border-none pl-10 shadow-none placeholder:text-neutral-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="font-geist cursor-pointer border-neutral-300 bg-transparent font-semibold text-neutral-900"
                >
                  {rowsPerPage} Rows
                  <RowDownIcon className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="font-geist cursor-pointer border-neutral-100 bg-white">
                <DropdownMenuItem onClick={() => setRowsPerPage(5)}>
                  5 Rows
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setRowsPerPage(10)}>
                  10 Rows
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setRowsPerPage(20)}>
                  20 Rows
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <span className="text-neutral-300">|</span>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className="cursor-pointer border border-neutral-300 bg-transparent"
              >
                <ClientDashboardLeftSideIcon className="h-4 w-4" />
              </Button>
              <span className="font-geist px-2 text-sm text-neutral-900">
                {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                className="cursor-pointer border-neutral-300 bg-transparent"
              >
                <ClientDashboardRightSideIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ClaimTable
        searchQuery={searchQuery}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
      />
    </div>
  );
};

export default ClientClaimsPage;
