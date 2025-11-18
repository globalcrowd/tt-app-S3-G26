-- TT Campus Group Buying App - Sample Data Seed
-- Run this AFTER creating the users manually in Supabase Auth
-- Dashboard: https://supabase.com/dashboard/project/YOUR_PROJECT/auth/users

-- ============================================================================
-- IMPORTANT: CREATE THESE USERS FIRST IN SUPABASE AUTH DASHBOARD
-- ============================================================================
-- Navigate to: Authentication > Users > Add User (manually)
--
-- Create these 6 users:
-- 1. alice@test.com / Test1234! / Alice Wang
-- 2. bob@test.com / Test1234! / Bob Chen
-- 3. charlie@test.com / Test1234! / Charlie Liu
-- 4. diana@test.com / Test1234! / Diana Zhang
-- 5. evan@test.com / Test1234! / Evan Wu
-- 6. admin@test.com / Admin1234! / Admin User
--
-- When creating, set metadata:
-- {
--   "full_name": "Alice Wang",
--   "username": "alice"
-- }
-- ============================================================================

-- Wait a few seconds after creating users, then run this script to add profiles

-- ============================================================================
-- UPDATE PROFILES
-- This will populate additional profile data for test users
-- ============================================================================
UPDATE profiles SET
  username = 'alice',
  full_name = 'Alice Wang',
  phone = '+86 138 0000 0001',
  wallet_balance = 150.00,
  rating = 4.8
WHERE id IN (SELECT id FROM auth.users WHERE email = 'alice@test.com');

UPDATE profiles SET
  username = 'bob',
  full_name = 'Bob Chen',
  phone = '+86 138 0000 0002',
  wallet_balance = 200.00,
  rating = 4.9
WHERE id IN (SELECT id FROM auth.users WHERE email = 'bob@test.com');

UPDATE profiles SET
  username = 'charlie',
  full_name = 'Charlie Liu',
  phone = '+86 138 0000 0003',
  wallet_balance = 100.00,
  rating = 5.0
WHERE id IN (SELECT id FROM auth.users WHERE email = 'charlie@test.com');

UPDATE profiles SET
  username = 'diana',
  full_name = 'Diana Zhang',
  phone = '+86 138 0000 0004',
  wallet_balance = 80.00,
  rating = 4.7
WHERE id IN (SELECT id FROM auth.users WHERE email = 'diana@test.com');

UPDATE profiles SET
  username = 'evan',
  full_name = 'Evan Wu',
  phone = '+86 138 0000 0005',
  wallet_balance = 120.00,
  rating = 4.6
WHERE id IN (SELECT id FROM auth.users WHERE email = 'evan@test.com');

UPDATE profiles SET
  username = 'admin',
  full_name = 'Admin User',
  phone = '+86 138 0000 0000',
  wallet_balance = 500.00,
  rating = 5.0
WHERE id IN (SELECT id FROM auth.users WHERE email = 'admin@test.com');

-- ============================================================================
-- INSERT CATEGORIES
-- ============================================================================
INSERT INTO categories (name, name_en, icon, color) VALUES
  ('零食百货', 'Snacks', 'ShoppingCart', '#8B7FE8'),
  ('生鲜果蔬', 'Fresh Food', 'Apple', '#9D8FEB'),
  ('教材教辅', 'Books', 'Book', '#667eea'),
  ('校内服务', 'Services', 'Package', '#7B6FE6'),
  ('二手拼购', 'Second-hand', 'Recycle', '#A89FED')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- INSERT PICKUP LOCATIONS
-- ============================================================================
INSERT INTO pickup_locations (name, address, is_active) VALUES
  ('宿舍1号楼', '东区宿舍1号楼大厅', true),
  ('宿舍2号楼', '东区宿舍2号楼大厅', true),
  ('宿舍3号楼', '西区宿舍3号楼大厅', true),
  ('宿舍4号楼', '西区宿舍4号楼大厅', true),
  ('北门快递点', '学校北门快递服务中心', true),
  ('南门快递点', '学校南门快递服务中心', true),
  ('图书馆门口', '中央图书馆正门', true),
  ('食堂取货点', '第一食堂服务台', true)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- INSERT SAMPLE GROUP BUYS
-- ============================================================================

-- Alice's group buys (organizer)
INSERT INTO group_buys (
  organizer_id,
  title,
  description,
  category,
  image_url,
  price,
  original_price,
  current_participants,
  max_participants,
  location,
  expires_at,
  status
)
SELECT
  p.id,
  '山姆小青柠汁1L*6瓶',
  '新鲜到货，超值拼团！Sam''s Club进口青柠汁，酸甜可口，6瓶装。保质期到2025年12月。',
  '零食百货',
  'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400',
  56.00,
  88.00,
  0,
  6,
  '宿舍1号楼',
  NOW() + INTERVAL '2 days',
  'active'
FROM profiles p WHERE p.username = 'alice';

