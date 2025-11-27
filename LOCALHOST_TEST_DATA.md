# localStorage Test Data Examples

## How to Use This File

You can copy and paste these commands into your browser console (F12 → Console tab) to quickly populate localStorage with test data for manual testing.

---

## 🧪 Test Scenario 1: Clean Start

**Reset everything to empty state**

```javascript
// Clear all data
localStorage.clear();
console.log("✅ All localStorage cleared - starting fresh");
```

---

## 👥 Test Scenario 2: Single User with One Profile

**Creates: 1 user (alice), 1 profile**

```javascript
// Create users array with alice
const users = [
  {
    id: 1701086400000,
    username: "alice",
    email: "alice@example.com",
    password: "password123"
  }
];
localStorage.setItem('users', JSON.stringify(users));

// Create profiles array with alice's profile
const profiles = [
  {
    id: 1701086402000,
    ownerId: 1701086400000,
    title: "Alice - Graphic Designer",
    description: "Creative designer with 5+ years of experience in branding and visual identity.",
    category: "designer",
    image: "https://via.placeholder.com/300x300?text=Alice",
    dateCreated: "2025-11-27T09:30:00.000Z"
  }
];
localStorage.setItem('profiles', JSON.stringify(profiles));

// Set alice as current logged-in user
const currentUser = users[0];
localStorage.setItem('currentUser', JSON.stringify(currentUser));

console.log("✅ Test data loaded: 1 user (alice), 1 profile");
console.log("Current User:", currentUser.username);
console.log("Profile Count:", profiles.length);
```

**What to test:**
- Open showcase.html
- See alice logged in at top
- See alice's profile with [Edit] [Delete] buttons
- "Create Profile" button should be hidden

---

## 👥 Test Scenario 3: Multiple Users with Multiple Profiles

**Creates: 3 users (alice, bob, charlie), 3 profiles (one each)**

```javascript
// Create users array
const users = [
  {
    id: 1701086400000,
    username: "alice",
    email: "alice@example.com",
    password: "password123"
  },
  {
    id: 1701086402000,
    username: "bob",
    email: "bob@example.com",
    password: "password123"
  },
  {
    id: 1701086404000,
    username: "charlie",
    email: "charlie@example.com",
    password: "password123"
  }
];
localStorage.setItem('users', JSON.stringify(users));

// Create profiles array with 3 profiles
const profiles = [
  {
    id: 1701086500000,
    ownerId: 1701086400000,
    title: "Alice - Graphic Designer",
    description: "Creative designer specializing in branding, packaging, and digital art.",
    category: "designer",
    image: "https://via.placeholder.com/300x300?text=Alice",
    dateCreated: "2025-11-27T09:00:00.000Z"
  },
  {
    id: 1701086501000,
    ownerId: 1701086402000,
    title: "Bob - Full Stack Developer",
    description: "JavaScript specialist | React | Node.js | Building scalable web applications",
    category: "developer",
    image: "https://via.placeholder.com/300x300?text=Bob",
    dateCreated: "2025-11-27T10:00:00.000Z"
  },
  {
    id: 1701086502000,
    ownerId: 1701086404000,
    title: "Charlie - Photographer",
    description: "Professional photographer | Landscapes, portraits, and commercial photography",
    category: "photographer",
    image: "https://via.placeholder.com/300x300?text=Charlie",
    dateCreated: "2025-11-27T11:00:00.000Z"
  }
];
localStorage.setItem('profiles', JSON.stringify(profiles));

// Login as alice
localStorage.setItem('currentUser', JSON.stringify(users[0]));

console.log("✅ Test data loaded: 3 users, 3 profiles");
console.log("Currently logged in as:", users[0].username);
console.log("Profiles in system:", profiles.length);
```

**What to test:**
- Open showcase.html
- See all 3 profiles in grid
- Only alice's profile has [Edit] [Delete] buttons
- bob's and charlie's profiles show [View] only
- "Create Profile" button hidden (alice already has one)
- In header: "Logged in as: alice"

**Multi-User Test:**
1. Run code above to set up
2. Refresh showcase.html (alice is shown)
3. Go to login.html, logout then login as "bob"
4. Go to showcase.html - now bob is logged in
5. See all 3 profiles, but only bob's has [Edit] [Delete]
6. Try to click [Edit] on alice's profile - button not there

---

## 👥 Test Scenario 4: Users Without Profiles

**Creates: 3 users, but only 2 have profiles (alice and bob)**

