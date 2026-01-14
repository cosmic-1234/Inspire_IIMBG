require('dotenv').config();
const { sendWelcomeEmail } = require('./services/emailService');

const toEmail = 'shrirangswanikar@gmail.com';
const name = 'Shrirang';
const password = 'test-password-123';

console.log(`Attempting to send test email to ${toEmail}...`);

sendWelcomeEmail(toEmail, name, password)
    .then(() => console.log('Test email sent successfully!'))
    .catch(err => console.error('Test email failed:', err));
