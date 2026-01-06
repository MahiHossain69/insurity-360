"use client";

import {
  ArrowUpRightIcon,
  PoliciesIcon,
  FileIcon,
  HandCoinsIcon,
} from "@/components/shared/svgs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

const ClientStatsCard = ({ stat }) => {
  const [hover, setHover] = useState(false);

  return (
    <Link
      href={stat.href}
      className="group w-full rounded-2xl p-5  transition-all duration-300 ease-in-out hover:shadow-md"
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

export const clientStatsOverview = [
  {
    id: "total-active-policies",
    title: "Total Active Policies",
    value: "3",
    icon: <PoliciesIcon />,
    iconColor: "#04c8b2",
    bgColor: "#effefb",
    hoverBgColor: "#90FFEA",
    href: "#",
  },
  {
    id: "overdue-payments",
    title: "Claims Filed",
    value: "5",
    icon: <FileIcon />,
    iconColor: "#D7005D",
    bgColor: "#FFF0F8",
    hoverBgColor: "#FFC9EA",
    href: "#",
  },
];

export default function DashboardCard() {
  return (
    <div className="flex w-full flex-col gap-4 lg:flex-row">
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:w-1/2">
        {clientStatsOverview.map((stat) => (
          <ClientStatsCard key={stat.id} stat={stat} />
        ))}
      </div>

      <div className="w-full lg:w-1/2">
        <div className="h-45 rounded-2xl bg-[radial-gradient(100%_100%_at_100%_100%,_#3787EF_30%,_#235BD2_70%,_#3787EF_100%)] px-4 py-7 shadow-md">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex flex-col items-start">
                <div className="-mt-2 mb-8 h-10 w-10 rounded-sm bg-blue-700 p-2">
                  <HandCoinsIcon className="text-white" />
                </div>
                <span className="font-gest mb-1 text-5xl font-bold text-white">
                  240 $
                </span>
              </div>
              <p className="font-urbanist text-[16px] text-blue-100">
                Due on 22 May 2025
              </p>
            </div>
            <Button className="mt-25 w-23 hover:bg-blue-50 bg-blue-50 text-sm font-semibold text-blue-700">
              Pay Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
