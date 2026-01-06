"use client";

import { ArrowUpRightIcon } from "@/components/shared/svgs";
import Link from "next/link";
import { useState } from "react";

const StatsCard = ({ stat }) => {
  const [hover, setHover] = useState(false);

  return (
    <Link
      href={stat.href}
      className="group rounded-md p-4 transition-all duration-300 ease-in-out"
      style={{
        background: hover
          ? `radial-gradient(194.76% 141.42% at 0% 0%, ${stat.bgColor} 30%, ${stat.hoverBgColor} 70%, ${stat.bgColor} 100%)`
          : stat.bgColor,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="flex items-start justify-between">
        <div
          className="flex aspect-square w-10 items-center justify-center rounded-sm transition-all duration-300 ease-in-out"
          style={{
            backgroundColor: hover ? stat.iconColor : "#ffffff",
            color: hover ? "#ffffff" : stat.iconColor,
          }}
        >
          {stat.icon}
        </div>
        <ArrowUpRightIcon
          className={`transition-opacity duration-300 ease-in-out ${hover ? "opacity-100" : "opacity-0"}`}
          style={{
            color: stat.iconColor,
          }}
        />
      </div>

      <div className="mt-6 md:mt-8">
        <p className="text-2xl text-neutral-900 md:text-3xl lg:text-[32px]">
          {stat.value}
        </p>
        <h3 className="text-sm text-neutral-900 md:text-base">{stat.title}</h3>
      </div>
    </Link>
  );
};

export default StatsCard;
