// Comprehensive dummy data for messaging interface

// Users data
export const users = {
  1: {
    id: 1,
    name: "Killan James",
    avatar: "/images/users/user.png",
    isOnline: true,
    lastSeen: Date.now(),
    role: "Executive",
  },
  2: {
    id: 2,
    name: "Sarah Johnson",
    avatar: "/images/users/user.png",
    isOnline: false,
    lastSeen: Date.now() - 30 * 60 * 1000, // 30 minutes ago
    role: "Client",
  },
  3: {
    id: 3,
    name: "Michael Chen",
    avatar: "/images/users/user.png",
    isOnline: true,
    lastSeen: Date.now(),
    role: "Client",
  },
  4: {
    id: 4,
    name: "Emma Williams",
    avatar: "/images/users/user.png",
    isOnline: false,
    lastSeen: Date.now() - 2 * 60 * 60 * 1000, // 2 hours ago
    role: "Manager",
  },
  5: {
    id: 5,
    name: "David Rodriguez",
    avatar: "/images/users/user.png",
    isOnline: true,
    lastSeen: Date.now(),
    role: "Client",
  },
  6: {
    id: 6,
    name: "Lisa Anderson",
    avatar: "/images/users/user.png",
    isOnline: false,
    lastSeen: Date.now() - 24 * 60 * 60 * 1000, // 1 day ago
    role: "Supervisor",
  },
};

// Messages data organized by conversation
export const messagesData = {
  1: [
    // Messages with Killan James
    {
      id: 1,
      content: "Hello! Everyone",
      timestamp: Date.now() - 4 * 60 * 60 * 1000, // 4 hours ago
      isOwn: false,
      isRead: true,
      senderId: 1,
    },
    {
      id: 2,
      content: "Hi Killan! How are you doing today?",
      timestamp: Date.now() - 3 * 60 * 60 * 1000, // 3 hours ago
      isOwn: true,
      isRead: true,
      senderId: "current_user",
    },
    {
      id: 3,
      content:
        "I'm doing great! Just finished reviewing the new policy documents. Everything looks good to go.",
      timestamp: Date.now() - 2 * 60 * 60 * 1000, // 2 hours ago
      isOwn: false,
      isRead: true,
      senderId: 1,
    },
    {
      id: 4,
      content:
        "That's excellent news! When can we schedule the client meeting?",
      timestamp: Date.now() - 1 * 60 * 60 * 1000, // 1 hour ago
      isOwn: true,
      isRead: true,
      senderId: "current_user",
    },
    {
      id: 5,
      content:
        "How about tomorrow at 2 PM? I'll send you the meeting details shortly.",
      timestamp: Date.now() - 30 * 60 * 1000, // 30 minutes ago
      isOwn: false,
      isRead: false,
      senderId: 1,
    },
  ],
  2: [
    // Messages with Sarah Johnson
    {
      id: 6,
      content: "Thanks for the quick response on my claim!",
      timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000, // 2 days ago
      isOwn: false,
      isRead: true,
      senderId: 2,
    },
    {
      id: 7,
      content:
        "You're welcome! I'm glad we could resolve it quickly. Is there anything else you need help with?",
      timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000, // 2 days ago + 30 min
      isOwn: true,
      isRead: true,
      senderId: "current_user",
    },
    {
      id: 8,
      content:
        "Actually, yes. I have a question about my premium payment schedule.",
      timestamp: Date.now() - 1 * 24 * 60 * 60 * 1000, // 1 day ago
      isOwn: false,
      isRead: true,
      senderId: 2,
    },
  ],
  3: [
    // Messages with Michael Chen
    {
      id: 9,
      content: "Could you please review my policy details?",
      timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000, // 3 days ago
      isOwn: false,
      isRead: true,
      senderId: 3,
    },
    {
      id: 10,
      content:
        "Of course! I'll review your policy and get back to you by end of day.",
      timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000 + 45 * 60 * 1000, // 3 days ago + 45 min
      isOwn: true,
      isRead: true,
      senderId: "current_user",
    },
    {
      id: 11,
      content: "Perfect! I appreciate your help with this.",
      timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000, // 2 days ago
      isOwn: false,
      isRead: true,
      senderId: 3,
    },
    {
      id: 12,
      content:
        "I've completed the review. Your policy looks great! I've sent the detailed report to your email.",
      timestamp: Date.now() - 1 * 24 * 60 * 60 * 1000, // 1 day ago
      isOwn: true,
      isRead: false,
      senderId: "current_user",
    },
  ],
  4: [
    // Messages with Emma Williams
    {
      id: 13,
      content: "New insurance quote request submitted",
      timestamp: Date.now() - 5 * 24 * 60 * 60 * 1000, // 5 days ago
      isOwn: false,
      isRead: true,
      senderId: 4,
    },
    {
      id: 14,
      content:
        "Thank you for submitting your quote request. I'll prepare a comprehensive quote for you within 24 hours.",
      timestamp: Date.now() - 5 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000, // 5 days ago + 2 hours
      isOwn: true,
      isRead: true,
      senderId: "current_user",
    },
  ],
  5: [
    // Messages with David Rodriguez
    {
      id: 15,
      content: "Hi! I need to update my contact information.",
      timestamp: Date.now() - 6 * 60 * 60 * 1000, // 6 hours ago
      isOwn: false,
      isRead: true,
      senderId: 5,
    },
    {
      id: 16,
      content:
        "Sure! I can help you with that. What information would you like to update?",
      timestamp: Date.now() - 5 * 60 * 60 * 1000, // 5 hours ago
      isOwn: true,
      isRead: true,
      senderId: "current_user",
    },
    {
      id: 17,
      content: "I need to update my phone number and email address.",
      timestamp: Date.now() - 4 * 60 * 60 * 1000, // 4 hours ago
      isOwn: false,
      isRead: true,
      senderId: 5,
    },
  ],
  6: [
    // Messages with Lisa Anderson
    {
      id: 18,
      content: "Thank you for the excellent service!",
      timestamp: Date.now() - 7 * 24 * 60 * 60 * 1000, // 1 week ago
      isOwn: false,
      isRead: true,
      senderId: 6,
    },
    {
      id: 19,
      content:
        "Thank you so much for your kind words! It's always a pleasure working with you.",
      timestamp: Date.now() - 7 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000, // 1 week ago + 30 min
      isOwn: true,
      isRead: true,
      senderId: "current_user",
    },
  ],
};

