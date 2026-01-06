"use client";

import { EditPencil } from "@/components/shared/svgs";
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
import { createProfileSchema } from "@/schemas/registration";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

const CreateProfile = () => {
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

  // State for image upload
  const [profileImage, setProfileImage] = useState(
    getFieldValue("profileImage") || null,
  );
  const fileInputRef = useRef(null);

  // Initialize form with validation and existing data
  const formMethods = useForm({
    resolver: zodResolver(createProfileSchema),
    defaultValues: {
      name: getFieldValue("name") || "",
    },
  });

  // Update form when registration state changes
  useEffect(() => {
    formMethods.reset({
      name: getFieldValue("name") || "",
    });
    setProfileImage(getFieldValue("profileImage") || null);
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

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataUrl = e.target.result;
        setProfileImage(imageDataUrl);
        updateData({ profileImage: imageDataUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  // Get avatar display content
  const getAvatarContent = () => {
    if (profileImage) {
      return (
        <img
          src={profileImage}
          alt="Profile"
          className="h-full w-full rounded-full object-cover"
        />
      );
    }

    const name = getFieldValue("name") || "";
    if (name && name.trim()) {
      return name.charAt(0).toUpperCase();
    }

    return "A";
  };

  const onSubmit = async (formData) => {
    // Include profile image in form data
    const completeFormData = {
      ...formData,
      profileImage,
    };
    // Update registration data and submit step
    updateData(completeFormData);
    await submitStep(completeFormData, 3);
  };

  return (
    <div>
      <div className="space-y-12">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Create profile</h1>
          <p className="text-secondary600">
            Provide the details below to set up your first company{" "}
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your name"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <hr className="border-dark/16 my-6 border-dashed" />

              <div className="flex items-center gap-4">
                <div
                  className={`border-primary-accent bg-primary-accent-light relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed text-[32px] select-none`}
                >
                  {getAvatarContent()}
                  <Button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-primary-accent hover:bg-primary-light absolute right-0 bottom-0 h-6 w-6 cursor-pointer rounded-full bg-white"
                  >
                    <EditPencil className="!h-auto !w-3.5" />
                  </Button>
                </div>

                <div>
                  <p className="font-medium text-neutral-400">Upload a logo</p>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              <div className="mt-12">
                <Button
                  type="submit"
                  className="hover:bg-primary-dark w-full cursor-pointer"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating Profile..." : "Let's Create"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;
