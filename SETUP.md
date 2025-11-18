# TT Campus Group Buying App - Setup Guide

## 🚀 Quick Start (Phase 1 Complete)

This guide will help you set up the Supabase backend for the TT Campus Group Buying app.

---

## 📋 Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier is fine)
- Basic understanding of SQL

---

## 🔧 Step-by-Step Setup

### Step 1: Install Dependencies

```bash
npm install
```

Dependencies installed:
- `@supabase/supabase-js` - Supabase JavaScript client
- `react-router-dom` - Routing for React
- All other dependencies from package.json

---

### Step 2: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in project details:
   - **Name:** `tt-group-buying` (or your choice)
   - **Database Password:** Save this securely!
   - **Region:** Choose closest to you
4. Click "Create new project"
5. Wait 2-3 minutes for project to initialize

---

### Step 3: Get API Credentials

1. In your Supabase project dashboard, go to:
   **Settings** → **API**

2. You'll need these two values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (long string starting with `eyJ...`)

---

### Step 4: Configure Environment Variables

1. Copy the example env file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

3. Save the file

⚠️ **Important:** Never commit `.env` to git! It's already in `.gitignore`.

---

### Step 5: Create Database Schema

1. In Supabase Dashboard, go to:
   **SQL Editor** → **New query**

2. Open the file: `supabase/schema.sql`

3. Copy the entire contents and paste into the SQL Editor

4. Click **Run** (or press Ctrl/Cmd + Enter)

5. You should see success messages. This creates:
   - ✅ 8 tables (profiles, group_buys, participants, messages, etc.)
   - ✅ Indexes for performance
   - ✅ Triggers for auto-updates
   - ✅ Functions for business logic

---

### Step 6: Create Test Users

You need to manually create 6 test users in Supabase Auth:

1. Go to: **Authentication** → **Users**

2. Click **Add user** → **Create new user**

3. Create each user with these details:

#### User 1: Alice (Organizer)
- **Email:** `alice@test.com`
- **Password:** `Test1234!`
- **Auto Confirm User:** ✅ Yes
- **User Metadata (JSON):**
  ```json
  {
    "full_name": "Alice Wang",
    "username": "alice"
  }
  ```

#### User 2: Bob (Buyer)
- **Email:** `bob@test.com`
- **Password:** `Test1234!`
- **Auto Confirm User:** ✅ Yes
- **User Metadata:**
  ```json
  {
    "full_name": "Bob Chen",
    "username": "bob"
  }
  ```

#### User 3: Charlie
- **Email:** `charlie@test.com`
- **Password:** `Test1234!`
- **Auto Confirm User:** ✅ Yes
- **User Metadata:**
  ```json
  {
    "full_name": "Charlie Liu",
    "username": "charlie"
  }
  ```

#### User 4: Diana
- **Email:** `diana@test.com`
- **Password:** `Test1234!`
- **Auto Confirm User:** ✅ Yes
- **User Metadata:**
  ```json
  {
    "full_name": "Diana Zhang",
    "username": "diana"
  }
  ```

#### User 5: Evan
- **Email:** `evan@test.com`
- **Password:** `Test1234!`
- **Auto Confirm User:** ✅ Yes
- **User Metadata:**
  ```json
  {
    "full_name": "Evan Wu",
    "username": "evan"
  }
  ```

#### User 6: Admin
- **Email:** `admin@test.com`
- **Password:** `Admin1234!`
- **Auto Confirm User:** ✅ Yes
- **User Metadata:**
  ```json
  {
    "full_name": "Admin User",
    "username": "admin"
  }
  ```

💡 **Tip:** You can also create users programmatically later, but manual creation is simpler for PoC.

---

### Step 7: Seed Sample Data

1. Go back to: **SQL Editor** → **New query**

2. Open the file: `supabase/seed.sql`

3. Copy the entire contents and paste into the SQL Editor

4. Click **Run**

5. This will populate:
   - ✅ User profiles with wallet balances
   - ✅ 8 sample group buying listings
   - ✅ 4 sample orders (participants)
   - ✅ Chat messages
   - ✅ Categories and pickup locations
   - ✅ Sample transactions and notifications

6. Verify at the bottom of the results - you should see counts like:
   ```
   Profiles created: 6
   Group buys created: 8
   Participants added: 4
   Messages created: 4
   ...
   ```

---

### Step 8: Verify Setup

1. Go to **Table Editor** in Supabase

2. Check these tables have data:
   - `profiles` → Should have 6 users
   - `group_buys` → Should have 8 group buys
   - `participants` → Should have 4 participants
   - `categories` → Should have 5 categories
   - `pickup_locations` → Should have 8 locations

---

### Step 9: Start Development Server

```bash
npm run dev
```

The app should open at `http://localhost:3000`

---

## 👥 Test User Accounts

Use these credentials to test the app:

| Role | Email | Password | Description |
|------|-------|----------|-------------|
| **Organizer** | alice@test.com | Test1234! | Has active group buys, receives participants |
| **Buyer** | bob@test.com | Test1234! | Has joined some group buys |
| **New User** | charlie@test.com | Test1234! | Fresh account for testing signup flow |
| **Regular** | diana@test.com | Test1234! | Regular user with some activity |
| **Regular** | evan@test.com | Test1234! | Regular user |
| **Admin** | admin@test.com | Admin1234! | Admin account for testing |

