export const permissionGroups = [
  {
    title: "Policies",
    permissions: [
      "View Policies",
      "Create Policies",
      "Edit Policies",
      "Manage Policy Products",
    ],
  },
  {
    title: "Claims",
    permissions: [
      "View Claims",
      "Create Claims",
      "Edit Claims",
      "Delete Claims",
      "Approve/Reject Claims",
      "View Claim Attachments",
    ],
  },
  {
    title: "Payments & Invoices",
    permissions: [
      "View Payments",
      "Record Payments",
      "Edit Payments",
      "Delete Payments",
      "Create Invoices",
      "Edit Invoices",
      "Setup Recurring Invoices",
    ],
  },
  {
    title: "Clients",
    permissions: [
      "View Clients",
      "Add Clients",
      "Edit Clients",
      "Delete Clients",
      "View Client Policies",
    ],
  },
  {
    title: "Product Plans",
    permissions: [
      "View Products",
      "Create Product Plans",
      "Edit Product Plans",
      "Delete Product Plans",
    ],
  },
  {
    title: "Documents Management",
    permissions: ["Upload Documents", "View Documents", "Delete Documents"],
  },
  {
    title: "Team & User Management",
    permissions: [
      "View Team Members",
      "Add Team Members",
      "Edit Team Members",
      "Assign Roles & Permissions",
      "View Audit Logs",
    ],
  },
  {
    title: "Task & Collaboration",
    permissions: [
      "View Tasks",
      "Assign Tasks",
      "Edit Tasks",
      "Mark Tasks Complete",
      "Access Internal Messaging",
    ],
  },
  {
    title: "Settings & Configurations",
    permissions: [
      "Access General Settings",
      "Modify System Configuration",
      "Manage Notification Preferences",
    ],
  },
];

export const defaultNotifications = [
  { key: "taskNotifications", label: "Receive Task Notifications" },
  { key: "claimUpdates", label: "Receive Claim Updates" },
  { key: "policyAlerts", label: "Receive Policy Alerts" },
];
