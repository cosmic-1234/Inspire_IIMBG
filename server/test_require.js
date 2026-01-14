try {
    console.log('Attempting to require @sendgrid/mail...');
    const sgMail = require('@sendgrid/mail');
    console.log('Success!');
} catch (error) {
    console.error('Error requiring @sendgrid/mail:', error);
}
