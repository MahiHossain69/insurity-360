import { useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { permissionGroups, defaultNotifications } from "@/data/add-new-role";

export const useAddRoleForm = () => {
  // Build default maps for permissions and notifications
  const defaultPermissions = useMemo(() => {
    const map = {};
    permissionGroups.forEach((group) => {
      group.permissions.forEach((p) => {
        map[p] = false;
      });
    });
    return map;
  }, []);

  const defaultNotificationMap = useMemo(() => {
    const map = {};
    defaultNotifications.forEach((n) => {
      map[n.key] = false;
    });
    return map;
  }, []);

  const {
    control,
    register,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      roleName: "",
      roleDescription: "",
      permissions: defaultPermissions,
      notifications: defaultNotificationMap,
    },
    mode: "onChange",
  });

  const [submitted, setSubmitted] = useState(false);

  const computeFormError = () => {
    const values = getValues();
    if (!values.roleName || !values.roleName.trim()) {
      return "Role name is required.";
    }
    const hasAnyPermission = Object.values(values.permissions || {}).some(
      (v) => !!v,
    );
    if (!hasAnyPermission) {
      return "Select at least one permission for the role.";
    }
    return null;
  };

  const handleSave = () => {
    setSubmitted(true);
    const err = computeFormError();
    if (err) {
      toast.error(err);
      return;
    }
    const values = getValues();
    // Prepare payload
    const selectedPermissions = Object.entries(values.permissions || {})
      .filter(([, checked]) => checked)
      .map(([key]) => key);
    const selectedNotifications = Object.entries(values.notifications || {})
      .filter(([, checked]) => checked)
      .map(([key]) => key);

    const payload = {
      name: values.roleName.trim(),
      description: values.roleDescription?.trim() || "",
      permissions: selectedPermissions,
      notifications: selectedNotifications,
    };

    // For now, just show success feedback and reset; wire API later
    toast.success("Role configuration saved (local only).");
    reset();
    setSubmitted(false);
    return payload;
  };

  return {
    control,
    register,
    getValues,
    reset,
    errors,
    submitted,
    computeFormError,
    handleSave,
  };
};

export default useAddRoleForm;