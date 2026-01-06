"use client";

import {
  DoubleCheckIcon,
  EmojiIcon,
  ImageIcon,
  MapPinIcon,
  MicroPhoneIcon,
  SendIcon,
} from "@/components/shared/svgs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, MoreVertical, Send } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";

const ChatDetails = ({
  selectedUser,
  messages,
  onSendMessage,
  onBack,
  draftMessage = "",
  onDraftChange,
  isLoading = false,
  className = "",
}) => {
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (draftMessage.trim()) {
      onSendMessage(draftMessage.trim());
      inputRef.current?.focus();
    }
  };

  const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatMessageDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return `Today, ${date.toLocaleDateString("en-US", { month: "long", day: "numeric" })}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday, ${date.toLocaleDateString("en-US", { month: "long", day: "numeric" })}`;
    } else {
      return date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "2-digit",
      });
    }
  };

  const groupMessagesByDate = (messages) => {
    const groups = {};
    messages.forEach((message) => {
      const dateKey = new Date(message.timestamp).toDateString();
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(message);
    });
    return groups;
  };

  if (isLoading) {
    return (
      <div
        className={`flex h-full flex-1 items-center justify-center bg-white ${className}`}
      >
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-blue-600"></div>
      </div>
    );
  }

  if (!selectedUser) {
    return (
      <div
        className={`flex h-full flex-1 items-center justify-center bg-neutral-50 ${className}`}
      >
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-200">
            <Send className="h-8 w-8 text-neutral-400" />
          </div>
          <h3 className="font-dmSans mb-2 text-lg font-medium text-neutral-600">
            Select a conversation
          </h3>
          <p className="font-dmSans text-sm text-neutral-400">
            Choose a conversation from the list to start messaging
          </p>
        </div>
      </div>
    );
  }

  const messageGroups = groupMessagesByDate(messages);
  const isTyping = Boolean(draftMessage.trim());

  return (
    <div
      className={`relative flex h-full flex-1 flex-col bg-white pb-20 ${className}`}
    >
      {/* Chat Header */}
      <div className="flex items-center gap-4 border-b border-neutral-200 p-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="h-auto p-2 md:hidden"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <figure className="relative h-fit w-fit">
          <Image
            src={selectedUser.avatar || "/images/users/user.png"}
            alt={`${selectedUser.name} avatar`}
            width={64}
            height={64}
            className="h-10 w-10 rounded-full object-cover md:h-14 md:w-14 lg:h-16 lg:w-16"
          />
        </figure>

        <div className="flex-1">
          <h2 className="font-dmSans text-lg font-bold text-neutral-900 md:text-2xl lg:text-3xl">
            {selectedUser.name}
          </h2>
          <p className="font-dmSans text-sm font-medium text-neutral-500">
            {selectedUser.role}
          </p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {Object.entries(messageGroups).map(([dateKey, dayMessages]) => (
          <div key={dateKey}>
            {/* Date Separator */}
            <div className="my-4 flex items-center justify-center">
              <div className="flex w-full items-center gap-6">
                <div className="flex h-px w-full grow bg-neutral-200" />
                <span className="font-dmSans text-sm font-medium text-nowrap text-neutral-500">
                  {formatMessageDate(new Date(dateKey))}
                </span>
                <div className="flex h-px w-full grow bg-neutral-200" />
              </div>
            </div>

            {/* Messages for this date */}
            {dayMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isOwn ? "justify-end" : "justify-start"} mb-3`}
              >
                <div
                  className={`flex max-w-[70%] items-center gap-2 ${message.isOwn ? "flex-row-reverse" : ""}`}
                >
                  <div className="flex-1">
                    <div
                      className={`font-dmSans flex text-xs text-neutral-400 ${message.isOwn ? "justify-end" : ""}`}
                    >
                      <span>{formatMessageTime(message.timestamp)}</span>
                    </div>
                    <div
                      className={`mt-1 flex items-center gap-3 ${message.isOwn ? "" : "flex-row-reverse"}`}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 flex-shrink-0 p-0 hover:bg-neutral-100"
                      >
                        <MoreVertical className="h-4 w-4 text-neutral-400" />
                      </Button>

                      <div
                        className={`rounded-[10px] px-4 py-3 ${
                          message.isOwn
                            ? "rounded-tr-none bg-blue-700"
                            : "rounded-tl-none bg-neutral-100"
                        }`}
                      >
                        <p
                          className={`font-dmSans text-sm font-medium ${message.isOwn ? "text-white" : "text-neutral-500"}`}
                        >
                          {message.content}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="absolute right-0 bottom-0 left-0 border-t border-neutral-200 bg-white px-4 py-3 lg:px-6 lg:py-5">
        <form onSubmit={handleSendMessage} className="flex items-end gap-3">
          <div className="relative flex-1">
            <Input
              ref={inputRef}
              value={draftMessage}
              onChange={(e) => onDraftChange?.(e.target.value)}
              placeholder="Add a comment..."
              className={`font-dmSans h-auto min-h-11 rounded-full border border-neutral-100 bg-neutral-100 py-3 text-sm font-medium text-neutral-500 shadow-none duration-200 focus:border-blue-500 focus-visible:ring-0 lg:min-h-[50px] ${isTyping ? "pr-12 pl-4" : "pr-36 pl-8 lg:pl-12"} `}
            />

            {/* Left-side microphone: hidden while typing */}
            {!isTyping && (
              <div className="absolute top-1/2 left-2 flex -translate-y-1/2 lg:left-4">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 !p-0 hover:bg-neutral-200 lg:h-7 lg:w-7"
                >
                  <MicroPhoneIcon className="!h-4 !w-auto text-neutral-500 lg:!h-5" />
                </Button>
              </div>
            )}

            {/* Right-side actions: show only Send while typing */}
            <div className="absolute top-1/2 right-3 flex -translate-y-1/2 items-center gap-3">
              {!isTyping && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 !p-0 hover:bg-neutral-200 lg:h-7 lg:w-7"
                >
                  <ImageIcon className="!h-4 !w-auto text-neutral-500 lg:!h-5" />
                </Button>
              )}

              {!isTyping && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 !p-0 hover:bg-neutral-200 lg:h-7 lg:w-7"
                >
                  <EmojiIcon className="!h-4 !w-auto text-neutral-500 lg:!h-5" />
                </Button>
              )}

              <Button
                type="submit"
                variant="ghost"
                size="sm"
                className="h-6 w-6 !p-0 hover:bg-neutral-200 lg:h-7 lg:w-7"
              >
                <SendIcon className="!h-4 !w-auto text-neutral-500 lg:!h-5" />
              </Button>

              {!isTyping && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 !p-0 hover:bg-neutral-200 lg:h-7 lg:w-7"
                >
                  <MapPinIcon className="!h-4 !w-auto text-neutral-500 lg:!h-5" />
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatDetails;
