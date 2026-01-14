const { sequelize, Application, Startup, User } = require('./models');

const listApplications = async () => {
    try {
        const applications = await Application.findAll({
            include: [
                { model: Startup, include: [User] }
            ]
        });

        console.log(`Found ${applications.length} applications.`);
        applications.forEach(app => {
            console.log(`ID: ${app.id}, Status: ${app.status}, Startup: ${app.Startup?.name}, Founder: ${app.Startup?.User?.email}`);
        });

    } catch (error) {
        console.error('Error listing applications:', error);
    }
};

listApplications();
