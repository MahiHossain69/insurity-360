"use client";

import React, { useState } from "react";
import {
  CommissionIcon,
  HandCoinsIcon,
  PaymentCheckIcon,
  PaymentClockIcon,
  RightIcon,
} from "@/components/shared/svgs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

const StatsCard = ({ stat, onPayClick }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="group cursor-pointer rounded-lg border-none p-4 transition-all duration-300 ease-in-out hover:shadow-md"
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

        {(stat.id === "next-payment-due" || stat.id === "overdue-payments") && (
          <Button
            size="sm"
            className="bg-neutral-500/8 text-sm font-semibold text-neutral-900 transition-all hover:bg-neutral-500/15"
            onClick={(e) => {
              e.stopPropagation();
              onPayClick(stat);
            }}
          >
            Pay Now
          </Button>
        )}
      </div>

      <div className="mt-6 md:mt-8">
        <p className="text-2xl text-neutral-900 md:text-3xl lg:text-[32px]">
          {stat.value}
        </p>
        <h3 className="text-[16px] text-neutral-700 md:text-base">
          {stat.title}
          {stat.date && (
            <span className="pl-1 text-[16px] text-neutral-500">
              {stat.date}
            </span>
          )}
        </h3>
      </div>
    </div>
  );
};

export default function ClientPaymentCards() {
  const [open, setOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const handlePayClick = (stat) => {
    setSelectedPayment(stat);
    setOpen(true);
  };

  const statsOverview = [
    {
      id: "total-paid",
      title: "Total Paid",
      value: "12,340 $",
      icon: <HandCoinsIcon />,
      iconColor: "#3787EF",
      bgColor: "#F0F7FE",
      hoverBgColor: "#C1DEFC",
    },
    {
      id: "next-payment-due",
      title: "Next Payment Due:",
      date: "25 May 2025",
      value: "340.00 $",
      icon: <PaymentClockIcon />,
      iconColor: "#8D37EF",
      bgColor: "#F9F5FF",
      hoverBgColor: "#E7D4FF",
    },
    {
      id: "overdue-payments",
      title: "Overdue Payments",
      value: "580.00 $",
      icon: <PaymentCheckIcon />,
      iconColor: "#04C8B2",
      bgColor: "#EFFEFB",
      hoverBgColor: "#90FFEA",
    },
    {
      id: "active-policies",
      title: "Active Policies",
      value: "3",
      icon: <CommissionIcon />,
      iconColor: "#64748B",
      bgColor: "#F8FAFC",
      hoverBgColor: "#E2E8F0",
    },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statsOverview.map((stat) => (
          <StatsCard key={stat.id} stat={stat} onPayClick={handlePayClick} />
        ))}
      </div>

      <Dialog  open={open} onOpenChange={setOpen}>
        <DialogContent className="scrollbarHidden max-h-[90vh] w-full max-w-150 overflow-y-auto rounded-2xl border border-neutral-300 bg-white p-4 shadow-lg !pb-0 sm:p-6 md:p-8">
          <DialogHeader>
            <DialogTitle className="font-urbanist text-center text-2xl font-bold text-neutral-900">
              Payment Summary
            </DialogTitle>
            <DialogDescription className="font-urbanist -mt-2 text-center text-sm font-medium text-neutral-500">
              Before proceeding to payment, please confirm the following
              details.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-5 grid grid-cols-3 gap-15 text-sm text-neutral-700 sm:gap-4">
            <div className="space-y-2">
              <h1 className="font-urbanist w-100 font-medium text-neutral-500">
                Policy Name
              </h1>
              <h1 className="font-urbanist w-100 font-medium text-neutral-500">
                Policy Number
              </h1>
              <h1 className="font-urbanist w-100 font-medium text-neutral-500">
                Coverage Type
              </h1>
              <h1 className="font-urbanist w-100 font-medium text-neutral-500">
                Billing Period
              </h1>
              <h1 className="font-urbanist w-100 font-medium text-neutral-500">
                Coverage Period
              </h1>
            </div>
            <div className="space-y-2">
              <p className="font-urbanist w-100 font-medium text-neutral-800">
                Homeowners Insurance
              </p>
              <p className="font-urbanist font-medium text-neutral-800">
                P-1029
              </p>
              <p className="font-urbanist w-100 font-medium text-neutral-800">
                Individual Health Insurance
              </p>
              <p className="font-urbanist font-medium text-neutral-800">
                Monthly
              </p>
              <p className="font-urbanist flex w-100 items-center font-medium text-neutral-800">
                2024-03-15 <RightIcon className="h-5 w-5" /> 2044-03-15
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-lg bg-blue-50 p-4 text-center">
            <p className="font-urbanist text-[32px] font-medium text-blue-700">
              {selectedPayment?.value || "$0.00"}
            </p>
            <div className="mt-2 flex flex-row justify-center gap-8 text-sm text-neutral-600">
              <div className="flex flex-col items-end">
                <p className="font-urbanist text-sm font-medium text-neutral-500">
                  Due Date
                </p>
                <p className="font-urbanist text-sm font-medium text-neutral-500">
                  {selectedPayment?.date || "22 May 2025"}
                </p>
              </div>
              <div className="flex flex-col items-start">
                <p className="font-urbanist text-sm font-medium text-neutral-500">
                  Payment Method
                </p>
                <p className="font-urbanist text-sm font-medium text-neutral-500">
                  Stripe
                </p>
              </div>
            </div>
          </div>

          <div className="relative left-[-2rem] w-[calc(100%+4rem)] rounded-b-2xl border-t border-neutral-500/4 bg-neutral-50 px-6 py-4 sm:left-[-2rem]">
            <DialogFooter className="flex justify-end gap-2">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="border-neutral-300 hover:bg-white font-semibold text-neutral-900 bg-neutral-50"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button className="bg-blue-500 font-semibold text-white hover:bg-blue-700">
                Proceed to Payment
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
