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
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Validation schema
const setNewPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
      ),
    confirmPassword: z
      .string()
      .min(1, "Confirm password is required")
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
const SetNewPassword = ({ onComplete, formData }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with validation
  const formMethods = useForm({
    resolver: zodResolver(setNewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // Watch password field for strength calculation
  const password = formMethods.watch("password");

  // Calculate password strength (0-4)
  const passwordStrength = useMemo(() => {
    if (!password) return 0;

    // Check for required character types
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[@$!%*?&]/.test(password);

    // Count character types
    const characterTypes = [
      hasLowercase,
      hasUppercase,
      hasNumber,
      hasSymbol,
    ].filter(Boolean).length;

    // Length check
    const hasMinLength = password.length >= 8;
    const hasGoodLength = password.length >= 12;

    // Determine strength based on character types and length
    if (!hasMinLength) return 0; // Very Weak - too short
    if (characterTypes === 1) return 1; // Weak - only one type
    if (characterTypes === 2) return 2; // Fair - two types
    if (characterTypes === 3) return 3; // Good - three types
    if (characterTypes === 4 && hasGoodLength) return 4; // Strong - all types + good length
    if (characterTypes === 4) return 3; // Good - all types but short

    return 1; // Default to weak
  }, [password]);

  // Get strength color and text
  const getStrengthInfo = (strength) => {
    switch (strength) {
      case 0:
        return { color: "bg-red-500", text: "Very Weak" };
      case 1:
        return { color: "bg-red-400", text: "Weak" };
      case 2:
        return { color: "bg-yellow-500", text: "Fair" };
      case 3:
        return { color: "bg-blue-500", text: "Good" };
      case 4:
        return { color: "bg-green-500", text: "Strong" };
      default:
        return { color: "bg-gray-200", text: "" };
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // TODO: Implement password reset API call
      console.log("Password reset request:", data);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // TODO: Handle success response
      onComplete(data);
    } catch (error) {
      console.error("Password reset error:", error);
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
          <h1 className="text-2xl font-bold">Set new password</h1>
          <p className="text-secondary600">
            Use at least 8 characters with a mix of letters, numbers, and
            symbols. Avoid easy-to-guess details.
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Type your password"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    {/* Password Strength indicator */}
                    <div className="mt-2 space-y-2">
                      <div className="grid w-full grid-cols-4 gap-1">
                        {[1, 2, 3, 4].map((level) => (
                          <div
                            key={level}
                            className={`h-1 rounded-full transition-colors duration-200 ${
                              level <= passwordStrength
                                ? getStrengthInfo(passwordStrength).color
                                : "bg-dark/4"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formMethods.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Retype your password"
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

export default SetNewPassword;
