"use client";

import { SearchIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { DoubleCheckIcon } from "@/components/shared/svgs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MessageList = ({
  conversations,
  selectedUserId,
  onUserSelect,
  onStartConversation,
  allUsers = [],
  drafts = {},
  className = "",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isNewConversationOpen, setIsNewConversationOpen] = useState(false);
  const [newConversationSearch, setNewConversationSearch] = useState("");

  // Filter conversations based on search term (name only)
  const filteredConversations = conversations.filter((conversation) =>
    conversation.user.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const isClientUser = (user) =>
    String(user?.role || "").toLowerCase() === "client";

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } else if (diffInHours < 168) {
      // Less than a week
      return date.toLocaleDateString("en-US", { weekday: "short" });
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  const truncateMessage = (message, maxLength = 30) => {
    if (message.length <= maxLength) return message;
    return `${message.substring(0, maxLength)}...`;
  };

  const handleStartConversation = (userId) => {
    if (!onStartConversation) return;
    setIsNewConversationOpen(false);
    setNewConversationSearch("");
    onStartConversation(userId);
  };

  const renderConversationRow = (conversation) => {
    const draftText =
      conversation._draftPreview ?? drafts[conversation.user.id] ?? "";
    const showDraftInList =
      conversation.user.id !== selectedUserId && draftText.trim().length > 0;
    const lastMessageContent = String(conversation.lastMessage?.content || "");
    const hasLastMessageContent = lastMessageContent.trim().length > 0;
    const showTime =
      (hasLastMessageContent || conversation.lastMessage?.isTyping) &&
      conversation.lastMessage?.timestamp
        ? formatTime(conversation.lastMessage.timestamp)
        : "";

    return (
      <button
        key={conversation.user.id}
        type="button"
        onClick={() => onUserSelect(conversation.user.id)}
        className={`flex w-full cursor-pointer gap-4 px-5 py-3 text-left transition-colors hover:bg-neutral-500/8 ${
          selectedUserId === conversation.user.id ? "bg-neutral-500/8" : ""
        }`}
      >
        <figure className="relative h-fit w-fit">
          <Image
            src={conversation.user.avatar || "/images/users/user.png"}
            alt={`${conversation.user.name} avatar`}
            width={50}
            height={50}
            className="rounded-full object-cover"
          />
          {conversation.user.isOnline && (
            <div className="absolute right-0.5 bottom-0.5 h-3 w-3 rounded-full border-2 border-neutral-50 bg-teal-500" />
          )}
        </figure>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2">
              <p className="font-dmSans truncate text-base font-bold text-neutral-900">
                {conversation.user.name}
              </p>
              <span
                className={`font-dmSans inline-flex h-5 shrink-0 items-center rounded-full px-2 text-[11px] font-semibold whitespace-nowrap ${
                  isClientUser(conversation.user)
                    ? "bg-blue-50 text-blue-700"
                    : "bg-neutral-100 text-neutral-700"
                }`}
              >
                {isClientUser(conversation.user) ? "Client" : "Co-worker"}
              </span>
            </div>
            <span className="font-dmSans text-[13px] font-medium whitespace-nowrap text-neutral-400">
              {showTime}
            </span>
          </div>

          <div className="mt-1 flex items-center justify-between gap-2">
            <div className="min-w-0 flex-1">
              {showDraftInList ? (
                <p className="font-dmSans truncate text-sm text-neutral-400 italic">
                  {truncateMessage(`Draft: ${draftText}`)}
                </p>
              ) : conversation.lastMessage?.isTyping ? (
                <p className="font-dmSans text-sm text-teal-500">Typing...</p>
              ) : hasLastMessageContent ? (
                <p className="font-dmSans truncate text-sm text-neutral-400">
                  {truncateMessage(lastMessageContent)}
                </p>
              ) : (
                <p className="font-dmSans truncate text-sm text-neutral-400">
                  No messages yet
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              {conversation.unreadCount > 0 && (
                <span className="font-dmSans flex h-4 !min-w-4 shrink-0 items-center justify-center rounded-full bg-red-500 px-1 text-xs leading-none font-bold text-white">
                  {conversation.unreadCount > 99
                    ? "99+"
                    : conversation.unreadCount}
                </span>
              )}

              {hasLastMessageContent &&
                conversation.lastMessage?.isRead &&
                !conversation.lastMessage?.isTyping && (
                  <DoubleCheckIcon className="h-3 w-auto text-teal-500" />
                )}
            </div>
          </div>
        </div>
      </button>
    );
  };

  return (
    <div
      className={`flex h-full w-full flex-col md:max-w-[335px] ${className}`}
    >
      <div className="flex-shrink-0 px-5 pt-5">
        <div className="flex items-center justify-between gap-3">
          <p className="font-dmSans text-base font-bold text-neutral-900">
            Conversations
          </p>
          <Button
            variant="default"
            size="sm"
            onClick={() => setIsNewConversationOpen(true)}
            className="text-white"
          >
            New Conversation
          </Button>
        </div>

        <div className="relative mt-4 mb-5">
          <Input
            placeholder="Search conversations..."
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="font-dmSans h-12 w-full rounded-lg border-none bg-neutral-500/4 px-4 py-3 pl-12 text-base text-neutral-400 shadow-none"
          />
          <SearchIcon className="absolute top-1/2 left-4 h-5 w-auto -translate-y-1/2 text-neutral-400" />
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="px-5 py-8 text-center">
            <p className="font-dmSans text-sm text-neutral-400">
              {searchTerm ? "No conversations found" : "No messages yet"}
            </p>
          </div>
        ) : (
          filteredConversations.map(renderConversationRow)
        )}
      </div>

      <Dialog
        open={isNewConversationOpen}
        onOpenChange={setIsNewConversationOpen}
      >
        <DialogContent className="flex max-h-[calc(100svh-2rem)] w-full max-w-xl flex-col gap-0 overflow-hidden border-neutral-200 p-0 shadow-2xl">
          <DialogHeader className="border-b border-neutral-200 bg-neutral-50 px-6 py-5">
            <DialogTitle className="font-dmSans text-xl font-bold text-neutral-900">
              New Conversation
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4 px-6 py-5">
            <div className="relative">
              <Input
                placeholder="Search clients or co-workers..."
                type="search"
                value={newConversationSearch}
                onChange={(event) =>
                  setNewConversationSearch(event.target.value)
                }
                className="h-12 rounded-lg pl-11"
              />
              <SearchIcon className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-neutral-400" />
            </div>

            <Tabs defaultValue="clients" className="flex flex-col">
              <TabsList className="flex w-full rounded-lg bg-[#F8FAFC] p-1">
                <TabsTrigger
                  value="clients"
                  className="flex-1 cursor-pointer rounded-md px-3 py-1 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 data-[state=active]:bg-white data-[state=active]:text-[#235BD2] data-[state=active]:shadow-sm"
                >
                  Clients
                </TabsTrigger>
                <TabsTrigger
                  value="coworkers"
                  className="flex-1 cursor-pointer rounded-md px-3 py-1 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 data-[state=active]:bg-white data-[state=active]:text-[#235BD2] data-[state=active]:shadow-sm"
                >
                  Co-workers
                </TabsTrigger>
              </TabsList>

              <TabsContent value="clients">
                <div className="max-h-[min(360px,calc(100dvh-22rem))] overflow-y-auto rounded-lg border border-neutral-200">
                  {allUsers
                    .filter((user) => isClientUser(user))
                    .filter((user) =>
                      user.name
                        .toLowerCase()
                        .includes(newConversationSearch.toLowerCase()),
                    )
                    .map((user) => (
                      <button
                        key={user.id}
                        type="button"
                        onClick={() => handleStartConversation(user.id)}
                        className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-neutral-50"
                      >
                        <Image
                          src={user.avatar || "/images/users/user.png"}
                          alt={`${user.name} avatar`}
                          width={40}
                          height={40}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="font-dmSans truncate text-sm font-bold text-neutral-900">
                            {user.name}
                          </p>
                          <p className="font-dmSans text-xs text-neutral-500">
                            Client
                          </p>
                        </div>
                      </button>
                    ))}
                  {allUsers
                    .filter((user) => isClientUser(user))
                    .filter((user) =>
                      user.name
                        .toLowerCase()
                        .includes(newConversationSearch.toLowerCase()),
                    ).length === 0 && (
                    <div className="px-4 py-10 text-center">
                      <p className="font-dmSans text-sm text-neutral-500">
                        No clients found
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="coworkers">
                <div className="max-h-[min(360px,calc(100dvh-22rem))] overflow-y-auto rounded-lg border border-neutral-200">
                  {allUsers
                    .filter((user) => !isClientUser(user))
                    .filter((user) =>
                      user.name
                        .toLowerCase()
                        .includes(newConversationSearch.toLowerCase()),
                    )
                    .map((user) => (
                      <button
                        key={user.id}
                        type="button"
                        onClick={() => handleStartConversation(user.id)}
                        className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-neutral-50"
                      >
                        <Image
                          src={user.avatar || "/images/users/user.png"}
                          alt={`${user.name} avatar`}
                          width={40}
                          height={40}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="font-dmSans truncate text-sm font-bold text-neutral-900">
                            {user.name}
                          </p>
                          <p className="font-dmSans shrink-0 text-xs text-neutral-500">
                            {user.role || "Co-worker"}
                          </p>
                        </div>
                      </button>
                    ))}
                  {allUsers
                    .filter((user) => !isClientUser(user))
                    .filter((user) =>
                      user.name
                        .toLowerCase()
                        .includes(newConversationSearch.toLowerCase()),
                    ).length === 0 && (
                    <div className="px-4 py-10 text-center">
                      <p className="font-dmSans text-sm text-neutral-500">
                        No co-workers found
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MessageList;
