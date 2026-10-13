-- ==============================================================================
-- ETHIXWEB INDIA - LEADS TABLE MIGRATION
-- Run this script in your Supabase project's SQL Editor (Dashboard > SQL Editor)
-- ==============================================================================

-- 1. Create leads table
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT NOT NULL,
    phone TEXT,
    service_interest TEXT NOT NULL,
    budget_range TEXT,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new' 
        CHECK (status IN ('new', 'contacted', 'in_discussion', 'converted', 'archived')),
    source_page TEXT DEFAULT 'contact',
    ip_hash TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Add performance indexes for admin search, filtering, and timestamp sorting
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads (status);
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads (email);
CREATE INDEX IF NOT EXISTS idx_leads_company ON public.leads (company);

-- 3. Automatic updated_at trigger function
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_leads_updated_at ON public.leads;
CREATE TRIGGER trg_leads_updated_at
    BEFORE UPDATE ON public.leads
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- 5. Row Level Security Policies:
-- Anonymous / public users cannot read, list, update, or delete any leads.
-- Only authenticated users (admins) can view, edit, or delete leads.
DROP POLICY IF EXISTS "Authenticated admins can manage all leads" ON public.leads;
CREATE POLICY "Authenticated admins can manage all leads"
    ON public.leads
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- (Public lead creation is handled safely on the server side using the
-- Supabase service-role client in Next.js App Router, preventing any direct browser tampering.)

-- 6. Add documentation comments
COMMENT ON TABLE public.leads IS 'Stores incoming business enquiries submitted via the Ethixweb India website';
COMMENT ON COLUMN public.leads.status IS 'Lead qualification pipeline: new, contacted, in_discussion, converted, archived';
COMMENT ON COLUMN public.leads.budget_range IS 'INR budget range specified by the prospect';
