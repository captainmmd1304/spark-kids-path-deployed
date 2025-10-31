-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('parent', 'child');

-- Create enum for screening types
CREATE TYPE public.screening_type AS ENUM ('dyslexia', 'adhd', 'anxiety', 'other');

-- Create enum for activity categories
CREATE TYPE public.activity_category AS ENUM ('reading', 'attention', 'emotion', 'memory');

-- Create enum for activity difficulty
CREATE TYPE public.activity_difficulty AS ENUM ('easy', 'medium', 'hard');

-- Create enum for progress status
CREATE TYPE public.progress_status AS ENUM ('not_started', 'in_progress', 'completed');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  age INTEGER,
  preferences JSONB DEFAULT '{}'::jsonb,
  parent_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create professionals table
CREATE TABLE public.professionals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  specialization TEXT NOT NULL,
  contact_info JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.professionals ENABLE ROW LEVEL SECURITY;

-- Create activities table
CREATE TABLE public.activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category activity_category NOT NULL,
  difficulty activity_difficulty NOT NULL,
  reward_points INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

-- Create screening_results table
CREATE TABLE public.screening_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  type screening_type NOT NULL,
  score INTEGER NOT NULL,
  summary TEXT,
  date TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.screening_results ENABLE ROW LEVEL SECURITY;

-- Create progress table
CREATE TABLE public.progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  activity_id UUID REFERENCES public.activities(id) ON DELETE CASCADE NOT NULL,
  status progress_status DEFAULT 'not_started',
  score INTEGER,
  date TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.progress ENABLE ROW LEVEL SECURITY;

-- Create rewards table
CREATE TABLE public.rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  total_points INTEGER DEFAULT 0,
  badges JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (child_id)
);

ALTER TABLE public.rewards ENABLE ROW LEVEL SECURITY;

-- Trigger to auto-update updated_at timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_progress_updated_at
  BEFORE UPDATE ON public.progress
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_rewards_updated_at
  BEFORE UPDATE ON public.rewards
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, name, age, preferences)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', 'User'),
    (NEW.raw_user_meta_data->>'age')::INTEGER,
    COALESCE(NEW.raw_user_meta_data->'preferences', '{}'::jsonb)
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own roles on signup"
  ON public.user_roles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Parents can view their children's profiles"
  ON public.profiles FOR SELECT
  USING (
    parent_id = auth.uid() AND 
    public.has_role(auth.uid(), 'parent')
  );

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Parents can update their children's profiles"
  ON public.profiles FOR UPDATE
  USING (
    parent_id = auth.uid() AND 
    public.has_role(auth.uid(), 'parent')
  );

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- RLS Policies for professionals (public read)
CREATE POLICY "Anyone can view professionals"
  ON public.professionals FOR SELECT
  USING (true);

-- RLS Policies for activities (public read)
CREATE POLICY "Anyone can view activities"
  ON public.activities FOR SELECT
  USING (true);

-- RLS Policies for screening_results
CREATE POLICY "Children can view their own screening results"
  ON public.screening_results FOR SELECT
  USING (auth.uid() = child_id);

CREATE POLICY "Parents can view their children's screening results"
  ON public.screening_results FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = child_id AND parent_id = auth.uid()
    ) AND public.has_role(auth.uid(), 'parent')
  );

CREATE POLICY "Children can insert their own screening results"
  ON public.screening_results FOR INSERT
  WITH CHECK (auth.uid() = child_id);

-- RLS Policies for progress
CREATE POLICY "Children can view their own progress"
  ON public.progress FOR SELECT
  USING (auth.uid() = child_id);

CREATE POLICY "Parents can view their children's progress"
  ON public.progress FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = child_id AND parent_id = auth.uid()
    ) AND public.has_role(auth.uid(), 'parent')
  );

CREATE POLICY "Children can manage their own progress"
  ON public.progress FOR ALL
  USING (auth.uid() = child_id)
  WITH CHECK (auth.uid() = child_id);

-- RLS Policies for rewards
CREATE POLICY "Children can view their own rewards"
  ON public.rewards FOR SELECT
  USING (auth.uid() = child_id);

CREATE POLICY "Parents can view their children's rewards"
  ON public.rewards FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = child_id AND parent_id = auth.uid()
    ) AND public.has_role(auth.uid(), 'parent')
  );

CREATE POLICY "Children can manage their own rewards"
  ON public.rewards FOR ALL
  USING (auth.uid() = child_id)
  WITH CHECK (auth.uid() = child_id);

-- Insert some default activities
INSERT INTO public.activities (title, description, category, difficulty, reward_points) VALUES
  ('Focus & Memory Game', 'Match colors and improve your memory skills', 'memory', 'easy', 50),
  ('Reading Practice', 'Practice reading with dyslexia-friendly text', 'reading', 'medium', 75),
  ('Attention Exercise', 'Stay focused and complete the task', 'attention', 'medium', 60),
  ('Emotional Recognition', 'Identify and understand different emotions', 'emotion', 'easy', 40),
  ('Word Building', 'Build words from letters to improve spelling', 'reading', 'hard', 100),
  ('Breathing Exercise', 'Calm your mind with guided breathing', 'emotion', 'easy', 30);