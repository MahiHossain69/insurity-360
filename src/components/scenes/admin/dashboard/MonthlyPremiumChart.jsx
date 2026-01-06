"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import {
  Bar,
  CartesianGrid,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const MonthlyPremiumChart = ({ data, title, className = "" }) => {
  const chartData = data.months.map((month, index) => ({
    month,
    premium: data.premiums[index],
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

  return (
    <div
      className={cn(
        "relative rounded-lg border border-neutral-200 bg-white",
        className,
      )}
    >
      <div className="absolute top-1/2 -left-12 -rotate-90 text-xs text-[#0F172A]">
        Premium amounts collected
      </div>

      <div className="mb-20 flex items-center justify-between border-b border-neutral-200 px-6 py-4">
        <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
        <button className="flex h-8 w-8 items-center justify-center rounded-md bg-neutral-50 transition-colors hover:bg-neutral-100">
          <ChevronDown className="h-4 w-4 text-neutral-600" />
        </button>
      </div>

      <div className="ml-auto h-96 w-[95%]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
            barCategoryGap="25%"
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E5E7EB"
              horizontal={true}
              vertical={false}
            />
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
            <Bar
              dataKey="premium"
              fill="#3787EF"
              radius={[0, 0, 0, 0]}
              maxBarSize={25}
            />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center space-x-2">
        <div className="h-3 w-3 bg-[#3787EF]"></div>
        <span className="text-text-primary text-sm">Months</span>
      </div>
    </div>
  );
};

export default MonthlyPremiumChart;
