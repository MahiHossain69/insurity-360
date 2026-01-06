"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const PolicyCategoriesChart = ({ data, title, className = "" }) => {
  const COLORS = {
    Health: "#FFD04A",
    Auto: "#8D37EF",
    Life: "#3787EF",
    Travel: "#04C8B2",
    Student: "#D7005D",
  };

  const chartData = data.map((item) => ({
    name: item.category,
    value: item.amount,
    percentage: item.percentage,
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="rounded-lg border border-neutral-200 bg-white p-3 shadow-lg">
          <p className="text-sm font-medium">{data.name}</p>
          <p className="text-sm font-medium text-neutral-600">
            {`${data.percentage}% - $${data.value.toLocaleString()}`}
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
      <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <button className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-50 transition-colors hover:bg-gray-100">
          <ChevronDown className="h-4 w-4 text-gray-600" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 px-6 py-4 lg:grid-cols-2">
        {/* Legend */}
        <div className="flex flex-col gap-3">
          {chartData.map((entry) => (
            <div
              key={entry.name}
              className="flex flex-col gap-1 rounded-lg bg-gray-50 p-2"
            >
              <div className="flex items-center space-x-3">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: COLORS[entry.name] }}
                ></div>
                <span
                  className={cn(
                    "text-sm font-medium",
                    // text color
                    entry.name === "Health"
                      ? "text-yellow-600"
                      : entry.name === "Auto"
                        ? "text-purple-600"
                        : entry.name === "Life"
                          ? "text-blue-600"
                          : entry.name === "Travel"
                            ? "text-green-600"
                            : entry.name === "Student"
                              ? "text-red-600"
                              : "text-gray-900",
                  )}
                >
                  {entry.name}
                </span>
              </div>
              <div className="flex items-center gap-2 divide-x divide-gray-200 pl-6">
                <div className="text-lg font-bold text-gray-900">
                  {entry.percentage}%
                </div>
                <div className="pl-4 text-sm text-gray-600">
                  ${entry.value.toLocaleString()}
                </div>
              </div>
              <div className="pl-6 text-xs text-gray-500">
                <span className="text-green-600">▲ 2.1%</span> vs last month
              </div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="flex h-full w-full items-center justify-center">
          <div className="aspect-square h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius="85%"
                  innerRadius="55%"
                  fill="#8884d8"
                  dataKey="value"
                  stroke="none"
                  paddingAngle={2}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} cursor={false} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyCategoriesChart;
