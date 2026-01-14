const getWelcomeEmailTemplate = (name, email, password) => {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Inspire IIM Bodh Gaya</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #0F172A; /* brand-dark */
            padding: 40px 20px;
            text-align: center;
        }
        .header h1 {
            color: #ffffff;
            margin: 0;
            font-size: 28px;
            font-weight: bold;
        }
        .content {
            padding: 40px 30px;
            color: #334155; /* slate-700 */
        }
        .greeting {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 20px;
            color: #0F172A;
        }
        .message {
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 30px;
        }
        .credentials-box {
            background-color: #F0FDFA; /* teal-50 */
            border: 1px solid #14B8A6; /* brand-teal */
            border-radius: 6px;
            padding: 20px;
            margin-bottom: 30px;
        }
        .credential-row {
            margin-bottom: 10px;
            font-size: 16px;
        }
        .credential-label {
            font-weight: bold;
            color: #0F172A;
            width: 100px;
            display: inline-block;
        }
        .credential-value {
            font-family: monospace;
            color: #0F172A;
            background-color: #e2e8f0;
            padding: 2px 6px;
            border-radius: 4px;
        }
        .cta-button {
            display: inline-block;
            background-color: #14B8A6; /* brand-teal */
            color: #ffffff;
            text-decoration: none;
            padding: 14px 28px;
            border-radius: 6px;
            font-weight: bold;
            font-size: 16px;
            text-align: center;
        }
        .footer {
            background-color: #f8fafc;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #94a3b8;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <!-- Use a public URL for the logo in production -->
            <h1>Welcome to Inspire</h1>
        </div>
        <div class="content">
            <div class="greeting">Hello ${name},</div>
            <div class="message">
                An account has been created for you to track your application status and manage your startup profile. Please use the credentials below to log in to your dashboard.
            </div>
            
            <div class="credentials-box">
                <div class="credential-row">
                    <span class="credential-label">Email:</span>
                    <span class="credential-value">${email}</span>
                </div>
                <div class="credential-row">
                    <span class="credential-label">Password:</span>
                    <span class="credential-value">${password}</span>
                </div>
            </div>

            <div style="text-align: center;">
                <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}/login" class="cta-button">Login to Dashboard</a>
            </div>
            
            <div class="message" style="margin-top: 30px; font-size: 14px; color: #64748b;">
                Note: For security reasons, we recommend changing your password after your first login.
            </div>
        </div>
        <div class="footer">
            &copy; ${new Date().getFullYear()} Inspire IIM Bodh Gaya. All rights reserved.<br>
            This is an automated message, please do not reply directly to this email.
        </div>
    </div>
</body>
</html>
    `;
};

const getOtpEmailTemplate = (otp) => {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email - Inspire IIM Bodh Gaya</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #0F172A; /* brand-dark */
            padding: 40px 20px;
            text-align: center;
        }
        .header img {
            height: 50px;
            width: auto;
            margin-bottom: 10px;
        }
        .header h1 {
            color: #ffffff;
            margin: 0;
            font-size: 24px;
            font-weight: bold;
        }
        .content {
            padding: 40px 30px;
            color: #334155; /* slate-700 */
            text-align: center;
        }
        .message {
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 30px;
        }
        .otp-box {
            background-color: #F0FDFA; /* teal-50 */
            border: 2px dashed #14B8A6; /* brand-teal */
            border-radius: 8px;
            padding: 20px;
            margin: 0 auto 30px auto;
            width: fit-content;
        }
        .otp-code {
            font-family: monospace;
            font-size: 32px;
            font-weight: bold;
            color: #0F172A;
            letter-spacing: 4px;
        }
        .footer {
            background-color: #f8fafc;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #94a3b8;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="http://localhost:5000/logo.png" alt="Inspire Logo">
            <h1>Verify Your Email</h1>
        </div>
        <div class="content">
            <div class="message">
                Please use the verification code below to complete your application for the Inspire Incubation Program.
            </div>
            
            <div class="otp-box">
                <div class="otp-code">${otp}</div>
            </div>
            
            <div class="message" style="font-size: 14px; color: #64748b;">
                This code will expire in 10 minutes. If you didn't request this, please ignore this email.
            </div>
        </div>
        <div class="footer">
            &copy; ${new Date().getFullYear()} Inspire IIM Bodh Gaya. All rights reserved.
        </div>
    </div>
</body>
</html>
    `;
};

module.exports = {
    getWelcomeEmailTemplate,
    getOtpEmailTemplate
};
