"use client";

import { CheckIcon } from "@/components/shared/svgs";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { IoMdCheckmark } from "react-icons/io";

export default function AddNewMemberForm() {
  return (
    <div className="mt-12 max-w-200 space-y-8">
      <section>
        <h2 className="mb-1 text-2xl font-semibold text-neutral-900">
          General Information
        </h2>
        <p className="mb-6 text-sm text-neutral-500">
          Basic details of the team member
        </p>

        <div className="space-y-4">
          <div>
            <Label
              htmlFor="fullName"
              className="text-sm font-medium text-neutral-900"
            >
              Full Name
            </Label>
            <Input
              id="fullName"
              className="mt-1.5 border-neutral-300 focus:border-neutral-300"
            />
          </div>

          <div>
            <Label
              htmlFor="email"
              className="text-sm font-medium text-neutral-900"
            >
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              className="mt-1.5 border-neutral-300 focus:border-neutral-300"
            />
          </div>

          <div>
            <Label
              htmlFor="phone"
              className="text-sm font-medium text-neutral-900"
            >
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              className="mt-1.5 max-w-xs border-neutral-300 focus:border-neutral-300"
            />
          </div>
        </div>
      </section>
       <div className="w-full h-[1px] bg-neutral-200 mt-8 mb-8"></div>
      <section>
        <h2 className="mb-1 text-2xl font-semibold text-neutral-900">
          Role & Permissions
        </h2>
        <p className="mb-6 text-sm text-neutral-500">
          Assign access based on job responsibilities
        </p>

        <div className="mb-6">
          <Label
            htmlFor="role"
            className="text-sm font-medium text-neutral-900"
          >
            Select Role
          </Label>
          <Select>
            <SelectTrigger id="role" className="mt-1.5 w-98 border-neutral-300">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="manager">Manager</SelectItem>
              <SelectItem value="user">User</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="mb-4 text-base font-semibold text-neutral-900">
              Policies
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  className="border-neutral-300 text-white data-[state=checked]:border-blue-500 "
                  id="viewPolicies"
                />
                <Label
                  htmlFor="viewPolicies"
                  className="cursor-pointer text-sm font-normal text-neutral-900"
                >
                  View Policies
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  className="border-neutral-300 text-white data-[state=checked]:border-blue-500 "
                  id="createPolicies"
                />
                <Label
                  htmlFor="createPolicies"
                  className="cursor-pointer text-sm font-normal text-neutral-900"
                >
                  Create Policies
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  className="border-neutral-300 text-white data-[state=checked]:border-blue-500 "
                  id="editPolicies"
                />
                <Label
                  htmlFor="editPolicies"
                  className="cursor-pointer text-sm font-normal text-neutral-900"
                >
                  Edit Policies
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  className="border-neutral-300 text-white data-[state=checked]:border-blue-500 "
                  id="managePolicyProducts"
                />
                <Label
                  htmlFor="managePolicyProducts"
                  className="cursor-pointer text-sm font-normal text-neutral-900"
                >
                  Manage Policy Products
                </Label>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-base font-semibold text-neutral-900">
              Claims
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  className="border-neutral-300 text-white data-[state=checked]:border-blue-500 "
                  id="viewClaims"
                />
                <Label
                  htmlFor="viewClaims"
                  className="cursor-pointer text-sm font-normal text-neutral-900"
                >
                  View Claims
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  className="border-neutral-300 text-white data-[state=checked]:border-blue-500 "
                  id="createClaims"
                />
                <Label
                  htmlFor="createClaims"
                  className="cursor-pointer text-sm font-normal text-neutral-900"
                >
                  Create Claims
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  className="border-neutral-300 text-white data-[state=checked]:border-blue-500 "
                  id="editClaims"
                />
                <Label
                  htmlFor="editClaims"
                  className="cursor-pointer text-sm font-normal text-neutral-900"
                >
                  Edit Claims
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  className="border-neutral-300 text-white data-[state=checked]:border-blue-500 "
                  id="deleteClaims"
                />
                <Label
                  htmlFor="deleteClaims"
                  className="cursor-pointer text-sm font-normal text-neutral-900"
                >
                  Delete Claims
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  className="border-neutral-300 text-white data-[state=checked]:border-blue-500 "
                  id="approveRejectClaims"
                />
                <Label
                  htmlFor="approveRejectClaims"
                  className="cursor-pointer text-sm font-normal text-neutral-900"
                >
                  Approve/Reject Claims
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  className="border-neutral-300 text-white data-[state=checked]:border-blue-500 "
                  id="viewClaimAttachments"
                />
                <Label
                  htmlFor="viewClaimAttachments"
                  className="cursor-pointer text-sm font-normal text-neutral-900"
                >
                  View Claim Attachments
                </Label>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-base font-semibold text-neutral-900">
              Payments & Invoices
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  className="border-neutral-300 text-white data-[state=checked]:border-blue-500 "
                  id="viewPayments"
                />
                <Label
                  htmlFor="viewPayments"
                  className="cursor-pointer text-sm font-normal text-neutral-900"
                >
                  View Payments
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  className="border-neutral-300 text-white data-[state=checked]:border-blue-500 "
                  id="recordPayments"
                />
                <Label
                  htmlFor="recordPayments"
                  className="cursor-pointer text-sm font-normal text-neutral-900"
                >
                  Record Payments
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  className="border-neutral-300 text-white data-[state=checked]:border-blue-500 "
                  id="editPayments"
                />
                <Label
                  htmlFor="editPayments"
                  className="cursor-pointer text-sm font-normal text-neutral-900"
                >
                  Edit Payments
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  className="border-neutral-300 text-white data-[state=checked]:border-blue-500 "
                  id="deletePayments"
                />
                <Label
                  htmlFor="deletePayments"
                  className="cursor-pointer text-sm font-normal text-neutral-900"
                >
                  Delete Payments
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  className="border-neutral-300 text-white data-[state=checked]:border-blue-500 "
                  id="createInvoices"
                />
                <Label
                  htmlFor="createInvoices"
                  className="cursor-pointer text-sm font-normal text-neutral-900"
                >
                  Create Invoices
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  className="border-neutral-300 text-white data-[state=checked]:border-blue-500 "
                  id="editInvoices"
                />
                <Label
                  htmlFor="editInvoices"
                  className="cursor-pointer text-sm font-normal text-neutral-900"
                >
                  Edit Invoices
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  className="border-neutral-300 text-white data-[state=checked]:border-blue-500 "
                  id="setupRecurringInvoices"
                />
                <Label
                  htmlFor="setupRecurringInvoices"
                  className="cursor-pointer text-sm font-normal text-neutral-900"
                >
                  Setup Recurring Invoices
                </Label>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-base font-semibold text-neutral-900">
              Clients
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  className="border-neutral-300 text-white data-[state=checked]:border-blue-500 "
                  id="viewClients"
                />
                <Label
                  htmlFor="viewClients"
                  className="cursor-pointer text-sm font-normal text-neutral-900"
                >
                  View Clients
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  className="border-neutral-300 text-white data-[state=checked]:border-blue-500 "
                  id="addClients"
                />
                <Label
                  htmlFor="addClients"
                  className="cursor-pointer text-sm font-normal text-neutral-900"
                >
                  Add Clients
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  className="border-neutral-300 text-white data-[state=checked]:border-blue-500 "
                  id="editClients"
                />
                <Label
                  htmlFor="editClients"
                  className="cursor-pointer text-sm font-normal text-neutral-900"
                >
                  Edit Clients
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  className="border-neutral-300 text-white data-[state=checked]:border-blue-500 "
                  id="deleteClients"
                />
                <Label
                  htmlFor="deleteClients"
                  className="cursor-pointer text-sm font-normal text-neutral-900"
                >
                  Delete Clients
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  className="border-neutral-300 text-white data-[state=checked]:border-blue-500 "
                  id="viewClientPolicies"
                />
                <Label
                  htmlFor="viewClientPolicies"
                  className="cursor-pointer text-sm font-normal text-neutral-900"
                >
                  View Client Policies
                </Label>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-base font-semibold text-neutral-900">
              Product Plans
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  className="border-neutral-300 text-white data-[state=checked]:border-blue-500 "
                  id="viewProducts"
                />
                <Label
                  htmlFor="viewProducts"
                  className="cursor-pointer text-sm font-normal text-neutral-900"
                >
                  View Products
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  className="border-neutral-300 text-white data-[state=checked]:border-blue-500 "
                  id="createProductPlans"
                />
                <Label
                  htmlFor="createProductPlans"
                  className="cursor-pointer text-sm font-normal text-neutral-900"
                >
                  Create Product Plans
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  className="border-neutral-300 text-white data-[state=checked]:border-blue-500 "
                  id="editProductPlans"
                />
                <Label
                  htmlFor="editProductPlans"
                  className="cursor-pointer text-sm font-normal text-neutral-900"
                >
                  Edit Product Plans
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  className="border-neutral-300 text-white data-[state=checked]:border-blue-500 "
                  id="deleteProductPlans"
                />
                <Label
                  htmlFor="deleteProductPlans"
                  className="cursor-pointer text-sm font-normal text-neutral-900"
                >
                  Delete Product Plans
                </Label>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-base font-semibold text-neutral-900">
              Documents Management
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  className="border-neutral-300 text-white data-[state=checked]:border-blue-500 "
                  id="uploadDocuments"
                />
                <Label
                  htmlFor="uploadDocuments"
                  className="cursor-pointer text-sm font-normal text-neutral-900"
                >
                  Upload Documents
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  className="border-neutral-300 text-white data-[state=checked]:border-blue-500 "
                  id="viewDocuments"
                />
                <Label
                  htmlFor="viewDocuments"
                  className="cursor-pointer text-sm font-normal text-neutral-900"
                >
                  View Documents
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  className="border-neutral-300 text-white data-[state=checked]:border-blue-500 "
                  id="deleteDocuments"
                />
                <Label
                  htmlFor="deleteDocuments"
                  className="cursor-pointer text-sm font-normal text-neutral-900"
                >
                  Delete Documents
                </Label>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-base font-semibold text-neutral-900">
              Team & User Management
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  className="border-neutral-300 text-white data-[state=checked]:border-blue-500 "
                  id="viewTeamMembers"
                />
                <Label
                  htmlFor="viewTeamMembers"
                  className="cursor-pointer text-sm font-normal text-neutral-900"
                >
                  View Team Members
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  className="border-neutral-300 text-white data-[state=checked]:border-blue-500 "
                  id="addTeamMembers"
                />
                <Label
                  htmlFor="addTeamMembers"
                  className="cursor-pointer text-sm font-normal text-neutral-900"
                >
                  Add Team Members
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  className="border-neutral-300 text-white data-[state=checked]:border-blue-500 "
                  id="editTeamMembers"
                />
                <Label
                  htmlFor="editTeamMembers"
                  className="cursor-pointer text-sm font-normal text-neutral-900"
                >
                  Edit Team Members
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  className="border-neutral-300 text-white data-[state=checked]:border-blue-500 "
                  id="assignRolesPermissions"
                />
                <Label
                  htmlFor="assignRolesPermissions"
                  className="cursor-pointer text-sm font-normal text-neutral-900"
                >
                  Assign Roles & Permissions
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  className="border-neutral-300 text-white data-[state=checked]:border-blue-500 "
                  id="viewAuditLogs"
                />
                <Label
                  htmlFor="viewAuditLogs"
                  className="cursor-pointer text-sm font-normal text-neutral-900"
                >
                  View Audit Logs
                </Label>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-base font-semibold text-neutral-900">
              Task & Collaboration
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  className="border-neutral-300 text-white data-[state=checked]:border-blue-500 "
                  id="viewTasks"
                />
                <Label
                  htmlFor="viewTasks"
                  className="cursor-pointer text-sm font-normal text-neutral-900"
                >
                  View Tasks
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  className="border-neutral-300 text-white data-[state=checked]:border-blue-500 "
                  id="assignTasks"
                />
                <Label
                  htmlFor="assignTasks"
                  className="cursor-pointer text-sm font-normal text-neutral-900"
                >
                  Assign Tasks
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  className="border-neutral-300 text-white data-[state=checked]:border-blue-500 "
                  id="editTasks"
                />
                <Label
                  htmlFor="editTasks"
                  className="cursor-pointer text-sm font-normal text-neutral-900"
                >
                  Edit Tasks
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  className="border-neutral-300 text-white data-[state=checked]:border-blue-500 "
                  id="markTasksComplete"
                />
                <Label
                  htmlFor="markTasksComplete"
                  className="cursor-pointer text-sm font-normal text-neutral-900"
                >
                  Mark Tasks Complete
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  className="border-neutral-300 text-white data-[state=checked]:border-blue-500 "
                  id="accessInternalMessaging"
                />
                <Label
                  htmlFor="accessInternalMessaging"
                  className="cursor-pointer text-sm font-normal text-neutral-900"
                >
                  Access Internal Messaging
                </Label>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-base font-semibold text-neutral-900">
              Settings & Configurations
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  className="border-neutral-300 text-white data-[state=checked]:border-blue-500 "
                  id="accessGeneralSettings"
                />
                <Label
                  htmlFor="accessGeneralSettings"
                  className="cursor-pointer text-sm font-normal text-neutral-900"
                >
                  Access General Settings
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  className="border-neutral-300 text-white data-[state=checked]:border-blue-500 "
                  id="modifySystemConfiguration"
                />
                <Label
                  htmlFor="modifySystemConfiguration"
                  className="cursor-pointer text-sm font-normal text-neutral-900"
                >
                  Modify System Configuration
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  className="border-neutral-300 text-white data-[state=checked]:border-blue-500 "
                  id="manageNotificationPreferences"
                />
                <Label
                  htmlFor="manageNotificationPreferences"
                  className="cursor-pointer text-sm font-normal text-neutral-900"
                >
                  Manage Notification Preferences
                </Label>
              </div>
            </div>
          </div>
        </div>
      </section>
       <div className="w-full h-[1px] bg-neutral-200 mt-8 mb-8"></div>
      <section>
        <h2 className="mb-1 text-2xl font-semibold text-neutral-900">
          Login & Security
        </h2>
        <p className="mb-6 text-sm text-neutral-500">Account access setup</p>

        <div className="space-y-4">
          <div>
            <Label
              htmlFor="tempPassword"
              className="text-sm font-medium text-neutral-900"
            >
              Temporary Password
            </Label>
            <Input
              id="tempPassword"
              type="password"
              className="mt-1.5 max-w-98 border-neutral-300 focus:border-neutral-300"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              className="border-neutral-300 text-white data-[state=checked]:border-blue-500 "
              id="sendWelcomeEmail"
            />
            <Label
              htmlFor="sendWelcomeEmail"
              className="cursor-pointer text-sm font-medium text-neutral-900"
            >
              Send Welcome Email
            </Label>
          </div>
        </div>
      </section>

      <div className="w-full h-[1px] bg-neutral-200 mt-8 mb-8"></div>

      <section>
        <h2 className="mb-1 text-2xl font-semibold text-neutral-900">Notes</h2>
        <p className="mb-6 text-sm text-neutral-500">
          Optional notes for admin use
        </p>

        <Textarea
          className="h-[72px] resize-none border-neutral-300 !ring-0"
          placeholder=""
        />
      </section>
      <div className="w-full h-[1px] bg-neutral-200 mt-8 mb-8"></div>

      <div className="flex gap-4">
        <Button className="cursor-pointer bg-blue-500 px-8 text-white hover:bg-blue-400">
          <CheckIcon className="h-9 w-9 text-white" />
          Save
        </Button>
        <Button
          variant="outline"
          className="cursor-pointer border-none bg-transparent px-8 text-neutral-900 shadow-none"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
