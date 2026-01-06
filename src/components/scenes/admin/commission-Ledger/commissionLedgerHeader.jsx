"use client";

import { PolicySearchIcon } from "@/components/shared/svgs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { commissionLedgerData } from "@/data/commission-ledger";
import { ChevronDown, ChevronLeft, ChevronRight, Download } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const CommissionLedgerHeader = ({
  searchInput,
  setSearchInput,
  rowsPerPage,
  setRowsPerPage,
  currentPage,
  setCurrentPage,
  totalPages,
  setOpenFilter,
}) => {
  const [openOverride, setOpenOverride] = useState(false);

  const downloadCSV = () => {
    if (!commissionLedgerData || commissionLedgerData.length === 0) return;

    const headers = Object.keys(commissionLedgerData[0]);
    const csvRows = [
      headers.join(","),
      ...commissionLedgerData.map((row) =>
        headers.map((field) => JSON.stringify(row[field], replacer)).join(","),
      ),
    ];

    function replacer(key, value) {
      return value === null || value === undefined ? "" : value;
    }

    const csvData = csvRows.join("\n");
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "commission-ledger.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>     
      <div className="w-full bg-white pb-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link
                      href="/"
                      className="font-urbanist text-sm font-normal text-neutral-500"
                    >
                      Home
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-neutral-500" />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link
                      href="/commission-ledger"
                      className="font-urbanist text-sm font-normal text-neutral-900"
                    >
                      Commission Ledger
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className="font-urbanist text-xl font-medium text-neutral-900 sm:text-2xl">
              Commission Ledger
            </h1>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link href="/commission-ledger/commission-rules">
              <Button
                variant="outline"
                className="font-geist cursor-pointer border-none bg-neutral-500/8 text-sm font-semibold text-neutral-900"
              >
                Rules
              </Button>
            </Link>
            <Button
              variant="outline"
              onClick={() => setOpenOverride(true)}
              className="font-geist cursor-pointer border-none bg-neutral-500/8 text-sm font-semibold text-neutral-900"
            >
              Override Share Rule
            </Button>
            <Button
              className="font-geist flex cursor-pointer items-center gap-1 bg-blue-500 text-sm font-semibold text-white hover:bg-blue-500/90"
              onClick={downloadCSV}
            >
              <Download className="h-4 w-4 text-white" />
              Download CSV
            </Button>
          </div>
        </div>
      </div>

      <div className="rounded-t-sm border border-neutral-200 bg-neutral-50">
        <div className="mb-4 flex flex-col gap-4 px-3 pt-3 text-left sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:px-4 sm:pt-4">
          <div className="relative flex w-full items-center sm:w-80">
            <PolicySearchIcon className="absolute top-1/2 left-1 h-6 w-6 -translate-y-1/2 transform text-[#94a3b8]" />
            <Input
              placeholder="Search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="placeholder:font-geist font-geist w-full border-none pl-10 shadow-none placeholder:text-neutral-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1">
            <Button
              variant="outline"
              className="font-geist cursor-pointer border-neutral-300 bg-transparent font-semibold text-neutral-900"
              onClick={() => setOpenFilter(true)}
            >
              Add Filter
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="font-geist cursor-pointer border-neutral-300 bg-transparent font-semibold text-neutral-900"
                >
                  {rowsPerPage} Rows
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="font-geist border-neutral-100 bg-white">
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
                <ChevronLeft className="h-4 w-4" />
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
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={openOverride} onOpenChange={setOpenOverride}>
        <DialogContent className="rounded-3xl border-none shadow-2xl sm:max-w-120 md:px-10 md:py-10">
          <DialogHeader>
            <DialogTitle className="font-geist text-2xl font-bold text-neutral-900">
              Override Rule
            </DialogTitle>
            <p className="font-geist -mt-2 text-sm text-neutral-400 md:mb-4">
              Enter a percentage amount to override the default rule
            </p>
          </DialogHeader>

          <div className="space-y-6 py-2">
            <div>
              <Label className="font-geist mb-1 block text-sm font-medium text-neutral-900">
                Brokerage Share %
              </Label>
              <Input
                type="number"
                placeholder=""
                className="border-neutral-300"
              />
            </div>
            <div>
              <Label className="font-geist mb-1 block text-sm font-medium text-neutral-900">
                Agent Share %
              </Label>
              <Input
                type="number"
                placeholder=""
                className="border-neutral-300"
              />
            </div>
            <div>
              <Label className="font-geist mb-1 block text-sm font-medium text-neutral-900">
                Producer Share %
              </Label>
              <Input
                type="number"
                placeholder=""
                className="border-neutral-300"
              />
            </div>
          </div>

          <DialogFooter className="flex !flex-col gap-2">
            <Button
              className="font-geist w-full cursor-pointer bg-blue-500 font-semibold text-white hover:bg-blue-600"
              onClick={() => setOpenOverride(false)}
            >
              Override
            </Button>
            <Button
              variant="ghost"
              className="font-geist w-full cursor-pointer font-semibold text-neutral-900 hover:bg-neutral-200"
              onClick={() => setOpenOverride(false)}
            >
              Back
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommissionLedgerHeader;
