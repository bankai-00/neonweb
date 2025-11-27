// Copy this file to `firebase-config.js` and fill the values.
// Do NOT check real secrets into source control.

export default {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
  measurementId: "MEASUREMENT_ID"
}

/*
  Steps:
  1. Create a Firebase project at https://console.firebase.google.com/
  2. Enable Email/Password sign-in method in Authentication > Sign-in method.
  3. Create a Firestore database (in test mode for prototyping) and a Storage bucket.
  4. Copy the web config into `firebase-config.js` (same folder) and do NOT commit it.
  5. The app will detect `firebase-config.js` when present and you can enable Firebase mode.
*/
