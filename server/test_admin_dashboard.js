const fs = require('fs');

const testDashboard = async () => {
    try {
        // 1. Login as Admin
        const loginResponse = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'admin@inspire.com',
                password: 'password123'
            })
        });

        const loginData = await loginResponse.json();

        // Extract token from Set-Cookie header
        const setCookie = loginResponse.headers.get('set-cookie');
        let token = loginData.token;

        if (!token && setCookie) {
            const match = setCookie.match(/token=([^;]+)/);
            if (match) token = match[1];
        }

        const result = {
            loginStatus: loginResponse.status,
            tokenReceived: !!token,
            dashboard: null,
            error: null
        };

        if (!token) {
            result.error = 'Login failed';
            fs.writeFileSync('test_result.json', JSON.stringify(result, null, 2));
            return;
        }

        // 2. Fetch Dashboard Data
        const dashboardResponse = await fetch('http://localhost:5000/api/dashboard/admin', {
            headers: {
                'Cookie': `token=${token}`
            }
        });

        result.dashboardStatus = dashboardResponse.status;
        const text = await dashboardResponse.text();

        try {
            result.dashboard = JSON.parse(text);
        } catch (e) {
            result.dashboardRaw = text;
            result.parseError = e.message;
        }

        fs.writeFileSync('test_result.json', JSON.stringify(result, null, 2));
        console.log('Test completed. Check test_result.json');

    } catch (error) {
        fs.writeFileSync('test_result.json', JSON.stringify({ error: error.message }, null, 2));
    }
};

testDashboard();
