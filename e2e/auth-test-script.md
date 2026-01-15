# Authentication & Onboarding Manual Test Script

This document provides a comprehensive 15+ step manual test script for verifying the production-grade authentication and onboarding system.

---

## Prerequisites

1. Fresh browser (or incognito/private window)
2. Access to test email (or use email auto-confirm in dev)
3. Network throttling tools (optional, for testing resilience)

---

## Part 1: Signup Flow (Happy Path)

### Test 1.1: Navigate to Signup
- [ ] Go to `/signup`
- [ ] Verify: Page loads with form, no blank states
- [ ] Verify: "Back to home" link works
- [ ] Verify: Google OAuth button visible and styled

### Test 1.2: Form Validation
- [ ] Click "Sign Up" with empty form
- [ ] Verify: Inline error messages appear for all required fields
- [ ] Verify: Errors are descriptive and in NÈKO voice (not generic "Required")

### Test 1.3: Invalid Email Format
- [ ] Enter "notanemail" in email field
- [ ] Tab out or submit
- [ ] Verify: Error message "That doesn't look like a valid email"

### Test 1.4: Weak Password
- [ ] Enter valid email, name, and password "123"
- [ ] Verify: Error about password length (8+ chars)

### Test 1.5: Password Mismatch
- [ ] Enter password "ValidPass123" and confirm "WrongPass123"
- [ ] Verify: Error "Those passwords don't match"

### Test 1.6: Successful Signup
- [ ] Enter:
  - Full name: "Test User"
  - Email: unique test email
  - Business name: "Test Business" (optional)
  - Password: "SecurePass123!"
  - Confirm: "SecurePass123!"
- [ ] Click "Sign Up"
- [ ] Verify: Either:
  - (If email confirm required) Success screen with "Check your email"
  - (If auto-confirm) Redirect to `/app/onboarding`
- [ ] Verify: Toast notification appears

---

## Part 2: Onboarding Flow (Happy Path)

### Test 2.1: Onboarding Step 1 - Business Stage
- [ ] Verify: Progress indicator shows Step 1 of 4
- [ ] Verify: "Just an idea", "Just formed", "Operating" options visible
- [ ] Select "Just formed"
- [ ] Click "Next"
- [ ] Verify: Proceeds to Step 2

### Test 2.2: Onboarding Step 2 - Industry & Location
- [ ] Verify: Industry dropdown with searchable options
- [ ] Verify: State dropdown with all 50 US states
- [ ] Select "Technology / Software" and "California"
- [ ] (Optional) Enter business name
- [ ] Click "Next"

### Test 2.3: Onboarding Step 3 - Goals
- [ ] Verify: Multiple selection allowed
- [ ] Select "Build business credit" and "Build personal brand"
- [ ] Click "Next"

### Test 2.4: Onboarding Step 4 - Status
- [ ] Verify: LLC and EIN checkboxes
- [ ] Select "I already have an LLC"
- [ ] Click "Get Started"
- [ ] Verify: Loading state shows
- [ ] Verify: Redirect to `/app` dashboard
- [ ] Verify: Success toast "Welcome to NÈKO!"

