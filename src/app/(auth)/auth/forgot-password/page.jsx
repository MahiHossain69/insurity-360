"use client";

import ForgotPassword from "@/components/scenes/auth/forgot-password/forgotPassword";
import PasswordReset from "@/components/scenes/auth/forgot-password/passwordReset";
import SetNewPassword from "@/components/scenes/auth/forgot-password/setNewPassword";
import ResetDone from "@/components/scenes/auth/forgot-password/resetDone";
import TrustedBy from "@/components/scenes/auth/common/trustedBy";
import { useState } from "react";

const ForgotPasswordPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleStepComplete = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
    setCurrentStep(prev => prev + 1);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <ForgotPassword onComplete={handleStepComplete} />;
      case 2:
        return <PasswordReset onComplete={handleStepComplete} formData={formData} />;
      case 3:
        return <SetNewPassword onComplete={handleStepComplete} formData={formData} />;
      case 4:
        return <ResetDone />;
      default:
        return <ForgotPassword onComplete={handleStepComplete} />;
    }
  };

  return (
    <div className={`mx-4 w-full max-w-[480px] lg:mx-auto`}>
      <div className="authCardShadow flex flex-col gap-12 rounded-3xl border-0 bg-white p-8 md:p-12 lg:p-16">
        {renderCurrentStep()}
      </div>
      <TrustedBy className="mt-8" />
    </div>
  );
};

export default ForgotPasswordPage;
