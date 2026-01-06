import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

const CompanyProfileHeader = () => {
  return (
    <div>
      <div className="w-full bg-white pb-4">
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
                      href="/settings"
                      className="font-urbanist text-sm font-normal text-neutral-500"
                    >
                      Settings
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              
               
                <BreadcrumbSeparator className="text-neutral-500" />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link
                      href="/settings/company-profile"
                      className="font-urbanist text-sm font-normal text-neutral-900"
                    >
                     Company Profile
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className="font-urbanist text-xl font-medium text-neutral-900 sm:text-2xl">
             Company Profile
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfileHeader;
