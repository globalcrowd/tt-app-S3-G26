/*
  # Add RLS Policies to All Tables

  1. Security Changes
    - Enable RLS on all tables that don't have it yet
    - Add policies for participants table (users can view/manage their own orders)
    - Add policies for group_buys table (public can view active, organizers can manage)
    - Add policies for messages table (group participants can view/send)
    - Add policies for profiles table (users can view all, edit their own)
    - Add policies for pickup_locations table (public read access)
    - Add policies for transactions table (users can view their own)
    - Add policies for notifications table (users can view their own)

  2. Important Notes
    - Participants table: Users can only see their own participation records
    - Group buys: Anyone can view active group buys, only organizers can modify
    - Messages: Only participants of a group buy can view/send messages
*/

-- ============================================================================
-- PARTICIPANTS TABLE POLICIES
-- ============================================================================
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own participations"
  ON participants FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own participations"
  ON participants FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own participations"
  ON participants FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own participations"
  ON participants FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- ============================================================================
-- GROUP BUYS TABLE POLICIES
-- ============================================================================
ALTER TABLE group_buys ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active group buys"
  ON group_buys FOR SELECT
  TO authenticated
  USING (status = 'active' OR organizer_id = auth.uid());

CREATE POLICY "Organizers can create group buys"
  ON group_buys FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = organizer_id);

CREATE POLICY "Organizers can update own group buys"
  ON group_buys FOR UPDATE
  TO authenticated
  USING (auth.uid() = organizer_id)
  WITH CHECK (auth.uid() = organizer_id);

CREATE POLICY "Organizers can delete own group buys"
  ON group_buys FOR DELETE
  TO authenticated
  USING (auth.uid() = organizer_id);

-- ============================================================================
-- MESSAGES TABLE POLICIES
-- ============================================================================
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Group participants can view messages"
  ON messages FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM participants
      WHERE participants.group_buy_id = messages.group_buy_id
      AND participants.user_id = auth.uid()
    )
    OR EXISTS (
      SELECT 1 FROM group_buys
      WHERE group_buys.id = messages.group_buy_id
      AND group_buys.organizer_id = auth.uid()
    )
  );

CREATE POLICY "Group participants can send messages"
  ON messages FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = sender_id
    AND (
      EXISTS (
        SELECT 1 FROM participants
        WHERE participants.group_buy_id = messages.group_buy_id
        AND participants.user_id = auth.uid()
      )
      OR EXISTS (
        SELECT 1 FROM group_buys
        WHERE group_buys.id = messages.group_buy_id
        AND group_buys.organizer_id = auth.uid()
      )
    )
  );

-- ============================================================================
-- PROFILES TABLE POLICIES
-- ============================================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- ============================================================================
-- PICKUP LOCATIONS TABLE POLICIES
-- ============================================================================
ALTER TABLE pickup_locations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view pickup locations"
  ON pickup_locations FOR SELECT
  TO authenticated
  USING (is_active = true);

-- ============================================================================
-- TRANSACTIONS TABLE POLICIES
-- ============================================================================
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own transactions"
  ON transactions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- ============================================================================
-- NOTIFICATIONS TABLE POLICIES
-- ============================================================================
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
