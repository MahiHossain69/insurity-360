import { z } from "zod";

// Step 1: Create Account validation schema
export const createAccountSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters"),

  phone: z
    .string()
    .min(1, "Phone number is required")
    .refine((val) => /^\+?[1-9]\d{7,14}$/.test(val), {
      message: "Please enter a valid phone number (7-15 digits)",
    }),
});

// Step 2: Verify Account validation schema
export const verifyAccountSchema = z.object({
  otp: z
    .string()
    .min(4, "OTP must be 4 digits")
    .max(4, "OTP must be 4 digits")
    .regex(/^\d{4}$/, "OTP must contain only numbers"),
});

// Step 3: Create Profile validation schema
export const createProfileSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
});

// Step 4: Invite User validation schema
export const inviteUserSchema = z.object({
  inviteEmails: z
    .array(z.string().email("Please enter valid email addresses"))
    .optional()
    .default([]),
  inviteRole: z
    .string()
    .optional()
    .default("member"),
});

// Complete registration data schema (combines all steps)
export const completeRegistrationSchema = z.object({
  // Step 1 data
  email: createAccountSchema.shape.email,
  phone: createAccountSchema.shape.phone,
  
  // Step 2 data
  otp: verifyAccountSchema.shape.otp,
  
  // Step 3 data
  name: createProfileSchema.shape.name,

  // Step 4 data
  inviteEmails: inviteUserSchema.shape.inviteEmails,
  inviteRole: inviteUserSchema.shape.inviteRole,

  // Additional metadata
  currentStep: z.number().min(1).max(4).default(1),
  isCompleted: z.boolean().default(false),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// Partial schemas for step validation
export const stepSchemas = {
  1: createAccountSchema,
  2: verifyAccountSchema,
  3: createProfileSchema,
  4: inviteUserSchema,
};

// Registration step configuration
export const registrationSteps = [
  {
    id: 1,
    name: "createAccount",
    title: "Create Account",
    description: "Enter your email and phone number to get started",
    schema: createAccountSchema,
    component: "CreateAccount",
  },
  {
    id: 2,
    name: "verifyAccount", 
    title: "Verify Account",
    description: "Enter the verification code sent to your email and phone",
    schema: verifyAccountSchema,
    component: "VerifyAccount",
  },
  {
    id: 3,
    name: "createProfile",
    title: "Create Profile",
    description: "Complete your profile information",
    schema: createProfileSchema,
    component: "CreateProfile",
  },
  {
    id: 4,
    name: "inviteUser",
    title: "Invite Users",
    description: "Invite team members to join your workspace",
    schema: inviteUserSchema,
    component: "InviteUser",
  },
];

// Helper function to validate step data
export const validateStepData = (step, data) => {
  const schema = stepSchemas[step];
  if (!schema) {
    throw new Error(`Invalid step: ${step}`);
  }
  return schema.parse(data);
};

// Helper function to get step configuration
export const getStepConfig = (step) => {
  return registrationSteps.find(s => s.id === step) || null;
};

// Helper function to get next step
export const getNextStep = (currentStep) => {
  return currentStep < registrationSteps.length ? currentStep + 1 : null;
};

// Helper function to get previous step
export const getPreviousStep = (currentStep) => {
  return currentStep > 1 ? currentStep - 1 : null;
};

// Helper function to check if registration is complete
export const isRegistrationComplete = (step) => {
  return step > registrationSteps.length;
};