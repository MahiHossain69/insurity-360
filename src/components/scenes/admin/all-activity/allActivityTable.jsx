"use client";

import DateTimePicker from "@/components/scenes/admin/all-activity/allActivityDateTimePicker";
import { PolicySearchIcon, RightIcon } from "@/components/shared/svgs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { allActivityData } from "@/data/all-activity";
import { ArrowRight, Search } from "lucide-react";
import { useState } from "react";

export default function AllActivityTable() {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [userFilter, setUserFilter] = useState("all");

  return (
    <div className="mt-6 min-w-full 2xl:w-full ">
      <div className="flex items-center gap-4 overflow-x-auto scrollbarHidden rounded-t-sm border-neutral-200 border bg-neutral-50 p-4">
        <div className="relative max-w-xs flex-1">
          <PolicySearchIcon className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-500" />
          <Input
            placeholder="Search"
            className="border-none bg-transparent pl-10 text-neutral-900 shadow-none placeholder:text-neutral-500"
          />
        </div>
        <div className="ml-auto flex items-center gap-2">
         <div className="flex items-center">
           <DateTimePicker date={startDate} onDateChange={setStartDate} />

          <RightIcon className="hidden h-9 w-9 text-neutral-500 lg:block" />

          <DateTimePicker date={endDate} onDateChange={setEndDate} />

         </div>
          <span className="text-neutral-200">|</span>
          <div >
            <Select value={userFilter} onValueChange={setUserFilter}>
            <SelectTrigger className="border-neutral-300 bg-white text-neutral-900 lg:w-75">
              <SelectValue placeholder="All Users" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="all">All Users</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto scrollbarHidden rounded-b-sm border-neutral-200 border border-t-0 bg-white">
        <div className="overflow-x-auto 2xl:overflow-hidden">
          <table className="w-max 2xl:min-w-full">
            <thead className="">
              <tr className="border-b border-neutral-500/8 bg-neutral-50">
                <th className="px-4 py-4 text-left text-sm font-semibold text-neutral-900">
                  Timestamp
                </th>
                <th className="px-4 py-4 text-left text-sm font-semibold text-neutral-900">
                  Name
                </th>
                <th className="px-4 py-4 text-left text-sm font-semibold text-neutral-900">
                  Role
                </th>
                <th className="px-4 py-4 text-left text-sm font-semibold text-neutral-900">
                  Action
                </th>
                <th className="px-4 py-4 text-left text-sm font-semibold text-neutral-900">
                  Entity
                </th>
                <th className="px-4 py-4 text-left text-sm font-semibold text-neutral-900">
                  IP Address
                </th>
                <th className="px-4 py-4 text-left text-sm font-semibold text-neutral-900">
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              {allActivityData.map((log, index) => (
                <tr
                  key={index}
                  className="border-b border-neutral-500/8 transition-colors last:border-b-0"
                >
                  <td className="px-4 py-4 text-sm text-[#64748b]">
                    {log.timestamp}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={log.avatar || "/placeholder.svg"}
                        alt={log.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-sm font-medium text-neutral-900">
                          {log.name}
                        </div>
                        <div className="text-xs text-[#64748b]">
                          {log.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-neutral-900">
                    {log.role}
                  </td>
                  <td className="px-4 py-4 text-sm text-neutral-900">
                    {log.action}
                  </td>
                  <td className="px-4 py-4 text-sm text-[#64748b]">
                    {log.entity}
                  </td>
                  <td className="px-4 py-4 text-sm text-[#64748b]">
                    {log.ipAddress}
                  </td>
                  <td className="px-4 py-4 text-sm text-[#64748b]">
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
