const { sequelize, User, Startup } = require('./models');
const bcrypt = require('bcryptjs');

const seedUsers = async () => {
    try {
        await sequelize.sync({ alter: true });

        const hashedPassword = await bcrypt.hash('password123', 10);

        // 1. Create Admin
        const adminEmail = 'admin@inspire.com';
        let admin = await User.findOne({ where: { email: adminEmail } });

        if (!admin) {
            admin = await User.create({
                name: 'System Admin',
                email: adminEmail,
                password_hash: hashedPassword,
                role: 'admin'
            });
            console.log('Admin user created: admin@inspire.com / password123');
        } else {
            console.log('Admin user already exists');
        }

        // 2. Create Founder
        const founderEmail = 'founder@inspire.com';
        let founder = await User.findOne({ where: { email: founderEmail } });

        if (!founder) {
            founder = await User.create({
                name: 'Jane Founder',
                email: founderEmail,
                password_hash: hashedPassword,
                role: 'founder'
            });
            console.log('Founder user created: founder@inspire.com / password123');

            // Create a dummy startup for the founder
            await Startup.create({
                name: 'NextGen AI',
                description: 'Revolutionizing the future with AI.',
                industry: 'Tech',
                stage: 'MVP',
                founder_id: founder.id
            });
            console.log('Dummy startup created for founder');
        } else {
            console.log('Founder user already exists');
        }

        process.exit(0);
    } catch (error) {
        console.error('Failed to seed users:', error);
        process.exit(1);
    }
};

seedUsers();
