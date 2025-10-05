require('dotenv').config({ path: './.env.mongo' });
const nodemailer = require('nodemailer');

console.log('🧪 Testing Email Configuration...');
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS length:', process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 'NOT SET');
console.log('Contains real password?', process.env.EMAIL_PASS && process.env.EMAIL_PASS.includes('hrdq'));

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const testEmail = async () => {
  try {
    console.log('📧 Sending test email...');
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'kavin7369@gmail.com', // Test with the actual email from application
      subject: '🧪 Email Test from Nalanda School',
      html: `
        <h2>Email Test Successful! ✅</h2>
        <p>This is a test email from Nalanda School admission system.</p>
        <p>If you received this, email configuration is working correctly!</p>
        <p>Sent at: ${new Date().toLocaleString()}</p>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully!');
    console.log('Message ID:', result.messageId);
    
  } catch (error) {
    console.error('❌ Email failed:', error.message);
    if (error.code === 'EAUTH') {
      console.log('🔐 Authentication failed - check Gmail App Password');
    }
  }
};

testEmail();