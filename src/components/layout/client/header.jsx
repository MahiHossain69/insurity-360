import IconButton from "@/components/ui/IconButton";
import MessageDropdown from "@/components/ui/MessageDropdown";
import NotificationDropdown from "@/components/ui/NotificationDropdown";
import SearchModal, { SearchButton } from "@/components/ui/SearchModal";
import UserDropdown from "@/components/ui/UserDropdown";
import WidgetsModal from "@/components/ui/WidgetsModal";
import ProfileDropdown from "@/components/ui/ProfileDropdown";
import {
  markAllNotificationsAsRead,
  markNotificationAsRead,
  mockNotifications,
} from "@/data/notifications";
import { dashboardWidgets } from "@/data/widgets";
import { Menu, Plus, Settings } from "lucide-react";
import Link from "next/link";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const HeaderSection = ({ toggleSidebar, isMobile }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWidgetsOpen, setIsWidgetsOpen] = useState(false);
  const [widgets, setWidgets] = useState(dashboardWidgets);
  const [notifications, setNotifications] = useState(mockNotifications);

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
            <IconButton ariaLabel="Add new">
              <Plus className="size-5" />
            </IconButton>
            <Link
              href="/client/settings"
              className="inline-flex items-center justify-center"
            >
              <IconButton ariaLabel="Settings">
                <Settings className="size-5" />
              </IconButton>
            </Link>

            {/* Divider */}
            <div className="mx-2 h-6 w-px bg-gray-200"></div>

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
