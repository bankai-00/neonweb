# Neonfolio Showcase - Authentication & Profile Management System

## 🎯 Features Implemented

### Authentication & Authorization
- ✅ **Login Required** - Users must log in to create/edit/delete profiles
- ✅ **Ownership Validation** - Users can only manage their own profiles
- ✅ **One Profile Per User** - Each user can create only ONE profile
- ✅ **Auto-hidden Add Button** - "Create Profile" button hides after user creates first profile
- ✅ **Role-based Actions** - Owners see Edit/Delete, non-owners see View only

### Profile Management (CRUD)
- ✅ **Create Profile** - Add new profile with title, description, category, image URL
- ✅ **Read Profile** - Display all profiles in responsive grid
- ✅ **Update Profile** - Edit existing profile (only if owner)
- ✅ **Delete Profile** - Remove profile with confirmation (only if owner)

### Security & Validation
- ✅ **Authentication Check** - Redirects to login if not logged in
- ✅ **Ownership Protection** - Prevents editing/deleting others' profiles
- ✅ **One-Profile Limit** - Prevents users from creating multiple profiles
- ✅ **Form Validation** - Required fields checked before saving
- ✅ **HTML Escaping** - Prevents XSS attacks

### UI/UX
- ✅ **Black Neon Theme** - Glassmorphism cards with cyan/magenta/lime accents
- ✅ **Responsive Grid** - 3 columns desktop, 2 tablet, 1 mobile
- ✅ **Empty State** - Shows message when no profiles exist
- ✅ **User Info Display** - Shows current logged-in user in header
- ✅ **Logout Button** - Easy logout from header
- ✅ **Modal Forms** - Clean add/edit interface
- ✅ **Alert System** - User feedback for all actions

---

## 📋 How to Test

### Test Setup
1. Open **login.html** or **register.html**
2. Create a test user account
3. Login with credentials
4. Navigate to **showcase.html**

### Test Scenarios

#### Scenario 1: First-Time User (No Profile)
```
Expected:
- "Create Your Profile" button visible
- Add profile section shows
- Empty profiles grid (or existing profiles from other users)
- User info shows in header
```

#### Scenario 2: Create Profile
```
Click "Create Your Profile" button
Fill form:
  - Title: "John Doe - UI Designer"
  - Description: "Passionate about creating beautiful interfaces"
  - Category: "Designer"
  - Image URL: (optional)
Click "Save Profile"

Expected:
- Profile saved to localStorage
- "Create Your Profile" button hides (one profile limit)
- Profile appears in grid with Edit/Delete buttons
- Only you see Edit/Delete (others see View only)
```

#### Scenario 3: Edit Profile (As Owner)
```
Click "Edit" on your profile
Modify fields
Click "Save Profile"

Expected:
- Profile updated immediately
- Changes visible in grid
- Profile remains with same ownership
```

#### Scenario 4: Try to Edit Another's Profile
```
(In incognito/different browser)
Login as different user
Try to click Edit on first user's profile

Expected:
- Edit button does NOT appear (only View shows)
- If manually triggering edit, alert: "You can only edit your own profile"
```

#### Scenario 5: Delete Profile
```
Click "Delete" on your profile
Confirm deletion

Expected:
- Profile removed from grid
- "Create Your Profile" button reappears (you can create another)
- Profile no longer appears for other users
```

#### Scenario 6: Try to Create Second Profile
```
After creating first profile, click "Create Your Profile" again

Expected:
- Alert: "You can only create one profile..."
- Cannot proceed
```

#### Scenario 7: Logout
```
Click "Logout" in header
Confirm logout

Expected:
- currentUser cleared from localStorage
- Page reloads
- Login alert appears
- "Create Your Profile" button hides
- User info disappears from header
```

---

## 🔧 Technical Details

### localStorage Structure

```javascript
// Current logged-in user
{
  "currentUser": {
    "id": 1701086400000,
    "username": "john_doe",
    "email": "john@example.com"
  }
}

// All registered users
{
  "users": [
    {
      "id": 1701086400000,
      "username": "john_doe",
      "email": "john@example.com",
      "password": "hashed_password"
    }
  ]
}

// All user profiles
{
  "profiles": [
    {
      "id": 1701086402000,
      "ownerId": 1701086400000,          // Links to user.id
      "title": "John Doe - UI Designer",
      "description": "...",
      "category": "designer",
      "image": "https://...",
      "dateCreated": "2025-11-27T..."
    }
  ]
}
```

### Key Functions

