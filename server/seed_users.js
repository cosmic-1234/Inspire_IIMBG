const { sequelize, User, Startup } = require('./models');
const bcrypt = require('bcryptjs');

const seedUsers = async () => {
    try {
        // Only sync if running standalone
        if (require.main === module) {
            await sequelize.sync({ alter: true });
        }

        const strongPassword = 'Admin@Inspire2025!';
        const hashedPassword = await bcrypt.hash(strongPassword, 10);

        // 1. Create or Update Admin
        const adminEmail = 'admin@inspire.com';
        const adminData = {
            name: 'System Admin',
            email: adminEmail,
            password_hash: hashedPassword,
            role: 'admin'
        };

        const existingAdmin = await User.findOne({ where: { email: adminEmail } });
        if (existingAdmin) {
            await existingAdmin.update(adminData);
            console.log(`Admin user updated: ${adminEmail} / ${strongPassword}`);
        } else {
            await User.create(adminData);
            console.log(`Admin user created: ${adminEmail} / ${strongPassword}`);
        }

        // 2. Create Founder (Only if not exists, to avoid overwriting user data)
        const founderEmail = 'founder@inspire.com';
        let founder = await User.findOne({ where: { email: founderEmail } });

        if (!founder) {
            founder = await User.create({
                name: 'Jane Founder',
                email: founderEmail,
                password_hash: hashedPassword,
                role: 'founder'
            });
            console.log(`Founder user created: ${founderEmail} / ${strongPassword}`);

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

        if (require.main === module) {
            console.log('Seeding completed successfully.');
            process.exit(0);
        }
    } catch (error) {
        console.error('Failed to seed users:', error);
        if (require.main === module) {
            process.exit(1);
        }
    }
};

if (require.main === module) {
    seedUsers();
}

module.exports = seedUsers;
