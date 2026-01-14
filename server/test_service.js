try {
    console.log('Attempting to require emailService...');
    const service = require('./services/emailService');
    console.log('Success!');
} catch (error) {
    console.error('Error requiring emailService:', error);
}
