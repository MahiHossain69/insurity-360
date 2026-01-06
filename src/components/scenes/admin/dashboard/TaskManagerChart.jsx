"use client";

import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useState } from "react";
import {
  Bar,
  CartesianGrid,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const TaskManagerChart = ({ data, className = "" }) => {
  const [activeTab, setActiveTab] = useState("monthly");

  const currentData = data[activeTab];
  const chartData = currentData.chartData;

  const tabs = [
    { key: "monthly", label: "Monthly" },
    { key: "quarterly", label: "Quarterly" },
    { key: "yearly", label: "Yearly" },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-neutral-200 bg-white p-3 shadow-lg">
          <p className="text-sm font-medium text-neutral-900">{`${label}`}</p>
          <p className="text-sm font-medium text-neutral-600">
            {`Amount: $${payload[0].value.toLocaleString()}`}
          </p>
        </div>
      );
    }
    return null;
  };

  const formatValue = (value) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }
    return value.toString();
  };

  return (
    <div
      className={cn(
        "relative rounded-lg border border-neutral-200 bg-white",
        className,
      )}
    >
      {/* Header with Tabs */}
      <div className="">
        <div className="flex items-center justify-between border-b border-gray-200 py-3.5 pr-2 pl-6">
          <h3 className="text-lg font-semibold text-neutral-900">
            Task Manager
          </h3>
          <div className="flex items-center gap-4">
            {/* Tabs */}
            <div className="flex rounded-lg bg-[#F8FAFC] p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={cn(
                    "cursor-pointer rounded-md px-3 py-1 text-sm font-medium transition-colors",
                    activeTab === tab.key
                      ? "bg-white text-[#235BD2] shadow-sm"
                      : "text-gray-600 hover:text-gray-900",
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute top-84 -translate-y-1/2 -rotate-90 text-xs text-[#0F172A]">
          Amount
        </div>

        {/* Stats Header */}
        <div className="mb-6 bg-[#F9F5FF] p-4">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-neutral-900">
              {currentData.current.unit}
              {currentData.current.total.toLocaleString()}
            </span>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-sm text-neutral-600">
              {currentData.current.period}
            </span>
            <div className="flex items-center gap-1">
              <span
                className={cn(
                  "text-sm font-medium",
                  currentData.current.isIncrease
                    ? "text-teal-500"
                    : "text-red-600",
                )}
              >
                <span className="mx-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-teal-500 text-white">
                  {currentData.current.isIncrease ? (
                    <ArrowUp className="size-3" />
                  ) : (
                    <ArrowDown className="size-3" />
                  )}
                </span>
                <span className="text-sm font-medium">
                  {currentData.current.percentageChange}%
                </span>
              </span>
              <span className="text-sm text-neutral-500">
                vs Last{" "}
                {activeTab === "monthly"
                  ? "Month"
                  : activeTab === "quarterly"
                    ? "Quarter"
                    : "Year"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="mt-16 h-80 px-6 pb-6">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart data={chartData} barCategoryGap="20%">
            <CartesianGrid
              stroke="#E5E7EB"
              horizontal={true}
              vertical={false}
            />
            <XAxis
              dataKey={
                activeTab === "monthly"
                  ? "month"
                  : activeTab === "quarterly"
                    ? "quarter"
                    : "year"
              }
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#64748B" }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#64748B" }}
              tickFormatter={formatValue}
            />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Bar
              dataKey="value"
              fill="#8D37EF"
              radius={[0, 0, 0, 0]}
              maxBarSize={25}
            />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-2 pb-4">
        <div className="h-3 w-3 bg-[#8B5CF6]"></div>
        <span className="text-sm text-neutral-600">Dates</span>
      </div>
    </div>
  );
};

export default TaskManagerChart;
