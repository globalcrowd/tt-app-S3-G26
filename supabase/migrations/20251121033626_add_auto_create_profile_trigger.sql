/*
  # Add Automatic Profile Creation for New Users

  1. Changes
    - Create a trigger function that automatically creates a profile when a new user signs up
    - Add a trigger on auth.users table to call this function
    - Create missing profiles for existing users

  2. Security
    - The trigger ensures every user has a profile
    - This fixes the foreign key constraint issues when creating group buys

  3. Why This Fixes the Issue
    - When users sign up, they get an auth.users record but no profile
    - Group buys require a valid organizer_id that exists in profiles table
    - This trigger automatically creates the profile entry
*/

-- Create the trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create missing profiles for existing users
INSERT INTO public.profiles (id, username, full_name)
SELECT 
  au.id,
  split_part(au.email, '@', 1) as username,
  split_part(au.email, '@', 1) as full_name
FROM auth.users au
LEFT JOIN public.profiles p ON au.id = p.id
WHERE p.id IS NULL;
