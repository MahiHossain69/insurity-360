
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const allActivityHeader = () => {
  return (
    <div>
         <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
         
          <div className="flex flex-col gap-1">
            
            <Breadcrumb>
              
              <BreadcrumbList>
                
                <BreadcrumbItem>
                  
                  <BreadcrumbLink asChild>
                    
                    <Link
                      href="/"
                      className="font-urbanist text-sm font-normal text-neutral-500"
                    >
                     Home
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-neutral-500" />
                <BreadcrumbItem>
                  
                  <BreadcrumbLink asChild>
                    
                    <Link
                      href="/activityLog"
                      className="font-urbanist text-sm font-normal text-neutral-900"
                    >
                      All Activities
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className="font-urbanist text-xl font-medium text-neutral-900 sm:text-2xl">
             All Activities
            </h1>
          </div>
          
         
       
        </div>
      
    </div>
  )
}

export default allActivityHeader
