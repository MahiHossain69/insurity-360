import {
  CaretDownFilled,
  CaretUpFilled,
  GradientGraphIcon,
} from "@/components/shared/svgs";
import React from "react";

const KpiCard = ({ item }) => {
  return (
    <div
      className={`flex items-end justify-between gap-2 rounded-md p-4`}
      style={{ backgroundColor: item.bgColor }}
    >
      <div className="flex h-full flex-col justify-between gap-8">
        <div
          className="flex aspect-square w-10 items-center justify-center rounded-sm bg-white"
          style={{ color: item.iconColor }}
        >
          {item.icon}
        </div>

        <div className="flex flex-col gap-3 md:gap-4">
          <p className="text-2xl leading-none text-neutral-900 md:text-3xl lg:text-[32px]">
            {item.value}
            {item.subValue && (
              <span className="text-sm leading-snug text-neutral-500">
                {item.subValue}
              </span>
            )}
          </p>
          <p className="text-sm leading-none text-neutral-900 md:text-base">
            {item.title}
          </p>

          <div className="text-xs leading-snug text-neutral-900">
            {item.incrementType && item.incrementType !== "increase" ? (
              <span className="inline-flex translate-y-1 items-center space-x-0.5 text-red-700">
                <CaretUpFilled />
                <span>{item.percentage}%</span>
              </span>
            ) : null}
            {item.incrementType && item.incrementType === "increase" ? (
              <span className="inline-flex translate-y-1 items-center space-x-0.5 text-teal-700">
                <CaretDownFilled />
                <span>{item.percentage}%</span>
              </span>
            ) : null}
            <span
              className={`${item.incrementType ? "ml-1" : ""} text-neutral-900`}
            >
              {item.timeframe}
            </span>
          </div>
        </div>
      </div>
      <GradientGraphIcon
        stroke={item.iconColor}
        stopColor={item.graphColor}
        className="w-full max-w-[176px]"
      />
    </div>
  );
};

export default KpiCard;
