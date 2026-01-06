
"use client";

import React from "react";
import Link from "next/link";


import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";




export default function AddNewRoleHeader({
  
}) {
  return (
    <div >
      <div className="w-full bg-white pb-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
       
          <div className="flex flex-col gap-1">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/user-management/roles" className="text-neutral-500 font-urbanist font-normal text-sm">
                      Roles & Permissions
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-neutral-500" />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/user-management/roles/addNewRole" className="text-neutral-900 font-urbanist font-normal text-sm">
                      Add New Role
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-xl sm:text-2xl font-medium font-urbanist text-neutral-900">Add New Role</h1>
          </div>

         
        </div>
      </div>

     
    </div>
  );
}
