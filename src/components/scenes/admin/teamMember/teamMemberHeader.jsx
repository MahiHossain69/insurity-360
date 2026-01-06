"use client";

import LeaderboardModal from "@/components/scenes/admin/teamMember/leaderboradModal/leaderboardModal";
import {
  AddNewPlusIcon,
  PolicySearchIcon,
  RowDownIcon,
} from "@/components/shared/svgs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function TeamMemberHeader({
  searchTerm,
  setSearchTerm,
  rowsPerPage,
  setRowsPerPage,
  currentPage,
  setCurrentPage,
  totalPages,
  setOpenFilter,
}) {
  const [openLeaderboard, setOpenLeaderboard] = useState(false);
  return (
    <div>
      <div className="w-full bg-white py-4">
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
                      User Management
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-neutral-500" />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link
                      href="/user-management/team-members"
                      className="font-urbanist text-sm font-normal text-neutral-900"
                    >
                      Team Members
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className="font-urbanist text-xl font-medium text-neutral-900 sm:text-2xl">
              Team Members
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1">
              <Link href="/activity-log">
                <Button
                  variant="outline"
                  className="font-geist border-neutral-300 text-sm font-semibold text-neutral-900"
                >
                  All Activities
                </Button>
              </Link>

              <Button
                variant="outline"
                onClick={() => setOpenLeaderboard(true)}
                className="font-geist border-neutral-300 text-sm font-semibold text-neutral-900"
              >
                Leaderboard
              </Button>
            </div>
            <span className="text-neutral-300">|</span>

            <Link href="/user-management/team/addNewMember">
              <Button className="font-geist bg-blue-500 text-sm font-semibold text-white hover:bg-blue-600">
                <AddNewPlusIcon className="mr-2 h-4 w-4" />
                Add New Member
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="rounded-t-sm border border-neutral-200 bg-neutral-50">
        <div className="mb-4 flex flex-col gap-4 px-3 pt-3 text-left sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:px-4 sm:pt-4">
          <div className="relative w-full sm:w-80">
            <PolicySearchIcon className="absolute top-1/2 left-1 h-6 w-6 -translate-y-1/2 transform text-[#94a3b8]" />
            <Input
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
                  <RowDownIcon className="ml-2 h-4 w-4" />
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
      <LeaderboardModal
        open={openLeaderboard}
        onClose={() => setOpenLeaderboard(false)}
      />
    </div>
  );
}