---

## 🧪 Testing Scenarios

### Scenario 1: Browse and Join Group Buys
1. Login as `charlie@test.com`
2. Browse available group buys on home page
3. Click on a group buy to view details
4. Click "Join Group Buy"
5. Check "My Orders" to see your new order

### Scenario 2: Create New Group Buy
1. Login as `alice@test.com`
2. Click the "+" floating button
3. Fill in the form:
   - Product name
   - Price
   - Max participants
   - Pickup location
   - Description
4. Submit to create
5. View in "My Group Buys"

### Scenario 3: View Orders
1. Login as `bob@test.com`
2. Go to "Orders" tab
3. See list of your participated group buys
4. Click on one to view details

### Scenario 4: Chat
1. Login as `bob@test.com`
2. Go to "Chat" tab
3. Open a group chat
4. Send a message

---

## 📁 File Structure

```
tt-app-S3-G26/
├── src/
│   ├── components/          # React components (from Figma)
│   ├── lib/
│   │   └── supabase.ts     # ✅ Supabase client config
│   └── types/
│       └── database.ts      # TypeScript types
├── supabase/
│   ├── schema.sql          # ✅ Database schema
│   └── seed.sql            # ✅ Sample data
├── .env                    # ✅ Your credentials (not in git)
├── .env.example            # ✅ Template
└── SETUP.md               # ✅ This file
```

---

## 🔍 Useful Supabase Dashboard Links

Once your project is created, bookmark these:

- **Home:** `https://supabase.com/dashboard/project/YOUR_PROJECT`
- **Table Editor:** `https://supabase.com/dashboard/project/YOUR_PROJECT/editor`
- **SQL Editor:** `https://supabase.com/dashboard/project/YOUR_PROJECT/sql`
- **Authentication:** `https://supabase.com/dashboard/project/YOUR_PROJECT/auth/users`
- **API Docs:** `https://supabase.com/dashboard/project/YOUR_PROJECT/api`
- **Logs:** `https://supabase.com/dashboard/project/YOUR_PROJECT/logs`

Replace `YOUR_PROJECT` with your actual project ID.

---

## 🐛 Troubleshooting

### Issue: "Missing Supabase environment variables"
- **Solution:** Make sure you created `.env` from `.env.example` and added your credentials

### Issue: Users can't login
- **Solution:**
  1. Check users are created in Supabase Auth
  2. Make sure "Auto Confirm User" was checked
  3. Verify email/password are correct

### Issue: No data showing
- **Solution:**
  1. Run `supabase/schema.sql` first
  2. Then run `supabase/seed.sql`
  3. Check Table Editor to verify data exists

### Issue: Database errors
- **Solution:**
  1. Check SQL Editor for error messages
  2. Make sure schema was created successfully
  3. Try running schema.sql again (it's safe to re-run)

### Issue: Can't create group buys
- **Solution:** Phase 2 needed - components not yet connected to Supabase

---

## 📝 Database Schema Overview

### Core Tables

1. **profiles** - User profiles (extends auth.users)
   - username, full_name, avatar_url, phone
   - wallet_balance, rating

2. **group_buys** - Group buying listings
   - title, description, category
   - price, original_price
   - current_participants, max_participants
   - location, expires_at, status

3. **participants** - Orders/participants
   - Links users to group buys
   - quantity, total_amount, status

4. **messages** - Chat messages
   - group_buy_id, sender_id, content

5. **categories** - Product categories
   - name, icon, color

6. **pickup_locations** - Pickup points
   - name, address, is_active

7. **transactions** - Wallet transactions
   - amount, type (deposit/purchase/refund)

8. **notifications** - User notifications
   - title, message, type, is_read

---

## 🎯 Next Steps (Phase 2)

Phase 1 is now complete! You have:
- ✅ Supabase project set up
- ✅ Database schema created
- ✅ Sample users and data loaded
- ✅ Environment configured

**Phase 2 will include:**
- Connect React components to Supabase
- Implement authentication flow
- Enable CRUD operations
- Basic chat functionality

---

## 💡 Tips for Development

1. **Check Supabase Logs:** When debugging, use the Logs section to see API calls
2. **Use Table Editor:** Manually inspect and edit data during development
3. **SQL Editor:** Run quick queries to check data or test logic
4. **Disable RLS for PoC:** Already done! Row Level Security is OFF for easier development

---

## ⚠️ Security Notes (For Production)

This is a **Proof of Concept** setup. For production, you MUST:

- ✅ Enable Row Level Security (RLS)
- ✅ Create proper security policies
- ✅ Validate all inputs
- ✅ Use environment variables properly
- ✅ Enable rate limiting
- ✅ Add proper error handling
- ✅ Use strong passwords
- ✅ Enable 2FA for admin accounts

---

## 📞 Support

If you run into issues:
1. Check the Troubleshooting section above
2. Review Supabase logs
3. Check the [Supabase documentation](https://supabase.com/docs)

---

**Phase 1 Complete! 🎉**

You're ready to start connecting the frontend to Supabase in Phase 2.
