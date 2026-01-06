"use client";

import IconButton from "@/components/ui/IconButton";
import MessageDropdown from "@/components/ui/MessageDropdown";
import NotificationDropdown from "@/components/ui/NotificationDropdown";
import ProfileDropdown from "@/components/ui/ProfileDropdown";
import SearchModal, { SearchButton } from "@/components/ui/SearchModal";
import UserDropdown from "@/components/ui/UserDropdown";
import WidgetsModal from "@/components/ui/WidgetsModal";
import {
  markAllNotificationsAsRead,
  markNotificationAsRead,
  mockNotifications,
} from "@/data/notifications";
import { dashboardWidgets } from "@/data/widgets";
import { cn } from "@/lib/utils";
import {
  Briefcase,
  Clipboard,
  CreditCard,
  File,
  FileText,
  LayoutGrid,
  Menu,
  Minus,
  Plus,
  Settings,
  User,
} from "lucide-react";
import Link from "next/link";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

const quickAddOptions = [
  {
    id: "policy",
    label: "Policy",
    icon: FileText,
    href: "/policies/add-new-opportunity",
  },
  {
    id: "client",
    label: "Client",
    icon: Briefcase,
    href: "/clients/add-new-client",
  },
  {
    id: "payment",
    label: "Payment",
    icon: CreditCard,
    href: "/payments/records/addNewRecords",
  },
  {
    id: "invoice",
    label: "Invoice",
    icon: File,
    href: "/payments/invoices/addNewInvoices",
  },
  {
    id: "member",
    label: "Member",
    icon: User,
    href: "/user-management/team/addNewMember",
  },
];

