# Supabase Authentication Setup Guide

## Overview
This project now uses **Supabase** for authentication across all roles (Candidate, Recruiter, Client).

## Configuration

### Environment Variables
The following environment variables are configured in `frontend/.env`:

```env
VITE_SUPABASE_URL=https://fhwtxghyfcygpgefgurn.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZod3R4Z2h5ZmN5Z3BnZWZndXJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwMTk4NTUsImV4cCI6MjA4MDU5NTg1NX0.7L8vQjv-QoI55iA_YcXFL_RzQdfTbcYPtNa-Bo5V7MQ
```

## Features Implemented

### 1. **Supabase Client Setup**
- Location: `frontend/src/lib/supabase.ts`
- Initializes Supabase client with project credentials
- Used throughout the application for auth operations

### 2. **Authentication Context**
- Location: `frontend/src/contexts/AuthContext.tsx`
- Provides global auth state and methods
- Available hooks:
  - `useAuth()` - Access auth state and methods
  
#### Available Methods:
```typescript
const { user, session, loading, signUp, signIn, signOut, updateProfile } = useAuth()
```

- **user**: Current authenticated user object
- **session**: Current session object
- **loading**: Authentication loading state
- **signUp(email, password, metadata)**: Register new user
- **signIn(email, password)**: Login existing user
- **signOut()**: Logout current user
- **updateProfile(data)**: Update user metadata

### 3. **Protected Routes**
- Location: `frontend/src/components/ProtectedRoute.tsx`
- Wraps dashboard routes to ensure authentication
- Redirects unauthenticated users to home page
- Shows loading spinner during auth check

### 4. **Updated Authentication Flow**

#### Sign Up Flow:
1. User selects role (Candidate/Recruiter/Client)
2. Fills signup form with email, password, and profile info
3. Supabase creates account and sends verification email
4. User metadata includes: name, phone, location, role
5. User is redirected to role-specific dashboard

#### Login Flow:
1. User enters email and password
2. Supabase validates credentials
3. Session token is stored automatically
4. User is redirected to role-specific dashboard

#### Logout Flow:
1. User clicks logout button
2. Supabase session is cleared
3. Local storage is cleaned
4. User is redirected to home page

### 5. **Updated Pages**

#### AuthPage (`frontend/src/pages/auth/AuthPage.tsx`)
- Integrated Supabase signup and login
- Stores user metadata (name, phone, location, role)
- Handles email/password validation
- Shows toast notifications for success/error

#### CandidateProfile (`frontend/src/pages/candidate/CandidateProfile.tsx`)
- Uses authenticated user ID
- Displays current user email
- Logout functionality with Supabase

#### RecruiterDashboard (`frontend/src/pages/recruiter/RecruiterDashboard.tsx`)
- Protected by ProtectedRoute component
- Uses Supabase authentication
- Logout functionality

#### ClientDashboard (`frontend/src/pages/client/ClientDashboard.tsx`)
- Protected by ProtectedRoute component
- Uses Supabase authentication
- Logout functionality

## Installation Steps

### 1. Install Dependencies
```bash
cd frontend
npm install
```

This will install the new `@supabase/supabase-js` package added to `package.json`.

### 2. Environment Setup
The `.env` file is already configured with your Supabase credentials. If you need to change them:

```bash
# Edit frontend/.env
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### 3. Run the Application
```bash
npm run dev
```

## Supabase Database Setup

### Required Tables

You should create the following tables in your Supabase database:

#### 1. **profiles** table (extends auth.users)
```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  name TEXT,
  phone TEXT,
  location TEXT,
  role TEXT CHECK (role IN ('candidate', 'recruiter', 'client')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create trigger to auto-create profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, phone, location, role)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'name',
    NEW.raw_user_meta_data->>'phone',
    NEW.raw_user_meta_data->>'location',
    NEW.raw_user_meta_data->>'role'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

## Authentication Flow Diagram

```
┌─────────────┐
│ Home Screen │
│  (Splash)   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Select Role │
│ C/R/Client  │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  AuthPage   │
│ Login/Signup│
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Supabase   │
│    Auth     │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Protected   │
│  Dashboard  │
└─────────────┘
```

## Security Features

1. **Row Level Security (RLS)**: Ensures users can only access their own data
2. **JWT Tokens**: Secure session management with automatic refresh
3. **Password Hashing**: Supabase handles secure password storage
4. **Email Verification**: Optional email verification for new accounts
5. **Role-Based Access**: User roles stored in metadata for authorization

## Testing Authentication

### Test Account Creation:
1. Go to home page
2. Select a role (Candidate/Recruiter/Client)
3. Click "Create Account"
4. Fill in details:
   - Name: Test User
   - Email: test@example.com
   - Password: test123456
   - Phone: +91 1234567890
   - Location: Bangalore
5. Submit form
6. Check email for verification (if enabled)

### Test Login:
1. Go to home page
2. Select the same role
3. Click "Sign In"
4. Enter email and password
5. Should redirect to dashboard

### Test Logout:
1. From any dashboard
2. Click "Logout" button
3. Should redirect to home page

## Troubleshooting

### Issue: "Missing Supabase environment variables"
**Solution**: Ensure `.env` file exists in frontend directory with correct values

### Issue: "User not authenticated" on protected routes
**Solution**: Clear browser cache and login again

### Issue: Email verification required
**Solution**: Check Supabase dashboard → Authentication → Email Templates
Enable or disable email verification as needed

### Issue: Profile data not saving
**Solution**: Ensure `profiles` table exists and RLS policies are configured

## Next Steps

1. **Email Templates**: Customize email verification and password reset templates in Supabase dashboard
2. **Social Auth**: Add Google/GitHub OAuth in Supabase settings
3. **Password Reset**: Implement forgot password functionality
4. **Profile Completion**: Add profile completion wizard for new users
5. **Role Permissions**: Implement fine-grained permissions per role
6. **Multi-Factor Auth**: Enable 2FA in Supabase for enhanced security

## API Integration

To integrate authenticated requests with your backend:

```typescript
import { supabase } from './lib/supabase'

// Get current session token
const { data: { session } } = await supabase.auth.getSession()
const token = session?.access_token

// Use token in API requests
const response = await axios.get('/api/endpoint', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
```

## Support

For Supabase-specific issues, refer to:
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- Your Project Dashboard: https://fhwtxghyfcygpgefgurn.supabase.co
