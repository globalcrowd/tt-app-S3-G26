/*
  # Fix Foreign Key Constraint for RLS Compatibility

  1. Changes
    - Drop the existing foreign key constraint on group_buys.organizer_id
    - Recreate it as DEFERRABLE INITIALLY DEFERRED
    - This allows RLS policies to be checked after the foreign key validation
    
  2. Why This Fixes the Issue
    - When RLS is enabled, foreign key checks happen within the RLS context
    - The profiles table RLS policy allows users to view all profiles
    - Making the constraint deferrable ensures proper order of operations
*/

-- Drop the existing foreign key constraint
ALTER TABLE group_buys 
  DROP CONSTRAINT IF EXISTS group_buys_organizer_id_fkey;

-- Recreate the foreign key constraint as deferrable
ALTER TABLE group_buys
  ADD CONSTRAINT group_buys_organizer_id_fkey
  FOREIGN KEY (organizer_id)
  REFERENCES profiles(id)
  ON DELETE CASCADE
  DEFERRABLE INITIALLY DEFERRED;
