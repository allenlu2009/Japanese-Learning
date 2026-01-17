# Google Drive Auto-Sync Setup

## Prerequisites
- Google Account
- Access to Google Cloud Console

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Create Project"
3. Name: "Japanese Learning Tracker"
4. Click "Create"

## Step 2: Enable Google Drive API

1. In your project, go to "APIs & Services" → "Library"
2. Search for "Google Drive API"
3. Click on it and press "Enable"

## Step 3: Create OAuth 2.0 Credentials

### For Web Application:

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. Click "Configure Consent Screen" (if prompted)
   - User Type: External
   - App name: Japanese Learning Tracker
   - User support email: your email
   - Developer contact: your email
   - Scopes: Add `drive.appdata` scope
   - Test users: Add your email
   - Save
4. Back to "Create OAuth client ID"
   - Application type: Web application
   - Name: Japanese Learning Web
   - Authorized JavaScript origins:
     - http://localhost:3000
     - https://your-production-domain.com
   - Authorized redirect URIs:
     - http://localhost:3000
     - https://your-production-domain.com
5. Click "Create"
6. Copy the **Client ID** (save it for later)

### For Mobile Application (Android):

1. Click "Create Credentials" → "OAuth client ID"
2. Application type: Android
3. Name: Japanese Learning Mobile
4. Package name: Get from `app.json` (e.g., com.yourcompany.japaneselearning)
5. SHA-1 certificate fingerprint:
   ```bash
   # Debug certificate (for development)
   keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
   ```
6. Click "Create"
7. Copy the **Client ID**

### For Mobile Application (iOS):

1. Click "Create Credentials" → "OAuth client ID"
2. Application type: iOS
3. Name: Japanese Learning Mobile iOS
4. Bundle ID: Get from Xcode project
5. Click "Create"
6. Copy the **Client ID**

## Step 4: Configure Environment Variables

### Web (.env.local):
```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-web-client-id.apps.googleusercontent.com
```

### Mobile (app.json or .env):
```json
{
  "expo": {
    "extra": {
      "googleDriveClientId": "your-android-client-id.apps.googleusercontent.com",
      "googleDriveClientIdIos": "your-ios-client-id.apps.googleusercontent.com"
    }
  }
}
```

## Step 5: Add Scopes

The app needs the following scope:
- `https://www.googleapis.com/auth/drive.appdata` (access to app's hidden folder only)

**Note:** This scope only allows access to a hidden folder that the user cannot see in their Drive. It's the most privacy-friendly option.

## Verification

After setup, test the OAuth flow:
1. Click "Connect Google Drive" in the app
2. Sign in with your Google account
3. Grant permissions
4. App should show "Connected" status

## Troubleshooting

### "Access Blocked" Error
- Make sure you added your email as a test user in OAuth consent screen
- Verify the redirect URI matches exactly

### "Invalid Client" Error
- Check that the Client ID is correct in your .env file
- Make sure you're using the web client ID for web, Android client ID for Android

### SHA-1 Fingerprint Issues
- Make sure you're using the correct keystore (debug vs release)
- For release builds, use your release keystore SHA-1

## Production Deployment

Before going to production:
1. Add your production domain to authorized origins
2. Add production redirect URIs
3. Submit OAuth consent screen for verification
4. Move from "Testing" to "Published" status

## Security Notes

- Never commit your Client ID to public repositories if it includes client secrets
- Use environment variables for all credentials
- The `drive.appdata` scope is the most restrictive - it only accesses a hidden folder
- Users can revoke access anytime from their Google Account settings
