# 🚀 Quick Start Guide - Campus Group Buy App

## Current Status

✅ **Database**: Fully configured with schema and sample data
✅ **Build**: Project builds successfully
✅ **Ready**: App is ready to run with pre-loaded demo data

## 📋 Test User Credentials

Create these users to test the app (use either signup page or Supabase dashboard):

| Email | Password | Full Name | Features |
|-------|----------|-----------|----------|
| `alice@test.com` | `Test1234!` | Alice Wang | Has 2 group buys, ¥150 wallet |
| `bob@test.com` | `Test1234!` | Bob Chen | Has 2 group buys, ¥200 wallet |
| `charlie@test.com` | `Test1234!` | Charlie Liu | Has 1 group buy, ¥100 wallet |
| `diana@test.com` | `Test1234!` | Diana Zhang | Has 2 group buys, ¥80 wallet |
| `evan@test.com` | `Test1234!` | Evan Wu | Has orders, ¥120 wallet |
| `admin@test.com` | `Admin1234!` | Admin User | Admin access, ¥500 wallet |

## 🎯 How to Start

### Step 1: Create Your First Test User

**Option A: Use App Signup (Easiest)**
```bash
npm run dev
```
1. Open the app in browser
2. Click "Sign Up"
3. Use credentials: `alice@test.com` / `Test1234!` / `Alice Wang`
4. Click "Sign Up" button
5. Switch to login and enter same email/password

**Option B: Use Supabase Dashboard**
1. Go to: https://supabase.com/dashboard/project/psxyzpiatnkcqyajbdvh/auth/users
2. Click "Add User"
3. Email: `alice@test.com`, Password: `Test1234!`
4. Set "Auto Confirm Email" to ON
5. Click "Create User"

### Step 2: Login & Explore

After creating Alice:
- Login with `alice@test.com` / `Test1234!`
- You'll see Alice's complete profile with:
  - ¥150.00 wallet balance
  - 2 active group buys she organized
  - Messages in group buy chat
  - Transaction history

### Step 3: Create More Users

Repeat Step 1 for other users to see full app functionality:
- Create Bob to see his group buys
- Create Charlie to see his order in Bob's strawberry group
- Each user has unique data pre-loaded!

## 📊 Pre-loaded Demo Data

### 8 Active Group Buys
1. **山姆小青柠汁** - ¥56 (Alice)
2. **高数教材打印版** - ¥25 (Alice)
3. **新鲜草莓2斤装** - ¥35 (Bob)
4. **iPhone数据线** - ¥49 (Bob)
5. **奶茶券10张** - ¥60 (Charlie)
6. **进口零食大礼包** - ¥89 (Diana)
7. **有机蔬菜套餐** - ¥42 (Diana)
8. **瑞幸咖啡券** - ¥120 (Completed)

### 5 Product Categories
- 零食百货 (Snacks)
- 生鲜果蔬 (Fresh Food)
- 教材教辅 (Books)
- 校内服务 (Services)
- 二手拼购 (Second-hand)

### 8 Pickup Locations
- Dorm Buildings 1-4
- North/South Gate Delivery Points
- Library Entrance
- Cafeteria Pickup Point

## 🔧 Technical Details

**Database**: Supabase PostgreSQL
**Frontend**: React + TypeScript + Vite
**Styling**: Tailwind CSS v4
**Auth**: Supabase Auth (email/password)

**Environment Variables** (already configured in .env):
```
VITE_SUPABASE_URL=https://psxyzpiatnkcqyajbdvh.supabase.co
VITE_SUPABASE_ANON_KEY=<configured>
```

## 🎨 Features to Test

After logging in as different users, you can test:

### As Alice (Organizer)
- ✅ View your 2 group buys
- ✅ See participants who joined
- ✅ Chat with participants
- ✅ Check wallet balance (¥150)

### As Bob (Participant & Organizer)
- ✅ Join Alice's group buy
- ✅ Create your own group buys
- ✅ Send messages in chat
- ✅ View transaction history

### As Charlie (Participant)
- ✅ Browse available group buys
- ✅ Join Bob's strawberry group
- ✅ Check notifications
- ✅ View order status

## 🔒 Security Note

⚠️ **Current Setup**: Row Level Security (RLS) is **DISABLED** for demo purposes.

**Before Production**:
1. Enable RLS on all tables
2. Create proper security policies
3. Add authentication checks
4. Review and test all access patterns

## 📖 Additional Documentation

- `DATABASE_SETUP.md` - Complete database schema documentation
- `CREATE_TEST_USERS.md` - Detailed user creation guide
- `SAMPLE_USERS.md` - User profiles and data overview

## 🐛 Troubleshooting

**Login fails with "Invalid credentials"**
- You need to create the auth user first (see Step 1)
- Profile data exists, but no auth user yet

**No data shows after login**
- The trigger should auto-link profiles
- Check username matches (e.g., alice@test.com → username: alice)
- Verify email exactly matches test user email

**Build errors**
- Run `npm install` to ensure all dependencies installed
- Check that NODE_ENV is not set to "production" during development

## ✅ Success Checklist

- [ ] Database schema applied (8 tables created)
- [ ] Sample data loaded (6 profiles, 8 group buys)
- [ ] At least one test user created
- [ ] Successful login with test credentials
- [ ] Can see pre-loaded group buys and data
- [ ] App running without errors

**Need Help?** Check the error console in browser DevTools for detailed error messages.
