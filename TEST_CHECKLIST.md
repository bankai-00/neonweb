# Neonfolio Authentication & Profile Management - Test Checklist

## 📋 Quick Reference

**Files to Test:**
- `/pages/login.html` - User login
- `/pages/register.html` - User registration
- `/pages/showcase.html` - Profile management (NEW - authentication-based)

**localStorage Keys to Verify:**
- `currentUser` - Current logged-in user (or null if logged out)
- `users` - Array of all registered users
- `profiles` - Array of all user profiles (with ownerId field)

---

## ✅ FEATURE CHECKLIST

### 1️⃣ AUTHENTICATION FLOW

#### Test 1.1: Register New User
```
Steps:
  1. Open register.html
  2. Fill form:
     - Username: testuser1
     - Email: test@example.com
     - Password: password123
  3. Click Register
  
Expected Results:
  ✅ User object created in localStorage
  ✅ User appears in 'users' array
  ✅ Can proceed to login
  ✅ Browser console shows: User registered successfully
```

#### Test 1.2: Login with Valid Credentials
```
Steps:
  1. Open login.html
  2. Enter credentials from Test 1.1
  3. Click Login
  
Expected Results:
  ✅ currentUser set in localStorage
  ✅ Redirects to showcase.html (or shows success)
  ✅ Can see user info in header
```

#### Test 1.3: Try Login with Wrong Password
```
Steps:
  1. Open login.html
  2. Enter wrong password
  3. Click Login
  
Expected Results:
  ❌ Login fails
  ✅ Alert shows error message
  ✅ currentUser NOT set
```

#### Test 1.4: Logout
```
Steps:
  1. Login to showcase.html
  2. Click Logout button
  3. Confirm logout
  
Expected Results:
  ✅ currentUser cleared from localStorage
  ✅ Page reloads
  ✅ Login alert appears
  ✅ User info disappears from header
```

---

### 2️⃣ PROFILE CREATION (ONE PER USER)

#### Test 2.1: Create First Profile
```
Steps:
  1. Login to showcase.html
  2. Click "Create Your Profile" button
  3. Fill form:
     - Title: John Doe - Designer
     - Description: Passionate about UX/UI design
     - Category: Designer
     - Image URL: (optional)
  4. Click Save Profile
  
Expected Results:
  ✅ Profile saved to localStorage
  ✅ "Create Your Profile" button disappears (hidden)
  ✅ Profile appears in grid with Edit/Delete buttons
  ✅ Alert shows "Profile created successfully!"
  ✅ Profile card shows owner name: "Created by testuser1"
```

#### Test 2.2: Try to Create Second Profile (Should Fail)
```
Steps:
  1. (After creating first profile) Click "Create Your Profile" button
  
Expected Results:
  ❌ Button does NOT appear (already hidden from Test 2.1)
  OR if manually triggered:
  ✅ Alert: "You can only create one profile..."
  ✅ Profile not created
  ✅ Only 1 profile in profiles array for this user
```

#### Test 2.3: Delete Profile and Create New One
```
Steps:
  1. (After Test 2.1) Click "Delete" on your profile
  2. Confirm deletion
  3. Now click "Create Your Profile" button
  
Expected Results:
  ✅ Profile deleted
  ✅ "Create Your Profile" button reappears
  ✅ Can create new profile
  ✅ Grid shows new profile
```

---

### 3️⃣ PROFILE EDITING (OWNERSHIP VALIDATION)

#### Test 3.1: Edit Your Own Profile (Owner)
```
Steps:
  1. Login as testuser1
  2. Create profile (if not already done)
  3. Click "Edit" button on YOUR profile
  4. Change title: "John Doe - Senior Designer"
  5. Click "Save Profile"
  
Expected Results:
  ✅ Modal opens with current data pre-filled
  ✅ Changes saved to localStorage
  ✅ Grid immediately updates
  ✅ Alert shows "Profile updated successfully!"
  ✅ Profile card shows new title
```

