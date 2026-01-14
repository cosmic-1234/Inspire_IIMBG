const { User, sequelize } = require('./models');
const bcrypt = require('bcryptjs');

async function resetPassword() {
    try {
        const email = 'shrirangswanikar@gmail.com';
        const newPassword = 'password123';

        console.log(`Searching for user: ${email}`);
        const user = await User.findOne({ where: { email } });

        if (!user) {
            console.log(`User ${email} not found!`);
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password_hash = hashedPassword;
        await user.save();

        console.log(`SUCCESS: Password for ${email} has been reset to: ${newPassword}`);
    } catch (error) {
        console.error('Error resetting password:', error);
    } finally {
        await sequelize.close();
    }
}

resetPassword();