#### Authentication Check
```javascript
checkAuth() {
  if (!this.currentUser) {
    // Show login alert, hide add button
    return false;
  }
  return true;
}
```

#### Ownership Validation
```javascript
isProfileOwner(profileId) {
  if (!this.currentUser) return false;
  const profile = this.profiles.find(p => p.id === profileId);
  return profile && profile.ownerId === this.currentUser.id;
}
```

#### Profile Limit Check
```javascript
getUserProfileCount() {
  return this.profiles.filter(
    p => p.ownerId === this.currentUser.id
  ).length;
}
// If count >= 1, hide Add button
```

#### Protection Rule: Edit Only Own Profile
```javascript
editProfile(profileId, data) {
  if (!this.isProfileOwner(profileId)) {
    alert('You can only manage your own profile.');
    return false;
  }
  // ... proceed with edit
}
```

---

## 🚀 How It Works

### On Page Load
1. Check if `currentUser` exists in localStorage
2. If yes:
   - Show user info in header
   - Count user's profiles
   - If count = 0: Show "Create Profile" button
   - If count >= 1: Hide "Create Profile" button
3. If no:
   - Show login alert
   - Hide "Create Profile" button
   - Hide user info

### When User Creates Profile
1. Validate form fields (title, description, category required)
2. Check if user already has a profile
3. If yes: Prevent creation, show alert
4. If no:
   - Save profile with `ownerId = currentUser.id`
   - Hide "Create Profile" button
   - Add profile to grid

### When User Edits Profile
1. Check if `profile.ownerId === currentUser.id`
2. If no: Show "You can only edit your own profile"
3. If yes: Allow edit, update localStorage

### When User Deletes Profile
1. Check if `profile.ownerId === currentUser.id`
2. If no: Show "You can only delete your own profile"
3. If yes: Ask for confirmation, delete, re-show "Create Profile" button

### When User Logout
1. Clear `currentUser` from localStorage
2. Reload page
3. All auth checks fail, show login alert

---

## 🔒 Security Notes

### Implemented
- ✅ HTML escaping to prevent XSS
- ✅ Ownership validation on all edit/delete
- ✅ One-profile-per-user enforcement
- ✅ Auth check before operations

### Not Implemented (Would Need Backend)
- ❌ Password hashing (currently plain text in localStorage)
- ❌ Session tokens (using localStorage currentUser)
- ❌ CSRF protection
- ❌ Rate limiting
- ❌ Data encryption

### Recommendation
For production, implement:
1. Backend authentication (JWT tokens)
2. Secure password hashing (bcrypt)
3. HTTPS only
4. Server-side validation of ownership
5. Database instead of localStorage

---

## 📱 UI Components

### Profile Card
```
┌─────────────────────────┐
│    Profile Image 👤     │
│                         │
│  John Doe - Designer    │
│  Description text...    │
│                         │
│  Designer               │
│  Created by john_doe    │
│                         │
│ [Edit] [Delete] [View]  │ (Owner)
│         [View]          │ (Non-owner)
└─────────────────────────┘
```

### Add Profile Button (Owner)
- Visible when user has 0 profiles
- Gradient neon cyan → magenta
- Glowing effect on hover
- Opens modal with form

### Modal Form
```
Create Profile
═════════════════
Profile Title: [_____________]
Description:   [_______________]
Category:      [Designer ▼]
Image URL:     [_____________]

[Save Profile] [Cancel]
```

### Header User Info
```
Logged in as: john_doe [Logout]
```

---

## ✨ Future Enhancements

1. **Profile Settings** - Allow users to make profiles public/private
2. **Social Features** - Follow, like, comment on profiles
3. **Messaging** - Direct messaging between users
4. **Portfolio Projects** - Link projects to profile
5. **Analytics** - Profile view count, top performers
6. **Search & Filter** - Find profiles by category, name
7. **Ratings** - User ratings and reviews
8. **Portfolio Links** - Connect to external portfolio site
9. **Social Media Links** - Add Twitter, GitHub, LinkedIn URLs
10. **Profile Customization** - Theme, colors, layout options

---

## 📊 File Structure

```
c:\vs code\web2\
├── pages/
│   ├── showcase.html       ← Authenticated profile showcase
│   ├── login.html          ← User login
│   ├── register.html       ← User registration
│   ├── index.html
│   ├── about.html
│   └── contact.html
├── css/
│   └── pages.css
├── robots.txt
├── sitemap.xml
└── README.md
```

---

**Created**: November 27, 2025  
**Status**: ✅ Ready for Testing  
**Version**: 1.0 - Initial Release
