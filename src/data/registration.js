import { completeRegistrationSchema } from "@/schemas/registration";

// Storage keys
const STORAGE_KEY = "insurity_registration_data";
const STEP_KEY = "insurity_registration_step";

// Default registration state
const defaultRegistrationState = {
  // Step 1 data
  email: "",
  phone: "",
  
  // Step 2 data
  otp: "",
  
  // Step 3 data
  name: "",
  profileImage: null,
  
  // Step 4 data
  inviteEmails: [],
  inviteRole: "member",
  
  // Metadata
  currentStep: 1,
  isCompleted: false,
  createdAt: null,
  updatedAt: null,
  errors: {},
};

// Storage utility functions with SSR safety
const loadState = () => {
  // Always return default state during SSR to prevent hydration mismatch
  if (typeof window === 'undefined') return defaultRegistrationState;
  
  // Clear data on page reload (when performance.navigation.type === 1)
  if (typeof performance !== 'undefined' && performance.navigation && performance.navigation.type === 1) {
    clearState();
    return defaultRegistrationState;
  }
  
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Convert date strings back to Date objects
      if (parsed.createdAt) parsed.createdAt = new Date(parsed.createdAt);
      if (parsed.updatedAt) parsed.updatedAt = new Date(parsed.updatedAt);
      return { ...defaultRegistrationState, ...parsed };
    }
  } catch (error) {
    console.error("Failed to load registration state:", error);
    clearState();
  }
  return defaultRegistrationState;
};

const saveState = (state) => {
  if (typeof window === 'undefined') return;
  
  try {
    const stateToSave = {
      ...state,
      updatedAt: new Date(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
  } catch (error) {
    console.error("Failed to save registration state:", error);
  }
};

const clearState = () => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STEP_KEY);
  } catch (error) {
    console.error("Failed to clear registration state:", error);
  }
};

// Registration data management class
class RegistrationManager {
  constructor() {
    this.state = loadState();
    this.listeners = [];
    this.isHydrated = false;
  }

  // Get current state
  getState() {
    return { ...this.state };
  }

  // Hydrate client state after component mount to prevent SSR mismatch
  hydrate() {
    if (typeof window !== 'undefined' && !this.isHydrated) {
      const clientState = loadState();
      this.state = clientState;
      this.isHydrated = true;
      this.notifyListeners();
    }
  }

  // Get specific field value
  getField(fieldName) {
    return this.state[fieldName];
  }

  // Update registration data
  updateData(data, step = null) {
    const newState = {
      ...this.state,
      ...data,
      updatedAt: new Date(),
    };

    // Set created date on first update
    if (!this.state.createdAt) {
      newState.createdAt = new Date();
    }

    // Update current step if provided
    if (step !== null) {
      newState.currentStep = step;
    }

    this.state = newState;
    // Removed automatic saveState - data should not persist
    this.notifyListeners();
  }

  // Set current step
  setCurrentStep(step) {
    this.updateData({ currentStep: step });
  }

  // Get current step
  getCurrentStep() {
    return this.state.currentStep;
  }

  // Move to next step
  nextStep() {
    const nextStep = this.state.currentStep + 1;
    this.setCurrentStep(nextStep);
    return nextStep;
  }

  // Move to previous step
  previousStep() {
    const prevStep = Math.max(1, this.state.currentStep - 1);
    this.setCurrentStep(prevStep);
    return prevStep;
  }

  // Set form errors
  setErrors(errors) {
    this.updateData({ errors });
  }

  // Clear form errors
  clearErrors() {
    this.updateData({ errors: {} });
  }

  // Get form errors
  getErrors() {
    return this.state.errors || {};
  }

  // Mark registration as completed
  markCompleted() {
    this.updateData({ isCompleted: true });
  }

  // Check if registration is completed
  isCompleted() {
    return this.state.isCompleted;
  }

  // Reset registration data
  reset() {
    this.state = { ...defaultRegistrationState, createdAt: new Date() };
    saveState(this.state);
    this.notifyListeners();
  }

