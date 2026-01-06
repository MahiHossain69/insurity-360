export const mockNotifications = [
  {
    id: 1,
    title: "Policy Renewal Due Soon",
    message:
      "Your policy [PL-2345] is set to expire in 7 days. Please renew to continue uninterrupted coverage.",
    type: "renewal",
    timestamp: "2025-01-10T10:15:00Z",
    isRead: false,
  },
  {
    id: 2,
    title: "Payment Received",
    message:
      "Payment of $1,250 has been successfully processed for policy [PL-2345].",
    type: "payment",
    timestamp: "2025-01-10T09:30:00Z",
    isRead: false,
  },
  {
    id: 3,
    title: "New Policy Application",
    message:
      "A new policy application has been submitted and requires your review.",
    type: "policy",
    timestamp: "2025-01-10T08:45:00Z",
    isRead: true,
  },
  {
    id: 4,
    title: "System Maintenance Scheduled",
    message:
      "Scheduled maintenance will occur tonight from 2:00 AM to 4:00 AM EST.",
    type: "system",
    timestamp: "2025-01-09T16:20:00Z",
    isRead: true,
  },
  {
    id: 5,
    title: "Policy Update Required",
    message: "Policy [PL-1987] requires updates to beneficiary information.",
    type: "policy",
    timestamp: "2025-01-09T14:10:00Z",
    isRead: false,
  },
  {
    id: 6,
    title: "Premium Adjustment",
    message: "Your premium has been adjusted based on recent policy changes.",
    type: "payment",
    timestamp: "2025-01-09T11:30:00Z",
    isRead: true,
  },
  {
    id: 7,
    title: "Document Upload Required",
    message:
      "Please upload the required documents for policy [PL-2345] verification.",
    type: "policy",
    timestamp: "2025-01-08T15:45:00Z",
    isRead: true,
  },
];

// Helper functions for notification management
export const getUnreadNotifications = (notifications) => {
  return notifications.filter((notification) => !notification.isRead);
};

export const getLatestNotifications = (notifications, count = 4) => {
  return notifications
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, count);
};

export const markNotificationAsRead = (notifications, notificationId) => {
  return notifications.map((notification) =>
    notification.id === notificationId
      ? { ...notification, isRead: true }
      : notification,
  );
};

export const markAllNotificationsAsRead = (notifications) => {
  return notifications.map((notification) => ({
    ...notification,
    isRead: true,
  }));
};
