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
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Validation schema
const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});
const ForgotPassword = ({ onComplete }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with validation
  const formMethods = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      // TODO: Implement forgot password API call
      console.log("Forgot password request:", formData);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // TODO: Handle success response
      onComplete(formData);
    } catch (error) {
      console.error("Forgot password error:", error);
      // TODO: Handle error response
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToLogin = () => {
    router.push("/auth/login");
  };

  return (
    <div>
      <div className="space-y-12">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Forgot password?</h1>
          <p className="text-secondary600">
            No worries, we'll send you reset instructions.
          </p>
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
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input
                        type="resetEmail"
                        placeholder="yourname@mail.com"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col space-y-3">
                <Button
                  type="submit"
                  className="hover:bg-primary-dark w-full cursor-pointer font-semibold text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Resetting..." : "Reset Password"}
                </Button>
                <Button
                  type="button"
                  className="text-dark mx-auto w-fit cursor-pointer rounded-none bg-transparent text-sm shadow-none hover:bg-transparent"
                  onClick={handleBackToLogin}
                  disabled={isSubmitting}
                >
                  <ArrowLeft className="h-4 w-4" /> Back to login
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
