import registrationManager from "@/data/registration";
import { registrationSteps } from "@/schemas/registration";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
// Step navigation functions - moved from registration-steps.js
const TOTAL_STEPS = 4;

const getNextStep = (currentStep) => {
  if (currentStep < TOTAL_STEPS) {
    return currentStep + 1;
  }
  return "LOGIN"; // Indicates redirect to login
};

const getPreviousStep = (currentStep) => {
  if (currentStep > 1) {
    return currentStep - 1;
  }
  return null;
};

const isValidStep = (stepNumber) => {
  return stepNumber >= 1 && stepNumber <= TOTAL_STEPS;
};

const shouldRedirectToLogin = (currentStep) => {
  return currentStep > TOTAL_STEPS;
};

const getTotalSteps = () => {
  return TOTAL_STEPS;
};

const calculateProgress = (currentStep) => {
  return Math.round((currentStep / TOTAL_STEPS) * 100);
};

const getStepConfig = (stepNumber) => {
  const configs = {
    1: { id: 1, name: "create_account", title: "Create Account" },
    2: { id: 2, name: "verify_account", title: "Verify Account" },
    3: { id: 3, name: "create_profile", title: "Create Profile" },
    4: { id: 4, name: "invite_user", title: "Invite Users" },
  };
  return configs[stepNumber] || null;
};

/**
 * Custom hook for managing multi-step registration process
 * Provides state management, step navigation, validation, and API integration
 */
