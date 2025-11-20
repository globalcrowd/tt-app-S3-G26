/*
  # Fix Group Buys RLS Policy

  1. Changes
    - Update the SELECT policy for group_buys to allow users to view group buys they've joined
    - This fixes the issue where users can't see their order details

  2. Security
    - Users can view group buys if:
      - The group buy is active, OR
      - They are the organizer, OR
      - They have joined as a participant
*/

-- Drop the existing policy
DROP POLICY IF EXISTS "Anyone can view active group buys" ON group_buys;

-- Create updated policy that allows viewing joined group buys
CREATE POLICY "Users can view active and joined group buys"
  ON group_buys FOR SELECT
  TO authenticated
  USING (
    status = 'active' 
    OR organizer_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM participants
      WHERE participants.group_buy_id = group_buys.id
      AND participants.user_id = auth.uid()
    )
  );