  // Clear all data and storage
  clear() {
    this.state = { ...defaultRegistrationState };
    clearState();
    this.notifyListeners();
  }

  // Validate current step data
  validateStep(step = null) {
    const currentStep = step || this.state.currentStep;
    try {
      // Import step schemas dynamically to avoid circular imports
      const { stepSchemas } = require("@/schemas/registration");
      const schema = stepSchemas[currentStep];
      
      if (!schema) {
        throw new Error(`No validation schema found for step ${currentStep}`);
      }

      // Extract relevant data for the step
      let stepData = {};
      if (currentStep === 1) {
        stepData = {
          email: this.state.email,
          phone: this.state.phone,
        };
      } else if (currentStep === 2) {
        stepData = {
          otp: this.state.otp,
        };
      } else if (currentStep === 3) {
        stepData = {
          name: this.state.name,
        };
      } else if (currentStep === 4) {
        stepData = {
          inviteEmails: this.state.inviteEmails || [],
          inviteRole: this.state.inviteRole || "member",
        };
      }

      const result = schema.safeParse(stepData);
      
      if (!result.success) {
        const errors = {};
        result.error.errors.forEach(error => {
          errors[error.path[0]] = error.message;
        });
        this.setErrors(errors);
        return { success: false, errors };
      }

      this.clearErrors();
      return { success: true, data: result.data };
    } catch (error) {
      console.error("Validation error:", error);
      return { success: false, errors: { general: "Validation failed" } };
    }
  }

  // Get step data for API submission
  getStepData(step = null) {
    const currentStep = step || this.state.currentStep;
    
    if (currentStep === 1) {
      return {
        email: this.state.email,
        phone: this.state.phone,
      };
    } else if (currentStep === 2) {
      return {
        otp: this.state.otp,
        email: this.state.email, // Include email for verification
      };
    } else if (currentStep === 3) {
      return {
        name: this.state.name,
      };
    } else if (currentStep === 4) {
      return {
        inviteEmails: this.state.inviteEmails || [],
        inviteRole: this.state.inviteRole || "member",
      };
    }
    
    return {};
  }

  // Subscribe to state changes
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  // Notify all listeners of state changes
  notifyListeners() {
    this.listeners.forEach(listener => {
      try {
        listener(this.state);
      } catch (error) {
        console.error("Error in registration state listener:", error);
      }
    });
  }

  // Get registration progress percentage
  getProgress() {
    const totalSteps = 4; // Create Account + Verify Account + Create Profile + Invite User
    return Math.round((this.state.currentStep / totalSteps) * 100);
  }

  // Check if step is accessible (user can navigate to it)
  isStepAccessible(step) {
    // User can only access current step or previous completed steps
    return step <= this.state.currentStep;
  }

  // Get summary of registration data for debugging
  getSummary() {
    return {
      currentStep: this.state.currentStep,
      isCompleted: this.state.isCompleted,
      hasEmail: !!this.state.email,
      hasPhone: !!this.state.phone,
      hasOtp: !!this.state.otp,
      hasFirstName: !!this.state.firstName,
      hasLastName: !!this.state.lastName,
      hasCompany: !!this.state.company,
      hasJobTitle: !!this.state.jobTitle,
      hasErrors: Object.keys(this.state.errors || {}).length > 0,
      createdAt: this.state.createdAt,
      updatedAt: this.state.updatedAt,
    };
  }
}

// Create singleton instance
const registrationManager = new RegistrationManager();

// Export the manager instance and utility functions
export default registrationManager;
export { RegistrationManager, defaultRegistrationState };

// Export convenience functions
export const getRegistrationState = () => registrationManager.getState();
export const updateRegistrationData = (data, step) => registrationManager.updateData(data, step);
export const getCurrentStep = () => registrationManager.getCurrentStep();
export const setCurrentStep = (step) => registrationManager.setCurrentStep(step);
export const validateCurrentStep = () => registrationManager.validateStep();
export const resetRegistration = () => registrationManager.reset();
export const clearRegistration = () => registrationManager.clear();
export const subscribeToRegistration = (listener) => registrationManager.subscribe(listener);