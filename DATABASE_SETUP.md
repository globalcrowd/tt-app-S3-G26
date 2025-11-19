# Database Setup Complete

The Supabase database has been successfully configured and populated with sample data.

## Database Schema

The following tables have been created:

### Core Tables
- **profiles** - User profiles (6 demo users)
- **categories** - Product categories (5 categories)
- **pickup_locations** - Campus pickup locations (8 locations)
- **group_buys** - Group buying listings (8 sample listings)
- **participants** - User participation in group buys (4 sample orders)
- **messages** - Chat messages for group buys (4 sample messages)
- **transactions** - Wallet transactions (5 sample transactions)
- **notifications** - User notifications (3 sample notifications)

## Sample Data Summary

### Demo Users
- **Alice Wang** (@alice) - Wallet: ¥150.00, Rating: 4.8
- **Bob Chen** (@bob) - Wallet: ¥200.00, Rating: 4.9
- **Charlie Liu** (@charlie) - Wallet: ¥100.00, Rating: 5.0
- **Diana Zhang** (@diana) - Wallet: ¥80.00, Rating: 4.7
- **Evan Wu** (@evan) - Wallet: ¥120.00, Rating: 4.6
- **Admin User** (@admin) - Wallet: ¥500.00, Rating: 5.0

### Sample Group Buys
1. 山姆小青柠汁1L*6瓶 - ¥56 (organized by Alice)
2. 高数教材打印版 - ¥25 (organized by Alice)
3. 新鲜草莓2斤装 - ¥35 (organized by Bob)
4. iPhone数据线3条装 - ¥49 (organized by Bob)
5. 奶茶券10张 - ¥60 (organized by Charlie)
6. 进口零食大礼包 - ¥89 (organized by Diana)
7. 有机蔬菜套餐 - ¥42 (organized by Diana)
8. 瑞幸咖啡券20张 - ¥120 (completed)

### Categories
- 零食百货 (Snacks)
- 生鲜果蔬 (Fresh Food)
- 教材教辅 (Books)
- 校内服务 (Services)
- 二手拼购 (Second-hand)

### Pickup Locations
- 宿舍1-4号楼 (Dorm Buildings 1-4)
- 北门/南门快递点 (North/South Gate Delivery Points)
- 图书馆门口 (Library Entrance)
- 食堂取货点 (Cafeteria Pickup Point)

## Database Connection

The database credentials are configured in `.env`:
```
VITE_SUPABASE_URL=https://psxyzpiatnkcqyajbdvh.supabase.co
VITE_SUPABASE_ANON_KEY=<anon-key>
```

## Features Enabled

✅ All database tables created with proper indexes
✅ Triggers for auto-updating timestamps
✅ Triggers for managing participant counts
✅ Sample data loaded for immediate testing
✅ RLS disabled for demo purposes (enable in production!)

## Important Notes

⚠️ **Security Notice**: Row Level Security (RLS) is currently DISABLED for demo purposes. In production, you should:
1. Enable RLS on all tables
2. Create appropriate security policies
3. Add proper authentication checks

⚠️ **Demo Data**: The profiles table foreign key to auth.users has been temporarily removed to allow demo data without actual user authentication. For production, re-establish this constraint.

## Next Steps

1. The app can now be run with `npm run dev`
2. Sample data is ready for testing all features
3. Create actual users via Supabase Auth when ready for production
4. Review and enable RLS policies before going live