```javascript
// Create users array
const users = [
  {
    id: 1701086400000,
    username: "alice",
    email: "alice@example.com",
    password: "password123"
  },
  {
    id: 1701086402000,
    username: "bob",
    email: "bob@example.com",
    password: "password123"
  },
  {
    id: 1701086404000,
    username: "charlie",
    email: "charlie@example.com",
    password: "password123"
  }
];
localStorage.setItem('users', JSON.stringify(users));

// Create profiles array (only alice and bob have profiles)
const profiles = [
  {
    id: 1701086500000,
    ownerId: 1701086400000,
    title: "Alice - Graphic Designer",
    description: "Creative designer specializing in digital art and branding.",
    category: "designer",
    image: null,
    dateCreated: "2025-11-27T09:00:00.000Z"
  },
  {
    id: 1701086501000,
    ownerId: 1701086402000,
    title: "Bob - Developer",
    description: "Full-stack JavaScript developer.",
    category: "developer",
    image: null,
    dateCreated: "2025-11-27T10:00:00.000Z"
  }
];
localStorage.setItem('profiles', JSON.stringify(profiles));

// Login as charlie (who has no profile)
localStorage.setItem('currentUser', JSON.stringify(users[2]));

console.log("✅ Test data loaded: 3 users, 2 profiles");
console.log("Currently logged in as:", users[2].username);
console.log("User has profile?", profiles.filter(p => p.ownerId === users[2].id).length > 0 ? "Yes" : "No");
```

**What to test:**
- Open showcase.html as charlie
- See 2 profiles (alice and bob)
- "Create Your Profile" button visible (charlie has no profile yet)
- Both alice's and bob's profiles show [View] only
- Click "Create Your Profile" to create charlie's profile

---

## 🔍 Test Scenario 5: Verify Ownership Validation

**Creates: Complex scenario to test edit/delete protection**

```javascript
// First, run Scenario 3 setup (3 users, 3 profiles)
const users = [
  { id: 1000, username: "alice", email: "alice@example.com", password: "pass" },
  { id: 2000, username: "bob", email: "bob@example.com", password: "pass" },
  { id: 3000, username: "charlie", email: "charlie@example.com", password: "pass" }
];
localStorage.setItem('users', JSON.stringify(users));

const profiles = [
  { id: 1, ownerId: 1000, title: "Alice Profile", description: "Alice", category: "designer", image: null, dateCreated: "2025-11-27T09:00:00Z" },
  { id: 2, ownerId: 2000, title: "Bob Profile", description: "Bob", category: "developer", image: null, dateCreated: "2025-11-27T10:00:00Z" },
  { id: 3, ownerId: 3000, title: "Charlie Profile", description: "Charlie", category: "photographer", image: null, dateCreated: "2025-11-27T11:00:00Z" }
];
localStorage.setItem('profiles', JSON.stringify(profiles));

// Login as alice
localStorage.setItem('currentUser', JSON.stringify(users[0]));

console.log("✅ Setup complete for ownership validation testing");

// Now test the protection (in browser console, after page loads):
console.log("\n🔍 TESTING OWNERSHIP PROTECTION:");

// Get the ProfileManager instance (if loaded on page)
console.log("Current user:", app.currentUser?.username);
console.log("Alice's profile ID:", app.profiles[0].id);
console.log("Bob's profile ID:", app.profiles[1].id);

// Try to edit alice's profile (should work)
console.log("\n✅ Attempting to edit OWN profile (alice's):");
const result1 = app.editProfile(app.profiles[0].id, {
  title: "Updated Alice Profile",
  description: "Updated",
  category: "designer",
  image: null
});
console.log("Result:", result1 ? "SUCCESS" : "FAILED");

// Try to edit bob's profile (should fail)
console.log("\n❌ Attempting to edit ANOTHER's profile (bob's):");
const result2 = app.editProfile(app.profiles[1].id, {
  title: "HACKED Bob Profile",
  description: "Hacked",
  category: "developer",
  image: null
});
console.log("Result:", result2 ? "SUCCESS (ERROR!)" : "FAILED (CORRECT - blocked)");
```

---

## 📊 Test Scenario 6: One-Profile-Per-User Enforcement

**Verify users cannot create multiple profiles**

