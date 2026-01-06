"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  addMessage,
  ensureConversation,
  getConversations,
  getMessagesForUser,
  getUsers,
  markMessagesAsRead,
} from "@/data/conversations";
import ChatDetails from "./ChatDetails";
import MessageList from "./MessageList";

// Helper to generate URL-friendly slug from name and id
const generateUserSlug = (name, id) => {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `${slug}-${id}`;
};

// Helper to extract userId from slug
const extractUserIdFromSlug = (slug) => {
  if (!slug) return null;
  const parts = slug.split("-");
  const id = parseInt(parts[parts.length - 1], 10);
  return isNaN(id) ? null : id;
};

const MessagingInterface = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [conversations, setConversations] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [isMobileView, setIsMobileView] = useState(false);
  const [showChatDetails, setShowChatDetails] = useState(false);
  const [drafts, setDrafts] = useState({});
  const [isLoadingChat, setIsLoadingChat] = useState(false);

  // Initialize data
  useEffect(() => {
    const initialConversations = getConversations();
    setConversations(initialConversations);
    setAllUsers(getUsers());
  }, []);

  // Handle URL parameter for chat selection
  useEffect(() => {
    const chatParam = searchParams.get("chat");
    const userIdParam = searchParams.get("userId");

    if (conversations.length === 0) return;

    let userId = null;

    if (chatParam) {
      userId = extractUserIdFromSlug(chatParam);
    } else if (userIdParam) {
      userId = parseInt(userIdParam, 10);
    }

    if (userId && userId !== selectedUserId) {
      const conversation = conversations.find(
        (conv) => conv.user.id === userId,
      );
      if (conversation) {
        openConversationFromUrl(userId, conversations);
      }
    }
  }, [searchParams, conversations]);

  // Handle responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Derive conversations with draft preview, ensuring immediate list updates
  const conversationsWithDraftPreview = useMemo(() => {
    return conversations.map((conv) => {
      const draftText = drafts[conv.user.id];
      if (draftText && draftText.trim().length > 0) {
        return { ...conv, _draftPreview: draftText };
      }
      return { ...conv, _draftPreview: undefined };
    });
  }, [conversations, drafts]);

  const openConversationFromUrl = (userId, conversationsList) => {
    // Don't reload if already on this chat
    if (userId === selectedUserId) return;

    const conversation = conversationsList.find(
      (conv) => conv.user.id === userId,
    );
    if (conversation) {
      setIsLoadingChat(true);
      setSelectedUserId(userId);
      setSelectedUser(conversation.user);

      // Small delay to prevent jumping
      setTimeout(() => {
        const userMessages = getMessagesForUser(userId);
        setMessages(userMessages);
        setIsLoadingChat(false);
      }, 150);

      markMessagesAsRead(userId);

      setConversations(
        conversationsList.map((conv) =>
          conv.user.id === userId ? { ...conv, unreadCount: 0 } : conv,
        ),
      );

      if (isMobileView) {
        setShowChatDetails(true);
      }
    }
  };

  const updateUrlWithUser = (user) => {
    const slug = generateUserSlug(user.name, user.id);
    router.push(`/messages?chat=${slug}`, { scroll: false });
  };

  const openConversation = (userId, conversationsList) => {
    // Don't reload if already on this chat
    if (userId === selectedUserId) return;

    const conversation = conversationsList.find(
      (conv) => conv.user.id === userId,
    );
    if (conversation) {
      setIsLoadingChat(true);
      setSelectedUserId(userId);
      setSelectedUser(conversation.user);

      // Small delay to prevent jumping
      setTimeout(() => {
        const userMessages = getMessagesForUser(userId);
        setMessages(userMessages);
        setIsLoadingChat(false);
      }, 150);

      markMessagesAsRead(userId);

      setConversations(
        conversationsList.map((conv) =>
          conv.user.id === userId ? { ...conv, unreadCount: 0 } : conv,
        ),
      );

      if (isMobileView) {
        setShowChatDetails(true);
      }

      // Update URL
      updateUrlWithUser(conversation.user);
    }
  };

  const handleUserSelect = (userId) => {
    openConversation(userId, conversations);
  };

  const handleStartConversation = (userId) => {
    ensureConversation(userId);
    const nextConversations = getConversations();
    setConversations(nextConversations);
    openConversation(userId, nextConversations);
  };

  const handleSendMessage = (messageContent) => {
    if (!selectedUserId || !messageContent.trim()) {
      return;
    }

    const trimmedContent = messageContent.trim();
    const newMessage = addMessage(selectedUserId, trimmedContent);

    setMessages((prev) => [...prev, newMessage]);
    setDrafts((prev) => ({ ...prev, [selectedUserId]: "" }));

    setConversations((prev) =>
      prev
        .map((conversation) =>
          conversation.user.id === selectedUserId
            ? {
                ...conversation,
                lastMessage: {
                  content: trimmedContent,
                  timestamp: Date.now(),
                  isRead: false,
                  isTyping: false,
                },
              }
            : conversation,
        )
        .sort(
          (conversationA, conversationB) =>
            conversationB.lastMessage.timestamp -
            conversationA.lastMessage.timestamp,
        ),
    );
  };

  const handleBack = () => {
    if (isMobileView) {
      setShowChatDetails(false);
      setSelectedUserId(null);
      setSelectedUser(null);
      router.push("/messages", { scroll: false });
    }
  };

  return (
    <div className="flex h-[calc(100dvh-155px)] overflow-hidden">
      {/* Message List Panel */}
      <div
        className={` ${isMobileView ? (showChatDetails ? "hidden" : "block") : "block"} h-full w-full border-neutral-200 md:max-w-[335px] md:border-r`}
      >
        <MessageList
          conversations={conversationsWithDraftPreview}
          selectedUserId={selectedUserId}
          onUserSelect={handleUserSelect}
          onStartConversation={handleStartConversation}
          allUsers={allUsers}
          drafts={drafts}
        />
      </div>

      {/* Chat Details Panel */}
      <div
        className={` ${isMobileView ? (showChatDetails ? "block" : "hidden") : "block"} h-full flex-1 overflow-hidden`}
      >
        <ChatDetails
          selectedUser={selectedUser}
          messages={messages}
          onSendMessage={handleSendMessage}
          onBack={handleBack}
          draftMessage={selectedUserId ? drafts[selectedUserId] || "" : ""}
          onDraftChange={(value) =>
            setDrafts((prev) => ({ ...prev, [selectedUserId]: value }))
          }
          isLoading={isLoadingChat}
        />
      </div>
    </div>
  );
};

export default MessagingInterface;
