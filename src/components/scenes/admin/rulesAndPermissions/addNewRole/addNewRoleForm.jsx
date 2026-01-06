"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

import { CheckIcon } from "@/components/shared/svgs";
import { Label } from "@/components/ui/label";
import { useRoles } from "@/contexts/RolesContext";
import { defaultNotifications, permissionGroups } from "@/data/add-new-role";
import { useRouter } from "next/navigation";

export default function AddNewRoleForm() {
  const router = useRouter();
  const { addRole, roles } = useRoles();
  const [roleName, setRoleName] = useState("");
  const [roleDescription, setRoleDescription] = useState("");
  const [permissions, setPermissions] = useState({});
  const [notifications, setNotifications] = useState(
    Object.fromEntries(defaultNotifications.map((n) => [n.key, false])),
  );

  const handleNotificationChange = (key, value) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handlePermissionChange = (permission, checked) => {
    setPermissions((prev) => ({ ...prev, [permission]: checked }));
  };

  const handleSave = () => {
    if (!roleName.trim()) {
      return;
    }

    const newRole = {
      role: roleName,
      assignedUsers: 0,
      description: roleDescription,
      permissions,
      notifications,
    };

    addRole(newRole);

    // Reset form
    setRoleName("");
    setRoleDescription("");
    setPermissions({});
    setNotifications(
      Object.fromEntries(defaultNotifications.map((n) => [n.key, false])),
    );

    router.push("/user-management/roles");
  };

  return (
    <div className="mt-12 max-w-200 space-y-8">
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-neutral-900">
          Role Information
        </h1>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="roleName"
              className="text-sm font-medium text-neutral-900"
            >
              Role Name
            </Label>
            <Input
              id="roleName"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              className="w-full border-neutral-300 focus:border-neutral-300"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="roleDescription"
              className="text-sm font-medium text-neutral-900"
            >
              Role Description{" "}
              <span className="-mt-2 text-[10px] font-semibold text-neutral-400 uppercase">
                OPTIONAL
              </span>
            </Label>
            <Textarea
              id="roleDescription"
              value={roleDescription}
              onChange={(e) => setRoleDescription(e.target.value)}
              className="min-h-[80px] w-full resize-none border-neutral-300 !ring-0"
            />
          </div>
        </div>
      </div>

      <div className="h-[1px] w-full bg-neutral-200"></div>

      <div className="space-y-6">
        <div>
          <h2 className="mb-2 text-2xl font-semibold text-neutral-900">
            Assign Permissions
          </h2>
          <p className="font-geist text-sm text-neutral-500">
            Select the permissions that apply to this role using a checkbox
            matrix.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {permissionGroups.map((group) => (
            <div key={group.title} className="space-y-4">
              <h3 className="text-lg font-semibold text-neutral-900">
                {group.title}
              </h3>
              <div className="space-y-3">
                {group.permissions.map((permission) => (
                  <div key={permission} className="flex items-center space-x-3">
                    <Checkbox
                      id={permission}
                      checked={permissions[permission] || false}
                      onCheckedChange={(checked) =>
                        handlePermissionChange(permission, checked)
                      }
                      className="border-neutral-300 text-white data-[state=checked]:bg-blue-500"
                    />
                    <Label
                      htmlFor={permission}
                      className="cursor-pointer text-sm leading-tight text-neutral-900"
                    >
                      {permission}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="h-[1px] w-full bg-neutral-200"></div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-neutral-900">
          Default Notification Settings
        </h2>

        {defaultNotifications.map((n) => (
          <div key={n.key} className="flex items-center space-x-3">
            <Label
              htmlFor={n.key}
              className="relative inline-flex cursor-pointer items-center"
            >
              <Input
                type="checkbox"
                id={n.key}
                checked={notifications[n.key] || false}
                onChange={(e) =>
                  handleNotificationChange(n.key, e.target.checked)
                }
                className="peer sr-only cursor-pointer"
              />
              <div className="h-5 w-9 rounded-full border border-neutral-300 bg-white transition-colors duration-200 ease-in-out peer-checked:bg-blue-500"></div>
              <div className="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-neutral-300 shadow-md transition-transform duration-200 ease-in-out peer-checked:translate-x-4 peer-checked:bg-white"></div>
            </Label>

            <Label
              htmlFor={n.key}
              className="font-geist cursor-pointer text-sm text-neutral-900"
            >
              {n.label}
            </Label>
          </div>
        ))}
      </div>
      <div className="h-[1px] w-full bg-neutral-200"></div>

      <div className="flex gap-4">
        <Button
          className="w-23 bg-blue-500 text-white hover:bg-blue-400"
          onClick={handleSave}
        >
          <CheckIcon className="h-9 w-9 text-white" />
          Save
        </Button>
        <Button
          variant="outline"
          className="border-none bg-transparent px-8 text-neutral-900 shadow-none"
          onClick={() => router.push("/user-management/roles")}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