#### Test 3.2: Try to Edit Another User's Profile (Non-Owner)
```
Steps:
  1. Login as testuser1, create profile
  2. Open browser developer tools (F12)
  3. Open browser console
  4. Manually trigger edit on another profile (from different user):
     ```javascript
     app.editProfile(otherUsersProfileId, {title: "Hacked", description: "...", category: "..."})
     ```
  5. OR: Try to view source and simulate clicking Edit button on other profile
  
Expected Results:
  ❌ Edit button does NOT appear on other users' profiles (only View)
  ✅ If manually triggered: Alert "You can only manage your own profile."
  ✅ Profile NOT updated in localStorage
  ✅ Profile still shows original data
```

#### Test 3.3: Verify Edit Button Visibility
```
Steps:
  1. Login as testuser1
  2. Create profile
  3. Look at profile cards for:
     - YOUR profile: Should show [Edit] [Delete] buttons
     - Others' profiles: Should show [View] button only
  4. Logout
  5. Look at all profiles
  
Expected Results:
  ✅ Before logout: Only your profile has Edit/Delete
  ✅ After logout: No profiles have Edit/Delete
  ✅ All profiles show View button only
```

---

### 4️⃣ PROFILE DELETION (OWNERSHIP VALIDATION)

#### Test 4.1: Delete Your Own Profile (Owner)
```
Steps:
  1. Login as testuser1
  2. Click "Delete" on YOUR profile
  3. Confirm deletion
  
Expected Results:
  ✅ Confirmation dialog appears
  ✅ Profile removed from grid
  ✅ Profile removed from localStorage
  ✅ Alert shows "Profile deleted successfully!"
  ✅ "Create Your Profile" button reappears
```

#### Test 4.2: Try to Delete Another User's Profile
```
Steps:
  1. Login as testuser2
  2. View testuser1's profile in grid
  3. Try to click "Delete" button on testuser1's profile
  
Expected Results:
  ❌ Delete button does NOT appear (only View)
  ✅ Cannot delete other users' profiles
  ✅ testuser1's profile still in grid for testuser2
```

#### Test 4.3: Delete Profile, Then Check Profiles Still Load
```
Steps:
  1. Create 2 users with 2 profiles
  2. Login as user 1
  3. Delete profile
  4. Check localStorage for 'profiles' array
  5. Logout and login as user 2
  
Expected Results:
  ✅ After deletion: profiles array has 1 profile (user 2's)
  ✅ User 2's profile still visible when user 2 logs in
  ✅ No data loss
```

---

### 5️⃣ PROFILE VIEWING (ALL USERS)

#### Test 5.1: Anonymous Visitor Sees Login Alert
```
Steps:
  1. Open showcase.html without logging in
  2. Look at page
  
Expected Results:
  ✅ Login alert visible: "You must log in to create a profile"
  ✅ "Create Your Profile" button hidden
  ✅ All profiles visible in grid
  ✅ All profiles show [View] button only
  ✅ No user info in header
```

#### Test 5.2: Multiple Profiles from Different Users
```
Setup:
  1. Create testuser1, login, create Profile A
  2. Create testuser2, login, create Profile B
  3. Create testuser3, login, create Profile C

Steps:
  1. Login as testuser1
  2. View showcase.html
  3. Look at grid
  
Expected Results:
  ✅ All 3 profiles visible in grid
  ✅ Profile A shows [Edit] [Delete] buttons (yours)
  ✅ Profile B shows [View] button only
  ✅ Profile C shows [View] button only
  ✅ Each card shows correct owner: "Created by testuser2", etc.
```

---

### 6️⃣ PAGE LOAD & INITIALIZATION

#### Test 6.1: Page Loads Correctly When Logged In
```
Steps:
  1. Login to showcase.html
  2. Refresh page (F5)
  
Expected Results:
  ✅ currentUser still set
  ✅ User info in header: "Logged in as: testuser1"
  ✅ Profiles still visible
  ✅ "Create Your Profile" button visible (if 0 profiles)
```

