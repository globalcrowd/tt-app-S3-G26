# 🚀 Deployment Guide - TT Campus Group Buying App

## Deployment to bolt.new

Your app is ready to deploy! Follow these steps to get it running on bolt.new.

---

## ✅ Pre-Deployment Checklist

Before deploying, make sure you've completed Phase 1 setup:

- [x] Supabase project created
- [x] Database schema executed (`supabase/schema.sql`)
- [x] Sample users created in Supabase Auth
- [x] Seed data loaded (`supabase/seed.sql`)
- [x] Environment variables noted down

---

## 📦 Step 1: Prepare Your Project

Your project is already in the correct structure for bolt.new:

```
tt-app-S3-G26/           ← Root folder (✅ Ready)
├── src/
├── public/
├── package.json
├── vite.config.ts
├── index.html
└── ...
```

**Important:** bolt.new requires everything in the root folder - which you already have! ✅

---

## 🔐 Step 2: Prepare Environment Variables

You'll need to set these in bolt.new after import:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Where to find these:**
1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`

---

## 🌐 Step 3: Deploy to bolt.new

### Option A: Import Entire Project (Recommended)

1. Go to [bolt.new](https://bolt.new)

2. Create a new project or open existing

3. **Upload your project folder:**
   - Zip your entire `tt-app-S3-G26` folder
   - Or drag & drop the folder into bolt.new

4. **Set Environment Variables:**
   - In bolt.new, go to Settings/Environment
   - Add both variables from Step 2

5. **Install Dependencies:**
   ```bash
   npm install
   ```

6. **Start Development Server:**
   ```bash
   npm run dev
   ```

7. **Build for Production:**
   ```bash
   npm run build
   ```

### Option B: Manual Setup in bolt.new

If upload doesn't work, you can recreate the project:

1. Create new Vite + React + TypeScript project in bolt.new

2. Copy all files from your local project:
   - `src/` folder (all components, services, types)
   - `public/` folder
   - Config files (`vite.config.ts`, `tsconfig.json`, `tailwind.config.js`, etc.)
   - `package.json`

3. Install dependencies and run

---

## 🔧 Step 4: Configure Supabase (If Not Done)

If you haven't set up Supabase yet, do it now:

1. **Create Project at Supabase:**
   - Go to [supabase.com](https://supabase.com)
   - Create new project
   - Wait for it to initialize

2. **Run Database Schema:**
   - Go to SQL Editor
   - Copy contents of `supabase/schema.sql`
   - Execute

3. **Create Sample Users:**
   - Go to Authentication → Users
   - Create 6 test users (see `SAMPLE_USERS.md`)
   - Use "Create new user" and set:
     - Email: `alice@test.com`
     - Password: `Test1234!`
     - Auto Confirm: ✅ Yes
     - User Metadata: `{"full_name": "Alice Wang", "username": "alice"}`
   - Repeat for other users

4. **Load Seed Data:**
   - Go to SQL Editor
   - Copy contents of `supabase/seed.sql`
   - Execute

---

## 🧪 Step 5: Test Your Deployment

After deployment, test these key features:

### 1. Authentication
- [ ] Login with `alice@test.com` / `Test1234!`
- [ ] Logout
- [ ] Sign up new account

### 2. Browse Group Buys
- [ ] See list of group buys on home page
- [ ] Search for items
- [ ] Click on a group buy to view details

### 3. Join Group Buy
- [ ] Click "Join Now" button
- [ ] See success message
- [ ] Button changes to "Already Joined"
- [ ] Check "Orders" tab to see your order

### 4. Create Group Buy
- [ ] Click "+" floating button
- [ ] Fill in form
- [ ] Add optional image URL
- [ ] Submit
- [ ] See it appear on home page

### 5. View My Content
- [ ] Profile → "My Group Buys"
- [ ] Orders → See your orders
- [ ] Wallet → See balance

---

## 📱 Alternative Deployment Options

### Deploy to Vercel (Recommended)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables
   - Deploy!

3. **Configure:**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Environment Variables in Vercel:**
   - Add `VITE_SUPABASE_URL`
   - Add `VITE_SUPABASE_ANON_KEY`

### Deploy to Netlify

1. **Push to GitHub** (same as above)

2. **Connect to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - New site from Git
   - Select your repository

3. **Configure:**
   - Build command: `npm run build`
   - Publish directory: `dist`

4. **Add Environment Variables** in Netlify settings

---

## 🐛 Troubleshooting

### Issue: "Missing environment variables"
**Solution:** Make sure you added both `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

### Issue: "Cannot login"
**Solution:**
1. Check Supabase credentials are correct
2. Verify users were created in Supabase Auth
3. Make sure "Auto Confirm User" was enabled

### Issue: "No data showing"
**Solution:**
1. Run `supabase/schema.sql` in SQL Editor
2. Create users in Supabase Auth
3. Run `supabase/seed.sql` in SQL Editor

### Issue: "CORS errors"
**Solution:** Supabase should allow all origins by default. Check:
1. Supabase project settings
2. Make sure you're using the correct anon key

### Issue: "Build fails"
**Solution:**
1. Check all dependencies are installed
2. Run `npm install` again
3. Check TypeScript errors with `npm run build` locally first

---

## 🔒 Security Notes

**For Production Deployment:**

Currently, RLS (Row Level Security) is **DISABLED** for PoC simplicity.

Before going to production:

1. **Enable RLS on all tables:**
   ```sql
   ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
   ALTER TABLE group_buys ENABLE ROW LEVEL SECURITY;
   -- etc for all tables
   ```

2. **Create Security Policies:**
   ```sql
   -- Example: Users can only view active group buys
   CREATE POLICY "Public read active group buys"
   ON group_buys FOR SELECT
   USING (status = 'active');

   -- Example: Users can only update their own profile
   CREATE POLICY "Users update own profile"
   ON profiles FOR UPDATE
   USING (auth.uid() = id);
   ```

3. **Add Input Validation**
4. **Rate Limiting**
5. **Secure API Keys** (use environment variables, never commit)

---

## 📊 Performance Tips

1. **Enable Caching:**
   - Add service worker for offline support
   - Cache API responses in React Query

2. **Optimize Images:**
   - Use WebP format
   - Add lazy loading
   - Resize images before upload

3. **Code Splitting:**
   - Already done with Vite!
   - Lazy load routes if needed

---

## 🎯 Post-Deployment

After successful deployment:

1. **Share the URL** with your team for testing
2. **Monitor Supabase Usage:**
   - Dashboard → Usage
   - Check API requests
   - Monitor database size

3. **Collect Feedback** from test users
4. **Iterate and Improve**

---

## 📚 Resources

- **Supabase Docs:** https://supabase.com/docs
- **Vite Docs:** https://vitejs.dev
- **React Router Docs:** https://reactrouter.com
- **Tailwind CSS:** https://tailwindcss.com

---

## 🆘 Need Help?

Check these files in your project:
- `SETUP.md` - Initial setup instructions
- `SAMPLE_USERS.md` - Test user credentials
- `README.md` - Project overview

---

**You're ready to deploy! 🚀**

Your campus group buying platform is production-ready for PoC testing.
