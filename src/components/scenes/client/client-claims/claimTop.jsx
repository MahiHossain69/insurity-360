"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRightIcon,
  ClaimCheckIcon,
  ClaimClockIcon,
  ClaimCloseIcon,
  ClaimCoinIcon,
  ClaimFolderIcon,
} from "@/components/shared/svgs";

const StatsCard = ({ stat }) => {
  const [hover, setHover] = useState(false);

  return (
    <Link
      href={stat.href}
      className="group rounded-lg border-none p-4 shadow-sm transition-all duration-300 ease-in-out hover:shadow-md"
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
          className="flex aspect-square w-10 items-center justify-center rounded-md transition-all duration-300 ease-in-out"
          style={{
            backgroundColor: hover ? stat.iconColor : "#ffffff",
            color: hover ? "#ffffff" : stat.iconColor,
          }}
        >
          {stat.icon}
        </div>

        <ArrowUpRightIcon
          className={`transition-opacity duration-300 ease-in-out ${
            hover ? "opacity-100" : "opacity-0"
          }`}
          style={{
            color: stat.iconColor,
          }}
        />
      </div>

      <div className="mt-6 md:mt-8">
        <p className="text-2xl  text-neutral-900 md:text-3xl lg:text-[32px]">
          {stat.value}
        </p>
        <h3 className="text-[16px] text-neutral-900 md:text-base">{stat.title}</h3>
      </div>
    </Link>
  );
};

export default function ClaimTop() {
  const statsOverview = [
    {
      id: "total-filed",
      title: "Total Filed",
      value: "5",
      icon: <ClaimFolderIcon />,
      iconColor: "#04c8b2",
      bgColor: "#F0F7FE",
      hoverBgColor: "#90FFEA",
      href: "#",
    },
    {
      id: "under-review",
      title: "Under Review",
      value: "2",
      icon: <ClaimClockIcon />,
      iconColor: "#8D37EF",
      bgColor: "#F9F5FF",
      hoverBgColor: "#E7D4FF",
      href: "#",
    },
    {
      id: "approved",
      title: "Approved",
      value: "2",
      icon: <ClaimCheckIcon />,
      iconColor: "#04C8B2",
      bgColor: "#EFFEFB",
      hoverBgColor: "#90FFEA",
      href: "#",
    },
    {
      id: "denied",
      title: "Denied",
      value: "0",
      icon: <ClaimCloseIcon />,
      iconColor: "#D7005D",
      bgColor: "#FFF0F8",
      hoverBgColor: "#FFC9EA",
      href: "#",
    },
    {
      id: "paid",
      title: "Paid (Closed)",
      value: "1",
      icon: <ClaimCoinIcon />,
      iconColor: "#64748B",
      bgColor: "#F8FAFC",
      hoverBgColor: "#E2E8F0",
      href: "#",
    },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {statsOverview.map((stat) => (
          <StatsCard key={stat.id} stat={stat} />
        ))}
      </div>
    </div>
  );
}