// Conversations data combining users and their last messages
export const conversationsData = [
  {
    user: users[1],
    lastMessage: {
      content:
        "How about tomorrow at 2 PM? I'll send you the meeting details shortly.",
      timestamp: Date.now() - 30 * 60 * 1000, // 30 minutes ago
      isRead: false,
      isTyping: false,
    },
    unreadCount: 2,
  },
  {
    user: users[5],
    lastMessage: {
      content: "I need to update my phone number and email address.",
      timestamp: Date.now() - 4 * 60 * 60 * 1000, // 4 hours ago
      isRead: true,
      isTyping: false,
    },
    unreadCount: 0,
  },
  {
    user: users[3],
    lastMessage: {
      content:
        "I've completed the review. Your policy looks great! I've sent the detailed report to your email.",
      timestamp: Date.now() - 1 * 24 * 60 * 60 * 1000, // 1 day ago
      isRead: false,
      isTyping: false,
    },
    unreadCount: 1,
  },
  {
    user: users[2],
    lastMessage: {
      content:
        "Actually, yes. I have a question about my premium payment schedule.",
      timestamp: Date.now() - 1 * 24 * 60 * 60 * 1000, // 1 day ago
      isRead: true,
      isTyping: false,
    },
    unreadCount: 0,
  },
  {
    user: users[4],
    lastMessage: {
      content:
        "Thank you for submitting your quote request. I'll prepare a comprehensive quote for you within 24 hours.",
      timestamp: Date.now() - 5 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000, // 5 days ago + 2 hours
      isRead: true,
      isTyping: false,
    },
    unreadCount: 0,
  },
  {
    user: users[6],
    lastMessage: {
      content:
        "Thank you so much for your kind words! It's always a pleasure working with you.",
      timestamp: Date.now() - 7 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000, // 1 week ago + 30 min
      isRead: true,
      isTyping: false,
    },
    unreadCount: 0,
  },
];

// Helper functions
export const getConversations = () => {
  return conversationsData.sort(
    (conversationA, conversationB) =>
      conversationB.lastMessage.timestamp - conversationA.lastMessage.timestamp,
  );
};

export const getMessagesForUser = (userId) => {
  const msgs = messagesData[userId] || [];
  return Array.isArray(msgs) ? [...msgs] : [];
};

export const getUsers = () => {
  return Object.values(users).sort((userA, userB) =>
    userA.name.localeCompare(userB.name),
  );
};

// Counter to ensure unique IDs
let messageIdCounter = 0;

// Function to generate unique message IDs
const generateUniqueMessageId = () => {
  messageIdCounter++;
  return `${Date.now()}-${messageIdCounter}`;
};

export const addMessage = (userId, message) => {
  if (!messagesData[userId]) {
    messagesData[userId] = [];
  }

  const timestamp = Date.now();
  const newMessage = {
    id: generateUniqueMessageId(), // Unique ID generation
    content: message,
    timestamp: timestamp,
    isOwn: true,
    isRead: false,
    senderId: "current_user",
  };

  messagesData[userId].push(newMessage);

  // Update conversation last message
  const conversation = conversationsData.find(
    (conv) => conv.user.id === userId,
  );
  if (conversation) {
    conversation.lastMessage = {
      content: message,
      timestamp: timestamp,
      isRead: false,
      isTyping: false,
    };
  }

  return newMessage;
};

export const ensureConversation = (userId) => {
  const normalizedUserId = Number(userId);
  if (!normalizedUserId || !users[normalizedUserId]) {
    return null;
  }

  const existingConversation = conversationsData.find(
    (conversation) => conversation.user.id === normalizedUserId,
  );
  if (existingConversation) {
    return existingConversation;
  }

  if (!messagesData[normalizedUserId]) {
    messagesData[normalizedUserId] = [];
  }

  const now = Date.now();
  const newConversation = {
    user: users[normalizedUserId],
    lastMessage: {
      content: "",
      timestamp: now,
      isRead: true,
      isTyping: false,
    },
    unreadCount: 0,
  };

  conversationsData.push(newConversation);
  return newConversation;
};

export const markMessagesAsRead = (userId) => {
  if (messagesData[userId]) {
    messagesData[userId].forEach((message) => {
      if (!message.isOwn) {
        message.isRead = true;
      }
    });
  }

  // Update conversation unread count
  const conversation = conversationsData.find(
    (conv) => conv.user.id === userId,
  );
  if (conversation) {
    conversation.unreadCount = 0;
  }
};

export const getTotalUnreadCount = () => {
  return conversationsData.reduce(
    (total, conversation) => total + conversation.unreadCount,
    0,
  );
};
