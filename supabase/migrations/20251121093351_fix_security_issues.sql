/*
  # Fix Security and Performance Issues

  ## Changes Made

  ### 1. Add Missing Indexes for Foreign Keys
    - Add index on `group_buys.pickup_location_id`
    - Add index on `messages.sender_id`

  ### 2. Optimize RLS Policies (Auth Function Initialization)
    Replace `auth.uid()` with `(select auth.uid())` in all RLS policies to avoid re-evaluation per row:
    - All policies on `participants` table
    - All policies on `group_buys` table
    - All policies on `messages` table
    - All policies on `profiles` table
    - All policies on `transactions` table
    - All policies on `notifications` table

  ### 3. Remove Unused Indexes
    - Drop `idx_group_buys_expires` (unused)
    - Drop `idx_messages_created` (unused)
    - Drop `idx_notifications_user` (unused)

  ### 4. Fix Function Search Path
    Set search_path to secure defaults for all functions

  ### 5. Enable RLS on Public Tables
    - Enable RLS on `categories` table with appropriate policies
*/

-- ============================================================================
-- 1. ADD MISSING INDEXES FOR FOREIGN KEYS
-- ============================================================================

-- Index for group_buys.pickup_location_id
CREATE INDEX IF NOT EXISTS idx_group_buys_pickup_location 
  ON group_buys(pickup_location_id);

-- Index for messages.sender_id
CREATE INDEX IF NOT EXISTS idx_messages_sender 
  ON messages(sender_id);

-- ============================================================================
-- 2. OPTIMIZE RLS POLICIES - PARTICIPANTS TABLE
-- ============================================================================

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own participations" ON participants;
DROP POLICY IF EXISTS "Users can create own participations" ON participants;
DROP POLICY IF EXISTS "Users can update own participations" ON participants;
DROP POLICY IF EXISTS "Users can delete own participations" ON participants;

-- Recreate with optimized auth function calls
CREATE POLICY "Users can view own participations"
  ON participants FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

CREATE POLICY "Users can create own participations"
  ON participants FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can update own participations"
  ON participants FOR UPDATE
  TO authenticated
  USING (user_id = (select auth.uid()))
  WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Users can delete own participations"
  ON participants FOR DELETE
  TO authenticated
  USING (user_id = (select auth.uid()));

-- ============================================================================
-- 3. OPTIMIZE RLS POLICIES - GROUP_BUYS TABLE
-- ============================================================================

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view active and joined group buys" ON group_buys;
DROP POLICY IF EXISTS "Organizers can create group buys" ON group_buys;
DROP POLICY IF EXISTS "Organizers can update own group buys" ON group_buys;
DROP POLICY IF EXISTS "Organizers can delete own group buys" ON group_buys;

-- Recreate with optimized auth function calls
CREATE POLICY "Users can view active and joined group buys"
  ON group_buys FOR SELECT
  TO authenticated
  USING (
    status = 'active' 
    OR organizer_id = (select auth.uid())
    OR EXISTS (
      SELECT 1 FROM participants 
      WHERE participants.group_buy_id = group_buys.id 
      AND participants.user_id = (select auth.uid())
    )
  );

CREATE POLICY "Organizers can create group buys"
  ON group_buys FOR INSERT
  TO authenticated
  WITH CHECK (organizer_id = (select auth.uid()));

CREATE POLICY "Organizers can update own group buys"
  ON group_buys FOR UPDATE
  TO authenticated
  USING (organizer_id = (select auth.uid()))
  WITH CHECK (organizer_id = (select auth.uid()));

CREATE POLICY "Organizers can delete own group buys"
  ON group_buys FOR DELETE
  TO authenticated
  USING (organizer_id = (select auth.uid()));

-- ============================================================================
-- 4. OPTIMIZE RLS POLICIES - MESSAGES TABLE
-- ============================================================================

-- Drop existing policies
DROP POLICY IF EXISTS "Group participants can view messages" ON messages;
DROP POLICY IF EXISTS "Group participants can send messages" ON messages;

