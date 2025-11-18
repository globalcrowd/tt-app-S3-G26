# ✅ Testing Checklist - TT Campus Group Buying App

## Complete Testing Guide for Your PoC

Use this checklist to thoroughly test your app before showing it to stakeholders.

---

## 🔐 1. Authentication & User Management

### Login Flow
- [ ] **Login with existing user**
  - Email: `alice@test.com` / Password: `Test1234!`
  - Should redirect to home page
  - Should show success toast message

- [ ] **Login with wrong password**
  - Should show error message
  - Should NOT redirect

- [ ] **Login with non-existent email**
  - Should show error message

### Sign Up Flow
- [ ] **Create new account**
  - Use unique email
  - Fill all required fields
  - Should create account
  - Should show success message

- [ ] **Sign up with existing email**
  - Should show error

- [ ] **Password mismatch**
  - Different password & confirm password
  - Should show error

### Session Persistence
- [ ] **Reload page while logged in**
  - Should remain logged in
  - Should not show login page

- [ ] **Logout**
  - Click logout in profile
  - Should return to login
  - Reload should show login page

---

## 🏠 2. Home Page & Browse

### Data Loading
- [ ] **Home page loads data**
  - See list of group buys
  - Images display correctly
  - Prices show correctly
  - Participant counts visible

- [ ] **Empty state** (if no data)
  - Appropriate message shown

- [ ] **Loading state**
  - Shows while fetching data

### Search Functionality
- [ ] **Search by keyword**
  - Type "山姆" or "草莓"
  - Results filter correctly

- [ ] **Clear search**
  - Clear search box
  - All results show again

- [ ] **No results**
  - Search for nonsense text
  - Shows "no results" message

### Navigation
- [ ] **Click on group buy**
  - Opens detail page
  - Shows correct information

- [ ] **Bottom navigation**
  - Home tab works
  - Orders tab works
  - Chat tab works
  - Profile tab works

