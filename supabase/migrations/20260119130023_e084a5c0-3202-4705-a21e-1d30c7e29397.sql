-- Create a function to grant unlimited access to first 2 signups
CREATE OR REPLACE FUNCTION public.grant_first_users_access()
RETURNS TRIGGER AS $$
DECLARE
  user_count INTEGER;
BEGIN
  -- Count existing users in user_ai_chats
  SELECT COUNT(*) INTO user_count FROM public.user_ai_chats;
  
  -- If this is among first 2 users, grant unlimited access
  IF user_count < 2 THEN
    NEW.has_unlimited_access := true;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for new user_ai_chats entries
CREATE TRIGGER check_first_users_trigger
BEFORE INSERT ON public.user_ai_chats
FOR EACH ROW
EXECUTE FUNCTION public.grant_first_users_access();

-- Also grant unlimited access and full credits to first 2 users in user_credits
CREATE OR REPLACE FUNCTION public.grant_first_users_credits()
RETURNS TRIGGER AS $$
DECLARE
  user_count INTEGER;
BEGIN
  -- Count existing users in user_credits
  SELECT COUNT(*) INTO user_count FROM public.user_credits;
  
  -- If this is among first 2 users, grant 999 credits (effectively unlimited)
  IF user_count < 2 THEN
    NEW.credits := 999;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for new user_credits entries
CREATE TRIGGER check_first_users_credits_trigger
BEFORE INSERT ON public.user_credits
FOR EACH ROW
EXECUTE FUNCTION public.grant_first_users_credits();