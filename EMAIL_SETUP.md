# Email Setup Guide for Admission Notifications

## Current Implementation

The admission system now sends automatic email notifications when applications are approved. Here's what happens:

### When Admin Approves an Application:

1. **Immediate Actions:**
   - Student and parent accounts are created
   - Application status changes to "approved"
   - Roll number and class are assigned

2. **Email Notification Sent to Parent:**
   - Welcome message with admission confirmation
   - Student details (name, roll number, class, section)
   - **Important Instructions:**
     - Bring original documents within **1 week**
     - Required document list
     - Meeting schedule and office hours
     - Contact information

3. **Email Content Includes:**
   - 📋 Document requirements (birth certificate, transfer certificate, etc.)
   - 📞 School contact information
   - 🔐 Information about login credentials
   - ⏰ 7-day deadline reminder

## Email Configuration

### For Development/Testing:
The system is configured to use Gmail SMTP. Update the `.env` file:

```env
EMAIL_USER=nalandaschool1985@gmail.com
EMAIL_PASS=your_gmail_app_password_here
```

### To Get Gmail App Password:
1. Go to Google Account settings
2. Enable 2-Factor Authentication
3. Go to "App Passwords"
4. Generate a password for "Mail"
5. Use this 16-character password in EMAIL_PASS

### For Production:
Consider using:
- **SendGrid** (recommended for bulk emails)
- **AWS SES** (cost-effective)
- **Mailgun** (developer-friendly)

## Testing the Email System

1. **Start the server** with proper email configuration
2. **Login as admin** (nalandaschool1985@gmail.com / nalanda1985)
3. **Go to Admission Applications tab**
4. **Click "Approve" on any pending application**
5. **Fill in the required details:**
   - Roll Number: (e.g., 101)
   - Class: (e.g., 9th Grade)
   - Section: (e.g., A)
   - Student Password: (min 6 chars)
   - Parent Password: (min 6 chars)
6. **Check parent's email** for the approval notification

## Email Features

### Parent Notification Email Includes:
- ✅ **Congratulations message**
- 📋 **Document submission checklist**
- 📅 **1-week deadline**
- 📞 **School contact details**
- 🏫 **Office hours and address**
- 🔐 **Login account information**
- 💳 **Fee payment instructions**

### Admin Benefits:
- Automated communication
- Consistent messaging
- Professional appearance
- Reduced manual work
- Better parent experience

## Troubleshooting

If emails are not sending:
1. Check email credentials in `.env`
2. Verify Gmail app password is correct
3. Check server console for email errors
4. Ensure internet connection is available

The system will still approve applications even if email fails - email is treated as optional enhancement.