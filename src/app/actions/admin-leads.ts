"use server";

import { getCurrentAdminUser } from "@/lib/supabase/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { Lead, LeadStatus } from "@/types/lead";
import { leadStatusUpdateSchema } from "@/lib/validations/lead";

export async function getLeadsAction(params?: {
  search?: string;
  status?: string;
}): Promise<{ success: boolean; data?: Lead[]; error?: string }> {
  try {
    const adminUser = await getCurrentAdminUser();
    if (!adminUser) {
      return { success: false, error: "Unauthorized. Please sign in as an admin." };
    }

    const supabase = createAdminClient();
    let query = supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (params?.status && params.status !== "all") {
      query = query.eq("status", params.status);
    }

    if (params?.search && params.search.trim().length > 0) {
      const term = `%${params.search.trim()}%`;
      query = query.or(
        `name.ilike.${term},email.ilike.${term},company.ilike.${term},message.ilike.${term},service_interest.ilike.${term}`
      );
    }

    const { data, error } = await query;

    if (error) {
      console.error("[getLeadsAction Error]:", error.message);
      return { success: false, error: "Failed to load enquiries from database." };
    }

    return { success: true, data: (data as Lead[]) || [] };
  } catch (err: unknown) {
    console.error("[getLeadsAction Exception]:", err);
    return { success: false, error: "An unexpected error occurred while fetching leads." };
  }
}

export async function updateLeadStatusAction(
  leadId: string,
  newStatus: LeadStatus
): Promise<{ success: boolean; error?: string }> {
  try {
    const adminUser = await getCurrentAdminUser();
    if (!adminUser) {
      return { success: false, error: "Unauthorized. Please sign in as an admin." };
    }

    const validation = leadStatusUpdateSchema.safeParse({ leadId, status: newStatus });
    if (!validation.success) {
      return { success: false, error: "Invalid status or lead ID." };
    }

    const supabase = createAdminClient();
    const { error } = await supabase
      .from("leads")
      .update({ status: newStatus })
      .eq("id", leadId);

    if (error) {
      console.error("[updateLeadStatusAction Error]:", error.message);
      return { success: false, error: "Failed to update lead status in database." };
    }

    return { success: true };
  } catch (err: unknown) {
    console.error("[updateLeadStatusAction Exception]:", err);
    return { success: false, error: "An unexpected server error occurred." };
  }
}

export async function deleteLeadAction(
  leadId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const adminUser = await getCurrentAdminUser();
    if (!adminUser) {
      return { success: false, error: "Unauthorized. Please sign in as an admin." };
    }

    if (!leadId || typeof leadId !== "string") {
      return { success: false, error: "Invalid lead ID." };
    }

    const supabase = createAdminClient();
    const { error } = await supabase.from("leads").delete().eq("id", leadId);

    if (error) {
      console.error("[deleteLeadAction Error]:", error.message);
      return { success: false, error: "Failed to delete lead from database." };
    }

    return { success: true };
  } catch (err: unknown) {
    console.error("[deleteLeadAction Exception]:", err);
    return { success: false, error: "An unexpected server error occurred." };
  }
}
