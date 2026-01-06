"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const RevenueByProductLineChart = ({ data, className = "" }) => {
  const chartData = data.products.map((item) => ({
    name: item.name,
    value: item.amount,
    percentage: item.percentage,
    color: item.color,
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="rounded-lg border border-neutral-200 bg-white p-3 shadow-lg">
          <p className="text-sm font-medium text-neutral-900">{data.name}</p>
          <p className="text-sm font-medium text-neutral-600">
            {`${data.percentage}% - $${data.value.toLocaleString()}`}
          </p>
        </div>
      );
    }
    return null;
  };

  const getTextColor = (productName) => {
    const colorMap = {
      Auto: "text-yellow-600",
      Life: "text-purple-600",
      Health: "text-blue-600",
      Commercial: "text-green-600",
      Pet: "text-red-600",
    };
    return colorMap[productName] || "text-gray-900";
  };

  return (
    <div
      className={cn(
        "relative rounded-lg border border-neutral-200 bg-white",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Revenue by Product Line
        </h3>
        <button className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-50 transition-colors hover:bg-gray-100">
          <ChevronDown className="h-4 w-4 text-gray-600" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 px-6 py-4 lg:grid-cols-2">
        {/* Legend */}
        <div className="flex flex-col gap-3">
          {chartData.map((entry) => {
            const product = data.products.find((p) => p.name === entry.name);
            return (
              <div
                key={entry.name}
                className="flex flex-col gap-1 rounded-lg bg-gray-50 p-2"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  ></div>
                  <span
                    className={cn(
                      "text-sm font-medium",
                      getTextColor(entry.name),
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
                  <span
                    className={cn(
                      "font-medium",
                      product?.isIncrease ? "text-green-600" : "text-red-600",
                    )}
                  >
                    {product?.isIncrease ? "▲" : "▼"} {product?.change}%
                  </span>
                  <span className="ml-1">Than last year</span>
                </div>
              </div>
            );
          })}
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
                    <Cell key={`cell-${index}`} fill={entry.color} />
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

export default RevenueByProductLineChart;