INSERT INTO group_buys (
  organizer_id,
  title,
  description,
  category,
  image_url,
  price,
  original_price,
  current_participants,
  max_participants,
  location,
  expires_at,
  status
)
SELECT
  p.id,
  '高数教材打印版',
  '高等数学第七版，清晰打印装订，包邮到取货点。正版扫描，质量保证。',
  '教材教辅',
  'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400',
  25.00,
  45.00,
  0,
  8,
  '北门快递点',
  NOW() + INTERVAL '3 days',
  'active'
FROM profiles p WHERE p.username = 'alice';

-- Bob's group buys (organizer)
INSERT INTO group_buys (
  organizer_id,
  title,
  description,
  category,
  image_url,
  price,
  original_price,
  current_participants,
  max_participants,
  location,
  expires_at,
  status
)
SELECT
  p.id,
  '新鲜草莓2斤装',
  '当日采摘，甜度高！来自本地有机农场，新鲜草莓2斤装。今天下单，明天送达。',
  '生鲜果蔬',
  'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400',
  35.00,
  50.00,
  0,
  4,
  '宿舍2号楼',
  NOW() + INTERVAL '1 day',
  'active'
FROM profiles p WHERE p.username = 'bob';

INSERT INTO group_buys (
  organizer_id,
  title,
  description,
  category,
  image_url,
  price,
  original_price,
  current_participants,
  max_participants,
  location,
  expires_at,
  status
)
SELECT
  p.id,
  'iPhone数据线3条装',
  '原装品质，MFi认证。1米+1.5米+2米组合装，适配iPhone全系列。',
  '二手拼购',
  'https://images.unsplash.com/photo-1590104213960-3916873732f8?w=400',
  49.00,
  79.00,
  0,
  5,
  '宿舍3号楼',
  NOW() + INTERVAL '4 days',
  'active'
FROM profiles p WHERE p.username = 'bob';

-- Charlie's group buy
INSERT INTO group_buys (
  organizer_id,
  title,
  description,
  category,
  image_url,
  price,
  original_price,
  current_participants,
  max_participants,
  location,
  expires_at,
  status
)
SELECT
  p.id,
  '奶茶券10张',
  '校内奶茶店通用券，可用于任意饮品。10张装，有效期3个月。',
  '校内服务',
  'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=400',
  60.00,
  100.00,
  0,
  3,
  '食堂取货点',
  NOW() + INTERVAL '5 days',
  'active'
FROM profiles p WHERE p.username = 'charlie';

-- Diana's group buys
INSERT INTO group_buys (
  organizer_id,
  title,
  description,
  category,
  image_url,
  price,
  original_price,
  current_participants,
  max_participants,
  location,
  expires_at,
  status
)
SELECT
  p.id,
  '进口零食大礼包',
  '日韩进口零食组合，包含薯片、糖果、巧克力等15种零食。',
  '零食百货',
  'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400',
  89.00,
  135.00,
  0,
  4,
  '南门快递点',
  NOW() + INTERVAL '6 days',
  'active'
FROM profiles p WHERE p.username = 'diana';

INSERT INTO group_buys (
  organizer_id,
  title,
  description,
  category,
  image_url,
  price,
  original_price,
  current_participants,
  max_participants,
  location,
  expires_at,
  status
)
SELECT
  p.id,
  '有机蔬菜套餐',
  '本周新鲜采摘，5种时令蔬菜组合。包含：番茄、黄瓜、生菜、青椒、胡萝卜。',
  '生鲜果蔬',
  'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400',
  42.00,
  68.00,
  0,
  6,
  '宿舍1号楼',
  NOW() + INTERVAL '2 days',
  'active'
FROM profiles p WHERE p.username = 'diana';

-- Add one completed group buy for reference
INSERT INTO group_buys (
  organizer_id,
  title,
  description,
  category,
  image_url,
  price,
  original_price,
  current_participants,
  max_participants,
  location,
  expires_at,
  status
)
SELECT
  p.id,
  '瑞幸咖啡券20张',
  '已成团！感谢大家支持。瑞幸咖啡通用券，任意饮品可用。',
  '校内服务',
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400',
  120.00,
  200.00,
  10,
  10,
  '图书馆门口',
  NOW() - INTERVAL '1 day',
  'completed'
FROM profiles p WHERE p.username = 'alice';

-- ============================================================================
-- INSERT SAMPLE PARTICIPANTS (ORDERS)
-- ============================================================================

-- Bob joins Alice's青柠汁 group buy
INSERT INTO participants (group_buy_id, user_id, quantity, total_amount, status)
SELECT
  gb.id,
  p.id,
  1,
  56.00,
  'confirmed'
FROM group_buys gb
CROSS JOIN profiles p
WHERE gb.title = '山姆小青柠汁1L*6瓶'
  AND p.username = 'bob';

-- Charlie joins Bob's草莓 group buy
INSERT INTO participants (group_buy_id, user_id, quantity, total_amount, status)
SELECT
  gb.id,
  p.id,
  1,
  35.00,
  'confirmed'
FROM group_buys gb
CROSS JOIN profiles p
WHERE gb.title = '新鲜草莓2斤装'
  AND p.username = 'charlie';

