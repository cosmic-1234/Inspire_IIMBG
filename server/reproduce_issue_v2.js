const fs = require('fs');
// Node 18+ has global fetch and FormData

const reproduce = async () => {
    try {
        const form = new FormData();
        form.append('founderName', 'Test Founder');
        form.append('founderEmail', 'founder@inspire.com'); // Use the EXISTING founder email to trigger conflict
        form.append('founderPhone', '1234567890');
        form.append('startupName', 'Test Startup');
        form.append('industry', 'Tech');
        form.append('stage', 'Idea');
        form.append('website', 'https://example.com');
        form.append('description', 'Test description');

        // Create dummy files
        fs.writeFileSync('dummy_logo.png', 'dummy content');
        fs.writeFileSync('dummy_pitch.pdf', 'dummy content');

        const blobLogo = new Blob([fs.readFileSync('dummy_logo.png')]);
        const blobPitch = new Blob([fs.readFileSync('dummy_pitch.pdf')]);

        form.append('logo', blobLogo, 'logo.png');
        form.append('pitchDeck', blobPitch, 'pitch.pdf');

        const response = await fetch('http://127.0.0.1:5000/api/apply', {
            method: 'POST',
            body: form
        });

        const data = await response.json();
        console.log('Status:', response.status);
        console.log('Response:', data);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        if (fs.existsSync('dummy_logo.png')) fs.unlinkSync('dummy_logo.png');
        if (fs.existsSync('dummy_pitch.pdf')) fs.unlinkSync('dummy_pitch.pdf');
    }
};

reproduce();
