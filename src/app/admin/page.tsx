import { redirect } from "next/navigation";
import { getCurrentAdminUser } from "@/lib/supabase/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { AdminDashboardClient } from "@/components/admin/AdminDashboardClient";
import { Lead } from "@/types/lead";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin Dashboard | Lead Management",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  // 1. Server-side session verification
  const adminUser = await getCurrentAdminUser();

  if (!adminUser) {
    redirect("/admin/login");
  }

  // 2. Fetch real leads from Supabase PostgreSQL database
  let leads: Lead[] = [];
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[AdminPage Database Query Error]:", error.message);
    } else if (data) {
      leads = data as Lead[];
    }
  } catch (err: unknown) {
    console.error("[AdminPage Supabase Connection Error]:", err);
  }

  // 3. Render client dashboard with verified real leads
  return (
    <AdminDashboardClient
      initialLeads={leads}
      adminEmail={adminUser.email}
    />
  );
}
