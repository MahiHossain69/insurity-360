import adminService from "@/services/admin-service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useMutationForm } from "@/hooks/use-mutation-form";

// Authentication hooks
export const useAdminSignUp = () => {
  const { form, mutate, isLoading, error, data } = useMutationForm({
    mutationFn: adminService.signUp,
    onSuccess: () => {
      toast.success("Admin registered successfully!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Registration failed");
    },
  });
  return { form, signUp: mutate, isLoading, error, data };
};

export const useAdminSignIn = () => {
  const queryClient = useQueryClient();
  const { form, mutate, isLoading, error, data } = useMutationForm({
    mutationFn: adminService.signIn,
    onSuccess: () => {
      toast.success("Signed in successfully!");
      queryClient.invalidateQueries({ queryKey: ["admin", "profile"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Sign in failed");
    },
  });
  return { form, signIn: mutate, isLoading, error, data };
};

export const useForgotPassword = () => {
  const { form, mutate, isLoading, error } = useMutationForm({
    mutationFn: adminService.forgotPassword,
    onSuccess: () => {
      toast.success("Password reset email sent!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to send reset email");
    },
  });
  return { form, forgotPassword: mutate, isLoading, error };
};

export const useResetPassword = () => {
  const { form, mutate, isLoading, error } = useMutationForm({
    mutationFn: ({ token, newPassword }) => adminService.resetPassword(token, newPassword),
    onSuccess: () => {
      toast.success("Password reset successfully!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Password reset failed");
    },
  });
  return { form, resetPassword: mutate, isLoading, error };
};

// Profile hooks
export const useAdminProfile = () => {
  return useQuery({
    queryKey: ["admin", "profile"],
    queryFn: adminService.getProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useUpdateAdminProfile = () => {
  const queryClient = useQueryClient();
  const { form, mutate, isLoading, error } = useMutationForm({
    mutationFn: adminService.updateProfile,
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["admin", "profile"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Profile update failed");
    },
  });
  return { form, updateProfile: mutate, isLoading, error };
};

// Login history
export const useAdminLoginHistory = () => {
  return useQuery({
    queryKey: ["admin", "loginHistory"],
    queryFn: adminService.getLoginHistory,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Logout
export const useAdminLogout = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: adminService.logout,
    onSuccess: () => {
      toast.success("Logged out successfully!");
      queryClient.clear();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Logout failed");
    },
  });

  return {
    logout: mutation.mutate,
    isLoading: mutation.isPending,
  };
};

// Super Admin hooks
export const useAllAdmins = () => {
  return useQuery({
    queryKey: ["admin", "all"],
    queryFn: adminService.getAllAdmins,
    staleTime: 5 * 60 * 1000,
  });
};

export const useSingleAdmin = (adminId) => {
  return useQuery({
    queryKey: ["admin", adminId],
    queryFn: () => adminService.getSingleAdmin(adminId),
    enabled: !!adminId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useUpdateAdmin = () => {
  const queryClient = useQueryClient();
  const { form, mutate, isLoading, error } = useMutationForm({
    mutationFn: ({ adminId, adminData }) => adminService.updateAdmin(adminId, adminData),
    onSuccess: (_, { adminId }) => {
      toast.success("Admin updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["admin", "all"] });
      queryClient.invalidateQueries({ queryKey: ["admin", adminId] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Admin update failed");
    },
  });
  return { form, updateAdmin: mutate, isLoading, error };
};

export const useDeleteAdmin = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: adminService.deleteAdmin,
    onSuccess: () => {
      toast.success("Admin deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["admin", "all"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Admin deletion failed");
    },
  });

  return {
    deleteAdmin: mutation.mutate,
    isLoading: mutation.isPending,
  };
};
