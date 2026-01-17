-- Create function to update updated_at column first
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create table to track AI chat usage
CREATE TABLE public.user_ai_chats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  chat_count INTEGER NOT NULL DEFAULT 0,
  has_unlimited_access BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE public.user_ai_chats ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own AI chat usage" 
ON public.user_ai_chats 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own AI chat usage" 
ON public.user_ai_chats 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own AI chat usage" 
ON public.user_ai_chats 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_user_ai_chats_updated_at
BEFORE UPDATE ON public.user_ai_chats
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();