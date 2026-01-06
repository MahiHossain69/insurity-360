
"use client";

import React from "react";
import Link from "next/link";
import { Download, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { PolicySearchIcon, AddNewPlusIcon, RowDownIcon } from "@/components/shared/svgs";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function invoicesHeader({
  searchTerm,
  setSearchTerm,
  rowsPerPage,
  setRowsPerPage,
  currentPage,
  setCurrentPage,
  totalPages,
  setOpenFilter,
}) {
  return (
    <div >
      <div className="w-full bg-white pb-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
       
          <div className="flex flex-col gap-1">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/payments" className="text-neutral-500 font-urbanist font-normal text-sm">
                      Payments
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-neutral-500" />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/payments/invoices" className="text-neutral-900 font-urbanist font-normal text-sm">
                      Invoices
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-xl sm:text-2xl font-medium font-urbanist text-neutral-900">Invoices</h1>
          </div>

          <div className="flex flex-wrap gap-2">
           
            <Link href="/payments/invoices/addNewInvoices">
            <Button className="bg-blue-500 cursor-pointer font-geist font-semibold text-sm hover:bg-blue-500/90 text-white">
              <AddNewPlusIcon className="w-4 h-4 mr-2" />
             Add New Invoice
            </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className=" bg-neutral-50 border border-neutral-200  rounded-t-sm ">
        <div className="flex flex-col text-left pt-3 sm:pt-4 px-3 sm:px-4 sm:flex-row sm:items-center sm:justify-between mb-4 gap-4 sm:gap-0">
          <div className="relative w-full sm:w-80">
            <PolicySearchIcon className="absolute left-1 top-1/2 transform -translate-y-1/2 text-[#94a3b8] h-6 w-6" />
            <Input
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full border-none placeholder:font-geist font-geist placeholder:text-neutral-500 shadow-none"
            />
          </div>

          <div className="flex flex-wrap gap-1 items-center">
            <Button
              variant="outline"
              className="border-neutral-300 cursor-pointer text-neutral-900 font-semibold font-geist bg-transparent"
              onClick={() => setOpenFilter(true)}
            >
              Add Filter
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-neutral-300 cursor-pointer text-neutral-900 font-semibold bg-transparent font-geist">
                  {rowsPerPage} Rows
                  <RowDownIcon className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border-neutral-100 font-geist">
                <DropdownMenuItem onClick={() => setRowsPerPage(5)}>5 Rows</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setRowsPerPage(10)}>10 Rows</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setRowsPerPage(20)}>20 Rows</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <span className="text-neutral-300">|</span>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className="border-neutral-300 bg-transparent cursor-pointer border"
              >
                <ChevronLeft className="h-4 w-4 " />
              </Button>
              <span className="text-neutral-900 font-geist text-sm px-2">{currentPage} of {totalPages}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                className="border-neutral-300 bg-transparent cursor-pointer "
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
