import { z } from "zod";

function isValidPhone(val?: string | null): boolean {
  if (!val || val.trim() === "") return true;
  // Must only contain digits, spaces, +, -, (, ), .
  if (!/^[\d\s+\-().]{7,25}$/.test(val)) return false;
  const digits = val.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

export const leadFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please provide a valid business email address")
    .max(150, "Email cannot exceed 150 characters"),
  company: z
    .string()
    .trim()
    .min(2, "Company name must be at least 2 characters")
    .max(120, "Company name cannot exceed 120 characters"),
  phone: z
    .string()
    .trim()
    .optional()
    .refine(isValidPhone, {
      message: "Please enter a valid phone number (e.g., +91 98765 43210)",
    }),
  service_interest: z
    .string()
    .min(1, "Please select a service interest"),
  budget_range: z
    .string()
    .optional(),
  message: z
    .string()
    .trim()
    .min(10, "Please provide at least 10 characters describing your project")
    .max(2000, "Message cannot exceed 2000 characters"),
  // Honeypot field - must remain empty; bots routinely fill all fields
  website_hp: z
    .string()
    .max(0, "Bot submission detected")
    .optional()
    .or(z.literal("")),
  source_page: z
    .string()
    .optional(),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;

export const leadStatusUpdateSchema = z.object({
  leadId: z.string().uuid("Invalid lead ID format"),
  status: z.enum(['new', 'contacted', 'in_discussion', 'converted', 'archived']),
});

export type LeadStatusUpdateData = z.infer<typeof leadStatusUpdateSchema>;
