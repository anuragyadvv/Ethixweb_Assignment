export type LeadStatus = 'new' | 'contacted' | 'in_discussion' | 'converted' | 'archived';

export type ServiceInterest = 
  | 'high-performance-websites'
  | 'web-applications-saas'
  | 'ai-agents-automation'
  | 'crm-whatsapp-integrations'
  | 'seo-growth-marketing'
  | 'maintenance-infrastructure'
  | 'other';

export interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string | null;
  service_interest: string;
  budget_range: string | null;
  message: string;
  status: LeadStatus;
  source_page?: string | null;
  ip_hash?: string | null;
  created_at: string;
  updated_at: string;
}

export interface LeadFilters {
  search?: string;
  status?: LeadStatus | 'all';
  service?: string | 'all';
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
