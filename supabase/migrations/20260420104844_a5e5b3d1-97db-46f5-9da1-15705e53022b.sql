CREATE TABLE public.contact_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address TEXT NOT NULL,
  attempted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_contact_attempts_ip_time
  ON public.contact_attempts (ip_address, attempted_at DESC);

ALTER TABLE public.contact_attempts ENABLE ROW LEVEL SECURITY;