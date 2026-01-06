import { z } from "zod";

const toNumber = (val) => {
  const n = typeof val === "string" ? Number(val) : val;
  return Number.isFinite(n) ? n : NaN;
};

export const opportunitySchema = z
  .object({
    policyTitle: z.string().optional(),
    policyCode: z.string().min(1, "Policy Code is required"),
    issuer: z.string().optional(),
    client: z.string().min(1, "Client is required"),
    policyType: z.string().min(1, "Policy Type is required"),
    startDate: z.date({ required_error: "Start Date is required" }),
    endDate: z.date({ required_error: "End Date is required" }),
    totalPremium: z.preprocess(
      toNumber,
      z.number().positive("Total Premium must be positive"),
    ),
    currency: z.string().min(1, "Currency is required"),
    premiumFrequency: z.string().min(1, "Premium Frequency is required"),
    paymentMethod: z.string().min(1, "Payment Method is required"),
    firstPaymentDate: z.date({
      required_error: "First Payment Date is required",
    }),
    autoRenewal: z.boolean().default(false),
    documentName: z.string().optional(),
    uploadedFiles: z.array(z.any()).default([]),
    additionalNotes: z.string().optional(),
    agent: z.string().optional(),
    producer: z.string().optional(),
    otherPolicyDetails: z.string().optional(),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "End Date must be after Start Date",
    path: ["endDate"],
  });