-- Diana joins Alice's青柠汁 group buy
INSERT INTO participants (group_buy_id, user_id, quantity, total_amount, status)
SELECT
  gb.id,
  p.id,
  1,
  56.00,
  'confirmed'
FROM group_buys gb
CROSS JOIN profiles p
WHERE gb.title = '山姆小青柠汁1L*6瓶'
  AND p.username = 'diana';

-- Evan joins Diana's蔬菜套餐 group buy
INSERT INTO participants (group_buy_id, user_id, quantity, total_amount, status)
SELECT
  gb.id,
  p.id,
  1,
  42.00,
  'pending'
FROM group_buys gb
CROSS JOIN profiles p
WHERE gb.title = '有机蔬菜套餐'
  AND p.username = 'evan';

-- ============================================================================
-- INSERT SAMPLE MESSAGES
-- ============================================================================

-- Messages for 青柠汁 group buy
INSERT INTO messages (group_buy_id, sender_id, content, message_type)
SELECT
  gb.id,
  p.id,
  '大家好！这个青柠汁真的很好喝，我之前买过，强烈推荐！',
  'text'
FROM group_buys gb
CROSS JOIN profiles p
WHERE gb.title = '山姆小青柠汁1L*6瓶'
  AND p.username = 'alice';

INSERT INTO messages (group_buy_id, sender_id, content, message_type)
SELECT
  gb.id,
  p.id,
  '请问什么时候能成团呀？',
  'text'
FROM group_buys gb
CROSS JOIN profiles p
WHERE gb.title = '山姆小青柠汁1L*6瓶'
  AND p.username = 'bob';

INSERT INTO messages (group_buy_id, sender_id, content, message_type)
SELECT
  gb.id,
  p.id,
  '预计明天就能成团，还差3个人！',
  'text'
FROM group_buys gb
CROSS JOIN profiles p
WHERE gb.title = '山姆小青柠汁1L*6瓶'
  AND p.username = 'alice';

-- Messages for 草莓 group buy
INSERT INTO messages (group_buy_id, sender_id, content, message_type)
SELECT
  gb.id,
  p.id,
  '新鲜草莓，明天就到！想吃的抓紧时间参团~',
  'text'
FROM group_buys gb
CROSS JOIN profiles p
WHERE gb.title = '新鲜草莓2斤装'
  AND p.username = 'bob';

-- ============================================================================
-- INSERT SAMPLE TRANSACTIONS
-- ============================================================================

-- Initial deposits for all users
INSERT INTO transactions (user_id, amount, type, description, balance_after)
SELECT id, 150.00, 'deposit', '账户充值', 150.00
FROM profiles WHERE username = 'alice';

INSERT INTO transactions (user_id, amount, type, description, balance_after)
SELECT id, 200.00, 'deposit', '账户充值', 200.00
FROM profiles WHERE username = 'bob';

INSERT INTO transactions (user_id, amount, type, description, balance_after)
SELECT id, 100.00, 'deposit', '账户充值', 100.00
FROM profiles WHERE username = 'charlie';

INSERT INTO transactions (user_id, amount, type, description, balance_after)
SELECT id, 80.00, 'deposit', '账户充值', 80.00
FROM profiles WHERE username = 'diana';

INSERT INTO transactions (user_id, amount, type, description, balance_after)
SELECT id, 120.00, 'deposit', '账户充值', 120.00
FROM profiles WHERE username = 'evan';

-- ============================================================================
-- INSERT SAMPLE NOTIFICATIONS
-- ============================================================================

INSERT INTO notifications (user_id, title, message, type, is_read)
SELECT
  p.id,
  '欢迎使用TT校园拼团',
  '开始您的第一次拼团之旅吧！',
  'info',
  false
FROM profiles p WHERE p.username = 'charlie';

INSERT INTO notifications (user_id, title, message, type, is_read)
SELECT
  p.id,
  '有新人参加您的拼团',
  'Bob Chen 加入了您的"山姆小青柠汁"拼团',
  'group_buy',
  false
FROM profiles p WHERE p.username = 'alice';

INSERT INTO notifications (user_id, title, message, type, is_read)
SELECT
  p.id,
  '参团成功',
  '您已成功参加"新鲜草莓2斤装"拼团',
  'order',
  true
FROM profiles p WHERE p.username = 'charlie';

-- ============================================================================
-- SEED DATA COMPLETE
-- ============================================================================

-- Verify data was inserted
SELECT 'Profiles created: ' || COUNT(*)::text FROM profiles;
SELECT 'Group buys created: ' || COUNT(*)::text FROM group_buys;
SELECT 'Participants added: ' || COUNT(*)::text FROM participants;
SELECT 'Messages created: ' || COUNT(*)::text FROM messages;
SELECT 'Categories created: ' || COUNT(*)::text FROM categories;
SELECT 'Pickup locations created: ' || COUNT(*)::text FROM pickup_locations;
SELECT 'Transactions created: ' || COUNT(*)::text FROM transactions;
SELECT 'Notifications created: ' || COUNT(*)::text FROM notifications;
