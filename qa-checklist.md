# QA Checklist — NeonPort Prototype

Basic manual tests to verify core functionality:

1. Load site
   - Open `index.html` in a browser or at `http://localhost:8000`.
   - Verify header, hero, and features render.

2. Register / Login
   - Register with name, email, and password (>=6 chars).
   - Ensure you are redirected to Dashboard.
   - Logout and attempt login with correct and incorrect passwords.

3. Create Project
   - From Dashboard, add a project with title, short description, cover image and one gallery image.
   - Verify image preview shows and project appears in the list.

4. Public View
   - Set project visibility to public and open the public profile link `#/u/<slug>`.
   - Open the project `#/p/<id>` in a private window (not logged in) to verify public access.

5. Private Project
   - Mark a project private and ensure it cannot be viewed by anonymous users.

6. Contact form
   - Submit a contact message and verify it is stored in localStorage under `neon_messages`.

7. Image limits and previews
   - Attempt to upload >6 gallery images; only first 6 should be used.

8. Accessibility
   - Tab through major interactive elements (nav, forms, buttons) and ensure focus is visible.

9. Persistence
   - Refresh the page; the session and created projects should persist in localStorage.

If any issues are found, check browser console for errors and ensure `localStorage` is enabled.
