/*
  # Fix Profile Creation Trigger

  ## Problem
  The handle_new_user() trigger was updated to include an email field,
  but the profiles table doesn't have an email column, causing signup to fail.

  ## Solution
  Update the trigger function to only insert fields that exist in the profiles table:
  - id
  - username
  - full_name
  
  The email is already stored in auth.users table, so we don't need to duplicate it.
*/

-- Update the trigger function to match the actual table structure
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1))
  )
  ON CONFLICT (id) DO NOTHING;
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't fail the signup
    RAISE WARNING 'Failed to create profile for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$;
