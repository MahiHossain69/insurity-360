"use client";

import {
  DashboardLeftSideIcon,
  DashboardRightSideIcon,
} from "@/components/shared/svgs";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const DashboardImage = () => {
  return (
    <div className="space-y-3">
      <section className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-geist text-2xl font-semibold text-neutral-900">
            Hello! Jiad
          </h1>
          <p className="text-sm text-neutral-500">
            Here's everything you need to know about your insurance today.
          </p>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            className="flex h-9 w-9 items-center justify-center rounded-md bg-neutral-500/10 p-0 hover:bg-neutral-500/20"
          >
            <DashboardLeftSideIcon />
          </Button>
          <Button
            variant="ghost"
            className="flex h-9 w-9 items-center justify-center rounded-md bg-neutral-500/10 p-0 hover:bg-neutral-500/20"
          >
            <DashboardRightSideIcon />
          </Button>
        </div>
      </section>

      <section className="flex flex-col gap-4 sm:flex-row">
        <div className="w-full">
          <Image
            src="/[client]/dashboard/dashboardimg1.png"
            width={792}
            height={456}
            alt="Dashboard Image 1"
            className="h-auto w-full rounded-xl object-cover"
            priority
          />
        </div>
        <div className="w-full">
          <Image
            src="/[client]/dashboard/dashboardimg2.png"
            width={792}
            height={456}
            alt="Dashboard Image 2"
            className="h-auto w-full rounded-xl object-cover"
            priority
          />
        </div>
      </section>
    </div>
  );
};

export default DashboardImage;
