import { DownArrow } from "@/components/shared/svgs";
import { navigation } from "@/data/navigation-sidebar";
import { useAuth } from "@/hooks/use-auth";
import { useSidebar } from "@/hooks/use-sidebar";
import { ChevronRight, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const SidebarSection = ({ isOpen, closeSidebar }) => {
  const { isSuperAdmin } = useAuth();
  const {
    isItemActive,
    isParentActive,
    shouldDropdownBeOpen,
    handleItemClick,
  } = useSidebar();

  // Filter navigation items based on user role
  const filteredNavigation = navigation.filter((item) => {
    if (item.isSuperAdmin) {
      return isSuperAdmin;
    }
    return true;
  });

  return (
    <>
      <div
        className={`bg-opacity-75 fixed inset-0 z-20 bg-gray-600 transition-opacity duration-300 xl:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeSidebar}
        aria-hidden="true"
      />

      <div
        className={`bg-background bg_radial_sidebar fixed inset-y-0 left-0 z-30 h-full w-full transform border-r border-gray-200 transition-transform duration-300 ease-in-out xl:static xl:inset-0 xl:w-68 xl:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="font-manrope flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-gray-200 p-4">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/icons/logo.svg" alt="logo" width={23} height={24} />
              <span className="text-dark-heading text-xl font-semibold">
                Insurity360
              </span>
            </Link>
            <button
              onClick={closeSidebar}
              className="rounded-md p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-500 xl:hidden"
              aria-label="Close sidebar"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex-1 space-y-0.5 overflow-y-auto px-2 py-4">
            <h2 className="text-foreground mb-2 text-xs uppercase">
              Main Menu
            </h2>
            {filteredNavigation.map((item) => (
              <div key={item.name} className="space-y-1">
                {item.hasDropdown ? (
                  <button
                    onClick={() =>
                      handleItemClick(item.name, true, closeSidebar)
                    }
                    className={`group flex w-full cursor-pointer items-center gap-2 rounded-lg p-1 text-base font-medium transition-all duration-200 hover:bg-white ${
                      isParentActive(item) ? "" : "text-dark-heading"
                    }`}
                  >
                    <item.icon
                      className={`h-8 w-8 rounded p-1.5 transition-colors ${
                        shouldDropdownBeOpen(item)
                          ? "text-primary"
                          : "text-foreground"
                      }`}
                    />
                    <span className="flex items-center gap-3">
                      <span className="flex-1 text-left">{item.name}</span>
                      <DownArrow
                        className={`transition-transform duration-200 ${
                          shouldDropdownBeOpen(item) ? "rotate-180" : ""
                        }`}
                      />
                    </span>
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() =>
                      handleItemClick(item.name, false, closeSidebar)
                    }
                    className={`group flex w-full items-center gap-2 rounded-lg p-1 text-base font-medium transition-all duration-200 ${
                      isItemActive(item)
                        ? "text-primary-dark cursor-default"
                        : "text-dark-heading hover:bg-white"
                    }`}
                  >
                    <item.icon
                      className={`h-8 w-8 rounded p-1.5 transition-colors ${
                        isItemActive(item)
                          ? "bg-primary text-white"
                          : "text-foreground"
                      }`}
                    />
                    {item.name}
                  </Link>
                )}

                {item.hasDropdown && (
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      shouldDropdownBeOpen(item)
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    {shouldDropdownBeOpen(item) && (
                      <div className="relative ml-6 space-y-1 border-l border-gray-200 pl-4">
                        {item.children?.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            onClick={() =>
                              handleItemClick(child.name, false, closeSidebar)
                            }
                            className={`group relative flex items-center gap-2 p-1 text-sm font-medium transition-all duration-200 before:absolute before:top-0 before:-left-[17px] before:h-full before:w-[2px] before:rounded-full before:content-[''] ${
                              isItemActive(child)
                                ? "text-primary-dark before:bg-primary cursor-default"
                                : "hover:text-dark-heading rounded-md text-gray-600 before:bg-transparent hover:bg-white"
                            }`}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="m-2">
            <Link
              href="/settings/company-profile"
              className="flex justify-between gap-3 rounded-lg bg-white p-3"
            >
              <div className="gap inline-flex items-center gap-3">
                <Image
                  src="/images/users/user.png"
                  alt="user"
                  width={32}
                  height={32}
                />
                <div>
                  <h3 className="text-sm font-bold">Faiz Ahmed Jiad</h3>
                  <p className="text-foreground text-xs">Admin</p>
                </div>
              </div>
              <div>
                <ChevronRight className="text-sm text-[#312E3D]" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarSection;
