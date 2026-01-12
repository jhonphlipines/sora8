-- Add unique constraint on user_id and certificate_name to allow proper upserts
ALTER TABLE public.user_certificates 
ADD CONSTRAINT user_certificates_user_certificate_unique UNIQUE (user_id, certificate_name);

-- Add UPDATE policy for users to update their own certificates
CREATE POLICY "Users can update their own certificates" 
ON public.user_certificates 
FOR UPDATE 
USING (auth.uid() = user_id);