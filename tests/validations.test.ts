import { describe, it, expect } from "vitest";
import { leadFormSchema, leadStatusUpdateSchema } from "@/lib/validations/lead";

describe("Lead Form Validation Schema (Zod)", () => {
  const validPayload = {
    name: "Aarav Mehta",
    email: "aarav@techventures.in",
    company: "TechVentures India",
    phone: "+91 98765 43210",
    service_interest: "high-performance-websites",
    budget_range: "growth_2.5_5l",
    message: "We need an ultra-fast Next.js website with 1-click UPI checkout.",
    website_hp: "",
  };

  it("should pass validation for a well-formed Indian lead submission", () => {
    const result = leadFormSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("Aarav Mehta");
      expect(result.data.email).toBe("aarav@techventures.in");
    }
  });

  it("should reject an invalid or malformed email address", () => {
    const invalidPayload = { ...validPayload, email: "invalid-email-address" };
    const result = leadFormSchema.safeParse(invalidPayload);
    expect(result.success).toBe(false);
    if (!result.success) {
      const issues = result.error.issues || (result.error as unknown as { errors: Array<{ path: (string | number)[]; message: string }> }).errors;
      const emailError = issues.find((e) => e.path.includes("email"));
      expect(emailError).toBeDefined();
      expect(emailError?.message).toContain("valid business email");
    }
  });

  it("should reject name that is too short", () => {
    const invalidPayload = { ...validPayload, name: "A" };
    const result = leadFormSchema.safeParse(invalidPayload);
    expect(result.success).toBe(false);
  });

  it("should reject company name that is too short", () => {
    const invalidPayload = { ...validPayload, company: "X" };
    const result = leadFormSchema.safeParse(invalidPayload);
    expect(result.success).toBe(false);
  });

  it("should accept valid Indian phone numbers in multiple formats", () => {
    const validPhones = [
      "+91 98765 43210",
      "+91-9876543210",
      "9876543210",
      "08049602100",
      "+91 80 4960 2100",
    ];

    validPhones.forEach((phone) => {
      const res = leadFormSchema.safeParse({ ...validPayload, phone });
      expect(res.success, `Phone format failed: ${phone}`).toBe(true);
    });
  });

  it("should reject invalid phone strings with letters", () => {
    const invalidPayload = { ...validPayload, phone: "call-me-maybe-987" };
    const result = leadFormSchema.safeParse(invalidPayload);
    expect(result.success).toBe(false);
  });

  it("should reject project message shorter than 10 characters", () => {
    const invalidPayload = { ...validPayload, message: "Hi!" };
    const result = leadFormSchema.safeParse(invalidPayload);
    expect(result.success).toBe(false);
  });

  it("should detect bot submissions when honeypot website_hp is populated", () => {
    const botPayload = { ...validPayload, website_hp: "https://spam-bot-link.com" };
    const result = leadFormSchema.safeParse(botPayload);
    expect(result.success).toBe(false);
    if (!result.success) {
      const issues = result.error.issues || (result.error as unknown as { errors: Array<{ path: (string | number)[]; message: string }> }).errors;
      const hpError = issues.find((e) => e.path.includes("website_hp"));
      expect(hpError).toBeDefined();
    }
  });
});

describe("Lead Status Update Schema", () => {
  it("should accept valid UUID and allowed status", () => {
    const valid = {
      leadId: "123e4567-e89b-12d3-a456-426614174000",
      status: "contacted",
    };
    const result = leadStatusUpdateSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it("should reject disallowed status strings", () => {
    const invalid = {
      leadId: "123e4567-e89b-12d3-a456-426614174000",
      status: "random_status",
    };
    const result = leadStatusUpdateSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it("should reject invalid UUID format", () => {
    const invalid = {
      leadId: "not-a-uuid",
      status: "converted",
    };
    const result = leadStatusUpdateSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });
});
