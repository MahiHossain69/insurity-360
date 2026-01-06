import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import Link from 'next/link'
import React from 'react'

const SettingsHeader = () => {
  return (
     <div className="w-full bg-white ">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          
          <div className="flex flex-col gap-1">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link
                      href="/"
                      className="text-neutral-500 font-urbanist font-normal text-sm"
                    >
                      Home
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-neutral-500" />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link
                      href="/settings"
                      className="text-neutral-900 font-urbanist font-normal text-sm"
                    >
                      Settings
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-xl sm:text-2xl font-medium font-urbanist text-neutral-900">
              Settings
            </h1>
          </div>

         
         
        </div>
      </div>
  )
}

export default SettingsHeader