const HeaderSection = ({ toggleSidebar, isMobile }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWidgetsOpen, setIsWidgetsOpen] = useState(false);
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [pinnedItems, setPinnedItems] = useState([]);
  const quickAddRef = useRef(null);
  const [widgets, setWidgets] = useState(dashboardWidgets);
  const [notifications, setNotifications] = useState(mockNotifications);

  // Handle click outside for Quick Add dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (quickAddRef.current && !quickAddRef.current.contains(event.target)) {
        setIsQuickAddOpen(false);
      }
    };

    if (isQuickAddOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isQuickAddOpen]);

  // Handle global keyboard shortcuts for search
  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSearchOpen = () => setIsSearchOpen(true);
  const handleSearchClose = () => setIsSearchOpen(false);

  const togglePin = (itemId) => {
    setPinnedItems((prev) => {
      if (prev.includes(itemId)) {
        return prev.filter((id) => id !== itemId);
      } else {
        return [...prev, itemId];
      }
    });
  };

  const handleWidgetsOpen = () => setIsWidgetsOpen(true);
  const handleWidgetsClose = () => setIsWidgetsOpen(false);

  const handleWidgetToggle = (widgetId) => {
    setWidgets((prevWidgets) =>
      prevWidgets.map((widget) =>
        widget.id === widgetId
          ? { ...widget, enabled: !widget.enabled }
          : widget,
      ),
    );
  };

  const handleMarkAsRead = (notificationId) => {
    setNotifications((prevNotifications) =>
      markNotificationAsRead(prevNotifications, notificationId),
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prevNotifications) =>
      markAllNotificationsAsRead(prevNotifications),
    );
  };

  return (
    <>
      <div className="font-manrope border-b border-gray-200/60 bg-white/95 px-4 backdrop-blur-sm">
        <div className="flex h-[60px] items-center justify-between">
          {/* Left Section - Logo and Search */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            {isMobile && (
              <button
                onClick={toggleSidebar}
                className="cursor-pointer rounded-xl bg-gray-50/80 p-2 text-gray-500 transition-all duration-200 hover:bg-gray-100 hover:text-gray-700 focus:outline-none xl:hidden"
                aria-label="Toggle sidebar"
              >
                <Menu className="h-5 w-5" />
              </button>
            )}

            <div className="hidden md:block">
              <SearchButton onClick={handleSearchOpen} />
            </div>
          </div>

          {/* Right Section - Icon Group */}
          <div className="hidden items-center gap-2 lg:flex">
            {/* Action Icons */}
            <div
              className="relative mr-1 inline-flex items-center justify-center"
              ref={quickAddRef}
            >
              <IconButton
                ariaLabel="Add new"
                onClick={() => setIsQuickAddOpen(!isQuickAddOpen)}
                className={isQuickAddOpen ? "bg-neutral-100" : ""}
              >
                <Plus className="size-5" />
              </IconButton>

              {/* Quick Add Dropdown */}
              {isQuickAddOpen && (
                <div className="animate-in fade-in zoom-in-95 absolute top-full left-0 z-50 mt-2 w-56 rounded-xl border border-gray-100 bg-white p-2 shadow-lg duration-200">
                  <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
                    Quick Add
                  </div>
                  <div className="space-y-1">
                    {quickAddOptions.map((item) => {
                      const isPinned = pinnedItems.includes(item.id);
                      return (
                        <button
                          key={item.id}
                          onClick={() => togglePin(item.id)}
                          className={cn(
                            "group hover:bg-primary flex h-9 w-full items-center gap-3 overflow-hidden rounded bg-neutral-100 text-sm font-medium text-gray-700 transition-colors hover:text-white",
                            isPinned ? "hover:bg-red-500" : "",
                          )}
                        >
                          <div className="relative flex h-full w-8 items-center justify-center">
                            <item.icon className="absolute size-4 opacity-100 transition-opacity group-hover:opacity-0" />
                            <div
                              className={cn(
                                "group-hover:bg-primary-dark absolute inset-0 flex h-full items-center justify-center opacity-0 transition-opacity group-hover:opacity-100",
                                isPinned ? "group-hover:bg-red-600" : "",
                              )}
                            >
                              {isPinned ? (
                                <Minus className="size-4" />
                              ) : (
                                <Plus className="size-4" />
                              )}
                            </div>
                          </div>
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* quick add links */}
            {pinnedItems.map((id) => {
              const item = quickAddOptions.find((opt) => opt.id === id);
              if (!item) return null;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className="inline-flex items-center justify-center"
                >
                  <IconButton ariaLabel={item.label}>
                    <item.icon className="size-5" />
                  </IconButton>
                </Link>
              );
            })}

            <IconButton ariaLabel="Widgets" onClick={handleWidgetsOpen}>
              <LayoutGrid className="size-4 rotate-45 text-neutral-900" />
            </IconButton>
            {/* Divider */}
            <div className="mx-2 h-6 w-px bg-gray-200"></div>

            <Link
              href="/settings"
              className="inline-flex items-center justify-center"
            >
              <IconButton ariaLabel="Settings">
                <Settings className="size-5" />
              </IconButton>
            </Link>
            {/* Divider */}
            <div className="mx-2 h-6 w-px bg-gray-200"></div>
            <Link
              href="/task-calendar"
              className="inline-flex items-center justify-center"
            >
              <IconButton ariaLabel="clipboard">
                <Clipboard className="size-5" />
              </IconButton>
            </Link>
            <NotificationDropdown
              notifications={notifications}
              onMarkAsRead={handleMarkAsRead}
              onMarkAllAsRead={handleMarkAllAsRead}
            />

            <MessageDropdown />
            {/* Divider */}
            <div className="mx-2 h-6 w-px bg-gray-200"></div>

            {/* Profile Dropdown */}

            <ProfileDropdown />

            {/* Divider */}
            <div className="mx-2 h-6 w-px bg-gray-200"></div>

            {/* User Dropdown */}
            <UserDropdown />
          </div>
          <div className="block lg:hidden">
            <UserDropdown />
          </div>
        </div>
      </div>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={handleSearchClose} />

      <WidgetsModal
        isOpen={isWidgetsOpen}
        onClose={handleWidgetsClose}
        widgets={widgets}
        onWidgetToggle={handleWidgetToggle}
      />
    </>
  );
};

HeaderSection.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

export default HeaderSection;
