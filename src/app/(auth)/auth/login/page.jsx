"use client";

import TrustedBy from "@/components/scenes/auth/common/trustedBy";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAdminSignIn } from "@/hooks/use-admin";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Validation schema
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional().default(false),
});

export default function LoginPage() {
  const router = useRouter();
  const { signIn, isLoading, data } = useAdminSignIn();
  const [showPassword, setShowPassword] = useState(false);

  // Initialize form with validation
  const formMethods = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // Handle successful login
  useEffect(() => {
    if (data?.success && data?.token) {
      // Store token in localStorage or cookies
      localStorage.setItem("admin_token", data.token);
      // Redirect to dashboard
      router.push("/dashboard");
    }
  }, [data, router]);

  const onSubmit = (formData) => {
    signIn(formData);
  };

  return (
    <div className="mx-4 w-full max-w-[480px] lg:mx-auto">
      <div className="authCardShadow flex flex-col gap-12 rounded-3xl border-0 bg-white p-8 md:p-12 lg:p-16">
        <div>
          <h1 className="text-2xl font-bold">Login</h1>
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
                        placeholder="yourname@mail.com"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={formMethods.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="• • • • • • • •"
                          {...field}
                          disabled={isLoading}
                          className="pr-8"
                        />
                        <Button
                          type="button"
                          className="absolute top-1/2 right-2 flex h-4 w-4 -translate-y-1/2 cursor-pointer items-center justify-center bg-transparent !px-0 py-0 shadow-none hover:bg-transparent focus-visible:ring-0"
                          onClick={() => {
                            setShowPassword(!showPassword);
                          }}
                        >
                          {showPassword ? (
                            <EyeOff className="text-secondary600 h-4 w-4" />
                          ) : (
                            <Eye className="text-secondary600 h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex w-full items-center justify-between gap-4 pt-2">
                <FormField
                  control={formMethods.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex items-center">
                      <div className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="text-dark/32 h-4 w-4 rounded-sm data-[sate=checked]:text-white"
                          />
                        </FormControl>
                        <FormLabel className="text-sm text-neutral-400">
                          Remember me
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <Link
                  href="/auth/forgot-password"
                  className="text-primary-dark text-sm text-nowrap hover:underline"
                >
                  Forgot password
                </Link>
              </div>

              <div className="mt-2 flex flex-col gap-2">
                <Button
                  type="submit"
                  className="hover:bg-primary-dark mt-2 w-full cursor-pointer font-semibold text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
        <div className="mt-6 space-y-2 text-center">
          <p className="text-muted-foreground text-sm">
            New here? Then &nbsp;
            <Link
              href="/auth/register"
              className="text-primary font-medium hover:underline"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
      <TrustedBy className="mt-8" />
    </div>
  );
}
