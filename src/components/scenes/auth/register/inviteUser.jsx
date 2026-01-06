"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useRegistration } from "@/hooks/use-registration";
import { inviteUserSchema } from "@/schemas/registration";
import { zodResolver } from "@hookform/resolvers/zod";
import { Info } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const InviteUser = () => {
  const router = useRouter();
  const {
    state,
    updateData,
    submitStep,
    isSubmitting,
    errors,
    clearErrors,
    getFieldValue,
    goToPreviousStep,
    canGoPrevious,
  } = useRegistration();

  // Helper function to ensure inviteEmails is always an array
  const normalizeInviteEmails = (value) => {
    if (Array.isArray(value)) return value;
    if (typeof value === "string") {
      return value
        ? value
            .split(",")
            .map((email) => email.trim())
            .filter((email) => email)
        : [];
    }
    return [];
  };

  // Initialize form with validation and existing data
  const formMethods = useForm({
    resolver: zodResolver(inviteUserSchema),
    defaultValues: {
      inviteEmails: normalizeInviteEmails(getFieldValue("inviteEmails")),
      inviteRole: getFieldValue("inviteRole") || "member",
    },
  });

  // Update form when registration state changes
  useEffect(() => {
    formMethods.reset({
      inviteEmails: normalizeInviteEmails(getFieldValue("inviteEmails")),
      inviteRole: getFieldValue("inviteRole") || "member",
    });
  }, [state, formMethods, getFieldValue]);

  // Clear errors when form values change
  useEffect(() => {
    const subscription = formMethods.watch(() => {
      if (Object.keys(errors).length > 0) {
        clearErrors();
      }
    });
    return () => subscription.unsubscribe();
  }, [errors, clearErrors]);

  // Set form errors from registration state
  useEffect(() => {
    if (errors && Object.keys(errors).length > 0) {
      Object.entries(errors).forEach(([field, message]) => {
        if (formMethods.getValues(field) !== undefined) {
          formMethods.setError(field, {
            type: "manual",
            message: message,
          });
        }
      });
    }
  }, [errors]);

  const onSubmit = async (formData) => {
    // Update registration data and submit step
    updateData(formData);
    await submitStep(formData, 4);
  };

  const handleSkip = () => {
    // Skip invitation step and redirect to login
    router.push("/auth/login");
  };

  const handleBack = () => {
    if (canGoPrevious) {
      goToPreviousStep();
    }
  };

  return (
    <div>
      <div className="space-y-12">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Invite Users</h1>
          <p className="text-secondary600">
            Invite team members to join your workspace
          </p>
        </div>
        <div>
          <Form {...formMethods}>
            <form
              onSubmit={formMethods.handleSubmit(onSubmit)}
              className="space-y-3"
            >
              <FormField
                control={formMethods.control}
                name="inviteRole"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger
                          className="w-full"
                          disabled={isSubmitting}
                        >
                          <SelectValue placeholder="User Role" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="member">Member</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formMethods.control}
                name="inviteEmails"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Enter email addresses separated by commas"
                        value={
                          Array.isArray(field.value)
                            ? field.value.join(", ")
                            : field.value || ""
                        }
                        onChange={(e) => {
                          const emails = e.target.value
                            .split(",")
                            .map((email) => email.trim())
                            .filter((email) => email);
                          field.onChange(emails);
                        }}
                        disabled={isSubmitting}
                        className="h-16"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex w-fit cursor-pointer items-center gap-1 select-none">
                <Info className="text-secondary-accent h-auto w-4" />{" "}
                <p>Add multiple emails by separating them with (,) comas</p>
              </div>

              <div className="mt-12 flex flex-col">
                <Button
                  type="submit"
                  className="hover:bg-primary-dark w-full cursor-pointer"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending request..." : "Send request"}
                </Button>

                <Button
                  type="button"
                  className="text-dark mx-auto w-fit cursor-pointer rounded-none bg-transparent text-sm font-semibold shadow-none hover:bg-transparent"
                  onClick={handleSkip}
                  disabled={isSubmitting}
                >
                  Skip now
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default InviteUser;