- [ ] **Category navigation**
  - Click on category icon
  - (Currently may not filter - that's OK for PoC)

---

## 📦 3. Group Buy Details

### View Details
- [ ] **Detail page shows:**
  - Product image
  - Title and description
  - Current price & original price
  - Participant count (X/Y)
  - Time remaining
  - Location
  - Organizer info

- [ ] **Participants section**
  - Shows avatars of current participants
  - Shows "Need X more" message

### Join Group Buy
- [ ] **Join as new participant**
  - Login as `charlie@test.com`
  - Click "Join Now"
  - Shows success message
  - Button changes to "Already Joined"
  - Participant count increases

- [ ] **Already joined**
  - Try to join same group buy again
  - Button shows "Already Joined"
  - Button is disabled

- [ ] **View participant list**
  - See updated participant count
  - See avatars of all participants

### Navigation from Detail
- [ ] **Back button**
  - Returns to previous page

- [ ] **Share button**
  - Shows share dialog
  - Copy link works

- [ ] **Contact organizer**
  - Opens chat (if implemented)

---

## ➕ 4. Create Group Buy

### Form Validation
- [ ] **Empty form**
  - Try to submit empty
  - Should show error

- [ ] **Required fields only**
  - Fill: title, price, location
  - Should create successfully

- [ ] **All fields**
  - Fill all fields including optional ones
  - Add image URL from Unsplash
  - Should create successfully

### Template Selection
- [ ] **Use template**
  - Click on a template
  - Fields auto-populate
  - Can modify before submitting

### Category & Location
- [ ] **Select category**
  - Choose from dropdown
  - Saves correctly

- [ ] **Select location**
  - Choose from dropdown
  - Saves correctly

### Creation Success
- [ ] **After creation:**
  - Shows success toast
  - Redirects to home page
  - New group buy appears in list
  - New group buy appears in "My Group Buys"

### Sample Test Data
Create a group buy with:
```
Title: Test拼团商品
Category: 零食百货
Image URL: https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400
Price: 50
Original Price: 80
Max Participants: 5
Duration: 24 hours
Location: 宿舍1号楼
Description: 这是测试拼团
```

---

## 📋 5. My Group Buys

### View My Listings
- [ ] **Login as organizer** (`alice@test.com`)
  - Profile → "My Group Buys"
  - See all created group buys

- [ ] **Stats display correctly**
  - Active count
  - Completed count
  - Total count

- [ ] **Group buy cards show:**
  - Title
  - Image
  - Status badge (active/completed)
  - Participant count
  - Price
  - Location

### Click on My Group Buy
- [ ] **Opens detail page**
  - Shows full details
  - Can manage participants (if implemented)

---

## 🛒 6. Orders / Order Management

### View Orders
- [ ] **Login as participant** (`bob@test.com`)
  - Go to Orders tab
  - See list of joined group buys

- [ ] **Order information shows:**
  - Group buy title
  - Image
  - Status
  - Price paid
  - Organizer info
  - Pickup location

### Filter Orders
- [ ] **Tab filtering** (if implemented)
  - All orders
  - Pending
  - Completed

### Click on Order
- [ ] **Opens order detail**
  - Shows full information
  - Can view group buy details

---

## 💬 7. Chat (Optional - Partially Implemented)

### Chat List
- [ ] **View chat list**
  - Shows conversations
  - Shows last message preview
  - Shows unread count (if implemented)

### Chat Detail
- [ ] **Open chat**
  - Shows message history
  - Can send message
  - Messages appear in real-time (if implemented)

- [ ] **Send message**
  - Type message
  - Press send
  - Message appears
  - Other users see it (test with 2 accounts)

---

## 👤 8. Profile & Settings

### Profile Page
- [ ] **View profile**
  - Shows user name
  - Shows email
  - Shows wallet balance
  - Shows stats

### My Group Buys
- [ ] **Access from profile**
  - Click "My Group Buys"
  - Opens correctly

### Wallet
- [ ] **View wallet**
  - Shows balance
  - Shows transaction history (if implemented)

### Settings
- [ ] **Open settings**
  - Privacy settings accessible
  - Security settings accessible
  - Terms accessible

### Logout
- [ ] **Logout works**
  - Click logout button
  - Confirms logout
  - Returns to login screen

---

## 🔄 9. Cross-Feature Testing

### User Journey 1: Complete Cycle
1. [ ] **Login** as alice@test.com
2. [ ] **Create** a new group buy
3. [ ] **Logout**
4. [ ] **Login** as bob@test.com
5. [ ] **Find** Alice's group buy on home
6. [ ] **Join** the group buy
7. [ ] **Check** orders tab - see new order
8. [ ] **Logout**
9. [ ] **Login** back as alice@test.com
10. [ ] **Check** "My Group Buys" - see Bob joined
11. [ ] **View** participant list - see Bob

### User Journey 2: Search and Join
1. [ ] **Login** as charlie@test.com
2. [ ] **Search** for "草莓" or "strawberry"
3. [ ] **Click** on result
4. [ ] **Join** group buy
5. [ ] **Go to** orders
6. [ ] **Verify** order appears

### User Journey 3: Multiple Joins
1. [ ] **Login** as diana@test.com
2. [ ] **Join** 3 different group buys
3. [ ] **Check** orders tab
4. [ ] **Verify** all 3 appear
5. [ ] **Click** on each to view details

---

## 📱 10. UI/UX Testing

### Responsive Design
- [ ] **Mobile view** (< 640px)
  - Layout looks good
  - Buttons are touchable
  - Text is readable

- [ ] **Tablet view** (640-1024px)
  - Comfortable layout

- [ ] **Desktop view** (> 1024px)
  - Not too wide
  - Centered content

### Loading States
- [ ] **Spinners/loaders show** during:
  - Login
  - Data fetching
  - Creating group buy
  - Joining group buy

### Error Messages
- [ ] **User-friendly errors**
  - Clear Chinese/English messages
  - Toast notifications work
  - Errors don't crash app

### Images
- [ ] **Images load correctly**
  - Product images show
  - Fallback images work if URL broken
  - Avatars display

---

## 🌐 11. Browser Compatibility

Test on:
- [ ] **Chrome** (latest)
- [ ] **Safari** (if available)
- [ ] **Firefox** (if available)
- [ ] **Mobile browsers** (Chrome Mobile, Safari iOS)

---

## 🔒 12. Security & Data Testing

### Data Persistence
- [ ] **Data survives reload**
  - Create group buy
  - Refresh page
  - Still shows in list

- [ ] **Data syncs across sessions**
  - Create in one browser
  - Open another browser
  - Data appears

### Prevent Duplicate Actions
- [ ] **Can't join twice**
  - Join group buy
  - Try to join again
  - Should prevent

- [ ] **Form validation**
  - Prevents empty submissions
  - Validates email format
  - Validates number fields

---

## 📊 13. Database Verification

### Check in Supabase Dashboard

- [ ] **New users appear** in `auth.users`
- [ ] **New profiles** created in `profiles` table
- [ ] **Group buys** in `group_buys` table
- [ ] **Participants** in `participants` table
- [ ] **Messages** in `messages` table (if chat used)

### Data Integrity
- [ ] **Participant counts match**
  - Count in `participants` table
  - Matches `current_participants` field

- [ ] **Foreign keys work**
  - All references valid
  - No orphaned data

---

## 🐛 14. Bug Testing

### Common Issues to Check
- [ ] **Images with spaces in URL** - handle gracefully
- [ ] **Very long titles** - truncate properly
- [ ] **Past expiration dates** - show as expired
- [ ] **Full group buys** - handle correctly
- [ ] **Network errors** - show error message
- [ ] **Slow connections** - loading states work

---

## ✨ 15. Final Checks

### Before Demo
- [ ] **All sample users work**
- [ ] **Sample data visible**
- [ ] **No console errors**
- [ ] **All links work**
- [ ] **Images load**
- [ ] **Smooth animations**

### Performance
- [ ] **Page loads in < 3 seconds**
- [ ] **Smooth scrolling**
- [ ] **No lag when typing**
- [ ] **Quick navigation**

---

## 📋 Test Accounts Summary

Use these for testing different roles:

| Account | Email | Password | Role | Use For |
|---------|-------|----------|------|---------|
| Alice | alice@test.com | Test1234! | Organizer | Creating group buys |
| Bob | bob@test.com | Test1234! | Active user | Joining & creating |
| Charlie | charlie@test.com | Test1234! | New user | Fresh user journey |
| Diana | diana@test.com | Test1234! | Buyer | Joining multiple |
| Evan | evan@test.com | Test1234! | Regular | General testing |
| Admin | admin@test.com | Admin1234! | Admin | Admin features |

---

## 🎯 Priority Testing

If time is limited, focus on these **CRITICAL** tests:

1. ✅ Login works (alice@test.com)
2. ✅ Home page shows data
3. ✅ Can view group buy detail
4. ✅ Can join group buy
5. ✅ Can create new group buy
6. ✅ New group buy appears in list
7. ✅ Orders tab shows joined items
8. ✅ Logout works

---

## 📝 Test Results Template

Use this to track issues:

```markdown
## Test Session: [Date]

**Tester:** [Name]
**Browser:** [Chrome/Safari/etc]
**Device:** [Desktop/Mobile]

### Issues Found:
1. [Issue description]
   - Severity: [High/Medium/Low]
   - Steps to reproduce
   - Expected vs Actual

### Passed Tests: X/Y

### Notes:
- [Any observations]
```

---

**Happy Testing! 🧪**

If you find bugs, that's great - it means the testing is working!
