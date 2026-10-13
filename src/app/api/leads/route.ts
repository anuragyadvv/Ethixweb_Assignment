import { NextRequest, NextResponse } from "next/server";
import { leadFormSchema } from "@/lib/validations/lead";
import { checkRateLimit, hashIdentifier } from "@/lib/rate-limiter";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  try {
    // 1. Extract client identifier for rate limiting & abuse tracking
    const forwardedFor = request.headers.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || "unknown";
    const ipHash = hashIdentifier(`${clientIp}:${userAgent}`);

    // 2. Check rate limit (5 submissions per 10 minutes per client)
    const rateLimit = checkRateLimit(ipHash, 5, 10 * 60 * 1000);
    if (!rateLimit.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Rate limit exceeded. Please wait a few minutes before submitting another enquiry.",
          retryAfter: rateLimit.resetInSeconds,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.resetInSeconds),
          },
        }
      );
    }

    // 3. Parse request payload
    let rawBody;
    try {
      rawBody = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON payload" },
        { status: 400 }
      );
    }

    // 4. Validate payload with Zod
    const validationResult = leadFormSchema.safeParse(rawBody);

    if (!validationResult.success) {
      const fieldErrors: Record<string, string> = {};
      const issues = validationResult.error.issues || (validationResult.error as unknown as { errors: Array<{ path: (string | number)[]; message: string }> }).errors || [];
      issues.forEach((err) => {
        const fieldName = err.path.join(".");
        if (!fieldErrors[fieldName]) {
          fieldErrors[fieldName] = err.message;
        }
      });

      return NextResponse.json(
        {
          success: false,
          error: "Please check the form fields for errors",
          fieldErrors,
        },
        { status: 400 }
      );
    }

    const validData = validationResult.data;

    // 5. Anti-spam honeypot detection
    if (validData.website_hp && validData.website_hp.trim().length > 0) {
      // Silently pretend success to deceive bot harvesters while refusing persistence
      console.warn(`[Anti-Spam] Bot submission blocked via honeypot from IP hash: ${ipHash}`);
      return NextResponse.json(
        {
          success: true,
          message: "Thank you for your enquiry. Our team will get back to you shortly.",
        },
        { status: 200 }
      );
    }

    // 6. Connect to Supabase using server-only Admin client
    let supabase;
    try {
      supabase = createAdminClient();
    } catch (configError: unknown) {
      const msg = configError instanceof Error ? configError.message : "Supabase configuration error";
      console.error("[Database Config Error]", msg);
      return NextResponse.json(
        {
          success: false,
          error: "Database configuration is not initialized on the server. Please check environment variables.",
        },
        { status: 503 }
      );
    }

    // 7. Insert lead record into PostgreSQL
    const { data: insertedLead, error: insertError } = await supabase
      .from("leads")
      .insert({
        name: validData.name,
        email: validData.email,
        company: validData.company,
        phone: validData.phone || null,
        service_interest: validData.service_interest,
        budget_range: validData.budget_range || null,
        message: validData.message,
        status: "new",
        source_page: validData.source_page || "contact",
        ip_hash: ipHash,
      })
      .select("id, created_at")
      .single();

    if (insertError) {
      console.error("[Database Insert Error]:", insertError.message);
      return NextResponse.json(
        {
          success: false,
          error: "Failed to save enquiry to database. Please try again or reach out directly.",
        },
        { status: 500 }
      );
    }

    // 8. Return success response with ID
    return NextResponse.json(
      {
        success: true,
        message: "Enquiry submitted successfully. An Ethixweb solutions engineer will reach out within 2 hours.",
        id: insertedLead.id,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("[Unexpected Leads Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected server error occurred while processing your request.",
      },
      { status: 500 }
    );
  }
}