### Test 2.5: Verify Free Tier Active
- [ ] Verify: Plan badge shows "Free" in header
- [ ] Verify: Dashboard loads with content (not blank)
- [ ] Verify: Can navigate to all /app/* routes

---

## Part 3: Login Flow

### Test 3.1: Logout First
- [ ] Click "Sign Out" in sidebar
- [ ] Verify: Redirect to home page `/`
- [ ] Verify: Can no longer access `/app`

### Test 3.2: Navigate to Login
- [ ] Go to `/login`
- [ ] Verify: Page loads, form visible

### Test 3.3: Invalid Credentials
- [ ] Enter email from signup, wrong password
- [ ] Click "Sign In"
- [ ] Verify: Error toast "Those credentials didn't match"
- [ ] Verify: Form still visible (not blank page)

### Test 3.4: Successful Login
- [ ] Enter correct email and password
- [ ] Check "Remember me" checkbox
- [ ] Click "Sign In"
- [ ] Verify: Redirect to `/app`
- [ ] Verify: Welcome toast appears
- [ ] Verify: Dashboard loads correctly

### Test 3.5: Session Persistence (Remember Me)
- [ ] Close browser completely
- [ ] Reopen and navigate to `/app`
- [ ] Verify: Still logged in (no redirect to login)

---

## Part 4: Password Reset Flow

### Test 4.1: Forgot Password
- [ ] Logout if logged in
- [ ] Go to `/login`
- [ ] Click "Forgot password?"
- [ ] Verify: Redirect to `/forgot-password`

### Test 4.2: Request Reset
- [ ] Enter test email
- [ ] Click "Send Reset Link"
- [ ] Verify: Success screen "Check your email"

### Test 4.3: Reset Password Page (Direct)
- [ ] Go to `/reset-password` directly (no token)
- [ ] Verify: Shows "Link expired or invalid" error
- [ ] Verify: Buttons to request new link or go to login

### Test 4.4: Reset with Valid Token (if possible)
- [ ] Click reset link from email
- [ ] Verify: Reset form loads
- [ ] Enter new password
- [ ] Verify: Success message
- [ ] Verify: Redirect to `/app`

---

## Part 5: Route Protection & Edge Cases

### Test 5.1: Protected Route Without Auth
- [ ] Logout if logged in
- [ ] Navigate directly to `/app/dashboard`
- [ ] Verify: Redirect to `/login`
- [ ] Verify: After login, return to `/app/dashboard`

### Test 5.2: Refresh on Protected Route
- [ ] Login and go to `/app/business-credit`
- [ ] Hard refresh (Ctrl+Shift+R / Cmd+Shift+R)
- [ ] Verify: Page loads correctly (no blank state)
- [ ] Verify: No redirect loop

### Test 5.3: Admin Route Without Admin Role
- [ ] Login as non-admin user
- [ ] Navigate to `/admin`
- [ ] Verify: Either redirect to `/app` or 403 page

### Test 5.4: Onboarding Skip Prevention
- [ ] Create new account that hasn't completed onboarding
- [ ] Try to navigate to `/app/dashboard` directly
- [ ] Verify: Redirect to `/app/onboarding`

### Test 5.5: Free Tier Content Access
- [ ] Login as free tier user
- [ ] Navigate to `/app/resources`
- [ ] Verify: Free resources visible
- [ ] Verify: Premium resources show upgrade prompt (if gated)

---

## Part 6: Error Handling & Resilience

### Test 6.1: Network Offline During Login
- [ ] Open DevTools > Network > Offline mode
- [ ] Try to login
- [ ] Verify: Error toast about connection
- [ ] Verify: Form remains usable
- [ ] Go back online
- [ ] Verify: Can login successfully

### Test 6.2: Slow Network
- [ ] Throttle network to "Slow 3G"
- [ ] Attempt signup or login
- [ ] Verify: Loading states visible
- [ ] Verify: No timeout errors (reasonable wait)

### Test 6.3: Duplicate Email Signup
- [ ] Try to signup with existing email
- [ ] Verify: Error "You already have an account"
- [ ] Verify: Link to login provided

---

## Part 7: Accessibility Checks

### Test 7.1: Keyboard Navigation
- [ ] Navigate signup form using only Tab key
- [ ] Verify: All fields focusable in logical order
- [ ] Verify: Submit with Enter key works

### Test 7.2: Screen Reader
- [ ] Enable screen reader (VoiceOver/NVDA)
- [ ] Navigate login form
- [ ] Verify: Labels read correctly
- [ ] Verify: Error messages announced

### Test 7.3: Error Focus
- [ ] Submit invalid form
- [ ] Verify: Focus moves to first error field

---

## Summary Checklist

| Test Area | Status |
|-----------|--------|
| Signup validation | ⬜ |
| Signup success | ⬜ |
| Onboarding flow | ⬜ |
| Free tier creation | ⬜ |
| Login/Logout | ⬜ |
| Password reset | ⬜ |
| Route protection | ⬜ |
| Session persistence | ⬜ |
| Error handling | ⬜ |
| Network resilience | ⬜ |
| Accessibility | ⬜ |

---

## Notes

- All tests assume email auto-confirm is enabled for development
- Production should have email confirmation enabled
- Free tier is created automatically via database trigger on signup
- RLS policies enforce user can only access their own data