```javascript
// Setup: Single user, no profiles yet
const users = [
  {
    id: 1701086400000,
    username: "testuser",
    email: "test@example.com",
    password: "password123"
  }
];
localStorage.setItem('users', JSON.stringify(users));
localStorage.setItem('profiles', JSON.stringify([]));
localStorage.setItem('currentUser', JSON.stringify(users[0]));

console.log("✅ Setup complete: 1 user, 0 profiles");

// After page loads, test in console:
console.log("\n👤 Testing one-profile-per-user enforcement:");

// Check profile count
console.log("Current profile count:", app.getUserProfileCount());
console.log("Attempting to create first profile...");

// Try to add first profile (should succeed)
const success1 = app.addProfile({
  title: "My First Profile",
  description: "This is my first profile",
  category: "developer",
  image: ""
});
console.log("First profile creation:", success1 ? "✅ SUCCESS" : "❌ FAILED");

// Check profile count again
console.log("Profile count after first creation:", app.getUserProfileCount());

// Refresh data
app.profiles = app.getProfiles();

// Try to add second profile (should fail)
console.log("\nAttempting to create second profile...");
const success2 = app.addProfile({
  title: "My Second Profile",
  description: "This should fail",
  category: "designer",
  image: ""
});
console.log("Second profile creation:", success2 ? "❌ ERROR - SHOULD HAVE FAILED!" : "✅ CORRECTLY BLOCKED");

// Check final profile count
console.log("Final profile count:", app.getUserProfileCount());
console.log("Profile data in localStorage:", JSON.parse(localStorage.getItem('profiles')));
```

---

## 🧹 Cleanup Test Data

**Remove all test data and start fresh**

```javascript
// Clear everything
localStorage.clear();

// Verify it's empty
console.log("localStorage after clear:");
console.log("users:", localStorage.getItem('users'));
console.log("profiles:", localStorage.getItem('profiles'));
console.log("currentUser:", localStorage.getItem('currentUser'));
console.log("✅ All localStorage cleared");

// Now you can start fresh or load a specific test scenario
```

---

## 🔧 Debugging Commands

**Check current state**

```javascript
// Check all users
console.log("All users:", JSON.parse(localStorage.getItem('users') || '[]'));

// Check all profiles
console.log("All profiles:", JSON.parse(localStorage.getItem('profiles') || '[]'));

// Check logged-in user
console.log("Current user:", JSON.parse(localStorage.getItem('currentUser') || 'null'));

// Check specific user's profile count
const userId = app.currentUser?.id;
const count = app.profiles.filter(p => p.ownerId === userId).length;
console.log(`User ${userId} has ${count} profile(s)`);

// Check if user owns a specific profile
const profileId = app.profiles[0]?.id;
const owns = app.isProfileOwner(profileId);
console.log(`Own profile ${profileId}?`, owns);

// Check profile data structure
console.log("Sample profile:", app.profiles[0]);
```

---

## 📝 Manual Test Workflow

### Step 1: Load test data
Copy one of the scenarios above into browser console, run it

### Step 2: Refresh page
Press F5 to reload showcase.html

### Step 3: Observe
- Check who's logged in
- See which profiles show [Edit]/[Delete]
- Notice if "Create Profile" button is visible

### Step 4: Test operations
- Click "Edit" on your profile
- Click "Delete" (try to click on others' profiles)
- Try to create another profile

### Step 5: Switch users
- Go to login.html
- Logout and login as different user
- Return to showcase.html
- Repeat Step 3-4 with different user

---

## 🎯 Quick Copy-Paste for Common Tests

### Test: "Can I see who owns each profile?"
```javascript
app.profiles.forEach(p => {
  const owner = JSON.parse(localStorage.getItem('users')).find(u => u.id === p.ownerId);
  console.log(`Profile: ${p.title} | Owner: ${owner.username}`);
});
```

### Test: "Do I own this profile?"
```javascript
const profileId = app.profiles[0].id;
console.log("Is owner?", app.isProfileOwner(profileId));
```

### Test: "How many profiles does each user have?"
```javascript
const users = JSON.parse(localStorage.getItem('users'));
users.forEach(u => {
  const count = app.profiles.filter(p => p.ownerId === u.id).length;
  console.log(`${u.username}: ${count} profile(s)`);
});
```

### Test: "Can non-owners edit profiles?"
```javascript
// (Run this while logged in as a different user)
const anotherProfile = app.profiles.find(p => p.ownerId !== app.currentUser.id);
const canEdit = app.editProfile(anotherProfile.id, {
  title: "HACKED", description: "", category: ""
});
console.log("Non-owner edit allowed?", canEdit ? "❌ ERROR!" : "✅ Blocked correctly");
```

---

**Last Updated**: November 27, 2025  
**For Testing**: showcase.html  
**Browser**: Any modern browser with localStorage support
