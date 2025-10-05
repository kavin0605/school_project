# Email Configuration Guide

## Quick Setup for Gmail

### Option 1: Using Gmail App Password (Recommended)

1. **Enable 2-Factor Authentication** on your Gmail account:
   - Go to [myaccount.google.com](https://myaccount.google.com)
   - Click "Security" → "2-Step Verification" → Turn on

2. **Generate App Password**:
   - Go to Security → App passwords
   - Select "Mail" and "Windows Computer"
   - Copy the 16-character password (example: `abcd efgh ijkl mnop`)

3. **Update .env file**:
   ```bash
   # In server/.env.mongo
   EMAIL_SERVICE=gmail
   EMAIL_USER=nalandaschool1985@gmail.com
   EMAIL_PASS=finuavavpfrwywgx  # Your 16-character app password (no spaces)
   EMAIL_FROM=nalandaschool1985@gmail.com
   ```

### Option 2: Alternative Email Services

#### Using Outlook/Hotmail:
```bash
EMAIL_SERVICE=hotmail
EMAIL_USER=your-email@outlook.com
EMAIL_PASS=your_app_password
```

#### Using Yahoo:
```bash
EMAIL_SERVICE=yahoo
EMAIL_USER=your-email@yahoo.com
EMAIL_PASS=your_app_password
```

## Testing Without Email Configuration

The system will work even without email setup:
- Approval will still work
- Email content will be logged to console
- Admin gets success message

## What Happens When Approval is Clicked

1. **Admin enters required data**:
   - Roll Number
   - Class
   - Section
   - Student Password
   - Parent Password

2. **System creates**:
   - Student account with login credentials
   - Parent account linked to student
   - Updates application status to "approved"

3. **Email notification** (if configured):
   - Sent to parent's email
   - Contains approval confirmation
   - Instructions to visit school within one week
   - List of required documents

4. **Console output** (if email not configured):
   - Shows what email would contain
   - Indicates successful approval
   - Provides manual notification details

## Troubleshooting

### "Invalid login" error:
- Make sure 2FA is enabled
- Use App Password, not regular password
- Remove spaces from app password

### "EAUTH" error:
- Check email and password are correct
- Verify app password is generated properly

### Email not received:
- Check spam folder
- Verify email address in application
- Check console for email content

## Current Status

✅ **System works without email** - Approval process functional  
✅ **Console logging** - Shows email content when not configured  
✅ **Professional email template** - Ready when email is configured  
✅ **Error handling** - Graceful fallback when email fails  

## Next Steps

1. **For testing**: System works as-is with console output
2. **For production**: Set up Gmail App Password
3. **Optional**: Configure custom SMTP server

The admission system is fully functional. Email is an enhancement, not a requirement!