-- ================================================
-- BHIV HR Platform - Supabase Database Setup
-- ================================================
-- Run this SQL in your Supabase SQL Editor
-- Dashboard: https://fhwtxghyfcygpgefgurn.supabase.co
-- ================================================

-- 1. Create profiles table (extends auth.users)
-- ================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name TEXT,
  phone TEXT,
  location TEXT,
  role TEXT CHECK (role IN ('candidate', 'recruiter', 'client')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row Level Security
-- ================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS Policies
-- ================================================

-- Policy: Users can view their own profile
CREATE POLICY "Users can view their own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Policy: Users can insert their own profile
CREATE POLICY "Users can insert their own profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update their own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Policy: Users can delete their own profile
CREATE POLICY "Users can delete their own profile"
  ON public.profiles
  FOR DELETE
  USING (auth.uid() = id);

-- 4. Create function to auto-create profile on signup
-- ================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, phone, location, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', 'User'),
    NEW.raw_user_meta_data->>'phone',
    NEW.raw_user_meta_data->>'location',
    COALESCE(NEW.raw_user_meta_data->>'role', 'candidate')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Create trigger to execute function on new user
-- ================================================
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- 6. Create function to update updated_at timestamp
-- ================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 7. Create trigger for updated_at
-- ================================================
DROP TRIGGER IF EXISTS set_updated_at ON public.profiles;
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- ================================================
-- Setup Complete!
-- ================================================
-- Next steps:
-- 1. Test authentication in your app
-- 2. Check if profiles are created automatically
-- 3. Verify RLS policies are working
-- ================================================

-- Optional: Create indexes for better performance
-- ================================================
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_created_at ON public.profiles(created_at);

-- Optional: View to check profile data
-- ================================================
CREATE OR REPLACE VIEW public.profiles_with_email AS
SELECT 
  p.*,
  u.email,
  u.email_confirmed_at,
  u.last_sign_in_at
FROM public.profiles p
JOIN auth.users u ON p.id = u.id;

-- Grant access to authenticated users
GRANT SELECT ON public.profiles_with_email TO authenticated;

-- ================================================
-- Verification Queries
-- ================================================
-- Run these to verify your setup:

-- Check if table exists
-- SELECT * FROM public.profiles;

-- Check if policies exist
-- SELECT * FROM pg_policies WHERE tablename = 'profiles';

-- Check if trigger exists
-- SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';

-- ================================================
-- Test Data (Optional - for development only)
-- ================================================
-- Uncomment to insert test profiles
-- Note: These require actual user IDs from auth.users

/*
INSERT INTO public.profiles (id, name, phone, location, role)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'Test Candidate', '+91 9876543210', 'Bangalore', 'candidate'),
  ('00000000-0000-0000-0000-000000000002', 'Test Recruiter', '+91 9876543211', 'Mumbai', 'recruiter'),
  ('00000000-0000-0000-0000-000000000003', 'Test Client', '+91 9876543212', 'Delhi', 'client');
*/

-- ================================================
-- Cleanup Commands (if needed)
-- ================================================
-- Uncomment to reset everything

/*
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS set_updated_at ON public.profiles;
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP FUNCTION IF EXISTS public.handle_updated_at();
DROP VIEW IF EXISTS public.profiles_with_email;
DROP TABLE IF EXISTS public.profiles CASCADE;
*/