-- Recreate with optimized auth function calls
CREATE POLICY "Group participants can view messages"
  ON messages FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM participants 
      WHERE participants.group_buy_id = messages.group_buy_id 
      AND participants.user_id = (select auth.uid())
    )
    OR EXISTS (
      SELECT 1 FROM group_buys 
      WHERE group_buys.id = messages.group_buy_id 
      AND group_buys.organizer_id = (select auth.uid())
    )
  );

CREATE POLICY "Group participants can send messages"
  ON messages FOR INSERT
  TO authenticated
  WITH CHECK (
    sender_id = (select auth.uid())
    AND (
      EXISTS (
        SELECT 1 FROM participants 
        WHERE participants.group_buy_id = messages.group_buy_id 
        AND participants.user_id = (select auth.uid())
      )
      OR EXISTS (
        SELECT 1 FROM group_buys 
        WHERE group_buys.id = messages.group_buy_id 
        AND group_buys.organizer_id = (select auth.uid())
      )
    )
  );

-- ============================================================================
-- 5. OPTIMIZE RLS POLICIES - PROFILES TABLE
-- ============================================================================

-- Drop existing policy
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Recreate with optimized auth function call
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (id = (select auth.uid()))
  WITH CHECK (id = (select auth.uid()));

-- ============================================================================
-- 6. OPTIMIZE RLS POLICIES - TRANSACTIONS TABLE
-- ============================================================================

-- Drop existing policy
DROP POLICY IF EXISTS "Users can view own transactions" ON transactions;

-- Recreate with optimized auth function call
CREATE POLICY "Users can view own transactions"
  ON transactions FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

-- ============================================================================
-- 7. OPTIMIZE RLS POLICIES - NOTIFICATIONS TABLE
-- ============================================================================

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own notifications" ON notifications;
DROP POLICY IF EXISTS "Users can update own notifications" ON notifications;

-- Recreate with optimized auth function calls
CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  TO authenticated
  USING (user_id = (select auth.uid()))
  WITH CHECK (user_id = (select auth.uid()));

-- ============================================================================
-- 8. REMOVE UNUSED INDEXES
-- ============================================================================

DROP INDEX IF EXISTS idx_group_buys_expires;
DROP INDEX IF EXISTS idx_messages_created;
DROP INDEX IF EXISTS idx_notifications_user;

-- ============================================================================
-- 9. FIX FUNCTION SEARCH PATH
-- ============================================================================

-- Update update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Update update_participant_count function
CREATE OR REPLACE FUNCTION public.update_participant_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $$
BEGIN
  IF (TG_OP = 'INSERT' AND NEW.status = 'confirmed') THEN
    UPDATE group_buys 
    SET current_participants = current_participants + 1
    WHERE id = NEW.group_buy_id;
  ELSIF (TG_OP = 'UPDATE' AND OLD.status != 'confirmed' AND NEW.status = 'confirmed') THEN
    UPDATE group_buys 
    SET current_participants = current_participants + 1
    WHERE id = NEW.group_buy_id;
  ELSIF (TG_OP = 'UPDATE' AND OLD.status = 'confirmed' AND NEW.status != 'confirmed') THEN
    UPDATE group_buys 
    SET current_participants = current_participants - 1
    WHERE id = NEW.group_buy_id;
  ELSIF (TG_OP = 'DELETE' AND OLD.status = 'confirmed') THEN
    UPDATE group_buys 
    SET current_participants = current_participants - 1
    WHERE id = OLD.group_buy_id;
  END IF;
  RETURN NEW;
END;
$$;

-- Update handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.email
  );
  RETURN NEW;
END;
$$;

-- ============================================================================
-- 10. ENABLE RLS ON CATEGORIES TABLE
-- ============================================================================

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Allow everyone to view categories (read-only public data)
CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  TO public
  USING (true);

-- Only authenticated users can create categories (if needed for admin features)
CREATE POLICY "Authenticated users can create categories"
  ON categories FOR INSERT
  TO authenticated
  WITH CHECK (true);
