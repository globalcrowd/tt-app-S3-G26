-- TT Campus Group Buying App - Database Schema
-- Execute this in your Supabase SQL Editor: https://supabase.com/dashboard/project/YOUR_PROJECT/sql

-- ============================================================================
-- PROFILES TABLE
-- Extends Supabase auth.users with additional user information
-- ============================================================================
CREATE TABLE IF NOT EXISTS profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username text UNIQUE,
  full_name text,
  avatar_url text,
  phone text,
  wallet_balance decimal(10,2) DEFAULT 0.00,
  rating decimal(3,2) DEFAULT 5.00,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================================================
-- CATEGORIES TABLE
-- Product categories for group buys
-- ============================================================================
CREATE TABLE IF NOT EXISTS categories (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  name_en text,
  icon text,
  color text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================================================
-- PICKUP LOCATIONS TABLE
-- Available pickup locations on campus
-- ============================================================================
CREATE TABLE IF NOT EXISTS pickup_locations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  address text,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================================================
-- GROUP BUYS TABLE
-- Main table for group buying listings
-- ============================================================================
CREATE TABLE IF NOT EXISTS group_buys (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  organizer_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  category text,
  image_url text,
  price decimal(10,2) NOT NULL,
  original_price decimal(10,2),
  current_participants int DEFAULT 0,
  max_participants int NOT NULL,
  location text NOT NULL,
  pickup_location_id uuid REFERENCES pickup_locations(id),
  expires_at timestamp with time zone NOT NULL,
  status text DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled', 'expired')),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================================================
-- PARTICIPANTS TABLE
-- Tracks who joined which group buy (essentially orders)
-- ============================================================================
CREATE TABLE IF NOT EXISTS participants (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  group_buy_id uuid REFERENCES group_buys(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  quantity int DEFAULT 1,
  total_amount decimal(10,2) NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled', 'refunded')),
  joined_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(group_buy_id, user_id)
);

-- ============================================================================
-- MESSAGES TABLE
-- Chat messages for group buys
-- ============================================================================
CREATE TABLE IF NOT EXISTS messages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  group_buy_id uuid REFERENCES group_buys(id) ON DELETE CASCADE NOT NULL,
  sender_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  message_type text DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'system')),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================================================
-- TRANSACTIONS TABLE
-- Wallet transactions (deposits, purchases, refunds)
-- ============================================================================
CREATE TABLE IF NOT EXISTS transactions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  amount decimal(10,2) NOT NULL,
  type text NOT NULL CHECK (type IN ('deposit', 'purchase', 'refund', 'withdrawal')),
  description text,
  reference_id uuid, -- Can reference participant_id or other entities
  balance_after decimal(10,2),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================================================
-- NOTIFICATIONS TABLE
-- User notifications
-- ============================================================================
CREATE TABLE IF NOT EXISTS notifications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  type text DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'group_buy', 'order', 'chat')),
  is_read boolean DEFAULT false,
  link text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================================================
-- INDEXES for better query performance
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_group_buys_organizer ON group_buys(organizer_id);
CREATE INDEX IF NOT EXISTS idx_group_buys_status ON group_buys(status);
CREATE INDEX IF NOT EXISTS idx_group_buys_category ON group_buys(category);
CREATE INDEX IF NOT EXISTS idx_group_buys_expires ON group_buys(expires_at);
CREATE INDEX IF NOT EXISTS idx_participants_group_buy ON participants(group_buy_id);
CREATE INDEX IF NOT EXISTS idx_participants_user ON participants(user_id);
CREATE INDEX IF NOT EXISTS idx_messages_group_buy ON messages(group_buy_id);
CREATE INDEX IF NOT EXISTS idx_messages_created ON messages(created_at);
CREATE INDEX IF NOT EXISTS idx_transactions_user ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_unread ON notifications(user_id, is_read);

-- ============================================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at trigger to relevant tables
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_group_buys_updated_at ON group_buys;
CREATE TRIGGER update_group_buys_updated_at BEFORE UPDATE ON group_buys
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_participants_updated_at ON participants;
CREATE TRIGGER update_participants_updated_at BEFORE UPDATE ON participants
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to auto-create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name, avatar_url)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    COALESCE(new.raw_user_meta_data->>'avatar_url', '')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update participant count
CREATE OR REPLACE FUNCTION update_participant_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE group_buys
    SET current_participants = current_participants + 1
    WHERE id = NEW.group_buy_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE group_buys
    SET current_participants = GREATEST(0, current_participants - 1)
    WHERE id = OLD.group_buy_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update participant count
DROP TRIGGER IF EXISTS update_group_buy_participant_count ON participants;
CREATE TRIGGER update_group_buy_participant_count
  AFTER INSERT OR DELETE ON participants
  FOR EACH ROW EXECUTE FUNCTION update_participant_count();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- DISABLED FOR POC - ENABLE IN PRODUCTION!
-- ============================================================================
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE pickup_locations DISABLE ROW LEVEL SECURITY;
ALTER TABLE group_buys DISABLE ROW LEVEL SECURITY;
ALTER TABLE participants DISABLE ROW LEVEL SECURITY;
ALTER TABLE messages DISABLE ROW LEVEL SECURITY;
ALTER TABLE transactions DISABLE ROW LEVEL SECURITY;
ALTER TABLE notifications DISABLE ROW LEVEL SECURITY;

-- Note: In production, you should enable RLS and create appropriate policies
-- Example policies (commented out for PoC):
/*
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view all profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

ALTER TABLE group_buys ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active group buys" ON group_buys FOR SELECT USING (status = 'active');
CREATE POLICY "Organizers can update own group buys" ON group_buys FOR UPDATE USING (auth.uid() = organizer_id);
*/

-- ============================================================================
-- SCHEMA CREATION COMPLETE
-- ============================================================================
