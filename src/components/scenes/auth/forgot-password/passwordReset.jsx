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
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Validation schema for OTP
const otpSchema = z.object({
  otp: z.string().min(4, "Please enter the 4-digit verification code"),
});

const PasswordReset = ({ onComplete, formData }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with validation
  const formMethods = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // TODO: Implement OTP verification API call
      console.log("OTP verification:", data);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // TODO: Handle success response
      onComplete(data);
    } catch (error) {
      console.error("OTP verification error:", error);
      // TODO: Handle error response
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    // TODO: Implement back navigation if needed
    console.log("Back button clicked");
  };

  return (
    <div>
      <div className="space-y-12">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Password reset</h1>
          <p className="text-secondary600">
            A verification code has been sent to{" "}
            <span className="text-dark font-medium">
              {formData?.email || "your email"}
            </span>
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
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Verification Code</FormLabel> */}
                    <FormControl>
                      <InputOTP
                        maxLength={4}
                        {...field}
                        disabled={isSubmitting}
                      >
                        <InputOTPGroup className="grid w-full grid-cols-4 gap-3">
                          <InputOTPSlot
                            index={0}
                            className="border-dark/8 border-b-dark/32 ho focus:border-b-primary-dark data-[active=true]:border-primary-dark h-12 !w-full rounded-sm border data-[active=true]:!border-b-2 data-[active=true]:shadow-[0px_0px_0px_4px_rgba(91,101,249,0.16)] data-[active=true]:ring-0"
                          />
                          <InputOTPSlot
                            index={1}
                            className="border-dark/8 border-b-dark/32 ho focus:border-b-primary-dark data-[active=true]:border-primary-dark h-12 !w-full rounded-sm border data-[active=true]:!border-b-2 data-[active=true]:shadow-[0px_0px_0px_4px_rgba(91,101,249,0.16)] data-[active=true]:ring-0"
                          />
                          <InputOTPSlot
                            index={2}
                            className="border-dark/8 border-b-dark/32 ho focus:border-b-primary-dark data-[active=true]:border-primary-dark h-12 !w-full rounded-sm border data-[active=true]:!border-b-2 data-[active=true]:shadow-[0px_0px_0px_4px_rgba(91,101,249,0.16)] data-[active=true]:ring-0"
                          />
                          <InputOTPSlot
                            index={3}
                            className="border-dark/8 border-b-dark/32 ho focus:border-b-primary-dark data-[active=true]:border-primary-dark h-12 !w-full rounded-sm border data-[active=true]:!border-b-2 data-[active=true]:shadow-[0px_0px_0px_4px_rgba(91,101,249,0.16)] data-[active=true]:ring-0"
                          />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col space-y-3">
                <Button
                  type="submit"
                  className="hover:bg-primary-dark w-full cursor-pointer"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Verifying..." : "Continue"}
                </Button>
                <Button
                  type="button"
                  className="text-dark mx-auto w-fit cursor-pointer rounded-none bg-transparent text-sm shadow-none hover:bg-transparent"
                  onClick={handleBack}
                  disabled={isSubmitting}
                >
                  <ArrowLeft className="h-4 w-4" /> Back to login
                </Button>
              </div>
            </form>
          </Form>

          <div className="mt-6 text-center md:mt-8 lg:mt-12">
            <p className="text-muted-foreground text-sm">
              Didn't receive the code?{" "}
              <Button className="text-primary bg-transparent !px-0 py-0 font-medium shadow-none hover:bg-transparent hover:underline">
                Click here to resend it
              </Button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
