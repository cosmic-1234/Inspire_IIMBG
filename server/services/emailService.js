const sgMail = require('@sendgrid/mail');
const { getWelcomeEmailTemplate } = require('../templates/emailTemplates');

// Initialize SendGrid with API Key from environment variables
if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
} else {
    console.warn('WARNING: SENDGRID_API_KEY is not set. Email sending will be disabled.');
}

const sendWelcomeEmail = async (to, name, password) => {
    if (!process.env.SENDGRID_API_KEY) {
        console.log('Mock Email Send (Missing API Key):');
        console.log(`To: ${to}`);
        console.log(`Subject: Welcome to Inspire IIM Bodh Gaya`);
        console.log(`Password: ${password}`);
        return;
    }

    const msg = {
        to: to,
        from: process.env.SENDGRID_FROM_EMAIL, // Verified sender
        subject: 'Welcome to Inspire IIM Bodh Gaya - Your Login Credentials',
        html: getWelcomeEmailTemplate(name, to, password),
    };

    try {
        await sgMail.send(msg);
        console.log(`Welcome email sent to ${to}`);
    } catch (error) {
        console.error('Error sending welcome email:', error);
        if (error.response) {
            console.error(error.response.body);
        }
    }
};

const sendOtpEmail = async (to, otp) => {
    if (!process.env.SENDGRID_API_KEY) {
        console.log('Mock OTP Email Send (Missing API Key):');
        console.log(`To: ${to}`);
        console.log(`OTP: ${otp}`);
        return;
    }

    const { getOtpEmailTemplate } = require('../templates/emailTemplates');
    const msg = {
        to: to,
        from: process.env.SENDGRID_FROM_EMAIL,
        subject: 'Verify Your Email - Inspire IIM Bodh Gaya',
        html: getOtpEmailTemplate(otp),
    };

    try {
        await sgMail.send(msg);
        console.log(`OTP email sent to ${to}`);
    } catch (error) {
        console.error('Error sending OTP email:', error);
        if (error.response) {
            console.error(error.response.body);
            if (error.response.body.errors && error.response.body.errors.length > 0) {
                throw new Error(error.response.body.errors[0].message);
            }
        }
        throw error;
    }
};

module.exports = {
    sendWelcomeEmail,
    sendOtpEmail
};
