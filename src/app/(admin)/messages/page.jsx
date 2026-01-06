import MessagingInterface from "@/components/scenes/admin/messages/MessagingInterface";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

const MessagesPage = () => {
  return (
    <div>
      {/* Page header */}
      <div className="border-b border-neutral-200 p-4">
        {/* Breadcrumb + Title */}
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
                    href="/messages"
                    className="font-urbanist text-sm font-normal text-neutral-900"
                  >
                    Messages
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="font-urbanist text-xl font-medium text-neutral-900 sm:text-2xl">
            Messages
          </h1>
        </div>
      </div>
      {/* Page header */}

      {/* Messaging Interface */}
      <MessagingInterface />
    </div>
  );
};

export default MessagesPage;
