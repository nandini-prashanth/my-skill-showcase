CREATE POLICY "Deny all client access to contact_attempts"
ON public.contact_attempts
AS RESTRICTIVE
FOR ALL
TO anon, authenticated
USING (false)
WITH CHECK (false);