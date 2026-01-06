import { cn } from "@/lib/utils";
import { Bell } from "lucide-react";
import Link from "next/link";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

const NotificationDropdown = ({
  notifications = [],
  onMarkAsRead,
  onMarkAllAsRead,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleNotificationClick = (notificationId) => {
    if (onMarkAsRead) {
      onMarkAsRead(notificationId);
    }
  };

  const handleMarkAllAsRead = () => {
    if (onMarkAllAsRead) {
      onMarkAllAsRead();
    }
  };

  // Get latest 4 notifications
  const latestNotifications = notifications.slice(0, 4);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const formatTimeAgo = (timestamp) => {
    const notificationTime = new Date(timestamp);

    // Format time as "10:15 AM"
    const timeString = notificationTime.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    // Format date as "10 Jan 2025"
    const dateString = notificationTime.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    return `${timeString}, ${dateString}`;
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "policy":
        return "📋";
      case "renewal":
        return "🔄";
      case "payment":
        return "💳";
      case "system":
        return "⚙️";
      default:
        return "📢";
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Notification Button */}
      <button
        onClick={toggleDropdown}
        className="relative cursor-pointer rounded-xl p-2.5 text-neutral-900 transition-all duration-200 focus:outline-none"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-3 flex h-2 w-2 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white" />
        )}
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 z-50 mt-3 w-96 rounded-lg border border-[#64748B14] bg-white shadow-xl">
          <div>
            {/* Notifications List */}
            <div className="scrollbar-hide max-h-80 space-y-0 overflow-y-auto">
              {latestNotifications.length > 0 ? (
                latestNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      "group relative cursor-pointer p-4 transition-all duration-200",
                      notification.isRead ? "bg-[#64748B14]" : "bg-white",
                    )}
                    onClick={() => handleNotificationClick(notification.id)}
                  >
                    <div
                      className={cn("flex items-start", {
                        "gap-3": !notification.isRead,
                      })}
                    >
                      {/* Red dot indicator for unread */}
                      <div className="flex-shrink-0 pt-1">
                        {!notification.isRead && (
                          <div className="h-2 w-2 rounded-full bg-red-500"></div>
                        )}
                        {notification.isRead && <div className="h-2 w-2"></div>}
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between">
                          <h4
                            className={`line-clamp-1 text-sm font-semibold ${
                              notification.isRead
                                ? "text-neutral-600"
                                : "text-neutral-900"
                            }`}
                          >
                            {notification.title}
                          </h4>
                          <span className="ml-2 flex-shrink-0 text-xs text-neutral-400">
                            {formatTimeAgo(notification.timestamp)}
                          </span>
                        </div>
                        <p
                          className={`mt-1 text-sm leading-relaxed ${
                            notification.isRead
                              ? "text-neutral-500"
                              : "text-neutral-700"
                          }`}
                        >
                          {notification.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center">
                  <Bell className="mx-auto mb-3 h-12 w-12 text-neutral-300" />
                  <p className="text-sm text-neutral-500">
                    No notifications yet
                  </p>
                </div>
              )}
            </div>

            {/* View All Link */}
            {notifications.length > 4 && (
              <div className="">
                <Link
                  href="/all-notifications"
                  className="flex w-full items-center justify-center py-3 text-sm font-semibold text-neutral-900 transition-all duration-200"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  All Notification
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

NotificationDropdown.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      type: PropTypes.oneOf([
        "policy",
        "renewal",
        "payment",
        "system",
        "general",
      ]),
      timestamp: PropTypes.string.isRequired,
      isRead: PropTypes.bool.isRequired,
    }),
  ),
  onMarkAsRead: PropTypes.func,
  onMarkAllAsRead: PropTypes.func,
};

export default NotificationDropdown;
