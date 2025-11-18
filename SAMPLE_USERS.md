# 🔑 Sample User Credentials - Quick Reference

## Login Credentials for Testing

| # | Name | Email | Password | Role | Wallet | Notes |
|---|------|-------|----------|------|--------|-------|
| 1 | Alice Wang | `alice@test.com` | `Test1234!` | **Organizer** | ¥150.00 | Has 3 active group buys |
| 2 | Bob Chen | `bob@test.com` | `Test1234!` | **Buyer** | ¥200.00 | Has 2 group buys, 1 order |
| 3 | Charlie Liu | `charlie@test.com` | `Test1234!` | New User | ¥100.00 | Has 1 order |
| 4 | Diana Zhang | `diana@test.com` | `Test1234!` | Regular | ¥80.00 | Has 2 group buys |
| 5 | Evan Wu | `evan@test.com` | `Test1234!` | Regular | ¥120.00 | Has 1 order |
| 6 | Admin User | `admin@test.com` | `Admin1234!` | **Admin** | ¥500.00 | For admin testing |

---

## Quick Copy-Paste

### Alice (Organizer)
```
Email: alice@test.com
Password: Test1234!
```

### Bob (Buyer)
```
Email: bob@test.com
Password: Test1234!
```

### Charlie (New User)
```
Email: charlie@test.com
Password: Test1234!
```

### Admin
```
Email: admin@test.com
Password: Admin1234!
```

---

## User Details

### 👤 Alice Wang (Primary Organizer)
- **Email:** alice@test.com
- **Password:** Test1234!
- **Phone:** +86 138 0000 0001
- **Wallet:** ¥150.00
- **Rating:** 4.8/5.0
- **Active Group Buys:**
  - 山姆小青柠汁1L*6瓶 (¥56, 6 people needed)
  - 高数教材打印版 (¥25, 8 people needed)
  - 瑞幸咖啡券20张 (Completed)

### 👤 Bob Chen (Active Buyer & Organizer)
- **Email:** bob@test.com
- **Password:** Test1234!
- **Phone:** +86 138 0000 0002
- **Wallet:** ¥200.00
- **Rating:** 4.9/5.0
- **Active Group Buys:**
  - 新鲜草莓2斤装 (¥35, 4 people needed)
  - iPhone数据线3条装 (¥49, 5 people needed)
- **Orders:**
  - Joined: 山姆小青柠汁1L*6瓶

### 👤 Charlie Liu (New User)
- **Email:** charlie@test.com
- **Password:** Test1234!
- **Phone:** +86 138 0000 0003
- **Wallet:** ¥100.00
- **Rating:** 5.0/5.0
- **Active Group Buys:**
  - 奶茶券10张 (¥60, 3 people needed)
- **Orders:**
  - Joined: 新鲜草莓2斤装

### 👤 Diana Zhang (Regular User)
- **Email:** diana@test.com
- **Password:** Test1234!
- **Phone:** +86 138 0000 0004
- **Wallet:** ¥80.00
- **Rating:** 4.7/5.0
- **Active Group Buys:**
  - 进口零食大礼包 (¥89, 4 people needed)
  - 有机蔬菜套餐 (¥42, 6 people needed)
- **Orders:**
  - Joined: 山姆小青柠汁1L*6瓶

### 👤 Evan Wu (Regular User)
- **Email:** evan@test.com
- **Password:** Test1234!
- **Phone:** +86 138 0000 0005
- **Wallet:** ¥120.00
- **Rating:** 4.6/5.0
- **Orders:**
  - Joined: 有机蔬菜套餐

### 👤 Admin User (Administrator)
- **Email:** admin@test.com
- **Password:** Admin1234!
- **Phone:** +86 138 0000 0000
- **Wallet:** ¥500.00
- **Rating:** 5.0/5.0
- **Purpose:** Admin testing and management

---

## 🧪 Recommended Test Flows

### Test Flow 1: New User Journey
**Login as:** charlie@test.com
1. Browse group buys on home page
2. View group buy details
3. Join a group buy
4. Check "My Orders"
5. View wallet balance

### Test Flow 2: Organizer Journey
**Login as:** alice@test.com
1. View "My Group Buys"
2. See participants joining
3. Create new group buy
4. Manage existing group buys
5. Check chat messages

### Test Flow 3: Active Buyer Journey
**Login as:** bob@test.com
1. Browse and join multiple group buys
2. Check order status
3. Chat with organizer
4. View transaction history

### Test Flow 4: Complete Cycle
1. **Alice** creates a group buy
2. **Bob** joins the group buy
3. **Charlie** joins the group buy
4. Group becomes full
5. Everyone checks order status
6. Chat about pickup details

---

## 📊 Sample Data Overview

### Active Group Buys (8 total)
- 山姆小青柠汁 - Alice - ¥56 - 6 people
- 高数教材打印版 - Alice - ¥25 - 8 people
- 新鲜草莓2斤装 - Bob - ¥35 - 4 people
- iPhone数据线 - Bob - ¥49 - 5 people
- 奶茶券10张 - Charlie - ¥60 - 3 people
- 进口零食大礼包 - Diana - ¥89 - 4 people
- 有机蔬菜套餐 - Diana - ¥42 - 6 people
- 瑞幸咖啡券 - Alice - Completed ✅

### Current Participants
- Bob → 山姆小青柠汁
- Charlie → 新鲜草莓
- Diana → 山姆小青柠汁
- Evan → 有机蔬菜套餐

---

## ⚠️ Security Notice

**These are test credentials for development only!**

- Do NOT use in production
- All passwords are simple for testing
- No real security implemented (PoC)
- RLS is disabled in database

---

## 🔄 Reset Instructions

To reset all sample data:
1. Go to Supabase SQL Editor
2. Run: `DELETE FROM participants; DELETE FROM messages; DELETE FROM group_buys;`
3. Re-run `supabase/seed.sql`

---

**Last Updated:** Phase 1 - Initial Setup
