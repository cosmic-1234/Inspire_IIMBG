const { sequelize, User, Startup, Application } = require('./models');

const seedApplications = async () => {
    try {
        await sequelize.sync({ alter: true });

        // Find the founder we created earlier
        const founder = await User.findOne({ where: { email: 'founder@inspire.com' } });

        if (!founder) {
            console.error('Founder user not found. Run seed_users.js first.');
            process.exit(1);
        }

        // Find the startup for this founder
        const startup = await Startup.findOne({ where: { founder_id: founder.id } });

        if (!startup) {
            console.error('Startup not found for founder.');
            process.exit(1);
        }

        // Create an application
        const application = await Application.create({
            startup_id: startup.id,
            status: 'submitted',
            submission_data: {
                phone: '123-456-7890',
                linkedin: 'https://linkedin.com/in/janefounder',
                pitch_deck_url: '/uploads/sample_pitch_deck.pdf', // Dummy path
                problem_statement: 'The world needs better AI.',
                solution: 'We are building better AI.'
            }
        });

        console.log('Sample application created for NextGen AI.');
        process.exit(0);

    } catch (error) {
        console.error('Failed to seed application:', error);
        process.exit(1);
    }
};

seedApplications();
