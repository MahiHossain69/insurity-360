"use client";

import TrustedBy from "@/components/scenes/auth/common/trustedBy";
import CreateAccount from "@/components/scenes/auth/register/createAccount";
import CreateProfile from "@/components/scenes/auth/register/createProfile";
import InviteUser from "@/components/scenes/auth/register/inviteUser";
import VerifyAccount from "@/components/scenes/auth/register/verifyAccount";
import registrationManager from "@/data/registration";
import { useRegistration } from "@/hooks/use-registration";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Step constants - moved from registration-steps.js
const STEP_CONSTANTS = {
  CREATE_ACCOUNT: 1,
  VERIFY_ACCOUNT: 2,
  CREATE_PROFILE: 3,
  INVITE_USER: 4,
};

export default function RegisterPage() {
  const router = useRouter();
  const { currentStep, isCompleted, goToPreviousStep, canGoPrevious } =
    useRegistration();
  const [isHydrated, setIsHydrated] = useState(false);

  // Handle hydration and completed registration
  useEffect(() => {
    // Hydrate client state to prevent SSR mismatch
    registrationManager.hydrate();
    setIsHydrated(true);

    if (isCompleted) {
      // Redirect to login page after successful registration
      router.push("/auth/login");
    }
  }, [isCompleted, router]);

  // Control browser back button navigation
  useEffect(() => {
    const handlePopState = (event) => {
      event.preventDefault();

      // If user can go to previous step, allow it
      if (canGoPrevious) {
        goToPreviousStep();
      } else {
        // If on first step, redirect to login page
        router.push("/auth/login");
      }
    };

    // Add current state to history to capture back button
    window.history.pushState({ step: currentStep }, "", window.location.href);

    // Listen for back button
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [currentStep, canGoPrevious, goToPreviousStep, router]);

  // Render current step component
  const renderCurrentStep = () => {
    switch (currentStep) {
      case STEP_CONSTANTS.CREATE_ACCOUNT:
        return <CreateAccount />;
      case STEP_CONSTANTS.VERIFY_ACCOUNT:
        return <VerifyAccount />;
      case STEP_CONSTANTS.CREATE_PROFILE:
        return <CreateProfile />;
      case STEP_CONSTANTS.INVITE_USER:
        return <InviteUser />;
      default:
        return <CreateAccount />; // Default to first step
    }
  };

  // Determine container width based on current step
  const getContainerWidth = () => {
    return currentStep >= 3 ? "max-w-[640px]" : "max-w-[480px]";
  };

  // Prevent rendering until hydrated to avoid SSR mismatch
  if (!isHydrated) {
    return (
      <div className={`mx-4 w-full ${getContainerWidth()} lg:mx-auto`}>
        <div className="authCardShadow flex flex-col gap-12 rounded-3xl border-0 bg-white p-16">
          <div className="flex items-center justify-center py-8">
            <div className="text-secondary600">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`mx-4 w-full ${getContainerWidth()} lg:mx-auto`}>
      <div className="authCardShadow flex flex-col gap-12 rounded-3xl border-0 bg-white p-8 md:p-12 lg:p-16">
        {renderCurrentStep()}
      </div>
      <TrustedBy className="mt-8" />
    </div>
  );
}
