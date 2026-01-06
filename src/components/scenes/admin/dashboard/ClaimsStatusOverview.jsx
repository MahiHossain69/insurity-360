"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import {
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const ClaimsStatusOverview = ({
  data,
  title = "Claims Status Overview",
  className = "",
}) => {
  const chartData = data || [
    { status: "Total Filed", count: 670 },
    { status: "Under Review", count: 650 },
    { status: "Approved", count: 620 },
    { status: "Denied", count: 560 },
    { status: "Paid (Closed)", count: 521 },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-neutral-200 bg-white p-3 shadow-lg">
          <p className="text-sm font-medium text-neutral-900">{label}</p>
          <p className="text-sm font-medium text-neutral-600">
            {`Count: ${payload[0].value.toLocaleString()}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className={cn(
        "relative rounded-lg border border-neutral-200 bg-white",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-3">
        <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
        <button className="flex h-8 w-8 items-center justify-center rounded-md bg-neutral-50 transition-colors hover:bg-neutral-100">
          <ChevronDown className="h-4 w-4 text-neutral-600" />
        </button>
      </div>

      <div className="px-6 py-4">
        <div className="mt-10 h-60">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" barCategoryGap="20%">
              <XAxis
                type="number"
                dataKey="count"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#64748B" }}
              />
              <YAxis
                dataKey="status"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tick={{ fontSize: 12, fill: "#64748B" }}
                width={100}
                tickFormatter={(value) => value.slice(0, 15)}
              />
              <Tooltip content={<CustomTooltip />} cursor={false} />
              <Bar
                dataKey="count"
                fill="#20B2AA"
                radius={[0, 0, 0, 0]}
                maxBarSize={32}
              >
                <LabelList
                  dataKey="count"
                  position="right"
                  style={{
                    fontSize: "16px",
                    fill: "#374151",
                    fontWeight: "500",
                  }}
                  offset={8}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="px-6 pb-4">
        <div className="flex items-center justify-center space-x-2">
          <div className="h-3 w-3 bg-[#20B2AA]"></div>
          <span className="text-sm text-neutral-600">Claims Status</span>
        </div>
      </div>
    </div>
  );
};

export default ClaimsStatusOverview;
