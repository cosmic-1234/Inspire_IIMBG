const { User, sequelize } = require('./models');

async function checkUser() {
    try {
        const email = 'shrirangwanikar06@gmail.com';
        console.log(`Searching for user: ${email}`);
        const user = await User.findOne({ where: { email } });

        if (user) {
            console.log(`User found! ID: ${user.id}, Role: ${user.role}`);
            console.log('Password hash exists.');
        } else {
            console.log(`User ${email} not found.`);
        }
    } catch (error) {
        console.error('Error checking user:', error);
    } finally {
        await sequelize.close();
    }
}

checkUser();
