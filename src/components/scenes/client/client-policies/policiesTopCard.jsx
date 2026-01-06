"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRightIcon,
  PoliciesIcon,
  FileIcon,
  HandCoinsIcon,
  WarnIcon,
} from "@/components/shared/svgs";

const ClientStatsCard = ({ stat }) => {
  const [hover, setHover] = useState(false);

  return (
    <Link
      href={stat.href}
      className="group w-full rounded-2xl p-5 transition-all duration-300 ease-in-out hover:shadow-md"
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

const policiesStats = [
  {
    id: "active-policies",
    title: "Active Policies",
    value: "3",
    icon: <PoliciesIcon />,
    iconColor: "#04c8b2",
    bgColor: "#effefb",
    hoverBgColor: "#90FFEA",
    href: "#",
  },
  {
    id: "expiring-soon",
    title: "Expiring Soon",
    value: "1",
    icon: <FileIcon />,
    iconColor: "#D7005D",
    bgColor: "#FFF0F8",
    hoverBgColor: "#FFC9EA",
    href: "#",
  },
  {
    id: "expired",
    title: "Expired",
    value: "2",
    icon: <WarnIcon />,
    iconColor: "#DD7102 ",
    bgColor: "#FFFAEB",
    hoverBgColor: "#FFEAA3",
    href: "#",
  },
];

const PoliciesTopCard = () => {
  return (
    <div className="flex w-full flex-col gap-4 lg:flex-row">
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3 lg:w-1/2">
        {policiesStats.map((stat) => (
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
                <span className="mb-1 text-5xl font-bold text-white">
                  240 $
                </span>
              </div>
              <p className="text-[16px] text-blue-100">Outstanding Premium</p>
            </div>
            <Button className="-mt-15 ml-auto w-23 bg-blue-50 text-sm font-semibold text-blue-700 hover:bg-blue-100 sm:mt-23.5 sm:ml-0 lg:mt-25">
              Pay Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliciesTopCard;
