import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

const addNewClientHeader = () => {
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
                      href="/clients"
                      className="font-urbanist text-sm font-normal text-neutral-500"
                    >
                      Clients
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-neutral-500" />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link
                      href="/clients/addnewclients"
                      className="font-urbanist text-sm font-normal text-neutral-900"
                    >
                      Add New Client
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className="font-urbanist text-xl font-medium text-neutral-900 sm:text-2xl">
              Add New Client
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default addNewClientHeader;
