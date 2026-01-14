const { sequelize, User } = require('../models');
const bcrypt = require('bcryptjs');
const { exec } = require('child_process');

async function runCI() {
    try {
        console.log('Starting CI Database Setup...');

        // 1. Sync Database (Force true to ensure clean state)
        await sequelize.sync({ force: true });
        console.log('Database Synced.');

        // 2. Seed Admin User
        const hashedPassword = await bcrypt.hash('password123', 10);
        await User.create({
            firstName: 'Admin',
            lastName: 'User',
            email: 'admin@inspire.com',
            password: hashedPassword,
            role: 'admin',
            isVerified: true
        });
        console.log('Admin user seeded.');

        // 3. Run Integration Tests
        // We'll run the existing test_admin_dashboard.js
        // Note: The test file uses fetch to localhost:5000. 
        // In CI, we need to make sure the server is running or start it within this script.
        // For simplicity in this script, we assume the server is ALREADY running (started by CI workflow step)
        // or we start it programmatically here.
        // Given the CI workflow steps, it's easier if we start the server in the background in the YAML, 
        // BUT wait, this script needs to run specifically.

        // Let's execute the test file as a child process.
        console.log('Running test_admin_dashboard.js...');

        exec('node test_admin_dashboard.js', { cwd: __dirname + '/../' }, (error, stdout, stderr) => {
            if (error) {
                console.error(`Test execution failed: ${error}`);
                console.error(stderr);
                process.exit(1);
            }

            console.log(stdout);

            // Check the result file content if needed, or just rely on stdout/error code
            const fs = require('fs');
            const resultPath = __dirname + '/../test_result.json';

            if (fs.existsSync(resultPath)) {
                const result = JSON.parse(fs.readFileSync(resultPath, 'utf8'));
                console.log('Test Result:', result);

                if (result.error || (result.loginStatus !== 200)) {
                    console.error('Test Failed based on result JSON.');
                    process.exit(1);
                }
                console.log('CI Checks Passed!');
                process.exit(0);
            } else {
                console.error('Test result file not found.');
                process.exit(1);
            }
        });

    } catch (error) {
        console.error('CI Setup Failed:', error);
        process.exit(1);
    }
}

// Wait for DB connection before starting
setTimeout(runCI, 5000);
