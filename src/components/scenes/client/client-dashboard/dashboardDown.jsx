"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Bar,
  CartesianGrid,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
import { ClientDashboardLeftSideIcon, ClientDashboardRightSideIcon, RowDownIcon } from "@/components/shared/svgs";


const sampleChartData = {
  months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
  premiums: [12000, 18000, 15000, 22000, 27000, 30000, 25000, 32000, 29000],
};


const activities = [
  { id: 1, text: "Payment of $120 completed on 03 May 2025", color: "#3787ef" },
  { id: 2, text: 'Claim #C2341 filed for “Vehicle Damage” → Under Review', color: "#04c8b2" },
  { id: 3, text: 'Policy "Health Secure Plan" auto-renewed on 01 May 2025', color: "#ffd04a" },
  { id: 4, text: 'New document added: "April Invoice.pdf"', color: "#8d37ef" },
  { id: 5, text: "Payment of $120 completed on 03 May 2025", color: "#3787ef" },
  { id: 6, text: 'Claim #C2341 filed for "Vehicle Damage" → Under Review', color: "#04c8b2" },
  { id: 7, text: 'Policy "Health Secure Plan" auto-renewed on 01 May 2025', color: "#ffd04a" },
  { id: 8, text: 'New document added: "April Invoice.pdf"', color: "#8d37ef" },
  { id: 9, text: "Payment of $120 completed on 03 May 2025", color: "#3787ef" },
];

export default function DashboardDown() {

  const chartData = sampleChartData.months.map((month, index) => ({
    month,
    premium: sampleChartData.premiums[index],
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-neutral-200 bg-white p-3 shadow-lg">
          <p className="text-sm font-medium text-neutral-900">{`${label}`}</p>
          <p className="text-sm text-[#3787EF]">
            {`Premium: $${payload[0].value.toLocaleString()}`}
          </p>
        </div>
      );
    }
    return null;
  };

 
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(activities.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const displayedActivities = activities.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevious = () => setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  const handleNext = () => setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));

  return (
    <div className="flex flex-col lg:flex-row gap-4">
     
      <div className="w-full  lg:w-1/2">
        <div className={cn("relative rounded-lg border border-neutral-200 bg-white")}>
          <div className="absolute top-1/2 -left-12 -rotate-90 text-xs text-neutral-900">
            Premium amounts collected
          </div>

          <div className="mb-6 flex items-center justify-between border-b border-neutral-200 px-6 py-3">
            <h3 className="text-base font-medium text-neutral-900">Monthly Premium Collection</h3>
            <Button className="flex h-9 w-9 items-center justify-center rounded-md bg-neutral-50 transition-colors hover:bg-neutral-100">
              <RowDownIcon className="h-5 w-5 text-neutral-600" />
            </Button>
          </div>

          <div className="ml-auto h-96 w-[95%]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                barCategoryGap="25%"
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" horizontal vertical={false} />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#64748B" }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#64748B" }}
                  tickFormatter={(value) => `${value / 10000}`}
                />
                <Tooltip content={<CustomTooltip />} cursor={false} />
                <Bar dataKey="premium" fill="#3787EF" radius={[4, 4, 0, 0]} maxBarSize={25} />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center space-x-2 pb-3">
            <div className="h-3 w-3 bg-[#3787EF]"></div>
            <span className="text-text-primary text-sm">Months</span>
          </div>
        </div>
      </div>

      
      <div className="w-full  lg:w-1/2">
        <div className="w-full bg-white rounded-lg  border border-neutral-200 p-5">
          
          <div className="flex items-center border-neutral-100 -mt-2 pb-4  border-b justify-between mb-6">
            <h2 className="text-base font-semibold text-neutral-900">Recent Activity</h2>
            <div className="flex gap-2">
              <Button
                onClick={handlePrevious}
                className="p-2  bg-neutral-500/10  hover:bg-neutral-500/20 rounded-lg transition-colors"
                aria-label="Previous page"
              >
                <ClientDashboardLeftSideIcon className="w-6 h-6 text-neutral-900" />
              </Button>
              <Button
                onClick={handleNext}
                className="p-2  bg-neutral-500/10  hover:bg-neutral-500/20 rounded-lg transition-colors"
                aria-label="Next page"
              >
                <ClientDashboardRightSideIcon className="w-6 h-6 text-neutral-900" />
              </Button>
            </div>
          </div>

         
          <div className="space-y-1">
            {displayedActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-4 h-9 py-5 px-4 bg-neutral-50 border-l-2  transition-colors"
                style={{ borderLeftColor: activity.color }}
              >
                <p className="text-base font-geist text-neutral-900 ">{activity.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
