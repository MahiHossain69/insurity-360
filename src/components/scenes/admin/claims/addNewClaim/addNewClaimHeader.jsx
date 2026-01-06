import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

const AddNewClaimHeader = () => {
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
                      Policies
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
               <BreadcrumbSeparator className="text-neutral-500" />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link
                      href="/policies/claims"
                      className="font-urbanist text-sm font-normal text-neutral-500"
                    >
                      Claims
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-neutral-500" />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link
                      href="/policies/claims/addnewclaim"
                      className="font-urbanist text-sm font-normal text-neutral-900"
                    >
                      Add New Claim
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className="font-urbanist text-xl font-medium text-neutral-900 sm:text-2xl">
             Add New Claim
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewClaimHeader;
