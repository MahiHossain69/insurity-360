"use client";

import React, { useState } from "react";
import {  RowDownIcon, ClientDashboardLeftSideIcon, ClientDashboardRightSideIcon, DropInfoIcon, PolicySearchIcon } from "@/components/shared/svgs";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { GoDotFill } from "react-icons/go";
import ClientPaymentCards from "@/components/scenes/client/client-payment/clientPaymentCards"



const payments = [
  {
    id: "PAY-1001",
    policyTitle: "Health Plan A",
    amount: "320.00 $",
    paymentDate: "10 May 2025",
    status: "Paid",
    method: "Credit Card",
    lastUpdate: "18 May 25",
  },
  {
    id: "PAY-1002",
    policyTitle: "Auto Insurance",
    amount: "580.00 $",
    paymentDate: "05 Apr 2025",
    status: "Canceled",
    method: "Bank Transfer",
    lastUpdate: "05 May 25",
  },
  {
    id: "-",
    policyTitle: "Home Insurance",
    amount: "210.00 $",
    paymentDate: "20 Mar 2025",
    status: "Overdue",
    method: "Card",
    lastUpdate: "20 Apr 25",
  },
];

function PaymentStatusBadge({ status }) {
  const base = "font-geist text-xs font-medium px-2 py-1 rounded-full border-none flex gap-1";
  switch (status) {
    case "Paid":
      return (
        <Badge className={`${base} bg-teal-50 text-xs text-teal-700`}>
          <GoDotFill className="h-3 w-3 text-teal-500" />
          {status}
        </Badge>
      );
    case "Canceled":
      return (
        <Badge className={`${base} bg-red-50 text-red-700 text-xs`}>
          <GoDotFill className="h-3 w-3 text-red-700" />
          {status}
        </Badge>
      );
    case "Overdue":
      return (
        <Badge className={`${base} bg-yellow-50 text-xs text-yellow-600`}>
          <GoDotFill className="h-3 w-3 text-yellow-300" />
          {status}
        </Badge>
      );
    default:
      return (
        <Badge className={`${base} bg-gray-100 text-gray-700`}>
          <GoDotFill className="h-3 w-3 text-gray-500" />
          {status}
        </Badge>
      );
  }
}

const PaymentTable = ({ searchQuery, currentPage, rowsPerPage }) => {
  const filteredPayments = payments.filter(
    (payment) =>
      payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.policyTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.method.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedPayments = filteredPayments.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  return (
    <div className="scrollbarHidden overflow-x-auto rounded-b-sm border border-t-0 border-neutral-200">
      <table className="w-max md:min-w-full">
        <thead className="border-b border-neutral-500/8 bg-neutral-50">
          <tr>
            <th className="font-geist p-3 text-left text-sm font-semibold text-neutral-900 sm:p-4">Payment ID</th>
            <th className="font-geist p-3 text-left text-sm font-semibold text-neutral-900 sm:p-4">Policy Title</th>
            <th className="font-geist p-3 text-left text-sm font-semibold text-neutral-900 sm:p-4">Amount Paid</th>
            <th className="font-geist p-3 text-left text-sm font-semibold text-neutral-900 sm:p-4">Payment Date</th>
            <th className="font-geist p-3 text-left text-sm font-semibold text-neutral-900 sm:p-4">Status</th>
            <th className="font-geist p-3 text-left text-sm font-semibold text-neutral-900 sm:p-4">Method</th>
            <th className="font-geist p-3 text-left text-sm font-semibold text-neutral-900 sm:p-4">Last Update</th>
            <th className="w-10 sm:w-12"></th>
          </tr>
        </thead>
        <tbody>
          {paginatedPayments.map((payment) => (
            <tr key={payment.id + payment.paymentDate} className="border-y border-neutral-100">
              <td className="font-geist p-2 text-sm text-neutral-500 sm:p-4">{payment.id}</td>
              <td className="font-geist p-2 text-sm font-medium text-neutral-900 sm:p-4">{payment.policyTitle}</td>
              <td className="font-geist p-2 text-sm font-medium text-neutral-900 sm:p-4">{payment.amount}</td>
              <td className="font-geist p-2 text-sm text-neutral-500 sm:p-4">{payment.paymentDate}</td>
              <td className="p-2 sm:p-4"><PaymentStatusBadge status={payment.status} /></td>
              <td className="font-geist p-2 text-sm text-neutral-500 sm:p-4">{payment.method}</td>
              <td className="font-geist p-2 text-sm text-neutral-500 sm:p-4">{payment.lastUpdate}</td>
              <td className="rotate-90 p-2 sm:p-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 sm:h-8 sm:w-8">
                      <DropInfoIcon className="h-5 w-5 rotate-90 text-neutral-400" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="border-neutral-100 bg-white">
                    <DropdownMenuItem className="font-geist cursor-pointer text-sm text-neutral-900">View Details</DropdownMenuItem>
                    <DropdownMenuItem className="font-geist cursor-pointer text-sm text-neutral-900">Edit Payment</DropdownMenuItem>
                    <DropdownMenuItem className="font-geist cursor-pointer rounded-none border-t border-neutral-100 text-sm text-red-700">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
          {paginatedPayments.length === 0 && (
            <tr>
              <td colSpan={8} className="px-6 py-4 text-center text-sm text-neutral-500">No records found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const ClientPaymentPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(
    payments.filter(
      (payment) =>
        payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.policyTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.method.toLowerCase().includes(searchQuery.toLowerCase())
    ).length / rowsPerPage
  );

  return (
    <div className="space-y-4">
      <ClientPaymentCards/>
      
      <div className="flex items-center justify-between">
        <h1 className="text-sm font-semibold text-neutral-900">Payments</h1>
        
      </div>

    
      <div className="mb-0 rounded-t-sm border border-neutral-500/8 bg-neutral-50">
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
                <Button variant="outline" className="font-geist cursor-pointer border-neutral-300 bg-transparent font-semibold text-neutral-900">
                  {rowsPerPage} Rows
                  <RowDownIcon className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="font-geist cursor-pointer border-neutral-100 bg-white">
                <DropdownMenuItem onClick={() => setRowsPerPage(5)}>5 Rows</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setRowsPerPage(10)}>10 Rows</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setRowsPerPage(20)}>20 Rows</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <span className="text-neutral-300">|</span>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} className="cursor-pointer border border-neutral-300 bg-transparent">
                <ClientDashboardLeftSideIcon className="h-4 w-4" />
              </Button>
              <span className="font-geist px-2 text-sm text-neutral-900">{currentPage} of {totalPages}</span>
              <Button variant="outline" size="sm" onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} className="cursor-pointer border-neutral-300 bg-transparent">
                <ClientDashboardRightSideIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      
      <PaymentTable searchQuery={searchQuery} currentPage={currentPage} rowsPerPage={rowsPerPage} />
    </div>
  );
};

export default ClientPaymentPage;
