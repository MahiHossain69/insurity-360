"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRegistration } from "@/hooks/use-registration";
import { createAccountSchema } from "@/schemas/registration";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const CreateAccount = () => {
  const {
    state,
    updateData,
    submitStep,
    isSubmitting,
    errors,
    clearErrors,
    getFieldValue,
  } = useRegistration();

  // Initialize form with validation and existing data
  const formMethods = useForm({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      email: getFieldValue("email") || "",
      phone: getFieldValue("phone") || "",
    },
  });

  // Update form when registration state changes
  useEffect(() => {
    formMethods.reset({
      email: getFieldValue("email") || "",
      phone: getFieldValue("phone") || "",
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
    await submitStep(formData, 1);
  };

  return (
    <div className="space-y-12">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Create account</h1>
        <p>Enter your credentials to access your account</p>
      </div>
      <div>
        <Form {...formMethods}>
          <form
            onSubmit={formMethods.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={formMethods.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="admin@example.com"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={formMethods.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number </FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="+1234567890"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="hover:bg-primary-dark w-full cursor-pointer font-semibold text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending OTP..." : "Send OTP"}
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center md:mt-8 lg:mt-12">
          <p className="text-muted-foreground text-sm">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-primary font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
