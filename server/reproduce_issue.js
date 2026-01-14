const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const reproduce = async () => {
    try {
        const form = new FormData();
        form.append('founderName', 'Test Founder');
        form.append('founderEmail', 'test.founder@example.com'); // New email to avoid conflict? Or use existing?
        form.append('founderPhone', '1234567890');
        form.append('startupName', 'Test Startup');
        form.append('industry', 'Tech');
        form.append('stage', 'Idea');
        form.append('website', 'https://example.com');
        form.append('description', 'Test description');

        // Create dummy files
        fs.writeFileSync('dummy_logo.png', 'dummy content');
        fs.writeFileSync('dummy_pitch.pdf', 'dummy content');

        form.append('logo', fs.createReadStream('dummy_logo.png'), 'logo.png');
        form.append('pitchDeck', fs.createReadStream('dummy_pitch.pdf'), 'pitch.pdf');

        const response = await axios.post('http://localhost:5000/api/apply', form, {
            headers: {
                ...form.getHeaders()
            }
        });

        console.log('Success:', response.data);
    } catch (error) {
        console.error('Error Status:', error.response?.status);
        console.error('Error Data:', error.response?.data);
    } finally {
        // Cleanup
        if (fs.existsSync('dummy_logo.png')) fs.unlinkSync('dummy_logo.png');
        if (fs.existsSync('dummy_pitch.pdf')) fs.unlinkSync('dummy_pitch.pdf');
    }
};

reproduce();
