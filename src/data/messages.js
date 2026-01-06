const mockMessages = [
  {
    id: 1,
    user: {
      id: 1,
      name: "Roger George",
      avatar: "/public/images/users/roger-george.jpg",
      isOnline: true,
    },
    content: "Typing...",
    timestamp: Date.now() - 5 * 60 * 1000, // 5 minutes ago
    isRead: false,
    type: "typing",
  },
  {
    id: 2,
    user: {
      id: 2,
      name: "Wilson Kenter",
      avatar: "/public/images/users/wilson-kenter.jpg",
      isOnline: false,
    },
    content: "We've received your premium pay...",
    timestamp: Date.now() - 10 * 60 * 1000, // 10 minutes ago
    isRead: false,
    type: "message",
  },
  {
    id: 3,
    user: {
      id: 3,
      name: "Alfonso Press",
      avatar: "/public/images/users/alfonso-press.jpg",
      isOnline: false,
    },
    content: "Policy Cancellation Document Se...",
    timestamp: Date.now() - 15 * 60 * 1000, // 15 minutes ago
    isRead: false,
    type: "document",
  },
  {
    id: 4,
    user: {
      id: 4,
      name: "Sarah Johnson",
      avatar: "/public/images/users/sarah-johnson.jpg",
      isOnline: true,
    },
    content: "Thanks for the quick response on my claim!",
    timestamp: Date.now() - 30 * 60 * 1000, // 30 minutes ago
    isRead: true,
    type: "message",
  },
  {
    id: 5,
    user: {
      id: 5,
      name: "Michael Chen",
      avatar: "/public/images/users/michael-chen.jpg",
      isOnline: false,
    },
    content: "Could you please review my policy details?",
    timestamp: Date.now() - 45 * 60 * 1000, // 45 minutes ago
    isRead: true,
    type: "message",
  },
  {
    id: 6,
    user: {
      id: 6,
      name: "Emma Davis",
      avatar: "/public/images/users/emma-davis.jpg",
      isOnline: true,
    },
    content: "New insurance quote request submitted",
    timestamp: Date.now() - 60 * 60 * 1000, // 1 hour ago
    isRead: true,
    type: "system",
  },
];

// Helper functions for message management
export const getUnreadMessages = () => {
  return mockMessages.filter((message) => !message.isRead);
};

export const getLatestMessages = (count = 3) => {
  return mockMessages.sort((a, b) => b.timestamp - a.timestamp).slice(0, count);
};

export const markMessageAsRead = (messageId) => {
  const message = mockMessages.find((msg) => msg.id === messageId);
  if (message) {
    message.isRead = true;
  }
};

export const markAllMessagesAsRead = () => {
  mockMessages.forEach((message) => {
    message.isRead = true;
  });
};

export const getAllMessages = () => {
  return mockMessages.sort((a, b) => b.timestamp - a.timestamp);
};

export default mockMessages;
