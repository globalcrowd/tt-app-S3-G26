# Creating Test Users - Quick Start Guide

The database already has demo profiles with group buys, messages, and wallet balances. When you create these auth users, they will **automatically link to the existing demo data**!

## Option 1: Use the App's Signup Feature (Recommended & Easiest)

1. Start the app with `npm run dev`
2. Click "Sign Up" on the login page
3. Create users with these credentials:

### Test Users to Create:

**User 1: Alice Wang**
- Email: `alice@test.com`
- Password: `Test1234!`
- Full Name: `Alice Wang`

**User 2: Bob Chen**
- Email: `bob@test.com`
- Password: `Test1234!`
- Full Name: `Bob Chen`

**User 3: Charlie Liu**
- Email: `charlie@test.com`
- Password: `Test1234!`
- Full Name: `Charlie Liu`

**User 4: Diana Zhang**
- Email: `diana@test.com`
- Password: `Test1234!`
- Full Name: `Diana Zhang`

**User 5: Evan Wu**
- Email: `evan@test.com`
- Password: `Test1234!`
- Full Name: `Evan Wu`

**User 6: Admin User**
- Email: `admin@test.com`
- Password: `Admin1234!`
- Full Name: `Admin User`

## Option 2: Use Supabase Dashboard

1. Go to your Supabase project: https://supabase.com/dashboard/project/psxyzpiatnkcqyajbdvh
2. Navigate to: Authentication > Users
3. Click "Add User" (or "Invite User")
4. Create each user with the email and password above
5. Set Auto Confirm to ON (to skip email verification)

## After Creating Users

Once users are created via signup or Supabase dashboard, the database trigger will:
1. ✅ Automatically link them to existing profiles by matching username
2. ✅ Transfer all existing data (wallet balance, group buys, messages)
3. ✅ Update all related records with the new auth user ID

Each profile has pre-loaded:
- **Wallet balances** (¥80-500)
- **Group buy listings** (8 total, 7 active)
- **Participation records** (4 orders)
- **Chat messages** (4 messages)
- **Transactions** (5 deposits)
- **Notifications** (3 notifications)

## Quick Test Login

After creating at least one user, test login with:
- **Email**: `alice@test.com`
- **Password**: `Test1234!`

You'll immediately see:
- Alice's wallet balance: ¥150.00
- 2 group buys she organized (青柠汁 and 高数教材)
- 2 participants in her group buys
- 3 chat messages in the 青柠汁 group

## What Happens When You Sign Up

When you create "alice@test.com":
1. Username extracted: "alice"
2. System finds existing profile with username "alice"
3. Profile data migrated to new auth user ID
4. All Alice's group buys, orders, and messages linked
5. Login works immediately with full data!
