"use client"

import React, { useState } from "react"
import {
  AddNewPlusIcon,
  PoliciesSummaryRightIcon,
} from "@/components/shared/svgs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { GoDotFill } from "react-icons/go"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import PolicyDetailsPage from "./policyDetailsPage"

const policyData = [
  {
    id: "POL-2024-101",
    title: "Health Essentials",
    category: "Health",
    plan: "Silver Plan",
    period: ["2024-03-15", "2044-03-15"],
    premium: "Monthly",
    nextPayment: "15 Jun 2025",
    status: { label: "Active", color: "bg-teal-100 text-teal-700 dot: text-teal-500" },
  },
  {
    id: "POL-2024-102",
    title: "Term Life Cover",
    category: "Life",
    plan: "Platinum Plan",
    period: ["2024-03-15", "2044-03-15"],
    premium: "Monthly",
    nextPayment: "15 Jun 2025",
    status: { label: "Active", color: "bg-teal-100 text-teal-700 dot: text-teal-500" },
  },
  {
    id: "POL-2024-102",
    title: "Term Life Cover",
    category: "Life",
    plan: "Platinum Plan",
    period: ["2024-03-15", "2044-03-15"],
    premium: "Monthly",
    nextPayment: "15 Jun 2025",
    status: { label: "Active", color: "bg-teal-100 text-teal-700 dot: text-teal-500" },
  },
  {
    id: "POL-2024-103",
    title: "Health Essentials",
    category: "Health",
    plan: "Silver Plan",
    period: ["2024-03-15", "2044-03-15"],
    premium: "Monthly",
    nextPayment: "15 Jun 2025",
    status: { label: "Expiring Soon", color: "bg-purple-100 text-purple-600 dot: text-purple-600" },
  },
  {
    id: "POL-2024-104",
    title: "Term Life Cover",
    category: "Life",
    plan: "Platinum Plan",
    period: ["2024-03-15", "2044-03-15"],
    premium: "Monthly",
    nextPayment: "15 Jun 2025",
    status: { label: "Expired", color: "bg-yellow-100 text-yellow-600 dot: text-yellow-300" },
  },
  {
    id: "POL-2024-104",
    title: "Term Life Cover",
    category: "Life",
    plan: "Platinum Plan",
    period: ["2024-03-15", "2044-03-15"],
    premium: "Monthly",
    nextPayment: "15 Jun 2025",
    status: { label: "Expired", color: "bg-yellow-100 text-yellow-600 dot: text-yellow-300" },
  },
]

const PoliciesDownCard = () => {
  const [open, setOpen] = useState(false)

  return (
    <div>
     
      <div className="mt-6 mb-2 flex items-center justify-between 2xl:mt-1">
        <h1 className="font-geist text-sm font-semibold text-neutral-900">
          My Policies
        </h1>
        <Link href="/">
          <Button variant="ghost" className="font-geist text-sm text-neutral-900">
            <AddNewPlusIcon className="h-5 w-5" />
            Add New Policy
          </Button>
        </Link>
      </div>

   
      <div className="mb-6 grid grid-cols-1 gap-2 md:grid-cols-2 2xl:grid-cols-3">
        {policyData.map((policy, index) => (
          <Sheet  key={index} open={open === policy.id} onOpenChange={(isOpen) => setOpen(isOpen ? policy.id : false)}>
            <SheetTrigger   asChild>
             
              <Card
                onClick={() => setOpen(policy.id)}
                className="cursor-pointer border border-neutral-200 bg-neutral-50 p-4 duration-500 ease-in-out hover:border-blue-500 hover:bg-[radial-gradient(100%_167.13%_at_0%_0%,_#FFFFFF_30%,_#DCECFD_70%,_#FFFFFF_100%)]"
              >
                <div className="space-y-3">
                 
                  <div>
                    <p className="font-urbanist mb-1 text-sm text-neutral-900">
                      {policy.id}
                    </p>
                    <h2 className="font-urbanist text-xl font-semibold text-neutral-900">
                      {policy.title}
                    </h2>
                  </div>

                 
                  <div className="flex flex-wrap items-center gap-1">
                    <Badge className="inline-flex items-center gap-1.5 rounded-full bg-neutral-500/8 px-2.5 py-1 text-xs text-neutral-900">
                      {policy.category}
                    </Badge>
                    <Badge
                      className={`flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium ${policy.status.color.split(" dot:")[0]}`}
                    >
                      <GoDotFill className={`w-2 h-2 ${policy.status.color.split(" dot:")[1]}`} />
                      {policy.status.label}
                    </Badge>
                  </div>

                 
                  <div className="space-y-1">
                    <div className="flex items-center gap-14.5">
                      <p className="font-urbanist mb-1 text-sm font-medium text-neutral-500">
                        Product Plan
                      </p>
                      <p className="font-urbanist text-sm font-medium text-neutral-900">
                        {policy.plan}
                      </p>
                    </div>

                    <div className="flex items-center gap-8">
                      <p className="font-urbanist mb-1 text-sm font-medium text-neutral-500">
                        Coverage Period
                      </p>
                      <div className="font-urbanist flex items-center gap-1 text-sm font-medium text-neutral-900">
                        <span>{policy.period[0]}</span>
                        <PoliciesSummaryRightIcon className="h-4 w-4 text-neutral-500" />
                        <span>{policy.period[1]}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-13">
                      <p className="font-urbanist mb-1 text-sm font-medium text-neutral-500">
                        Premium Info
                      </p>
                      <p className="font-urbanist text-sm font-medium text-neutral-900">
                        {policy.premium}
                      </p>
                    </div>

                    <div className="flex items-center gap-5">
                      <p className="font-urbanist mb-1 text-sm font-medium text-neutral-500">
                        Next Payment Due
                      </p>
                      <p className="font-urbanist text-sm font-medium text-neutral-900">
                        {policy.nextPayment}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </SheetTrigger>

           
            <SheetContent
              side="right"
              className="w-full border-none sm:max-w-[960px] overflow-y-auto p-0"
            >
              <SheetHeader className="hidden">
                <SheetTitle></SheetTitle>
              </SheetHeader>
              <PolicyDetailsPage />
            </SheetContent>
          </Sheet>
        ))}
      </div>
    </div>
  )
}

export default PoliciesDownCard
