import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

export function useMutationForm({ mutationFn, onSuccess, onError } = {}) {
  const form = useForm();

  const mutation = useMutation({
    mutationFn,
    onSuccess: (data, variables, context) => {
      try {
        if (typeof onSuccess === "function") onSuccess(data, variables, context);
      } finally {
        form.reset();
      }
    },
    onError: (error) => {
      if (typeof onError === "function") onError(error);
    },
  });

  return {
    form,
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
    data: mutation.data,
  };
}

export default useMutationForm;