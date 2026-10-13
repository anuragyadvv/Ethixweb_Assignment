import { createServerSupabaseClient } from "./server";

export interface AdminUser {
  id: string;
  email: string;
}

export async function getCurrentAdminUser(): Promise<AdminUser | null> {
  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user || !user.email) {
      return null;
    }

    const allowedEmailsRaw = process.env.ADMIN_ALLOWED_EMAILS;
    if (allowedEmailsRaw && allowedEmailsRaw.trim().length > 0) {
      const allowedEmails = allowedEmailsRaw
        .split(",")
        .map((e) => e.trim().toLowerCase())
        .filter(Boolean);

      if (allowedEmails.length > 0 && !allowedEmails.includes(user.email.toLowerCase())) {
        console.warn(`Access denied for authenticated user: ${user.email} (Not in ADMIN_ALLOWED_EMAILS)`);
        return null;
      }
    }

    return {
      id: user.id,
      email: user.email,
    };
  } catch (err) {
    console.error("Error retrieving current admin user:", err);
    return null;
  }
}