#### Test 6.2: Page Loads Correctly When Logged Out
```
Steps:
  1. Logout
  2. Open showcase.html fresh (new tab, ctrl+shift+delete cache)
  
Expected Results:
  ✅ currentUser is null
  ✅ Login alert shows
  ✅ "Create Your Profile" button hidden
  ✅ All profiles visible (read-only mode)
```

#### Test 6.3: Session Persistence
```
Steps:
  1. Login to showcase.html
  2. Close browser tab
  3. Open new tab, go to showcase.html
  
Expected Results:
  ✅ currentUser still set in localStorage
  ✅ Still logged in on new tab
  ✅ User info in header
```

---

### 7️⃣ FORM VALIDATION

#### Test 7.1: Required Fields Validation
```
Steps:
  1. Login to showcase.html
  2. Click "Create Your Profile"
  3. Try to save without filling Title
  
Expected Results:
  ✅ Browser validation prevents submission
  ✅ Title field shows required indicator
  ✅ Cannot submit empty form
```

#### Test 7.2: Valid Image URL
```
Steps:
  1. Create profile with valid image URL
  
Expected Results:
  ✅ Image loads on profile card
  ✅ OR: Image placeholder (👤) if URL invalid
```

#### Test 7.3: URL Validation for Image
```
Steps:
  1. Create profile with invalid image URL
  
Expected Results:
  ✅ Profile saves (image is optional)
  ✅ Placeholder (👤) shows if URL fails to load
```

---

### 8️⃣ RESPONSIVE DESIGN

#### Test 8.1: Desktop (1100px+)
```
Steps:
  1. Open showcase.html on desktop (1200px wide)
  2. Look at profile grid
  
Expected Results:
  ✅ 3 columns of profiles
  ✅ Cards have proper spacing
  ✅ Responsive layout looks good
```

#### Test 8.2: Tablet (720px - 1100px)
```
Steps:
  1. Resize browser to 800px wide
  2. Look at profile grid
  
Expected Results:
  ✅ 2 columns of profiles
  ✅ Mobile nav hamburger appears (if applicable)
```

#### Test 8.3: Mobile (<720px)
```
Steps:
  1. Resize browser to 400px wide
  2. Look at profile grid
  
Expected Results:
  ✅ 1 column of profiles
  ✅ Mobile nav hamburger appears
  ✅ Forms stack vertically
  ✅ Buttons full-width on mobile
```

---

### 9️⃣ SECURITY & EDGE CASES

#### Test 9.1: XSS Prevention (HTML in Profile)
```
Steps:
  1. Create profile with title: "<img src=x onerror='alert(1)'>"
  2. Save and view
  
Expected Results:
  ✅ No alert/popup
  ✅ Text displayed as-is (HTML escaped)
  ✅ Shows literal text, not executed
```

#### Test 9.2: localStorage Directly Modify Other's Profile
```
Steps:
  1. Login as testuser1
  2. Open browser DevTools (F12)
  3. In Console:
     ```javascript
     let profiles = JSON.parse(localStorage.getItem('profiles'));
     profiles[1].ownerId = app.currentUser.id; // Try to claim another's profile
     localStorage.setItem('profiles', JSON.stringify(profiles));
     location.reload();
     ```
  4. Try to delete/edit testuser2's profile
  
Expected Results:
  ✅ Ownership validation catches this
  ✅ Edit/Delete buttons still don't show (UI check)
  ✅ Backend logic prevents modification
```

#### Test 9.3: No Access to Admin/Private Functionality
```
Steps:
  1. Open browser DevTools (F12)
  2. Try to run:
     ```javascript
     app.deleteProfile(otherUsersProfileId)
     ```
  
Expected Results:
  ✅ Function detects non-ownership
  ✅ Alert: "You can only delete your own profile."
  ✅ Profile not deleted
```

---

### 🔟 MULTIPLE USERS SCENARIO

