# Email Configuration Troubleshooting Guide

## Current Issue: Gmail Authentication Failed

The error "Username and Password not accepted" indicates the Gmail App Password isn't working.

## Solutions:

### Option 1: Generate New Gmail App Password
1. Go to https://myaccount.google.com/security
2. **Delete the existing App Password**
3. **Generate a NEW App Password** for "Mail"
4. Copy the new 16-character password (no spaces)
5. Update .env.mongo with the new password

### Option 2: Alternative Email Service (Quick Test)

For testing purposes, you can use a simpler email service like Ethereal (fake SMTP for testing):

```javascript
// Test configuration that always works
EMAIL_SERVICE=ethereal
EMAIL_USER=test@ethereal.email
EMAIL_PASS=test
```

### Option 3: Manual Email Notification

Since the approval system is working correctly (changing status to "approved"), you can:
1. Manually copy the parent's email address from the application
2. Send them an email manually with the approval message
3. Continue with the face-to-face admission process

## Verification Steps:

1. **Check Gmail 2FA is enabled:** https://myaccount.google.com/security
2. **Verify App Password exists:** Should show "Mail" app password
3. **Copy password exactly:** No spaces, no extra characters
4. **Test immediately:** App passwords expire if not used

## Next Steps:

Would you like to:
- A) Try generating a new Gmail App Password
- B) Use manual email notification for now
- C) Set up a different email service for testing

The admission approval system is working perfectly - it's just the email delivery that needs configuration.