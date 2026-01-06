import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import {
  getConversations,
  getTotalUnreadCount,
} from "../../data/conversations";

// Helper to generate URL-friendly slug from name and id
const generateUserSlug = (name, id) => {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `${slug}-${id}`;
};

const MessageDropdown = ({ className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [conversations, setConversations] = useState([]);
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    setConversations(getConversations());
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMessageClick = (conversation) => {
    setIsOpen(false);
    // Navigate to messages page with the user slug (name-id format)
    const slug = generateUserSlug(conversation.user.name, conversation.user.id);
    router.push(`/messages?chat=${slug}`);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  const unreadCount = getTotalUnreadCount();

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="relative cursor-pointer rounded-xl p-2.5 text-neutral-900 transition-all duration-200 focus:outline-none"
        aria-label="Messages"
      >
        <MessageCircle className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-3 flex h-2 w-2 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-80 rounded-lg border border-gray-200 bg-white shadow-lg">
          <div>
            <div className="scrollbar-hide max-h-80 divide-y divide-[#64748B14] overflow-y-auto">
              {conversations.map((conversation) => (
                <div
                  key={conversation.user.id}
                  onClick={() => handleMessageClick(conversation)}
                  className={cn(
                    "relative flex cursor-pointer items-start space-x-3 p-4 transition-colors hover:bg-neutral-50",
                    conversation.unreadCount > 0
                      ? "bg-white"
                      : "bg-[#64748B14]",
                  )}
                >
                  <div className="relative flex-shrink-0">
                    <img
                      src={conversation.user.avatar || "/images/users/user.png"}
                      alt={conversation.user.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    {conversation.user.isOnline && (
                      <div className="absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-white bg-[#04C8B2]"></div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="truncate text-sm font-medium text-neutral-900">
                        {conversation.user.name}
                      </p>
                      <span className="text-xs text-neutral-500">
                        {formatTime(conversation.lastMessage.timestamp)}
                      </span>
                    </div>
                    <p className="mt-1 truncate text-sm text-neutral-600">
                      {conversation.lastMessage.content}
                    </p>
                    {conversation.unreadCount > 0 && (
                      <div className="absolute top-1/2 right-4 h-2 w-2 -translate-y-1/2 rounded-full bg-red-500"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-[#64748B14] p-3">
              <Link
                href="/messages"
                className="hover:text-primary inline-block w-full cursor-pointer text-center text-sm font-medium text-gray-900 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                All Messages
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

MessageDropdown.propTypes = {
  className: PropTypes.string,
};

export default MessageDropdown;