export const useRegistration = () => {
  // Local state for React re-renders
  const [state, setState] = useState(() => ({
    ...registrationManager.getState(),
    isSubmitting: false,
  }));
  const [isHydrated, setIsHydrated] = useState(false);
  const unsubscribeRef = useRef(null);

  // Subscribe to registration manager state changes
  useEffect(() => {
    // Hydrate on client mount to prevent SSR mismatch
    if (!isHydrated) {
      registrationManager.hydrate();
      setState((prev) => ({
        ...registrationManager.getState(),
        isSubmitting: prev.isSubmitting,
      }));
      setIsHydrated(true);
    }

    // Subscribe to state changes
    const unsubscribe = registrationManager.subscribe((newState) => {
      setState((prev) => ({ ...newState, isSubmitting: prev.isSubmitting }));
    });

    unsubscribeRef.current = unsubscribe;

    // Cleanup subscription on unmount
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, [isHydrated]);

  // API mutation for step submission (simulated)
  const stepMutation = {
    isPending: false,
    error: null,
    reset: () => {},
    mutateAsync: async ({ stepData, step }) => {
      // Simulate API call with delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // Always return success for simulation
      return { success: true };
    },
  };

  // Update registration data
  const updateData = useCallback((data, step = null) => {
    registrationManager.updateData(data, step);
  }, []);

  // Update specific field
  const updateField = useCallback((fieldName, value) => {
    registrationManager.updateData({ [fieldName]: value });
  }, []);

  // Navigate to specific step
  const goToStep = useCallback((step) => {
    if (registrationManager.isStepAccessible(step)) {
      registrationManager.setCurrentStep(step);
      return true;
    }
    return false;
  }, []);

  // Navigate to next step
  const goToNextStep = useCallback(() => {
    const nextStep = getNextStep(state.currentStep);
    if (nextStep) {
      if (shouldRedirectToLogin(nextStep)) {
        // Mark registration as complete to trigger redirect to login
        registrationManager.markCompleted();
      } else {
        registrationManager.setCurrentStep(nextStep);
      }
      return nextStep;
    }
    return null;
  }, [state.currentStep]);

  // Navigate to previous step
  const goToPreviousStep = useCallback(() => {
    const previousStep = getPreviousStep(state.currentStep);
    if (previousStep) {
      registrationManager.setCurrentStep(previousStep);
      return previousStep;
    }
    return null;
  }, [state.currentStep]);

  // Validate current step
  const validateStep = useCallback((step = null) => {
    return registrationManager.validateStep(step);
  }, []);

  // Submit current step
  const submitStep = useCallback(
    async (stepData = null, step = null) => {
      const currentStep = step || state.currentStep;

      // Set submitting state
      setState((prev) => ({ ...prev, isSubmitting: true }));

      try {
        // Use provided data or get from manager
        const dataToSubmit =
          stepData || registrationManager.getStepData(currentStep);

        // Validate step data before submission
        const validation = registrationManager.validateStep(currentStep);
        if (!validation.success) {
          toast.error("Please fix the errors before continuing");
          return { success: false, errors: validation.errors };
        }

        // Update local state with the data
        if (stepData) {
          registrationManager.updateData(stepData);
        }

        // Simulate API call with delay (no actual network request)
        // Simulate loading state
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Simulate successful response
        if (currentStep === 1) {
          toast.success(
            "Account created successfully! Please check your email for verification code.",
          );
          goToNextStep();
        } else if (currentStep === 2) {
          toast.success(
            "Account verified successfully! Please complete your profile.",
          );
          goToNextStep();
        } else if (currentStep === 3) {
          toast.success(
            "Profile created successfully! Welcome to Insurity Admin.",
          );
          goToNextStep();
        } else if (currentStep === 4) {
          toast.success(
            "Invitations sent successfully! Welcome to Insurity Admin.",
          );
          registrationManager.markCompleted();
        }

        return { success: true };
      } catch (error) {
        return { success: false, error };
      } finally {
        // Reset submitting state
        setState((prev) => ({ ...prev, isSubmitting: false }));
      }
    },
    [state.currentStep, goToNextStep],
  );

  // Reset registration
  const reset = useCallback(() => {
    registrationManager.reset();
    stepMutation.reset();
  }, [stepMutation]);

  // Clear registration data
  const clear = useCallback(() => {
    registrationManager.clear();
    stepMutation.reset();
  }, [stepMutation]);

  // Set form errors
  const setErrors = useCallback((errors) => {
    registrationManager.setErrors(errors);
  }, []);

  // Clear form errors
  const clearErrors = useCallback(() => {
    registrationManager.clearErrors();
  }, []);

  // Get current step configuration
  const getCurrentStepConfig = useCallback(() => {
    return getStepConfig(state.currentStep);
  }, [state.currentStep]);

  // Check if step is accessible
  const isStepAccessible = useCallback((step) => {
    return registrationManager.isStepAccessible(step);
  }, []);

  // Get registration progress
  const getProgress = useCallback(() => {
    return registrationManager.getProgress();
  }, []);

  // Check if registration is complete
  const isComplete = useCallback(() => {
    return registrationManager.isCompleted();
  }, []);

  // Get step data for form initialization
  const getStepData = useCallback((step = null) => {
    return registrationManager.getStepData(step);
  }, []);

  // Get field value
  const getFieldValue = useCallback((fieldName) => {
    return registrationManager.getField(fieldName);
  }, []);

  // Check if we can go to next step
  const canGoNext = useCallback(() => {
    const nextStep = getNextStep(state.currentStep);
    return nextStep !== null && !stepMutation.isPending;
  }, [state.currentStep, stepMutation.isPending]);

  // Check if we can go to previous step
  const canGoPrevious = useCallback(() => {
    const prevStep = getPreviousStep(state.currentStep);
    return prevStep !== null && !stepMutation.isPending;
  }, [state.currentStep, stepMutation.isPending]);

  // Get summary for debugging
  const getSummary = useCallback(() => {
    return registrationManager.getSummary();
  }, []);

  return {
    // State
    state,
    currentStep: state.currentStep,
    errors: state.errors || {},
    isCompleted: state.isCompleted,

    // Step configuration
    steps: registrationSteps,
    currentStepConfig: getCurrentStepConfig(),

    // Data management
    updateData,
    updateField,
    getFieldValue,
    getStepData,

    // Navigation
    goToStep,
    goToNextStep,
    goToPreviousStep,
    canGoNext: canGoNext(),
    canGoPrevious: canGoPrevious(),
    isStepAccessible,

    // Validation
    validateStep,
    setErrors,
    clearErrors,

    // Submission
    submitStep,
    isSubmitting: state.isSubmitting,
    submitError: null,

    // Progress
    progress: calculateProgress(state.currentStep),
    isLastStep: shouldRedirectToLogin(state.currentStep),

    // Utilities
    reset,
    clear,
    isComplete: isComplete(),
    getSummary,

    // Raw manager access (for advanced use cases)
    manager: registrationManager,
  };
};

/**
 * Hook for accessing registration state without management functions
 * Useful for read-only components
 */
export const useRegistrationState = () => {
  const [state, setState] = useState(() => registrationManager.getState());
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Hydrate on client mount to prevent SSR mismatch
    if (!isHydrated) {
      registrationManager.hydrate();
      setState(registrationManager.getState());
      setIsHydrated(true);
    }

    const unsubscribe = registrationManager.subscribe(setState);
    return unsubscribe;
  }, [isHydrated]);

  return {
    state,
    currentStep: state.currentStep,
    errors: state.errors || {},
    isCompleted: state.isCompleted,
    progress: registrationManager.getProgress(),
  };
};

export default useRegistration;
