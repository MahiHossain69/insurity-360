import usersService from "@/services/users-service";
import { toast } from "sonner";
import { useMutationForm } from "@/hooks/use-mutation-form";

export const useUserRegister = () => {
  const { form, mutate, isLoading, error, data } = useMutationForm({
    mutationFn: usersService.registerUser,
    onSuccess: () => {
      toast.success(
        "User registered successfully! Please check your email for verification.",
      );
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Registration failed");
    },
  });

  return { form, registerUser: mutate, isLoading, error, data };
};

export const useUserLogin = () => {
  const { form, mutate, isLoading, error, data } = useMutationForm({
    mutationFn: usersService.loginUser,
    onSuccess: () => {
      toast.success("Logged in successfully!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Login failed");
    },
  });

  return { form, loginUser: mutate, isLoading, error, data };
};
