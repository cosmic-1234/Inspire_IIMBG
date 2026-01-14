const { sequelize, Startup, Mentor, Resource } = require('./models');

const verifyData = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection OK.');

        const startupCount = await Startup.count();
        const mentorCount = await Mentor.count();
        const resourceCount = await Resource.count();

        console.log(`Startups: ${startupCount}`);
        console.log(`Mentors: ${mentorCount}`);
        console.log(`Resources: ${resourceCount}`);

        if (startupCount === 0 || mentorCount === 0 || resourceCount === 0) {
            console.error('ERROR: Some tables are empty!');
            process.exit(1);
        } else {
            console.log('SUCCESS: Data exists.');
            process.exit(0);
        }
    } catch (err) {
        console.error('Verification failed:', err);
        process.exit(1);
    }
};

verifyData();
