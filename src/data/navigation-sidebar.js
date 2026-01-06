import {
  ClientsIcon,
  ClientSidebarFileIcon,
  CommissionIcon,
  HandCoinsIcon,
  PaymentIcon,
  PoliciesIcon,
  StackOverFlowIcon,
  UserManagementIcon,
} from "@/components/shared/svgs";
import {
  ClipboardList,
  FileCheck,
  FileText,
  LayoutGrid,
  List,
  LogOut,
  Plus,
  Receipt,
  Shield,
  User,
  UserCheck,
} from "lucide-react";

export const navigation = [
  { name: "Dashboard", icon: LayoutGrid, href: "/" },
  {
    name: "Policies",
    icon: PoliciesIcon,
    href: "/policies",
    hasDropdown: true,
    children: [
      { name: "All Policies", icon: List, href: "/policies/all" },
      {
        name: "Add New Opportunity",
        icon: Plus,
        href: "/policies/add-new-opportunity",
      },
    /*   {
        name: "Product Plans",
        icon: ClipboardList,
        href: "/policies/product-plans",
      }, */
      { name: "Claims", icon: FileCheck, href: "/policies/claims" },
    ],
  },
  { name: "Clients", icon: ClientsIcon, href: "/clients" },
  {
    name: "Payments",
    icon: PaymentIcon,
    href: "/payments",
    hasDropdown: true,
    children: [
      { name: "Payment Records", icon: Receipt, href: "/payments/records" },
      { name: "Invoices", icon: FileText, href: "/payments/invoices" },
    ],
  },
  {
    name: "User Management",
    icon: UserManagementIcon,
    href: "/user-management",
    hasDropdown: true,
    children: [
      {
        name: "Roles & Permissions",
        icon: Shield,
        href: "/user-management/roles",
      },
      { name: "Team Members", icon: UserCheck, href: "/user-management/team" },
    ],
  },
  {
    name: "Commission Ledger",
    icon: CommissionIcon,
    href: "/commission-ledger",
  },
];

export const dropdownItems = [
  { icon: User, label: "My Profile", href: "/settings/company-profile" },
  { icon: StackOverFlowIcon, label: "Activity Log", href: "/activity-log" },
  { icon: LogOut, label: "Log Out", href: "/logout", isLogout: true },
];

export const navigationClient = [
  { name: "Dashboard", icon: LayoutGrid, href: "/client/dashboard" },
  { name: "Policies", icon: PoliciesIcon, href: "/client/policies" },
  { name: "Documents", icon: ClientSidebarFileIcon, href: "/client/documents" },
  { name: "Claims", icon: CommissionIcon, href: "/client/claims" },
  { name: "Payments", icon: HandCoinsIcon, href: "/client/payments" },
];
