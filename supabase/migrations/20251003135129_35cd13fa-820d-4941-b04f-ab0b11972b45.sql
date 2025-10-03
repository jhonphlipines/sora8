-- Create tables for tracking user performance and progress

-- Table for tracking completed courses/levels
CREATE TABLE public.user_course_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  category_id TEXT NOT NULL,
  level_id TEXT NOT NULL,
  score INTEGER NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  time_taken_seconds INTEGER,
  UNIQUE(user_id, level_id)
);

-- Table for tracking solved problems
CREATE TABLE public.user_problems_solved (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  problem_id TEXT NOT NULL,
  language TEXT NOT NULL,
  solved_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  time_taken_seconds INTEGER,
  test_cases_passed INTEGER,
  UNIQUE(user_id, problem_id)
);

-- Table for tracking earned certificates
CREATE TABLE public.user_certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  certificate_name TEXT NOT NULL,
  category_id TEXT NOT NULL,
  earned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, certificate_name)
);

-- Enable Row Level Security
ALTER TABLE public.user_course_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_problems_solved ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_certificates ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_course_progress
CREATE POLICY "Users can view their own progress"
ON public.user_course_progress
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress"
ON public.user_course_progress
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress"
ON public.user_course_progress
FOR UPDATE
USING (auth.uid() = user_id);

-- RLS Policies for user_problems_solved
CREATE POLICY "Users can view their own solved problems"
ON public.user_problems_solved
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own solved problems"
ON public.user_problems_solved
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- RLS Policies for user_certificates
CREATE POLICY "Users can view their own certificates"
ON public.user_certificates
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own certificates"
ON public.user_certificates
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Enable realtime for all tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.user_course_progress;
ALTER PUBLICATION supabase_realtime ADD TABLE public.user_problems_solved;
ALTER PUBLICATION supabase_realtime ADD TABLE public.user_certificates;