#### Test 10.1: Full Multi-User Flow
```
Setup 3 test users:

User A: alice (alice@test.com / pass123)
User B: bob (bob@test.com / pass123)
User C: charlie (charlie@test.com / pass123)

Steps:
  1. Register & login as alice
     - Create "Alice - Graphic Designer" profile
     - See: [Create Profile] hidden, 3 profiles in grid
  
  2. Logout, login as bob
     - Create "Bob - Software Developer" profile
     - See: Alice's and Charlie's [View] buttons, Bob's [Edit][Delete]
  
  3. Logout, login as charlie
     - Create "Charlie - Photographer" profile
     - See: Alice's, Bob's [View] buttons, Charlie's [Edit][Delete]
  
  4. Alice deletes her profile
     - Bob & Charlie see only 2 profiles now
  
  5. Bob edits his profile
     - Change title to "Bob - Senior Developer"
     - Charlie sees updated title immediately
  
  6. Logout (all users logged out)
     - All profiles visible, all show [View] only
     - No [Create Profile] button
     - Login alert visible

Expected Results:
  ✅ All steps work correctly
  ✅ No cross-contamination between users
  ✅ Ownership rules enforced throughout
  ✅ Real-time updates visible to all users
  ✅ No data loss or corruption
```

---

## 🧪 AUTOMATED TEST COMMANDS

### Browser Console Tests

```javascript
// Test 1: Check localStorage structure
console.log('Users:', JSON.parse(localStorage.getItem('users')));
console.log('Profiles:', JSON.parse(localStorage.getItem('profiles')));
console.log('Current User:', JSON.parse(localStorage.getItem('currentUser')));

// Test 2: Create profile programmatically
app.addProfile({
  title: 'Test Profile',
  description: 'Test description',
  category: 'developer',
  image: ''
});

// Test 3: Try to edit another's profile
let anotherUsersProfile = app.profiles.find(p => p.ownerId !== app.currentUser.id);
app.editProfile(anotherUsersProfile.id, {title: 'Hacked'});

// Test 4: Check ownership validation
console.log('Is owner?', app.isProfileOwner(anotherUsersProfile.id));

// Test 5: Delete current user's profile
let myProfile = app.getUserProfile();
if (myProfile) app.deleteProfile(myProfile.id);

// Test 6: Logout and check
app.logout();
```

---

## 📊 TEST RESULT SUMMARY

### Issues Found
- [ ] Issue 1: _____________________
- [ ] Issue 2: _____________________
- [ ] Issue 3: _____________________

### Tests Passed
- [x] Authentication flow works
- [x] Profile creation works
- [x] Profile editing works
- [x] Profile deletion works
- [x] Ownership validation works
- [x] One-profile-per-user enforcement works
- [x] UI updates correctly
- [x] Responsive design works
- [x] Security checks pass

### Tests Failed
- [ ] Test _____: _____________________
- [ ] Test _____: _____________________

### Overall Status
- ✅ Ready for Production
- ⚠️ Needs Minor Fixes
- ❌ Needs Major Rework

---

## 🔍 DEBUGGING TIPS

### Check currentUser
```javascript
// In browser console
const user = JSON.parse(localStorage.getItem('currentUser'));
console.log(user);
// Should output: {id: ..., username: "...", email: "..."}
// or: null (if logged out)
```

### Check All Profiles
```javascript
const profiles = JSON.parse(localStorage.getItem('profiles') || '[]');
console.table(profiles);
// Should show: id, ownerId, title, description, category, dateCreated
```

### Check User's Profile Count
```javascript
const userId = app.currentUser.id;
const count = app.getUserProfileCount();
console.log(`User ${userId} has ${count} profile(s)`);
```

### Verify Ownership
```javascript
const profileId = app.profiles[0].id;
console.log(app.isProfileOwner(profileId));
// true = you own it, false = you don't
```

### Clear All Data (CAUTION!)
```javascript
localStorage.removeItem('currentUser');
localStorage.removeItem('users');
localStorage.removeItem('profiles');
location.reload();
// Starts fresh - use only for testing!
```

---

**Last Updated:** November 27, 2025  
**Version:** 1.0  
**Status:** Ready for Testing
