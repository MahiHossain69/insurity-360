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
import { useRegistration } from "@/hooks/use-registration";
import { verifyAccountSchema } from "@/schemas/registration";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const VerifyAccount = () => {
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

  // Initialize form with validation and existing data
  const formMethods = useForm({
    resolver: zodResolver(verifyAccountSchema),
    defaultValues: {
      otp: getFieldValue("otp") || "",
    },
  });

  // Update form when registration state changes
  useEffect(() => {
    formMethods.reset({
      otp: getFieldValue("otp") || "",
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
    await submitStep(formData, 2);
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
          <h1 className="text-2xl font-bold">Verify account</h1>
          <p className="text-secondary600">
            A verification code has been sent to{" "}
            <span className="text-dark font-medium">
              {getFieldValue("email") || "your email"}
            </span>{" "}
            &{" "}
            <span className="text-dark font-medium">
              {getFieldValue("phone") || "your phone"}
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
                  disabled={isSubmitting || !canGoPrevious}
                >
                  <ArrowLeft className="h-4 w-4" /> Back
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

export default VerifyAccount;
