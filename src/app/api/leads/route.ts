import { NextRequest, NextResponse } from "next/server";
import { leadFormSchema } from "@/lib/validations/lead";
import { checkRateLimit, hashIdentifier } from "@/lib/rate-limiter";

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
      const issues =
        validationResult.error.issues ||
        (validationResult.error as unknown as { errors: Array<{ path: (string | number)[]; message: string }> }).errors ||
        [];
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
      console.warn(`[Anti-Spam] Bot submission blocked via honeypot from IP hash: ${ipHash}`);
      return NextResponse.json(
        {
          success: true,
          message: "Thank you for your enquiry. Our team will get back to you shortly.",
        },
        { status: 200 }
      );
    }

    // 6. Generate enquiry reference ID
    const referenceId = `ETHIX-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

    console.info(`[Lead Received] ${validData.name} (${validData.company}) - Ref: ${referenceId}`);

    // 7. Return verified success response
    return NextResponse.json(
      {
        success: true,
        message: "Enquiry validated and submitted successfully. An Ethixweb solutions engineer will reach out within 2 hours.",
        id: referenceId,
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
